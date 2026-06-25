---
aliases:
- /ko/tracing/search_syntax/
- /ko/tracing/trace_search_analytics/
- /ko/tracing/trace_search/
- /ko/tracing/search
- /ko/tracing/getting_further/apm_events/
- /ko/tracing/trace_search_and_analytics/search/
- /ko/tracing/search/
- /ko/tracing/advanced/search/
- /ko/tracing/app_analytics/search
- /ko/tracing/live_search_and_analytics/search
- /ko/tracing/trace_search_analytics/analytics
- /ko/tracing/analytics
- /ko/tracing/visualization/analytics
- /ko/tracing/trace_search_and_analytics/analytics/
- /ko/tracing/app_analytics/analytics
- /ko/tracing/trace_search_and_analytics/query_syntax
- /ko/tracing/trace_explorer/trace_groups
description: 태그가 포함된 모든 트레이스에 대한 전역 검색
further_reading:
- link: /getting_started/search/
  tag: 설명서
  text: Datadog에서 검색 시작하기
- link: /tracing/trace_collection/
  tag: 설명서
  text: 애플리케이션에서 애플리케이션 성능 모니터링(APM) 추적 설정 방법 알아보기
- link: /tracing/trace_explorer/trace_view/
  tag: 설명서
  text: Datadog 트레이스 읽는 법 이해하기
- link: /tracing/software_catalog/
  tag: 설명서
  text: Datadog에 보고하는 서비스를 검색 및 카탈로그화
- link: /tracing/services/service_page/
  tag: 설명서
  text: Datadog 서비스에 관해 자세히 알아보기
- link: /tracing/services/resource_page/
  tag: 설명서
  text: 리소스 성능 및 트레이스 자세히 살펴보기
title: 쿼리 구문
---
## 검색 쿼리 {#search-query}

모든 검색 파라미터는 페이지 URL에 포함되어 있어 보기를 공유하는 데 도움이 될 수 있습니다.

### 검색 구문 {#search-syntax}

쿼리는 *용어*와 *연산자*로 구성됩니다.

*용어*에는 다음과 같은 두 가지 유형이 있습니다.

* **스팬 속성**: 애플리케이션에서 자동 또는 수동 계측을 통해 수집된 스팬의 콘텐츠.
* **스팬 태그**: 스팬과 관련된 컨텍스트 보강. 예를 들어, 서비스가 실행되는 인프라를 설명하는 호스트 또는 컨테이너 태그입니다.
  
여러 *용어*를 복잡한 쿼리로 결합하려면 다음 불리언 연산자 중 하나를 사용하세요.

| **연산자** | **설명**                                                                                        | **예시**                  |
|:-------------|:-------------------------------------------------------------------------------------------------------|:-----------------------------|
| `AND`        | **교집합**: 두 용어가 모두 선택한 이벤트에 있음(아무것도 추가하지 않으면 기본적으로 AND가 적용됨) | authentication AND failure   |
| `OR`         | **합집합**: 두 용어 중 하나가 선택한 이벤트에 포함됨                                             | authentication OR password   |
| `-`          | **제외**: 다음 용어가 이벤트에 없음                                                  | authentication AND -password |

### 속성 검색 {#attribute-search}

스팬 속성을 검색하려면 속성 키 앞에 `@`을 추가해야 합니다.

예를 들어, 아래 속성이 있는 스팬에 액세스하려면 다음을 사용합니다.

`@git.commit.sha:12345`

```json
  "git": {
    "commit": {
      "sha": "12345"
    },
    "repository": {
      "id": "github.com/datadog/datadog"
    }
  }
```

스팬 속성은 트레이스 사이드 패널의 **개요** 탭에서 확인할 수 있습니다.

**참고:** 다음 [예약된 속성][17]에 대해 `@`를 사용할 필요가 없습니다. `env`, `operation_name`, `resource_name`, `service`, `status`, `span_id`, `timestamp`, `trace_id`, `type`, `link`

### 태그 검색 {#tags-search}

스팬은 태그를 생성하는 호스트 및 통합에서 태그를 상속합니다.

예를 들면 다음과 같습니다.

| 쿼리                                                        | 일치 항목                                                                                             |
|:-------------------------------------------------------------|:--------------------------------------------------------------------------------------------------|
| `(hostname:web-server OR env:prod)`                          | 인프라 태그 `hostname:web-server` 또는 예약된 속성 `env:prod` |가 있는 모든 트레이스
| `(availability-zone:us-east OR container_name:api-frontend)` | 이러한 인프라 태그 중 하나라도 포함된 모든 트레이스|
| `(service:api AND -kube_deployment:canary)`                  | `api` 서비스에서 발생했지만 `canary` 배포에는 포함되지 않은 모든 트레이스                |

