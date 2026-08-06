---
aliases:
- /ko/graphing/using_graphs/
description: 인사이트를 얻기 위한 데이터 쿼리
further_reading:
- link: https://learn.datadoghq.com/courses/building-better-dashboards
  tag: 학습 센터
  text: 더 나은 대시보드 빌드
title: 쿼리
---
## 개요 {#overview}

메트릭, 로그, 트레이스, 모니터링, 대시보드, 노트북 등 어떤 기능을 사용하든 Datadog의 모든 그래프는 동일한 기본 기능을 제공합니다. 이 페이지에서는 그래픽 편집기를 사용한 쿼리 방법을 설명합니다. 고급 사용자는 JSON을 사용하여 그래프를 생성하고 편집할 수 있습니다. 자세한 내용은 [JSON을 사용한 그래프 작성][1]을 참조하세요.

대시보드 또는 노트북 페이지에서 그래프 편집기를 사용하여 쿼리를 실행할 수 있으며, 또는 모든 페이지에서 사용할 수 있는 {{< ui >}}Quick Graphs{{< /ui >}}를 사용할 수도 있습니다. 모든 페이지에서 `G` 키를 눌러 Quick Graphs를 엽니다. 자세한 내용은 [Quick Graphs 가이드][2]를 참조하세요.

## 그래프 편집기 {#graphing-editor}

위젯에서 오른쪽 상단에 있는 연필 아이콘을 클릭하여 그래프 편집기를 엽니다. 그래프 편집기에는 다음과 같은 탭이 있습니다.

* {{< ui >}}Share{{< /ui >}}: 그래프를 외부 웹 페이지에 포함합니다.
* {{< ui >}}JSON{{< /ui >}}: 그래프 정의 언어에 대한 이해가 필요한 보다 유연한 편집기입니다.
* {{< ui >}}Edit{{< /ui >}}: 그래프 옵션을 설정하는 기본 UI 탭입니다.

그래프 편집기를 처음 열면 {{< ui >}}Edit{{< /ui >}} 탭이 표시됩니다. 여기에서 UI를 사용하여 대부분의 설정을 선택할 수 있습니다. 여기에 예시가 있습니다.

{{< img src="dashboards/querying/references-graphing-edit-window-with-y-2.png" alt="Graphing Edit 탭" style="width:100%;" >}}

## 그래프 구성 {#configuring-a-graph}

대시보드에서 그래프를 구성하려면 다음 과정을 따릅니다.

