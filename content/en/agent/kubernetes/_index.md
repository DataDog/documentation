---
title: Kubernetes
kind: documentation
aliases:
    - /guides/basic_agent_usage/kubernetes
    - /agent/basic_agent_usage/kubernetes
    - /tracing/kubernetes/
    - /tracing/setup/kubernetes
    - /integrations/faq/using-rbac-permission-with-your-kubernetes-integration
    - /integrations/faq/gathering-kubernetes-events
    - /agent/kubernetes/event_collection
    - /agent/kubernetes/daemonset_setup
    - /agent/kubernetes/helm
    - /agent/autodiscovery
further_reading:
    - link: 'agent/kubernetes/log'
      tag: 'Documentation'
      text: 'Collect your application logs'
    - link: '/agent/kubernetes/apm'
      tag: 'Documentation'
      text: 'Collect your application traces'
    - link: '/agent/kubernetes/prometheus'
      tag: 'Documentation'
      text: 'Collect your Prometheus metrics'
    - link: '/agent/kubernetes/integrations'
      tag: 'Documentation'
      text: 'Collect automatically your applications metrics and logs'
    - link: '/agent/guide/autodiscovery-management'
      tag: 'Documentation'
      text: 'Limit data collection to a subset of containers only'
    - link: '/agent/kubernetes/tag'
      tag: 'Documentation'
      text: 'Assign tags to all data emitted by a container'
---

## Overview

Run the Datadog Agent in your Kubernetes cluster as a DaemonSet in order to start collecting your cluster and applications metrics, traces, and logs. You can deploy it with a [Helm chart](?tab=helm) or directly with a [DaemonSet](?tab=daemonset) object YAML definition.

**Note**: Agent version 6.0 and above only support versions of Kubernetes higher than 1.7.6. For prior versions of Kubernetes, consult the [Legacy Kubernetes versions section][1].

## Installation

{{< tabs >}}
{{% tab "Helm" %}}

To install the chart with a custom release name, `<RELEASE_NAME>` (e.g. `datadog-agent`):

1. [Install Helm][1].
2. Download the [Datadog `values.yaml` configuration file][2].
3. If this is a fresh install, add the Helm Datadog repo and the Helm stable repo (for Kube State Metrics chart):
    ```bash
    helm repo add datadog https://helm.datadoghq.com
    helm repo add stable https://charts.helm.sh/stable
    helm repo update
    ```
4. Retrieve your Datadog API key from your [Agent installation instructions][3] and run:

- **Helm v3+**

    ```bash
    helm install <RELEASE_NAME> -f values.yaml  --set datadog.apiKey=<DATADOG_API_KEY> datadog/datadog --set targetSystem=<TARGET_SYSTEM>
    ```

    Replace `<TARGET_SYSTEM>` with the name of your OS: `linux` or `windows`.

- **Helm v1/v2**

    ```bash
    helm install -f values.yaml --name <RELEASE_NAME> --set datadog.apiKey=<DATADOG_API_KEY> datadog/datadog
    ```

This chart adds the Datadog Agent to all nodes in your cluster via a DaemonSet. It also optionally deploys the [kube-state-metrics chart][4] and uses it as an additional source of metrics about the cluster. A few minutes after installation, Datadog begins to report hosts and metrics.

Next, enable the Datadog features that you'd like to use: [APM][5], [Logs][6]

**Notes**:

- For a full list of the Datadog chart's configurable parameters and their default values, refer to the [Datadog Helm repository README][7].
- If Google Container Registry ([gcr.io/datadoghq][8]) is not accessible in your deployment region, use the Docker Hub registry with the images [datadog/agent][9] and [datadog/cluster-agent][10] with the following configuration in the `values.yaml` file:

    ```yaml
    agents:
      image:
        repository: datadog/agent

    clusterAgent:
      image:
        repository: datadog/cluster-agent

    clusterChecksRunner:
      image:
        repository: datadog/agent
    ```

### Upgrading from chart v1.x

The Datadog chart has been refactored in v2.0 to regroup the `values.yaml` parameters in a more logical way.

If your current chart version deployed is earlier than `v2.0.0`, follow the [migration guide][11] to map your previous settings with the new fields.

