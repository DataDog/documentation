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

<div class="alert alert-warning">
<code>서비스</code> 래퍼 명령을 사용할 수 없는 Linux 기반 시스템인 경우 <a href="/agent/faq/agent-v6-changes/?tab=linux#service-lifecycle-commands">대안 목록을 참조하세요</a>.
</div>

## Agent 시작, 중지 및 재시작

### Agent 시작

Datadog Agent를 시작하는 명령 목록:

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

| 플랫폼   | 명령어                                                            |
|------------|--------------------------------------------------------------------|
| AIX        | `startsrc -s datadog-agent`                                        |
| Linux      | OS에 맞는 [Agent 설명서][1]를 참조하세요.                      |
| Docker     | [설치 명령][2]을 사용합니다.                                 |
| Kubernetes | `kubectl create -f datadog-agent.yaml`                             |
| macOS      | `launchctl start com.datadoghq.agent` *또는* systray 앱을 통해 |
| Source     | `sudo service datadog-agent start`                                 |
| Windows    | [Windows Agent 설명서][3]를 참조하세요.                          |

[1]: /ko/agent/
[2]: /ko/agent/docker/
[3]: /ko/agent/basic_agent_usage/windows/
{{% /tab %}}
{{% tab "Agent v5" %}}

| 플랫폼 | 명령어                                   |
|----------|-------------------------------------------|
| Linux    | `sudo service datadog-agent start`        |
| Docker   | [Docker Agent 설명서][1]를 참조하세요.  |
| macOS    | `/usr/local/bin/datadog-agent start`      |
| Source   | `sudo ~/.datadog-agent/bin/agent start`   |
| Windows  | [Windows Agent 설명서][2]를 참조하세요. |

[1]: https://github.com/DataDog/docker-dd-agent/blob/master/README.md
[2]: /ko/agent/basic_agent_usage/windows/
{{% /tab %}}
{{< /tabs >}}

### Agent 중지하기

Datadog Agent를 중지하는 명령 목록:

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

| 플랫폼   | 명령어                                                                          |
|------------|----------------------------------------------------------------------------------|
| AIX        | `stopsrc -s datadog-agent`                                                       |
| Linux      | 사용 중인 OS의 [Agent 설명서][1]를 참조하세요.                                    |
| Docker     | `docker exec -it <CONTAINER_NAME> agent stop`                                    |
| Kubernetes | `kubectl delete pod <AGENT POD NAME>`—참고: 포드의 일정이 자동으로 변경됨 |
| macOS      | `launchctl stop com.datadoghq.agent` *또는* systray 앱을 통해                |
| Source     | `sudo service datadog-agent stop`                                                |
| Windows    | [Windows Agent 설명서][2]를 참조하세요.                                        |

[1]: /ko/agent/
[2]: /ko/agent/basic_agent_usage/windows/
{{% /tab %}}
{{% tab "Agent v5" %}}

| 플랫폼 | 명령어                                   |
|----------|-------------------------------------------|
| Linux    | `sudo service datadog-agent stop`         |
| Docker   | [Docker Agent 설명서][1]를 참조하세요.  |
| macOS    | `/usr/local/bin/datadog-agent stop`       |
| Source   | `sudo ~/.datadog-agent/bin/agent stop`    |
| Windows  | [Windows Agent 설명서][2]를 참조하세요. |

[1]: https://github.com/DataDog/docker-dd-agent/blob/master/README.md
[2]: /ko/agent/basic_agent_usage/windows/
{{% /tab %}}
{{< /tabs >}}

### Agent 재시작하기

Datadog Agent를 재시작하는 명령 목록:

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

