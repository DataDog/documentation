---
aliases:
- /ko/metrics/otlp
further_reading:
- link: metrics/distributions
  tag: 설명서
  text: 분포에 대해 더 알아보기
- link: opentelemetry/
  tag: 설명서
  text: OpenTelemetry에 대해 더 알아보기
- link: /opentelemetry/guide/otlp_delta_temporality/
  tag: 지침
  text: OpenTelemetry로 델타 임시 메트릭 생성
title: OTLP 메트릭 유형
---

## 개요

Datadog 에이전트 및 OpenTelemetry 컬렉터 Datadog 내보내기는 OpenTelemetry로 계측된 애플리케이션에서 생성할 수 있는 OpenTelemetry 형식(OTLP)의 메트릭을 수집할 수 있습니다.

다음 OTLP 메트릭 유형은 Datadog 에이전트 및 OpenTelemetry 컬렉터 Datadog 내보내기 도구에서 수집할 수 있습니다:
- Sums
- Gauges
- Histograms
- Summaries

이러한 OTLP 메트릭 유형은 Datadog 메트릭 유형에 매핑됩니다:

- 개수
- 게이지
- 배포

단일 OTLP 메트릭은 각 의미를 나타내는 접미사를 동반한 여러 Datadog 메트릭에 매핑될 수 있습니다. 

**참고**: OpenTelemetry는 측정값을 OTLP 메트릭(Sum, Gauge, Histogram)으로 내보낼 수 있는 메트릭 API 기기(`Gauge`, `Counter`, `UpDownCounter`, `Histogram` 등)를 제공합니다. OTLP 메트릭의 다른 소스도 가능합니다. 애플리케이션 및 라이브러리는 생성하는 OTLP 메트릭에 사용자 지정 기능을 제공할 수 있습니다. 생성되는 OTLP 메트릭과 이를 사용자 지정하는 방법을 이해하려면 OpenTelemetry SDK 또는 OTLP 생성 애플리케이션의 설명서를 참조하세요.

**참고**: OpenTelemetry 프로토콜은 시간에 따라 메트릭을 나타내는 두 가지 방법을 지원합니다: [누적 및 델타 일시성][2]으로 아래 설명된 메트릭에 영향을 미칩니다. CUMULATIVE로 설정하면 애플리케이션(또는 컬렉터) 시작 중에 일부 데이터 포인트를 버릴 수 있으므로, OpenTelemetry 구현의 임시 기본 설정을 **DELTA**로 설정합니다. 자세한 내용은 [OpenTelemetry로 델타 임시 메트릭 생성][3]을 참조하세요.

## 메트릭 유형

### 매핑


{{< tabs >}}
{{% tab "Sum" %}}

OTLP Sum은 시간 창에서 보고된 측정의 합계를 나타냅니다. 예를 들어, Sum을 사용하여 데이터베이스에 대한 총 연결 수 또는 엔드포인트에 대한 총 요청 수를 추적할 수 있습니다. Sum에는 매핑에 영향을 미치는 두 가지 기능이 있습니다:

- *애그리게이션 일시성*, 누적 또는 델타일 수 있습니다. 델타 메트릭은 시간 창에서 겹치지 않는 반면, 누적 메트릭은 고정된 시작 시점의 시간 창을 나타냅니다.
- *단조성*. 단조 합계는 감소하지 않으며 기본 개수에 추가만 지원합니다.

기본 매핑은 다음과 같습니다:
1. 누적 단조 합계의 경우, 연속 포인트 사이의 델타가 계산되어 Datadog에 개수로 보고됩니다. 첫 번째 포인트는 저장되지만 생략됩니다. OTLP 페이로드의 값을 복구하려면 [`cumsum` 산술 함수][1]를 사용하세요. 
2. 누적 비단조 합계는 Datadog 게이지로 내보내집니다.
3. 델타 합계는 Datadog 개수로 내보내집니다.

[1]: /ko/dashboards/functions/arithmetic/#cumulative-sum
{{% /tab %}}
{{% tab "Gauge" %}}

OTLP 게이지는 주어진 시간에 샘플링된 값을 나타냅니다. 지정된 시간 창의 마지막 값만 OTLP 메트릭에 포함됩니다.

OTLP 게이지는 집계 시맨틱을 제공하지 않기 때문에, Datadog 게이지에 매핑됩니다. 정수 및 부동 소수 게이지 데이터 포인트는 모두 Datadog 형식의 부동 소숫점 숫자로 매핑됩니다.

