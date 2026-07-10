---
title: Azure Event Hub용 Serverless Monitoring
---
## 개요 {#overview}

Datadog APM은 **추론된 스팬**을 사용하여 Azure Event Hubs에서 트레이스와 트레이스 메트릭을 수집합니다. 이 스팬은 Datadog 트레이서 SDK에 의해 생성되며, 플레임 그래프 및 워터폴 뷰에 바로 표시됩니다. 

Python과 Node.js는 생산자를 지원하며, .NET은 생산자와 소비자 모두를 지원합니다. Event Hubs의 분산 트레이싱은 APM 사용자를 위한 기존 계측 외에 추가 설정이 필요하지 않습니다.

## 지원되는 런타임 {#supported-runtimes}

| 런타임 | 최소 트레이서 버전 | 최소 Lambda 레이어 | 최소 Azure SDK |
|---|---|---|---|
| Python 3.8/3.9(생산자 전용) | dd-trace-py v3.17.0 | lambda-python v3.19.6 | azure-eventhub >= 5.12.2 |
| Python 3.10+(생산자 전용) | dd-trace-py v3.17.0 | lambda-python v4.8.1 | azure-eventhub >= 5.12.2 |
| Node.js(생산자 전용) | dd-trace-js v5.72.0 | lambda-js v12.129.0 | @azure/event-hubs >= 6.0.0 |
| .NET(생산자 및 소비자) | dd-trace-dotnet v3.30.0 | N/A | Azure.Messaging.EventHubs >= 5.9.2 |