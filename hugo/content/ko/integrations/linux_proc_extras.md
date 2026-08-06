---
app_id: 시스템
app_uuid: 17477b56-4487-4b00-8820-70c6f64ae3c6
assets:
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: system.inodes.total
      metadata_path: metadata.csv
      prefix: 시스템.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Linux proc extras
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- os & system
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/linux_proc_extras/README.md
display_on_public_website: true
draft: false
git_integration_title: linux_proc_extras
integration_id: 시스템
integration_title: Linux Proc Extras
integration_version: 4.0.0
is_public: true
manifest_version: 2.0.0
name: linux_proc_extras
public_title: Linux Proc Extras
short_description: linux_proc_extras 상태를 시각화 및 모니터링합니다.
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Category::OS & 시스템
  - Offering::Integration
  configuration: README.md#Setup
  description: linux_proc_extras 상태를 시각화 및 모니터링합니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Linux Proc Extras
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

linux_proc_extras 서비스에서 실시간으로 메트릭을 받아 다음을 수행할 수 있습니다.

- linux_proc_extras 상태를 시각화 및 모니터링합니다.
- linux_proc_extras 실패 복구(failovers) 및 이벤트에 대한 알림을 받습니다.

## 설정

### 설치

Linux_proc_extras 점검에는 [Datadog 에이전트][1] 패키지가 포함되어 있으므로 서버에 추가 설치할 필요가 없습니다.

### 구성

1. [에이전트의 설정 디렉토리][2]의 루트에 있는 `conf.d/` 폴더에서 `linux_proc_extras.d/conf.yaml` 파일을 편집합니다. 사용 가능한 모든 설정 옵션은 [linux_proc_extras.d/conf.yaml 샘플][3]을 참조하세요.

2. [Agent를 재시작합니다][4].

### 검증

[에이전트 상태 하위 명령을 실행][5]하고 점검 섹션에서 `linux_proc_extras`을 찾으세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "linux_proc_extras" >}}


### 이벤트

Linux Proc Extras 점검은 이벤트를 포함하지 않습니다.

### 서비스 점검

Linux Proc Extras 점검은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][7]에 문의하세요.

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/linux_proc_extras/datadog_checks/linux_proc_extras/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/linux_proc_extras/metadata.csv
[7]: https://docs.datadoghq.com/ko/help/
