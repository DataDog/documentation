---
app_id: azure-customerinsights
app_uuid: 34e71ee6-2bd4-4de6-bd15-60052a12811e
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.customerinsights_hubs.dciapi_calls
      metadata_path: metadata.csv
      prefix: azure.customerinsights_hubs
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 286
    source_type_name: Azure Customer Insights
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- クラウド
- azure
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: azure_customer_insights
integration_id: azure-customerinsights
integration_title: Azure Customer Insights
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_customer_insights
public_title: Azure Customer Insights
short_description: Azure Customer Insights のキーメトリクスを追跡
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Azure
  - Offering::Integration
  configuration: README.md#Setup
  description: Azure Customer Insights のキーメトリクスを追跡
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Customer Insights
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Azure Customer Insights を使用すると、どのような規模のオーガニゼーションであっても、多種多様なデータセットを結合して知識やインサイトを得ることで、あらゆる角度から捉えた顧客の全体像を構築することができます。

Datadog Azure インテグレーションを使用して、Customer Insights からメトリクスを収集できます。

## セットアップ

### インストール

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## 収集データ

### メトリクス
{{ get-metrics-from-git "azure-customerinsights" }}


### イベント

Azure Customer Insights インテグレーションには、イベントは含まれません。

### サービスチェック

Azure Customer Insights インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_customer_insights/azure_customer_insights_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/