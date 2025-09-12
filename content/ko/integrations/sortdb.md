---
app_id: sortdb
app_uuid: 02cd7f3d-5394-4d08-8364-35c9d1af1377
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: sortdb.stats.total_requests
      metadata_path: metadata.csv
      prefix: sortdb.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10205
    source_type_name: Sortdb
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: 커뮤니티
  sales_email: namrata.deshpande4@gmail.com
  support_email: namrata.deshpande4@gmail.com
categories:
- 데이터 스토어
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/sortdb/README.md
display_on_public_website: true
draft: false
git_integration_title: sortdb
integration_id: sortdb
integration_title: Sortdb
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: sortdb
public_title: Sortdb
short_description: Datadog의 sortdb  모니터링 지원
supported_os:
- 리눅스
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - 카테고리::데이터 저장
  - 제공::통합
  configuration: README.md#Setup
  description: Datadog의 sortdb 모니터링 지원
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Sortdb
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

실시간으로 [Sortdb][1] 서비스에서 메트릭을 받아 다음 이점을 누립니다.

- Sortdb 통계를 시각화하고 모니터링합니다.
- Sortdb 페일오버에 대한 알림을 받습니다.
- 여러 인스턴스에서 통계를 가져오고 해당 인스턴스의 상태를 확인합니다.

## 설정

Sortdb 점검은 [Datadog Agent][2] 패키지에 포함되어 있지 않으므로 설치해야 합니다.

### 설치

Agent v7.21+ / v6.21+의 경우 아래 지침에 따라 호스트에 Sortdb 점검을 설치합니다. [커뮤니티 통합 사용][3]을 참조하여 Agent 이전 버전 또는 Docker Agent를 함께 설치합니다.

1. 다음 명령어를 실행해 에이전트 통합을 설치하세요.

   ```shell
   datadog-agent integration install -t datadog-sortdb==<INTEGRATION_VERSION>
   ```

2. 통합을 코어 [통합][4]과 유사하게 설정하세요.

### 구성

1. `conf.d/` 폴더 및 [Agent 설정 디렉터리][5] 루트에 있는 `sortdb.d/conf.yaml` 파일을 편집하여 Sortdb [메트릭](#metric-collection) 수집을 시작합니다. 사용 가능한 모든 설정 옵션은  [샘플 sortdb.d/conf.yaml][6]을 사용합니다.

2. [ Agent를 다시 시작][7]합니다.

### 검증

[Agent 상태 하위 명령][8]을 실행하고 점검 섹션 아래서 `sortdb`를 찾습니다.

## 호환성

SortDB 점검은 모든 주요 플랫폼과 호환됩니다.

## 수집한 데이터

### 메트릭

이 통합에서 제공되는 메트릭 목록을 보려면 [metadata.csv][9]를 참조하세요.

### 서비스 점검
{{< get-service-checks-from-git "sortdb" >}}


## 트러블슈팅

SortDB 점검은 어떠한 이벤트도 포함하지 않습니다.


[1]: https://github.com/jehiah/sortdb
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ko/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/ko/getting_started/integrations/
[5]: https://docs.datadoghq.com/ko/agent/faq/agent-configuration-files/#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-extras/blob/master/sortdb/datadog_checks/sortdb/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ko/agent/faq/agent-commands/#start-stop-restart-the-agent
[8]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#service-status
[9]: https://github.com/DataDog/integrations-extras/blob/master/sortdb/metadata.csv
[10]: https://github.com/DataDog/integrations-extras/blob/master/sortdb/assets/service_checks.json