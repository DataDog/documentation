---
app_id: shopify
app_uuid: 81c0f478-e722-454a-83d3-5e3f45e11ca8
assets:
  dashboards:
    Shopify - Customer Overview: assets/dashboards/shopify_customer_overview.json
    Shopify - Event Overview: assets/dashboards/shopify_event_overview.json
    Shopify - Order Overview: assets/dashboards/shopify_order_overview.json
    Shopify - Product Overview: assets/dashboards/shopify_product_overview.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 622
    source_type_name: Shopify
  logs:
    source: shopify
  monitors:
    Order Cancellation Rate is High: assets/monitors/order_cancellation_rate.json
    Product Inventory is Out of Stock: assets/monitors/product_inventory_out_of_stock.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/shopify/README.md
description: Shopify のビジネス関連メトリクスを監視します。
display_on_public_website: true
doc_link: https://docs.datadoghq.com/integrations/shopify/
draft: false
git_integration_title: shopify
has_logo: false
integration_id: shopify
integration_title: Shopify
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: shopify
public_title: Shopify
short_description: Shopify の Event、Product、Customer、Order のログからインサイトを得ます。
supported_os: []
team: web-integrations
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Submitted Data Type::Logs
  - Offering::Integration
  configuration: README.md#Setup
  description: Shopify の Event、Product、Customer、Order のログからインサイトを得ます。
  media:
  - caption: Shopify - Event Overview
    image_url: images/shopify_event_overview.png
    media_type: image
  - caption: Shopify - Product Overview
    image_url: images/shopify_product_overview.png
    media_type: image
  - caption: Shopify - Customer Overview
    image_url: images/shopify_customer_overview.png
    media_type: image
  - caption: Shopify - Order Overview
    image_url: images/shopify_order_overview.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Shopify
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

[Shopify][1] は、誰もがビジネスを立ち上げ、運営し、成長させるのを支援するために設計された包括的なコマース プラットフォームです。オンライン ストアの構築、販売の管理、顧客へのマーケティング、デジタルと物理的な場所での決済の受け付けに役立つツールを提供します。

Shopify インテグレーションは Event、Product、Customer、Order のログを収集し、詳細な分析のために Datadog に送信します。

ログを可視化・分析するダッシュボードも含まれており、監視やパターンの把握が容易になります。

## セットアップ

### Shopify で API 資格情報を生成する
1. [Shopify][2] の管理者アカウントにログインします。
2. Shopify の Store name は、Store URL (`https://admin.shopify.com/store/xxxx`) の `xxxx` の部分です。
3. **Settings > Apps and sales channels** に移動します。
4. **Develop apps** を選択し、**Allow custom app development** をクリックします。
5. **Create a custom app** をクリックし、必要な詳細を入力して **Create app** をクリックします。
6. Overview タブで **Configure Admin API Scopes** をクリックします。
7. **Admin API access scopes** セクションで、次のスコープを選択します:
    - **read_orders**
    - **read_products**
    - **read_customers**
    - **read_content**
    - **read_price_rules**
8. 変更を適用するには **Save** をクリックします。
9. **Install app** をクリックし、**Admin API access token** セクションから **Access Token** を取得します。

### Shopify アカウントを Datadog に接続する
1. Store Name と Access Token を追加する
    |Parameters|Description|
    |--------------------|--------------------|
    |Store Name|Shopify 管理者アカウントのストア名。|
    |Access Token|Shopify 管理者アカウントの Access Token。|
2. **Save** ボタンをクリックして設定を保存します。

## 収集データ

### ログ

Shopify インテグレーションは Event、Product、Customer、Order のログを収集して Datadog に転送します。

### メトリクス

Shopify インテグレーションにはメトリクスは含まれません。

### サービスチェック

Shopify インテグレーションにはサービス チェックは含まれません。

### イベント

Shopify インテグレーションにはイベントは含まれません。

## トラブルシューティング

このインテグレーションは Shopify によって管理されていません。サポートが必要な場合は [Datadog サポート][3] にお問い合わせください。

[1]: https://www.shopify.com/
[2]: https://www.shopify.com/in/store-login
[3]: https://docs.datadoghq.com/ja/help/