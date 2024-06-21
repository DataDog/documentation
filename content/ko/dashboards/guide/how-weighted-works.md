---
disable_toc: false
further_reading:
- link: /dashboards/functions/smoothing
  tag: 설명서
  text: 평활화
title: weighted()는 어떻게 동작하나요?
---

모든 메트릭 쿼리에는 표준 평가 순서가 있습니다([쿼리 상세 분석][1]을 빠르게 검토하세요). 예를 들어 아래 쿼리는 다음과 같이 계산됩니다: 
`sum:kubernetes.cpu.requests{*} by {kube_container_name}.rollup(avg, 10)`

1. 시간 집계 - 각 시계열(고유 태그 값 조합으로 정의)의 값을 10초 롤업반영) 간격마다 합산합니다. 고유 태그 값 조합의 수는 가장 변동성이 높고 세분화된 태그로 정의됩니다. 예를 들어, 메트릭에서는 `container_id`에 의해 결정됩니다. 
2. 그런 다음 `kube_container_name`(공간 집계)당 모든 평균값의 합계를 하나의 대표값으로 간주합니다. 개별 `kube_container_name`당 합산 값은 각 롤업(반영) 간격의 고유한 `container_id`의 수에 따라 달라집니다.

`weighted()` 함수는 본 게이지 메트릭에 대해 `kube_container_name`으로 합산 시 `container_id` 태그의 짧은 수명을 설명합니다.

#### 예시
다음을 가정하여 쿼리를 고려합니다. <br>
`sum:kubernetes_state.pod.uptime{*} by {version}.rollup(avg, 10)`

- 게이지 메트릭의 제출 간격은 10초로 정의됩니다. 
- 데이터 포인트는 60초마다 그래프로 표시됩니다.
- 항상 두 가지 버전이 존재하는 쿠버네티스(Kubernetes) 포드가 있습니다. 각 버전은 앱으로 레이블화되며 앱당 하나의 버전만 존재합니다.

60초 이상의 원시 데이터는 다음과 비슷할 수 있습니다.

| 시간                 | 0초  |  10s |  20초 |  30초 |  40초 |  50초 |
| ---                  | --  | ---  | ---  | ---  |  --- |  --- |
| `app:a`, `version:1`   | 12  | NAN  | NAN  | NAN  | NAN  | NAN  |
| `app:b`, `version:1`   | NAN | 12   | 12   | 12   | NAN  | NAN  |
| `app:c`, `version:1`   | NAN | NAN  | NAN  | NAN  | 12   | 12   |
| `app:d`, `version:2`   | 12  | NAN  | NAN  | NAN  | NAN  | NAN  |
| `app:e`, `version:2`   | NAN | 16   | 16   | 16   | NAN  | NAN  |
| `app:f`, `version:2`   | NAN | NAN  | NAN  | NAN  | 18   | 18   |


1. _시간 집계 -- 데이터 롤업하기_ (_Time Aggregation -- Rolling up data_)
시간 집계를 활용하여 `avg`(가중치 없음) 또는 제안된 `weighted` 평균으로 데이터를 롤업합니다. 
| 시간 집계   | .rollup(avg) | .weighted() 활용 |
| ----------------   | ------------ | ---------------- |
| `app:a`, `version:1` | 12           | 2.0              |
| `app:b`, `version:1` | 12           | 6.0              |
| `app:c`, `version:1` | 12           | 4.0              |
| `app:d`, `version:2` | 12           | 2.0              |
| `app:e`, `version:2` | 16           | 8.0              |
| `app:f`, `version:2` | 18           | 6.0              |

2. _공간 집계_ (_Space Aggregation_ )
마지막으로 메트릭을 버전별로 집계하여 아래와 같이 최종 값을 얻습니다.
| 버전별 공간 집계 | .rollup(avg) | .weighted() 활용 |
| ------------------------   | ------------ | ---------------- |
| `version:1`                  | 36           | 12               |
| `version:2`                  | 46           | 16               |


`weighted()` 함수는 제출률과 비교하여 값에 가중치를 부여함으로써 수명이 짧은 태그의 일관성 없는 동작을 수정합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/metrics/#anatomy-of-a-metric-query