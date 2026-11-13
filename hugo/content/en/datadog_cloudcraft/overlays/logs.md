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
---

## Overview

The Logs overlay shows logs from your cloud resources in the context of your Cloudcraft diagram. Use it to view the logs from a resource without leaving the architecture view.

To open the overlay, click the {{< ui >}}Logs{{< /ui >}} tab in the overlay selector at the top of your diagram. The overlay adds a pin to each supported resource that has logs. The pin shows the status of the resource's logs.

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

To filter logs in the overlay, use the search bar. It uses the standard [log search syntax][2].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/log_collection/
[2]: /logs/explorer/search_syntax/
[3]: /containers/amazon_ecs/logs/
