---
title: Live Containers
kind: documentation
aliases:
  - /guides/livecontainers
  - /graphing/infrastructure/livecontainers/
further_reading:
- link: "/infrastructure/livecontainers/configuration"
  tag: "Documentation"
  text: "Configure Live Containers"
- link: "/infrastructure/hostmap/"
  tag: "Documentation"
  text: "See all of your hosts together on one screen with the hostmap"
- link: "/infrastructure/process/"
  tag: "Documentation"
  text: "Understand what is going on at any level of your system"
---

## Overview

[Datadog Live Containers][1] enables real-time visibility into all containers across your environment.

Taking inspiration from bedrock tools like *htop*, *ctop*, and *kubectl*, live containers give you complete coverage of your container infrastructure in a continuously updated table with resource metrics at two-second resolution, faceted search, and streaming container logs.

Coupled with [Docker][2], [Kubernetes][3], [ECS][4], and other container technologies, plus built-in tagging of dynamic components, the live container view provides a detailed overview of your containers' health, resource consumption, logs, and deployment in real time:

{{< img src="infrastructure/livecontainers/live-containers-overview.png" alt="Live containers with summaries" >}}

To see your live containers, navigate to the [Containers page][1]. This automatically brings you to the **Containers** view.

## Configuration

See the [Live Containers Configuration documentation][5] for detailed configuration steps for Helm and DaemonSets.

## Searching, filtering, and pivoting

### String search

Containers are, by their nature, extremely high cardinality objects. Datadog's flexible string search matches substrings in the container name, ID, or image fields.

If you've enabled Kubernetes Resources, strings such as `pod`, `deployment`, `ReplicaSet`, and `service name`, as well as Kubernetes labels are searchable in a [Kubernetes Resources view](#kubernetes-resources-view).

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

{{< img src="infrastructure/livecontainers/filter-by.png" alt="A system that has been filter down to a Kubernetes cluster of 25 nodes" style="width:80%;">}}

Container environments are dynamic and can be hard to follow. The following screenshot displays a view that has been pivoted by `kube_service` and `host`—and, to reduce system noise, filtered to `kube_namespace:default`. You can see what services are running where, and how saturated key metrics are:

{{< img src="infrastructure/livecontainers/hostxservice.png" alt="Host x services" style="width:80%;">}}

You could pivot by ECS `ecs_task_name` and `ecs_task_version` to understand changes to resource utilization between updates.

{{< img src="infrastructure/livecontainers/tasksxversion2.png" alt="Tasks x version" style="width:80%;">}}

For Kubernetes resources, select Datadog tags such as `environment`, `service`, or `pod_phase` to filter by. You can also use the container facets on the left to filter a specific Kubernetes resource. Group pods by Datadog tags to get an aggregated view which allows you to find information quicker. You can search Kubernetes labels, but they are not available in the cluster map.

## Tagging

Containers are [tagged][6] with all existing host-level tags, as well as with metadata associated with individual containers.

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

If you have a configuration for [Unified Service Tagging][7] in place, `env`, `service`, and `version` is picked up automatically.
Having these tags available lets you tie together APM, logs, metrics, and live container data.

## Views

### Containers view

