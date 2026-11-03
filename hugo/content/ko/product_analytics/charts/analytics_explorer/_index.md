---
aliases:
- /ko/product_analytics/analytics_explorer/
- /ko/product_analytics/journeys
description: 이벤트, 측정값, 필터 및 분류를 사용하여 사용자 지정 분석 쿼리를 빌드하고 시각화하세요.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-geomaps/
  tag: 블로그
  text: 지오맵을 사용하여 위치별로 앱 데이터 시각화하기
title: 분석
---
분석 차트는 이벤트, 측정값 및 필터로 구성된 단일 쿼리에서 시작합니다. 이를 한 번 정의한 다음 결과를 시각화하는 방법을 선택하세요. 

분석 차트를 사용하여 다음을 수행할 수 있습니다.

- 이벤트를 트리거한 사용자 수와 시간이 지남에 따라 기능 채택이 어떻게 변화하는지 확인
- 사용자가 작업을 수행하는 빈도와 제품에 얼마나 깊이 관여하는지 측정
- 사용자 또는 이벤트 속성별로 메트릭을 분류하고 이벤트 구성을 시각화
- 수식을 사용하여 사용자 지정 메트릭을 빌드하고 이벤트나 메트릭을 변화율, 비율 또는 점수로 결합
- 급증, 급락 또는 추세를 주도하는 사용자나 세그먼트를 명확히 파악

{{< img src="/product_analytics/analytics/analytics_chart.png" alt="Analytics 차트 예시" style="width:90%;" >}}

## 쿼리 빌드 {#build-a-query}

쿼리는 나중에 어떻게 표시할지와 관계없이 Analytics 차트에서 측정할 항목을 정의합니다.

{{< img src="/product_analytics/analytics/analytics_query_builder.png" alt="쿼리 표시 이름, 이벤트 선택기, 측정값 선택기, 필터, 분류, 함수 및 추가 쿼리 컨트롤에 대한 번호가 매겨진 콜아웃이 있는 Analytics 쿼리 빌더입니다." style="width:50%;" >}}
   
1. {{< ui >}}Product Analytics{{< /ui >}}에서 {{< ui >}}Create New{{< /ui >}} > {{< ui >}}Analytics{{< /ui >}}를 선택합니다.

2. (필요시) 쿼리 레이블을 지정할 {{< ui >}}Query display name{{< /ui >}}을 입력합니다.
   
3. 이벤트 선택기를 클릭하여 특정 보기 또는 세션 등 쿼리에 포함할 이벤트를 선택합니다. 선택기 내의 탭을 사용하여 이벤트 범주별로 목록을 좁히세요. {{< ui >}}Sessions{{< /ui >}}, {{< ui >}}Views{{< /ui >}}, {{< ui >}}Labeled actions{{< /ui >}}, {{< ui >}}Actions{{< /ui >}} 또는 {{< ui >}}Server actions{{< /ui >}}입니다.

4. {{< ui >}}Viewed as count of{{< /ui >}}를 사용하여 쿼리가 선택한 이벤트를 측정하는 방법을 선택합니다. 모든 발생 횟수를 계산하려면 {{< ui >}}All events{{< /ui >}}를 선택하고, 고유 값을 계산하려면 {{< ui >}}User Id{{< /ui >}}와 같은 특정 속성을 선택하세요.

5. (필요시) {{< ui >}}Add filter{{< /ui >}}를 사용하여 이벤트, 사용자, 세그먼트 또는 계정 속성을 기준으로 쿼리 범위를 지정합니다. 여기에는 타사 통합의 사용자 지정 속성도 포함됩니다.

6. (선택 사항) {{< ui >}}Add breakdown{{< /ui >}}을 사용하여 국가 또는 보기 이름과 같은 속성 값별로 결과를 비교합니다.

   <div class="alert alert-info">{{< ui >}}Query Value{{< /ui >}} 차트는 분류를 제거하고 {{< ui >}}Geomap{{< /ui >}} 차트는 이를 위치 패싯으로 변환합니다.</div>

