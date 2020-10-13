---
title: Live Containers
kind: documentation
aliases:
  - /guides/livecontainers
  - /graphing/infrastructure/livecontainers/
further_reading:
- link: "/infrastructure/hostmap/"
  tag: "Graphing"
  text: "See all of your hosts together on one screen with the hostmap"
- link: "/infrastructure/process/"
  tag: "Graphing"
  text: "Understand what is going on at any level of your system"
---

## Introduction

[Datadog Live Containers][1] enables real-time visibility into all containers across your environment.

Taking inspiration from bedrock tools like *htop*, *ctop*, and *kubectl*, live containers give you complete coverage of your container infrastructure in a continuously updated table with resource metrics at two-second resolution, faceted search, and streaming container logs.

Coupled with integrations for [Docker][2], [Kubernetes][3], [ECS][4], and other container technologies, plus built-in tagging of dynamic components, the live container view provides a detailed overview of your containers' health, resource consumption, logs, and deployment in real time:

{{< img src="infrastructure/livecontainers/livecontainersoverview.png" alt="Live containers with summaries"  >}}

### Kubernetes Resources

[Kubernetes Resources for Live Containers][1] is currently in private beta. Fill out [this form][5] to request access.

If you're using Kubernetes, enable Kubernetes Resources for Live Containers to gain multi-dimensional visibility into all Kubernetes workloads across your clusters. Inspired by the `kubectl` tool, this feature gives you complete coverage of your Kubernetes infrastructure in a continuously updated table with curated resource metrics, faceted search, per-workload detailed view, and visualized maps.

## Installation

Follow the [Docker][6] or [Kubernetes][7] Agent installation instructions. Enable the Process Agent to populate your Live Containers view. Container metrics are available without additional configuration after installation.

**Kubernetes Resources for Live Containers requires installation of**:

* [Datadog Agent][8] version 7.21.1 (or above)
* [Datadog Cluster Agent][9] 1.9.0 (or above)

### Kubernetes Resources

To enable Kubernetes Resources for Live Containers, follow the [Helm instructions][10] and add the following changes to your `values.yaml` file:

{{< code-block lang="yaml" filename="values.yaml" >}}
datadog:
  ...
  processAgent:
    enabled: true
  ...
  orchestratorExplorer:
    enabled: true
...
clusterAgent:
  enabled: true
  image:
    repository: datadog/cluster-agent
    tag: latest
    pullPolicy: Always
...
agents:
  image:
    repository: datadog/agent
    tag: latest
    pullPolicy: Always
...
{{< /code-block >}}

In cases where the Agent is not able to automatically detect the Kubernetes cluster name, you must set it in `values.yaml`:

{{< code-block lang="yaml" filename="values.yaml" >}}
datadog:
   ...
   clusterName: <PLACEHOLDER>
   ...
{{< /code-block >}}

**Note**: The cluster name must be 40-characters or less.

On Google's GKE, AWS EKS, and Azure AKS, this is unnecessary, unless the Agent and the cluster Agent don't have access to the cloud metadata APIs, or the cluster name is longer than 40 characters.

## Configuration

### Include or exclude containers

It is possible to include and/or exclude containers from real-time collection:

* Exclude containers either by passing the environment variable `DD_CONTAINER_EXCLUDE` or by adding `container_exclude:` in your `datadog.yaml` main configuration file.
* Include containers either by passing the environment variable `DD_CONTAINER_INCLUDE` or by adding `container_include:` in your `datadog.yaml` main configuration file.

Both arguments take an **image name** as value; regular expressions are also supported.

For example, to exclude all Debian images except containers with a name starting with *frontend*, add these two configuration lines in your `datadog.yaml` file:
```yaml
  env:
    - name: DD_LOGS_ENABLED
      value: "true"
    - name: DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL
      value: "true"

  volumeMounts:
    - name: pointerdir
      mountPath: /opt/datadog-agent/run

volumes:
  - hostPath:
      path: /opt/datadog-agent/run
    name: pointerdir
```

```shell
container_exclude: ["image:debian"]
container_include: ["name:frontend.*"]
```

**Note**: For Agent 5, instead of including the above in the `datadog.conf` main configuration file, explicitly add a `datadog.yaml` file to `/etc/datadog-agent/`, as the Process Agent requires all configuration options here. This configuration only excludes containers from real-time collection, **not** from Autodiscovery.

## Getting started

Navigate to the [Containers page][1]. This will automatically bring you to the **Containers** view.

## Searching, filtering, and pivoting

### String search

Containers are, by their nature, extremely high cardinality objects. Datadog's flexible string search matches substrings in the container name, ID, or image fields.

