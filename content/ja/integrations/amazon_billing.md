---
app_id: amazon-billing
app_uuid: 9409f423-8c1f-4a82-8632-1be74d52c028
assets:
  dashboards:
    aws_billing: assets/dashboards/amazon_billing_overview.json
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check:
      - aws.billing.estimated_charges
      metadata_path: metadata.csv
      prefix: aws.billing
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 158
    source_type_name: Amazon Billing
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- aws
- metrics
- cloud
- cost management
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: amazon_billing
integration_id: amazon-billing
integration_title: AWS Billing and Cost Management
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_billing
public_title: AWS Billing and Cost Management
short_description: AWS Billing で AWS の請求予測とコストを追跡できます。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Metrics
  - Category::クラウド
  - Category::Cost Management
  configuration: README.md#Setup
  description: AWS Billing で AWS の請求予測とコストを追跡できます。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: AWS Billing and Cost Management
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

AWS Billing and Cost Management は、推定請求額と予算メトリクスを表示します。

このインテグレーションを有効にすると、AWS Billing and Cost Management メトリクスを Datadog で確認することができます。

**注**: このインテグレーションでは `budgets:ViewBudget` 権限が完全に有効になっている必要があります。請求メトリクスは AWS コンソールで有効にする必要があります。AWS のセットアップの詳細については、[Amazon Web Services インテグレーションドキュメント][1]を参照してください。

## 計画と使用

### インフラストラクチャーリスト

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][2]で、`Metric Collection` タブの下にある `Billing` が有効になっていることを確認します。
2. [Datadog - AWS Billing インテグレーション][3]をインストールします。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "amazon_billing" >}}


### ヘルプ

AWS Billing and Cost Management インテグレーションには、イベントは含まれません。

### ヘルプ

AWS Billing and Cost Management インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-billing
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_billing/metadata.csv
[5]: https://docs.datadoghq.com/ja/help/