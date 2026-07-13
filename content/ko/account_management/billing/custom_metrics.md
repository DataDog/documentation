---
algolia:
  tags:
  - custom metrics billing
aliases:
- /ko/integrations/faq/what-standard-integrations-emit-custom-metrics/
further_reading:
- link: /account_management/billing/metric_name_pricing/
  tag: 설명서
  text: Custom Metrics의 Metric Name 요금제
- link: /metrics/custom_metrics/
  tag: 설명서
  text: 사용자 지정 메트릭에 관해 자세히 알아보기
- link: /metrics/guide/custom_metrics_governance/
  tag: 가이드
  text: 사용자 지정 메트릭 거버넌스 모범 사례
title: Custom Metrics 청구
---
## 개요 {#overview}

**참고**: 이 페이지에서는 카디널리티 기반 Custom Metrics 청구 모델을 설명합니다. 계약에서 메트릭 이름 가격 책정 SKU를 사용하는 경우에는 [Custom Metrics의 Metric Name 요금제][15]를 참조하세요.

메트릭이 [Datadog 통합 {{< translate key="integration_count" >}} 이상][1] 중 하나에서 제출되지 않은 경우, 해당 메트릭은 [사용자 지정 메트릭][2]으로 간주합니다. 일부 표준 통합도 사용자 지정 메트릭을 발생시킬 가능성이 있습니다. 자세한 내용은 [사용자 지정 메트릭 및 표준 통합][14]을 참조하세요.

**사용자 지정 메트릭은 메트릭 이름 및 태그 값(호스트 태그 포함)의 조합으로 고유하게 식별됩니다**. 일반적으로 [DogStatsD][3]를 사용하거나 [사용자 지정 Agent Check][4]를 통해서 전송한 모든 메트릭은 사용자 지정 메트릭입니다.

월별 요금으로 청구되는 사용자 지정 메트릭 사용량(사용량 페이지에 반영됨)은 주어진 달의 시간별 고유한 사용자 지정 메트릭 총 수(시계열이라고도 함)를 해당 월의 시간으로 나누어 월별 평균 값을 계산해서 결정됩니다. 청구 가능한 사용량은 데이터 포인트 제출 빈도 또는 메트릭에서 실행하는 쿼리 수의 영향을 받지 않습니다.

Metrics without Limits™ 사용자의 경우, 사용량 페이지에 _수집된_ 사용자 지정 메트릭 및 _인덱싱된_ 사용자 지정 메트릭의 월별 청구 가능한 양이 표시됩니다. 수집된 사용자 지정 메트릭 및 인덱싱된 사용자 지정 메트릭, 그리고 [Metrics without Limits™][5]에 대해 자세히 알아보세요. 

## 사용자 지정 메트릭 계수 {#counting-custom-metrics}

특정 메트릭 이름과 연결된 사용자 지정 메트릭의 수는 메트릭 [제출 유형][6]에 따라 다릅니다. 아래에 다음 상황을 가정했을 때 사용자 지정 메트릭을 세는 방법을 예를 들어 설명했습니다.

호스트 2곳(`host:A`,`host:B`)에서 메트릭 `request.Latency`를 제출한다고 가정하겠습니다. 이 메트릭은 엔드포인트 요청의 지연 시간을 측정합니다. 이 메트릭을 다음과 같은 2개의 태그 키로 제출합니다.

- `endpoint`(값 `endpoint:X` 또는 `endpoint:Y`)
- `status`(값 `status:200` 또는 `status:400`)

데이터에서 `endpoint:X`가 두 호스트 모두로 지원되지만 `host:B`에서만 실패한다고 가정하겠습니다. 또한 `endpoint:Y`에 대한 요청은 항상 성공하며 아래에 표시된 것과 같이 `host:B`에만 표시된다고 가정합니다.

{{< img src="account_management/billing/custom_metrics/request_latency.png" alt="요청 지연 시간" style="width:80%;">}}

{{< tabs >}}
{{% tab "Count, Rate"%}}

[COUNT][1] 및 [RATE][2]의 사용자 지정 메트릭 수도 같은 로직으로 계산됩니다.