{{% /tab %}}
{{% tab "Histogram" %}}

OTLP 히스토그램은 일련의 버킷 수와 함께 모집단 합계 또는 개수와 같은 특정 집계 메트릭을 저장하여, 지정된 시간 창에서 값 집합의 통계적 분포를 나타냅니다. 히스토그램에는 매핑에 영향을 미치는 한 가지 기능이 있습니다:

- *집계 일시성*, 누적 또는 델타일 수 있습니다. 델타 메트릭은 시간 창에서 겹치지 않는 반면, 누적 메트릭은 고정된 시작 시점의 시간 창을 나타냅니다.

기본 매핑은 다음과 같습니다:
1. 델타 히스토그램은 Datadog 분포로 보고됩니다. [분포에 대해 자세히 알아보기][1]를 통해 사용 가능한 집계에 대해 더 알아보세요.
2. 누적 히스토그램의 경우, 연속 포인트 사이의 델타가 계산되어 분포로 Datadog에 보고됩니다. 개별 집계에서 [`cumsum` 산술 함수][2]를 사용하여 OTLP 페이로드의 값을 복구할 수 있습니다.

**참고**: OTLP의 히스토그램 메트릭은 분포 메트릭에 매핑됩니다. OTLP가 이 데이터를 전송하는 방식 때문에 최대, 최소 및 백분위수 집계는 정확한 계산이 아닌 근사치입니다.

Datadog 에이전트 및 OpenTelemetry 컬렉터 Datadog 내보내기를 사용하면 `histogram` 하위 섹션에서 히스토그램 내보내기를 변경할 수 있습니다.
- `mode`가 `counters`로 설정된 경,우 다음 메트릭이 생성됩니다:

`lower_bound`와 `upper_bound`가 태그한 `<METRIC_NAME>.bucket`
: 지정된 하한 및 상한이 있는 버킷에 대한 시간 창의 버킷 수입니다.<br>
**Datadog 인앱 유형**: COUNT

- `send_aggregation_metrics` 플래그가 활성화되어 있는 경우, 다음 메트릭이 생성됩니다:

`<METRIC_NAME>.sum`
: 시간 창의 시간 동안 제출된 값의 합계입니다.<br>
**Datadog 인앱 유형**: COUNT

`<METRIC_NAME>.count`
: 시간 창의 시간 동안 제출된 값의 수입니다.<br>
**Datadog 인앱 유형**: COUNT

`<METRIC_NAME>.min`
: 시간 창의 시간 동안 제출된 최소 값입니다. 델타 OTLP 히스토그램에만 사용할 수 있습니다. 사용 가능 버전: Datadog 내보내기 v0.75.0 및 Datadog 에이전트 v6.45.0 및 v7.45.0. <br>
**Datadog 인앱 유형**: GAUGE

`<METRIC_NAME>.max`
:  시간 창의 시간 동안 제출된 값의 최대값입니다. 델타 OTLP 히스토그램에만 사용할 수 있습니다. 사용 가능 버전: Datadog 내보내기 v0.75.0 및 Datadog 에이전트 v6.45.0 및 v7.45.0.<br>
**Datadog 인앱 유형**: GAUGE

**참고**: `send_aggregation_metrics`는 분포 모드를 사용하지 않는 경우에만 유용합니다. Datadog 내보내기 v0.75.0, Datadog 에이전트 v6.45.0, v7.45.0 이전 버전의 경우 `send_count_sum_metrics`를 사용합니다. 

[1]: /ko/metrics/distributions
[2]: /ko/dashboards/functions/arithmetic/#cumulative-sum
{{% /tab %}}
{{% tab "Summary" %}}

OTLP 요약은 일정 기간의 모집단 변위치 정보를 전달하는 레거시 유형입니다. OTLP 요약 유형은 OpenTelemetry SDK에서 생성되지 않지만 이전 버전과의 호환성을 위해 다른 구성 요소에서 생성될 수 있습니다.

`<METRIC_NAME>.sum`
: 애플리케이션이 메트릭 생성을 시작한 이후 값의 합계입니다.<br>
**Datadog 인앱 유형**: COUNT

`<METRIC_NAME>.count`
: 모집단의 값 수. <br>
**Datadog 인앱 유형**: COUNT

`quantile`가 태그한 `<METRIC_NAME>.quantile`
: 주어진 변위치의 값입니다.<br>
**Datadog 인앱 유형**: GAUGE

