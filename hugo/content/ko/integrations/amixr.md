---
app_id: amixr
app_uuid: 051b4bbe-d7cc-46bf-9a66-169ab7d5a4aa
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: amixr.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10103
    source_type_name: Amixr
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Amixr
  sales_email: ildar@amixr.io
  support_email: ildar@amixr.io
categories:
- alerting
- 자동화
- 협업
- incidents
- 알림
- orchestration
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/amixr/README.md
display_on_public_website: true
draft: false
git_integration_title: amixr
integration_id: amixr
integration_title: Amixr
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amixr
public_title: Amixr
short_description: 뛰어난 Slack 통합을 통한 개발자 친화적인 알림 관리
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Alerting
  - Category::Automation
  - Category::Collaboration
  - Category::Incidents
  - Category::Notifications
  - Category::Orchestration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: 뛰어난 Slack 통합을 통한 개발자 친화적인 알림 관리
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Amixr
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

Amixr를 사용하여 Slack 통합으로 알림을 관리하세요.

- Datadog에서 알림 및 기타 이벤트를 수집하고 분석
- Google Calendar 또는 Slack을 사용하여 온콜 로테이션 설정
- 자동 에스컬레이션 체인 구성
- 전화 통화 및 SMS로 알림 수신
- GitOps로 인시던트 관리 조정

![Amixr_Interface][1]

## 설정

### 설치

서버에 추가 설치가 필요하지 않습니다.

### 설정

Amixr에서:

1. *Settings > Connect New Monitorings > Datadog > How to connect*로 이동합니다.
2. Datadog 웹훅 URL을 복사합니다.

Datadog에서:

1. 사이드바에서 **Integrations** 페이지로 이동합니다.
2. 검색창에서 **웹훅**을 검색합니다.
3. 통합 이름을 입력합니다(예: `amixr-alerts-prod`).
4. 위 단계의 웹훅 URL을 붙여넣습니다.
5. Save 버튼을 클릭합니다.

### 검증

Datadog에서:

1. 사이드바에서 **Events** 페이지로 이동합니다.
2. `@webhook-<integration name><YOUR TEXT HERE>`을 입력합니다 (예: `@webhook-amixr-alerts-prod test alert`).
3. Post 버튼을 클릭합니다.

Amixr에서:

1. 사이드바에서 **Incidents**로 이동하여 알림이 수신되었는지 확인합니다.

## 수집한 데이터

### 메트릭

Amixr 통합에는 메트릭이 포함되어 있지 않습니다.

### 서비스 점검

 Amixr 통합에는 서비스 점검이 포함되어 있지 않습니다.

### 이벤트

Amixr 통합에는 이벤트가 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Amixr 고객지원][2]에 문의하세요.

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/amixr/images/amixr-interface.png
[2]: https://amixr.io/support/