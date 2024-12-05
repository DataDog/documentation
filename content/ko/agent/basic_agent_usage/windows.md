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
description: Windows 플랫폼에서 Datadog 에이전트의 기본 기능
further_reading:
- link: /logs/
  tag: 설명서
  text: 로그 수집
- link: /infrastructure/process/
  tag: 설명서
  text: 프로세스 수집
- link: /tracing/
  tag: 설명서
  text: 트레이스 수집
- link: /agent/basic_agent_usage/#agent-architecture
  tag: 설명서
  text: 에이전트 아키텍처 자세히 알아보기
- link: /agent/configuration/network#configure-ports
  tag: 설명서
  text: 인바운드 포트 구성
- link: /agent/guide/windows-agent-ddagent-user
  tag: 설명서
  text: Datadog Windows 에이전트 사용자에 관해 자세히 알아보기
platform: Windows
title: Windows용 에이전트 기본 사용법
---

## 개요

이 페이지에서는 Windows용 Datadog 에이전트의 기본 기능에 대해 설명합니다. 아직 에이전트를 설치하지 않은 경우 아래 설치 지침을 확인하거나 [앱 안내를 따르세요][1].

## Datadog 에이전트 설치

### 필수 조건

- **Windows 버전**: Windows Server 2016 이상이거나 Windows 10 이상. [지원되는 OS 버전][2]을 보려면 에이전트 지원 플랫폼 설명서를 참고하세요.
- **Datadog 계정**: Datadog 계정에 액세스할 수 있고 Datadog API 키가 있는지 확인하세요.
- **관리자 권한**: Windows 컴퓨터 관리자 액세스가 필요합니다.

{{< tabs >}}
{{% tab "표준 설치" %}}

Windows 에이전트의 핵심 및 APM/추적 컴포넌트는 `ddagentuser` 계정으로 실행됩니다. 활성화된 경우 라이브 프로세스 컴포넌트가 `LOCAL_SYSTEM` 계정에서 실행됩니다. [Datadog Windows 에이전트 사용자][3]에 대해 자세히 알아보세요.

### GUI로 설치

<div class="alert alert-info">에이전트의 기본 설치 위치는 <code>%ProgramFiles%\Datadog\Datadog 에이전트</code>입니다. 커스텀 설치 위치를 사용하고 싶을 경우 Datadog 파일의 <code>Datadog</code> 하위 디렉터리를 지정해야 합니다.</div>

1. [Datadog 에이전트 인스톨러][4]를 다운로드하고 에이전트 최신 버전을 설치하세요.
2. `datadog-agent-7-latest.amd64.msi`를 열어 설치 프로그램을 실행합니다. 메시지가 나타나면 Administrator 크리덴셜을 입력합니다.
3. 프롬프트에 따라 라이선스 계약에 동의하고 [Datadog API 키][5]를 입력하세요.

설치가 완료되면 Datadog 에이전트 Manager를 시작할 수 있는 옵션이 제공됩니다.

### 명령줄로 설치

1. **관리자** 권한으로 PowerShell을 엽니다.
2. 다음 명령을 실행해 Datadog 에이전트를 설치합니다.
    ```powershell
    Start-Process -Wait msiexec -ArgumentList '/qn /i datadog-agent-7-latest.amd64.msi APIKEY="<YOUR_DATADOG_API_KEY>"'
    ```

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=windows
[2]: /ko/agent/supported_platforms/?tab=windows
[3]: /ko/agent/faq/windows-agent-ddagent-user/
[4]: https://s3.amazonaws.com/ddagent-windows-stable/datadog-agent-7-latest.amd64.msi
[5]: https://app.datadoghq.com/organization-settings/api-keys

{{% /tab %}}
{{% tab "Active Directory 도메인에 설치" %}}

Active Directory 환경에서 Datadog 에이전트를 배포하려면 gMSA(Group Managed Service Account)를 사용할 것을 권고합니다.

