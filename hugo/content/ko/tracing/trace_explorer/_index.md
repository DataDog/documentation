---
aliases:
- /ko/tracing/tracing_without_limits/
- /ko/tracing/livesearch/
- /ko/tracing/trace_search_and_analytics/
description: Trace Explorer
further_reading:
- link: tracing/trace_explorer/search
  tag: 설명서
  text: 스팬 검색
- link: https://learn.datadoghq.com/courses/getting-started-apm
  tag: 학습 센터
  text: APM Metrics 및 트레이스 시작하기
- link: https://learn.datadoghq.com/courses/diagnosing-bugs-with-apm
  tag: 학습 센터
  text: Datadog APM을 사용하여 애플리케이션 버그 진단하기
title: Trace Explorer
---
{{< img src="tracing/apm_lifecycle/trace_explorer.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Trace Explorer" >}}

## 개요 {#overview}

[trace explorer][1]는 모든 태그를 사용하여 수집되거나 인덱싱된 스팬을 검색할 수 있는 기능을 제공합니다. 쿼리로 찾은 스팬은 실시간(지난 15분 동안 수집된 모든 스팬, 롤링) 또는 인덱싱된 스팬(커스텀 필터에 의해 15일 동안 보관된 스팬)을 검색하는지에 따라 달라집니다.

계측된 애플리케이션은 구성한 [Ingestion Control][2]에 따라 Datadog에 트레이스를 전송합니다. 수집된 트레이스는 15분 동안 라이브 트레이스로 사용할 수 있습니다.

Trace Explorer는 라이브 모드에 있을 때마다 **Live Search - All ingested data** 인디케이터를 표시합니다.

{{< img src="tracing/trace_explorer/live_search.png" alt="Live Search 인디케이터" style="width:75%;" >}}

그리고 수집된 모든 트레이스는 다음과 같은 필터를 거칩니다.
- [사용자 정의 보존 필터][3]: 어떤 스팬을 인덱싱할지 결정합니다. 사용자 정의 보존 필터를 통해 인덱싱된 후에는 트레이스가 **15일** 동안 유지됩니다.
- [지능형 보존 필터][4]: 다양한 트레이스 세트를 유지하는 기본 필터입니다. 지능형 보존 필터를 통해 인덱싱된 후에는 트레이스가 **30일** 동안 유지됩니다.

Trace Explorer는 [인덱싱된 스팬][5]을 검색할 때마다 **Search - Only Indexed Data** 인디케이터를 표시합니다.

{{< img src="tracing/trace_explorer/historical_search.png" alt="Only Indexed Data 인디케이터" style="width:75%;" >}}

Live Search는 트레이스 페이지의 기본 화면입니다. 오른쪽 상단에 있는 시간 선택기를 사용하여 Live Search에서 Indexed Data Search로 전환하세요.

### 트레이스 패턴 {#trace-patterns}

{{< callout url="https://www.datadoghq.com/product-preview/apm-trace-patterns/" btn_hidden="false" header="미리 보기에 참여하세요!" >}}
트레이스 패턴은 미리 보기로 제공되고 있습니다. 지금 바로 이 양식을 사용하여 요청을 제출하세요.
{{< /callout >}}

트레이스 패턴은 유사한 구조와 속성을 가진 스팬을 반복되는 패턴으로 그룹화합니다. 이에 따라 수천 개의 트레이스를 개별적으로 읽는 대신 한 번에 행동을 분석할 수 있습니다. 쿼리가 너무 많은 스팬을 반환할 때는 트레이스 패턴을 사용하여 트레이스를 하나씩 스캔하는 대신, 이번 주에 어떤 오류 형태가 새로 생겼는지 또는 배포 후 어떤 지연 패턴이 변경되었는지를 찾습니다. 

### 트레이스 볼륨 제어 {#trace-volume-control}

[수집 및 보존][6]을 맞춤 설정하여 가장 관련성이 높은 데이터를 정확하게 전송하고 유지할 수 있습니다.

