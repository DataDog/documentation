---
app_id: btrfs
app_uuid: 471f9447-678b-4199-9503-7170b65d07c5
assets:
  dashboards:
    btrfs: assets/dashboards/btrfs_dashboard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: system.disk.btrfs.total
      metadata_path: metadata.csv
      prefix: system.disk.btrfs.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 89
    source_type_name: Btrfs
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- os & system
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/btrfs/README.md
display_on_public_website: true
draft: false
git_integration_title: btrfs
integration_id: btrfs
integration_title: Btrfs
integration_version: 2.3.0
is_public: true
manifest_version: 2.0.0
name: btrfs
public_title: Btrfs
short_description: 공간이 부족하기 전에 미리 대응할 수 있도록 Btrfs 볼륨 모니터링하기
supported_os:
- linux
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Category::OS & 시스템
  configuration: README.md#Setup
  description: 공간이 부족하기 전에 미리 대응할 수 있도록 Btrfs 볼륨 모니터링하기
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Btrfs
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![BTRFS 메트릭][1]

## 개요

실시간으로 Btrfs 메트릭을 얻으면 다음을 할 수 있습니다.

- Btrfs 상태 시각화

## 설정

### 설치

Btrfs 점검은 [Datadog 에이전트][2] 패키지에 포함되어 있으므로 Btrfs 파일시스템을 사용하는 서버에 아무 것도 설치할 필요가 없습니다.

### 설정

1. [에이전트의 설정 디렉터리][3] 루트에 있는 `conf.d/` 폴더에서 `btrfs.d/conf.yaml` 파일을 편집합니다. 사용 가능한 모든 설정 옵션을 보려면 [샘플 btrfs.d/conf.yaml][4]을 참고하세요.

2. [에이전트를 재시작합니다][5].

### 검증

[에이전트 상태 하위 명령을 실행하고][6] Checks 섹션 아래에서 `btrfs`를 찾으세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "btrfs" >}}


### 이벤트

Btrfs 점검에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

Btrfs 점검에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][8]에 문의하세요.

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/btrfs/images/btrfs_metric.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/btrfs/datadog_checks/btrfs/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/btrfs/metadata.csv
[8]: https://docs.datadoghq.com/ko/help/