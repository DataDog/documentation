---
aliases:
- /ko/guides/basic_agent_usage/source/
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
- link: /agent/guide/network#configure-ports
  tag: 설명서
  text: 인바운드 포트 구성
platform: 소스
title: 소스 설치용 Agent의 기본 사용법
---
## 개요

이번 페이지에서는 Datadog Agent의 기본 기능을 소개해드리겠습니다. 아직 Agent를 설치하지 않으셨다면 [Datadog Agent 통합][1] 설명서에서 설치 안내를 찾아보실 수 있습니다.

기본적으로 Agent는 `~/.datadog-agent`의 샌드박스에 설치됩니다. 이 폴더는 자유롭게 옮길 수 있습니다. 단, 이번 가이드에서는 Agent가 기본 위치에 설치되었다고 가정하겠습니다. 폴더를 이동하셨다면 그에 맞추어 안내문을 읽어주시기 바랍니다.

## 명령어

Datadog Agent는 여러 명령어를 갖추고 있으며, _라이프사이클 명령어_는(예: `start`/`stop`/`restart`/`status`)  `sudo`로 실행해야 합니다.

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

| 설명                   | 명령어                                 |
| ----------------------------- | --------------------------------------- |
| Agent 시작                   | `sudo ./bin/agent/agent start`          |
| Agent 중지                    | `sudo ./bin/agent/agent  stop`          |
| 실행 중인 Agent의 상태 페이지  | `sudo ./bin/agent/agent  info`          |
| Flare를 전송                    | `sudo ./bin/agent/agent  flare`         |
| 명령어 사용법 표시         | `sudo ./bin/agent/agent  help`          |

{{% /tab %}}
{{% tab "Agent v5" %}}

| 설명                   | 명령어                                 |
| ----------------------------- | --------------------------------------- |
| Agent 시작                   | `sudo ~/.datadog-agent/bin/agent start` |
| Agent 중지                    | `sudo ~/.datadog-agent/bin/agent stop`  |
| 실행 중인 Agent의 상태 페이지  | `sudo ~/.datadog-agent/bin/agent info`  |
| Flare를 전송                    | `sudo ~/.datadog-agent/bin/agent flare` |
| 명령어 사용법 표시         | `sudo ~/.datadog-agent/bin/agent help`  |

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



{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent/source
[2]: /ko/agent/troubleshooting/