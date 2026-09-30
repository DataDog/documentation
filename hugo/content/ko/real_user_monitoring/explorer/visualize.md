---
further_reading:
- link: /real_user_monitoring/explorer/search/
  tag: 설명서
  text: 이벤트 검색
title: 시각화
---

## 개요

시각화는 [RUM 탐색기][1]에 표시된 필터 및 집계의 결과를 정의합니다. 검색 쿼리 아래에 필요한 정보를 표시할 해당 시각화 유형을 선택합니다.

## 기울기

목록은 이벤트의 페이지가 지정된 결과이며 개별 결과가 중요한 경우에 이상적입니다. 목록을 사용하기 위해 일치하는 결과를 정의하는 요소에 대한 사전 지식이 필요하지 않습니다.

{{< img src="real_user_monitoring/explorer/visualize/rum_explorer_lists-1.mp4" alt="RUM Explorer의 목록" video="true" style="width:70%;" >}}

검색하는 정보는 열로 표시되며 다음을 관리할 수 있습니다:

- 첫 번째 행에 사용 가능한 상호 작용이 있는 표입니다. 열을 정렬, 재정렬 및 제거할 수 있습니다.
- 왼쪽의 패싯 패널 또는 오른쪽의 RUM [이벤트 사이드 패널][2]입니다. 필드의 추가할 수 있습니다.

기본적으로 목록 시각화의 RUM 이벤트는 타임스탬프별로 구성되며, 가장 최근 이벤트가 먼저 나열됩니다. 패싯을 사용하는 등 원하는 방식으로 이벤트를 정렬할 수 있습니다. 측정값에 대해 가장 낮거나 가장 높은 값을 가진 RUM 이벤트를 먼저 표시한 다음, 패싯의 고유 값에 따라 사전순으로 이벤트를 정렬합니다. 이렇게 하면 패싯에 따라 열이 정렬됩니다.

열에 속성 및 태그를 추가할 수 있지만, [패싯을 선언][3]한 경우 먼저 테이블을 정렬하는 것이 좋습니다. 테이블의 행 항목에 대한 커스텀 속성 값을 보려면 패싯이 아닌 속성을 열에 추가할 수 있지만 올바르게 정렬되지 않을 수 있습니다.

RUM 이벤트 표 설정은 [Saved Views][4]에서 트러블슈팅 컨텍스트의 추가 요소와 함께 저장됩니다.

### 목록 위젯

[대시보드에 있는 목록 위젯][8]은 RUM 데이터를 포함하여 주어진 데이터 소스에 대한 개별 이벤트를 보여줍니다. 예를 들어, 특정 페이지의 모든 오류와 같이 목록 위젯을 사용하여 대시보드의 모든 RUM 이벤트를 볼 수 있습니다.

대시보드 외에도 목록 위젯은 노트북에서도 사용할 수 있습니다. 이를 통해 보고서 및 검사의 일부로 RUM 이벤트를 추가할 수 있습니다.

## 시계열

선택한 시간 프레임에 걸쳐 단일 측정값(또는 [패싯][5]의 고유한 값 수)의 진화를 시각화하고, 필요 시 사용 가능한 [패싯][5]으로 분할하여 시각화할 수 있습니다.

{{< img src="real_user_monitoring/explorer/visualize/timeseries-1.png" alt="RUM 탐색기의 시계열 그래프" style="width:90%;" >}}

시계열 그래프는 모든 보기 경로에 대해 지난 하루 동안 Shopist 애플리케이션의 페이지 조회 수 변화를 보여줍니다.

다음과 같은 추가 디스플레이 옵션을 선택할 수 있습니다:

- Display: 결과는 막대(개수 및 고유 개수가 권장됨), 선(통계 집계에 권장됨), 영역 및 여러 색상 세트로 표시됩니다.
- 롤업 간격: 막대에서 버킷의 너비를 결정합니다.

## 상위 목록

선택한 측정값을 기반으로 패싯의 상위 값을 시각화합니다.

{{< img src="real_user_monitoring/explorer/visualize/top_list-1.png" alt="RUM 탐색기의 상위 목록 막대 그래프" style="width:90%;" >}}

상위 목록에는 지난 하루 동안 Shopist 웹사이트를 방문하는데 사용된 상위 10개의 브라우저가 포함되어 있습니다.

## 내포된 표

선택한 [측정값][5](목록에서 선택한 첫 번째 측정값)에 따라 최대 3개의 [패싯][5]에서 상위 값을 시각화하고 중첩된 테이블에 나타나는 요소에 대한 추가 측정값을 표시합니다. 검색 쿼리를 업데이트하거나 다른 범위에 해당하는 RUM 이벤트를 조사합니다.

