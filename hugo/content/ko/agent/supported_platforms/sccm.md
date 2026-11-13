---
aliases:
- /ko/agent/basic_agent_usage/sccm/
description: SCCM (Systems Center Configuration Manager)
disable_toc: false
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
- link: /agent/architecture
  tag: 설명서
  text: Agent 아키텍처 자세히 알아보기
- link: /agent/configuration/network#configure-ports
  tag: 설명서
  text: 인바운드 포트 구성
title: SCCM
---
Microsoft SCCM(System Center Configuration Manager)은 Microsoft의 Systems Center 도구 모음과 함께 패키지로 제공되는 구성 관리 솔루션입니다. 이 페이지에서는 SCCM을 사용하여 Datadog Agent를 설치하고 구성하는 방법을 다룹니다.

## 전제 조건 {#prerequisites}

- Agent는 SCCM 버전 2103 이상을 지원합니다.
- Agent를 설치하기 전에 Configuration Manager에서 [Distribution Points][1]를 설치하고 구성했는지 확인하세요.

## 설정 {#setup}

### 배포 가능한 Datadog Agent 애플리케이션 생성{#create-a-deployable-datadog-agent-application}

1. [Agent 페이지][2]에서 최신 Windows Datadog Agent 설치 관리자 파일(MSI)을 SCCM 서버에 다운로드합니다.
1. SCCM에서 애플리케이션을 생성하고 Datadog Agent MSI의 위치를 ​​사용합니다.
   {{< img src="/agent/basic_agent_usage/sccm/sccm-deployable-app.png" alt="새 애플리케이션을 생성하고 Datadog Agent MSI를 타겟 MSI로 사용합니다." style="height:100%;" >}}
1. {{< ui >}}General Information{{< /ui >}} 페이지가 나타날 때까지 {{< ui >}}Next{{< /ui >}}를 클릭합니다.
1. {{< ui >}}Installation program{{< /ui >}} 아래에 다음 명령을 붙여넣고 `MY_API_KEY`를 API 키로 바꿉니다.

   ```powershell
   start /wait msiexec /qn /i datadog-agent-7-latest.amd64.msi APIKEY="MY_API_KEY" SITE="datadoghq.com"
   ```

   더 많은 설치 옵션을 보려면 [설치 변수][3]의 전체 목록을 참조하세요.

1. {{< ui >}}Install behavior{{< /ui >}}가 {{< ui >}}Install for system{{< /ui >}}으로 설정되어 있는지 확인합니다.
1. {{< ui >}}Next{{< /ui >}}를 클릭하고 지시에 따라 애플리케이션을 만듭니다.
   {{< img src="/agent/basic_agent_usage/sccm/sccm-install-command.png" alt="설치 프로그램 명령을 입력하고 install behavior가 install for system으로 설설정되었는지 확인합니다." style="width:80%;" >}}
1. {{< ui >}}Software Library{{< /ui >}} > {{< ui >}}Overview{{< /ui >}} > {{< ui >}}Application Management{{< /ui >}} > {{< ui >}}Applications{{< /ui >}}에서 애플리케이션이 생성되었는지 확인합니다.

### Datadog Agent 애플리케이션 배포 {#deploy-the-datadog-agent-application}

<div class="alert alert-danger">Datadog Agent 애플리케이션을 배포하기 전에 Configuration Manager에서 <a href="https://learn.microsoft.com/en-us/mem/configmgr/core/servers/deploy/configure/install-and-configure-distribution-points">Distribution Points</a>를 설치하고 구성했는지 확인하세요.</div>

1. {{< ui >}}Software Library{{< /ui >}} > {{< ui >}}Overview{{< /ui >}} > {{< ui >}}Application Management{{< /ui >}} > {{< ui >}}Applications{{< /ui >}}로 이동한 후 이전에 생성한 Datadog Agent 애플리케이션을 선택합니다.
1. {{< ui >}}Deployment{{< /ui >}} 그룹의 {{< ui >}}Home{{< /ui >}} 탭에서 {{< ui >}}Deploy{{< /ui >}}를 선택합니다.

### Agent 구성 {#agent-configuration}

SCCM 패키지를 사용하면 구성 파일을 Datadog Agent에 배포하여 기본 설정을 덮어쓸 수 있습니다. Agent 구성은 `datadog.yaml` 구성 파일과 각 통합을 위한 선택적 `conf.yaml` 파일로 구성됩니다. 배포하려는 각 구성 파일에 대해 패키지를 만들어야 합니다.

1. 로컬 SCCM 머신 폴더에 `datadog.yaml` 및 `conf.yaml` 파일을 수집합니다. 사용 가능한 모든 구성 옵션은 [Windows용 Agent 구성 파일 예시][4]를 참조하세요.
1. SCCM 패키지를 생성하고 {{< ui >}}Standard program{{< /ui >}}을 선택합니다.
1. Agents에 배포하려는 구성 파일이 포함된 위치를 선택합니다.
1. 변경 사항을 배포할 [장치 수집][5]을 선택합니다.
1. 대상에 즉시 패키지를 사전 설치하도록 배포 설정을 구성합니다.

{{< img src="agent/basic_agent_usage/sccm/sccm-select-program.png" alt="프로그램 유형 화면입니다. 표준 프로그램을 선택합니다." style="width:80%;" >}}

### Datadog Agent 재시작 {#restart-the-datadog-agent}

Agent 서비스를 다시 시작하여 구성 변경 사항을 관찰합니다.
1. [Agent 명령][6]을 사용하여 Datadog Agent를 다시 시작하는 PowerShell 스크립트를 만듭니다.
1. 스크립트를 실행하여 Datadog Agent를 다시 시작합니다.
1. Datadog UI에서 새 데이터를 확인합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://learn.microsoft.com/en-us/mem/configmgr/core/servers/deploy/configure/manage-content-and-content-infrastructure
[2]: https://app.datadoghq.com/account/settings/agent/latest?platform=windows
[3]: /ko/agent/basic_agent_usage/windows/?tab=commandline#configuration
[4]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/example/datadog-agent_windows.yaml.example
[5]: https://learn.microsoft.com/en-us/mem/configmgr/core/clients/manage/collections/create-collections#bkmk_create
[6]: /ko/agent/basic_agent_usage/windows/#agent-commands