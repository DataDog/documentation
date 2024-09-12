---
app_id: honeybadger
app_uuid: 385c386e-6394-41f4-8c92-5944e6b203f5
assets:
  integration:
    auto_install: true
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 130
    source_type_name: Honeybadger
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- event management
- issue tracking
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: honeybadger
integration_id: honeybadger
integration_title: Honeybadger
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: honeybadger
public_title: Honeybadger
short_description: 이벤트 스트림의 Honeybadger에서 예외 사항을 확인하고, 검색하고 논의하세요.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Event Management
  - Category::Issue Tracking
  - Offering::Integration
  configuration: README.md#Setup
  description: 이벤트 스트림의 Honeybadger에서 예외 사항을 확인하고, 검색하고 논의하세요.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Honeybadger
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 개요

Honeybadger는 예외 및 가동 시간 모니터링을 제공하여 웹 앱의 오류를 방지합니다. Honeybadger를 Datadog에 연결하여 Datadog 이벤트 스트림 이벤트 스트림에서 Honeybadger 알림을 받으세요.

## 설정

### 설치

Honeybadger에서 오류를 캡처하려면

1. Honeybadger [프로젝트 목록][1]를 엽니다.
2. 모니터링하려는 프로젝트의 "설정" 을 클릭합니다.
3. "알림 및 통합"을 클릭합니다.
4. "Datadog"를 새 통합으로 선택합니다.
5. [API 키][2]를 추가합니다.
6. 통합을 저장합니다.
7. [Honeybadger 통합 타일][3]에서 **설치 통합** 버튼을 클릭합니다.

## 수집한 데이터

### 메트릭

Honeybadger 통합에는 메트릭이 포함되어 있지 않습니다.

### 이벤트

Honeybadger 통합 에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

Honeybadger 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원 팀][4]에 문의하세요.

[1]: https://app.honeybadger.io/users/sign_in
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/account/settings#integrations/honeybadger
[4]: https://docs.datadoghq.com/ko/help/