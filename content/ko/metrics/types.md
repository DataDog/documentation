---
algolia:
  tags:
  - 메트릭 유형
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
- link: developers/dogstatsd
  tag: 설명서
  text: DogStatsD에 대해 자세히 알아보기
- link: developers/libraries
  tag: 설명서
  text: 공식 및 커뮤니티에서 생성한 API 및 DogStatsD 클라이언트 라이브러리
title: 메트릭 유형
---

## 개요

Datadog에 제출된 각 메트릭에는 유형이 있습니다. 메트릭 유형은 쿼리 시 메트릭 값이 표시되는 방법에 영향을 미칩니다. 또한 추가 [한정자][1] 및 [함수][2]를 사용해 Datadog 내에서 메트릭을 그래프화할 때에도 영향을 미칩니다. 메트릭 유형은 [메트릭 요약 페이지][3]의 특정 메트릭 상세 정보 사이드 패널에 표시됩니다.

**참고**: 이 상세 정보 사이드 패널에서 메트릭 유형을 변경하면 모든 기존 시각화와 모니터의 메트릭 동작을 변경할 수 있습니다. 잠재적으로 이전 데이터가 유의미하지 않게될 수 있습니다.

다음 메트릭 제출 유형이 허용됩니다.

- [개수](?tab=count#metric-types)
- [비율](?tab=rate#metric-types)
- [게이지](?tab=gauge#metric-types)
- [설정][4]
- [히스토그램](?tab=histogram#metric-types)
- [분포](?tab=distribution#metric-types)

이러한 각기 다른 메트릭 제출 유형은 Datadog 웹 애플리케이션 내에서 찾을 수 있는 4개의 인앱 메트릭 유형으로 매핑됩니다.

- 개수(COUNT)
- 비율(RATE)
- 게이지(GAUGE)
- 분포(DISTRIBUTION)

**참고**: 입력 없이 Datadog에 메트릭을 제출하면 메트릭 유형은 Datadog 내에서 `Not Assigned`(으)로 표시됩니다. `Not Assigned` 메트릭 유형은 최초 메트릭 유형이 제출되기 전 또 다른 인앱 유형으로 변경될 수 없습니다.

## 제출과 인앱 유형 비교

메트릭은 주로 3가지 방법으로 Datadog에 제출됩니다.

- [에이전트 점검][5]
- [DogStatsD][6]
- [Datadog HTTP API][7]

Datadog가 수신하는 대부분의 데이터는 에이전트에서 제출합니다. 에이전트 점검이나 DogStatsD을 통해 이루어집니다. 이러한 제출 방법의 경우, 메트릭 유형이 [플러시 시간 간격][8] 동안 에이전트에서 여러 값이 수집되는 방법을 결정합니다. 에이전트가 이러한 값을 해당 간격에 대한 단일 대표 메트릭 값으로 결합하면, 이 결합된 값이 Datadog에 단일 타임스탬프로 저장됩니다.

Datadog API에 직접 제출된 데이터는 Datadog에서 집계하지 않습니다. 분포 메트릭은 예외입니다. Datadog에 전송된 원시 값은 그대로 저장됩니다.

[제출 유형 및 Datadog 인앱 유형](#submission-types-and-datadog-in-app-types) 섹션을 읽고 각기 다른 메트릭 제출 유형이 해당 인앱 유형에 매핑되는 방법에 대해 알아보세요.

## 메트릭 유형

### 정의

{{< tabs >}}
{{% tab "COUNT" %}}

개수(COUNT) 메트릭 제출 유형은 단일 시간 간격의 이벤트 발생 총 횟수를 나타냅니다. 개수는 데이터베이스에서의 총 연결 수나 엔드포인트로의 총 요청 수를 추적하는 데 사용할 수 있습니다. 이 이벤트 수는 시간에 따라 누적되거나 감소합니다. 일정하게 증가하지 않습니다.

**참고**: 개수는 비율 메트릭 유형과 다릅니다. 비율 메트릭 유형은 지정된 시간 간격 동안 초당 평균화된 이벤트 발생 횟수를 나타냅니다.

{{% /tab %}}
{{% tab "RATE" %}}

비율(RATE) 메트릭 제출 유형은 단일 시간 간격의 초당 이벤트 발생 총 횟수를 나타냅니다. 비율은 얼마나 자주 무엇이 발생했는지를 추적하는 데 사용할 수 있습니다. 예를 들어 데이터 베이스 연결 빈도, 엔드포인트로의 요청 빈도 등이 포함됩니다.

**참고**: 비율은 개수 메트릭 제출 유형과는 다릅니다. 개수 메트릭은 지정된 시간 간격의 이벤트 발생 총 횟수를 나타냅니다.

{{% /tab %}}
{{% tab "GAUGE" %}}

게이지(GAUGE) 메트릭 제출 유형은 단일 시간 간격의 이벤트 스냅샷을 보여줍니다. 이 대표 스냅샷 값은 시간 간격 동안 에이전트에 제출된 마지막 값입니다. 게이지를 사용하여 지속적으로 보고되는 측정값을 가져올 수 있습니다. 예를 들어 가용 디스크 공간이나 사용된 메모리가 있을 수 있습니다.

{{% /tab %}}
{{% tab "HISTOGRAM" %}}

히스토그램(HISTOGRAM) 메트릭 제출 유형은 단일 시간 간격에서 에이전트 측에서 계산한 값들의 통계적 분포를 보여줍니다. Datadog의 히스토그램 메트릭 유형은 StatsD 타이밍 메트릭 유형의 확장입니다. 에이전트는 지정된 시간 기간 동안 전송된 값을 집계하여 일련의 값을 대표하는 각기 다른 메트릭을 생산합니다.

특정 시간 간격에 히스토그램 메트릭 `<METRIC_NAME>`에 대한 `X` 값을 전송한 경우, 기본적으로 에이전트가 다음 메트릭을 생산합니다.

`<METRIC_NAME>.avg`
: 해당 시간 간격에서 `X` 값의 평균을 나타냅니다.<br>
**Datadog 인앱 유형**: 게이지(GAUGE)

`<METRIC_NAME>.count`
: 해당 간격  동안 제출된 값의 수로, `X`입니다. 에이전트는 이 수를 비율로 제출하므로 앱에 `X/interval` 값으로 표시됩니다.<br>
**Datadog 인앱 유형**: 비율(RATE)

`<METRIC_NAME>.median`
: 해당 시간 간격에서 `X` 값의 중앙값을 나타냅니다.<br>
**Datadog 인앱 유형**: 게이지(GAUGE)

`<METRIC_NAME>.95percentile` 
: 시간 간격에서 `X` 값의 95번째 백분위수를 나타냅니다.<br>
**Datadog 인앱 유형**: 게이지(GAUGE)

`<METRIC_NAME>.max`
: 시간 간격 동안 전송된 `X` 값들의 최대 값을 나타냅니다.<br>
**Datadog 인앱 유형**: 게이지(GAUGE)

**참고**:

-  [`datadog.yaml` 설정 파일][1]에서 `histogram_aggregates` 파라미터를 사용해 Datadog로 전송하려는 집계를 설정합니다. 기본적으로 `max`, `median`, `avg` 및 `count` 집계만 Datadog로 전송됩니다. `sum` 및 `min`도 사용할 수 있습니다.
- [`datadog.yaml` 설정 파일][2]에서 `histogram_percentiles` 파라미터를 사용해 Datadog로 전송하려는 백분위수 집계를 설정하세요. 기본적으로 `95percentile`만 Datadog로 전송됩니다.


[1]: https://github.com/DataDog/datadog-agent/blob/04d8ae9dd4bc6c7a64a8777e8a38127455ae3886/pkg/config/config_template.yaml#L106-L114
[2]: https://github.com/DataDog/datadog-agent/blob/04d8ae9dd4bc6c7a64a8777e8a38127455ae3886/pkg/config/config_template.yaml#L116-L121
{{% /tab %}}
{{% tab "DISTRIBUTION" %}}

분포 메트릭 제출 유형은 단일 시간 간격 동안 전체 인프라스트럭처 전반에서 계산된 일련의 값들에 대한 전 세계 통계적 분포를 나타냅니다. 분포는 기저 호스트에서 비독립적으로 서비스와 같은 논리적 개체를 계측하는 데 사용됩니다.

특정 시간 간격 동안 에이전트에서 집계하는 히스토그램 메트릭 유형과 달리 분포 메트릭은 시간 간격 동안 모든 원시 데이터를 Datadog로 전송합니다. 집계는 서버 측에서 발생합니다. 왜냐하면 기저 데이터 구조가 원시 미집계 데이터를 표시하므로 분포는 2가지 주요 기능을 제공합니다.

- 백분위수 집계 계산
- 태깅 커스터마이즈

특정 시간 간격에서 분포 메트릭 `<METRIC_NAME>`에 대해 `X` 값을 전송하면 기본적으로 다음 집계를 쿼리에 사용할 수 있습니다.

`avg:<METRIC_NAME>`
: 시간 간격에서 `X` 값의 평균을 나타냅니다.<br>
**Datadog 인앱 유형**: 게이지(GAUGE)

`count:<METRIC_NAME>`
: 시간 간격에 제출된 데이터 요소 숫자로, `X`입니다. 그러면 에이전트는 개수(COUNT)로 이를 전송할 수 있습니다.<br>
**Datadog 인앱 유형**: 개수(COUNT)

`max:<METRIC_NAME>`
: 시간 간격에 전송된 `X` 값의 최대 값을 나타냅니다.<br>
**Datadog 인앱 유형**: 게이지(GAUGE)

`min:<METRIC_NAME>`
: 시간 간격에 전송된 `X`의 최소값을 나타냅니다.<br>
**Datadog 인앱 유형**: 게이지(GAUGE)

`sum:<METRIC_NAME>`
: 시간 간격에 전송된 `X`의 최소 값을 나타냅니다.<br>
**Datadog 인앱 유형**: 개수(COUNT)

{{% /tab %}}
{{< /tabs >}}

### 예시

{{< tabs >}}
{{% tab "COUNT" %}}

개수 메트릭을 제출한다고 가정하겠습니다. Datadog 에이전트가 실행되는 단일 호스트에서 `activeusers.basket_size`을(를) 제출합니다. 이 호스트는 플러시 시간 간격 동안 다음 값(`[1,1,1,2,2,2,3,3]`)을 내보냅니다.

에이전트가 단일 시간 간격에서 수신한 모든 값을 추가합니다. 그러면 개수 메트릭 값으로 이 경우 `15`, 총 수를 제출합니다.

{{% /tab %}}
{{% tab "RATE" %}}

비율(RATE) 메트릭을 제출한다고 가정합니다. Datadog 에이전트가 실행되는 단일 호스트에서 `queue_messages.rate`을(를) 가정합니다. 이 호스트는 플러시 시간 간격 동안 다음 값(`[1,1,1,2,2,2,3,3]`)을( 내보냅니다.

에이전트가 단일 시간 간격에 수신된 모든 값을 추가합니다. 그려면 이 시간 간격에서 총 초 수로 나눈 총 숫자를 제출합니다. 이 경우 플러시 간격이 10초이므로 제출된 값은 비율(RATE) 메트릭 값으로 `1.5`가 됩니다.

{{% /tab %}}
{{% tab "GAUGE" %}}

Datadog 에이전트가 실행되는 단일 호스트에서 게이지(GAUGE) 메트릭 `temperature`을 제출한다고 가정합니다. 이 호스트는 플러시 시간 간격에서 다음 값(`[71,71,71,71,71,71,71.5]`)을 내보냅니다.

에이전트는 마지막 보고 숫자를 제출합니다. 이 경우는 게이지(GAUGE) 메트릭 값으로 이 경우에는 `71.5`입니다.

{{% /tab %}}
{{% tab "HISTOGRAM" %}}

예를 들어 플러시 시간 간격에서 `[1,1,1,2,2,2,3,3]` 값을 보고하는 웹 서버로부터 히스토그램 메트릭 `request.response_time.histogram`을(를) 제출한다고 가정합니다. 기본적으로 에이전트는 이 시간 간격에서 이러한 값의 통계적 분포를 나태내도록 Datadog에 다음 메트릭을 제출합니다.

| 메트릭 이름                                    | 값  | Datadog 인앱 유형 |
| ---------------------------------------------- | ------ | ------------------- |
| `request.response_time.histogram.avg`          | `1.88` | 게이지(GAUGE)               |
| `request.response_time.histogram.count`        | `0.8`  | 비율(RATE)                |
| `request.response_time.histogram.median`       | `2`    | 게이지(GAUGE)               |
| `request.response_time.histogram.95percentile` | `3`    | 게이지(GAUGE)               |
| `request.response_time.histogram.max`          | `3`    | 게이지(GAUGE)               |

{{% /tab %}}
{{% tab "DISTRIBUTION" %}}

2개의 웹 서버 `webserver:web_1` 및 `webserver:web_2`에서 `request.response_time.distribution` 분포 메트릭을 제출한다고 가정합니다. 특정 플러시 시간 간격에서 `webserver:web_1`이(가) `[1,1,1,2,2,2,3,3]` 값을 보고하고`webserver:web_2`은(는) `[1,1,2]` 값 포함 동일한 메트릭을 보고한다고 가정해 봅니다. 이 시간 간격 동안 다음 5가지 집계가 양 웹 서버에서 수집된 모든 값에 대한 전 세계 통계적 분포를 나타냅니다.

| 메트릭 이름                                | 값  | Datadog 인앱 유형 |
| ------------------------------------------ | ------ | ------------------- |
| `avg:request.response_time.distribution`   | `1.73` | 게이지(GAUGE)               |
| `count:request.response_time.distribution` | `11`   | 개수(COUNT)               |
| `max:request.response_time.distribution`   | `3`    | 게이지(GAUGE)               |
| `min:request.response_time.distribution`   | `1`    | 게이지(GAUGE)               |
| `sum:request.response_time.distribution`   | `19`   | 개수(COUNT)               |

#### 백분위수 집계 계산

게이지(GAUGE) 또는 히스토그램(HISTOGRAM) 등 기타 메트릭 유형과 같이, 분포(DISTRIBUTION) 메트릭 유형은 다음 지계를 사용할 수 있습니다(`count`, `min`, `max`, `sum` 및 `avg`). 분포 메트릭은 기타 메트릭과 동일한 방식으로 먼저 태깅되어 있습니다(코드에서 설정된 커스텀 태그 포함). 

추가 백분위수 집계(`p50`, `p75`, `p90`, `p95`, `p99`)가 분포 메트릭에 추가될 수 있습니다. 분포 메트릭 인앱에 백분위수 집계를 추가하는 경우 다음 5가지 추가 집계를 쿼리에 사용할 수 있습니다.

| 메트릭 이름                              | 값 | Datadog 인앱 유형 |
| ---------------------------------------- | ----- | ------------------- |
| `p50:request.response_time.distribution` | `2`   | 게이지(GAUGE)               |
| `p75:request.response_time.distribution` | `2`   | 게이지(GAUGE)               |
| `p90:request.response_time.distribution` | `3`   | 게이지(GAUGE)               |
| `p95:request.response_time.distribution` | `3`   | 게이지(GAUGE)               |
| `p99:request.response_time.distribution` | `3`   | 게이지(GAUGE)               |

즉, 특정 시간 간격 동안 추가 백분위수 집계를 포함하는 분포 메트릭의 경우 다음 10개 집계(`count`, `sum`, `min`, `max`, `avg`, `p50`, `p75`, `p90`, `p95` 및 `p99`)를 사용할 수 있습니다. 

#### 태깅 커스터마이즈

이 기능을 통해 메트릭 태깅을 관리할 수 있습니다. 호스트 수준 세분화는 필요하지 않습니다. [제한없는 메트릭 수집TM][1]에 대해 자세히 알아보세요.

**참고**: `!` 포함 예외 태그는 이 기능에서 허용되지 않습니다.


[1]: /ko/metrics/metrics-without-limits/
{{% /tab %}}
{{< /tabs >}}

### 제출

{{< tabs >}}
{{% tab "COUNT" %}}

다음 소스 중 하나에서 개수(COUNT) 유형 메트릭을 제출합니다.

| 제출 소스 | 제출 방법(python)           | 제출 유형 | Datadog 인앱 유형 |
| ----------------- | ------------------------------------ | --------------- | ------------------- |
| [에이전트 점검][1]  | `self.count(...)`                    | 개수(COUNT)           | 개수(COUNT)               |
| [에이전트 점검][2]  | `self.monotonic_count(...)`          | 개수(COUNT)           | 개수(COUNT)               |
| [API][3]          | `api.Metric.send(type="count", ...)` | 개수(COUNT)           | 개수(COUNT)               |
| [DogStatsD][4]    | `dog.count(...)`                     | 개수(COUNT)           | 비율(RATE)                |
| [DogStatsD][4]    | `dog.increment(...)`                 | 개수(COUNT)           | 비율(RATE)                |
| [DogStatsD][4]    | `dog.decrement(...)`                 | 개수(COUNT)           | 비율(RATE)                |

**참고**: DogStatsD을 통해 개수(COUNT) 메트릭 유형을 제출하면 각기 다른 에이전트 간 유의미한 비교를 할 수 있도록 메트릭은 비율 인앱으로 나타납니다. 결과적으로 StatsD 개수는 Datadog 내 십진법 수로 나타날 수 있습니다(초당 단위를 보고하기 위해 시간 간격 동안 표준화되어).


[1]: /ko/metrics/custom_metrics/agent_metrics_submission/?tab=count#count
[2]: /ko/metrics/custom_metrics/agent_metrics_submission/?tab=count#monotonic-count
[3]: /ko/api/v1/metrics/#submit-metrics
[4]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/#count
{{% /tab %}}
{{% tab "RATE" %}}

다음 소스 중 하나에서 비율(RATE) 유형 메트릭을 제출합니다.

| 제출 소스 | 제출 방법(python)          | 제출 유형 | Datadog 인앱 유형 |
| ----------------- | ----------------------------------- | --------------- | ------------------- |
| [에이전트 점검][1]  | `self.rate(...)`                    | 비율(RATE)            | 게이지(GAUGE)               |
| [API][2]          | `api.Metric.send(type="rate", ...)` | 비율(RATE)            | 비율(RATE)                |

**참고**: DogStatsD을 통해 비율(RATE) 메트릭 유형을 제출하면 각기 다른 에이전트 간 유의미한 비교를 보장할 수 있도록 메트릭이 게이지(GAUGE) 인앱으로 나타납니다. 


[1]: /ko/metrics/custom_metrics/agent_metrics_submission/?tab=rate
[2]: /ko/api/v1/metrics/#submit-metrics
{{% /tab %}}
{{% tab "GAUGE" %}}

다음 중 하나의 소스에서 게이지(GAUGE) 유형 메트릭을 제출합니다.

| 제출 소스 | 제출 방법(Python)           | 제출 유형 | Datadog 인앱 유형 |
| ----------------- | ------------------------------------ | --------------- | ------------------- |
| [에이전트 점검][1]  | `self.gauge(...)`                    | 게이지(GAUGE)           | 게이지(GAUGE)               |
| [API][2]          | `api.Metric.send(type="gauge", ...)` | 게이지(GAUGE)           | 게이지(GAUGE)               |
| [DogStatsD][3]    | `dog.gauge(...)`                     | 게이지(GAUGE)           | 게이지(GAUGE)               |


[1]: /ko/metrics/custom_metrics/agent_metrics_submission/?tab=gauge
[2]: /ko/api/v1/metrics/#submit-metrics
[3]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/#gauge
{{% /tab %}}
{{% tab "HISTOGRAM" %}}

다음 소스 중 하나에서 히스토그램(HISTOGRAM) 유형 메트릭을 제출합니다.

| 제출 소스 | 제출 방법(Python) | 제출 유형 | Datadog 인앱 유형 |
| ----------------- | -------------------------- | --------------- | -------------------- |
| [에이전트 점검][1]  | `self.histogram(...)`      | 히스토그램(HISTOGRAM)       | 게이지(GAUGE), 비율(RATE)          |
| [DogStatsD][2]    | `dog.histogram(...)`       | 히스토그램(HISTOGRAM)       | 게이지(GAUGE), 비율(RATE)          |

타이머(TIMER) 메트릭을 Datadog 에이전트를 제출하는 것은 DogStatsD에서 히스토그램(HISTOGRAM) 메트릭 유형을 제출하는 것과 동일합니다(표준 StatsD의 타이머와 혼동하지 않아야 함). [DogStatsD `TIMER`][3]는 기간 동안의 데이터만을 표시합니다. 예를 들어 코드 섹션이 실행되거나 페이지를 렌더링하는 데 소요되는 시간입니다.


[1]: /ko/metrics/custom_metrics/agent_metrics_submission/?tab=histogram
[2]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/#histogram
[3]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/#timer
{{% /tab %}}
{{% tab "DISTRIBUTION" %}}

다음 소스에서 분포(DISTRIBUTION) 유형 메트릭을 제출합니다.

| 제출 소스 | 제출 방법(Python) | 제출 유형 | Datadog 인앱 유형 |
| ----------------- | -------------------------- | --------------- | -------------------- |
| [DogStatsD][1]    | `dog.distribution(...)`    | 분포(DISTRIBUTION)    | 게이지(GAUGE), 개수(COUNT)         |


[1]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/#distribution
{{% /tab %}}
{{< /tabs >}}

## 제출 유형 및 Datadog 인앱 유형

모든 가용 메트릭 제출 소스와 방법에 대한 요약이 아래 나와 있습니다. 이 표는 해당 메트릭 제출 유형 및 인앱 유형 간 매핑을 표시합니다.

| 제출 소스 | 제출 방법(Python)           | 제출 유형 | Datadog 인앱 유형 |
| ----------------- | ------------------------------------ | --------------- | -------------------- |
| [에이전트 점검][9]  | `self.count(...)`                    | 개수(COUNT)           | 개수(COUNT)                |
| [에이전트 점검][10] | `self.monotonic_count(...)`          | 개수(COUNT)           | 개수(COUNT)                |
| [에이전트 점검][11] | `self.gauge(...)`                    | 게이지(GAUGE)           | 게이지(GAUGE)                |
| [에이전트 점검][12] | `self.histogram(...)`                | 히스토그램(HISTOGRAM)       | 게이지(GAUGE), 비율(RATE)          |
| [에이전트 점검][13] | `self.rate(...)`                     | 비율(RATE)            | 게이지(GAUGE)                |
| [API][7]          | `api.Metric.send(type="count", ...)` | 개수(COUNT)           | 개수(COUNT)                |
| [API][7]          | `api.Metric.send(type="gauge", ...)` | 게이지(GAUGE)           | 게이지(GAUGE)                |
| [API][7]          | `api.Metric.send(type="rate", ...)`  | 비율(RATE)            | 비율(RATE)                 |
| [DogStatsD][14]   | `dog.gauge(...)`                     | 게이지(GAUGE)           | 게이지(GAUGE)                |
| [DogStatsD][15]   | `dog.distribution(...)`              | 분포(DISTRIBUTION)    | 게이지(GAUGE), 개수(COUNT)         |
| [DogStatsD][16]   | `dog.count(...)`                     | 개수(COUNT)           | 비율(RATE)                 |
| [DogStatsD][16]   | `dog.increment(...)`                 | 개수(COUNT)           | 비율(RATE)                 |
| [DogStatsD][16]   | `dog.decrement(...)`                 | 개수(COUNT)           | 비율(RATE)                 |
| [DogStatsD][17]   | `dog.set(...)`                       | 설정(SET)             | 게이지(GAUGE)                |
| [DogStatsD][18]   | `dog.histogram(...)`                 | 히스토그램(HISTOGRAM)       | 게이지(GAUGE), 비율(RATE)          |
## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/metrics/custom_metrics/type_modifiers/
[2]: /ko/dashboards/functions/
[3]: /ko/metrics/summary/
[4]: https://statsd.readthedocs.io/en/v3.3/types.html#sets
[5]: /ko/metrics/custom_metrics/agent_metrics_submission/
[6]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/
[7]: /ko/api/v1/metrics/#submit-metrics
[8]: /ko/developers/dogstatsd/#how-it-works
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