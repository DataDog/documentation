---
app_id: unbound
app_uuid: 33cd72ba-822b-4a74-92eb-f1240ea71975
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: unbound.time.up
      metadata_path: metadata.csv
      prefix: unbound.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10165
    source_type_name: Unbound
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: 커뮤니티
  sales_email: david.byron@avast.com
  support_email: david.byron@avast.com
categories:
- 캐싱(caching)
- 네트워크
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/unbound/README.md
display_on_public_website: true
draft: false
git_integration_title: unbound
integration_id: unbound
integration_title: Unbound
integration_version: 1.0.1
is_public: true
manifest_version: 2.0.0
name: unbound
public_title: Unbound
short_description: Unbound 메트릭을 수집하기 위한 Datadog 통합
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - 카테고리::캐싱(Caching)
  - Category::Network
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - 제공::통합
  configuration: README.md#Setup
  description: Unbound 메트릭을 수집하기 위한 Datadog 통합
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Unbound
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

이 점검은 Datadog Agent를 통해 [Unbound][1]를 모니터링합니다. 

Unbound 서비스에서 실시간으로 메트릭을 가져옵니다.

- Unbound 통계를 시각화하고 모니터링합니다.

## 설정

Unbound 점검은 [Datadog Agent][2] 패키지에 포함되어 있지 않으므로 설치해야 합니다.

### 설치

Agent v7.21+/v6.21+의 경우 아래 지침에 따라 호스트에 Unbound 점검을 설치하세요. Docker Agent 또는 구버전의 Agent와 함께 설치하려면 [커뮤니티 통합 사용][3]을 참조하세요.

1. 다음 명령어를 실행해 에이전트 통합을 설치하세요.

   ```shell
   datadog-agent integration install -t datadog-unbound==<INTEGRATION_VERSION>
   ```

2. 통합을 코어 [통합][4]과 유사하게 설정하세요.

### 구성

1. 에이전트 구성 디렉터리의 루트에 있는 `conf.d/` 폴더 내 `unbound.d/conf.yaml` 파일을 편집하여 
   Unbound 메트릭 수집을 시작하세요.
   사용 가능한 모든 구성 옵션의 경우 [샘플 unbound.d/conf.yaml][5]을 참조하세요.

2. [Agent를 재시작합니다][6].

### 검증

[Agent 상태 하위 명령][7]을 실행하고 점검 섹션에서 `unbound`을 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "unbound" >}}


### 이벤트

Unbound 점검에는 이벤트가 포함되지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "unbound" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][10]에 문의해주세요.


[1]: https://nlnetlabs.nl/documentation/unbound/unbound-control/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ko/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/ko/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/unbound/datadog_checks/unbound/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/unbound/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/unbound/assets/service_checks.json
[10]: https://docs.datadoghq.com/ko/help/