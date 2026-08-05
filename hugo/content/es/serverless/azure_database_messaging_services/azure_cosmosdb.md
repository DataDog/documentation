---
title: Serverless Monitoring para Azure Cosmos DB
---
## Descripción general {#overview}

Datadog APM utiliza **tramos inferidos** para recopilar trazas y métricas de traza de las operaciones CRUD de Azure Cosmos DB. Estos tramos aparecen directamente en flame graph y en vistas de cascada. El rastreo distribuido de Cosmos DB no requiere configuración adicional más allá de la instrumentación existente para los usuarios de APM.

{{< img src="serverless/azure_database_messaging/azure_cosmosdb/azure_cosmos_flame_graph.png" alt="Datadog flame graph que muestra los tramos de la base de datos Cosmos DB junto a los tramos de API y procesamiento de colas en una aplicación distribuida .NET." style="width:100%;">}}

## Entornos de ejecución compatibles {#supported-runtimes}

| Entorno de ejecución | Versión mínima del rastreador | Capa Lambda mínima | SDK de Azure mínimo |
|---|---|---|---|
| Python 3.10+ | dd-trace-py v4.8.0 | lambda-python v8.125.0 | azure-cosmos >= 4.9.0 |
| Node.js | dd-trace-js v5.105.0 | N/A | @azure/cosmos >= 4.4.1 |
| .NET | dd-trace-dotnet v3.36.0 | N/A | Microsoft.Azure.Cosmos.Client >= 3.12.0 |