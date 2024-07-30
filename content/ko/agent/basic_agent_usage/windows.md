---
aliases:
- /ko/guides/basic_agent_usage/windows/
description: 윈도우즈 플랫폼에서 Datadog 에이전트가 제공하는 기본 기능입니다.
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
- link: /agent/basic_agent_usage/#agent-architecture
  tag: 설명서
  text: 에이전트 아키텍처 자세히 알아보기
- link: /agent/configuration/network#configure-ports
  tag: 설명서
  text: 인바운드 포트 구성
platform: 윈도우즈(Windows)
title: 윈도우즈용 에이전트 기본 사용법
---

## 설정

Datadog 에이전트를 아직 설치하지 않은 경우, 아래나 [인앱 설치 지침][1]을 참조하세요. [지원되는 OS 버전][2]에 대한 에이전트 설명서를 참조하세요.

설치 및 Datadog EU 사이트 설정의 경우 `SITE=` 파라미터를 사용합니다. 아래 설정 변수 표를 참조하세요.

### 설치

**에이전트 v6.11.0**부터 윈도우즈 에이전트의 핵심 및 APM/트레이스 구성 요소가 `LOCAL_SYSTEM` 계정 대신 설치 시 생성된 `ddagentuser` 계정에서 실행됩니다. 활성화된 경우 라이브 프로세스 구성 요소가 `LOCAL_SYSTEM` 계정에서 실행됩니다. [Datadog 윈도우즈 에이전트 사용자][3]에 대해 자세히 알아보세요.

도메인 환경에서 에이전트를 설치하는 경우 [에이전트 설치 요건][4]을 참조하세요.

**참고**: [도메인 컨트롤러][5]에 대한 특별 고려 사항입니다.

{{< tabs >}}
{{% tab "GUI" %}}

1. [Datadog 에이전트 설치 관리자][1]를 다운로드하여 에이전트 최신 버전을 설치하세요.

   <div class="alert alert-info">특정 에이전트 버전을 설치하려면 <a href="https://s3.amazonaws.com/ddagent-windows-stable/installers.json">설치 관리자 목록</a>을 참조하세요.</div>

2. `datadog-agent-7-latest.amd64.msi`를 열어 설치 관리자(**관리자**로)를 실행하세요.
3. 프롬프트에 따라 라이선스 동의서에 수락하고 [Datadog API 키][2]를 입력하세요.
4. 설치가 완료되면 Datadog 에이전트 관리자를 시작할 수 있는 옵션이 제공됩니다.

[1]: https://s3.amazonaws.com/ddagent-windows-stable/datadog-agent-7-latest.amd64.msi
[2]: https://app.datadoghq.com/organization-settings/api-keys

{{% /tab %}}
{{% tab "Command line" %}}

명령줄을 포함해 에이전트를 설치하려면

1. [Datadog 에이전트 설치 관리자][1]를 다운로드하세요.
2. 설치 관리자를 다운로드한 디렉토리 내에서 다음 명령 중 하나를 실행하세요.

**명령 프롬프트**

```shell
start /wait msiexec /qn /i datadog-agent-7-latest.amd64.msi APIKEY="<YOUR_DATADOG_API_KEY>"
```

**PowerShell**

```powershell
Start-Process -Wait msiexec -ArgumentList '/qn /i datadog-agent-7-latest.amd64.msi APIKEY="<YOUR_DATADOG_API_KEY>"'
```

**참고**

- `/qn` 옵션은 배경에서 설치가 실행됩니다. GUI 프롬프트를 보려면 제거하세요.
- 일부 에이전트 버전은 장치를 강제 재시작할 수 있습니다. 이를 방지하려면 다음 파라미터를 추가하세요. `REBOOT=ReallySuppress`
- 일부 에이전트 구성 요소는 데이터 수집을 위해 커널 드라이브를 필요로 합니다. 커널 드라이브가 구성 요소에 필요한지 확인하려면 설명서 페이지를 참조하거나 관련 에이전트 설치 파일에서 `kernel driver`를 검색합니다.

### 설정

각 설정 항목은 명령줄에 자산으로 추가됩니다. 다음 설정 명령줄 옵션은 윈도우즈에서 에이전트를 설치할 때 사용할 수 있습니다.

