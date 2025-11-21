---
title: Amazon Elastic Container (ECS) Explorer
aliases:
  - /infrastructure/containers/amazon_elastic_container_explorer
further_reading:
  - link: "https://www.datadoghq.com/blog/ecs-default-monitors/"
    tag: "Blog"
    text: "Catch and remediate ECS issues faster with default monitors and the ECS Explorer"
---

{{< img src="infrastructure/livecontainers/orch_ecs_ex.png" alt="ECS Explorer displaying ECS tasks." style="width:80%;">}}

## Overview

The Datadog Agent and Datadog Amazon ECS integration can retrieve ECS resources for the [ECS Explorer][1]. This feature enables you to monitor the status of EC2 and Fargate tasks, services, and other ECS components across all of your AWS accounts. You can view resource specifications for tasks within a service and correlate them with related logs, metrics, profiling, and more.

### Prerequisites

* **[AWS resource collection][10]**: Required for collecting ECS resources.
* **[ECS on EC2 integration][2]**: Required for monitoring clusters using the EC2 launch type.
* **[ECS on Fargate integration][3]**: Required for monitoring clusters using the Fargate launch type.
* **Datadog Agent version >= 7.58.0**: Recommended for a shorter refresh rate on the ECS Explorer page.

## Setup

Ensure you have enabled [AWS resource collection][10], the [ECS on EC2 integration][2], and the [ECS on Fargate integration][3].

**Note**: The collection interval for these integrations is approximately 24 hours. To achieve a shorter collection interval of 15 seconds, it is recommended to install the Datadog Agent in your ECS cluster.

{{< tabs >}}
{{% tab "Task Definition" %}}

If using the [task definition to install the Datadog Agent][4], add this environment variable to the Datadog Agent container to activate this feature.

This feature is enabled by default in Datadog Agent version 7.64.0 and later.

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

[4]: /containers/amazon_ecs/?tab=awscli#setup

{{% /tab %}}
{{% tab "Configuration File" %}}
For manual configuration, include the following line in the Datadog Agent configuration file.

```yaml
ecs_task_collection_enabled: true
```
{{% /tab %}}
{{< /tabs >}}

### Logs

For ECS on Fargate, it is recommended to use the [AWS FireLens integration][11] built on Datadog's Fluent Bit output plugin to send logs to Datadog. To ensure that logs are properly correlated between ECS resources and the log explorer, set `dd_source` to `ecs`:
```
{
  "logConfiguration": {
    "logDriver": "awsfirelens",
    "options": {
      "Name": "datadog",
      "apikey": "<DATADOG_API_KEY>",
      "Host": "http-intake.logs.datadoghq.com",
      "dd_service": "...",
      "dd_source": "ecs",
      "dd_message_key": "log",
      "dd_tags": "...",
      "TLS": "on",
      "provider": "ecs"
    }
  }
}
```

## Usage

### Views

Use the **Select Resources** dropdown menu in the top left corner of the page to switch between **Tasks**, **Services**, **Clusters**, and other ECS resources.

Each view includes a data table for organizing information by fields such as status, name, and AWS tags, along with a detailed Cluster Map to provide an overview of your tasks and ECS clusters.

