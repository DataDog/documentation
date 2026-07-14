---
app_id: azure-datalakestore
app_uuid: 56d73475-119f-498c-b8d8-b192f89aaba0
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.datalakestore_accounts.read_requests
      metadata_path: metadata.csv
      prefix: azure.datalakestore_accounts
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 289
    source_type_name: Azure Data Lake Store
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
git_integration_title: azure_data_lake_store
integration_id: azure-datalakestore
integration_title: Azure Data Lake Store
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_data_lake_store
public_title: Azure Data Lake Store
short_description: Azure Data Lake Store のキーメトリクスを追跡
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Azure
  - Category::Cloud
  - Category::Data Stores
  - Offering::Integration
  configuration: README.md#Setup
  description: Azure Data Lake Store のキーメトリクスを追跡
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Data Lake Store
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Azure Data Lake Store は、ビッグデータ分析を可能にする無制限のデータレイクです。

Datadog Azure インテグレーションを使用して、Data Lake Store からメトリクスを収集できます。

## セットアップ

### インストール

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## 収集データ

### メトリクス
{{ get-metrics-from-git "azure-datalakestore" }}


**注**: このインテグレーションは、Data Lake Storage Gen 1 のメトリクスのみを収集します。Data Lake Storage Gen 2 は Azure Blob Storage に構築されているため、そのメトリクスは Datadog の Blob ストレージネームスペース、`azure.storage_storageaccounts_blobservices.*` に収集されます。詳細については、[Azure Data Lake Storage Gen 2][3]に関するドキュメントを参照してください。

### イベント

Azure Data Lake Store インテグレーションには、イベントは含まれません。

### サービスチェック

Azure Data Lake Store インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_data_lake_store/azure_data_lake_store_metadata.csv
[3]: https://docs.microsoft.com/en-us/azure/storage/blobs/data-lake-storage-introduction
[4]: https://docs.datadoghq.com/ja/help/