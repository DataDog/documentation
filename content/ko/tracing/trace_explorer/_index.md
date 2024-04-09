---
aliases:
- /ko/tracing/tracing_without_limits/
- /ko/tracing/livesearch/
- /ko/tracing/trace_search_and_analytics/
description: 서비스 맵
further_reading:
- link: tracing/trace_explorer/search
  tag: 설명서
  text: 설정
kind: 설명서
title: 서비스 맵
---

{{< img src="tracing/apm_lifecycle/trace_explorer.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Trace Explorer" >}}

## 개요

[Trace Explorer][1]를 통해 모든 스팬의 태그를 사용하여 수집되거나 인덱싱된 모든 스팬을 검색할 수 있습니다. 쿼리로 찾은 스팬은 실시간(지난 15분 동안 수집된 모든 스팬, 롤링) 또는 인덱싱된 스팬(커스텀 필터에 의해 15일 동안 보관된 스팬)을 검색하는지에 따라 달라집니다.

계측된 애플리케이션은 [수집][2]을 위해 트레이스의 100%를 Datadog에 전송하여 트레이스를 15분의 롤링 시간 동안 라이브 트레이스로 사용할 수 있도록 합니다.

Trace Explorer는 라이브 모드에 있을 때마다 **Live Search - All ingested data** 인디케이터를 표시합니다.

{{< img src="tracing/trace_explorer/live_search.png" alt="Live Search 인디케이터" style="width:75%;" >}}

그리고 수집된 모든 트레이스는 다음을 통과합니다.
- 인덱싱할 스팬을 결정하기 위해 만들 수 있는 [커스텀 보존 필터][3]입니다. 커스텀 보존 필터로 인덱싱하면 트레이스가 **15일** 동안 유지됩니다
- 다양한 트레이스를 유지하는 기본 [지능형 보존 필터][4]. 지능형 보존 필터로 인덱싱하면 트레이스가 **30일** 동안 유지됩니다.

Trace Explorer는 [인덱싱된 스팬][5]을 검색할 때마다 **Search - Only Indexed Data** 인디케이터를 표시합니다.

{{< img src="tracing/trace_explorer/historical_search.png" alt="Only Indexed Data 인디케이터" style="width:75%;" >}}

Live Search는 Traces 페이지의 기본 보기입니다. 오른쪽 상단에 있는 시간 선택기를 사용하여 Live Search에서 Indexed Data Search로 전환하세요.

### 트레이스 볼륨 제어

[수집 및 보존][6]을 맞춤 설정하여 가장 관련성이 높은 데이터를 정확하게 전송하고 유지할 수 있습니다.

#### 수집

[Datadog  Agent 설정 옵션][7]을 사용하여 전역적으로 볼륨을 제어하거나 Datadog APM으로 계측된 서비스별로 정확한 [수집 규칙][8]을 설정하세요.


#### 인덱싱

서비스를 계측하고 트레이스를 수집한 후 Datadog이 사용자와 관련된 스팬을 유지할 수 있도록 Datadog 앱 내에서 태그 기반 [보존 필터][3]를 설정하세요.

**참고:** 수집된 스팬과 인덱싱된 스팬 모두 청구서에 영향을 줄 수 있습니다. 자세한 내용은 [APM 청구][9]를 참조하세요.

## 15분 동안 Live Search

{{< img src="tracing/apm_lifecycle/trace_explorer_live_search.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Live Search" >}}

Live Search를 사용하면 Datadog은 Datadog Agent에서 전송하자마자 보존 필터에 의해 인덱싱되기 전에 스팬을 표시합니다. 수집된 모든 스팬은 지난 15분(롤링 기간) 동안 사용할 수 있으며 샘플링 없이 표시됩니다.

{{< tabs >}}
{{% tab "List 보기" %}}

{{< img src="tracing/live_search/live-search.mp4" alt="Live Search List 보기" video="true" >}}

**List 보기**로 다음을 수행할 수 있습니다.

