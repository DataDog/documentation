---
aliases:
- /ko/guides/basic_agent_usage/fedora/
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
platform: 페도라(Fedora)
title: 페도라(Fedora) Agent의 기본 사용법
---

## 개요

이번 페이지에서는 페도라(Fedora)용 Datadog Agent의 기본 기능을 소개해드리겠습니다. 아직 Agent를 설치하지 않으셨다면 [Datadog Agent 통합][1] 설명서에서 설치 안내를 찾아보실 수 있습니다.

패키지는 64-bit x86 및 Arm v8 아키텍처로 이용하실 수 있습니다. 다른 아키텍처의 경우에는 소스 설치를 활용하세요.

**참조**: 페도라 26 이상을 지원합니다.

## 명령어

Agent v6과 v7에서 운영 체제에서 지원하는 서비스 관리자가 Agent의 작동 라이프사이클을 주관합니다. 한편, 다른 명령어는 Agent 바이너리를 통해 바로 실행해야 합니다. Agent v5에서는 거의 모든 작업을 서비스 관리자에서 수행했습니다.

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

| 설명                        | 명령어                                                |
|------------------------------------|--------------------------------------------------------|
| 서비스형 Agent를 시작           | `sudo systemctl start datadog-agent`                   |
| 서비스형 Agent를 중지    | `sudo systemctl stop datadog-agent`                    |
| 서비스형 Agent를 다시 시작 | `sudo systemctl restart datadog-agent`                 |
| Agent 서비스의 상태            | `sudo systemctl status datadog-agent`                  |
| 실행 중인 Agent의 상태 페이지       | `sudo datadog-agent status`                            |
| Flare를 전송                         | `sudo datadog-agent flare`                             |
| 명령어 사용법 표시              | `sudo datadog-agent --help`                            |
| 점검 실행                        | `sudo -u dd-agent -- datadog-agent check <CHECK_NAME>` |

{{% /tab %}}
{{% tab "Agent v5" %}}

| 설명                        | 명령어                                           |
|------------------------------------|---------------------------------------------------|
| 서비스형 Agent를 시작           | `sudo service datadog-agent start`                |
| 서비스형 Agent를 중지    | `sudo service datadog-agent stop`                 |
| 서비스형 Agent를 다시 시작 | `sudo service datadog-agent restart`              |
| Agent 서비스의 상태            | `sudo service datadog-agent status`               |
| 실행 중인 Agent의 상태 페이지       | `sudo service datadog-agent info`                 |
| Flare를 전송                         | `sudo service datadog-agent flare`                |
| 명령어 사용법 표시              | `sudo service datadog-agent`                      |
| 점검 실행                        | `sudo -u dd-agent -- dd-agent check <CHECK_NAME>` |

**참조**: `service` 래퍼를 시스템에서 이용할 수 없다면 다음을 사용하세요.

* `upstart` 기반 시스템의 경우: `sudo start/stop/restart/status datadog-agent`
* `systemd` 기반 시스템의 경우: `sudo systemctl start/stop/restart/status datadog-agent`

[서비스 라이프사이클 명령어에 대해 더 자세히 알아보세요][2].

{{% /tab %}}
{{< /tabs >}}

## 설정

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}
Agent 설정 파일과 폴더 위치는 다음과 같습니다.

* `/etc/datadog-agent/datadog.yaml`

[통합][1] 설정 파일:

* `/etc/datadog-agent/conf.d/`

[1]: /ko/integrations/
{{% /tab %}}
{{% tab "Agent v5" %}}

Agent 설정 파일과 폴더 위치는 다음과 같습니다.

* `/etc/dd-agent/datadog.conf`

[통합][1] 설정 파일:

* `/etc/dd-agent/conf.d/`

[1]: /ko/integrations/
{{% /tab %}}
{{< /tabs >}}

## 트러블슈팅

[Agent 트러블슈팅 가이드][2]를 참조하세요.

## 임베디드 Agent 사용하기

Agent는 `/opt/datadog-agent/embedded/`에 임베디드 파이썬(Python) 환경을 포함합니다. `python`, `pip`처럼 일반적으로 사용하는 바이너리는 `/opt/datadog-agent/embedded/bin/`에 있습니다.

자세한 정보가 필요하신 분은 [임베디드 Agent에 패키지를 추가][3]하는 방법 안내서를 참조하시기 바랍니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent/fedora
[2]: /ko/agent/troubleshooting/
[3]: /ko/developers/guide/custom-python-package/