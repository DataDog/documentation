---
aliases:
- /ja/integrations/azure_dbforpostgresql
categories:
- azure
- クラウド
- data store
dependencies: []
description: Azure DB for PostgreSQL のキーメトリクスを追跡
doc_link: https://docs.datadoghq.com/integrations/azure_db_for_postgresql/
draft: false
git_integration_title: azure_db_for_postgresql
has_logo: true
integration_id: azure-db-for-postgresql
integration_title: Microsoft Azure DB for PostgreSQL
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: azure_db_for_postgresql
public_title: Datadog-Microsoft Azure DB for PostgreSQL インテグレーション
short_description: Azure DB for PostgreSQL のキーメトリクスを追跡
version: '1.0'
---

## 概要

Azure Database for PostgreSQL は、サービスとして、エンタープライズ対応のフルマネージド型コミュニティ PostgreSQL データベースを提供します。

Azure DB for PostgreSQL からメトリクスを取得すると、以下のことができます。

- PostgreSQL データベースのパフォーマンスを視覚化できます。
- PostgreSQL データベースのパフォーマンスをアプリケーションと関連付けることができます。

## セットアップ

### インストール

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。これ以外に必要なインストール手順はありません。

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_db_for_postgresql" >}}


### イベント

Azure DB for PostgreSQL インテグレーションには、イベントは含まれません。

### サービスのチェック

Azure DB for PostgreSQL インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_db_for_postgresql/azure_db_for_postgresql_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/