### Unprivileged

(Optional) To run an unprivileged installation, add the following in the `values.yaml` file:

```yaml
datadog:
  securityContext:
      runAsUser: <USER_ID>
      supplementalGroups:
        - <DOCKER_GROUP_ID>
```

where `<USER_ID>` is the UID to run the agent and `<DOCKER_GROUP_ID>` is the group ID owning the docker or containerd socket.

[1]: https://v3.helm.sh/docs/intro/install/
[2]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
[3]: https://app.datadoghq.com/account/settings#api
[4]: https://github.com/kubernetes/kube-state-metrics/tree/master/charts/kube-state-metrics
[5]: /agent/kubernetes/apm?tab=helm
[6]: /agent/kubernetes/log?tab=helm
[7]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog
[8]: https://gcr.io/datadoghq
[9]: https://hub.docker.com/r/datadog/agent
[10]: https://hub.docker.com/r/datadog/cluster-agent
[11]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/docs/Migration_1.x_to_2.x.md
{{% /tab %}}
{{% tab "DaemonSet" %}}

Take advantage of DaemonSets to deploy the Datadog Agent on all your nodes (or on specific nodes by [using nodeSelectors][1]).

To install the Datadog Agent on your Kubernetes cluster:

1. **Configure Agent permissions**: If your Kubernetes has role-based access control (RBAC) enabled, configure RBAC permissions for your Datadog Agent service account. From Kubernetes 1.6 onwards, RBAC is enabled by default. Create the appropriate ClusterRole, ServiceAccount, and ClusterRoleBinding with the following command:

    ```shell
    kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/clusterrole.yaml"

    kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/serviceaccount.yaml"

    kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/clusterrolebinding.yaml"
    ```

    **Note**: Those RBAC configurations are set for the `default` namespace by default. If you are in a custom namespace, update the `namespace` parameter before applying them.

2. **Create a secret that contains your Datadog API Key**. Replace the `<DATADOG_API_KEY>` below with [the API key for your organization][2]. This secret is used in the manifest to deploy the Datadog Agent.

    ```shell
    kubectl create secret generic datadog-agent --from-literal='api-key=<DATADOG_API_KEY>' --namespace="default"
    ```

     **Note**: This create a secret in the `default` namespace. If you are in a custom namespace, update the `namespace` parameter of the command before running it.

3. **Create the Datadog Agent manifest**. Create the `datadog-agent.yaml` manifest out of one of the following templates:

    | Metrics                   | Logs                      | APM                       | Process                   | NPM                       | Linux                   | Windows                 |
    |---------------------------|---------------------------|---------------------------|---------------------------|---------------------------|-------------------------|-------------------------|
    | <i class="icon-tick"></i> | <i class="icon-tick"></i> | <i class="icon-tick"></i> | <i class="icon-tick"></i> |                           | [Manifest template][3]  | [Manifest template][4]  |
    | <i class="icon-tick"></i> | <i class="icon-tick"></i> | <i class="icon-tick"></i> |                           |                           | [Manifest template][5]  | [Manifest template][6]  |
    | <i class="icon-tick"></i> | <i class="icon-tick"></i> |                           |                           |                           | [Manifest template][7]  | [Manifest template][8]  |
    | <i class="icon-tick"></i> |                           | <i class="icon-tick"></i> |                           |                           | [Manifest template][9]  | [Manifest template][10] |
    |                           |                           |                           |                           | <i class="icon-tick"></i> | [Manifest template][11] | no template             |
    | <i class="icon-tick"></i> |                           |                           |                           |                           | [Manifest template][12] | [Manifest template][13] |

     To enable trace collection completely, [extra steps are required on your application Pod configuration][14]. Refer also to the [logs][15], [APM][16], [processes][17], and [Network Performance Monitoring][18] documentation pages to learn how to enable each feature individually.

     **Note**: Those manifests are set for the `default` namespace by default. If you are in a custom namespace, update the `metadata.namespace` parameter before applying them.

4. **Set your Datadog site** to {{< region-param key="dd_site" code="true" >}} using the `DD_SITE` environment variable in the `datadog-agent.yaml` manifest.

