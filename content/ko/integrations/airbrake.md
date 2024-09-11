---
app_id: airbrake
app_uuid: 9628996b-82c1-4920-a0c5-c5f32dabd4cf
assets:
  integration:
    auto_install: false
    events:
      creates_events: true
    metrics:
      check:
      - airbrake.exception_rate
      metadata_path: metadata.csv
      prefix: airbrake.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 34
    source_type_name: Airbrake
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- metrics
- event management
- issue tracking
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: airbrake
integration_id: airbrake
integration_title: Airbrake
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: airbrake
public_title: Airbrake
short_description: 이벤트 스트림에서 Airbrake 예외를 보고, 검색하고, 논의하기
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Metrics
  - Category::Event Management
  - Category::Issue Tracking
  configuration: README.md#Setup
  description: 이벤트 스트림에서 Airbrake 예외를 보고, 검색하고, 논의하기
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Airbrake
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 개요

Airbrake를 Datadog에 연결하면 다음을 할 수 있습니다.

- Datadog에서 [이벤트][1]로 예외를 실시간으로 보기
- 그래프에서 예외 검색하기
- 팀과 예외에 관해 논의하기

{{< img src="integrations/airbrake/airbrakeevent.png" alt="airbrake" popup="true">}}

## 설정

### 구성

웹훅으로 Airbrake 통합 설정:

1. Airbrake 계정에서 설정 페이지로 이동합니다.

2. 활성화하고 싶은 각 프로젝트에서 **Integrations**를 클릭합니다.

3. **WebHooks**를 클릭하고 **URL** 필드에 URL을 입력합니다.

    ```text
    https://app.datadoghq.com/intake/webhook/airbrake?api_key=<YOUR_DATADOG_API_KEY>
    ```

4. **Save**를 클릭합니다.

[Event Explorer][2]로 이동해 Airbrake에 새 오류가 있는지 확인합니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "airbrake" >}}


### 이벤트

Airbrake 통합에 Airbrake의 오류를 이벤트로 보여줍니다.

### 서비스 검사

Airbrake 통합에는 서비스 검사가 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원 팀][4]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/events/
[2]: https://app.datadoghq.com/event/explorer
[3]: https://github.com/DataDog/integrations-internal-core/blob/main/airbrake/metadata.csv
[4]: https://docs.datadoghq.com/ko/help/