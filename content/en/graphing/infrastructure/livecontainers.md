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

[Datadog Live Containers][1] enables real-time visibility into all containers across your environment.

Taking inspiration from bedrock tools like *htop*, *ctop*, and *kubectl*, live containers give you complete coverage of your container infrastructure in a continuously updated table with resource metrics at two-second resolution, faceted search, and streaming container logs.

Coupled with integrations for [Docker][2], [Kubernetes][3], [ECS][4], and other container technologies, plus built-in tagging of dynamic components, the live container view provides a detailed overview of your containers' health, resource consumption, logs, and deployment in real time:

{{< img src="graphing/infrastructure/livecontainers/livecontainerssummaries.png" alt="Live containers with summaries" responsive="true" >}}

## Installation
After deploying the [Docker Agent][5], container metrics are available without additional configuration. To enable log collection follow these steps:

{{< tabs >}}

{{% tab "Linux/Windows" %}}
Once the [Datadog Agent][1] is installed, enable log collection by editing the [Agent main configuration file][2] and updating the following parameters:

```
logs_enabled: true
listeners:
  - name: docker
config_providers:
  - name: docker
    polling: true
```
**Notes**:

* To collect container information in the standard install rather than with the [Docker Agent][1], the `dd-agent` user must have permissions to access **docker.sock**.
* Logs are indexed by default, however [Exclusion Filters][2] are configurable for fine-grained controls over indexing and uniquely receiving Live Tail data.


[1]: /agent/docker/log/?tab=hostinstallation
[2]: /agent/guide/agent-configuration-files/
{{% /tab %}}

{{% tab "Docker" %}}

Follow the instructions for the [Docker Agent][1], passing in the following attributes, in addition to any other custom settings as appropriate:

```
-e DD_LOGS_ENABLED=true
-e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true
```

**Note**: Logs are indexed by default, however [Exclusion Filters][2] are configurable for fine-grained controls over indexing and uniquely receiving Live Tail data.

[1]: /agent/docker/log/?tab=containerinstallation
[2]: /logs/indexes/#exclusion-filters
{{% /tab %}}

{{% tab "Kubernetes" %}}
In the `dd-agent.yaml` manifest used to create the [DaemonSet][1], add the following environment variables, volume mount, and volume:

```
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

**Note**:

* Logs are indexed by default, however [Exclusion Filters][2] are configurable for fine-grained controls over indexes and Live Tail data uniquely.

[1]: /agent/kubernetes/daemonset_setup
[2]: /logs/indexes/#exclusion-filters
{{% /tab %}}
{{< /tabs >}}

For more information about activating log integrations, see the [ Log collection documentation][6].

## Container Logs

View streaming logs for any container like `docker logs -f` or `kubectl logs -f`—in Datadog. Click any container in the table to inspect it. Click the *Logs* tab to see real-time data from [Live Tail][7] or indexed logs for any time in the past.

### Live Tail
With Live Tail, all container logs are streamed -- pausing the stream allows you to easily read logs that are quickly being written; un-pause to continue streaming.

Streaming logs can be searched with simple string matching. For more details about Live Tail, see the [Live Tail documentation][7].

**Note**: Streaming logs are not persisted, and entering a new search or refreshing the page clears the stream.

{{< img src="graphing/infrastructure/livecontainers/livecontainerlogssidepanel.mp4" alt="Preview Logs Sidepanel" video="true" responsive="true" >}}

### Indexed Logs

You can see logs that you have chosen to index and persist by selecting a corresponding timeframe. Indexing allows you to filter your logs using tags and facets. For example, to search for logs with an `Error` status, type `status:error` into the search box. Autocompletion can help you locate the particular tag that you want. Key attributes about your logs are already stored in tags, which enables you to search, filter, and aggregate as needed.

{{< img src="graphing/infrastructure/livecontainers/errorlogs.png" alt="Preview Logs Sidepanel" responsive="true" style="width:100%;">}}

## Searching, Filtering, and Pivoting

### String Search

Containers are, by their nature, extremely high cardinality objects. Datadog's flexible string search matches substrings in the container name, ID, or image fields.

To combine multiple string searches into a complex query, you can use any of the following Boolean operators:

|              |                                                                                                                                  |                                                                 |
| :----        | :----                                                                                                                            | :----                                                           |
| **Operator** | **Description**                                                                                                                  | **Example**                                                     |
| `AND`        | **Intersection**: both terms are in the selected events (if nothing is added, AND is taken by default)                           | java AND elasticsearch                                          |
| `OR`         | **Union**: either term is contained in the selected events                                                                       | java OR python                                                  |
| `NOT` / `!`  | **Exclusion**: the following term is NOT in the event. You may use the word `NOT` or `!` character to perform the same operation | java NOT elasticsearch <br> **equivalent:** java !elasticsearch |

Use parentheses to group operators together. For example, `(NOT (elasticsearch OR kafka) java) OR python`.


### Tagging

Containers are [tagged][8] with all existing host-level tags, as well as with metadata associated with individual containers.

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

## Include/Exclude containers

*Note that Live Containers is not metered. Including or excluding containers does not affect billing.*

It is possible to include and/or exclude containers from real-time collection:

- Exclude containers either via passing the environment variable `DD_AC_EXCLUDE` or adding `ac_exclude:` in your `datadog.yaml` main configuration file.
- Include containers either via passing the environment variable `DD_AC_INCLUDE` or adding `ac_include:` in your `datadog.yaml` main configuration file.

Both arguments take an **image name** as value; regular expressions are also supported.

For example, to exclude all Debian images except containers with a name starting with *frontend*, add these two configuration lines in your `datadog.yaml` file:

```
ac_exclude: ["image:debian"]
ac_include: ["name:frontend.*"]
```

**Note**: For Agent 5, instead of including the above in the `datadog.conf` main configuration file, explicitly add a `datadog.yaml` file to `/etc/datadog-agent/`, as the Process Agent requires all configuration options here. This configuration only excludes containers from real-time collection, **not** from Autodiscovery.

## Notes/known issues

- This feature does not support Windows containers at this time.

- Real-time (2s) data collection is turned off after 30 minutes. To resume real-time collection, refresh the page.

- RBAC settings can restrict Kubernetes metadata collection. Refer to the [RBAC entites for the Datadog Agent][9].

- In Kubernetes the `health` value is the containers' readiness probe, not its liveness probe.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/containers
[2]: /integrations/docker_daemon
[3]: /integrations/kubernetes
[4]: /integrations/amazon_ecs
[5]: /agent/docker/#run-the-docker-agent
[6]: /agent/docker/log/?tab=hostinstallation#activate-log-integrations
[7]: /logs/live_tail
[8]: /tagging
[9]: https://gist.github.com/hkaj/404385619e5908f16ea3134218648237
