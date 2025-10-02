---
app_id: exchange-server
app_uuid: e334d30a-a7df-4c06-9d1f-d8b6663df38a
assets:
  dashboards:
    Exchange Server Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: exchange.processor.cpu_user
      metadata_path: metadata.csv
      prefix: exchange.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10023
    source_type_name: Exchange Server
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
- windows
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/exchange_server/README.md
display_on_public_website: true
draft: false
git_integration_title: exchange_server
integration_id: exchange-server
integration_title: Microsoft Exchange Server
integration_version: 4.1.0
is_public: true
manifest_version: 2.0.0
name: exchange_server
public_title: Microsoft Exchange Server
short_description: Microsoft Exchange Server 메트릭을 수집하고 그래프로 표시하세요
supported_os:
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Windows
  - Supported OS::Windows
  - Offering::통합
  configuration: README.md#Setup
  description: Microsoft Exchange Server 메트릭을 수집하고 그래프로 표시하세요
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Microsoft Exchange Server
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

Microsoft Exchange Server에서 메트릭 가져오기

- Exchange Server 성능 시각화 및 모니터링

## 설정

### 설치

Exchange 검사는 [Datadog Agent][1] 패키지에 포함되어 있으므로 서버에 다른 것을 설치할 필요가 없습니다.

### 설정

1. [Agent의 구성 디렉터리][2] 루트의 `conf.d/` 폴더에 있는 `exchange_server.d/conf.yaml` 파일을 편집하여 Exchange Server 성능 데이터를 수집합니다.

2. [에이전트를 다시 시작합니다][3].

**참고**: 이 검사의 버전 1.11.0 이상에서는 메트릭 수집을 위한 새로운 구현을 사용하며, Python 3이 필요합니다. Python 3를 사용할 수 없는 호스트의 경우 또는 이 검사의 레거시 버전을 사용하려는 경우 다음 [구성][4]을 참조하세요.

### 로그 수집

1. Datadog 에이전트에서는 로그 수집이 기본적으로 비활성화되어 있습니다. `datadog.yaml` 파일에서 활성화해야 합니다.

   ```yaml
   logs_enabled: true
   ```

2. Exchange Server 로그 수집을 시작하려면 `exchange_server.d/conf.yaml` 파일에 다음 구성 블록을 추가합니다.

   ```yaml
   logs:
     - type: file
       path: "C:\\Program Files\\Microsoft\\Exchange Server\\V15\\TransportRoles\\Logs\\CommonDiagnosticsLog\\*"
       source: exchange-server
     - type: file
       path: "C:\\Program Files\\Microsoft\\Exchange Server\\V15\\TransportRoles\\Logs\\ThrottlingService\\*"
       source: exchange-server
     - type: file
       path: "C:\\Program Files\\Microsoft\\Exchange Server\\V15\\TransportRoles\\Logs\\Hub\\Connectivity\\*"
       source: exchange-server
   ```
   **참고**: Exchange Server가 다양한 유형의 로그를 출력하며 지원되는 로그는 CommonDiagnosticsLog, ThrottlingService, Connectivity 로그입니다. 다른 로그 형식을 요청하려면 [Datadog 지원팀][5]에 문의하세요.

   `path` 파라미터 값을 변경하고 환경에 맞게 설정합니다.
   사용 가능한 모든 구성 옵션은 [샘플 exchange_server.d/conf.yaml][6]을 참조하세요.

3. [에이전트를 다시 시작합니다][3].


### 검증

[Agent의 상태 하위 명령을 실행][7]하고 Checks 섹션에서 `exchange_server`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "exchange-server" >}}


### 이벤트

Exchange Server 점검은 이벤트를 포함하지 않습니다.

### 서비스 점검

Exchange Server 점검은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://github.com/DataDog/integrations-core/blob/7.33.x/exchange_server/datadog_checks/exchange_server/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ko/help/
[6]: https://github.com/DataDog/integrations-core/blob/master/exchange_server/datadog_checks/exchange_server/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/exchange_server/metadata.csv