---
aliases:
- /ko/tracing/api_catalog/get_started
- /ko/tracing/api_catalog/
- /ko/api_catalog/
- /ko/api_catalog/endpoint_discovery/
- /ko/software_catalog/endpoints/discover_endpoints
- /ko/service_catalog/endpoints/discover_endpoints
- /ko/service_catalog/endpoints/
- /ko/software_catalog/endpoints
- /ko/internal_developer_portal/software_catalog/endpoints
description: 단일 화면에서 성능 메트릭, 소유권 추적, 경보 및 테스트 커버리지를 통해 HTTP API 엔드포인트를 모니터링하고 관리하세요.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-apis-datadog-api-catalog/
  tag: 블로그
  text: Datadog API 카탈로그로 API 성능, 보안 및 소유권 관리하기
- link: /internal_developer_portal/catalog/
  tag: 설명서
  text: Datadog Catalog
- link: /synthetics/api_tests/http_tests/
  tag: 설명서
  text: 신서틱 API 테스트
- link: /security/application_security/how-it-works/#api-security
  tag: 설명서
  text: AAP API Security
- link: https://www.datadoghq.com/blog/primary-risks-to-api-security/
  tag: 블로그
  text: 주요 API 보안 위험 완화
title: Endpoint Observability
---
{{% site-region region="gov,gov2" %}}
<div class="alert alert-danger">
 선택한 <a href="/getting_started/site">Datadog 사이트</a>({{< region-param key="dd_site_name" >}})에서는 Endpoint Observability가 지원되지 않습니다.
</div>
{{% /site-region %}}

{{< img src="tracing/software_catalog/endpoints-list.png" alt="각 엔드포인트의 성능 관련 정보가 표시된 Catalog의 엔드포인트 목록" style="width:100%;" >}}

## 개요 {#overview}

Catalog의 [Endpoints 목록][12]에는 API 엔드포인트에 관한 모든 필수 정보가 통합되어 있습니다. 내부 팀이나 외부 사용자에게 서비스를 제공하는 모든 API의 성능, 안정성 및 소유권을 종합적으로 확인할 수 있습니다. 이를 통해 사용자와 팀은 비즈니스에 필수적인 API 기반 기능을 효과적으로 모니터링하고 기대 성능을 충족하는지 확인할 수 있습니다.

## 사용 사례 {#use-cases}

Endpoints 목록은 Datadog 전반의 데이터를 통합하여 목적에 맞게 설계된 워크플로우를 제공합니다. 다음 작업을 수행할 수 있습니다.

- **API 자동 검색**: 엔드포인트별로 정리된 공개, 비공개 및 파트너 API의 전체 인벤토리를 유지 관리합니다.
- **연관 데이터 표시**: 엔드포인트에서 다양한 Datadog 소스의 트레이스, 로그 및 메트릭으로 이동합니다.
- **성능 문제 식별**: *마지막 확인 시간*, *요청*, *지연 시간*, *오류*와 같은 메트릭을 사용하여 API 상태를 추적합니다.
- **경보 수신**: 기대 성능 수준과 경보를 트리거할 임계값을 정의합니다.
- **소유권 정보 할당**: 오류 발생 시 연락할 담당자를 확인할 수 있도록 각 엔드포인트에 담당 팀, 온콜 담당자 및 커뮤니케이션 채널 정보를 지정합니다.
- **포괄적인 커버리지 보장**: API 모니터, Synthetic 테스트 및 보안 신호의 상태를 추적하고, 조사에 필요한 상세 정보로 바로 이동할 수 있는 링크를 제공합니다.

## 시작하기 {#getting-started}

[Datadog APM][8]을 사용하여 HTTP 서비스를 모니터링하면 Endpoints 목록에 엔드포인트가 자동으로 표시됩니다.

### 엔드포인트 탐색 {#exploring-endpoints}

엔드포인트와 관련된 속성 및 메트릭을 탐색하고 쿼리합니다.

자세한 정보를 확인하려면 [엔드포인트 탐색][11]을 참조하세요.

### 엔드포인트 모니터링 {#monitoring-endpoints}

API 및 엔드포인트를 관리하고 모니터링하여 다음을 수행할 수 있습니다.

- 성능이 저하된 엔드포인트를 찾아 수정합니다.
- 표준 및 목표를 기준으로 엔드포인트의 안정성을 추적합니다.
- 이상 징후를 모니터링합니다.
- 오류를 조사합니다.
- 테스트 커버리지를 확보합니다.
- 보안 격차를 해소합니다.

자세한 정보를 확인하려면 [엔드포인트 모니터링][7]을 참조하세요.

### 엔드포인트에 소유자 할당 {#assigning-owners-to-endpoints}

엔드포인트에 소유권 정보를 추가하여 조사 및 팀 간 커뮤니케이션을 간소화하세요.

자세한 정보를 확인하려면 [소유자 지정][6]을 참고하세요.

### 목록에 엔드포인트 추가 {#adding-endpoints-to-the-list}

자동으로 탐지된 엔드포인트를 API 그룹에 할당하여 사용량을 추적하고, 소유권을 정의하며, 중앙에서 모니터링 정책을 구성하세요. 또는 OpenAPI나 Swagger 파일을 업로드하여 엔드포인트 목록의 전체 기능을 활용하세요.

자세한 정보를 확인하려면 [항목 추가][9]를 참조하세요.

### API에 메타데이터 추가 {#adding-metadata-to-apis}

Datadog UI나 API를 통해 API에 메타데이터를 추가하거나 GitHub 통합, GitLab 통합 또는 Terraform을 이용한 자동화 파이프라인을 사용하세요.

자세한 정보를 확인하려면 [API에 메타데이터 추가][10]를 참고하세요.

## 주요 용어 {#key-terminology}

| 용어         | 정의                                                                                                                                                                                                                    |
|--------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| API          | 두 애플리케이션이 통신할 수 있도록 하는 프로토콜 및 도구 세트입니다.                                                                                                                                                      |
| API 엔드포인트 | API에 정의된 규칙을 구현하는 서버 또는 서비스 리소스의 주소(URL)로, 주로 HTTP 또는 RESTful 인터페이스를 통해 제공됩니다. API 엔드포인트는 요청을 처리하고 그에 상응하는 응답을 제공합니다. |
| 공개 API | 인터넷을 통해 액세스할 수 있는 고객 대상 API 엔드포인트입니다.                                                                                                                                                          |
| 비공개 API | *내부 API*라고도 합니다. 이러한 API는 조직 내부에서만 사용하도록 설계되었으며 주로 백엔드 서비스 통신에 사용됩니다. 가장 일반적인 유형의 API입니다.                                                   |
| 파트너 API | *서드파티 API*라고도 합니다. 조직에서 서비스를 제공할 때 사용하는 외부 조직(예: Stripe, Google, Facebook)의 공개 엔드포인트입니다.                                             |

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apis/catalog
[3]: /ko/api_catalog/explore_apis/
[6]: /ko/internal_developer_portal/catalog/set_up/
[7]: /ko/internal_developer_portal/catalog/endpoints/monitor_endpoints/
[8]: /ko/tracing/trace_collection/
[9]: /ko/internal_developer_portal/catalog/set_up/create_entities/
[10]: /ko/internal_developer_portal/catalog/entity_model/
[11]: /ko/internal_developer_portal/catalog/endpoints/explore_endpoints/
[12]: https://app.datadoghq.com/services?selectedComponent=endpoint