{{% /tab %}}
{{< /tabs >}}

### 속성 매핑

OTLP는 데이터 포인트 수준 속성과 리소스 속성이라는 두 가지 종류의 속성을 지원합니다. 이러한 속성은 OpenTelemetry 시맨틱 규칙을 따르며 잘 알려진 시맨틱을 가질 수 있습니다.

Datadog 에이전트 및 OpenTelemetry 컬렉터 atadog 내보내기는 데이터 포인트 수준의 속성을 태그로 매핑합니다. OpenTelemetry 시맨틱 규칙을 따르는 리소스 속성은 동등한 Datadog 규칙이 있는 경우에 매핑됩니다.

`resource_attributes_as_tags` 플래그를 사용하여 모든 리소스 속성을 태그로 추가할 수 있습니다.

### 호스트 이름 해결

OpenTelemetry는 호스트 이름과 관련된 시맨틱 규칙을 정의합니다. OTLP 페이로드에 알려진 호스트 이름 속성이 있는 경우, Datadog은 이러한 규칙을 따르고 해당 값을 호스트 이름으로 사용하려고 시도합니다. 시맨틱 규칙은 다음 순서로 고려됩니다:

1. 존재하는 이중 태깅을 방지하기 위한 `host` 속성입니다.
1. `datadog.host.name`, Datadog 관련 호스트 이름 규칙
1. `cloud.provider` 시맨틱 규칙을 기반으로 하는 클라우드 공급자 관련 규칙
1. `k8s.node.name` 및 `k8s.cluster.name` 시맨틱 규칙의 쿠버네티스(Kubernetes) 관련 규칙
1. `host.id`, 고유한 호스트 ID
1. `host.name`, 시스템 호스트이름 

다음 호스트 이름은 유효하지 않은 것으로 간주되어 폐기됩니다:
1. `0.0.0.0`
1. `127.0.0.1`
1. `localhost`
1. `localhost.localdomain`
1. `localhost6.localdomain6`
1. `ip6-localhost`

유효한 호스트 이름이 없는 경우, Datadog은 페이로드에 시스템 수준 호스트 이름을 할당합니다.
원격 호스트에서 데이터를 보내는 경우, 정확한 호스트 이름 확인을 하도록 ['리소스 감지' 프로세서][1]를 파이프라인에추가하세요. 

### 예시

{{< tabs >}}
{{% tab "Sum" %}}

기본적으로 누적 **단조** 합계 유형의 메트릭을 내보내는 단일 애플리케이션에서 OpenTelemetry Counter 계측을 사용한다고 가정합니다. 다음 표에는 Datadog 동작이 요약되어 있습니다:

| 컬렉션 기간 | 개수 값    | OTLP 합계 값 | Datadog에 보고된 값 | Datadog 인앱 유형 | 참고                                          |
|-------------------|-------------------|----------------|---------------------------| ------------------- |------------------------------------------------|
| #1                | [1,1,1,2,2,2,3,3] | 15             | 없음                      |  개수              | 첫 번째 컬렉션 값은 보고되지 않습니다. |
| #2                | [3,4,1,2]         | 25             | 10                        |  개수(COUNT)              | 값의 차이가 보고됩니다.     |
| #3                | []                | 25             | 0                         |  개수(COUNT)              | 이 기간 동안 새로운 값이 보고되지 않았습니다.    |

기본적으로 누적 합계 유형의 메트릭을 내보내는 단일 애플리케이션에서 OpenTelemetry UpDownCounter 계측을 사용하고 있다고 가정합니다. 다음 표에는 Datadog 동작이 요약되어 있습니다:

| 컬렉션 기간 | UpDownCounter 값 | OTLP 합계 값 | Datadog에 보고된 값 | Datadog 인앱 유형 |
|-------------------|----------------------|----------------|---------------------------| ------------------- |
| #1                | [1,1,1,2,2,2,3,3]    | 15             | 15                        | 게이지(GAUGE)               |
| #2                | [3,-4,1,2]           | 17             | 17                        | 게이지(GAUGE)               |
| #3                | [-1]                 | 16             | 16                        | 게이지(GAUGE)               |

{{% /tab %}}
{{% tab "Gauge" %}}

단일 애플리케이션에서 OpenTelemetry 게이지 계측, `temperature`을 사용하고 있다고 가정합니다.
다음 표에는 Datadog 동작이 요약되어 있습니다:

