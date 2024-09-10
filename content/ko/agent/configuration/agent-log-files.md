---
algolia:
  tags:
  - agent log files
aliases:
- /ko/agent/faq/agent-log-files
- /ko/agent/guide/agent-log-files
further_reading:
- link: /agent/troubleshooting/
  tag: 설명서
  text: Agent 트러블슈팅
- link: /agent/configuration/agent-configuration-files/
  tag: FAQ
  text: Agent 설정 파일
- link: /agent/configuration/agent-commands/
  tag: FAQ
  text: Agent 명령어
title: Agent 로그 파일
---

Datadog Agent는 기본적으로 매 10MB마다 로그 롤오버를 수행하며, 롤오버가 발생하면 하나의 백업(`agent.log.1`)이 유지됩니다. 이전 백업이 있는 경우 롤오버 중에 덮어씁니다. 로그 파일 하나의 최대 크기와 보관할 최대 백업 파일 의 최대 개수를 설정하려면 [Agent 기본 설정 파일][1]에서 `log_file_max_size`(기본값: 10485760 바이트) 및 `log_file_max_rolls`(기본값: 1)을 사용합니다.

## Agent 로그 디렉토리

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

| 플랫폼                              | 명령어                       |
|---------------------------------------|-------------------------------|
| Linux                                 | `/var/log/datadog/`           |
| macOS, Agent v7.28+ 및 v6.28+        | `/opt/datadog-agent/logs`      |
| 6.28.0/7.28.0 이전의 macOS, Agent | `/var/log/datadog`            |
| Windows                               | `C:\ProgramData\Datadog\logs` |

{{% /tab %}}
{{% tab "Agent v5" %}}

| 플랫폼                             | 명령어                                                              |
|--------------------------------------|----------------------------------------------------------------------|
| Linux                                | `/var/log/datadog/`                                                  |
| macOS                                | `/var/log/datadog/`                                                  |
| Windows 서버 2008, Vista 이상 | `C:\ProgramData\Datadog\logs\`                                       |
| Windows 서버 2003, XP 이전     | `C:\Documents and Settings\All Users\Application Data\Datadog\logs\` |
| SmartOS                              | `/opt/local/datadog/logs/supervisord/`                               |
| Source build                         | `~/.datadog-agent/supervisord/logs/`                                 |

{{% /tab %}}
{{< /tabs >}}

## Agent 로그 파일

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

* `agent.log`
* `process-agent.log`
* `trace-agent.log`
* `system-probe.log`
* Agent 7.24.0/6.24.0 이상을 위한 `jmxfetch.log`
*  Agent 7.46.0 이상을 위한 `dogstatsd.log`

{{% /tab %}}
{{% tab "Agent v5" %}}

* `collector.log`
* `dogstatsd.log`
* `forwarder.log`
* `supervisord.log`

{{% /tab %}}
{{< /tabs >}}

## Agent 설치 로그 파일

| 플랫폼                             | 위치 및 파일 이름        |
|--------------------------------------|-------------------------------|
| Linux                                | `$(pwd)/ddagent-install.log`    |
| macOS                                | `/tmp/dd_agent.log`           |
| Windows                              | `%TEMP%\MSI*.LOG`             |

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ko/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file