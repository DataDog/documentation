---
algolia:
  subcategory: Marketplace インテグレーション
app_id: iocs-dmi
app_uuid: d546c16a-7623-42dd-8158-c98bb9656d81
assets:
  dashboards:
    'IO Connect Services Development: Optimizations': assets/dashboards/development_optimizations.json
    'IO Connect Services Execs: Cost Optimization': assets/dashboards/execs_cost_optimization.json
    'IO Connect Services Operations: APIs': assets/dashboards/operations_apis.json
    'IO Connect Services Operations: Infrastructure': assets/dashboards/operations_infrastructure.json
    'IO Connect Services Operations: RTF Infrastructure': assets/dashboards/rtf_infrastructure.json
    'IO Connect Services Operations: RTF Resource Allocation and Usage': assets/dashboards/rtf_resource_allocation.json
    'IO Connect Services Operations: Resources allocation': assets/dashboards/operations_resources_allocation_and_usage.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: ioconnect.mulesoft.anypoint.access_management.organization.entitlements.vcores_production.assigned
      metadata_path: metadata.csv
      prefix: ioconnect.mulesoft.anypoint.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10390703
    source_type_name: IO_Connect_DMI
  monitors:
    Servers status: assets/monitors/server_disconnected_monitor.json
    '[CloudHub] Apps status': assets/monitors/cloudhub_app_stopped_monitor.json
    '[CloudHub] CPU load': assets/monitors/cloudhub_cpu_load_monitor.json
    '[CloudHub] Memory usage': assets/monitors/cloudhub_memory_usage_monitor.json
    '[CloudHub] Overload queue': assets/monitors/cloudhub_queue_overload_monitor.json
    '[On-Prem] Apps errors': assets/monitors/onpremise_app_error_monitor.json
    '[On-Prem] Apps status': assets/monitors/onpremise_app_stopped_monitor.json
    '[On-Prem] CPU load': assets/monitors/onpremise_cpu_load_monitor.json
    '[On-Prem] Memory usage': assets/monitors/onpremise_memory_usage_monitor.json
    '[RTF] App Status Pending': assets/monitors/rtf_application_status_pending.json
    '[RTF] App Status Stopped': assets/monitors/rtf_applications_has_been_stopped.json
    '[RTF] CPU Total Usage': assets/monitors/rtf_cpu_total_usage.json
    '[RTF] Memory Total Usage': assets/monitors/rtf_memory_usage.json
author:
  homepage: https://www.ioconnectservices.com/
  name: IO Connect Services
  sales_email: dmi@ioconnectservices.com
  support_email: support_ddp@ioconnectservices.com
  vendor_id: ioconnect
categories:
- クラウド
- マーケットプレイス
- ネットワーク
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: iocs_dmi
integration_id: iocs-dmi
integration_title: Mule®
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: iocs_dmi
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.ioconnect.iocs_dmi
  product_id: dmi
  short_description: Unit Price per Production and Sandbox vCore
  tag: vcoreid
  unit_label: Production and Sandbox vCore
  unit_price: 35
public_title: Mule®
short_description: Collect metrics from MuleSoft products and upload them into Datadog.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Marketplace
  - Category::Network
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Collect metrics from MuleSoft products and upload them into Datadog.
  media:
  - caption: 'オペレーション: API ダッシュボード'
    image_url: images/dmi_ops_apis.png
    media_type: image
  - caption: 'オペレーション: インフラストラクチャーダッシュボード'
    image_url: images/dmi_ops_infra.png
    media_type: image
  - caption: 'オペレーション: リソース配分と使用状況のダッシュボード'
    image_url: images/dmi_ops_allocation.png
    media_type: image
  - caption: '開発: 最適化ダッシュボード'
    image_url: images/dmi_dev_optimization.png
    media_type: image
  - caption: 'エグゼクティブ: コスト最適化ダッシュボード'
    image_url: images/dmi_exec_cost_optimization.png
    media_type: image
  - caption: Datadog Connector for Mule 4
    image_url: images/dmi_mule_connector.png
    media_type: image
  - caption: Datadog APM
    image_url: images/dmi_apm_traces.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Mule®
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

[IO Connect Services][10] is a company specializing in Information Technology Consultancy Services. Our practices are Cloud Technologies, Systems Integration, Big Data, Cybersecurity, and Software Engineering. We provide services in all North America, Europe, and Latin America. Our headquarters are located in the NYC metropolitan area and we also have offices in Guadalajara, Mexico and Madrid, Spain.

