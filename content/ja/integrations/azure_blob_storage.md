---
app_id: azure-blob-storage
app_uuid: 57ef97b4-651a-432d-9dc5-f56a94449d75
assets:
  dashboards:
    azure_blob_storage: assets/dashboards/azure_blob_storage.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.storage_storageaccounts_blobservices.blob_count
      metadata_path: metadata.csv
      prefix: azure.storage_storageaccounts_blobservices
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 226
    source_type_name: Azure Blob Storage
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
git_integration_title: azure_blob_storage
integration_id: azure-blob-storage
integration_title: Azure Blob Storage
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_blob_storage
public_title: Azure Blob Storage
short_description: Azure Blob Storage のキーメトリクスを追跡
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Azure
  - Category::Cloud
  - Category::Data Stores
  - Offering::Integration
  configuration: README.md#Setup
  description: Azure Blob Storage のキーメトリクスを追跡
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Blob Storage
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Azure Blob Storage は、Microsoft のクラウド用オブジェクトストレージソリューションです。Blob ストレージは、大量の非構造化データを格納できるように最適化されています。Azure Blob Storage からメトリクスを取得すると、以下のことができます。

- Blob Storage のパフォーマンスを視覚化できます。
- Blob Storage のパフォーマンスをアプリケーションと関連付けることができます。

## セットアップ

### インストール

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。これ以外に必要なインストール手順はありません。

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure-blob-storage" >}}


### イベント

Azure Blob Storage インテグレーションには、イベントは含まれません。

### サービスチェック

Azure Blob Storage インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_blob_storage/azure_blob_storage_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/