---
aliases:
- /ko/developers/faq/data-aggregation-with-dogstatsd-threadstats
description: DogStatsD 서버가 Datadog으로 데이터를 보내기 전에 어떻게 집계하는지 확인하세요.
further_reading:
- link: developers/dogstatsd
  tag: 설명서
  text: DogStatsD 소개
- link: developers/libraries
  tag: 설명서
  text: 공식 및 커뮤니티에서 생성한 API 및 DogStatsD 클라이언트 라이브러리
kind: 설명서
title: DogStatsD 데이터 애그리게이션
---

Datadog DogStatsD는 [몇 가지 차이점을 가지고][1] StatsD 프로토콜을 구현합니다. DogStatsD를 사용하면 메트릭을 전송할 수 있으며, 애플리케이션 코드를 차단하지 않고 모니터링할 수 있습니다. 데이터는 UDP를 통해 애플리케이션에서 로컬 [DogStatsD 서버][2](Datadog 에이전트에 포함됨)로 전송되며, 이 서버는 데이터를 집계한 다음 Datadog의 API 엔드포인트로 보냅니다. [DogStatsD 설정][2]에 대해 자세히 알아보세요.

이 문서에서는 데이터 애그리게이션에 대해 자세히 다룹니다.

## 왜 메트릭을 집계하나요?

애그리게이션은 각각 일정 시간이 걸리는 API 호출 수를 줄여 성능을 개선합니다.

짧은 시간 동안 1,000회(매번 +1) 증가되는 [COUNT 메트릭][3]을 생각해 보세요. DogStatsD 서버는 1,000개의 개별 API 호출을 하는 대신 몇 개의 API 호출로 집계합니다. 상황에 따라(아래 참조) 라이브러리는 —예를 들어— 값이 1000인 1개의 데이터 포인트를 제출하거나 누적 값이 1,000인 X개의 집계 데이터 포인트를 제출할 수 있습니다.


## DogStatsD 서버에서 애그리게이션은 어떻게 진행되나요?

[DogStatsD][2]는 10초의 _flush interval_을 사용합니다. [DogStatsD][2]는 10초마다 마지막 플러시 이후 수신된 모든 데이터를 점검합니다. 동일한 메트릭 이름 및 동일한 태그에 해당하는 모든 값은 단일 값으로 집계됩니다.

**참고**: StatsD 프로토콜을 사용하면 StatsD 클라이언트는 타임스탬프가 포함된 메트릭을 전송하지 않습니다. 타임스탬프는 플러시 시간에 추가됩니다. 따라서 10:00:10에 발생하는 플러시의 경우, 10:00:00에서 10:00:10 사이에 [DogStatsD][2] 서버(Datadog 에이전트에 포함됨)가 수신한 모든 데이터는 10:00:00가 타임스탬프인 단일 데이터 포인트에 롤업됩니다.

## 메트릭 유형별 애그리게이션 규칙 

동일한 플러시 간격 동안 수신된 모든 값 중 집계된 값의 전송은 [메트릭 유형][4]에 따라 달라집니다:

| 메트릭 종류       | 한 번의 플러시 간격으로 애그리게이션 수행                                                 |
|-------------------|-----------------------------------------------------------------------------------------------|
| [게이지][5]        | 가장 최근에 수신한 데이터 포인트가 전송됩니다.                                                        |
| [카운트][3]        | 받은 모든 데이터 포인트의 합계가 전송됩니다.                                                   |
| [히스토그램][6]    | 수신된 모든 데이터 포인트의 최소, 최대, 합계, 평균, 95백분위수, 카운트 및 중위수가 전송됩니다. |
| 설정(SET)               | 서로 다른 데이터 포인트 수가 전송됩니다.                                                   |
| [분포][7] | 글로벌 분포로 집계됩니다.                                                           |

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/developers/dogstatsd/
[2]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/
[3]: /ko/metrics/types/?tab=count#metric-types
[4]: /ko/metrics/types/
[5]: /ko/metrics/types/?tab=gauge#metric-types
[6]: /ko/metrics/types/?tab=histogram#metric-types
[7]: /ko/metrics/types/?tab=distribution#metric-types