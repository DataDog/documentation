---
algolia:
  subcategory: Marketplace インテグレーション
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
- data stores
- marketplace
- alerting
- sap
custom_kind: インテグレーション
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
  short_description: sybase インスタンスあたり/月
  tag: cds_sybase_host
  unit_label: アクティブな Sybase インスタンス
  unit_price: 195.0
public_title: SAP Sybase ASE
short_description: SAP Sybase ASE サーバーのパフォーマンスと使用状況を監視する
supported_os:
- linux
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Category::Data Stores
  - Category::Marketplace
  - Category::Alerting
  - Category::SAP
  - Offering::Integration
  - Submitted Data Type::Metrics
  - Submitted Data Type::Events
  configuration: README.md#Setup
  description: SAP Sybase ASE サーバーのパフォーマンスと使用状況を監視する
  media:
  - caption: SAP Sybase ASE - 概要
    image_url: images/crest_data_sybase_overview.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: SAP Sybase ASE
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

SAP Adaptive Server Enterprise (ASE) は、Sybase としても知られるリレーショナルデータベース管理システムです。あらゆる業界で高まるパフォーマンス、信頼性、効率性の要求に応えるため、リレーショナル管理モデルを採用した高性能な SQL データベースサーバーです。

このインテグレーションは、システム CPU 使用率、I/O CPU 使用率、ネットワーク統計などのライブサーバー統計を取得し、Datadog ダッシュボードでデータベースサーバーの状態を視覚化します。

## サポート

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Crest Data にお問い合わせください。

- サポートメール: [datadog.integrations@crestdata.ai][7]
- 営業メール: [datadog-sales@crestdata.ai][8]
- Web サイト: [crestdata.ai][3]
- よくあるご質問: [Crest Data Datadog Marketplace インテグレーションのよくあるご質問][11]



[1]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[3]: https://www.crestdata.ai/
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6v7
[5]: https://docs.datadoghq.com/ja/help/
[6]: https://www.devart.com/odbc/ase/
[7]: mailto:datadog.integrations@crestdata.ai
[8]: mailto:datadog-sales@crestdata.ai
[9]: https://docs.crestdata.ai/datadog-integrations-readme/Sybase.pdf
[10]: https://docs.datadoghq.com/ja/account_management/api-app-keys
[11]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
[12]: https://docs.datadoghq.com/ja/agent/?tab=Linux

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。利用するには、<a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-sybase" target="_blank">Marketplace でこのアプリケーションを購入してください</a>。