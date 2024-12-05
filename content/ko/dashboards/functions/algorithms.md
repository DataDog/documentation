---
algolia:
  tags:
  - 이상
  - 이상 그래프
aliases:
- /ko/graphing/functions/algorithms/
title: 알고리즘
---

## 이상

| 함수      | 설명                                                                                | 예시                                                    |
| :----         | :-------                                                                                   | :---------                                                 |
| `anomalies()` | 과거를 기반으로 한 시리즈의 예상 동작을 보여주는 메트릭에 회색 밴드를 오버레이합니다. | `anomalies(<METRIC_NAME>{*}, '<ALGORITHM>', <BOUNDS>)` |

`anomalies()` 함수는 다음 두 가지 파라미터를 갖습니다.

* `ALGORITHM`: 이상을 감지하는 데 사용되는 방법입니다.
* `BOUNDS`: 회색 밴드의 너비입니다. `bounds`은(는) 알고리즘의 표준 편차로 해석될 수 있습니다. 2 또는 3의 값은 대부분의 "정상" 지점을 포함할 만큼 충분히 커야 합니다.

**참고**: 주간 또는 일일 계절성이 있는 민첩하거나 강력한 이상 감지 알고리즘을 사용하는 경우 API와 UI를 모두 사용하여 현지 시간대를 고려하도록 이상 감지 모니터를 업데이트할 수 있습니다.

다음은 2분 분량의 동영상 안내입니다.

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/188833506/rendition/1080p/file.mp4?loc=external&signature=96eacc46a18438ce0f45d5b57952cd924482f8f18e011ceb7b76b6ce1b4587a2" poster="/images/poster/algorithms.png" >}}

**계절성**: 기본적으로 `robust` 및 `agile` 알고리즘은 [주간 계절성][4]을 사용합니다. 이를 위해서는 기준선을 계산하기 위해 3주간의 기록 데이터가 필요합니다.

자세한 내용은 [Anomaly Monitor][1] 페이지를 참조하세요.

## 아웃라이어

| 함수     | 설명                | 예시                                                                    |
| :----        | :-------                   | :---------                                                                 |
| `outliers()` | 아웃라이어 시리즈를 강조 표시합니다. | `outliers(<METRIC_NAME>{*}, '<ALGORITHM>', <TOLERANCE>, <PERCENTAGE>)` |

`outliers()` 함수는 다음 세 가지 파라미터를 갖습니다.

* `ALGORITHM`: 사용할 아웃라이어 알고리즘입니다.
* `TOLERANCE`: 아웃라이어 알고리즘의 톨러레이션입니다.
* `PERCENTAGE`: 시리즈를 아웃라이어로 표시하는 데 필요한 아웃라잉 포인트의 백분율입니다(MAD 및 scaledMAD 알고리즘에만 사용 가능).

{{< img src="dashboards/functions/algorithms/outlier.mp4" alt="아웃라이어 감지" video="true" width="70%" >}}

자세한 내용은 [Outlier Monitor][2] 페이지를 참조하세요.

## 예측

| 함수     | 설명                | 예시                                                                    |
| :----        | :-------                   | :---------                                                                 |
| `forecast()`  | 메트릭이 미래에 어디로 향할지 예측합니다. | `forecast(<METRIC_NAME>{*}, '<ALGORITHM>', <DEVIATIONS>)` |

`forecast()` 함수는 다음 두 가지 파라미터를 갖습니다.

* `ALGORITHM`: 사용할 예측 알고리즘으로, `linear` 또는 `seasonal`을(를) 선택해야 합니다. 이러한 알고리즘에 대한 자세한 내용은 [예측 알고리즘][3] 섹션을 참조하세요.
* `DEVIATIONS`: 예측 값 범위의 너비입니다. 1 또는 2의 값은 대부분의 "정상" 포인트를 정확하게 예측할 수 있을 만큼 충분히 커야 합니다.

## 기타 함수

{{< whatsnext desc="사용 가능한 다른 함수를 참조하세요." >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}산술: 메트릭에 대해 산술 연산을 수행합니다.  {{< /nextlink >}}
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

[1]: /ko/monitors/types/anomaly/
[2]: /ko/monitors/types/outlier/
[3]: /ko/monitors/types/forecasts/?tab=linear#algorithms
[4]: /ko/monitors/types/anomaly/?s=anomaly%20algorithm#seasonality