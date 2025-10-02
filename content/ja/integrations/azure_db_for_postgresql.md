---
app_id: azure-db-for-postgresql
app_uuid: 6306388c-c569-497a-ba36-c584c74cfffc
assets:
  dashboards:
    azure_db_for_postgresql: assets/dashboards/azure_db_for_postgresql.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - azure.dbforpostgresql_servers.storage_used
      - azure.dbforpostgresql_flexibleservers.cpu_percent
      metadata_path: metadata.csv
      prefix: azure.dbforpostgresql
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 223
    source_type_name: Azure DB for PostgreSQL
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
git_integration_title: azure_db_for_postgresql
integration_id: azure-db-for-postgresql
integration_title: Azure DB for PostgreSQL
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_db_for_postgresql
public_title: Azure DB for PostgreSQL
short_description: Azure DB for PostgreSQL のキーメトリクスを追跡
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Azure
  - Category::Cloud
  - Category::Data Stores
  - Offering::Integration
  configuration: README.md#Setup
  description: Azure DB for PostgreSQL のキーメトリクスを追跡
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure DB for PostgreSQL
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
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
{{< get-metrics-from-git "azure-db-for-postgresql" >}}


### イベント

Azure DB for PostgreSQL インテグレーションには、イベントは含まれません。

### サービスチェック

Azure DB for PostgreSQL インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_db_for_postgresql/azure_db_for_postgresql_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/