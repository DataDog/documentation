---
aliases:
- /ko/product_analytics/analytics_explorer/
- /ko/product_analytics/journeys
description: ''
further_reading:
- link: /real_user_monitoring/explorer/search/
  tag: 설명서
  text: Datadog에서 뷰 탐색하기
- link: /dashboards/functions/
  tag: 설명서
  text: 쿼리에 함수 추가하기
- link: https://www.datadoghq.com/blog/product-analytics-faster-decisions
  tag: 블로그
  text: Datadog Product Analytics로 더 빠르고 나은 제품 결정 내리기
- link: https://www.datadoghq.com/blog/datadog-geomaps/
  tag: 블로그
  text: 지오맵을 사용하여 위치별로 앱 데이터 시각화하기
- link: https://www.datadoghq.com/blog/reduce-customer-friction-funnel-analysis/
  tag: 블로그
  text: 퍼널 분석을 사용하여 주요 사용자 흐름을 파악하고 최적화하기
title: 분석
---
## 개요 {#overview}

[Analytics Explorer][1] 페이지에는 제품이 어떻게 사용되는지 파악할 수 있는 뷰 데이터를 집계해서 보여줍니다. 다음 항목을 제어할 수 있습니다.

* 뷰를 확인할 기준이 되는 이벤트 유형(세션, 뷰 또는 액션)
* 분석할 뷰 세트를 필터링하는 쿼리
* 데이터를 분할할 기준
* 집계 및 분할 결과의 시각화 방법

Analytics 시각화를 사용하면 다음을 수행할 수 있습니다.

* 해당 시각화를 기반으로 대시보드에 위젯을 생성합니다.
* 시각화가 지원하는 상호 작용에 따라 이벤트 목록의 하위 집합을 더 자세히 살펴볼 수 있습니다.

## 분석 차트 사용 {#using-the-analytics-chart}
{{< whatsnext desc="다음 링크에서 분석 검색 구문 사용 방법, 이벤트 조회 방법, 뷰를 시각화, 그룹화 및 내보내기하는 방법을 알아보세요. " >}}
    {{< nextlink href="product_analytics/charts/analytics_explorer/search_syntax" >}}검색 구문{{< /nextlink >}}
    {{< nextlink href="product_analytics/charts/analytics_explorer/events" >}} 이벤트 {{< /nextlink >}}
    {{< nextlink href="product_analytics/charts/analytics_explorer/visualize" >}}시각화{{< /nextlink >}}
    {{< nextlink href="product_analytics/charts/analytics_explorer/group" >}}그룹{{< /nextlink >}}
    {{< nextlink href="product_analytics/charts/analytics_explorer/export" >}}내보내기{{< /nextlink >}}
{{< /whatsnext >}}

## 쿼리 빌드 {#build-a-query}

[Analytics][1]에서 검색 쿼리에 패싯과 측정값을 추가하여 디스플레이를 사용자 지정하세요. 

1. [뷰 이벤트 유형][2]을 선택합니다.

   {{< img src="product_analytics/analytics/view_type_selection1.png" alt="뷰 유형 선택으로 범위가 지정된 Product Analytics의 드롭다운 메뉴" style="width:70%;">}}

1. 고유 개수를 그래프로 표시할 측정값을 선택합니다.

   {{< img src="product_analytics/analytics/measure_selection1.png" alt="고유 개수를 그래프로 표시할 측정값을 선택하기 위한 Product Analytics의 드롭다운 메뉴" style="width:70%;">}}

1. 이벤트 속성 또는 [타사 통합][6]의 속성으로 필터링합니다.

   {{< img src="product_analytics/analytics/pana_analytics_filter_by.png" alt="이벤트 자체 속성 또는 타사 통합에서 가져온 속성으로 이벤트를 필터링하기 위한 Product Analytics의 드롭다운 메뉴" style="width:70%;">}}

1. 결과를 추가로 세분화할 이벤트 속성을 선택합니다.

   {{< img src="product_analytics/analytics/pana_analytics_breakdown_by1.png" alt="이벤트 자체 속성 또는 타사 통합에서 가져온 속성으로 이벤트를 추가로 세분화하기 위한 Product Analytics의 드롭다운 메뉴" style="width:70%;">}}

1. [함수][4]를 적용하여 시각화를 위해 쿼리 결과가 반환되는 방식을 수정합니다.

   {{< img src="product_analytics/analytics/pana_analytics_functions.png" alt="시각화에 대해 메트릭 쿼리 결과가 반환되는 방식을 수정하는 함수를 추가하기 위한 Product Analytics의 버튼" style="width:70%;">}}

1. 그래프의 [그래프 유형][5] 및 시간 간격을 선택합니다. 전역 타임프레임을 변경하면 사용 가능한 타임스텝 값 목록이 변경됩니다.

   {{< img src="product_analytics/analytics/pana_analytics_time_interval2.png" alt="그래프에 대한 그래프 유형 및 시간 간격을 선택" style="width:50%;">}}



## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/explorer
[2]: /ko/real_user_monitoring/guide/understanding-the-rum-event-hierarchy/
[3]: /ko/product_analytics/charts/analytics_explorer/group
[4]: /ko/dashboards/functions/#overview
[5]: /ko/product_analytics/charts/analytics_explorer/visualize/
[6]: https://app.datadoghq.com/product-analytics/integrations/custom-attributes