| 변수                                    | 유형    | 설명                                                                                                                                                                                                                         |
|----------------------------                 |---------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `APIKEY`                                    | 문자열  | Datadog API KEY를 설정 파일에 추가하세요.                                                                                                                                                                                 |
| `SITE`                                      | 문자열  | Datadog 인테이크 사이트를 설정하세요. 예: `SITE=`{{< region-param key="dd_site" code="true" >}}                                                                                                                                     |
| `TAGS`                                      | 문자열  | 설정 파일에서 할당할 쉼표로 구분된 태그 목록입니다. 예: `TAGS="key_1:val_1,key_2:val_2"`                                                                                                                         |
| `HOSTNAME`                                  | 문자열  | 에이전트에서 Datadog에 보고한 호스트 이름을 설정하세요. (런타임에서 계산된 모든 호스트 이름을 재정의합니다.)                                                                                                                            |
| `LOGS_ENABLED`                              | 문자열  | 설정 파일에서 로그 수집 기능을 활성화(`"true"`) 또는 비활성화(`"false"`)하세요. 로그는 기본적으로 비활성화됩니다.                                                                                                        |
| `APM_ENABLED`                               | 문자열  | 설정 파일에서 APM 에이전트를 활성화(`"true"`)하거나 비활성화(`"false"`)하세요. APM은 기본적으로 활성화되어 있습니다.                                                                                                                        |
| `PROCESS_ENABLED`                           | 문자열  | 설정 파일에서 프로세스 에이전트를 활성화(`"true"`) 또는 비활성화(`"false"`)합니다. 프로세스 에이전트는 기본적으로 비활성화됩니다.                                                                                                     |
| `HOSTNAME_FQDN_ENABLED`                     | 문자열  | 에이전트 호스트 이름에 대한 FQDN 사용을 활성화(`"true"`) 또는 비활성화(`"false"`)합니다. 에이전트 설정 파일에서 `hostname_fqdn`을 설정하는 것과 동일합니다. 호스트 이름에 대한 FQDN 사용은 기본적으로 비활성화되어 있습니다. _(v6.20.0+)_ |
| `CMD_PORT`                                  | 숫자  | 0 및 65534 간 유효한 포트 번호입니다. Datadog 에이전트는 포트 5001에서 명령 API를 노출합니다. 해당 포트를 다른 프로그램에서 이미 사용하고 있는 경우, 기본값이 재정의될 수 있습니다.                                               |
| `PROXY_HOST`                                | 문자열  | 프록시를 사용하는 경우 프록시 호스트를 설정합니다. [Datadog 에이전트를 통해 프록시를 사용하는 방법에 대해 자세히 알아보세요.][2]                                                                                                                                 |
| `PROXY_PORT`                                | 숫자  | 프록시를 사용하는 경우 프록시 포트를 설정하세요. [Datadog 에이전트에서 프록시를 사용하는 방법을 자세히 알아보세요][2].                                                                                                                                 |
| `PROXY_USER`                                | 문자열  | 프록시를 사용하는 경우 프록시 사용자를 설정하세요. [Datadog 에이전트에서 프록시를 사용하는 방법을 자세히 알아보세요.][2]                                                                                                                                 |
| `PROXY_PASSWORD`                            | 문자열  | 프록시를 사용하는 경우 프록시 비밀번호를 설정하세요. 프로세스/컨테이너 에이전트의 경우 인증 비밀번호 통과에 이 변수가 필요하고 변수의 이름을 바꿀 수 없습니다. [Datadog 에이전트에서 프록시를 사용하는 방법에 대한 자세한 정보를 알아보세요.][2] |
| `DDAGENTUSER_NAME`                          | 문자열  | 에이전트 설치 동안 사용된 기본 `ddagentuser` 사용자 이름을 재정의합니다 _(v6.11.0+)_.  [Datadog 윈도우즈 에이전트 사용자][3]에 대해 자세히 알아보세요.][3]                                                                                      |
| `DDAGENTUSER_PASSWORD`                      | 문자열  | 에이전트 설치 _(v6.11.0+)_ 동안 `ddagentuser` 사용자에 대해 생성된 암호화된 보안 비밀번호를 재정의합니다. 도메인 서버 설치를 위해 제공되어야 합니다. [Datadog 윈도우즈 에이전트 사용자에 대해 자세히 알아보세요.][3]  |
| `APPLICATIONDATADIRECTORY`                  | 경로    | 설정 파일 디렉터리 트리에 사용할 디렉터리를 재정의합니다. 초기 설치에서만 제공될 수 있습니다. 업그레이드에 유효하지 않습니다. 기본값: `C:\ProgramData\Datadog` _(v6.11.0+)_                                           |
| `PROJECTLOCATION`                           | 경로    | 바이너리 파일 디렉터리 트리에 사용할 디렉터리를 재정의합니다. 초기 설치에만 제공될 수 있습니다. 업그레이드에 유효하지 않습니다. 기본값: `%ProgramFiles%\Datadog\Datadog Agent` _(v6.11.0+)_                                    |
| [지원 중단됨] `ADDLOCAL` | 문자열 | 추가 에이전트 구성 요소를 활성화합니다. `"MainApplication,NPM"`으로 설정하면 설치할 [네트워크 성능 모니터링][4]에 대한 드라이버 구성 요소가 설치됩니다. _(버전 7.44.0 이전)_ |
| `EC2_USE_WINDOWS_PREFIX_DETECTION`          | 부울 연산자 | EC2에서 윈도우즈 호스트에 대한 EC2 인스턴스 ID를 사용하세요. _(v7.28.0+)_                                                                                                                                                                      |

