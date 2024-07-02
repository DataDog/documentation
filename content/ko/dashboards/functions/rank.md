---
aliases:
- /ko/graphing/functions/rank/
title: 순위
---

## 상위

| 함수 | 설명               | 예시                                              |
| :----    | :-------                  | :---------                                           |
| `top()`  | 상위 N개 요소를 그래프화합니다. | `top(<METRIC_NAME>{*}, <LIMIT_TO>, '<BY>', '<DIR>')` |

`top()` 함수는 다음 3가지 파라미터를 가집니다.

* `LIMIT_TO`: 표시할 시리즈 수로서, 다음에서 선택합니다.
    - `5`
    - `10`
    - `25`
    - `50`
    - `100`
* `BY`: 집계 방법으로, 다음에서 선택합니다.
    - `max`: 모든 메트릭 값의 최대치입니다.
    - `mean`: 모든 메트릭 값의 평균입니다.
    - `min`: 모든 메트릭 값의 최소치입니다.
    - `sum`: 모든 메트릭 값의 합계입니다.
    - `last`: 마지막 메트릭 값입니다.
    - `l2norm`: 항상 양수인 시계열의 [norm][1]을 사용하여 시리즈 순위를 지정합니다.
    - `area`: 그래프화된 곡선 아래의 표시 영역으로, 음수일 수 있습니다.

* `DIR`: 순위의 방향으로, 다음 중에서 선택합니다.
    - `asc`: 결과를 오름차순으로 순위를 매깁니다.
    - `desc`: 결과를 내림차순으로 순위를 매깁니다.

`top()` 메소드에는 다음 형식의 편의 함수가 있으며, 이들 모두 싱글 시리즈 목록을 입력값으로 사용합니다.

`[top, bottom][5, 10, 15, 20]_[mean, min, max, last, area, l2norm][2]`

예를 들어, `bottom10_min()`은(는) `min` 메트릭을 사용하여 값이 가장 낮은 10개의 시리즈를 검색합니다.

## 기타 함수

{{< whatsnext desc="사용 가능한 다른 함수를 참조하세요." >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}알고리즘: 메트릭에 이상 또는 아웃라이어 감지를 구현합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}산술: 메트릭에 대해 산술 연산을 수행합니다.  {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}계산: 메트릭의 0이 아닌 값 또는 null이 아닌 값을 계산합니다. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/exclusion" >}}제외: 메트릭의 특정 값을 제외합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}보간: 메트릭의 기본값을 채우거나 설정합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rate" >}}비율: 메트릭 대비 커스텀 파생값을 계산합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}회귀: 메트릭에 일부 기계 학습 기능을 적용합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rollup" >}}롤업: 메트릭에 사용되는 원시 포인트 수를 제어합니다. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/smoothing" >}}평활화: 메트릭 변동을 평활화합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}Timeshift: 타임시프트: 타임라인을 따라 메트릭 데이터 포인트를 이동합니다. {{< /nextlink >}}
{{< /whatsnext >}}


[1]: http://en.wikipedia.org/wiki/Norm_(mathematics)
