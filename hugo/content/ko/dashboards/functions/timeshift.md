---
aliases:
- /ko/graphing/functions/timeshift/
further_reading:
- link: /dashboards/faq/how-can-i-graph-the-percentage-change-between-an-earlier-value-and-a-current-value/
  tag: FAQ
  text: 이전 값과 현재 값 사이의 백분율 변화를 그래프화합니다.
title: 타임시프트
---

다음은 데이터의 시간 이동과 관련된 함수 집합입니다. 이 함수들은 해당 기간의 값을 그래프에 표시합니다. 함수 자체로는 큰 가치가 없을 수 있지만, 현재 값과 함께 사용하면 애플리케이션 성능에 대한 유용한 인사이트를 얻을 수 있습니다.

## 타임시프트

| 함수      | 설명                                                                                    | 예시                                          |
|:--------------|:-----------------------------------------------------------------------------------------------|:-------------------------------------------------|
| `timeshift()` | 메트릭의 현재 타임스탬프 전 임의의 `<TIME_IN_SECOND>` 값을 그래프화합니다. | `timeshift(<METRIC_NAME>{*}, -<TIME_IN_SECOND>)` |

예를 들어, 이 함수를 사용하여 현재 시스템 로드와 2주 전의 로드(60\*60\*24\*14 = 1209600)를 비교하려는 경우의 쿼리는 다음과 같습니다.

```text
timeshift(avg:system.load.1{*}, -1209600)
```

## 캘린더 시프트


| 함수           | 설명                                                                                   | 예시                            |
|:-------------------|:----------------------------------------------------------------------------------------------|:-----------------------------------|
| `calendar_shift()` | 해당 메트릭의 현재 타임스탬프를 기준으로 이전 날짜, 이전 주 또는 이전 달의 그래프 값을 표시합니다. | `calendar_shift(<METRIC_NAME>{*}, "<TIME_SHIFT_STRING>", "<TIME_ZONE_CODE>")` |

`calendar_shift()`에 접근하려면 **Add function** 버튼을 클릭하고 **Timeshift > Month before**을 선택합니다. 캘린더 시프트를 사용하면 동일한 기간 동안 동일한 메트릭을 비교할 수 있습니다. 아래는 2주 전의 calendar_shift() 값과 현재 값을 비교한 클라우드 비용 메트릭 `aws.cost.net.amortized`의 예입니다.

{{< img src="dashboards/functions/timeshift/calendar_shift_two_weeks.png" alt="2주 전의 `aws.cost.net.amortized ` 메트릭 값과 현재 값을 비교하는 데 사용되는 calendar_shift() 함수의 예" style="width:80%;" >}}

유효한 `TIME_SHIFT_STRING` 값은 음의 정수이며, 뒤에 "d"는 일을, "w"는 주를, "mo"는 월을 나타냅니다. 예: `-1d`, `-7d`, `-1mo`, `-30d`, `-4w`

유효한 `TIME_ZONE_CODE` 값은 특정 도시의 IANA 시간대 코드 또는 `UTC`입니다. 예: `UTC`, `America/New_York`, `Europe/Paris`, `Asia/Tokyo`

## 이전 시간

| 함수        | 설명                                                            | 예시                         |
|:----------------|:-----------------------------------------------------------------------|:--------------------------------|
| `hour_before()` | 메트릭의 현재 타임스탬프 1시간 전의 값을 그래프화합니다. | `hour_before(<METRIC_NAME>{*})` |

이는 `hour_before()` 값이 점선으로 표시된 `system.load.1`의 예시에 해당합니다. 이 특정 예시에서 머신이 오전 6:30에 시작되었고 `hour_before()` 값이 7:30 마크에 표시되는 것을 볼 수 있습니다. 물론 이 예시는 `hour_before()` 값이 실제 값과 매칭되는지 확인할 수 있도록 특별히 생성되었습니다.

{{< img src="dashboards/functions/timeshift/simple_hour_before_example.png" alt="간단한 이전 시간 예시" style="width:80%;">}}

## 이전 일

<div class="alert alert-warning">Day before 기능이 더 이상 지원되지 않습니다. 대신 "-1d" 값으로 캘린더 시프트를 사용하세요.</div>

| 함수       | 설명                                                          | 예시                        |
|:---------------|:---------------------------------------------------------------------|:-------------------------------|
| `day_before()` | 메트릭의 현재 타임스탬프 하루 전의 값을 그래프화합니다. | `day_before(<METRIC_NAME>{*})` |

이는 `day_before()` 값이 더 단순하고 가는 선으로 표시된 `nginx.net.connections`의 예시에 해당합니다. 이 예시에서는 1주일 분량의 데이터를 볼 수 있으므로, `day_before()` 데이터를 더 쉽게 식별할 수 있습니다.

{{< img src="dashboards/functions/timeshift/simple_day_before_example.png" alt="간단한 이전 일 예시" style="width:80%;">}}

## 이전 주

<div class="alert alert-warning">Week before 기능은 더 이상 지원되지 않습니다. 대신 "-7d" 값으로 캘린더 시프트를 사용하세요.</div>

| 함수        | 설명                                                                    | 예시                         |
|:----------------|:-------------------------------------------------------------------------------|:--------------------------------|
| `week_before()` | 메트릭의 현재 타임스탬프 전 일주일(7일)의 값을 그래프화합니다. | `week_before(<METRIC_NAME>{*})` |

이는 `week_before()` 값이 점선으로 표시된 `cassandra.db.read_count`의 예시에 해당합니다. 이 예시에서는 약 3주 분량의 데이터를 볼 수 있으므로, `week_before()` 데이터를 더 쉽게 식별할 수 있습니다.

{{< img src="dashboards/functions/timeshift/simple_week_before_example.png" alt="간단한 이전 주 예시" style="width:80%;">}}

## 이전 월

<div class="alert alert-warning">Month before 기능은 더 이상 지원되지 않습니다. 필요에 따라 "-1mo", "-30d", "-4w" 값으로 캘린더 시프트를 사용하세요.</div>

| 함수         | 설명                                                                                | 예시                          |
|:-----------------|:-------------------------------------------------------------------------------------------|:---------------------------------|
| `month_before()` | 메트릭의 현재 타임스탬프 이전 한 달(28일/4주)의 값을 그래프화합니다. | `month_before(<METRIC_NAME>{*})` |

이는 `month_before()` 값이 가는 실선으로 표시된 `aws.ec2.cpuutilization`의 예시에 해당합니다.

{{< img src="dashboards/functions/timeshift/simple_month_before_example.png" alt="간단한 이전 월 예시" style="width:80%;">}}


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
    {{< nextlink href="/dashboards/functions/rollup" >}}롤업: 메트릭에 사용되는 원시 포인트 수를 제어합니다. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/smoothing" >}}평활화: 메트릭 변동을 평활화합니다.{{< /nextlink >}}
{{< /whatsnext >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}