If you've enabled Kubernetes Resources, strings such as `pod`, `deployment`, `ReplicaSet`, and `service name`, as well as Kubernetes labels are searchable in a [Kubernetes Resources view](#kubernetes-resources-views).

To combine multiple string searches into a complex query, you can use any of the following Boolean operators:

|              |                                                                                                                                  |                                                                 |
|:-------------|:---------------------------------------------------------------------------------------------------------------------------------|:----------------------------------------------------------------|
| **Operator** | **Description**                                                                                                                  | **Example**                                                     |
| `AND`        | **Intersection**: both terms are in the selected events (if nothing is added, AND is taken by default)                           | java AND elasticsearch                                          |
| `OR`         | **Union**: either term is contained in the selected events                                                                       | java OR python                                                  |
| `NOT` / `!`  | **Exclusion**: the following term is NOT in the event. You may use the word `NOT` or `!` character to perform the same operation | java NOT elasticsearch <br> **equivalent:** java !elasticsearch |

Use parentheses to group operators together. For example, `(NOT (elasticsearch OR kafka) java) OR python`.

### Filtering and pivoting

The screenshot below displays a system that has been filtered down to a Kubernetes cluster of nine nodes. RSS and CPU utilization on containers is reported compared to the provisioned limits on the containers, when they exist. Here, it is apparent that the containers in this cluster are over-provisioned. You could use tighter limits and bin packing to achieve better utilization of resources.

{{< img src="infrastructure/livecontainers/overprovisioned.png" alt="Over Provisioned"  style="width:80%;">}}

Container environments are dynamic and can be hard to follow. The following screenshot displays a view that has been pivoted by `kube_service` and `host`—and, to reduce system noise, filtered to `kube_namespace:default`. You can see what services are running where, and how saturated key metrics are:

{{< img src="infrastructure/livecontainers/hostxservice.png" alt="Host x services"  style="width:80%;">}}

You could pivot by ECS `ecs_task_name` and `ecs_task_version` to understand changes to resource utilization between updates.

{{< img src="infrastructure/livecontainers/tasksxversion.png" alt="Tasks x version"  style="width:80%;">}}

For Kubernetes resources, select Datadog tags such as `environment`, `service`, or `pod_phase` to filter by. You can also use the container facets on the left to filter a specific Kubernetes resource. Group pods by Datadog tags to get an aggregated view which allows you to find information quicker.

## Tagging

Containers are [tagged][11] with all existing host-level tags, as well as with metadata associated with individual containers.

All containers are tagged by `image_name`, including integrations with popular orchestrators, such as [ECS][4] and [Kubernetes][3], which provide further container-level tags. Additionally, each container is decorated with Docker, ECS, or Kubernetes icons so you can tell which are being orchestrated at a glance.

ECS containers are tagged by:

* `task_name`
* `task_version`
* `ecs_cluster`

Kubernetes containers are tagged by:

* `pod_name`
* `kube_pod_ip`
* `kube_service`
* `kube_namespace`
* `kube_replica_set`
* `kube_daemon_set`
* `kube_job`
* `kube_deployment`
* `kube_cluster`

If you have configuration for [Unified Service Tagging][12] in place, `env`, `service`, and `version` will also be picked up automatically.
Having these tags available will let you tie together APM, logs, metrics, and live container data.

## Views

### Containers View

