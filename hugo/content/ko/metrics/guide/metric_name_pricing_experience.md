---
algolia:
  tags:
  - metric name pricing
  - custom metrics
  - estimated usage metrics
description: Manage Tags 모달, Metric 사이드 패널, Volume Management 페이지, Plan & Usage 페이지
  및 예상 사용량 메트릭의 변경 사항을 포함하여, Datadog의 Custom Metrics 환경이 Metric Name Pricing에 맞춰 어떻게
  변경되었는지 알아보세요.
further_reading:
- link: /account_management/billing/metric_name_pricing/
  tag: 설명서
  text: Custom Metrics를 위한 Metric Name 요금제
- link: /metrics/metrics-without-limits/
  tag: 설명서
  text: Metrics without Limits™
- link: /account_management/billing/usage_metrics/
  tag: 설명서
  text: 예상 사용량 메트릭
- link: /metrics/volume/
  tag: 설명서
  text: Metrics Volume Management
title: Metric Name 요금제를 위한 Metrics Experience 변경 사항
---
## 개요 {#overview}

Custom Metrics에 대한 [Metric Name 요금제 청구 모델][1]에 따라 Datadog은 사용량 측정 방식을 반영하도록 Metrics 경험을 업데이트했습니다. 이 가이드는 Metric Name 요금제를 사용하는 조직을 위한 Datadog UI 및 API의 변경 사항을 설명합니다.

**참고**: 이 페이지는 조직이 [Metric Name 요금제][1]를 사용하는 경우에만 적용됩니다. 계약이 시계열(카디널리티) 요금제를 사용하는 경우, Metrics 경험은 변경되지 않습니다.

## 변경 사항 요약 {#summary-of-changes}

