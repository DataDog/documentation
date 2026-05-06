---
algolia:
  tags:
  - agent status command
aliases:
- /ko/agent/faq/agent-status-and-information
- /ko/agent/faq/start-stop-restart-the-datadog-agent
- /ko/agent/faq/agent-commands
- /ko/agent/guide/agent-commands
description: Datadog Agent 명령어에 대한 전체 참조입니다. 이 문서에서는 Agent를 시작, 중지, 문제 해결 및 관리를 수행하는
  방법을 설명합니다.
further_reading:
- link: /agent/troubleshooting/
  tag: Documentation
  text: Agent 문제 해결
title: Agent 명령어
---
<div class="alert alert-danger">
<code>service</code> 래퍼 명령어가 없는 Linux 기반 시스템의 경우, <a href="/agent/faq/agent-v6-changes/?tab=linux#service-lifecycle-commands">대안 목록을 참조하세요</a>.
</div>

## Agent를 시작, 중지, 재시작합니다. {#start-stop-and-restart-the-agent}

### Agent를 시작합니다. {#start-the-agent}

Datadog Agent를 시작하는 명령어 목록:

| 플랫폼   | 명령어                                                            |
|------------|--------------------------------------------------------------------|
| AIX        | `startsrc -s datadog-agent`                                        |
| Linux      | 귀하의 OS에 대한 [Agent 설명서][1]를 참조하세요.                      |
| Docker     | [설치 명령어][2]를 사용하세요.                                 |
| Kubernetes | `kubectl create -f datadog-agent.yaml`                             |
| macOS      | `launchctl start com.datadoghq.agent` *또는* 시스템 트레이 앱을 통해 |
| 소스     | `sudo service datadog-agent start`                                 |
| Windows    | [Windows Agent 문서][3]를 참조하세요.                          |

### Agent를 중지합니다. {#stop-the-agent}

Datadog Agent를 중지하는 명령어 목록:

| 플랫폼   | 명령어                                                                          |
|------------|----------------------------------------------------------------------------------|
| AIX        | `stopsrc -s datadog-agent`                                                       |
| Linux      | 귀하의 OS에 대한 [Agent 문서][1]를 참조하세요.                                    |
| Docker     | `docker exec -it <CONTAINER_NAME> agent stop`                                    |
| Kubernetes | `kubectl delete pod <AGENT POD NAME>`—참고: 포드는 자동으로 재배치됩니다 |
| macOS      | `launchctl stop com.datadoghq.agent` *또는* 시스템 트레이 앱을 통해                |
| 소스     | `sudo service datadog-agent stop`                                                |
| Windows    | [Windows Agent 문서][3]를 참조하세요.                                        |

### Agent를 재시작합니다. {#restart-the-agent}

Datadog Agent를 재시작하는 명령어 목록:

| 플랫폼   | 명령                                                                          |
|------------|----------------------------------------------------------------------------------|
| Linux      | 귀하의 OS에 대한 [Agent 설명서][1]를 참조하세요.                                    |
| Docker     | [설치 명령어][2]를 사용하세요.                                               |
| Kubernetes | `kubectl delete pod <AGENT POD NAME>`—참고: 포드는 자동으로 재배치됩니다 |
| macOS      | Agent를 중지한 후 다음과 같이 시작하세요:<br>`launchctl stop com.datadoghq.agent`<br>`launchctl start com.datadoghq.agent`<br> 또는 시스템 트레이 앱을 사용하세요 |
| 소스     | *지원되지 않는 플랫폼*                                                           |
| Windows    | [Windows Agent 문서][3]를 참조하세요.                                        |


## Agent 상태 및 정보 {#agent-status-and-information}

### 서비스 상태 {#service-status}

Datadog Agent의 상태를 표시하는 명령 목록:

| 플랫폼        | 명령                                                                       |
|-----------------|-------------------------------------------------------------------------------|
| AIX             | `lssrc -s datadog-agent`                                                      |
| Linux           | 귀하의 OS에 대한 [Agent 설명서][1]를 참조하세요.                                 |
| Docker (Debian) | `sudo docker exec -it <CONTAINER_NAME> s6-svstat /var/run/s6/services/agent/` |
| Kubernetes      | `kubectl exec -it <POD_NAME> -- s6-svstat /var/run/s6/services/agent/`        |
| macOS           | `launchctl list com.datadoghq.agent` *또는* 시스템 트레이 앱을 통해             |
| 소스          | `sudo service datadog-agent status`                                           |
| Windows         | [Windows Agent 문서][4]를 참조하세요.                                     |
| [Cluster Agent (Kubernetes)][5] | `datadog-cluster-agent status`                                     |

### Agent 정보 {#agent-information}

Datadog Agent 및 활성화된 통합의 상태를 표시하는 명령 목록:

| 플랫폼   | 명령                                              |
|------------|------------------------------------------------------|
| AIX        | `datadog-agent status`                               |
| Linux      | `sudo datadog-agent status`                          |
| Docker     | `sudo docker exec -it <CONTAINER_NAME> agent status` |
| Kubernetes | `kubectl exec -it <POD_NAME> -- agent status`        |
| macOS      | `datadog-agent status` 또는 [web GUI][6]를 통해   |
| 소스     | `sudo datadog-agent status`                          |
| Windows    | [Windows Agent 설명서][4]를 참조하세요.            |
| [클러스터 에이전트 (Kubernetes)][5] | `datadog-cluster-agent status`       |

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

Agent 명령줄 인터페이스는 서브 명령 기반입니다. 사용 가능한 서브 명령 목록을 보려면 실행하세요:

```shell
<AGENT_BINARY> --help
```

하위 명령어를 실행하려면 Agent 바이너리를 호출해야 합니다.

```shell
<AGENT_BINARY> <SUB_COMMAND> <OPTIONS>
```

일부 옵션에는 `--help`에 자세히 설명된 플래그와 옵션이 있습니다. 예를 들어, 다음 `check` 하위 명령어와 함께 도움말을 사용하세요.

```shell
<AGENT_BINARY> check --help
```

| 서브 명령        | 비고                                                                       |
|-------------------|-----------------------------------------------------------------------------|
| `check`           | 지정된 검사를 실행합니다.                                                    |
| `config`          | [런타임 구성 관리][7].                                      |
| `configcheck`     | 실행 중인 Agent의 로드되고 해결된 모든 구성을 출력합니다.              |
| `diagnose`        | 시스템에서 연결 진단을 실행합니다.                              |
| `flare`           | [플레어를 수집하여 Datadog으로 보냅니다][8].                                |
| `health`          | 현재 Agent의 상태를 출력합니다.                                             |
| `help`            | 모든 명령에 대한 도움말입니다.                                                     |
| `hostname`        | Agent가 사용하는 호스트 이름을 출력합니다.                                       |
| `import`          | 이전 버전의 Agent에서 구성 파일을 가져오고 변환합니다. |
| `jmx`             | JMX 문제 해결                                                        |
| `launch-gui`      | Datadog Agent GUI를 시작합니다.                                                |
| `restart-service` | 서비스 제어 관리자 내에서 Agent를 다시 시작합니다. Windows 전용입니다.         |
| `start-service`   | 서비스 제어 관리자 내에서 Agent를 시작합니다. Windows 전용입니다.           |
| `stream-logs`     | 실행 중인 에이전트가 처리 중인 로그를 스트리밍합니다.                         |
| `stopservice`     | 서비스 제어 관리자 내에서 Agent를 중지합니다. Windows 전용입니다.            |
| `version`         | 버전 정보를 출력합니다.                                                         |

## 참고 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/
[2]: /ko/agent/docker/
[3]: /ko/agent/basic_agent_usage/windows/
[4]: /ko/agent/basic_agent_usage/windows/#status-and-information
[5]: /ko/containers/cluster_agent/
[6]: /ko/agent/basic_agent_usage/#gui
[7]: /ko/agent/troubleshooting/config/
[8]: /ko/agent/troubleshooting/send_a_flare/