5. **Deploy the DaemonSet** with the command:

    ```shell
    kubectl apply -f datadog-agent.yaml
    ```

6. **Verification**: To verify the Datadog Agent is running in your environment as a DaemonSet, execute:

    ```shell
    kubectl get daemonset
    ```

     If the Agent is deployed, you will see output similar to the text below, where `DESIRED` and `CURRENT` are equal to the number of nodes running in your cluster.

    ```shell
    NAME            DESIRED   CURRENT   READY     UP-TO-DATE   AVAILABLE   NODE SELECTOR   AGE
    datadog-agent   2         2         2         2            2           <none>          10s
    ```

7. Optional - **Setup Kubernetes State metrics**: Download the [Kube-State manifests folder][19] and apply them to your Kubernetes cluster to automatically collects [kube-state metrics][20]:

    ```shell
    kubectl apply -f <NAME_OF_THE_KUBE_STATE_MANIFESTS_FOLDER>
    ```

### Unprivileged

(Optional) To run an unprivileged installation, add the following to your [pod template][2]:

```yaml
  spec:
    securityContext:
      runAsUser: <USER_ID>
      supplementalGroups:
        - <DOCKER_GROUP_ID>
```

where `<USER_ID>` is the UID to run the agent and `<DOCKER_GROUP_ID>` is the group ID owning the docker or containerd socket.

[1]: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#nodeselector
[2]: https://app.datadoghq.com/account/settings#api
[3]: /resources/yaml/datadog-agent-all-features.yaml
[4]: /resources/yaml/datadog-agent-windows-all-features.yaml
[5]: /resources/yaml/datadog-agent-logs-apm.yaml
[6]: /resources/yaml/datadog-agent-windows-logs-apm.yaml
[7]: /resources/yaml/datadog-agent-logs.yaml
[8]: /resources/yaml/datadog-agent-windows-logs.yaml
[9]: /resources/yaml/datadog-agent-apm.yaml
[10]: /resources/yaml/datadog-agent-windows-apm.yaml
[11]: /resources/yaml/datadog-agent-npm.yaml
[12]: /resources/yaml/datadog-agent-vanilla.yaml
[13]: /resources/yaml/datadog-agent-windows-vanilla.yaml
[14]: /agent/kubernetes/apm/#setup
[15]: /agent/kubernetes/log/
[16]: /agent/kubernetes/apm/
[17]: /infrastructure/process/?tab=kubernetes#installation
[18]: /network_monitoring/performance/setup/
[19]: https://github.com/kubernetes/kube-state-metrics/tree/master/examples/standard
[20]: /agent/kubernetes/data_collected/#kube-state-metrics
{{% /tab %}}
{{% tab "Operator" %}}

<div class="alert alert-warning">The Datadog Operator is in public beta. If you have any feedback or questions, contact <a href="/help">Datadog support</a>.</div>

[The Datadog Operator][1] is a way to deploy the Datadog Agent on Kubernetes and OpenShift. It reports deployment status, health, and errors in its Custom Resource status, and it limits the risk of misconfiguration thanks to higher-level configuration options.

## Prerequisites

Using the Datadog Operator requires the following prerequisites:

- **Kubernetes Cluster version >= v1.14.X**: Tests were done on versions >= `1.14.0`. Still, it should work on versions `>= v1.11.0`. For earlier versions, because of limited CRD support, the Operator may not work as expected.
- [`Helm`][2] for deploying the `datadog-operator`.
- [`Kubectl` CLI][3] for installing the `datadog-agent`.

## Deploy an Agent with the Operator

To deploy a Datadog Agent with the Operator in the minimum number of steps, use the [`datadog-agent-with-operator`][4] Helm chart.
Here are the steps:

