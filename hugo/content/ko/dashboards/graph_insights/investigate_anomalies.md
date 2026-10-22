---
description: 대시보드의 그래프 전반에서 이상을 자동으로 탐지해 그룹화하고 이상에 기여하는 태그를 식별하며 근본 원인 분석을 Bits Investigation에
  위임하세요.
further_reading:
- link: /dashboards/graph_insights/watchdog_explains/
  tag: 문서
  text: Watchdog Explains를 사용하여 단일 이상 분석하기
- link: /bits_ai/bits_investigation/
  tag: 문서
  text: Bits Investigation이 근본 원인을 분석하는 방법 알아보기
site_support_id: dashboard_anomaly_detection
title: 대시보드 이상 조사
---
## 개요 {#overview}

Datadog은 대시보드의 시계열 그래프 전반에서 이상을 탐지하고 동시에 발생하는 이상을 문제로 그룹화하며 각 문제에 가장 크게 기여하는 태그를 식별합니다. 이상이 발생하면 [Watchdog Explains][2]를 사용하여 단일 그래프에서 원인의 범위를 좁히거나 [Bits Investigation][1]에 근본 원인 분석을 위임할 수 있습니다.

<div class="alert alert-info">이상 탐지는 <a href="/dashboards/widgets/timeseries/">시계열 위젯</a>에 {{< ui >}}Metrics{{< /ui >}} 데이터(<code>avg</code>, <code>sum</code>, <code>min</code>, 및 <code>max</code> 집계)가 있을 때 해당 위젯에 사용할 수 있습니다. 함수 <code>cumsum</code>, <code>anomalies</code>, 또는 <code>outliers</code> 함수를 사용하는 위젯은 적절한 대상이 아닙니다.</div>

대시보드를 열면 탐지가 실행되며 약 20초 이내에 문제가 나타납니다. Datadog이 이상을 탐지하지 못하면 {{< ui >}}Investigate{{< /ui >}} 메뉴와 이 페이지에서 설명하는 컨트롤이 나타나지 않습니다.

Datadog은 다음 항목에 대해서는 이상을 탐지하지 않습니다.

- 공개(공유) 대시보드. 결과에 대해 조치를 취할 수 있는 로그인 사용자가 없기 때문입니다.
- 모바일 앱에 포함된 대시보드
- TV 모드의 대시보드
- 인쇄 모드의 대시보드
- {{< ui >}}Auto-detect issues{{< /ui >}}를 끈 대시보드

## Datadog이 이상을 탐지하는 방법 {#how-datadog-detects-anomalies}

Datadog은 기본 시계열의 형태와 값을 둘 다 분석하여 대시보드의 그래프에 이상 탐지를 적용합니다. 예상되는 동작과 일치하지 않는 급증, 급락 또는 점진적인 변화에 플래그를 지정하여 과거 패턴과의 편차를 식별합니다.

계절성을 고려하기 위해 알고리즘은 최대 3주 전까지의 데이터를 살펴봅니다. 예를 들어, 월요일 오전 9시에 급증이 발생하면 Datadog은 해당 데이터 포인트를 이전 월요일의 같은 시간과 비교합니다. 유사한 패턴이 지속적으로 나타나면 해당 급증은 **계절적**인 것으로 간주되어 이상으로 플래그가 지정되지 않습니다. 이는 오탐을 줄이는 데 도움이 되어 Datadog은 예상치 못한 편차만 표시합니다.

이상은 급격한 급증이나 급락일 수 있지만, 단계 변화나 기울기 변화와 같은 더 미묘한 추세일 수도 있습니다.

## 대시보드에서 탐지된 이상 찾기 {#find-detected-issues-on-a-dashboard}

대시보드 상단에서 {{< ui >}}Investigate{{< /ui >}}를 클릭하면 Datadog이 탐지한 문제를 확인할 수 있습니다. 각 문제는 편차가 발생한 메트릭과 문제가 탐지된 시점을 표시합니다. 문제를 확장하면 영향력 있는 태그와 {{< ui >}}Widget affected{{< /ui >}}도 표시됩니다.

문제를 선택하면 대시보드가 영향을 받는 그래프로 스크롤됩니다.

여러 위젯에서 동시에 발생하는 이상은 `Anomalies co-occur on 18 widgets`와 같이 하나의 문제로 그룹화됩니다.

{{< img src="dashboards/graph_insights/investigate_anomalies/investigate_menu.png" alt="대시보드에서 Investigate 메뉴가 열려 있으며 여기에 문제 자동 탐지 토글과 함께 탐지된 이슈 4개가 나열되어 있습니다." style="width:100%;" >}}