이 태깅 체계를 사용하여 RATE 메트릭에 대해 제출된 고유한 태그 값 조합의 수는 **4개**입니다.

- `host:A`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:400`
- `host:B`, `endpoint:Y`, `status:200`

이로 인해 `request.Latency`가 **4개의 사용자 지정 메트릭**을 보고합니다. 

### 태그 추가로 발생하는 영향 {#effect-of-adding-tags}

태그를 추가해도 사용자 지정 메트릭이 늘지 **않을 수** 있습니다. 사용자 지정 메트릭의 수는 일반적으로 가장 세분화된 태그 또는 상세한 태그에 따라 달라집니다. 미국에서 온도를 측정하고, 국가 및 지역에 따라 `temperature` 메트릭을 태그했다고 가정하겠습니다. 다음 내용을 Datadog에 제출합니다.

| 메트릭 이름   | 태그 값                         |
|---------------|------------------------------------|
| `temperature` | `country:USA`, `region: Northeast` |
| `temperature` | `country:USA`, `region: Southeast` |

태그 `city`를 추가하려고 하고, 이 태그에 값이 `NYC`, `Miami`, `Orlando`로 3개 있다고 가정하겠습니다. 이 태그를 추가하면 데이터 세트에 세부 정보와 세분성이 더해지기 때문에(아래 표시된 내용 참조) 사용자 지정 메트릭의 수가 늘어납니다.

| 메트릭 이름   | 태그 값                                          |
|---------------|-----------------------------------------------------|
| `temperature` | `country:USA`, `region: Northeast`, `city: NYC`     |
| `temperature` | `country:USA`, `region: Southeast`, `city: Orlando` |
| `temperature` | `country:USA`, `region: Southeast`, `city: Miami`   |

`temperature`에서 보고되는 사용자 지정 메트릭의 수는 가장 세분화된 태그인 `city`에 따라 달라집니다.

온도 메트릭을 `state`(값은 `NY`, `Florida`로 2개)로 태그하려 한다고 합시다. 이 말은 온도를 `country`, `region`, `state` 및 `city` 태그로 태그한다는 의미입니다. 주(state) 태그를 추가해도 시(city) 태그가 제공해 이미 데이터 세트에 있는 세분화 정도가 커지지 않습니다.

플로리다의 온도를 얻으려면 다음과 같은 사용자 지정 메트릭을 다시 조합할 수 있습니다.

- `temperature{country:USA, state:Florida, city:Orlando}`
- `temperature{country:USA, state:Florida, city:Miami}`

**참고**: 태그 값의 순서를 변경해도 고유성이 추가되지 않습니다. 다음 조합은 동일한 사용자 지정 메트릭입니다.

- `temperature{country:USA, state:Florida, city:Miami}`
- `temperature{state:Florida, city:Miami, country:USA}`

### Metrics without Limits™로 태그 구성 {#configure-tags-with-metrics-without-limits}

[Metrics without Limits™][3]를 사용하여 태그를 구성해 사용자 지정 메트릭 볼륨에 영향을 미칠 수 있습니다. Metrics without Limits™는 수집 비용을 인덱싱 비용과 분리하기 때문에 Datadog에 계속 모든 데이터를 전송하면서(모든 것이 수집됨) Datadog 플랫폼에서 쿼리 가능한 상태로 유지되기를 바라지 않는 태그의 허용 목록을 지정할 수 있습니다. 이제 Datadog이 구성된 메트릭에 대하여 수집하는 데이터의 볼륨이 인덱싱한, 더 작은 크기의 나머지 볼륨과 다르기 때문에 사용량 페이지와 Metrics Summary 페이지에 두 개의 서로 다른 볼륨이 표시되게 됩니다. 
 
- **수집된 사용자 지정 메트릭**: 수집된 모든 태그에 기반한 원래 사용자 지정 메트릭 볼륨(코드를 통해 전송됨)
- **인덱싱된 사용자 지정 메트릭**: Datadog 플랫폼에서 쿼리 가능한 상태로 유지되는 사용자 지정 메트릭의 볼륨(Metrics without Limits™ 구성 기반) 

**참고: 수집된 사용자 지정 메트릭 볼륨에는 구성된 메트릭만 포함됩니다.** 메트릭이 Metrics without Limits™로 구성되지 않은 경우, 인덱싱된 사용자 지정 메트릭 볼륨에 대해서만 요금이 부과됩니다.

#### 수집된 사용자 지정 메트릭과 인덱싱된 사용자 지정 메트릭의 요금은 언제 부과되나요? {#when-are-you-charged-for-ingested-vs-indexed-custom-metrics}
Metrics without Limits™로 구성되지 않은 메트릭의 경우, 인덱싱된 사용자 지정 메트릭에 대하여 요금을 지불합니다.

|                                      | 인덱싱된 사용자 지정 메트릭<br>(시간당 사용자 지정 메트릭의 월 평균 개수 기반)                                        |
|--------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| 계정 할당량                    | - Pro: 호스트당 인덱싱된 사용자 지정 메트릭 100개 <br>- Enterprise: 호스트당 인덱싱된 사용자 지정 메트릭 200개                             |
| 계정 할당량을 초과하는 사용량 | 계정 할당량을 기준으로 인덱싱된 사용자 지정 메트릭 수가 100개를 초과할 때마다 현재 계약에 명시된 금액이 부과됩니다. |

Metrics without Limits™를 사용하여 구성된 메트릭의 경우(태그가 구성됨) 수집된 사용자 지정 메트릭 및 인덱싱된 사용자 지정 메트릭에 대하여 요금을 지불합니다.

|                                      | 수집된 사용자 지정 메트릭                                                                           | 인덱싱된 사용자 지정 메트릭                                                                                                        |
|--------------------------------------|---------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| 계정 할당량                    | - Pro: 호스트당 수집된 사용자 지정 메트릭 100개<br>- Enterprise: 호스트당 수집된 사용자 지정 메트릭 200개 | - Pro: 호스트당 인덱싱된 사용자 지정 메트릭 100개<br>- Enterprise: 호스트당 인덱싱된 사용자 지정 메트릭 200개                               |
| 계정 할당량을 초과하는 사용량 | 계정 할당량을 기준으로 수집된 사용자 지정 메트릭 수가 100개를 초과할 때마다 $0.10가 부과됩니다.                   | 계정 할당량을 기준으로 인덱싱된 사용자 지정 메트릭 수가 100개를 초과할 때마다 현재 계약에 명시된 금액이 부과됩니다. |

Metrics without Limits™를 사용하여 `endpoint` 및 `status` 태그만 유지함으로써 `request.Latency` 메트릭 크기를 줄이려고 한다고 가정하겠습니다. 이렇게 하면 다음과 같은 세 가지 고유한 태그 조합이 발생합니다.

- `endpoint:X`, `status:200`
- `endpoint:X`, `status:400`
- `endpoint:Y`, `status:200`

태그 구성의 결과, `request.Latency`가 총 **3개의 인덱싱된 사용자 지정 메트릭**을 보고하게 됩니다. 이 메트릭에서 전송된 원본 태그에 따라, `request.Latency`의 원래 **수집된** 사용자 지정 메트릭 볼륨은 **수집된 사용자 지정 메트릭 4개**입니다.

[Metrics without Limits™][3]에 대해 자세히 알아보세요.

[1]: /ko/metrics/types/?tab=count#metric-types
[2]: /ko/metrics/types/?tab=rate#metric-types
[3]: /ko/metrics/metrics-without-limits
{{% /tab %}}
{{% tab "게이지" %}}
이 태깅 체계를 사용하여 GAUGE 메트릭에 대해 제출된 고유한 태그 값 조합의 수는 **4개**입니다.

- `host:A`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:400`
- `host:B`, `endpoint:Y`, `status:200`

