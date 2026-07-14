---
algolia:
  subcategory: Marketplace インテグレーション
app_id: iocs-dp2i
app_uuid: 30256b66-a6d2-4a19-a952-0c0473e4532d
assets:
  dashboards:
    'PayPal® Billing Plan & Subscription: Activity Overview': assets/dashboards/PayPalBillingPlanSubscription_ActivityOverview.json
    'PayPal® Execs: Transactions and Revenue': assets/dashboards/PayPalExecs_TransactionsandRevenue.json
    'PayPal® Merchant: Integration and Migration': assets/dashboards/PayPalMerchant_IntegrationandMigration.json
    'PayPal® Payment and Checkout: Activity Overview': assets/dashboards/PayPalPaymentandCheckout_ActivityOverview.json
    'PayPal® Payouts: Activity Overview': assets/dashboards/PayPalPayouts_ActivityOverview.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: ioconnect.paypal.agent
      metadata_path: metadata.csv
      prefix: ioconnect.paypal
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 26186824
    source_type_name: iocs_dp2i
  monitors:
    PayPal® High Transaction Volume Monitor: assets/monitors/PayPalHighTransactionVolumeMonitor.json
    PayPal® Revenue Drop Monitor: assets/monitors/PayPalRevenueDropMonitor.json
    PayPal® Transaction Failure Rate Monitor: assets/monitors/PayPalTransactionFailureRateMonitor.json
author:
  homepage: https://www.novacloud.io/
  name: Nova
  sales_email: products.sales@novacloud.io
  support_email: support_ddp@novacloud.io
  vendor_id: ioconnect
categories:
- marketplace
- cost management
- cloud
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: iocs_dp2i
integration_id: iocs-dp2i
integration_title: Paypal®
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: iocs_dp2i
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: dp2i
  short_description: 月額固定料金
  unit_price: 5.0
public_title: Paypal®
short_description: Datadog で PayPal® からメトリクスを収集します。
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Category::Marketplace
  - Category::Cost Management
  - Category::Cloud
  - Offering::Integration
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Datadog で PayPal® からメトリクスを収集します。
  media:
  - caption: 'PayPal® 経営層向け: トランザクションと売上ダッシュボード'
    image_url: images/PayPalExecsTransactionsAndRevenueDashboard.png
    media_type: image
  - caption: 'PayPal® 請求プラン & サブスクリプション: アクティビティ概要'
    image_url: images/PayPalBillingPlanSubscriptionActivityOverview.png
    media_type: image
  - caption: 'PayPal® マーチャント: インテグレーションと移行'
    image_url: images/PayPalMerchant_IntegrationandMigration.png
    media_type: image
  - caption: 'PayPal® 決済および Checkout: アクティビティ概要'
    image_url: images/PayPalPaymentandCheckout_ActivityOverview.png
    media_type: image
  - caption: 'PayPal® Payouts: アクティビティ概要'
    image_url: images/PayPalPayoutsActivityOverview.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Paypal®
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

**Agent ベース**の Datadog インテグレーションにより、PayPal® イベントから強力なインサイトを引き出せます。PayPal® は、世界中のビジネスが支払い処理、トランザクション管理、さまざまな財務オペレーションを行えるオンライン ペイメント プラットフォームです。このインテグレーションを使うと、PayPal® トランザクションから 100 を超えるメトリクスを監視・可視化でき、充実した分析とモニタリングを実現します。[PayPal® の詳細][6]。

主な機能:

- **モニタリング**: 支払いトランザクション、返金、オーソリゼーション、顧客アクティビティを追跡・分析し、PayPal® データの状況を即座に把握できます。
- **包括的なメトリクス カバレッジ**: PayPal® から 100 を超える主要イベントにアクセスし、支払いトレンド、エラー レート、財務パフォーマンスに関するインサイトを得られます。
- **あらかじめ用意されたダッシュボードとモニター**: 柔軟にカスタマイズ可能なダッシュボードをすぐにデプロイし、異常を検知してビジネスへ影響が及ぶ前に潜在的な問題へ対処するためのモニターを設定できます。
- **シームレスなデータ ハンドリング**: Webhook 経由で PayPal® イベントを受信し、メッセージ ブローカー (ActiveMQ) でデータを処理して Datadog に送信することで、レイテンシを抑えつつ信頼性の高いモニタリングを実現します。
- **スケーラブルで信頼性の高い設計**: 大量の PayPal® イベントを処理できるため、成長段階にあるビジネスでも、PayPal® Webhook から必要なイベントだけを選択して、正確かつタイムリーなデータ レポーティングに活用できます。

このインテグレーションを最大限に活用し、PayPal® イベント データを実行可能なインサイトへと変換することで、自信を持ってデータ ドリブンな意思決定を行えるようになります。

**セキュリティに関する注意**:
このインテグレーションは、クレジット カード情報や個人の顧客データなどの機微な支払い情報を保存・処理しません。取得するのは、イベント タイプをカウント メトリクスとして、また支払いインテント トランザクションの金額をゲージ メトリクスとして集計したデータのみです。金融データの安全性は維持され、PCI-DSS などの業界規制へのコンプライアンスも確保されます。

## 収集データ

### メトリクス
{{< get-metrics-from-git "iocs_dp2i" >}}

### イベント

Datadog Paypal インテグレーションには、イベントは含まれません。

## サポート

サポートや機能リクエストは、次の窓口から Nova Support へご連絡ください:

- [support_ddp@novacloud.io][2]

[1]: https://app.datadoghq.com/account/settings#agent/overview
[2]: mailto:support_ddp@novacloud.io
[3]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#restart-the-agent
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#agent-information
[6]: https://developer.paypal.com/home/
[7]: https://app.datadoghq.com/account/settings/agent/latest
[8]: https://github.com/DataDog/integrations-core/blob/master/iocs_dpi/metadata.csv
[9]: https://github.com/DataDog/integrations-core/blob/master/iocs_dpi/service_checks.json
[10]: https://www.paypal.com/signin

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。利用するには、<a href="https://app.datadoghq.com/marketplace/app/iocs-dp2i" target="_blank">Marketplace でこのアプリケーションを購入してください</a>。