---
categories:
  - cloud
  - azure
  - data store
  - provisioning
  - configuration & deployment
ddtype: crawler
dependencies: []
description: Azure SQL Elastic Pool の主要メトリクスを追跡。
doc_link: 'https://docs.datadoghq.com/integrations/azure_sql_elastic_pool/'
draft: false
git_integration_title: azure_sql_elastic_pool
has_logo: true
integration_id: azure-sql-elastic-pool
integration_title: Microsoft Azure SQL Elastic Pool
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: azure_sql_elastic_pool
public_title: Datadog-Microsoft Azure SQL Elastic Pool インテグレーション
short_description: Azure SQL Elastic Pool の主要メトリクスを追跡。
version: '1.0'
---
## 概要

エラスティックプールは、複数のデータベースのパフォーマンスを管理するためのシンプルでコスト効率の高いソリューションを提供します。

Azure SQL Elastic Pool からメトリクスを取得すると、以下のことができます。

- SQL Elastic Pool のパフォーマンスを視覚化。
- SQL Elastic Pool のパフォーマンスをアプリケーションと関連付け。

## セットアップ

### インストール

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。これ以外に必要なインストール手順はありません。

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_sql_elastic_pool" >}}


### イベント

Azure SQL Elastic Pool インテグレーションには、イベントは含まれません。

### サービスのチェック

Azure SQL Elastic Pool インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_sql_elastic_pool/azure_sql_elastic_pool_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/