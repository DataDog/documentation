---
algolia:
  subcategory: Marketplace 통합
app_id: crest-data-systems-opnsense
app_uuid: 0adf83e0-cc01-4d1e-aa88-1a48d6eac7a3
assets:
  dashboards:
    OPNsense - DHCP: assets/dashboards/crest_data_systems_opnsense_dhcp.json
    OPNsense - Firewall Details: assets/dashboards/crest_data_systems_opnsense_firewall_details.json
    OPNsense - Intrusion Detection: assets/dashboards/crest_data_systems_opnsense_intrusion_detection.json
    OPNsense - Overview: assets/dashboards/crest_data_systems_opnsense_overview.json
    OPNsense - Unbound DNS: assets/dashboards/crest_data_systems_opnsense_unbound_dns.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 31831185
    source_type_name: crest_data_systems_opnsense
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- marketplace
- security
- 네트워크
- 로그 수집
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_opnsense
integration_id: crest-data-systems-opnsense
integration_title: OPNsense
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: crest_data_systems_opnsense
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: opnsense
  short_description: OPNsense 통합 월별 정액 요금입니다.
  unit_price: 95.0
public_title: OPNsense
short_description: OPNsense에서 전달된 로그 모니터링
supported_os:
- linux
- 윈도우즈(Windows)
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Marketplace
  - Category::Security
  - Category::Network
  - Category::Log Collection
  - Offering::Integration
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: OPNsense에서 전달된 로그 모니터링
  media:
  - caption: OPNsense Overview
    image_url: images/crest_data_systems_opnsense_overview.png
    media_type: 이미지
  - caption: OPNsense Firewall Details
    image_url: images/crest_data_systems_opnsense_firewall_details.png
    media_type: 이미지
  - caption: OPNsense DHCP
    image_url: images/crest_data_systems_opnsense_dhcp.png
    media_type: 이미지
  - caption: OPNsense Unbound DNS
    image_url: images/crest_data_systems_opnsense_unbound_dns.png
    media_type: 이미지
  - caption: OPNsense IDS
    image_url: images/crest_data_systems_opnsense_ids.png
    media_type: 이미지
  overview: README.md#Overview
  support: README.md#Support
  title: OPNsense
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요

OPNsense는 고급 네트워크 보안 및 트래픽 관리를 위해 설계된 오픈 소스 FreeBSD 기반 방화벽 및 라우팅 플랫폼입니다.

이 통합은 UDP를 통한 네트워크를 통해 OPNsense로부터 Firewalls, DHCP, Unbound DNS, Intrusion Detection의 로그를 파싱하고 모니터링하여 Datadog에 시각화합니다.

## 지원

지원이나 기능 요청이 있을 경우 다음 채널로 Crest Data에 연락하세요.

- 고객지원: datadog.integrations@crestdata.ai
- 영업 이메일l: datadog-sales@crestdata.ai
- 웹사이트: [crestdata.ai][3]
- FAQ: [Crest Data Datadog Marketplace 통합 FAQ ][10]

[1]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[3]: https://www.crestdata.ai/
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/?tab=agentv6v7
[5]: https://docs.opnsense.org/manual/settingsmenu.html#logging
[6]: mailto:datadog.integrations@crestdata.ai
[7]: https://docs.crestdata.ai/datadog-integrations-readme/OPNsense.pdf
[8]: https://docs.datadoghq.com/ko/agent/?tab=Linux
[9]: https://docs.datadoghq.com/ko/account_management/api-app-keys/
[10]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
---
이 애플리케이션은 Datadog Marketplace를 통해 제공되며 Datadog Technology Partner가 지원합니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-opnsense" target="_blank">Marketplace에서 구매하세요</a>.