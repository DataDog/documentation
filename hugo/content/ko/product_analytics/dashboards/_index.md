---
description: 데이터를 시각화하여 인사이트 확보
further_reading:
- link: /product_analytics/
  tag: 설명서
  text: Product Analytics
- link: https://learn.datadoghq.com/courses/getting-started-product-analytics
  tag: 학습 센터
  text: Product Analytics 시작하기
title: Dashboards
---
## 개요 {#overview}

대시보드 시작 단계에서의 핵심은 정기적으로 스스로에게 어떤 질문을 던지는지 파악하는 것입니다. 고객이 일반적으로 겪는 문제는 무엇인가요? 문제 발생 시 해결책을 찾는 데 도움이 되는 질문은 무엇인가요?

좋은 대시보드를 만드는 것은 해당 질문에 대한 답을 명확히 제시하는 것입니다. 또한 이러한 모든 생각을 동일한 대시보드에 담지 않는 것이 중요합니다. 각각 다른 문제를 정확히 파악하기 위해 별도의 대시보드를 만들면 답을 빠르게 찾는 데 도움이 될 수 있습니다.

이 가이드는 대시보드 생성을 시작하는 방법을 안내합니다. 이러한 기본 대시보드는 팀 논의를 활성화하고 문제 해결 속도를 높이는 효과를 제공합니다.

## 대시보드 생성 {#create-a-dashboard}

대시보드를 생성하려면 [{{< ui >}}Dashboard List{{< /ui >}}][1] 페이지에서 {{< ui >}}\+ New Dashboard{{< /ui >}}를 클릭하십시오.

{{< img src="product_analytics/dashboard/pana_dashboard_overview.png" alt="새 대시보드 추가" style="width:70%;">}}


대시보드 이름을 입력하고 레이아웃 옵션을 선택하십시오.

{{< img src="dashboards/create-dashboard.png" alt="새 대시보드 추가" style="width:70%;">}}

{{< ui >}}Dashboards{{< /ui >}}
: 그리드 기반 레이아웃이며, 이미지, 그래프 및 로그 등 다양한 개체를 포함할 수 있습니다. 일반적으로 상태 보드 또는 스토리텔링 뷰로 사용되며 실시간으로 업데이트되고, 과거의 고정된 시점을 나타낼 수 있습니다. 최대 너비는 그리드 정사각형 12개이며, 디버그용으로도 효과적입니다.

{{< ui >}}Timeboards{{< /ui >}}
: 대시보드 전체에서 한 개의 시점(고정 또는 실시간)을 나타내는 자동 레이아웃입니다. 일반적으로 문제 해결, 상호 연계 및 일반 데이터 탐색에 사용됩니다.

{{< ui >}}Screenboards{{< /ui >}}
: 프리폼 레이아웃을 포함한 대시보드이며 이미지, 그래프, 로그 등의 다양한 개체를 포함할 수 있습니다. 일반적으로 실시간으로 업데이트되는 상태 보드 또는 스토리텔링 보기로 사용되거나, 과거의 고정된 시점을 나타냅니다.

## 새로고침 빈도 {#refresh-rate}

프라이빗 대시보드의 새로고침 빈도는 조회 중인 시간 프레임에 좌우됩니다. 시간 프레임이 짧을수록 데이터가 자주 새로 고쳐집니다. 공개적으로 공유되는 대시보드는 선택한 시간 프레임과 관계없이 30초에 한 번씩 새로 고쳐집니다.

| 시간 프레임   | 새로고침 빈도 |
|--------------|--------------|
| 1분     | 10초   |
| 2분    | 10초   |
| 5분    | 10초   |
| 10분   | 10초   |
| 30분   | 20초   |
| 1시간       | 20초   |
| 3시간      | 1분     |
| 4시간      | 1분     |
| 1일        | 3분     |
| 2일       | 10분    |
| 1주       | 1시간       |
| 1개월      | 1시간       |
| 3개월     | 1시간       |
| 6개월     | 1시간       |
| 1년       | 1시간       |



## 추가 자료 {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/dashboard/list