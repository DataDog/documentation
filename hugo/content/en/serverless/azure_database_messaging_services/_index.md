---
title: Azure Database and Messaging Services
---

## Overview

Datadog APM uses **inferred spans** to collect traces and trace metrics from Azure Cosmos DB, Event Hubs, and Service Bus. Inferred spans appear automatically in flame graph and waterfall views for Datadog-instrumented services running on Azure. No additional configuration is required. To set up instrumentation for Azure Serverless workloads, see [Serverless Monitoring][1].

{{< card-grid card_width="170px" >}}
  {{< image-card href="/serverless/azure_database_messaging_services/azure_cosmosdb/" src="integrations_logos/azure_cosmosdb.png" alt="azure_cosmosdb" >}}
  {{< image-card href="/serverless/azure_database_messaging_services/azure_event_hubs/" src="integrations_logos/azure_event_hub.png" alt="azure_event_hubs" >}}
  {{< image-card href="/serverless/azure_database_messaging_services/azure_service_bus/" src="integrations_logos/azure_service_bus.png" alt="azure_service_bus" >}}
{{< /card-grid >}}

[1]: /serverless
