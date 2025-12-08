---
algolia:
  subcategory: Marketplace 통합
app_id: crest-data-systems-cisco-asa
app_uuid: 384341e7-e5b4-42a0-917d-a52db20ce507
assets:
  dashboards:
    CDS Cisco ASA - Application Firewall Details: assets/dashboards/cds_cisco_asa_application_firewall_details.json
    CDS Cisco ASA - Identity-Based Firewall Details: assets/dashboards/cds_cisco_asa_identity_based_firewall_details.json
    CDS Cisco ASA - Overview: assets/dashboards/cds_cisco_asa_overview.json
    CDS Cisco ASA - Transparent Firewall Details: assets/dashboards/cds_cisco_asa_transparent_firewall_details.json
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10384
    source_type_name: crest_data_systems_cisco_asa
author:
  homepage: https://crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- 보안
- network
- marketplace
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_cisco_asa
integration_id: crest-data-systems-cisco-asa
integration_title: Cisco ASA
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_cisco_asa
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: cisco-asa
  short_description: Cisco-ASA 통합 월별 정액 요금입니다.
  unit_price: 1995.0
public_title: Cisco ASA
short_description: Cisco ASA Syslog 데이터 시각화
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
  - 카테고리::보안
  - Category::Network
  - Category::Marketplace
  - 제공::통합
  - 제출한 데이터 유형::로그
  configuration: README.md#Setup
  description: Cisco ASA Syslog 데이터 시각화
  media:
  - caption: CDS Cisco ASA - Overview
    image_url: images/cds_cisco_asa_overview.png
    media_type: image
  - caption: CDS Cisco ASA - Identity-Based Firewall Details
    image_url: images/cds_cisco_asa_identity_based_firewall_details.png
    media_type: image
  - caption: CDS Cisco ASA - Transparent Firewall Details
    image_url: images/cds_cisco_asa_transparent_firewall_details.png
    media_type: image
  - caption: CDS Cisco ASA - Application Firewall Details
    image_url: images/cds_cisco_asa_application_firewall_details.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Cisco ASA
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요

* Cisco ASA(Adaptive Security Appliance)는 Cisco Systems에서 개발한 다기능 네트워크 보안 디바이스입니다. 방화벽, VPN(가상 사설망), 침입 방지, 콘텐츠 보안 등 다양한 보안 기능이 결합되어 있습니다.
* Cisco ASA는 네트워크를 무단 접근, 악의적인 위협, 데이터 유출로부터 보호하여 1차 방어선 역할을 합니다.
* Cisco ASA는 소규모 기업부터 대기업까지 다양한 규모의 네트워크에 강력한 보안을 제공하는 활용도가 높은 보안 어플라이언스입니다. 여러 보안 기능을 단일 디바이스에 통합하여 네트워크 보안 관리를 간소화하고 안전하고 안정적인 네트워크 인프라를 보장합니다.

이 통합은 다음 데이터 소스를 모니터링하고 시각화합니다.
* 애플리케이션 방화벽
* 투명 방화벽
* 신원 기반 방화벽
* 사용자 인증
* 사용자 세션
* 침입 탐지 시스템
* 시스템
* 명령 인터페이스

## 지원

지원이나 기능 요청이 있을 경우 다음 채널로 Crest Data에 연락하세요.

- 고객지원: [datadog.integrations@crestdata.ai][2]
- 세일즈: [datadog-sales@crestdata.ai][6]
- 웹사이트: [crestdata.ai][1]
- FAQ: [Crest Data Datadog Marketplace 통합 FAQ ][10]


[1]: https://www.crestdata.ai/
[2]: mailto:datadog.integrations@crestdata.ai
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[4]: https://www.cisco.com/c/en/us/td/docs/security/asa/asa916/configuration/firewall/asa-916-firewall-config/access-sfr.html
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[6]: mailto:datadog-sales@crestdata.ai
[7]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/?tab=agentv6v7
[8]: https://docs.crestdata.ai/datadog-integrations-readme/Cisco_ASA.pdf
[9]: https://docs.datadoghq.com/ko/agent/?tab=Linux
[10]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
---
이 애플리케이션은 Datadog Marketplace를 통해 제공되며 Datadog Technology Partner가 지원합니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-cisco-asa" target="_blank">Marketplace에서 구매하세요</a>.