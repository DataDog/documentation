---
disable_toc: false
private: true
title: Agent 6 로그 파일
---

## 개요

이 페이지에서는 Agent 5 로그 파일을 다룹니다. Datadog에서는 최신 기능을 사용하기 위해 Agent 7을 설치하거나 업그레이드할 것을 권장합니다. 최신 버전의 Agent 설치에 관한 자세한 내용은 [Agent 7 설치 지침][1]을 참고하세요. 이전 버전에서 Agent 7로 업그레이드하는 방법에 관한 자세한 내용은 [Datadog Agent v7로 업그레이드][2]를 참고하세요.

Datadog Datadog Agent는 기본적으로 10MB마다 로그 롤오버를 실행합니다. 롤오버가 발생하면 하나의 백업 파일(`agent.log.1`)이 보관됩니다. 이전 백업이 있는 경우 롤오버 과정에서 덮어씁니다. 하나의 로그 파일의 최대 크기와 보관할 백업 파일의 최대 개수를 설정하려면 [Agent 구성 파일][3]에서 `log_file_max_size`(기본값: 10485760바이트)와 `log_file_max_rolls`(기본값: 1)를 사용하세요.

## Agent 로그 디렉토리

| 플랫폼                              | 명령어                       |
|---------------------------------------|-------------------------------|
| Linux                                 | `/var/log/datadog/`           |
| macOS, Agent v7.28+ 및 v6.28+        | `/opt/datadog-agent/logs`      |
| macOS, 6.28.0/7.28.0 이전 버전 Agent | `/var/log/datadog`            |
| 윈도우즈(Windows)                               | `C:\ProgramData\Datadog\logs` |

## Agent 로그 파일

* `agent.log`
* `process-agent.log`
* `trace-agent.log`
* `system-probe.log`
* Agent >= 7.24.0/6.24.0의 경우 `jmxfetch.log`
* Agent >= 7.46.0의 경우 `dogstatsd.log`


## Agent 설치 로그 파일

| 플랫폼                             | 위치 및 파일 이름        |
|--------------------------------------|-------------------------------|
| Linux                                | `$(pwd)/ddagent-install.log`    |
| macOS                                | `/tmp/dd_agent.log`           |
| 윈도우즈(Windows)                              | `%TEMP%\MSI*.LOG`             |

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[2]: /ko/agent/versions/upgrade_to_agent_v7/
[3]: /ko/agent/guide/agent-6-configuration-files#agent-main-configuration-file