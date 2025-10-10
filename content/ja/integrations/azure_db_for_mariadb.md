---
app_id: azure-dbformariadb
app_uuid: 7d232ca6-3098-473a-8d53-e6c3e22653bd
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.dbformariadb_servers.active_connections
      metadata_path: metadata.csv
      prefix: azure.dbformariadb_servers
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 290
    source_type_name: Azure DB for MariaDB
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
git_integration_title: azure_db_for_mariadb
integration_id: azure-dbformariadb
integration_title: Azure DB for MariaDB
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_db_for_mariadb
public_title: Azure DB for MariaDB
short_description: Azure DB for MariaDB のキーメトリクスを追跡
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Azure
  - Category::Cloud
  - Category::Data Stores
  - Offering::Integration
  configuration: README.md#Setup
  description: Azure DB for MariaDB のキーメトリクスを追跡
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure DB for MariaDB
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
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
{{ get-metrics-from-git "azure-dbformariadb" }}


### イベント

Azure Database for MariaDB インテグレーションには、イベントは含まれません。

### サービスチェック

Azure Database for MariaDB インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_db_for_mariadb/azure_db_for_mariadb_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/