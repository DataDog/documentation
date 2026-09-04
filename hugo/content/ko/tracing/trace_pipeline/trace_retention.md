---
aliases:
- /ko/tracing/trace_retention/
- /ko/tracing/trace_queries/one_percent_flat_sampling/
description: 보존 필터를 사용하여 트레이스 보존을 제어하는 방법을 알아보세요.
further_reading:
- link: https://www.datadoghq.com/blog/rum-apm-retention-filters
  tag: 블로그
  text: 보존 필터로 프런트엔드 및 백엔드 데이터 통합 및 상호 연결
- link: /tracing/trace_pipeline/ingestion_mechanisms
  tag: 설명서
  text: 수집 메커니즘
- link: /tracing/trace_pipeline/ingestion_controls/
  tag: 설명서
  text: 수집 관리
- link: /tracing/trace_pipeline/metrics/
  tag: 설명서
  text: 사용량 메트릭
- link: https://learn.datadoghq.com/courses/apm-rate-limit-retention
  tag: 학습 센터
  text: APM 속도 제한 및 보존
- link: https://www.datadoghq.com/architecture/mastering-distributed-tracing-data-volume-challenges-and-datadogs-approach-to-efficient-sampling/
  tag: 아키텍처 센터
  text: '분산 트레이스 마스터하기: 데이터 볼륨 문제와 효율적인 샘플링을 위한 Datadog의 접근 방식'
