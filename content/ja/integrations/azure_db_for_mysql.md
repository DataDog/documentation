---
aliases:
- /ja/integrations/azure_dbformysql
categories:
- azure
- クラウド
- data stores
dependencies: []
description: Azure DB for MySQL のキーメトリクスを追跡
doc_link: https://docs.datadoghq.com/integrations/azure_db_for_mysql/
draft: false
git_integration_title: azure_db_for_mysql
has_logo: true
integration_id: azure-db-for-mysql
integration_title: Microsoft Azure DB for MySQL
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: azure_db_for_mysql
public_title: Datadog-Microsoft Azure DB for MySQL インテグレーション
short_description: Azure DB for MySQL のキーメトリクスを追跡
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Azure Database for MySQL は、サービスとしてエンタープライズ対応のフルマネージド型コミュニティ MySQL データベースを提供します。

Azure Database for MySQL からメトリクスを取得すると、以下のことができます。

- MySQL データベースのパフォーマンスを視覚化できます。
- MySQL データベースのパフォーマンスをアプリケーションと関連付けることができます。

## 計画と使用

### インフラストラクチャーリスト

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。これ以外に必要なインストール手順はありません。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "azure_db_for_mysql" >}}


### ヘルプ

Azure Database for MySQL インテグレーションには、イベントは含まれません。

### ヘルプ

Azure Database for MySQL インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_db_for_mysql/azure_db_for_mysql_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/