1. Install the [Datadog Operator][5]:

   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm install my-datadog-operator datadog/datadog-operator
   ```

2. Create a Kubernetes secret with your API and app keys

   ```shell
   kubectl create secret generic datadog-secret --from-literal api-key=<DATADOG_API_KEY> --from-literal app-key=<DATADOG_APP_KEY>
   ```
   Replace `<DATADOG_API_KEY>` and `<DATADOG_APP_KEY>` with your [Datadog API and application keys][6]

2. Create a file with the spec of your Datadog Agent deployment configuration. The simplest configuration is:

   ```yaml
   apiVersion: datadoghq.com/v1alpha1
   kind: DatadogAgent
   metadata:
     name: datadog
   spec:
     credentials:
       apiSecret:
         secretName: datadog-secret
         keyName: api-key
       appSecret:
         secretName: datadog-secret
         keyName: app-key
     agent:
       image:
         name: "gcr.io/datadoghq/agent:latest"
     clusterAgent:
       image:
         name: "gcr.io/datadoghq/cluster-agent:latest"
   ```

3. Deploy the Datadog Agent with the above configuration file:
   ```shell
   kubectl apply -f agent_spec=/path/to/your/datadog-agent.yaml
   ```

## Cleanup

The following command deletes all the Kubernetes resources created by the above instructions:

```shell
kubectl delete datadogagent datadog
helm delete my-datadog-operator
```

For further details on setting up Operator, including information about using tolerations, refer to the [Datadog Operator advanced setup guide][7].

## Unprivileged

(Optional) To run an unprivileged installation, add the following to the [Datadog custom resource (CR)][8]:

```yaml
agent:
  config:
    securityContext:
      runAsUser: <USER_ID>
      supplementalGroups:
        - <DOCKER_GROUP_ID>
```

where `<USER_ID>` is the UID to run the agent and `<DOCKER_GROUP_ID>` is the group ID owning the Docker or containerd socket.

[1]: https://github.com/DataDog/datadog-operator
[2]: https://helm.sh
[3]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[4]: https://github.com/DataDog/datadog-operator/tree/master/chart/datadog-agent-with-operator
[5]: https://artifacthub.io/packages/helm/datadog/datadog-operator
[6]: https://app.datadoghq.com/account/settings#api
[7]: /agent/guide/operator-advanced
[8]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.md
{{% /tab %}}
{{< /tabs >}}

## Additional configuration

### Kubernetes resources for live containers

The [Datadog Agent][2] and [Cluster Agent][3] can be configured to retrieve Kubernetes resources for [Live Containers][4]. This feature allows you to monitor the state of pods, deployments and other Kubernetes concepts in a specific namespace or availability zone, view resource specifications for failed pods within a deployment, correlate node activity with related logs, and more.

See the [Live Containers][5] documentation for configuration instructions and additional information.

## Event collection

{{< tabs >}}
{{% tab "Helm" %}}

Set the `datadog.leaderElection`, `datadog.collectEvents` and `agents.rbac.create` options to `true` in your `value.yaml` file in order to enable Kubernetes event collection.

{{% /tab %}}
{{% tab "DaemonSet" %}}

If you want to collect events from your Kubernetes cluster set the environment variables `DD_COLLECT_KUBERNETES_EVENTS` and `DD_LEADER_ELECTION` to `true` in your Agent manifest. Alternatively, use the [Datadog Cluster Agent Event collection][1]

[1]: /agent/cluster_agent/event_collection/
{{% /tab %}}
{{% tab "Operator" %}}

Set `agent.config.collectEvents` to `true` in your `datadog-agent.yaml` manifest.

For example:

```
agent:
  config:
    collectEvents: true
```

{{% /tab %}}
{{< /tabs >}}

## Integrations

Once the Agent is up and running in your cluster, use [Datadog's Autodiscovery feature][6] to collect metrics and logs automatically from your pods.

## Environment variables

Find below the list of environment variables available for the Datadog Agent. If you want to setup those with Helm, see the full list of configuration options for the `datadog-value.yaml` file in the [helm/charts Github repository][7].

### Global options

| Env Variable         | Description                                                                                                                                                                                                                                                                                                                                      |
|----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_API_KEY`         | Your Datadog API key (**required**)                                                                                                                                                                                                                                                                                                              |
| `DD_ENV`             | Sets the global `env` tag for all data emitted.                                                                                                                                                                                                                                                                                                  |
| `DD_HOSTNAME`        | Hostname to use for metrics (if autodetection fails)                                                                                                                                                                                                                                                                                             |
| `DD_TAGS`            | Host tags separated by spaces. For example: `simple-tag-0 tag-key-1:tag-value-1`                                                                                                                                                                                                                                                                 |
| `DD_SITE`            | Destination site for your metrics, traces, and logs. Your `DD_SITE` is {{< region-param key="dd_site" code="true">}}. Defaults to `datadoghq.com`.                                                                                                                                                                                               |
| `DD_DD_URL`          | Optional setting to override the URL for metric submission.                                                                                                                                                                                                                                                                                      |
| `DD_CHECK_RUNNERS`   | The Agent runs all checks concurrently by default (default value = `4` runners). To run the checks sequentially, set the value to `1`. If you need to run a high number of checks (or slow checks) the `collector-queue` component might fall behind and fail the healthcheck. You can increase the number of runners to run checks in parallel. |
| `DD_LEADER_ELECTION` | If multiple Agent are running in your cluster, set this variable to `true` to avoid the duplication of event collection.                                                                                                                                                                                                                         |

