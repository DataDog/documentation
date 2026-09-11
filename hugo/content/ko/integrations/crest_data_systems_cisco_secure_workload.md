---
algolia:
  subcategory: Marketplace 통합
app_id: crest-data-systems-cisco-secure-workload
app_uuid: 5014e003-b478-4094-b618-69e9e3cf507a
assets:
  dashboards:
    Cisco Secure Workload - Enforcement: assets/dashboards/crest_data_systems_cisco_secure_workload_enforcement.json
    Cisco Secure Workload - Scope and Inventory: assets/dashboards/crest_data_systems_cisco_secure_workload_scope_and_inventory.json
    Cisco Secure Workload - Traffic Flow: assets/dashboards/crest_data_systems_cisco_secure_workload_traffic_flow.json
    Cisco Secure Workload - Vulnerabilities: assets/dashboards/crest_data_systems_cisco_secure_workload_vulnerabilities.json
    Cisco Secure Workload - Workload Details: assets/dashboards/crest_data_systems_cisco_secure_workload_workload_details.json
    Cisco Secure Workload - Workload Overview: assets/dashboards/crest_data_systems_cisco_secure_workload_workload_overview.json
    Cisco Secure Workload Overview: assets/dashboards/crest_data_systems_cisco_secure_workload_overview.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: cd.cisco.secure.workload.workload_stats_details.tx_packet_count
      metadata_path: metadata.csv
      prefix: cd.cisco.secure.workload
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 23600016
    source_type_name: crest_data_systems_cisco_secure_workload
  logs:
    source: crest-data-systems-cisco-secure-workload
  monitors:
    Agent Failed to Upgrade: assets/monitors/crest_data_systems_agent_upgrade_status_failed.json
    Agent Registration Failed: assets/monitors/crest_data_systems_agent_enforcer_registration_status_failed.json
    Potential Malicious Activity Detected from Consumer: assets/monitors/crest_data_systems_potential_malicious_activity_detected_from_consumer.json
    Potential Malicious Activity Detected from Provider: assets/monitors/crest_data_systems_potential_malicious_activity_detected_from_provider.json
    Total Active Internet Breach Vulnerabilities Exceeded Limit: assets/monitors/crest_data_systems_total_active_internet_breach_vulnerabilities_exceeds_limit.json
    Total Critical Vulnerabilities Exceeded Limit: assets/monitors/crest_data_systems_total_critical_vulnerabilities_exceeds_limit.json
    Total Easily Exploitable Vulnerabilities Exceeded Limit: assets/monitors/crest_data_systems_total_easily_exploitable_vulnerabilities_exceeds_limit.json
    Total High Vulnerabilities Exceeded Limit: assets/monitors/crest_data_systems_total_high_vulnerabilities_exceeds_limit.json
    Total Malware Exploitable Vulnerabilities Exceeded Limit: assets/monitors/crest_data_systems_total_malware_exploitable_vulnerabilities_exceeds_limit.json
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- security
- marketplace
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_cisco_secure_workload
integration_id: crest-data-systems-cisco-secure-workload
integration_title: Cisco Secure Workload
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_cisco_secure_workload
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.crest_data_systems.cisco_secure_workload
  product_id: cisco-secure-workload
  short_description: 워크로드당 월별
  tag: cds_cisco_secure_workload_workload
  unit_label: Cisco Secure Workload의 워크로드
  unit_price: 1.0
public_title: Cisco Secure Workload
short_description: Cisco Secure Workload의 워크로드, 시행, 트래픽, 인벤토리에 관한 로그와 메트릭을 모니터링하세요.
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
  - Category::Security
  - Category::Marketplace
  - Offering::Integration
  - Submitted Data Type::Logs
  - Submitted Data Type::Metrics
  - Submitted Data Type::Events
  configuration: README.md#Setup
  description: Cisco Secure Workload의 워크로드, 시행, 트래픽, 인벤토리에 대한 로그와 메트릭을 모니터링하세요.
  media:
  - caption: Cisco Secure Workload - 워크로드 세부 정보
    image_url: images/crest-data-systems-cisco-secure-workload-workload-details.png
    media_type: 이미지
  - caption: Cisco Secure Workload - 트래픽 플로
    image_url: images/crest-data-systems-cisco-secure-workload-traffic-flow.png
    media_type: 이미지
  - caption: Cisco Secure Workload - 취약성
    image_url: images/crest-data-systems-cisco-secure-workload-vulnerabilities.png
    media_type: 이미지
  - caption: Cisco Secure Workload 개요
    image_url: images/crest-data-systems-cisco-secure-workload-overview.png
    media_type: 이미지
  - caption: Cisco Secure Workload - 범위 및 인벤토리
    image_url: images/crest-data-systems-cisco-secure-workload-scope-and-inventory.png
    media_type: 이미지
  - caption: Cisco Secure Workload - 워크로드 개요
    image_url: images/crest-data-systems-cisco-secure-workload-workload-overview.png
    media_type: 이미지
  - caption: Cisco Secure Workload - 시행
    image_url: images/crest-data-systems-cisco-secure-workload-enforcement.png
    media_type: 이미지
  overview: README.md#Overview
  support: README.md#Support
  title: Cisco Secure Workload
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요

Cisco Secure Workload는 온프레미스 및 클라우드 인프라를 비롯한 다양한 환경의 애플리케이션과 워크로드를 위협 및 침해로부터 보호하도록 설계된 종합 보안 솔루션입니다.

이 통합은 다음 데이터 소스를 로그로 모니터링 및 시각화합니다.
* 인벤토리 데이터
* 트래픽 플로
* 워크로드 세부 정보
* 워크로드 패키지
* 워크로드 취약성
* 시행 데이터

아울러, 워크로드 및 인벤토리 통계에 관한 메트릭도 본 통합의 일부로써 수집됩니다.

## 지원

지원이나 기능 요청이 있을 경우 다음 채널로 Crest Data Systems에 연락하세요.

- 고객지원 이메일: [datadog.integrations@crestdata.ai][2]
- 영업 이메일: [datadog-sales@crestdata.ai][3]
- 웹사이트: [crestdata.ai][4]
- FAQs: [Crest Data Datadog Marketplace 통합 FAQ][11]


[1]: https://www.cisco.com/c/en/us/td/docs/security/workload_security/secure_workload/user-guide/3_9/cisco-secure-workload-user-guide-on-prem-v39/secure-workload-openapis.html#task_911065
[2]: mailto:datadog.integrations@crestdata.ai
[3]: mailto:datadog-sales@crestdata.ai
[4]: https://www.crestdata.ai/
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/?tab=agentv6v7
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[8]: https://docs.datadoghq.com/ko/agent/?tab=Linux
[9]: https://docs.datadoghq.com/ko/account_management/api-app-keys
[10]: https://www.crestdatasys.com/datadog-integrations-readme/Cisco_Secure_Workload.pdf
[11]: https://www.crestdatasys.com/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
---
이 애플리케이션은 Datadog Marketplace를 통해 제공되며 Datadog Technology Partner가 지원합니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-cisco-secure-workload" target="_blank">Marketplace에서 구매하세요</a>.