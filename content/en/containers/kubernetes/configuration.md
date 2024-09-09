---
title: Further Configure the Datadog Agent on Kubernetes
aliases:
    - /integrations/faq/gathering-kubernetes-events
    - /agent/kubernetes/event_collection
    - /agent/kubernetes/configuration
---

## Overview

After you have installed the Datadog Agent in your Kubernetes environment, you may choose additional configuration options.

### Enable Datadog to collect:
- [Traces (APM)](#enable-apm-and-tracing)
- [Kubernetes events](#enable-kubernetes-event-collection)
- [NPM](#enable-npm-collection)
- [Logs](#enable-log-collection)
- [Processes](#enable-process-collection)

### Other capabilities
- [Datadog Cluster Agent](#datadog-cluster-agent)
- [Integrations](#integrations)
- [Containers view](#containers-view)
- [Orchestrator Explorer](#orchestrator-explorer)
- [External metrics server](#custom-metrics-server)

### More configurations
- [Environment variables](#environment-variables)
- [DogStatsD for custom metrics](#configure-dogstatsd)
- [Tag mapping](#configure-tag-mapping)
- [Secrets](#using-secret-files)
- [Ignore containers](#ignore-containers)
- [Kubernetes API server timeout](#kubernetes-api-server-timeout)
- [Proxy settings](#proxy-settings)
- [Autodiscovery](#autodiscovery)
- [Miscellaneous](#miscellaneous)

## Enable APM and tracing

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Edit your `datadog-agent.yaml` to set `features.apm.enabled` to `true`.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>

  features:
    apm:
      enabled: true
```

{{% k8s-operator-redeploy %}}

{{% /tab %}}
{{% tab "Helm" %}}

In Helm, APM is **enabled by default** over UDS or Windows named pipe.

To verify, ensure that `datadog.apm.socketEnabled` is set to `true` in your `values.yaml`.

```yaml
datadog:
  apm:
    socketEnabled: true    
```

{{% /tab %}}
{{< /tabs >}}

For more information, see [Kubernetes Trace Collection][16].

## Enable Kubernetes event collection

Use the [Datadog Cluster Agent][2] to collect Kubernetes events. 

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Event collection is enabled by default by the Datadog Operator. This can be managed in the configuration `features.eventCollection.collectKubernetesEvents` in your `datadog-agent.yaml`.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
    site: <DATADOG_SITE>

  features:
    eventCollection:
      collectKubernetesEvents: true
```

{{% /tab %}}
{{% tab "Helm" %}}

To collect Kubernetes events with the Datadog Cluster Agent, ensure that the `clusterAgent.enabled`, `datadog.collectEvents` and `clusterAgent.rbac.create` options are set to `true` in your `datadog-values.yaml` file.

```yaml
datadog:
  collectEvents: true
clusterAgent:
  enabled: true
  rbac: 
    create: true
```

If you don't want to use the Cluster Agent, you can still have a Node Agent collect Kubernetes events by setting `datadog.leaderElection`, `datadog.collectEvents`, and `agents.rbac.create` options to `true` in your `datadog-values.yaml` file.

```yaml
datadog:
  leaderElection: true
  collectEvents: true
agents:
  rbac:
    create: true
```

[1]: /containers/cluster_agent

{{% /tab %}}
{{< /tabs >}}

For DaemonSet configuration, see [DaemonSet Cluster Agent event collection][14].

## Enable NPM collection

{{< tabs >}}
{{% tab "Datadog Operator" %}}

In your `datadog-agent.yaml`, set `features.npm.enabled` to `true`.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>

  features:
    npm:
      enabled: true
```

Then apply the new configuration:

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}

Update your `datadog-values.yaml` with the following configuration:

```yaml
datadog:
  # (...)
  networkMonitoring:
    enabled: true
```

Then upgrade your Helm chart:

```shell
helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
```

{{% /tab %}}
{{< /tabs >}}

For more information, see [Network Performance Monitoring][18].

## Enable log collection

{{< tabs >}}
{{% tab "Datadog Operator" %}}
In your `datadog-agent.yaml`, set `features.logCollection.enabled` and `features.logCollection.containerCollectAll` to `true`.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>

  features:
    logCollection:
      enabled: true
      containerCollectAll: true
```

Then apply the new configuration:

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}
Update your `datadog-values.yaml` with the following configuration:

```yaml
datadog:
  # (...)
  logs:
    enabled: true
    containerCollectAll: true
```

Then upgrade your Helm chart:

```shell
helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
```
{{% /tab %}}
{{< /tabs >}}

For more information, see [Kubernetes log collection][17].

## Enable process collection

{{< tabs >}}
{{% tab "Datadog Operator" %}}
In your `datadog-agent.yaml`, set `features.liveProcessCollection.enabled` to `true`.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>

  features:
    liveProcessCollection:
      enabled: true
```

Then apply the new configuration:

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}
Update your `datadog-values.yaml` with the following configuration:

```yaml
datadog:
  # (...)
  processAgent:
    enabled: true
    processCollection: true
```

Then upgrade your Helm chart:

```shell
helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
```
{{% /tab %}}
{{< /tabs >}}

For more information, see [Live Processes][23]
## Datadog Cluster Agent

The Datadog Cluster Agent provides a streamlined, centralized approach to collecting cluster level monitoring data. Datadog strongly recommends using the Cluster Agent for monitoring Kubernetes.

The Datadog Operator v1.0.0+ and Helm chart v2.7.0+ **enable the Cluster Agent by default**. No further configuration is necessary.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

The Datadog Operator v1.0.0+ enables the Cluster Agent by default. The Operator creates the necessary RBACs and deploys the Cluster Agent. Both Agents use the same API key.

The Operator automatically generates a random token in a Kubernetes `Secret` to be shared by the Datadog Agent and Cluster Agent for secure communication. 

You can manually specify this token in the `global.clusterAgentToken` field in your `datadog-agent.yaml`:

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
    clusterAgentToken: <DATADOG_CLUSTER_AGENT_TOKEN>
```

Alternatively, you can specify this token by referencing the name of an existing `Secret` and the data key containing this token:

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
    clusterAgentTokenSecret: 
      secretName: <SECRET_NAME>
      keyName: <KEY_NAME>
```

**Note**: When set manually, this token must be 32 alphanumeric characters.

Then apply the new configuration:

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}

Helm chart v2.7.0+ enables the Cluster Agent by default.

For verification, ensure that `clusterAgent.enabled` is set to `true` in your `datadog-values.yaml`:

```yaml
clusterAgent:
  enabled: true
```

Helm automatically generates a random token in a Kubernetes `Secret` to be shared by the Datadog Agent and Cluster Agent for secure communication. 

You can manually specify this token in the `clusterAgent.token` field in your `datadog-agent.yaml`:

```yaml
clusterAgent:
  enabled: true
  token: <DATADOG_CLUSTER_AGENT_TOKEN>
```

Alternatively, you can specify this token by referencing the name of an existing `Secret`, where the token is in a key named `token`:

```yaml
clusterAgent:
  enabled: true
  tokenExistingSecret: <SECRET_NAME>
```

{{% /tab %}}
{{< /tabs >}}

For more information, see the [Datadog Cluster Agent documentation][2].

## Custom metrics server

To use the Cluster Agent's [custom metrics server][22] feature, you must supply a Datadog [application key][24] and enable the metrics provider.

{{< tabs >}}
{{% tab "Datadog Operator" %}}
In `datadog-agent.yaml`, supply an application key under `spec.global.credentials.appKey` and set `features.externalMetricsServer.enabled` to `true`.

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
    externalMetricsServer:
      enabled: true
```

Then apply the new configuration:

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```
{{% /tab %}}
{{% tab "Helm" %}}
In `datadog-values.yaml`, supply an application key under `datadog.appKey` and set `clusterAgent.metricsProvider.enabled` to `true`.

```yaml
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>

clusterAgent:
  enabled: true
  metricsProvider:
    enabled: true
```

Then upgrade your Helm chart:

```shell
helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
```

{{% /tab %}}
{{< /tabs >}}

## Integrations

Once the Agent is up and running in your cluster, use [Datadog's Autodiscovery feature][5] to collect metrics and logs automatically from your pods.

## Containers view

To make use of Datadog's [Container Explorer][3], enable the Process Agent. The Datadog Operator and Helm chart **enable the Process Agent by default**. No further configuration is necessary.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

The Datadog Operator enables the Process Agent by default. 

For verification, ensure that `features.liveContainerCollection.enabled` is set to `true` in your `datadog-agent.yaml`:

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
```

{{% /tab %}}
{{% tab "Helm" %}}

The Helm chart enables the Process Agent by default.

For verification, ensure that `processAgent.enabled` is set to `true` in your `datadog-values.yaml`:

```yaml
datadog:
  # (...)
  processAgent:
    enabled: true
```

In some setups, the Process Agent and Cluster Agent cannot automatically detect a Kubernetes cluster name. If this happens, the feature does not start, and the following warning displays in the Cluster Agent log: `Orchestrator explorer enabled but no cluster name set: disabling.` In this case, you must set `datadog.clusterName` to your cluster name in `values.yaml`.

```yaml
datadog:
  #(...)
  clusterName: <YOUR_CLUSTER_NAME>
  #(...)
  processAgent:
    enabled: true
```

[1]: https://github.com/DataDog/helm-charts
[2]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{< /tabs >}}

See the [Containers view][15] documentation for additional information.

## Orchestrator Explorer

The Datadog Operator and Helm chart **enable Datadog's [Orchestrator Explorer][20] by default**. No further configuration is necessary.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

The Orchestrator Explorer is enabled in the Datadog Operator by default. 

For verification, ensure that the `features.orchestratorExplorer.enabled` parameter is set to `true` in your `datadog-agent.yaml`:

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
    orchestratorExplorer:
      enabled: true
```

{{% /tab %}}
{{% tab "Helm" %}}

The Helm chart enables Orchestrator Explorer by default.

For verification, ensure that the `orchestratorExplorer.enabled` parameter is set to `true` in your `datadog-values.yaml` file:

```yaml
datadog:
  # (...)
  processAgent:
    enabled: true
  orchestratorExplorer:
    enabled: true
```

{{% /tab %}}
{{< /tabs >}}

See the [Orchestrator Explorer documentation][21] for additional information.

## Basic configuration

Use the following configuration fields to configure the Datadog Agent.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

| Parameter (v2alpha1) |  Description |
| --------------------------- | ----------- |
| `global.credentials.apiKey` |  Configures your Datadog API key. |
| `global.credentials.apiSecret.secretName` | Instead of `global.credentials.apiKey`, supply the name of a Kubernetes `Secret` containing your Datadog API key.|
| `global.credentials.apiSecret.keyName` | Instead of `global.credentials.apiKey`, supply the key of the Kubernetes `Secret` named in `global.credentials.apiSecret.secretName`.|
| `global.credentials.appKey` |  Configures your Datadog application key. If you are using the external metrics server, you must set a Datadog application key for read access to your metrics. |
| `global.credentials.appSecret.secretName` | Instead of `global.credentials.apiKey`, supply the name of a Kubernetes `Secret` containing your Datadog app key.|
| `global.credentials.appSecret.keyName` | Instead of `global.credentials.apiKey`, supply the key of the Kubernetes `Secret` named in `global.credentials.appSecret.secretName`.|
| `global.logLevel` | Sets logging verbosity. This can be overridden by the container. Valid log levels are: `trace`, `debug`, `info`, `warn`, `error`, `critical`, and `off`. Default: `info`. |
| `global.registry` | Image registry to use for all Agent images. Default: `gcr.io/datadoghq`. |
| `global.site` | Sets the Datadog [intake site][1] to which Agent data is sent. Your site is {{< region-param key="dd_site" code="true" >}}. (Ensure the correct SITE is selected on the right). |
| `global.tags` | A list of tags to attach to every metric, event, and service check collected. |

For a complete list of configuration fields for the Datadog Operator, see the [Operator v2alpha1 spec][2]. For older versions, see the [Operator v1alpha1 spec][3]. Configuration fields can also be queried using `kubectl explain datadogagent --recursive`.

[1]: /getting_started/
[2]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md
[3]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v1alpha1.md 
{{% /tab %}}
{{% tab "Helm" %}}
|  Helm | Description |
|  ---- | ----------- |
|  `datadog.apiKey` | Configures your Datadog API key. |
| `datadog.apiKeyExistingSecret` | Instead of `datadog.apiKey`, supply the name of an existing Kubernetes `Secret` containing your Datadog API key, set with the key name `api-key`. |
|  `datadog.appKey` | Configures your Datadog application key. If you are using the external metrics server, you must set a Datadog application key for read access to your metrics. |
| `datadog.appKeyExistingSecret` | Instead of `datadog.appKey`, supply the name of an existing Kubernetes `Secret` containing your Datadog app key, set with the key name `app-key`. |
| `datadog.logLevel` | Sets logging verbosity. This can be overridden by the container. Valid log levels are: `trace`, `debug`, `info`, `warn`, `error`, `critical`, and `off`. Default: `info`. |
| `registry` | Image registry to use for all Agent images. Default: `gcr.io/datadoghq`. |
| `datadog.site` | Sets the Datadog [intake site][1] to which Agent data is sent. Your site is {{< region-param key="dd_site" code="true" >}}. (Ensure the correct SITE is selected on the right). |
| `datadog.tags` | A list of tags to attach to every metric, event, and service check collected. |

For a complete list of environment variables for the Helm chart, see the [full list of options][2] for `datadog-values.yaml`.

[1]: /getting_started/site
[2]: https://github.com/DataDog/helm-charts/tree/main/charts/datadog#all-configuration-options
{{% /tab %}}
{{% tab "DaemonSet" %}}
| Env Variable         | Description                                                                                                                                                                                                                                                                                                                                      |
|----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_API_KEY`         | Your Datadog API key (**required**)                                                                                                                                                                                                                                                                                                              |
| `DD_ENV`             | Sets the global `env` tag for all data emitted.                                                                                                                                                                                                                                                                                                  |
| `DD_HOSTNAME`        | Hostname to use for metrics (if autodetection fails)                                                                                                                                                                                                                                                                                             |
| `DD_TAGS`            | Host tags separated by spaces. For example: `simple-tag-0 tag-key-1:tag-value-1`                                                                                                                                                                                                                                                                 |
| `DD_SITE`            | Destination site for your metrics, traces, and logs. Your `DD_SITE` is {{< region-param key="dd_site" code="true">}}. Defaults to `datadoghq.com`.                                                                                                                                                                                               |
| `DD_DD_URL`          | Optional setting to override the URL for metric submission.                                                                                                                                                                                                                                                                                      |
| `DD_URL` (6.36+/7.36+)            | Alias for `DD_DD_URL`. Ignored if `DD_DD_URL` is already set.                                                                                                                                                                                                                                                                                    |
| `DD_CHECK_RUNNERS`   | The Agent runs all checks concurrently by default (default value = `4` runners). To run the checks sequentially, set the value to `1`. If you need to run a high number of checks (or slow checks) the `collector-queue` component might fall behind and fail the healthcheck. You can increase the number of runners to run checks in parallel. |
| `DD_LEADER_ELECTION` | If multiple instances of the Agent are running in your cluster, set this variable to `true` to avoid the duplication of event collection.                                                                                                                                                                                                                         |
{{% /tab %}}
{{< /tabs >}}

## Environment variables
The containerized Datadog Agent can be configured by using environment variables. For an extensive list of supported environment variables, see the [Environment variables][26] section of the Docker Agent documentation.

### Examples
{{< tabs >}}
{{% tab "Datadog Operator" %}}
When using the Datadog Operator, you can set additional environment variables in `override` for a component with `[key].env []object`, or for a container with `[key].containers.[key].env []object`. The following keys are supported: 

- `nodeAgent`
- `clusterAgent`
- `clusterChecksRunner`

Container-level settings take priority over any component-level settings.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  override:
    nodeAgent:
      env:
        - name: <ENV_VAR_NAME>
          value: <ENV_VAR_VALUE>
    clusterAgent:
      containers:
        cluster-agent:
          env:
            - name: <ENV_VAR_NAME>
              value: <ENV_VAR_VALUE>
```

{{% /tab %}}
{{% tab "Helm" %}}

```yaml
datadog:
  env:
  - name: <ENV_VAR_NAME>
    value: <ENV_VAR_VALUE>
clusterAgent:
  env:
  - name: <ENV_VAR_NAME>
    value: <ENV_VAR_VALUE>
```

{{% /tab %}}
{{% tab "DaemonSet" %}}
Add environment variables to the DaemonSet or Deployment (for Datadog Cluster Agent).
```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: datadog
spec:
  template:
    spec:
      containers:
        - name: agent
          ...
          env:
            - name: <ENV_VAR_NAME>
              value: <ENV_VAR_VALUE>
```

{{% /tab %}}
{{< /tabs >}}

## Configure DogStatsD

DogStatsD can send custom metrics over UDP with the StatsD protocol. **DogStatsD is enabled by default by the Datadog Operator and Helm**. See the [DogStatsD documentation][19] for more information.

You can use the following environment variables to configure DogStatsD with DaemonSet:

| Env Variable                     | Description                                                                                                                                                |
|----------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` | Listen to DogStatsD packets from other containers (required to send custom metrics).                                                                       |
| `DD_HISTOGRAM_PERCENTILES`       | The histogram percentiles to compute (separated by spaces). The default is `0.95`.                                                                         |
| `DD_HISTOGRAM_AGGREGATES`        | The histogram aggregates to compute (separated by spaces). The default is `"max median avg count"`.                                                          |
| `DD_DOGSTATSD_SOCKET`            | Path to the Unix socket to listen to. Must be in a `rw` mounted volume.                                                                                    |
| `DD_DOGSTATSD_ORIGIN_DETECTION`  | Enable container detection and tagging for Unix socket metrics.                                                                                            |
| `DD_DOGSTATSD_TAGS`              | Additional tags to append to all metrics, events, and service checks received by this DogStatsD server, for example: `"env:golden group:retrievers"`. |

## Configure tag mapping

Datadog automatically collects common tags from Kubernetes.

In addition, you can map Kubernetes node labels, pod labels, and annotations to Datadog tags. Use the following environment variables to configure this mapping:

{{< tabs >}}
{{% tab "Datadog Operator" %}}

| Parameter (v2alpha1) |  Description |
| --------------------------- |  ----------- |
| `global.namespaceLabelsAsTags` |  Provide a mapping of Kubernetes namespace labels to Datadog tags. `<KUBERNETES_NAMESPACE_LABEL>: <DATADOG_TAG_KEY>` |
| `global.nodeLabelsAsTags` | Provide a mapping of Kubernetes node labels to Datadog tags. `<KUBERNETES_NODE_LABEL>: <DATADOG_TAG_KEY>` |
| `global.podAnnotationsAsTags` |  Provide a mapping of Kubernetes Annotations to Datadog tags. `<KUBERNETES_ANNOTATION>: <DATADOG_TAG_KEY>` |
| `global.podLabelsAsTags` |  Provide a mapping of Kubernetes labels to Datadog tags. `<KUBERNETES_LABEL>: <DATADOG_TAG_KEY>` |

### Examples

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
    namespaceLabelsAsTags:
      env: environment
      # <KUBERNETES_NAMESPACE_LABEL>: <DATADOG_TAG_KEY>
    nodeLabelsAsTags:
      beta.kubernetes.io/instance-type: aws-instance-type
      kubernetes.io/role: kube_role
      # <KUBERNETES_NODE_LABEL>: <DATADOG_TAG_KEY>
    podLabelsAsTags:
      app: kube_app
      release: helm_release
      # <KUBERNETES_LABEL>: <DATADOG_TAG_KEY>
    podAnnotationsAsTags:
      iam.amazonaws.com/role: kube_iamrole
       # <KUBERNETES_ANNOTATIONS>: <DATADOG_TAG_KEY>
```

{{% /tab %}}
{{% tab "Helm" %}}

|  Helm | Description |
| --------------------------- | ----------- |
|  `datadog.namespaceLabelsAsTags` | Provide a mapping of Kubernetes namespace labels to Datadog tags. `<KUBERNETES_NAMESPACE_LABEL>: <DATADOG_TAG_KEY>` |
|  `datadog.nodeLabelsAsTags` | Provide a mapping of Kubernetes node labels to Datadog tags. `<KUBERNETES_NODE_LABEL>: <DATADOG_TAG_KEY>` |
|  `datadog.podAnnotationsAsTags` | Provide a mapping of Kubernetes Annotations to Datadog tags. `<KUBERNETES_ANNOTATION>: <DATADOG_TAG_KEY>` |
|  `datadog.podLabelsAsTags` | Provide a mapping of Kubernetes labels to Datadog tags. `<KUBERNETES_LABEL>: <DATADOG_TAG_KEY>` |

### Examples

```yaml
datadog:
  # (...)
  namespaceLabelsAsTags:
    env: environment
    # <KUBERNETES_NAMESPACE_LABEL>: <DATADOG_TAG_KEY>
  nodeLabelsAsTags:
    beta.kubernetes.io/instance-type: aws-instance-type
    kubernetes.io/role: kube_role
    # <KUBERNETES_NODE_LABEL>: <DATADOG_TAG_KEY>
  podLabelsAsTags:
    app: kube_app
    release: helm_release
    # <KUBERNETES_LABEL>: <DATADOG_TAG_KEY>
  podAnnotationsAsTags:
    iam.amazonaws.com/role: kube_iamrole
     # <KUBERNETES_ANNOTATIONS>: <DATADOG_TAG_KEY>
```

{{% /tab %}}
{{< /tabs >}}

## Using secret files

Integration credentials can be stored in Docker or Kubernetes secrets and used in Autodiscovery templates. For more information, see [Secrets Management][12].

## Ignore containers

Exclude containers from logs collection, metrics collection, and Autodiscovery. Datadog excludes Kubernetes and OpenShift `pause` containers by default. These allowlists and blocklists apply to Autodiscovery only; traces and DogStatsD are not affected. These environment variables support regular expressions in their values.

See the [Container Discover Management][13] page for examples.

**Note**: The `kubernetes.containers.running`, `kubernetes.pods.running`, `docker.containers.running`, `.stopped`, `.running.total` and `.stopped.total` metrics are not affected by these settings. All containers are counted.

## Kubernetes API server timeout

By default, the [Kubernetes State Metrics Core check][25] waits 10 seconds for a response from the Kubernetes API server. For large clusters, the request may time out, resulting in missing metrics.

You can avoid this by setting the environment variable `DD_KUBERNETES_APISERVER_CLIENT_TIMEOUT` to a higher value than the default 10 seconds.

{{< tabs >}}
{{% tab "Datadog Operator" %}}
Update your `datadog-agent.yaml` with the following configuration:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  override:
    clusterAgent:
      env:
        - name: DD_KUBERNETES_APISERVER_CLIENT_TIMEOUT
          value: <value_greater_than_10>
```

Then apply the new configuration:

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}
Update your `datadog-values.yaml` with the following configuration:

```yaml
clusterAgent:
  env:
    - name: DD_KUBERNETES_APISERVER_CLIENT_TIMEOUT
      value: <value_greater_than_10>
```

Then upgrade your Helm chart:

```shell
helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
```
{{% /tab %}}
{{< /tabs >}}

## Proxy settings

Starting with Agent v6.4.0 (and v6.5.0 for the Trace Agent), you can override the Agent proxy settings with the following environment variables:

| Env Variable             | Description                                                            |
|--------------------------|------------------------------------------------------------------------|
| `DD_PROXY_HTTP`          | An HTTP URL to use as a proxy for `http` requests.                     |
| `DD_PROXY_HTTPS`         | An HTTPS URL to use as a proxy for `https` requests.                   |
| `DD_PROXY_NO_PROXY`      | A space-separated list of URLs for which no proxy should be used.      |
| `DD_SKIP_SSL_VALIDATION` | An option to test if the Agent is having issues connecting to Datadog. |

## Autodiscovery

| Env Variable                 | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
|------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_LISTENERS`               | Autodiscovery listeners to run.                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `DD_EXTRA_LISTENERS`         | Additional Autodiscovery listeners to run. They are added in addition to the variables defined in the `listeners` section of the `datadog.yaml` configuration file.                                                                                                                                                                                                                                                                                                                                    |
| `DD_CONFIG_PROVIDERS`        | The providers the Agent should call to collect checks configurations. Available providers are: <br>`kubelet` - Handles templates embedded in pod annotations. <br>`docker` - Handles templates embedded in container labels. <br>`clusterchecks` - Retrieves cluster-level check configurations from the Cluster Agent. <br>`kube_services` - Watches Kubernetes services for cluster checks. |
| `DD_EXTRA_CONFIG_PROVIDERS`  | Additional Autodiscovery configuration providers to use. They are added in addition to the variables defined in the `config_providers` section of the `datadog.yaml` configuration file. |

## Miscellaneous

| Env Variable                        | Description                                                                                                                                                                                                                                                         |
|-------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_PROCESS_AGENT_CONTAINER_SOURCE` | Overrides container source auto-detection to force a single source. e.g `"docker"`, `"ecs_fargate"`, `"kubelet"`. This is no longer needed since Agent v7.35.0.                                                                                                     |
| `DD_HEALTH_PORT`                    | Set this to `5555` to expose the Agent health check at port `5555`.                                                                                                                                                                                                 |
| `DD_CLUSTER_NAME`                   | Set a custom Kubernetes cluster identifier to avoid host alias collisions. The cluster name can be up to 40 characters with the following restrictions: Lowercase letters, numbers, and hyphens only. Must start with a letter. Must end with a number or a letter. |
| `DD_COLLECT_KUBERNETES_EVENTS ` | Enable event collection with the Agent. If you are running multiple instances of the Agent in your cluster, set `DD_LEADER_ELECTION` to `true` as well.                                                                                                                       |


[1]: /agent/
[2]: /containers/cluster_agent/
[3]: https://app.datadoghq.com/containers
[5]: /containers/kubernetes/integrations/
[12]: /agent/configuration/secrets-management/
[13]: /agent/guide/autodiscovery-management/
[14]: /containers/guide/kubernetes_daemonset#cluster-agent-event-collection
[15]: /infrastructure/containers/
[16]: /containers/kubernetes/apm
[17]: /containers/kubernetes/log
[18]: /network_monitoring/performance/
[19]: /developers/dogstatsd
[20]: https://app.datadoghq.com/orchestration/overview
[21]: /infrastructure/containers/orchestrator_explorer
[22]: /containers/guide/cluster_agent_autoscaling_metrics/?tab=helm
[23]: /infrastructure/process/ 
[24]: /account_management/api-app-keys/#application-keys
[25]: /integrations/kubernetes_state_core/
[26]: /containers/docker/?tab=standard#environment-variables
