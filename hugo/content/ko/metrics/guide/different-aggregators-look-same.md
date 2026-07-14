---
aliases:
- /ko/graphing/faq/i-m-switching-between-the-sum-min-max-avg-aggregators-but-the-values-look-the-same
- /ko/dashboards/faq/i-m-switching-between-the-sum-min-max-avg-aggregators-but-the-values-look-the-same
further_reading:
- link: /metrics/introduction/#combining-time-series
  tag: 설명서
  text: 공간 애그리게이션
title: 합계/최소/최대/평균 애그리게이터(aggregator) 간에 전환해도 값은 변경되지 않습니다.
---

`sum`/`min`/`max`/`avg` 애그리게이터(aggregator) 사용 시, 단일 계열 내의 지점이 아니라 여러 계열을 살펴보는 것입니다. 따라서 쿼리가 가장 세분화된 수준인 경우, 해당 애그리게이터(aggregator) 간에 전환해도 표시되는 값이 변경되지 않을 수 있습니다.

예를 들어, 웹 요청을 `host` 및 `path`로 분류하면, 각 조합에 대한 시리즈가 나타납니다. 특정 시점의 데이터는 다음과 같이 보일 수 있습니다:

| 메트릭 이름  | 태그                      | 값 |
| ------------ | ------------------------- | ----- |
| web.requests | `host: a`, `path: /test1` | 5     |
| 웹.요청 | `host: a`, `path: /test2` | 3     |
| 웹.요청 | `host: b`, `path: /test1` | 2     |
| 웹.요청 | `host: b`, `path: /test2` | 8     |

`host` 당 두 개의 시리즈가 결합해야 하기 때문에, `host`로 그룹화할 때 집계 방법마다 다른 결과를 얻습니다.

| 질문                           | 호스트: a  | 호스트: b |
| ------------------------------- | ------- | ------- |
| `sum:web.requests(*) by {host}` | 8       | 10      |
| `min:web.requests(*) by {host}` | 3       | 2       |
| `max:web.requests(*) by {host}` | 5       | 8       |
| `avg:web.requests(*) by {host}` | 4       | 5       |

이 예시에서 `host` **및** `path`로 그룹화하면, `sum`/`min`/`max`/`avg`가 이 데이터에 대해 가장 세분화된 수준으로 동일하게 생성되어 있는 네 개의 시리즈가 됩니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}