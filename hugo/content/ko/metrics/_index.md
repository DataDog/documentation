---
aliases:
- /ko/graphing/metrics/
- /ko/metrics/introduction/
- /ko/graphing/faq/inconsistent-sum-aggregation-between-different-time-windows-on-graph/
- /ko/dashboards/faq/inconsistent-sum-aggregation-between-different-time-windows-on-graph/
cascade:
  algolia:
    rank: 70
    tags:
    - submit metrics
    - metrics submission
title: Metrics
---
{{< learning-center-callout header="활성화 웨비나 세션에 참가하기" hide_image="true" btn_title="등록" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Metrics">}}
  사용자 지정 메트릭을 위한 Foundation Enablement 세션을 살펴보고 등록하세요. 사용자 지정 메트릭을 활용하여 방문자 수, 평균 고객 장바구니 크기, 요청 지연 시간 또는 사용자 지정 알고리즘의 성능 분포와 같은 애플리케이션 KPI를 추적하는 방법을 알아보세요.
{{< /learning-center-callout >}}

이는 Datadog의 Metrics와 그 유용성에 대한 소개입니다. 이 섹션에는 다음 주제가 포함됩니다. 

{{< whatsnext desc="Datadog에 메트릭 제출" >}}
    {{< nextlink href="/metrics/custom_metrics">}}<u>사용자 지정 메트릭 제출</u> - 사용자 지정 메트릭이 무엇인지와 이를 제출하는 방법을 알아봅니다.{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/reference/otel_metrics" >}}<u>OpenTelemetry 메트릭 전송</u> - Datadog Agent 또는 OpenTelemetry Collector를 구성합니다.{{< /nextlink >}}
    {{< nextlink href="/metrics/types" >}}<u>메트릭 유형</u> - Datadog에 제출할 수 있는 메트릭 유형입니다.{{< /nextlink >}}
    {{< nextlink href="/metrics/distributions" >}}<u>Distribution 메트릭</u> - Distribution 메트릭과 전역적으로 정확한 백분위수에 대해 알아봅니다.{{< /nextlink >}}
    {{< nextlink href="/metrics/units" >}}<u>메트릭 단위</u> - 메트릭과 연결할 수 있는 단위에 대해 알아봅니다.{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="메트릭 시각화 및 쿼리" >}}
    {{< nextlink href="/metrics/explorer" >}}<u>Metrics Explorer</u> - 모든 메트릭을 탐색하고 분석을 수행합니다.{{< /nextlink >}}
    {{< nextlink href="/metrics/summary" >}}<u>Metrics Summary</u> - 현재 보고 중인 Datadog 메트릭을 이해합니다.{{< /nextlink >}}
    {{< nextlink href="/metrics/advanced-filtering" >}}<u>고급 필터링</u> - 데이터를 필터링하여 반환되는 메트릭의 범위를 좁힙니다.{{< /nextlink >}}
    {{< nextlink href="/metrics/nested_queries" >}}<u>중첩된 쿼리</u> - 추가 집계 레이어를 적용하여 고급 쿼리 기능을 활용합니다.{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="사용자 지정 메트릭의 볼륨과 비용 이해 및 관리" >}}
    {{< nextlink href="metrics/metrics-without-limits/" >}}<u>Metrics without Limits™</u> - Metrics without Limits™를 사용하여 태그 구성을 통해 사용자 지정 메트릭 볼륨을 제어하는 방법을 알아봅니다.{{< /nextlink >}}
{{< /whatsnext >}}

## 개요 {#overview}
### 메트릭이란 무엇인가요? {#what-are-metrics}

메트릭은 지연 시간, 오류율, 사용자 가입 수 등 환경에 관한 모든 것을 시간 경과에 따라 추적할 수 있는 수치 값입니다.

Datadog에서는 메트릭 데이터가 값과 타임스탬프를 가진 데이터 포인트 형태로 수집 및 저장됩니다.

```text
[ 17.82,  22:11:01 ]
```

일련의 데이터 포인트는 시계열로 저장됩니다.

```text
[ 17.82,  22:11:01 ]
[  6.38,  22:11:12 ]
[  2.87,  22:11:38 ]
[  7.06,  22:12:00 ]
```

타임스탬프가 초 단위 미만인 모든 메트릭은 가장 가까운 초 단위로 반올림됩니다. 타임스탬프가 동일한 데이터 포인트가 여러 개 있는 경우 최신 데이터 포인트가 이전 포인트를 덮어씁니다.

### 메트릭이 유용한 이유 {#why-are-metrics-useful}

메트릭은 시스템의 전반적인 상태를 보여줍니다. 이를 사용하여 환경의 상태를 한눈에 평가할 수 있습니다. 예를 들어 사용자가 웹사이트를 얼마나 빠르게 로드하는지, 또는 서버의 평균 메모리 사용량이 얼마인지 시각화할 수 있습니다. 문제를 식별한 후에는 [로그][1] 및 [트레이싱][2]을 사용하여 추가 문제를 해결할 수 있습니다.

시스템 상태를 추적하는 메트릭은 Datadog과 {{< translate key="integration_count" >}} 개 이상의 서비스와의 통합을 통해 자동으로 수집됩니다. 또한 비즈니스에 특화된 메트릭(사용자 지정 메트릭이라고도 함)을 추적할 수도 있습니다. 사용자 로그인 수, 사용자 장바구니 크기, 팀의 코드 커밋 빈도와 같은 항목을 추적할 수 있습니다.

또한 메트릭은 고객 수요에 맞게 환경 규모를 조정하는 데 도움을 줍니다. 필요한 리소스 사용량을 정확히 파악하면 비용을 절감하거나 성능을 향상시킬 수 있습니다.

### Datadog에 메트릭 제출 {#submitting-metrics-to-datadog}

메트릭은 여러 위치에서 Datadog으로 전송할 수 있습니다.

- [Datadog에서 지원하는 통합][8]: Datadog의 {{< translate key="integration_count" >}}+ 통합에는 기본적으로 메트릭이 포함됩니다. 이러한 메트릭에 액세스하려면 서비스에 해당하는 통합 페이지로 이동하여 설치 지침을 따르세요. 예를 들어 EC2 인스턴스를 모니터링해야 하는 경우 [Amazon EC2 통합 설명서][9]로 이동하면 됩니다.

- Datadog 플랫폼 내에서 직접 메트릭을 생성할 수도 있습니다. 예를 들어 로그에 나타나는 오류 상태 코드를 집계하고 이를 Datadog에서 [새 메트릭으로 저장][10]할 수 있습니다.

- 또한 비즈니스와 관련된 메트릭(예: 사용자 로그인 수 또는 가입 수)을 추적해야 하는 경우가 많습니다. 이러한 경우 [사용자 지정 메트릭][11]을 생성할 수 있습니다. 사용자 지정 메트릭은 [Agent][12], [DogStatsD][13] 또는 [HTTP API][14]를 통해 제출할 수 있습니다.

- 또한 [Datadog Agent][15]는 여러 표준 메트릭(예: CPU 사용량 및 디스크 사용량)을 자동으로 전송합니다.

모든 메트릭 제출 소스 및 방법에 대한 요약은 [메트릭 유형 설명서][16]를 참조하세요.

### 메트릭 유형 및 실시간 메트릭 가시성 {#metric-types-and-real-time-metrics-visibility}

#### 메트릭 유형 {#metric-types}

Datadog은 서로 다른 사용 사례에 적합한 여러 메트릭 유형(count, gauge, rate, histogram, distribution)을 지원합니다. 메트릭 유형은 앱에서 해당 메트릭에 사용할 수 있는 그래프와 함수를 결정합니다.

Datadog Agent는 전송되는 모든 데이터 포인트에 대해 Datadog 서버로 별도의 요청을 보내지 않습니다. 대신 _플러시 시간 간격_ 동안 수집된 값을 보고합니다. 메트릭 유형은 이 시간 간격 동안 호스트에서 수집된 값이 제출을 위해 어떻게 집계되는지를 결정합니다.

**_count_** 유형은 시간 간격 동안 제출된 모든 값을 합산합니다. 예를 들어 웹사이트 방문 수를 추적하는 메트릭에 적합합니다.

**_rate_** 유형은 count 값을 시간 간격의 길이로 나눕니다. 이는 초당 방문 수를 알고 싶은 경우에 유용합니다.

**_gauge_** 유형은 해당 시간 간격 동안 보고된 마지막 값을 사용합니다. 이 유형은 RAM 사용량이나 CPU 사용량을 추적하는 데 적합합니다. 마지막 값만 사용해도 해당 시간 간격 동안 호스트의 동작을 대표적으로 보여줄 수 있기 때문입니다. 이 경우 _count_와 같은 다른 유형을 사용하면 부정확하고 과도한 값이 생성될 수 있습니다. 올바른 메트릭 유형을 선택하면 정확한 데이터를 확보할 수 있습니다.

**_histogram_**은 제출된 값을 요약하는 다섯 가지 값을 보고합니다. 즉, 평균, 개수, 중앙값, 95번째 백분위수 및 최댓값입니다. 이로 인해 다섯 개의 서로 다른 시계열이 생성됩니다. 이 메트릭 유형은 지연 시간과 같은 항목에 적합합니다. 이러한 경우 평균값만으로는 충분하지 않기 때문입니다. 히스토그램을 사용하면 모든 데이터 포인트를 기록하지 않고도 데이터가 어떻게 분포되어 있는지 이해할 수 있습니다.

**_distribution_**은 히스토그램과 유사하지만, 환경 내 모든 호스트에서 특정 시간 간격 동안 제출된 값을 종합하여 요약합니다. 또한 p50, p75, p90, p95, p99와 같은 여러 백분위수를 보고하도록 선택할 수 있습니다. 이 강력한 기능에 대한 자세한 내용은 [Distributions 설명서][19]를 참조하세요.

각 메트릭 유형에 대한 보다 자세한 예제와 제출 방법은 [메트릭 유형][16] 설명서를 참조하세요.

## 메트릭 쿼리 {#querying-metrics}

Datadog 전반, 예를 들면 [Metrics Explorer][3], [Dashboards][4] 또는 [Notebooks][5]에서 메트릭을 시각화하고 그래프를 생성할 수 있습니다.

**팁**: Datadog의 전역 검색에서 Metrics Summary 페이지를 열려면 <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>K</kbd>를 누른 다음 `metrics`를 검색하세요.

시계열 시각화 예시는 다음과 같습니다.

{{< img src="metrics/introduction/timeseries_example.png" alt="시계열 그래프는 여러 개의 급격한 상승 구간이 포함된 하나의 파란색 선으로 표현된 지연 시간 메트릭을 표시합니다." >}}

이 선 그래프는 y축에 사용자들이 경험한 지연 시간(밀리초 단위)을, x축에 시간을 표시합니다.

#### 추가 시각화 {#additional-visualizations}

Datadog은 사용자가 메트릭을 쉽게 그래프로 표시하고 나타낼 수 있도록 다양한 시각화 옵션을 제공합니다. 

메트릭 쿼리는 시작하기 위한 동일한 두 가지 평가 단계인 시간 집계와 공간 집계로 구성됩니다. 자세한 내용은 [메트릭 쿼리의 구조][6]를 참조하세요.

{{< whatsnext desc="Metrics 사용자가 자주 유용하게 활용하는 두 가지 시각화는 다음과 같습니다.">}}
    {{< nextlink href="dashboards/widgets/query_value/" >}}<u>쿼리 값 위젯</u> - 앞의 두 단계 결과를 하나의 값으로 축약합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/top_list/" >}}<u>상위 목록</u> - 각 그룹에 대해 단일 값을 반환합니다.{{< /nextlink >}}
{{< /whatsnext >}}

또한 Datadog은 시각화를 위한 다양한 그래프와 위젯 유형을 제공합니다. 이에 대한 자세한 내용은 Datadog의 [메트릭 그래프 관련 블로그 시리즈][7]에서 확인할 수 있습니다.

그래프 작성 경험은 대시보드, 노트북, 모니터 중 어느 것을 사용하더라도 동일합니다. 그래프는 그래프 편집기 UI를 사용하거나 원시 쿼리 문자열을 직접 수정하여 만들 수 있습니다. 쿼리 문자열을 편집하려면 맨 오른쪽의 `</>` 버튼을 사용하세요.

### 메트릭 쿼리의 구조 {#anatomy-of-a-metric-query}

Datadog의 메트릭 쿼리는 다음과 같은 형태입니다.

{{< img src="metrics/introduction/newanatomy.jpg" alt="색상으로 구분된 섹션이 포함된 예제 쿼리" style="width:70%;">}}

이 쿼리는 몇 가지 단계로 나누어 볼 수 있습니다.

#### 메트릭 이름 {#metric-name}

먼저 **Metric** 옆의 드롭다운에서 검색하거나 선택하여 그래프로 표시할 특정 메트릭을 선택합니다. 어떤 메트릭을 사용해야 할지 확실하지 않다면 Metrics Explorer 또는 노트북에서 시작해 보세요. Metrics Summary 페이지에서 현재 보고 중인 메트릭 목록도 확인할 수 있습니다..

#### 메트릭 필터링 {#filter-your-metric}

메트릭을 선택한 후에는 태그를 기준으로 쿼리를 필터링할 수 있습니다. 예를 들어 `account:prod`를 사용하여 프로덕션 호스트의 메트릭만 포함하도록 쿼리의 _범위_를 제한할 수 있습니다. 자세한 내용은 [태깅 설명서][17]를 참조하세요.

#### 시간 집계 구성 {#configure-time-aggregation}

다음으로 시간 롤업을 사용하여 데이터의 세밀도를 선택합니다. 이 예에서는 1시간(3,600초)마다 하나의 데이터 포인트가 생성되도록 정의되어 있습니다. 각 시간 버킷 내 데이터를 어떻게 집계할지 선택할 수 있습니다. 기본적으로 _avg_가 적용되지만, 사용할 수 있는 다른 옵션으로는 _sum_, _min_, _max_, _count_가 있습니다. 함수 또는 인앱 한정자를 사용하여 메트릭 데이터가 집계되고 버킷화되는 방식을 사용자 지정할 수도 있습니다. 예를 들어 max를 적용하고 캘린더 정렬 쿼리를 사용하여 메트릭 데이터의 시간 롤업 및 버킷화를 사용자 지정하려면 `.rollup(max, 60)`을 사용합니다. 자세한 내용은 [함수][24], [롤업][23], [인앱 한정자][25] 설명서를 참조하세요.

#### 공간 집계 구성 {#configure-space-aggregation}

Datadog에서 "공간"은 메트릭이 서로 다른 호스트와 태그에 걸쳐 분포되는 방식을 의미합니다. 제어할 수 있는 공간 집계의 요소는 애그리게이터와 그룹화 두 가지입니다.

_애그리게이터_는 각 그룹 내의 메트릭을 어떻게 결합할지 정의합니다. 사용 가능한 집계 방식은 sum, min, max, avg의 네 가지입니다.

_그룹화_는 그래프에서 무엇이 하나의 선을 구성하는지를 정의합니다. 예를 들어 수백 개의 호스트가 네 개의 리전에 분산되어 있는 경우, 리전별로 그룹화하면 각 리전마다 하나의 선을 그래프에 표시할 수 있습니다. 이 경우 시계열 수는 네 개로 줄어듭니다.

#### 함수 적용(선택사항) {#apply-functions-optional}

수학적 [함수][18]를 사용하여 그래프 값을 수정할 수 있습니다. 예를 들어 정수와 메트릭 간의 산술 연산(메트릭 값에 2를 곱하는 경우 등)을 수행할 수 있습니다. 또는 두 메트릭 간의 산술 연산을 수행할 수도 있습니다(예를 들어 메모리 사용률에 대한 새로운 시계열을 `jvm.heap_memory / jvm.heap_memory_max`와 같이 생성하는 경우).

### 시간 및 공간 집계 {#time-and-space-aggregation}

_시간 집계_와 _공간 집계_는 모든 쿼리의 중요한 구성 요소입니다. 이러한 집계 방식이 어떻게 작동하는지 이해하면 그래프를 잘못 해석하는 일을 방지할 수 있으므로, 아래에서 이 개념을 좀 더 자세히 설명합니다.

#### 시간 집계 {#time-aggregation}

Datadog은 매우 많은 양의 데이터 포인트를 저장하며, 대부분의 경우 이를 모두 그래프에 표시하는 것은 불가능합니다. 데이터 포인트 수가 화면의 픽셀 수보다 많아지기 때문입니다. Datadog은 이 문제를 해결하기 위해 데이터 포인트를 시간 버킷으로 결합하는 시간 집계를 사용합니다. 예를 들어 4시간 범위의 데이터를 조회하는 경우, 데이터 포인트는 2분 단위 버킷으로 결합됩니다. 이를 _롤업_이라고 합니다. 쿼리에서 정의한 시간 범위가 길어질수록 데이터의 세밀도는 낮아집니다.

각 시간 버킷 내의 데이터를 결합하는 데 사용할 수 있는 집계 방식은 sum, min, max, avg, count의 다섯 가지입니다.

중요한 점은 시간 집계가 수행하는 모든 쿼리에 _항상_ 적용된다는 것입니다.

#### 공간 집계 {#space-aggregation}

공간 집계는 호스트, 컨테이너, 리전 등의 태그를 기준으로 하나의 메트릭을 여러 시계열로 분할합니다. 예를 들어 EC2 인스턴스의 지연 시간을 리전별로 확인하려면, 공간 집계의 기능별 그룹화를 사용하여 각 리전의 호스트를 결합해야 합니다.

공간 집계에서 사용할 수 있는 애그리게이터는 _sum_, _min_, _max_, _avg_의 네 가지입니다. 위 예에서 호스트가 us-east-1, us-east-2, us-west-1, us-west-2의 네 개 리전에 분산되어 있다고 가정해 보겠습니다. 각 리전의 호스트는 애그리게이터 함수를 사용하여 결합되어야 합니다. _max_ 애그리게이터를 사용하면 각 리전의 호스트에서 발생한 최대 지연 시간이 계산되고, _avg_ 애그리게이터를 사용하면 각 리전의 평균 지연 시간이 계산됩니다.

#### 중첩된 쿼리 {#nested-queries}
UI 또는 [API][27]를 통해 중첩된 쿼리를 사용하면 기존 쿼리 결과에 대해 시간 및 공간 차원에서 추가 집계 레이어를 적용할 수 있습니다. 자세한 내용은 [중첩된 쿼리][26] 설명서를 참조하세요.


### 메트릭에 대한 실시간 정보 확인 {#view-real-time-information-about-metrics}

[Metrics Summary 페이지][20]에는 지정된 기간(지난 1시간, 1일 또는 1주일) 동안 Datadog에 보고된 메트릭 목록이 표시됩니다. 메트릭은 메트릭 이름 또는 태그를 기준으로 필터링할 수 있습니다.

메트릭 이름을 클릭하면 보다 상세한 정보를 제공하는 세부 정보 사이드 패널이 표시됩니다. 세부 정보 사이드 패널에는 메타데이터(유형, 단위, 간격), 고유 메트릭 수, 보고 중인 호스트 수, 제출된 태그 수, 그리고 해당 메트릭에 대해 제출된 모든 태그가 포함된 표 등 해당 메트릭의 주요 정보가 표시됩니다. 메트릭에 대해 어떤 태그가 제출되고 있는지 확인하면 해당 메트릭에서 보고되는 고유 메트릭 수를 이해하는 데 도움이 됩니다. 이 수치는 태그 값 조합에 따라 달라지기 때문입니다.

**참고:** Metrics Summary의 세부 정보 사이드 패널에 표시되는 고유 메트릭 수는 청구 금액을 결정하는 기준이 아닙니다. 지난 한 달간의 실제 사용량에 대한 정확한 정보는 [사용량 세부 정보][21]에서 확인하세요.

자세한 정보는 [메트릭 요약 설명서][22]를 참조하세요.

## 추가 자료 {#further-reading}

{{< whatsnext desc="메트릭에 대해 계속 학습하려면 다음 설명서를 참조하세요.">}}
    {{< nextlink href="/metrics/advanced-filtering" >}}<u>고급 필터링</u> - 데이터를 필터링하여 반환되는 메트릭의 범위를 좁힙니다.{{< /nextlink >}}
    {{< nextlink href="/metrics/distributions" >}}<u>Distribution 메트릭</u> - 전체 데이터 세트에 대해 전역 백분위수를 계산합니다.{{< /nextlink >}}
    {{< nextlink href="metrics/metrics-without-limits/" >}}<u>Metrics without Limits™</u> - Metrics without Limits™를 사용하여 태그 구성을 통해 사용자 지정 메트릭 볼륨을 제어하는 방법을 알아봅니다.{{< /nextlink >}}
    {{< nextlink href="https://dtdg.co/fe" >}}<u>Foundation Enablement</u> - 대화형 세션에 참여하여 메트릭의 잠재력을 최대한 활용하세요.{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/getting-started-metrics" >}}<u>Metrics 시작하기</u> - Datadog에서 첫 번째 메트릭을 제출하고 시각화하는 방법을 알아봅니다.{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /ko/logs
[2]: /ko/tracing/
[3]: /ko/metrics/explorer/
[4]: /ko/dashboards/
[5]: /ko/notebooks/
[6]: https://docs.datadoghq.com/ko/metrics/#anatomy-of-a-metric-query
[7]: https://www.datadoghq.com/blog/timeseries-metric-graphs-101/
[8]: /ko/integrations/
[9]: /ko/integrations/amazon_ec2/
[10]: /ko/logs/logs_to_metrics/
[11]: /ko/metrics/custom_metrics/
[12]: /ko/agent/
[13]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/
[14]: /ko/api/
[15]: https://docs.datadoghq.com/ko/agent/basic_agent_usage/
[16]: /ko/metrics/types/
[17]: /ko/getting_started/tagging/using_tags/
[18]: /ko/dashboards/functions/
[19]: /ko/metrics/distributions/
[20]: https://app.datadoghq.com/metric/summary
[21]: /ko/account_management/plan_and_usage/usage_details/
[22]: /ko/metrics/summary/
[23]: /ko/dashboards/functions/rollup/#rollup-with-calendar-aligned-queries
[24]: /ko/dashboards/functions/
[25]: /ko/metrics/custom_metrics/type_modifiers/?tab=count#in-application-modifiers
[26]: /ko/metrics/nested_queries
[27]: https://docs.datadoghq.com/ko/api/latest/metrics/#query-timeseries-data-across-multiple-products