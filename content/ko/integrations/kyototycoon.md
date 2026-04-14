---
app_id: kyoto-tycoon
app_uuid: 5cc7578e-8f8e-43c3-890a-4360581634e7
assets:
  dashboards:
    kyototycoon: assets/dashboards/kyototycoon_dashboard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: kyototycoon.records
      metadata_path: metadata.csv
      prefix: kyototycoon.
    process_signatures:
    - ktserver
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 62
    source_type_name: Kyoto Tycoon
  saved_views:
    kyoto-tycoon_processes: assets/saved_views/kyoto-tycoon_processes.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- data stores
- log collection
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/kyototycoon/README.md
display_on_public_website: true
draft: false
git_integration_title: kyototycoon
integration_id: kyoto-tycoon
integration_title: Kyoto Tycoon
integration_version: 4.1.0
is_public: true
manifest_version: 2.0.0
name: kyototycoon
public_title: Kyoto Tycoon
short_description: 가져오기, 설정 및 삭제 작업을 추적하고 복제 지연을 모니터링하세요.
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS:Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Data Stores
  - Category::Log Collection
  - Offering::Integration
  configuration: README.md#Setup
  description: 가져오기, 설정 및 삭제 작업을 추적하고 복제 지연을 모니터링하세요.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Kyoto Tycoon
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

에이전트의 KyotoTycoon 점검은 가져오기, 설정, 삭제 작업을 추적하고 복제 지연을 모니터링할 수 있도록 지원합니다.

## 설정

### 설치

KyotoTycoon 점검은 [Datadog 에이전트][1] 패키지 에 포함되어 있으므로 KyotoTycoon 서버에 다른 것을 설치할 필요가 없습니다.

### 설정

1. [에이전트 설정 디렉토리][2] 루트의 `conf.d/` 폴더에 있는 `kyototycoon.d/conf.yaml` 파일을 수정합니다. 사용 가능한 모든 설정 옵션은 [샘플 kyototycoon.d/conf.yaml][3]을 참조하세요:

   ```yaml
   init_config:

   instances:
     ## @param report_url - string - required
     ## The report URL should be a URL to the Kyoto Tycoon "report" RPC endpoint.
     #
     - report_url: http://localhost:1978/rpc/report
   ```

2. [에이전트][4]를 다시 시작합니다.

##### 로그 수집

1. 로그 수집은 Datadog 에이전트에서 기본적으로 비활성화되어 있습니다. `datadog.yaml` 파일에서 활성화합니다.

    ```yaml
    logs_enabled: true
    ```

2. 이 설정 블록을 `kyototycoon.d/conf.yaml` 파일에 추가하여 Kyoto Tycoon 로그 수집을 시작하세요.

    ```yaml
    logs:
      - type: file
        path: /var/data/ktserver.log
        source: kyototycoon
    ```

   환경에 따라 `path` 파라미터 값을 변경합니다. 사용 가능한 모든 설정 옵션은 [샘플 kyototycoon.d/conf.yaml][3]을 참조하세요.

3. [Agent를 재시작합니다][4].

### 검증

[에이전트 `status` 하위 명령[]5]을 실행하고 점검 섹션에서 `kyototycoon`을 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "kyoto-tycoon" >}}


### 이벤트

KyotoTycoon 점검에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "kyoto-tycoon" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][8]에 문의하세요.


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/kyototycoon/datadog_checks/kyototycoon/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/kyototycoon/metadata.csv
[7]: https://github.com/DataDog/integrations-core/blob/master/kyototycoon/assets/service_checks.json
[8]: https://docs.datadoghq.com/ko/help/
