---
further_reading:
- link: https://www.datadoghq.com/blog/monitor-azure-functions-hosting-plans/
  tag: Blog
  text: Haga un seguimiento de Azure Functions en todos los planes de hospedaje con
    Datadog
title: Servicios de base de datos y mensajería de Azure
---
## Descripción general {#overview}

Datadog APM utiliza **intervalos inferidos** para recopilar trazas y métricas de traza de Azure Cosmos DB, Event Hubs y Service Bus. Los intervalos inferidos aparecen automáticamente en el flame graph y en las waterfall views para los servicios instrumentados por Datadog que se ejecutan en Azure. No se requiere configuración adicional. Para configurar la instrumentación para cargas de trabajo Serverless de Azure, consulte [Serverless Monitoring][1].

{{< card-grid card_width="170px" >}}
  {{< image-card href="/serverless/azure_database_messaging_services/azure_cosmosdb/" src="integrations_logos/azure_cosmosdb.png" alt="azure_cosmosdb" >}}
  {{< image-card href="/serverless/azure_database_messaging_services/azure_event_hubs/" src="integrations_logos/azure_event_hub.png" alt="azure_event_hubs" >}}
  {{< image-card href="/serverless/azure_database_messaging_services/azure_service_bus/" src="integrations_logos/azure_service_bus.png" alt="azure_service_bus" >}}
{{< /card-grid >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/serverless