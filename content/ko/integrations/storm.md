---
app_id: storm
app_uuid: a3c93ee5-077d-467d-87d7-a2325bdcf782
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: storm.bolt.last_60.acked
      metadata_path: metadata.csv
      prefix: storm.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10207
    source_type_name: storm
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: 커뮤니티
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories:
- metrics
- event management
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/storm/README.md
display_on_public_website: true
draft: false
git_integration_title: storm
integration_id: storm
integration_title: Storm
integration_version: 1.0.1
is_public: true
manifest_version: 2.0.0
name: storm
public_title: Storm
short_description: Apache Storm 1.x.x 토폴로지 실행 통계
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Category::Metrics
  - Category::Event Management
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Apache Storm 1.x.x 토폴로지 실행 통계
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Storm
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

Storm 서비스에서 실시간으로 메트릭을 받아보세요.

- Storm 클러스터 및 토폴로지 메트릭을 시각화하고 모니터링하세요.
- Storm 페일오버 및 이벤트에 대한 알림을 받습니다.

## 설정

Storm 점검은 [Datadog Agent ][1] 패키지에 포함되어 있지 않으므로 설치해야 합니다.

### 설치

Agent v7.21+/v6.21+의 경우 아래 안내에 따라 호스트에 Storm 점검을 설치하세요. [커뮤니티 통합 사용][2]을 참조하여 Docker Agent 또는 Agent 구버전과 함께 설치하세요.

1. 다음 명령어를 실행해 에이전트 통합을 설치하세요.

   ```shell
   datadog-agent integration install -t datadog-storm==<INTEGRATION_VERSION>
   ```

2. 통합을 코어 [통합][3]과 유사하게 설정하세요.

### 구성

1. [Agent 구성 디렉터리][4] 루트의 `conf.d/` 폴더에 있는 `storm.d/conf.yaml` 파일을 편집하여 Storm [메트릭](#metrics) 수집을 시작하세요. 사용 가능한 모든 구성 옵션은 [샘플 storm.d/conf.yaml][5]을 참조하세요.

2. [Agent를 재시작합니다][6].

## 검증

[Agent 상태 하위 명령][7]을 실행하고 점검 섹션에서 `storm`을 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "storm" >}}


### 이벤트

Storm 점검에는 이벤트가 포함되지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "storm" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][10]에 문의해주세요.


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/ko/agent/guide/use-community-integrations/
[3]: https://docs.datadoghq.com/ko/getting_started/integrations/
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-extras/blob/master/storm/datadog_checks/storm/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#service-status
[8]: https://github.com/DataDog/integrations-extras/blob/master/storm/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/storm/assets/service_checks.json
[10]: http://docs.datadoghq.com/help