* 측정값이 여러 개일 경우 첫 번째 측정값에 따라 상단 또는 하단 목록이 결정됩니다.
* 소계는 하위 집합(위쪽 또는 아래쪽)만 표시되므로 그룹의 실제 값 합계와 다를 수 있습니다. 이 차원에 대한 값이 null이거나 비어 있는 이벤트는 하위 그룹으로 표시되지 않습니다.

 **참고**: 하나의 단일 측정 및 하나의 단일 차원에 사용되는 테이블 시각화는 [상위 목록](#top-list)과 동일하며, 디스플레이만 다릅니다.

 다음 RUM 분석 표에는 **두 국가**의 **상위 5개 URL 경로**가 나와 있습니다. 즉, **고유 세션 ID**의 양과 **기간**의 90번째 백분위수를 기준으로 지난 1일 동안의 미국과 일본의 분석 결과를 보여줍니다.

{{< img src="real_user_monitoring/explorer/visualize/nested_table-3.png" alt="RUM 탐색기의 중첩된 테이블" style="width:90%;">}}

## 배포

선택한 기간 동안 측정 속성의 분포를 표시하여 값이 변동하는지 확인할 수 있습니다.

{{< img src="real_user_monitoring/explorer/visualize/distribution-1.png" alt="RUM 탐색기의 분포 그래프" style="width:90%;">}}

분포 그래프는 Shopist 랜딩 페이지의 사용자 경험을 측정하는 Largest Contentful Paint 분포를 표시합니다.

## 지리 맵

세계 지도에서 단일 [측정값][5](또는 [패싯][5]의 고유한 값 수)을 시각화합니다.

{{< img src="real_user_monitoring/explorer/visualize/geomap-1.png" alt="RUM 탐색기의 지리적 지도" style="width:90%;">}}

RUM 분석 지리적 지도는 지난 하루 동안 **Largest Contentful Paint**의 75번째 백분위수를 보여줍니다.

## 퍼널
[퍼널 분석][9]에 대해 알아보세요.
## 트리 맵
트리 맵을 사용하면 시각적으로 유용한 형식으로 데이터를 전체 대비 백분율로 구성하고 표시할 수 있습니다. 트리 맵은 데이터를 중첩된 직사각형으로 표시합니다. 사각형의 크기와 색상을 모두 사용하여 다양한 차원을 비교할 수 있습니다. 여러 속성을 선택하여 사각형의 계층 구조를 볼 수도 있습니다.

다음 트리 맵은 **View Name**별 백분율 분석을 보여줍니다.

{{< img src="real_user_monitoring/explorer/visualize/tree-map.png" alt="RUM 탐색기의 트리 맵" style="width:90%;">}}
## 파이 차트
파이 차트는 데이터를 전체 대비 백분율로 정리하고 표시하는 데 도움이 됩니다. 로그 데이터 내에서 서비스, 사용자, 호스트, 국가 등과 같은 다양한 차원 간의 관계를 비교할 때 유용합니다.

다음 파이 차트는 **View Path**에 의한 백분율 분석을 보여줍니다.

{{< img src="real_user_monitoring/explorer/visualize/pie-chart.png" alt="RUM Explorer의 파이 차트" style="width:90%;">}}

## 관련 이벤트

[퍼널](#funnels) 이외의 모든 시각화를 통해 그래프의 섹션을 선택하거나 그래프를 클릭하여 확대하거나 선택한 항목에 해당하는 이벤트 목록을 볼 수 있습니다.

{{< img src="real_user_monitoring/explorer/visualize/related_events-1.png" alt="그래프를 클릭하면 관련 이벤트 링크가 제공됩니다." width="90%" >}}

퍼널 그래프의 경우 그래프를 클릭하면 쿼리에 해당하는 전환 및 이탈 세션의 목록을 볼 수 있습니다.

나머지 시각화 옵션의 경우 그래프를 클릭하고 **View events**를 클릭하여 선택한 항목에 해당하는 이벤트 목록을 확인할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/explorer/
[2]: /ko/real_user_monitoring/explorer/events/
[3]: /ko/logs/explorer/facets/
[4]: /ko/real_user_monitoring/explorer/saved_views/
[5]: /ko/real_user_monitoring/explorer/search#setup-facets-and-measures
[6]: /ko/notebooks
[7]: /ko/real_user_monitoring/explorer/export/
[8]: /ko/dashboards/widgets/list/
[9]: /ko/real_user_monitoring/funnel_analysis