---
categories:
  - cloud
  - data store
  - caching
  - azure
ddtype: crawler
dependencies: []
description: Azure SQL Database の主要メトリクスを追跡。
doc_link: 'https://docs.datadoghq.com/integrations/azure_sql_database/'
draft: false
git_integration_title: azure_sql_database
has_logo: true
integration_id: azure-sql-database
integration_title: Microsoft Azure SQL Database
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: azure_sql_database
public_title: Datadog-Microsoft Azure SQL Database インテグレーション
short_description: Azure SQL Database の主要メトリクスを追跡。
version: '1.0'
---
## 概要

Azure SQL Database は、需要に応じて柔軟にスケーリングできるロバストなデータストアを提供します。

Azure SQL Database からメトリクスを取得すると、以下のことができます。

- SQL Database のパフォーマンスを視覚化。
- SQL Database のパフォーマンスをアプリケーションと関連付け。

## セットアップ

### インストール

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。これ以外に必要なインストール手順はありません。

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_sql_database" >}}


### イベント

Azure SQL Database インテグレーションには、イベントは含まれません。

### サービスのチェック

Azure SQL Database インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_sql_database/azure_sql_database_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/