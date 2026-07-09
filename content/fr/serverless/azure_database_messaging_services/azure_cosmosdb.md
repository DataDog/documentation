---
title: Surveillance sans serveur pour Azure Cosmos DB
---
## Aperçu {#overview}

Datadog APM utilise **des spans inférés** pour collecter des traces et des métriques de traces des opérations CRUD d'Azure Cosmos DB. Ces spans apparaissent directement dans le flame graph et dans les waterfall views. Le traçage distribué de Cosmos DB ne nécessite aucune configuration supplémentaire au-delà de l'instrumentation existante pour les utilisateurs d'APM.

{{< img src="serverless/azure_database_messaging/azure_cosmosdb/azure_cosmos_flame_graph.png" alt="Datadog flame graph affichant les spans de base de données Cosmos DB aux côtés des spans API et queue-processing dans une application .NET distribuée." style="width:100%;">}}

## Runtimes pris en charge {#supported-runtimes}

| Runtime | Min tracer version | Min Lambda Layer | Min Azure SDK |
|---|---|---|---|
| Python 3.10+ | dd-trace-py v4.8.0 | lambda-python v8.125.0 | azure-cosmos >= 4.9.0 |
| Node.js | dd-trace-js v5.105.0 | N/A | @azure/cosmos >= 4.4.1 |
| .NET | dd-trace-dotnet v3.36.0 | N/A | Microsoft.Azure.Cosmos.Client >= 3.12.0 |