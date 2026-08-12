---
algolia:
  subcategory: Marketplace インテグレーション
app_id: iocs-dsi
app_uuid: fa54c361-9ffe-4f43-8636-7e6104da2dcd
assets:
  dashboards:
    'Stripe® Execs: Account & Application Management': assets/dashboards/Stripe_AccountApplicationManagement.json
    'Stripe® Execs: Customer Engagement Interaction': assets/dashboards/Stripe_CustomerEngagementInteraction.json
    'Stripe® Execs: Payment Lifecycle': assets/dashboards/Stripe_PaymentLifecycle.json
    'Stripe® Execs: Subscription Billing and Management': assets/dashboards/Stripe_SubscriptionBillingandManagement.json
    'Stripe® Execs: Transactions and Revenue': assets/dashboards/Stripe_Execs_TransactionsandRevenue.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: ioconnect.stripe.agent
      metadata_path: metadata.csv
      prefix: ioconnect.stripe
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 21692159
    source_type_name: iocs_dsi
  monitors:
    Stripe® High Transaction Volume Monitor: assets/monitors/StripeHighTransactionVolumeMonitor.json
    Stripe® Revenue Drop Monitor: assets/monitors/StripeRevenueDropMonitor.json
    Stripe® Transaction Failure Rate Monitor: assets/monitors/StripeTransactionFailureRateMonitor.json
author:
  homepage: https://www.novacloud.io/
  name: Nova
  sales_email: products.sales@novacloud.io
  support_email: support_ddp@novacloud.io
  vendor_id: ioconnect
categories:
- marketplace
- cloud
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: iocs_dsi
integration_id: iocs-dsi
integration_title: Stripe®
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: iocs_dsi
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: dsi
  short_description: 月額固定料金
  unit_price: 5
public_title: Stripe®
short_description: Stripe からの収益と取引のメトリクスを監視します。
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Category::Marketplace
  - Category::Cloud
  - Offering::Integration
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Stripe からの収益と取引のメトリクスを監視します。
  media:
  - caption: 'Stripe® Execs: アカウントとアプリケーション管理'
    image_url: images/StripeAccountAndApplicationManagement.png
    media_type: image
  - caption: 'Stripe® Execs: Customer Engagement Interaction'
    image_url: images/StripeCustomerEngagementInteraction.png
    media_type: image
  - caption: 'Stripe® Execs: トランザクションと収益'
    image_url: images/StripeExecsTransactionsAndRevenuesDashboard.png
    media_type: image
  - caption: 'Stripe® Execs: ペイメント ライフサイクル'
    image_url: images/StripePaymentLifeCycle.png
    media_type: image
  - caption: 'Stripe® Execs: サブスクリプション課金と管理'
    image_url: images/StripeSubscriptionBillingAndManagement.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Stripe®
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

シームレスで、**エージェント ベース** の Datadog インテグレーションにより、Stripe® のイベントから強力なインサイトを引き出します。Stripe® は、企業が世界中で支払いの受付、サブスクリプション管理、各種の財務オペレーションを実行できるリーディングなオンライン決済プラットフォームです。本インテグレーションにより、Stripe® のトランザクションから 200 以上のメトリクスを容易に監視・可視化でき、包括的な分析と監視が可能になります。[Stripe について詳しく見る][8]。

このソリューションは、支払いイベントの全体像、収益の追跡、エラー監視を提供し、財務オペレーションを最適化するための意思決定を支援します。

主な機能:

- 監視: 支払いトランザクション、サブスクリプション、顧客アクティビティを追跡・分析し、Stripe® データの即時可視性を提供します。
- 包括的なメトリクス カバレッジ: Stripe® の 200 を超える主要イベントをサポートし、支払い動向、エラー率、財務パフォーマンスに関する詳細なインサイトを提供します。
- プリビルドのダッシュボードとモニター: すぐにカスタマイズ可能なダッシュボードを導入し、異常を検知するモニターを設定することで、ビジネスへ影響が及ぶ前に潜在的な問題を先取りできます。
- シームレスなデータ ハンドリング: webhook を通じて Stripe® のイベントを取り込み、効率的に処理して Datadog に直接送信することで、レイテンシーを低減し、信頼性の高い監視体験を提供します。
- スケーラブルで信頼性が高い: Stripe® の大量イベント処理に対応する設計で、成長中の企業でも、webhook ごとに Stripe® でリッスンするイベントを選択することで、正確かつタイムリーなデータ レポーティングを実現します。

本インテグレーションを活用すれば、Stripe® のイベント データを手間なく実用的なインサイトへ変換し、データドリブンな意思決定を自信を持って行えます。

**重要なセキュリティ に関する注意:** 
このインテグレーションは、機密性の高い支払い情報 (クレジット カード情報や顧客の個人データなど) を保存または処理しません。イベント種別は カウント メトリクス として、また PaymentIntent トランザクションの金額は ゲージ メトリクス としてのみ取り込みます。これにより、PCI-DSS などの業界規制への完全な準拠を維持しつつ、財務データの安全性を確保します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "iocs_dsi" >}}


### イベント

Datadog Stripe インテグレーションには、イベントは含まれません。

## サポート

サポートや機能リクエストは、次の窓口から Nova Support へご連絡ください:

- メール: [support_ddp@novacloud.io][2]

[1]: https://app.datadoghq.com/account/settings#agent/overview
[2]: mailto:support_ddp@novacloud.io
[3]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#restart-the-agent
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#agent-information
[6]: https://app.datadoghq.com/account/settings/agent/latest
[7]: https://docs.stripe.com/webhooks#register-webhook
[8]: https://www.stripe.com/
[9]: https://github.com/DataDog/integrations-core/blob/master/iocs_dsi/metadata.csv
[10]: https://github.com/DataDog/integrations-core/blob/master/iocs_dsi/service_checks.json

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。利用するには、<a href="https://app.datadoghq.com/marketplace/app/iocs-dsi" target="_blank">Marketplace でこのアプリケーションを購入してください</a>。