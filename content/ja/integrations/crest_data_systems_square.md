---
algolia:
  subcategory: Marketplace インテグレーション
app_id: crest-data-systems-square
app_uuid: 1ebd23c1-5394-4cf9-a94e-6fe35dabf72d
assets:
  dashboards:
    Square - Events: assets/dashboards/crest_data_systems_square_events.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 37335937
    source_type_name: crest_data_systems_square
  logs:
    source: crest_data_systems_square
  monitors:
    Item out of stock: assets/monitors/crest_data_systems_square_item_out_of_stock.json
author:
  homepage: https://www.crestdata.ai/
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- marketplace
- クラウド
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_square
integration_id: crest-data-systems-square
integration_title: Square
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: crest_data_systems_square
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: square
  short_description: 月額の定額料金。
  unit_price: 195.0
public_title: Square
short_description: Square のイベントを監視および可視化
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
  - Category::Cloud
  - Offering::Integration
  - Submitted Data Type::Events
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Square のイベントを監視および可視化
  media:
  - caption: 'Square: Events'
    image_url: images/cds_square_events.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Square
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要
[**Square**][1] は、あらゆる規模のビジネスに対して、決済処理、在庫管理、カスタマー エンゲージメント、オンライン販売のためのハードウェアとソフトウェア ソリューションを提供するビジネス テクノロジー プラットフォームです。Square の **Events API** を活用することで、このインテグレーションはビジネス アクティビティへの可視性を提供し、Datadog にログとイベントとして取り込み、実行可能なインテリジェンスを提供します。

このインテグレーションには、すぐに使えるダッシュボードが 1 つ含まれます:

- **Square: Events**: このダッシュボードは、Square のイベント ログの概要を提供し、Square のモニタリングにおける 8 つの主要領域—payments、refunds、orders、inventory、customers、invoices、bookings、payouts—を 1 つの統合ビューにまとめ、可視性と実行可能なインテリジェンスを提供します。

このインテグレーションには、モニタリングとセキュリティを強化するため、次の [Datadog Cloud SIEM][6] 検知ルールが含まれます:

1. Unusual payment failure trend observed in Square
2. Unusual refund activity pattern observed in Square
3. Unusual dispute activity pattern observed in Square
4. Abnormal order cancellation pattern observed in Square

> **注**: 標準の検出ルールを使用するには、Datadog で該当のインテグレーションがインストールされ、Cloud SIEM が有効化されている必要があります。

このインテグレーションには、モニターが 1 つ含まれます:

1. Item out of stock : このモニターは、アイテムの在庫数が 0 に達したときにアラートを送信します。

## サポート
サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Crest Data にお問い合わせください。

- サポート用メール: [datadog.integrations@crestdata.ai][11]
- 営業メール: [datadog-sales@crestdata.ai][12]
- ウェブ サイト: [crestdata.ai][13]
- よくあるご質問: [Crest Data Datadog Marketplace インテグレーションのよくあるご質問][3]


[1]: https://squareup.com/
[2]: https://docs.crestdata.ai/datadog-integrations-readme/Square.pdf
[3]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
[4]: https://docs.datadoghq.com/ja/agent/?tab=Linux
[5]: https://developer.squareup.com/apps
[6]: https://docs.datadoghq.com/ja/security/cloud_siem/
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6v7
[8]: https://docs.datadoghq.com/ja/account_management/api-app-keys
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[10]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[11]: mailto:datadog.integrations@crestdata.ai
[12]: mailto:datadog-sales@crestdata.ai
[13]: https://www.crestdata.ai/
---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。利用するには、<a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-square" target="_blank">Marketplace でこのアプリケーションを購入してください</a>。