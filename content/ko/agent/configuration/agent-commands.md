---
algolia:
  tags:
  - agent status command
aliases:
- /ko/agent/faq/agent-status-and-information
- /ko/agent/faq/start-stop-restart-the-datadog-agent
- /ko/agent/faq/agent-commands
- /ko/agent/guide/agent-commands
further_reading:
- link: /agent/troubleshooting/
  tag: 설명서
  text: Agent 트러블슈팅
title: Agent 명령
---

<div class="alert alert-danger"><code>service</code> 래퍼 명령을 사용할 수 없는 Linux 기반 시스템의 경우 <a href="/agent/faq/agent-v6-changes/?tab=linux#service-lifecycle-commands">사용 가능한 대안 목록을 확인하세요</a>.
</div>

## Agent 시작/중지/다시 시작

### Agent 시작

Datadog Agent를 시작하는 명령 목록:

| 플랫폼   | 명령어                                                            |
|------------|--------------------------------------------------------------------|
| AIX        | `startsrc -s datadog-agent`                                        |
| Linux      | 사용 중인 OS에 대한 [Agent 문서][1]를 참고하세요.                      |
| Docker     | [설치 명령][2]을 사용합니다.                                 |
| 쿠버네티스(Kubernetes) | `kubectl create -f datadog-agent.yaml`                             |
| macOS      | `launchctl start com.datadoghq.agent` *또는* systray 앱 사용 |
| Source     | `sudo service datadog-agent start`                                 |
| Windows    | [Windows Agent 문서][3]를 참고하세요.                          |

### Agent 중지

Datadog Agent를 중지하는 명령 목록:

| 플랫폼   | 명령어                                                                          |
|------------|----------------------------------------------------------------------------------|
| AIX        | `stopsrc -s datadog-agent`                                                       |
| Linux      | 사용 중인 OS에 대한 [Agent 문서][1]를 참고하세요.                                    |
| Docker     | `docker exec -it <CONTAINER_NAME> agent stop`                                    |
| 쿠버네티스(Kubernetes) | `kubectl delete pod <AGENT POD NAME>`—참고: 파드가 자동으로 재예약됩니다 |
| macOS      | `launchctl stop com.datadoghq.agent` *또는* systray 앱 사용                |
| Source     | `sudo service datadog-agent stop`                                                |
| Windows    | [Windows Agent 문서][3]를 참고하세요.                                        |

### 에이전트 재시작

Datadog Agent를 다시 시작하는 명령 목록:

| 플랫폼   | 명령어                                                                          |
|------------|----------------------------------------------------------------------------------|
| Linux      | 사용 중인 OS에 대한 [Agent 문서][1]를 참고하세요.                                    |
| Docker     | [설치 명령][2]을 사용합니다.                                               |
| 쿠버네티스(Kubernetes) | `kubectl delete pod <AGENT POD NAME>`—참고: 파드가 자동으로 재예약됩니다 |
| macOS      | 에이전트를 중지한 후 다음으로 시작:<br>`launchctl stop com.datadoghq.agent` <br> `launchctl start com.datadoghq.agent` <br> 또는 Systray 앱 사용 |
| Source     | *지원되지 않는 플랫폼*                                                           |
| Windows    | [Windows Agent 문서][3]를 참고하세요.                                        |


## Agent 상태 및 정보

### 서비스 상태

Datadog Agent의 상태를 표시하는 명령 목록:

| 플랫폼        | 명령어                                                                       |
|-----------------|-------------------------------------------------------------------------------|
| AIX             | `lssrc -s datadog-agent`                                                      |
| Linux           | 사용 중인 OS에 대한 [Agent 문서][1]를 참고하세요.                                 |
| Docker (Debian) | `sudo docker exec -it <CONTAINER_NAME> s6-svstat /var/run/s6/services/agent/` |
| 쿠버네티스(Kubernetes)      | `kubectl exec -it <POD_NAME> -- s6-svstat /var/run/s6/services/agent/`        |
| macOS           | `launchctl list com.datadoghq.agent` *또는* systray 앱 사용             |
| Source          | `sudo service datadog-agent status`                                           |
| Windows         | [Windows Agent 문서][4]를 참고하세요.                                     |
| [Cluster Agent (Kubernetes)][5] | `datadog-cluster-agent status`                                     |

