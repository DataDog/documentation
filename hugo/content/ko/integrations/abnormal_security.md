---
app_id: abnormal-security
app_uuid: 15f718fe-3819-4305-9681-ce80974c1b4b
assets:
  dashboards:
    abnormal-security-overview: assets/dashboards/abnormal_security_overview.json
  integration:
    auto_install: true
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 21175237
    source_type_name: Abnormal Security
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- security
- 로그 수집
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: abnormal_security
integration_id: abnormal-security
integration_title: Abnormal Security
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: abnormal_security
public_title: Abnormal Security
short_description: Abnormal Security를 통합하여 위협, 사례, 감사 로그를 확보하세요.
supported_os:
- linux
- 윈도우즈(Windows)
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Security
  - Category::Log Collection
  - Offering::Integration
  configuration: README.md#Setup
  description: Abnormal Security를 통합하여 위협, 사례, 감사 로그를 확보하세요.
  media:
  - caption: Abnormal 개요 대시보드
    image_url: images/overview-dashboard.png
    media_type: 이미지
  overview: README.md#Overview
  support: README.md#Support
  title: Abnormal Security
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 개요

Abnormal Security는 사람의 행동을 이해하는 플랫폼을 사용하여 포괄적인 이메일 보호 기능을 제공합니다. 피싱, 소셜 엔지니어링, 계정 탈취 등 사람의 행동을 악용하는 공격으로부터 보호합니다.

Datadog와 Abnormal Security를 통합하면 [Abnormal Security의 API][1]를 사용하여 로그를 수집하므로 세 가지 유형의 로그를 생성할 수 있습니다.
- **Threat Logs**: 위협 로그에는 조직, 데이터 또는 직원에게 해를 끼칠 수 있는 모든 악의적인 활동이나 공격이 포함됩니다.
- **Case Logs**: 사례 로그에는 Abnormal Security에서 식별한 이상 사례가 포함됩니다. 이러한 사례에는 일반적으로 관련 위협이 포함됩니다.
- **Audit Logs**: 이 로그에는 Abnormal Portal에서 실행한 작업이 포함됩니다.


## 설정

### 구성

1. [Abnormal Security Account][2]에 로그인합니다.
2. **Abnormal REST API**를 클릭합니다.
3. Abnormal Portal에서 인증 토큰을 검색합니다.

이 토큰은 Abnormal에서 탐지된 위협, 사례, 감사 로그를 확인하는 데 사용됩니다.

### 검증


## 수집한 데이터

### 메트릭

Abnormal Security 통합은 메트릭을 포함하지 않습니다.

### 로그 수집

Abnormal Security 인시던트, 사례, 감사 로그는 `abnormal-security` 소스 아래에 표시됩니다.

### 이벤트

Abnormal Security 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Abnormal Security 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: https://app.swaggerhub.com/apis/abnormal-security/abx/1.4.3#/info
[2]: https://portal.abnormalsecurity.com/home/settings/integrations
[3]: https://docs.datadoghq.com/ko/help/