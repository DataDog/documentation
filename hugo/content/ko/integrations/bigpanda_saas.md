---
algolia:
  subcategory: Marketplace 통합
app_id: bigpanda-bigpanda
app_uuid: 98cf782f-3d6c-4ea8-8e7b-353da5623794
assets:
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: datadog.marketplace.bigpanda.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10163
    source_type_name: BigPanda SaaS
author:
  homepage: https://bigpanda.io
  name: BigPanda
  sales_email: ddogmarketplace@bigpanda.io
  support_email: support@bigpanda.io
  vendor_id: bigpanda
categories:
- events
- 자동화
- 추적
- marketplace
- 알림
- ai/ml
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: bigpanda_saas
integration_id: bigpanda-bigpanda
integration_title: BigPanda SaaS Platform
integration_version: ''
is_public: true
custom_kind: 통합
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: bigpanda_saas
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.bigpanda.bigpanda
  product_id: bigpanda
  short_description: AIOps를 사용한 이벤트 상관 관계 수립과 자동화 플랫폼
  tag: 노드
  unit_label: 노드 모니터링
  unit_price: 9.0
public_title: BigPanda SaaS Platform
short_description: AIOps를 사용한 이벤트 상관 관계 수립과 자동화 플랫폼
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Alerting
  - Category::Automation
  - Category::Incidents
  - Category::Marketplace
  - Category::Notifications
  - Category::AI/ML
  - Offering::Software License
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: AIOps를 사용한 이벤트 상관 관계 수립과 자동화 플랫폼
  media:
  - caption: BigPanda Incident Feed -- BigPanda의 Feed에서 인시던트 전체의 상태와 시간별 변화를 확인할 수
      있습니다.
    image_url: images/b480d24-Incidents_tab_overview_0.1.png
    media_type: image
  - caption: BigPanda Analytics -- BigPanda의 Unified Analytics 대시보드에서 리포트와 KPI를 확인할
      수 있어 팀의 지속적인 발전을 도와줍니다.
    image_url: images/61454f7-The_Unified_Analytics_Tab.png
    media_type: image
  - caption: BigPanda Architecture -- BigPanda의 Architecture를 이용하면 Monitoring, Changes,
      Topology 데이터를 한 눈에 종합하여 확인할 수 있습니다.
    image_url: images/958addd-arch.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: BigPanda SaaS Platform
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요
BigPanda는 AIOps로 강화된 SaasS 플랫폼을 이용해 이벤트 상관 관계 수립과 자동화 서비스를 통해 IT 중단 문제를 예방하고 해결하도록 도와줍니다. BigPanda에서는 자동으로 Datadog 및 제3자 도구로부터 알림을 수집하고 컨텍스트가 풍부한 인시던트와 상관 관계를 수립하여 중단 문제를 예방하고 인시던트 관리의 어려움을 덜어줍니다.

BigPanda에는 [인프라스트럭처][5], [로그 관리][6], [APM][7]을 포함해 Datadog의 모니터링 제품과의 통합이 기본 기능으로 제공됩니다. 이 통합을 이용하면 풍부한 토폴로지 정보와 알림을 토대로 상관 관계를 수립하고 근본 원인을 분석하여 인시던트가 서비스 중단으로 이어지지 않도록 예방할 수 있습니다. 또한 BigPanda에서는 ITSM 플랫폼에서 CMDB 데이터를 수집해 알림을 추가로 강화할 수 있고 Datadog에서 송수신하는 서비스 간 관계를 전체 스택 보기로 파악할 수 있습니다.

따라서 IT Ops, NOC, DevOps, SRE 팀에서 알림을 더 빨리, 총괄적으로 확인할 수 있고 성능이 떨어지는 애플리케이션, 시스템, 또는 서비스의 근본 원인을 찾을 수 있으며, 동시에 사용자 환경에서 과다한 알림 전송을 줄이면서 MTTR을 개선할 수 있습니다.

Datadog Marketplace에서 BigPanda 플랫폼을 사용할 수 있습니다. 이미 BigPanda를 이용하고 있는 고객인데 인스턴스를 Datadog에 연결해야 하는 경우에는 [통합을 설정][1]하세요.

## 지원

지원이나 기능을 요청하려면 다음 방법으로 BigPanda에 문의하세요.

- 이메일: [support@bigpanda.io][2]

### 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Datadog Marketplace에서 BigPanda 제품을 구입해 인시던트 관리를 스트리밍하기][3]
- [BigPanda 설명서][4]

[1]: https://app.datadoghq.com/integrations/bigpanda
[2]: mailto:support@bigpanda.io
[3]: https://www.datadoghq.com/blog/bigpanda-datadog-marketplace/
[4]: https://docs.bigpanda.io/docs/datadog
[5]: https://docs.datadoghq.com/ko/infrastructure
[6]: https://docs.datadoghq.com/ko/logs
[7]: https://docs.datadoghq.com/ko/tracing
---
이 애플리케이션은 Marketplace에서 사용할 수 있고 Datadog Technology partner에서 지원됩니다. 이 애플리케이션을 구입하려면 <a href="https://app.datadoghq.com/marketplace/app/bigpanda-bigpanda" target="_blank">여기를 클릭</a>하세요.