---
title: Azure Service Bus용 Serverless Monitoring
---
## 개요 {#overview}

Datadog APM은 **추론된 스팬**을 사용하여 Azure Service Bus에서 트레이스와 트레이스 메트릭을 수집합니다. 이 스팬은 플레임 그래프 및 워터폴 뷰에 바로 표시됩니다.

Python 및 Node.js의 경우, Datadog은 Service Bus 생산자와 Azure Functions 소비자를 트레이싱합니다. .NET은 전체 생산자 및 소비자 트레이싱을 지원합니다. Service Bus 분산 트레이싱은 APM 사용자를 위한 기존 계측 외에 추가 설정이 필요하지 않습니다.

{{< img src="serverless/azure_database_messaging/azure_service_bus/azure_service_bus_service_map.png" alt="Azure API Management를 통해 백엔드 서비스로 요청이 전달되는 흐름을 보여주는 서비스 맵. 추천 대체 텍스트: 프런트엔드 요청을 Azure API Management를 통해 백엔드 .NET 서비스에 연결하는 Datadog 분산 트레이스." style="width:100%;">}}

## 지원되는 런타임 {#supported-runtimes}

| 런타임 | 최소 트레이서 버전 | 최소 Lambda 레이어 | 최소 Azure SDK |
|---|---|---|---|
| Python 3.8/3.9(생산자 + Azure Functions 소비자) | dd-trace-py v3.10.0 | lambda-python v3.19.6 | azure-servicebus >= 7.14.2 |
| Python 3.10+(생산자 + Azure Functions 소비자) | dd-trace-py v3.10.0 | lambda-python v4.8.1 | azure-servicebus >= 7.14.2 |
| Node.js(생산자 + Azure Functions 소비자) | dd-trace-js v5.73.0 | lambda-js v12.129.0 | @azure/service-bus >= 7.9.2 |
| .NET(생산자 및 소비자) | dd-trace-dotnet v3.30.0 | 해당 없음 | Azure.Messaging.ServiceBus >= 7.14.0 |