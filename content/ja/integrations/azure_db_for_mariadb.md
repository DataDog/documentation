---
"categories":
- azure
- cloud
- data stores
"custom_kind": "インテグレーション"
"dependencies": []
"description": "Track key Azure DB for MariaDB metrics."
"doc_link": "https://docs.datadoghq.com/integrations/azure_db_for_mariadb/"
"draft": false
"git_integration_title": "azure_db_for_mariadb"
"has_logo": true
"integration_id": "azure-dbformariadb"
"integration_title": "Microsoft Azure DB for MariaDB"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "azure_db_for_mariadb"
"public_title": "Datadog-Microsoft Azure DB for MariaDB Integration"
"short_description": "Track key Azure DB for MariaDB metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Azure Database for MariaDB provides fully managed, enterprise-ready community MariaDB database as a service.

Get metrics from Azure Database for MariaDB to:

- Visualize the performance of your MariaDB databases
- Correlate the performance of your MariaDB databases with your applications

## セットアップ

### インストール

If you haven't already, set up the [Microsoft Azure integration][1] first. There are no other installation steps.

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_db_for_mariadb" >}}


### イベント

The Azure Database for MariaDB integration does not include any events.

### サービスチェック

The Azure Database for MariaDB integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][3].

[1]: https://docs.datadoghq.com/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_db_for_mariadb/azure_db_for_mariadb_metadata.csv
[3]: https://docs.datadoghq.com/help/

