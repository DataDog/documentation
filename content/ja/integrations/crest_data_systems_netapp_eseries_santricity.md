---
algolia:
  subcategory: Marketplace インテグレーション
app_id: crest-data-systems-netapp-eseries-santricity
app_uuid: 018234fd-7290-4477-9982-38d8df86803e
assets:
  dashboards:
    NetApp ESeries SANtricity Configuration - Array Summary: assets/dashboards/crest_data_systems_NetAppESeriesSANtricity_Configuration-ArraySummary.json
    NetApp ESeries SANtricity Performance - Array by Controller: assets/dashboards/crest_data_systems_NetAppESeriesSANtricity_Performance-ArraybyController.json
    NetApp ESeries SANtricity Performance - Array by Drive Channel: assets/dashboards/crest_data_systems_NetAppESeriesSANtricity_Performance-ArraybyDriveChannel.json
    NetApp ESeries SANtricity Performance - Array by Host Channel: assets/dashboards/crest_data_systems_NetAppESeriesSANtricity_Performance-ArraybyHostChannel.json
    NetApp ESeries SANtricity Performance - Cache Hits by Volume: assets/dashboards/crest_data_systems_NetAppESeriesSANtricity_Performance-CacheHitsbyVolume.json
    NetApp ESeries SANtricity Performance - Controller by Volume Group/Pool: assets/dashboards/crest_data_systems_NetAppESeriesSANtricity_Performance-ControllerbyVolumeGroup_Pool.json
    NetApp ESeries SANtricity Performance - Volume Group/Pool by Drive: assets/dashboards/crest_data_systems_NetAppESeriesSANtricity_Performance-VolumeGroup_PoolbyDrive.json
    NetApp ESeries SANtricity Performance - Volume Group/Pool by Volume: assets/dashboards/crest_data_systems_NetAppESeriesSANtricity_Performance-VolumeGroup_PoolbyVolume.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: cds.netapp.eseries.santricity.array.configuration.controller.summary
      metadata_path: metadata.csv
      prefix: cds.netapp.eseries.santricity.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10322
    source_type_name: crest_data_systems_netapp_eseries_santricity
author:
  homepage: https://www.crestdatasys.com
  name: Crest Data Systems
  sales_email: datadog-sales@crestdatasys.com
  support_email: datadog.integrations@crestdatasys.com
  vendor_id: crest-data-systems
categories:
- data stores
- マーケットプレイス
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_netapp_eseries_santricity
integration_id: crest-data-systems-netapp-eseries-santricity
integration_title: NetApp ESeries SANtricity
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_netapp_eseries_santricity
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.crest_data_systems.netapp_eseries_santricity
  product_id: netapp-eseries-santricity
  short_description: ストレージ配列 1 つあたりの月額料金。
  tag: cds_netapp_eseries_santricity_instance
  unit_label: NetApp ESeries SANtricity ストレージ配列
  unit_price: 495.0
public_title: NetApp ESeries SANtricity
short_description: システムのパフォーマンスと構成を監視します。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Data Stores
  - Category::Marketplace
  - Offering::Integration
  - Submitted Data Type::Metrics
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: システムのパフォーマンスと構成を監視します。
  media:
  - caption: NetApp ESeries SANtricity 構成 - 配列の概要
    image_url: images/CDS_NetAppESeriesSANtricity_Configuration-ArraySummary.png
    media_type: image
  - caption: NetApp ESeries SANtricity パフォーマンス - コントローラー別配列
    image_url: images/CDS_NetAppESeriesSANtricity_Performance-ArraybyController.png
    media_type: image
  - caption: NetApp ESeries SANtricity パフォーマンス - ボリューム別ボリュームグループ/プール
    image_url: images/CDS_NetAppESeriesSANtricity_Performance-VolumeGroup_PoolbyVolume.png
    media_type: image
  - caption: NetApp ESeries SANtricity パフォーマンス - ボリュームグループ/プール別コントローラー
    image_url: images/CDS_NetAppESeriesSANtricity_Performance-ControllerbyVolumeGroup_Pool.png
    media_type: image
  - caption: NetApp ESeries SANtricity パフォーマンス - ドライブチャンネル別配列
    image_url: images/CDS_NetAppESeriesSANtricity_Performance-ArraybyDriveChannel.png
    media_type: image
  - caption: NetApp ESeries SANtricity パフォーマンス - ホストチャンネル別配列
    image_url: images/CDS_NetAppESeriesSANtricity_Performance-ArraybyHostChannel.png
    media_type: image
  - caption: NetApp ESeries SANtricity パフォーマンス - ボリューム別キャッシュヒット
    image_url: images/CDS_NetAppESeriesSANtricity_Performance-CacheHitsbyVolume.png
    media_type: image
  - caption: NetApp ESeries SANtricity パフォーマンス - ドライブ別ボリュームグループ/プール
    image_url: images/CDS_NetAppESeriesSANtricity_Performance-VolumeGroup_PoolbyDrive.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: NetApp ESeries SANtricity
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

このインテグレーションは、NetApp ESeries SANtricity プラットフォームから構成とパフォーマンスの詳細を収集し、重要なメトリクスをキャプチャして、NetApp ESeries SANtricity で構成された配列のパフォーマンスを可視化します。

## Agent

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Crest Data Systems にお問い合わせください。

- サポートメール: datadog.integrations@crestdatasys.com
- 営業メール: datadog-sales@crestdatasys.com
- Web サイト: [crestdatasys.com][3]
- よくあるご質問: [Crest Data Datadog Marketplace インテグレーションのよくあるご質問][8]

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[3]: https://www.crestdatasys.com/
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6v7
[5]: https://www.crestdatasys.com/datadog-integrations-readme/NetApp_ESeries_SANtricity.pdf
[6]: https://docs.datadoghq.com/ja/agent/?tab=Linux
[7]: https://docs.datadoghq.com/ja/account_management/api-app-keys/
[8]: https://www.crestdatasys.com/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf


---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-netapp-eseries-santricity" target="_blank">こちらをクリック</a>してください。