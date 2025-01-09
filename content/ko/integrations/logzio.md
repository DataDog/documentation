---
app_id: logz-io
app_uuid: a637cc4e-f31f-4b35-9fff-76a8e7557d66
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: logz-io.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10009
    source_type_name: Logz.io
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Logz.io
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories:
- event management
- ai/ml
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/logzio/README.md
display_on_public_website: true
draft: false
git_integration_title: logzio
integration_id: logz-io
integration_title: Logz.io
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: logzio
public_title: Logz.io
short_description: AI 기반 ELK로 서비스
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Category::Event Management
  - Category:AI/ML
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: AI 기반 ELK로 서비스
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Logz.io
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

Logz.io는 로그, 메트릭, 트레이스를 수집하고 분석하는 통합 SaaS 플랫폼입니다. 이 플랫폼에는 트러블슈팅, 응답 시간 단축 및 비용 관리를 개선하는 AI 기능이 포함되어 있습니다.

이 통합을 통해 다음을 수행할 수 있습니다.

- Datadog에서 실시간 Logz.io 알림 보기

![import_alert_from_logz][1]

- 알림 이벤트를 대시보드에 통합하여 메트릭과의 연계를 확인합니다.

![dashboard][2]

## 설정

### 설치

다음 단계에 따라 알림을 Datadog로 가져옵니다.

1. [Datadog API 키][3]를 사용하여 Logz.io에서 새 알림 엔드포인트를 생성합니다.
2. 특정 쿼리에 대한 새 알림을 Logz.io에서 생성합니다.

자세한 설정 설명은 [로그를 남기다 Logz.io와의 상관관계 및 Datadog][4]를 참조하세요.

## 수집한 데이터

### 메트릭

Logz.io 점검에는 메트릭이 포함되어 있지 않습니다.

### 이벤트

Logz.io 점검에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

Logz.io 점검에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/logzio/images/import_alert_from_logz.jpg
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/logzio/images/dashboard.png
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: http://logz.io/blog/log-correlation-datadog
[5]: https://docs.datadoghq.com/ko/help/