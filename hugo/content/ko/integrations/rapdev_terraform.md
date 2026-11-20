---
algolia:
  subcategory: Marketplace 통합
app_id: rapdev-terraform
app_uuid: d7240832-9c24-4fc0-9a02-916bc57882c1
assets:
  dashboards:
    RapDev Terraform Dashboard: assets/dashboards/rapdev_terraform_overview.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.terraform.org.count
      metadata_path: metadata.csv
      prefix: rapdev.terraform.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10193
    source_type_name: RapDev Terraform
  logs: {}
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- 설정 및 배포
- 개발 툴
- marketplace
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_terraform
integration_id: rapdev-terraform
integration_title: Terraform
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_terraform
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: terraform
  short_description: 본 통합에 대한 정액제 요금
  unit_price: 100
public_title: Terraform
short_description: Terraform 계정 및 실패한 실행 모니터링
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Configuration & Deployment
  - Category::Developer Tools
  - Category::Marketplace
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Terraform 계정 및 실패한 실행 모니터링
  media:
  - caption: Terraform 조직 및 워크스페이스 실행
    image_url: images/1.jpg
    media_type: image
  - caption: Terraform 조직 토큰 및 권한
    image_url: images/2.jpg
    media_type: image
  - caption: Terraform 권한 감사 및 에이전트
    image_url: images/3.jpg
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Terraform
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요

Terraform 통합을 통해 조직은 Terraform 계정을 적극적으로 모니터링하여 얼마나 잘 작동하는지 또 얼마나 자주 사용되는지 보다 잘 이해할 수 있습니다. 본 통합은 권한 감사를 제공하는 수준까지 확장됩니다.

### 대시보드

1. RapDev Terraform 대시보드

## 지원
지원 또는 기능 요청은 다음 채널을 통해 RapDev.io에 문의해 주세요.

- 지원: support@rapdev.io
- 영업 팀: sales@rapdev.io
- 채팅: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
- 전화: 855-857-0222

---
Made with ❤️ in Boston

*찾고 계신 통합 이 아닌가요? 조직에 꼭 필요한 기능이 없나요? RapDev에 [메시지](mailto:support@rapdev.io)를 남겨주시면 빌드해 드릴게요!!!*.

[1]: https://www.terraform.io/docs/cloud/users-teams-organizations/users.html#api-tokens
[2]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information

---
이 애플리케이션은 Datadog Marketplace를 통해 제공되며 Datadog 기술 파트너의 지원을 받습니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/rapdev-terraform" target="_blank">Marketplace에서 애플리케이션을 구매하세요</a>.