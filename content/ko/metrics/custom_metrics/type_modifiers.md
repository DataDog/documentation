---
aliases:
- /ko/developers/metrics/metric_type_modifiers
- /ko/graphing/faq/as_count_validation
- /ko/developers/metrics/type_modifiers/
- /ko/metrics/type_modifiers
further_reading:
- link: /developers/dogstatsd/
  tag: 설명서
  text: DogStatsD에 대해 자세히 알아보기
- link: /developers/community/libraries/
  tag: 설명서
  text: 공식 및 커뮤니티에서 생성한 API 및 DogStatsD 클라이언트 라이브러리
title: 메트릭 유형 한정자
---

[메트릭 유형][1]은 메트릭과 내보내는 소스를 어떻게 대표할지를 보여줍니다. `COUNT` 및 `RATE` 메트릭 유형은 시간에 따른 메트릭 가치 변동을 보여주는 개념이라는 점에서 비슷합니다. 그러나 사용하는 로직이 다릅니다. 

* `RATE`: 시간에 따라 정규화된 값(_1초 당_).
* `COUNT`: 일정 시간 간격에 따른 절댓값 변동

사례와 제출 방법에 따라 둘 중 더 적합한 메트릭 유형을 선택해 제출합니다. 예:

| 제출된 메트릭 유형  | Use case                                                                                                                                                                               |
|-----------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `RATE`                | 여러 호스트에서 시간에 따른 수신 요청 수를 모니터링하고자 합니다.                                                                                                    |
| `RATE`                | 서버에서 시간별 제출 개수를 일관적으로 통제하기 어려운 조건이기 때문에 개별 간격을 정규화하여 업스트림으로 비교하고자 합니다. |
| `COUNT`               | 함수가 호출된 횟수를 계산하고자 합니다.                                                                                                                            |
| `COUNT`               | 특정 기간의 수익을 계산하고자 합니다.                                                                                                        |

`RATE`와 `COUNT`가 같은 메트릭 유형이 아니기 때문에 Datadog 그래프와 모니터 상에서 나타나는 모양과 작동 방식이 다릅니다. 사용 중 `RATE`와 `COUNT` 간 표시를 바꾸려면 그래프와 모니터 내에 있는 Datadog 인앱 한정자 기능을 사용하세요.

## 인앱 한정자

주요 인앱 한정자는 `as_count()`와 `as_rate()`입니다.

| 한정자    | 설명                                                                                                                                                                                                                                                                   |
|--------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `as_count()` | 정해진 메트릭을 `COUNT` 형식으로 표시되도록 필요한 운영 사항을 설정합니다. [반영 간격][2]에 대한 메트릭 값의 절대 변동을 제공합니다. **참고** 반영 간격에 따라 달라지기 때문에, [장기간 간격을 그래프화하면 그래프 모양이 달라집니다][3]. |
| `as_rate()`  | 정해진 메트릭을 `RATE` 형식으로 표시하기 위해 필요한 운영 사항을 설정합니다. 초당 메트릭 값의 절대 변동을 제공합니다.                                                                                                                                     |

적용한 메트릭 유형에 따라 작동 방식이 달라집니다.

{{< tabs >}}
{{% tab "COUNT" %}}

* `as_count()`의 효과:
  * [보간][1]을 비활성화합니다.
  * 시간 애그리게이터를 `SUM`으로 설정합니다.
* `as_rate()`의 효과:
  * [보간][1]을 비활성화합니다.
  * 시간 애그리게이터를 `SUM`으로 설정합니다.
  * 후 집계 결과를 샘플링 간격으로 나누어 정규화합니다. 예를 들어, 1초마다 제출된 포인트 `[1,1,1,1].as_rate()`에 20초 반영 간격일 경우, 결과는 `[0.05, 0.05, 0.05, 0.05]`입니다.

**참고**: 간격이 매우 적을 경우에는 정규화되지 않기 때문에(시간 집계가 일어나지 않음) 원시 메트릭 값 개수로 돌아갑니다.

[1]: /ko/metrics/guide/interpolation-the-fill-modifier-explained/
{{% /tab %}}
{{% tab "RATE" %}}

* `as_count()`의 효과:
  * [보간][1]을 비활성화합니다.
  * 시간 애그리게이터를 SUM으로 설정합니다.
  * 후 집계 결과에 샘플링 간격을 곱합니다. 예를 들어, 1초마다 제출된 포인트 `[0.05, 0.05, 0.05, 0.05].as_count()`에 반영 간격이 20초일 경우, 결과는 `[1,1,1,1]`입니다.