#### 수집 {#ingestion}

[Datadog Agent 설정 옵션][7]을 사용하여 전역적으로 볼륨을 제어하거나 Datadog APM으로 계측된 서비스별로 정확한 [수집 규칙][8]을 설정하세요.


#### 인덱싱 {#indexing}

서비스를 계측하고 트레이스를 수집한 후 Datadog이 사용자와 관련된 스팬을 유지할 수 있도록 Datadog 앱 내에서 태그 기반 [보존 필터][3]를 설정하세요.

**참고:** 수집된 스팬과 인덱싱된 스팬 모두 청구서에 영향을 미칠 수 있습니다. 자세한 내용은 [APM 청구][9]를 참조하세요.

## 15분 동안 Live Search {#live-search-for-15-minutes}

{{< img src="tracing/apm_lifecycle/trace_explorer_live_search.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Live Search" >}}

Live Search를 사용하면 Datadog은 Datadog Agent에서 전송하자마자 보존 필터에 의해 인덱싱되기 전에 스팬을 표시합니다. 수집된 모든 스팬은 지난 15분(롤링 시간) 동안 사용할 수 있으며 샘플링 없이 표시됩니다.

{{< tabs >}}
{{% tab "목록 보기" %}}

{{< img src="tracing/live_search/live-search.mp4" alt="Live Search 목록 보기" video="true" >}}

**목록 보기**로 다음을 수행할 수 있습니다.

- 모든 태그의 `version_id`를 필터링하여 새 배포가 원활하게 진행되었는지 모니터링합니다.
- 수집된 트레이스를 100% 검색하여 문제가 있는 하위 스팬과 연결된 특정 `org_id` 또는 `customer_id`에 대한 중단 관련 정보를 실시간으로 확인합니다.
- `process_id`를 입력하고 새 프로세스 ID를 하위 스팬에 태그로 자동 완성하여 프로세스가 올바르게 시작되었는지 확인합니다.
- 하위 리소스의 기간을 필터링하여 엔드포인트에 대한 로드 테스트 및 성능 영향을 모니터링하세요.
- 트레이스 패널 보기에서 직접 모든 스팬 또는 태그에 대해 원클릭 검색 쿼리를 실행하세요.
- 사용자 맞춤 보기를 위해 스팬 태그에서 열을 추가, 제거 및 정렬합니다.

초당 수신된 스팬의 수는 트레이스 표 상단에 표시됩니다. 초당 수천 개의 스팬 스트림은 사람이 모두 읽기 어려우므로, 처리량이 높은 스팬 스트림에서는 가독성을 높이기 위해 일부 스팬만 표시합니다. 검색 쿼리에서 사용 가능한 모든 스팬을 검색할 수 있습니다. 라이브 검색 쿼리 바 필터링 기능을 사용하여 스팬 스트림을 필터링하고 화면 오른쪽 상단의 **일시 중지/재생** 버튼을 사용하여 스트림을 일시 중지하거나 재개합니다.

{{< img src="tracing/live_search/play-pause-button.png" alt="라이브 스트림 일시 중지 또는 재생" style="width:75%;" >}}

**참고**: 스팬을 선택하면 스트림이 일시 중지되고 트레이스 사이드 패널에 선택한 스팬에 대한 자세한 내용이 표시됩니다.

{{% /tab %}}
{{% tab "시계열 보기" %}}

{{< img src="tracing/live_search/live-analytics.mp4" alt="Live Search 시계열 보기" video="true" >}}

**시계열 보기**를 사용하여 스팬을 목록 대신 시계열로 시각화합니다. Live Search 시계열 보기는 다음과 같이 지정된 기준에 해당하는 요청 또는 오류를 그래프로 표시하는 데 유용합니다.

