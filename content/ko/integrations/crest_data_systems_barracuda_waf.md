---
algolia:
  subcategory: Marketplace 통합
app_id: crest-data-systems-barracuda-waf
app_uuid: 6d143b10-1da5-44e6-9143-19506722385f
assets:
  dashboards:
    CDS Barracuda WAF - Access Details: assets/dashboards/cds_barracuda_waf_access_details.json
    CDS Barracuda WAF - Audit Details (WAAS): assets/dashboards/cds_barracuda_waf_audit_details_waas.json
    CDS Barracuda WAF - Audit Details (WAF): assets/dashboards/cds_barracuda_waf_audit_details_waf.json
    CDS Barracuda WAF - Event Details: assets/dashboards/cds_barracuda_waf_event_details.json
    CDS Barracuda WAF - Network Firewall Details: assets/dashboards/cds_barracuda_waf_network_firewall_details.json
    CDS Barracuda WAF - System Details: assets/dashboards/cds_barracuda_waf_system_details.json
    CDS Barracuda WAF - Web Firewall Details: assets/dashboards/cds_barracuda_waf_web_firewall_details.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10380
    source_type_name: crest_data_systems_barracuda_waf
  monitors:
    'Server Responding with Status Code lying in Range: [400-599]': assets/monitors/cds_server_response_error_status_code.json
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- marketplace
- 이벤트 관리
- log collection
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_barracuda_waf
integration_id: crest-data-systems-barracuda-waf
integration_title: Barracuda WAF
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_barracuda_waf
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: barracuda-waf
  short_description: Barracuda WAF 통합의 월 정액 요금입니다.
  unit_price: 295.0
public_title: Barracuda WAF
short_description: Syslog 또는 API로 Barracuda WAF 및 Barracuda WAAS 데이터 시각화
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Marketplace
  - '카테고리:: 이벤트 관리'
  - Category::Log Collection
  - Offering::Integration
  - Submitted Data Type::Events
  - 제출한 데이터 유형::로그
  configuration: README.md#Setup
  description: Syslog 또는 API로 Barracuda WAF 및 Barracuda WAAS 데이터 시각화
  media:
  - caption: CDS Barracuda WAF - 액세스 세부 정보
    image_url: images/cds_barracuda_waf_access_details.png
    media_type: image
  - caption: CDS Barracuda WAF - 감사 세부 정보(WAF)
    image_url: images/cds_barracuda_waf_audit_details_waf.png
    media_type: image
  - caption: CDS Barracuda WAF - 감사 세부 정보(WAAS)
    image_url: images/cds_barracuda_waf_audit_details_waas.png
    media_type: image
  - caption: CDS Barracuda WAF - 네트워크 방화벽 세부 정보
    image_url: images/cds_barracuda_waf_network_firewall_details.png
    media_type: image
  - caption: CDS Barracuda WAF - 시스템 세부 정보
    image_url: images/cds_barracuda_waf_system_details.png
    media_type: image
  - caption: CDS Barracuda WAF - 웹 방화벽 세부 정보
    image_url: images/cds_barracuda_waf_web_firewall_details.png
    media_type: image
  - caption: CDS Barracuda WAF - 이벤트 세부 정보
    image_url: images/cds_barracuda_waf_event_details.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Barracuda WAF
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요

본 Barracuda WAF 통합은 Barracuda WAF와 Barracuda WAAS를 시각화 및 모니터합니다.

### Barracuda Web Application Firewall(WAF)

**Barracuda Web Application Firewall(WAF)**은 다양한 유형의 사이버 위협과 공격으로부터 웹 애플리케이션을 보호하도록 설계된 보안 솔루션입니다. 웹 애플리케이션 서버와 인터넷 간의 게이트웨이 역할을 하며, 들어오고 나가는 트래픽을 필터링 및 모니터하여 애플리케이션의 보안과 가용성을 보장합니다.

### Barracuda Web Application Firewall as-a-service (WAAS)

**Barracuda WAF-as-a-Service (WAAS)**는 어플라이언스의 관리 오버헤드 없이 클라우드를 통해 제공되는 엔터프라이즈급 애플리케이션 보안을 제공해 드립니다. Barracuda WAF-as-a-Service로 애플리케이션이 호스팅되는 위치에 관계없이 단 몇 분 내에 애플리케이션을 보호할 수 있습니다. 배포, 확장, 크기 조정 또는 유지 관리할 필요가 없습니다.

### 기능

| 제품 | 방법 | 캡처한 로그 | 문서 참조 링크 | 
  | ---- | ----------- | -------- | --------- | 
  | WAF | Syslog | 네트워크 방화벽, 액세스, 웹 방화벽, 감사, 시스템| [Barracuda WAF][9]|
  | WAAS | Syslog | 웹 방화벽, 액세스, 이벤트| [Barracuda WAAS Syslog][10]|
  | WAAS  | API | 웹 방화벽, 액세스, 감사| [Barracuda WAAS API][11]|


## 지원

지원이나 기능 요청이 있을 경우 다음 채널로 Crest Data에 연락하세요.

- 지원 이메일: [datadog.integrations@crestdata.ai][2]
- 영업 이메일: [datadog-sales@crestdata.ai][3]
- 웹사이트: [crestdata.ai][1]
- FAQ: [Crest Data Datadog Marketplace 통합 FAQ][15]


[1]: https://www.crestdata.ai/
[2]: mailto:datadog.integrations@crestdata.ai
[3]: mailto:datadog-sales@crestdata.ai
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/?tab=agentv6v7
[7]: https://campus.barracuda.com/product/webapplicationfirewall/doc/92767342/adding-a-syslog-server
[8]: https://campus.barracuda.com/product/WAAS/doc/91980986/managing-administrator-roles/
[9]: https://campus.barracuda.com/product/webapplicationfirewall/doc/92767349/exporting-log-formats/
[10]: https://campus.barracuda.com/product/WAAS/doc/79462622/log-export
[11]: https://blog.barracuda.com/2021/10/18/barracuda-waf-as-a-service-rest-api
[12]: https://docs.crestdata.ai/datadog-integrations-readme/barracuda_WAF.pdf
[13]: https://docs.datadoghq.com/ko/agent/?tab=Linux
[14]: https://docs.datadoghq.com/ko/account_management/api-app-keys/
[15]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
---
이 애플리케이션은 Datadog Marketplace를 통해 제공되며 Datadog 기술 파트너의 지원을 받습니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-barracuda-waf" target="_blank">Marketplace에서 애플리케이션을 구매하세요</a>.