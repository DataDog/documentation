---
title: Configure the Datadog Agent on Kubernetes
kind: documentation
aliases:
    - /integrations/faq/gathering-kubernetes-events
    - /agent/kubernetes/event_collection
---

## Overview

After you have installed the Datadog Agent in your Kubernetes environment, you may choose additional configuration options.

## Live Containers

The [Datadog Agent][1] and [Cluster Agent][2] can be configured to retrieve Kubernetes resources for [Live Containers][3]. This feature allows you to monitor the state of pods, deployments and other Kubernetes concepts in a specific namespace or availability zone, view resource specifications for failed pods within a deployment, correlate node activity with related logs, and more.

See the [Live Containers][4] documentation for configuration instructions and additional information.

## Event collection

{{< tabs >}}
{{% tab "Operator" %}}

To collect the Kubernetes events with the Cluster Agent, set `clusterAgent.config.collectEvents` to `true` in your `datadog-agent.yaml` manifest.

For example:

```
clusterAgent:
  config:
    collectEvents: true
```

Alternatively, to collect the Kubernetes events with a node Agent, set `agent.config.collectEvents` to `true` in your `datadog-agent.yaml` manifest.

For example:

```
agent:
  config:
    collectEvents: true
```

{{% /tab %}}
{{% tab "Helm" %}}

If you want Kubernetes events to be collected by the Datadog Cluster Agent, set the `clusterAgent.enabled`, `datadog.collectEvents` and `clusterAgent.rbac.create` options to `true` in your `value.yaml` file.

If you don’t want to use the Cluster Agent, you can still have a node Agent collect Kubernetes events by setting `datadog.leaderElection`, `datadog.collectEvents` and `agents.rbac.create` options to `true` in your `value.yaml` file.

{{% /tab %}}
{{% tab "DaemonSet" %}}

If you want to collect events from your Kubernetes cluster set the environment variables `DD_COLLECT_KUBERNETES_EVENTS` and `DD_LEADER_ELECTION` to `true` in your Agent manifest. Alternatively, use the [Datadog Cluster Agent Event collection][1]

[1]: /agent/cluster_agent/event_collection/
{{% /tab %}}
{{< /tabs >}}

## Integrations

Once the Agent is up and running in your cluster, use [Datadog's Autodiscovery feature][5] to collect metrics and logs automatically from your pods.

## Environment variables

The following is the list of environment variables available for the Datadog Agent using a DaemonSet. If you are using Helm, see the full list of configuration options for the `datadog-value.yaml` file in the [helm/charts GitHub repository][6]. If you are using Operator, see the [Operator Configuration][7] documentation.

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
| `DD_APM_ENABLED`                | Enable [trace collection][4] with the Trace Agent.                                                                                                                                                                                                           |
| `DD_LOGS_ENABLED`               | Enable [log collection][5] with the Logs Agent.                                                                                                                                                                                                              |
| `DD_PROCESS_AGENT_ENABLED`      | Enable [live process collection][6] with the Process Agent. The [live container view][8] is already enabled by default if the Docker socket is available. If set to `false`, the [live process collection][6] and the [live container view][8] are disabled. |
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

**Note**: The `kubernetes.containers.running`, `kubernetes.pods.running`, `docker.containers.running`, `.stopped`, `.running.total` and `.stopped.total` metrics are not affected by these settings. All containers are counted.

### Misc

| Env Variable                        | Description                                                                                                                                                                                                                                                         |
|-------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_PROCESS_AGENT_CONTAINER_SOURCE` | Overrides container source auto-detection to force a single source. e.g `"docker"`, `"ecs_fargate"`, `"kubelet"`                                                                                                                                                    |
| `DD_HEALTH_PORT`                    | Set this to `5555` to expose the Agent health check at port `5555`.                                                                                                                                                                                                 |
| `DD_CLUSTER_NAME`                   | Set a custom Kubernetes cluster identifier to avoid host alias collisions. The cluster name can be up to 40 characters with the following restrictions: Lowercase letters, numbers, and hyphens only. Must start with a letter. Must end with a number or a letter. |

You can add extra listeners and config providers using the `DD_EXTRA_LISTENERS` and `DD_EXTRA_CONFIG_PROVIDERS` environment variables. They are added in addition to the variables defined in the `listeners` and `config_providers` section of the `datadog.yaml` configuration file.

[1]: /agent/
[2]: /agent/cluster_agent/
[3]: https://app.datadoghq.com/containers
[4]: /infrastructure/livecontainers/?tab=helm#configuration
[5]: /agent/kubernetes/integrations/
[6]: https://github.com/DataDog/helm-charts/tree/master/charts/datadog#all-configuration-options
[7]: /agent/kubernetes/operator_configuration
[8]: /agent/proxy/#agent-v6
[9]: /developers/dogstatsd/
[10]: /developers/dogstatsd/unix_socket/
[11]: /agent/kubernetes/tag/
[12]: /security/agent/#secrets-management
[13]: /agent/guide/autodiscovery-management/
