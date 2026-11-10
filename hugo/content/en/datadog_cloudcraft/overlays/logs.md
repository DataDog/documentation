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

To open the overlay, click the {{< ui >}}Logs{{< /ui >}} tab in the overlay selector at the top of your diagram.

### Supported resource types

The Logs overlay supports the following resource types:

| Provider | Hosts | Serverless | Managed databases |
|----------|-------|------------|-------------------|
| AWS | EC2 instances | Lambda functions | RDS instances |
| Azure | VM instances | Azure Functions | Azure SQL Server |
| Google Cloud | Compute Engine instances | Cloud Run services, Cloud Run functions (formerly Cloud Functions) | None |

For Azure SQL Server, the overlay shows the logs from the server and its databases on the server resource.

## Prerequisites

Enable Log Management in your Datadog organization. To start collecting logs, see [Log Collection and Integrations][1].

## Investigate logs

To filter logs in the overlay, use the search bar. It uses the standard [log search syntax][2].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/log_collection/
[2]: /logs/explorer/search_syntax/
