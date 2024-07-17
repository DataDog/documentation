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
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: superwise_license
integration_id: superwise-license
integration_title: Superwise モデル観測性
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
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/superwise-datadog-marketplace/
  - resource_type: documentation
    url: https://docs.superwise.ai
  support: README.md#Support
  title: Superwise モデル観測性
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview
Superwise helps businesses monitor Machine Learning (ML) model health in production to quickly detect issues with model performance and integrity across the inference stream. Superwise auto-calibrates model metrics, analyzes events, and correlates anomalies so ML engineering teams and practitioners can easily see where, when, and why models are misbehaving and accelerate time to resolution before issues impact business outcomes.


The Superwise model observability platform lets you monitor your production ML at any scale. When you purchase a subscription to Superwise through the Datadog Marketplace, you'll receive a 14 day free trial for an unlimited amount of models. After the trial expires, your first 3 models are free forever, and you can scale your monitoring up or down with Superwise's usage-based pricing at any time. For more information, contact [sales@superwise.ai][1].

On this tile, you can purchase a subscription to Superwise. If you already have a Superwise account, click on the [Superwise Integration tile][2] to set up the Superwise Datadog integration.    

With the Superwise integration, Datadog users are able to monitor their ML models holistically within their existing Datadog workflow and enrich their observability to include Superwise metrics and incidents for more investigations of model issues. Superwise users can configure any custom metric that is important to the business to monitor within Superwise and send the information to Datadog to extend their observability for any use case. 

## Support

For support or feature requests, reach out to Superwise through the following channel:

- Email: [support@superwise.ai][3]

### Further Reading

- [Monitor model performance with Superwise’s offering in the Datadog Marketplace][4]
- [Superwise Documentation][5]

[1]: mailto:sales@superwise.ai
[2]: https://app.datadoghq.com/integrations/superwise
[3]: mailto:support@superwise.ai
[4]: https://www.datadoghq.com/blog/superwise-datadog-marketplace/
[5]: https://docs.superwise.ai
---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/superwise-license" target="_blank">Click Here</a> to purchase this application.