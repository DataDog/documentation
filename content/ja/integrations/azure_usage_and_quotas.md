---
app_id: azure-usage-and-quotas
app_uuid: 26bac8f2-d8b8-4623-8d55-3b4a5cc94abd
assets:
  dashboards:
    azure_usage_and_quotas: assets/dashboards/azure_usage_and_quotas.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.usage.current_value
      metadata_path: metadata.csv
      prefix: azure.usage.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 306
    source_type_name: Azure Usage and Quotas
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- azure
- クラウド
- コスト管理
- ネットワーク
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: azure_usage_and_quotas
integration_id: azure-usage-and-quotas
integration_title: Azure Usage and Quotas
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_usage_and_quotas
public_title: Azure Usage and Quotas
short_description: Azure Usage and Quotas allows you to keep track of your current
  usages and limits.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Azure
  - Category::Cloud
  - Category::Cost Management
  - Category::Network
  - Offering::Integration
  configuration: README.md#Setup
  description: Azure Usage and Quotas allows you to keep track of your current usages
    and limits.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Usage and Quotas
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Azure では、サブスクリプションリソースに対して事前に構成された上限を設定しています。予期せぬプロビジョニングの失敗を防ぐには、この上限を念頭に置いて Azure 環境の設計やスケーリングを行ってください。Azure Usage and Quotas からメトリクスを取得して、以下を行うことができます。

- リソース (コンピューティング、ネットワーク、ストレージ) の使用状況を割り当てに照らして視覚化。
- 割り当てが上限に達したこと把握し、プロビジョニングの失敗を予防。

## セットアップ

### インストール

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。これ以外に必要なインストール手順はありません。

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_usage_and_quotas" >}}


### イベント

Azure Quota インテグレーションには、イベントは含まれません。

### サービスチェック

Azure Quota インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_usage_and_quotas/azure_usage_and_quotas_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/