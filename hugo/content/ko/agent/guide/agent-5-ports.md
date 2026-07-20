---
disable_toc: false
private: true
title: Agent 5 포트
---

본 페이지에서는 Agent 5에서 사용하는 포트를 알아봅니다. Agent 최신 버전에 대한 정보는 [네트워크 트래픽][1]을 참조하세요.

<div class="alert alert-danger">
모든 아웃바운드 트래픽은 TCP 또는 UDP를 통해 SSL로 전송됩니다.
<br><br>
방화벽 규칙 또는 유사한 네트워크 제한을 활용하여 애플리케이션 또는 신뢰할 수 있는 네트워크 소스만 Agent에 액세스할 수 있도록 하세요. 악의적인 공격자가 신뢰할 수 없는 액세스로 Datadog 계정에 트레이스 및 메트릭을 작성하거나 구성 및 서비스에 대한 정보를 얻는 것을 포함하되 이에 국한되지 않는 여러가지 침입 행위를 할 수 있습니다.
</div>

다음 포트를 열어 **Agent** 기능을 모두 활용하세요.

#### 아웃바운드

443/tcp
: 대부분의 Agent 데이터용 포트(메트릭, APM (애플리케이션 성능 모니터링), 라이브 프로세스 및 컨테이너).

123/udp
: NTP용 포트([NTP의 중요성에 대한 자세한 내용][2] 참조).<br>
[기본 NTP 대상][3]을 참조하세요.

#### 인바운드

6062/tcp
: 프로세스 Agent의 디버그 엔드포인트용 포트.

6162/tcp
: 프로세스 Agent의 런타임 설정 구성용 포트.

8125/UDP
: `dogstatsd_non_local_traffic`이 true로 설정되지 않은 경우의 DogStatsD용 포트. 해당 포트는 `127.0.0.1`, `::1`, `fe80::1` 로컬 호스트에서 사용할 수 있습니다.

8126/tcp
: [APM (애플리케이션 성능 모니터링) 리시버][4]용 포트.

17123/tcp
: Agent 포워더. Agent와 Datadog간 네트워크 단절의 경우 트래픽을 버퍼링하는 데 사용됩니다.

17124/tcp
: Graphite 어댑터(옵션).

[1]: /ko/agent/network
[2]: /ko/agent/faq/network-time-protocol-ntp-offset-issues/
[3]: /ko/integrations/ntp/#overview
[4]: /ko/tracing/