title: 트레이스 보존
---
{{< img src="tracing/apm_lifecycle/retention_filters.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="보존 필터" >}}

Datadog APM을 사용하면 [15일간의 트레이스 수집 및 보존][1]을 완전히 사용자 지정할 수 있습니다.

수집 및 인덱싱된 데이터의 볼륨을 추적하거나 모니터링하려면 [사용량 메트릭][2] 설명서를 참조하세요.

## 보존 필터 {#retention-filters}

스팬이 수집된 후, 계정에 설정된 보존 필터에 따라 일부는 15일 동안 보관됩니다.
1. **[지능형 보존 필터](#datadog-intelligent-retention-filter)**는 다양한 지연 시간 분포에 대해 모든 환경, 서비스, 작업 및 리소스의 스팬을 보존합니다.
2. 모든 서비스와 엔드포인트는 물론 오류 및 지연 시간이 긴 트레이스에 대한 가시성을 유지할 수 있도록 여러 **[기본 보존 필터](#default-retention-filters)**가 생성됩니다. 
3. 비즈니스에 가장 중요한 트레이스를 캡처하기 위해 스팬 특성이나 태그 필터를 기반으로 서비스에 대한 **[사용자 지정 보존 필터](#create-your-own-retention-filter)**를 원하는 만큼 생성할 수 있습니다.

**참고**: 보존 필터를 생성, 삭제, 수정, 활성화 또는 비활성화하려면 `apm_retention_filter_write` 권한이 필요합니다.

{{< img src="tracing/trace_indexing_and_ingestion/retention_filters/retention_filters.png" style="width:100%;" alt="보존 필터 페이지" >}}

Datadog의 [보존 필터][3] 설정 페이지에서 모든 보존 필터 목록을 확인할 수 있습니다.

필터 이름
: 스팬을 인덱싱하는 데 사용되는 각 보존 필터의 이름입니다.

필터 쿼리
: 각 필터에 대한 태그 기반 쿼리입니다.

보존율
: 일치하는 스팬 중 인덱싱되는 스팬의 비율(0~100%)입니다. 보존된 스팬은 필터 쿼리와 일치하는 스팬 중에서 균일하게 선택됩니다.

인덱싱된 스팬
: 선택한 기간 동안 필터에 의해 인덱싱된 스팬의 수입니다.

마지막 업데이트일
: 보존 필터를 마지막으로 수정한 날짜 및 사용자입니다.

활성화 토글
: 필터를 켜고 끌 수 있습니다.

**참고**: 보존 필터 목록의 순서가 인덱싱 동작을 변경합니다. 스팬이 목록 앞부분의 보존 필터와 일치하면 해당 스팬은 유지되거나 삭제됩니다. 목록 아래쪽에 있는 일치하는 사용자 지정 보존 필터는 이미 처리된 스팬을 포착하지 않습니다.

각 보존 필터의 `Spans Indexed` 열은 `datadog.estimated_usage.apm.indexed_spans` 메트릭에 의해 구동되며, 이를 사용하여 인덱싱된 스팬 사용량을 추적할 수 있습니다. 자세한 내용은 [사용량 메트릭][2]을 읽어보거나 계정에서 사용할 수 있는 [기본 제공 사용량 대시보드][4]를 살펴보세요.

<div class="alert alert-info">보존 필터는 Agent가 수집하여 Datadog으로 전송하는('수집된') 트레이스에는 영향을 주지 않습니다. 수집을 제어하려면 전용 <a href="/tracing/trace_pipeline/ingestion_controls/">수집 제어</a>를 사용하세요.</div>


### 보존 필터 유형 {#retention-filter-types}

보존 필터에는 두 가지 유형이 있습니다.

1. **스팬 수준 보존 필터** - 필터 기준과 일치하는 특정 스팬만 인덱싱합니다.
2. **트레이스 수준 보존 필터** - 필터 기준과 일치하는 스팬이 포함된 전체 트레이스를 인덱싱하여 Trace Queries에서 전체 트레이스를 검색할 수 있게 합니다.

| 기능 | 표준 보존 필터 | 트레이스 수준 보존 필터 |
| ------- | ------------------------- | ----------------------------- |
| **구성** | 스팬 쿼리 + 스팬 보존율 | 스팬 쿼리 + 스팬 보존율 + 트레이스 보존율 |
| **인덱싱 대상** | 쿼리가 타겟팅하는 스팬만 | 쿼리와 일치하는 스팬을 포함하는 트레이스에 속한 모든 스팬 |
| **쿼리 가능 위치** | 스팬 탐색기 | 스팬 탐색기 및 트레이스 쿼리 |

**참고**: 트레이스 수준 보존 필터에 의해 간접적으로 인덱싱되어 보존된 스팬(즉, 쿼리와 직접 일치하지는 않지만 일치하는 트레이스에 속한 스팬)은 [트레이스 분석 모니터링][19]에 의해 평가되지 않습니다.

### 기본 보존 필터 {#default-retention-filters}

다음 보존 필터가 기본적으로 활성화되어 있습니다. 
- `Error Default` 보존 필터는 `status:error`로 오류 스팬을 인덱싱합니다. 보존율과 쿼리는 구성 가능합니다. 예를 들어, 프로덕션 오류를 캡처하려면 쿼리를 `status:error, env:production`으로 설정하세요. 기본적으로 오류를 캡처하지 않으려면 보존 필터를 비활성화하세요.
- [앱 및 API 보호][16]를 사용하는 경우 `App and API Protection Default` 보존 필터가 활성화됩니다. 이 필터는 애플리케이션 보안 영향(공격 시도)이 있는 것으로 식별된 트레이스의 모든 스팬을 보존합니다.
- Synthetic Monitoring을 사용하는 경우 `Synthetics Default` 보존 필터가 활성화됩니다. 이 필터는 Synthetic API 및 브라우저 테스트에서 생성된 트레이스가 기본적으로 계속 사용 가능하도록 보장합니다. 트레이스를 Synthetic 테스트와 연관시키는 방법을 포함한 자세한 내용은 [Synthetic APM][15]을 참조하세요.
- [Dynamic Instrumentation][17]을 사용하는 경우 `Dynamic Instrumentation Default` 보존 필터가 활성화됩니다. 이 필터는 Dynamic Instrumentation으로 동적으로 생성된 스팬이 기본적으로 장기간 사용 가능하도록 보장합니다.

### Datadog 지능형 보존 필터 {#datadog-intelligent-retention-filter}

Datadog 지능형 보존 필터는 서비스에 대해 항상 활성화되어 있으며, 수십 개의 사용자 지정 보존 필터를 생성할 필요 없이 대표적인 트레이스 항목을 유지합니다. 구성 요소는 다음과 같습니다. 
- [다양성 샘플링](#diversity-sampling)
- [1% 플랫 샘플링](#one-percent-flat-sampling)

**참고:** [트레이스 쿼리][11]는 지능형 보존 필터에 의해 인덱싱된 데이터를 기반으로 합니다.

지능형 보존 필터(다양성 샘플링 및 1% 플랫 샘플링)에 의해 인덱싱된 스팬은 인덱싱된 스팬 사용량에 **포함되지 않으며**, 따라서 **청구 금액에 영향을 주지 않습니다**.

지능형 보존 필터가 유지하는 것보다 더 많은 스팬을 인덱싱하려는 특정 태그나 특성이 있는 경우, [사용자 지정 보존 필터를 생성](#create-your-own-retention-filter)하세요.

#### 다양성 샘플링 {#diversity-sampling}

다양성 샘플링은 **서비스 진입 스팬**을 스캔하고 다음을 30일 동안 보존합니다.

- 환경, 서비스, 작업 및 리소스의 각 조합에 대해 최대 15분마다 최소 하나의 스팬(및 관련 트레이스)을 보존하여, 트래픽이 적은 엔드포인트의 경우에도 [서비스][9] 및 [리소스][10] 페이지에서 항상 예시 트레이스를 찾을 수 있도록 합니다.
- 환경, 서비스, 작업 및 리소스의 각 조합에 대한 `p75`, `p90` 및 `p95` 백분위수 스팬(및 관련 트레이스)의 높은 지연 시간 스팬.
- 오류 다양성을 보장하는 대표적인 오류 선택(예: 응답 상태 코드 400번대, 500번대).

다양성 샘플링으로 캡처된 데이터 세트는 균등하게 샘플링되지 않습니다. 즉, 전체 트래픽을 비례적으로 대표하지 않습니다. 이는 오류 및 높은 지연 시간 트레이스에 편향되어 있습니다. 

#### 1% 플랫 샘플링 {#one-percent-flat-sampling}

1% 플랫 샘플링은 다음을 캡처합니다.
1. 트레이스 데이터가 수집된 RUM 세션의 1%와 관련된 모든 **트레이스**를 캡처하여, 인덱싱된 일부 세션에 항상 관련 트레이스 데이터가 포함되도록 보장합니다. 이는 [APM과 RUM 간의 상관관계][20]를 개선하여 프런트엔드 세션과 백엔드 트레이스를 함께 확인하면서 사용자 문제를 디버깅할 수 있게 합니다. 샘플은 `session_id`를 기준으로 적용되므로, 동일한 RUM 세션에 연결된 모든 트레이스는 일관된 인덱싱 결정을 공유합니다.
2. [수집된 스팬][12]의 **균등 1% 샘플**이며, `trace_id`를 기준으로 적용되어 동일한 트레이스 내의 모든 스팬이 동일한 샘플링 결정을 공유합니다. 이 샘플을 일반적인 시스템 상태 모니터링 및 추세 분석에 사용하세요.

이 샘플링 메커니즘은 균등하며, 전체 수집 트래픽을 비례적으로 대표합니다. 결과적으로 짧은 시간 범위로 필터링하면 트래픽이 적은 서비스 및 엔드포인트가 해당 데이터 세트에서 누락될 수 있습니다.

### 사용자 지정 보존 필터 생성{#create-your-own-retention-filter}

사용자 지정 보존 필터를 생성하여 특정 트레이스 데이터를 15일 동안 보존하세요. 필터 쿼리에서 스팬 태그나 특성을 사용하여 비즈니스에 가장 중요한 스팬을 대상으로 지정하고 보존하세요. 

예를 들어, 다음과 같은 모든 트레이스를 보존하기 위한 필터를 생성할 수 있습니다.

- $100를 초과하는 신용카드 거래: `@transaction_amount:>100`
- 프로덕션 환경에서 지속 시간이 2초를 초과하는 체크아웃 작업 스팬: `resource_name:"GET /checkout" @duration:>2s env:prod`
- 온라인 배달 서비스 애플리케이션의 특정 버전: `service:delivery-api @version:v2.0`

보존 필터를 사용하여 스팬을 인덱싱하는 경우

- **검색 가능성**: 인덱싱된 스팬은 Trace Explorer 및 대시보드에서 찾을 수 있으며 15일 동안 모니터링됩니다.

- **시각화 컨텍스트**: Trace Explorer에서 인덱싱된 스팬을 클릭하면, 해당 다른 스팬이 인덱싱되었는지 여부와 관계없이 항상 전체 트레이스 컨텍스트(모든 상위 및 하위 스팬)를 플레임 그래프 또는 워터폴 보기에서 확인할 수 있습니다.

- **검색 컨텍스트**: 전체 트레이스를 시각화할 수는 있지만, 보존 필터에 의해 특별히 인덱싱된 스팬만 Trace Explorer에서 검색할 수 있습니다.

{{< img src="tracing/trace_indexing_and_ingestion/retention_filters/retention_filter_create.png" style="width:90%;" alt="보존 필터 생성">}}

보존 필터를 생성하려면 다음 단계를 따르세요.
1. [{{< ui >}}APM{{< /ui >}} > {{< ui >}}Retention Filters{{< /ui >}}][18]로 이동합니다.
1. {{< ui >}}Add Retention Filter{{< /ui >}}를 클릭합니다.
1. 보존하려는 스팬을 대상으로 지정하도록 {{< ui >}}Retention Query{{< /ui >}}를 정의합니다. [Trace Explorer][7]에서 쿼리를 작성하는 것과 마찬가지로, 모든 스팬이나 특성을 사용하여 스팬을 필터링할 수 있습니다.
1. 이 쿼리와 일치하는 스팬 중 인덱싱할 비율을 정의하려면 {{< ui >}}Span rate{{< /ui >}}를 설정합니다.
1. 필요시 {{< ui >}}Trace rate{{< /ui >}}를 설정하여 인덱싱해야 하는 스팬과 관련된 전체 트레이스의 비율을 정의합니다. 이렇게 하면 보존 쿼리에 의해 지정된 스팬과 관련된 트레이스의 다른 스팬도 인덱싱되므로, [Trace Queries][11]에서 인덱싱된 데이터를 쿼리할 수 있습니다. 
1. 필터 이름을 설정합니다.
1. {{< ui >}}Add Filter{{< /ui >}}를 클릭하여 필터를 저장합니다.

<div class="alert alert-warning">트레이스 비율을 구성하면 인덱싱된 스팬 사용량이 크게 증가할 수 있습니다.</div>

예를 들어, `service:my-service`의 스팬을 인덱싱하도록 보존 필터를 구성하는 경우
- `50%`의 스팬 비율을 구성하면 `service:my-service`와 일치하는 스팬을 포함하는 트레이스의 약 50%가 선택되도록 보장하는 데 도움이 됩니다. 선택된 트레이스의 경우 `service:my-service`와 일치하는 모든 스팬이 인덱싱됩니다.
- `10%`의 트레이스 비율을 구성하면 스팬 비율에 의해 선택된 트레이스의 10%가 완전히 인덱싱되도록 보장하는 데 도움이 됩니다. 해당 트레이스의 경우 트레이스 내의 모든 스팬(`service:my-service` 출처 이외도 포함)이 인덱싱됩니다. 트레이스에 평균 100개의 스팬이 있고 `service:my-service`에서 5개의 스팬이 있다고 가정할 때, 트레이스 비율을 구성하면 선택된 트레이스의 구성된 비율에 대해 트레이스의 나머지 95개 스팬이 인덱싱됩니다.
- 스팬 비율이 먼저 평가되며, 트레이스 비율은 스팬 비율에 의해 선택된 트레이스에만 적용됩니다.

새 필터를 생성하거나 기존 필터의 보존 비율을 편집할 때 Datadog은 전체 인덱싱 볼륨의 예상 백분율 변화를 표시합니다.

필터는 순차적 순서로 보존됩니다. `resource:POST /hello_world` 태그가 있는 스팬을 보존하는 상위 필터가 있는 경우, 해당 스팬은 동일한 태그가 있는 스팬을 검색하는 하위 필터의 {{< ui >}}Edit{{< /ui >}} 창에 표시되지 않는데, 이는 해당 스팬이 상위 필터에 의해 이미 보존되었기 때문입니다.

## 인덱싱된 스팬에 대한 트레이스 검색 및 분석{#trace-search-and-analytics-on-indexed-spans}

### Trace Explorer, 대시보드 및 노트북{#in-the-trace-explorer-dashboards-and-notebooks}

기본적으로 사용자 지정 보존 필터**와** 지능형 보존 필터에 의해 인덱싱된 스팬은 대시보드 및 노트북 쿼리뿐만 아니라 Trace Explorer [집계 보기][6](시계열, 톱리스트, 표)에도 포함됩니다.


`retained_by` 특성은 모든 보존된 스팬에 존재합니다. 값은 다음과 같습니다. 
- `retained_by:retention_filter` 스팬이 [사용자 지정 보존 필터](#create-your-own-retention-filter)에 의해 캡처된 경우([기본 보존 필터](#default-retention-filters) 포함 및 **트레이스 비율 없음**이 구성된 경우). 이러한 스팬은 트레이스 쿼리에 포함되지 않는데, 이는 트레이스 쿼리가 트레이스의 모든 스팬이 인덱싱될 것을 요구하기 때문입니다.
- `retained_by:trace_retention_filter` 트레이스 비율이 구성된 보존 필터에 의해 스팬이 캡처된 경우.
- `retained_by:diversity_sampling` 스팬이 [다양성 샘플링](#diversity-sampling)([지능형 보존 필터](#datadog-intelligent-retention-filter)의 일부)에 의해 캡처된 경우.
- `retained_by:flat_sampled` 스팬이 [1% 플랫 샘플링](#one-percent-flat-sampling)에 의해 인덱싱된 경우. 보존 이유별로 추가 필터링하는 경우
  - `@retention_reason:rum` `session_id`를 기반으로 샘플링된 RUM 세션에 연결된 트레이스의 경우. 사용자 세션과 상관관계가 있는 트레이스를 분석하려면 이 기능을 사용하세요.
  - `@retention_reason:trace` `trace_id`를 기반으로 균일하게 샘플링된 트레이스의 경우. 일반적인 성능 추세 및 시스템 전체 분석을 위해 이 기능을 사용하세요.

{{< img src="tracing/trace_indexing_and_ingestion/retention_filters/trace_analytics.png" style="width:100%;" alt="보존 기준 패싯" >}}

### 트레이스 분석 모니터링의 경우 {#in-trace-analytics-monitors}

지능형 보존 필터로 인덱싱된 스팬은 APM 트레이스 분석 모니터링 평가에서 **제외**됩니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/trace_pipeline/
[2]: /ko/tracing/trace_pipeline/metrics
[3]: https://app.datadoghq.com/apm/traces/retention-filters
[4]: https://app.datadoghq.com/dash/integration/30337/app-analytics-usage
[5]: /ko/tracing/glossary/#service-entry-span
[6]: /ko/tracing/trace_explorer/?tab=timeseriesview#indexed-spans-search-with-15-day-retention
[7]: /ko/tracing/trace_explorer/?tab=listview#indexed-spans-search-with-15-day-retention
[8]: /ko/tracing/glossary/#trace-root-span
[9]: /ko/tracing/services/service_page/
[10]: /ko/tracing/services/resource_page/
[11]: /ko/tracing/trace_explorer/trace_queries
[12]: /ko/tracing/trace_pipeline/ingestion_controls/
[13]: /ko/tracing/trace_explorer/
[14]: /ko/monitors/types/apm/?tab=traceanalytics
[15]: /ko/synthetics/apm/
[16]: /ko/security/application_security/
[17]: /ko/dynamic_instrumentation/
[18]: https://app.datadoghq.com/apm/traces/retention-filters
[19]: /ko/monitors/types/apm/?tab=traceanalytics
[20]: /ko/tracing/other_telemetry/rum/