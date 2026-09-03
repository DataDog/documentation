---
app_id: stardog
app_uuid: a4d874ba-7173-4c43-8cc8-09f966186be8
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: stardog.dbms.memory.native.max
      metadata_path: metadata.csv
      prefix: stardog.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10206
    source_type_name: Stardog
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Stardog
  sales_email: support@stardog.com
  support_email: support@stardog.com
categories:
- data stores
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/stardog/README.md
display_on_public_website: true
draft: false
git_integration_title: stardog
integration_id: stardog
integration_title: Stardog
integration_version: 2.0.0
is_public: true
manifest_version: 2.0.0
name: stardog
public_title: Stardog
short_description: Datadog용 Stardog 데이터 수집기
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
  - Category::Data Stores
  - Offering::Integration
  configuration: README.md#Setup
  description: Datadog용 Stardog 데이터 수집기
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Stardog
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

실시간으로 Stardog 서비스에서 메트릭을 확보하세요.

- Stardog 통계를 시각화하고 모니터링하세요.
- Stardog 페일오버와 이벤트에 대한 알림을 받으세요.

## 설정

Stardog 점검은 [Datadog Agent][1] 패키지에 포함되어 있지 않으므로 설치해야 합니다.

### 설치

Agent v7.21+ / v6.21+의 경우 아래 지침에 따라 호스트에 Stardog 점검을 설치하세요. [커뮤니티 통합 사용][2]을 참조하여 Docker Agent 또는 Agent 구버전과 함께 설치하세요.

1. 다음 명령어를 실행해 에이전트 통합을 설치하세요.

   ```shell
   datadog-agent integration install -t datadog-stardog==<INTEGRATION_VERSION>
   ```

2. 통합을 코어 [통합][3]과 유사하게 설정하세요.

### 구성

1. [Agent 구성 디렉터리][4] 루트에 있는 `conf.d/` 폴더의 `stardog.d/conf.yaml` 파일을 편집하여 Stardog [메트릭](#metrics) 수집을 시작합니다. 사용 가능한 모든 구성 옵션은 [샘플 stardog.d/conf.yaml][5]을 참조하세요.

2. [Agent를 재시작합니다][6].

## 검증

[에이전트 상태 하위 명령을 실행한 다음][7] 점검 섹션에서 `stardog`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "stardog" >}}


### 이벤트

Stardog 점검에는 이벤트가 포함되지 않습니다.

### 서비스 점검

Stardog 점검에는 서비스 점검이 포함되지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][9]에 문의하세요.

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/ko/agent/guide/use-community-integrations/
[3]: https://docs.datadoghq.com/ko/getting_started/integrations/
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-extras/blob/master/stardog/datadog_checks/stardog/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#service-status
[8]: https://github.com/DataDog/integrations-extras/blob/master/stardog/metadata.csv
[9]: http://docs.datadoghq.com/help