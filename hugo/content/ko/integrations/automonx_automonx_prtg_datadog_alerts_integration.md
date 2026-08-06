---
algolia:
  subcategory: Marketplace 통합
app_id: automonx-prtg-datadog-alerts
app_uuid: 0ac61364-d76e-4cff-afa8-213c4e952686
assets:
  dashboards:
    PRTG Alerts Dashboard: assets/dashboards/automonx_prtg_events.json
  integration:
    auto_install: false
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 20041432
    source_type_name: automonx_prtg_datadog_alerts_integration
  monitors:
    Device is Down due to Ping: assets/monitors/Device-PingDown.json
    'HPE ProLiant System Health: Error caused by lookup value ''Failed'' in channel ''Overall Status''': assets/monitors/ILO-HardwareError.json
    HPE Server is degraded in channel 'Power Supply': assets/monitors/ILO-Degraded.json
    Network Interface Traffic is High: assets/monitors/NetworkInterface-TrafficHigh.json
    Server Available Memory is too Low: assets/monitors/ServerFreeMemory-Down.json
    Server CPU is High: assets/monitors/ServerCPU-Down.json
    Server Disk Utilization is High: assets/monitors/ServerDiskUtil-Down.json
author:
  homepage: https://www.automonx.com/smartnotif
  name: AutoMonX
  sales_email: sales@automonx.com
  support_email: support@automonx.com
  vendor_id: autononx
categories:
- 이벤트 관리
- marketplace
- 경고
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: automonx_automonx_prtg_datadog_alerts_integration
integration_id: automonx-prtg-datadog-alerts
integration_title: PRTG용 Smart Notifications
integration_version: ''
is_public: true
legal_terms:
  eula: assets/AutomonX-EULA.pdf
manifest_version: 2.0.0
name: automonx_automonx_prtg_datadog_alerts_integration
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: automonx-prtg-datadog-alerts
  short_description: AutoMonX Smart Notifications 통합 연간 가격
  unit_price: 60
public_title: PRTG용 Smart Notifications
short_description: Smart Notifications 엔진으로 불필요한 PRTG Network Monitor 경고를 줄이세요
supported_os:
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Windows
  - Category::Event Management
  - Category::Marketplace
  - Category::Alerting
  - 제공::통합
  - Submitted Data Type::Events
  configuration: README.md#Setup
  description: Smart Notifications 엔진으로 불필요한 PRTG Network Monitor 경고를 줄이세요
  media:
  - caption: PRTG-DataDog 통합용 AutoMonX Smart Notifications - 네트워크 디바이스의 샘플 이벤트
    image_url: images/AutoMonX_PRTG_NetworkIn_DD_Event.png
    media_type: 이미지
  - caption: PRTG-DataDog 통합용 AutoMonX Smart Notifications - 모니터링 이벤트 흐름
    image_url: images/AutoMonX_Events_from_PRTG_to_DD.png
    media_type: 이미지
  - caption: PRTG-DataDog 통합용 AutoMonX Smart Notifications - 샘플 이벤트 모니터
    image_url: images/AutoMonX_Event_Monitors.png
    media_type: 이미지
  - caption: PRTG-DataDog 통합용 AutoMonX Smart Notifications - 이벤트 대시보드
    image_url: images/AutoMonX_Event_Dashboard.png
    media_type: 이미지
  overview: README.md#Overview
  support: README.md#Support
  title: PRTG용 Smart Notifications
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요

PRTG Network Monitor 사용자를 위해 맞춤화된 솔루션으로 온프레미스 시스템 및 네트워크 모니터링 역량을 강화하세요. AutoMonX의 [Smart Notifications][1]를 소개합니다. 혁신적인 알림 엔진으로 정교한 필터링 메커니즘을 통해 가장 중요한 알림만 팀원에게 전달합니다. Datadog 및 PRTG Network Monitor와 완벽하게 통합되고 안정적이고 집중적인 알림을 제공해 네트워크 및 시스템 관리자가 문제를 미리 파악할 수 있도록 지원합니다.

코드 없는 통합은 온프레미스 모니터링의 기존 투자를 즉시 활용하며, 이를 Datadog 옵저버빌리티 플랫폼의 더 넓은 에코시스템으로 확장합니다.

Paessler PRTG Network Monitor는 기업이 온프레미스, 클라우드, 하이브리드 환경 등 전체 IT 인프라를 모니터링하는 데 도움이 되는 IT 모니터링 소프트웨어입니다.

Smart Notifications는 스마트 필터링 알고리즘을 통해 모니터링 오류와 실제 시스템 또는 네트워크 문제를 구분하고 관련 관리자(MonitorOps 또는 네트워크/시스템 관리자)에게 전달합니다. 내장된 상관 관계 분석 기능을 통해 심각한 네트워크 중단 시 발생하는 노이즈를 줄이기 때문에 네트워크 및 시스템 팀이 우선순위가 높은 문제에 집중할 수 있습니다.

### 이벤트
이 통합은 PRTG Network Monitor 알림을 Datadog에 이벤트로 전송합니다. 이벤트에는 문제의 원인을 파악하는 데 도움이 되는 관련 태그가 포함됩니다. 이러한 태그는 PRTG 측에서 설정됩니다.

## 지원
도움이 필요하시면 [support@automonx.com][3]으로 문의하세요.

[1]: https://www.automonx.com/smartnotif
[2]: http://www.automonx.com/downloads
[3]: mailto:support@automonx.com

---
이 애플리케이션은 Datadog Marketplace를 통해 제공되며, Datadog Technology Partner의 지원을 받습니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/automonx-prtg-datadog-alerts" target="_blank">Marketplace에서 구매하세요</a>.