- 장바구니 값이 최소 `$100`인 `ShoppingCart##checkout` 서비스 및 엔드포인트에 대한 오류이며 이러한 기준과 일치하는 트레이스를 개별적으로 볼 수 있는 기능이 있습니다.

- 중요한 애플리케이션 업데이트의 카나리 배포를 실시간으로 모니터링합니다.

- iOS 애플리케이션의 최신 버전으로 범위가 지정된 지리적 영역에서 지연 시간을 비교합니다.

쿼리와 일치하는 요청에 대한 시계열을 표시하는 것 외에도 가동 중단이나 조사 중에 가장 영향을 받은 고객, 가용성 영역 또는 기타 태그의 상위 목록으로 스팬을 시각화할 수도 있습니다.

**참고:** 대시보드 및 모니터로 내보내기는 보존된 스팬을 통해서만 가능합니다.

{{% /tab %}}
{{< /tabs >}}

### 필터링 {#filtering}

{{< img src="tracing/live_search/service_entry_root_spans.mp4" alt="모든 스팬 검색" video="true" >}}

검색 바에 유효한 쿼리를 입력하면 **모든 스팬**에서 검색 기준과 일치하는 트레이스가 표시됩니다. 검색 구문은 다른 트레이스 보기와 마찬가지로 Live Search 보기에서도 동일하지만 여기서 쿼리는 인덱싱된 트레이스 뿐 아니라 **모든 스팬** 및 **모든 태그**에 걸쳐 수집된 모든 트레이스와 일치됩니다.

트레이스 테이블 위의 상자를 변경하여 [서비스 엔트리 스팬][10], [루트 스팬][11] 또는 모든 스팬을 쿼리할 수 있습니다. 이 기능을 고트래픽 애플리케이션에서 사용하여 표시되는 스팬 수를 줄이고, 서비스의 엔트리 스팬 또는 트레이스의 엔트리만 볼 수 있습니다. 이 상자를 선택하면 목록에 표시된 스팬만 필터링되며, 다른 스팬은 스팬을 클릭하여 트레이스 세부 정보를 볼 때 여전히 플레임 그래프에 표시됩니다.

정의되지 않은 속성에 대해서도 필터링할 수 있습니다. 예를 들어 `cart.value` 속성으로 필터링하는 옵션은 두 가지입니다.

- 트레이스 세부 정보 패널에서 `cart.value` 속성을 클릭하고 검색 쿼리에 추가합니다.
{{< img src="tracing/live_search/add-attribute-to-query.mp4" alt="쿼리에 속성 추가" video="true" >}}

- 검색창에 'cart.value'를 입력하여 `cart.value` 속성이 있는 모든 스팬을 필터링합니다.
{{< img src="tracing/live_search/filter-by-attribute2.mp4" alt="Live Search를 속성으로 필터링" video="true" >}}

### 통합 인사이트를 사용하여 이상 분석{#analyzing-anomalies-with-integrated-insights}

Trace Explorer는 자동화된 Watchdog 이상치 탐지와 태그 분석을 결합하여 문제의 근본 원인을 신속하게 식별할 수 있도록 도와줍니다. Watchdog가 오류 또는 높은 대기 시간 스팬에서 통계적으로 과대표현된 태그를 감지하면, 이러한 인사이트는 여러 곳에서 표시됩니다.

- **검색 제안**: 검색창에 입력할 때, 이상치 태그가 오류 또는 대기 시간 문제와 연관되어 있음을 나타내는 지표와 함께 제안으로 나타납니다.
- **그룹화 추천**: 그룹화할 속성을 선택할 때, 이상치 패싯이 강조 표시되어 조사를 안내합니다.
- **패싯 사이드바**: 이상치 태그가 전용 'OUTLIERS' 섹션의 패싯 목록 상단으로 승격됩니다.
- **RED 메트릭**: 오류 및 대기 시간 그래프 옆의 '분석' 버튼은 관련 이상치가 감지되면 강조 표시됩니다.

