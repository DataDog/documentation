---
algolia:
  subcategory: Marketplace Integrations
app_id: superwise-license
app_uuid: f15082a6-d0ed-4f6f-a315-f7cbcaae6823
assets: {}
author:
  homepage: https://www.superwise.ai
  name: Superwise
  sales_email: sales@superwise.ai
  support_email: support@superwise.ai
  vendor_id: superwise
categories:
- incidents
- marketplace
- notifications
- ai/ml
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: superwise_license
integration_id: superwise-license
integration_title: Superwise Model Observability
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: superwise_license
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.superwise
  product_id: license
  short_description: Priced per model per month and decreases as you scale
  tag: models
  unit_label: Model monitored
  unit_price: 199.0
public_title: Superwise Model Observability
short_description: Self-service ML observability and monitoring SaaS platform.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Incidents
  - Category::Marketplace
  - Category::Notifications
  - Category::AI/ML
  - Offering::Software License
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Self-service ML observability and monitoring SaaS platform.
  media:
  - caption: Superwise helps ML engineering teams monitor model health in production
      and shortens the time to detect and resolve.
    image_url: images/1_4.png
    media_type: image
  - caption: Superwise model observability dashboard gives you out-of-the-box visibility
      into model activity, drift, and open incidents.
    image_url: images/2_4.png
    media_type: image
  - caption: Superwise incidents let you drill into monitoring policy violations and
      identify root causes quickly.
    image_url: images/3_4.png
    media_type: image
  - caption: With the monitoring policy builder, it is easy to configure policies
      across metrics, features, and subpopulations and send them to Datadog.
    image_url: images/4_4.png
    media_type: image
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/superwise-datadog-marketplace/
  - resource_type: documentation
    url: https://docs.superwise.ai
  support: README.md#Support
  title: Superwise Model Observability
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要
Superwise は、企業が本番環境の機械学習 (ML) モデルの健全性を監視し、推論ストリーム全体におけるモデルのパフォーマンスと整合性の問題を迅速に検出することを支援します。Superwise は、モデルメトリクスの自動較正、イベントの分析、異常の関連付けを行うため、ML エンジニアリングチームや実務者は、いつ、どこで、なぜモデルが誤動作しているかを簡単に確認でき、問題がビジネス成果に影響を与える前に解決する時間を短縮することができます。


Superwise のモデル観測性プラットフォームにより、本番用 ML をあらゆる規模で監視することができます。Datadog Marketplace を通じて Superwise のサブスクリプションを購入すると、モデル数無制限の 14 日間無料トライアルが提供されます。トライアル終了後は、最初の 3 モデルは永久に無料です。また、Superwise の料金は使用ベースなので、いつでも監視の規模を拡大または縮小することができます。詳細については、[sales@superwise.ai][1] までお問い合わせください。

このタイルでは、Superwise のサブスクリプションを購入することができます。既に Superwise のアカウントをお持ちの場合は、[Superwise インテグレーションタイル][2]をクリックして Superwise Datadog インテグレーションをセットアップします。

Superwise のインテグレーションにより、Datadog ユーザーは既存の Datadog ワークフロー内で ML モデルを総合的に監視し、Superwise のメトリクスとインシデントを含めることで観測性を高め、モデルの問題をより深く調査することができます。Superwise ユーザーは、ビジネスにとって重要なカスタムメトリクスを Superwise 内で監視するように構成し、その情報を Datadog に送信して、あらゆるユースケースに対して観測性を拡張することができます。

## サポート

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Superwise にお問い合わせください。

- メール: [support@superwise.ai][3]

### その他の参考資料

- [Datadog Marketplace の Superwise の製品を使ってモデルパフォーマンスを監視する][4]
- [Superwise ドキュメント][5]

[1]: mailto:sales@superwise.ai
[2]: https://app.datadoghq.com/integrations/superwise
[3]: mailto:support@superwise.ai
[4]: https://www.datadoghq.com/blog/superwise-datadog-marketplace/
[5]: https://docs.superwise.ai
---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/superwise-license" target="_blank">こちらをクリック</a>してください。