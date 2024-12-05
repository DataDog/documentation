---
algolia:
  tags:
  - 에이전트 플레어
aliases:
- /ko/agent/faq/send-logs-and-configs-to-datadog-via-flare-command
further_reading:
- link: /agent/troubleshooting/debug_mode/
  tag: 에이전트 트러블슈팅
  text: 에이전트 디버그 모드
- link: /agent/troubleshooting/agent_check_status/
  tag: 에이전트 트러블슈팅
  text: 에이전트 점검의 상태 파악하기
title: 에이전트 플레어
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">이 사이트에서는 에이전트 플레어 보내기가 지원되지 않습니다.</div>
{{< /site-region >}}

플레어 명령 하나로 Datadog 지원 팀에 필요한 트러블슈팅 정보를 보낼 수 있습니다.

`flare`는 에이전트의 설정 파일을 모두 수집하고 아카이브 파일에 기록합니다. 비밀번호, API 키, 프록시 자격 증명, SNMP 커뮤니티 문자열을 포함한 중요한 정보는 제거됩니다. **아카이브 업로드를 확인해 즉시 Datadog 지원팀에 보내세요**.

Datadog 에이전트는 [코드의 동작을 확인][1]할 수 있는 완전한 오픈 소스입니다. 필요한 경우 플레어를 업로드하기 전에 확인 메시지를 표시하므로 전송 전에 플레어를 검토할 수 있습니다.

Datadog 지원 케이스 ID가 있는 경우 아래 명령어에서 `<CASE_ID>`를 내 케이스 ID로 바꾼 후 연결된 이메일 주소를 입력하세요.

케이스 ID가 없는 경우, Datadog에 로그인하는 데 사용하는 이메일 주소를 입력하여 새 지원 케이스를 생성하세요.

{{< tabs >}}
{{% tab "에이전트 v6 & v7" %}}

| 플랫폼   | 명령어                                                 |
|------------|---------------------------------------------------------|
| AIX        | `datadog-agent flare <CASE_ID>`                         |
| Docker     | `docker exec -it dd-agent agent flare <CASE_ID>`        |
| macOS      | `datadog-agent flare <CASE_ID>` 또는 [웹 GUI][1]를 통해 |
| CentOS     | `sudo datadog-agent flare <CASE_ID>`                    |
| Debian     | `sudo datadog-agent flare <CASE_ID>`                    |
| Kubernetes | `kubectl exec -it <POD_NAME> -- agent flare <CASE_ID>`  |
| Fedora     | `sudo datadog-agent flare <CASE_ID>`                    |
| Redhat     | `sudo datadog-agent flare <CASE_ID>`                    |
| Suse       | `sudo datadog-agent flare <CASE_ID>`                    |
| 소스     | `sudo datadog-agent flare <CASE_ID>`                    |
| Windows    | [Windows 설명서][2]를 참고하세요.        |
| Heroku     | [Heroku 설명서][3]를 참고하세요.          |
| PCF     | `sudo /var/vcap/jobs/dd-agent/packages/dd-agent/bin/agent/agent flare <CASE_ID>`             |

## 전용 컨테이너

에이전트 v7.19 이상을 사용하면서 Datadog Helm Chart [최신 버전][4]을 사용하거나 Datadog 에이전트와 트레이스 에이전트가 별도의 컨테이너에 있는 DaemonSet를 사용하는 경우, 다음이 포함된 에이전트 포드를 배포하게 됩니다.

* 에이전트 프로세스(에이전트 + 로그 에이전트)가 포함된 컨테이너 하나
* 프로세스 에이전트 프로세스가 포함된 컨테이너 하나
* 트레이스 에이전트 프로세스가 포함된 컨테이너 하나
* 시스템 프로브 프로세스가 포함된 컨테이너 하나

각 컨테이너에서 플레어를 얻으려면, 다음 명령어를 실행하세요.

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

### 시스템 탐구