## 이상 검토 {#review-an-anomaly}

탐지된 이상은 그래프에 분홍색으로 강조 표시됩니다.

1. 강조 표시된 영역 위로 마우스를 가져갑니다. 이상과 예상 범위에서 이상이 얼마나 벗어났는지 요약하는 칩이 나타납니다(예: `The spike is 70% higher than the expected range as inferred from the past 3 weeks of data.`).
1. 칩을 클릭하여 확장합니다. 확장된 칩에는 항상 다음 항목이 포함되어 있습니다.
   - **영향력 있는 태그**: 이상에 가장 크게 기여하는 태그입니다.
   - **다음 단계**: 영향을 받는 서비스 조회 또는 모니터 생성 등 제안되는 후속 작업입니다.

   일부 이상에는 **Co-occurs with** 섹션도 포함되어 있는데, 여기에는 동일한 기간에 편차가 발생한 다른 메트릭이 나열됩니다.

{{< img src="dashboards/graph_insights/investigate_anomalies/anomaly_chip.png" alt="영향력 있는 태그, 다음 단계 및 Investigate With AI 버튼을 보여주는 확장된 이상 칩입니다." style="width:100%;" >}}

## Watchdog Explains로 단일 그래프 분석{#analyze-a-single-graph-with-watchdog-explains}

이상이 발생한 범위를 특정 태그로 좁히려면 그래프를 전체 화면으로 열고 {{< ui >}}Findings{{< /ui >}}를 클릭하세요. 이 패널은 Watchdog Explains로 구동됩니다.

각 발견 결과는 이상을 설명할 수 있는 태그를 지정합니다. 또한 해당 태그를 필터링하기 전과 후의 그래프를 보여주므로, 태그를 제거했을 때 급증 현상이 평탄화되는지 확인할 수 있습니다.

자세한 내용은 [Watchdog Explains][2]를 참조하세요.

## Bits Investigation으로 근본 원인 조사 {#investigate-root-cause-with-bits-investigation}

확장된 이상 칩, {{< ui >}}Investigate{{< /ui >}} 메뉴 또는 Watchdog Explains 발견 결과에서 {{< ui >}}Investigate With AI{{< /ui >}}를 클릭합니다. [Bits Investigation][1]이 새 탭에서 열리고, 여기서 이상을 분석하고 근본 원인, 영향 평가 및 타임라인을 보고합니다.

관련 조사가 이미 존재하는 경우 이 버튼은 {{< ui >}}See _N_ Related Investigations{{< /ui >}}로 표시되며, 여기서 _N_은 개수입니다. 버튼을 클릭하면 필터링된 조사 목록이 열립니다. 단일 조사를 열려면 {{< ui >}}Review Completed Investigation{{< /ui >}}을 클릭하세요.

<div class="alert alert-info">관련 조사 개수의 범위는 보고 있는 이상이 아니라 전체 대시보드 및 시간 범위로 지정됩니다. 개수가 1개이면 동일한 대시보드의 다른 그래프에서 조사가 시작되었음을 의미할 수 있습니다.</div>

이런 방식으로 시작된 조사는 {{< ui >}}Dashboard Anomaly{{< /ui >}}를 조사의 소스로 기록하고 `dashboard_id` 태그를 포함합니다. 이러한 소스나 태그를 사용하여 나중에 Bits Investigation 목록에서 조사를 찾을 수 있습니다.

## 이상 탐지 끄기 {#turn-off-anomaly-detection}

대시보드에서 이상 검색을 중지하려면 {{< ui >}}Investigate{{< /ui >}}를 클릭하고 {{< ui >}}Auto-detect issues{{< /ui >}}를 끕니다.

이 기본 설정은 대시보드 하나에 적용되며 사용 중인 브라우저에 저장됩니다. 같은 대시보드를 보는 다른 사용자의 경우 탐지 기능을 직접 끄지 않는 한 이상이 계속해서 표시됩니다. 또한 이 기본 설정은 다른 브라우저나 장치로 이전되지 않습니다.

이상 탐지에서 단일 위젯을 제외하려면 위젯을 편집하고 {{< ui >}}Anomaly Detection{{< /ui >}}을 확장한 다음 {{< ui >}}Hide{{< /ui >}}를 선택하세요. 이 설정은 위젯 정의의 일부이기 때문에 대시보드를 보는 모든 사용자에게 동일하게 적용됩니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/bits_ai/bits_investigation/
[2]: /ko/dashboards/graph_insights/watchdog_explains/