| 컬렉션 기간 | 게이지 계측 | OTLP 게이지 값 | Datadog에 보고된 값 | Datadog 인앱 유형 |
|-------------------|------------------|------------------|---------------------------| ------------------- |
| #1                | 71.5             | 71.5             | 71.5                      | 게이지(GAUGE)               |
| #2                | 72               | 72               | 72                        | 게이지(GAUGE)               |
| #3                | 70               | 70               | 70                        | 게이지               |

{{% /tab %}}
{{% tab "Histogram" %}}

두 웹 서버: `webserver:web_1` 및 `webserver:web_2`에서 OpenTelemetry 히스토그램 계측 `request.response_time.histogram`을 사용한다고 가정합니다. 지정된 수집 기간에 `webserver:web_1`는 `[1,1,1,2,2,2,3,3]` 값이 있는 메트릭을 보고하고, `webserver:web_2`는 `[1,1,2]` 값이 있는 동일한 메트릭을 보고한다고 가정합니다. 이 수집 기간 동안, 다음 다섯개의 집계는 두 웹 서버에서 수집된 모든 값의 글로벌 통계 분포를 나타냅니다.

| 메트릭 이름                                | 값  | Datadog 인앱 유형 |
| ------------------------------------------ | ------ | ------------------- |
| `avg:request.response_time.distribution`   | `1.73` | 게이지(GAUGE)               |
| `count:request.response_time.distribution` | `11`   | 개수(COUNT)               |
| `max:request.response_time.distribution`   | `3`    | 게이지(GAUGE)               |
| `min:request.response_time.distribution`   | `1`    | 게이지(GAUGE)               |
| `sum:request.response_time.distribution`   | `19`   | 개수(COUNT)               |

추가 집계를 설정하는 방법을 이해하려면 [분포에 대해 자세히 알아보세요][1].

또는, `counters` 모드를 사용하는 경우, `send_aggregation_metrics` 플래그가 활성화되고, 히스토그램 버킷 경계가 `[-inf, 2, inf]`로 설정되며, 다음 메트릭이 보고됩니다:

| 메트릭 이름                                 | 값  | 태그                                | Datadog 인앱 유형 |
| ------------------------------------------- | ------ | ------------------------------------| ------------------- |
| `request.response_time.distribution.count`  | `8`    | n/a                                 | 개수(COUNT)               |
| `request.response_time.distribution.sum`    | `15`   | n/a                                 | 개수(COUNT)               |
| `request.response_time.distribution.max`    | `3`    | n/a                                 | 게이지               |
| `request.response_time.distribution.min `   | `1`    | n/a                                 | 게이지               |
| `request.response_time.distribution.bucket` | `6`    | `lower_bound:-inf`, `upper_bound:2` | 게이지(GAUGE)               |
| `request.response_time.distribution.bucket` | `2`    | `lower_bound:2`, `upper_bound:inf`  | 게이지(GAUGE)               |

[1]: /ko/metrics/distributions
{{% /tab %}}
{{% tab "Summary" %}}

하나의 웹 서버에서 레거시 OTLP 요약 메트릭 `request.response_time.summary`를 제출한다고 가정합니다. 지정된 수집 기간에 웹 서버가 `[1,1,1,2,2,2,3,3]` 값이 있는 메트릭을 보고한다고 가정합니다. 최소, 최대 및 중앙 분위수가 활성화된 경우, 다음 메트릭이 보고됩니다:

| 메트릭 이름                                   | 값  | 태그                                | Datadog 인앱 유형 |
| --------------------------------------------- | ------ | ------------------------------------| ------------------- |
| `request.response_time.distribution.count`    | `8`    | n/a                                 | 개수(COUNT)               |
| `request.response_time.distribution.sum`      | `15`   | n/a                                 | 개수(COUNT)               |
| `request.response_time.distribution.quantile` | `1`    | `quantile:0`                        | 게이지               |
| `request.response_time.distribution.quantile` | `2`    | `quantile:0.5`                      | 게이지(GAUGE)               |
| `request.response_time.distribution.quantile` | `3`    | `quantile:1.0`                      | 게이지(GAUGE)               |


{{% /tab %}}
{{< /tabs >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/resourcedetectionprocessor#resource-detection-processor
[2]: https://opentelemetry.io/docs/reference/specification/metrics/data-model/#temporality
[3]: /ko/opentelemetry/guide/otlp_delta_temporality/