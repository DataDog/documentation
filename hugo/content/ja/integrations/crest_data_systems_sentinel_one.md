---
algolia:
  subcategory: Marketplace インテグレーション
app_id: crest-data-systems-sentinel-one
app_uuid: 76849771-0309-46bc-b498-36de630b0c98
assets:
  dashboards:
    CDS Sentinel One - Activity Details: assets/dashboards/cds_sentinel_one_activity_details.json
    CDS Sentinel One - Endpoint Details: assets/dashboards/cds_sentinel_one_endpoint_details.json
    CDS Sentinel One - Group & application Details: assets/dashboards/cds_sentinel_one_group_and_application_details.json
    CDS Sentinel One - Threat Details: assets/dashboards/cds_sentinel_one_threat_details.json
    CDS SentinelOne - Alerts Details: assets/dashboards/cds_sentinel_one_alert_details.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10417
    source_type_name: crest_data_systems_sentinel_one
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- マーケットプレイス
- セキュリティ
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_sentinel_one
integration_id: crest-data-systems-sentinel-one
integration_title: SentinelOne
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_sentinel_one
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.crest_data_systems.sentinel_one
  product_id: sentinel-one
  short_description: SentineOne エンドポイントあたり/月
  tag: endpoint_id
  unit_label: SentinelOne Endpoint
  unit_price: 1.0
public_title: SentinelOne
short_description: SentinelOne のエージェント、脅威、アクティビティ、グループ、アプリケーションを監視します。
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
  - Category::Security
  - Offering::Integration
  - Submitted Data Type::Events
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: SentinelOne のエージェント、脅威、アクティビティ、グループ、アプリケーションを監視します。
  media:
  - caption: CDS SentinelOne - エンドポイントの詳細
    image_url: images/cds_sentinel_one_endpoint_details.png
    media_type: image
  - caption: CDS SentinelOne - グループおよびアプリケーションの詳細
    image_url: images/cds_sentinel_one_group_and_application_details.png
    media_type: image
  - caption: CDS SentinelOne - アクティビティの詳細
    image_url: images/cds_sentinel_one_activity_details.png
    media_type: image
  - caption: CDS SentinelOne - 脅威の詳細
    image_url: images/cds_sentinel_one_threat_details.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: SentinelOne
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

SentinelOne は、セキュリティ資産全体にわたって統合的な防止、検出、対応を提供するエンタープライズ向けサイバーセキュリティプラットフォームです。SentinelOne の Singularity プラットフォームは、エンタープライズサイバーセキュリティのための集中管理された自律型プラットフォームを通じて、最新のエンドポイント、クラウド、アイデンティティ保護を簡素化します。

このインテグレーションは、以下の種類のデータを収集します。

* アクティビティ
* アラート
* エージェント
* アプリケーション
* グループ
* 脅威

## サポート

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Crest Data にお問い合わせください。

- サポート: [datadog.integrations@crestdata.ai][5]
- セールス: [datadog-sales@crestdata.ai][6]
- Web サイト: [crestdata.ai][3]
- よくあるご質問: [Crest Data Datadog Marketplace インテグレーションのよくあるご質問][10]


[1]: 
https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[3]: https://www.crestdata.ai/
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6v7
[5]: mailto:datadog.integrations@crestdata.ai
[6]: mailto:datadog-sales@crestdata.ai
[7]: https://docs.crestdata.ai/datadog-integrations-readme/Sentinel_One.pdf
[8]: https://docs.datadoghq.com/ja/agent/?tab=Linux
[9]: https://docs.datadoghq.com/ja/account_management/api-app-keys
[10]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。利用するには、<a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-sentinel-one" target="_blank">Marketplace でこのアプリケーションを購入してください</a>。