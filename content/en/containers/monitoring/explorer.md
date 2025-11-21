---
title: Containers Explorer
aliases:
  - /guides/livecontainers
  - /graphing/infrastructure/livecontainers/
  - /infrastructure/livecontainers
  - /infrastructure/containers
further_reading:
- link: "https://www.datadoghq.com/blog/kubernetes-cpu-requests-limits/"
  tag: "Blog"
  text: "A deep dive into CPU requests and limits in Kubernetes"
- link: "https://www.datadoghq.com/blog/monitor-kubernetes-anomalies/"
  tag: "Blog"
  text: "Expedite infrastructure investigations with Kubernetes Anomalies"
- link: "https://www.datadoghq.com/blog/rightsize-kubernetes-workloads/"
  tag: "Blog"
  text: "Practical tips for rightsizing your Kubernetes workloads"
- link: "https://www.datadoghq.com/blog/kubernetes-active-remediation-ai/"
  tag: "Blog"
  text: "Accelerate Kubernetes issue resolution with AI-powered guided remediation"
---


{{< img src="infrastructure/livecontainers/live-containers-overview_2.png" alt="Live containers with summaries" >}}

In Datadog, the [Containers Explorer][1] page (formerly known as Live Containers) provides real-time visibility into all containers across your environment.

Inspired by *htop*, *ctop*, and *kubectl*, Containers Explorer gives you complete coverage of your container infrastructure in a continuously updated table with resource metrics at two-second resolution, faceted search, and streaming container logs.

## Configuration

### Setup

Collecting container telemetry for Containers Explorer is **enabled by default** for most Datadog Agent installations.

{{< tabs >}}
{{% tab "Docker" %}}
When you install the Datadog Agent in a Docker-based environment, container collection is enabled by default.

To verify that container collection is enabled, ensure that `DD_PROCESS_CONFIG_CONTAINER_COLLECTION_ENABLED` is set to `true`.

For example:

```
-v /etc/passwd:/etc/passwd:ro
-e DD_PROCESS_CONFIG_CONTAINER_COLLECTION_ENABLED=true
```
{{% /tab %}}
{{% tab "Datadog Operator" %}}

When you install the Datadog Agent by using the Datadog Operator, container collection is enabled by default.

To verify that container collection is enabled, ensure that `features.liveContainerCollection.enabled` is set to `true` in your `datadog-agent.yaml`:

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

When you install the Datadog Agent by using the [official Helm chart][1], container collection is enabled by default.

To verify that container collection is enabled, ensure that the `processAgent.containerCollection` parameter is set to `true` in your [`datadog-values.yaml`][2] file:

```yaml
datadog:
  # (...)
  processAgent:
    containerCollection: true
```

#### Troubleshooting: No cluster name set
If you see the error `Orchestrator explorer enabled but no cluster name set: disabling.`, then Datadog is failing to detect your Kubernetes cluster name. To fix this error, set `datadog.clusterName` to your cluster name in `datadog-values.yaml`.

```yaml
datadog:
  #(...)
  clusterName: <YOUR_CLUSTER_NAME>
  #(...)
  processAgent:
    containerCollection: true
```

[1]: https://github.com/DataDog/helm-charts
[2]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "Amazon ECS" %}}

Update your task definitions with the following environment variable:

```json
{
  "name": "DD_PROCESS_CONFIG_CONTAINER_COLLECTION_ENABLED",
  "value": "true"
}
```

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">To set up Containers Explorer for Datadog Agent v7.21.1 - v7.27.0 and Cluster Agent v1.9.0 - 1.11.0, see <a href="/infrastructure/faq/live-containers-legacy-configuration">Live Containers legacy configuration</a>.</div>

### Include or exclude containers

By default, Datadog automatically discovers all containers.

You can include or exclude containers from collection by using these environment variables:

- `DD_CONTAINER_EXCLUDE`: Blocklist of containers to exclude
- `DD_CONTAINER_INCLUDE`: Allowlist of containers to include

Regular expressions are supported.

