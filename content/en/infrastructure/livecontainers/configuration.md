---
title: Live Containers Configuration
kind: documentation
further_reading:
- link: "/infrastructure/hostmap/"
  tag: "Documentation"
  text: "See all of your hosts together on one screen with the hostmap"
- link: "/infrastructure/process/"
  tag: "Documentation"
  text: "Understand what is going on at any level of your system"
---



### Kubernetes resources

The Datadog Agent and Cluster Agent can be configured to retrieve Kubernetes resources for [Live Containers][1]. This feature allows you to monitor the state of pods, deployments, and other Kubernetes concepts in a specific namespace or availability zone, view resource specifications for failed pods within a deployment, correlate node activity with related logs, and more.

Kubernetes resources for Live Containers requires [Agent version >= 7.27.0][2] and [Cluster Agent version >= 1.11.0][3]. For older versions of the Datadog Agent and Cluster Agent, see [Live Containers Legacy Configuration][4].

{{< tabs >}}
{{% tab "Helm" %}}

If you are using the official [Datadog Helm Chart][1]:

- Use chart version >= 2.10.0. Ensure the Agent and Cluster Agent versions are hardcoded with the minimum versions required (or above) in your Helm chart [values.yaml][2] file.
- Enable the Process Agent. You can do this by modifying your `datadog-values.yaml` file to include:

    ```yaml
    datadog:
        # (...)
        processAgent:
            enabled: true
    ```
- Deploy a new release.

In some setups, the Process Agent and Cluster Agent cannot automatically detect a Kubernetes cluster name. If this happens, the feature does not start, and the following warning displays in the Cluster Agent log: `Orchestrator explorer enabled but no cluster name set: disabling`. In this case, you must set `datadog.clusterName` to your cluster name in [values.yaml][2].

[1]: https://github.com/DataDog/helm-charts
[2]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "DaemonSet" %}}

[Cluster Agent][1] version >= 1.11.0 is required before configuring the DaemonSet. The Cluster Agent must be running, and the Agent must be able to communicate with it. See the [Cluster Agent Setup][2] for configuration.

1. Set the Cluster Agent container with the following environment variable:

    ```yaml
      - name: DD_ORCHESTRATOR_EXPLORER_ENABLED
        value: "true"
    ```

2. Set the Cluster Agent ClusterRole with the following RBAC permissions.

    Note in particular that for the `apps` and `batch` apiGroups, Live Containers need
    permissions to collect common Kubernetes resources (`pods`, `services`,
    `nodes`, etc.), which should be already in the RBAC if you followed [Cluster
    Agent Setup][2]. But if they are missing, ensure they are
    added (after `deployments`, `replicasets`):

    ```yaml
      ClusterRole:
      - apiGroups:  # To create the datadog-cluster-id ConfigMap
        - ""
        resources:
        - configmaps
        verbs:
        - create
        - get
        - update
      ...
      - apiGroups:  # Required to get the kube-system namespace UID and generate a cluster ID
        - ""
        resources:
        - namespaces
        verbs:
        - get
      ...
      - apiGroups:  # To collect new resource types
        - "apps"
        resources:
        - deployments
        - replicasets
        - daemonsets
        - statefulsets
        verbs:
        - list
        - get
        - watch
      - apiGroups:
        - "batch"
        resources:
        - cronjobs
        - jobs
        verbs:
        - list
        - get
        - watch
      - apiGroups:
       - networking.k8s.io
       resources:
       - ingresses
       verbs:
       - list
       - watch
      ...
    ```
    These permissions are needed to create a `datadog-cluster-id` ConfigMap in the same Namespace as the Agent DaemonSet and the Cluster Agent Deployment, as well as to collect supported Kubernetes resources.

    If the `cluster-id` ConfigMap isn't created by the Cluster Agent, the Agent pod cannot collect resources. In such a case, update the Cluster Agent permissions and restart its pods to let it create the ConfigMap, and then restart the Agent pod.

