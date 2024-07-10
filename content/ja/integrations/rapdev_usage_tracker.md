---
algolia:
  subcategory: Marketplace インテグレーション
app_id: rapdev-usage-tracker
app_uuid: a7bdd804-96cb-422f-ab2b-46adcf1f5b5f
assets: {}
author:
  contact_link: https://meetings.hubspot.com/ewilliams/rapdev-marketplace
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- マーケットプレイス
- モニター
- slos
- コスト管理
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_usage_tracker
integration_id: rapdev-usage-tracker
integration_title: Usage Tracker
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: rapdev_usage_tracker
pricing:
- includes_assets: true
  private_offer_only: true
  product_id: usage-tracker
  short_description: 充実した通知機能による Datadog の使用状況モニタリング
  unit_price: null
public_title: Usage Tracker
short_description: 充実した通知機能による Datadog の使用状況モニタリング
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
  - Category::Metrics
  - Category::Alerting
  - Category::Cost Management
  - Offering::Professional Service
  - Queried Data Type::Logs
  - Queried Data Type::Metrics
  configuration: README.md#Setup
  description: 充実した通知機能による Datadog の使用状況モニタリング
  media:
  - caption: Usage Tracker 週間レポート
    image_url: images/weekly_report.png
    media_type: image
  - caption: アカウントの使用状況を表示するダッシュボード
    image_url: images/dashboard.png
    media_type: image
  - caption: Usage Tracker アラートメールの例
    image_url: images/alert_email.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Usage Tracker
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

RapDev はエンタープライズ規模の Datadog の実装に特化した Datadog ゴールドパートナーです。100 以上の実装と 25 以上の Datadog Marketplace インテグレーションを成功させた RapDev の Datadog に関する専門知識により、私たちは 2022 年と 2023 年の Datadog Solutions Integration Partner of the Year Award を受賞しました。

**Usage Tracker** を使用すると、予期しない費用が発生する前に、使用量の急増を監視することができます。主な利点は以下の通りです。
1. **可視性**: Datadog の使用状況を視覚化し、可観測性ソリューションから得られる価値を最適化するための実用的な洞察を得ることができます。
2. **利便性**: アラートを受信トレイで直接受け取り、使用量の急増を診断するために必要な詳細データにアクセスできます。
3. **実用的な洞察**: すぐに使えるダッシュボードを使用して、根本的な構成の問題や使用量の変化を特定するために必要なコンテキストを得ることができます。

これはホストサービスです。開始に当たって、RapDev は以下の情報にアクセスします。
- お使いの Datadog アカウントの API キー
- 以下のスコープを持つお使いの Datadog アカウントのアプリケーションキー
    - `metrics_read`
    - `events_read`
    - `timeseries_query`
- Datadog サイトの場所 (例: US1、US3、US5、EU1)
- 通知を送信する連絡先メールアドレス

## Agent
サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから RapDev.io にお問い合わせください。

- メール: [support@rapdev.io][2]
- チャット: [rapdev.io][3]
- 電話: 855-857-0222

---
ボストンより ❤️ を込めて

*お探しのインテグレーションが見つかりませんか？組織にとって重要な機能が欠けていますか？[こちら][2]からメッセージをお送りいただければ、我々が作成いたします！！*

[1]: mailto:sales@rapdev.io
[2]: mailto:support@rapdev.io
[3]: https://www.rapdev.io/#Get-in-touch

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/rapdev-usage-tracker" target="_blank">こちらをクリック</a>してください。