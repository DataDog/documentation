---
algolia:
  subcategory: Marketplace 통합
app_id: redpeaks-sap-businessobjects
app_uuid: f6278fc8-8b6a-4f88-922b-3da687b26e62
assets:
  dashboards:
    Redpeaks SAP BusinessObjects overview: assets/dashboards/redpeaks_sap_businessobjects_global_overview.json
    Redpeaks SAP BusinessObjects system dashboard: assets/dashboards/redpeaks_sap_businessobjects_system.json
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: datadog.marketplace.redpeaks.sap_businessobjects.system
      metadata_path: metadata.csv
      prefix: redpeaks
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10999
    source_type_name: Redpeaks SAP BusinessObjects
author:
  homepage: https://www.redpeaks.io
  name: Redpeaks
  sales_email: sales@redpeaks.io
  support_email: support@redpeaks.io
  vendor_id: redpeaks
categories:
- marketplace
- sap
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: redpeaks_sap_businessobjects
integration_id: redpeaks-sap-businessobjects
integration_title: SAP BusinessObjects
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: redpeaks_sap_businessobjects
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.redpeaks.sap_businessobjects.system
  product_id: sap-businessobjects
  short_description: 고유하게 모니터링되는 각 SAP 시스템별로 가격 책정(SID로 식별)
  tag: uri
  unit_label: SAP BusinessObjects 인스턴스
  unit_price: 160.0
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
    media_type: 이미지
  - caption: SAP BusinessObjects 시스템 개요
    image_url: images/sap_businessobjects_system_dashboard.png
    media_type: 이미지
  overview: README.md#Overview
  support: README.md#Support
  title: SAP BusinessObjects
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요
SAP BusinessObjects 통합에서는 SAP **BusinessObjects** 시스템을 모니터링합니다.

**에이전트 없는** 원격 연결과 사전 구성된 템플릿을 사용하기 때문에 단 **몇 분** 안에 통합을 실행할 수 있습니다.

모니터링은 [Redpeaks][1]로 실행됩니다(이전 명칭: Agentil Software - Pro.Monitor). 이는 SAP 시스템의 가장 관련성이 높은 컴포넌트를 모니터링하도록 기본 설정되어 있습니다. 여기에는 **연결**, **서비스**, **보고**, **스케줄**, **감사 경고**가 포함됩니다.

이 통합은 시스템에서 실시간으로 데이터를 수집 및 분석하고 메트릭과 실행 가능한 이벤트를 생성합니다. Redpeaks에서 구성하거나 메트릭에서 바로 Datadog 모니터를 생성하여 알림을 세부 조정할 수 있습니다.

Redpeaks는 단일 또는 수백 개의 시스템을 관리하든 관계없이 모든 유형과 규모의 SAP 배포와 통합됩니다. 온프레미스 설정, 프라이빗 클라우드 또는 하이브리드 환경을 지원하여 고유한 요구 사항을 충족하는 유연성을 제공합니다.

### 모니터링 중인 모듈

- 서버 상태
- 동시 실행 사용자
- 서버 메트릭
- 서버 속성
- 일정 및 리포트
- CMC 및 감사 경고

## 지원

지원이나 기능 요청은 다음 채널을 통해 Redpeaks에 문의하세요.

- 이메일: [support@redpeaks.io][2]

### 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Datadog Marketplace에서 Redpeaks's  제품을 구입해 SAP NetWeaver 모니터링하기][5]

*SAP이나 다른 플랫폼에 적용할 통합을 위해 신뢰할 만한 파트너를 찾고 있다면, 여기에서 찾으실 수 있습니다. 연락해 주세요.*

---
이 제품은 스위스 제네바에서 설계 및 개발되었습니다.

[1]: https://www.redpeaks.io
[2]: mailto:support@redpeaks.io
[3]: https://softwaredownloads.sap.com/file/0020000000507122021
[4]: https://wiki.redpeaks.io/doku.php?id=products:promonitor:6.8:userguide:configuration
[5]: https://www.datadoghq.com/blog/sap-netweaver-monitoring-agentil-datadog-marketplace/
[6]: https://wiki.redpeaks.io/doku.php?id=products:promonitor:6.8:installguide:prerequisites
[7]: https://wiki.redpeaks.io/doku.php?id=products:cockpit:1.0:installguide:installjava
[8]: https://agentil.box.com/s/k0yp1tk58r666rfncf0nb9k1qa0guvdc


---
이 애플리케이션은 Datadog Marketplace를 통해 제공되며 Datadog Technology Partner의 지원을 받습니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/redpeaks-sap-businessobjects" target="_blank">Marketplace에서 구매하세요</a>.