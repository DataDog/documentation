---
algolia:
  subcategory: Marketplace 통합
app_id: crest-data-systems-dell-emc-isilon
app_uuid: 1c1b7c48-0c7c-46f2-9f0c-f68c74419244
assets:
  dashboards:
    Crest Dell EMC Isilon - Cluster Information: assets/dashboards/dell_emc_isilon_cluster_information.json
    Crest Dell EMC Isilon - Events: assets/dashboards/dell_emc_isilon_events.json
    Crest Dell EMC Isilon - File System: assets/dashboards/dell_emc_isilon_file_system.json
    Crest Dell EMC Isilon - Monitors Summary: assets/dashboards/dell_emc_isilon_monitors_summary.json
    Crest Dell EMC Isilon - Node Details: assets/dashboards/dell_emc_isilon_node_details.json
    Crest Dell EMC Isilon - Protocol Details: assets/dashboards/dell_emc_isilon_protocol_details.json
    Crest Dell EMC Isilon - Quota Information: assets/dashboards/dell_emc_isilon_quota_information.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: cds.emc.isilon.cluster_inventory.license_details
      metadata_path: metadata.csv
      prefix: cds.emc.isilon.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10225
    source_type_name: crest_data_systems_dell_emc_isilon
  logs: {}
  monitors:
    '[crest_data_systems_dell_emc_isilon] CPU Usage for each Node of Cluster': assets/monitors/cds_cpu_usage_for_each_node_and_cluster.json
    '[crest_data_systems_dell_emc_isilon] Disk Usage for each Node of Cluster': assets/monitors/cds_disk_usage_for_each_node_and_cluster.json
    '[crest_data_systems_dell_emc_isilon] Memory Usage for each Node of Cluster': assets/monitors/cds_memory_usage_for_each_node_and_cluster.json
author:
  homepage: https://www.crestdata.ai
  name: Crest Data Systems
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- 캐싱
- 데이터 스토어
- marketplace
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_dell_emc_isilon
integration_id: crest-data-systems-dell-emc-isilon
integration_title: Dell EMC Isilon
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_dell_emc_isilon
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.crest_data_systems.dell_emc_isilon
  product_id: dell-emc-isilon
  short_description: 지정된 비용은 매월 청구되는 클러스터별 비용입니다.
  tag: cds.emc.isilon.cluster
  unit_label: Dell EMC Isilon 클러스터
  unit_price: 995.0
public_title: Dell EMC Isilon
short_description: Dell EMC Isilon 클러스터 사용 및 성능 모니터링
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Caching
  - Category::Data Stores
  - Category::Marketplace
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Dell EMC Isilon 클러스터 사용 및 성능 모니터링
  media:
  - caption: Dell EMC Isilon - 클러스터 정보
    image_url: images/cds-dell-emc-isilon-cluster-information.png
    media_type: image
  - caption: Dell EMC Isilon - 노드 상세 정보
    image_url: images/cds-dell-emc-isilon-node-details.png
    media_type: image
  - caption: Dell EMC Isilon - 프로토콜 상세정보
    image_url: images/cds-dell-emc-isilon-protocol-details.png
    media_type: image
  - caption: Dell EMC Isilon - 파일 시스템
    image_url: images/cds-dell-emc-isilon-file-system.png
    media_type: image
  - caption: Dell EMC Isilon - 할당량 정보
    image_url: images/cds-dell-emc-isilon-quota-information.png
    media_type: image
  - caption: Dell EMC Isilon - 모니터 요약
    image_url: images/cds-dell-emc-isilon-monitors-summary.png
    media_type: image
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/dell-emc-isilon-monitoring-crest-data-systems-datadog-marketplace/
  - resource_type: 설명서
    url: https://www.crestdata.ai/data_sheet/datadog-setup-monitor/
  support: README.md#Support
  title: Dell EMC Isilon
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요

이 통합에서는 Dell EMC Isilon 클러스터와 노드 사용량과 성능을 모니터링합니다. 중요한 메트릭을 캡처하고 Dell EMC Isilon 클러스터의 상태와 운영에 관한 인사이트를 제공합니다. 또 각 노드와 클러스터의 CPU, 메모리, 디스크 사용량을 모니터링하고 알림을 보낼 수 있습니다.

| 대시보드 이름      | 설명                                                                             |
| ------------------- | --------------------------------------------------------------------------------------- |
| 클러스터 정보 | 이 대시보드는 클러스터 수준 정보를 제공합니다.                                      |
| 노드 상세정보        | 이 대시보드는 노드 수준 정보를 제공합니다.                                         |
| 프로토콜 상세정보    | 이 대시보드는 클러스터 전체 프로토콜 상세정보를 제공합니다.                                  |
| 파일 시스템         | 이 대시보드는 노드 수준 파일 시스템 상세정보를 제공합니다.                          |
| 할당량 정보   | 이 대시보드는 할당량 정보를 제공합니다.                                              |
| 모니터 요약    | 이 대시보드는 모니터 요약을 제공합니다. 이 통합에서 지원합니다. |

## 지원

지원이나 기능 요청이 있을 경우 다음 채널로 Crest Data에 연락하세요.

- 이메일 지원: [datadog.integrations@crestdata.ai][10]
- 영업 이메일: [datadog-sales@crestdata.ai][11]
- 웹사이트: [crestdata.ai][3]
- FAQ: [Crest Data Datadog Marketplace 통합 FAQ][8]

### 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Datadog Marketplace에서 Crest Data 통합을 이용해 Dell EMC Isilon 모니터링][1]
- [설정 가이드: Datadog 플랫폼에서 Dell EMC Isilon 모니터링][2]

[1]: https://www.datadoghq.com/blog/dell-emc-isilon-monitoring-crest-data-systems-datadog-marketplace/
[2]: https://www.crestdata.ai/data_sheet/datadog-setup-monitor/
[3]: https://www.crestdata.ai/
[4]: https://www.dell.com/support/manuals/en-in/isilon-onefs/ifs_pub_administration_guide_cli/administrative-roles-and-privileges
[5]: https://docs.crestdata.ai/datadog-integrations-readme/Dell_EMC_Isilon.pdf
[6]: https://docs.datadoghq.com/ko/agent/?tab=Linux
[7]: https://docs.datadoghq.com/ko/account_management/api-app-keys/
[8]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
[9]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/?tab=agentv6v7
[10]: mailto:datadog.integrations@crestdata.ai
[11]: mailto:datadog-sales@crestdata.ai
---
이 애플리케이션은 Datadog Technology Partner에서 지원하고 Marketplace에서 사용할 수 있습니다. 이 애플리케이션을 구입하려면 <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-dell-emc-isilon" target="_blank">여기를 클릭</a>하세요.