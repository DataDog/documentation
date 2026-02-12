---
app_id: riak-repl
app_uuid: bbba11cf-2ea1-4a8b-904c-eb3b55ed169a
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: riak_repl.server_bytes_sent
      metadata_path: metadata.csv
      prefix: riak_repl.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10168
    source_type_name: Riak MDC 복제
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: 커뮤니티
  sales_email: britt.treece@gmail.com
  support_email: britt.treece@gmail.com
categories:
- 데이터 저장소
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/riak_repl/README.md
display_on_public_website: true
draft: false
git_integration_title: riak_repl
integration_id: riak-repl
integration_title: Riak MDC 복제
integration_version: 1.0.1
is_public: true
manifest_version: 2.0.0
name: riak_repl
public_title: Riak MDC 복제
short_description: 복제 성능, 용량 및 상태를 추적하세요.
supported_os:
- linux
- macos
- 윈도우즈(Windows)
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Data Stores
  - Offering::Integration
  configuration: README.md#Setup
  description: 복제 성능, 용량 및 상태를 추적하세요.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Riak MDC 복제
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

이 점검은 Riak 복제 [riak-repl][1]를 모니터링합니다.

## 설정

Riak-Repl 점검은 [Datadog 에이전트][2] 패키지에 포함되어 있지 않으므로 설치해야 합니다.

### 설치

에이전트 v7.21+/v6.21+의 경우 아래 지침을 따라 호스트에 Riak-Repl 점검을 설치하세요. [커뮤니티 통합][3]을 사용하여 도커(Docker) 에이전트 또는 이전 버전의 에이전트를 설치합니다.

1. 다음 명령어를 실행해 에이전트 통합을 설치하세요.

   ```shell
   datadog-agent integration install -t datadog-riak_repl==<INTEGRATION_VERSION>
   ```

2. 통합을 코어 [통합][4]과 유사하게 설정하세요.

### 설정

1. 에이전트의 설정 디렉터리 루트에 있는 `conf.d/` 폴더에서 `riak_repl.d/conf.yaml` 파일을 편집하여 riak_repl 성능 데이터 수집을 시작합니다. 사용 가능한 모든 설정 옵션은 [샘플 riak_repl.d/conf.yaml][5]을  참조하세요.

2. [에이전트 재시작][6]

### 검증

[에이전트 상태 하위 명령][7]을 실행하고 점검 섹션 아래에서 `riak_repl`을 찾습니다. 

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "riak-repl" >}}


### 서비스 점검

Riak-Repl 통합은 서비스 점검을 포함하지 않습니다.

### 이벤트

Riak-Repl 통합은 이벤트를 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][9]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/riak_repl/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ko/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/ko/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/riak_repl/datadog_checks/riak_repl/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ko/agent/faq/agent-commands/#start-stop-restart-the-agent
[7]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#service-status
[8]: https://github.com/DataDog/integrations-extras/blob/master/riak_repl/metadata.csv
[9]: https://docs.datadoghq.com/ko/help/