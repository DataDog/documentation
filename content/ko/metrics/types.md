---
algolia:
  tags:
  - metric types
aliases:
- /ko/developers/metrics/counts/
- /ko/developers/metrics/distributions/
- /ko/developers/metrics/gauges/
- /ko/developers/metrics/histograms/
- /ko/developers/metrics/rates/
- /ko/developers/metrics/sets/
- /ko/developers/metrics_type/
- /ko/developers/metrics/metrics_type/
- /ko/developers/metrics/types/
further_reading:
- link: extend/dogstatsd
  tag: 설명서
  text: DogStatsD에 대해 자세히 알아보기
- link: /metrics/units
  tag: 설명서
  text: 메트릭 단위
- link: extend/libraries
  tag: 설명서
  text: 공식 및 커뮤니티에서 생성한 API 및 DogStatsD 클라이언트 라이브러리
title: 메트릭 유형
---
## 개요 {#overview}

Datadog에 제출되는 각각의 메트릭에는 유형이 있어야 합니다. 메트릭의 유형은 쿼리되었을 때 메트릭 값이 표시되는 방식에 영향을 미치고, 추가적인 [한정자][1] 및 [f함수][2]를 사용하여 Datadog 안에서 관련 그래픽을 작성할 가능성에도 영향을 미칩니다. 메트릭의 유형은 [Metrics Summary 페이지][3]에 주어진 메트릭에 대한 세부 정보 사이드 패널에 표시됩니다.

**참고**: 이 세부 정보 사이드 패널에서 메트릭 유형을 변경하면 기존의 모든 시각화 및 모니터에서 메트릭 동작이 변경될 수 있고, 나아가 이전 데이터가 유의미하지 않게 될 수 있습니다.

허용되는 메트릭 제출 유형은 다음과 같습니다.

