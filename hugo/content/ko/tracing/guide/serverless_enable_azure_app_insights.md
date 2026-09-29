---
description: 애플리케이션을 재계측하지 않고 Azure Application Insights 분산 트레이스를 Datadog APM으로 가져오세요.
further_reading:
- link: /integrations/azure/
  tag: 설명서
  text: Microsoft Azure 통합
private: true
title: Azure App Insights 통합
---
{{< callout url="https://www.datadoghq.com/product-preview/azure-app-insights-integration/" header="미리 보기에 참여하세요" >}}
Azure App Insights 통합은 미리 보기로 제공되고 있습니다. 액세스를 요청하려면 이 양식을 사용하세요.
{{< /callout >}}

## 개요 {#overview}

Azure Application Insights 분산 트레이스를 Datadog APM으로 가져오세요. Datadog은 App Insights 트레이스를 APM 스팬으로 변환하고 지원되는 서비스의 스팬을 Azure 리소스 메타데이터로 보강합니다.

{{< img src="tracing/guide/serverless_enable_azure_app_insights/app-insights-azure-fn-example.png" alt="Datadog APM 플레임 그래프에 표시된 Azure Application Insights 트레이스로, 선택한 스팬에서 Azure 리소스 메타데이터를 확인할 수 있습니다." style="width:100%;" >}}

이 통합은 Datadog으로 전달된 App Insights 레코드를 로그로 읽고 그로부터 APM 스팬을 생성합니다. 애플리케이션 코드나 계측을 변경할 필요가 없습니다.

## 작동 방식 {#how-it-works}

워크로드에서 Application Insights가 활성화되고 Azure 로그가 Datadog으로 전송되면 Datadog은 다음을 수행합니다.

1. 전송된 Azure 로그에서 App Insights 레코드를 읽습니다.
2. 각 App Insights 작업을 Datadog APM 스팬으로 변환하여 기존 계층적 Request-Id 형식과 W3C Trace Context 모두에서 상위-하위 관계를 유지합니다.
3. 리소스 그룹, 구독, 리전 및 리소스 태그를 포함한 Azure 리소스 메타데이터로 [지원되는 Azure 서비스](#supported-azure-services)의 스팬을 보강합니다.

변환 후 스팬은 다른 Datadog APM 스팬과 동일하게 작동합니다. 이 스팬은 동일한 워터폴 뷰에 나타나며, 트레이스 검색을 지원하고 로그 및 메트릭과 연관됩니다.

## 전제 조건 {#prerequisites}

Azure App Insights 통합을 사용하려면 먼저 다음을 설정하세요.

1. ****트레이스하려는 Azure 워크로드의 Azure Application Insights를 클래식 Application Insights SDK를 사용하여 활성화하세요. 워크로드에서 [Azure Monitor OpenTelemetry Distro][5]를 사용하는 경우 대신 [OpenTelemetry in Datadog][6]을 참조하세요.
2. **[Azure Automated Log Forwarding][2]**을 구성하여 Azure App Insights 로그를 Datadog으로 전달하세요. [Microsoft Azure 통합][1]에서 메트릭 및 리소스 수집이 활성화되어 있는지 확인하여 스팬이 Azure 리소스 메타데이터로 보강될 수 있도록 하세요.

{{% serverless/log_to_trace_indexing_note %}}

## 지원되는 Azure 서비스 {#supported-azure-services}

Datadog은 변환된 스팬을 다음 서비스에 대한 Azure 리소스 메타데이터로 보강합니다.

- Azure Functions
- Azure App Service
- Azure Storage
- Azure Cosmos DB
- Azure API Management
- Azure Cache for Redis

다른 Azure 서비스의 트레이스는 APM 스팬으로 변환되지만 Azure 리소스 메타데이터 보강은 포함되지 않습니다.

## 액세스 요청 {#request-access}

Azure App Insights 통합은 미리 보기로 제공되고 있습니다. 액세스를 요청하려면 [미리 보기 양식][4]을 통해 가입하세요. Datadog 팀이 액세스 권한을 확인하여 일주일 이내에 응답해 드립니다.

## 제한 사항 {#limitations}

- **미리 보기로 제공 중.** 이 통합은 제한된 디자인 파트너 그룹과 함께 미리 보기로 제공되고 있습니다. 액세스 권한은 미리 보기 양식을 통해 가입한 후 부여됩니다.
- **리소스 메타데이터 보강은 서비스별로 다릅니다.** [지원되는 목록](#supported-azure-services) 외의 Azure 서비스에 대한 스팬은 변환되지만 Azure 리소스 메타데이터로 보강되지는 않습니다.
- **혼합 형식 트레이스 계층 구조는 스팬 링크에 따라 다릅니다.** 일부 Azure 워크로드는 레거시 계층형 Request-Id 형식과 W3C Trace Context를 혼합하여 내보냅니다. Datadog은 [스팬 링크][3]를 통해 두 형식을 연결하므로 관련 트레이스 간을 탐색할 수 있습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/integrations/azure/
[2]: /ko/logs/guide/azure-automated-log-forwarding/
[3]: /ko/tracing/trace_collection/span_links/
[4]: https://www.datadoghq.com/product-preview/azure-app-insights-integration/
[5]: https://learn.microsoft.com/en-us/azure/azure-monitor/app/opentelemetry-enable
[6]: /ko/opentelemetry/