---
algolia:
  subcategory: Marketplace 통합
app_id: zigiwave-micro-focus-opsbridge-integration
app_uuid: b904a102-65fe-4e4d-b693-e4ab98086277
assets:
  dashboards:
    ZigiWave Incidents Dashboard: assets/dashboards/ZigiWaveOpsBridge_DataDogIncidentDashboard.json
author:
  homepage: https://zigiwave.com
  name: ZigiWave
  sales_email: info@zigiwave.com
  support_email: support@zigiwave.com
  vendor_id: zigiwave
categories:
- 이벤트 관리
- 인시던트
- marketplace
- 메트릭
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: zigiwave_micro_focus_opsbridge_integration
integration_id: zigiwave-micro-focus-opsbridge-integration
integration_title: OpsBridge
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: zigiwave_micro_focus_opsbridge_integration
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: micro-focus-opsbridge-integration
  short_description: 연결된 Datadog/MF OpsBridge 인스턴스 페어의 월간 라이선스
  unit_price: 750.0
public_title: OpsBridge
short_description: Datadog와 OpsBridge 간 코드 없이 통합
supported_os:
- 리눅스
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - '카테고리:: 이벤트 관리'
  - Category::Incidents
  - Category::Marketplace
  - 카테고리::메트릭
  - Supported OS::Linux
  - Supported OS::Windows
  - 제출한 데이터 유형::메트릭
  - Submitted Data Type::Events
  - Submitted Data Type::Incidents
  - 제공::통합
  configuration: README.md#Setup
  description: Datadog와 OpsBridge 간 코드 없이 통합
  media:
  - caption: Datadog과 사용 가능한 통합 템플릿
    image_url: images/datadog_market_2.jpg
    media_type: image
  - caption: ZigiOps Topology 대시보드
    image_url: images/datadog_marketplace_dashboard_6.jpg
    media_type: image
  - caption: ZigiOps Metrics 대시보드
    image_url: images/datadog_marketplace_4.jpg
    media_type: image
  - caption: Datadog으로 인시던트를 전송하기 위한 ZigiOps 통합
    image_url: images/OpsBridge-DataDog-Incidents.jpg
    media_type: image
  - caption: Datadog Incidents 대시보드
    image_url: images/ddog_mf_integration-dashboard.jpg
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: OpsBridge
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->



## 개요

ZigiOps는 코드가 필요 없는 유연한 통합 플랫폼입니다. ZigiOps 제품은 기업이 IT 환경에서 발생한 문제를 빠르게 식별, 보고, 해결할 수 있도록 지원합니다. ZigiOps를 소프트웨어 에코시스템에 통합하여 Jira, ServiceNow, VMware vROps, Micro Focus Ops Bridge, BMC, Cherwell, Splunk 등 ITSM, ITOM, DevOps를 위한 주요 엔터프라이즈 소프트웨어 도구와 연동하세요.

### Datadog – Micro Focus OBM을 ZigiOps와 통합

ZigiWave Datadog - OpsBridge 통합을 사용하면 OpsBridge에서 인시던트를 추출하여 Datadog에 입력할 수 있습니다. ZigiOps는 인시던트 요약, 탐지 방법, 심각도, 상태 등 모든 필드를 동기화합니다. 이 통합은 양방향으로 이루어지므로 Datadog 또는 OpsBridge에 업데이트가 있을 때마다 ZigiOps가 해당 업데이트를 관련 시스템으로 자동 전송합니다.


Datadog Autodiscovery 기능은 OpsBridge 데이터베이스에는 없지만 모니터링이 필요한 호스트를 찾아냅니다. ZigiOps는 호스트 정보를 수집하여 OpsBridge RTSM에 보고하고, Datadog의 데이터를 활용하여 토폴로지 정보를 강화합니다. 토폴로지는 ZigiOps의 정기적인 점검을 통해 최신 상태로 유지됩니다.

ZigiOps는 Datadog 이벤트를 수집하여 OpsBridge에 이벤트로 보고합니다. 플랫폼은 메트릭, 토폴로지 등 모든 관련 호스트 세부 정보를 동기화합니다.

ZigiOps는 Datadog 메트릭을 수집하여 관련 호스트 정보와 함께 MF Operations Connector에 보고합니다. 이러한 메트릭은 OpsBridge Performance Perspective에서 액세스하여 대시보드를 구축하는 데 사용할 수 있습니다.

이 통합을 통해 IT 운영팀은 OpsBridge 인프라를 전체적으로 파악하고 문제가 심각해지기 전에 감지할 수 있습니다.

### 토폴로지, 메트릭, 이벤트, 인시던트

ZigiOps는 Datadog-Micro Focus OBM 통합의 네 가지 사용 사례에 완벽한 맞춤형 통합 템플릿을 제공합니다. 이 템플릿을 통해 사용자는 데이터 흐름을 빠르게 파악할 수 있고, 템플릿에서 제공하는 데이터 매핑과 필터를 필요에 맞게 수정할 수 있습니다. 현재 사용 가능한 템플릿은 다음과 같습니다. OpsBridge 이벤트 - Datadog 인시던트, Datadog 이벤트 - OpsBridge 이벤트, Datadog 메트릭 - OBM 메트릭, Datadog 호스트 - OBM 토폴로지. 필요에 맞는 템플릿이 없을 경우, 통합 컨설턴트의 단계별 안내에 따라 직접 통합을 만들 수도 있습니다.

## 지원

ZigiWave는 고객에게 최고의 경험을 제공하기 위해 최선을 다하고 있습니다. 기존 고객은 support.zigiwave.com에서 티켓을 제출하시거나 support@zigiwave.com으로 이메일을 보내주세요.

---
이 애플리케이션은 Marketplace를 통해 제공되며, Datadog 기술 파트너의 지원을 받습니다. <a href="https://app.datadoghq.com/marketplace/app/zigiwave-micro-focus-opsbridge-integration" target="_blank">여기를 클릭</a>하여 애플리케이션을 구매하세요.