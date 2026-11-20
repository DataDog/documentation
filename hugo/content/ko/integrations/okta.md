---
app_id: okta
app_uuid: 1bbd0367-66bf-41c9-be58-8f3313afd0e5
assets:
  dashboards:
    Okta-Overview: assets/dashboards/Okta-Overview_dashboard.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 236
    source_type_name: Okta
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 로그 수집
- 보안
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: okta
integration_id: okta
integration_title: Okta
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: okta
public_title: Okta
short_description: Okta 보안 이벤트 로그를 Datadog에 통합합니다.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Security
  - Offering::Integration
  configuration: README.md#Setup
  description: Okta 보안 이벤트 로그를 Datadog에 통합합니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Okta
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 개요

Okta를 연결하여 Okta 시스템 이벤트 로그를 Datadog 로그 관리에 통합합니다.

본 로그로 모든 애플리케이션, 사용자 등의 액세스 및 라이프사이클 이벤트에 대한 가시성을 증진합니다. Datadog Okta 통합으로 애플리케이션 위협을 탐지하고, 사용자 활동을 추적하고, 인증 및 권한 부여 문제를 디버깅하고, 규정 준수를 위한 감사 추적을 생성합니다.

Datadog에서 추적할 수 있는 모든 Okta 이벤트는 [Okta 이벤트 유형 API][1]를 참조하세요.

## SAML포함 SSO

싱글 사인온에 대해서는 [Okta를 SAML IdP로 설정하기][2]를 참조하세요.

## 설정

### 설정

Datadog Okta 통합을 활성하는 방법에는 Datadog 앱의 자격 증명으로 OAuth를 사용하거나 API 키를 사용하는 두 가지가 있습니다.

두 방법 모두 다음 필드가 필요합니다.

| 파라미터            | 설명                                                                                                                                                      |
|----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 계정 이름         | Datadog에서 Okta 계정을 식별합니다. 계정 이름에는 영숫자와 밑줄만 포함할 수 있습니다.                                              |
| 도메인               | Okta 계정에서 로그를 요청하는 데 사용되는 고유 계정 도메인입니다. URL은 반드시 유효해야 하고 `https://<your_domain>.okta.com`로 시작해야 합니다.                    |
| 인증 방법 | Okta로부터 인증을 받는 방법을 지정합니다. 계정 API 키 또는 Okta 통합 네트워크의 Datadog 앱 자격 증명을 사용하는 두 가지 방법이 있습니다. |


OAuth를 사용하여 본 통합을 활성화하는 방법

1. Okta에서 **애플리케이션** > **API 서비스 통합 ** > **통합 추가** > **Datadog**으로 이동합니다.
2. 설치 시 클라이언트 ID와 클라이언트 비밀 자격 증명이 제공됩니다. 해당 자격 증명을 복사합니다.
3. Datadog에서 [Okta 통합 타일][3]을 엽니다.
4. **설정** 탭에서 **계정 추가**를 클릭하고 다음 정보를 입력합니다.

    | 파라미터           | 설명                                                                                                                                                      |
    |----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
    | 클라이언트 ID            | Okta가 제공한 클라이언트 ID입니다.                                                                                                                                  |
    | 클라이언트 시크릿        | Okta가 제공한 클라이언트 시크릿입니다.                                                                                                                              |

5. **저장**을 클릭합니다.


API 키를 사용하여 본 통합을 활성화하는 방법

1. Okta에서 **보안** > **API** > **토큰**으로 이동하여 새 API 토큰을 추가합니다.
2. Datadog에서 [Okta 통합 타일][3]을 엽니다.
3. **설정** 탭에서 **계정 추가**를 클릭하고 다음 정보를 입력합니다.

    | 파라미터 | 설명                           |
    |-----------|---------------------------------------|
    | API 키   | Okta 계정의 API 토큰입니다. 최소 요구 권한은 읽기 전용 관리자입니다. |

4. **저장**을 클릭합니다.

## 수집한 데이터

### 메트릭

Okta 통합은 메트릭을 포함하지 않습니다.

### 이벤트

Okta 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

Okta 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원 팀][4]에 문의하세요.

[1]: https://developer.okta.com/docs/reference/api/event-types/
[2]: https://docs.datadoghq.com/ko/account_management/saml/okta/
[3]: https://app.datadoghq.com/account/settings#integrations/okta
[4]: https://docs.datadoghq.com/ko/help/