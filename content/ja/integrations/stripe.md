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
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: stripe
integration_id: stripe
integration_title: Stripe
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: stripe
public_title: Stripe
short_description: Receive logs about event changes in your account from Stripe.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  configuration: README.md#Setup
  description: Receive logs about event changes in your account from Stripe.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Stripe
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Overview

Stripe is a suite of APIs powering online payment processing and commerce solutions for internet businesses of all sizes. Connect Datadog with your Stripe account to receive logs about event changes in your account.

## セットアップ

### 構成

#### Logs

1. Copy the generated URL inside the **Configuration** tab on the Datadog [Stripe integration tile][1].
2. Go to the [Webhooks][2] page in your Stripe account.
3. Click **Add Endpoint**.
4. Paste the generated URL from Step 1 into the **Endpoint URL**.
5. Add an optional description in **Description**.
6. Select the events you want to listen to.
7. Click **Add endpoint**.


## 収集データ

### メトリクス

The Stripe integration does not include any metrics.

### Logs

Stripe events appear as logs under the `stripe` source.

### イベント

The Stripe integration does not include any events.

### サービスチェック

The Stripe integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][3].

[1]: https://app.datadoghq.com/integrations/stripe
[2]: https://dashboard.stripe.com/webhooks
[3]: https://docs.datadoghq.com/ja/help