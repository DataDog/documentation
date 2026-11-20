---
aliases:
- /ko/graphing/functions/smoothing/
description: Autosmooth, 지수 가중 이동 평균, 중앙값 필터 및 가중 함수를 사용하여 메트릭 데이터의 노이즈를 줄입니다.
title: 평활화
---
## Autosmooth {#autosmooth}

| 함수       | 설명                                                           | 예시                        |
| :----          | :-------                                                              | :---------                     |
| `autosmooth()` | 메트릭의 추세를 유지하면서 자동으로 노이즈를 제거합니다. | `autosmooth(<METRIC_NAME>{*})` |

`autosmooth()` 함수는 자동으로 선택된 스팬을 사용하여 이동 평균을 적용합니다. 추세를 유지하면서 시계열을 평활화합니다. 이 예시에서 함수는 시계열을 평활화하기 위한 최적의 스팬을 선택합니다.

{{< img src="dashboards/functions/smoothing/autosmooth_illustration.png" alt="Autosmooth 그림" style="width:80%;">}}

`avg by`와 같은 `group by` 쿼리에 사용하면 모든 시계열에 동일한 스팬이 적용됩니다. 동일한 그래프 내의 여러 메트릭에 사용하면 각 메트릭 시계열을 최적으로 평활화하도록 서로 다른 스팬을 선택할 수 있습니다.

이 알고리즘은 [ASAP 알고리즘][1]에서 영감을 얻었습니다. 이 [블로그 게시물][2]에서 자세한 내용을 읽을 수 있습니다.

`autosmooth()` 함수는 모니터에서 사용할 수 없습니다. 스팬이 동적으로 선택되기 때문에 해당 함수를 적용한 결과가 분단위로 변경되어 기준치 설정이 어려워지고 경보 플래핑이 초래될 수 있습니다.

## 지수 가중 이동 평균 {#exponentially-weighted-moving-average}

### Ewma 1 {#ewma-1}

| 함수   | 설명                                                         | 예시                    |
| :----      | :-------                                                            | :---------                 |
| `ewma_1()` | 스팬 1에 대한 지수 가중 이동 평균을 계산합니다. | `ewma_1(<METRIC_NAME>{*})` |

### Ewma 3 {#ewma-3}

| 함수   | 설명                                                         | 예시                    |
| :----      | :-------                                                            | :---------                 |
| `ewma_3()` | 스팬 3에 대한 지수 가중 이동 평균을 계산합니다. | `ewma_3(<METRIC_NAME>{*})` |

참고: 스팬 값은 시계열의 가중 평균 경과 시간의 두 배입니다. 따라서 `ewma_3()`은 3일 이동 평균과 유사합니다.

예시:

메트릭 `10 + x%10 {*}`이 10부터 1씩 증가하다가 데이터 포인트 10개 이후 다시 10으로 떨어지면, `ewma3(10 + x%10 {*})`의 형태는 다음과 같습니다.

{{< img src="dashboards/functions/smoothing/ewma3.png" alt="EWMA3" style="width:80%;">}}

### Ewma 5 {#ewma-5}

| 함수   | 설명                                                         | 예시                    |
| :----      | :-------                                                            | :---------                 |
| `ewma_5()` | 스팬 5에 대한 지수 가중 이동 평균을 계산합니다. | `ewma_5(<METRIC_NAME>{*})` |

참고: 스팬 값은 시계열의 가중 평균 경과 시간의 두 배입니다. 따라서 `ewma_5()`는 5일 이동 평균과 비슷합니다.

예시:

메트릭 `10 + x%10 {*}`이 10부터 1씩 증가하다가 데이터 포인트 10개 이후 다시 10으로 떨어지면, `ewma5(10 + x%10 {*})`의 형태는 다음과 같습니다.

{{< img src="dashboards/functions/smoothing/ewma5.png" alt="EWMA5" style="width:80%;">}}

### Ewma 7 {#ewma-7}

| 함수   | 설명                                                         | 예시                    |
| :----      | :-------                                                            | :---------                 |
| `ewma_7()` | 스팬 7에 대한 지수 가중 이동 평균을 계산합니다. | `ewma_7(<METRIC_NAME>{*})` |

참고: 스팬 값은 시계열의 가중 평균 경과 시간의 두 배입니다. 따라서 `ewma_7()`은 7일 이동 평균과 비슷합니다.

### Ewma 10 {#ewma-10}

| 함수    | 설명                                                          | 예시                     |
| :----       | :-------                                                             | :---------                  |
| `ewma_10()` | 스팬 10에 대한 지수 가중 이동 평균을 계산합니다. | `ewma_10(<METRIC_NAME>{*})` |

참고: 스팬 값은 시계열의 가중 평균 경과 시간의 두 배입니다. 따라서 `ewma_10()`은 10일 이동 평균과 비슷합니다.

예시:

메트릭 `10 + x%10 {*}`이 10부터 1씩 증가하다가 데이터 포인트 10개 이후 다시 10으로 떨어지면, `ewma10(10 + x%10 {*})`의 형태는 다음과 같습니다.

{{< img src="dashboards/functions/smoothing/ewma10.png" alt="EWMA10" style="width:80%;">}}

### Ewma 20 {#ewma-20}

| 함수    | 설명 | 예시 |
| :----       | :-------    | :------ |
| `ewma()`    | 기본 스팬 20에 대한 지수 가중 이동 평균을 계산합니다. | `ewma(<METRIC_NAME>{*})` |
| `ewma_20()` | 스팬 20에 대한 지수 가중 이동 평균을 계산합니다. | `ewma_20(<METRIC_NAME>{*})` |