| 플랫폼   | 명령어                                                                          |
|------------|----------------------------------------------------------------------------------|
| Linux      | 사용 중인 OS의 [Agent 설명서][1]를 참조하세요.                                    |
| Docker     | [설치 명령][2]을 사용합니다.                                               |
| Kubernetes | `kubectl delete pod <AGENT POD NAME>`—참고: 포드의 일정이 자동으로 변경됨 |
| macOS      | `stop` 실행 후 `start` *또는* systray 앱을 통해                             |
| Source     | *지원되지 않는 플랫폼*                                                           |
| Windows    | [Windows Agent 설명서][3]를 참조하세요.                                        |

[1]: /ko/agent/
[2]: /ko/agent/docker/?tab=standard#setup
[3]: /ko/agent/basic_agent_usage/windows/
{{% /tab %}}
{{% tab "Agent v5" %}}

| 플랫폼 | 명령어                                   |
|----------|-------------------------------------------|
| Linux    | `sudo service datadog-agent restart`      |
| Docker   | [Docker Agent 설명서][1]를 참조하세요.  |
| macOS    | `/usr/local/bin/datadog-agent restart`    |
| Source   | `sudo ~/.datadog-agent/bin/agent restart` |
| Windows  | [Windows Agent 설명서][2]를 참조하세요. |

[1]: https://github.com/DataDog/docker-dd-agent/blob/master/README.md
[2]: /ko/agent/basic_agent_usage/windows/
{{% /tab %}}
{{< /tabs >}}

## Agent 상태 및 정보

### 서비스 상태

Docker Agent의 상태를 표시하는 명령 목록:

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

| 플랫폼        | 명령어                                                                       |
|-----------------|-------------------------------------------------------------------------------|
| AIX             | `lssrc -s datadog-agent`                                                      |
| Linux           | 사용 중인 OS의 [Agent 설명서][1]를 참조하세요.                                 |
| Docker (Debian) | `sudo docker exec -it <CONTAINER_NAME> s6-svstat /var/run/s6/services/agent/` |
| Kubernetes      | `kubectl exec -it <POD_NAME> -- s6-svstat /var/run/s6/services/agent/`        |
| macOS           | `launchctl list com.datadoghq.agent` *또는* systray 앱을 통해             |
| Source          | `sudo service datadog-agent status`                                           |
| Windows         | [Windows Agent 설명서][2]를 참조하세요.                                     |


[1]: /ko/agent/
[2]: /ko/agent/basic_agent_usage/windows/
{{% /tab %}}
{{% tab "Agent v5" %}}

| 플랫폼        | 명령어                                                                  |
|-----------------|--------------------------------------------------------------------------|
| Linux           | `sudo service datadog-agent status`                                      |
| Docker (Debian) | `sudo docker exec -it <CONTAINER_NAME> /etc/init.d/datadog-agent status` |
| Kubernetes      | `kubectl exec -it <POD_NAME> -- /etc/init.d/datadog-agent status`        |
| macOS           | `datadog-agent status`                                                   |
| Source          | `sudo ~/.datadog-agent/bin/agent status`                                 |
| Windows         | [Windows Agent 설명서][1]를 참조하세요.                                |

[1]: /ko/agent/basic_agent_usage/windows/#status-and-information
{{% /tab %}}
{{% tab "Cluster Agent" %}}

| 플랫폼   | 명령어                        |
|------------|--------------------------------|
| Kubernetes | `datadog-cluster-agent status` |

{{% /tab %}}
{{< /tabs >}}

### Agent 정보

Datadog Agent 및 사용 가능한 통합 상태를 표시하는 명령 목록입니다.

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

| 플랫폼   | 명령어                                              |
|------------|------------------------------------------------------|
| AIX        | `datadog-agent status`                               |
| Linux      | `sudo datadog-agent status`                          |
| Docker     | `sudo docker exec -it <CONTAINER_NAME> agent status` |
| Kubernetes | `kubectl exec -it <POD_NAME> -- agent status`        |
| macOS      | `datadog-agent status` 또는 [web GUI][1]를 통해   |
| Source     | `sudo datadog-agent status`                          |
| Windows    | [Windows Agent 설명서][2]를 참조하세요.            |