이로 인해 `request.Latency`가 **4개의 사용자 지정 메트릭**을 보고합니다. 

### 태그 추가로 발생하는 영향 {#effect-of-adding-tags-1}

태그를 추가해도 사용자 지정 메트릭이 늘지 **않을 수** 있습니다. 사용자 지정 메트릭의 수는 일반적으로 가장 세분화된 태그 또는 상세한 태그에 따라 달라집니다. 미국에서 온도를 측정하고, 국가 및 지역에 따라 `temperature` 메트릭을 태그했다고 가정하겠습니다. 다음 내용을 Datadog에 제출합니다.

| 메트릭 이름   | 태그 값                         |
|---------------|------------------------------------|
| `temperature` | `country:USA`, `region: Northeast` |
| `temperature` | `country:USA`, `region: Southeast` |

태그 `city`를 추가하려고 하고, 이 태그에 값이 `NYC`, `Miami`, `Orlando`로 3개 있다고 가정하겠습니다. 이 태그를 추가하면 데이터 세트에 세부 정보와 세분성이 더해지기 때문에(아래 표시된 내용 참조) 사용자 지정 메트릭의 수가 늘어납니다.

| 메트릭 이름   | 태그 값                                          |
|---------------|-----------------------------------------------------|
| `temperature` | `country:USA`, `region: Northeast`, `city: NYC`     |
| `temperature` | `country:USA`, `region: Southeast`, `city: Orlando` |
| `temperature` | `country:USA`, `region: Southeast`, `city: Miami`   |

