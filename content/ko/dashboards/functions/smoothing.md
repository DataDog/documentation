---
aliases:
- /ko/graphing/functions/smoothing/
title: 평활화
---

## 자동 평활화

| 함수       | 설명                                                           | 예시                        |
| :----          | :-------                                                              | :---------                     |
| `autosmooth()` | 메트릭의 추세를 유지하면서 자동으로 노이즈를 제거합니다. | `autosmooth(<METRIC_NAME>{*})` |

`autosmooth()` 함수는 자동으로 선택된 스팬이 있는 이동 평균을 적용합니다. 그 추세를 유지하면서 시계열을 평활화합니다. 이 예시에서 해당 함수는 시계열을 평활화하기 위해 최적의 스팬을 선택합니다.

{{< img src="dashboards/functions/smoothing/autosmooth_illustration.png" alt="자동 평활화 일러스트레이션" style="width:80%;">}}

`avg by` 등 `group by` 쿼리에 사용하면 모든 시계열에 동일한 스팬이 적용됩니다. 동일한 그래프의 여러 메트릭에 사용되는 경우 각 메트릭 시계열을 최적으로 평활화하기 위해 상이한 스팬을 선택할 수 있습니다.

이 알고리즘은 [ASAP 알고리즘][1]에서 영감을 얻었습니다. 이 [블로그 게시물][2]에서 자세한 내용을 읽을 수 있습니다.

`autosmooth()` 함수는 모니터에서 사용할 수 없습니다. 스팬이 동적으로 선택되기 때문에 해당 함수를 적용한 결과가 분단위로 변경되어 기준치 설정이 어려워지고 경고 플래핑이 초래될 수 있습니다.

## 지수 가중 이동 평균

### Ewma 3

| 함수   | 설명                                                         | 예시                    |
| :----      | :-------                                                            | :---------                 |
| `ewma_3()` | 3의 스팬에 걸쳐 지수 가중 이동 평균을 계산합니다. | `ewma_3(<METRIC_NAME>{*})` |

참고: 스팬 값은 데이터 포인트의 수입니다. 따라서 `ewma_3()`은(는) 마지막 3개의 데이터 포인트를 사용하여 평균을 계산합니다.

예시:

메트릭 `10 + x%10 {*}`이(라) 10개 데이터 포인트 후에 다시 10으로 떨어질 때까지 10부터 1씩 증가하면 `ewma3(10 + x%10 {*})`은(는) 다음의 모양을 갖게 됩니다.

{{< img src="dashboards/functions/smoothing/ewma3.png" alt="EWMA3" style="width:80%;">}}

### Ewma 5

| 함수   | 설명                                                         | 예시                    |
| :----      | :-------                                                            | :---------                 |
| `ewma_5()` | 5의 스팬에 걸쳐 지수 가중 이동 평균을 계산합니다. | `ewma_5(<METRIC_NAME>{*})` |

참고: 스팬 값은 데이터 포인트의 수입니다. 따라서 `ewma_5()`은(는) 마지막 5개 데이터 포인트를 사용하여 평균을 계산합니다.

예시:

메트릭 `10 + x%10 {*}`이(가) 10개 데이터 포인트 이후에 다시 10으로 떨어질 때까지 10부터 1씩 증가하면 `ewma5(10 + x%10 {*})`은(는) 다음의 모양을 갖게 됩니다.

{{< img src="dashboards/functions/smoothing/ewma5.png" alt="EWMA5" style="width:80%;">}}

### Ewma 7

| 함수   | 설명                                                         | 예시                    |
| :----      | :-------                                                            | :---------                 |
| `ewma_7()` | 7의 스팬에 걸쳐 지수 가중 이동 평균을 계산합니다. | `ewma_7(<METRIC_NAME>{*})` |

참고: 스팬 값은 데이터 포인트의 수입니다. 따라서 `ewma_7()`은(는) 마지막 7개 데이터 포인트를 사용하여 평균을 계산합니다.

### Ewma 10

| 함수    | 설명                                                          | 예시                     |
| :----       | :-------                                                             | :---------                  |
| `ewma_10()` | 10의 스팬에 걸쳐 지수 가중 이동 평균을 계산합니다. | `ewma_10(<METRIC_NAME>{*})` |

참고: 스팬 값은 데이터 포인트의 수입니다. 따라서 `ewma_10()`은(는) 마지막 10개 데이터 포인트를 사용하여 평균을 계산합니다.

예시:

메트릭 `10 + x%10 {*}`이(가) 10개 데이터 포인트 이후에 다시 10으로 떨어질 때까지 10부터 1씩 증가하면 `ewma10(10 + x%10 {*})`은(는) 다음의 모양을 갖게 됩니다.

{{< img src="dashboards/functions/smoothing/ewma10.png" alt="EWMA10" style="width:80%;">}}

### Ewma 20

| 함수    | 설명                                                          | 예시                     |
| :----       | :-------                                                             | :---------                  |
| `ewma_20()` | 20의 스팬에 걸쳐 지수 가중 이동 평균을 계산합니다. | `ewma_20(<METRIC_NAME>{*})` |