올바르게 설정된 통합이 아래와 같이 경고나 오류 없이 **Running Checks** 아래에 표시됩니다:

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

[1]: /ko/agent/basic_agent_usage/#gui
[2]: /ko/agent/basic_agent_usage/windows/#status-and-information
{{% /tab %}}
{{% tab "Agent v5" %}}

| 플랫폼   | 명령어                                                                |
|------------|------------------------------------------------------------------------|
| Linux      | `sudo service datadog-agent info`                                      |
| Docker     | `sudo docker exec -it <CONTAINER_NAME> /etc/init.d/datadog-agent info` |
| Kubernetes | `kubectl exec -it <POD_NAME> -- /etc/init.d/datadog-agent info`        |
| macOS      | `datadog-agent info`                                                   |
| Source     | `sudo ~/.datadog-agent/bin/info`                                       |
| Windows    | [Windows Agent 설명서][1]를 참조하세요.                              |

제대로 설정된 통합이 아래와 같이 **Checks** 아래에 경고 또는 오류 없이 표시됩니다:

```text
Checks
======
 network
 -------
   - instance #0 [OK]
   - Collected 15 metrics, 0 events & 1 service check
```

[1]: /ko/agent/basic_agent_usage/windows/#status-and-information
{{% /tab %}}
{{% tab "Cluster Agent" %}}

| 플랫폼   | 명령어                        |
|------------|--------------------------------|
| Kubernetes | `datadog-cluster-agent status` |

{{% /tab %}}
{{< /tabs >}}

## 기타 명령

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

Agent v6의 명령줄 인터페이스는 하위 명령 기반입니다. 사용 가능한 하위 명령 목록을 확인하려면 다음을 수행하세요.
```shell
<AGENT_BINARY> --help
```

하위 명령을 실행하려면 Agent 바이너리를 호출해야 합니다.
```shell
<AGENT_BINARY> <SUB_COMMAND> <OPTIONS>
```

일부 옵션에는 `--help`. For example, use help with the `check` 하위 명령에 자세히 설명되어 있는 플래그와 옵션이 있습니다.
```shell
<AGENT_BINARY> check --help
```

| 하위 명령        | 참고                                                                       |
|-------------------|-----------------------------------------------------------------------------|
| `check`           | 지정한 검사를 실행합니다.                                                    |
| `config`          | [런타임 설정 관리][1].                                      |
| `configcheck`     | 실행 중인 Agent의 로드되고 해결된 모든 설정을 출력합니다.              |
| `diagnose`        | 시스템에서 연결 진단을 실행합니다.                              |
| `flare`           | [플레어를 모아 Datadog에게 보냅니다][2].                                |
| `health`          | 현재 Agent 상태를 출력합니다.                                             |
| `help`            | 모든 명령에 대한 도움말입니다.                                                     |
| `hostname`        | Agent가 사용하는 호스트 이름을 출력합니다.                                       |
| `import`          | 이전 버전의 Agent에서 설정 파일을 가져오고 변환합니다. |
| `jmx`             | JMX 트러블슈팅.                                                        |
| `launch-gui`      | Datadog Agent GUI를 시작합니다.                                                |
| `restart-service` | 서비스 제어 관리자 내에서 Agent를 다시 시작합니다. Windows 전용입니다.         |
| `start-service`   | 서비스 제어 관리자 내에서 Agent를 시작합니다. Windows 전용입니다.           |
| `stream-logs`     | 실행 중인 에이전트가 처리 중인 로그를 스트리밍합니다.                         |
| `stopservice`     | 서비스 제어 관리자 내에서 Agent를 중지합니다. Windows 전용입니다.            |
| `version`         | 버전 정보를 출력합니다.                                                         |

[1]: /ko/agent/troubleshooting/config/
[2]: /ko/agent/troubleshooting/send_a_flare/
{{% /tab %}}
{{< /tabs >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}