`temperature`에서 보고되는 사용자 지정 메트릭의 수는 가장 세분화된 태그인 `city`에 따라 달라집니다.

온도 메트릭을 `state`(값은 `NY`, `Florida`로 2개)로 태그하려 한다고 합시다. 이 말은 온도를 `country`, `region`, `state` 및 `city`로 태깅한다는 의미입니다. 주(state) 태그를 추가해도 시(city) 태그가 제공해 이미 데이터 세트에 있는 세분화 정도가 커지지 않습니다.

플로리다의 온도를 얻으려면 다음과 같은 사용자 지정 메트릭을 다시 조합할 수 있습니다.

- `temperature{country:USA, state:Florida, city:Orlando}`
- `temperature{country:USA, state:Florida, city:Miami}`

**참고**: 태그 값의 순서를 변경해도 고유성이 추가되지 않습니다. 다음 조합은 동일한 사용자 지정 메트릭입니다.

- `temperature{country:USA, state:Florida, city:Miami}`
- `temperature{state:Florida, city:Miami, country:USA}`

### Metrics without Limits™로 태그 구성 {#configure-tags-with-metrics-without-limits-1}

[Metrics without Limits™][4]를 사용하여 태그를 구성해 사용자 지정 메트릭 볼륨에 영향을 미칠 수 있습니다. Metrics without Limits™는 수집 비용을 인덱싱 비용과 분리하기 때문에 Datadog에 계속 모든 데이터를 전송하면서(모든 것이 수집됨) Datadog 플랫폼에서 쿼리 가능한 상태로 유지되기를 바라지 않는 태그의 허용 목록을 지정할 수 있습니다. 이제 Datadog이 구성된 메트릭에 대하여 수집하는 데이터의 볼륨이 인덱싱한, 더 작은 크기의 나머지 볼륨과 다르기 때문에 사용량 페이지와 Metrics Summary 페이지에 두 개의 서로 다른 볼륨이 표시되게 됩니다. 
 
- **수집된 사용자 지정 메트릭**: 수집된 모든 태그에 기반한 원래 사용자 지정 메트릭 볼륨(코드를 통해 전송됨)
- **인덱싱된 사용자 지정 메트릭**: Datadog 플랫폼에서 쿼리 가능한 상태로 유지되는 사용자 지정 메트릭의 볼륨(Metrics without Limits™ 구성 기반) 

**참고: 수집된 사용자 지정 메트릭 볼륨에는 구성된 메트릭만 포함됩니다.** 메트릭이 Metrics without Limits™로 구성되지 않은 경우, 인덱싱된 사용자 지정 메트릭 볼륨에 대해서만 요금이 부과됩니다.

#### 수집된 사용자 지정 메트릭과 인덱싱된 사용자 지정 메트릭의 요금은 언제 부과되나요? {#when-are-you-charged-for-ingested-vs-indexed-custom-metrics-1}
Metrics without Limits™로 구성되지 않은 메트릭의 경우, 인덱싱된 사용자 지정 메트릭에 대하여 요금을 지불합니다.

