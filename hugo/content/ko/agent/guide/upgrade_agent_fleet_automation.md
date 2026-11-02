---
aliases:
- /ko/agent/faq/upgrade-between-agent-minor-versions
- /ko/agent/guide/upgrade-between-agent-minor-versions
- /ko/agent/versions/upgrade_between_agent_minor_versions/
- /ko/agent/guide/upgrade_between_minor_versions/
description: Fleet Automation 원격 관리, 설치 스크립트 및 구성 관리 도구를 사용하여 Datadog Agent 버전을 업그레이드하기
  위한 가이드입니다.
further_reading:
- link: /agent/troubleshooting/
  tag: 설명서
  text: Agent 문제 해결
- link: agent/
  tag: 설명서
  text: Datadog Agent
title: Datadog Agent 업그레이드
---
## 개요 {#overview}
Datadog은 모든 [마이너 릴리스 및 패치 릴리스][6]마다 Datadog Agent를 업데이트할 것을 권장합니다. 이 가이드는 몇 번의 클릭만으로 호스트 전체에 새 Agent 버전을 배포하는 방법을 안내합니다.


## Agent 마이너 버전 간 업그레이드 {#upgrade-between-minor-versions-of-the-agent}

### Fleet Automation을 사용하여 원격으로 업그레이드 {#upgrade-remotely-with-fleet-automation}

[Fleet Automation][2]을 사용하면 Datadog Agent 플릿을 중앙에서 관리할 수 있습니다. Fleet Automation에는 원격 Agent 관리가 포함되어 있어 컨테이너화되지 않은 Linux 및 Windows 환경 전반에서 Agent를 원격으로 업그레이드할 수 있도록 합니다. [Agent 업그레이드][7]를 참조하세요.

### 스크립트 또는 구성 관리 도구로 업그레이드 {#upgrade-with-script-or-configuration-management-tooling}

[인앱 지침][4]에 따라 컨테이너, 호스트 기반 및 코드형 인프라(IaC) 도구로 관리되는 환경 전반에서 Datadog Agent를 업그레이드하세요. 안내형 흐름은 Agent 업그레이드를 위해 플랫폼에 맞는 Agent 설치 명령을 생성합니다. 기본적으로 이 명령은 최신 버전의 Agent를 설치합니다. 특정 마이너 버전으로 업그레이드하려면 스크립트를 실행하기 전에 `DD_AGENT_MINOR_VERSION=<TARGET_MINOR>`를 설정하세요.

## Agent 메이저 버전 간 업그레이드 {#upgrade-between-major-versions-of-the-agent}

<div class="alert alert-info">
Agent 7은 Python 3 사용자 지정 검사만 지원합니다. Agent 7로 업그레이드하기 전에 <a href="/agent/guide/python-3">사용자 지정 검사가 Python 3와 호환되는지 확인하세요</a>.
</div>

### Agent 6에서 Agent 7로 업그레이드 {#upgrade-from-agent-6-to-agent-7}

{{< tabs >}}
{{% tab "Linux" %}}

다음 Agent 설치 명령을 실행하여 Agent를 버전 6에서 버전 7로 업그레이드하세요.

다음 명령은 Amazon Linux, CentOS, Debian, Fedora, Red Hat, Ubuntu 및 SUSE에서 작동합니다.
: `DD_API_KEY="<DATADOG_API_KEY>" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"`

{{% /tab %}}
{{% tab "Windows" %}}

1. [Datadog Agent 설치 프로그램][1]을 다운로드합니다.
2. `datadog-agent-7-latest.amd64.msi`를 열어 설치 프로그램을 {{< ui >}}Administrator{{< /ui >}} 권한으로 실행합니다.
3. 안내에 따라 라이선스 계약에 동의하고 [Datadog API 키][2]를 입력합니다.
4. 설치가 완료되면 Datadog Agent Manager를 시작할 수 있는 옵션이 제공됩니다.

**참고**: 사용 가능한 모든 버전의 Windows 설치 프로그램 링크는 [JSON 형식으로 제공됩니다][3].

[1]: https://ddagent-windows-stable.s3.amazonaws.com/datadog-agent-7-latest.amd64.msi
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://ddagent-windows-stable.s3.amazonaws.com/installers_v2.json
{{% /tab %}}
{{% tab "MacOS" %}}

환경 변수 `DD_AGENT_MAJOR_VERSION=7`을 사용하여 Agent 설치 명령을 실행해 Agent를 버전 6에서 버전 7로 업그레이드하세요.

```shell
DD_AGENT_MAJOR_VERSION=7 DD_API_KEY="<DATADOG_API_KEY>" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_mac_os.sh)"
```

{{% /tab %}}
{{< /tabs >}}

### Agent 5에서 Agent 7로 업그레이드 {#upgrade-from-agent-5-to-agent-7}

{{< tabs >}}
{{% tab "Linux" %}}

환경 변수 `DD_UPGRADE="true"`를 사용하여 Agent 설치 명령을 실행해 Agent를 버전 5에서 버전 7로 업그레이드하세요. Agent v7 설치 프로그램은 업그레이드 중에 v5 구성을 자동으로 변환할 수 있습니다.

다음 명령은 Amazon Linux, CentOS, Debian, Fedora, Red Hat, Ubuntu 및 SUSE에서 작동합니다.
: `DD_UPGRADE="true" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"`

{{% /tab %}}
{{% tab "Windows" %}}

1. [수동 업그레이드 프로세스][1]에 따라 Agent를 버전 6으로 업그레이드합니다.
2. [Agent v6에서 Agent v7로](#upgrade-from-agent-6-to-agent-7) 업그레이드하는 지침을 따릅니다.

[1]: /ko/agent/guide/upgrade_to_agent_6/?tab=windows#manual-upgrade
{{% /tab %}}
{{% tab "MacOS" %}}

환경 변수 `DD_AGENT_MAJOR_VERSION=7` 및 `DD_UPGRADE="true"`를 사용하여 Agent 설치 명령을 실행해 Agent를 버전 5에서 버전 7로 업그레이드하세요. Agent v7 설치 프로그램은 업그레이드 중에 v5 구성을 자동으로 변환할 수 있습니다.

```shell
DD_UPGRADE="true" DD_AGENT_MAJOR_VERSION=7 bash -c "$(curl -L https://install.datadoghq.com/scripts/install_mac_os.sh)"
```

{{% /tab %}}
{{< /tabs >}}

**참고:** 업그레이드 프로세스에서는 **사용자 지정** Agent 검사를 자동으로 이동하지 않습니다. 이는 Datadog이 기본 제공 상태에서 완전한 하위 호환성을 보장할 수 없도록 설계되었기 때문입니다. 사용자 지정 검사를 Python 2에서 Python 3으로 마이그레이션하는 방법은 [Python 3 사용자 지정 검사 마이그레이션][1] 가이드를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/guide/python-3/
[2]: /ko/agent/fleet_automation/
[3]: /ko/agent/fleet_automation/#set-up-fleet-automation
[4]: https://app.datadoghq.com/fleet/install-agent/latest?platform=overview
[5]: /ko/agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration
[6]: https://github.com/DataDog/datadog-agent/releases?page=1
[7]: /ko/agent/fleet_automation/upgrade_agents/