---
title: Amazon Elastic Container (ECS) Explorer
aliases:
  - /infrastructure/containers/amazon_elastic_container_explorer
---

{{< img src="infrastructure/livecontainers/orch_ecs_ex.png" alt="ECS Explorer, showing ECS tasks." style="width:80%;">}}

## Overview

The Datadog Agent, AWS ECS on EC2 integration and AWS ECS on Fargate integration can retrieve ECS resources for the [ECS Explorer][1]. This feature allows you to monitor the state of EC2 and Fargate tasks, services and other ECS concepts in a specific AWS account, view resource specifications for tasks within a service, correlate with related task logs, metric, profiling, and more.

ECS Explorer requires **AWS ECS on EC2 integration Enabled**[2] and **AWS ECS on Fargate integration Enabled**[3]. **Agent version >= 7.58.0** is optional.

## Setup

Enusre that you have enabled [AWS ECS on EC2 integration][2] and [AWS ECS on Fargate integration][3]. 

**Note**: The collection interval for these two integrations is approximately 24 hours. To experience a shorter collection interval of 15 seconds, it is recommended to install the Datadog Agent in your ECS cluster.

{{< tabs >}}
{{% tab "Task Definition" %}}
If you are using the [task definition to install the Datadog Agent][4], you can add this new environment variable to the Datadog Agent container to enable this feature.

```yaml
    {
      "containerDefinitions": [
        {
          "name": "datadog-agent",
          "environment": [
            {
              "name": "DD_ECS_TASK_COLLECTION_ENABLED",
              "value": "true"
            }
            # (...)
          ]
          # (...)
        }
      ],
    # (...)
    }
```

{{% /tab %}}
{{% tab "Manual" %}}
For manual setup, include this section in the Datadog Agent configuration file.

```yaml
ecs_task_collection_enabled: true
```
{{% /tab %}}
{{< /tabs >}}

## Usage

### Views

Toggle among the **Tasks**, **Services**, **Clusters**, and other ECS resources in the **Select Resources** dropdown menu in the top left corner of the page.

Each of these views includes a data table to help you better organize your data by field such as status, name, and AWS tags, and a detailed Cluster Map to give you a bigger picture of your tasks and ECS clusters.

**See [Query filter details](#query-filter-details) for more details on how to filter these views.**

{{< img src="infrastructure/livecontainers/orch_ecs_ex_servces.png" alt="ECS Explorer opened to show resources > Services, in Summary mode" style="width:80%;">}}

#### Group by functionality and facets

Group tasks by tags to get an aggregated view which allows you to find information quicker. You can perform a group by using the "Group by" bar on the top right of the page or by clicking on a particular tag and locating the group by function in the context menu as shown below.

{{< img src="infrastructure/livecontainers/orch_ecs_ex_groupby.png" alt="An example of grouping by launch type" style="width:80%;">}}

You can also use facets on the left hand side of the page to group resources or filter for resources you care most about, such as tasks with Fargate launch type.

{{< img src="infrastructure/livecontainers/fargate.mp4" alt="An example of grouping the Fagate tasks" video=true style="width:80%;">}}

### Cluster map

A cluster map gives you a bigger picture of your tasks and ECS clusters. You can see all of your resources together on one screen with customized groups and filters, and choose which metrics to fill the color of the nodes.

Examine resources from cluster maps by clicking on any circle or group to populate a detailed panel.

{{< img src="infrastructure/livecontainers/ecs-cluster-map.mp4" alt="A cluster map with customized groups and filters" video=true style="width:80%;">}}

### Information panel

Click on any row in the table or on any object in a Cluster Map to view information about a specific resource in a side panel.

{{< img src="infrastructure/livecontainers/orch_ecs_ex_panel.png" alt="A view of resources in the side panel, opened to related resources." style="width:80%;">}}

The side panel's **Task Definition** tab shows the full task definition. 

For task definitions, it also provides seven days of history, allowing you to view all versions used by the task over the past week. You can compare and see what changes occurred between different versions.

{{< img src="infrastructure/livecontainers/orch_ecs_ex_manifest_history.png" alt="A view of resources in the side panel, showing the task definition history feature" style="width:80%;">}}

The other tabs show more information for troubleshooting the selected resource:

* **Related Resources**: View all the related resources in a tree structure.
* [**Logs**][5]: View logs from your container or resource. Click on any log to view related logs in the Log Explorer.
* [**Metrics**][6]: View live metrics for your container or resource. You can view any graph full screen, share a snapshot of it, or export it from this tab.
* [**APM**][7]: View traces from your container or resource, including the date, service, duration, method, and status code of a trace.
* **Processes**: View all processes running in the container of this resource.
* **Network**: View a container or resource's network performance, including source, destination, sent and received volume, and throughput fields. Use the **Destination** field to search by tags like `DNS` or `ip_type`, or use the **Group by** filter in this view to group network data by tags, like `task_name` or `service`.
* **Monitors**: View monitors tagged, scoped, or grouped for this resource.

## Query filter details

You can refine the displayed resources by entering a query in the "Filter by" search bar located at the top left of the page. The query filtering functionality works the same way as it does in the [Kubernetes Explorer][8].

### Exception

In ECS Explorer, you can use `tag#` to search across both Datadog tags and AWS tags.

### Extracted tags

In addition to the tags you have [configured][9] within your Datadog agent, Datadog injects generated tags based on resource attributes that can help your searching and grouping needs. These tags are added to resources conditionally, when they are relevant.

#### All resources

All resources have all these tags. 

* `aws_account`: AWS account ID
* `region`: AWS account region
* `<resource_name>_arn`: Resource ARN tag, such as `task_arn`, `task_definition_arn`, `service_arn` and others.
* `ecs_<resource_name>`: Resource name tag, such as `ecs_task`, `ecs_task_definition`, `ecs_service` and others.

#### Relationships

Related Resources will be tagged with each other. Some examples:

- A task that is part of the "XYZ" service, with an ARN of `XYZ-ARN`, will have a `ecs_service:xyz` tag and a `service_arn:xyz-arn` tag.
- A service that belongs to "XYZ" cluster, with an ARN of `XYZ-ARN`, will have a `ecs_cluster:xyz` tag and a `cluster_arn:xyz-arn` tag.

> **Tip:** Utilize the filter query autocomplete feature to discover what related resource tags are available. Type `ecs_` and see what results are suggested.

#### Resource specific tags

Some resources have specific tags that are extracted based on your cluster's environment. The following tags are available in addition to the shared tags above.

| Resource | Extracted Tags |
|---|---|
| **Task** | `task_family`<br>`task_version`<br>`task_launch_type` |
| **Task Definition** | `task_family`<br>`task_version`<br>`task_launch_type`<br>`task_definition_status` |
| **Service** | `task_family`<br>`task_version`<br>`task_launch_type`<br>`service_status` |


## Notes and known issues

* Without the Datadog Agent installed in the cluster, the refresh interval for ECS Explorer is approximately 24 hours.

[1]: https://app.datadoghq.com/orchestration/explorer/ecsTask
[2]: /integrations/amazon_ecs
[3]: integrations/ecs_fargate
[4]: /containers/amazon_ecs
[5]: /logs
[6]: /metrics
[7]: /tracing
[8]: /infrastructure/containers/orchestrator_explorer/?tab=manual#query-filter-details
[9]: /getting_started/tagging/assigning_tags/?tab=containerizedenvironments
