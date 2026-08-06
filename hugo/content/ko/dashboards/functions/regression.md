---
aliases:
- /ko/graphing/functions/regression/
title: 회귀
---

## 강력한 추세

| 기능         | 설명                                          | 예시                              |
| :----            | :-------                                             | :---------                           |
| `robust_trend()` | Huber 손실을 사용하여 강력한 회귀 추세선을 조정합니다. | `robust_trend(avg:<METRIC_NAME>{*})` |

가장 일반적인 선형 회귀 유형인 최소자승모형(OLS)은 극단값이 있는 소수의 포인트로부터 크게 영향을 받을 수 있습니다. 강력한 회귀는 회귀선을 조정하기 위한 대체 방법으로, 소수의 극단값에 크게 영향을 받지 않습니다. 그 예는 다음 플롯을 참조하세요.

{{< img src="dashboards/functions/regression/robust_trend.png" alt="강력한 추세" style="width:80%;">}}

원래 메트릭은 파란색 실선으로 표시됩니다. 보라색 점선은 OLS 회귀선이고, 노란색 점선은 강력한 회귀선입니다. 메트릭 내 일시적인 스파이크는 OLS 회귀선이 위쪽으로 향하게 하지만, 강력한 회귀선은 해당 스파이크를 무시하고 메트릭의 전체 추세에 더 잘 맞는 작업을 수행합니다.

## 추세선

| 기능       | 설명                                                              | 예시                            |
| :----          | :-------                                                                 | :---------                         |
| `trend_line()` | 메트릭 값을 통해 최소자승모형선을 조정합니다. | `trend_line(avg:<METRIC_NAME>{*})` |

예시:

함수 `sin(x) * x/2 + x`와(과) `trend_line(sin(x) * x/2 + x)`의 모양은 다음과 같습니다.

{{< img src="dashboards/functions/regression/trend_line_function.png" alt="추세선 함수" style="width:80%;">}}

## 조각별 상수

| 기능               | 설명                                                                            | 예시                                    |
| :----                  | :-------                                                                               | :---------                                 |
| `piecewise_constant()` | 상수 값 세그먼트로 구성된 조각별 함수를 사용하여 메트릭을 근사화합니다. | `piecewise_constant(avg:<METRIC_NAME>{*})` |

예시:

함수 `x`와(과) `piecewise_constant(x)`의 모양은 다음과 같습니다.

{{< img src="dashboards/functions/regression/piecewise_constant.png" alt="조각별 상수" style="width:80%;">}}

## 기타 함수

{{< whatsnext desc="사용 가능한 다른 함수를 참조하세요." >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}알고리즘: 메트릭에 이상 또는 아웃라이어 감지를 구현합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}산술: 메트릭에 대해 산술 연산을 수행합니다.  {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}계산: 메트릭의 0이 아닌 값 또는 null이 아닌 값을 계산합니다. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/exclusion" >}}제외: 메트릭의 특정 값을 제외합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}보간: 메트릭의 기본값을 채우거나 설정합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}순위: 메트릭의 하위 집합만 선택합니다. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rate" >}}비율: 메트릭 대비 커스텀 파생값을 계산합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rollup" >}}롤업: 메트릭에 사용되는 원시 포인트 수를 제어합니다. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/smoothing" >}}평활화: 메트릭 변동을 평활화합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}타임시프트: 타임라인을 따라 메트릭 데이터 포인트를 이동합니다. {{< /nextlink >}}
{{< /whatsnext >}}
