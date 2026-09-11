---
algolia:
  subcategory: Marketplace 통합
app_id: crest-data-systems-netapp-bluexp
app_uuid: 3f01fc26-b405-4956-9b64-f7fa2c7ee05c
assets:
  dashboards:
    'NetApp BlueXP: Aggregate': assets/dashboards/crest_data_netapp_bluexp_aggregate.json
    'NetApp BlueXP: Cluster': assets/dashboards/crest_data_netapp_bluexp_cluster.json
    'NetApp BlueXP: Disk': assets/dashboards/crest_data_netapp_bluexp_disk.json
    'NetApp BlueXP: Inventory': assets/dashboards/crest_data_netapp_bluexp_inventory.json
    'NetApp BlueXP: Network': assets/dashboards/crest_data_netapp_bluexp_network.json
    'NetApp BlueXP: Node': assets/dashboards/crest_data_netapp_bluexp_node.json
    'NetApp BlueXP: Volume': assets/dashboards/crest_data_netapp_bluexp_volume.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: cds.netapp.bluexp.cluster.dc
      metadata_path: metadata.csv
      prefix: cds.netapp.bluexp.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 11493382
    source_type_name: crest_data_systems_netapp_bluexp
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- marketplace
- 데이터 저장
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_netapp_bluexp
integration_id: crest-data-systems-netapp-bluexp
integration_title: NetApp BlueXP
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_netapp_bluexp
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.crest_data_systems.netapp_bluexp
  product_id: netapp-bluexp
  short_description: Netapp 인스턴스당 월별
  tag: netapp_bluexp_serial_number
  unit_label: Netapp BlueXP의 서버 일련 번호
  unit_price: 495.0
public_title: NetApp BlueXP
short_description: NetApp BlueXP 인벤토리와 디지털 어드바이저 로그 및 메트릭을 모니터링하세요
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
  - 카테고리::데이터 저장
  - 제공::통합
  - Submitted Data Type::Metrics
  - Submitted Data Type::Events
  configuration: README.md#Setup
  description: NetApp BlueXP 인벤토리와 디지털 어드바이저 로그 및 메트릭을 모니터링하세요
  media:
  - caption: 'NetApp BlueXP: Aggregate'
    image_url: images/crest_data_netapp_bluexp_aggregate.png
    media_type: 이미지
  - caption: 'NetApp BlueXP: Cluster'
    image_url: images/crest_data_netapp_bluexp_cluster.png
    media_type: 이미지
  - caption: 'NetApp BlueXP: Inventory'
    image_url: images/crest_data_netapp_bluexp_inventory.png
    media_type: 이미지
  - caption: 'NetApp BlueXP: Disk'
    image_url: images/crest_data_netapp_bluexp_disk.png
    media_type: 이미지
  - caption: 'NetApp BlueXP: Network'
    image_url: images/crest_data_netapp_bluexp_network.png
    media_type: 이미지
  - caption: 'NetApp BlueXP: Node'
    image_url: images/crest_data_netapp_bluexp_node.png
    media_type: 이미지
  - caption: 'NetApp BlueXp: Volume'
    image_url: images/crest_data_netapp_bluexp_volume.png
    media_type: 이미지
  overview: README.md#Overview
  support: README.md#Support
  title: NetApp BlueXP
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요

NetApp BlueXP는 온프레미스 및 클라우드 환경 전반에서 데이터를 구축, 보호, 관리할 수 있는 단일 제어 플레인을 제공합니다. BlueXP SaaS 플랫폼에는 스토리지 관리, 데이터 이동성, 데이터 보호, 데이터 분석 및 제어 기능을 제공하는 서비스가 포함되어 있습니다.

NetApp BlueXP의 Datadog 통합 기능은 서버 및 구성 요소 통계를 가져와 주기적으로 Datadog에 전송합니다. Cluster, Node, Network, Aggregate, Volume, Disk, Firmware 버전과 Digital Advisor 레퍼런스를 지원합니다. 또한 리소스, 워크스페이스, 사용자, 감사와 같은 인벤토리 데이터도 포함하며, 사전 구성된 대시보드와 모니터를 통해 빠르게 인사이트를 확보하고 효율적으로 데이터를 관리할 수 있습니다.

### 데이터 유형

Netapp BlueXP의 Datadog 통합에서는 다음과 같은 유형의 데이터가 수집됩니다.

| 데이터 유형                   | 가져온 세부정보                         |
| -------------------------- | ------------------------------------ |
| 인벤토리                  | Account, Workspace, Resources, Audit | 
| Digital Advisory           | Cluster, Node, Aggregate, Disk, Volume, Network Interface, Network Ports  | 

## 지원

지원이나 기능 요청이 있을 경우 다음 채널로 Crest Data에 연락하세요.

- 고객지원: datadog.integrations@crestdata.ai
- 영업: datadog-sales@crestdata.ai
- 웹사이트: [crestdata.ai][8]
- FAQ: [Crest Data Datadog Marketplace 통합 FAQ][9]

[1]: https://docs.datadoghq.com/ko/agent/?tab=Linux
[2]: https://docs.netapp.com/us-en/bluexp-setup-admin/task-managing-netapp-accounts.html#manage-a-workspace-admins-workspaces
[3]: https://docs.netapp.com/us-en/active-iq/task_generate_tokens_API_services.html
[4]: https://docs.datadoghq.com/ko/agent/configuration/agent-configuration-files/?tab=agentv6v7
[5]: https://docs.datadoghq.com/ko/account_management/api-app-keys/
[6]: https://docs.datadoghq.com/ko/agent/configuration/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ko/agent/configuration/agent-commands/?tab=agentv6v7#agent-status-and-information
[8]: https://www.crestdata.ai/
[9]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
[12]: https://docs.crestdata.ai/datadog-integrations-readme/NetApp_BlueXP.pdf

---
이 애플리케이션은 Datadog Marketplace를 통해 제공되며 Datadog Technology Partner가 지원합니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-netapp-bluexp" target="_blank">Marketplace에서 구매하세요</a>.