### Proxy settings

Starting with Agent v6.4.0 (and v6.5.0 for the Trace Agent), you can override the Agent proxy settings with the following environment variables:

| Env Variable             | Description                                                            |
|--------------------------|------------------------------------------------------------------------|
| `DD_PROXY_HTTP`          | An HTTP URL to use as a proxy for `http` requests.                     |
| `DD_PROXY_HTTPS`         | An HTTPS URL to use as a proxy for `https` requests.                   |
| `DD_PROXY_NO_PROXY`      | A space-separated list of URLs for which no proxy should be used.      |
| `DD_SKIP_SSL_VALIDATION` | An option to test if the Agent is having issues connecting to Datadog. |

For more information about proxy settings, see the [Agent v6 Proxy documentation][8].

### Optional collection Agents

Optional collection Agents are disabled by default for security or performance reasons. Use these environment variables to enable them:

| Env Variable                    | Description                                                                                                                                                                                                                                                  |
|---------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_APM_ENABLED`                | Enable [trace collection][5] with the Trace Agent.                                                                                                                                                                                                           |
| `DD_LOGS_ENABLED`               | Enable [log collection][6] with the Logs Agent.                                                                                                                                                                                                              |
| `DD_PROCESS_AGENT_ENABLED`      | Enable [live process collection][7] with the Process Agent. The [live container view][8] is already enabled by default if the Docker socket is available. If set to `false`, the [live process collection][7] and the [live container view][8] are disabled. |
| `DD_COLLECT_KUBERNETES_EVENTS ` | Enable event collection with the Agent. If you are running multiple Agent in your cluster, set `DD_LEADER_ELECTION` to `true` as well.                                                                                                                       |

To enable the Live Container view, make sure you are running the process agent in addition to setting DD_PROCESS_AGENT_ENABLED to `true`.

### DogStatsD (custom metrics)

Send custom metrics with [the StatsD protocol][9]:

| Env Variable                     | Description                                                                                                                                                |
|----------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` | Listen to DogStatsD packets from other containers (required to send custom metrics).                                                                       |
| `DD_HISTOGRAM_PERCENTILES`       | The histogram percentiles to compute (separated by spaces). The default is `0.95`.                                                                         |
| `DD_HISTOGRAM_AGGREGATES`        | The histogram aggregates to compute (separated by spaces). The default is "max median avg count".                                                          |
| `DD_DOGSTATSD_SOCKET`            | Path to the Unix socket to listen to. Must be in a `rw` mounted volume.                                                                                    |
| `DD_DOGSTATSD_ORIGIN_DETECTION`  | Enable container detection and tagging for unix socket metrics.                                                                                            |
| `DD_DOGSTATSD_TAGS`              | Additional tags to append to all metrics, events, and service checks received by this DogStatsD server, for example: `"env:golden group:retrievers"`. |

Learn more about [DogStatsD over Unix Domain Sockets][10].

### Tagging

Datadog automatically collects common tags from Kubernetes. To extract even more tags, use the following options:

| Env Variable                            | Description             |
|-----------------------------------------|-------------------------|
| `DD_KUBERNETES_POD_LABELS_AS_TAGS`      | Extract pod labels      |
| `DD_KUBERNETES_POD_ANNOTATIONS_AS_TAGS` | Extract pod annotations |