#### Example: Including and excluding containers
To exclude all Debian containers (`image:debian`) except containers with a name starting with `frontend` (`name:frontend.*`):

{{< tabs >}}
{{% tab "Docker" %}}

```shell
docker run -d --name datadog-agent \
           (...) \
           -e DD_CONTAINER_EXCLUDE="image:debian" \
           -e DD_CONTAINER_INCLUDE="name:frontend.*"
```

{{% /tab %}}
{{% tab "Datadog Operator" %}}

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
  override:
    nodeAgent:
      env:
        - name: DD_CONTAINER_EXCLUDE
          value: "image:debian"
        - name: DD_CONTAINER_INCLUDE
          value: "name:frontend.*"
```

{{% /tab %}}
{{% tab "Helm" %}}

```yaml
datadog:
  containerExclude: "image:debian"
  containerInclude: "name:frontend.*"
```

{{% /tab %}}
{{% tab "Amazon ECS" %}}

Update your task definition:

```json
"environment": [
  {
    "name": "DD_CONTAINER_EXCLUDE",
    "value": "image:debian"
  },
  {
    "name": "DD_CONTAINER_INCLUDE",
    "value": "name:frontend.*"
  },
  ...
]
```

{{% /tab %}}
{{< /tabs >}}

For more granular configuration options, see [Container Discovery Management][21]


### Scrub sensitive information

To prevent the leaking of sensitive data, you can scrub sensitive words in container YAML files. If you installed the Datadog Agent with a Helm chart, container scrubbing is enabled by default.

The following default sensitive words are provided:

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

## Searching, filtering, and pivoting

### String search

Containers are, by their nature, extremely high cardinality objects. Datadog's flexible string search matches substrings in the container name, ID, or image fields.

To combine multiple string searches into a complex query, you can use any of the following Boolean operators:

`AND`
: **Intersection**: both terms are in the selected events (if nothing is added, AND is taken by default)<br> **Example**: `java AND elasticsearch`

`OR`
: **Union**: either term is contained in the selected events <br> **Example**: `java OR python`

`NOT` / `!`
: **Exclusion**: the following term is NOT in the event. You may use the word `NOT` or `!` character to perform the same operation<br> **Example**: `java NOT elasticsearch` or `java !elasticsearch`

Use parentheses to group operators together. For example, `(NOT (elasticsearch OR kafka) java) OR python`.

### Filtering and pivoting

The screenshot below displays a system that has been filtered down to a Kubernetes cluster of 25 nodes. RSS and CPU utilization on containers is reported compared to the provisioned limits on the containers, when they exist. Here, it is apparent that the containers in this cluster are over-provisioned. You could use tighter limits and bin packing to achieve better utilization of resources.

{{< img src="infrastructure/livecontainers/filter-by.png" alt="A system that has been filtered down to a Kubernetes cluster of 25 nodes" style="width:80%;">}}

Container environments are dynamic and can be hard to follow. The following screenshot displays a view that has been pivoted by `kube_service` and `host`—and, to reduce system noise, filtered to `kube_namespace:default`. You can see what services are running where, and how saturated key metrics are:

{{< img src="infrastructure/livecontainers/hostxservice.png" alt="Host x services" style="width:80%;">}}

You could pivot by ECS `ecs_task_name` and `ecs_task_version` to understand changes to resource utilization between updates.

{{< img src="infrastructure/livecontainers/tasksxversion2.png" alt="Tasks x version" style="width:80%;">}}

## Tagging

Containers are [tagged][6] with all existing host-level tags, as well as with metadata associated with individual containers.

All containers are tagged by `image_name`, including integrations with popular orchestrators, such as [ECS][4] and [Kubernetes][3], which provide further container-level tags. Additionally, each container is decorated with Docker, ECS, or Kubernetes icons so you can tell which are being orchestrated at a glance.

ECS containers are tagged by:

* `task_name`
* `task_version`
* `ecs_cluster`

Kubernetes containers are tagged by:

* `pod_name`
* `kube_service`
* `kube_namespace`
* `kube_replica_set`
* `kube_daemon_set`
* `kube_job`
* `kube_deployment`
* `kube_cluster_name`

If you have a configuration for [Unified Service Tagging][7] in place, Datadog automatically picks up `env`, `service`, and `version` tags. Having these tags available lets you tie together APM, logs, metrics, and container data.

## Views

The Containers page includes [Scatter Plot](#scatter-plot) and [Timeseries][8] views, and a table to better organize your container data by fields such as container name, status, and start time.

#### Scatter plot

Use the scatter plot analytic to compare two metrics with one another in order to better understand the performance of your containers.

You can switch between the "Scatter Plot" and "Timeseries" tabs in the collapsible **Summary Graphs** section in the Containers page:

{{< img src="infrastructure/livecontainers/scatterplot_selection.png" alt="Scatter plot selection" style="width:80%;">}}

By default, the graph groups by the `short_image` tag key. The size of each dot represents the number of containers in that group, and clicking on a dot displays the individual containers and hosts that contribute to the group.

The options at the top of the graph allow you to control your scatter plot analytic:

* Selection of metrics to display.
* Selection of the aggregation method for both metrics.
* Selection of the scale of both X and Y axis (*Linear*/*Log*).

{{< img src="infrastructure/livecontainers/scatterplot.png" alt="Scatter plot" style="width:80%;">}}

#### Real-time monitoring

While actively working with the containers page, metrics are collected at a 2-second resolution. This is important for volatile metrics such as CPU. In the background, for historical context, metrics are collected at 10s resolution.

### Container logs

View streaming logs for any container like `docker logs -f` or `kubectl logs -f` in Datadog. Click any container in the table to inspect it. Click the *Logs* tab to see real-time data from [live tail][13] or indexed logs for any time in the past.

#### Live tail

With live tail, all container logs are streamed. Pausing the stream helps you read logs that are quickly being written; unpause to continue streaming.

Streaming logs can be searched with simple string matching. See [Live Tail][13] for more details.

**Note**: Streaming logs are not persisted, and entering a new search or refreshing the page clears the stream.

{{< img src="infrastructure/livecontainers/livecontainerlogssidepanel.mp4" alt="Preview Logs Side panel" video="true" >}}

#### Indexed logs

You can see indexed logs that you have chosen to index and persist by selecting a corresponding timeframe. Indexing allows you to filter your logs using tags and facets. For example, to search for logs with an Error status, type status:error into the search box. Autocompletion can help you locate the particular tag that you want. Key attributes about your logs are already stored in tags, which enables you to search, filter, and aggregate as needed.

{{< img src="infrastructure/livecontainers/errorlogs.png" alt="Preview Logs Side panel" style="width:100%;">}}

## Additional information

* Real-time (2s) data collection is turned off after 30 minutes. To resume real-time collection, refresh the page.
* RBAC settings can restrict Kubernetes metadata collection. See the [RBAC entities for the Datadog Agent][14].
* In Kubernetes the `health` value is the containers' readiness probe, not its liveness probe.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/containers
[2]: /integrations/docker_daemon/
[3]: /agent/kubernetes/
[4]: /agent/amazon_ecs/
[5]: /infrastructure/livecontainers/configuration
[6]: /tagging/assigning_tags?tab=agentv6v7#host-tags
[7]: /getting_started/tagging/unified_service_tagging
[8]: /dashboards/widgets/timeseries/
[9]: /logs
[10]: /metrics
[11]: /tracing
[12]: /events
[13]: /logs/explorer/live_tail
[14]: https://github.com/DataDog/datadog-agent/blob/7.23.1/Dockerfiles/manifests/cluster-agent/rbac.yaml
[15]: https://github.com/DataDog/helm-charts/tree/master/charts/datadog
[16]: /infrastructure/containers/configuration
[17]: /infrastructure/faq/live-containers-legacy-configuration
[18]: https://app.datadoghq.com/orchestration/overview
[19]: /infrastructure/containers/orchestrator_explorer/
[20]: /infrastructure/containers/kubernetes_resources
[21]: /containers/guide/container-discovery-management