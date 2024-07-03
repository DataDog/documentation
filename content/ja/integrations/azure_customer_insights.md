---
aliases:
- /ja/integrations/azure_customerinsights
categories:
- cloud
- azure
custom_kind: インテグレーション
dependencies: []
description: Track key Azure Customer Insights metrics.
doc_link: https://docs.datadoghq.com/integrations/azure_customer_insights/
draft: false
git_integration_title: azure_customer_insights
has_logo: true
integration_id: azure-customerinsights
integration_title: Microsoft Azure Customer Insights
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_customer_insights
public_title: Datadog-Microsoft Azure Customer Insights Integration
short_description: Track key Azure Customer Insights metrics.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Azure Customer Insights enables organizations of all sizes to bring together diverse data sets and generate knowledge and insights to build a holistic 360° view of their customers.

Use the Datadog Azure integration to collect metrics from Customer Insights.

## セットアップ

### インストール

If you haven't already, set up the [Microsoft Azure integration][1] first. There are no other installation steps.

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_customer_insights" >}}


### イベント

The Azure Customer Insights integration does not include any events.

### サービスチェック

The Azure Customer Insights integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][3].

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_customer_insights/azure_customer_insights_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/