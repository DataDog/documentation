---
disable_toc: false
private: true
title: Agent 5 로그 파일
---

## 개요

이 페이지에서는 Agent 5 로그 파일을 다룹니다. Datadog에서는 최신 기능을 사용하기 위해 Agent 7을 설치하거나 업그레이드할 것을 권장합니다. 최신 버전의 Agent 설치에 관한 자세한 내용은 [Agent 7 설치 지침][1]을 참고하세요. 이전 버전에서 Agent 7로 업그레이드하는 방법에 관한 자세한 내용은 [Datadog Agent v7로 업그레이드][2]를 참고하세요.

Datadog Datadog Agent는 기본적으로 10MB마다 로그 롤오버를 실행합니다. 롤오버가 발생하면 백업 파일(`agent.log.1`) 하나가 보관됩니다. 이전 백업이 있는 경우 롤오버 중에 덮어씁니다. 로그 파일 1개의 최대 크기와 보관할 백업 파일의 최대 개수를 설정하려면 [Agent 구성 파일][3]에서 `log_file_max_size`(기본값: 10485760바이트)와 `log_file_max_rolls`(기본값: 1)를 사용하세요.

## Agent 로그 디렉토리

| 플랫폼                             | 명령어                                                              |
|--------------------------------------|----------------------------------------------------------------------|
| Linux                                | `/var/log/datadog/`                                                  |
| macOS                                | `/var/log/datadog/`                                                  |
| Windows Server 2008, Vista 및 이후 버전 | `C:\ProgramData\Datadog\logs\`                                       |
| Windows Server 2003, XP 또는 이전 버전     | `C:\Documents and Settings\All Users\Application Data\Datadog\logs\` |
| SmartOS                              | `/opt/local/datadog/logs/supervisord/`                               |
| Source build                         | `~/.datadog-agent/supervisord/logs/`                                 |

**참고**: Windows Server 2008, Vista 및 최신 시스템의 경우 Agent 로그는 `C:\ProgramData\Datadog\logs`에 있습니다. `ProgramData`는 숨겨진 폴더입니다.

## Agent 로그 파일

* `collector.log`
* `dogstatsd.log`
* `forwarder.log`
* `supervisord.log`

## Agent 설치 로그 파일

| 플랫폼                             | 위치 및 파일 이름        |
|--------------------------------------|-------------------------------|
| Linux                                | `$(pwd)/ddagent-install.log`    |
| macOS                                | `/tmp/dd_agent.log`           |
| 윈도우즈(Windows)                              | `%TEMP%\MSI*.LOG`             |

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[2]: /ko/agent/versions/upgrade_to_agent_v7/
[3]: /ko/agent/guide/agent-5-configuration-files#agent-main-configuration-file