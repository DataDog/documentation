---
app_id: unitq
app_uuid: 7781542f-b4a2-40e2-86cd-9987980a0ead
assets:
  dashboards:
    unitQ: assets/dashboards/unitq_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: unitq.user_feedback
      metadata_path: metadata.csv
      prefix: unitq.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10303
    source_type_name: unitQ
author:
  homepage: https://www.unitq.com/
  name: unitQ
  sales_email: hello@unitq.com
  support_email: hello@unitq.com
categories:
- 메트릭
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/unitq/README.md
display_on_public_website: true
draft: false
git_integration_title: unitq
integration_id: unitq
integration_title: unitQ
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: unitq
public_title: unitQ
short_description: 사용자 피드백을 최대한 활용해 제품 품질을 개선하세요.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Metrics
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: 사용자 피드백을 최대한 활용해 제품 품질을 개선하세요.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: unitQ
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

unitQ는 사용자 피드백을 한 곳에서 검색할 수 있는 통합 플랫폼입니다. unitQ의 AI 기술은 사용자 피드백에서 데이터 기반 인사이트를 도출하여 제품 품질 향상에 도움을 줍니다.

unitQ Datadog 통합을 통해 unitQ에서 Datadog으로 메트릭을 전송할 수 있습니다. unitQ 메트릭을 Datadog에 전달하면 Datadog의 그래프 및 알림 기능을 활용하여 사용자 피드백을 추적하고 고객을 만족시킬 수 있는 인사이트를 얻을 수 있습니다.

## 설정

### 설정

1. unitQ에서 **Integrations**로 이동합니다.
2. Datadog 타일을 선택하세요
3. 다음 세부 정보를 입력하세요.
   - **Datadog 사이트**:
     - `https://api.datadoghq.com` 입력: Datadog US 지역인 경우
     - `https://api.datadoghq.eu` 입력: Datadog EU 지역인 경우 
   - **API Key**: [Datadog API 키][1]를 입력하세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "unitq" >}}


### 서비스 점검

unitQ는 서비스 점검을 포함하지 않습니다.

### 이벤트

unitQ는 이벤트를 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://github.com/DataDog/integrations-extras/blob/master/unitq/metadata.csv
[3]: https://docs.datadoghq.com/ko/help/