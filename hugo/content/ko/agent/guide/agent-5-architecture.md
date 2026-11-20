---
disable_toc: false
private: true
title: Agent 5 아키텍처
---

이 페이지에서는 Agent 5 아키텍처에 대해 알아봅니다. 최신 버전의 Agent 아키텍처에 대한 자세한 내용은 [Agent Architecture][1]를 참고하세요.

{{< img src="agent/agent5architecture.jpg" alt="Agent v5 Architecture" >}}

Agent 5는 4개의 주요 컴포넌트로 구성되어 있으며, 각각 Python으로 작성되어 별도의 프로세스로 실행됩니다.

* **Collector** (`agent.py`): 콜렉터는 구성된 [통합][2]에 대해 현재 시스템에서 점검을 실행하고 메모리 및 CPU와 같은 시스템 메트릭을 캡처합니다.
* **DogStatsD**(`dogstatsd.py`): 애플리케이션에서 [사용자 정의 메트릭][3]을 보낼 수 있는 StatsD 호환 백엔드 서버입니다.
* **Forwarder**(`ddagent.py`): 포워더는 DogStatsD와 콜렉터에서 데이터를 가져와 제출하기 위해 대기열에 넣은 다음 Datadog으로 전송합니다.
* **SupervisorD**: 콜렉터, DogStatsD 서버, 포워더는 모두 단일 슈퍼바이저 프로세스에 의해 관리됩니다. 슈퍼바이저는 모든 부분을 실행하지 않을 경우 각 애플리케이션의 오버헤드를 제한하기 위해 별도로 관리됩니다. 하지만 일반적으로 모든 부분을 실행하는 것이 좋습니다.

**참고**: Windows 사용자의 경우, 네 가지 Agent 프로세스 모두 `DevOps' best friend` 설명과 함께 `ddagent.exe` 인스턴스로 표시됩니다.

### 감독, 권한, 네트워크 포트

SupervisorD 기본 프로세스는 `dd-agent` 사용자로 실행되며, 모든 포크된 하위 프로세스는 동일한 사용자로 실행됩니다. 이는 Datadog Agent에서 시작된 모든 시스템 호출(`iostat`/`netstat`)에도 적용됩니다. Agent 구성은 `/etc/dd-agent/datadog.conf` 및 `/etc/dd-agent/conf.d`에 있습니다. 모든 구성은 `dd-agent`가 읽을 수 있어야 합니다. 구성 파일에는 API 키와 메트릭 액세스에 필요한 기타 자격 증명이 포함되어 있으므로 `0600` 권한이 권장됩니다.

다음 [포트][4]가 작업을 위해 열려 있습니다.

| 포트      | 설명                         |
|-----------|-------------------------------------|
| tcp/17123 | 일반 운영을 위한 포워더 |
| tcp/17124 | Graphite 지원을 위한 포워더  |
| udp/8125  | DogStatsD                           |

Agent 버전 3.4.1 이상에서는 모든 수신 프로세스가 기본적으로 `127.0.0.1` 또는 `::1`에 바인딩되며, 이전 버전에서는 `0.0.0.0`(모든 인터페이스)에 바인딩되었습니다. 프록시를 통해 Agent를 실행하는 방법에 대한 자세한 내용은 [Agent 프록시 구성][5]을 참고하세요. 허용할 IP 범위에 대한 자세한 내용은 [네트워크 트래픽][6]을 참고하세요.

권장 오픈 파일 디스크립터 수는 1024입니다. 이 값은 `ulimit -a` 명령을 사용하여 확인할 수 있습니다. 권장 값보다 낮은 하드 제한(예: Shell Fork Bomb Protection)이 있는 경우, `supervisord.conf`에 다음을 추가합니다. 

```conf
[supervisord]
minfds = 100  # Your hard limit
```

[1]: /ko/agent/architecture
[2]: /ko/integrations/
[3]: /ko/metrics/custom_metrics/
[4]: /ko/agent/configuration/network/?tab=agentv5v4#open-ports
[5]: /ko/agent/configuration/proxy/?tab=agentv5
[6]: /ko/agent/faq/network/