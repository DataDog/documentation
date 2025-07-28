---
app_id: azure-table-storage
app_uuid: 0d649e43-2cb7-4706-8d4b-3d4156c212f1
assets:
  dashboards:
    azure_table_storage: assets/dashboards/azure_table_storage.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.storage_storageaccounts_tableservices.table_count
      metadata_path: metadata.csv
      prefix: azure.storage_storageaccounts_tableservices
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 222
    source_type_name: Azure Table Storage
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- azure
- クラウド
- data stores
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: azure_table_storage
integration_id: azure-table-storage
integration_title: Azure Table Storage
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_table_storage
public_title: Azure Table Storage
short_description: Azure Table Storage のキーメトリクスを追跡
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Azure
  - Category::Cloud
  - Category::Data Stores
  - Offering::Integration
  configuration: README.md#Setup
  description: Azure Table Storage のキーメトリクスを追跡
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Table Storage
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Azure Table Storage は、大量の半構造化データセットを使用して迅速な開発を行うための NoSQL key-value ストアです。

Azure Table Storage からメトリクスを取得すると、以下のことができます。

- テーブルストレージのパフォーマンスを視覚化できます。
- テーブルストレージのパフォーマンスをアプリケーションと関連付けることができます。

## セットアップ

### インストール

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。これ以外に必要なインストール手順はありません。

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure-table-storage" >}}


### イベント

Azure Table Storage インテグレーションには、イベントは含まれません。

### サービスチェック

Azure Table Storage インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_table_storage/azure_table_storage_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/