---
app_id: drata-integration
app_uuid: c06736af-282f-4b3c-a9e6-2b049dbc0e2a
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10311
    source_type_name: Drata
author:
  homepage: https://www.drata.com/
  name: Drata
  sales_email: sales@drata.com
  support_email: support@drata.com
categories:
- compliance
- 로그 수집
- security
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/drata/README.md
display_on_public_website: true
draft: false
git_integration_title: drata
integration_id: drata-integration
integration_title: Drata
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: drata
public_title: Drata
short_description: Datadog 컴플라이언스 정보를 Drata에 주입
supported_os:
- linux
- 윈도우즈(Windows)
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Compliance
  - Category::Log Collection
  - Category::Security
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Datadog 컴플라이언스 정보를 Drata에 주입
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Drata
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

Drata는 회사의 보안 제어에 대한 증거를 지속적으로 모니터링하고 수집하며, 컴플라이언스 워크플로를 엔드 투 엔드로 간소화하여 감사 준비를 보장하는 보안 및 컴플라이언스 자동화 플랫폼입니다.

이 통합을 통해 [Drata][1] 고객은 API 통합을 통해 Datadog의 컴플라이언스 관련 로그 및 이벤트를 Drata로 전달할 수 있습니다.

## 설정

이 통합을 설정하려면 활성 [Drata 계정][2]이 있어야 합니다. 또한 Datadog에 적절한 [관리자 권한][3]이 있어야 합니다.

### 설치

1. 이 통합을 설치하려면 API 및 앱 키를 생성해야 합니다.
2. Datadog에서 서비스 계정을 생성하고 "Datadog Read Only" 역할을 적용하여 제한된 권한을 부여하는 것이 좋습니다.
3. Datadog에서 [API 키 생성][4]을 위해 조직 설정으로 이동합니다. 키에 `Drata`와 같은 의미 있는 이름을 지정하세요.
4. API `Key`를 복사하고 저장합니다.
5. 조직 설정 내에서 [애플리케이션 키를 생성][5]합니다.
6. 애플리케이션 키를 복사하여 저장합니다.
7. API 키와 애플리케이션 키를 Datadog용 Drata 연결 서랍에 붙여넣습니다.
8. Drata는 Datadog API의 사용자 및 구성 데이터 동기화를 시작하고 컴플라이언스 모니터가 실패하면 알려줍니다.


## 지원

도움이 필요하신가요? [Datadog 지원팀][6] 또는 [support@drata.com][7]에 문의하세요.


[1]: https://www.drata.com
[2]: https://drata.com/demo
[3]: https://docs.datadoghq.com/ko/account_management/rbac/permissions/
[4]: https://docs.datadoghq.com/ko/account_management/api-app-keys/#add-an-api-key-or-client-token
[5]: https://docs.datadoghq.com/ko/account_management/api-app-keys/#add-application-keys
[6]: https://docs.datadoghq.com/ko/help/
[7]: mailto:support@drata.com