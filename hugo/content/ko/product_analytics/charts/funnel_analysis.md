---
algolia:
  tags:
  - funnel
aliases:
- /ko/real_user_monitoring/funnel_analysis
- /ko/real_user_monitoring/product_analytics/funnel_analysis
- /ko/product_analytics/journeys/funnel_analysis/
disable_toc: false
further_reading:
- link: /product_analytics/analytics_explorer/
  tag: 설명서
  text: Analytics Explorer
- link: https://learn.datadoghq.com/courses/getting-started-product-analytics
  tag: 학습 센터
  text: Product Analytics 시작하기
title: 퍼널 분석
---
## 개요 {#overview}

Funnel 분석을 이용하면 주요 워크플로 전반의 전환율을 추적하여 사용자 이동 경로의 처음부터 끝까지 발생하는 병목 현상을 파악하고 이를 해결할 수 있습니다. 구체적으로 다음을 할 수 있습니다.

- 웹사이트 성능 저하로 인해 특정 지점에서 고객이 이탈하는지 확인
- 새로운 기능이 구축되고 시간이 지남에 따라 전환율이 어떻게 변화하는지 추적
- 워크플로에 새 단계 추가가 이탈률에 어떤 영향을 미치는지 평가
- 평균 전환 시간 측정
- 퍼널의 각 단계에서 개별 이벤트 필터링
- 주어진 단계 내에서 여러 이벤트를 결합(최종 사용자가 서로 다른 흐름을 통해 동일한 결과를 얻는 방식이 다를 수 있기 때문)


## 퍼널 구축 {#build-a-funnel}

퍼널 구축을 시작하려면 [{{< ui >}}Product Analytics{{< /ui >}}][1]로 이동한 다음 [{{< ui >}}Create New{{< /ui >}} > {{< ui >}}Funnel{{< /ui >}}][2]을 선택하세요.

{{< img src="product_analytics/journeys/funnel_analysis/funnel_overview.png" alt="Product Analytics의 '새로 만들기' 대화 상자에서 강조 표시된 퍼널 옵션" style="width:100%;" >}}

퍼널을 시작할 사용자 단계를 선택하고 {{< ui >}}Add step{{< /ui >}}을 사용하여 추가 단계를 더하세요. 단계를 드래그하여 퍼널 내 순서를 변경하세요.

{{< img src="product_analytics/journeys/funnel_analysis/funnel_add_step_video.mp4" alt="'단계 추가' 버튼을 사용하여 기존 퍼널에 단계를 추가하고, 드래그 앤 드롭 방식으로 새 단계를 퍼널의 올바른 위치로 옮기세요." video=true >}}


### 필터 추가 {#add-filters}

사용자를 전체적으로 필터링하거나 특정 단계에서 필터링할 수 있습니다.

- 전체 퍼널에 전역 필터를 적용하려면 {{< ui >}}Filter by{{< /ui >}}를 선택하고 옵션을 선택하세요.

- 개별 단계에서 사용자를 필터링하려면 해당 단계의 **필터 아이콘**을 선택하고 옵션을 선택하세요. 단계별 필터링을 통해 특정 제약 조건에 따라 사용자 행동이 어떻게 변화하는지에 대한 인사이트를 얻을 수 있습니다. 예를 들어 특정 장치, 운영 체제 또는 지리적 위치가 특정 단계에서 전환에 어떤 영향을 미치는지 확인하고 싶을 수 있습니다.

### 이벤트 결합 {#combine-events}

최종 사용자가 서로 다른 흐름을 통해 동일한 결과에 도달하는 경우를 반영할 수 있도록 하나의 퍼널 단계에 여러 이벤트를 결합할 수 있습니다. 이벤트를 결합할 때 포함된 모든 이벤트는 'OR' 논리를 사용하여 단계 전환을 트리거할 수 있습니다. 결합된 단계에 대한 퍼널 차트에는 해당 단계에 포함된 모든 이벤트의 데이터가 표시됩니다.

단계에 여러 이벤트를 추가하려면 기존 이벤트 옆에 있는 {{< ui >}}or{{< /ui >}} 버튼을 클릭하세요.

### 데이터 비교 {#compare-data}

{{< ui >}}Compare{{< /ui >}}를 선택한 후 아래 옵션 중 하나를 선택하여 다양한 방식으로 퍼널 데이터를 비교하세요.

{{< ui >}}By breakdown{{< /ui >}}: 기기 유형이나 지리적 위치와 같은 특정 속성별로 데이터를 그룹화합니다. 또한 속성 내에서 상위(가장 일반적인) 값 또는 하위(가장 일반적이지 않은) 값을 표시할지 여부와 포함할 값의 개수를 조정할 수 있습니다.

{{< img src="product_analytics/journeys/funnel_analysis/funnel_compare_by_country.png" alt="국가별 상위 5개 전환 소스를 표시하도록 구성된 '기준별 비교' 조회입니다." >}}

