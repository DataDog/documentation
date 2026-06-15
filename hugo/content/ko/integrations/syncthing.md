---
app_id: syncthing
app_uuid: a61c3428-6898-45be-8a20-89f4c039a56d
assets:
  dashboards:
    Syncthing Overview: assets/dashboards/syncthing_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: syncthing.connections.count
      metadata_path: metadata.csv
      prefix: syncthing.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10276
    source_type_name: Syncthing
  monitors:
    Device is not connected: assets/monitors/syncthing_device_not_connected.json
    Files out of sync: assets/monitors/syncthing_out_of_sync.json
    Folder errors: assets/monitors/syncthing_folder_error.json
    No active connections: assets/monitors/syncthing_disconnected.json
    Service is failed: assets/monitors/syncthing_service_error.json
    System errors: assets/monitors/syncthing_system_error.json
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: 커뮤니티
  sales_email: Alexander@Bushnev.pro
  support_email: Alexander@Bushnev.pro
categories:
- 협업
- 보안
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/syncthing/README.md
display_on_public_website: true
draft: false
git_integration_title: syncthing
integration_id: syncthing
integration_title: Syncthing
integration_version: 1.1.0
is_public: true
manifest_version: 2.0.0
name: syncthing
public_title: Syncthing
short_description: Syncthing 인스턴스의 전체 통계 추적
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Category::Collaboration
  - 카테고리::보안
  - Supported OS::macOS
  - 제공::통합
  configuration: README.md#Setup
  description: Syncthing 인스턴스의 전체 통계 추적
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Syncthing
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

Syncthing은 두 대 이상의 컴퓨터 간에 파일을 실시간으로 동기화합니다. 이 통합을 통해 Datadog을 사용하여 [Syncthing][1]을 모니터링할 수 있습니다.

## 설정

Syncthing 점검은 [Datadog Agent][2] 패키지에 포함되어 있지 않으므로 설치해야 합니다.

### 설치

Agent v7.21 이상/v6.21 이상의 경우, 아래 지침에 따라 호스트에 Syncthing 점검을 설치하세요. Docker Agent 또는 이전 버전의 Agent에 Syncthing 점검을 설치하려면 [커뮤니티 통합 사용][3]을 참고하세요.

1. 다음 명령어를 실행해 에이전트 통합을 설치하세요.

   ```shell
   datadog-agent integration install -t datadog-syncthing==<INTEGRATION_VERSION>
   ```

2. 통합을 코어 [통합][4]과 유사하게 설정하세요.

### 구성

1. [Agent 구성 디렉터리][5] 루트에 있는 `conf.d/` 폴더의  `syncthing.d/conf.yaml` 파일을 편집하여 Syncthing [메트릭](#metrics) 수집을 시작하세요. 사용 가능한 모든 구성 옵션은 [샘플 syncthing.d/conf.yaml][6]을 참고하세요.

2. [에이전트 다시 시작][7]

### 검증

[Agent의 상태 하위 명령][8]을 실행하고 Checks 섹션에서 `syncthing`을 찾으세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "syncthing" >}}


### 이벤트

Syncthing은 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "syncthing" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][11]에 문의하세요.


[1]: https://syncthing.net/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ko/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/ko/getting_started/integrations/
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-extras/blob/master/syncthing/datadog_checks/syncthing/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#service-status
[9]: https://github.com/DataDog/integrations-extras/blob/master/syncthing/metadata.csv
[10]: https://github.com/DataDog/integrations-extras/blob/master/syncthing/assets/service_checks.json
[11]: https://docs.datadoghq.com/ko/help/