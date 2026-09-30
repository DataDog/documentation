---
further_reading:
- link: /agent/troubleshooting/debug_mode/
  tag: 에이전트 트러블슈팅
  text: 에이전트 디버그 모드
- link: /agent/troubleshooting/send_a_flare/
  tag: 에이전트 트러블슈팅
  text: 에이전트 플레어 전송
title: 에이전트 점검 상태
---

지정된 에이전트 점검과 관련하여 문제가 발생하는 경우 OS에서 다음 명령을 사용하여 트러블슈팅과 관련한 자세한 정보를 얻을 수 있습니다.

- [Liunux](#linux)
- [Windows](#windows)
- [Systemd](#systemd)
- [더 알아보기](#further-reading)

**참고**: 아래 예제에서 `<CHECK_NAME>`를 에이전트 점검으로 대체합니다(예: `activemq`, `ceph`, 또는 `elastic`). [통합 설명서][1]를 검토하여 에이전트 점검 이름을 확인합니다.

**참고**: 트러블슈팅을 하는 동안 서비스 점검을 일시적으로 비활성화하려면 `/conf.d/<CHECK_NAME>.d/conf.yaml`을 `.yaml`이나 `.yml` 파일 확장명이 아닌 다른 이름을 바꿉니다(예: `conf.yaml.disable`).

## Linux

에이전트 점검을 테스트하려면 다음을 실행합니다.

{{< tabs >}}
{{% tab "에이전트 v6 & v7" %}}

```shell
sudo -u dd-agent datadog-agent check <CHECK_NAME>
```

속도 메트릭을 포함하려면 명령에 `--check-rate`을 추가합니다. 다음은 에이전트 v6.x 예시입니다.

```shell
sudo -u dd-agent datadog-agent check <CHECK_NAME> --check-rate
```

{{% /tab %}}
{{% tab "에이전트 v5" %}}

```shell
sudo -u dd-agent dd-agent check <CHECK_NAME>
```

`<CHECK_NAME>`을 에이전트 점검으로 대체합니다(예: `activemq`, `ceph`, 또는 `elastic`). 에이전트 점검 이름을 확인하려면 [통합설명서][4]를 검토하세요.

속도 메트릭을 포함하려면 명령에 `--check-rate`을 추가합니다. 다음은 에이전트 v6.x 예시입니다.

```shell
sudo -u dd-agent dd-agent check <CHECK_NAME> --check-rate
```

{{% /tab %}}
{{< /tabs >}}

문제가 계속 발생할 경우 [플레어][2]를 포함하여 [Datadog 지원팀에 연락하세요][1].

## Windows

{{< tabs >}}
{{% tab "에이전트 v6 & v7" %}}

**elevated**(관리자로 실행) PowerShell 명령줄에서 적절한 `<CHECK_NAME>`과 스크립트를 실행합니다.

에이전트 버전 >= 6.12의 경우:

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" check <CHECK_NAME>
```

에이전트 버전이 <=6.11인 경우:
```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\embedded\agent.exe" check <CHECK_NAME>
```

{{% /tab %}}
{{% tab "에이전트 v<=5.11" %}}

에이전트 설치에는 Datadog 에이전트의 `Program Files` 디렉터리에 `shell.exe`라고 하는 파일이 포함되어 있습니다. 에이전트 환경에서 Python을 실행할 때 이 파일을 사용할 수 있습니다. 점검 항목(파일 이름: `<CHECK_NAME>`)이 쓰여지고 `.py` 및 `.yaml` 파일이 올바른 위치에 있으면 shell.exe에서 다음을 실행하세요.

```python
from checks import run_check
run_check('<CHECK_NAME>')
```

점검에서 반환하는 모든 메트릭 또는 이벤트를 출력합니다.

{{% /tab %}}
{{% tab "에이전트 v>=5.12" %}}

**elevated**(관리자로 실행) PowerShell 명령줄에서 적절한 `<CHECK_NAME>`과 스크립트를 실행합니다.

`<INSTALL_DIR>/embedded/python.exe <INSTALL_DIR>agent/agent.py check <CHECK_NAME>`

예를 들어, 디스크를 실행하려면 다음을 확인합니다.

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\embedded\python.exe" "$env:ProgramFiles\Datadog\Datadog Agent\agent\agent.py" check disk
```

{{% /tab %}}
{{< /tabs >}}

## Systemd

[systemd를 사용하는 시스템][3]의 경우 `journalctl`를 사용하여 디버깅을 돕습니다.

{{< tabs >}}
{{% tab "에이전트 v6 & v7" %}}
다음 명령은 Datadog 에이전트의 상태를 나타냅니다.

```shell
sudo systemctl status datadog-agent
```

에이전트 시작에 실패하고 더 이상의 정보가 제공되지 않으면 다음 명령을 사용해 Datadog 에이전트 서비스의 로그 전체를 표시하고 필요한 경우 `-r` 을 사용해 로그를 역순으로 인쇄합니다.

```shell
sudo journalctl -u datadog-agent.service
```

{{% /tab %}}
{{% tab "에이전트 v5" %}}
다음 명령은 Datadog 에이전트의 상태를 나타냅니다.

```shell
sudo systemctl status dd-agent
```

에이전트 시작에 실패하고 더 이상의 정보가 제공되지 않으면 다음 명령을 사용해 Datadog 에이전트 서비스의 로그 전체를 표시하고 필요한 경우 `-r` 을 사용해 로그를 역순으로 인쇄합니다.

```shell
sudo journalctl -u dd-agent.service
```

{{% /tab %}}
{{< /tabs >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/integrations/
[2]: /ko/agent/troubleshooting/send_a_flare/
[3]: https://github.com/DataDog/datadog-agent/blob/master/docs/agent/changes.md#service-lifecycle-commands