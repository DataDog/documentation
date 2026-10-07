---
further_reading:
- link: https://www.datadoghq.com/blog/monitor-azure-functions-hosting-plans/
  tag: Blog
  text: Surveillez les Azure Functions sur tous les plans d'hébergement avec Datadog
title: Services de base de données et de messagerie Azure
---
## Présentation {#overview}

Datadog APM utilise des **spans déduits** pour collecter des traces et des métriques de trace à partir d'Azure Cosmos DB, Event Hubs et Service Bus. Les spans déduits apparaissent automatiquement dans les vues « flame graph » et « waterfall » pour les services instrumentés par Datadog s'exécutant sur Azure. Aucune configuration supplémentaire n'est requise. Pour configurer l'instrumentation des charges de travail Azure Serverless, consultez [Serverless Monitoring][1].

{{< card-grid card_width="170px" >}}
  {{< image-card href="/serverless/azure_database_messaging_services/azure_cosmosdb/" src="integrations_logos/azure_cosmosdb.png" alt="azure_cosmosdb" >}}
  {{< image-card href="/serverless/azure_database_messaging_services/azure_event_hubs/" src="integrations_logos/azure_event_hub.png" alt="azure_event_hubs" >}}
  {{< image-card href="/serverless/azure_database_messaging_services/azure_service_bus/" src="integrations_logos/azure_service_bus.png" alt="azure_service_bus" >}}
{{< /card-grid >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/serverless