{{< ui >}}By property or segment{{< /ui >}}: 여러 사용자 세그먼트 또는 사용자 속성을 나란히 비교합니다.

- 사용자 세그먼트를 비교하려면 비교하려는 세그먼트를 선택하세요.
- 사용자 속성을 비교하려면 속성(예: 브라우저 이름 또는 국가)을 선택한 다음 비교할 값(예: Firefox, Chrome, Safari)을 선택합니다.

{{< img src="product_analytics/journeys/funnel_analysis/funnel_side_by_side.png" alt="선택한 5개의 브라우저 이름 값을 나란히 비교하여 보여주는 속성 또는 세그먼트별 비교 화면." >}}

{{< ui >}}By time{{< /ui >}}: 기간별 전환 데이터를 나란히 비교합니다.

## 전환 인사이트 개선 {#refine-conversion-insights}

퍼널 페이지의 정보를 추가로 분석하여 전환을 유도하는 사이트의 효율성을 파악할 수 있습니다. [전환](#conversion-computing-metrics)은 사용자가 퍼널에 정의된 마지막 단계를 완료할 때 발생합니다.

{{< img src="product_analytics/journeys/funnel_analysis/funnel_conversion_dropdown.png" alt="고유 전환 또는 총 전환별 분석 옵션이 있는 전환 구체화 드롭다운입니다." style="width:100%;" >}}

차트 측면 패널 위의 드롭다운을 사용하여 다양한 전환 분석 조회를 선택하세요. 다음을 기준으로 전환을 분석할 수 있습니다.

- {{< ui >}}Unique converted sessions{{< /ui >}}: 모든 단계가 동일한 `@session.id`로 완료된 전환입니다.

- {{< ui >}}Unique converted users{{< /ui >}}: `@user.id`로 추적되는 동일한 개별 사용자가 모든 단계를 완료한 전환입니다.

- {{< ui >}}Unique converted accounts{{< /ui >}}: `@account.id`로 추적되는 동일한 계정이 모든 단계를 완료한 전환입니다. 이 분석은 `@user.id` 패싯이 유지되는 기간보다 더 긴 기간에 걸쳐 로그인한 사용자가 완료한 전환을 식별하는 데 유용합니다.

- {{< ui >}}Total conversions{{< /ui >}}: 세션, 사용자 또는 계정에서 발생한 총 전환수입니다.

- {{< ui >}}Time to convert{{< /ui >}}: 세션, 사용자 또는 계정별 전환을 나타내는 시계열 뷰입니다.

모든 전환 분석 조회에 대해 전환을 횟수 또는 비율로 보거나, 모든 단계 또는 개별 단계에 대한 데이터를 볼 수 있습니다. 사용자 또는 계정별 전환 조회의 경우, 전환이 발생해야 하는 시간 범위를 조정할 수 있습니다.

## 전환 계산 메트릭 {#conversion-computing-metrics}

### Datadog에서 전환 지표를 계산하는 방법{#how-datadog-computes-conversion-metrics}
`A → B → C` 이벤트로 구성된 퍼널에서 이벤트가 **A**, A, A, **B**, **C**, C 순서로 발생한다고 가정해 보겠습니다.

이 경우 Datadog은 전환을 한 개로 집계합니다. 각각의 **A**는 독립적인 시도를 시작합니다. 세 번의 시도가 모두 동일한 **C** 이벤트에서 완료되므로 Datadog은 가장 먼저 시작된 시도만 집계합니다.

다른 예를 들면, 사용자가 **A**, A, A, **B**, **C**, C, **A**, **B**, **C** 순서로 이벤트를 수행하면 Datadog은 전환을 두 개로 집계합니다. 첫 번째 전환은 **A**, A, A, **B**, **C** 시퀀스로 완료되고, 두 번째 전환은 그다음 **A**, **B**, **C** 시퀀스로 완료됩니다.

<div class="alert alert-info"> 퍼널 단계와 일치하지 않는 모든 작업이나 조회는 단계별 또는 전체 전환율에 영향을 미치지 않습니다. 모든 퍼널 단계가 전환 기간 내에 올바른 순서로 발생하면 Datadog은 해당 세션을 한 번의 전환 세션으로 집계합니다.</div>

Datadog은 각 전환의 첫 번째 단계부터 마지막 단계까지 걸린 총시간을 전체 단계 수로 나누어 단계 간 평균 소요 시간을 계산합니다.

퍼널을 **사용자** 또는 **계정**별로 분석하는 경우, 첫 번째 이벤트가 발생한 시점부터의 전환 시간 범위를 시간 또는 일 단위로 정의할 수 있습니다. 전환 발생 여부를 판단하는 기본 시간 범위는 1일(달력상의 날짜가 아닌 24시간 기준)로 설정됩니다.


### 전환 집계 방식 {#conversion-counting-methods}

전환을 계산할 때 전환 시각화에서 **고유** 전환 옵션(세션, 사용자 또는 계정) 또는 {{< ui >}}Total Conversion Count{{< /ui >}} 옵션을 선택하여 전환 집계 방식을 정하세요. 

- {{< ui >}}Unique{{< /ui >}}: 고유: 세션, 사용자 또는 계정별로 전환을 한 번만 집계합니다. 예를 들어, 사용자가 동일한 세션 내에서 `A → B → C` 퍼널 시퀀스를 여러 번 완료하면(`A, B, C, A, B, C`), **한 번의 전환**으로 계산됩니다.

- {{< ui >}}Total{{< /ui >}}: 동일한 세션 ID, 사용자 또는 계정에서 정의된 퍼널을 완료할 때마다 전환을 집계합니다. 동일한 예(`A, B, C, A, B, C`)에서는 **두 번의 전환**으로 계산됩니다. {{< ui >}}Total{{< /ui >}} 설정은 중간 단계가 반복된 횟수가 아니라 완료된 흐름의 수를 계산합니다.


## 시각화 변경 {#change-the-visualization}
단계별 이벤트와 전환 측정 기준을 정의한 후에 다른 시각화로 전환하면 앱의 사용자 전환을 더 잘 파악할 수 있습니다.


{{< img src="product_analytics/journeys/funnel_analysis/funnel_visualization_video.mp4" alt="드롭다운을 사용하여 시각화를 단계 보기에서 시계열 보기로 변경하는 화면." video=true >}}


### 시계열 {#timeseries}
퍼널을 시계열로 표시하면 전환 추세를 파악하는 데 도움이 될 수 있습니다. 전환을 그래프로 표시할 기간을 선택할 수 있으며, 전환을 절대 개수나 비율로 확인할 수 있습니다.

{{< img src="product_analytics/journeys/funnel_analysis/funnel_timeseries_view.png" alt="지난 일주일 동안 일별로 전환한 고유 사용자를 표시하도록 구성된 시계열 시각화 화면." style="width:80%;" >}}

### 쿼리 값{#query-value}

쿼리 값 시각화는 메트릭의 현재 값을 표시합니다.

{{< img src="product_analytics/journeys/funnel_analysis/funnel_query_value.png" alt="지난 일주일 동안의 총 고유 전환 세션 수를 보여주는 쿼리 값 시각화 화면." style="width:80%;" >}}

### 상위 목록 {#top-list}

상위 목록 시각화는 선택한 측정값을 기준으로 패싯에서 상위 값을 식별합니다.

{{< img src="product_analytics/journeys/funnel_analysis/funnel_top_list.png" alt="대륙별 상위 4개 전환 유입 경로를 표시하는 상위 목록 시각화 화면." style="width:80%;" >}}

## 전환 요인 및 여정 경로 보기 {#view-conversion-drivers-and-journey-paths}

사용자 전환과 이탈에 관한 자세한 맥락을 파악하려면 퍼널 단계를 클릭하여 전환 분석과 여정 경로를 확인하세요.

<div class="alert alert-info">전환 분석은 미리 보기로 제공되고 있습니다.</div>

- **전환 분석**: 전환 요인, 사용자 여정, 전환 및 이탈에 사용할 수 있는 사용자 리플레이, 사용자 세부 정보를 조회합니다.

  {{< img src="product_analytics/journeys/funnel_analysis/funnel_analysis_side_panel.png" alt="퍼널 단계를 클릭한 후 측면 패널에 전환 동인, 사용 가능한 리플레이, 전환된 사용자가 표시된 화면." style="width:100%;" >}}

- **여정 경로**: 퍼널 외부의 다른 단계로 이어지는 분기 경로를 포함하여, 선택한 단계 시퀀스에 대한 전환 및 이탈 사용자 경로를 조회합니다.

  {{< img src="product_analytics/journeys/funnel_analysis/funnel_journey_paths.png" alt="퍼널의 1단계 이후 상위 5개 이탈 경로를 보여주는 여정 경로." style="width:100%;" >}}

## 퍼널 공유 {#share-a-funnel}

퍼널은 [대시보드][3]에서 팀과 공유하여 다른 텔레메트리 측정 메트릭과 함께 전환을 분석하거나 [노트북][4]에서 보고에 사용할 수 있습니다.

전체 시각화 또는 개별 위젯을 공유할 수 있습니다.

- 전체 시각화를 노트북 및 대시보드에 공유:

  {{< img src="product_analytics/journeys/funnel_analysis/funnels_share_export.png" alt="PNG로 내보내기라는 추가 옵션이 표시되도록 시각화 공유 옵션을 펼친 화면. " style="width:100%;" >}}

- 대시보드의 개별 위젯 공유:

  {{< img src="product_analytics/journeys/funnel_analysis/pana_funnel_share_dashboard.png" alt="위젯의 오른쪽 상단에 있는 내보내기 아이콘을 클릭하여 위젯을 공유하는 화면." style="width:100%;" >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/
[2]: https://app.datadoghq.com/product-analytics/user-journey/funnel
[3]: /ko/product_analytics/dashboards/
[4]: /ko/notebooks/