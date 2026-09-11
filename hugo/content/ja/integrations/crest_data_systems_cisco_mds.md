---
algolia:
  subcategory: Marketplace インテグレーション
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
- ネットワーク
custom_kind: インテグレーション
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
  short_description: Per host per month
  tag: cds_cisco_mds_instance
  unit_label: Cisco MDS インスタンス
  unit_price: 95.0
public_title: Cisco MDS
short_description: Cisco MDS スイッチのログを監視します
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Marketplace
  - Offering::Integration
  - Submitted Data Type::Logs
  - Category::Network
  configuration: README.md#Setup
  description: Cisco MDS スイッチのログを監視します
  media:
  - caption: Cisco MDS - CDP およびコアの詳細
    image_url: images/crest_data_cisco_mds_cdp_and_core_details.png
    media_type: image
  - caption: Cisco MDS - CPU およびメモリの詳細
    image_url: images/crest_data_cisco_mds_cpu_and_memory_details.png
    media_type: image
  - caption: Cisco MDS - 診断テスト結果の詳細
    image_url: images/crest_data_cisco_mds_diagnostic_test_results_details.png
    media_type: image
  - caption: Cisco MDS - 環境の詳細
    image_url: images/crest_data_cisco_mds_environment_details.png
    media_type: image
  - caption: Cisco MDS - インターフェイスの詳細
    image_url: images/crest_data_cisco_mds_interface_details.png
    media_type: image
  - caption: Cisco MDS - モジュールの詳細
    image_url: images/crest_data_cisco_mds_module_details.png
    media_type: image
  - caption: Cisco MDS - ポートチャンネルの詳細
    image_url: images/crest_data_cisco_mds_port_channel_details.png
    media_type: image
  - caption: Cisco MDS - ゾーンの詳細
    image_url: images/crest_data_cisco_mds_zone_details.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Cisco MDS
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

Cisco Multilayer Director Switch (MDS) は、Cisco Systems が製造するストレージエリアネットワーク (SAN) スイッチおよびディレクターのファミリーを指します。 SAN は、ディスクアレイ、テープライブラリ、その他のストレージデバイスなどのブロックレベルのストレージデバイスへのアクセスを容易にする専用ネットワークです。

Cisco MDS スイッチは、SAN 環境において、ストレージデバイスに信頼性の高い高性能な接続を提供するように設計されています。 ファイバーチャンネルプロトコルのサポートなど、ストレージネットワーキングに特化した機能を備えています。 ファイバーチャンネルは、主に SAN で使用される、高速でサーバーとストレージデバイスを接続するネットワーク技術です。

このインテグレーションは、以下のデータソースを監視し、視覚化します。

- コア
- 診断テスト結果
- 環境
- FCS
- FLOGI セッション
- インターフェイス
- インベントリ
- ユーザー
- モジュール
- ポートチャンネル
- CPU
- メモリ
- システムログ
- トポロジー
- VSAN
- Zone

## サポート

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Crest Data にお問い合わせください。

- サポートメール: [datadog.integrations@crestdata.ai][5]
- 営業メール: [datadog-sales@crestdata.ai][6]
- Web サイト: [crestdata.ai][3]
- よくあるご質問: [Crest Data Datadog Marketplace インテグレーションのよくあるご質問][14]

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[3]: https://www.crestdata.ai/
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6v7
[5]: mailto:datadog.integrations@crestdata.ai
[6]: mailto:datadog-sales@crestdata.ai
[7]: https://www.cisco.com/c/en/us/td/docs/switches/datacenter/mds9000/sw/7_3/programmability/cisco_mds9000_programmability_guide_7x/nx_api.html#concept_1BB6AE2F8269406D9D0B7656F65CF316
[8]: https://www.cisco.com/c/en/us/td/docs/switches/datacenter/mds9000/sw/nx-os/configuration/guides/sysmgnt/sysmgmt_fm_4_2/sysmgmt_fm_4_2_cg/log.html#wp1184487
[9]: https://www.cisco.com/c/en/us/td/docs/switches/datacenter/mds9000/sw/7_3/programmability/cisco_mds9000_programmability_guide_7x/nx_api.html#id_10718
[10]: https://docs.datadoghq.com/ja/agent/?tab=Linux
[11]: https://docs.datadoghq.com/ja/help/
[12]: https://docs.datadoghq.com/ja/account_management/api-app-keys
[13]: https://docs.crestdata.ai/datadog-integrations-readme/Cisco_MDS.pdf
[14]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。利用するには、<a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-cisco-mds" target="_blank">Marketplace でこのアプリケーションを購入してください</a>。