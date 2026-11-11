---
description: Volume Management 페이지를 사용하여 Custom Metrics 사용량과 비용을 파악하고 관리할 수 있습니다.
further_reading:
- link: /metrics/summary/
  tag: 설명서
  text: Metrics Summary
- link: /metrics/metrics-without-limits/
  tag: 설명서
  text: Metrics without Limits™
- link: /metrics/custom_metrics/
  tag: 설명서
  text: Custom Metrics
title: 볼륨
---
## 개요 {#overview}

{{< img src="metrics/volume/metrics_volume_overview_2025-01-27.png" alt="기본적으로 지난 1시간으로 시간 범위가 설정되어 있으며 검색, 필터, 패싯 및 열 정렬 기능이 표시된 Metrics Volume 페이지" style="width:100%;" >}}

클라우드 기반 애플리케이션은 방대한 양의 데이터를 생성하며, 조직이 확장됨에 따라 이는 부담이 될 수 있습니다. 관측 가능성 비용은 중요한 예산 항목이 되지만, 핵심 관측 가능성 팀은 각 엔지니어링 팀에 무엇이 진정으로 가치 있는지 파악하는 데 부족함이 있습니다. 개별 팀은 각자 제출하는 메트릭 및 태그 비용에 대한 인사이트가 제한적이기 때문에 이러한 증가를 관리하는 데 적극적으로 참여할 동기가 부족합니다.

<div class="alert alert-info"><a href="https://docs.datadoghq.com/account_management/billing/metric_name_pricing/">Metric Name 요금제 모델</a>을 사용하는 고객은 메트릭 사용량을 최적화하는 방법에 관한 <a href="https://docs.datadoghq.com/metrics/guide/metric_name_pricing_experience/">가이드</a>를 참조하세요.</div>

Datadog의 [Metrics Volume Management 페이지][1]는 비용 최적화 노력을 집중해야 할 메트릭에 대한 포괄적인 가시성과 지능적인 인사이트를 제공합니다. [Metrics without Limits™][3]와 함께 사용하면 Metrics Volume을 통해 메트릭 수집 및 인덱싱을 유연하게 구성하여 정확도를 희생하지 않고도 비용을 절감할 수 있습니다. 

Metrics Volume Management 페이지를 통해 다음 항목에 실시간으로 액세스할 수 있습니다. 
- 전체 계정의 실시간 예상 Indexed Custom Metrics 사용량은 얼마인가요?
- 전체 계정의 실시간 예상 Ingested Custom Metrics 사용량은 얼마인가요?
- Ingested Custom Metrics 볼륨을 기준으로 Metrics without Limits가 구성된 상위 500개 메트릭 이름은 무엇인가요?
- Indexed Custom Metrics 볼륨을 기준으로 상위 500개 메트릭 이름은 무엇인가요?
- 카디널리티가 급증하는 상위 500개 메트릭 이름은 무엇인가요?
- 이 상위 500개 메트릭 이름을 소유하고 최적화를 담당하는 팀은 어디인가요?
- 어떤 메트릭이 조직에 실제로 가치가 있거나 없나요?

## 조직의 Custom Metrics 사용량에 대한 실시간 가시성 및 모니터링 {#real-time-visibility-and-monitoring-on-your-organizations-custom-metrics-usage}
Datadog은 실시간 _예상_ 사용량 메트릭을 기본으로 제공하므로 사용량을 실시간으로 파악하고 사용량에 대해 경고하도록 설정할 수 있습니다. 다음 항목의 분석 내용을 확인할 수 있습니다. 
- 계정의 실시간 Indexed Custom Metrics 볼륨(및 해당 볼륨 중 [Metrics without Limits™][3]를 사용하여 아직 최적화되지 않은 양) 
- 계정의 실시간 Ingested Custom Metrics([Metrics without Limits™][3]를 사용하여 구성된 메트릭에서 생성됨)

