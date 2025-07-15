---
app_id: adaptive-shield
app_uuid: 0c72bf61-1de6-4408-8a24-86f8e3413e07
assets:
  dashboards:
    adaptive_shield_overview: assets/dashboards/adaptive_shield_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10310
    source_type_name: adaptive_shield
  oauth: assets/oauth_clients.json
author:
  homepage: https://www.adaptive-shield.com/
  name: Adaptive Shield
  sales_email: info@adaptive-shield.com
  support_email: support@adaptive-shield.com
categories:
- cloud
- 보안
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/adaptive_shield/README.md
display_on_public_website: true
draft: false
git_integration_title: adaptive_shield
integration_id: adaptive-shield
integration_title: Adaptive Shield
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: adaptive_shield
public_title: Adaptive Shield
short_description: SaaS 상태 경고 추적
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - "\b카테고리::클라우드"
  - 카테고리::보안
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: SaaS 상태 경고 추적
  media:
  - caption: Adaptive Shield의 SaaS 환경 상태
    image_url: images/posture.png
    media_type: image
  - caption: Adaptive Shield의 SaaS 구성에 대한 보안 검사
    image_url: images/security_checks.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Adaptive Shield
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->
## 개요
Office 365, Slack, Zoom 및 Salesforce와 같은 SaaS 앱은 비즈니스 운영에 일반적으로 사용되지만 종종 새로운 보안 문제가 발생합니다. Adaptive Shield의 SaaS Security Posture Management 솔루션(SSPM)은 비즈니스에 중요한 SaaS 애플리케이션에 대해 심층적이고 지속적이며 자동화된 모니터링 및 관리 기능을 제공하여 보안 문제를 사전에 예방할 수 있도록 합니다. Adaptive Shield는 SaaS 앱과 통합하여 보안 팀이 SaaS 앱을 제어할 수 있도록 지원하여 보안 정책을 강화하고 위험을 줄입니다.

Adaptive Shield 통합을 사용하면 구성 드리프트, 통합 실패 및 보안 검사 저하와 같은 SaaS 상태 경고를 Datadog 이벤트로 추적하고 모니터링할 수 있습니다.

## 설정

1. 이 통합 승인을 시작하려면 **Connect Accounts*를 클릭합니다. 그런 다음 [Adaptive Shield][1]로 리디렉션됩니다.
2. 별칭 이름을 제공합니다.
3. 관련 Datadog 사이트를 선택합니다.
4. **OAuth**를 클릭하여 승인합니다.


## 삭제

이 통합을 제거하면 이전 인증이 취소됩니다.

또한 [API 키 관리 페이지][2]에서 통합 이름을 검색하여 이 통합 키와 관련된 모든 API 키가 비활성화되었는지 확인하세요.


## 지원
도움이 필요하신가요? [Adaptive Shield 지원팀][3]에 문의하세요.

[1]: https://dashboard.adaptive-shield.com/settings/alerts/add/63230b73c9624b93dadf38d4
[2]: https://app.datadoghq.com/organization-settings/api-keys?filter=Adaptive%20Shield
[3]: mailto:support@adaptive-shield.com