---
algolia:
  subcategory: Marketplace 통합
app_id: moogsoft
app_uuid: db3d32c6-1127-4bd5-b270-01aa573616b7
assets:
  dashboards:
    Moogsoft Overview: assets/dashboards/moogsoft_overview.json
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: moogsoft.incident.count
      metadata_path: metadata.csv
      prefix: moogsoft.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10151
    source_type_name: 모그소프트
author:
  homepage: https://moogsoft.com
  name: 모그소프트
  sales_email: subscriptions@moogsoft.com
  support_email: support@moogsoft.com
  vendor_id: moogsoft
categories:
- 자동화
- 인시던트
- marketplace
- 알림
- ai/ml
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: moogsoft
integration_id: moogsoft
integration_title: 모그소프트
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: moogsoft
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: Datadog.marketplace.moogsoft
  product_id: cloud
  short_description: 이벤트/메트릭 볼륨에 따른 가격 계층
  tag: 코어
  unit_label: Moogsoft 이벤트 또는 500 Moogsoft 메트릭
  unit_price: 0.05
public_title: 모그소프트
short_description: 고급 셀프 서비스 AI 기반 통합 가시성 플랫폼
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Automation
  - Category::Incidents
  - Category::Marketplace
  - Category::Notifications
  - Category::AI/ML
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  - Submitted Data Type::Incidents
  configuration: README.md#Setup
  description: 고급 셀프 서비스 AI 기반 통합 가시성 플랫폼
  media:
  - caption: Moogsoft 상관관계
    image_url: images/moogsoft.correlation.png
    media_type: image
  - caption: Moogsoft 대시보드
    image_url: images/moogsoft.dashboard.png
    media_type: image
  - caption: Moogsoft 인시던트 상관관계
    image_url: images/moogsoft.main.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: 모그소프트
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요

Datadog 및 Moogsoft의 손쉬운 통합으로 AI 모니터링 및 통합 가시성 기능을 이용할 수 있습니다. 완전히 디지털화되었거나 레거시 애플리케이션을 사용 중인지에 관계없이 이 통합 솔루션은 팀과 IT 운영 전반에서 알림 노이즈를 줄이고 운영 효율성을 개선해줍니다.

Moogsoft는 고급 셀프 서비스 AI 기반 통합 가시성 플랫폼을 제공하여 소프트웨어 엔지니어, 개발자 및 운영팀이 모든 상황을 즉시 확인하고, 무엇이 잘못되었는지 파악하고, 문제를 더 빨리 해결할 수 있도록 해줍니다.

Moogsoft는 엔터프라이즈급 클라우드 네이티브 플랫폼을 제공합니다. 고객은 더 낮은 가격으로 자신의 속도에 맞춰 도입을 추진할 수 있습니다.

### 관찰

서비스 전송 품질이 개선됩니다. 중요한 상황에 한해 알림을 전송하므로 사용자와 팀이 신속하게 움직이고 집중력을 유지하며 장애가 발생하기 전에 인시던트를 해결할 수 있습니다.

### 모니터

알림 양이 줄어들고 생산성이 향상되는 것을 확인하세요. 통합된 모니터링 패널을 통해 이벤트 피로를 해소하고 유사한 이벤트를 상호 연관시켜 알림을 크게 줄였습니다.

### 협업

하나의 보기에서 모든 것을 확인하세요. 모든 앱, 서비스, 인프라스트럭처 알림을 하나의 콘솔로 통합하여 민첩성을 높이고 알림을 줄이며 해결 시간을 단축합니다.

### Moogsoft 데이터 흐름

메트릭은 Moogsoft 컨텍스트를 통해 흐르며 각 단계에서 노이즈를 줄여줍니다. 메트릭이 이벤트가, 이벤트가 추적 가능한 알림이 되며, 알림은 인시던트와 상호연결됩니다.

## 지원
Moogsoft 지원팀([https://support.moogsoft.com][1])에 문의하세요.

[1]: https://support.moogsoft.com

---
이 애플리케이션은 Datadog 마켓플레이스를 통해 제공되며 Datadog 기술 파트너의 지원을 받습니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/moogsoft" target="_blank">마켓플레이스에서 이 애플리케이션을 구입하세요</a>.