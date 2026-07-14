---
algolia:
  tags:
  - agent flare
aliases:
- /ko/agent/faq/send-logs-and-configs-to-datadog-via-flare-command
further_reading:
- link: /agent/troubleshooting/debug_mode/
  tag: 설명서
  text: Agent 디버그 모드
- link: /agent/troubleshooting/agent_check_status/
  tag: 설명서
  text: Agent 검사 상태 확인
title: Agent Flare
---
플레어를 사용하면 문제 해결에 필요한 정보를 Datadog 지원팀으로 보낼 수 있습니다.

이 페이지에서는 다음 내용을 다룹니다.
- [`flare` 명령](#send-a-flare-using-the-flare-command)을 사용하여 플레어 전송
- [Remote Configuration을 사용하여 Datadog 사이트에서 플레어 전송](#send-a-flare-from-the-datadog-site)
- [수동 제출](#manual-submission)

플레어는 Agent의 모든 구성 파일과 로그를 하나의 아카이브 파일로 수집합니다. 비밀번호, API 키, 프록시 자격 증명, SNMP 커뮤니티 문자열 등 민감한 정보는 제거됩니다. APM이 활성화된 경우 사용 가능한 [트레이서 디버그 로그][4]도 플레어에 포함됩니다.

Datadog Agent는 완전한 오픈 소스이므로 [코드 동작을 직접 검증][1]할 수 있습니다. 필요한 경우 업로드 전에 플레어 내용을 검토할 수 있으며, 플레어는 업로드 전에 확인 절차를 요청합니다.

Agent에 대해 Remote Configuration이 활성화된 상태에서 Datadog 지원팀에 문의하면 지원팀이 보다 신속하게 문제를 해결할 수 있도록 사용자 환경에서 플레어 생성을 시작할 수 있습니다. 플레어는 문제 해결에 필요한 정보를 Datadog 지원팀에 제공하여 문제 해결을 지원합니다. 

## Datadog 사이트에서 플레어 전송 {#send-a-flare-from-the-datadog-site}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-warning">Fleet Automation을 통한 Agent Flare 전송은 선택한 Datadog 사이트({{< region-param key="dd_datacenter" >}})에 대해 지원되지 않습니다. 대신 <a href="#manual-submission">수동 플레어 제출</a>을 사용하세요.</div>
{{< /site-region >}}

Datadog 사이트에서 플레어를 전송하려면 Agent에서 [Fleet Automation][2]과 [Remote Configuration][3]이 활성화되어 있어야 합니다.

{{% remote-flare %}}

{{< img src="agent/fleet_automation/fleet_automation_remote_flare.png" alt="Send Ticket 버튼은 기존 지원 티켓 또는 새 지원 티켓에 대한 플레어를 전송하는 양식을 실행합니다." style="width:70%;" >}}

## `flare` 명령을 사용하여 플레어 전송 {#send-a-flare-using-the-flare-command}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-warning"> <code>flare</code> 하위 명령을 사용한 Agent Flare 전송은 선택한 Datadog 사이트({{< region-param key="dd_datacenter" >}})에 대해 지원되지 않습니다. 대신 <a href="#manual-submission">수동 플레어 제출</a>을 사용하세요.</div>
{{< /site-region >}}

플레어를 전송하려면 `flare` 하위 명령을 사용합니다. 아래 명령에서 지원 케이스 ID가 있는 경우 `<CASE_ID>`를 해당 Datadog 지원 케이스 ID로 바꾸고, 이후 해당 케이스에 연결된 이메일 주소를 입력합니다.

케이스 ID가 없는 경우 Datadog에 로그인하는 데 사용된 이메일 주소를 입력하여 새 지원 케이스를 생성합니다.

**아카이브 업로드를 확인하여 즉시 Datadog 지원팀으로 보내주세요**.

{{< tabs >}}
{{% tab "Agent" %}}

| 플랫폼   | 명령                                                 |
|------------|---------------------------------------------------------|
| AIX        | `datadog-agent flare <CASE_ID>`                         |
| Docker     | `docker exec -it dd-agent agent flare <CASE_ID>`        |
| macOS      | `datadog-agent flare <CASE_ID>` 또는 [웹 GUI][1] 사용 |
| CentOS     | `sudo datadog-agent flare <CASE_ID>`                    |
| Debian     | `sudo datadog-agent flare <CASE_ID>`                    |
| Kubernetes | `kubectl exec -it <AGENT_POD_NAME> -- agent flare <CASE_ID>`  |
| Fedora     | `sudo datadog-agent flare <CASE_ID>`                    |
| Redhat     | `sudo datadog-agent flare <CASE_ID>`                    |
| Suse       | `sudo datadog-agent flare <CASE_ID>`                    |
| Source     | `sudo datadog-agent flare <CASE_ID>`                    |
| Windows    | `& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" flare <CASE_ID>`       |
| Heroku     | 전용 [Heroku 설명서][3] 참조         |
| PCF     | `sudo /var/vcap/jobs/dd-agent/packages/dd-agent/bin/agent/agent flare <CASE_ID>`             |

## 전용 컨테이너 {#dedicated-containers}

Agent v7.19 이상을 사용하고 [최신 버전][4]의 Datadog Helm Chart를 사용하거나 Datadog Agent와 Trace Agent가 별도 컨테이너로 실행되는 DaemonSet을 사용하는 경우 다음을 포함하는 Agent 포드가 배포됩니다.

* Agent 프로세스(Agent + Log Agent)가 실행되는 컨테이너 1개
* process-agent 프로세스가 실행되는 컨테이너 1개
* trace-agent 프로세스가 실행되는 컨테이너 1개
* system-probe 프로세스가 실행되는 컨테이너 1개

각 컨테이너에서 플레어를 수집하려면 다음 명령을 실행합니다.

### Agent {#agent}

```bash
kubectl exec -it <AGENT_POD_NAME> -c agent -- agent flare <CASE_ID>
```

### Process Agent {#process-agent}

```bash
kubectl exec -it <AGENT_POD_NAME> -c process-agent -- agent flare <CASE_ID> --local
```

### Trace Agent {#trace-agent}

```bash
kubectl exec -it <AGENT_POD_NAME> -c trace-agent -- agent flare <CASE_ID> --local
```

### Security Agent {#security-agent}

```bash
kubectl exec -it <AGENT_POD_NAME> -c security-agent -- security-agent flare <CASE_ID>
```

### System Probe {#system-probe}

system-probe 컨테이너는 플레어를 전송할 수 없으므로 대신 컨테이너 로그를 수집하세요.

```bash
kubectl logs <AGENT_POD_NAME> -c system-probe > system-probe.log
```

## ECS Fargate {#ecs-fargate}

ECS Fargate 플랫폼 v1.4.0을 사용하는 경우 [Amazon ECS Exec][5]을 활성화하여 실행 중인 Linux 컨테이너에 접근할 수 있도록 ECS 작업 및 서비스를 구성할 수 있습니다. Amazon ECS Exec을 활성화한 후 다음 명령을 실행하여 플레어를 전송합니다.

```bash
aws ecs execute-command --cluster <CLUSTER_NAME> \
    --task <TASK_ID> \
    --container datadog-agent \
    --interactive \
    --command "agent flare <CASE_ID>"
```

**참고:** ECS Exec은 새 작업에만 활성화할 수 있습니다. 기존 작업은 ECS Exec을 사용하려면 다시 생성해야 합니다.

[1]: /ko/agent/basic_agent_usage/#gui
[2]: /ko/agent/basic_agent_usage/windows/#agent-v6
[3]: /ko/agent/guide/heroku-troubleshooting/#send-a-flare
[4]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/CHANGELOG.md
[5]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-exec.html
{{% /tab %}}

{{% tab "Cluster Agent" %}}

| 플랫폼      | 명령                                                                     |
|---------------|-----------------------------------------------------------------------------|
| Kubernetes    | `kubectl exec -n <NAMESPACE> -it <CLUSTER_POD_NAME> -- datadog-cluster-agent flare <CASE_ID>` |
| Cloud Foundry | `/var/vcap/packages/datadog-cluster-agent/datadog-cluster-agent-cloudfoundry flare -c /var/vcap/jobs/datadog-cluster-agent/config <CASE_ID>` |

{{% /tab %}}
{{< /tabs >}}

## 수동 제출 {#manual-submission}

Agent 플레어 프로토콜은 구성 및 로그를 수집하여 먼저 로컬 `/tmp` 디렉터리에 아카이브 파일을 생성합니다.
Agent 연결에 문제가 있는 경우 이 파일을 직접 확보한 후 Datadog 지원팀에 전달하세요.

### Kubernetes {#kubernetes}
Kubernetes에서 아카이브 파일을 가져오려면 kubectl 명령을 사용합니다.

```
kubectl cp datadog-<pod-name>:tmp/datadog-agent-<date-of-the-flare>.zip flare.zip -c agent
```

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-agent/tree/main/pkg/flare
[2]: /ko/agent/fleet_automation/
[3]: /ko/agent/guide/setup_remote_config
[4]: /ko/tracing/troubleshooting/tracer_debug_logs/?code-lang=dotnet#data-collected