- 모든 태그의 `version_id`를 필터링하여 새 배포가 원활하게 진행되었는지 모니터링합니다.
- 수집된 트레이스를 100% 검색하여 문제가 있는 하위 스팬과 연결된 특정 `org_id` 또는 `customer_id`에 대한 중단 관련 정보를 실시간으로 확인합니다.
- `process_id`를 입력하고 새 프로세스 ID를 하위 스팬에 태그로 자동 완성하여 프로세스가 올바르게 시작되었는지 확인합니다.
- 하위 리소스의 기간을 필터링하여 엔드포인트에 대한 로드 테스트 및 성능 영향을 모니터링하세요.
- 트레이스 패널 보기에서 직접 모든 스팬 또는 태그에 대해 원클릭 검색 쿼리를 실행하세요.
- 사용자 맞춤 보기를 위해 스팬 태그에서 열을 추가, 제거 및 정렬합니다.

초당 수신된 스팬 수가 트레이스 테이블 상단에 표시됩니다. 초당 수천 개의 스팬 스트림은 사람이 읽을 수 없으므로 높은 처리량 스팬 스트림은 명확한 시각화를 위해 일부 스팬을 표시합니다. 검색 쿼리에서 사용 가능한 모든 스팬을 검색할 수 있습니다. Live Search 쿼리 막대 필터링 기능을 사용하여 스팬 스트림을 필터링하고 화면 오른쪽 상단에 있는 **Pause/Play** 버튼을 사용하여 스트림을 일시 중지하거나 재개하세요.

{{< img src="tracing/live_search/play-pause-button.png" alt="라이브 스트림 일시 중지 또는 재생" style="width:75%;" >}}

**참고**: 스팬을 선택하면 스트림이 일시 중지되고 트레이스 사이드 패널에 선택한 스팬에 대한 자세한 내용이 표시됩니다.

{{% /tab %}}
{{% tab "Timeseries 보기" %}}

{{< img src="tracing/live_search/live-analytics.mp4" alt="Live Search Timeseries 보기" video="true" >}}

**Timeseries 보기**를 사용하여 스팬을 목록 대신 시계열로 시각화하세요. Live Search Timeseries 보기는 다음과 같이 지정된 기준에 해당하는 요청 또는 오류를 그래프로 표시하는 데 유용합니다.

- 장바구니 값이 최소 `$100`인 `ShoppingCart##checkout` 서비스 및 엔드포인트에 대한 오류이며 이러한 기준과 일치하는 트레이스를 개별적으로 볼 수 있는 기능이 있습니다.

- 중요한 애플리케이션 업데이트의 카나리 배포를 실시간으로 모니터링합니다.

- iOS 애플리케이션의 최신 버전으로 범위가 지정된 지리적 영역에서 지연 시간을 비교합니다.

쿼리와 일치하는 요청에 대한 시계열을 표시하는 것 외에도 가동 중단이나 조사 중에 가장 영향을 받은 고객, 가용성 영역 또는 기타 태그의 상위 목록으로 스팬을 시각화할 수도 있습니다.

**참고:** 대시보드 및 모니터로 내보내기는 보존된 스팬을 통해서만 가능합니다.

{{% /tab %}}
{{< /tabs >}}

### 필터링

{{< img src="tracing/live_search/service_entry_root_spans.mp4" alt="모든 스팬 검색" video="true" >}}

검색창의 유효한 쿼리는 **모든 스팬**에서 검색 기준과 일치하는 트레이스를 표시합니다. 검색 구문은 다른 트레이스 보기와 마찬가지로 Live Search 보기에서도 동일하지만 여기서 쿼리는 인덱싱된 트레이스 뿐 아니라  **모든 스팬** 및 **모든 태그**에 걸쳐 수집된 모든 트레이스와 일치됩니다. 