gMSA를 사용하면 보안이 강화되고 관리가 쉬워집니다. 다음과 같은 장점이 있습니다.
- 여러 서버에 배포: 기존 MSA(Managed Service Accounts) 또는 sMSA(독립형 Managed Service Accounts)와 달리, gMSA는 여러 서버에서 배포될 수 있습니다.
- 자동 비밀번호 관리: gMSA 비밀번호는 운영 시스템 수준에서 처리되고 수동으로 작업할 필요 없이 정기적으로 회전됩니다.

gMSA를 실행할 때 Windows 에이전트의 핵심 및 APM/추적 컴포넌트는 구성된 계정으로 실행됩니다. 활성화된 경우 라이브 프로세스 컴포넌트가 `LOCAL_SYSTEM` 계정에서 실행됩니다. [Datadog Windows 에이전트 사용자][3]에 대해 자세히 알아보세요.

### 사전 필수 조건

- Active Directory 환경
- gMSA 생성 및 관리 권한
- [Microsoft 설명서의 필수 사항][4]을 참고하세요.

**참고**: gMSA 설정과 관련한 종합적인 이해를 하려면 [Microsoft의 Group Managed Service Accounts 개요][5]를 참고하세요.

### gMSA 생성 및 구성

1. 보안 그룹 생성:
   1. **Active Directory Users and Computers(ADUC)**를 엽니다.
   2. 적절한 **Organizational Unit(OU)**으로 이동합니다.
   3. 마우스 오른쪽 버튼을 클릭하고 **New** > **Group**을 선택합니다.
   4. 그룹 이름을 지정합니다(예: `DatadogAgentsGroup`).
   5. 조직의 올바른 그룹 범위를 설정합니다(예: **Domain local**).
   6. 유형을 **Security**으로 설정합니다.


2. gMSA를 생성합니다.
   1. **관리자** 권한으로 PowerShell을 엽니다.
   2. 다음 명령으로 gMSA를 생성합니다. `<YOUR_DOMAIN_NAME>`을 내 도메인 이름으로 변경하세요.
        ```powershell
        New-ADServiceAccount -Name DatadogGMSA -DNSHostName <YOUR_DOMAIN_NAME> -PrincipalsAllowedToRetrieveManagedPassword DatadogAgentsGroup
        ```


3. gMSA가 대상 컴퓨터에서 사용 중인지 확인하세요.

   1. 대상 컴퓨터가 `DatadogAgentsGroup` 일부인지 확인하세요.
   2. 대상 컴퓨터에서 PowerShell을 열고 다음을 실행하세요.
        ```powerhsell
        Install-ADServiceAccount -Identity DatadogGMSA
        ```
      명령이 오류 없이 실행되었는지 확인합니다.

### 에이전트 설치

아래 안내에 따라 Datadog 에이전트 최신 버전을 설치합니다. 에이전트의 특정 버전을 설치해야 할 경우에는 [인스톨러 목록][6]을 참고하세요.

#### GUI를 통해 설치

<div class="alert alert-info">에이전트의 기본 설치 위치는 <code>%ProgramFiles%\Datadog\Datadog Agent</code>입니다. 커스텀 설치 위치를 사용하고 싶을 경우 Datadog 파일의 <code>Datadog</code> 하위 디렉터리를 지정해야 합니다.</div>

1. 최신 버전의  에이전트를 설치하려면 [Datadog 에이전트 설치 프로그램][1]을 다운로드하세요.
2. `datadog-agent-7-latest.amd64.msi`를 열어 설치 프로그램을 실행합니다. 메시지가 나타나면 관리자 보안 인증을 입력합니다.
3. 프롬프트에 따라 라이선스 계약에 동의하고 [Datadog API 키][2]를 입력하세요.
4. Datadog Agent User Account" 프롬프트에서 gMSA 사용자 이름을 입력하세요(예: `<YOUR_DOMAIN_NAME>\DatadogGMSA) "Datadog Agent User Account" 프롬프트가 나타나면 gMSA 사용자 이름을 입력하고 **no password**를 입력합니다.
설치가 완료되면 Datadog 에이전트 Manager를 시작할 수 있는 옵션이 제공됩니다.

