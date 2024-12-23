---
aliases:
- /ko/graphing/functions/rate/
further_reading:
- link: /monitors/guide/alert-on-no-change-in-value/
  tag: 설명서
  text: 값 변경 없음 경고
title: 비율
---

## 초당

| 함수       | 설명                                                | 예시                        |
|:---------------|:-----------------------------------------------------------|:-------------------------------|
| `per_second()` | 메트릭이 초당 변경되는 비율을 그래프화합니다. | `per_second(<METRIC_NAME>{*})` |

## 분당

| 함수       | 설명                                                | 예시                        |
|:---------------|:-----------------------------------------------------------|:-------------------------------|
| `per_minute()` | 메트릭이 분당 변경되는 비율을 그래프화합니다. | `per_minute(<METRIC_NAME>{*})` |

## 시간당

| 함수     | 설명                                              | 예시                      |
|:-------------|:---------------------------------------------------------|:-----------------------------|
| `per_hour()` | 메트릭이 시간당 변경되는 비율을 그래프화합니다. | `per_hour(<METRIC_NAME>{*})` |

## 시차

| 함수 | 설명                                                    | 예시                |
|:---------|:---------------------------------------------------------------|:-----------------------|
| `dt()`   | 제출된 포인트 간의 시차(초)를 그래프화합니다. | `dt(<METRIC_NAME>{*})` |

## 값 차이

| 함수 | 설명                    | 예시                  |
|:---------|:-------------------------------|:-------------------------|
| `diff()` | 메트릭의 델타를 그래프화합니다. | `diff(<METRIC_NAME>{*})` |

간격별로 각 간격 간 차이를 계산합니다. 예를 들어, 메트릭은 15초 간격으로 데이터 포인트를 제출하고, `diff()` 변경자는 15초 비율로 이를 표시합니다. **참고:** 계산은 시간 집계를 적용한 후 공간 집계가 발생하기 전에 수행됩니다.

## 단조 차이

| 함수           | 설명                                                                     | 예시                            |
|:-------------------|:--------------------------------------------------------------------------------|:-----------------------------------|
| `monotonic_diff()` | `diff()`와(과) 같은 메트릭의 델타를 그래프화하지만, 이는 델타가 양수인 경우에만 해당합니다. | `monotonic_diff(<METRIC_NAME>{*})` |

## 도함수

| 함수       | 설명                                   | 예시                        |
|:---------------|:----------------------------------------------|:-------------------------------|
| `derivative()` | 메트릭의 도함수(diff/dt)를 그래프화합니다. | `derivative(<METRIC_NAME>{*})` |

## 기타 함수

{{< whatsnext desc="사용 가능한 다른 함수를 참조하세요." >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}알고리즘: 메트릭에 이상 또는 아웃라이어 감지를 구현합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}산술: 메트릭에 대해 산술 연산을 수행합니다.  {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}계산: 메트릭의 0이 아닌 값 또는 null이 아닌 값을 계산합니다. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/exclusion" >}}제외: 메트릭의 특정 값을 제외합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}보간: 메트릭의 기본값을 채우거나 설정합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}순위: 메트릭의 하위 집합만 선택합니다. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}회귀: 메트릭에 일부 기계 학습 기능을 적용합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rollup" >}}롤업: 메트릭에 사용되는 원시 포인트 수를 제어합니다. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/smoothing" >}}평활화: 메트릭 변동을 평활화합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}타임시프트: 타임라인을 따라 메트릭 데이터 포인트를 이동합니다. {{< /nextlink >}}
{{< /whatsnext >}}



{{< partial name="whats-next/whats-next.html" >}}
