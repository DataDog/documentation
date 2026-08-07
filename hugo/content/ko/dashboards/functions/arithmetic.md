---
aliases:
- /ko/graphing/functions/arithmetic/
title: 산술
---

## 절대

| 기능 | 설명                             | 예시                 |
| :----    | :-------                                | :---------              |
| `abs()`  | 메트릭의 절대값을 그래프화합니다. | `abs(<METRIC_NAME>{*})` |

이 사인 시계열 `sin{*}`을(를) 아래 변환 대상으로 변환합니다:

{{< img src="dashboards/functions/arithmetic/sinus.png" alt="Sinus 함수" style="width:80%;">}}

`abs(sin{*})`(변환 대상):

{{< img src="dashboards/functions/arithmetic/sinus_abs.png" alt="절대값이 있는 Sinus 함수" style="width:80%;">}}

## 대수

### 로그 기반 2

| 기능 | 설명                               | 예시                  |
| :----    | :-------                                  | :---------               |
| `log2()` | 메트릭의 기반 2 대수를 그래프화합니다. | `log2(<METRIC_NAME>{*})` |

예시:

메트릭 `x{*}`이(가) 각 데이터 포인트에서 1씩 증가하면 `log2(x{*})`의 모양은 다음과 같습니다.

{{< img src="dashboards/functions/arithmetic/log2.png" alt=" 로그2 함수" style="width:80%;">}}

### 로그 기반 10

| 기능  | 설명                                | 예시                   |
| :----     | :-------                                   | :---------                |
| `log10()` | 메트릭의 기반 10 대수를 그래프화합니다. | `log10(<METRIC_NAME>{*})` |

예시:

메트릭 `x{*}`이(가) 각 데이터 포인트에서 1씩 증가하면 `log10(x{*})`의 모양은 다음과 같습니다.

{{< img src="dashboards/functions/arithmetic/log10.png" alt="로그10 함수" style="width:80%;">}}

## 누적 합계

| 기능   | 설명                                                          | 예시                    |
| :----      | :-------                                                             | :---------                 |
| `cumsum()` | 시각화된 기간 동안 메트릭의 누적 합계를 그래프화합니다. | `cumsum(<METRIC_NAME>{*})` |

예시:

메트릭 `const_1{*}`이(가) `1`의 값과 상수인 경우 `cumsum(const_1{*})`의 모양은 다음과 같습니다.

{{< img src="dashboards/functions/arithmetic/cumsum.png" alt="절대값이 있는 누적 합계 함수" style="width:80%;">}}

## 모니터의 누적 총계

누적 총계 함수는 시각적 함수이므로 모니터 쿼리에서 피해야 합니다. 대시보드나 노트북에서 이용하는 경우 숫자는 선택한 기간 기준 값을 반영합니다. 모니터에서는 사용 기간의 개념이 없기 때문에 모니터에서 제대로 도출되기 어렵습니다.

대신 모니터 평가 기간 동안 [누적 기간][1]을 설정하세요.

## 적분

| 함수     | 설명                       | 예시                             |
| :----        | :-------                          | :---------                          |
| `integral()` | 메트릭의 적분을 그래프화합니다. | `integral(<METRIC_NAME>{*})` |

**참고**: Datadog의 `integral()`은(는) 주어진 메트릭의 시각화된 기간에 속하는 모든 연속적인 포인트 쌍에 대한 `[time delta] x [value delta]`의 누적 합계에 해당합니다.

{{< img src="dashboards/functions/arithmetic/integral.png" alt="절대값이 있는 적분 함수" style="width:80%;">}}

## 기타 함수

{{< whatsnext desc="사용 가능한 다른 함수를 참조하세요." >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}알고리즘: 메트릭에 이상 또는 아웃라이어 감지를 구현합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}계산: 메트릭의 0이 아닌 값 또는 null이 아닌 값을 계산합니다. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/exclusion" >}}제외: 메트릭의 특정 값을 제외합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}보간: 메트릭의 기본값을 채우거나 설정합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}순위: 메트릭의 하위 집합만 선택합니다. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rate" >}}비율: 메트릭 대비 커스텀 파생값을 계산합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}회귀: 메트릭에 일부 기계 학습 기능을 적용합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rollup" >}}롤업: 메트릭에 사용되는 원시 포인트 수를 제어합니다. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/smoothing" >}}평활화: 메트릭 변동을 평활화합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}타임시프트: 타임라인을 따라 메트릭 데이터 포인트를 이동합니다. {{< /nextlink >}}
{{< /whatsnext >}}

[1]: /ko/monitors/configuration/?tab=thresholdalert#cumulative-time-windows