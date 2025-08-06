---
algolia:
  subcategory: Marketplace 통합
app_id: rapdev-validator
app_uuid: d66f715a-4218-40f0-af35-a147c45c1d11
assets:
  dashboards:
    RapDev Validator Dashboard: assets/dashboards/rapdev_validator_dashboard.json
    RapDev Validator Host Dashboard: assets/dashboards/host_dashboard.json
    RapDev Validator Synthetic Dashboard: assets/dashboards/synthetic_dashboard.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.validator.agent.installed
      metadata_path: metadata.csv
      prefix: rapdev.validator.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10183
    source_type_name: RapDev Validator
  logs: {}
  monitors:
    Host has a non-compliant value for their tag key: assets/monitors/host_non_compliant_value.json
    Host is missing their required tag key: assets/monitors/host_missing_tag_key.json
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- compliance
- 설정 및 배포
- marketplace
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_validator
integration_id: rapdev-validator
integration_title: Validator 태그
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_validator
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: validator
  short_description: 본 통합에 대한 정액제 요금
  unit_price: 500
public_title: Validator 태그
short_description: DD 환경에서 모니터링 태그 유효성 검사 및 에이전트 규정 준수 보장
supported_os:
- linux
- 윈도우즈(Windows)
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Compliance
  - Category::Configuration & Deployment
  - Category::Marketplace
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: DD 환경에서 모니터링 태그 유효성 검사 및 에이전트 규정 준수 보장
  media:
  - caption: Validator 대시보드
    image_url: images/validator.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Validator 태그
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요
RapDev Validator는 Datadog 환경에서 모니터링 태그 및 에이전트 규정 준수 문제를 해결합니다. 본 통합은 환경 태깅 전략에 따라 허용되는 것으로 간주하는 태그 키와 그 값의 목록을 허용하고 이를 메트릭 및 서비스 점검으로 Datadog 인스턴스에 보고합니다. 이렇게 하면 환경의 호스트에 올바른 태그가 적용되었는지 여부를 표시할 수 있습니다.

### 대시보드
1. RapDev Validator 호스트 대시보드
2. RapDev Validator 신서틱(Synthetic) 대시보드
3. RapDev Validator 대시보드

### 모니터링
1. 호스트에 필수 태그 키가 누락됨
2. 호스트에 태그 키 비준수 값이 있음

## 지원
지원 또는 기능 요청은 다음 채널을 통해 RapDev.io에 문의해 주세요.

- 이메일: support@rapdev.io
- 채팅: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
- 전화: 855-857-0222

---
Made with ❤️ in Boston

*원하시는 통합을 찾을 수 없나요? 조직에 필요한 중요한 기능이 누락되었나요? [요청 사항](mailto:support@rapdev.io)을 보내주시면 반영하도록 하겠습니다.

---
이 애플리케이션은 Datadog Marketplace를 통해 제공되며 Datadog 기술 파트너의 지원을 받습니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/rapdev-validator" target="_blank">Marketplace에서 애플리케이션을 구매하세요</a>.