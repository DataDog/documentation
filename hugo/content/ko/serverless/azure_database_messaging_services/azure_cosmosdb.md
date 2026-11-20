---
title: Azure Cosmos DB용 Serverless Monitoring
---
## 개요 {#overview}

Datadog APM은 **추론된 스팬**을 사용하여 Azure Cosmos DB CRUD 작업에서 트레이스 및 트레이스 메트릭을 수집합니다. 이 스팬은 플레임 그래프 및 워터폴 뷰에 바로 표시됩니다. Cosmos DB의 분산 트레이싱은 APM 사용자를 위한 기존 계측 외에 추가 설정이 필요하지 않습니다.

{{< img src="serverless/azure_database_messaging/azure_cosmosdb/azure_cosmos_flame_graph.png" alt="Datadog 플레임 그래프는 분산 .NET 애플리케이션에서 API 및 큐 처리 스팬과 함께 Cosmos DB 데이터베이스 스팬을 표시합니다." style="width:100%;">}}

## 지원되는 런타임 {#supported-runtimes}

| 런타임 | 최소 트레이서 버전 | 최소 Lambda 레이어 | 최소 Azure SDK |
|---|---|---|---|
| Python 3.10+ | dd-trace-py v4.8.0 | lambda-python v8.125.0 | azure-cosmos >= 4.9.0 |
| Node.js | dd-trace-js v5.105.0 | N/A | @azure/cosmos >= 4.4.1 |
| .NET | dd-trace-dotnet v3.36.0 | N/A | Microsoft.Azure.Cosmos.Client >= 3.12.0 |