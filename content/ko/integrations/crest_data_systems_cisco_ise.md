---
algolia:
  subcategory: Marketplace 통합
app_id: crest-data-systems-cisco-ise
app_uuid: 68dcc9fc-a128-42be-b122-28e68e04c4ed
assets:
  dashboards:
    CDS Cisco ISE - Authentication Details: assets/dashboards/cds_cisco_ise_authentication_details.json
    CDS Cisco ISE - Client Provisioning Details: assets/dashboards/cds_cisco_ise_client_provisioning_details.json
    CDS Cisco ISE - Compliance Details: assets/dashboards/cds_cisco_ise_compliance_details.json
    CDS Cisco ISE - Device Details: assets/dashboards/cds_cisco_ise_device_details.json
    CDS Cisco ISE - Overview: assets/dashboards/cds_cisco_ise_overview.json
    CDS Cisco ISE - Posture Details: assets/dashboards/cds_cisco_ise_posture_details.json
    CDS Cisco ISE - Profiler Details: assets/dashboards/cds_cisco_ise_profiler_details.json
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10364
    source_type_name: crest_data_systems_cisco_ise
author:
  homepage: https://crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- 보안
- log collection
- 프로비저닝
- marketplace
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_cisco_ise
integration_id: crest-data-systems-cisco-ise
integration_title: Cisco ISE
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_cisco_ise
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: cisco-ise
  short_description: Cisco ISE 통합 월별 정액 요금입니다.
  unit_price: 1995.0
public_title: Cisco ISE
short_description: Cisco ISE Syslog 데이터 시각화
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
  - Category::Log Collection
  - 카테고리::프로비저닝
  - Category::Marketplace
  - Offering::Integration
  - 제출한 데이터 유형::로그
  configuration: README.md#Setup
  description: Cisco ISE Syslog 데이터 시각화
  media:
  - caption: CDS Cisco ISE - Overview
    image_url: images/cds_cisco_ise_overview.png
    media_type: image
  - caption: CDS Cisco ISE - Authentication Details
    image_url: images/cds_cisco_ise_authentication_details.png
    media_type: image
  - caption: CDS Cisco ISE - Profiler Details
    image_url: images/cds_cisco_ise_profiler_details.png
    media_type: image
  - caption: CDS Cisco ISE - Device Details
    image_url: images/cds_cisco_ise_device_details.png
    media_type: image
  - caption: CDS Cisco ISE - Posture Details
    image_url: images/cds_cisco_ise_posture_details.png
    media_type: image
  - caption: CDS Cisco ISE - Compliance Details
    image_url: images/cds_cisco_ise_compliance_details.png
    media_type: image
  - caption: CDS Cisco ISE - Client Provisioning Details
    image_url: images/cds_cisco_ise_client_provisioning_details.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Cisco ISE
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요

Cisco Identity Services Engine(ISE)은 기업이 규정 준수를 강화하고, 인프라 보안을 강화하고, 서비스 운영을 간소화할 수 있도록 지원하는 차세대 ID 및 액세스 제어 정책 플랫폼입니다. Cisco ISE의 ​​고유한 아키텍처를 통해 기업은 네트워크, 사용자 및 디바이스에서 실시간 상황 정보를 수집할 수 있습니다.

관리자는 해당 정보를 사용하여 액세스 스위치, 무선 LAN 컨트롤러(WLC), 가상 사설망(VPN) 게이트웨이, 데이터 센터 스위치 등 다양한 네트워크 요소에 ID를 연결하여 선제적인 거버넌스 결정을 내릴 수 있습니다.

이 통합은 다음 로그 유형에 시각화 기능을 제공합니다.
   * 인증
   * Posture 
   * 프로파일러
   * Client Provisioning

## 지원

지원이나 기능 요청이 있을 경우 다음 채널로 Crest Data에 연락하세요.

- 고객지원: [datadog.integrations@crestdata.ai][2]
- 영업 이메일: [datadog-sales@crestdata.ai][3]
- 웹사이트: [crestdata.ai][1]
- FAQ: [Crest Data Datadog Marketplace 통합 FAQ][9]


[1]: https://www.crestdata.ai/
[2]: mailto:datadog.integrations@crestdata.ai
[3]: mailto:datadog-sales@crestdata.ai
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/?tab=agentv6v7
[7]: https://docs.crestdata.ai/datadog-integrations-readme/Cisco_ISE.pdf
[8]: https://docs.datadoghq.com/ko/agent/?tab=Linux
[9]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
---
이 애플리케이션은 Datadog Marketplace를 통해 제공되며 Datadog Technology Partner가 지원합니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-cisco-ise" target="_blank">Marketplace에서 구매하세요</a>.