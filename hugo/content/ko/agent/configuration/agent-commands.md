---
algolia:
  tags:
  - agent status command
aliases:
- /ko/agent/faq/agent-status-and-information
- /ko/agent/faq/start-stop-restart-the-datadog-agent
- /ko/agent/faq/agent-commands
- /ko/agent/guide/agent-commands
description: Agent를 시작, 중지, 문제 해결 및 관리하기 위한 Datadog Agent 명령의 전체 참조 자료입니다.
further_reading:
- link: /agent/troubleshooting/
  tag: 설명서
  text: Agent 문제 해결
title: Agent 명령
---
<div class="alert alert-danger">
Linux 기반 시스템이고 <code>service</code> 래퍼 명령을 사용할 수 없는 경우, <a href="/agent/faq/agent-v6-changes/?tab=linux#service-lifecycle-commands">대안 목록을 참조하세요</a>.
</div>

## Agent 시작, 중지 및 재시작 {#start-stop-and-restart-the-agent}

### Agent 시작 {#start-the-agent}

Datadog Agent를 시작하는 명령 목록:

| 플랫폼   | 명령                                                            |
|------------|--------------------------------------------------------------------|
| AIX        | `startsrc -s datadog-agent`                                        |
| Linux      | 해당하는 OS의 [Agent 설명서][1] 참조.                      |
| Docker     | [설치 명령][2] 사용.                                 |
| Kubernetes | `kubectl create -f datadog-agent.yaml`                             |
| macOS      | `launchctl start com.datadoghq.agent` *또는* systray 앱 사용 |
| 소스     | `sudo service datadog-agent start`                                 |
| Windows    | [Windows Agent 설명서][3] 참조.                          |

### Agent 중지 {#stop-the-agent}

Datadog Agent를 중지하는 명령 목록:

| 플랫폼   | 명령                                                                          |
|------------|----------------------------------------------------------------------------------|
| AIX        | `stopsrc -s datadog-agent`                                                       |
| Linux      | 해당하는 OS의 [Agent 설명서][1] 참조.                                    |
| Docker     | `docker exec -it <CONTAINER_NAME> agent stop`                                    |
| Kubernetes | `kubectl delete pod <AGENT POD NAME>`—참고: 포드는 자동으로 다시 예약됨 |
| macOS      | `launchctl stop com.datadoghq.agent` *또는* systray 앱 사용                |
| 소스     | `sudo service datadog-agent stop`                                                |
| Windows    | [Windows Agent 설명서][3] 참조.                                        |

### Agent 재시작 {#restart-the-agent}

Datadog Agent를 재시작하는 명령 목록:

| 플랫폼   | 명령                                                                          |
|------------|----------------------------------------------------------------------------------|
| Linux      | 해당하는 OS의 [Agent 설명서][1] 참조.                                    |
| Docker     | [설치 명령][2] 사용.                                               |
| Kubernetes | `kubectl delete pod <AGENT POD NAME>`—참고: 포드는 자동으로 다시 예약됨 |
| macOS      | 다음을 사용하여 Agent를 중지하고 시작:<br>`launchctl stop com.datadoghq.agent`<br>`launchctl start com.datadoghq.agent`<br>또는 systray 앱 사용 |
| 소스     | *지원되지 않는 플랫폼*                                                           |
| Windows    | [Windows Agent 설명서][3] 참조.                                        |


## Agent 상태 및 정보 {#agent-status-and-information}

### 서비스 상태 {#service-status}

Datadog Agent의 상태를 표시하는 명령 목록:

| 플랫폼        | 명령                                                                       |
|-----------------|-------------------------------------------------------------------------------|
| AIX             | `lssrc -s datadog-agent`                                                      |
| Linux           | 해당하는 OS의 [Agent 설명서][1] 참조.                                 |
| Docker(Debian) | `sudo docker exec -it <CONTAINER_NAME> s6-svstat /var/run/s6/services/agent/` |
| Kubernetes      | `kubectl exec -it <POD_NAME> -- s6-svstat /var/run/s6/services/agent/`        |
| macOS           | `launchctl list com.datadoghq.agent` *또는* systray 앱 사용             |
| 소스          | `sudo service datadog-agent status`                                           |
| Windows         | [Windows Agent 설명서][4] 참조.                                     |
| [클러스터 에이전트(Kubernetes)][5] | `datadog-cluster-agent status`                                     |

