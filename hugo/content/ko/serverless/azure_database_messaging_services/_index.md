---
title: Azure 데이터베이스 및 메시징 서비스
---
## 개요 {#overview}

Datadog APM은 **유추된 스팬**을 사용하여 Azure Cosmos DB, Event Hubs 및 Service Bus에서 트레이스 및 트레이스 메트릭을 수집합니다. 유추된 스팬은 Azure에서 실행되는 Datadog 계측이 적용된 서비스의 플레임 그래프 및 워터폴 조회에 자동으로 나타납니다. 추가 구성은 필요하지 않습니다. Azure Serverless 작업 부하에 대한 계측을 설정하려면 [Serverless Monitoring][1]을 참조하세요.

{{< card-grid card_width="170px" >}}
  {{< image-card href="azure_cosmosdb/" src="integrations_logos/azure_cosmosdb.png" alt="azure_cosmosdb" >}}
  {{< image-card href="azure_event_hubs/" src="integrations_logos/azure_event_hub.png" alt="azure_event_hubs" >}}
  {{< image-card href="azure_service_bus/" src="integrations_logos/azure_service_bus.png" alt="azure_service_bus" >}}
{{< /card-grid >}}

[1]: /ko/serverless