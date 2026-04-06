---
algolia:
  tags:
  - install
  - installing
  - uninstall
  - uninstalling
  - windows
aliases:
- /ko/guides/basic_agent_usage/windows/
- /ko/agent/basic_agent_usage/windows/
description: Windows 플랫폼에서 Datadog Agent의 기본 기능
further_reading:
- link: /logs/
  tag: Documentation
  text: 로그 수집
- link: /infrastructure/process/
  tag: Documentation
  text: 프로세스 수집
- link: /tracing/
  tag: Documentation
  text: 트레이스 수집
- link: /agent/architecture/#agent-architecture
  tag: Documentation
  text: Agent 아키텍처 자세히 알아보기
- link: /agent/configuration/network#configure-ports
  tag: Documentation
  text: 인바운드 포트 구성
- link: /agent/guide/windows-agent-ddagent-user
  tag: Documentation
  text: Datadog Windows Agent User에 관해 자세히 알아보기
platform: Windows
title: Windows
---
## 개요

이 페이지에서는 Windows용 Datadog Agent의 기본 기능에 대해 설명합니다. 아직 Agent를 설치하지 않은 경우 아래 설치 지침을 확인하거나 [앱 안내를 따르세요][1].

지원되는 Windows 버전의 전체 목록은 [지원되는 플랫폼][15]을 참조하세요.

## 설치

Windows 호스트에 Datadog Agent를 설치하려면 [Fleet Automation 내의 인앱 흐름][16]을 따른 다음 설치 명령을 복사하고 실행하세요. Datadog Agent는 `ddagentuser`로 실행됩니다. 자세한 정보는 [Datadog Windows Agent User][17] 문서를 참조하세요.


{{< img src="/agent/basic_agent_usage/windows_img2_july_25.png" alt="Windows 호스트에서 실행하는 Datadog Agent에 대한 인앱 설치 단계입니다." style="width:90%;">}}


## 대체 설치 방법

### Agent 관리자 GUI로 설치

<div class="alert alert-info">Agent의 기본 설치 위치는 <code>%ProgramFiles%\Datadog\Datadog Agent</code>입니다. 사용자 지정 설치 위치를 사용하려는 경우 Datadog 파일의 <code>Datadog</code> 하위 디렉터리를 지정해야 합니다.</div>

1. 최신 버전의 Agent를 설치하려면 [Datadog Agent 설치 프로그램][400]을 다운로드합니다.
2. `datadogagent7latest.amd64.msi`를 열어 설치 프로그램을 실행합니다. 메시지가 나타나면 Administrator 크리덴셜을 입력합니다.
3. 안내에 따라 라이선스 계약에 동의하고 [Datadog API 키][500]를 입력합니다.

설치가 완료되면 Datadog Agent Manager를 시작할 수 있는 옵션이 제공됩니다.


#### 설치 구성 옵션

