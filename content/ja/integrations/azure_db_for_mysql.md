---
"aliases":
- /integrations/azure_dbformysql
"categories":
- azure
- cloud
- data stores
"custom_kind": "インテグレーション"
"dependencies": []
"description": "Track key Azure DB for MySQL metrics."
"doc_link": "https://docs.datadoghq.com/integrations/azure_db_for_mysql/"
"draft": false
"git_integration_title": "azure_db_for_mysql"
"has_logo": true
"integration_id": "azure-db-for-mysql"
"integration_title": "Microsoft Azure DB for MySQL"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "azure_db_for_mysql"
"public_title": "Datadog-Microsoft Azure DB for MySQL Integration"
"short_description": "Track key Azure DB for MySQL metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Azure Database for MySQL provides fully managed, enterprise-ready community MySQL database as a service.

Get metrics from Azure Database for MySQL to:

- Visualize the performance of your MySQL databases.
- Correlate the performance of your MySQL databases with your applications.

## セットアップ

### インストール

If you haven't already, set up the [Microsoft Azure integration][1] first. There are no other installation steps that need to be performed.

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_db_for_mysql" >}}


### イベント

The Azure Database for MySQL integration does not include any events.

### サービスチェック

The Azure Database for MySQL integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][3].

[1]: https://docs.datadoghq.com/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_db_for_mysql/azure_db_for_mysql_metadata.csv
[3]: https://docs.datadoghq.com/help/