**참고**: 유효한 `datadog.yaml`을 찾았고 설정된 API 키가 있는 경우 해당 파일이 지정된 모든 명령줄 옵션보다 우선합니다.

[1]: https://s3.amazonaws.com/ddagent-windows-stable/datadog-agent-7-latest.amd64.msi
[2]: /ko/agent/configuration/proxy/
[3]: /ko/agent/faq/windows-agent-ddagent-user/
[4]: /ko/network_monitoring/performance
{{% /tab %}}
{{% tab "Upgrading" %}}

에이전트 7은 파이썬 3만을 지원합니다. 업그레이드 전 커스텀 점검이 파이썬 3과 호환되는지 확인합니다. 자세한 정보는 [파이썬 3 커스텀 점검 마이그레이션][1] 가이드를 참조하세요. 커스텀 점검을 사용하지 않고 있거나 이미 호환성을 확인한 경우 [GUI](?tab=gui) 또는 [명령줄](?tab=commandline) 지침을 사용해 업그레이드하세요.

Datadog 에이전트 버전 5.12.0 이하에서 업그레이드하는 경우 먼저 [EXE 설치 관리자][2]를 사용해 최신 에이전트 버전 5(5.12.0 이상 6.0.0 미만)로 업그레이드한 다음 Datadog 에이전트 버전 6 이상으로 업그레이드합니다.

[1]: /ko/agent/guide/python-3/
[2]: https://s3.amazonaws.com/ddagent-windows-stable/ddagent-cli-latest.exe
{{% /tab %}}
{{< /tabs >}}

### 설치 로그 파일

`%TEMP%\MSI*.LOG`에서 에이전트 설치 로그 파일을 찾을 수 있습니다.

### 검증

