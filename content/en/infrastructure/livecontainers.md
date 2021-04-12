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

## Overview

[Datadog Live Containers][1] enables real-time visibility into all containers across your environment.

Taking inspiration from bedrock tools like *htop*, *ctop*, and *kubectl*, live containers give you complete coverage of your container infrastructure in a continuously updated table with resource metrics at two-second resolution, faceted search, and streaming container logs.

Coupled with [Docker][2], [Kubernetes][3], [ECS][4], and other container technologies, plus built-in tagging of dynamic components, the live container view provides a detailed overview of your containers' health, resource consumption, logs, and deployment in real time:

{{< img src="infrastructure/livecontainers/livecontainersoverview.png" alt="Live containers with summaries"  >}}

## Configuration

### Kubernetes resources

The Datadog Agent and Cluster Agent can be configured to retrieve Kubernetes resources for [Live Containers][5]. This feature allows you to monitor the state of pods, deployments and other Kubernetes concepts in a specific namespace or availability zone, view resource specifications for failed pods within a deployment, correlate node activity with related logs, and more.

Kubernetes resources for Live Containers requires [Agent version >= 7.21.1][6] and [Cluster Agent version >= 1.9.0][7] prior to the configurations below.

{{< tabs >}}
{{% tab "Helm" %}}

If you are using the official [Datadog Helm Chart][1]:

- Use chart version 2.4.5 or above
  **Note**: Ensure the Agent and Cluster Agent versions are hardcoded with the minimum versions required or above in your helm chart [values.yaml][2] file.
- Set `datadog.orchestratorExplorer.enabled` to `true` in [values.yaml][2]
- Deploy a new release

In some setups, the Process Agent and Cluster Agent are unable to automatically detect a Kubernetes cluster name. If this happens the feature will not start, and you will see a WARN log in the Cluster Agent logs saying `Orchestrator explorer enabled but no cluster name set: disabling`. In this case you must set `datadog.clusterName` to your cluster name in [values.yaml][2].

[1]: https://github.com/DataDog/helm-charts
[2]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "DaemonSet" %}}

1. [Cluster Agent][1] version >= 1.9.0 is required before configuring the DaemonSet. The Cluster Agent must be running, and the Agent must be able to communicate with it. See the [Cluster Agent Setup documentation][2] for configuration.

    - Set the Cluster Agent container with the following environment variable:

        ```yaml
          - name: DD_ORCHESTRATOR_EXPLORER_ENABLED
            value: "true"
        ```

    - Set the Cluster Agent ClusterRole with the following RBAC permissions. 
Note particularly that for the `apps` apiGroups, Live Containers need permissions 
to collect common kubernetes resources (`pods`, `services`, `nodes`, etc.), 
which should be already in the RBAC if you followed [Cluster Agent Setup 
documentation][2]. But if they are missing, ensure they are added (after 
`deployments`, `replicasets`):
        ```yaml
          ClusterRole:
          - apiGroups:  # To create the datadog-cluster-id CM
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
            verbs:
            - list
            - get
            - watch
        ```
    These permissions are needed to create a `datadog-cluster-id` ConfigMap in the same Namespace as the Agent DaemonSet and the Cluster Agent Deployment, as well as to collect Deployments and ReplicaSets.

    If the `cluster-id` ConfigMap doesn't get created by the Cluster Agent, the Agent pod will not start, and fall in `CreateContainerConfigError` status. If the Agent pod is stuck because this ConfigMap doesn't exist, update the Cluster Agent permissions and restart its pods to let it create the ConfigMap and the Agent pod will recover automatically.