### Agent 정보 {#agent-information}

Datadog Agent 및 활성화된 통합의 상태를 표시하는 명령 목록입니다.

| 플랫폼   | 명령                                              |
|------------|------------------------------------------------------|
| AIX        | `datadog-agent status`                               |
| Linux      | `sudo datadog-agent status`                          |
| Docker     | `sudo docker exec -it <CONTAINER_NAME> agent status` |
| Kubernetes | `kubectl exec -it <POD_NAME> -- agent status`        |
| macOS      | `datadog-agent status` 또는 [웹 GUI][6] 사용   |
| 소스     | `sudo datadog-agent status`                          |
| Windows    | [Windows Agent 설명서][4] 참조.            |
| [클러스터 에이전트(Kubernetes)][5] | `datadog-cluster-agent status`       |

적절하게 구성된 통합은 아래와 같이 경고나 오류 없이 **Running Checks** 아래에 표시됩니다:

```text
Running Checks
==============
  network (1.6.0)
  ---------------
    Total Runs: 5
    Metric Samples: 26, Total: 130
    Events: 0, Total: 0
    Service Checks: 0, Total: 0
    Average Execution Time : 0ms
```

## 기타 명령 {#other-commands}

Agent 명령줄 인터페이스는 하위 명령 기반입니다. 사용 가능한 하위 명령의 목록을 보려면 다음 실행:

```shell
<AGENT_BINARY> --help
```

하위 명령을 실행하려면 Agent 바이너리를 호출해야 함:

```shell
<AGENT_BINARY> <SUB_COMMAND> <OPTIONS>
```

일부 옵션에는 플래그 및 옵션이 있습니다(자세한 내용은 `--help` 참조). 예를 들어 도움말을 `check` 하위 명령과 함께 사용:

```shell
<AGENT_BINARY> check --help
```

| 하위 명령        | 참고 사항                                                                       |
|-------------------|-----------------------------------------------------------------------------|
| `check`           | 지정된 검사를 실행합니다.                                                    |
| `config`          | [런타임 구성 관리][7].                                      |
| `configcheck`     | 실행 중인 Agent의 로드된 구성 및 해결된 구성을 모두 출력합니다.              |
| `diagnose`        | 시스템에서 연결 진단을 실행합니다.                              |
| `flare`           | [flare를 수집하여 Datadog으로 보냅니다][8].                                |
| `health`          | 현재 Agent 상태를 출력합니다.                                             |
| `help`            | 모든 명령에 관한 도움말입니다.                                                     |
| `hostname`        | Agent가 사용하는 호스트 이름을 출력합니다.                                       |
| `import`          | Agent의 이전 버전에서 구성 파일을 가져오고 변환합니다. |
| `jmx`             | JMX 문제 해결입니다.                                                        |
| `launch-gui`      | Datadog Agent GUI를 시작합니다.                                                |
| `restart-service` | 서비스 제어 관리자 내에서 Agent를 재시작합니다. Windows 전용입니다.         |
| `start-service`   | 서비스 제어 관리자 내에서 Agent를 재시작합니다. Windows 전용입니다.           |
| `stream-logs`     | 실행 중인 에이전트가 처리하고 있는 로그를 스트리밍합니다.                         |
| `stopservice`     | 서비스 제어 관리자 내에서 Agent를 중지합니다. Windows 전용입니다.            |
| `version`         | 버전 정보를 출력합니다.                                                         |

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/
[2]: /ko/agent/docker/
[3]: /ko/agent/basic_agent_usage/windows/
[4]: /ko/agent/basic_agent_usage/windows/#status-and-information
[5]: /ko/containers/cluster_agent/
[6]: /ko/agent/basic_agent_usage/#gui
[7]: /ko/agent/troubleshooting/config/
[8]: /ko/agent/troubleshooting/send_a_flare/