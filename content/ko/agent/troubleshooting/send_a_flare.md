---
algolia:
  tags:
  - 에이전트 플레어
aliases:
- /ko/agent/faq/send-logs-and-configs-to-datadog-via-flare-command
further_reading:
- link: /agent/troubleshooting/debug_mode/
  tag: 설명서
  text: 에이전트 디버그 모드
- link: /agent/troubleshooting/agent_check_status/
  tag: 설명서
  text: 에이전트 점검의 상태 파악하기
title: 에이전트 플레어
---

{{< site-region region="gov" >}}
<div class="alert alert-danger">이 사이트에서는 Agent Flare 전송이 지원되지 않습니다.</div>
{{< /site-region >}}

플레어를 사용하면 필요한 트러블슈팅 정보를 Datadog 지원팀으로 보낼 수 있습니다.

이 페이지에서는 다음 내용을 다룹니다.
- [`flare` 명령어를 사용하여 플레어 전송하기](#send-a-flare-using-the-flare-command)
- 원격 설정을 사용하여 [Datadog 사이트에서 플레어 전송하기](#send-a-flare-from-the-Datadog-site)
- [수동 제출](#manual-submission)

플레어는 에이전트 의 설정 파일과 로그 모두를 아카이브 파일로 수집합니다. 비밀번호, API 키, 프록시 자격증명, SNMP 커뮤니티 문자열 등 민감한 정보를 제거합니다. 애플리케이션 성능 모니터링(APM)이 활성화된 경우, 플레어에는 [트레이서 디버그 로그][4]가 포함됩니다(사용 가능한 경우).

Datadog 에이전트는 완전한 오픈 소스이므로 코드의 동작을 [확인할 수 있습니다][1]. 플레어는 업로드하기 전에 확인 메시지를 표시하므로 필요한 경우 플레어를 전송하기 전에 검토할 수 있습니다.

## Datadog 사이트에서 플레어 전송하기

Datadog 사이트에서 플레어를 전송하려면 에이전트에서 [장치 그룹 자동화][2] 및 [원격 설정][3]을 활성화했는지 확인하세요.

{{% remote-flare %}}

{{< img src="agent/fleet_automation/fleet-automation-flares2.png" alt="전송 티켓 버튼은 기존 또는 새로운 지원 티켓에 대한 플레어를 전송할 수 있는 양식을 시작합니다." style="width:70%;" >}}

## `flare` 명령을 사용하여 플레어 전송하기

`flare` 하위 명령을 사용하여 플레어를 전송합니다. 아래 명령에서 `<CASE_ID>`를 Datadog 지원 케이스 ID(있는 경우)로 바꾼 다음 이와 연결된 이메일 주소를 입력합니다.

케이스 ID가 없는 경우에는 Datadog 로그인에 사용하던 이메일 주소를 Datadog에 입력하여 새 지원 케이스를 만드세요.

**아카이브 업로드를 확인하여 즉시 Datadog 지원팀으로 보내주세요**.

{{< tabs >}}
{{% tab "Agent" %}}

| 플랫폼   | 명령어                                                 |
|------------|---------------------------------------------------------|
| AIX        | `datadog-agent flare <CASE_ID>`                         |
| Docker     | `docker exec -it dd-agent agent flare <CASE_ID>`        |
| macOS      | `datadog-agent flare <CASE_ID>` 또는 [웹 GUI][1] 사용 |
| CentOS     | `sudo datadog-agent flare <CASE_ID>`                    |
| Debian     | `sudo datadog-agent flare <CASE_ID>`                    |
| 쿠버네티스(Kubernetes) | `kubectl exec -it <AGENT_POD_NAME> -- agent flare <CASE_ID>`  |
| Fedora     | `sudo datadog-agent flare <CASE_ID>`                    |
| Redhat     | `sudo datadog-agent flare <CASE_ID>`                    |
| Suse       | `sudo datadog-agent flare <CASE_ID>`                    |
| Source     | `sudo datadog-agent flare <CASE_ID>`                    |
| Windows    | 전용 [윈도우즈(Windows) 설명서][2]를 참조하세요.        |
| 헤로쿠(Heroku)     | 전용 [헤로쿠(Heroku) 설명서][3]를 참조하세요.         |
| PCF     | `sudo /var/vcap/jobs/dd-agent/packages/dd-agent/bin/agent/agent flare <CASE_ID>`             |

## 전용 컨테이너

에이전트 버전이 v7.19 이상이고 [최신 버전][4]의 Datadog 헬름 차트 또는 Datadog 에이전트 및 트레이스 에이전트 이 별도의 컨테이너에 있는 데몬셋을 사용하는 경우, 다음을 포함하는 에이전트 포드를 배포합니다.

* 단일 컨테이너 및 에이전트 프로세스(에이전트 + 로그 에이전트 )
* 단일 컨테이너 및 process-agent 프로세스
* 단일 컨테이너 및 trace-agent 프로세스
* 단일 컨테이너 및 system-probe 프로세스

각 컨테이너에서 플레어를 가져오려면 다음 명령을 실행합니다.

### 에이전트

```bash
kubectl exec -it <AGENT_POD_NAME> -c agent -- agent flare <CASE_ID>
```

### 프로세스 에이전트

```bash
kubectl exec -it <AGENT_POD_NAME> -c process-agent -- agent flare <CASE_ID> --local
```

### 트레이스 에이전트

```bash
kubectl exec -it <AGENT_POD_NAME> -c trace-agent -- agent flare <CASE_ID> --local
```

### 보안 에이전트

```bash
kubectl exec -it <AGENT_POD_NAME> -c security-agent -- security-agent flare <CASE_ID>
```

### 시스템 프로브

system-probe 컨테이너 는 플레어를 전송할 수 없으므로 대신 컨테이너 로그를 받습니다.

```bash
kubectl logs <AGENT_POD_NAME> -c system-probe > system-probe.log
```

## ECS Fargate

ECS Fargate 플랫폼 v1.4.0을 사용하는 경우, [Amazon ECS Exec][5]을 활성화하여 실행 중인 리눅스(Linux) 컨테이너에 액세스할 수 있도록 ECS 작업 및 서비스를 설정할 수 있습니다. Amazon ECS Exec을 활성화한 후 다음 명령을 실행하여 플레어를 전송합니다.

```bash
aws ecs execute-command --cluster <CLUSTER_NAME> \
    --task <TASK_ID> \
    --container datadog-agent \
    --interactive \
    --command "agent flare <CASE_ID>"
```

**참고:** ECS Exec은 새 작업에 대해서만 활성화할 수 있습니다. ECS Exec을 사용하려면 기존 작업을 다시 생성해야 합니다.

[1]: /ko/agent/basic_agent_usage/#gui
[2]: /ko/agent/basic_agent_usage/windows/#agent-v6
[3]: /ko/agent/guide/heroku-troubleshooting/#send-a-flare
[4]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/CHANGELOG.md
[5]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-exec.html
{{% /tab %}}

{{% tab "Cluster Agent" %}}

| 플랫폼      | 명령어                                                                     |
|---------------|-----------------------------------------------------------------------------|
| 쿠버네티스(Kubernetes)    | `kubectl exec -n <NAMESPACE> -it <CLUSTER_POD_NAME> -- datadog-cluster-agent flare <CASE_ID>` |
| Cloud Foundry | `/var/vcap/packages/datadog-cluster-agent/datadog-cluster-agent-cloudfoundry flare -c /var/vcap/jobs/datadog-cluster-agent/config <CASE_ID>` |

{{% /tab %}}
{{< /tabs >}}

## 수동 제출

에이전트 플레어 프로토콜은 로컬 `/tmp` 디렉터리에 있는 첫 번째 아카이브 파일로 설정과 로그를 수집합니다.
에이전트 연결에 문제가 있는 경우 이 파일을 수동으로 확보하여 지원팀에 제공합니다.

### 쿠버네티스(Kubernetes)
쿠버네티스(Kubernetes) 에서 아카이브 파일을 가져오려면 kubectl 명령을 사용합니다.
```
kubectl cp datadog-<pod-name>:tmp/datadog-agent-<date-of-the-flare>.zip flare.zip -c agent
```

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-agent/tree/main/pkg/flare
[2]: /ko/agent/fleet_automation/
[3]: /ko/agent/remote_config#enabling-remote-configuration
[4]: /ko/tracing/troubleshooting/tracer_debug_logs/?code-lang=dotnet#data-collected