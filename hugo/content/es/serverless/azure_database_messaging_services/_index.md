---
title: Servicios de Base de Datos y Mensajería de Azure
---
## Descripción general {#overview}

Datadog APM utiliza **tramos inferidos** para recopilar trazas y métricas de traza de Azure Cosmos DB, Event Hubs y Service Bus. Los tramos inferidos aparecen automáticamente en flame graph y en vistas en cascada para los servicios instrumentados por Datadog que se ejecutan en Azure. No se requiere configuración adicional. Para configurar la instrumentación para cargas de trabajo Serverless de Azure, consulte [Serverless Monitoring][1].

{{< card-grid card_width="170px" >}}
  {{< image-card href="azure_cosmosdb/" src="integrations_logos/azure_cosmosdb.png" alt="azure_cosmosdb" >}}
  {{< image-card href="azure_event_hubs/" src="integrations_logos/azure_event_hub.png" alt="azure_event_hubs" >}}
  {{< image-card href="azure_service_bus/" src="integrations_logos/azure_service_bus.png" alt="azure_service_bus" >}}
{{< /card-grid >}}

[1]: /es/serverless