7. (선택 사항) {{< ui >}}Σ{{< /ui >}}를 사용하여 변화율 계산이나 데이터 평활화와 같이 쿼리를 변환하는 함수를 적용하세요. 자세한 내용은 [함수][1]를 참조하세요.
   
8. (선택 사항) {{< ui >}}Add Query{{< /ui >}}를 사용하여 첫 번째 쿼리와 함께 두 번째 독립 쿼리를 실행하세요. {{< ui >}}Add Formula{{< /ui >}}를 사용하여 여러 쿼리를 단일 결과로 결합하세요.

## 분석 차트 이해하기 {#understand-an-analytics-chart}

쿼리를 작성한 후 차트는 정의한 이벤트, 측정값, 필터 및 분류를 사용하여 데이터를 표시합니다. 여기에서 기본 쿼리를 변경하지 않고도 해당 데이터가 시각화되고 표시되는 방식을 변경할 수 있습니다.

모든 옵션이 모든 차트 유형에 적용되는 것은 아닙니다. 예를 들어, 롤업 간격 및 표시 스타일은 {{< ui >}}Timeseries{{< /ui >}} 차트에만 적용됩니다.

{{< img src="product_analytics/analytics/analytics_analysis.png" alt="차트 유형 선택기, 롤업 간격, 시간 범위 선택기, 표시 선택기, 데이터 포인트 옵션 메뉴 및 진행 중인 간격에 대한 번호가 매겨진 콜아웃이 있는 Analytics 차트입니다." style="width:100%;" >}}

1. [차트 유형][2] 간을 전환하려면 차트 유형 선택기를 사용하세요.

2. {{< ui >}}Timeseries{{< /ui >}} 차트의 경우, 롤업 선택기를 사용하여 각 데이터 포인트가 나타내는 시간 간격을 설정하세요. {{< ui >}}Default{{< /ui >}}를 선택하여 간격이 시간 범위에 따라 조정되도록 하거나 특정 값으로 고정하세요.

3. 시간 범위 선택기를 사용하여 차트가 분석할 데이터 기간을 {{< ui >}}Past 1 Hour{{< /ui >}}에서 {{< ui >}}Past 1 Year{{< /ui >}}까지 설정하거나 달력에서 사용자 지정 범위를 선택하세요.

4. {{< ui >}}Timeseries{{< /ui >}} 차트의 경우, 표시 선택기를 사용하여 {{< ui >}}Bars{{< /ui >}}, {{< ui >}}Lines{{< /ui >}} 및 {{< ui >}}Areas{{< /ui >}} 간을 전환하세요.

5. 데이터 포인트 위로 마우스를 가져가 세부 정보를 조회하거나 클릭하여 확대, 기본 이벤트 조회, 해당 값 검색 또는 쿼리에서 제외 옵션을 사용하세요.

6. 빗금 친 세그먼트는 아직 진행 중인 간격을 나타냅니다. 

## 다음 단계 {#next-steps}
{{< whatsnext desc="분석 이벤트를 검색, 그룹화 및 시각화하고 개별 이벤트를 내보내거나 확인하는 방법을 알아보세요." >}}
    {{< nextlink href="product_analytics/charts/analytics_explorer/search_syntax" >}}검색 구문{{< /nextlink >}}
    {{< nextlink href="product_analytics/charts/analytics_explorer/events" >}}Events{{< /nextlink >}}
    {{< nextlink href="product_analytics/charts/analytics_explorer/visualize" >}}시각화{{< /nextlink >}}
    {{< nextlink href="product_analytics/charts/analytics_explorer/group" >}}그룹{{< /nextlink >}}
    {{< nextlink href="product_analytics/charts/analytics_explorer/export" >}}내보내기{{< /nextlink >}}
{{< /whatsnext >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/dashboards/functions/
[2]: /ko/product_analytics/charts/analytics_explorer/visualize/