Windows에 Agent를 설치할 때 다음 각 구성 옵션을 명령줄에 속성으로 추가할 수 있습니다. 추가 Agent 구성 옵션은 [추가 Agent 구성 옵션](#moreagentconfigurationoptions)을 참조하세요.


| 변수                                    | 유형    | 설명                                                                                                                                                                                                                         |
|                 |||
| `APIKEY`                                    | 문자열  | 구성 파일에 Datadog API KEY를 추가합니다.                                                                                                                                                                                 |
| `SITE`   | 문자열  | 다음과 같이 Datadog 인테이크 사이트를 설정합니다. 예: `SITE=datadoghq.com`     |
| `TAGS`                                      | 문자열  | 구성 파일에 할당할 쉼표로 구분된 태그 목록입니다. 예: `TAGS="key_1:val_1,key_2:val_2"`                                                                                                                         |
| `HOSTNAME`                                  | 문자열  | Agent가 Datadog에 보고한 호스트 이름을 구성합니다(런타임에 계산된 호스트 이름을 재정의함).                                                                                                                            |
| `DDAGENTUSER_NAME`                          | 문자열  | Agent 설치 _(v6.11.0+)_ 중에 사용되는 기본 `ddagentuser` 사용자 이름을 재정의합니다. [Datadog Windows Agent User에 관해 자세히 알아보세요][3].                                                                                      |
| `DDAGENTUSER_PASSWORD`                      | 문자열  | Agent 설치 _(v6.11.0+)_ 중에 `ddagentuser` 사용자에 대해 생성된 암호화된 보안 비밀번호를 재정의합니다. 도메인 서버 설치를 위해 반드시 제공되어야 합니다. [Datadog Windows Agent User에 관해 자세히 알아보세요][3].  |
| `APPLICATIONDATADIRECTORY`                  | 경로    | 구성 파일 디렉터리 트리에 사용할 디렉터리를 재정의합니다. 최초 설치 시에만 제공될 수 있으며, 업그레이드에는 유효하지 않습니다. 기본값: `C:\ProgramData\Datadog`. _(v6.11.0+)_                                           |
| `PROJECTLOCATION`                           | 경로    | 바이너리 파일 디렉터리 트리에 사용할 디렉터리를 재정의합니다. 최초 설치 시에만 제공될 수 있으며, 업그레이드에는 유효하지 않습니다. 기본값: `%ProgramFiles%\Datadog\Datadog Agent`. _(v6.11.0+)_<br><br>기본 디렉터리를 재정의하려는 경우, Datadog 파일의 `Datadog` 하위 디렉터리를 지정해야 합니다.                                    |

**참고**

 `/qn` 옵션은 자동 설치를 실행합니다. GUI 프롬프트를 보려면 제거하세요.
 일부 Agent 버전에서는 강제 재부팅이 발생할 수 있습니다. 이를 방지하려면 `REBOOT=ReallySuppress` 파라미터를 추가하세요.
 일부 Agent 구성 요소에는 데이터를 수집하기 위해 커널 드라이버가 필요합니다. 구성 요소에 커널 드라이버가 필요한지 확인하려면 해당 설명서 페이지를 참조하거나 관련 Agent 구성 파일에서 `kernel driver`를 검색하세요.
 유효한 `datadog.yaml` 파일이 발견되면 해당 파일은 지정된 모든 명령줄 옵션보다 우선합니다.

#### 추가 Agent 구성 옵션

Windows에 Agent를 설치할 때 다음 각 구성 옵션을 명령줄에 속성으로 추가할 수 있습니다.

**참고**: 유효한 `datadog.yaml` 파일이 발견되면 해당 파일이 지정된 모든 명령줄 옵션보다 우선합니다.


| 변수                                    | 유형    | 설명                                                                                                                                                                                                                         |
|                 |||
| `LOGS_ENABLED`                              | 문자열  | 구성 파일에서 로그 수집 기능을 활성화(`"true"`)하거나 비활성화(`"false"`)합니다. 로그는 기본적으로 비활성화되어 있습니다.                                                                                                        |
| `APM_ENABLED`                               | 문자열  | 구성 파일에서 APM Agent를 활성화(`"true"`)하거나 비활성화(`"false"`)합니다. APM은 기본적으로 활성화되어 있습니다.                                                                                                                        |
| `PROCESS_ENABLED`                           | 문자열  | 구성 파일에서 Process Agent를 활성화(`"true"`)하거나 비활성화(`"false"`)합니다. Process Agent는 기본적으로 비활성화되어 있습니다.                                                                                                     |
| `HOSTNAME_FQDN_ENABLED`                     | 문자열  | Agent 호스트 이름에 대한 FQDN 사용을 활성화(`"true"`)하거나 비활성화(`"false"`)합니다. Agent 구성 파일에서 `hostname_fqdn`을 설정하는 것과 동일합니다. 호스트 이름에 대한 FQDN 사용은 기본적으로 비활성화되어 있습니다. _(v6.20.0+)_ |
| `CMD_PORT`                                  | 숫자  | 0에서 65534 사이의 유효한 포트 번호입니다. Datadog Agent는 포트 5001에서 명령 API를 노출합니다. 해당 포트가 이미 다른 프로그램에서 사용 중인 경우 여기에서 기본값이 재정의될 수 있습니다.                                               |
| `PROXY_HOST`                                | 문자열  | (프록시를 사용하는 경우) 프록시 호스트를 설정합니다. [Datadog Agent를 프록시와 함께 사용하는 방법에 대해 자세히 알아보세요][4].                                                                                                                                 |
| `PROXY_PORT`                                | 번호 | (프록시를 사용하는 경우) 프록시 포트를 설정합니다. [Datadog Agent를 프록시와 함께 사용하는 방법에 대해 자세히 알아보세요][4].                                                                                                                                 |
| `PROXY_USER`                                | 문자열 | (프록시를 사용하는 경우) 프록시 사용자를 설정합니다. [Datadog Agent를 프록시와 함께 사용하는 방법에 대해 자세히 알아보세요][4].                                                                                                                                 |
| `PROXY_PASSWORD`                            | 문자열 | (프록시를 사용하는 경우) 프록시 비밀번호를 설정합니다. 프로세스/컨테이너 Agent의 경우 이 변수는 인증 비밀번호를 전달하는 데 필요하며 이름을 바꿀 수 없습니다 [Datadog Agent를 프록시와 함께 사용하는 방법에 대해 자세히 알아보세요][4]. |
| `EC2_USE_WINDOWS_PREFIX_DETECTION`          | 불리언 | EC2의 Windows 호스트에는 EC2 인스턴스 ID를 사용합니다. _(v7.28.0+)_                                            |

#### 설치 로그 파일

`/log <FILENAME>` msiexec 옵션을 설정하여 설치 로그 파일을 구성합니다. 이 옵션을 설정하지 않으면 msiexec는 기본적으로 로그를 `%TEMP%\MSI*.LOG`에 작성합니다.


## 구성

주요 Agent 구성 파일은 다음 위치에 있습니다.
`C:\ProgramData\Datadog\datadog.yaml`. 이 파일은 API 키, 선택한 Datadog 사이트, 프록시 파라미터, 호스트 태그 및 로그 레벨과 같은 호스트 전체 설정에 사용됩니다.

같은 디렉터리에 `datadog.yaml.example` 파일도 있으며, 이는 모든 사용 가능한 구성 옵션에 대한 완전 주석형 참조 파일로, 참조 및 특정 설정 복사에 유용합니다.


통합용 구성 파일은 다음 위치에 있습니다.
`C:\ProgramData\Datadog\conf.d\` 대체 레거시 위치도 있을 수 있습니다. `C:\Documents and Settings\All Users\Application Data\Datadog\conf.d\`.

각 통합에는 `<INTEGRATION>.d\`라는 하위 디렉터리가 있으며 여기에는 다음이 포함됩니다.
 `conf.yaml`: 통합에 대한 활성 설정
* `conf.yaml.example`: 지원되는 구성 키를 보여주는 샘플 파일

구성 변경을 할 때는 변경 사항이 적용되도록 Agent를 재시작해야 합니다.

[Datadog Agent Manager GUI][6]를 사용하여 검사를 활성화, 비활성화 및 구성할 수 있습니다. 변경 사항이 적용되려면 Agent를 다시 시작해야 합니다.

**참고**: `ProgramData`는 숨겨진 폴더입니다.

## Agent 명령어

Agent 실행은 Windows Service Control Manager에 의해 제어됩니다.

* 주요 실행 파일 이름은 `agent.exe`입니다.
* 구성 GUI는 브라우저 기반 구성 애플리케이션입니다(Windows 64비트 전용).
* `<PATH_TO_AGENT.EXE> <COMMAND>` 구문을 사용하여 **승격된 (Admin으로 실행)** 명령줄(PowerShell 또는 Command Prompt)에서 명령을 실행할 수 있습니다.
* 명령줄 옵션은 다음과 같습니다.

| 명령         | 설명                                                                      |
|||
| 검사           | 지정된 검사를 실행합니다.                                                        |
| 진단          | 시스템에서 일부 연결 진단을 실행합니다.                             |
| flare           | 플레어를 수집하여 Datadog으로 보냅니다.                                         |
| 도움말         | 모든 명령에 대한 도움말을 가져옵니다.                                                     |
| 호스트 이름     | Agent가 사용하는 호스트 이름을 출력합니다.                                           |
| 가져오기       | 이전 버전의 Agent에서 구성 파일을 가져오고 변환합니다.    |
| GUI 시작      | Datadog Agent Manager를 시작합니다.                                                |
| 서비스 재시작 | 서비스 제어 관리자 내에서 Agent를 다시 시작합니다.                           |
| 실행           | Agent를 시작합니다.                                                                |
| 시작           | Agent를 시작합니다. (더 이상 사용되지 않지만 허용됩니다. 대안으로 `run`을 사용하세요.) |
| 서비스 시작 | 서비스 제어 관리자 내에서 Agent를 시작합니다.                             |
| 상태 | 현재 상태를 출력합니다.                                                        |
| 서비스 중지 | 서비스 제어 관리자 내에서 Agent를 중지합니다.                              |
| 버전 | 버전 정보를 출력합니다.                                                         |

**예시**:
   PowerShell (`powershell.exe`)

    ```powershell
    & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" status
    & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" launch-gui
    & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" flare
    ```

   명령 프롬프트(`cmd.exe`)

    ```cmd
    "%ProgramFiles%\Datadog\Datadog Agent\bin\agent.exe" status
    "%ProgramFiles%\Datadog\Datadog Agent\bin\agent.exe" launch-gui
    "%ProgramFiles%\Datadog\Datadog Agent\bin\agent.exe" flare
    ```

## Agent 제거

Windows에서 Agent를 제거하는 방법에는 두 가지가 있습니다. 두 방법 모두 Agent를 제거하지만, 호스트의 `C:\ProgramData\Datadog` 구성 폴더는 제거하지 않습니다.

### 프로그램 추가 또는 제거

1. **CTRL** 및 **Esc**를 누르거나 Windows 키를 사용하여 Windows Search를 실행합니다.
1. `add`를 검색하고 **Add or remove programs**를 클릭합니다.
1. `Datadog Agent`를 검색하고 **Uninstall**을 클릭합니다.

### PowerShell

**참고:** 아래 명령을 사용하려면 WinRM을 활성화하세요.

재부팅하지 않고 Agent를 제거하려면 다음 PowerShell 명령을 사용합니다.

{{< code-block lang="powershell" >}}
$productCode = (@(Get-ChildItem -Path "HKLM:SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall" -Recurse) | Where {$_.GetValue("DisplayName") -like "Datadog Agent" }).PSChildName
start-process msiexec -Wait -ArgumentList ('/log', 'C:\uninst.log', '/q', '/x', "$productCode", 'REBOOT=ReallySuppress')
{{< /code-block >}}

## 문제 해결

문제 해결 단계를 보려면 [Agent 문제 해결 문서][18]를 참조하세요.


### Agent 상태 및 정보

Agent가 실행 중인지 확인하려면 Services 패널의 `DatadogAgent` 서비스가 *Started*로 나타나는지 확인합니다. *Datadog Metrics Agent*(`agent.exe`)라는 프로세스도 Task Manager에 있어야 합니다.

Agent 상태에 대한 자세한 정보를 얻으려면 Datadog Agent Manager를 시작하세요.

* Datadog Agent 시스템 트레이 아이콘을 오른쪽 버튼으로 클릭하고 Configure을 클릭하거나
* **승격된(Admin으로 실행)** 명령줄에서 `launchgui` 명령을 실행합니다.
	 PowerShell: `&amp; "<PATH_TO_AGENT.EXE>" launchgui`
	 cmd: `"<PATH_TO_AGENT.EXE>" launchgui`

그런 다음 *Status* > *General*로 이동하여 상태 페이지를 엽니다.
*Status* > *Collector* 및 *Checks* > *Summary*에서 검사 실행에 대한 자세한 내용을 알아보세요.

상태 명령은 PowerShell에서 사용할 수 있습니다.

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" status
```

또는 cmd.exe:

```cmd
"%ProgramFiles%\Datadog\Datadog Agent\bin\agent.exe" status
```

### 로그 위치

Agent 로그는 `C:\ProgramData\Datadog\logs\agent.log`에 있습니다.

**참고**: `ProgramData`는 숨겨진 폴더입니다.

## 사용 사례

### Windows 서비스 모니터링

대상 호스트에서 Datadog Agent Manager를 실행하고 목록에서 'Windows Service' 통합을 선택합니다. 즉시 사용 가능한 예가 있으나 이 예에서는 DHCP를 사용합니다.

서비스 이름을 가져오려면 `services.msc`를 열고 대상 서비스를 찾습니다. DHCP를 대상으로 사용하면 서비스 속성 창 상단에서 서비스 이름을 볼 수 있습니다

{{< img src="agent/faq/DHCP.png" alt="DHCP" style="width:75%;">}}

자신만의 서비스를 추가할 때 표시된 형식을 정확하게 따라야 합니다. 형식이 올바르지 않으면 통합이 실패합니다. **참고**: 서비스 이름의 특수 문자는 이스케이프되어야 합니다. 예를 들어 이름 `MSSQL$BILLING`은 `MSSQL\$BILLING`으로 추가할 수 있습니다.

{{< img src="agent/faq/windows_DHCP_service.png" alt="Windows DHCP 서비스" style="width:75%;">}}

또한 통합을 수정할 때마다 Datadog 서비스를 다시 시작해야 합니다. services.msc 또는 UI 사이드바에서 이 작업을 수행할 수 있습니다.

Services의 경우 Datadog은 메트릭을 추적하지 않고 가용성만 추적합니다 (메트릭의 경우 [Process](#monitoringwindowsprocesses) 또는 [WMI][7] 통합 사용). 모니터를 설정하려면 [Integration monitor type][8]을 선택한 후 **Windows Service**를 검색합니다. *Integration Status > Pick Monitor Scope*에서 모니터링할 서비스를 선택합니다.

### Windows용 시스템 로드 모니터링

Datadog Agent는 기본적으로 많은 수의 시스템 메트릭을 수집합니다. 가장 일반적으로 사용되는 시스템 메트릭은 `system.load.*`입니다. 그러나 이러한 메트릭은 **Unix**에만 적용됩니다.

Windows는 `system.load.*` 메트릭을 제공하지 않지만, 기본적으로 사용할 수 있는 동등한 옵션은 `system.proc.queue.length`입니다. 이 메트릭은 실행 대기 중인 프로세서 준비 대기열에서 지연된 것으로 관찰된 스레드 수를 표시합니다.

### Windows 프로세스 모니터링

[Live Process Monitoring][9]을 통해 Windows 프로세스를 모니터링할 수 있습니다. Windows에서 이 기능을 활성화하려면 다음 파라미터를 true로 설정하여 [Agent 기본 구성 파일][10]을 편집하세요.

`datadog.yaml`:

```yaml
process_config:
  enabled: "true"
```

설정을 완료한 후 [Agent를 재시작][11]하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/fleet/installagent/latest?platform=windows
[2]: /ko/agent/supported_platforms/?tab=windows
[3]: /ko/agent/faq/windowsagentddagentuser/
[4]: /ko/agent/configuration/proxy/
[5]: /ko/network_monitoring/cloud_network_monitoring
[6]: /ko/agent/guide/datadogagentmanagerwindows/
[7]: /ko/integrations/wmi_check/
[8]: https://app.datadoghq.com/monitors/create/integration
[9]: /ko/infrastructure/process/?tab=linuxwindows#installation
[10]: /ko/agent/configuration/agentconfigurationfiles/#agentmainconfigurationfile
[11]: /ko/agent/configuration/agentcommands/#restarttheagent
[12]: http://127.0.0.1:5002
[13]: /ko/agent/guide/python3/
[14]: https://s3.amazonaws.com/ddagentwindowsstable/ddagentclilatest.exe
[15]: https://docs.datadoghq.com/ko/agent/supported_platforms/?tab=windows
[16]: https://app.datadoghq.com/fleet/installagent/latest?platform=windows
[17]: /ko/agent/faq/windowsagentddagentuser/
[18]: https://docs.datadoghq.com/ko/agent/troubleshooting/
[400]: https://windowsagent.datadoghq.com/datadogagent7latest.amd64.msi
[500]: https://app.datadoghq.com/organizationsettings/apikeys