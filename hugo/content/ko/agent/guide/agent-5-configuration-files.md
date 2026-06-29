---
disable_toc: false
private: true
title: Agent 5 구성 파일
---

## 개요

이 페이지에서는 Agent 5 구성 파일에 관해 다룹니다. Datadog은 최신 기능을 사용하기 위해 Agent 7을 설치하거나 업그레이드할 것을 권장합니다. 최신 버전의 Agent 설치에 대한 자세한 내용은 [Agent 7 설치 지침][1]을 참고하세요. 이전 버전에서 Agent 7로 업그레이드하는 방법에 관한 자세한 내용은 [Datadog Agent v7로 업그레이드][2]를 참고하세요.

## Agent 기본 구성 파일

| 플랫폼                             | 명령어                                                                    |
|:-------------------------------------|:---------------------------------------------------------------------------|
| Linux                                | `/etc/dd-agent/datadog.conf`                                               |
| macOS                                | `~/.datadog-agent/datadog.conf`                                            |                                       |
| Windows Server 2008, Vista 및 이후 버전 | `%ProgramData%\Datadog\datadog.conf`                                       |
| Windows Server 2003, XP 또는 이전 버전     | `\\Documents and Settings\All Users\Application Data\Datadog\datadog.conf` |

사용 가능한 모든 구성 옵션은 [샘플 `config_template.yaml` 파일][3]을 참고하세요.

## Agent 구성 디렉토리

| 플랫폼                             | 명령어                                                              |
|:-------------------------------------|:---------------------------------------------------------------------|
| Linux                                | `/etc/dd-agent/conf.d/`                                              |
| CentOS                               | `/etc/dd-agent/conf.d/`                                              |
| Debian                               | `/etc/dd-agent/conf.d/`                                              |
| Fedora                               | `/etc/dd-agent/conf.d/`                                              |
| macOS                                | `~/.datadog-agent/conf.d/`                                           |
| RedHat                               | `/etc/dd-agent/conf.d/`                                              |
| Source                               | `/etc/dd-agent/conf.d/`                                              |
| Suse                                 | `/etc/dd-agent/conf.d/`                                              |
| Ubuntu                               | `/etc/dd-agent/conf.d/`                                              |
| Windows Server 2008, Vista 및 이후 버전 | `%ProgramData%\Datadog\conf.d`                                       |
| Windows Server 2003, XP 또는 이전 버전     | `\\Documents and Settings\All Users\Application Data\Datadog\conf.d` |

## JMX 설정 파일

JMX Agent 점검에는 구성 폴더에 추가 `metrics.yaml` 파일이 있습니다. 이 파일은 Datadog Agent가 기본적으로 수집하는 bean의 전체 목록입니다. 이렇게 하면 [Docker 레이블 또는 k8s 어노테이션][4]을 통해 점검을 구성할 때 bean 목록을 수동으로 작성할 필요가 없습니다.

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[2]: /ko/agent/versions/upgrade_to_agent_v7/
[3]: https://github.com/DataDog/dd-agent/blob/master/datadog.conf.example
[4]: /ko/agent/kubernetes/integrations/#configuration