|                                      | 인덱싱된 사용자 지정 메트릭<br>(시간당 사용자 지정 메트릭의 월 평균 개수 기반)                                        |
|--------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| 계정 할당량                    | - Pro: 호스트당 인덱싱된 사용자 지정 메트릭 100개 <br>- Enterprise: 호스트당 인덱싱된 사용자 지정 메트릭 200개                             |
| 계정 할당량을 초과하는 사용량 | 계정 할당량을 기준으로 인덱싱된 사용자 지정 메트릭 수가 100개를 초과할 때마다 현재 계약에 명시된 금액이 부과됩니다. |

Metrics without Limits™를 사용하여 구성된 메트릭의 경우(태그가 구성됨) 수집된 사용자 지정 메트릭 및 인덱싱된 사용자 지정 메트릭에 대하여 요금을 지불합니다.

|                                      | 수집된 사용자 지정 메트릭                                                                           | 인덱싱된 사용자 지정 메트릭                                                                                                        |
|--------------------------------------|---------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| 계정 할당량                    | - Pro: 호스트당 수집된 사용자 지정 메트릭 100개<br>- Enterprise: 호스트당 수집된 사용자 지정 메트릭 200개 | - Pro: 호스트당 인덱싱된 사용자 지정 메트릭 100개<br>- Enterprise: 호스트당 인덱싱된 사용자 지정 메트릭 200개                               |
| 계정 할당량을 초과하는 사용량 | 계정 할당량을 기준으로 수집된 사용자 지정 메트릭 수가 100개를 초과할 때마다 $0.10가 부과됩니다.                   | 계정 할당량을 기준으로 인덱싱된 사용자 지정 메트릭 수가 100개를 초과할 때마다 현재 계약에 명시된 금액이 부과됩니다. |

기본적으로 다음과 같은 집계를 쿼리에 사용할 수 있습니다.
- 그룹화 기준 `SUM` 및 롤업 기준 `AVG`
- 그룹화 기준 `MAX` 및 롤업 기준 `AVG`
- 그룹화 기준 `MIN` 및 롤업 기준 `AVG`
- 그룹화 기준 `AVG` 및 롤업 기준 `SUM`
- 그룹화 기준 `SUM` 및 롤업 기준 `SUM`
- 그룹화 기준 `MAX` 및 롤업 기준 `MAX`
- 그룹화 기준 `MIN` 및 롤업 기준 `MIN`
- 그룹화 기준 `SUM` 및 롤업 기준 `COUNT`

인덱싱된 사용자 지정 메트릭 개수는 활성화된 집계 수에 따라 **달라지지 않습니다**.

[Metrics without Limits™][1]에 대해 자세히 알아보세요.

[1]: /ko/metrics/metrics-without-limits
{{% /tab %}}
{{% tab "Histogram" %}}

**HISTOGRAM 메트릭은 기본적으로 각각의 고유한 메트릭 이름과 태그 값에 대한 사용자 지정 메트릭 다섯 개를 생성**하여 Agent 측 집계 `max`, `median`, `avg`, `95pc` 및 `count`를 지원합니다. [HISTOGRAM 메트릭 유형에 대해 자세히 알아보세요][1].

이 태깅 체계를 사용하여 HISTOGRAM 메트릭에 대해 제출된 고유한 태그 값 조합의 수는 **4개**입니다.

