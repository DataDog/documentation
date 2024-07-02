---
"aliases":
- /integrations/azure_cosmosdbforpostgresql
"categories":
- azure
- cloud
- data stores
"custom_kind": "インテグレーション"
"dependencies": []
"description": "Track key Azure Cosmos DB for PostgreSQL metrics."
"doc_link": "https://docs.datadoghq.com/integrations/azure_cosmosdb_for_postgresql/"
"draft": false
"git_integration_title": "azure_cosmosdb_for_postgresql"
"has_logo": true
"integration_id": "azure-cosmosdb-for-postgresql"
"integration_title": "Microsoft Azure Cosmos DB for PostgreSQL"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "azure_cosmosdb_for_postgresql"
"public_title": "Datadog-Microsoft Azure Cosmos DB for PostgreSQL Integration"
"short_description": "Track key Azure Cosmos DB for PostgreSQL metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Azure Cosmos DB for PostgreSQL is PostgreSQL extended with the power of "distributed tables." This enables you to build highly scalable relational applications. Start building apps on a single node cluster, the same way you would with PostgreSQL. As your app's scalability and performance requirements grow, you can seamlessly scale to multiple nodes by transparently distributing your tables.

Use the Datadog Azure integration to collect metrics and logs for Azure Cosmos DB for PostgreSQL. You can also utilize the out of the box dashboard for immediate insights.

## セットアップ

### インストール

If you haven't already, set up the [Microsoft Azure integration][1] first. There are no other installation steps that need to be performed.

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_cosmosdb_for_postgresql" >}}


### イベント

The Azure Cosmos DB for PostgreSQL integration does not include any events.

### サービスチェック

The Azure Cosmos DB for PostgreSQL integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][3].

[1]: https://docs.datadoghq.com/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_cosmosdb_for_postgresql/azure_cosmosdb_for_postgresql_metadata.csv
[3]: https://docs.datadoghq.com/help/