- [COUNT](?tab=count#metric-types)
- [RATE](?tab=rate#metric-types)
- [GAUGE](?tab=gauge#metric-types)
- [SET][4]
- [HISTOGRAM](?tab=histogram#metric-types)
- [DISTRIBUTION](?tab=distribution#metric-types)

이러한 각기 다른 메트릭 제출 유형은 Datadog 웹 애플리케이션 내에서 찾을 수 있는 4개의 인앱 메트릭 유형으로 매핑됩니다.

- COUNT
- RATE
- GAUGE
- DISTRIBUTION

**참고**: 유형 없이 메트릭을 Datadog에 제출하면 해당 메트릭 유형은 Datadog 안에서 `Not Assigned`로 표시됩니다. `Not Assigned` 메트릭 유형은 첫 번째 메트릭 유형이 제출될 때까지 다른 인앱 유형으로 추가 변경할 수 없습니다.

## 제출 vs. 인앱 유형 {#submission-vs-in-app-type}

메트릭이 Datadog에 제출되는 방식은 크게 다음과 같이 세 가지입니다.

- [Agent check][5]
- [DogStatsD][6]
- [Datadog's HTTP API][7]

Datadog이 수신하는 데이터의 대부분은 Agent가 제출한 것으로, Agent 검사 또는 DogStatsD를 통합니다. 이러한 제출 방법의 경우, 메트릭의 유형에 따라 Agent에서 [플러시 시간 간격][8] 동안 수집된 여러 값이 집계되는 방식이 결정됩니다. Agent가 이러한 값을 해당 간격을 대표하는 단일 메트릭 값으로 결합합니다. 이렇게 결합된 값이 Datadog에 하나의 타임스탬프와 함께 저장됩니다.

Datadog API에 직접 제출되는 데이터는 Datadog이 집계하지 않습니다(단, distribution 메트릭은 예외). Datadog으로 전송된 원시 값은 있는 그대로 저장됩니다.

다양한 메트릭 제출 유형이 해당하는 인앱 유형으로 매핑되는 방식에 관한 자세한 내용은 [제출 유형 및 Datadog 인앱 유형](#submission-types-and-datadog-in-app-types) 섹션을 참조하세요.

## 메트릭 유형 {#metric-types}

### 정의 {#definition}

{{< tabs >}}
{{% tab "COUNT" %}}

COUNT 메트릭 제출 유형은 하나의 시간 간격에서 이벤트 발생 총 횟수를 나타냅니다. COUNT를 사용하여 데이터베이스에 대한 총 연결 횟수 또는 엔드포인트에 대한 총 요청 개수를 추적할 수 있습니다. 이 이벤트 수는 시간이 흐르면 축적되거나 감소할 수 있고, 단조롭게 증가하지 않습니다.

**참고**: COUNT는 RATE 메트릭 유형과 다릅니다. 후자는 정의된 시간 간격이 주어졌을 때 초당 정규화된 이벤트 발생 수를 나타냅니다.

{{% /tab %}}
{{% tab "RATE" %}}

RATE 메트릭 제출 유형은 하나의 시간 간격에서 초당 이벤트 발생 총 횟수를 나타냅니다. RATE를 사용하여 어떤 일이 얼마나 자주 발생하는지 추적할 수 있습니다. 예를 들면 데이터베이스에 대한 연결 빈도, 엔드포인트에 대한 요청 흐름 빈도 등이 있습니다.

**참고**: RATE는 COUNT 메트릭 제출 유형과 다릅니다. 후자는 주어진 시간 간격에서 이벤트 발생 총 건수를 나타냅니다.

{{% /tab %}}
{{% tab "GAUGE" %}}

GAUGE 메트릭 제출 유형은 하나의 시간 간격에서의 이벤트 스냅샷을 나타냅니다. 이 대표적 스냅샷 값이 하나의 시간 간격 동안 Agent에 제출된 마지막 값입니다. GAUGE를 사용하여 연속해서 보고되는 대상을 측정할 수 있습니다. 예를 들어 사용 가능한 디스크 공간이나 사용한 메모리 양이 있습니다.

{{% /tab %}}
{{% tab "HISTOGRAM" %}}

HISTOGRAM 메트릭 제출 유형은 하나의 시간 간격 동안 Agent 측에서 계산된 값 세트의 통계적 분포도를 나타냅니다. Datadog의 HISTOGRAM 메트릭 유형은 StatsD timing 메트릭 유형의 확장판입니다. Agent는 정의된 시간 간격 안에 전송된 값을 집계하여 값 세트를 대표하는 여러 가지 메트릭을 생성합니다.

주어진 시간 간격의 HISTOGRAM 메트릭 `<METRIC_NAME>`에 대하여 `X` 값을 전송하면 Agent가 기본적으로 다음과 같은 메트릭을 생성합니다.

`<METRIC_NAME>.avg`
: 시간 간격의 해당 `X` 값 평균을 나타냅니다.<br>
**Datadog 인앱 유형**: GAUGE

`<METRIC_NAME>.count`
: 간격 중에 제출된 값의 수 `X`를 나타냅니다. Agent는 이 숫자를 RATE로 제출해 앱에 `X/interval` 값으로 표시되게 합니다. <br>
**Datadog 인앱 유형**: RATE

`<METRIC_NAME>.median`
: 시간 간격의 해당 `X` 값 중앙값을 나타냅니다.<br>
**Datadog 인앱 유형**: GAUGE

`<METRIC_NAME>.95percentile` 
: 시간 간격의 해당 `X` 값 95번째 백분위수를 나타냅니다.<br>
**Datadog 인앱 유형**: GAUGE

`<METRIC_NAME>.max`
:시간 간격에 전송된 해당 `X` 값의 최댓값을 나타냅니다.<br>
**Datadog 인앱 유형**: GAUGE

**참고**:

- Datadog에 어느 집계를 전송하고자 하는지 [`datadog.yaml` 구성 파일][1]의 `histogram_aggregates` 파라미터를 사용해 구성하세요.. 기본적으로 `max`, `median`, `avg`, `count` 집계만 Datadog에 전송됩니다. `sum` 및 `min`도 사용할 수 있습니다.
- Datadog에 어느 백분위수 집계를 전송하고자 하는지 [`datadog.yaml` 구성 파일][2]의 `histogram_percentiles` 파라미터를 사용해 구성하세요. 기본적으로 `95percentile`만 Datadog에 전송됩니다.


[1]: https://github.com/DataDog/datadog-agent/blob/04d8ae9dd4bc6c7a64a8777e8a38127455ae3886/pkg/config/config_template.yaml#L106-L114
[2]: https://github.com/DataDog/datadog-agent/blob/04d8ae9dd4bc6c7a64a8777e8a38127455ae3886/pkg/config/config_template.yaml#L116-L121
{{% /tab %}}
{{% tab "DISTRIBUTION" %}}

DISTRIBUTION 메트릭 제출 유형은 시간 간격 하나 동안 분산된 인프라 구조 전체에서 계산된 값 세트의 전역 통계 분포를 나타냅니다. DISTRIBUTION을 사용하여 서비스와 같은 논리적 개체를 계측할 수 있습니다(기본 호스트와 별도로).

주어진 시간 간격 동안 Agent에서 집계를 수행하는 HISTOGRAM 메트릭 유형과 달리 DISTRIBUTION 메트릭은 한 시간 간격 동안의 원시 데이터를 모두 Datadog에 전송합니다. 집계는 서버 측에서 수행합니다. 기본 데이터 구조가 원시, 집계되지 않은 데이터를 나타내기 때문에 distribution을 사용하면 두 가지 중요한 기능이 제공됩니다.

- 백분위수 집계 계산
- 태깅 사용자 지정

주어진 시간 간격에서 DISTRIBUTION 메트릭 `<METRIC_NAME>`에 대하여 `X` 값을 전송하면 기본적으로 다음과 같은 집계를 쿼리에 사용할 수 있습니다.

`avg:<METRIC_NAME>`
: 시간 간격의 해당 `X` 값 평균을 나타냅니다.<br>
**Datadog 인앱 유형**: GAUGE

`count:<METRIC_NAME>`
: 시간 간격에 제출된 포인트 수, `X`를 나타냅니다. 그러면 Agent가 해당 값을 COUNT로 전송합니다.<br>
**Datadog 인앱 유형**: COUNT

`max:<METRIC_NAME>`
: 시간 간격에 전송된 해당 `X` 값의 최댓값을 나타냅니다.<br>
**Datadog 인앱 유형**: GAUGE

`min:<METRIC_NAME>`
: 시간 간격에 전송된 해당 `X`의 최솟값을 나타냅니다.<br>
**Datadog 인앱 유형**: GAUGE

`sum:<METRIC_NAME>`
: 시간 간격에 전송된 모든 `X` 값의 합계를 나타냅니다.<br>
**Datadog 인앱 유형**: COUNT

**참고**: distribution 메트릭 값의 집계가 gauge 또는 인앱 count로 다양하게 _표시되지만_ 메트릭 자체는 `DISTRIBUTION` 유형을 유지합니다.

{{% /tab %}}
{{< /tabs >}}

### 예시 {#example}

{{< tabs >}}
{{% tab "COUNT" %}}

Datadog Agent에서 실행 중인 단일 호스트에서 COUNT 메트릭 `notifications.sent`를 제출한다고 가정하겠습니다. 이 호스트는 플러시 시간 간격 동안 다음 값을 발생시킵니다. `[1,1,1,2,2,2,3,3]`.

Agent는 한 시간 간격에 수신된 값을 모두 더합니다. 그런 다음 총 숫자(이 경우 `15`)를 COUNT 메트릭의 값으로 제출합니다.

{{% /tab %}}
{{% tab "RATE" %}}

Datadog Agent에서 실행 중인 단일 호스트에서 RATE 메트릭 `queue_messages.rate`를 제출한다고 가정하겠습니다. 이 호스트는 플러시 시간 간격 동안 다음 값을 발생시킵니다. `[1,1,1,2,2,2,3,3]`.

Agent는 한 시간 간격에 수신된 값을 모두 더합니다. 그런 다음 총 숫자를 이 시간 간격의 초 수로 나눈 값을 제출합니다. 이 경우, 플러시 간격이 10초라면 RATE 메트릭의 값으로 제출되는 값은 `1.5`가 됩니다.

{{% /tab %}}
{{% tab "GAUGE" %}}

Datadog Agent에서 실행 중인 단일 호스트에서 GAUGE 메트릭 `temperature`를 제출한다고 가정하겠습니다. 이 호스트는 플러시 시간 간격 동안 다음 값을 발생시킵니다. `[71,71,71,71,71,71,71.5]`.

Agent는 마지막으로 보고된 숫자(이 경우 `71.5`)를 GAUGE 메트릭의 값으로 제출합니다.

{{% /tab %}}
{{% tab "HISTOGRAM" %}}

예를 들어 10초의 플러시 시간 간격 동안 값 `[1,1,1,2,2,2,3,3]`을 보고하는 웹 서버에서 HISTOGRAM 메트릭 `request.response_time.histogram`을 제출한다고 가정하겠습니다. 기본적으로 Agent는 이 시간 간격 중 이러한 값의 통계적 분포를 나타내는 다음과 같은 메트릭을 Datadog에 제출합니다.

| 메트릭 이름                                    | 값  | Datadog 인앱 유형 |
| ---------------------------------------------- | ------ | ------------------- |
| `request.response_time.histogram.avg`          | `1.88` | GAUGE               |
| `request.response_time.histogram.count`        | `0.8`  | RATE                |
| `request.response_time.histogram.median`       | `2`    | GAUGE               |
| `request.response_time.histogram.95percentile` | `3`    | GAUGE               |
| `request.response_time.histogram.max`          | `3`    | GAUGE               |

{{% /tab %}}
{{% tab "DISTRIBUTION" %}}

DISTRIBUTION 메트릭 `request.response_time.distribution`을 웹 서버 2곳, `webserver:web_1` 및 `webserver:web_2`에서 제출한다고 가정하겠습니다. 주어진 플러시 시간 간격 안에 `webserver:web_1`은 값 `[1,1,1,2,2,2,3,3]`을 포함한 메트릭을 보고하고, `webserver:web_2`는 값 `[1,1,2]`를 포함한 동일한 메트릭을 보고한다고 가정하겠습니다. 이 시간 간격 동안, 다음과 같은 다섯 가지 집계가 두 웹 서버에서 수집한 모든 값의 전역 통계적 분포를 나타냅니다.

| 메트릭 이름                                | 값  | Datadog 인앱 유형 |
| ------------------------------------------ | ------ | ------------------- |
| `avg:request.response_time.distribution`   | `1.73` | GAUGE               |
| `count:request.response_time.distribution` | `11`   | COUNT               |
| `max:request.response_time.distribution`   | `3`    | GAUGE               |
| `min:request.response_time.distribution`   | `1`    | GAUGE               |
| `sum:request.response_time.distribution`   | `19`   | COUNT               |

#### 백분위수 집계 계산 {#calculation-of-percentile-aggregations}

GAUGE 또는 HISTOGRAM과 같은 여타 메트릭 유형과 마찬가지로 DISTRIBUTION 메트릭 유형도: `count`, `min`, `max`, `sum`, `avg` 등의 집계를 사용할 수 있습니다. Distribution 메트릭은 처음에는 다른 메트릭과 같은 방식으로 태그됩니다(코드에 설정된 사용자 지정 태그 사용).

메트릭의 [세부 정보 사이드 패널][2]에서 distribution 메트릭에 더 많은 백분위수 집계(`p50`, `p75`, `p90`, `p95`, `p99`)를 추가할 수 있습니다. 앱 내의 distribution 메트릭에 백분위수 집계를 추가하려면 다음과 같은 다섯 가지 추가적인 집계를 쿼리에 사용할 수 있습니다.

| 메트릭 이름                              | 값 | Datadog 인앱 유형 |
| ---------------------------------------- | ----- | ------------------- |
| `p50:request.response_time.distribution` | `2`   | GAUGE               |
| `p75:request.response_time.distribution` | `2`   | GAUGE               |
| `p90:request.response_time.distribution` | `3`   | GAUGE               |
| `p95:request.response_time.distribution` | `3`   | GAUGE               |
| `p99:request.response_time.distribution` | `3`   | GAUGE               |

다시 말해, 주어진 시간 간격 동안 백분위수 집계가 추가된 distribution 메트릭의 경우 다음과 같은 10가지 집계를 사용할 수 있습니다. `count`, `sum`, `min`, `max`, `avg`, `p50`, `p75`, `p90`, `p95` 및 `p99`.

**참고**: distribution 메트릭 값의 집계가 gauge 또는 인앱 count로 다양하게 _표시되지만_ 메트릭 자체는 `DISTRIBUTION` 유형을 유지합니다.

#### 태깅 사용자 지정 {#customization-of-tagging}

이 기능을 사용하면 호스트 수준의 세분화가 필요하지 않은 메트릭의 태깅을 제어할 수 있습니다. [Metrics without Limits™][1]에 관해 자세히 알아보세요.

**참고**: 허용 목록에 기반한 태그 사용자 지정에서는 태그 제외가 지원되지 않습니다. `!`로 시작하는 태그는 추가할 수 없습니다.

[1]: /ko/metrics/metrics-without-limits/
[2]: /ko/metrics/summary/#metric-details-sidepanel
{{% /tab %}}
{{< /tabs >}}

### 제출 {#submission}

{{< tabs >}}
{{% tab "COUNT" %}}

COUNT 유형 메트릭은 다음 중 한 가지 소스에서 제출:

| 제출 소스| 제출 방법(python)           | 제출 유형 | Datadog 인앱 유형 |
| ----------------- | ------------------------------------ | --------------- | ------------------- |
| [Agent 검사][1]  | `self.count(...)`                    | COUNT           | COUNT               |
| [Agent 검사][2]  | `self.monotonic_count(...)`          | COUNT           | COUNT               |
| [API][3]          | `api.Metric.send(type="count", ...)` | COUNT           | COUNT               |
| [DogStatsD][4]    | `dog.count(...)`                     | COUNT           | RATE                |
| [DogStatsD][4]    | `dog.increment(...)`                 | COUNT           | RATE                |
| [DogStatsD][4]    | `dog.decrement(...)`                 | COUNT           | RATE                |

**참고**: DogStatsD를 통해 COUNT 메트릭 유형을 제출하면 해당 메트릭이 다양한 Agent에서 관련성 있는 비교를 보장하기 위해 앱 내에서 RATE로 표시됩니다. 따라서, StatsD 수는 Datadog 내에서 소수점 값으로 표시될 수 있습니다(초당 단위를 보고하기 위해 시간 간격에 따라 정규화되기 때문입니다).


[1]: /ko/metrics/custom_metrics/agent_metrics_submission/?tab=count#count
[2]: /ko/metrics/custom_metrics/agent_metrics_submission/?tab=count#monotonic-count
[3]: /ko/api/latest/metrics/#submit-metrics
[4]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/#count
{{% /tab %}}
{{% tab "RATE" %}}

RATE 유형 메트릭은 다음 중 한 가지 소스에서 제출:

| 제출 소스 | 제출 방법(python)          | 제출 유형 | Datadog 인앱 유형 |
| ----------------- | ----------------------------------- | --------------- | ------------------- |
| [Agent 검사][1]  | `self.rate(...)`                    | RATE            | GAUGE               |
| [API][2]          | `api.Metric.send(type="rate", ...)` | RATE            | RATE                |

**참고**: DogStatsD를 통해 RATE 메트릭을 가져오려면 [COUNT][16] 또는 [HISTOGRAM][18] 메트릭을 제출하세요. Count 메트릭 값과 `<HISTOGRAM>.count` 값은 StatsD 플러시 기간 동안의 메트릭 값 변화량을 시간 기준으로 정규화한 값입니다.


[1]: /ko/metrics/custom_metrics/agent_metrics_submission/?tab=rate
[2]: /ko/api/latest/metrics/#submit-metrics
{{% /tab %}}
{{% tab "GAUGE" %}}

GAUGE 유형 메트릭은 다음 중 한 가지 소스에서 제출:

| 제출 소스 | 제출 방법(Python)           | 제출 유형 | Datadog 인앱 유형 |
| ----------------- | ------------------------------------ | --------------- | ------------------- |
| [Agent 검사][1]  | `self.gauge(...)`                    | GAUGE           | GAUGE               |
| [API][2]          | `api.Metric.send(type="gauge", ...)` | GAUGE           | GAUGE               |
| [DogStatsD][3]    | `dog.gauge(...)`                     | GAUGE           | GAUGE               |


[1]: /ko/metrics/custom_metrics/agent_metrics_submission/?tab=gauge
[2]: /ko/api/latest/metrics/#submit-metrics
[3]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/#gauge
{{% /tab %}}
{{% tab "HISTOGRAM" %}}

HISTOGRAM 유형 메트릭은 다음 중 한 가지 소스에서 제출:

| 제출 소스 | 제출 방법(Python) | 제출 유형 | Datadog 인앱 유형 |
| ----------------- | -------------------------- | --------------- | -------------------- |
| [Agent 검사][1]  | `self.histogram(...)`      | HISTOGRAM       | GAUGE, RATE          |
| [DogStatsD][2]    | `dog.histogram(...)`       | HISTOGRAM       | GAUGE, RATE          |

Datadog Agent에 TIMER 메트릭을 제출하는 것은 DogStatsD 안에서 HISTOGRAM 메트릭 유형을 제출하는 것과 같습니다(표준 StatsD의 timer와 혼동하지 말 것). [DogStatsD `TIMER`][3]는 지속 시간 데이터만 나타냅니다. 예를 들어 코드의 한 섹션이 실행되는 데 걸리는 시간이나, 한 페이지를 완전히 렌더링하는 데 걸리는 시간을 말합니다.


[1]: /ko/metrics/custom_metrics/agent_metrics_submission/?tab=histogram
[2]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/#histogram
[3]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/#timer
{{% /tab %}}
{{% tab "DISTRIBUTION" %}}

DISTRIBUTION 유형 메트릭은 다음 중 한 가지 소스에서 제출:

| 제출 소스 | 제출 방법(Python) | 제출 유형 | Datadog 인앱 유형 |
| ----------------- | -------------------------- | --------------- | -------------------- |
| [DogStatsD][1]    | `dog.distribution(...)`    | DISTRIBUTION    | GAUGE, COUNT         |
| [API][2]          | `api_instance.submit_distribution_points(...)` | DISTRIBUTION           | GAUGE, COUNT               |

**참고**: distribution 메트릭 값의 집계가 gauge 또는 인앱 count로 다양하게 _표시되지만_ 메트릭 자체는 `DISTRIBUTION` 유형을 유지합니다.

[1]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/#distribution
[2]: /ko/api/latest/metrics/#submit-distribution-points
{{% /tab %}}
{{< /tabs >}}

## 제출 유형 및 Datadog 인앱 유형 {#submission-types-and-datadog-in-app-types}

아래는 사용 가능한 모든 제출 소스 및 방법의 요약입니다. 이 표에는 해당하는 메트릭 제출 유형과 인앱 유형 간의 매핑을 표시했습니다.

| 제출 소스 | 제출 방법(Python)           | 제출 유형 | Datadog 인앱 유형 |
| ----------------- | ------------------------------------ | --------------- | -------------------- |
| [Agent 검사][9]  | `self.count(...)`                    | COUNT           | COUNT                |
| [Agent 검사][10] | `self.monotonic_count(...)`          | COUNT           | COUNT                |
| [Agent 검사][11] | `self.gauge(...)`                    | GAUGE           | GAUGE                |
| [Agent 검사][12] | `self.histogram(...)`                | HISTOGRAM       | GAUGE, RATE          |
| [Agent 검사][13] | `self.rate(...)`                     | RATE            | GAUGE                |
| [API][7]          | `api.Metric.send(type="count", ...)` | COUNT           | COUNT                |
| [API][7]          | `api.Metric.send(type="gauge", ...)` | GAUGE           | GAUGE                |
| [API][7]          | `api.Metric.send(type="rate", ...)`  | RATE            | RATE                 |
| [DogStatsD][14]   | `dog.gauge(...)`                     | GAUGE           | GAUGE                |
| [DogStatsD][15]   | `dog.distribution(...)`              | DISTRIBUTION    | DISTRIBUTION         |
| [DogStatsD][16]   | `dog.count(...)`                     | COUNT           | RATE                 |
| [DogStatsD][16]   | `dog.increment(...)`                 | COUNT           | RATE                 |
| [DogStatsD][16]   | `dog.decrement(...)`                 | COUNT           | RATE                 |
| [DogStatsD][17]   | `dog.set(...)`                       | SET             | GAUGE                |
| [DogStatsD][18]   | `dog.histogram(...)`                 | HISTOGRAM       | GAUGE, RATE          |

**참고**: distribution 메트릭 값의 집계가 gauge 또는 인앱 count로 다양하게 _표시되지만_ 메트릭 자체는 `DISTRIBUTION` 유형을 유지합니다. 자세한 정보는 이 페이지의 [정의][19] 섹션을 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/metrics/custom_metrics/type_modifiers/
[2]: /ko/dashboards/functions/
[3]: /ko/metrics/summary/
[4]: https://statsd.readthedocs.io/en/v3.3/types.html#sets
[5]: /ko/metrics/custom_metrics/agent_metrics_submission/
[6]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/
[7]: /ko/api/latest/metrics/#submit-metrics
[8]: /ko/extend/dogstatsd/#how-it-works
[9]: /ko/metrics/custom_metrics/agent_metrics_submission/?tab=count#count
[10]: /ko/metrics/custom_metrics/agent_metrics_submission/?tab=count#monotonic-count
[11]: /ko/metrics/custom_metrics/agent_metrics_submission/?tab=gauge
[12]: /ko/metrics/custom_metrics/agent_metrics_submission/?tab=histogram
[13]: /ko/metrics/custom_metrics/agent_metrics_submission/?tab=rate
[14]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/#gauge
[15]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/#distribution
[16]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/#count
[17]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/#set
[18]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/#histogram
[19]: /ko/metrics/types/?tab=distribution#definition