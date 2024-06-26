---
further_reading:
- link: /agent/guide/python-3/
  tag: 설명서
  text: 커스텀 검사를 Python 2에서 Python 3으로 마이그레이션하기
title: Datadog Agent v7로 업그레이드 하기
---

<div class="alert alert-info">
Agent v7은 Python 3 커스텀 검사만 지원합니다. Agent 7로 업그레이드하기 전에 <a href="/agent/guide/python-3">커스텀 검사가 Python 3과 호환되는지 확인하세요</a>.
</div>

## Agent v6에서 Agent v7로

{{< tabs >}}
{{% tab "Linux" %}}

다음 Agent 설치 명령을 실행하여 Agent를 버전 6에서 버전 7로 업그레이드합니다:

다음 명령은 Amazon Linux, CentOS, Debian, Fedora, Red Hat, Ubuntu, SUSE에서 작동합니다:
:`DD_API_KEY="<DATADOG_API_KEY>" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"`

{{% /tab %}}
{{% tab "Windows" %}}

1. [Datadog Agent 설치 프로그램을 다운로드합니다][1].
2. `datadog-agent-7-latest.amd64.msi`를 열어 설치 프로그램을(**관리자**로서)를 실행하세요.
3. 메시지에 따라 라이선스 계약에 동의하고 [Datadog API 키][2]를 입력하세요.
4. 설치가 완료되면 Datadog Agent Manager를 시작할 수 있는 옵션이 제공됩니다.

**참고**: 사용 가능한 모든 버전의 Windows 설치 프로그램에 대한 링크는 [JSON 형식으로 제공됩니다][3].

[1]: https://ddagent-windows-stable.s3.amazonaws.com/datadog-agent-7-latest.amd64.msi
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://ddagent-windows-stable.s3.amazonaws.com/installers_v2.json
{{% /tab %}}
{{% tab "MacOS" %}}

환경 변수 `DD_AGENT_MAJOR_VERSION=7`와 함께 Agent 설치 명령을 실행하여 Agent를 버전 6에서 버전 7로 업그레이드합니다:

```shell
DD_AGENT_MAJOR_VERSION=7 DD_API_KEY="<DATADOG_API_KEY>" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_mac_os.sh)"
```

{{% /tab %}}
{{< /tabs >}}

## Agent v5에서 Agent v7로

{{< tabs >}}
{{% tab "Linux" %}}

환경 변수 `DD_UPGRADE="true"`와 함께 Agent 설치 명령을 실행하여 Agent를 버전 5에서 버전 7로 업그레이드합니다. 업그레이드하는 동안 Agent 버전 7 설치 관리자는 버전 5 설정을 자동으로 변환할 수 있습니다.

다음 명령은 Amazon Linux, CentOS, Debian, Fedora, Red Hat, Ubuntu, SUSE에서 작동합니다:
:`DD_UPGRADE="true" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"`

{{% /tab %}}
{{% tab "Windows" %}}

1. [수동 업그레이드 프로세스][1]에 따라 Agent를 버전 6으로 업그레이드합니다.
2. [Agent v6에서 Agent v67로](#from-agent-v6-to-agent-v7) 업그레이드 지침서를 따릅니다.

[1]: /ko/agent/versions/upgrade_to_agent_v6/?tab=windows#manual-upgrade
{{% /tab %}}
{{% tab "MacOS" %}}

환경 변수 `DD_AGENT_MAJOR_VERSION=7` 및 `DD_UPGRADE="true"`와 함께 Agent 설치 명령을 실행하여 Agent를 버전 5에서 버전 7로 업그레이드합니다. 업그레이드하는 동안 Agent v7 설치 관리자가 v5 설정을 자동으로 변환할 수 있습니다.

```shell
DD_UPGRADE="true" DD_AGENT_MAJOR_VERSION=7 bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_mac_os.sh)"
```

{{% /tab %}}
{{< /tabs >}}

**참고:** Datadog이 이전 버전과의 완벽한 호환성을 보장할 수 없기 때문에 업그레이드 프로세스는 **커스텀** Agent 검사를 자동으로 이동하지 않습니다. [Python 3 커스텀 검사 마이그레이션][1] 가이드에서 Python 2에서 Python 3으로 커스텀 검사를  마이그레이션하는 방법을 확인하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/guide/python-3/