`ewma()`와 `ewma_20()`은 동일하게 작동합니다.

참고: 스팬 값은 시계열의 가중 평균 경과 시간의 두 배입니다. 따라서 `ewma()` 및 `ewma_20()`은 20일 이동 평균과 유사합니다.

예시:

메트릭 `10 + x%10 {*}`이 10부터 1씩 증가하다가 데이터 포인트 10개 이후 다시 10으로 떨어지면, `ewma20(10 + x%10 {*})`의 형태는 다음과 같습니다.

{{< img src="dashboards/functions/smoothing/ewma20.png" alt="EWMA20" style="width:80%;">}}

## Median {#median}

### Median 3 {#median-3}

| 함수     | 설명 | 예시 |
| :----        | :-------    | :------ |
| `median()`   | 기본 스팬이 3인 이동 중앙값입니다. | `median(<METRIC_NAME>{*})` |
| `median_3()` | 스팬이 3인 이동 중앙값입니다. | `median_3(<METRIC_NAME>{*})` |

`median()`과 `median_3()`은 동일하게 작동합니다.

참고: 스팬 값은 데이터 포인트의 수입니다. 따라서 `median()`과 `median_3()`은 마지막 3개의 데이터 포인트를 사용하여 중앙값을 계산합니다.

### Median 5 {#median-5}

| 함수     | 설명                      | 예시                      |
| :----        | :-------                         | :---------                   |
| `median_5()` | 스팬이 5인 이동 중앙값입니다. | `median_5(<METRIC_NAME>{*})` |

참고: 스팬 값은 데이터 포인트의 수입니다. 따라서 `median_5()`는 마지막 5개의 데이터 포인트를 사용하여 중앙값을 계산합니다.

### Median 7 {#median-7}

| 함수     | 설명                      | 예시                      |
| :----        | :-------                         | :---------                   |
| `median_7()` | 스팬이 7인 이동 중앙값입니다. | `median_7(<METRIC_NAME>{*})` |

참고: 스팬 값은 데이터 포인트의 수입니다. 따라서 `median_7()`은 마지막 7개의 데이터 포인트를 사용하여 중앙값을 계산합니다.

### Median 9 {#median-9}

| 함수     | 설명                      | 예시                      |
| :----        | :-------                         | :---------                   |
| `median_9()` | 스팬이 9인 이동 중앙값입니다. | `median_9(<METRIC_NAME>{*})` |

참고: 스팬 값은 데이터 포인트의 수입니다. 따라서 `median_9()`는 마지막 9개의 데이터 포인트를 사용하여 중앙값을 계산합니다.

## Weighted {#weighted}
<div class="alert alert-info">Weighted()는 쿼리 대상이 <code>SUM BY</code> 게이지 유형 메트릭일 때만 사용할 수 있습니다.</div> 

| 함수       | 설명                                                           | 예시                        |
| :----          | :-------                                                              | :---------                     |
| `weighted()`   | 일시적으로 나타나는 태그의 적절한 가중치를 유지하면서 노이즈를 자동으로 제거합니다. | `sum:(<GAUGE_METRIC_NAME>{*}).weighted()` |

`weighted()` 함수는 게이지 메트릭을 공간적으로 합산할 때 일시적으로 나타나고 빈번하게 변경되는 태그 값의 짧은 수명을 고려하여 인위적인 급증을 방지합니다. 

함수는 다음 두 조건이 모두 충족되면 게이지 메트릭의 쿼리에 자동 추가됩니다. 
1. 메트릭의 제출 간격이 규칙적이고 일정하며, 해당 간격이 Metrics Summary에도 지정되어 있습니다.
2. 메트릭은 `SUM by`를 사용하여 집계됩니다(예: `sum: mygaugemetric{*}`).

다음은 부정확한 스파이크가 있는 원본 쿼리(보라색)와 적절한 가중치 계산이 적용된 쿼리(녹색)의 그래프 예시입니다. 

{{< img src="dashboards/functions/smoothing/weighted.png" alt="weighted 수정자를 사용한 쿼리와 사용하지 않은 쿼리를 비교하는 예시 그래프" style="width:80%;">}}

weighted() 수정자에 대한 더 자세한 정보를 확인하려면 [weighted()는 어떻게 작동하나요?][3] 항목을 참조하세요.

## 기타 함수 {#other-functions}

{{< whatsnext desc="다른 사용 가능한 함수는 다음을 참조하세요." >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}Algorithmic: 메트릭에 대한 이상 또는 이상치 탐지를 수행합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}Arithmetic: 메트릭에 대한 산술 연산을 수행합니다.  {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}Count: 메트릭에서 0이 아니거나 null이 아닌 값의 개수를 계산합니다. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/exclusion" >}}제외: 메트릭의 특정 값을 제외합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}Interpolation: 메트릭의 기본값을 채우거나 설정합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}순위 매기기: 메트릭의 부분 집합만 선택합니다. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rate" >}}Rate: 메트릭에 대한 사용자 지정 미분값을 계산합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}Regression: 메트릭에 머신러닝 함수를 적용합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rollup" >}}Rollup: 메트릭에 사용되는 원시 데이터 포인트의 수를 제어합니다. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}타임시프트: 타임라인을 따라 메트릭 데이터 포인트를 이동합니다. {{< /nextlink >}}
{{< /whatsnext >}}

[1]: https://github.com/stanford-futuredata/ASAP
[2]: https://www.datadoghq.com/blog/auto-smoother-asap
[3]: /ko/dashboards/guide/how-weighted-works