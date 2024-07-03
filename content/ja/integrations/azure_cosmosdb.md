---
categories:
- azure
- cloud
- data stores
custom_kind: インテグレーション
dependencies: []
description: Track key Azure Cosmos DB metrics.
doc_link: https://docs.datadoghq.com/integrations/azure_cosmosdb/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/azure-cosmos-db-integrated-cache-datadog/
  tag: Blog
  text: Monitor the Azure Cosmos DB integrated cache with Datadog
git_integration_title: azure_cosmosdb
has_logo: true
integration_id: azure-cosmosdb
integration_title: Microsoft Azure Cosmos DB
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_cosmosdb
public_title: Datadog-Microsoft Azure Cosmos DB Integration
short_description: Track key Azure Cosmos DB metrics.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Azure Cosmos DB is a globally distributed, multi-model database service that supports document, key-value, wide-column, and graph databases.

Use the Datadog Azure integration to collect metrics from Cosmos DB.

## セットアップ

### インストール

If you haven't already, set up the [Microsoft Azure integration][1] first. There are no other installation steps.

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_cosmosdb" >}}


### イベント

The Azure Cosmos DB integration does not include any events.

### サービスチェック

The Azure Cosmos DB integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][3].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_cosmosdb/azure_cosmosdb_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/