- `host:A`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:400`
- `host:B`, `endpoint:Y`, `status:200`

기본적으로 Agent는 원래의 4가지 고유한 태그 값 조합 각각에 대하여 사용자 지정 메트릭을 5개 생성합니다. 이것은 [활성화된 각 Agent 측 집계][2] `avg`, `count`, `median`, `95percentile` 및 `max`를 감안한 것입니다. 그 결과 `request.Latency`는 총 **4\*5 = 20개의 사용자 지정 메트릭**을 보고합니다.

**참고**: HISTOGRAM 메트릭에 집계를 추가하면 보고되는 고유한 사용자 지정 메트릭 수가 증가합니다. 집계를 제거하면 보고되는 사용자 지정 메트릭 수가 감소합니다.

- [datadog.yaml 구성 파일][3]의 `histogram_aggregates` 파라미터를 사용하여 Datadog으로 전송하고자 하는 집계가 무엇인지 구성합니다. 기본적으로 `max`, `median`, `avg`, `count` 집계만 Datadog에 전송됩니다. 원한다면 `sum` 및 `min`도 사용할 수 있습니다.
- [datadog.yaml 구성 파일][3]의 `histogram_percentiles` 파라미터를 사용하여 Datadog으로 전송하고자 하는 백분위수 집계가 무엇인지 구성합니다. 기본적으로 95번째 백분위수인 `95percentile`만 Datadog으로 전송됩니다.


[1]: /ko/metrics/types/?tab=histogram#metric-types
[2]: /ko/metrics/types/?tab=histogram#definition
[3]: /ko/agent/configuration/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{% tab "Distribution" %}}

**DISTRIBUTION 메트릭은 기본적으로 각각의 고유한 메트릭 이름 및 태그 값 조합에 대하여 사용자 지정 메트릭 다섯 개를 생성**하여 값의 전역적 통계 분포를 나타냅니다. 이러한 다섯 개의 사용자 지정 메트릭은 `count`, `sum`, `min`, `max`, `avg`의 서버 측 집계를 나타냅니다. [DISTRIBUTION 메트릭 유형에 대해 자세히 알아보세요][1].

이 태깅 체계를 사용하여 DISTRIBUTION 메트릭에 대해 제출된 고유한 태그 값 조합의 수는 **4개**입니다.

- `host:A`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:400`
- `host:B`, `endpoint:Y`, `status:200`

[DISTRIBUTION metric][1]의 사용자 지정 메트릭 수는 메트릭 이름 및 태그 값의 고유한 조합보다 다섯 배 많습니다. 이로 인해 `request.Latency`가 총 **5\*4 = 20개의 사용자 지정 메트릭**을 보고합니다.

##### 백분위수 집계 추가 {#adding-percentile-aggregations}

분포 메트릭에 백분위수 집계(`p50`, `p75`, `p90`, `p95` 및 `p99`)를 포함할 수 있습니다. 이러한 추가적인 백분위수 집계를 포함하면 고유한 메트릭 이름 및 태그 값 조합의 다섯 배에 해당하는 추가적인 볼륨이 발생합니다(**5\*4 = 20개의 사용자 지정 메트릭**). 따라서 이 백분위수 집계를 포함한 분산 메트릭에서 발생하는 사용자 지정 메트릭의 총 개수는 **2 * (5\*4) = 40개의 사용자 지정 메트릭**입니다.

이 표는 분포 메트릭에 백분위수 집계를 추가했을 때 발생하는 영향을 요약한 것입니다. 

| 메트릭                                                                                   | 청구 대상 사용자 지정 메트릭 개수 |
|-------------------------------------------------------------------------------------------|-----------------------------------|
| 기준 분포의 사용자 지정 메트릭 개수(count, sum, min, max, avg)         | `5*(tag value combinations)`      |
| 백분위수 집계를 포함한 사용자 지정 메트릭 개수(p50, p75, p90, p95, p99) | `5*(tag value combinations)`      |
| 총계                                                                                     | `2*5(tag value combinations)`     |

### Metrics without Limits™로 태그 구성 {#configure-tags-with-metrics-without-limits-2}

[Metrics without Limits™][2]를 사용하여 태그 및 집계를 구성해 사용자 지정 메트릭 볼륨에 영향을 미칠 수 있습니다. Metrics without Limits™는 수집 비용을 인덱싱 비용과 분리하기 때문에 Datadog에 계속 모든 데이터를 전송하면서(모든 것이 수집됨) Datadog 플랫폼에서 쿼리 가능한 상태로 유지되기를 바라지 않는 태그의 허용 목록을 지정할 수 있습니다. 이제 Datadog이 구성된 메트릭에 대하여 수집하는 데이터의 볼륨이 인덱싱한, 더 작은 크기의 나머지 볼륨과 다르기 때문에 사용량 페이지와 Metrics Summary 페이지에 두 개의 서로 다른 볼륨이 표시되게 됩니다. 
 