참고: 스팬 값은 데이터 포인트의 수입니다. 따라서 `ewma_20()`은(는) 마지막 20개 데이터 포인트를 사용하여 평균을 계산합니다.

예시:

메트릭 `10 + x%10 {*}`이(가) 10개 데이터 포인트 이후에 다시 10으로 떨어질 때까지 10부터 1씩 증가하면 `ewma20(10 + x%10 {*})`은(는) 다음의 모양을 갖게 됩니다.

{{< img src="dashboards/functions/smoothing/ewma20.png" alt="EWMA20" style="width:80%;">}}

## 중앙값

### 중앙값 3

| 함수     | 설명                      | 예시                      |
| :----        | :-------                         | :---------                   |
| `median_3()` | 스팬이 3인 이동 중앙값입니다. | `median_3(<METRIC_NAME>{*})` |

참고: 스팬 값은 데이터 포인트의 수입니다. 따라서 `median_3()`은(는) 마지막 3개의 데이터 포인트를 사용하여 중앙값을 계산합니다.

### 중앙값 5

| 함수     | 설명                      | 예시                      |
| :----        | :-------                         | :---------                   |
| `median_5()` | 스팬이 5인 이동 중앙값입니다. | `median_5(<METRIC_NAME>{*})` |

참고: 스팬 값은 데이터 포인트의 수입니다. 따라서 `median_5()`은(는) 마지막 5개의 데이터 포인트를 사용하여 중앙값을 계산합니다.

### 중앙값 7

| 함수     | 설명                      | 예시                      |
| :----        | :-------                         | :---------                   |
| `median_7()` | 스팬이 7인 이동 중앙값입니다. | `median_7(<METRIC_NAME>{*})` |

참고: 스팬 값은 데이터 포인트의 수입니다. 따라서 `median_7()`은(는) 마지막 7개의 데이터 포인트를 사용하여 중앙값을 계산합니다.

### 중앙값 9

| 함수     | 설명                      | 예시                      |
| :----        | :-------                         | :---------                   |
| `median_9()` | 스팬이 9인 이동 중앙값입니다. | `median_9(<METRIC_NAME>{*})` |

참고: 스팬 값은 데이터 포인트의 수입니다. 따라서 `median_9()`은(는) 마지막 9개의 데이터 포인트를 사용하여 중앙값을 계산합니다.

## 가중치 
<div class="alert alert-info">Weighted()는 게이지 타입 메트릭에서 `SUM BY`를 쿼링할 때만 사용할 수 있습니다.</div> 

| 함수       | 설명                                                           | 예시                        |
| :----          | :-------                                                              | :---------                     |
| `weighted()`   | 트랜지션 태그의 적절한 가중치를 유지하면서 노이즈를 자동으로 제거합니다. | `sum:(<GAUGE_METRIC_NAME>{*}).weighted()` |

`weighted()` 함수는 인위적인 스파이크를 방지하기 위해 공간에서 게이지 메트릭 합산 시 일시적인 변동 태그 값의 짧은 수명을 설명합니다.

함수는 다음 두 조건이 모두 충족되면 게이지 메트릭의 쿼리에 자동 추가됩니다.
1. 본 메트릭에는 메트릭 요약에 지정된 규칙적이며 일관된 제출 간격이 존재합니다.
2. 메트릭은 `SUM by`로 집계됩니다(예: `sum: mygaugemetric{*}`).

다음은 부정확한 스파이크가 있는 원본 쿼리(보라색)와 적절한 가중치 계산이 적용된 쿼리(녹색)의 그래프 예시입니다. 

{{< img src="dashboards/functions/smoothing/weighted.png" alt="가중치 수정자가 있는 경우와 없는 경우의 쿼리를 비교한 예시 그래프" style="width:80%;">}}

weighted() 수정자에 대한 더 자세한 정보를 확인하려면 [weighted()는 어떻게 작동하나요?][3] 항목을 참조하세요.

## 기타 함수

{{< whatsnext desc="사용 가능한 다른 함수를 참조하세요." >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}알고리즘: 메트릭에 이상 또는 아웃라이어 감지를 구현합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}산술: 메트릭에 대해 산술 연산을 수행합니다. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}계산: 메트릭의 0이 아닌 값 또는 null이 아닌 값을 계산합니다. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/exclusion" >}}제외: 메트릭의 특정 값을 제외합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}보간: 메트릭의 기본값을 채우거나 설정합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}순위: 메트릭의 하위 집합만 선택합니다. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rate" >}}비율: 메트릭 대비 커스텀 파생값을 계산합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}회귀: 메트릭에 일부 기계 학습 기능을 적용합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rollup" >}}롤업: 메트릭에 사용되는 원시 포인트 수를 제어합니다. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}타임시프트: 타임라인을 따라 메트릭 데이터 포인트를 이동합니다.{{< /nextlink >}}
{{< /whatsnext >}}

[1]: https://github.com/stanford-futuredata/ASAP
[2]: https://www.datadoghq.com/blog/auto-smoother-asap
[3]: /ko/dashboards/guide/how-weighted-works