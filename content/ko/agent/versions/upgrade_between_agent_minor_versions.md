---
aliases:
- /ko/agent/faq/upgrade-between-agent-minor-versions
- /ko/agent/guide/upgrade-between-agent-minor-versions
title: Datadog 에이전트 부 버전 간 업그레이드
---

## 에이전트 6 및 7 부 버전 간 업그레이드

{{< tabs >}}
{{% tab "리눅스(Linux)" %}}

에이전트 6 및 7 부 버전 간 업그레이드를 위한 권장 방법은 `install_script_agent6.sh` 및 `install_script_agent7.sh` 스크립트를 사용하는 것입니다. 다음 명령은 지원되는 모든 리눅스(Linux) 분포에서 작동합니다.

제공된 에이전트 6 부 버전으로 업그레이드:

: `DD_AGENT_MINOR_VERSION=<target_minor> bash -c "$(curl -L https://dd-agent.s3.amazonaws.com/scripts/install_script_agent6.sh)"`

최신 에이전트 6 부 버전으로 업그레이드:

: `bash -c "$(curl -L https://dd-agent.s3.amazonaws.com/scripts/install_script_agent6.sh)"`

제공된 에이전트 7 부 버전으로 업그레이드:

: `DD_AGENT_MINOR_VERSION=<target_minor> bash -c "$(curl -L https://dd-agent.s3.amazonaws.com/scripts/install_script_agent7.sh)"`

최신 에이전트 7 부 버전으로 업그레이드:

: `bash -c "$(curl -L https://dd-agent.s3.amazonaws.com/scripts/install_script_agent7.sh)"`

{{% /tab %}}
{{% tab "윈도우즈(Windows)" %}}

특정 버전의 설치 패키지를 다운로드하고 설치합니다.

특정 에이전트 6 부 버전 다운로드를 위한 URL:

: `https://ddagent-windows-stable.s3.amazonaws.com/ddagent-cli-6.<minor_version>.<bugfix_version>.msi`

특정 에이전트 7 부 버전 다운로드를 위한 URL:

: `https://ddagent-windows-stable.s3.amazonaws.com/ddagent-cli-7.<minor_version>.<bugfix_version>.msi`

{{% /tab %}}
{{% tab "MacOS" %}}

**참고**: 특정 부 버전으로 업그레이드할 수 없습니다.

최신 에이전트 6 부 버전으로 업그레이드 명령:

: `DD_AGENT_MAJOR_VERSION=6 bash -c "$(curl -L https://dd-agent.s3.amazonaws.com/scripts/install_mac_os.sh)"`

최신 에이전트 7 부 버전으로 업그레이드 명령:

: `DD_AGENT_MAJOR_VERSION=7 bash -c "$(curl -L https://dd-agent.s3.amazonaws.com/scripts/install_mac_os.sh)"`

{{% /tab %}}
{{< /tabs >}}