1. [시각화 선택](#select-your-visualization)
2. [메트릭 정의](#define-the-metric)
3. [메트릭 필터링](#filter)
4. [시간 집계 설정](#configure-the-time-aggregation)
5. [공간 집계 설정](#configure-the-space-aggregation)
6. [함수 적용](#advanced-graphing)
7. [그래프 제목 지정](#create-a-title)

### 시각화 선택 {#select-your-visualization}

사용 가능한 [위젯][3] 중에서 원하는 시각화를 선택합니다.

### 메트릭 정의 {#define-the-metric}

{{< ui >}}Metric{{< /ui >}} 옆의 드롭다운에서 검색하거나 선택하여 그래프로 표시할 메트릭을 지정합니다. 어떤 메트릭을 사용해야 할지 모르는 경우 메트릭 드롭다운에서 `unit`, `type`, `interval`, `description`, `tags`, `tag values`와 같은 추가 정보를 확인할 수 있습니다.

Datadog 또는 OpenTelemetry 소스 지표도 표시될 수도 있습니다. 환경에서 Datadog과 OpenTelemetry를 모두 사용하는 경우 Datadog의 [텔레메트리 소스][19] 쿼리 수정자를 사용하여 단일 그래프에서 [Datadog 및 OpenTelemetry 메트릭 전반의 쿼리][18]를 수행할 수 있습니다.

{{< img src="dashboards/querying/metric_dropdown.png" alt="메트릭 선택기 드롭다운" responsive="true" style="width:100%;">}}

[Metrics Explorer][4], [노트북][5]을 사용하여 메트릭을 자세히 살펴보거나, [Metrics Summary][6] 페이지에서 메트릭 목록을 확인하세요.

### 필터 {#filter}

선택한 메트릭은 메트릭 오른쪽의 {{< ui >}}from{{< /ui >}} 드롭다운을 사용하여 호스트 또는 태그 기준으로 필터링할 수 있습니다. 기본 필터는 *(everywhere)*입니다.

{{< img src="dashboards/querying/filter-3.png" alt="템플릿 변수와 부울 논리를 사용하여 'from' 필드에서 그래프 필터링" style="width:100%;" >}}

- `from` 드롭다운 내에서 [고급 필터링][7]을 사용해 부울 필터 또는 와일드카드로 필터링된 쿼리를 평가합니다.
- 템플릿 변수를 사용하여 동적으로 쿼리를 필터링합니다. 태그 키와 함께 `$`를 추가하면 템플릿 변수 드롭다운에서 선택한 태그가 그래프에 자동 적용됩니다. 자세한 내용은 [템플릿 변수 설명서][8]를 참조하세요.

태그에 대한 자세한 내용은 [태깅 설명서][9]를 참조하세요.

### 집계 및 롤업 {#aggregate-and-rollup}

#### 집계 방식 {#aggregation-method}

집계 방식은 필터 드롭다운 옆에 있습니다. 기본값은 `avg by`이지만, 방법을 `max by`, `min by` 또는 `sum by`로 변경할 수 있습니다. 대부분의 경우 메트릭은 여러 호스트 또는 인스턴스에서 수집되므로 동일한 시간 간격에 여러 값이 존재합니다. 선택한 집계 방식에 따라 메트릭이 하나의 선으로 집계되는 방식이 결정됩니다.

#### 시간 집계 설정 {#configure-the-time-aggregation}

위의 어떤 옵션을 선택하더라도 그래프를 표시하는 화면 크기 제약으로 인해 데이터는 항상 어느 정도 집계됩니다. 예를 들어 메트릭이 매초 업데이트되고 4시간의 데이터를 보고 있다면 모든 데이터를 표시하려면 14,400개의 데이터 포인트가 필요합니다. 그러나 그래프에는 일반적으로 약 300개의 데이터 포인트만 표시됩니다. 따라서 화면에 표시되는 각 포인트는 약 48개의 실제 데이터 포인트를 나타냅니다.

실제로 메트릭은 Agent에 의해 15~20초마다 수집됩니다. 따라서 하루치 데이터는 약 4,320개의 데이터 포인트가 됩니다. 하루치 데이터를 하나의 그래프에 표시하면 Datadog은 자동으로 데이터를 롤업합니다. 시간 집계에 대한 자세한 내용은 [Metrics 소개][10]를 참조하세요. 롤업 간격과 Datadog이 데이터 포인트를 자동으로 롤업하는 방법에 대한 자세한 내용은 [Rollup][11] 설명서를 참조하세요.

데이터를 수동으로 롤업하려면 [rollup 함수][12]를 사용합니다. 시그마 아이콘을 클릭하여 함수를 추가한 후 드롭다운 메뉴에서 `rollup`을 선택합니다. 그런 다음 원하는 집계 방식과 롤업 간격(초)을 지정합니다.

이 쿼리는 평균적으로 1분 버킷에 롤업되는 모든 머신에 대해 사용 가능한 총 디스크 공간을 나타내는 단일 선을 생성합니다.

{{< img src="dashboards/querying/references-graphing-rollup-example-minutes.png" alt="모든 시스템에 대한 system.disk.free 메트릭의 롤업 예제" style="width:100%;">}}

JSON 보기로 전환하면 쿼리의 형태는 다음과 같습니다.

```text
"query": "avg:system.disk.free{*}.rollup(avg, 60)"
```

전체 JSON은 다음과 같습니다.

```text
{
    "viz": "timeseries",
    "requests": [
        {
            "formulas": [
                {
                    "formula": "query1"
                }
            ],
            "queries": [
                {
                    "data_source": "metrics",
                    "name": "query1",
                    "query": "avg:system.disk.free{*}.rollup(avg, 60)"
                }
            ],
            "response_format": "timeseries",
            "type": "line",
            "style": {
                "palette": "dog_classic",
                "type": "solid",
                "width": "normal"
            }
        }
    ],
    "yaxis": {
        "scale": "linear",
        "min": "auto",
        "max": "auto",
        "include_zero": true,
        "label": ""
    },
    "markers": []
}
```

JSON 보기 사용에 대한 자세한 내용은 [JSON을 사용한 그래프 작성][1]을 참조하세요.

#### 공간 집계 설정 {#configure-the-space-aggregation}

집계 방식 드롭다운 옆에서 그래프의 선 또는 그룹을 구성하는 기준을 선택합니다. 예를 들어, `host`를 선택하면 각 `host`마다 하나의 선이 생성됩니다. 각 선은 선택한 메트릭으로 특정 `host`에 대해 선택한 집계 방법으로 집계한 결과입니다.

또한 [메트릭 정의](#define-the-metric) 단계에서 사용한 메트릭 드롭다운의 태그를 클릭하여 데이터를 그룹화하고 집계할 수 있습니다.

### 중첩된 쿼리 {#nested-queries}

Datadog의 중첩된 쿼리 기능을 사용하면 기존 메트릭 쿼리 결과에 추가적인 시간 및/또는 공간 집계 계층을 적용할 수 있습니다. 이 고급 쿼리 기능을 사용하면 count/rate/gauge 유형 메트릭의 집계 결과에 대해 백분위수 및 표준 편차를 계산할 수 있으며, 과거 기간에 대한 더 높은 해상도의 쿼리에도 접근할 수 있습니다.

더 자세한 내용은 [중첩된 쿼리][13] 설명서를 참고하세요.


### 고급 그래프 작성 {#advanced-graphing}

분석 필요에 따라 쿼리에 추가 수학 함수를 적용할 수 있습니다. 예를 들면 rate, derivative, smoothing 등이 있습니다. [사용 가능한 함수 목록][14]을 참조하세요.

Datadog은 메트릭, 로그, 트레이스 및 기타 데이터 소스를 다양한 산술 연산 및 비교 함수와 함께 시각화하는 기능도 지원합니다. `+`, `-`, `/`, `*`, `minimum()`, `maximum()`을 사용하여 그래프에 표시되는 값을 수정합니다. 이 구문은 정수 값뿐 아니라 여러 메트릭 간 산술 연산도 지원합니다.

메트릭을 각각 별도로 표시하려면 쉼표(`,`)를 사용하세요. 예를 들어, `a, b, c`입니다.

**참고**: 쉼표를 사용하는 쿼리는 시각화에서만 지원되며 모니터링에서는 사용할 수 없습니다. 모니터링에서는 여러 메트릭을 결합하기 위해 [부울 연산자][15] 또는 산술 연산을 사용하세요.

#### 정수를 사용한 메트릭 산술 연산 {#metric-arithmetic-using-an-integer}

산술 연산을 수행하여 그래프에 표시되는 메트릭 값을 수정할 수 있습니다. 예를 들어 특정 메트릭의 두 배 값을 시각화하려면 그래프 편집기에서 {{< ui >}}Advanced...{{< /ui >}} 링크를 클릭합니다. 그런 다음 `Formula` 입력란에 다음과 같이 입력합니다. `a * 2`

{{< img src="dashboards/querying/arithmetic_4.png" alt="수식 예제 - 곱셈" style="width:75%;" >}}

#### 두 메트릭 간 산술 연산 {#arithmetic-between-two-metrics}

한 메트릭을 다른 메트릭으로 나누어 메트릭의 백분율을 시각화합니다. 예를 들면 다음과 같습니다.

```text
jvm.heap_memory / jvm.heap_memory_max
```

그래프 편집기에서 {{< ui >}}Advanced...{{< /ui >}} 옵션을 사용하고 {{< ui >}}Add Query{{< /ui >}}를 선택합니다. 각 쿼리에는 알파벳 순서로 하나의 문자가 할당됩니다. 예를 들어, 첫 번째 메트릭은 `a`로 표시되고 두 번째 메트릭은 `b`로 표시됩니다.

그런 다음 `Formula` 입력란에 산술(이 예제의 경우 `a / b`)을 입력합니다. 수식 결과만 표시하려면 [시각화에서 쿼리 숨기기](#hide-a-query-from-the-visualization)를 참조하세요.

{{< img src="dashboards/querying/arithmetic_5.png" alt="수식 예제 - 비율" style="width:75%;" >}}

또 다른 예로 `error` 로그와 `info` 로그의 비율을 그래프로 표시할 수 있습니다.

```text
status:error / status:info
```

{{< img src="dashboards/querying/arithmetic_6.png" alt="수식 예제 - 로그 비율" style="width:75%;" >}}

**참고**: 수식에는 문자가 할당되지 않습니다. 수식 간에는 산술 연산을 수행할 수 없습니다.

#### 시각화에서 쿼리 숨기기{#hide-a-query-from-the-visualization}

위젯에 여러 쿼리와 수식이 있는 경우 개별 쿼리를 숨겨 수식 결과만 그래프에 표시할 수 있습니다. 쿼리의 문자 레이블을 클릭하여 그래프에서 표시 여부를 전환합니다. 파란색 레이블은 쿼리가 표시되고 있음을 의미하며, 회색 레이블은 숨겨져 있음을 의미합니다. 숨겨진 쿼리는 여전히 수식 계산에 사용됩니다.

#### 두 쿼리 간 최소값 또는 최대값 {#minimum-or-maximum-between-two-queries}

`minimum()` 및 `maximum()`을 사용하여 두 쿼리를 시점별로 비교하고 각 타임스탬프에서 더 낮거나 더 높은 값을 반환할 수 있습니다.

**참고**: 산술 비교를 위해 `min()` 및 `max()`를 사용하는 방식은 더 이상 사용되지 않습니다. 대신 `minimum()` 및 `maximum()`을 사용하세요. 이 사용 중단 사항은 산술 비교 구문에만 적용됩니다. `min by`, `max by`과 같은 집계 방식 및 `min`, `max`를 사용하는 중첩된 쿼리 집계 방식은 변경되지 않습니다.

다음은 `maximum()`을 사용하여 두 Availability Zone 간 최대 CPU 사용량을 찾는 예제입니다.

```text
maximum(system.cpu.user{availability-zone:eastus-1}, system.cpu.user{availability-zone:eastus-2})
```

{{< img src="dashboards/querying/minmax_metrics_example.png" alt="두 메트릭 쿼리 중 더 높은 값을 표시하는 '최대값' 수식 예제" style="width:75%;" >}}

또한 서로 다른 제품의 두 쿼리 간 최소값도 계산할 수 있습니다. 다음은 `minimum()`을 사용하여 오류 상태 로그와 경고 상태 로그 간 최소값을 찾는 예입니다.

```text
minimum(status:error, status:warn)
```

{{< img src="dashboards/querying/minmax_logs_platform_example.png" alt="두 로그 쿼리 중 더 낮은 값을 표시하는 '최소값' 수식 예제" style="width:75%;" >}}

### 별칭 생성 {#create-an-alias}

그래프 결과를 더 쉽게 해석할 수 있도록 데이터 소스에 대한 사용자 지정 별칭을 만들 수 있습니다.

{{< img src="dashboards/querying/custom_alias.png" alt="사용자 지정 별칭" style="width:75%;" >}}

### 제목 생성 {#create-a-title}

제목을 입력하지 않으면 선택한 설정에 따라 자동으로 제목이 생성됩니다. 그러나 그래프의 목적을 설명하는 제목을 직접 작성하는 것이 좋습니다.

### 저장 {#save}

{{< ui >}}Done{{< /ui >}}를 클릭하여 작업을 저장하고 편집기를 종료합니다. 나중에 언제든지 편집기로 돌아와 그래프를 수정할 수 있습니다. 저장하지 않을 변경 사항이 있다면 {{< ui >}}Cancel{{< /ui >}}을 클릭합니다.

## 추가 옵션 {#additional-options}

### 이벤트 오버레이 {#event-overlays}

{{< img src="/dashboards/querying/event_overlay_example.png" alt="배포 이벤트가 오버레이된 RUM 오류율을 보여주는 시계열 위젯" style="width:100%;" >}}

[시계열][16] 시각화에서 그래프 편집기의 {{< ui >}}Event Overlays{{< /ui >}} 섹션을 사용하여 이벤트 상관관계를 확인할 수 있습니다. 검색 필드에 텍스트 또는 구조화된 검색 쿼리를 입력합니다. 이벤트 검색은 [로그 검색 구문][17]을 사용합니다.

이벤트 오버레이는 모든 데이터 소스를 지원합니다. 이를 통해 비즈니스 이벤트와 Datadog 서비스의 데이터 간의 상관관계를 더 쉽게 파악할 수 있습니다.

이벤트 오버레이를 사용하면 조직 내의 작업이 애플리케이션 및 인프라스트럭처 성능에 어떤 영향을 미치는지 빠르게 확인할 수 있습니다. 다음은 몇 가지 사용 사례입니다.
- 오버레이된 배포 이벤트와 RUM 오류율
- 추가 서버 프로비저닝과 관련된 이벤트와 CPU 사용량 상호 연결
- 송신 트래픽을 의심스러운 로그인 활동과 상호 연결
- Datadog에 적절한 경보가 구성되어 있는지 확인하기 위해 모든 시계열 데이터와 모니터링 경보를 상호 연결


### 분할 그래프 {#split-graph}

분할 그래프를 사용하면 메트릭 시각화를 태그별로 구분하여 볼 수 있습니다.

{{< img src="dashboards/querying/split_graph_beta.png" alt="전체 화면 위젯에서 metric container.cpu.usage 메트릭의 분할 그래프 보기" style="width:100%;" >}}

1. 그래프를 확인할 때 {{< ui >}}Split Graph{{< /ui >}} 탭을 통해 이 기능에 액세스하세요.
1. {{< ui >}}sort by{{< /ui >}} 메트릭을 변경하여 그래프로 표시하는 데이터와 다른 메트릭 간의 관계를 확인할 수 있습니다.
1. {{< ui >}}limit to{{< /ui >}} 값을 변경하여 표시되는 그래프 수를 제한합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/dashboards/graphing_json/
[2]: /ko/dashboards/guide/quick-graphs/
[3]: /ko/dashboards/widgets/
[4]: https://app.datadoghq.com/metric/explorer
[5]: https://app.datadoghq.com/notebook/list
[6]: https://app.datadoghq.com/metric/summary
[7]: /ko/metrics/advanced-filtering/
[8]: /ko/dashboards/template_variables/
[9]: /ko/getting_started/tagging/
[10]: /ko/metrics/#time-aggregation
[11]: /ko/dashboards/functions/rollup/#rollup-interval-enforced-vs-custom
[12]: /ko/dashboards/functions/rollup/
[13]: /ko/metrics/nested_queries/
[14]: /ko/dashboards/functions/#function-types
[15]: /ko/metrics/advanced-filtering/#boolean-filtered-queries
[16]: /ko/dashboards/widgets/timeseries/#event-overlay
[17]: /ko/logs/explorer/search_syntax/
[18]: /ko/metrics/open_telemetry/query_metrics
[19]: /ko/dashboards/functions/telemetry_source/