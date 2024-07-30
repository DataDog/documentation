---
aliases:
- /ko/graphing/functions/count/
title: 계산
---

## 0 제외 계산

| 기능          | 설명                           | 예시                           |
| :----             | :-------                              | :---------                        |
| `count_nonzero()` | 0이 아닌 모든 값의 개수를 계산합니다. | `count_nonzero(<METRIC_NAME>{*})` |

하나 이상의 [태그 키][1]로 그룹화된 쿼리의 경우에는 각 포인트에서 0이 아닌 메트릭 값이 있는 태그 값의 개수를 계산합니다.

예시: `count_nonzero(system.cpu.user{*} by {host})`은(는) 각 포인트에서 시스템 로드가 0이 아닌 호스트의 개수를 나타내는 시계열을 반환합니다.

{{< img src="dashboards/functions/count/count_nonzero.png" alt="0 제외 계산" style="width:80%;">}}

참고: `count_nonzero_finite()`은(는) `count_nonzero()`의 별칭으로 사용할 수 있습니다.

## null 제외 계산

| 기능           | 설명                           | 예시                            |
| :----              | :-------                              | :---------                         |
| `count_not_null()` | null이 아닌 모든 값의 개수를 계산합니다. | `count_not_null(<METRIC_NAME>{*})` |

하나 이상의 [태그 키][1]로 그룹화된 쿼리의 경우 각 포인트에서 null이 아닌 메트릭 값이 있는 태그 값의 개수를 계산합니다. null 메트릭 값은 유한 값이 없을 때를 의미합니다.

예시: `count_not_null(system.cpu.user{*} by {host})`은(는) 각 포인트에서 null이 아닌 시스템 로드가 있는 호스트의 개수를 나타내는 시계열을 반환합니다.

{{< img src="dashboards/functions/count/count_not_null.png" alt="null 제외 계산" style="width:80%;">}}

## 기타 함수

{{< whatsnext desc="사용 가능한 다른 함수를 참조하세요." >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}알고리즘: 메트릭에 이상 또는 아웃라이어 감지를 구현합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}산술: 메트릭에 대해 산술 연산을 수행합니다.  {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/exclusion" >}}제외: 메트릭의 특정 값을 제외합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}보간: 메트릭의 기본값을 채우거나 설정합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}순위: 메트릭의 하위 집합만 선택합니다. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rate" >}}비율: 메트릭 대비 커스텀 파생값을 계산합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}회귀: 메트릭에 일부 기계 학습 기능을 적용합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rollup" >}}롤업: 메트릭에 사용되는 원시 포인트 수를 제어합니다. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/smoothing" >}}평활화: 메트릭 변동을 평활화합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}타임시프트: 타임라인을 따라 메트릭 데이터 포인트를 이동합니다. {{< /nextlink >}}
{{< /whatsnext >}}

[1]: /ko/getting_started/tagging/