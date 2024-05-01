---
kind: faq
title: 다중 프로세스 모드의 HAProxy
---

다중 프로세스 모드에서 HAProxy를 사용할 때, 각 프로세스에는 자체 메모리 영역이 있어서 자체 통계가 있습니다.

{{< img src="integrations/faq/haproxy_config_multi_process.png" alt="HAProxy 구성 다중 프로세스" style="width:30%;">}}

이 때문에 각 프로세스에 전용 소켓이나 엔드포인트가 있어야 통계에 접근할 수 있습니다.
따라서 HAProxy용 Datadog 구성 파일에서 **각 소켓이나 엔드포인트를 인스턴스로 선언해야 합니다**. 

{{< img src="integrations/faq/haproxy_multi_process_agent_conf.png" alt="HAProxy 다중 프로세스 구성" style="width:50%;">}}

그러지 않으면 동일한 엔드포인트인 `/haproxy_stats`를 공유하게 되고, HAProxy 통계를 얻을 때 현재 요청에 할당된 프로세스의 통계만 나타납니다.

{{< img src="integrations/faq/haproxy_stats_1.png" alt="HAProxy stats 1" style="width:85%;" >}}

브라우저에서 페이지를 새로 고침하면 이전 프로세스와 다른 통계가 나타납니다.

{{< img src="integrations/faq/haproxy_stats_2.png" alt=" HAProxy stats 2" style="width:85%;" >}}

HAProxy 통합이 제대로 구성되지 않았을 경우 다음과 같은 증상이 나타납니다.

* 20초마다 수신하는 HAProxy 메트릭 보고에 누락이 있음[속도를 여기에서 확인 가능][1].
* 평상 시에 값이 적은 메트릭의 값이 높게 나오고 변형 형태도 많음(예: 5xx 코드 오류 반응).

[1]: https://github.com/DataDog/integrations-core/blob/master/haproxy/datadog_checks/haproxy/haproxy.py