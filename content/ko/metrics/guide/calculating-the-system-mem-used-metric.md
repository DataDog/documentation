---
aliases:
- /ko/agent/faq/how-is-the-system-mem-used-metric-calculated/
further_reading:
- link: /metrics/
  tag: 설명서
  text: 메트릭에 대해 자세히 알아보기
title: '''system.mem.used'' 메트릭 계산하기'
---

Datadog에서 `system.mem.used` 메트릭을 계산하는 방식은 때때로 일반적인 시스템 리소스 보고 도구가 표시하는 값과 다른 값을 생성할 수 있습니다.

예를 들어 Ubuntu 머신에서 'free -m'을 실행하면 다음 메모리 상세 내역이 생성될 수 있습니다(값은 메가바이트를 표시):

|        |      |       |        |        |           |
| :---   | :--- | :---  | :---   | :---   | :---      |
| total  | used | free  | shared | cached | available |
| 128831 | 1203 | 71975 | 4089   | 55653  | 122380    |

동일한 머신에서 실행되는 Datadog Agent는 56856MB 값의 `system.mem.used` 메트릭을 보고합니다. 이는 'free -m'의 사용된 메모리 값인 1203MB와 분명히 다릅니다.

이러한 차이가 발생한 이유는 Datadog가 'free -m'과는 달리 사용된 메모리 계산식에 캐싱된 메모리를 포함하기 때문입니다.

Datadog는 다음과 같이 사용된 메모리를 계산합니다.

* system.mem.used(56856) = system.mem.total(128831) - system.mem.free(71975)

Datadog의 `system.mem.used` 메트릭은 캐싱된 메모리를 포함하므로 사용된 메모리에서 이 캐싱된 메모리를 빼면 다음 값이 도출됩니다.

* system.mem.used(56856) - system.mem.cached(55653) = 1203

1203MB는 위 예에서 'free -m'에서 보고한 사용된 메모리 값과 동일합니다.

**`system.mem.usable` 메트릭은 남은 메모리와 캐싱된 메모리와 버퍼(Linux에서 가능한 경우, /proc/meminfo의 "MemAvailable" 속성을 반영)를 더한 값을 나타냅니다.

{{< partial name="whats-next/whats-next.html" >}}