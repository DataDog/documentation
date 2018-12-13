---
title: Live Containers
kind: documentation
aliases:
  - /guides/livecontainers
  - /infrastructure/livecontainers/
further_reading:
- link: "graphing/infrastructure/hostmap"
  tag: "Graphing"
  text: "See all of your hosts together on one screen with the hostmap"
- link: "graphing/infrastructure/process"
  tag: "Graphing"
  text: "Understand what is going on at any level of your system"
---

## Introduction

[Datadog Live Containers][1] enable real-time visibility into all containers across your environment.

Taking inspiration from bedrock tools like *htop* and *ctop*, live containers give you complete coverage of your container infrastructure in a continuously updated table with resource metrics at two-second resolution and faceted search.
Coupled with integrations for [Docker][2], [Kubernetes][3], [ECS][4], and other container technologies, plus built-in tagging of dynamic components, the live container view provides a detailed overview of your containers' health, resource consumption, and deployment in real time:

{{< img src="graphing/infrastructure/livecontainers/LiveContainersWithSummaries.png" alt="Live containers with summaries" responsive="true" >}}

## Installation

After deploying the [Docker Agent][5], no other configuration is necessary.

**Note**: To collect container information in the standard install rather than with the [Docker Agent][5], the `dd-agent` user must have permissions to access **docker.sock**.

### Include/Exclude containers

It is possible to include and/or exclude containers from real-time collection:

- Exclude containers either via passing the environment variable `DD_AC_EXCLUDE` or adding `ac_exclude:` in your `datadog.yaml` main configuration file.
- Include containers either via passing the environment variable `DD_AC_INCLUDE` or adding `ac_include:` in your `datadog.yaml` main configuration file.

Both arguments take an **image name** as value; regular expressions are also supported.

For example, to exclude all Debian images except containers with a name starting with *frontend*, add these two configuration lines in your `datadog.yaml`file:

```
ac_exclude: ["image:debian"]
ac_include: ["name:frontend.*"]
```

**Note**: For Agent 5, instead of including the above in the `datadog.conf` main configuration file, explicitly add a `datadog.yaml` file to `/etc/datadog-agent/`, as the Process Agent requires all configuration options here. This configuration only excludes containers from real-time collection, **not** from Autodiscovery.

## Searching, Filtering, and Pivoting

### String Search

Containers are, by their nature, extremely high cardinality objects. Datadog's flexible string search matches substrings in the container name, ID, or image fields.

To combine multiple string searches into a complex query, you can use any of the following Boolean operators:

|              |                                                                                                        |                              |
| :----        | :----                                                                                                  | :----                        |
| **Operator** | **Description**                                                                                       | **Example**                 |
| `AND`        | **Intersection**: both terms are in the selected events (if nothing is added, AND is taken by default) | java AND elasticsearch   |
| `OR`         | **Union**: either term is contained in the selected events                                             | java OR python   |
| `NOT` / `!`      | **Exclusion**: the following term is NOT in the event. You may use the word `NOT` or `!` character to perform the same operation | java NOT elasticsearch <br> **equivalent:** java !elasticsearch|

Use parentheses to group operators together. For example, `(NOT (elasticsearch OR kafka) java) OR python`.


### Tagging

Containers are [tagged][6] with all existing host-level tags, as well as with metadata associated with individual containers.

All containers are tagged by `image_name`, including integrations with popular orchestrators, such as [ECS][4] and [Kubernetes][3], which provide further container-level tags. Additionally, each container is decorated with Docker, ECS, or Kubernetes icons so you can tell which are being orchestrated at a glance.

ECS containers are tagged by:

*  `task_name`
*  `task_version`
*  `ecs_cluster`

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

### Filtering and Pivoting

The screenshot below displays a system that has been filtered down to a Kubernetes cluster of 9 nodes. RSS and CPU utilization on containers is reported compared to the provisioned limits on the containers, when they exist. Here, it is apparent that the containers in this cluster are over-provisioned. You could use tighter limits and bin packing to achieve better utilization of resources.

{{< img src="graphing/infrastructure/livecontainers/overprovisioned.png" alt="Over Provisioned" responsive="true" style="width:80%;">}}

Container environments are dynamic and can be hard to follow. The following screenshot displays a view that has been pivotted by `kube_service` and `host`—and, to reduce system noise, filtered to `kube_namespace:default`. You can see what services are running where, and how saturated key metrics are:

{{< img src="graphing/infrastructure/livecontainers/hostxservice.png" alt="Host x services" responsive="true" style="width:80%;">}}

You could pivot by ECS `ecs_task_name` and `ecs_task_version` to understand changes to resource utilization between updates.

{{< img src="graphing/infrastructure/livecontainers/tasksxversion.png" alt="Tasks x version" responsive="true" style="width:80%;">}}

## Scatter Plots

Use the scatter plot analytic to compare two metrics with one another in order to better understand the performance of your containers.

To access the scatter plot analytic [in the Containers page][1] click on the *Show Summary graph* button and select the "Scatter Plot" tab:

{{< img src="graphing/infrastructure/livecontainers/scatterplot_selection.png" alt="scatterplot selection" responsive="true" style="width:60%;">}}

By default, the graph groups by the `short_image` tag key. The size of each dot represents the number of containers in that group, and clicking on a dot displays the individual containers and hosts that contribute to the group.

The query at the top of the scatter plot analytic allows you to control your scatter plot analytic:

* Selection of metrics to display.
* Selection of the aggregation method for both metrics.
* Selection of the scale of both X and Y axis (*Linear*/*Log*).

{{< img src="graphing/infrastructure/livecontainers/scatterplot.png" alt="scatterplot" responsive="true" style="width:80%;">}}


## Real-time monitoring

While actively working with the containers page, metrics are collected at a 2-second resolution. This is important for highly volatile metrics such as CPU. In the background, for historical context, metrics are collected at 10s resolution.

## Notes/known issues

- This feature does not support Windows containers at this time.

- Real-time (2s) data collection is turned off after 30 minutes. To resume real-time collection, refresh the page.

- RBAC settings can restrict Kubernetes metadata collection. Refer to the [RBAC entites for the Datadog Agent][7].

- In Kubernetes the `health` value is the containers' readiness probe, not its liveness probe.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/containers
[2]: /integrations/docker_daemon
[3]: /integrations/kubernetes
[4]: /integrations/amazon_ecs
[5]: /agent/basic_agent_usage/docker/#run-the-docker-agent
[6]: /tagging
[7]: https://gist.github.com/hkaj/404385619e5908f16ea3134218648237
