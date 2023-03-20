---
app_id: rapdev-rapid7
app_uuid: 388017a0-e4cc-45ad-b038-c2141abf20c1
assets:
  dashboards:
    RapDev rapid7 Investigations: assets/dashboards/rapdev_rapid7_investigations.json
    RapDev rapid7 Overview: assets/dashboards/rapdev_rapid7_overview.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: rapdev.rapid7.logs.processed
      metadata_path: metadata.csv
      prefix: rapdev.rapid7.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: RapDev Rapid7
  logs:
    source: rapid7
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- ログの収集
- マーケットプレイス
- cloud
- モニタリング
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_rapid7
integration_id: rapdev-rapid7
integration_title: Rapid7
integration_version: ''
is_public: true
kind: integration
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_rapid7
oauth: {}
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: rapid7
  short_description: このインテグレーションの定額料金
  unit_price: 500
public_title: Rapid7 インテグレーション
short_description: Rapid7 ログおよび調査アクティビティを監視します
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Log Collection
  - Category::Marketplace
  - Category::Cloud
  - Category::Monitoring
  - Offering::Integration
  configuration: README.md#Setup
  description: Rapid7 ログおよび調査アクティビティを監視します
  media:
  - caption: Investigations
    image_url: images/R7_investigations_dash_redacted.png
    media_type: image
  - caption: 高レベルのステータス
    image_url: images/rapdev_rapid7_dashboard_.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Rapid7 インテグレーション
  uninstallation: README.md#Uninstallation
---



## 概要
このインテグレーションは、現在開かれている調査や最近終了した Rapid7 の調査のステータスを追跡します。このインテグレーションは、イベントの開始と終了時にイベントストリームに投稿し、調査の ID を中心にこれらのイベントを集計します。

チェックのログ部分 (有効な場合) は、Rapid7 REST API を使用して IDR ログストリームをクエリします。このインテグレーションは、Rapid7 プラットフォームレベルのログとみなされないすべてのログを返します。これらのログは Datadog に送信されます。**注:** これらのログの提出には、[Datadog ログ管理の価格体系](https://www.datadoghq.com/pricing/?product=log-management#log-management)に記載されているように、Datadog の価格プランに基づく追加料金が発生する場合があります。これらのログは、通常、Rapid7 エンドポイントエージェントのサマリーおよび特定の時間におけるプロセスのステータスで構成されています。

### ダッシュボード  
1. このインテグレーションには、Rapid 7 Investigations を要約したすぐに使えるダッシュボードが含まれています。
2. このインテグレーションには、ログに基づくダッシュボードの例も含まれています。このダッシュボードはインテグレーションのインストール時に利用可能ですが、データの流れを確認するために、R7 ログソースのファセットを作成する必要があります。

### イベント
このインテグレーションは、新しいオープン/クローズされた調査に対して Datadog のイベントを生成します。このインテグレーションは、ID に基づく調査の状態を追跡し、一緒に生成されたオープンとクローズのイベントを集計します。

### メトリクス
各チェックで処理されるログの数が、メトリクスとして報告されます。

### ログの収集
ログ収集はオプションで、デフォルトでは無効になっています。
このインテグレーションでは、Rapid7 ログ API を呼び出し、最終インターバルで利用可能なすべてのログをクエリします。デフォルトのインターバル時間は最新の分数です。Rapid7 insightIDR [ログ検索ドキュメント][5]で詳しく説明されているとおり、特定の[ログセット][4]を指定して、そのログのみを取得することができます。

## サポート
サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから RapDev.io にお問い合わせください。

- サポート: support@rapdev.io
- セールス: sales@rapdev.io
- チャット: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
- 電話: 855-857-0222

---
ボストンより ❤️ を込めて

*お探しのインテグレーションが見つかりませんか？組織に役立つ重要なツールの導入をお考えですか？RapDev へ[お問い合わせ](mailto:support@rapdev.io)ください！導入のサポートをいたします。*

[1]: https://insight.rapid7.com/platform#/apiKeyManagement/organization
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[4]: https://us.idr.insight.rapid7.com/op/D8A1412BEA86A11F15E5#/search
[5]: https://docs.rapid7.com/insightidr/log-search/

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/rapdev-rapid7" target="_blank">こちらをクリック</a>してください。