The **Containers** view includes [Scatter Plot](#scatter-plot) and [Timeseries][8] views, and a table to better organize your container data by fields such as container name, status, and start time.

#### Scatter plot

Use the scatter plot analytic to compare two metrics with one another in order to better understand the performance of your containers.

You can switch between the “Scatter Plot” and “Timeseries” tabs in the collapsible **Summary Graphs** section in the Containers page:

{{< img src="infrastructure/livecontainers/scatterplot_selection.png" alt="Scatter plot selection" style="width:80%;">}}

By default, the graph groups by the `short_image` tag key. The size of each dot represents the number of containers in that group, and clicking on a dot displays the individual containers and hosts that contribute to the group.

The query at the top of the scatter plot analytic allows you to control your scatter plot analytic:

* Selection of metrics to display.
* Selection of the aggregation method for both metrics.
* Selection of the scale of both X and Y axis (*Linear*/*Log*).

{{< img src="infrastructure/livecontainers/scatterplot.png" alt="Scatter plot" style="width:80%;">}}

#### Real-time monitoring

While actively working with the containers page, metrics are collected at a 2-second resolution. This is important for volatile metrics such as CPU. In the background, for historical context, metrics are collected at 10s resolution.

### Kubernetes resources view

If you have enabled Kubernetes Resources for Live Containers, toggle among the **Clusters**, **Pods**, **Deployments**, **ReplicaSets**, **DaemonSets**, **StatefulSets**, **Services**, **CronJobs**, **Jobs**, and **Nodes** views in the “Select a resource” dropdown menu in the top left corner of the page.

Each of these views includes a data table to help you better organize your data by field such as status, name, and Kubernetes labels, and a detailed Cluster Map to give you a bigger picture of your pods and Kubernetes clusters.

{{< img src="infrastructure/livecontainers/kubernetes-resources-view.png" alt="A data table organize by field" style="width:80%;">}}

#### Group by functionality and facets

Group pods by tags or Kubernetes labels to get an aggregated view which allows you to find information quicker. You can perform a group by using the “Group by” bar on the top right of the page or by clicking on a particular tag or label and locating the group by function in the context menu as shown below.

{{< img src="infrastructure/livecontainers/group-by.mp4" alt="An example of grouping by team" video=true style="width:80%;">}}

You can also leverage facets on the left hand side of the page to quickly group resources or filter for resources you care most about, such as pods with a CrashLoopBackOff pod status.

{{< img src="infrastructure/livecontainers/crashloopbackoff.mp4" alt="An example of grouping the CrashLoopBackOff pod status" video=true style="width:80%;">}}

#### Cluster map

A Kubernetes Cluster Map gives you a bigger picture of your pods and Kubernetes clusters. You can see all of your resources together on one screen with customized groups and filters, and choose which metrics to fill the color of the pods by.

Examine resources from Cluster Maps by clicking on any circle or group to populate a detailed panel.

You can see all of your resources together on one screen with customized groups and filters, and choose which metrics to fill the color of the pods by.

{{< img src="infrastructure/livecontainers/cluster-map.mp4" alt="A cluster map with customized groups and filters" video=true style="width:80%;">}}

#### Information panel

Click on any row in the table or on any object in a Cluster Map to view information about a specific resource in a side panel.

{{< img src="infrastructure/livecontainers/information-panel.mp4" alt="A view of resources in the side panel" video=true style="width:80%;">}}

For a detailed dashboard of this resource, click the View Dashboard in the top right corner of this panel.

{{< img src="infrastructure/livecontainers/view-pod-dashboard.png" alt="A link to a pod dashboard from Live Containers overview" style="width:80%;">}}

This panel is useful for troubleshooting and finding information about a selected container or resource, such as:

* [**Logs**][9]: View logs from your container or resource. Click on any log to view related logs in Logs Explorer.
* [**Metrics**][10]: View live metrics for your container or resource. You can view any graph full screen, share a snapshot of it, or export it from this tab.
* **Network**: View a container or resource’s network performance, including source, destination, sent and received volume, and throughput fields. Use the **Destination** field to search by tags like `DNS` or `ip_type`, or use the **Group by** filter in this view to group network data by tags, like `pod_name` or `service`.
* [**Traces**][11]: View traces from your container or resource, including the date, service, duration, method, and status code of a trace.

Kubernetes Resources views have a few additional tabs:

* **Processes**: View all processes running in the container of this resource.
* **YAML**: A detailed YAML overview for the resource.
* [**Events**][12]: View all Kubernetes events for your resource.

For a detailed dashboard of this resource, click the **View Dashboard** in the top right corner of this panel.

#### Resource utilization

The **Resource Utilization** tab is to the right of to the **Cluster Map** tab. 

{{< img src="infrastructure/livecontainers/resource_utilization.png" alt="Container Resource Utilization" style="width:80%;">}}

This tab displays your CPU and memory usage over time. This information helps you detect where resources may be over- or under-provisioned.

Click on any row in the table to view informatiion about a specific resource in a side panel.

{{< img src="infrastructure/livecontainers/resource_utilization_panel.png" alt="Container Resource Utilization Side Panel Details" style="width:80%;">}}

In the above screenshot, pods are grouped by cluster name. The side panel is opened for pods within a particular cluster. Average CPU and memory usage for these pods is displayed.

### Container logs

View streaming logs for any container like `docker logs -f` or `kubectl logs -f` in Datadog. Click any container in the table to inspect it. Click the *Logs* tab to see real-time data from [live tail][13] or indexed logs for any time in the past.

#### Live tail

With live tail, all container logs are streamed. Pausing the stream helps you read logs that are quickly being written; unpause to continue streaming.

Streaming logs can be searched with simple string matching. See [Live Tail][13] for more details.

**Note**: Streaming logs are not persisted, and entering a new search or refreshing the page clears the stream.

{{< img src="infrastructure/livecontainers/livecontainerlogssidepanel.mp4" alt="Preview Logs Side panel" video="true"  >}}

#### Indexed logs

You can see indexed logs that you have chosen to index and persist by selecting a corresponding timeframe. Indexing allows you to filter your logs using tags and facets. For example, to search for logs with an Error status, type status:error into the search box. Autocompletion can help you locate the particular tag that you want. Key attributes about your logs are already stored in tags, which enables you to search, filter, and aggregate as needed.

{{< img src="infrastructure/livecontainers/errorlogs.png" alt="Preview Logs Side panel" style="width:100%;">}}

## Notes and known issues

* Real-time (2s) data collection is turned off after 30 minutes. To resume real-time collection, refresh the page.
* RBAC settings can restrict Kubernetes metadata collection. See the [RBAC entities for the Datadog Agent][14].
* In Kubernetes the `health` value is the containers' readiness probe, not its liveness probe.

### Kubernetes resources

* Data is updated automatically in constant intervals. Update intervals may change during beta.
* In clusters with 1000+ Deployments or ReplicaSets you may notice elevated CPU usage from the Cluster Agent. There is an option to disable container scrubbing in the Helm chart, see [the Helm Chart repo][15] for more details.

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
