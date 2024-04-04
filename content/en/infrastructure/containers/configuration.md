---
title: Configure Containers View
kind: documentation
aliases:
  - /infrastructure/livecontainers/configuration
further_reading:
- link: "/infrastructure/hostmap/"
  tag: "Documentation"
  text: "See all of your hosts/containers with the Infrastructure Map"
- link: "/infrastructure/process/"
  tag: "Documentation"
  text: "Understand what is going on at any level of your system"
---

This page lists configuration options for the [Containers][1] page in Datadog. To learn more about the Containers page and its capabilities, see [Containers View][2] documentation.

## Configuration options

### Include or exclude containers

Include and exclude containers from real-time collection:

- Exclude containers either by passing the environment variable `DD_CONTAINER_EXCLUDE` or by adding `container_exclude:` in your `datadog.yaml` main configuration file.
- Include containers either by passing the environment variable `DD_CONTAINER_INCLUDE` or by adding `container_include:` in your `datadog.yaml` main configuration file.

Both arguments take an **image name** as value. Regular expressions are also supported.

For example, to exclude all Debian images except containers with a name starting with *frontend*, add these two configuration lines in your `datadog.yaml` file:

```yaml
container_exclude: ["image:debian"]
container_include: ["name:frontend.*"]
```

**Note**: For Agent 5, instead of including the above in the `datadog.conf` main configuration file, explicitly add a `datadog.yaml` file to `/etc/datadog-agent/`, as the Process Agent requires all configuration options here. This configuration only excludes containers from real-time collection, **not** from Autodiscovery.

### Scrubbing sensitive information

To prevent the leaking of sensitive data, you can scrub sensitive words in container YAML files. Container scrubbing is enabled by default for Helm charts, and some default sensitive words are provided:

- `password`
- `passwd`
- `mysql_pwd`
- `access_token`
- `auth_token`
- `api_key`
- `apikey`
- `pwd`
- `secret`
- `credentials`
- `stripetoken`

You can set additional sensitive words by providing a list of words to the environment variable `DD_ORCHESTRATOR_EXPLORER_CUSTOM_SENSITIVE_WORDS`. This adds to, and does not overwrite, the default words.

**Note**: The additional sensitive words must be in lowercase, as the Agent compares the text with the pattern in lowercase. This means `password` scrubs `MY_PASSWORD` to `MY_*******`, while `PASSWORD` does not.

You need to setup this environment variable for the following agents:

- process-agent
- cluster-agent

```yaml
env:
    - name: DD_ORCHESTRATOR_EXPLORER_CUSTOM_SENSITIVE_WORDS
      value: "customword1 customword2 customword3"
```

For example, because `password` is a sensitive word, the scrubber changes `<MY_PASSWORD>` in any of the following to a string of asterisks, `***********`:

```text
password <MY_PASSWORD>
password=<MY_PASSWORD>
password: <MY_PASSWORD>
password::::== <MY_PASSWORD>
```

However, the scrubber does not scrub paths that contain sensitive words. For example, it does not overwrite `/etc/vaultd/secret/haproxy-crt.pem` with `/etc/vaultd/******/haproxy-crt.pem` even though `secret` is a sensitive word.

## Configure Orchestrator Explorer

### Resource collection compatibility matrix

The following table presents the list of collected resources and the minimal Agent, Cluster Agent, and Helm chart versions for each.

| Resource | Minimal Agent version | Minimal Cluster Agent version* | Minimal Helm chart version | Minimal Kubernetes version |
|---|---|---|---|---|
| ClusterRoleBindings | 7.33.0 | 1.19.0 | 2.30.9 | 1.14.0 |
| ClusterRoles | 7.33.0 | 1.19.0 | 2.30.9 | 1.14.0 |
| Clusters | 7.33.0 | 1.18.0 | 2.10.0 | 1.17.0 |
| CronJobs | 7.33.0 | 7.40.0 | 2.15.5 | 1.16.0 |
| DaemonSets | 7.33.0 | 1.18.0 | 2.16.3 | 1.16.0 |
| Deployments | 7.33.0 | 1.18.0 | 2.10.0 | 1.16.0 |
| HorizontalPodAutoscalers | 7.33.0 | 7.51.0 | 2.10.0 | 1.1.1 |
| Ingresses | 7.33.0 | 1.22.0 | 2.30.7 | 1.21.0 |
| Jobs | 7.33.0 | 1.18.0 | 2.15.5 | 1.16.0 |
| Namespaces | 7.33.0 | 7.41.0 | 2.30.9 | 1.17.0 |
| Nodes | 7.33.0 | 1.18.0 | 2.10.0 | 1.17.0 |
| PersistentVolumes | 7.33.0 | 1.18.0 | 2.30.4 | 1.17.0 |
| PersistentVolumeClaims | 7.33.0 | 1.18.0 | 2.30.4 | 1.17.0 |
| Pods | 7.33.0 | 1.18.0 | 3.9.0 | 1.17.0 |
| ReplicaSets | 7.33.0 | 1.18.0 | 2.10.0 | 1.16.0 |
| RoleBindings | 7.33.0 | 1.19.0 | 2.30.9 | 1.14.0 |
| Roles | 7.33.0 | 1.19.0 | 2.30.9 | 1.14.0 |
| ServiceAccounts | 7.33.0 | 1.19.0 | 2.30.9 | 1.17.0 |
| Services | 7.33.0 | 1.18.0 | 2.10.0 | 1.17.0 |
| Statefulsets | 7.33.0 | 1.15.0 | 2.20.1 | 1.16.0 |
| VerticalPodAutoscalers | 7.33.0 | 7.46.0 | 3.6.8 | 1.16.0 |

**Note**: After version 1.22, Cluster Agent version numbering follows Agent release numbering, starting with version 7.39.0.

### Add custom tags to resources

You can add custom tags to Kubernetes resources to ease filtering inside the Kubernetes resources view.

Additional tags are added through the `DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS` environment variable.

**Note**: These tags only show up in the Kubernetes resources view.

{{< tabs >}}
{{% tab "Datadog Operator" %}}
Add the environment variable on both the Process Agent and the Cluster Agent by setting `agents.containers.processAgent.env` and `clusterAgent.env` in `datadog-agent.yaml`.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
  features:
    liveContainerCollection:
      enabled: true
    orchestratorExplorer:
      enabled: true
  override:
    agents:
      containers:
        processAgent:
          env:
            - name: "DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS"
              value: "tag1:value1 tag2:value2"
    clusterAgent:
      env:
        - name: "DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS"
          value: "tag1:value1 tag2:value2"
```

Then, apply the new configuration:

```bash
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}

If you are using the [official Helm chart][1], add the environment variable on both the Process Agent and the Cluster Agent by setting `agents.containers.processAgent.env` and `clusterAgent.env` in [values.yaml][2].

```yaml
agents:
  containers:
    processAgent:
      env:
        - name: "DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS"
          value: "tag1:value1 tag2:value2"
clusterAgent:
  env:
    - name: "DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS"
      value: "tag1:value1 tag2:value2"
```

Then, upgrade your Helm chart.

[1]: https://github.com/DataDog/helm-charts
[2]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml

{{% /tab %}}
{{% tab "DaemonSet" %}}

Set the environment variable on both the Process Agent and Cluster Agent containers:

```yaml
- name: DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS
  value: "tag1:value1 tag2:value2"
```

{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/containers
[2]: /infrastructure/containers


