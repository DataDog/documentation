---
app_id: 시스템
app_uuid: 52179e9d-9012-4478-b1db-08e4d21d1181
assets:
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: system.disk.free
      metadata_path: metadata.csv
      prefix: 시스템.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Disk
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- os & system
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/disk/README.md
display_name: Disk
display_on_public_website: true
draft: false
git_integration_title: disk
guid: 94588b23-111e-4ed2-a2af-fd6e4caeea04
integration_id: 시스템
integration_title: Disk
integration_version: 5.3.0
is_public: true
maintainer: help@datadoghq.com
manifest_version: 2.0.0
metric_prefix: 시스템.
metric_to_check: system.disk.free
monitors:
  disk-space-forecast: assets/monitors/disk_monitor.json
name: disk
public_title: Disk
short_description: 디스크 점검으로 마운트된 디스크의 메트릭을 수집합니다.
support: core
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::OS & 시스템
  configuration: README.md#Setup
  description: 디스크 점검으로 마운트된 디스크의 메트릭을 수집합니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Disk
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

디스크 사용량 및 IO와 관련된 메트릭을 수집합니다.

## 설정

### 설치

디스크 점검은 [Datadog 에이전트][1] 패키지에 포함되어 있으므로 서버에 추가 설치할 필요가 없습니다.

### 설정

본 디스크 점검은 기본값으로 설정되어 있으며 에이전트는 모든 로컬 파티션에서 메트릭을 수집합니다.  이 점검을 사용자 지정 옵션 설정하려면 [에이전트 설정 디렉토리][2] 루트의 `conf.d/` 폴더의 `disk.d/conf.yaml` 파일을 수정하세요. 사용 가능한 모든 설정 옵션을 보려면 [disk.d/conf.yaml 샘플][3]을 참조하세요.

#### 윈도우즈(Windows) 호스트용 참고 사항
다음은 디스크 점검을 사용 가능한 세 가지 시나리오입니다.

1. 물리적 드라이브 모니터링

  디스크 점검은 디스크 문자(예: C:\, D:\ 등)로 표기하는 물리적 드라이브를 모니터링하는 기능을 기본 지원하며, 특별한 고려 사항 없이도 사용하실 수 있습니다.

2. 중첩된 마운트 포인트 모니터링

  파일 시스템 내에 마운트된 폴더를 모니터링하려면 관리자 권한이 필요합니다. 윈도우즈(Windows) 기본 함수 [FindFirstVolumeMountPoint][4] 호출에 관리자 권한이 필요하기 때문입니다.
  에이전트에 관리자 권한을 부여하지 않고 메트릭을 수집하려면 [PDH 점검][5]를 활용하여 해당 성능 카운터(perf counter)에서 마운트 포인트 메트릭을 수집합니다.

3. 파일 공유 모니터링

  윈도우즈(Windows)에서 파일 공유용 마운트 포인트 메트릭을 수집하는 작업은 설정에서 `create_mounts` 옵션을 사용해야만 지원됩니다.
  윈도우즈(Windows)에서 마운트된 각 폴더는 해당 공유를 마운트한 사용자만 확인할 수 있습니다.
  따라서 `create_mounts` 옵션으로 에이전트가 마운트 포인트를 생성하여 해당 에이전트 사용자의 컨텍스트를 모니터링할 수 있습니다.

### 검증

[에이전트의 `status` 상태 하위 명령을 실행][6]하고 점검 섹션에서 `disk`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "disk" >}}


### 이벤트

디스크 점검은 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "disk" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][9]에 문의하세요.


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/disk/datadog_checks/disk/data/conf.yaml.default
[4]: https://docs.microsoft.com/en-us/windows/win32/api/winbase/nf-winbase-findfirstvolumemountpointw
[5]: https://docs.datadoghq.com/ko/integrations/pdh_check/#pagetitle
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/disk/metadata.csv
[8]: https://github.com/DataDog/integrations-core/blob/master/disk/assets/service_checks.json
[9]: https://docs.datadoghq.com/ko/help/