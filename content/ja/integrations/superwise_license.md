---
algolia:
  subcategory: Marketplace インテグレーション
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
- インシデント
- マーケットプレイス
- notifications
- ai/ml
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: superwise_license
integration_id: superwise-license
integration_title: Superwise モデル観測性
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: superwise_license
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.superwise
  product_id: ライセンス
  short_description: 1 モデルあたりの月額料金で、規模が大きくなるにつれて料金が安くなる
  tag: モデル
  unit_label: 監視されるモデル
  unit_price: 199.0
public_title: Superwise モデル観測性
short_description: ML 観測・モニタリングのセルフサービス型 SaaS プラットフォーム。
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
  description: ML 観測・モニタリングのセルフサービス型 SaaS プラットフォーム。
  media:
  - caption: Superwise は、ML エンジニアリングチームが本番環境のモデルの健全性を監視し、検出と解決までの時間を短縮するのに役立ちます。
    image_url: images/1_4.png
    media_type: image
  - caption: Superwise のモデル観測性ダッシュボードにより、モデルのアクティビティ、ドリフト、オープンインシデントをすぐに可視化することができます。
    image_url: images/2_4.png
    media_type: image
  - caption: Superwise のインシデントにより、監視ポリシー違反の内容を掘り下げ、根本原因を迅速に特定することができます。
    image_url: images/3_4.png
    media_type: image
  - caption: モニタリングポリシービルダーを使えば、メトリクス、機能、サブポピュレーションにまたがるポリシーを簡単に構成し、Datadog に送信することができます。
    image_url: images/4_4.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Superwise モデル観測性
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要
Superwise は、企業が本番環境の機械学習 (ML) モデルの健全性を監視し、推論ストリーム全体におけるモデルのパフォーマンスと整合性の問題を迅速に検出することを支援します。Superwise は、モデルメトリクスの自動較正、イベントの分析、異常の関連付けを行うため、ML エンジニアリングチームや実務者は、いつ、どこで、なぜモデルが誤動作しているかを簡単に確認でき、問題がビジネス成果に影響を与える前に解決する時間を短縮することができます。


Superwise のモデル観測性プラットフォームにより、本番用 ML をあらゆる規模で監視することができます。Datadog Marketplace を通じて Superwise のサブスクリプションを購入すると、モデル数無制限の 14 日間無料トライアルが提供されます。トライアル終了後は、最初の 3 モデルは永久に無料です。また、Superwise の料金は使用ベースなので、いつでも監視の規模を拡大または縮小することができます。詳細については、[sales@superwise.ai][1] までお問い合わせください。

このタイルでは、Superwise のサブスクリプションを購入することができます。既に Superwise のアカウントをお持ちの場合は、[Superwise インテグレーションタイル][2]をクリックして Superwise Datadog インテグレーションをセットアップします。

Superwise のインテグレーションにより、Datadog ユーザーは既存の Datadog ワークフロー内で ML モデルを総合的に監視し、Superwise のメトリクスとインシデントを含めることで観測性を高め、モデルの問題をより深く調査することができます。Superwise ユーザーは、ビジネスにとって重要なカスタムメトリクスを Superwise 内で監視するように構成し、その情報を Datadog に送信して、あらゆるユースケースに対して観測性を拡張することができます。

## Agent

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