시스템 프로브 컨테이너는 플레어를 보낼 수 없으므로 대신 컨테이너 로그를 가져옵니다:

```bash
kubectl logs <AGENT_POD_NAME> -c system-probe > system-probe.log
```

## ECS Fargate

ECS Fargate 플랫폼 v1.4.0을 사용하는 경우, [Amazon ECS Exec][5]을 활성화하여 실행 중인 Linux 컨테이너에 액세스할 수 있도록 ECS 작업 및 서비스를 설정할 수 있습니다. 설정한 후, 다음 명령을 실행하여 플레어를 전송합니다.

```bash
aws ecs execute-command --cluster <CLUSTER_NAME> \
    --task <TASK_ID> \
    --container datadog-agent \
    --interactive \
    --command "agent flare <CASE_ID>"
```

**참고:** ECS Exec은 새 작업에서만 활성화할 수 있습니다. ECS Exec을 사용하려면 기존 작업을 다시 생성해야 합니다.

[1]: /ko/agent/basic_agent_usage/#gui
[2]: /ko/agent/basic_agent_usage/windows/#agent-v6
[3]: /ko/agent/guide/heroku-troubleshooting/#send-a-flare
[4]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/CHANGELOG.md
[5]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-exec.html
{{% /tab %}}
{{% tab "에이전트 v5" %}}

| 플랫폼   | 명령어                                                                 |
|------------|-------------------------------------------------------------------------|
| Docker     | `docker exec -it dd-agent /etc/init.d/datadog-agent flare <CASE_ID>`    |
| macOS      | `datadog-agent flare <CASE_ID>`                                         |
| CentOS     | `sudo service datadog-agent flare <CASE_ID>`                            |
| Debian     | `sudo service datadog-agent flare <CASE_ID>`                            |
| Kubernetes | `kubectl exec <POD_NAME> -it /etc/init.d/datadog-agent flare <CASE_ID>` |
| Fedora     | `sudo service datadog-agent flare <CASE_ID>`                            |
| Redhat     | `sudo service datadog-agent flare <CASE_ID>`                            |
| SUSE       | `sudo service datadog-agent flare <CASE_ID>`                            |
| 소스     | `sudo ~/.datadog-agent/bin/agent flare <CASE_ID>`                       |
| Windows    | [Windows 설명서][2]를 참고하세요.                        |

**참고**: Linux 기반 시스템을 사용 중이고 `service` 래퍼 명령어를 사용할 수 없는 경우, [대안 목록을 참조][2]하세요.

[1]: /ko/agent/basic_agent_usage/windows/#agent-v5
[2]: /ko/agent/faq/agent-v6-changes/?tab=linux#service-lifecycle-commands
{{% /tab %}}

{{% tab "클러스터 에이전트" %}}

| 플랫폼      | 명령어                                                                     |
|---------------|-----------------------------------------------------------------------------|
| Kubernetes    | `kubectl exec -n <NAMESPACE> -it <CLUSTER_POD_NAME> -- datadog-cluster-agent flare <CASE_ID>` |
| Cloud Foundry | `/var/vcap/packages/datadog-cluster-agent/datadog-cluster-agent-cloudfoundry flare -c /var/vcap/jobs/datadog-cluster-agent/config <CASE_ID>` |

{{% /tab %}}
{{< /tabs >}}

## 수동 제출

에이전트 플레어 프로토콜은 설정을 수집하고 로컬 `/tmp` 디렉터리에 처음 위치한 아카이브 파일에 로그인합니다.
에이전트 연결에 문제가 있는 경우, 이 파일을 수동으로 구해 지원팀에 제공하세요.

### Kubernetes
Kubernetes에서 아카이브 파일을 얻으려면, kubectl 명령을 사용하세요. 
```
kubectl cp datadog-<pod-name>:tmp/datadog-agent-<date-of-the-flare>.zip flare.zip -c agent
```

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-agent/tree/main/pkg/flare