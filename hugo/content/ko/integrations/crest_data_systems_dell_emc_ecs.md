---
algolia:
  subcategory: Marketplace 통합
app_id: crest-data-systems-dell-emc-ecs
app_uuid: 27d7b888-4545-4b6b-b871-3e82f9056ecd
assets:
  dashboards:
    CDS Dell EMC ECS - Access Log: assets/dashboards/cds_dell_emc_ecs_access_log.json
    CDS Dell EMC ECS - Alerts: assets/dashboards/cds_dell_emc_ecs_alerts.json
    CDS Dell EMC ECS - Audit Events: assets/dashboards/cds_dell_emc_ecs_audit_events.json
    CDS Dell EMC ECS - Audit Syslog: assets/dashboards/cds_dell_emc_ecs_audit_log.json
    CDS Dell EMC ECS - Bucket Details: assets/dashboards/cds_dell_emc_ecs_bucket_details.json
    CDS Dell EMC ECS - CAS Logs: assets/dashboards/cds_dell_emc_ecs_cas_access_analysis.json
    CDS Dell EMC ECS - Capacity Utilization: assets/dashboards/cds_dell_emc_ecs_capacity_utilization.json
    CDS Dell EMC ECS - Cluster Details: assets/dashboards/cds_dell_emc_ecs_cluster_details.json
    CDS Dell EMC ECS - Disk Details: assets/dashboards/cds_dell_emc_ecs_disk_details.json
    CDS Dell EMC ECS - Namespace: assets/dashboards/cds_dell_emc_ecs_namespace.json
    CDS Dell EMC ECS - Node and Transaction Details: assets/dashboards/cds_dell_emc_ecs_node_details.json
    CDS Dell EMC ECS - Overview: assets/dashboards/cds_dell_emc_ecs_overview.json
    CDS Dell EMC ECS - Replication Group: assets/dashboards/cds_dell_emc_ecs_geo_replication.json
    CDS Dell EMC ECS - VDC Details: assets/dashboards/cds_dell_emc_ecs_vdc_details.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - cds.dell.emc.ecs.storagepool_metric.nodes
      metadata_path: metadata.csv
      prefix: cds.dell.emc.ecs
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10413
    source_type_name: crest_data_systems_dell_emc_ecs
  monitors:
    Free disk space of Cluster has reached the set threshold value: assets/monitors/cds_disk_free_usage_of_cluster.json
    Total number of unacknowledged critical alerts exceeds limit: assets/monitors/cds_total_unack_critical_alerts.json
    Total number of unacknowledged error alerts exceeds limit: assets/monitors/cds_total_unack_error_alerts.json
author:
  homepage: https://www.crestdata.ai
  name: Crest Data Systems
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- cloud
- 데이터 스토어
- marketplace
- 보안
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_dell_emc_ecs
integration_id: crest-data-systems-dell-emc-ecs
integration_title: Dell EMC ECS
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_dell_emc_ecs
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.crest_data_systems.dell_emc_ecs
  product_id: dell-emc-ecs
  short_description: 명시된 비용은 호스트당 월 기준입니다.
  tag: dell_emc_ecs_host
  unit_label: Dell EMC ECS Host
  unit_price: 995.0
public_title: Dell EMC ECS
short_description: Dell EMC ECS 호스트의 노드, 디스크, VDC, 네임스페이스 등을 시각화하세요.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - "\b카테고리::클라우드"
  - 카테고리::데이터 저장
  - Category::Marketplace
  - 카테고리::보안
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - 제출한 데이터 유형::메트릭
  - 제출한 데이터 유형::로그
  configuration: README.md#Setup
  description: Dell EMC ECS 호스트의 노드, 디스크, VDC, 네임스페이스 등을 시각화하세요.
  media:
  - caption: CDS Dell EMC ECS - Overview
    image_url: images/CDS_Dell_EMC_ECS_Overview.png
    media_type: image
  - caption: CDS Dell EMC ECS - Alerts
    image_url: images/CDS_Dell_EMC_ECS_Alerts.png
    media_type: image
  - caption: CDS Dell EMC ECS - Audit Events
    image_url: images/CDS_Dell_EMC_ECS_Audit_Events.png
    media_type: image
  - caption: CDS Dell EMC ECS - Capacity Utilization
    image_url: images/CDS_Dell_EMC_ECS_Capacity_Utilization.png
    media_type: image
  - caption: CDS Dell EMC ECS - Replication Group
    image_url: images/CDS_Dell_EMC_ECS_Geo_Replication.png
    media_type: image
  - caption: CDS Dell EMC ECS - Namespace
    image_url: images/CDS_Dell_EMC_ECS_Namespace.png
    media_type: image
  - caption: CDS Dell EMC ECS - CAS Logs
    image_url: images/CDS_Dell_EMC_ECS_CAS_Log_Analysis.png
    media_type: image
  - caption: CDS Dell EMC ECS - Access Logs
    image_url: images/CDS_Dell_EMC_ECS_Access_Logs.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Dell EMC ECS
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요

Dell EMC ECS는 기존 애플리케이션부터 최첨단 애플리케이션까지 광범위한 워크로드를 처리하도록 설계된 유연한 클라우드 스케일 스토리지 솔루션입니다. 다양한 프로토콜을 통해 전 세계 어디에서나 데이터에 쉽고 분산된 방식으로 액세스할 수 있습니다. ECS를 사용하면 프라이빗 클라우드 인프라에서 기대되는 신뢰성과 제어력을 유지하면서도 확장 가능한 퍼블릭 클라우드 서비스를 원활하게 제공할 수 있으며, 데이터 스토리지 요구 사항을 포괄적이고 효율적으로 충족할 수 있습니다.

이 통합은 Dell EMC ECS를 모니터링하고 호스트의 노드, 디스크, VDC, 네임스페이스 등에 관한 로그와 메트릭을 Datadog으로 전송합니다.

## 지원

지원이나 기능 요청이 있을 경우 다음 채널로 Crest Data에 연락하세요.

- 고객지원: [datadog.integrations@crestdata.ai][5]
- 영업: [datadog-sales@crestdata.ai][6]
- 웹사이트: [crestdata.ai][3]
- FAQ: [Crest Data Datadog Marketplace 통합 FAQ][11]

[1]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[3]: https://www.crestdata.ai/
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/?tab=agentv6v7
[5]: mailto:datadog.integrations@crestdata.ai
[6]: mailto:datadog-sales@crestdata.ai
[7]: https://www.dell.com/support/manuals/en-in/ecs-appliance-/ecs_p_adminguide_3_5_0_1/add-a-syslog-server?guid=guid-f249bf08-ba24-4549-9756-40c5a3ef0c67&lang=en-us
[8]: https://docs.crestdata.ai/datadog-integrations-readme/DELL_EMC_ECS.pdf
[9]: https://docs.datadoghq.com/ko/agent/?tab=Linux
[10]: https://docs.datadoghq.com/ko/account_management/api-app-keys/
[11]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
---
이 애플리케이션은 Datadog Marketplace를 통해 제공되며 Datadog Technology Partner가 지원합니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-dell-emc-ecs" target="_blank">Marketplace에서 구매하세요</a>.