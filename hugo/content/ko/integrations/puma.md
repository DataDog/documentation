---
app_id: puma
app_uuid: c517e801-0fa5-4f5e-8175-a7d5d48a8131
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: puma.workers
      metadata_path: metadata.csv
      prefix: puma.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10126
    source_type_name: Puma
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: 커뮤니티
  sales_email: justin.morris@ferocia.com.au
  support_email: justin.morris@ferocia.com.au
categories:
- 메트릭
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/puma/README.md
display_on_public_website: true
draft: false
git_integration_title: puma
integration_id: puma
integration_title: Puma
integration_version: 1.2.1
is_public: true
manifest_version: 2.0.0
name: puma
public_title: Puma
short_description: 루비(Ruby) 및 Rack을 위한 빠른 동시 처리 웹 서버
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
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: 루비(Ruby) 및 Rack을 위한 빠른 동시 처리 웹 서버
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Puma
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

본 점검은 [제어 및 상태][2] 서버에서 제공하는 Puma 메트릭 엔드포인트를 사용하여 Datadog 에이전트로 [Puma][1]를 모니터링합니다.

## 설정

Puma 점검은 [Datadog 에이전트][3] 패키지에 포함되어 있지 않기 때문에 설치해야 합니다.

### 설치

에이전트 v7.21+/v6.21+의 경우, 하단 지침에 따라 호스트에 Puma 점검을 설치하세요. 도커(Docker) 에이전트 또는 이전 버전의 에이전트와 같이 설치하려면 [커뮤니티 통합][4]을 참고하세요.

1. 다음 명령어를 실행해 에이전트 통합을 설치하세요.

   ```shell
   datadog-agent integration install -t datadog-puma==<INTEGRATION_VERSION>
   ```

2. 통합을 코어 [통합][5]과 유사하게 설정하세요.

### 설정

1. 에이전트의 설정 디렉토리 루트의 `conf.d/` 폴더에 있는 `puma.d/conf.yaml` 파일을 편집하여 Puma 성능 데이터 수집을 시작합니다. 사용 가능한 모든 설정 옵션은 [puma.d/conf.yaml 샘플][6]을 참조하세요.

2. [에이전트를 다시 시작][7]합니다.

### 검증

[에이전트 상태 하위 명령][8]을 실행하고 점검 섹션에서 `puma`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "puma" >}}


### 이벤트

Puma는 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "puma" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][11]에 문의하세요.


[1]: https://puma.io/
[2]: https://github.com/puma/puma#controlstatus-server
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/ko/agent/guide/use-community-integrations/
[5]: https://docs.datadoghq.com/ko/getting_started/integrations/
[6]: https://github.com/DataDog/integrations-extras/blob/master/puma/datadog_checks/puma/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-extras/blob/master/puma/metadata.csv
[10]: https://github.com/DataDog/integrations-extras/blob/master/puma/assets/service_checks.json
[11]: https://docs.datadoghq.com/ko/help/