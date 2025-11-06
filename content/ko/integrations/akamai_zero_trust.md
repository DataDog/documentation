---
app_id: akamai-zero-trust
app_uuid: d5f7fcaf-fab5-4944-af31-6df7f2efccb9
assets:
  dashboards:
    akamai-zero-trust-overview: assets/dashboards/akamai_zero_trust_overview.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - akamai.eaa.active_dialout_count
      metadata_path: metadata.csv
      prefix: akamai.eaa.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10423
    source_type_name: Akamai Zero Trust
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 메트릭
- log collection
- security
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: akamai_zero_trust
integration_id: akamai-zero-trust
integration_title: Akamai Zero Trust
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: akamai_zero_trust
public_title: Akamai Zero Trust
short_description: Akamai SIA 및 EAA 제품과 통합
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Metrics
  - Category::Log Collection
  - Category::Security
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - 제공::통합
  configuration: README.md#Setup
  description: Akamai SIA 및 EAA 제품과 통합
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Akamai Zero Trust
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 개요

Akamai Zero Trust에는 Enterprise Application Access와 Secure Internet Access가 모두 포함됩니다.

Akamai Enterprise Application Access는 신원 및 컨텍스트를 기반으로 프라이빗 애플리케이션에 대한 정밀한 접근을 제공하는 Zero Trust Network Access 솔루션입니다. 신원 기반 정책과 사용자 위치, 시간, 디바이스 보안 등의 실시간 데이터를 활용하여 사용자가 필요한 애플리케이션에만 접근할 수 있도록 하며, 네트워크 수준의 접근은 차단합니다. Akamai MFA와 완벽하게 연동되어 강력한 사용자 인증을 제공합니다.

Secure Internet Access Enterprise는 클라우드 기반 표적 위협 보호 솔루션입니다. DNS 및 웹 기반 위협으로부터 조직을 보호하고, 인증 및 허용 가능한 사용 정책을 시행하며, 사용자 인터넷 접근을 감사하는 기능을 제공합니다.

Akamai Zero Trust는 Secure Internet Access (SIA)와 Enterprise Application Access (EAA)에 대한 로그를 수집합니다. 또한 SIA에 대한 수집기 메트릭도 수집할 수 있습니다.

## 설정

### 구성

1. [Akamai 계정][1]에 로그인합니다.
2. **Identity and Access Management**를 검색합니다.
3. **Create API Client**를 클릭합니다.
4. **Select APIs**에서 **SIA and EAA**를 검색하고 **READ-ONLY** 액세스를 제공합니다.
5. API 클라이언트를 만든 후 **Create Credential**을 클릭하여 크리덴셜 세트를 생성합니다.
6. 생성된 크리덴셜에서 **Access Token, Client Token, Host, Client Secret**을 복사합니다.
7. EAA 로그와 메트릭을 수집하려면 해당 계정의 **Contract ID**를 제공합니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "akamai_zero_trust" >}}


### 로그

Akamai SIA 및 EAA 이벤트는 소스 `akamai_zero_trust` 아래에 로그로 표시됩니다.

### 서비스 점검

Akamai Zero Trust는 서비스 점검을 포함하지 않습니다.

### 이벤트

Akamai Zero Trust는 이벤트를 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Datadog Cloud SIEM을 사용하여 Akamai Zero Trust 및 Application Security 모니터링][4]

[1]: https://control.akamai.com/apps/auth/#/login
[2]: https://github.com/DataDog/integrations-internal-core/blob/main/akamai_zero_trust/metadata.csv
[3]: https://docs.datadoghq.com/ko/help/
[4]: https://www.datadoghq.com/blog/akamai-zero-trust-application-security/