{{< img src="metrics/volume/volume_graph.png" alt="실시간 Indexed Custom Metrics 및 Ingested Custom Metrics의 예상 볼륨. 내보내기를 클릭하면 모니터를 쉽게 생성하거나 그래프를 노트북으로 내보내 공유할 수 있습니다." style="width:100%;" >}}

## 검색, 필터링 및 정렬 {#search-filter-and-sort}

검색, 필터링 및 정렬 기능을 사용하여 다음 항목을 파악할 수 있습니다.
- 어떤 팀이 어떤 메트릭 이름을 소유하고 있나요?
- 팀에서 최적화에 집중해야 할 메트릭 이름은 무엇인가요?
- 카디널리티가 가장 높은 메트릭은 무엇이며, 어떤 메트릭 이름이 급증(볼륨 증가율이 가장 높음)하고 있나요?
- 자산에서 쿼리되지 않는 상위 메트릭은 무엇인가요?

Metric 및 Tag 검색 창에서는 여러 작업을 사용하여 메트릭 목록을 필터링할 수 있습니다. 메트릭 이름을 검색하려면 키워드를 입력합니다. *Filter by Tag Value* 상자에 태그 키와 값의 쌍을 입력하여 특정 팀, 애플리케이션 또는 서비스별로 목록을 필터링할 수 있습니다.

패싯을 사용하여 다음과 같이 메트릭을 필터링할 수도 있습니다.
- {{< ui >}}Configuration{{< /ui >}}: 태그 구성이 있는 메트릭
- {{< ui >}}Percentiles{{< /ui >}}: 백분위수/고급 쿼리 기능으로 활성화된 분포 메트릭
- {{< ui >}}Historical Metrics{{< /ui >}}: 과거 메트릭 수집이 활성화된 메트릭
- {{< ui >}}Query Activity{{< /ui >}}: 지난 30일, 60일 또는 90일 동안 Datadog이나 API를 통해 활발하게 쿼리되지 않은 메트릭
- {{< ui >}}Metric Type{{< /ui >}}: 분포 메트릭과 비분포 메트릭(카운트, 게이지, 비율) 구분
- {{< ui >}}Distribution Metric Origin{{< /ui >}}: 메트릭이 생성된 제품(예: 로그 또는 APM 스팬에서 생성된 메트릭)

Volume 페이지에는 Datadog에 보고된 메트릭 목록이 예상 Custom Metrics 또는 볼륨 변화에 따라 정렬되어 표시됩니다. 두 옵션 중 하나를 기준으로 메트릭을 정렬하려면 메트릭 테이블의 열 헤더를 클릭합니다.
| 열 | 설명 |
|--------|-------------|
|{{< ui >}}Top 500 Metric Names by Estimated Real-time Cardinality{{< /ui >}} | 카디널리티(즉, Custom Metrics 볼륨) 기준 상위 500개 메트릭 이름을 식별합니다.| 
|{{< ui >}}Top 500 Metric Names by Change in Volume{{< /ui >}} |카디널리티의 분산이 가장 큰 상위 500개 메트릭 이름을 검색합니다. 이러한 메트릭은 선택한 기간 동안 비정상적으로(잠재적으로 의도치 않게) 급증했을 수 있습니다. 계정의 예상 실시간 Custom Metrics 사용량에 대한 경보를 받으면 이 보기를 사용하여 메트릭 급증을 조사할 수 있습니다. |

## 시간 경과에 따른 메트릭의 카디널리티(볼륨) 비교 {#compare-a-metrics-cardinality-volume-over-time}

{{< img src="metrics/volume/compare_metric_cardinality_2025-01-27.png" alt="'shopist'가 포함된 메트릭 이름으로 필터링한 후 예상 Custom Metrics별로 정렬한 메트릭 볼륨" style="width:100%;" >}}

볼륨 변화 기준 상위 500개 메트릭 이름을 확인할 때 숫자 위로 마우스를 가져가면 해당 메트릭 이름의 Indexed Custom Metrics 수(카디널리티)를 시간 경과에 따라 비교할 수 있습니다. 참고로 단일 메트릭 이름에서 Indexed Custom Metrics가 여러 개 생성될 수 있습니다. 자세한 내용은 [Custom Metrics 청구][6]를 참조하세요.