{{< img src="tracing/trace_explorer/visualize/trace_explorer_outliers.mp4" alt="통합 인사이트를 사용하여 이상 분석" video="true" >}}

## 15일 보존되는 인덱싱된 스팬 검색{#indexed-spans-search-with-15-day-retention}

{{< img src="tracing/apm_lifecycle/trace_explorer_indexed_search.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="인덱싱된 검색" >}}

보존된 트레이스를 실시간 검색과 동일한 방식으로 검색할 수 있습니다. 실시간 데이터 검색에서 보존된 데이터 검색으로 전환하려면, 시간 선택기를 15분보다 긴 기간으로 변경하세요. 보존 필터로 인덱싱된 모든 스팬은 검색에서 접근할 수 있습니다. 이 스팬들은 보존 필터로 인덱싱된 후 Datadog에 의해 15일 동안 보관됩니다.

{{< img src="tracing/live_search/searching-retained-traces.mp4" alt="보존된 트레이스 검색" video="true" >}}

{{< tabs >}}
{{% tab "목록 보기" %}}

사용자 정의 보존 필터 *및* 지능형 보존 필터로 인덱싱된 모든 스팬은 목록 보기에서 검색할 수 있습니다. 그러나, 어떤 보존 필터에도 인덱싱되지 않은 스팬에만 나타나는 태그로 필터링하면, [Live Search](#live-search-for-15-minutes)을 사용할 때와 달리 검색 결과가 반환되지 않습니다.

{{% /tab %}}
{{% tab "시계열 보기" %}}

트레이스 분석을 사용하면 커스텀 보존 필터 또는 지능형 보존 필터로 인덱싱된 모든 스팬을 검색할 수 있습니다.

시계열 보기에서 쿼리를 [대시보드][1], [모니터][2] 또는 [노트북][3]으로 내보내 추가로 조사하거나 집계된 스팬의 수가 특정 임계값을 초과할 때 자동으로 알림을 받을 수 있습니다.

**참고**: 지능형 보존 필터로 인덱싱된 스팬은 APM 트레이스 분석 모니터 평가에서 제외됩니다. 자세한 내용은 [트레이스 보존][4]을 참조하세요.

[1]: /ko/dashboards/widgets/timeseries/
[2]: /ko/monitors/types/apm/?tab=analytics
[3]: /ko/notebooks
[4]: /ko/tracing/trace_pipeline/trace_retention/#trace-search-and-analytics-on-indexed-spans

{{% /tab %}}
{{< /tabs >}}

### 보존 설정 {#retention-configuration}

어느 스팬을 어떤 보존 비율로 보존할지 사용자 정의할 수 있습니다. 기본적으로는 [Datadog 지능형 보존 필터][4]가 적용되어 있으며, 오류 및 지연 다양성과 저처리량 리소스를 자동으로 보존합니다. 기본 지능형 보존 필터에 대해 자세히 알아보고 추가 필터를 만드는 방법은 [보존 필터 문서][3]를 참조하세요. Datadog 앱 내 [보존 필터 페이지][12]로 이동하여 자신의 필터를 생성하거나 수정하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/traces
[2]: /ko/tracing/trace_pipeline/ingestion_controls
[3]: /ko/tracing/trace_pipeline/trace_retention/#retention-filters
[4]: /ko/tracing/trace_pipeline/trace_retention/#datadog-intelligent-retention-filter
[5]: /ko/tracing/glossary/#indexed-span
[6]: /ko/tracing/trace_pipeline/
[7]: /ko/tracing/trace_pipeline/ingestion_mechanisms/#in-the-agent
[8]: /ko/tracing/trace_pipeline/ingestion_mechanisms/#in-tracing-libraries-user-defined-rules
[9]: /ko/account_management/billing/apm_distributed_tracing/
[10]: /ko/glossary/#service-entry-span
[11]: /ko/glossary/#trace-root-span
[12]: https://app.datadoghq.com/apm/traces/retention-filters