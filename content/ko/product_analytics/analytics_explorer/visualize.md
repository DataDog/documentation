---
further_reading:
- link: /real_user_monitoring/explorer/search/
  tag: 설명서
  text: 이벤트 검색
title: 시각화
---

## 개요

시각화는 [Analytics Explorer][1]에 표시되는 필터 및 집계의 결과를 정의합니다. 검색 쿼리에 필요한 정보를 표시하려면 관련 시각화 유형을 선택하세요.

## 시계열

선택한 기간 동안 단일 측정값(Product Analytics 이벤트에 포함된 숫자 값이 포함된 속성) 또는 패싯(고유한 값 수)의 변화를 시각화합니다.

{{< img src="product_analytics/analytics/visualize/analytics-timeseries-1.png" alt="Analytics Explorer의 시계열 그래프" style="width:90%;" >}}

시계열 그래프는 모든 보기 경로에 대해 지난 하루 동안 예제 웹 애플리케이션의 페이지 보기 수 변화를 보여줍니다.

다음과 같은 추가 디스플레이 옵션을 선택할 수 있습니다:

- Display: 결과는 막대(개수 및 고유 개수가 권장됨), 선(통계 집계에 권장됨), 영역 및 여러 색상 세트로 표시됩니다.
- 롤업 간격: 막대에서 버킷의 너비를 결정합니다.

## 상위 목록

선택한 측정값을 기반으로 패싯의 상위 값을 시각화합니다.

{{< img src="product_analytics/analytics/visualize/analytics-top-list-1.png" alt="Analytics Explorer의 상위 목록 막대 그래프" style="width:90%;" >}}

상위 목록에는 지난 1일 동안 Shopist 웹사이트를 방문하는 데 사용된 상위 브라우저가 포함됩니다.

## 내포된 표

선택한 측정값(목록에서 선택한 첫 번째 측정값)에 따라 최대 3개 패싯의 상위 값을 시각화하고 중첩 테이블에 나타나는 요소에 대한 추가 측정값을 표시합니다. 검색어를 업데이트하거나 두 디멘션 중 하나에 해당하는 이벤트를 조사하세요.

* 측정값이 여러 개일 경우 첫 번째 측정값에 따라 상단 또는 하단 목록이 결정됩니다.
* 소계는 하위 집합(위쪽 또는 아래쪽)만 표시되므로 그룹의 실제 값 합계와 다를 수 있습니다. 이 차원에 대한 값이 null이거나 비어 있는 이벤트는 하위 그룹으로 표시되지 않습니다.

 **참고**: 하나의 단일 측정 및 하나의 단일 차원에 사용되는 테이블 시각화는 [상위 목록](#top-list)과 동일하며, 디스플레이만 다릅니다.

 다음 Analytics 표에는 지난 1일 동안 미국과 일본 **두 국가**의 **상위 5개 URL 경로**가 브라우저별로 표시되어 있습니다.

{{< img src="product_analytics/analytics/visualize/analytics-nested-table-1.png" alt="Analytics Explorer의 중첩 테이블" style="width:90%;">}}

## 디스트리뷰션

선택한 기간 동안 측정 속성의 분포를 표시하여 값이 변동하는지 확인할 수 있습니다.

{{< img src="product_analytics/analytics/visualize/analytics-distribution.png" alt="Analytics Explorer의 분산 그래프" style="width:90%;">}}

분포 그래프는 Shopist 랜딩 페이지의 사용자 경험을 측정하는 Largest Contentful Paint 분포를 표시합니다.

## 트리 맵
트리 맵을 사용하면 시각적으로 유용한 형식으로 데이터를 전체 대비 백분율로 구성하고 표시할 수 있습니다. 트리 맵은 데이터를 중첩된 직사각형으로 표시합니다. 사각형의 크기와 색상을 모두 사용하여 다양한 차원을 비교할 수 있습니다. 여러 속성을 선택하여 사각형의 계층 구조를 볼 수도 있습니다.

다음 트리 맵은 **View Name**별 백분율 분석을 보여줍니다.

{{< img src="product_analytics/analytics/visualize/analytics-tree-maps.png" alt="Analytics Explorer의 트리 맵" style="width:90%;">}}

## 파이 차트
원형 차트를 사용하면 데이터를 전체에 대한 백분율로 구성하고 표시할 수 있습니다. 사용자의 로그 데이터 내에서 서비스, ​​사용자, 호스트, 국가 등 다양한 디멘션 간의 관계를 비교할 때 유용합니다. 

다음 파이 차트는 **View Path**에 의한 백분율 분석을 보여줍니다.

{{< img src="product_analytics/analytics/visualize/analytics-pie-chart.png" alt="Analytics Explorer 원형 차트" style="width:90%;">}}

## 지리 맵

세계 지도에서 단일 측정값( Product Analytics에 포함된 숫자 값이 포함된 속성) 또는 패싯(고유한 값 수)을 시각화합니다.

{{< img src="product_analytics/analytics/visualize/analytics-geomaps.png" alt="Analytics Explorer의 지오맵" style="width:90%;">}}

Analytics 지오맵에는 지난 하루 동안 **가장 콘텐츠가 많은 페인트**의 75번째 백분위수가 표시됩니다.

## 목록

목록은 이벤트의 페이지가 지정된 결과이며 개별 결과가 중요한 경우에 이상적입니다. 목록을 사용하기 위해 일치하는 결과를 정의하는 요소에 대한 사전 지식이 필요하지 않습니다.

{{< img src="product_analytics/analytics/visualize/analytics-lists.mp4" alt="Analytics Explorer의 목록" video="true" style="width:70%;" >}}

검색하는 정보는 열로 표시되며 다음을 관리할 수 있습니다:

- 첫 번째 행에 사용 가능한 상호 작용이 있는 표입니다. 열을 정렬, 재정렬 및 제거할 수 있습니다.
- 각 열 상단의 패싯 드롭다운.

기본적으로 목록 시각화의 이벤트는 타임스탬프별로 구성되며 가장 최근 이벤트가 먼저 나열됩니다. 패싯 등 원하는 방식으로 이벤트를 정렬할 수 있습니다. 측정값에 대해 가장 낮은 값 또는 가장 높은 값을 가진 이벤트를 먼저 표시한 다음 패싯의 고유 값에 대해 사전순으로 이벤트를 정렬합니다. 패싯에 따라 열의 순서를 지정합니다.

## 관련 이벤트

[퍼널](#funnels) 이외의 모든 시각화를 통해 그래프의 섹션을 선택하거나 그래프를 클릭하여 확대하거나 선택한 항목에 해당하는 이벤트 목록을 볼 수 있습니다.

{{< img src="product_analytics/analytics/visualize/analytics-related-events.png" alt="그래프 클릭 시 관련 이벤트 링크 확인 가능" width="90%" >}}

퍼널 그래프의 경우 그래프를 클릭하면 쿼리에 해당하는 전환 및 이탈 세션의 목록을 볼 수 있습니다.

나머지 시각화 옵션의 경우 그래프를 클릭하고 **View events**를 클릭하여 선택한 항목에 해당하는 이벤트 목록을 확인할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/product_analytics/analytics_explorer/