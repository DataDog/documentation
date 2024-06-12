---
aliases:
- /ja/integrations/azure_datalakestore
categories:
- azure
- クラウド
- data stores
dependencies: []
description: Azure Data Lake Store のキーメトリクスを追跡
doc_link: https://docs.datadoghq.com/integrations/azure_data_lake_store/
draft: false
git_integration_title: azure_data_lake_store
has_logo: true
integration_id: azure-datalakestore
integration_title: Microsoft Azure Data Lake Store
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_data_lake_store
public_title: Datadog-Microsoft Azure Data Lake Store インテグレーション
short_description: Azure Data Lake Store のキーメトリクスを追跡
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Azure Data Lake Store は、ビッグデータ分析を可能にする無制限のデータレイクです。

Datadog Azure インテグレーションを使用して、Data Lake Store からメトリクスを収集できます。

## 計画と使用

### インフラストラクチャーリスト

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "azure_data_lake_store" >}}


**注**: このインテグレーションは、Data Lake Storage Gen 1 のメトリクスのみを収集します。Data Lake Storage Gen 2 は Azure Blob Storage に構築されているため、そのメトリクスは Datadog の Blob ストレージネームスペース、`azure.storage_storageaccounts_blobservices.*` に収集されます。詳細については、[Azure Data Lake Storage Gen 2][3]に関するドキュメントを参照してください。

### ヘルプ

Azure Data Lake Store インテグレーションには、イベントは含まれません。

### ヘルプ

Azure Data Lake Store インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_data_lake_store/azure_data_lake_store_metadata.csv
[3]: https://docs.microsoft.com/en-us/azure/storage/blobs/data-lake-storage-introduction
[4]: https://docs.datadoghq.com/ja/help/