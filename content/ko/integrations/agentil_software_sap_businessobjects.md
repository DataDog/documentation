---
algolia:
  subcategory: Marketplace 통합
app_id: agentil-software-sap-businessobjects
app_uuid: cac9d777-3bd1-40a1-aef3-28a8141804f1
assets:
  dashboards:
    SAP BusinessObjects overview: assets/dashboards/agentil_software_sap_businessobjects_global_overview.json
    SAP BusinessObjects system dashboard: assets/dashboards/agentil_software_sap_businessobjects_system.json
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: datadog.marketplace.agentil_software.sap_businessobjects.system
      metadata_path: metadata.csv
      prefix: agentil_software
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10252
    source_type_name: AGENTIL Software SAP BusinessObjects
author:
  homepage: https://www.agentil-software.com
  name: Agentil Software
  sales_email: sales@agentil-software.com
  support_email: support@agentil-software.com
  vendor_id: agentil-software
categories:
- marketplace
- sap
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: agentil_software_sap_businessobjects
integration_id: agentil-software-sap-businessobjects
integration_title: SAP BusinessObjects
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: agentil_software_sap_businessobjects
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.agentil_software.sap_businessobjects.system
  product_id: sap-businessobjects
  short_description: 고유하게 모니터링되는 각 SAP 시스템별로 가격 책정(SID로 식별)
  tag: uri
  unit_label: SAP BusinessObjects 인스턴스
  unit_price: 160
public_title: SAP BusinessObjects
short_description: SAP 비즈니스 개체 시스템 모니터
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Marketplace
  - Category::SAP
  - Offering::Integration
  - Supported OS::Linux
  - Submitted Data Type::Metrics
  - Submitted Data Type::Events
  configuration: README.md#Setup
  description: SAP 비즈니스 개체 시스템 모니터
  media:
  - caption: SAP BusinessObjects 글로벌 개요
    image_url: images/sap_businessobjects_global_overview_dashboard.png
    media_type: image
  - caption: SAP BusinessObjects 시스템 개요
    image_url: images/sap_businessobjects_system_dashboard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: SAP BusinessObjects
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요
SAP BusinessObjects 통합에서는 SAP **BusinessObjects** 시스템을 모니터링합니다.

이 통합에서는 에이전트 없는 원격 연결과 사전 구성된 모니터링 템플릿을 사용하기 때문에 몇 분 안에 통합을 실행할 수 있습니다.

모니터링은 AGENTIL Software의 [Pro.Monitor](https://www.agentil-software.com) 플랫폼으로 실행됩니다. 이 플랫폼은 SAP 시스템에서 필요한 모듈과 트랜잭션을 기본 기능으로 제공합니다. 여기에는 **연결**, **서비스**, **리포트**, **일정**, **감사 경고** 등이 있습니다.

이 통합에서는 실시간으로 데이터를 수집 및 분석하고 메트릭과 실행 가능한 이벤트를 제공합니다. 수집한 데이터를 기반으로 Pro.Monitor에서 구성하거나 메트릭에서 바로 Datadog 모니터를 생성하여 사용자 정의 알림을 생성할 수 있습니다.

### 모니터링 중인 모듈

- 서버 상태
- 동시 실행 사용자
- 서버 메트릭
- 서버 속성
- 일정 및 리포트
- CMC 및 감사 경고

## 지원
지원이나 기능 요청을 하려면 GENTIL Software(support@agentil-software.com)에 문의하세요.

*SAP이나 다른 플랫폼에 적용할 통합을 위해 신뢰할 만한 파트너를 찾고 있다면, 여기에서 찾으실 수 있습니다. 연락해 주세요.*

---
이 제품은 스위스 제네바에서 설계 및 개발되었습니다.


---
이 애플리케이션은 Marketplace에서 사용할 수 있고 Datadog Technology Partner에서 지원됩니다. 이 애플리케이션을 구입하려면 <a href="https://app.datadoghq.com/marketplace/app/agentil-software-sap-businessobjects" target="_blank">여기를 클릭</a>하세요.