2. The Process Agent, which runs in the Agent DaemonSet, must be enabled and running (it doesn't need to run the process collection), and configured with the following options:

    ```yaml
    - name: DD_ORCHESTRATOR_EXPLORER_ENABLED
      value: "true"
    - name: DD_ORCHESTRATOR_CLUSTER_ID
      valueFrom:
        configMapKeyRef:
          name: datadog-cluster-id
          key: id
    ```

In some setups, the Process Agent and Cluster Agent are unable to automatically detect a Kubernetes cluster name. If this happens the feature will not start, and you will see a WARN log in the Cluster Agent logs saying `Orchestrator explorer enabled but no cluster name set: disabling`. In this case you must add the following options in the `env` section of both the Cluster Agent and the Process Agent:

  ```yaml
  - name: DD_CLUSTER_NAME
    value: "<YOUR_CLUSTER_NAME>"
  ```

[1]: /agent/cluster_agent/
[2]: /agent/cluster_agent/setup/
{{% /tab %}}
{{< /tabs >}}

### Add custom tags to resources

You can add custom tags to Kubernetes resources to ease filtering inside the Kubernetes resources view.

Additional tags are added through the `DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS` environment variable.

**Note**: These tags only show up in the Kubernetes resources view.


{{< tabs >}}
{{% tab "Helm" %}}

If you are using the official Helm chart, add the environment variable on both the Process Agent and the Cluster Agent by setting `agents.containers.processAgent.env` and `clusterAgent.env` respectively in [values.yaml][1].

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


Then deploy a new release.

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

If you've enabled Kubernetes Resources, strings such as `pod`, `deployment`, `ReplicaSet`, and `service name`, as well as Kubernetes labels are searchable in a [Kubernetes Resources view](#kubernetes-resources-view).

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

Containers are [tagged][8] with all existing host-level tags, as well as with metadata associated with individual containers.

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

If you have configuration for [Unified Service Tagging][9] in place, `env`, `service`, and `version` will also be picked up automatically.
Having these tags available will let you tie together APM, logs, metrics, and live container data.

## Views

### Containers view

The **Containers** view includes [Scatter Plot](#scatter-plot) and [Timeseries][10] views, and a table to better organize your container data by fields such as container name, status, and start time.

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

### Kubernetes resources view

If you have enabled Kubernetes Resources for Live Containers, toggle between the **Pods**, **Deployments**, **ReplicaSets**, and **Services** views in the **View** dropdown menu in the top left corner of the page. Each of these views includes a data table to help you better organize your data by field such as status, name, and Kubernetes labels, and a detailed Cluster Map to give you a bigger picture of your pods and Kubernetes clusters.

#### Cluster map

A Kubernetes Cluster Map gives you a bigger picture of your pods and Kubernetes clusters. You can see all of your resources together on one screen with customized groups and filters, and choose which metrics to fill the color of the pods by.

Drill down into resources from Cluster Maps by click on any circle or group to populate a detailed panel.

#### Information panel

Click on any row in the table or on any object in a Cluster Map to view information about a specific resource in a side panel. This panel is useful for troubleshooting and finding information about a selected container or resource, such as:

* [**Logs**][11]: View logs from your container or resource. Click on any log to view related logs in Logs Explorer.
* [**Metrics**][12]: View live metrics for your container or resource. You can view any graph full screen, share a snapshot of it, or export it from this tab.
* **Network**: View a container or resource’s network performance, including source, destination, sent and received volume, and throughput fields. Use the **Destination** field to search by tags like `DNS` or `ip_type`, or use the **Group by** filter in this view to group network data by tags, like `pod_name` or `service`.
* [**Traces**][13]: View traces from your container or resource, including the date, service, duration, method, and status code of a trace.

Kubernetes Resources views have a few additional tabs:

* **Processes**: View all processes running in the container of this resource.
* **YAML**: A detailed YAML overview for the resource.
* [**Events**][14]: View all Kubernetes events for your resource.

For a detailed dashboard of this resource, click the **View Dashboard** in the top right corner of this panel.

### Container logs

View streaming logs for any container like `docker logs -f` or `kubectl logs -f` in Datadog. Click any container in the table to inspect it. Click the *Logs* tab to see real-time data from [live tail][15] or indexed logs for any time in the past.

#### Live tail

With live tail, all container logs are streamed. Pausing the stream allows you to easily read logs that are quickly being written; unpause to continue streaming.

Streaming logs can be searched with simple string matching. For more details about live tail, see the [documentation][15].

**Note**: Streaming logs are not persisted, and entering a new search or refreshing the page clears the stream.

{{< img src="infrastructure/livecontainers/livecontainerlogssidepanel.mp4" alt="Preview Logs Sidepanel" video="true"  >}}

#### Indexed logs

You can see logs that you have chosen to index and persist by selecting a corresponding timeframe. Indexing allows you to filter your logs using tags and facets. For example, to search for logs with an `Error` status, type `status:error` into the search box. Autocompletion can help you locate the particular tag that you want. Key attributes about your logs are already stored in tags, which enables you to search, filter, and aggregate as needed.

{{< img src="infrastructure/livecontainers/errorlogs.png" alt="Preview Logs Sidepanel"  style="width:100%;">}}

## Notes and known issues

* Real-time (2s) data collection is turned off after 30 minutes. To resume real-time collection, refresh the page.
* RBAC settings can restrict Kubernetes metadata collection. Refer to the [RBAC entites for the Datadog Agent][16].
* In Kubernetes the `health` value is the containers' readiness probe, not its liveness probe.

### Kubernetes resources

* Data is updated automatically in constant intervals. Update intervals may change during beta.
* In clusters with 1000+ Deployments or ReplicaSets you may notice elevated CPU usage from the Cluster Agent. There is an option to disable container scrubbing in the Helm chart, see [the Helm Chart repo][17] for more details.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/containers
[2]: /integrations/docker_daemon/
[3]: /agent/kubernetes/
[4]: /agent/amazon_ecs/
[5]: https://app.datadoghq.com/orchestration/overview
[6]: /agent/
[7]: /agent/cluster_agent/setup/
[8]: /tagging/assigning_tags?tab=agentv6v7#host-tags
[9]: /getting_started/tagging/unified_service_tagging
[10]: /dashboards/widgets/timeseries/
[11]: /logs
[12]: /metrics
[13]: /tracing
[14]: /events
[15]: /logs/live_tail/
[16]: https://github.com/DataDog/datadog-agent/blob/7.23.1/Dockerfiles/manifests/cluster-agent/rbac.yaml
[17]: https://github.com/DataDog/helm-charts/tree/master/charts/datadog
