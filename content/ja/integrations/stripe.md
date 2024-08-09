---
app_id: stripe
app_uuid: ad2b7df2-b230-4a7d-b1d0-a964443a6534
assets:
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 624
    source_type_name: Stripe
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- ログの収集
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: stripe
integration_id: stripe
integration_title: Stripe
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: stripe
public_title: Stripe
short_description: Stripe からアカウントのイベント変更に関するログを受け取ることができます。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  configuration: README.md#Setup
  description: Stripe からアカウントのイベント変更に関するログを受け取ることができます。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Stripe
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Stripe は、あらゆる規模のインターネットビジネス向けにオンライン決済処理と商取引ソリューションを提供する API スイートです。Datadog を Stripe アカウントに接続すると、アカウントのイベント変更に関するログを受け取ることができます。

## 計画と使用

### ブラウザトラブルシューティング

#### ワークフローの自動化

1. Datadog の [Stripe インテグレーションタイル][1]の **Configuration** タブ内に生成された URL をコピーします。
2. Stripe アカウントの [Webhooks][2] ページにアクセスします。
3. **Add Endpoint** をクリックします。
4. ステップ 1 で生成した URL を **Endpoint URL** に貼り付けます。
5. **Description** に任意の説明を追加します。
6. リッスンしたいイベントを選択します。
7. **Add endpoint** をクリックします。


## リアルユーザーモニタリング

### データセキュリティ

Stripe インテグレーションには、メトリクスは含まれません。

### ワークフローの自動化

Stripe のイベントは、`stripe` ソースの下にログとして表示されます。

### ヘルプ

Stripe インテグレーションには、イベントは含まれません。

### ヘルプ

Stripe インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://app.datadoghq.com/integrations/stripe
[2]: https://dashboard.stripe.com/webhooks
[3]: https://docs.datadoghq.com/ja/help