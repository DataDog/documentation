---
aliases:
- /ko/graphing/functions/exclusion/
kind: 설명서
title: 제외
---

## null 제외

| 함수         | 설명                                                    | 예시                                        |
| ---------------- | -------------------------------------------------------------- | ---------------------------------------------- |
| `exclude_null()` | 그래프 또는 상위 목록에서 N/A 태그값이 있는 그룹을 제외합니다. | `exclude_null(avg:system.load.1{*} by {host})` |

예를 들어, `account`와(과) `region`(이)라는 두 개의 태그가 있는 메트릭이 있다고 가정해 봅니다. `account`에는 세 가지 잠재값(`prod`, `build` 및 `N/A`)이 있고 `region`에는 네 가지 잠재값(`us-east-1`, `us-west-1`, `eu-central-1` 및 `N/A`)이 있습니다.

이 메트릭을 시계열로 그래프화하면 그래프에 3 x 4 = 12개의 선이 표시됩니다. `exclude_null()`을(를) 적용하면 N/A 값을 포함하는 태그 조합이 있는 행이 제거되어 2 x 3 = 6개 그룹이 남게 됩니다.

## 클램프

| 함수      | 설명                                                          | 예시                                |
| ------------- | -------------------------------------------------------------------- | -------------------------------------- |
| `clamp_min()` | 기준치 미만의 메트릭 값을 해당 값과 같게 설정합니다. | `clamp_min(avg:system.load.1{*}, 100)` |
| `clamp_max()` | 기준치를 초과하는 메트릭 값을 해당 값과 동일하게 설정합니다.  | `clamp_max(avg:system.load.1{*}, 100)` |

`clamp_min()` 및 `clamp_max()` 함수는 다음과 같은 하나의 파라미터를 사용합니다.

-   `THRESHOLD`: 지정한 기준치를 말합니다.
    -   `clamp_min()`은(는) 기준치 미만인 모든 데이터 포인트를 해당 값과 동일하게 설정하는 반면, `clamp_max()`은(는) 기준치를 초과하는 데이터 포인트를 제한합니다.

## 컷오프

| 함수       | 설명                                     | 예시                                 |
| -------------- | ----------------------------------------------- | --------------------------------------- |
| `cutoff_min()` | 기준치 값 미만인 메트릭 값을 제거합니다. | `cutoff_min(avg:system.load.1{*}, 100)` |
| `cutoff_max()` | 기준치 값을 초과하는 메트릭 값을 제거합니다.  | `cutoff_max(avg:system.load.1{*}, 100)` |

`cutoff_min()` 및 `cutoff_max()` 함수는 다음과 같은 하나의 파라미터를 사용합니다.

- `THRESHOLD`: 지정한 기준치를 말합니다.
    - `cutoff_min()`은(는) 그래프에서 이 기준치 미만인 모든 메트릭 값을 제거하는 반면, `cutoff_max()`은(는) 이 기준치를 초과하는 모든 메트릭 값을 제거합니다.

컷오프 함수는 기준치와 동일한 값을 제거하지 않습니다.

또한 해당 함수는 Datadog에서 데이터 포인트를 완전히 삭제하지 않으며, 이는 시각화에서만 제거됩니다. 해당 함수를 비활성화하면 데이터 포인트가 다시 나타납니다.

**팁**: 클램프 및 컷오프 함수 모두에서, 선택한 기준치를 확인하는 것이 도움이 될 수 있습니다. 대시보드에서 [가로 마커를 설정][1]하여 이 값을 표시할 수 있습니다.

## 기타 함수

{{< whatsnext desc="사용 가능한 다른 함수를 참조하세요." >}}
{{< nextlink href="/dashboards/functions/arithmetic" >}}산술: 메트릭에 대해 산술 연산을 수행합니다. {{< /nextlink >}}
{{< nextlink href="/dashboards/functions/algorithms" >}}알고리즘: 메트릭에 이상 또는 아웃라이어 감지를 구현합니다.{{< /nextlink >}}
{{< nextlink href="/dashboards/functions/count" >}}계산: 메트릭의 0이 아닌 값 또는 null이 아닌 값을 계산합니다. {{< /nextlink >}}
{{< nextlink href="/dashboards/functions/interpolation" >}}보간: 메트릭의 기본값을 채우거나 설정합니다.{{< /nextlink >}}
{{< nextlink href="/dashboards/functions/rank" >}}순위: 메트릭의 하위 집합만 선택합니다. {{< /nextlink >}}
{{< nextlink href="/dashboards/functions/rate" >}}비율: 메트릭 대비 커스텀 파생값을 계산합니다.{{< /nextlink >}}
{{< nextlink href="/dashboards/functions/regression" >}}회귀: 메트릭에 일부 기계 학습 기능을 적용합니다.{{< /nextlink >}}
{{< nextlink href="/dashboards/functions/rollup" >}}롤업: 메트릭에 사용되는 원시 포인트 수를 제어합니다. {{< /nextlink >}}
{{< nextlink href="/dashboards/functions/smoothing" >}}평활화: 메트릭 변동을 평활화합니다.{{< /nextlink >}}
{{< nextlink href="/dashboards/functions/timeshift" >}}타임시프트: 타임라인을 따라 메트릭 데이터 포인트를 이동합니다. {{< /nextlink >}}
{{< /whatsnext >}}

[1]: https://www.datadoghq.com/blog/customize-graphs-dashboards-graph-markers/
