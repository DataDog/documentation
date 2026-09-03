---
further_reading:
- link: https://www.datadoghq.com/blog/monitor-azure-functions-hosting-plans/
  tag: 블로그
  text: Datadog을 사용하여 모든 호스팅 플랜에서 Azure Functions를 모니터링하십시오.
title: Azure 데이터베이스 및 메시징 서비스
---
## 개요 {#overview}

Datadog APM은 **추론된 스팬**을 사용하여 Azure Cosmos DB, Event Hubs 및 Service Bus에서 트레이스 및 트레이스 메트릭을 수집합니다. 추론된 스팬은 Azure에서 실행되는 Datadog 계측 서비스의 플레임 그래프 및 워터폴 뷰에 자동으로 표시됩니다. 별도의 구성은 필요하지 않습니다. Azure Serverless 워크로드에 대한 계측을 설정하려면 [Serverless Monitoring][1]을 참조하세요.

{{< card-grid card_width="170px" >}}
  {{< image-card href="/serverless/azure_database_messaging_services/azure_cosmosdb/" src="integrations_logos/azure_cosmosdb.png" alt="azure_cosmosdb" >}}
  {{< image-card href="/serverless/azure_database_messaging_services/azure_event_hubs/" src="integrations_logos/azure_event_hub.png" alt="azure_event_hubs" >}}
  {{< image-card href="/serverless/azure_database_messaging_services/azure_service_bus/" src="integrations_logos/azure_service_bus.png" alt="azure_service_bus" >}}
{{< /card-grid >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/serverless