스팬 태그는 트레이스 사이드 패널의 **Infrastructure** 탭에서 확인할 수 있습니다.

#### 비표준 태그 형식{#non-standard-tag-formats}

태그가 [태그 모범 사례][2]를 따르지 않는 경우에는 `key:value` 구문을 사용하지 마세요. 대신 다음 검색 쿼리를 사용합니다.

`tags:<MY_TAG>`

예를 들어, 다음 태그는 모범 사례를 따르지 않습니다.  
`auto-discovery.cluster-autoscaler.k8s.io/daffy`

이 태그를 검색하려면 다음 쿼리를 사용합니다.  
`tags:"auto-discovery.cluster-autoscaler.k8s.io/daffy"`

### 와일드카드 {#wildcards}

여러 문자를 대상으로 하는 와일드카드 검색을 수행하려면 `*` 기호를 사용합니다.

* `service:web*`은 `web`으로 시작하는 서비스를 가진 모든 트레이스와 일치합니다.
* `@url:data*`는 `data`로 시작하는 `url`를 가진 모든 트레이스와 일치합니다.

### 숫자 값 {#numerical-values}

숫자 속성을 검색하려면 `<`, `>`, `<=` 또는 `>=`를 사용할 수 있습니다. 예를 들어 응답 시간이 100ms를 초과하는 모든 트레이스를 검색하려면 다음 작업을 수행하세요.

`@http.response_time:>100`

숫자 속성을 특정 범위로 검색하는 것도 가능합니다. 예를 들어 모든 4xx 오류를 검색하려면 다음 작업을 수행하세요.

`@http.status_code:[400 TO 499]`

### 자동 완성 {#autocomplete}

복잡한 쿼리를 직접 입력하는 것은 번거로울 수 있습니다. 검색창의 자동 완성 기능을 사용하면 기존 값을 활용해 쿼리를 쉽게 완성할 수 있습니다.

{{< img src="tracing/app_analytics/search/search_bar_autocomplete.png" alt="검색창 자동 완성 " style="width:60%;">}}

### 특수 문자 이스케이프 처리 {#escaping-of-special-characters}