### Agent 정보

Datadog Agent와 활성화된 통합의 상태를 표시하는 명령 목록:

| 플랫폼   | 명령어                                              |
|------------|------------------------------------------------------|
| AIX        | `datadog-agent status`                               |
| Linux      | `sudo datadog-agent status`                          |
| Docker     | `sudo docker exec -it <CONTAINER_NAME> agent status` |
| 쿠버네티스(Kubernetes) | `kubectl exec -it <POD_NAME> -- agent status`        |
| macOS      | `datadog-agent status` 또는 [web GUI][6]에서   |
| Source     | `sudo datadog-agent status`                          |
| Windows    | [Windows Agent 문서][4]를 참고하세요.            |
| [Cluster Agent (Kubernetes)][5] | `datadog-cluster-agent status`       |

올바르게 구성된 통합은 아래에서 볼 수 있듯이 경고나 오류 없이 **Running Checks**에 표시됩니다.

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

## 기타 명령

Agent 명령줄 인터페이스는 하위 명령 기반입니다. 사용 가능한 하위 명령 목록을 보려면 다음을 실행하세요.
```shell
<AGENT_BINARY> --help
```

서브 명령어를 실행하려면 Agent 바이너리를 호출해야 합니다.
```shell
<AGENT_BINARY> <SUB_COMMAND> <OPTIONS>
```

일부 옵션에는 플래그와 옵션이 있으며, '--help'에서 상세하게 설명하고 있습니다. 예를 들어, 'check' 서브 명령어를 사용하려면 다음을 수행하세요.
```shell
<AGENT_BINARY> check --help
```

| 하위 명령        | 참고                                                                       |
|-------------------|-----------------------------------------------------------------------------|
| `check`           | 지정된 점검을 실행합니다.                                                    |
| `config`          | [런타임 구성 관리][7].                                      |
| `configcheck`     | 실행 중인 Agent에서 로드되고 해결된 구성을 모두 출력합니다.              |
| `diagnose`        | 시스템에 대한 연결 진단을 실행합니다.                              |
| `flare`           | [플레어를 수집하여 Datadog에 보냅니다][8].                                |
| `health`          | 현재 Agent 상태를 출력합니다.                                             |
| `help`            | 모든 명령과 관련한 도움말.                                                     |
| `hostname`        | Agent가 사용하는 호스트 이름을 출력합니다.                                       |
| `import`          | 이전 버전의 Agent에서 구성 파일을 가져와 변환합니다. |
| `jmx`             | JMX 트러블슈팅.                                                        |
| `launch-gui`      | Datadog Agent GUI를 시작합니다.                                                |
| `restart-service` | 서비스 컨트롤 관리자에서 Agent를 다시 시작합니다. Windows만 해당.         |
| `start-service`   | 서비스 컨트롤 관리자에서 Agent를 시작합니다. Windows만 해당.           |
| `stream-logs`     | 실행 중인 Agent가 처리하는 로그를 스트리밍합니다.                         |
| `stopservice`     | 서비스 컨트롤 관리자에서 Agent를 중지합니다. Windows만 해당.            |
| `version`         | 버전 정보를 출력합니다.                                                         |

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/
[2]: /ko/agent/docker/
[3]: /ko/agent/basic_agent_usage/windows/
[4]: /ko/agent/basic_agent_usage/windows/#status-and-information
[5]: /ko/containers/cluster_agent/
[6]: /ko/agent/basic_agent_usage/#gui
[7]: /ko/agent/troubleshooting/config/
[8]: /ko/agent/troubleshooting/send_a_flare/