- **수집된 사용자 지정 메트릭**: 수집된 모든 태그에 기반한 원래 사용자 지정 메트릭 볼륨(코드를 통해 전송됨)
- **인덱싱된 사용자 지정 메트릭**: Datadog 플랫폼에서 쿼리 가능한 상태로 유지되는 사용자 지정 메트릭의 볼륨(Metrics without Limits™ 구성 기반) 

**참고: 수집된 사용자 지정 메트릭 볼륨에는 구성된 메트릭만 포함됩니다.** 메트릭이 Metrics without Limits™로 구성되지 않은 경우, 인덱싱된 사용자 지정 메트릭 볼륨에 대해서만 요금이 부과됩니다.

#### 수집된 사용자 지정 메트릭과 인덱싱된 사용자 지정 메트릭의 요금은 언제 부과되나요? {#when-are-you-charged-for-ingested-vs-indexed-custom-metrics-2}
Metrics without Limits™로 구성되지 않은 메트릭의 경우, 인덱싱된 사용자 지정 메트릭에 대하여 요금을 지불합니다.

|                                      | 인덱싱된 사용자 지정 메트릭<br>(시간당 사용자 지정 메트릭의 월 평균 개수 기반)                                        |
|--------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| 계정 할당량                    | - Pro: 호스트당 인덱싱된 사용자 지정 메트릭 100개 <br>- Enterprise: 호스트당 인덱싱된 사용자 지정 메트릭 200개                             |
| 계정 할당량을 초과하는 사용량 | 계정 할당량을 기준으로 인덱싱된 사용자 지정 메트릭 수가 100개를 초과할 때마다 현재 계약에 명시된 금액이 부과됩니다. |

Metrics without Limits™를 사용하여 구성된 메트릭의 경우(태그/집계가 구성됨) 수집된 사용자 지정 메트릭 및 인덱싱된 사용자 지정 메트릭에 대하여 요금을 지불합니다.

|                                      | 수집된 사용자 지정 메트릭                                                                           | 인덱싱된 사용자 지정 메트릭                                                                                                        |
|--------------------------------------|---------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| 계정 할당량                    | - Pro: 호스트당 수집된 사용자 지정 메트릭 100개<br>- Enterprise: 호스트당 수집된 사용자 지정 메트릭 200개 | - Pro: 호스트당 인덱싱된 사용자 지정 메트릭 100개<br>- Enterprise: 호스트당 인덱싱된 사용자 지정 메트릭 200개                               |
| 계정 할당량을 초과하는 사용량 | 계정 할당량을 기준으로 수집된 사용자 지정 메트릭 수가 100개를 초과할 때마다 $0.10가 부과됩니다.                   | 계정 할당량을 기준으로 인덱싱된 사용자 지정 메트릭 수가 100개를 초과할 때마다 현재 계약에 명시된 금액이 부과됩니다. |

`request.Latency` 메트릭과 연결된 `endpoint` 및 `status` 태그만 유지하려고 한다고 가정하겠습니다. 이렇게 하면 다음과 같은 세 가지 고유한 태그 조합이 발생합니다.

- `endpoint:X`, `status:200`
- `endpoint:X`, `status:400`
- `endpoint:Y`, `status:200`

[DISTRIBUTION metric][1]의 사용자 지정 메트릭 수는 메트릭 이름 및 태그 값의 고유한 조합보다 다섯 배 많습니다. 태그 사용자 지정의 결과, `request.Latency`가 총 **5\*3 = 15개의 인덱싱된 사용자 지정 메트릭**을 보고하게 됩니다. 원래 이 메트릭에서 전송된 태그에 따라, `request.Latency`의 원래 **수집된** 사용자 지정 메트릭 볼륨은 **수집된 사용자 지정 메트릭 20개**입니다.

[Metrics without Limits™][2]에 대해 자세히 알아보세요.

[1]: /ko/metrics/types/?tab=distribution#definition
[2]: /ko/metrics/metrics-without-limits
{{% /tab %}}
{{< /tabs >}}