* `as_rate()`의 효과:
  * [보간][1]을 비활성화합니다.
  * 시간 애그리게이터를 `SUM`으로 설정합니다.

[1]: /ko/metrics/guide/interpolation-the-fill-modifier-explained/
{{% /tab %}}
{{% tab "GAUGE" %}}

 `GAUGE` 메트릭 유형은 절대적이고 최종된 메트릭 값을 대표합니다. `as_count()`와 `as_rate()` 한정자의 영향을 받지 않습니다.

{{% /tab %}}
{{< /tabs >}}

### `weighted()` 한정자

<div class="alert alert-info"><code>.weighted()</code> 한정자는 현재 베타 서비스 중입니다. 이 기능을 사용하려면 <a href="https://docs.datadoghq.com/help/" target="_blank">지원 서비스에 문의하세요</a>.</div>

`pod name`과 `container_name`과 같은 태그는 태그 변동률이 높습니다. 특히 비용 관리, 용량 계획, 컨테이너화된 애플리케이션용 자동 크기 조정 등을 위해 쿼리를 생성할 때 더욱 그러합니다. 태그 변동과 관계 없이 게이지에 대해 수학적으로 정확한 쿼리를 생성하려면 인앱 한정자 `.weighted()`를 사용하세요. `.weighted()` 한정자는 Datadog에서 자주 바뀌는 변동 태그 수명에 따라 메트릭 값을 적절하게 가중합니다.

`.weighted()` 한정자는 다음 두 조건을 충족할 때 게이지 쿼리에 자동으로 추가됩니다.

- 게이지 메트릭이 정기적으로 제출되어 갭에 보간이 없음
- 제출 간격이 올바르게 정의되고 설정됨

Datadog Agent나 통합 버전에서 수집 시 메트릭 제출 간격을 설정할 수 있습니다. [메트릭 요약 페이지][4]에서 제출 간격을 수정하세요.

## Datadog 내에서 메트릭 유형 수정하기

일반적으로 필요하지 않지만, [메트릭 요약 페이지][4]에서 메트릭 유형을 변경할 수 있습니다.

{{< img src="metrics/custom_metrics/type_modifiers/metric_type.png" alt="Metric Type" style="width:70%;">}}

사용 사례:

1. 요청 처리 개수를 세는 `app.requests.served` 메트릭이 있으나 실수로 StatsD에서 `GAUGE`로 제출했습니다. 그래서 메트릭의 Datadog 유형이 `GAUGE`입니다.

2. 시간 집계를 위해 StatsD `COUNT` 메트릭으로 `app.requests.served`를 제출하고자 했습니다. 이를 통해 `sum:app.requests.served{*}`로 쿼리하면 _"전날 처리한 요청의 총 개수는?"_과 같은 질문에 대한 답을 얻을 수 있습니다(`GAUGE` 메트릭 유형에서는 불가능).

3. `app.requests.served` 이름을 계속 쓰고 싶다면, 적합한 `COUNT` 유형의 새 메트릭 이름을 제출하는 대신, `app.requests.served`를 다음과 같이 업데이트하여 유형을 바꿀 수 있습니다.
  * N번 요청 처리 후 `dogstatsd.increment('app.requests.served', N)`을 요청하는 제출 코드, 그리고
  * 메트릭 요약 페이지의 Datadog 인앱 유형을 `RATE`로 변경

이렇게 하면 `app.requests.served` 유형 변경 이전에 제출한 데이터가 올바르게 작동하지 않습니다. 왜냐하면 `RATE`이 아니라 인앱 `GAUGE`로 해석되는 형식으로 저장되었기 때문입니다. 3단계 이후에 제출된 데이터는 올바르게 해석됩니다.

`GAUGE`로 제출된 데이터 기록을 잃고 싶지 않은 경우, 새 유형으로 새 메트릭 이름을 생성합니다. 이때, 유형인 `app.requests.served`는 변경하지 않습니다.

**참고**: AgentCheck에서 `self.increment`는 일정하게 증가하는 카운터에 대해 델타를 계산하지 않습니다. 대신 실행 점검 시 통과하는 값을 보고합니다. 델타 값을 일정하게 증가하는 카운터로 보내려면 `self.monotonic_count`를 사용하세요.

[1]: /ko/metrics/types/
[2]: /ko/metrics/introduction/#time-aggregation
[3]: /ko/dashboards/faq/why-does-zooming-out-a-timeframe-also-smooth-out-my-graphs/
[4]: https://app.datadoghq.com/metric/summary