#### 명령줄로 설치

1. **관리자** 권한으로 PowerShell을 엽니다.
2. 다음 명령을 실행해 Datadog 에이전트를 설치합니다.

**참고:** `DatadogGMSA$`를 내 gMSA 사용자 이름을 변경합니다. 사용자 이름은 **$ 기호로 종료되어야 합니다.**
  ```powershell
  Start-Process -Wait msiexec -ArgumentList '/qn /i datadog-agent-7-latest.amd64.msi APIKEY="<YOUR_DATADOG_API_KEY>" DDAGENTUSER_NAME="<YOUR_DOMAIN_NAME>\DatadogGMSA$"'
  ```

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=windows
[2]: /ko/agent/supported_platforms/?tab=windows
[3]: /ko/agent/faq/windows-agent-ddagent-user/
[4]: https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/group-managed-service-accounts/group-managed-service-accounts/group-managed-service-accounts-overview#software-requirements
[5]: https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/group-managed-service-accounts/group-managed-service-accounts/getting-started-with-group-managed-service-accounts
[6]: https://ddagent-windows-stable.s3.amazonaws.com/installers_v2.json

{{% /tab %}}
{{< /tabs >}}

#### 설치 구성 옵션

Windows에 에이전트를 설치할 때 다음 각 구성 옵션을 명령줄에 속성으로 추가할 수 있습니다. 추가 에이전트 구성 옵션은 [추가 에이전트 구성 옵션](#more-agent-configuration-options)을 참조하세요.


| 변수                                    | 유형    | 설명                                                                                                                                                                                                                         |
|----------------------------                 |---------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `APIKEY`                                    | 문자열  | 구성 파일에 Datadog API KEY를 추가합니다.                                                                                                                                                                                 |
| `SITE`                                      | 문자열  | Datadog 인테이크 사이트를 설정합니다. 예: `SITE=`{{< region-param key="dd_site" code="true" >}}                                                                                                                                     |
| `TAGS`                                      | 문자열  | 구성 파일에 할당할 쉼표로 구분된 태그 목록입니다. 예: `TAGS="key_1:val_1,key_2:val_2"`                                                                                                                         |
| `HOSTNAME`                                  | 문자열  | 에이전트가 Datadog에 보고한 호스트 이름을 구성합니다(런타임에 계산된 호스트 이름을 재정의함).                                                                                                                            |
| `DDAGENTUSER_NAME`                          | 문자열  | 에이전트 설치 _(v6.11.0+)_ 중에 사용된 기본 `ddagentuser` 사용자 이름을 재정의합니다. [ Datadog Windows 에이전트 User에 대해 자세히 알아보세요][3].                                                                                      |
| `DDAGENTUSER_PASSWORD`                      | 문자열  | 에이전트 설치_(v6.11.0+)_ 중에 `ddagentuser` 사용자에 대해 암호화된 보안 비밀번호를 재정의합니다. 도메인 서버 설치를 위해 반드시 제공되어야 합니다. [ Datadog Windows Agent User에 대해 자세히 알아보세요][3].  |
| `APPLICATIONDATADIRECTORY`                  | 경로    | 구성 파일 디렉터리 트리에 사용할 디렉터리를 재정의합니다. 최초 설치 시에만 제공될 수 있으며, 업그레이드에는 유효하지 않습니다. 기본: `C:\ProgramData\Datadog`. _(v6.11.0+)_                                           |
| `PROJECTLOCATION`                           | 경로    | 바이너리 파일 디렉터리 트리에 사용할 디렉터리를 재정의합니다. 최초 설치 시에만 제공될 수 있으며, 업그레이드에는 유효하지 않습니다. 기본: `%ProgramFiles%\Datadog\Datadog Agent`. _(v6.11.0+)_<br><br>기본 디렉터리를 재정의하는 경우 Datadog 파일의 `Datadog` 하위 디렉터리를 지정해야 합니다.                                    |

**참고**

- `/qn` 옵션은 자동 설치를 실행합니다. GUI 프롬프트를 보려면 제거합니다. 
- 일부 에이전트 버전에서는 강제 재부팅이 발생할 수 있습니다. 이를 방지하려면 `REBOOT=ReallySuppress` 파라미터를 추가합니다. 
- 일부 에이전트 구성 요소에는 데이터를 수집하기 위해 커널 드라이버가 필요합니다. 구성 요소에 커널 드라이버가 필요한지 확인하려면 해당 설명서 페이지를 참조하거나 관련 에이전트 구성 파일에서 `kernel driver`를 검색하세요. 
- 유효한 `datadog.yaml` 파일이 발견되면 해당 파일은 지정된 모든 명령줄 옵션보다 우선합니다.

#### 추가 에이전트 구성 옵션

Windows에 에이전트를 설치할 때 다음 각 구성 옵션을 명령줄에 속성으로 추가할 수 있습니다.

**참고**: 유효한 `datadog.yaml` 파일이 발견되면 해당 파일이 지정된 모든 명령줄 옵션보다 우선합니다.


| 변수                                    | 유형    | 설명                                                                                                                                                                                                                         |
|----------------------------                 |---------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `LOGS_ENABLED`                              | 문자열  | 구성 파일에서 로그 수집 기능을 활성화(`"true"`)하거나 비활성화(`"false"`)합니다. 로그는 기본적으로 비활성화되어 있습니다.                                                                                                        |
| `APM_ENABLED`                               | 문자열  | 구성 파일에서 APM 에이전트를 활성화(`"true"`)하거나 비활성화(`"false"`)합니다. APM은 기본적으로 활성화되어 있습니다.                                                                                                                        |
| `PROCESS_ENABLED`                           | 문자열  | 구성 파일에서 Process 에이전트를 활성화(`"true"`)하거나 비활성화(`"false"`)합니다. Process 에이전트는 기본적으로 비활성화되어 있습니다.                                                                                                     |
| `HOSTNAME_FQDN_ENABLED`                     | 문자열  | 에이전트 호스트 이름에 대한 FQDN 사용을 활성화(`"true"`)하거나 비활성화(`"false"`)합니다. 에이전트 구성 파일에 설정하는 것과 동일합니다. 호스트 이름에 대한 FQDN 사용은 기본적으로 비활성화되어 있습니다. _(v6.20.0+)_ |
| `CMD_PORT`                                  | 숫자  | 0에서 65534 사이의 유효한 포트 번호입니다. Datadog 에이전트는 포트 5001에서 명령 API를 노출합니다. 해당 포트가 이미 다른 프로그램에서 사용 중인 경우 여기에서 기본값이 재정의될 수 있습니다.                                               |
| `PROXY_HOST`                                | 문자열  | (프록시를 사용하는 경우) 프록시 호스트를 설정합니다. [Datadog 에이전트를 프록시와 함께 사용하는 방법에 대해 자세히 알아보세요][4].                                                                                                                                 |
| `PROXY_PORT`                                | 숫자  | (프록시를 사용하는 경우) 프록시 포트를 설정합니다. [Datadog 에이전트를 프록시와 함께 사용하는 방법에 대해 자세히 알아보세요][4].                                                                                                                                 |
| `PROXY_USER`                                | 문자열  | (프록시를 사용하는 경우) 프록시 사용자를 설정합니다. [Datadog 에이전트를 프록시와 함께 사용하는 방법에 대해 자세히 알아보세요][4].                                                                                                                                 |
| `PROXY_PASSWORD`                            | 문자열  | (프록시를 사용하는 경우) 프록시 비밀번호를 설정하세요. 프로세스/컨테이너 에이전트의 경우 이 변수는 인증 비밀번호를 전달하는 데 필요하며 이름을 바꿀 수 없습니다. [Datadog 에이전트를 프록시와 함께 사용하는 방법에 대해 자세히 알아보세요][4]. |
| `EC2_USE_WINDOWS_PREFIX_DETECTION`          | Boolean | EC2의 Windows 호스트에는 EC2 인스턴스 ID를 사용합니다. _(v7.28.0+)_                                                                                                                                                                      |
| [지원 중단됨] `ADDLOCAL` | 문자열 | 추가 에이전트 구성 요소를 활성화합니다. `"MainApplication,NPM"`로 설정하면 [네트워크 성능 모니터링][5]용 드라이버 구성 요소가 설치됩니다. _(버전 7.44.0 및 이전)_ |

**참고:**
에이전트 7은 Python 3만 지원합니다. 업그레이드하기 전에 사용자 지정 검사가 Python 3과 호환되는지 확인합니다. 자세한 내용은 [Python 3 Custom Check Migration][1] 가이드를 참조하세요. 사용자 정의 검사를 사용하지 않거나 이미 호환성을 확인한 경우 일반적인 방법으로 업그레이드합니다.

Datadog 에이전트 버전 5.12.0 미만에서 업그레이드하는 경우, 먼저 [EXE 설치 프로그램][14]을 사용하여 최신 버전의  에이전트 5(5.12.0 이상 6.0.0 미만)로 업그레이드한 다음  Datadog 에이전트 버전 6 이상으로 업그레이드합니다.

#### 설치 로그 파일

 에이전트 설치 로그 파일은 `%TEMP%\MSI*.LOG`에서 찾을 수 있습니다.

#### 검증

설치를 확인하려면 [에이전트 Status and Information](#agent-status-and-information) 섹션의 지침을 따르세요.

## 에이전트 명령어

에이전트 실행은 Windows Service Control Manager에 의해 제어됩니다.

* 주요 실행 파일 이름은 `agent.exe`입니다. 에이전트 버전에 따라 위치는 다음과 같습니다.
    - 에이전트 버전 6.11 이하: `"C:\Program Files\Datadog\Datadog Agent\embedded\agent.exe"`
    - 에이전트 버전 6.12 이상: `"C:\Program Files\Datadog\Datadog Agent\bin\agent.exe"`
* 구성 GUI는 브라우저 기반 구성 애플리케이션입니다(Windows 64비트 전용).
* `<PATH_TO_AGENT.EXE> <COMMAND>` 구문을 사용하여 **승격된(Admin으로 실행)** 명령줄(PowerShell 또는 Command Prompt)에서 명령을 실행할 수 있습니다.
* 명령줄 옵션은 다음과 같습니다.

| 명령어         | 설명                                                                      |
|-----------------|----------------------------------------------------------------------------------|
| check           | 지정된 검사를 실행합니다.                                                        |
| diagnose        | 시스템에서 일부 연결 진단을 실행합니다.                             |
| flare           | flare를 수집하여 Datadog으로 보냅니다.                                         |
| help            | 모든 명령에 대한 도움말을 가져옵니다.                                                     |
| hostname        |  에이전트가 사용하는 호스트 이름을 출력합니다.                                           |
| import          | 이전 버전의 에이전트에서 구성 파일을 가져오고 변환합니다.    |
| launch-gui      | Datadog Agent Manager를 시작합니다.                                                |
| restart-service | Service Control Manager 내에서 에이전트를 다시 시작합니다.                           |
| run             | 에이전트를 시작합니다.                                                                |
| start           | 에이전트를 시작합니다. (더 이상 사용되지 않지만 허용됩니다. 대안으로 `run`을 사용하세요.) |
| start-service   | Service Control Manager 내에서 에이전트를 시작합니다.                              |
| status          | 현재 상태를 출력합니다.                                                        |
| stopservice     | Service Control Manager 내에서 에이전트를 중지합니다.                              |
| 버전         | 버전 정보를 출력합니다.                                                         |

* 예:
  - PowerShell (`powershell.exe`)

    ```powershell
    & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" status
    & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" launch-gui
    & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" flare
    ```

  - Command Prompt (`cmd.exe`)

    ```cmd
    "%ProgramFiles%\Datadog\Datadog Agent\bin\agent.exe" status
    "%ProgramFiles%\Datadog\Datadog Agent\bin\agent.exe" launch-gui
    "%ProgramFiles%\Datadog\Datadog Agent\bin\agent.exe" flare
    ```

## 설정

[Datadog Agent Manager][6]를 사용하여 검사를 활성화, 비활성화 및 구성합니다. 변경 사항을 적용하려면 에이전트를 다시 시작하세요.


주요 에이전트 구성 파일은 다음 위치에 있습니다.
`C:\ProgramData\Datadog\datadog.yaml`

통합을 위한 구성 파일은 다음 위치에 있습니다.
`C:\ProgramData\Datadog\conf.d\` 또는 `C:\Documents and Settings\All Users\Application Data\Datadog\conf.d\`

**참고**: `ProgramData`는 숨겨진 폴더입니다.

## 에이전트 설치 제거

Windows에서 에이전트를 제거하는 방법에는 두 가지가 있습니다. 두 가지 방법 모두 에이전트를 제거하지만 호스트의 `C:\ProgramData\Datadog` 구성 폴더는 제거하지 않습니다.

### 프로그램 추가 또는 제거

1. **CTRL** 및 **Esc**를 누르거나 Windows 키를 사용하여 Windows Search를 실행합니다.
1. `add`를 검색하고 **Add or remove programs**를 클릭합니다.
1. `Datadog 에이전트`를 검색하고 **Uninstall**를 클릭합니다.

### PowerShell

**참고:** 아래 명령을 사용하려면 WinRM을 활성화하세요.

재부팅하지 않고 에이전트를 제거하려면 다음 PowerShell 명령을 사용합니다.

{{< code-block lang="powershell" >}}
$productCode = (@(Get-ChildItem -Path "HKLM:SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall" -Recurse) | Where {$_.GetValue("DisplayName") -like "Datadog Agent" }).PSChildName
start-process msiexec -Wait -ArgumentList ('/log', 'C:\uninst.log', '/q', '/x', "$productCode", 'REBOOT=ReallySuppress')
{{< /code-block >}}

## 트러블슈팅

### 에이전트 상태 및 정보

에이전트가 실행 중인지 확인하려면  Services 패널의 `DatadogAgent` 서비스가 *Started*로 나타나는지 확인합니다. *Datadog Metrics 에이전트*(`agent.exe`)라는 프로세스도 Task Manager에 있어야 합니다.

에이전트 상태에 대한 자세한 정보를 얻으려면 Datadog Agent Manager를 시작하세요.

* Datadog 에이전트 시스템 트레이 아이콘 -> Configure을 클릭하거나
* **상승된(Admin으로 실행)** 명령줄에서 `launch-gui` 명령을 실행합니다.
    - PowerShell: `& "<PATH_TO_AGENT.EXE>" launch-gui`
    - cmd: `"<PATH_TO_AGENT.EXE>" launch-gui`

그런 다음 *Status* -> *General*로 이동하여 상태 페이지를 엽니다.
*Status* -> *Collector* 및 *Checks* -> *Summary*에서 검사 실행에 대한 자세한 내용을 알아보세요.


상태 명령은 PowerShell에서 사용할 수 있습니다.

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" status
```

또는 cmd.exe:

```cmd
"%ProgramFiles%\Datadog\Datadog Agent\bin\agent.exe" status
```

### 로그 위치

에이전트 로그는 `C:\ProgramData\Datadog\logs\agent.log`에 있습니다.

**참고**: `ProgramData`는 숨겨진 폴더입니다.

### flare 전송 

* Datadog Agent Manager를 표시하기 위해 [http://127.0.0.1:5002][12]로 이동합니다.

* flare 탭을 선택합니다.

* 티켓 번호를 입력합니다(있는 경우).

* Datadog에 로그인하는 데 사용하는 이메일 주소를 입력하세요.

* Submit을 누릅니다.

PowerShell에서 플레어 명령을 사용할 수 있습니다.

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" flare <CASE_ID>
```

또는 cmd.exe:

```cmd
"%ProgramFiles%\Datadog\Datadog Agent\bin\agent.exe" flare <CASE_ID>
```

{{< img src="agent/basic_agent_usage/windows/windows_flare_agent_6.png" alt="Windows flare with Agent 6" style="width:75%;">}}

## 사용 사례

### Windows 서비스 모니터링

대상 호스트에서 Datadog 에이전트 Manager를 실행하고 목록에서 "Windows Service" 통합을 선택합니다. 즉시 사용 가능한 예가 있으나 이 예에서는 DHCP를 사용합니다.

서비스 이름을 가져오려면 `services.msc`를 열고  대상 서비스를 열고 찾습니다. DHCP를 대상으로 사용하면 서비스 속성 창 상단에서 서비스 이름을 볼 수 있습니다.

{{< img src="agent/faq/DHCP.png" alt="DHCP" style="width:75%;">}}

자신만의 서비스를 추가할 때 표시된 형식을 정확하게 따라야 합니다. 형식이 올바르지 않으면 통합이 실패합니다. **참고**: 서비스 이름의 특수 문자는 이스케이프되어야 합니다. 예를 들어 이름 `MSSQL$BILLING`은 `MSSQL\$BILLING`으로 추가할 수 있습니다.

{{< img src="agent/faq/windows_DHCP_service.png" alt="Windows DHCP Service" style="width:75%;">}}

또한 통합을 수정할 때마다 Datadog 서비스를 다시 시작해야 합니다. services.msc 또는 UI 사이드바에서 이 작업을 수행할 수 있습니다.

Services의 경우 Datadog은 메트릭을 추적하지 않고 가용성만 추적합니다 (메트릭의 경우 [Process](#monitoring-windows-processes) 또는 [WMI][7] 통합 사용). 모니터를 설정하려면 [Integration monitor type][8]을 선택한 후 **Windows Service**를 검색합니다. *Integration Status -> Pick Monitor Scope*에서 모니터링하려는 서비스를 선택합니다.

### Windows용 시스템 로드 모니터링

Datadog 에이전트는 기본적으로 많은 수의 시스템 메트릭을 수집합니다. 가장 일반적으로 사용되는 시스템 메트릭은 `system.load.*`입니다. 그러나 이러한 메트릭은 **Unix**에만 적용됩니다.

Windows는 `system.load.*` 메트릭을 제공하지 않지만 기본적으로 사용할 수 있는 동등한 옵션은 `system.proc.queue.length`입니다. 이 메트릭은 실행 대기 중인 프로세서 준비 대기열에서 지연된 것으로 관찰된 스레드 수를 표시합니다.

### Windows 프로세스 모니터링

[Live Process Monitoring][9]을 통해 Windows 프로세스를 모니터링할 수 있습니다. Windows에서 이 기능을 활성화하려면 다음 파라미터를 true로 설정하여 [에이전트 기본 구성 파일][10]을 편집하세요.

`datadog.yaml`:

```yaml
process_config:
  enabled: "true"
```

구성이 완료되면 [에이전트를 다시 시작합니다][11].

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=windows
[2]: /ko/agent/supported_platforms/?tab=windows
[3]: /ko/agent/faq/windows-agent-ddagent-user/
[4]: /ko/agent/configuration/proxy/
[5]: /ko/network_monitoring/performance
[6]: /ko/agent/guide/datadog-agent-manager-windows/
[7]: /ko/integrations/wmi_check/
[8]: https://app.datadoghq.com/monitors/create/integration
[9]: /ko/infrastructure/process/?tab=linuxwindows#installation
[10]: /ko/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[11]: /ko/agent/configuration/agent-commands/#restart-the-agent
[12]: http://127.0.0.1:5002
[13]: /ko/agent/guide/python-3/
[14]: https://s3.amazonaws.com/ddagent-windows-stable/ddagent-cli-latest.exe