| 기능 | 설명 |
|---------|-------------|
| [Manage Tags 모달](#manage-tags-modal) | 카디널리티 볼륨 대신 포인트 볼륨에 대한 태그 변경의 영향을 추정합니다. |
| [Metric 사이드 패널](#metric-side-panel) | 시계열 볼륨 대신 수집되고 인덱싱된 포인트 볼륨을 표시합니다. |
| [Volume Management 페이지](#volume-management-page) | Volume Overview 그래프에는 Metric Name 요금제에 맞춘 새로운 청구 기준이 표시됩니다. |
| [Plan & Usage 페이지](#plan--usage-page) | Metric Name 요금제의 상세한 청구 내역이 표시됩니다. |
| [예상 사용량 메트릭](#estimated-usage-metrics) | 새로운 포인트 볼륨 메트릭이 카디널리티 기반의 예상 사용량 메트릭을 대체합니다. |

## Manage Tags 모달 {#manage-tags-modal}

Custom Metrics에서 태그를 구성할 때, **Manage Tags** 모달은 카디널리티 볼륨 대신 **포인트 볼륨**에 대한 태그 변경의 영향을 추정합니다.

{{< img src="metrics/guide/metric_name_pricing_experience/manage-tags-modal.png" alt="사용량 예측 차트를 보여주는 Manage Tags 모달. 월초부터 현재까지의 사용량, 현재 구성의 사용량, 제안된 구성의 사용량이 3개의 선으로 구분되어 있습니다. Include tags 탭에 datacenter 및 service 태그가 구성되어 있습니다." style="width:100%;" >}}

태그 구성에 대한 자세한 내용은 [Metrics without Limits™][2]을 참조하세요.

## Metric 사이드 패널 {#metric-side-panel}

Metric 사이드 패널은 시계열 볼륨 대신 **수집 및 인덱싱된 포인트 볼륨**을 표시합니다.

Metric 사이드 패널을 열려면 [Metrics Summary 페이지][3]에서 메트릭 이름을 클릭하세요.

{{< img src="metrics/guide/metric_name_pricing_experience/metric-side-panel.png" alt="Metric 사이드 패널 상단에 INGESTED POINTS와 INDEXED POINTS가 있고, 그 옆에 Hosts 및 Tag Values가 나란히 표시되어 있습니다." style="width:100%;" >}}

## Volume Management 페이지 {#volume-management-page}

[Metrics Volume Management 페이지][4]의 볼륨 개요 그래프는 다음과 같은 Metric Name 요금제별 청구 기준을 표시합니다.

- 예상 고유 메트릭 이름
- 청구 가능한 인덱싱된 포인트 볼륨
- 수집 포인트 대비 인덱싱된 포인트 비율

{{< img src="metrics/guide/metric_name_pricing_experience/volume-overview-graphs.png" alt="Metric Name 요금제별 3가지 볼륨 개요 그래프: 예상 고유 메트릭 이름(현재까지 100개 이상의 인덱싱된 포인트가 있는 메트릭 수), 예상 총 포인트(현재까지 10M의 메트릭당 할당량을 초과하는 총 인덱싱된 포인트), 및 예상 수집 포인트 대비 인덱싱된 포인트 비율." style="width:100%;" >}}

## Plan & Usage 페이지 {#plan-usage-page}

[Plan & Usage 페이지][5]는 새로운 모델을 사용하는 조직의 Metric Name 요금제 청구 내역을 반영합니다.

{{< img src="metrics/guide/metric_name_pricing_experience/plan-usage-page.png" alt="Plan & Usage Cost Breakdown 페이지. Summary 표와 Cumulative Cost Breakdown 차트에서 Indexed Points, Ingest Points, 및 Metric Names가 각각 별도의 제품 항목으로 표시되어 있습니다." style="width:100%;" >}}

## 예상 사용량 메트릭 {#estimated-usage-metrics}

Datadog는 Metric Name 요금제 사용량을 실시간으로 모니터링할 수 있도록 예상 사용량 메트릭을 제공합니다. 이 메트릭을 사용하여 비용 가시성을 위한 모니터와 대시보드를 설정하세요.

<div class="alert alert-warning">카디널리티 기반 예상 사용량 메트릭(및 관련 메트릭)은<code>datadog.estimated_usage.metrics.custom</code> Metric Name 요금제를 사용하는 조직에서 더 이상 사용할 수 없습니다. 카디널리티 기반 메트릭을 사용하는 모든 모니터, 대시보드 또는 기타 자산은 데이터를 수신하는 것을 중단했습니다. 아래 나열된 포인트 볼륨 메트릭을 사용하세요.</div>

### 청구 가능한 사용량 메트릭 {#billable-usage-metrics}

이 메트릭을 사용하여 월초부터 현재까지의 청구 가능한 사용량을 예상해 보세요.

| 메트릭 | 의미 |
|--------|-------------------|
| `datadog.estimated_usage.billable.metrics` | 이번 달 누적 기준으로 100개 이상의 인덱싱된 포인트를 가진 메트릭 이름의 수. |
| `datadog.estimated_usage.billable.points` | 이번 달 누적 기준으로 메트릭 이름별 기본 포함량인 1,000만 포인트를 초과한 인덱싱된 포인트의 합계. |
| `datadog.estimated_usage.metrics.points.ratio` | 총 수집된 포인트와 총 인덱싱된 포인트의 비교. |

### 포인트 볼륨 사용 메트릭 {#points-volume-usage-metrics}

더욱 세부적으로 분석하려면 다음의 실시간 및 시간별 메트릭을 사용하세요.

| 메트릭 | 의미 |
|--------|-------------------|
| `datadog.estimated_usage.metrics.points.indexed` | 60분의 롤링 윈도우 기준 예상 인덱싱된 사용자 정의 메트릭 포인트. |
| `datadog.estimated_usage.metrics.points.indexed.by_tag` | 60분의 롤링 윈도우 기준 사용량 귀속 태그에 따라 나누어진 예상 인덱싱된 사용자 정의 메트릭 포인트. |
| `datadog.estimated_usage.metrics.points.indexed.hourly` | 이번 달 누적 계산에 사용되는 시간당 인덱싱된 사용자 지정 메트릭의 예상 총 포인트 수. |
| `datadog.estimated_usage.metrics.points.ingested` | 60분 롤링 윈도우에서 추정된 수집된 사용자 정의 메트릭 포인트. |
| `datadog.estimated_usage.metrics.points.ingested.hourly` | 이번 달 누적 계산에 사용되는 시간당 수집된 사용자 지정 메트릭의 예상 총 포인트 수. |

자세한 정보는 [예상 사용량 메트릭][6]을 참조하세요.

## 메트릭 사용량 관리 {#managing-your-metric-usage}

Metric Name 요금제 하에서 사용을 최적화하려면, 다음 도구들을 사용하세요.

- **메트릭 이름**: [에이전트 측 필터링][9]을 사용하여 사용되지 않거나 원하지 않는 사용자 정의 메트릭이 Datadog에 전송되지 않도록 하여 청구 가능한 메트릭 이름의 수를 줄입니다.
- **인덱싱된 포인트 및 수집된 포인트**: [Metrics without Limits™][2]을 사용하여 메트릭별로 태그 허용 목록 또는 차단 목록을 구성하거나 [Tag Indexing Rules][10]을 사용하여 메트릭 그룹 전반에 걸쳐 조직 전체의 태그 구성을 적용하여 인덱싱된 포인트 볼륨과 메트릭당 초과 사용량을 줄입니다.

## 문제 해결 {#troubleshooting}

기술적 지원이 필요한 경우에는 [Datadog 지원팀][7]에 문의하세요.

요금 청구 관련 문의는 담당 [고객 성공][8] 관리자에게 문의하세요.

## 참고 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/account_management/billing/metric_name_pricing/
[2]: /ko/metrics/metrics-without-limits/
[3]: https://app.datadoghq.com/metric/summary
[4]: https://app.datadoghq.com/metric/volume
[5]: https://app.datadoghq.com/billing/usage
[6]: /ko/account_management/billing/usage_metrics/
[7]: /ko/help/
[8]: mailto:success@datadoghq.com
[9]: /ko/metrics/guide/agent-filtering-for-custom-metrics/
[10]: /ko/metrics/guide/tag-indexing-rules/