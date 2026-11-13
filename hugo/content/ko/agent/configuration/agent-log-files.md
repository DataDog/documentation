---
algolia:
  tags:
  - agent log files
aliases:
- /ko/agent/faq/agent-log-files
- /ko/agent/guide/agent-log-files
description: Datadog Agent가 로그 파일을 저장하는 위치와 로그 로테이션 설정을 구성하는 방법을 확인하세요.
further_reading:
- link: /agent/troubleshooting/
  tag: 문서
  text: Agent 문제 해결
- link: /agent/configuration/agent-configuration-files/
  tag: FAQ
  text: Agent 구성 파일
- link: /agent/configuration/agent-commands/
  tag: FAQ
  text: Agent 명령
title: Agent 로그 파일
---
Datadog Agent는 기본적으로 10MB마다 로그 롤오버를 수행합니다. 롤오버가 발생하면 백업이 하나(`agent.log.1`) 유지됩니다. 이전 백업이 있으면 rollover 중에 해당 백업을 덮어씁니다. 하나의 로그 파일에 대한 최대 크기와 유지할 최대 백업 파일 수를 설정하려면 [Agent 구성 파일][1]에서 `log_file_max_size`(기본값: 10485760 바이트) 및 `log_file_max_rolls`(기본값: 1)을 사용하세요.

## Agent 로그 디렉터리 {#agent-log-directory}

| 플랫폼                              | 명령                       |
|---------------------------------------|-------------------------------|
| AIX                                   | `/var/log/datadog/`           |
| Linux                                 | `/var/log/datadog/`           |
| macOS, Agent v7.28+ 및 v6.28+        | `/opt/datadog-agent/logs`      |
| macOS, 6.28.0/7.28.0 이전 버전의 Agent | `/var/log/datadog`            |
| Windows                               | `C:\ProgramData\Datadog\logs` |

## Agent 로그 파일 {#agent-log-files}

* `agent.log`
* `process-agent.log`
* `trace-agent.log`
* `system-probe.log`
* `jmxfetch.log`(Agent 7.24.0/6.24.0 이상인 경우)
* `dogstatsd.log`(Agent 7.46.0 이상인 경우)

AIX에서 각 Agent 서비스는 stderr을 `/var/log/datadog/`의 전용 파일(`agent-stderr.log`, `trace-agent-stderr.log`, `agent-data-plane-stderr.log`)로도 리디렉션합니다. 이 파일에는 Agent의 내부 로깅을 거치지 않는 시작 오류 등의 출력이 기록됩니다.

## Agent 설치 로그 파일 {#agent-installation-log-files}

| 플랫폼                             | 위치 및 파일 이름        |
|--------------------------------------|-------------------------------|
| Linux                                | `$(pwd)/ddagent-install.log`  |
| macOS                                | `/tmp/dd_agent.log`           |
| Windows                              | `%TEMP%\MSI*.LOG`             |

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ko/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file