## 사용자 지정 메트릭 추적 {#tracking-custom-metrics}

관리 사용자([Datadog Admin 역할][7]이 있는 사용자)는 시간당 **수집된** 사용자 지정 메트릭 및 **인덱싱된** 사용자 지정 메트릭의 월별 평균 개수를 확인할 수 있습니다. 맨 위의 사용자 지정 메트릭 표에는 [사용량 세부 정보 페이지][8]의 **인덱싱된** 사용자 지정 메트릭 평균 개수도 나열됩니다. 자세한 내용은 [사용량 세부 정보][9] 설명서를 참조하세요.

특정 메트릭 이름의 사용자 지정 메트릭 개수를 실시간 추적하는 것과 관련한 자세한 내용은 [Metrics Summary 페이지][10]에서 메트릭 이름을 클릭하여 참조하세요. 메트릭의 세부 정보 사이드 패널에서 **수집된** 사용자 지정 메트릭 및 **인덱싱된** 사용자 지정 메트릭 개수를 조회할 수 있습니다. 

{{< img src="account_management/billing/custom_metrics/mwl_sidepanel_ingested_3142025.jpg" alt="Metrics Summary 사이드 패널" style="width:80%;">}}


## 할당 {#allocation}

Datadog 요금 플랜에 따라 특정 개수의 **수집된** 사용자 지정 메트릭 및 **인덱싱된** 사용자 지정 메트릭이 할당됩니다.

- Pro: 호스트당 수집된 사용자 지정 메트릭 100개, 호스트당 인덱싱된 사용자 지정 메트릭 100개
- Enterprise: 호스트당 수집된 사용자 지정 메트릭 200개, 호스트당 인덱싱된 사용자 지정 메트릭 200개

이러한 할당은 인프라 전체에서 계수됩니다. 예를 들어 Pro 플랜을 이용 중이고 호스트 3개에 대하여 라이선싱된 경우, 인덱싱된 사용자 지정 메트릭 300개가 할당됩니다. 인덱싱된 사용자 지정 메트릭 300개는 각 호스트에 균등하게 나뉠 수 있거나, 하나의 호스트가 인덱싱된 메트릭 300개를 사용할 수도 있습니다. 아래 그래프에는 이 예시를 사용하여 할당된 사용자 지정 메트릭 개수를 초과하지 않는 상황을 표시했습니다.

{{< img src="account_management/billing/custom_metrics/host_custom_metrics.png" alt="사용자 지정 메트릭 할당" >}}

인덱싱된 사용자 지정 메트릭의 청구 가능한 개수는 주어진 달의 시간당 사용자 지정 메트릭의 평균 개수(모든 유료 호스트에서)를 기반으로 합니다. 청구 가능한 수집된 사용자 지정 메트릭 수가 늘어나는 경우는 Metrics without Limits™를 사용하여 메트릭을 구성했을 때뿐입니다. 계정의 사용자 지정 메트릭에 대해 논의하거나 더 많은 사용자 지정 메트릭 패키지를 구매하려면 [영업팀][11] 또는 [고객 성공][12] 관리자에게 문의하세요.

## 문제 해결 {#troubleshooting}

기술적 지원이 필요한 경우에는 [Datadog 지원팀][13]에 문의하세요.

요금 청구와 관련한 질문이 있을 경우에는 담당 [고객 성공][12] 매니저에게 문의하세요.

[1]: /ko/integrations/
[2]: /ko/metrics/custom_metrics/
[3]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/
[4]: /ko/metrics/custom_metrics/agent_metrics_submission/
[5]: /ko/metrics/metrics-without-limits
[6]: /ko/metrics/types/#metric-types
[7]: /ko/account_management/users/default_roles/
[8]: https://app.datadoghq.com/billing/usage
[9]: /ko/account_management/plan_and_usage/usage_details/
[10]: https://app.datadoghq.com/metric/summary
[11]: mailto:sales@datadoghq.com
[12]: mailto:success@datadoghq.com
[13]: /ko/help/
[14]: /ko/metrics/custom_metrics/#standard-integrations
[15]: /ko/account_management/billing/metric_name_pricing/