---
algolia:
  subcategory: Marketplace インテグレーション
app_id: crest-data-systems-netapp-aiqum
app_uuid: b96cf12b-48c7-473f-9aac-3f1132a98402
assets:
  dashboards:
    NetApp AIQUM - Aggregate: assets/dashboards/crest_data_systems_netapp_aiqum_aggregate.json
    NetApp AIQUM - Cluster: assets/dashboards/crest_data_systems_netapp_aiqum_cluster.json
    NetApp AIQUM - Interfaces: assets/dashboards/crest_data_systems_netapp_aiqum_interfaces.json
    NetApp AIQUM - LUN: assets/dashboards/crest_data_systems_netapp_aiqum_lun.json
    NetApp AIQUM - Overview: assets/dashboards/crest_data_systems_netapp_aiqum_overview.json
    NetApp AIQUM - Port: assets/dashboards/crest_data_systems_netapp_aiqum_port.json
    NetApp AIQUM - QTree: assets/dashboards/crest_data_systems_netapp_aiqum_qtree.json
    NetApp AIQUM - Volume: assets/dashboards/crest_data_systems_netapp_aiqum_volume.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: cds.netapp.aiqum.cluster_inventory.license_details
      metadata_path: metadata.csv
      prefix: cds.netapp.aiqum
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: crest_data_systems_netapp_aiqum
author:
  homepage: https://www.crestdatasys.com
  name: Crest Data Systems
  sales_email: datadog-sales@crestdatasys.com
  support_email: datadog.integrations@crestdatasys.com
  vendor_id: crest-data-systems
categories:
- data store
- マーケットプレイス
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_netapp_aiqum
integration_id: crest-data-systems-netapp-aiqum
integration_title: NetApp AIQUM
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_netapp_aiqum
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.crest_data_systems.netapp_aiqum
  product_id: netapp-aiqum
  short_description: Active IQ Unified Manager インスタンス 1 つあたりの月額料金。
  tag: cds_netapp_aiqum_instance
  unit_label: NetApp AIQUM インスタンス
  unit_price: 495.0
public_title: NetApp AIQUM
short_description: NetApp AIQUM クラスターのパフォーマンスと使用量の監視
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Data Store
  - Category::Marketplace
  - Offering::Integration
  - Submitted Data Type::Metrics
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: NetApp AIQUM クラスターのパフォーマンスと使用量の監視
  media:
  - caption: NetApp AIQUM - Aggregate
    image_url: images/crest_data_systems_netapp_aiqum_aggregate.png
    media_type: image
  - caption: NetApp AIQUM - Cluster
    image_url: images/crest_data_systems_netapp_aiqum_cluster.png
    media_type: image
  - caption: NetApp AIQUM - Interfaces
    image_url: images/crest_data_systems_netapp_aiqum_interfaces.png
    media_type: image
  - caption: NetApp AIQUM - LUN
    image_url: images/crest_data_systems_netapp_aiqum_lun.png
    media_type: image
  - caption: NetApp AIQUM - Overview
    image_url: images/crest_data_systems_netapp_aiqum_overview.png
    media_type: image
  - caption: NetApp AIQUM - Port
    image_url: images/crest_data_systems_netapp_aiqum_port.png
    media_type: image
  - caption: NetApp AIQUM - QTree
    image_url: images/crest_data_systems_netapp_aiqum_qtree.png
    media_type: image
  - caption: NetApp AIQUM - Volume
    image_url: images/crest_data_systems_netapp_aiqum_volume.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: NetApp AIQUM
  uninstallation: README.md#Uninstallation
---



## 概要

このインテグレーションは、NetApp AIQUM Cluster、Aggregate、QTree、Interface、Port、FibreChannel、Volume のパフォーマンスと使用量を監視します。重要なメトリクスをキャプチャし、NetApp AIQUM データのストレージとパフォーマンスに関する洞察を提供します。

### アラート設定

このインテグレーションは、NetApp AIQUM Cluster、Aggregate、QTree、Interface、Port、FibreChannel、および Volume を監視します。

## サポート

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Crest Data Systems にお問い合わせください。

- サポートメール: datadog.integrations@crestdatasys.com
- 営業メール: datadog-sales@crestdatasys.com
- Web サイト: [crestdatasys.com][3]

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[3]: https://www.crestdatasys.com/
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6v7

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-netapp-aiqum" target="_blank">こちらをクリック</a>してください。