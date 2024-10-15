---
aliases:
- /ko/tracing/api_catalog/get_started
- /ko/tracing/api_catalog/
further_reading:
- link: https://www.datadoghq.com/blog/monitor-apis-datadog-api-catalog/
  tag: 블로그
  text: Datadog API 카탈로그로 API 성능, 보안 및 소유권 관리하기
- link: /tracing/service_catalog/
  tag: 설명서
  text: Datadog 서비스 카탈로그
- link: /synthetics/api_tests/http_tests/
  tag: 설명서
  text: 신서틱(Synthetic) API 테스트
- link: /security/application_security/how-appsec-works/#api-security
  tag: 설명서
  text: ASM API 보안
is_beta: true
title: Datadog API 카탈로그
---

{{< site-region region="gov,ap1" >}}
<div class="alert alert-warning">선택한 <a href="/getting_started/site">Datadog 사이트</a> ({{< region-param key="dd_site_name" >}})는 API 카탈로그를 지원하지 않습니다.</div>
{{< /site-region >}}

{{< beta-callout url="" btn_hidden="true">}}
Datadog API 카탈로그는 베타 서비스입니다.
{{< /beta-callout >}}

{{< img src="tracing/api_catalog/api-catalog-catalog-api-details.png" alt="소유권, 서비스, 환경, 태그와 관련 모니터, 테스트, 성능 데이터에 대한 링크 정보와 같이 Checkout이라는 API 엔드포인트 목록을 표시하는 API 카탈로그." style="width:100%;" >}}

## 개요

API 카탈로그는 모든 API 엔드포인트의 성능, 안정성, 소유권을 한 곳에서 탐색할 수 있는 단일 보기 및 엔트리 포인트를 제공합니다. 내부 서비스(비공개 API) 및 외부 사용자(공개 API)가 사용하는 API의 특성에 대한 최신 정보를 전 기업이 검색할 수 있는 중앙 집중적 공간입니다.

필수 영역인 API 중심 비즈니스 기능을 모니터링하고 API 성능 기대치를 표준화 및 검증하여 성능이 기준 미달일 경우 알려드립니다.

## 사용 사례

API 카탈로그 기능은 Datadog 데이터를 결합하여 독점 워크플로우를 제공합니다. 해당 기능으로 다양한 소스의 데이터를 하나의 통합된 보기에서 탐색 및 모니터링할 수 있습니다. API 카탈로그 제공 기능은 다음과 같습니다.

- 모든 공개, 비공개, 파트너 API에 대한 하나의 인벤토리로 **자동화된 검색 가능성**을 제공해 드리며, 엔드포인트(_endpoints_)가 구성 원리입니다.
- 다양한 Datadog 소스에서 산출한 **API 메타데이터와의 상관 관계 및 직접 연결**
- *마지막으로 확인*, *요청*, *레이턴시*, *오류*와 같은 **API 엔드포인트 메트릭**을 사용하여 성능 문제를 식별하고 API 서비스 상태를 추적합니다.
- 정의한 성능 기대치 및 임계값에서 벗어나는 엔드포인트에 대해 **경고**합니다.
- **API 소유권 정보**(팀, 대기, 커뮤니케이션 채널)를 각 엔드포인트와 직접 연결하여 문제 발생 시 누구에게 연락해야 할지 알려드립니다.
- *API 모니터링*, *신서틱(Synthetic) 테스트*, *보안 신호*의 **적용 범위 및 상태**로 인시던트, 트러블슈팅, 취약성 조사에 대한 자세한 정보에 직접 접근할 수 있습니다.

## 시작하기

이미 [Datadog 애플리케이션 성능 모니터링(APM)][8]을 사용하여 서비스의 성능을 모니터링하는 경우, API 카탈로그는 계측된 서비스에서 엔드포인트를 자동으로 감지합니다.

### API 탐색하기

API 카탈로그 탐색기 페이지를 사용하여 모든 엔드포인트를 탐색합니다.

자세한 정보를 확인하려면 [API 탐색하기][3]를 참고하세요.

### 소유자 지정

엔드포인트에 소유권 정보를 추가하여 본 카탈로그를 조사 및 팀 커뮤니케이션 시 더욱 유용하게 활용할 수 있습니다.

자세한 정보를 확인하려면 [소유자 지정][6]을 참고하세요.

### API 모니터링

전체 카탈로그를 사용하여 API 및 엔드포인트 관리를 시작하세요.

- 성능이 저조한 엔드포인트를 찾아 수정하세요.
- 표준 및 목적에 대한 신뢰성을 추적하세요.
- 이상 징후를 감시합니다.
- 에러를 조사합니다.
- 테스트 적용 범위를 확인합니다.
- 보안 격차를 해소합니다.

자세한 정보를 확인하려면 [API 모니터링][7]을 참고하세요.

### API 카탈로그에 항목 추가

자동으로 감지된 엔드포인트를 API그룹에 등록하여 사용을 추적하고, 소유권을 설정하고, 중앙 집중식 위치에서 모니터링 정책을 설정합니다. 또는 OpenAPI/Swagger 파일을 업로드하여 API 카탈로그의 장점을 모두 누려보세요.

자세한 정보를 확인하려면 [API 카탈로그에 항목 추가][9]를 참고하세요.

### API에 메타데이터 추가

Datadog UI 또는 API을 통해 API에 메타데이터를 추가하거나, GitHub 통합 또는 Terraform을 통해 자동화 파이프라인을 사용하세요.

자세한 정보를 확인하려면 [API에 메타데이터 추가][10]를 참고하세요.

## 주요 용어

API
: 두 애플리케이션이 통신할 수 있도록 하는 프로토콜 및 도구 세트입니다.

API 엔드포인트
: 서버의 리소스(URL) 주소 또는 API에 정의된 규칙 집합을 구현하는 서비스입니다. HTTP, RESTful API 인터페이스를 통해 구현되기도 합니다. API 엔드포인트는 API 호출 응답을 담당합니다.<br /><br/>
API 카탈로그는 API 엔드포인트를 HTTP 메서드(예: `GET`), URL 경로(예: `/payment/{shop_id}/purchase`), 해당 리소스가 제공하는 서비스의 이름(예: `Payments`)으로 나타냅니다.<br /><br/>
API 카탈로그 **베타**는 **HTTP** 엔드포인트만 지원합니다.

공개 API
: 인터넷에서 사용할 수 있는 고객용 API 엔드포인트입니다.

비공개 API
: 내부 API라고도 하며, 조직 내부에서만 사용합니다. 주로 백엔드 서비스 통신에 사용됩니다. 가장 일반적인 API 유형입니다. 

파트너 API
: 타사 API라고도 합니다. 조직에서 서비스를 제공하기 위해 사용하는 다른 조직의 공개 엔드포인트입니다(예: Stripe, Google, Facebook).

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apis/catalog
[3]: /ko/api_catalog/explore_apis/
[6]: /ko/api_catalog/owners_and_tags/
[7]: /ko/api_catalog/monitor_apis/
[8]: /ko/tracing/trace_collection/
[9]: /ko/api_catalog/add_entries
[10]: /ko/api_catalog/add_metadata