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
- link: /product_analytics/charts/journey_paths/
  tag: 설명서
  text: Journey Paths Analysis
- link: https://learn.datadoghq.com/courses/getting-started-product-analytics
  tag: 학습 센터
  text: Product Analytics 시작하기
title: 퍼널
---
## 개요 {#overview}

퍼널 분석을 이용하면 주요 워크플로 전반의 전환율을 추적하여 사용자 이동 경로의 처음부터 끝까지 발생하는 병목 현상을 파악하고 이를 해결할 수 있습니다. 구체적으로 다음을 할 수 있습니다.

- 웹사이트 성능 저하로 인해 특정 지점에서 고객이 이탈하는지 확인
- 새로운 기능이 구축되고 시간이 지남에 따라 전환율이 어떻게 변화하는지 추적
- 워크플로에 새 단계를 추가하면 이탈률에 어떤 영향을 미치는지 평가
- 평균 전환 시간 측정
- 퍼널의 각 단계에서 개별 이벤트 필터링
- 주어진 단계 내에서 여러 이벤트를 결합(최종 사용자가 서로 다른 흐름을 통해 동일한 결과를 얻는 방식이 다를 수 있기 때문)


## 퍼널 구축 {#build-a-funnel}

퍼널 구축을 시작하려면 [{{< ui >}}Product Analytics{{< /ui >}}][1]로 이동한 다음 [{{< ui >}}Create New{{< /ui >}} > {{< ui >}}Funnel{{< /ui >}}][2]을 선택하세요.

{{< img src="product_analytics/journeys/funnel_analysis/funnel_overview.png" alt="Product Analytics의 '새로 만들기' 대화 상자에서 퍼널 옵션을 강조 표시한 이미지" style="width:100%;" >}}

퍼널을 시작할 사용자 단계를 선택하고 {{< ui >}}Add step{{< /ui >}}을 사용하여 더 많은 단계를 추가합니다. 퍼널에서 단계의 순서를 변경하려면 단계를 끌어서 놓습니다.

{{< img src="product_analytics/journeys/funnel_analysis/funnel_add_step_video.mp4" alt="단계 추가 버튼을 사용해 기존 퍼널에 단계를 추가하고, 드래그 앤 드롭을 사용해 새 단계를 퍼널에서 올바른 곳으로 옮깁니다." video=true >}}


### 필터 추가 {#add-filters}

사용자를 전체적으로 필터링하거나 특정 단계에서 필터링할 수 있습니다.

- 퍼널 전체에 전역 필터를 적용하려면 {{< ui >}}Filter by{{< /ui >}}를 선택하고 옵션을 선택하세요.

- 개별 단계에서 사용자를 필터링하려면 해당 단계의 **필터 아이콘**을 선택하고 옵션을 선택하세요. 단계별 필터링을 통해 특정 제약 조건에 따라 사용자 행동이 어떻게 변화하는지에 대한 인사이트를 얻을 수 있습니다. 예를 들어 특정 장치, 운영 체제 또는 지리적 위치가 해당 단계에서의 전환에 어떤 영향을 미치는지 확인하려고 할 수 있습니다.

### 이벤트 결합 {#combine-events}

최종 사용자가 서로 다른 흐름을 통해 동일한 결과에 도달하는 경우를 반영할 수 있도록 하나의 퍼널 단계에 여러 이벤트를 결합할 수 있습니다. 이벤트를 결합할 때, "or" 로직을 사용하면 포함된 모든 이벤트로 단계 전환을 트리거할 수 있습니다. 결합된 단계에 대한 퍼널 차트에는 해당 단계에 포함된 모든 이벤트의 데이터가 표시됩니다.

단계에 여러 이벤트를 추가하려면 기존 이벤트 옆에 있는 {{< ui >}}or{{< /ui >}} 버튼을 클릭하세요.

### 데이터 비교 {#compare-data}

{{< ui >}}Compare{{< /ui >}}를 선택한 후 아래 옵션 중 하나를 선택하여 다양한 방식으로 퍼널 데이터를 비교하세요.

{{< ui >}}By breakdown{{< /ui >}}: 데이터를 장치 유형 또는 지리적 위치와 같은 특정 속성 기준으로 그룹화합니다. 속성 내에서 최상위(가장 일반적) 또는 최하위(가장 덜 일반적) 값을 표시할지, 값을 몇 개나 포함할지도 조정할 수 있습니다.

{{< img src="product_analytics/journeys/funnel_analysis/funnel_compare_by_country.png" alt="Compare By breakdown(분석 내용 기준으로 비교) 보기. 국가별 전환 소스 상위 5개를 표시하도록 구성했습니다." >}}

{{< ui >}}By property or segment{{< /ui >}}: 여러 사용자 세그먼트 또는 사용자 속성을 나란히 비교합니다.

