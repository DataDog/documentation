---
title: Services de base de données et de messagerie Azure
---
## Aperçu {#overview}

Datadog APM utilise **des spans inférés** pour collecter des traces et des métriques de trace à partir d'Azure Cosmos DB, Event Hubs et Service Bus. Les spans inférés apparaissent automatiquement dans les vues flame graph et waterfall pour les services instrumentés par Datadog fonctionnant sur Azure. Aucune configuration supplémentaire n'est requise. Pour configurer l'instrumentation des charges de travail Azure Serverless, voir [Serverless Monitoring][1].

{{< card-grid card_width="170px" >}}
  {{< image-card href="azure_cosmosdb/" src="integrations_logos/azure_cosmosdb.png" alt="azure_cosmosdb" >}}
  {{< image-card href="azure_event_hubs/" src="integrations_logos/azure_event_hub.png" alt="azure_event_hubs" >}}
  {{< image-card href="azure_service_bus/" src="integrations_logos/azure_service_bus.png" alt="azure_service_bus" >}}
{{< /card-grid >}}

[1]: /fr/serverless