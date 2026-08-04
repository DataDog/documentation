---
algolia:
  subcategory: Marketplace 통합
app_id: crest-data-systems-armis
app_uuid: a9673290-7000-49d9-9f19-bbf049e6b746
assets:
  dashboards:
    Armis - Alerts: assets/dashboards/crest_data_systems_armis_alerts.json
    Armis - Device Application: assets/dashboards/crest_data_systems_armis_device_applications.json
    Armis - Devices: assets/dashboards/crest_data_systems_armis_devices.json
    Armis - Overview: assets/dashboards/crest_data_systems_armis_overview.json
    Armis - Policies: assets/dashboards/crest_data_systems_armis_policies.json
    Armis - Users: assets/dashboards/crest_data_systems_armis_users.json
    Armis - Vulnerabilities: assets/dashboards/crest_data_systems_armis_vulnerabilities.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 20667054
    source_type_name: crest_data_systems_armis
  logs:
    source: crest-data-systems-armis
  monitors:
    Total Critical Alerts Exceeds Limit: assets/monitors/crest_data_systems_total_critical_alerts_exceeds_limit.json
    Total Open Critical Vulnerabilities Exceeds Limit: assets/monitors/crest_data_systems_total_open_critical_vulnerabilities_exceeds_limit.json
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- 클라우드
- marketplace
- 로그 수집
- security
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_armis
integration_id: crest-data-systems-armis
integration_title: Armis Centrix
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_armis
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.crest_data_systems.armis
  product_id: armis
  short_description: 호스트당 월별
  tag: cds_armis_tenant
  unit_label: Armis tenant
  unit_price: 195.0
public_title: Armis Centrix
short_description: Armis에서 알림, 취약성, 장치, 장치 애플리케이션, 정책, 사용자 로그를 수집합니다.
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
  - Category::Cloud
  - Category::Marketplace
  - Category::Log Collection
  - Category::Security
  - Offering::Integration
  - Submitted Data Type::Logs
  - Submitted Data Type::Events
  configuration: README.md#Setup
  description: Armis에서 알림, 취약성, 장치, 장치 애플리케이션, 정책, 사용자에 대한 로그를 수집합니다.
  media:
  - caption: Armis - 알림
    image_url: images/crest-data-systems-armis-alerts.png
    media_type: 이미지
  - caption: Armis - 장치
    image_url: images/crest-data-systems-armis-devices.png
    media_type: 이미지
  - caption: Armis - 장치 애플리케이션
    image_url: images/crest-data-systems-armis-device-applications.png
    media_type: 이미지
  - caption: Armis - 정책
    image_url: images/crest-data-systems-armis-policies.png
    media_type: 이미지
  - caption: Armis - 사용자
    image_url: images/crest-data-systems-armis-users.png
    media_type: 이미지
  - caption: Armis - 취약성
    image_url: images/crest-data-systems-armis-vulnerabilities.png
    media_type: 이미지
  - caption: Armis - 개요
    image_url: images/crest-data-systems-armis-overview.png
    media_type: 이미지
  overview: README.md#Overview
  support: README.md#Support
  title: Armis Centrix
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요

사이버 노출 관리 플랫폼인 Armis CentrixTM는 Armis AI-driven Asset Intelligence Engine에 기반하여 전 세계 수십억 개의 에셋을 실시간으로 확인, 보호, 방어, 관리합니다. 클라우드 기반 플랫폼은 사이버 에셋 위험을 사전에 완화하고, 취약점을 수정하며, 위협을 차단하고, 전체 공격 표면을 보호합니다.

본 통합은 사이버 위험에 관한 실시간 감독 및 사전 대응 관리 기능을 제공하여 고객의 역량을 강화함으로써, 디지털 에셋을 지속적으로 보호하고 잠재적 위협을 방어합니다. 알림, 활동, 취약성, 장치, 장치 애플리케이션, 정책, 사용자를 Armis에서 모니터링할 수 있습니다.

## 지원

지원이나 기능 요청이 있을 경우 다음 채널로 Crest Data Systems에 연락하세요.

- 고객지원 이메일: [datadog.integrations@crestdata.ai][2]
- 영업 이메일: [datadog-sales@crestdata.ai][3]
- 웹사이트: [crestdata.ai][4]
- FAQ: [Crest Data Datadog Marketplace 통합 FAQ][12]


[1]: https://integration-crestdata.armis.com/settings/api-management
[2]: mailto:datadog.integrations@crestdata.ai
[3]: mailto:datadog-sales@crestdata.ai
[4]: https://www.crestdata.ai/
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/?tab=agentv6v7
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ko/help/
[8]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[9]: https://docs.datadoghq.com/ko/agent/?tab=Linux
[10]: https://docs.datadoghq.com/ko/account_management/api-app-keys
[11]: https://www.crestdatasys.com/datadog-integrations-readme/Armis.pdf
[12]: https://www.crestdatasys.com/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
---
이 애플리케이션은 Datadog Marketplace를 통해 제공되며 Datadog Technology Partner가 지원합니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-armis" target="_blank">Marketplace에서 구매하세요</a>.