---
categories:
- azure
- cloud
- data stores
- provisioning
custom_kind: インテグレーション
dependencies: []
description: Azure SQL Elastic Pool の主要メトリクスを追跡。
doc_link: https://docs.datadoghq.com/integrations/azure_sql_elastic_pool/
draft: false
git_integration_title: azure_sql_elastic_pool
has_logo: true
integration_id: azure-sql-elastic-pool
integration_title: Microsoft Azure SQL Elastic Pool
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_sql_elastic_pool
public_title: Datadog-Microsoft Azure SQL Elastic Pool Integration
short_description: Track key Azure SQL Elastic Pool metrics.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Elastic pools provide a simple and cost effective solution for managing the performance of multiple databases.

Get metrics from Azure SQL Elastic Pool to:

- Visualize the performance of your SQL Elastic Pools.
- Correlate the performance of your SQL Elastic Pools with your applications.

## セットアップ

### インストール

If you haven't already, set up the [Microsoft Azure integration first][1]. There are no other installation steps that need to be performed.

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_sql_elastic_pool" >}}


### イベント

The Azure SQL Elastic pools integration does not include any events.

### サービスチェック

The Azure SQL Elastic pools integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][3].

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_sql_elastic_pool/azure_sql_elastic_pool_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/