See the [Kubernetes Tag Extraction][11] documentation to learn more.

### Using secret files

Integration credentials can be stored in Docker or Kubernetes secrets and used in Autodiscovery templates. For more information, see the [Secrets Management documentation][12].

### Ignore containers

Exclude containers from logs collection, metrics collection, and Autodiscovery. Datadog excludes Kubernetes and OpenShift `pause` containers by default. These allowlists and blocklists apply to Autodiscovery only; traces and DogStatsD are not affected. The value for these environment variables support regular expressions.

| Env Variable                   | Description                                                                                                                                                                                                                        |
|--------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_CONTAINER_INCLUDE`         | Allowlist of containers to include (separated by spaces). Use `.*` to include all. For example: `"image:image_name_1 image:image_name_2"`, `image:.*`                                                                              |
| `DD_CONTAINER_EXCLUDE`         | Blocklist of containers to exclude (separated by spaces). Use `.*` to exclude all. For example: `"image:image_name_3 image:image_name_4"`, `image:.*`                                                                              |
| `DD_CONTAINER_INCLUDE_METRICS` | Allowlist of containers whose metrics you wish to include.                                                                                                                                                                         |
| `DD_CONTAINER_EXCLUDE_METRICS` | Blocklist of containers whose metrics you wish to exclude.                                                                                                                                                                         |
| `DD_CONTAINER_INCLUDE_LOGS`    | Allowlist of containers whose logs you wish to include.                                                                                                                                                                            |
| `DD_CONTAINER_EXCLUDE_LOGS`    | Blocklist of containers whose logs you wish to exclude.                                                                                                                                                                            |
| `DD_AC_INCLUDE`                | **Deprecated**. Allowlist of containers to include (separated by spaces). Use `.*` to include all. For example: `"image:image_name_1 image:image_name_2"`, `image:.*`                                                              |
| `DD_AC_EXCLUDE`                | **Deprecated**. Blocklist of containers to exclude (separated by spaces). Use `.*` to exclude all. For example: `"image:image_name_3 image:image_name_4"` (**Note**: This variable is only honored for Autodiscovery.), `image:.*` |

Additional examples are available on the [Container Discover Management][13] page.

**Note**: The `kubernetes.containers.running`, `kubernetes.pods.running`, `docker.containers.running`, `.stopped`, `.running.total` and `.stopped.total` metrics are not affected by these settings. All containers are counted. This does not affect your per-container billing.

### Misc

| Env Variable                        | Description                                                                                                                                                                                                                                                         |
|-------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_PROCESS_AGENT_CONTAINER_SOURCE` | Overrides container source auto-detection to force a single source. e.g `"docker"`, `"ecs_fargate"`, `"kubelet"`                                                                                                                                                    |
| `DD_HEALTH_PORT`                    | Set this to `5555` to expose the Agent health check at port `5555`.                                                                                                                                                                                                 |
| `DD_CLUSTER_NAME`                   | Set a custom Kubernetes cluster identifier to avoid host alias collisions. The cluster name can be up to 40 characters with the following restrictions: Lowercase letters, numbers, and hyphens only. Must start with a letter. Must end with a number or a letter. |

You can add extra listeners and config providers using the `DD_EXTRA_LISTENERS` and `DD_EXTRA_CONFIG_PROVIDERS` environment variables. They are added in addition to the variables defined in the `listeners` and `config_providers` section of the `datadog.yaml` configuration file.

## Commands

See the [Agent Commands guides][14] to discover all the Docker Agent commands.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/faq/kubernetes-legacy/
[2]: /agent/
[3]: /agent/cluster_agent/
[4]: https://app.datadoghq.com/containers
[5]: /infrastructure/livecontainers/?tab=helm#configuration
[6]: /agent/kubernetes/integrations/
[7]: https://github.com/DataDog/helm-charts/tree/master/charts/datadog#all-configuration-options
[8]: /agent/proxy/#agent-v6
[9]: /developers/dogstatsd/
[10]: /developers/dogstatsd/unix_socket/
[11]: /agent/kubernetes/tag/
[12]: /security/agent/#secrets-management
[13]: /agent/guide/autodiscovery-management/
[14]: /agent/guide/agent-commands/