3. The Process Agent, which runs in the Agent DaemonSet, must be enabled and running (it doesn't need to run the process collection), and configured with the following options:

    ```yaml
    - name: DD_ORCHESTRATOR_EXPLORER_ENABLED
      value: "true"
    ```

In some setups, the Process Agent and Cluster Agent cannot automatically detect a Kubernetes cluster name. If this happens, the feature does not start, and the following warning displays in the Cluster Agent log: `Orchestrator explorer enabled but no cluster name set: disabling`. In this case, add the following options in the `env` section of both the Cluster Agent and the Process Agent:

  ```yaml
  - name: DD_CLUSTER_NAME
    value: "<YOUR_CLUSTER_NAME>"
  ```

[1]: /agent/cluster_agent/
[2]: /agent/cluster_agent/setup/
{{% /tab %}}
{{< /tabs >}}

### Resource collection compatibility matrix

The following table presents the list of collected resources and the minimal Agent, Cluster Agent, and Helm chart versions for each.

| Resource | Minimal Agent version | Minimal Cluster Agent version | Minimal Helm chart version |
|---|---|---|---|
| ClusterRoleBindings | 7.27.0 | 1.19.0 | 2.30.9 |
| ClusterRoles | 7.27.0 | 1.19.0 | 2.30.9 |
| Clusters | 7.27.0 | 1.12.0 | 2.10.0 |
| CronJobs | 7.27.0 | 1.13.1 | 2.15.5 |
| DaemonSets | 7.27.0 | 1.14.0 | 2.16.3 |
| Deployments | 7.27.0 | 1.11.0 | 2.10.0 |
| Ingresses | 7.27.0 | 1.22.0 | 2.30.7 |
| Jobs | 7.27.0 | 1.13.1 | 2.15.5 |
| Nodes | 7.27.0 | 1.11.0 | 2.10.0 |
| PersistentVolumes | 7.27.0 | 1.18.0 | 2.30.4 |
| PersistentVolumeClaims | 7.27.0 | 1.18.0 | 2.30.4 |
| Pods | 7.27.0 | 1.11.0 | 2.10.0 |
| ReplicaSets | 7.27.0 | 1.11.0 | 2.10.0 |
| RoleBindings | 7.27.0 | 1.19.0 | 2.30.9 |
| Roles | 7.27.0 | 1.19.0 | 2.30.9 |
| ServiceAccounts | 7.27.0 | 1.19.0 | 2.30.9 |
| Services | 7.27.0 | 1.11.0 | 2.10.0 |
| Statefulsets | 7.27.0 | 1.15.0 | 2.20.1 |

### Add custom tags to resources

You can add custom tags to Kubernetes resources to ease filtering inside the Kubernetes resources view.

Additional tags are added through the `DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS` environment variable.

**Note**: These tags only show up in the Kubernetes resources view.


{{< tabs >}}
{{% tab "Helm" %}}

If you are using the official Helm chart, add the environment variable on both the Process Agent and the Cluster Agent by setting `agents.containers.processAgent.env` and `clusterAgent.env` in [values.yaml][1].

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


Then, deploy a new release.

[1]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "DaemonSet" %}}

Set the environment variable on both the Process Agent and Cluster Agent containers:

```yaml
- name: DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS
  value: "tag1:value1 tag2:value2"
```

{{% /tab %}}
{{< /tabs >}}

### Include or exclude containers

It is possible to include and/or exclude containers from real-time collection:

* Exclude containers either by passing the environment variable `DD_CONTAINER_EXCLUDE` or by adding `container_exclude:` in your `datadog.yaml` main configuration file.
* Include containers either by passing the environment variable `DD_CONTAINER_INCLUDE` or by adding `container_include:` in your `datadog.yaml` main configuration file.

Both arguments take an **image name** as value. Regular expressions are also supported.

For example, to exclude all Debian images except containers with a name starting with *frontend*, add these two configuration lines in your `datadog.yaml` file:

```shell
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

```shell
password <MY_PASSWORD>
password=<MY_PASSWORD>
password: <MY_PASSWORD>
password::::== <MY_PASSWORD>
```

However, the scrubber does not scrub paths that contain sensitive words. For example, it does not overwrite `/etc/vaultd/secret/haproxy-crt.pem` with `/etc/vaultd/******/haproxy-crt.pem` even though `secret` is a sensitive word.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /infrastructure/livecontainers/configuration
[2]: /tagging/assigning_tags?tab=agentv6v7#host-tags
[3]: /getting_started/tagging/
[4]: /infrastructure/livecontainers/legacy
