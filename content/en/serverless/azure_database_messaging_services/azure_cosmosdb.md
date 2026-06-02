---
title: Serverless Monitoring for Azure Cosmos DB
---

## Overview

Datadog APM uses **inferred spans** to collect traces and trace metrics from Azure Cosmos DB CRUD operations. These spans appear directly in flame graph and waterfall views. Cosmos DB distributed tracing requires no additional setup beyond existing instrumentation for APM users.

{{< img src="serverless/azure_database_messaging/azure_cosmosdb/azure_cosmos_flame_graph.png" alt="Datadog flame graph displaying Cosmos DB database spans alongside API and queue-processing spans in a distributed .NET application." style="width:100%;">}}

## Supported runtimes

| Runtime | Min tracer version | Min Lambda Layer | Min Azure SDK |
|---|---|---|---|
| Python 3.10+ | dd-trace-py v4.8.0 | lambda-python v8.125.0 | azure-cosmos >= 4.9.0 |
| Node.js | dd-trace-js v5.105.0 | N/A | @azure/cosmos >= 4.4.1 |
| .NET | dd-trace-dotnet v3.36.0 | N/A (NuGet) | Microsoft.Azure.Cosmos.Client >= 3.12.0 |
