---
app_id: cisco-secure-email-threat-defense
app_uuid: 9776e6c8-2031-4dda-98b5-3628b181625b
assets:
  dashboards:
    Cisco Secure Email Threat Defense: assets/dashboards/cisco_secure_email_threat_defense.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 21617758
    source_type_name: Cisco Secure Email Threat Defense
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 로그 수집
- security
- 클라우드
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/cisco_secure_email_threat_defense/README.md
display_on_public_website: true
draft: false
git_integration_title: cisco_secure_email_threat_defense
integration_id: cisco-secure-email-threat-defense
integration_title: Cisco Secure Email Threat Defense
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: cisco_secure_email_threat_defense
public_title: Cisco Secure Email Threat Defense
short_description: Cisco Secure Email Threat Defense 메시지 로그에 관한 인사이트를 얻으세요.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Security
  - Category::Cloud
  - Offering::Integration
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Cisco Secure Email Threat Defense 메시지 로그에 대한 인사이트를 얻으세요.
  media:
  - caption: Cisco Secure Email Threat Defense
    image_url: images/cisco_secure_email_threat_defense.png
    media_type: 이미지
  overview: README.md#Overview
  support: README.md#Support
  title: Cisco Secure Email Threat Defense
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->
## 개요

[Cisco Secure Email Threat Defense][1]는 Microsoft 365를 위한 통합 클라우드 기반 보안 솔루션입니다. 간편한 배포, 쉬운 공격 대응, 인바운드, 아웃바운드 및 내부 사용자 간 메시지에 탁월한 가시성을 제공합니다.

본 통합은 다음 로그를 수집합니다.
- Message: Message 로그는 발신자, 수신자, 타임스탬프, 제목, 위협 관련 데이터 등 이메일 커뮤니케이션에 관한 정보를 자세히 제공하여 분석 및 모니터링이 가능하도록 합니다.

Cisco Secure Email Threat Defense 통합 기능은 Cisco Secure Email Threat Defense의 메시지 로그에 관한 인사이트를 확보하고 필요한 조치를 취할 수 있도록 기본 대시보드를 제공합니다. 또한, 잠재적인 보안 위협을 효과적으로 모니터링하고 대응할 수 있도록 기본 탐지 규칙도 제공합니다.

**주의사항**: 개인 정보를 포함한 데이터가 수집될 수 있는 이 통합 기능의 사용은 Datadog과의 계약에 따라 이루어집니다. Cisco는 통합 기능을 사용함으로써 전송되는 개인 정보를 포함한 모든 최종 사용자 정보의 개인정보보호, 보안 또는 무결성에 관해 책임을 지지 않습니다.

## 설정

### Cisco Secure Email Threat Defense에서 API 자격 증명 생성

1. Cisco Secure Email Threat Defense UI에 로그인합니다.
2. **Administration**으로 이동하여 **API Clients** 탭을 선택합니다.
3. **Add New Client**를 클릭합니다.
4. **Client Name**을 입력하고 필요시 설명을 입력합니다.
5. **Submit**을 클릭합니다. 이렇게 하면 **Client ID**와 **Client Password**가 생성됩니다.
6. **API 키** 섹션에서 API 키를 검색합니다.

### Cisco Secure Email Threat Defense 계정을 Datadog에 연결

1. Cisco Secure Email Threat Defense 자격 증명 추가

    | 파라미터 | 설명 |
    | ---------- | ----------- |
    | Host Name | Host name은 Cisco Secure Email Threat Defense 서버가 위치한 지역을 기준으로 합니다. 자세한 내용은 시스템 관리자에게 문의하세요. |
    | Client ID | Cisco Secure Email Threat Defense 계정의 Client ID |
    | Client Password | Cisco Secure Email Threat Defense 계정의 Client 비밀번호. |
    | API Key | Cisco Secure Email Threat Defense 계정의 API 키. |
    | Verdict Delay | 이벤트는 Verdict Delay에 지정된 시간(분)에 따라 지연 후 가져옴. |


2. **Save** 버튼을 클릭하여 설정을 저장합니다.


## 수집한 데이터

### 로그

Cisco Secure Email Threat Defense 통합 기능은 Cisco Secure Email Threat Defense 메시지 로그를 수집하여 Datadog에 전달합니다. 이 통합은 사기, 악성, 피싱, BEC, 스팸, 그레이메일, 중립 평결 값을 가진 메시지를 수집합니다.

**참고**: 이벤트는 Verdict Delay에 지정된 시간에 따라 지연 후 수집됩니다. 이 지연은 로그에 사후 평결이 포함되도록 하기 위해 필요합니다. 다만, 업데이트에 소요되는 시간은 달라질 수 있으므로, 이 시간 안에 모든 사후 평결이 반드시 반영된다는 것을 보장하지는 않습니다. 완전한 평결 정보를 확인하려면 Cisco Secure Email Threat Defense 시스템에 로그인하세요.

### 메트릭

Cisco Secure Email Threat Defense 통합은 메트릭을 포함하지 않습니다.

### 이벤트

Cisco Secure Email Threat Defense 통합은 이벤트를 포함하지 않습니다.

## 지원

추가 지원이 필요하면 [Datadog 지원팀][2]에 문의하세요.

[1]: https://www.cisco.com/site/us/en/products/security/secure-email/index.html?dtid=osscdc000283
[2]: https://docs.datadoghq.com/ko/help/