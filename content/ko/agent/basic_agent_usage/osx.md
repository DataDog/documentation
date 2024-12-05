---
aliases:
- /ko/guides/basic_agent_usage/osx/
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
- link: /agent/guide/network#configure-ports
  tag: 설명서
  text: 인바운드 포트 구성
os: osx
platform: OS X
title: macOS Agent의 기본 사용법
---

## 개요

이번 페이지에서는 macOS용 Datadog Agent의 기본 기능을 소개해드리겠습니다. 아직 Agent를 설치하지 않으셨다면 [Datadog Agent 통합][1] 설명서에서 설치 안내를 찾아보실 수 있습니다.

기본적으로 Agent는 `/opt/datadog-agent`에 위치한 샌드박스에 설치됩니다. 이 폴더는 어디로든 이동할 수 있지만, 이번 가이드에서는 기본 설치 위치에 있다고 가정하겠습니다.

## 지원되는 macOS 버전

| macOS 버전       | 지원되는 Agent 버전                                            |
|---------------------|---------------------------------------------------------------------|
| macOS 10.10 & 10.11 | Agent v5                                                            |
| macOS 10.12         | Agent v5, Agent v6(v6.34.0까지), Agent v7(v7.34.0까지)            |
| macOS 10.13         | Agent v5, Agent v6(v6.38.2까지), Agent v7(v7.38.2까지)            |
| macOS 10.14+        | Agent v5, Agent v6, Agent v7                                        |

## 명령어

Agent v6과 v7에서 `launchctl` 서비스 관리자가 Agent의 작동 라이프사이클을 주관합니다. 한편, 다른 명령어는 Agent 바이너리를 통해 바로 실행해야 합니다. Agent v5에서는 거의 모든 작업을 서비스 관리자에서 수행했습니다. 대신, 라이프사이클 명령어를 systray 앱으로 관리할 수도 있습니다. 다른 명령어는 웹 GUI로 실행할 수 있습니다.

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

| 설명                        | 명령어                                              |
|------------------------------------|------------------------------------------------------|
| 서비스형 Agent를 시작           | `launchctl start com.datadoghq.agent` 또는 systray 앱 |
| 서비스형 Agent를 중지    | `launchctl stop com.datadoghq.agent` 또는 systray 앱  |
| 서비스형 Agent를 다시 시작 | _`stop`을 실행하고, 다음으로 `start`_ 또는 systray 앱을 실행하세요             |
| Agent 서비스의 상태            | `launchctl list com.datadoghq.agent` 또는 systray 앱  |
| 실행 중인 Agent의 상태 페이지       | `datadog-agent status` 또는 웹 GUI                    |
| Flare를 전송                         | `datadog-agent flare` 또는 웹 GUI                     |
| 명령어 사용법 표시              | `datadog-agent --help`                               |
| 점검 실행                        | `datadog-agent check <CHECK_NAME>`                   |

{{% /tab %}}
{{% tab "Agent v5" %}}

| 설명                        | 명령어                            |
|------------------------------------|------------------------------------|
| 서비스형 Agent를 시작           | `datadog-agent start`              |
| 서비스형 Agent를 중지    | `datadog-agent stop`               |
| 서비스형 Agent를 다시 시작 | `datadog-agent restart`            |
| Agent 서비스의 상태            | `datadog-agent status`             |
| 실행 중인 Agent의 상태 페이지       | `datadog-agent info`               |
| Flare를 전송                         | `datadog-agent flare`              |
| 명령어 사용법 표시              | _구현되지 않음_                  |
| 점검 실행                        | `datadog-agent check <CHECK_NAME>` |

{{% /tab %}}
{{< /tabs >}}

## 설정

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}
Agent 설정 파일과 폴더 위치는 다음과 같습니다.

* `~/.datadog-agent/datadog.yaml`

[통합][1] 설정 파일:

* `~/.datadog-agent/conf.d/`

[1]: /ko/integrations/
{{% /tab %}}
{{% tab "Agent v5" %}}

Agent 설정 파일과 폴더 위치는 다음과 같습니다.

* `~/.datadog-agent/datadog.conf`

[통합][1] 설정 파일:

* `~/.datadog-agent/conf.d/`

[1]: /ko/integrations/
{{% /tab %}}
{{< /tabs >}}

## 트러블슈팅

[Agent 트러블슈팅 가이드][2]를 참조하세요.

## 임베디드 Agent 사용하기

Agent는 `/opt/datadog-agent/embedded/`에 임베디드 파이썬(Python) 환경을 포함합니다. `python`, `pip`처럼 일반적으로 사용하는 바이너리는 `/opt/datadog-agent/embedded/bin/`에 있습니다.

자세한 정보가 필요하신 분은 [임베디드 Agent에 패키지를 추가][3]하는 방법 안내서를 참조하시기 바랍니다.



{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent/mac
[2]: /ko/agent/troubleshooting/
[3]: /ko/developers/guide/custom-python-package/