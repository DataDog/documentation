---
categories:
  - cloud
  - azure
ddtype: crawler
dependencies: []
description: Azure Cosmos DB のキーメトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/azure_cosmosdb/'
draft: false
git_integration_title: azure_cosmosdb
has_logo: true
integration_id: azure-cosmosdb
integration_title: Microsoft Azure Cosmos DB
is_public: true
kind: integration
manifest_version: '1.0'
name: azure_cosmosdb
public_title: Datadog-Microsoft Azure Cosmos DB インテグレーション
short_description: Azure Cosmos DB のキーメトリクスを追跡
version: '1.0'
---
## 概要

Azure Cosmos DB は、ドキュメント、キー/値、ワイドカラム、グラフデータベースなどをサポートするグローバル分散型マルチモデルデータベースサービスです。

Datadog Azure インテグレーションを使用して、Cosmos DB からメトリクスを収集できます。

## セットアップ

### インストール

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_cosmosdb" >}}


### イベント

Azure Cosmos DB インテグレーションには、イベントは含まれません。

### サービスのチェック

Azure Cosmos DB インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_cosmosdb/azure_cosmosdb_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/