---
aliases:
- /ko/graphing/functions/rollup/
title: 롤업
---

`.rollup()`
`.rollup()` 함수는 모든 메트릭 쿼리에 메트릭 데이터를 본질적으로 집계하는 데 사용됩니다. 그러나 쿼리 끝에 `.rollup()` 함수를 추가하면 기본값을 재정의하는 커스텀 [시간 집계][1]를 수행할 수 있습니다. 이 함수를 사용하면 다음을 정의할 수 있습니다.


* 롤업 `<interval>`: 데이터가 집계되는 시간 간격입니다([강제 쿼리 롤업 간격보다 큰 경우](#rollup-interval-enforced-vs-custom)).
* 롤업 `<aggregator>`: 주어진 롤업 시간 간격 내에서 데이터 포인트가 집계되는 방식입니다.

**참고**: 디스트리뷰션 메트릭 유형에는 롤업 `aggregator` 파라미터가 없습니다. 이 메트릭 유형은 시간과 공간 모두에서 집계됩니다. 자세한 내용은 [퍼센트 비율을 사용한 디스트리뷰션 롤업][2] 문서를 참조하세요.

이 함수는 `<AGGREGATOR>` 및 `.rollup(<AGGREGATOR>,<INTERVAL>)` 또는 `.rollup(<AGGREGATOR>)` 중 하나인 두 개의 파라미터를 사용합니다.

| 파라미터  | 설명                                                                                                     |
|------------|-----------------------------------------------------------------------------------------------------------------|
| `<AGGREGATOR>` | `avg`, `sum`, `min`, `max` 또는 `count`일 수 있으며, 주어진 시간 간격 내에서 데이터 요소가 집계되는 방식을 정의합니다[강제 기본값](#rollup-interval-enforced-vs-custom): `avg`. |
| `<INTERVAL>`   | 두 데이터 포인트 사이의 간격 시간(초)이 표시됩니다. 부수적입니다.                                            |

`.rollup(sum,120)`처럼 개별적으로 또는 함께 사용할 수 있습니다. 다음 막대 그래프는 `.rollup()` 함수를 사용하지 **않은** 호스트의 일주일 CPU 사용량을 표시합니다.

{{< img src="dashboards/functions/rollup/smooth_1.png" alt="smooth_1" style="width:60%;" >}}

다음 막대 그래프는 `.rollup(avg,86400)`와(과) 함께 일별 롤업을 사용하여 그래프화한 동일한 메트릭을 표시합니다.

{{< img src="dashboards/functions/rollup/smooth_2.png" alt="smooth_2" style="width:60%;" >}}

## 이동 롤업


| 함수        | 설명                                    | 예시 |
|------------------|------------------------------------------------|------------------|
| `moving_rollup` | 롤업하여 마지막 X초의 포인트를 결합합니다. | `moving_rollup(<METRIC_NAME>, <INTERVAL> , <AGGREGATOR>)` |


`moving_rollup()` 함수를 쿼리에 적용하면 가장 최근에 지정된 시간 범위, 즉 마지막 X초의 포인트를 결합할 수 있습니다. `.rollup()`처럼 `<AGGREGATOR>`은(는) `sum`/`min`/`max`/`count`/`avg`일 수 있으며, 주어진 시간 간격 내에서 데이터 포인트가 집계되는 방법을 정의합니다.

## 롤업 간격: 강제 대 커스텀

그래프화할 때 Datadog은 그래프당 포인트 수에 제한을 둡니다. 이 제한을 준수하기 위해 Datadog은 `avg` 방법으로 데이터 포인트를 자동으로 롤업하여, 주어진 메트릭에 대한 시간 간격 내 모든 데이터 포인트의 평균을 효과적으로 표시합니다. 이 기본 시간 간격은 데이터가 시각화되는 방식에 따라 다릅니다. 이러한 기본 시간 간격을 참조하려면 다음 차트를 참조하세요.

| 타임프레임           | 롤업 간격, 선 그래프 | 롤업 간격, 막대 그래프 | 롤업 간격, API |
|---------------------|-----------------------------|----------------------------|----------------------|
| 지난 시간       | 20초                         | 1분                         | 20초                  |
| 지난 4시간    | 1분                          | 2분                         | 1분                   |
| 지난 하루        | 5분                          | 20분                        | 5분                   |
| 지난 2일     | 10분                         | 30분                        | 10분                  |
| 지난 주       | 1시간                         | 2시간                        | 1시간                  |
| 지난 달      | 2시간                         | 12시간                       | 4시간                  |

커스텀 `.rollup()` 함수를 사용하여 적용된 시간 집계 유형(`avg`, `min`, `max`, `count` 또는 `sum`)과 롤업할 시간 간격을 강제 사용할 수 있습니다. 그러나 커스텀`.rollup()` 함수가 적용되고, Datadog 한도보다 작은 시간 간격을 사용하는 경우 특정 롤업 방법을 계속 사용할 때 Datadog 한도가 대신 사용됩니다. 예를 들어, 한 달 기간 동안 `.rollup(20)`을(를) 요청하는 경우 할당된 포인트 수보다 더 많이 반환되지 않도록 20초를 초과하는 롤업에서 데이터가 반환됩니다.

**참고**: `COUNT` 및 `RATE` 유형 메트릭에 대한 쿼리에는 UI에 자동으로 추가된 `.as_count()` 수식어가 있으며, 이는 `sum`에 사용되는 롤업 방법을 설정하고, 보간을 비활성화합니다. 이 `.as_count()`은(는) 쿼리 끝에 시각적으로 표시됩니다.

  {{< img src="dashboards/functions/rollup/as_count.png" alt="as_count" style="width:50%;">}}

`.as_count()` 및 `.as_rate()` 사용 방법에 대한 자세한 내용은 [StatsD 메트릭 시각화][3] 블로그 게시물을 참조하거나, [인앱 수정자 안내][4] 문서에서 이러한  함수의 효과에 대해 자세히 알아보세요.

## 모니터의 롤업

롤업 간격과 모니터의 평가 창 사이에 정렬이 잘못될 가능성이 있으므로 [모니터링][5] 쿼리에서는 일반적으로 롤업을 지양해야 합니다. 롤업 간격의 시작과 끝은 모니터 쿼리의 시작과 끝이 아니라 UNIX 시간에 맞춰집니다. 따라서 모니터는 작은 데이터 샘플만 포함하는 불완전한 롤업 간격을 평가(및 트리거)할 수 있습니다. 이 문제를 방지하려면 (최소한) 설정 롤업 간격만큼 모니터 평가를 지연하세요.

## 기타 함수

{{< whatsnext desc="사용 가능한 다른 함수를 참조하세요." >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}알고리즘: 메트릭에 이상 또는 아웃라이어 감지를 구현합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}산술: 메트릭에 대해 산술 연산을 수행합니다.  {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}계산: 메트릭의 0이 아닌 값 또는 null이 아닌 값을 계산합니다. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/exclusion" >}}제외: 메트릭의 특정 값을 제외합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}보간: 메트릭의 기본값을 채우거나 설정합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}순위: 메트릭의 하위 집합만 선택합니다. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rate" >}}비율: 메트릭 대비 커스텀 파생값을 계산합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}회귀: 메트릭에 일부 기계 학습 기능을 적용합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/smoothing" >}}평활화: 메트릭 변동을 평활화합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}타임시프트: 타임라인을 따라 메트릭 데이터 포인트를 이동합니다. {{< /nextlink >}}
{{< /whatsnext >}}

[1]: /ko/dashboards/functions/#proceed-to-time-aggregation
[2]: /ko/metrics/faq/rollup-for-distributions-with-percentiles/
[3]: https://www.datadoghq.com/blog/visualize-statsd-metrics-counts-graphing
[4]: /ko/metrics/custom_metrics/type_modifiers/
[5]: /ko/monitors/create/types/metric/