Datadog Mule® インテグレーションは、MuleSoft 製品からメトリクスを収集し、Datadog にアップロードする Agent ベースのインテグレーションです。

{{< img src="marketplace/iocs_dmi/images/dmi_bundle.png" alt="Datadog Mule® Integration Bundle" >}}


You can collect the following metrics from MuleSoft products:

- Mule runtime for CloudHub, Runtime Fabric, and on-premise standalone servers 
- Anypoint Runtime Fabric
- Anypoint API Manager と API Analytics
- Anypoint Exchange 
- Anypoint Access Management 
- Object Store v2  

You can use these metrics to take advantage of Datadog's out-of-the-box dashboards and monitors, or you can create your own visualizations.

### ** Mule アプリケーションに必要な可観測性**

#### オペレーション (_インフラストラクチャー、API、アラート、リソース割り当てダッシュボード_) 

- Mule サーバー、アプリケーション、API、その他の IT インフラストラクチャーの状態を監視します
- Mule インフラストラクチャーに関するアラートを受信して視覚化します
- 組織の Anypoint プラットフォームリソース割り当てに関する洞察を獲得します

{{< img src="marketplace/iocs_dmi/images/dmi_ops_infra.png" alt="Operations: Infrastructure dashboard" >}}

{{< img src="marketplace/iocs_dmi/images/dmi_ops_apis.png" alt="Operations: APIs dashboard" >}}

{{< img src="marketplace/iocs_dmi/images/dmi_ops_allocation.png" alt="Operations: Resources allocation and usage dashboard" >}}

#### 開発 (_最適化ダッシュボード_) 

- Mule アプリケーションのメモリ、CPU、ネットワークの問題をすばやく特定します
- Mule アプリケーションのボトルネックを見つけて、パフォーマンスを最適化します
- トラブルシューティングの目的で、Mule 4 用の Datadog コネクタを使用して Mule アプリケーションをインスツルメントします

{{< img src="marketplace/iocs_dmi/images/dmi_dev_optimization.png" alt="Development: Optimizations dashboard" >}}

#### エグゼクティブ (_コスト最適化とダウンタイムのダッシュボード_) 

- 使用済みおよび未使用のリソースに基づいて ROI を分析、予測します
- Mule 投資のシステムアップタイムを可視化します

{{< img src="marketplace/iocs_dmi/images/dmi_exec_cost_optimization.png" alt="Executives: Cost optimization dashboard" >}}


### **Datadog Mule 4 コネクタを使用して Mule アプリケーションをインスツルメントします**

{{< img src="marketplace/iocs_dmi/images/dmi_mule_connector.png" alt="Datadog Connector for Mule 4" >}}

Datadog APM トレースを備えた Mule 4 用の Datadog コネクタを使えば、すぐに使用できるパフォーマンスダッシュボードを使用して可視性を獲得できます。

{{< img src="marketplace/iocs_dmi/images/dmi_apm_traces.png" alt="Datadog APM" >}}

スパンを使用して、フロー内の操作のパフォーマンスを必要に応じて詳細に測定します。

また、トランザクション内で生成されたログを 1 つのトレースに関連付けて、パフォーマンスの最適化またはトラブルシューティングの範囲を絞り込みます。

### **トラブルシューティング**

サポートが必要な場合は、[support_ddp@ioconnectservices.com][9] までお問い合わせください。

## Data Collected

### Metrics
{{< get-metrics-from-git "iocs_dmi" >}}

### Events

Datadog Mule® インテグレーションには、イベントは含まれません。

## Agent

For support or feature requests, contact IO Connect Services Support through the following channels:

- Email: [support_ddp@ioconnectservices.com][9]


[1]: https://www.ioconnectservices.com
[2]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[3]: https://github.com/DataDog/integrations-core/blob/master/iocs_dmi/datadog_checks/iocs_dmi/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#agent-information
[6]: https://github.com/DataDog/integrations-core/blob/master/iocs_dmi/metadata.csv
[7]: https://docs.datadoghq.com/ja/developers/integrations/new_check_howto/?tab=configurationfile#installing
[8]: https://docs.datadoghq.com/ja/developers/guide/custom-python-package/?tab=linux
[9]: mailto:support_ddp@ioconnectservices.com
[10]: https://www.ioconnectservices.com
[11]: https://app.datadoghq.com/account/settings#agent/overview
[12]: https://github.com/DataDog/integrations-core/blob/master/iocs_dmi/service_checks.json

---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/iocs-dmi" target="_blank">Click Here</a> to purchase this application.