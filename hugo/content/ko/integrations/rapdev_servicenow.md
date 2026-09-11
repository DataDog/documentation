---
algolia:
  subcategory: Marketplace 통합
app_id: rapdev-servicenow
app_uuid: 50d76130-5970-43e1-a055-0cd5d681d9b7
assets:
  dashboards:
    RapDev ServiceNow: assets/dashboards/servicenow.json
    RapDev ServiceNow ITSM: assets/dashboards/servicenow_itsm.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: rapdev.servicenow.record
      metadata_path: metadata.csv
      prefix: rapdev.servicenow.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10184
    source_type_name: RapDev ServiceNow
  logs: {}
  monitors:
    ServiceNow Records Pending Approval: assets/monitors/servicenow_pending_approval_monitor.json
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- 클라우드
- 인시던트
- marketplace
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_servicenow
integration_id: rapdev-servicenow
integration_title: ServiceNow 성능 모니터링
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_servicenow
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.servicenow
  product_id: servicenow
  short_description: 인스턴스당 유닛 비용
  tag: instance_name
  unit_label: ServiceNow 인스턴스
  unit_price: 1000
public_title: ServiceNow 성능 모니터링
short_description: ServiceNow 인스턴스 성능 및 ITSM 레코드 모니터링
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Incidents
  - Category::Marketplace
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: ServiceNow 인스턴스 성능 및 ITSM 레코드 모니터링
  media:
  - caption: ServiceNow 인스턴스 성능 대시보드
    image_url: images/1.png
    media_type: image
  - caption: ServiceNow ITSM 대시보드 레코드 통계 1/2
    image_url: images/2.png
    media_type: image
  - caption: ServiceNow ITSM 대시보드 레코드 통계 2/2
    image_url: images/3.png
    media_type: image
  - caption: ServiceNow ITSM 대시보드 SLA 통계
    image_url: images/4.png
    media_type: image
  - caption: ServiceNow ITSM 대시보드 테이블 연결 통계
    image_url: images/5.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: ServiceNow 성능 모니터링
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->
## 개요

ServiceNow 성능 모니터링 통합은 트랜잭션, 작업, 데이터베이스 및 캐시 메트릭에 대한 풍부한 인사이트를 통해 ServiceNow 인스턴스의 서비스 상태 및 성능을 모니터링합니다. 아울러 본 통합은 오픈 ITSM 레코드를 추적하여 SLA와 비즈니스에 영향을 미치는 레코드의 수명 모두에 대해 실행 가능한 데이터 포인트를 제공합니다.

## 지원
지원 또는 기능 요청은 다음 채널을 통해 RapDev.io에 문의하세요.

 - 이메일: support@rapdev.io
 - 채팅: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
 - 전화: 855-857-0222

---

Made with ❤️ in Boston

*원하시는 통합을 찾을 수 없나요? 조직에 필요한 중요한 기능이 누락되었나요? [요청 사항](mailto:support@rapdev.io)을 보내주시면 반영하도록 하겠습니다.*

---
이 애플리케이션은 Datadog Marketplace를 통해 제공되며 Datadog 기술 파트너의 지원을 받습니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/rapdev-servicenow" target="_blank">Marketplace에서 애플리케이션을 구매하세요</a>.