Refer to [Query filter details](#query-filter-details) for information on filtering these views.

#### Group by functionality and facets

Group tasks by tags for an aggregated view that helps you find information more efficiently. You can group tasks using the **Group by** bar located at the top right of the page or by clicking on a specific tag and finding the group by function in the context menu, as illustrated below.

{{< img src="infrastructure/livecontainers/orch_ecs_ex_groupby.png" alt="Example of grouping by launch type" style="width:80%;">}}

Additionally, use facets on the left side of the page to filter or group resources according to your interests, such as tasks with Fargate launch type.

{{< img src="infrastructure/livecontainers/fargate.mp4" alt="Example of grouping Fargate tasks" video=true style="width:80%;">}}

### Cluster map

The cluster map provides a comprehensive view of your tasks and ECS clusters, allowing you to see all resources on one screen with customizable groups and filters. You can also select which metrics to color the nodes.

To examine resources from the cluster map, click on any circle or group to display a detailed panel.

{{< img src="infrastructure/livecontainers/ecs-cluster-map.mp4" alt="Cluster map with customized groups and filters" video=true style="width:80%;">}}

### Information panel

Click on any row in the table or any object in the Cluster Map to display detailed information about a specific resource in a side panel.

{{< img src="infrastructure/livecontainers/orch_ecs_ex_panel.png" alt="View of resources in the side panel, showing related resources." style="width:80%;">}}

The **Task Definition** tab in the side panel shows the complete task definition.

For task definitions, it also provides a history of seven days, allowing you to view all task definition revisions used by running tasks over the past week and compare changes between them.

{{< img src="infrastructure/livecontainers/orch_ecs_ex_manifest_history.png" alt="View of resource details in the side panel, highlighting task definition history feature" style="width:80%;">}}

Other tabs provide additional information for troubleshooting the selected resource:

* **Related Resources**: View all related resources in a tree structure.
* [**Logs**][5]: Access logs from your container or resource. Click on any log entry to view the full log details in the Log Explorer.
* [**Metrics**][6]: View live metrics for your container or resource. You can maximize any graph for full-screen viewing, share a snapshot, or export it from this tab.
* [**APM**][7]: Access traces from your container or resource, including details such as date, service, duration, method, and status code.
* **Network**: View network performance metrics for a container or resource, including source and destination, sent and received volume, and throughput. Use the **Destination** field to filter by tags like `DNS` or `ip_type`, or use the **Group by** filter to group network data by tags, such as `task_name` or `service`.
* **Monitors**: View monitors that are tagged, scoped, or grouped for this resource.

## Query filter details

You can refine displayed resources by entering a query in the **Filter by** search bar at the top left of the page. The query filtering operates similarly to the filtering in the [Kubernetes Explorer][8].

### AWS tags

In the ECS Explorer, you can use `tag#` to search across both Datadog tags and AWS tags.

### Extracted tags

In addition to the tags you have [configured][9] in your Datadog Agent, Datadog generates additional tags based on resource attributes, which can assist in your searching and grouping needs. These tags are conditionally added to resources when relevant.

#### All resources

All resources include the following tags:

* `aws_account`: AWS account ID
* `region`: AWS account region
* `<resource_name>_arn`: Resource ARN tags, such as `task_arn`, `task_definition_arn`, `service_arn`, and more.
* `ecs_<resource_name>`: Resource name tags, such as `ecs_task`, `ecs_task_definition`, `ecs_service`, and more.

#### Relationships

Related Resources are tagged in relation to one another. Some examples include:

- A task belonging to the "XYZ" service, with an ARN of `XYZ-ARN`, can have tags `ecs_service:xyz` and `service_arn:xyz-arn`.
- A service that is part of the "XYZ" cluster, identified by the ARN `XYZ-ARN`, can have tags `ecs_cluster:xyz` and `cluster_arn:xyz-arn`.

> **Tip:** Use the filter query autocomplete feature to explore available related resource tags. Type `ecs_` to see suggested results.

#### Resource specific tags

Some resources have specific tags. The following tags are available in addition to the shared tags mentioned above.

| Resource | Extracted Tags |
|---|---|
| **Task** | `task_family`<br>`task_version`<br>`task_launch_type` |
| **Task Definition** | `task_family`<br>`task_version`<br>`task_launch_type`<br>`task_definition_status` |
| **Service** | `task_family`<br>`task_version`<br>`task_launch_type`<br>`service_status` |

## Notes and known issues

* Installing the Datadog Agent in your cluster affects how often the ECS Explorer refreshes:

| **Resource**        | **With Datadog Agent** | **Without Datadog Agent** |
|---------------------|------------------------|--------------------------|
| **Cluster**         | ~15 minutes             | ~15 minutes               |
| **Task**            | ~15 seconds             | ~15 minutes                 |
| **Task Definition** | ~15 seconds             | ~15 minutes                 |
| **Service**         | ~15 seconds             | ~15 minutes                 |
| **Container Instance**         | ~15 minutes               | ~15 minutes                 |

* A newly created ECS Service is typically collected within approximately 15 seconds. However, for status changes in an existing Service, a refresh within 15 seconds is not guaranteed.
* Installing the Datadog Agent in your cluster enables visibility into task lifecycle changes. Without the Datadog Agent, stopped tasks can appear as running for up to two days.
* Installing the Datadog Agent in your cluster provides additional, relevant host-level tags, such as `availability_zone`.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/orchestration/explorer/ecsTask
[2]: /integrations/amazon_ecs
[3]: /integrations/ecs_fargate
[5]: /logs
[6]: /metrics
[7]: /tracing
[8]: /infrastructure/containers/orchestrator_explorer/?tab=manual#query-filter-details
[9]: /getting_started/tagging/assigning_tags/?tab=containerizedenvironments
[10]: /integrations/amazon_web_services/#resource-collection
[11]: /integrations/aws-fargate/?tab=webui#fluent-bit-and-firelens
