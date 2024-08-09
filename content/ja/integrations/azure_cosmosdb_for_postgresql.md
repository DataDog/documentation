---
aliases:
- /ja/integrations/azure_cosmosdbforpostgresql
categories:
- azure
- クラウド
- data stores
dependencies: []
description: Azure Cosmos DB for PostgreSQL のキーメトリクスを追跡
doc_link: https://docs.datadoghq.com/integrations/azure_cosmosdb_for_postgresql/
draft: false
git_integration_title: azure_cosmosdb_for_postgresql
has_logo: true
integration_id: azure-cosmosdb-for-postgresql
integration_title: Microsoft Azure Cosmos DB for PostgreSQL
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: azure_cosmosdb_for_postgresql
public_title: Datadog-Microsoft Azure Cosmos DB for PostgreSQL インテグレーション
short_description: Azure Cosmos DB for PostgreSQL のキーメトリクスを追跡
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Azure Cosmos DB for PostgreSQL は、PostgreSQL を「分散テーブル」のパワーで拡張したものです。これにより、拡張性の高いリレーショナルアプリケーションを構築することができます。PostgreSQL と同じように、シングルノードクラスターでアプリの構築を開始します。アプリのスケーラビリティと性能要件が高まるにつれて、テーブルを透過的に分散させることで、複数ノードにシームレスに拡張することができます。

Datadog Azure インテグレーションを使用して、Azure Cosmos DB for PostgreSQL のメトリクスとログを収集します。また、すぐに洞察を得るためにすぐに使えるダッシュボードを利用することができます。

## 計画と使用

### インフラストラクチャーリスト

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。これ以外に必要なインストール手順はありません。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "azure_cosmosdb_for_postgresql" >}}


### ヘルプ

Azure Cosmos DB for PostgreSQL インテグレーションには、イベントは含まれません。

### ヘルプ

Azure Cosmos DB for PostgreSQL インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_cosmosdb_for_postgresql/azure_cosmosdb_for_postgresql_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/