- 사용자 세그먼트를 비교하려면 비교하려는 세그먼트를 선택하세요.
- 사용자 속성을 비교하려면 속성(예: 브라우저 이름 또는 국가)을 선택한 다음 비교할 값(예: Firefox, Chrome, Safari)을 선택합니다.

{{< img src="product_analytics/journeys/funnel_analysis/funnel_side_by_side.png" alt="Compare By property or segment(속성 또는 세그먼트 기준으로 비교) 보기. 선택한 브라우저 이름 다섯 개를 나란히 놓고 비교한 결과를 표시했습니다." >}}

{{< ui >}}By time{{< /ui >}}: 기간별 전환 데이터를 나란히 비교합니다.

## 전환 인사이트 세분화 {#refine-conversion-insights}

퍼널 페이지의 정보를 추가로 분석해 사이트가 전환을 유도하는 데 얼마나 효과적인지 파악할 수 있습니다. [전환](#conversion-computing-metrics)은 사용자가 퍼널에 정의된 마지막 단계를 완료할 때 발생합니다.

{{< img src="product_analytics/journeys/funnel_analysis/funnel_conversion_dropdown.png" alt="전환 세분화 드롭다운. 고유한 전환 또는 전체 전환 기준으로 분석 옵션이 포함되어 있습니다." style="width:100%;" >}}

차트 사이드 패널 위의 드롭다운을 사용해 다양한 전환 분석 보기를 선택하세요. 다음을 기준으로 전환을 분석할 수 있습니다.

- {{< ui >}}Unique converted sessions{{< /ui >}}: 모든 단계가 동일한 `@session.id`로 완료된 전환입니다.

- {{< ui >}}Unique converted users{{< /ui >}}: 동일한 개별 사용자(`@user.id`로 추적)가 모든 단계를 완료한 전환입니다.

- {{< ui >}}Unique converted accounts{{< /ui >}}: 동일한 계정(`@account.id`로 추적)이 모든 단계를 완료한 전환입니다. 이 분석은 로그인한 사용자가 `@user.id` 패싯이 지속되는 시간보다 오랜 기간에 걸쳐 완료한 전환을 파악하는 데 유용합니다.

- {{< ui >}}Total conversions{{< /ui >}}: 세션, 사용자 또는 계정 전체에서 발생한 총 전환수입니다.

- {{< ui >}}Time to convert{{< /ui >}}: 세션, 사용자 또는 계정별 전환을 나타내는 시계열 보기입니다.

모든 전환 분석 보기에서, 전환을 개수 또는 비율로 보기로 선택할 수 있고, 모든 단계 또는 개별 단계의 데이터를 조회할 수도 있습니다. 사용자 또는 계정별 전환 보기의 경우, 전환이 발생해야 하는 시간 프레임을 조정할 수 있습니다.

## 전환 계산 메트릭 {#conversion-computing-metrics}

### Datadog이 전환 메트릭을 계산하는 방법{#how-datadog-computes-conversion-metrics}
퍼널이 이벤트 `A → B → C` 및 이벤트 단계 **A**, A, A, **B**, **C**, C로 구성되어 있다고 가정하겠습니다.

이 경우, Datadog은 전환이 한 개 발생한 것으로 간주합니다. 각 **A**가 독자적인 시도를 시작합니다. 세 번의 시도가 모두 동일한 **C** 이벤트에서 완료되기 때문에, Datadog은 가장 이른 시도만 계수합니다.

좀 더 자세히 설명하자면, 사용자가 이벤트 시퀀스 **A**, A, A, **B**, **C**, C, **A**, **B**, **C**를 수행하는 경우 Datadog은 전환이 두 개 발생한 것으로 간주합니다. 첫 번째 전환은 **A**, A, A, **B**, **C** 시퀀스로 완료되고, 두 번째 전환은 그다음 **A**, **B**, **C** 시퀀스로 완료됩니다.

<div class="alert alert-info"> 퍼널 단계와 일치하지 않는 모든 작업이나 조회는 단계별 또는 전체 전환율에 영향을 미치지 않습니다. 모든 퍼널 단계가 전환 기간 내에 올바른 순서로 발생하면 Datadog은 해당 세션을 한 번의 전환 세션으로 간주합니다.</div>

Datadog은 각 전환의 첫 번째 단계부터 마지막 단계까지 걸린 총시간을 전체 단계 수로 나누어 단계 간 평균 소요 시간을 계산합니다.

퍼널을 **사용자** 또는 **계정**별로 분석하는 경우, 첫 번째 이벤트가 발생한 시점부터의 전환 시간 프레임을 시간 또는 일 단위로 정의할 수 있습니다. 전환의 기본 시간 프레임은 하루(역일이 아니라 24시간)로, 이 기간 안에 전환이 발생했는지 판별합니다.


### 전환 계수 방법 {#conversion-counting-methods}

전환을 계산할 때, 전환 시각화에서 **고유한** 전환 옵션(세션, 사용자 또는 계정) 또는 {{< ui >}}Total Conversion Count{{< /ui >}} 옵션을 선택해 전환을 어떻게 계수할지 선택합니다. 

- {{< ui >}}Unique{{< /ui >}}:세션, 사용자 또는 계정별로 전환을 한 번만 계수합니다. 예를 들어, 사용자가 동일한 세션 내에서 `A → B → C` 퍼널 시퀀스를 여러 번 완료하면(`A, B, C, A, B, C`), **한 번의 전환**으로 계산됩니다.

- {{< ui >}}Total{{< /ui >}}: 동일한 세션 ID, 사용자 또는 계정이 정의된 퍼널을 완료할 때마다 전환을 계수합니다. 이 방법의 경우 동일한 예시를 사용해(`A, B, C, A, B, C`) **전환을 두 개**로 계수합니다. {{< ui >}}Total{{< /ui >}} 설정은 중간 단계가 반복된 횟수가 아니라 완료된 흐름의 수를 계산합니다.


## 시각화 변경 {#change-the-visualization}
단계 이벤트와 전환 측정을 정의했으면, 다양한 시각화로 전환해 앱의 사용자 전환을 더 자세히 파악할 수 있습니다.


{{< img src="product_analytics/journeys/funnel_analysis/funnel_visualization_video.mp4" alt="드롭다운을 사용해 시각화를 단계에서 시계열로 변경하기." video=true >}}


### 시계열 {#timeseries}
퍼널을 시계열로 조회하면 전환 추세를 파악하는 데 도움이 될 수 있습니다. 전환을 그래프로 표시할 기간을 선택할 수 있으며, 전환을 절대 개수나 비율로 조회할 수 있습니다.

{{< img src="product_analytics/journeys/funnel_analysis/funnel_timeseries_view.png" alt="시계열 시각화, 지난 일주일 동안의 일일 고유한 전환 사용자를 표시하도록 구성함." style="width:80%;" >}}

### 쿼리 값{#query-value}

쿼리 값 시각화는 메트릭의 현재 값을 표시합니다.

{{< img src="product_analytics/journeys/funnel_analysis/funnel_query_value.png" alt="쿼리 값 시각화, 지난 일주일 동안의 고유한 전환 세션 총수를 표시하도록 구성함." style="width:80%;" >}}

### 상위 목록 {#top-list}

상위 목록 시각화는 주어진 측정치에 기반해 패싯의 최상위 값을 나타냅니다.

{{< img src="product_analytics/journeys/funnel_analysis/funnel_top_list.png" alt="상위 목록 시각화, 대륙별 상위 4개의 전환 소스를 표시하도록 구성함." style="width:80%;" >}}

## 전환 요인 조회 {#view-conversion-drivers}

사용자 전환과 이탈에 관한 자세한 맥락을 파악하려면 퍼널 단계를 클릭하여 전환 분석에 액세스하세요.

<div class="alert alert-info">전환 분석은 미리 보기로 제공되고 있습니다.</div>

전환 요인, 사용자 여정, 전환 및 이탈에 사용할 수 있는 사용자 리플레이, 사용자 세부 정보를 조회하세요.

{{< img src="product_analytics/journeys/funnel_analysis/funnel_analysis_side_panel.png" alt="퍼널 단계를 클릭한 후의 사이드 패널 보기. 전환 요인, 사용 가능한 리플레이 및 전환한 사용자가 표시됨." style="width:100%;" >}}

## 퍼널 공유 {#share-a-funnel}

퍼널은 [대시보드][3]에서 팀원들과 공유하여 다른 텔레메트리 메트릭과 함께 전환을 분석하거나 [노트북][4]에서 공유해 보고에 사용할 수 있습니다.

시각화 전체를 공유할 수도 있고, 개별 위젯을 공유할 수도 있습니다.

- 시각화 전체를 Notebooks 및 대시보드에 공유:

  {{< img src="product_analytics/journeys/funnel_analysis/funnels_share_export.png" alt="공유 시각화 옵션을 펼친 이미지. PNG로 내보내기 추가 옵션을 표시함 " style="width:100%;" >}}

- 대시보드의 개별 위젯 공유:

  {{< img src="product_analytics/journeys/funnel_analysis/pana_funnel_share_dashboard.png" alt="위젯의 상단 오른쪽에 있는 내보내기 아이콘을 클릭해 위젯 공유하기" style="width:100%;" >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/
[2]: https://app.datadoghq.com/product-analytics/user-journey/funnel
[3]: /ko/product_analytics/dashboards/
[4]: /ko/notebooks/