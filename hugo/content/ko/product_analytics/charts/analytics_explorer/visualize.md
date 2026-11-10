---
aliases:
- /ko/product_analytics/analytics_explorer/visualize
description: 시계열, 표, 트리맵과 같은 차트 유형을 선택하여 Product Analytics 쿼리 결과를 표시합니다.
title: 시각화
---
분석 쿼리를 생성한 후 차트 유형 선택기를 사용하여 결과 표시 방식을 설정합니다.

대부분의 차트 유형은 측정값이나 패싯 또는 둘 다를 시각화합니다.

측정값
: 로드 시간 등 Product Analytics 이벤트에 포함된 숫자 값을 갖는 속성입니다.

패싯
: 국가나 브라우저와 같이 고유 값을 그룹화하거나 비교하는 속성입니다.

대부분의 차트 구성 요소를 클릭하면 데이터 포인트에 해당하는 원본 이벤트나 더 좁은 시간 범위 등 상세 정보를 확인할 수 있습니다. 사용 가능한 옵션은 차트 유형에 따라 다릅니다.

<div class="alert alert-tip">집계된 차트 대신 페이지별로 구분된 이벤트 수준의 결과를 보려면 {{< ui >}}Events{{< /ui >}} 페이지를 사용하세요. 개별 결과가 중요하고 어떤 조건을 충족해야 일치하는 결과로 간주되는지 미리 알 필요가 없는 경우에는 이벤트를 사용하는 것이 적합합니다.</div>

## 시계열 {#timeseries}

선택한 기간에 따른 단일 측정값 또는 패싯의 변화를 시각화합니다.

다음과 같은 추가 표시 옵션을 선택할 수 있습니다.

- 표시 방식: 결과를 막대(개수 및 고유 개수에 권장), 선(통계 집계에 권장) 또는 영역으로 표시합니다. 여러 색상 세트를 사용할 수 있습니다.
- 롤업 간격: 막대를 구성하는 버킷의 너비를 결정합니다.

{{< img src="product_analytics/analytics/visualize/analytics-timeseries-3.png" alt="Analytics 차트 빌더에 표시된 시계열 차트" style="width:90%;" >}}

## 쿼리 값 {#query-value}

선택한 기간의 측정값 또는 패싯에 대한 단일 집계 값을 표시합니다. 쿼리 값 차트는 세부 분류를 지원하지 않습니다.

필요시 {{< ui >}}Change{{< /ui >}}를 활성화하여 이전 1시간, 1일 또는 1주 등의 비교 기간 대비 값의 증감 정도를 표시할 수 있습니다.

{{< img src="product_analytics/analytics/visualize/analytics-query-value-1.png" alt="Analytics 차트 빌더에 표시된 쿼리 값 차트" style="width:90%;" >}}

## 상위 목록 {#top-list}

선택한 측정값을 기준으로 패싯 값의 상위 또는 하위 순위를 시각화합니다.

{{< img src="product_analytics/analytics/visualize/analytics-top-list-3.png" alt="Analytics 차트 빌더에 표시된 상위 목록 차트" style="width:90%;" >}}

## 막대 차트 {#bar-chart}

세로 막대를 사용하여 패싯의 각 값에 대한 측정값을 비교합니다.

{{< img src="product_analytics/analytics/visualize/analytics-bar-chart-1.png" alt="Analytics 차트 빌더에 표시된 막대 차트" style="width:90%;" >}}

## 표 {#table}

선택한 측정값(목록에서 첫 번째로 선택한 측정값)을 기준으로 최대 4개 패싯의 상위 또는 하위 값을 시각화합니다. 추가 측정값은 표에 표시된 항목에 해당하는 값을 보여줍니다. 검색 쿼리를 업데이트하거나 특정 차원에 해당하는 이벤트를 조사하세요.

- 표에 여러 측정값이 포함된 경우 첫 번째 측정값을 기준으로 상위 또는 하위 순위가 결정됩니다.
- 상위 또는 하위 일부 항목만 표시되므로 소계가 그룹 내 값의 실제 합계와 다를 수 있습니다. 특정 차원의 값이 null이거나 비어 있는 이벤트는 하위 그룹으로 표시되지 않습니다.

<div class="alert alert-info">측정값과 세부 분류가 각각 하나인 표는 <a href="#top-list">상위 목록</a>과 표시 방식만 다를 뿐 동일합니다.</div>

{{< img src="product_analytics/analytics/visualize/analytics-table-1.png" alt="Analytics 차트 빌더에 표시된 표 차트" style="width:90%;">}}

## 변경 {#change}

선택한 기간의 측정값이 이전 1시간, 1일 또는 1주 등의 비교 기간에 비해 얼마나 증가하거나 감소했는지 보여줍니다. 필요시 패싯을 추가하여 각 값별 변화량을 확인할 수 있습니다.

{{< img src="product_analytics/analytics/visualize/analytics-change-1.png" alt="Analytics 차트 빌더에 표시된 변경 차트" style="width:90%;" >}}

## 트리맵 {#treemap}

트리맵을 사용하면 전체 대비 데이터의 비율을 시각적으로 보기 쉽게 구성하고 표시할 수 있습니다. 트리맵은 중첩된 직사각형으로 데이터를 표시합니다. 직사각형의 크기와 색상을 활용하여 서로 다른 패싯을 비교합니다.

{{< img src="product_analytics/analytics/visualize/analytics-treemap-1.png" alt="Analytics 차트 빌더에 표시된 트리맵 차트" style="width:90%;">}}

## 파이 차트 {#pie-chart}

파이 차트를 사용하면 전체 대비 데이터의 비율을 구성하고 표시할 수 있습니다. 국가, 브라우저, 보기 이름 등 서로 다른 패싯 간의 관계를 비교할 때 유용합니다.

{{< img src="product_analytics/analytics/visualize/analytics-pie-chart-2.png" alt="Analytics 차트 빌더에 표시된 파이 차트" style="width:90%;">}}

## 지리맵 {#geomap}

세계 지도에서 단일 측정값이나 패싯을 시각화합니다.

{{< img src="product_analytics/analytics/visualize/analytics-geomap-1.png" alt="Analytics 차트 빌더에 표시된 지리맵 차트" style="width:90%;">}}