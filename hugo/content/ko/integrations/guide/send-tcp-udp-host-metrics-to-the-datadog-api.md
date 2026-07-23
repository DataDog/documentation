---
aliases:
- /ko/integrations/faq/how-to-send-tcp-udp-host-metrics-via-the-datadog-api
title: Datadog API에 TCP/UDP 호스트 메트릭 전송
---

Crontab Entry를 통해 통계를 수집하여 Datadog 플랫폼으로 전달하면 TCP/UDP 연결에 대한 인사이트를 얻을 수 있습니다.

이 작업을 하려면 /proc/net/sockstat에 위치한 Linux sockstats를 사용하세요.

아래는 참고용 예제 코드 스니펫입니다.

https://gist.github.com/sage-oli-wood/70e0931f037ea0aac132

이렇게 하면 HTTP POST를 통해 데이터가 Datadog에 제출됩니다.

더 적절한 방법은 DogStatsD를 사용하여 메트릭과 이벤트를 전송하는 것입니다. Cron 작업을 수정하여 데이터를 로컬에서 UDP를 통해 Agent로 전달할 수 있습니다. 자세한 내용은 여기에서 확인하세요.

다음에서 데이터를 가져옵니다.

* TCP: 

||||
|:---|:---|:---|
|in use|  설정된 총 연결 수 |  정수(숫자)|
|Orphan|  고립된 TCP 연결 |
(어떤 사용자 파일 핸들에도 첨부되지 않음) 정수 (숫자)|
|TW | TIME_WAIT 연결 | 정수 (밀리초)|
|Alloc|   할당된 TCP 소켓 |  (모든 유형. 예를 들어, ESTABLISH, CLOSE_WAIT, TIME_WAIT 등)|
|mem| TCP 소켓의 총 메모리 | 정수 (KB)|

* UDP: 

||||
|:---|:---|:---|
|inuse|   설정된 총 연결 수  | 정수|
|mem |UDP 소켓의 총 메모리 | 정수(KB)|