---
app_id: azure-ai-search
app_uuid: 915dfd7c-1919-4cb8-a590-74c9a6ab806f
assets:
  dashboards:
    azure-ai-search: assets/dashboards/azure_ai_search_overview.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - azure.search_searchservices.count
      metadata_path: metadata.csv
      prefix: azure.search_searchservices.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 25994737
    source_type_name: Azure AI Search
  monitors:
    Azure AI Search Throttled Queries: assets/monitors/azure_ai_search_queries_throttled.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- azure
- ai/ml
- モニター
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: azure_ai_search
integration_id: azure-ai-search
integration_title: Azure AI Search
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_ai_search
public_title: Azure AI Search
short_description: Azure AI Search のパフォーマンスと使用状況を追跡するには、Azure AI Search 統合を使用します。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Azure
  - Category::AI/ML
  - Category::Metrics
  - Submitted Data Type::Metrics
  - Offering::Integration
  configuration: README.md#Installation
  description: Azure AI Search のパフォーマンスと使用状況を追跡するには、Azure AI Search 統合を使用します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure AI Search
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## 概要

Azure AI Search は、従来型および生成 AI の検索アプリケーション向けの情報検索を提供します。Datadog 統合を使用して、Azure AI Search サービスのパフォーマンスと使用状況を追跡します。

## セットアップ

### インストール
[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_ai_search" >}}


### サービスチェック

Azure AI Search にはサービス チェックは含まれません。

### イベント

Azure AI Search にはイベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

## その他の参考資料
お役に立つドキュメント、リンクや記事:

- [Datadog で Azure AI Search を監視する][4]



[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/integrations-internal-core/blob/main/azure_ai_search/metadata.csv
[3]: https://docs.datadoghq.com/ja/help/
[4]: https://www.datadoghq.com/blog/monitor-azure-ai-search-datadog/