The **Containers** view includes [Scatter Plot](#scatter-plots) and [Timeseries][13] views, and a table to better organize your container data by fields such as container name, status, and start time.

#### Scatter plot

Use the scatter plot analytic to compare two metrics with one another in order to better understand the performance of your containers.

To access the scatter plot analytic [in the Containers page][1] click on the *Show Summary graph* button and select the "Scatter Plot" tab:

{{< img src="infrastructure/livecontainers/scatterplot_selection.png" alt="scatterplot selection"  style="width:60%;">}}

By default, the graph groups by the `short_image` tag key. The size of each dot represents the number of containers in that group, and clicking on a dot displays the individual containers and hosts that contribute to the group.

The query at the top of the scatter plot analytic allows you to control your scatter plot analytic:

* Selection of metrics to display.
* Selection of the aggregation method for both metrics.
* Selection of the scale of both X and Y axis (*Linear*/*Log*).

{{< img src="infrastructure/livecontainers/scatterplot.png" alt="scatterplot"  style="width:80%;">}}

#### Real-time monitoring

While actively working with the containers page, metrics are collected at a 2-second resolution. This is important for highly volatile metrics such as CPU. In the background, for historical context, metrics are collected at 10s resolution.

### Kubernetes Resources View

If you have enabled Kubernetes Resources for Live Containers, toggle between the **Pods**, **Deployments**, **ReplicaSets**, and **Services** views in the **View** dropdown menu in the top left corner of the page. Each of these views includes a data table to help you better organize your data by field such as status, name, and Kubernetes labels, and a detailed Cluster Map to give you a bigger picture of your pods and Kubernetes clusters.

#### Cluster map

A Kubernetes Cluster Map gives you a bigger picture of your pods and Kubernetes clusters. You can see all of your resources together on one screen with customized groups and filters, and choose which metrics to fill the color of the pods by.

Drill down into resources from Cluster Maps by click on any circle or group to populate a detailed panel.

#### Information panel

Click on any row in the table or on any object in a Cluster Map to view information about a specific resource in a side panel. This panel is useful for troubleshooting and finding information about a selected container or resource, such as:

* [**Logs**][14]: View logs from your container or resource. Click on any log to view related logs in Logs Explorer.
* [**Metrics**][15]: View live metrics for your container or resource. You can view any graph full screen, share a snapshot of it, or export it from this tab.
* **Network**: View a container or resource’s network performance, including source, destination, sent and received volume, and throughput fields. Use the **Destination** field to search by tags like `DNS` or `ip_type`, or use the **Group by** filter in this view to group network data by tags, like `pod_name` or `service`.
* [**Traces**][16]: View traces from your container or resource, including the date, service, duration, method, and status code of a trace.

Kubernetes Resources views have a few additional tabs:

* **Processes**: View all processes running in the container of this resource.
* **YAML**: A detailed YAML overview for the resource.
* [**Events**][17]: View all Kubernetes events for your resource.

For a detailed dashboard of this resource, click the **View Dashboard** in the top right corner of this panel.

### Container logs

View streaming logs for any container like `docker logs -f` or `kubectl logs -f` in Datadog. Click any container in the table to inspect it. Click the *Logs* tab to see real-time data from [Live Tail][18] or indexed logs for any time in the past.

#### Live Tail

With Live Tail, all container logs are streamed. Pausing the stream allows you to easily read logs that are quickly being written; unpause to continue streaming.

Streaming logs can be searched with simple string matching. For more details about Live Tail, see the [Live Tail documentation][18].

**Note**: Streaming logs are not persisted, and entering a new search or refreshing the page clears the stream.

{{< img src="infrastructure/livecontainers/livecontainerlogssidepanel.mp4" alt="Preview Logs Sidepanel" video="true"  >}}

#### Indexed logs

You can see logs that you have chosen to index and persist by selecting a corresponding timeframe. Indexing allows you to filter your logs using tags and facets. For example, to search for logs with an `Error` status, type `status:error` into the search box. Autocompletion can help you locate the particular tag that you want. Key attributes about your logs are already stored in tags, which enables you to search, filter, and aggregate as needed.

{{< img src="infrastructure/livecontainers/errorlogs.png" alt="Preview Logs Sidepanel"  style="width:100%;">}}

## Notes and known issues

* Real-time (2s) data collection is turned off after 30 minutes. To resume real-time collection, refresh the page.
* RBAC settings can restrict Kubernetes metadata collection. Refer to the [RBAC entites for the Datadog Agent][19].
* In Kubernetes the `health` value is the containers' readiness probe, not its liveness probe.

### Kubernetes Resources

* Data is updated automatically in constant intervals. Update intervals may change during beta.
* In clusters with 1000+ Deployments or ReplicaSets you may notice elevated CPU usage from the Cluster Agent. There is an option to disable container scrubbing in the Helm chart, see [add link][20] for more details.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/containers
[2]: /integrations/docker_daemon/
[3]: /agent/kubernetes/
[4]: /integrations/amazon_ecs/
[5]: https://app.datadoghq.com/containers/kubernetes-beta
[6]: /agent/docker/#run-the-docker-agent
[7]: /agent/kubernetes/?tab=helm
[8]: /agent/
[9]: /agent/cluster_agent/setup/?tab=secret
[10]: /agent/kubernetes/?tab=helm#installation
[11]: /getting_started/tagging/
[12]: /getting_started/tagging/unified_service_tagging
[13]: /dashboards/widgets/timeseries/
[14]: /logs
[15]: /metrics
[16]: /tracing
[17]: /events
[18]: /logs/live_tail/
[19]: https://gist.github.com/hkaj/404385619e5908f16ea3134218648237
[20]: https://github.com/DataDog/helm-charts/tree/master/charts/datadog