급증하는 메트릭의 시간 경과에 따른 카디널리티를 비교하려면 다음 단계를 따르세요.
1. 오른쪽 상단에서 기간을 선택합니다(권장 기간은 {{< ui >}}Past 1 Day{{< /ui >}} 또는 {{< ui >}}Past 4 Weeks{{< /ui >}}).
2. 시간 경과에 따른 카디널리티를 보려는 메트릭 이름을 선택하고 같은 행에서 {{< ui >}}Change in Volume{{< /ui >}} 열 아래의 값을 클릭합니다. 그러면 모달이 열려 시간 경과에 따른 메트릭의 카디널리티를 비교하고 급증률을 보여 주는 그래프를 표시합니다.
3. (선택 사항) 급증하는 메트릭에 대해 경고하도록 `% change`에 대한 변경 모니터를 생성하세요. 자세한 내용은 [변경 경보 모니터][2] 설명서를 참조하세요.

## 가치가 낮고 쿼리되지 않는 메트릭 식별 {#identify-less-valuable-unqueried-metrics}

{{< img src="metrics/volume/id_unqueried_metrics_2025-01-23.png" alt="'Not queried in 90 days' 패싯이 선택된 쿼리 활동에 대한 패싯 필드" style="width:100%;" >}}

Custom Metrics 비용을 줄이려면 활발하게 쿼리되지 않는 볼륨이 가장 큰 메트릭 이름부터 확인하세요. Datadog의 지능형 쿼리 인사이트는 쿼리를 분석하고 지난 30일, 60일 또는 90일 동안 쿼리되지 않은 메트릭을 표시합니다. 이 분석은 백그라운드에서 지속적으로 실행되어 쿼리되지 않은 메트릭이 항상 최신 상태로 유지되도록 합니다.

활발하게 쿼리되지 않는 메트릭을 찾으려면 {{< ui >}}Query Activity Facet{{< /ui >}} 상자에서 관심 있는 기간을 클릭하세요. 목록에는 Dashboards, 노트북, 모니터, SLO, Metrics Explorer 및 API에서 사용되지 않는 메트릭 이름만 표시됩니다.

## 메트릭 볼륨 및 비용을 절감하는 방법 {#how-to-reduce-metric-volume-and-cost}

쿼리되지 않은 메트릭을 식별한 후 [Metrics without Limits™][3]를 사용하면 코드 한 줄 없이도 이러한 메트릭 이름으로 인한 볼륨과 비용을 없앨 수 있습니다. Metrics without Limits를 사용하면 사용되지 않거나 거의 사용되지 않는 시계열을 제거하여 사용하는 메트릭에 대해서만 비용을 지불하도록 할 수 있습니다. Metrics without Limits™를 쿼리되지 않은 메트릭 이름에 사용하여 Custom Metrics 볼륨을 줄일 수 있습니다. 

쿼리되지 않은 여러 메트릭을 한 번에 구성하려면 다음 단계에 따라 [태그 인덱싱 규칙][7]을 생성하세요.
1. {{< ui >}}Metrics → Settings{{< /ui >}}로 이동하여 {{< ui >}}\+ Create Rule{{< /ui >}}을 클릭하고 {{< ui >}}Configure Tag Indexing Rule{{< /ui >}}을 선택합니다.
2. 규칙의 범위를 쿼리되지 않은 메트릭의 메트릭 네임스페이스 접두사로 지정합니다.
3. 포함하거나 제외할 태그를 선택합니다. 사용하지 않는 태그의 인덱싱을 해제하려면 {{< ui >}}Exclude tags{{< /ui >}}를 선택하고 태그 사용량을 기준으로(지난 30일, 60일, 90일 동안 쿼리되지 않았고 어떤 자산에서도 사용되지 않은 태그) 태그 인덱싱을 해제하도록 선택합니다.

