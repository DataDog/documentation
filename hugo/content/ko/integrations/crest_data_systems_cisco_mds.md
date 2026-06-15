---
algolia:
  subcategory: Marketplace 통합
app_id: crest-data-systems-cisco-mds
app_uuid: 7eba883f-8c0d-4908-be90-53433acef180
assets:
  dashboards:
    Cisco MDS - CDP and Cores Details: assets/dashboards/crest_data_cisco_mds_cdp_and_core_details.json
    Cisco MDS - CPU and Memory Details: assets/dashboards/crest_data_cisco_mds_cpu_and_memory_details.json
    Cisco MDS - Diagnostic Test Results Details: assets/dashboards/crest_data_cisco_mds_diagnostic_test_results_details.json
    Cisco MDS - Environment Details: assets/dashboards/crest_data_cisco_mds_environment_details.json
    Cisco MDS - FCS and FLOGI Session Details: assets/dashboards/crest_data_cisco_mds_fcs_and_flogi_session_details.json
    Cisco MDS - Interface Details: assets/dashboards/crest_data_cisco_mds_interface_details.json
    Cisco MDS - Inventory and Users Details: assets/dashboards/crest_data_cisco_mds_inventory_and_users_details.json
    Cisco MDS - Module Details: assets/dashboards/crest_data_cisco_mds_module_details.json
    Cisco MDS - Port Channel Details: assets/dashboards/crest_data_cisco_mds_port_channel_details.json
    Cisco MDS - System Log Details: assets/dashboards/crest_data_cisco_mds_system_log_details.json
    Cisco MDS - Topology Details: assets/dashboards/crest_data_cisco_mds_topology_details.json
    Cisco MDS - VSAN Details: assets/dashboards/crest_data_cisco_mds_vsan_details.json
    Cisco MDS - Zone Details: assets/dashboards/crest_data_cisco_mds_zone_details.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 11931276
    source_type_name: crest_data_systems_cisco_mds
  logs:
    source: crest-data-systems-cisco-mds
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- marketplace
- 네트워크
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_cisco_mds
integration_id: crest-data-systems-cisco-mds
integration_title: Cisco MDS
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_cisco_mds
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.crest_data_systems.cisco_mds
  product_id: cisco-mds
  short_description: 호스트당 월별
  tag: cds_cisco_mds_instance
  unit_label: Cisco MDS 인스턴스
  unit_price: 95.0
public_title: Cisco MDS
short_description: Cisco MDS 스위치 로그 모니터링
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - 지원 OS::Linux
  - 지원 OS::Windows
  - 지원 OS::macOS
  - Category::Marketplace
  - 제공::통합
  - 제출한 데이터 유형::로그
  - Category::Network
  configuration: README.md#Setup
  description: Cisco MDS 스위치 로그 모니터링
  media:
  - caption: Cisco MDS - CDP 및 핵심 정보
    image_url: images/crest_data_cisco_mds_cdp_and_core_details.png
    media_type: image
  - caption: Cisco MDS - CPU 및 메모리 핵심 정보
    image_url: images/crest_data_cisco_mds_cpu_and_memory_details.png
    media_type: image
  - caption: Cisco MDS - 진단 테스트 결과 세부 정보
    image_url: images/crest_data_cisco_mds_diagnostic_test_results_details.png
    media_type: image
  - caption: Cisco MDS - 환경 세부 정보
    image_url: images/crest_data_cisco_mds_environment_details.png
    media_type: image
  - caption: Cisco MDS - 인터페이스 세부 정보
    image_url: images/crest_data_cisco_mds_interface_details.png
    media_type: image
  - caption: Cisco MDS - 모듈 세부 정보
    image_url: images/crest_data_cisco_mds_module_details.png
    media_type: image
  - caption: Cisco MDS - 포트 채널 세부 정보
    image_url: images/crest_data_cisco_mds_port_channel_details.png
    media_type: image
  - caption: Cisco MDS - 구역 세부 정보
    image_url: images/crest_data_cisco_mds_zone_details.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Cisco MDS
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요

Cisco MDS(Multilayer Director Switch)는 Cisco Systems에서 제조한 SAN(Storage Area Network) 스위치 및 디렉터 제품군을 나타냅니다. SAN은 디스크 어레이, 테이프 라이브러리 및 기타 저장 장치와 같은 블록 수준 저장 장치에 대한 액세스를 용이하게 하는 특수 네트워크입니다.

Cisco MDS 스위치는 SAN 환경의 스토리지 장치에 안정적인 고성능 연결을 제공하도록 설계되었습니다. Fibre Channel 프로토콜 지원과 같이 스토리지 네트워킹에 맞게 특별히 맞춤화된 기능을 제공합니다. Fibre Channel은 서버와 저장 장치를 연결하기 위해 SAN에서 일반적으로 사용되는 고속 네트워크 기술입니다.

이 통합은 다음 데이터 소스를 모니터링하고 시각화합니다.

- 코어
- 진단 테스트 결과
- 환경
- FCS
- FLOGI 세션
- 인터페이스
- 인벤토리
- 사용자
- 모듈
- 포트 채널
- CPU
- 메모리
- 시스템 로그
- 토폴로지
- VSAN
- 영역(Zone)

## 지원

지원이나 기능 요청이 있을 경우 다음 채널로 Crest Data에 연락하세요.

- 고객지원: [datadog.integrations@crestdata.ai][5]
- 세일즈: [datadog-sales@crestdata.ai][6]
- 웹사이트: [crestdata.ai][3]
- FAQ: [Crest Data Datadog Marketplace 통합 FAQ][14]

## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][11]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[3]: https://www.crestdata.ai/
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/?tab=agentv6v7
[5]: mailto:datadog.integrations@crestdata.ai
[6]: mailto:datadog-sales@crestdata.ai
[7]: https://www.cisco.com/c/en/us/td/docs/switches/datacenter/mds9000/sw/7_3/programmability/cisco_mds9000_programmability_guide_7x/nx_api.html#concept_1BB6AE2F8269406D9D0B7656F65CF316
[8]: https://www.cisco.com/c/en/us/td/docs/switches/datacenter/mds9000/sw/nx-os/configuration/guides/sysmgnt/sysmgmt_fm_4_2/sysmgmt_fm_4_2_cg/log.html#wp1184487
[9]: https://www.cisco.com/c/en/us/td/docs/switches/datacenter/mds9000/sw/7_3/programmability/cisco_mds9000_programmability_guide_7x/nx_api.html#id_10718
[10]: https://docs.datadoghq.com/ko/agent/?tab=Linux
[11]: https://docs.datadoghq.com/ko/help/
[12]: https://docs.datadoghq.com/ko/account_management/api-app-keys
[13]: https://docs.crestdata.ai/datadog-integrations-readme/Cisco_MDS.pdf
[14]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf

---
이 애플리케이션은 Marketplace를 통해 제공되며 Datadog 기술 파트너의 지원을 받습니다. 구매하려면 <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-cisco-mds" target="_blank">여기를 클릭하세요</a>.