---
aliases:
- /ko/graphing/functions/rollup/
description: 메트릭에 사용자 지정 롤업 함수와 이동 롤업을 사용하여 시간 집계 및 데이터 포인트 간격을 제어하세요.
further_reading:
- link: /dashboards/guide/rollup-cardinality-visualizations
  tag: 문서
  text: 시각화에서 롤업 함수 및 카디널리티 이해하기
title: 롤업
---
모든 메트릭 쿼리는 본질적으로 집계됩니다. 그러나 쿼리 끝에 `.rollup()` 함수를 추가하면 기본값을 재정의하는 사용자 지정 [시간 집계][1]를 수행할 수 있습니다. 이 함수를 사용하면 다음 항목을 정의할 수 있습니다.

* 롤업 `<interval>`: 데이터가 집계되는 시간 간격입니다([쿼리에서 강제하는 롤업 간격보다 큰 경우)](#rollup-interval-enforced-vs-custom).
* 롤업 `<aggregator>`: 주어진 롤업 시간 간격 내에서 데이터 포인트가 집계되는 방식입니다.

롤업을 적용하려면 그래프 편집기의 {{< ui >}}Add function{{< /ui >}} (Σ) 버튼으로 이동하세요. 

{{< img src="dashboards/functions/rollup/rollup_option_1.mp4" alt="Add function 버튼에서 Rollup average 옵션을 선택하세요." video=true >}}

**참고**: 분포 메트릭 유형에는 롤업 `aggregator` 파라미터가 없습니다. 이 메트릭 유형은 시간과 공간 둘 다에서 집계됩니다. 자세한 내용은 [백분위수가 포함된 분포에 대한 롤업][2] 문서를 참조하세요.

이 함수는 `<AGGREGATOR>`와 필요시 `<INTERVAL>`(`.rollup(<AGGREGATOR>,<INTERVAL>)` 또는 `.rollup(<AGGREGATOR>)`), 이렇게 2개의 파라미터를 사용합니다.

| 파라미터  | 설명                                                                                                     |
|------------|-----------------------------------------------------------------------------------------------------------------|
| `<AGGREGATOR>` | `avg`, `sum`, `min`, `max` 또는 `count`일 수 있으며, 주어진 시간 간격 내에서 데이터 포인트가 집계되는 방식을 정의합니다. [강제 적용 기본값](#rollup-interval-enforced-vs-custom): `avg`. |
| `<INTERVAL>`   | 표시되는 두 데이터 포인트 사이의 시간 간격(초)입니다. 선택 사항입니다.                                            |

개별적으로 또는 함께 사용할 수 있습니다(예: `.rollup(sum,120)`). 다음 막대 그래프는 `.rollup()` 함수를 **사용하지 않고** 호스트에 대한 일주일간의 CPU 사용량을 보여줍니다.

{{< img src="dashboards/functions/rollup/smooth_1.png" alt="smooth_1" style="width:60%;" >}}

다음 막대 그래프는 `.rollup(avg,86400)`과 함께 일간 롤업을 사용하여 그래프화한 동일한 메트릭을 표시합니다.

{{< img src="dashboards/functions/rollup/smooth_2.png" alt="smooth_2" style="width:60%;" >}}

## 이동 롤업 {#moving-rollup}


| 함수        | 설명                                    | 예시 |
|------------------|------------------------------------------------|------------------|
| `moving_rollup` | 롤업하여 마지막 X초의 포인트를 결합합니다. | `moving_rollup(<METRIC_NAME>, <INTERVAL> , <AGGREGATOR>)` |


쿼리에 `moving_rollup()` 함수를 적용하면 가장 최근의 지정된 시간 범위(즉, 마지막 X초)의 포인트를 결합할 수 있습니다. `.rollup()`과 마찬가지로 `<AGGREGATOR>`는 `sum`/`min`/`max`/`count`/`avg`일 수 있으며, 주어진 시간 간격 내에서 데이터 포인트가 집계되는 방식을 정의합니다.

## 롤업 간격: 강제 대 사용자 지정 {#rollup-interval-enforced-vs-custom}

그래프를 작성할 때 Datadog은 시계열당 포인트 수에 제한을 설정합니다. 시각적 명확성을 유지하기 위해 시계열은 최대 1,500개의 포인트를 가질 수 있습니다. 이 제한을 준수하기 위해 Datadog은 데이터 포인트를 자동으로 롤업하며, 기본적으로 `avg` 메서드를 사용하여 주어진 메트릭에 대한 시간 간격 내의 모든 데이터 포인트 평균을 효과적으로 표시합니다. 기본 롤업 시간 간격은 데이터가 시각화되는 방식에 따라 달라집니다. 이러한 기본 시간 집계 간격을 참조하려면 다음 차트를 확인하세요.

| 시간 프레임          | 롤업 간격, 선 그래프 | 롤업 간격, 막대 그래프 | 롤업 간격, API |
|---------------------|-----------------------------|----------------------------|----------------------|
| 지난 1분     | 1초                          | 1초                         | 1초                   |
| 지난 5분  | 2초                          | 5초                         | 2초                   |
| 지난 15분 | 5초                          | 10초                        | 5초                   |
| 지난 30분 | 10초                         | 30초                        | 10초                  |
| 지난 1시간       | 20초                         | 1분                         | 20초                  |
| 지난 4시간 | 1분                          | 2분                         | 1분                   |
| 지난 1일        | 5분                          | 20분                        | 5분                   |
| 지난 2일   | 10분                         | 30분                        | 10분                  |
| 지난주       | 1시간                         | 2시간                        | 1시간                  |
| 지난달      | 4시간                         | 12시간                       | 4시간                  |
| 지난 3개월   | 12시간                        | 1일                         | 12시간                 |
| 지난 6개월   | 1일                          | 1일                         | 1일                   |
| 지난 1년       | 1일                          | 1주                         | 1일                   |

사용자 지정 `.rollup()` 함수를 사용하여 적용할 시간 집계 유형(`avg`, `min`, `max`, `count` 또는 `sum`)과 필요시 롤업할 시간 간격을 지정할 수 있습니다. 이 함수를 사용하면 롤업 시간 간격을 기본값이 아닌 다른 값으로, 최대 1,500개 포인트까지 설정할 수 있습니다. 하루 동안 분당 최대 1개 포인트를 지원합니다.

**참고**:
- [쿼리 값 위젯][8]은 선 그래프 및 막대 그래프 위젯에서 사용하는 1,500개 포인트 대신 150개 포인트를 대상으로 합니다. 동일한 기간의 경우, 이로 인해 쿼리 값 위젯에 더 큰 유효 롤업 간격이 적용됩니다.
- `COUNT` 및 `RATE` 유형 메트릭에 대한 쿼리에는 UI에 `.as_count()` 수정자가 자동으로 추가되며, 이는 사용되는 롤업 메서드를 `sum`으로 설정하고 보간을 비활성화합니다. 이 `.as_count()`는 쿼리 끝에 명시적으로 표시됩니다.

  {{< img src="dashboards/functions/rollup/as_count_dropdown.png" alt="as_count" style="width:100%;">}}

`.as_count()` 및 `.as_rate()` 사용 방법에 대한 자세한 내용은 [StatsD 메트릭 시각화][3] 블로그 게시물을 참조하거나, [인앱 수정자 안내][4] 문서에서 이러한 함수의 효과에 대해 자세히 알아보세요.

## 달력 기준 쿼리를 사용한 롤업 {#rollup-with-calendar-aligned-queries}

{{< img src="dashboards/functions/rollup/calendar_aligned_queries.png" alt="calendar_aligned_queries" style="width:100%;" >}}

달력 기준 쿼리와 함께 `.rollup()` 함수를 사용할 때, 메트릭 데이터가 시간에 따라 버킷화되는 방식을 사용자 지정할 수 있습니다. 이 기능을 사용하면 다음 항목을 유연하게 정의할 수 있습니다.

* 시작 날짜와 시간대를 조정할 수 있는 달력 기준 월별 쿼리. 예를 들어, 작년 2월과 12월의 월별 클라이언트 오류를 비교할 수 있습니다.
* 시작 날짜와 시간대를 조정할 수 있는 주간 롤업. 예를 들어, (한 주가 월요일에 시작되는 경우) 얼마나 많은 주간 트랜잭션이 진행 중인지 확인할 수 있습니다.
* 시작 시간과 시간대를 조정할 수 있는 일간 롤업. 예를 들어, (하루가 태평양 표준시 자정에 시작되는 경우) 현재 날짜에 발생한 관심 이벤트 수를 확인할 수 있습니다.

달력 기준 롤업 구문은 달력 단위와 선택적 정렬 요일 및 시간대를 사용하여 `.rollup()`을 확장합니다.

`.rollup(<AGGREGATOR>, <CALENDAR_UNIT>, <ALIGNMENT>, '<TIMEZONE>')`

| 파라미터        | 설명                                                                                                          |
|------------------|----------------------------------------------------------------------------------------------------------------------|
| `<AGGREGATOR>`   | `avg`, `sum`, `min`, `max` 또는 `count`일 수 있습니다.                                                                       |
| `<CALENDAR_UNIT>`| `daily`, `weekly` 또는 `monthly`입니다.                                                                                     |
| `<ALIGNMENT>`    | `weekly`의 경우 소문자 요일 이름(`monday`, `tuesday`, ..., `sunday`)으로 된 시작 요일입니다. 생략 시 `sunday`로 기본 설정됩니다. `daily`의 경우 시작 시간입니다(예: `12am`). `monthly`의 경우 시작 날짜입니다. |
| `<TIMEZONE>`     | 필요시 [IANA 시간대][7] 문자열입니다(예: `America/New_York` 또는 `Europe/Paris`). 생략 시 UTC로 기본 설정됩니다.    |

**예시**:

월요일(UTC)에 시작하는 주간 롤업은 다음과 같습니다.

```
sum:requests.count{*}.as_count().rollup(sum, weekly, monday)
```

동부 표준시 기준 월요일에 시작하는 주간 롤업은 다음과 같습니다.

```
sum:requests.count{*}.as_count().rollup(sum, weekly, monday, 'America/New_York')
```

태평양 표준시 기준 자정에 시작하는 일간 롤업은 다음과 같습니다.

```
sum:requests.count{*}.as_count().rollup(sum, daily, 12am, 'America/Los_Angeles')
```

## 모니터링에서 롤업 {#rollups-in-monitors}

롤업 간격과 모니터링의 평가 기간 간의 불일치 가능성 때문에 모니터 쿼리에서는 일반적으로 롤업을 사용하지 않는 것이 좋습니다. 롤업 간격의 시작과 끝은 모니터 쿼리의 시작과 끝이 아니라 UNIX 시간에 맞춰 조정됩니다. 따라서 모니터는 데이터의 소규모 샘플만 포함하는 불완전한 롤업 간격을 평가(및 트리거)할 수 있습니다. 이 문제를 방지하려면 귀하의 모니터 평가를 (최소한) 설정 롤업 간격의 길이만큼 지연하세요.

모니터링 쿼리에 예상치 못하게 {{< ui >}}No Data{{< /ui >}}가 표시되는 경우 롤업 및 평가 기간에 대한 설정을 검토하세요. 자세한 내용은 [모니터링에 데이터 없음 문제 해결][6]을 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/dashboards/functions/#add-a-function
[2]: /ko/metrics/faq/rollup-for-distributions-with-percentiles/
[3]: https://www.datadoghq.com/blog/visualize-statsd-metrics-counts-graphing
[4]: /ko/metrics/custom_metrics/type_modifiers/
[5]: /ko/monitors/types/metric/
[6]: /ko/monitors/guide/troubleshooting-no-data/
[7]: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
[8]: /ko/dashboards/widgets/query_value/