애플리케이션을 변경하거나 원격 쓰기 설정을 할 필요 없이 메트릭의 카디널리티를 완전히 제어할 수 있습니다. 아래는 거의 사용되지 않는 시계열을 제거하여 Custom Metrics 볼륨과 비용을 크게 줄일 수 있는 예시입니다.

이 예시에서 단일 메트릭에 대한 태그 구성 모달(메트릭 세부 정보 사이드 패널의 {{< ui >}}Manage Tags{{< /ui >}})에는 현재 볼륨이 Indexed Custom Metrics 7,139개인 메트릭이 표시됩니다. 지난 30일 동안 쿼리된 태그의 허용 목록을 사용하여 Include tags…를 선택하면 모달에 예상되는 새 볼륨이 3으로 표시됩니다. Indexed Custom Metrics 수를 7,136개 줄일 수 있습니다.

{{< img src="metrics/volume/reduce_metric_vol_cost_tags_05292025.png" alt="제안된 태그의 허용 목록을 적용했을 때 현재 인덱싱된 메트릭 7,139개와 예상되는 새 메트릭 3개를 보여주는 태그 구성 모달" style="width:80%;" >}}

## Datadog에서 메트릭의 유용성 및 상대적 가치 분석 {#analyze-metrics-utility-and-relative-value-in-datadog}
Metrics without Limits™를 사용하면 Metrics Related Assets 기능을 통해 Datadog에서 활용도가 낮은 메트릭을 찾을 수 있습니다. 메트릭 관련 자산은 특정 메트릭을 쿼리하는 대시보드, 노트북, 모니터 또는 SLO를 의미합니다. Datadog의 지능형 쿼리 인사이트는 이러한 관련 자산의 인기와 수량을 보여주어 조직 내에서 메트릭의 유용성을 평가할 수 있도록 합니다. {{< ui >}}Tags{{< /ui >}} 열은 각 자산을 구동하는 태그를 정확하게 보여주며, 메트릭을 구성할 때 데이터 기반 의사결정을 내리는 동시에 중요한 가시성을 유지하도록 돕습니다.

{{< img src="metrics/related_assets_08_05_2025.png" alt="Related Assets 섹션이 표시된 메트릭 세부 정보 사이드 패널 예시 메트릭을 3개의 대시보드에 적용한 상태" style="width:100%;" >}}

메트릭의 관련 자산을 조회하는 방법
1. 메트릭 항목을 클릭하여 세부 정보 사이드 패널을 엽니다.
2. 사이드 패널에서 {{< ui >}}Related Assets{{< /ui >}}라는 제목의 섹션으로 스크롤합니다.
3. 드롭다운 버튼을 클릭하여 확인하려는 관련 자산 유형(대시보드, 모니터, 노트북, SLO)을 조회합니다. 검색창을 사용하여 특정 자산을 확인할 수 있습니다.

## 메트릭의 볼륨을 높이는 태그 식별 {#identify-tags-driving-up-your-metrics-volume}

{{< img src="metrics/tagsexplorer.png" alt="급증하는 메트릭 이름을 보여주는 Custom Metrics Tags Cardinality Explorer" style="width:80%;">}}

특정 메트릭 이름이 왜 많은 수의 Custom Metrics를 생성하거나 급증하는지 확인하려면 Custom Metrics Tags Cardinality Explorer를 사용하세요. 이를 통해 급증의 원인이 되는 태그 키를 정확히 찾아낼 수 있으며, Metrics without Limits™를 사용하여 즉시 제외함으로써 비용을 절감할 수 있습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/volume
[2]: /ko/monitors/types/change-alert/
[3]: /ko/metrics/metrics-without-limits
[5]: #reduce-metric-volume-and-cost
[6]: https://docs.datadoghq.com/ko/account_management/billing/custom_metrics/?tab=countrategauge
[7]: /ko/metrics/guide/tag-indexing-rules/