다음 문자는 특수 문자로 간주되며 이스케이프 처리해야 합니다. `?`, `>`, `<`, `:`, `=`, `"`, `~`, `/`, `\`.
예를 들어 `url`에 `user=JaneDoe`가 포함된 트레이스를 검색하려면 다음과 같이 입력합니다.

`@url:*user\=JaneDoe*`

트레이스 속성 내 공백도 동일한 방식으로 처리해야 합니다. 트레이스 속성에 공백을 사용하는 것은 권장되지 않지만, 공백이 있는 경우 이스케이프 처리해야 합니다.
속성 이름이 `user.first name`인 경우, 공백을 이스케이프하여 다음과 같이 검색합니다.

`@user.first\ name:myvalue`

### 저장된 검색 {#saved-searches}

매일 동일한 조회를 만드는 데 시간을 낭비하지 마세요. 저장된 검색에는 검색 쿼리, 열, 시간 범위가 포함됩니다. 이후 검색창에서 검색 이름 또는 쿼리와 일치하는 자동 완성 항목으로 사용할 수 있습니다.

{{< img src="tracing/app_analytics/search/saved_search.png" alt="저장된 검색" style="width:80%;">}}

저장된 검색을 삭제하려면 Trace search 드롭다운 메뉴 아래의 휴지통 아이콘을 클릭하세요.

### 서비스 및 엔터티 검색 {#search-for-services-and-entities}

{{< site-region region="ap1,ap2,us3,us5,eu,us" >}}
서비스를 검색하려면 `service` 속성을 사용하세요. 다른 [엔터티 유형][20](예: 데이터베이스, 대기열, 타사 공급자)을 검색하려면, Datadog이 APM으로 계측되지 않은 종속성을 설명하는 데 사용하는 다른 [peer 속성][21]을 활용합니다. 예를 들어 Postgres 데이터베이스의 `users` 테이블 호출을 나타내는 스팬을 찾으려면 다음 쿼리를 사용합니다. `@peer.db.name:users @peer.db.system:postgres`

**참고**: `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAME_ENABLED=true`를 설정하여 [글로벌 서비스 네이밍][22]으로 마이그레이션한 경우 스팬의 `service` 태그는 스팬을 **내보낸** 서비스를 나타냅니다.

[20]: /ko/tracing/services/inferred_services
[21]: /ko/tracing/services/inferred_services#peer-tags
[22]: /ko/tracing/services/inferred_services#migrate-to-global-default-service-naming
{{< /site-region >}}

## 시간 범위 {#time-range}

시간 범위를 사용하면 지정된 기간 내의 트레이스를 표시할 수 있습니다. 드롭다운 메뉴에서 미리 설정된 기간을 선택하거나([사용자 지정 기간 입력][3]) 빠르게 시간 범위를 변경할 수 있습니다.

{{< img src="tracing/app_analytics/search/time_frame2.png" style="width:50%;" alt="시간 프레임 선택" >}}

## 스팬 테이블 {#span-table}

스팬 테이블은 선택한 컨텍스트와 일치하는 스팬 목록입니다. 컨텍스트는 [검색창](#search-bar) 필터와 [시간 범위](#time-range)로 정의됩니다.

{{< site-region region="ap1,ap2,us3,us5,eu,us" >}}
### 서비스 열 {#the-service-column}

기본적으로 서비스 열에는 스팬의 `service` 예약된 속성이 표시됩니다.

{{< img src="tracing/app_analytics/search/span_table_service.png" style="width:60%;" alt="스팬 테이블 서비스 열" >}}

스팬이 계측된 서비스에서 추론된 서비스로의 클라이언트 호출을 나타내는 경우, 서비스 열에는 다음이 표시됩니다.
- **서비스**: `service` 예약된 속성으로 식별되는 서비스.
- **[추론된 서비스][4]**: [peer 속성][5] 중 하나로 식별되는, 기본 서비스가 호출하는 추론된 엔터티의 이름.

{{< img src="tracing/app_analytics/search/span_table_inferred_service.png" style="width:90%;" alt="추론된 서비스가 표시된 스팬 테이블 서비스 열" >}}

서비스 이름이 기본 서비스 이름에서 재정의된 경우, 서비스 열에는 다음이 표시됩니다.
- **[기본 서비스][2]**: `@base_service` 속성으로 식별되는, 스팬을 생성한 서비스.
- **[서비스 재정의][3]**: 기본 서비스 이름과 다른 서비스 이름으로, Datadog 통합에서 자동 설정되거나 프로그래밍 방식 API를 통해 변경된 값. 서비스 재정의는 `service` 예약된 속성으로 식별됩니다.

{{< img src="tracing/app_analytics/search/span_table_service_override.png" style="width:80%;" alt="서비스 재정의가 표시된 스팬 테이블 서비스 열" >}}

[2]: /ko/tracing/guide/service_overrides#base-service
[3]: /ko/tracing/guide/service_overrides
[4]: /ko/tracing/services/inferred_services
[5]: /ko/tracing/services/inferred_services#peer-tags
{{< /site-region >}}

### 전체 트레이스 표시 {#displaying-a-full-trace}

관련 트레이스에 대한 자세한 내용을 보려면 스팬(span)을 클릭하세요.

{{< img src="tracing/app_analytics/search/trace_in_tracestream.png" alt="Trace in Tracestream" style="width:80%;">}}

### 열 {#columns}

목록에 다른 [스팬 태그 또는 속성][23]을 열로 추가하려면 **Options** 버튼을 클릭한 후 추가할 차원을 선택합니다.

{{< img src="tracing/app_analytics/search/trace_list_with_column.png" alt="열이 포함된 트레이스 목록" style="width:80%;">}}

### 트레이스 그룹 {#trace-groups}

요청 수, 오류율 및 지연 시간 분포를 목록 보기에서 확인하려면 임의의 스팬 태그 또는 속성으로 쿼리를 그룹화하세요. **그룹화 기준** 절에서 최대 4개의 차원을 선택할 수 있습니다.

{{< img src="/tracing/trace_explorer/trace_groups/group_by_clause.png" alt="그룹 기준 절" style="width:90%;" >}}

#### 고급 '그룹화 기준' 쿼리 {#advanced-group-by-queries}

그룹화할 차원을 선택한 후 **from** 드롭다운을 사용하여 해당 차원 값을 가져올 위치를 지정할 수 있습니다. 
- **Span**: 쿼리된 스팬의 차원 기준으로 그룹화(기본값). 예를 들어, `a`입니다.
- **Parent of span**: 쿼리와 일치하는 스팬의 부모 스팬에서 지정된 차원을 기준으로 그룹화합니다. 예를 들어 API 엔드포인트 성능을 호출 서비스별로 분석하려면 `service`를 `parent(a)` 기준으로 그룹화합니다.
- **Root span**: 트레이스의 루트 스팬에서 지정된 차원을 기준으로 그룹화합니다. 예를 들어, 프런트엔드 페이지별 백엔드 요청 패턴을 분석하려면 `@view.name`을 `root` 기준으로 그룹화합니다.

{{< img src="/tracing/trace_explorer/trace_groups/group_by_root.png" alt="루트 기준 그룹화" style="width:90%;" >}}

#### 그룹 목록에서 트레이스 그룹 보기 {#view-trace-groups-in-the-group-list}

트레이스 그룹은 선택한 차원의 고유 값으로 표시됩니다. 각 그룹에는 세 가지 주요 메트릭이 표시됩니다.
- **REQUESTS**: 그룹 내 스팬 수.
- **ERRORS**: 오류율 및 오류 건수.
- **P95 Latency**: 스팬의 P95 지연 시간.

쿼리된 스팬 대신 부모 스팬 또는 루트 스팬 기준으로 집계된 메트릭을 보려면 **Show metrics from** 문에서 `parent(a)` 또는 `root`를 선택합니다.

또한 `Latency Breakdown` 기능을 통해 각 그룹의 요청에서 서비스 간에 시간이 어떻게 소비되는지 시각적으로 확인할 수 있어 지연 시간 병목 현상을 쉽게 파악할 수 있습니다.

{{< img src="/tracing/trace_explorer/trace_groups/group_list.png" alt="그룹 목록" style="width:90%;" >}}

더 자세히 분석하려면 그룹을 클릭하여 집계 메트릭을 구성하는 개별 스팬 이벤트를 확인하세요.

## 패싯 {#facets}

패싯은 속성 또는 태그의 모든 고유 값을 표시할 뿐만 아니라 해당 값이 나타내는 트레이스 수와 같은 기본 분석 정보를 제공합니다. 이는 데이터를 필터링하는 스위치이기도 합니다.

패싯을 사용하면 주어진 속성을 기반으로 데이터 세트를 피벗하거나 필터링할 수 있습니다. 예를 들면 사용자, 서비스 등이 패싯이 될 수 있습니다.

{{< img src="tracing/app_analytics/search/facets_demo.png" alt="패싯 데모" style="width:80%;">}}

### 측정값 {#measures}

측정값은 정량적 값에 대한 특정 유형의 패싯입니다.

다음의 경우 측정값을 사용하세요.
* 여러 트레이스로부터 값을 집계합니다. 예를 들어 Cassandra의 행 수에 대한 측정값을 만들고 요청된 파일 크기 합계당 P95 또는 최상위 리퍼러를 확인합니다.
* $1000가 넘는 장바구니 값에 대해 대기 시간이 가장 긴 서비스를 수치적으로 계산합니다.
* 연속 값을 필터링합니다. 예를 들어 비디오 스트림의 각 페이로드 청크 크기(바이트)입니다.

**유형**

측정값(measure)에는 (long) 정수 또는 double 값이 사용되며, 두 형식은 동등한 기능을 제공합니다.

**단위**

측정값은 쿼리 시간 및 표시 시간에서 자릿수를 처리하기 위한 단위(초 단위의 시간 또는 바이트 단위의 크기)를 지원합니다. 단위는 필드가 아니라 측정값 자체의 속성입니다. 예를 들어 지속 시간 측정값이 나노초 단위라고 가정해 보겠습니다. `service:A`의 스팬 태그에서 `duration:1000`은 `1000 milliseconds`를, `service:B`의 스팬 태그에서 `duration:500`은 `500 microseconds`를 의미합니다.
산술 프로세서를 사용하여 모든 스팬 태그의 지속 시간을 나노초로 변환합니다. `service:A`의 스팬 태그에는 `*1000000` 배율을 적용하고, `service:B`의 스팬 태그에는 `*1000` 배율을 적용하세요.
`duration:>20ms`(검색 구문 참조)를 사용하여 두 서비스의 스팬 태그를 일관되게 쿼리하고 최대 1분의 집계 결과를 확인하세요.

### 패싯 생성 {#create-a-facet}

속성을 패싯으로 사용하거나 검색에서 사용하려면 해당 속성을 클릭하고 패싯으로 추가하세요.

{{< img src="tracing/app_analytics/search/create_facet.png" style="width:50%;" alt="패싯 생성" style="width:50%;">}}

새 패싯을 생성하면 패싯 패널에서 필터링 및 기본 분석에 활용할 수 있습니다.

### 패싯 패널 {#facet-panel}

패싯을 사용하여 트레이스를 필터링하세요. 검색창과 URL은 선택한 패싯을 자동으로 반영합니다.

{{< img src="tracing/app_analytics/search/facet_panel.png" alt="패싯 패널" style="width:30%;">}}

## 시각화 {#visualizations}

Analytic 선택기를 사용하여 Analytics 시각화 유형을 선택합니다.

* [시계열](#timeseries)
* [상위 목록](#top-list)
* [표](#table)

### 시계열 {#timeseries}

선택한 기간 동안 `Duration` 메트릭(또는 패싯 고유 값 수)의 변화를 시각화하고 (필요 시) 사용 가능한 패싯으로 분할합니다.

다음 시계열 Analytics는 각 **서비스**에 대해 **5분** 단위로 **pc99** **기간**의 변화를 보여줍니다.

{{< img src="tracing/app_analytics/analytics/timeserie_example.png" alt="시계열 예시" style="width:90%;">}}

### 상위 목록 {#top-list}

`Duration`에 따라 패싯의 상위 값(또는 패싯 고유 값 수)을 시각화합니다.

다음 상위 목록 분석은 **서비스**의 상위 **pc99** **기간**을 보여줍니다.

{{< img src="tracing/app_analytics/analytics/top_list_example.png" alt="상위 목록 예시" style="width:90%;">}}

### 표 {#table}

선택한 [측정값][9](목록에서 선택한 첫 번째 측정값)에 따라 패싯의 상위 값을 시각화하고 이 상위 목록에 나타나는 요소에 대한 추가 측정값을 표시합니다. 검색어를 업데이트하거나 두 차원에 해당하는 로그를 조사하세요.

* 측정 차원이 여러 개인 경우 첫 번째 차원에 따라 상위 값이 결정되고, 첫 번째 차원의 상위 값 내에서 두 번째 차원에 따라 결정되고, 두 번째 차원의 상위 값 내에서 세 번째 차원에 따라 결정됩니다.
* 측정값이 여러 개일 경우 첫 번째 측정값에 따라 상단 또는 하단 목록이 결정됩니다.
* 소계만 (상위 또는 하위) 표시되므로 소계는 그룹 내 값의 실제 총계와 다를 수 있습니다. 이 차원에 대한 null 또는 빈 값의 이벤트는 하위 그룹으로 표시되지 않습니다.

**참고**: 하나의 단일 측정값과 하나의 단일 차원에 사용되는 테이블 시각화는 표시만 다를 뿐 상위 목록과 동일합니다.

다음 Table Log Analytics는 지난 15분 동안 고유한 **클라이언트 IP** 수와 함께 **처리량**에 따른 **상위 상태 코드**의 변화를 보여줍니다.

{{< img src="tracing/app_analytics/analytics/trace_table_example.png" alt="상위 목록 예시" style="width:90%;">}}

## 관련된 트레이스 {#related-traces}

그래프 섹션을 선택하거나 클릭하여 그래프를 확대하거나 선택 항목에 해당하는 [트레이스][10] 목록을 확인하세요.

{{< img src="tracing/app_analytics/analytics/view_traces.png" alt="트레이스 보기" style="width:40%;">}}

## 내보내기 {#export}

{{< img src="tracing/app_analytics/analytics/export_button.png" alt="Analytics 내보내기 버튼" style="width:40%;">}}

쿼리 내보내기

* [모니터링][11]으로
* [대시보드][12]로
* [노트북][18]으로

쿼리에 대한 새 메트릭을 생성할 수도 있습니다.

**참고**: 대시보드 및 노트북의 애플리케이션 APM 쿼리는 모든 [인덱싱된 스팬][14]에 기반합니다. 모니터링의 APM 쿼리의 경우 [사용자 지정 보존 필터][19]로만 인덱싱된 스팬에 기반합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/setup/java/#integrations
[2]: /ko/getting_started/tagging/#tags-best-practices
[3]: /ko/dashboards/guide/custom_time_frames/
[4]: /ko/tracing/trace_search_and_analytics/
[5]: /ko/tracing/glossary/#apm-event
[6]: /ko/tracing/glossary/#services
[7]: /ko/tracing/trace_pipeline/trace_retention/#retention-filters
[8]: /ko/tracing/trace_search_and_analytics/query_syntax/#facets
[9]: /ko/tracing/trace_search_and_analytics/query_syntax/#measures
[10]: /ko/tracing/glossary/#trace
[11]: /ko/monitors/types/apm/
[12]: /ko/dashboards/#get-started
[13]: /ko/help/
[14]: /ko/tracing/glossary/#indexed-span
[15]: /ko/dashboards/
[16]: /ko/dashboards/widgets/timeseries/
[17]: /ko/monitors/notify/variables/?tab=is_alert#reserved-attributes
[18]: /ko/notebooks/
[19]: /ko/tracing/trace_pipeline/trace_retention/#retention-filters
[23]: /ko/tracing/trace_explorer/span_tags_attributes