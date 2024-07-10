---
categories:
- azure
- クラウド
- data store
dependencies: []
description: Azure DB for MariaDB のキーメトリクスを追跡
doc_link: https://docs.datadoghq.com/integrations/azure_db_for_mariadb/
draft: false
git_integration_title: azure_db_for_mariadb
has_logo: true
integration_id: azure-dbformariadb
integration_title: Microsoft Azure DB for MariaDB
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: azure_db_for_mariadb
public_title: Datadog-Microsoft Azure DB for MariaDB インテグレーション
short_description: Azure DB for MariaDB のキーメトリクスを追跡
version: '1.0'
---

## 概要

Azure Database for MariaDB は、サービスとしてエンタープライズ対応のフルマネージド型コミュニティ MariaDB データベースを提供します。

Azure Database for MariaDB からメトリクスを取得すると、以下のことができます。

- MariaDB データベースのパフォーマンスを視覚化
- MariaDB データベースのパフォーマンスをアプリケーションと関連付けることができます。

## セットアップ

### インストール

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_db_for_mariadb" >}}


### イベント

Azure Database for MariaDB インテグレーションには、イベントは含まれません。

### サービスのチェック

Azure Database for MariaDB インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_db_for_mariadb/azure_db_for_mariadb_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/