설치를 확인하려면 [에이전트 상태 및 정보](#에이전트-상태-및-정보) 섹션에서 지침을 따르세요.

## Agent 명령어

에이전트 실행은 윈도우즈 서비스 제어 관리자로 제어됩니다.

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

* 기본 실행 이름은 `agent.exe`입니다. 위치는 에이전트 버전에 따라 다음과 같습니다.
    - 에이전트 버전 6.11 이하: `"C:\Program Files\Datadog\Datadog Agent\embedded\agent.exe"`
    - 에이전트 버전 6.12 이상: `"C:\Program Files\Datadog\Datadog Agent\bin\agent.exe"`
* 설정 GUI는 브라우저 기반 설정 애플리케이션(윈도우즈 64비트만)입니다.
* 명령은 `<PATH_TO_AGENT.EXE> <COMMAND>` 구문을 사용해 **고급(관리자로 실행** 명령줄(PowerShell 또는 명령 프롬프트)에서 실행할 수 있습니다.
* 명령줄 옵션은 아래와 같습니다.

| 명령어         | 설명                                                                      |
|-----------------|----------------------------------------------------------------------------------|
| check           | 지정된 점검을 실행합니다.                                                        |
| diagnose        | 시스템에서 일부 연결 진단을 실행합니다.                             |
| flare           | 플레어를 수집해 Datadog에 전송합니다.                                         |
| help            | 명령에 대한 도움말을 얻습니다.                                                     |
| hostname        | 에이전트에서 사용하는 호스트 이름을 인쇄합니다.                                           |
| import          | 에이전트 이전 버전에서 설정 파일을 가져오고 변환합니다.    |
| launch-gui      | Datadog 에이전트 관리자를 시작합니다.                                                |
| restart-service | 서비스 제어 관리자 내 에이전트를 다시 시작합니다.                           |
| run             | 에이전트를 시작합니다.                                                                |
| start           | 에이전트를 시작합니다. (지원 중단되었지만 허용됨. 대안으로 `run`를 사용합니다.) |
| start-service   | 서비스 제어 관리자 내에서 에이전트를 시작합니다.                             |
| status          | 현재 상태를 인쇄합니다.                                                        |
| stopservice     | 서비스 제어 관리자 내에서 에이전트를 중단합니다.                              |
| 버전         | 버전 정보를 프린트합니다.                                                         |

* 예:
  - PowerShell (`powershell.exe`)

    ```powershell
    & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" status
    & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" launch-gui
    & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" flare
    ```

  - 명령 프롬프트(`cmd.exe`)

    ```cmd
    "%ProgramFiles%\Datadog\Datadog Agent\bin\agent.exe" status
    "%ProgramFiles%\Datadog\Datadog Agent\bin\agent.exe" launch-gui
    "%ProgramFiles%\Datadog\Datadog Agent\bin\agent.exe" flare
    ```

{{% /tab %}}
{{% tab "Agent v5" %}}

Datadog 에이전트 관리자(시작 메뉴에서 사용 가능)를 사용합니다.

{{< img src="agent/basic_agent_usage/windows/windows-start-menu.png" alt="windows Start Menu" style="width:75%;">}}

Datadog 에이전트 관리자에서 `start`, `stop` 및 `restart` 명령을 사용합니다.

{{< img src="agent/basic_agent_usage/windows/manager-snapshot.png" alt="Manager snapshot" style="width:75%;">}}

사용 가능한 경우 또한 윈도우즈 PowerShell을 사용할 수 있습니다.
`[start|stop|restart]-service datadogagent`

{{% /tab %}}
{{< /tabs >}}

## 설정

[Datadog 에이전트 관리자][6]를 사용하여 점검을 활성화, 비활성화 및 구성합니다. 변경 사항을 적용하려면 에이전트를 재시작합니다.

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}
기본 에이전트 구성 파일 위치:
`C:\ProgramData\Datadog\datadog.yaml`
{{% /tab %}}
{{% tab "Agent v5" %}}

기본 에이전트 구성 파일 위치:
`C:\ProgramData\Datadog\datadog.conf`
{{% /tab %}}
{{< /tabs >}}

통합 구성 파일 위치:
`C:\ProgramData\Datadog\conf.d\` 또는
`C:\Documents and Settings\All Users\Application Data\Datadog\conf.d\`

**참고**: `ProgramData`는 숨겨진 폴더입니다.

## 트러블슈팅

### 에이전트 상태 및 정보

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

에이전트가 실행되는지 확인하려면 서비스 패널의 `DatadogAgent` 서비스가 *시작됨*으로 나열되어 있는지 확인하세요. *Datadog 메트릭 에이전트*(`agent.exe`) 프로세스는 작업 관리자에도 존재해야 합니다.

에이전트 상태에 대한 자세한 정보를 수신하려면 Datadog 에이전트 관리자를 시작합니다.

* Datadog 에이전ㅌ 시스템 트레이 아이콘을 오른쪽 클릭하여 설정하거나 
* **고급(관리자로 실행)** 명령줄에서 `launch-gui` 명령을 실행합니다.
    - PowerShell: `& "<PATH_TO_AGENT.EXE>" launch-gui`
    - cmd: `"<PATH_TO_AGENT.EXE>" launch-gui`

그런 다음 *상태* -> *일반*으로 이동하여 상태 페이지를 엽니다.
*상태* -> *수집기* 및 *점검* -> *요약*에서 점검을 실행하여 자세한 정보를 얻습니다.

PowerShell에서 상태 명령을 사용할 수 있습니다.

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" status
```

또는 cmd.exe:

```cmd
"%ProgramFiles%\Datadog\Datadog Agent\bin\agent.exe" status
```

{{% /tab %}}
{{% tab "Agent v5" %}}

에이전트 실행을 확인하려면 서비스 패널의 서비스 상태가 *시작됨*으로 나와 있는지 확인합니다. `ddagent.exe` 프로세스가 작업 관리자에도 존재해야 합니다.

에이전트 v5.2+에 대한 에이전트 상태 정보는 *Datadog 에이전트 관리자 -> 설정 -> 에이전트 상태*에서 사용할 수 있습니다.

{{< img src="agent/faq/windows_status.png" alt="Windows Status" style="width:50%;" >}}

에이전트 상태 v3.9.1에서 v5.1의 경우 `http://localhost:17125/status`로 이동합니다.

PowerShell에서 정보 명령을 사용할 수 있습니다.

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\embedded<PYTHON_MAJOR_VERSION>\python.exe" "$env:ProgramFiles\Datadog\Datadog Agent\agent\agent.py" info
```

또는 cmd.exe:

```
"%ProgramFiles%\Datadog\Datadog Agent\embedded<PYTHON_MAJOR_VERSION>\python.exe" "%ProgramFiles%\Datadog\Datadog Agent\agent\agent.py" info
```

**참고**: 에이전트 버전 6.11 이하에서 경로는 대신 `%ProgramFiles%\Datadog\Datadog Agent\embedded\python.exe`를 사용합니다.

{{% /tab %}}
{{< /tabs >}}

### 로그 위치

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

에이전트 로그는 `C:\ProgramData\Datadog\logs\agent.log`에 위치해 있습니다.

**참고**: `ProgramData`는 숨겨진 폴더입니다.

도움이 필요하신가요? [Datadog 고객지원][1]에 연락하세요.

[1]: /ko/help/
{{% /tab %}}
{{% tab "Agent v5" %}}

윈도우즈 서버 2008 및 신규 시스템의 경우 에이전트 로그가 `C:\ProgramData\Datadog\logs`에 위치해 있습니다.

**참고**: `ProgramData`는 숨겨진 폴더입니다.

도움이 필요하신가요? [Datadog 고객지원][1]에 연락하세요.

[1]: /ko/help/
{{% /tab %}}
{{< /tabs >}}

### 플레어 전송

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

* [http://127.0.0.1:5002][1]로 이동하여 Datadog 에이전트 관리자를 표시합니다.

* 플레어 탭을 선택합니다.

* 티켓 번호를 입력합니다(있는 경우).

* Datadog에 로그인하는 데 사용할 이메일 주소를 입력합니다.

* 제출을 누릅니다.

PowerShell에서 플레어 명령을 사용할 수 있습니다.

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" flare <CASE_ID>
```

또는 cmd.exe:

```cmd
"%ProgramFiles%\Datadog\Datadog Agent\bin\agent.exe" flare <CASE_ID>
```

{{< img src="agent/basic_agent_usage/windows/windows_flare_agent_6.png" alt="Windows flare with Agent 6" style="width:75%;">}}

[1]: http://127.0.0.1:5002
{{% /tab %}}
{{% tab "Agent v5" %}}

윈도우즈 로그 및 설정 복사본을 Datadog 지원 팀에 전송하려면 다음을 수행합니다.

* Datadog 에이전트 관리자를 엽니다.

* 작업을 선택합니다.

* 플레어를 선택합니다.

* 티켓 번호를 입력합니다(없는 경우 값을 0으로 남겨두세요.).

* Datadog에 로그인하는 데 사용할 이메일 주소를 입력합니다.

{{< img src="agent/faq/windows_flare.jpg" alt="Windows Flare" style="width:70%;">}}

PowerShell에서 플레어 명령을 사용할 수 있습니다.

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\embedded\python.exe" "$env:ProgramFiles\Datadog\Datadog Agent\agent\agent.py" flare <CASE_ID>
```

또는 cmd.exe:

```
"%ProgramFiles%\Datadog\Datadog Agent\embedded\python.exe" "%ProgramFiles%\Datadog\Datadog Agent\agent\agent.py" flare <CASE_ID>
```

#### 플레어 업로드 실패

플레어 명령 출력은 압축된 플레어 아카이브가 저장된 위치를 알려줍니다. Datadog에 파일을 업로드하는 데 실패하면 이 디렉터리에서 검색하여 수동으로 이메일 첨부 파일에 추가할 수 있습니다. 플레어 파일이 저장되는 공통 위치:  
- Linux: `\tmp\`
- MacOS: `$TMPDIR`
- Windows: `C:\Users\<DDAGENTUSER>\AppData\Local\Temp\`

윈도우즈의 이전 에이전트 버전의 경우 에이전트의 파이썬 명령 프롬프트에서 다음을 실행하여 이 파일의 위치를 찾을 수 있습니다.

**1단계**:

* 에이전트 v5.12+:
    `"%ProgramFiles%\Datadog\Datadog Agent\dist\shell.exe" since`

* 이전 에이전트 버전:
    `"%ProgramFiles%\Datadog\Datadog Agent\files\shell.exe"`

**2단계**:

```python
import tempfile
print tempfile.gettempdir()
```

예시:

{{< img src="agent/faq/flare_fail.png" alt="Flare Fail" style="width:70%;">}}

{{% /tab %}}
{{< /tabs >}}

## 사용 사례

### 윈도우즈 서비스 모니터링

대상 호스트에서 Datadog 에이전트 관리자를 시작하고 목록에서 "윈도우즈 서비스" 통합을 선택합니다. 다음은 DHCP를 사용한 사례입니다.

서비스 이름을 얻으려면 `services.msc`를 열고 대상 서비스를 찾습니다. 대상으로 DHCP를 사용하는 경우 서비스 속성 창의 맨 위에서 서비스 이름을 확인할 수 있습니다.

{{< img src="agent/faq/DHCP.png" alt="DHCP" style="width:75%;">}}

자체적인 서비스를 추가할 경우 표시된 것과 같은 형식을 따라야 합니다. 형식이 올바르지 않으면 통합이 실패합니다. **참고**: 서비스 이름의 특수 문자는 이스케이프됩니다. 예를 들어 `MSSQL$BILLING` 이름에 `MSSQL\$BILLING`가 추가될 수 있습니다.

{{< img src="agent/faq/windows_DHCP_service.png" alt="Windows DHCP Service" style="width:75%;">}}

또한, 통합을 수정하는 경우 Datadog 서비스를 재시작해야 합니다. UI 사이드바 또는 services.msc에서 이를 수행할 수 있습니다.

서비스의 경우 Datadog는 메트릭을 추적하지 않습니다. 가용성만을 추적합니다(메트릭의 경우 [프로세스](#윈도우즈-프로세스-모니터링) 또는 [WMI][7] 통합을 사용합니다.) 모니터를 설정하려면 [통합 모니터 유형][8]을 선택한 다음 **윈도우즈 서비스**를 검색합니다. *통합 상태 -> 모니터 범위 고르기*에서 모니터링하려는 서비스를 고릅니다.

### 윈도우즈 시스템 로드 모니터링

Datadog 에이전트는 기본적으로 많은 수의 시스템 메트릭을 수집합니다. 가장 일반적으로 사용되는 시스템 메트릭은 `system.load.*`이지만 이러한 메트릭은 **유닉스**에 특정됩니다.

윈도우즈가 `system.load.*` 메트릭을 제공하지 않으면 기본적으로 사용할 수 있는 동급 옵션은 `system.proc.queue.length`입니다. 이 메트릭은 실행 대기 중 상태로, 프로세서 준비열에서 지연된 스레드 수를 표시합니다.

### 윈도우즈 프로세스 모니터링

[라이브 프로세스 모니터링][9]를 사용해 윈도우즈 프로세스를 모니터링할 수 있습니다. 윈도우즈에서 이를 활성화하려면 다음 파라미터를 참으로 설정하여 [에이전트 기본 설정 파일][10]을 편집합니다.

`datadog.yaml`:

```yaml
process_config:
  enabled: "true"
```

설정이 완료되면 [에이전트를 재시작합니다][11].

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=windows
[2]: /ko/agent/basic_agent_usage/?tab=agentv6v7#supported-platforms
[3]: /ko/agent/faq/windows-agent-ddagent-user/
[4]: /ko/agent/faq/windows-agent-ddagent-user/#installation-in-a-domain-environment
[5]: /ko/agent/faq/windows-agent-ddagent-user/#domain-controllers
[6]: /ko/agent/guide/datadog-agent-manager-windows/
[7]: /ko/integrations/wmi_check/
[8]: https://app.datadoghq.com/monitors#create/integration
[9]: /ko/infrastructure/process/?tab=linuxwindows#installation
[10]: /ko/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[11]: /ko/agent/configuration/agent-commands/#restart-the-agent