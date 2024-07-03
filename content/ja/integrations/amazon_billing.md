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
custom_kind: インテグレーション
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
short_description: AWS Billing allows you to track your AWS billing forecasts and
  costs.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Metrics
  - Category::Cloud
  - Category::Cost Management
  configuration: README.md#Setup
  description: AWS Billing allows you to track your AWS billing forecasts and costs.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: AWS Billing and Cost Management
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Overview

AWS Billing and Cost Management shows your estimated charges and budgeting metrics.

Enable this integration to see your AWS Billing and Cost Management metrics in Datadog.

**Note**: This integration requires the permission `budgets:ViewBudget` to be fully enabled. Billing metrics need to be enabled in the AWS console. For more information on setting up AWS, see [the Amazon Web Services integration documentation][1].

## セットアップ

### インストール

If you haven't already, set up the [Amazon Web Services integration][1] first.

### Metric collection

1. On the [AWS integration page][2], ensure that `Billing` is enabled under the `Metric Collection` tab.
2. Install the [Datadog - AWS Billing integration][3].

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_billing" >}}


### イベント

The AWS Billing and Cost Management integration does not include any events.

### サービスチェック

The AWS Billing and Cost Management integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][5].

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-billing
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_billing/metadata.csv
[5]: https://docs.datadoghq.com/ja/help/