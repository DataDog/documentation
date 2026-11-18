---
title: Logs
description: "Use the Logs overlay in Cloudcraft to view and search logs from cloud resources on your architecture diagrams."
further_reading:
- link: "/datadog_cloudcraft/overlays/infrastructure/"
  tag: "Documentation"
  text: "Infrastructure overlay"
- link: "/datadog_cloudcraft/overlays/observability/"
  tag: "Documentation"
  text: "Observability overlay"
- link: "/datadog_cloudcraft/overlays/apm/"
  tag: "Documentation"
  text: "APM overlay"
- link: "/logs/"
  tag: "Documentation"
  text: "Log Management"
site_support_id: cloudcraft_logs_overlay
---

## Overview

The Logs overlay shows logs from your cloud resources in the context of your Cloudcraft diagram. Use it to investigate a resource's logs without leaving the architecture view.

To open the overlay, click the {{< ui >}}Logs{{< /ui >}} tab in the overlay selector at the top of your diagram.

The overlay adds a pin to each supported resource that has logs. The pin shows the status of the most severe logs for that resource. It also shows the number of logs with that status, and a combined count of logs with all other statuses, for example, **9 Emergency, 14k other**.

{{< img src="datadog_cloudcraft/overlays/cloudcraft_logs_overlay_diagram.png" alt="Cloudcraft Logs overlay with a log search panel, and log pins and status counts on resources in an AWS diagram." style="width:100%;" >}}

### Supported resource types

The Logs overlay supports the following resource types:

| Provider | Hosts | Containers | Serverless | Managed databases |
|----------|-------|------------|------------|-------------------|
| AWS | EC2 instances | ECS services | Lambda functions | RDS instances |
| Azure | VM instances | None | Azure Functions | Azure SQL Server |
| Google Cloud | Compute Engine instances | None | Cloud Run services, Cloud Run functions (formerly Cloud Functions) | None |

For Azure SQL Server, the overlay shows the logs from the server and its databases on the server resource.

The Logs overlay does not support Elastic Load Balancing (ELB) load balancers.

### Logs from ECS services

For an ECS service, the overlay shows the following logs:

- **ECS events from the AWS integration**: Events such as task starts, steady-state messages, and task placement failures. These logs always have the `info` status, even when the message reports a failure. As a result, the pin for an ECS service can show `info` when the service is unhealthy. Read the log messages to confirm the state of the service.
- **Container logs from the Datadog Agent**: Application logs from containers that run on the EC2 launch type. To collect these logs, see [Amazon ECS Log Collection][3].

The overlay does not show the following ECS logs:

- Container logs from tasks that run on the Fargate launch type
- Logs sent through the `awslogs` log driver to CloudWatch Logs
- Logs sent through FireLens

## Prerequisites

Enable Log Management in your Datadog organization. To start collecting logs, see [Log Collection and Integrations][1].

## Investigate logs

The Logs overlay shows a search bar, a list of log results, and the pins on your diagram.

To investigate logs:

1. In the search bar, enter a query to filter the logs. The search bar uses the standard [log search syntax][2].
1. Use the time selector next to the {{< ui >}}Group Patterns{{< /ui >}} toggle to change the time range.
1. (Optional) Turn on {{< ui >}}Group Patterns{{< /ui >}} to group similar logs. For more information, see [Grouping Logs Into Patterns][4].
1. In the list of results, click a log to see its details in the log side panel.

To open the current query in the Log Explorer, click the <i class="icon-external-link"></i> **(open in new window)** icon at the top right of the list of results. The icon's tooltip is {{< ui >}}View in Explorer{{< /ui >}}.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/log_collection/
[2]: /logs/explorer/search_syntax/
[3]: /containers/amazon_ecs/logs/
[4]: /logs/explorer/analytics/patterns/
