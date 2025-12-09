---
algolia:
  subcategory: Marketplace 통합
app_id: crest-data-systems-sybase
app_uuid: 3aafbab1-a91b-4566-a6ce-88323867cb8b
assets:
  dashboards:
    SAP Sybase ASE - Overview: assets/dashboards/crest_data_sybase_overview.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: cds.sybase.monNetworkIO.BytesSent
      metadata_path: metadata.csv
      prefix: cds.sybase
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 8061915
    source_type_name: crest_data_systems_sybase
  monitors:
    Sybase CPU Utilization is high: assets/monitors/crest_data_cpu_utilization_for_sybase.json
    Sybase CPU Utilization is reaching its limit: assets/monitors/crest_data_forecast_cpu_utilization_for_sybase.json
    Sybase Disk Utilization is high: assets/monitors/crest_data_disk_utilization_for_sybase.json
    Sybase Disk Utilization is reaching its limit: assets/monitors/crest_data_forecast_disk_utilization_for_sybase.json
    Sybase Global Heap Utilization is high: assets/monitors/crest_data_global_heap_utilization_for_sybase.json
    Sybase Global Heap Utilization is reaching its limit: assets/monitors/crest_data_forecast_global_heap_utilization_for_sybase.json
    Sybase I/O Utilization is high: assets/monitors/crest_data_io_utilization_for_sybase.json
    Sybase I/O Utilization is reaching its limit: assets/monitors/crest_data_forecast_io_utilization_for_sybase.json
    Sybase Memory Utilization is high: assets/monitors/crest_data_memroy_utilization_for_sybase.json
    Sybase Memory Utilization is reaching its limit: assets/monitors/crest_data_forecast_memory_utilization_for_sybase.json
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- 데이터 저장
- marketplace
- 경고
- sap
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_sybase
integration_id: crest-data-systems-sybase
integration_title: SAP Sybase ASE
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_sybase
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.crest_data_systems.sybase
  product_id: sybase
  short_description: Sybase 인스턴스당 월별
  tag: cds_sybase_host
  unit_label: 활성 Sybase 인스턴스
  unit_price: 195.0
public_title: SAP Sybase ASE
short_description: SAP Sybase ASE 서버의 성능 및 사용량 모니터링
supported_os:
- linux
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - 지원 OS::Linux
  - 지원 OS::Windows
  - 카테고리::데이터 저장
  - Category::Marketplace
  - Category::Alerting
  - Category::SAP
  - 제공::통합
  - Submitted Data Type::Metrics
  - Submitted Data Type::Events
  configuration: README.md#Setup
  description: SAP Sybase ASE 서버의 성능 및 사용량 모니터링
  media:
  - caption: SAP Sybase ASE - 개요
    image_url: images/crest_data_sybase_overview.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: SAP Sybase ASE
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요

Sybase라고도 불리는 SAP Adaptive Server Enterprise(ASE)는 관계형 데이터베이스 관리 시스템으로, 관계형 관리 모델을 사용하여 모든 산업에서 성능, 신뢰성, 효율성 면에서 증가하는 수요를 충족하는 고성능 SQL 데이터베이스 서버입니다.

본  통합은 시스템 CPU 사용률, I/O CPU 사용률, 네트워크 통계 등과 같은 실시간 서버 통계를 가져와서 Datadog 대시보드에서 데이터베이스 서버 상태를 시각화합니다.

## 지원

지원이나 기능 요청이 있을 경우 다음 채널로 Crest Data에 연락하세요.

- Support Email: [datadog.integrations@crestdata.ai][7]
- Sales Email: [datadog-sales@crestdata.ai][8]
- 웹사이트: [crestdata.ai][3]
- FAQ: [Crest Data Datadog Marketplace 통합 FAQ][11]



[1]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[3]: https://www.crestdata.ai/
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/?tab=agentv6v7
[5]: https://docs.datadoghq.com/ko/help/
[6]: https://www.devart.com/odbc/ase/
[7]: mailto:datadog.integrations@crestdata.ai
[8]: mailto:datadog-sales@crestdata.ai
[9]: https://docs.crestdata.ai/datadog-integrations-readme/Sybase.pdf
[10]: https://docs.datadoghq.com/ko/account_management/api-app-keys
[11]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
[12]: https://docs.datadoghq.com/ko/agent/?tab=Linux

---
이 애플리케이션은 Datadog Marketplace를 통해 제공되며 Datadog Technology Partner가 지원합니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-sybase" target="_blank">Marketplace에서 구매하세요</a>.