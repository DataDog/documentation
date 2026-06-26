---
algolia:
  subcategory: Marketplace 통합
app_id: crest-data-systems-pfsense
app_uuid: 39d6eaf5-ff21-4fd6-a3c5-cbbad9b8a449
assets:
  dashboards:
    pfSense - DHCP: assets/dashboards/crest_data_systems_pfsense_DHCP_Details.json
    pfSense - Firewall: assets/dashboards/crest_data_systems_pfsense_Firewall_Details.json
    pfSense - NGINX: assets/dashboards/crest_data_systems_pfsense_NGINX_Details.json
    pfSense - OpenVPN: assets/dashboards/crest_data_systems_pfsense_OpenVPN_Details.json
    pfSense - Overview: assets/dashboards/crest_data_systems_pfsense_overview.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: cds.pfsense.packet_length
      metadata_path: metadata.csv
      prefix: cds.pfsense
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10347
    source_type_name: crest_data_systems_pfsense
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- marketplace
- 보안
- network
- log collection
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_pfsense
integration_id: crest-data-systems-pfsense
integration_title: pfSense
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_pfsense
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.crest_data_systems.pfsense
  product_id: pfsense
  short_description: pfSense 인스턴스당 월별
  tag: cds_pfsense_host
  unit_label: pfSense 인스턴스
  unit_price: 95.0
public_title: pfSense
short_description: pfSense에서 전달된 로그 모니터링
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
  - 카테고리::보안
  - Category::Network
  - Category::Log Collection
  - Offering::Integration
  - 제출한 데이터 유형::메트릭
  - 제출한 데이터 유형::로그
  configuration: README.md#Setup
  description: pfSense에서 전달된 로그 모니터링
  media:
  - caption: pfSense - Overview 대시보드
    image_url: images/crest_data_systems_pfsense_overview.png
    media_type: image
  - caption: pfSense - Firewall 대시보드
    image_url: images/crest_data_systems_pfsense_Firewall_Details.png
    media_type: image
  - caption: pfsense - OpenVPN 대시보드
    image_url: images/crest_data_systems_pfsense_OpenVPN_Details.png
    media_type: image
  - caption: pfSense - DHCP 대시보드
    image_url: images/crest_data_systems_pfsense_DHCP_Details.png
    media_type: image
  - caption: pfSense - NGINX 대시보드
    image_url: images/crest_data_systems_pfsense_NGINX_Details.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: pfSense
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요

pfSense는 방화벽 및 라우터로 사용하도록 특별히 최적화된 FreeBSD 기반의 오픈 소스 맞춤형 배포판으로, 웹 인터페이스를 통해 관리할 수 있습니다.

이 통합은 pfSense CE에서 방화벽, OpenVPN, NGINX 및 DHCP에 대한 로그를 모니터링합니다. 또한, 수집된 로그에서 메트릭을 캡처하고 패킷 길이와 요청당 전송된 바이트 수에 관한 인사이트를 제공합니다.

## 지원

지원이나 기능 요청이 있을 경우 다음 채널로 Crest Data에 연락하세요.

- 고객지원: datadog.integrations@crestdata.ai
- 영업 이메일l: datadog-sales@crestdata.ai
- 웹사이트: [crestdata.ai][3]
- FAQ: [Crest Data Datadog Marketplace 통합 FAQ][11]

[1]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[3]: https://www.crestdata.ai/
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/?tab=agentv6v7
[5]: https://docs.netgate.com/pfsense/en/latest/monitoring/logs/settings.html
[6]: https://docs.netgate.com/pfsense/en/latest/config/general.html#localization
[7]: mailto:datadog.integrations@crestdata.ai
[8]: https://docs.crestdata.ai/datadog-integrations-readme/pFsense.pdf
[9]: https://docs.datadoghq.com/ko/agent/?tab=Linux
[10]: https://docs.datadoghq.com/ko/account_management/api-app-keys/
[11]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
---
이 애플리케이션은 Datadog Marketplace를 통해 제공되며 Datadog Technology Partner가 지원합니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-pfsense" target="_blank">Marketplace에서 구매하세요</a>.