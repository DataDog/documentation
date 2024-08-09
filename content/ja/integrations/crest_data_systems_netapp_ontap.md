---
algolia:
  subcategory: Marketplace インテグレーション
app_id: crest-data-systems-netapp-ontap
app_uuid: c744f76a-7d04-4daf-bf7b-0902fbedd76d
assets:
  dashboards:
    NetApp OnTap - Disk: assets/dashboards/crest_data_systems_netapp_ontap_disk.json
    NetApp OnTap - Events: assets/dashboards/crest_data_systems_netapp_ontap_events.json
    NetApp OnTap - LUN: assets/dashboards/crest_data_systems_netapp_ontap_lun.json
    NetApp OnTap - Overview: assets/dashboards/crest_data_systems_netapp_ontap_overview.json
    NetApp OnTap - Volume: assets/dashboards/crest_data_systems_netapp_ontap_volume.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: cds.netapp.ontap.cluster_inventory.license_details
      metadata_path: metadata.csv
      prefix: cds.netapp.ontap
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: crest_data_systems_netapp_ontap
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
git_integration_title: crest_data_systems_netapp_ontap
integration_id: crest-data-systems-netapp-ontap
integration_title: NetApp OnTap
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_netapp_ontap
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.crest_data_systems.netapp_ontap
  product_id: netapp-ontap
  short_description: 1 クラスターあたり/月
  tag: cds_netapp_ontap_instance
  unit_label: NetApp ONTAP インスタンス
  unit_price: 495.0
public_title: NetApp OnTap
short_description: NetApp ONTAP クラスターのパフォーマンスと使用量の監視
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
  description: NetApp ONTAP クラスターのパフォーマンスと使用量の監視
  media:
  - caption: NetApp OnTap - Overview
    image_url: images/crest_data_systems_netapp_ontap_overview.png
    media_type: image
  - caption: NetApp OnTap - Disk
    image_url: images/crest_data_systems_netapp_ontap_disk.png
    media_type: image
  - caption: NetApp OnTap - LUN
    image_url: images/crest_data_systems_netapp_ontap_lun.png
    media_type: image
  - caption: NetApp OnTap - Volume
    image_url: images/crest_data_systems_netapp_ontap_volume.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: NetApp OnTap
  uninstallation: README.md#Uninstallation
---



## 概要

このインテグレーションは、NetApp OnTap クラスターとノードのパフォーマンスと使用量を監視します。重要なメトリクスをキャプチャし、NetApp OnTap クラスターのストレージとパフォーマンスに関する洞察を提供します。

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
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-netapp-ontap" target="_blank">こちらをクリック</a>してください。