트레이스 테이블 위의 상자로 선택 항목을 변경하여 [서비스 항목 스팬][10], [루트 스팬][11] 또는 모든 스팬을 쿼리하도록 선택할 수 있습니다. 트래픽이 많은 애플리케이션에서 이 기능을 사용하면 표시되는 스팬의 수를 줄이고 서비스의 엔트리 포인트 스팬 또는 트레이스의 엔트리 포인트만 볼 수 있습니다. 이 상자를 선택하면 목록에 표시된 스팬만 필터링됩니다. 트레이스 세부정보를 보기 위해 스팬을 클릭하면 다른 항목은 여전히 ​​플레임 그래프에 표시됩니다.

패싯으로 정의되지 않은 속성을 필터링할 수도 있습니다. 예를 들어 `cart.value` 속성을 필터링하려면 다음 두 가지 옵션이 있습니다.

- 트레이스 세부정보 패널에서 `cart.value` 속성을 클릭하고 검색 쿼리에 추가합니다.
{{< img src="tracing/live_search/add-attribute-to-query.mp4" alt="쿼리에 속성 추가" video="true" >}}

- 검색어 표시줄에 "cart.value"를 입력하여 `cart.value` 속성이 있는 모든 스팬을 필터링합니다.
{{< img src="tracing/live_search/filter-by-attribute2.mp4" alt="속성별 Live Search 필터" video="true" >}}

## 15일 동안 보관되는 인덱싱된 스팬 검색

{{< img src="tracing/apm_lifecycle/trace_explorer_indexed_search.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Indexed Search" >}}

Live Search와 동일한 방법으로 보존된 트레이스를 검색할 수 있습니다. 실시간 데이터 검색에서 보존된 데이터 검색으로 전환하려면 시간 선택기를 15분 이상의 시간으로 변경하세요. 보존 필터로 인덱싱된 모든 스팬은 검색에서 액세스할 수 있습니다. 이러한 스팬은 보존 필터에 의해 인덱싱된 후 15일 동안 Datadog에 의해 보관됩니다.

{{< img src="tracing/live_search/searching-retained-traces.mp4" alt="보존된 트레이스 검색" video="true" >}}

{{< tabs >}}
{{% tab "목록 보기" %}}

커스텀 보존 필터 *및* 지능형 보존 필터로 인덱싱된 모든 스팬은 List 보기에서 검색할 수 있습니다. 그러나 보존 필터로인덱싱되지 않은 스팬에만 나타나는 태그 기준으로 필터링하면 [Live Search](#live-search-for-15-mins)를 사용할 때와 달리 검색 결과가 반환되지 않습니다.

{{% /tab %}}
{{% tab "Timeseries View" %}}

트레이스 분석을 사용하면 커스텀 보존 필터 또는 지능형 보존 필터로 인덱싱된 모든 스팬을 검색할 수 있습니다.

시계열 보기에서 쿼리를 [대시보드][1], [모니터][2] 또는 [노트북][3]으로 내보내 추가로 조사하거나 집계된 스팬의 수가 특정 임계값을 초과할 때 자동으로 알림을 받을 수 있습니다.

**참고**: 지능형 보존 필터로 인덱싱된 스팬은 대시보드, 노트북에 표시되는 APM 쿼리 및 트레이스 분석 모니터 평가에서 제외됩니다. 자세한 내용은 [트레이스 보존][4]을 참조하세요.

[1]: /ko/dashboards/widgets/timeseries/
[2]: /ko/monitors/types/apm/?tab=analytics
[3]: /ko/notebooks
[4]: /ko/tracing/trace_pipeline/trace_retention/#trace-search-and-analytics-on-indexed-spans

{{% /tab %}}
{{< /tabs >}}

### 보존 설정

보존되는 스팬과 보존 비율을 사용자 정의할 수 있습니다. 기본적으로 [Datadog 지능형 보존 필터][4]가 적용되어 오류 및 대기 시간 다양성은 물론 처리량이 낮은 리소스가 포함된 트레이스를 자동으로 유지합니다. 기본 지능형 보존 필터와 자신만의 추가 필터를 만드는 방법에 대해 자세히 알아보려면 [보존 필터 설명서][3]를 참조하세요. Datadog 앱 내의 [Retention Filters 페이지][12]로 이동하여 자신만의 필터를 생성하거나 수정하세요.

## 참고 자료

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