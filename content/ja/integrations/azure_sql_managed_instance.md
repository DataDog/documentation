---
"categories":
- cloud
- azure
"custom_kind": "インテグレーション"
"dependencies": []
"description": "Track key Azure SQL Managed Instance metrics."
"doc_link": "https://docs.datadoghq.com/integrations/azure_sql_managed_instance/"
"draft": false
"git_integration_title": "azure_sql_managed_instance"
"has_logo": true
"integration_id": "azure-sql-managed-instance"
"integration_title": "Microsoft Azure SQL Managed Instance"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "azure_sql_managed_instance"
"public_title": "Datadog-Microsoft Azure SQL Managed Instance Integration"
"short_description": "Track key Azure SQL Managed Instance metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Azure SQL Managed Instance is a scalable, cloud database service that combines the broadest SQL Server engine compatibility with the benefits of a fully managed platform as a service.

Use the Datadog Azure integration to collect metrics from SQL Managed Instance.

## セットアップ
### インストール

If you haven't already, set up the [Microsoft Azure integration][1] first. There are no other installation steps.

## 収集データ
### メトリクス
{{< get-metrics-from-git "azure_sql_managed_instance" >}}


### イベント
The Azure SQL Managed Instance integration does not include any events.

### サービスチェック
The Azure SQL Managed Instance integration does not include any service checks.

## トラブルシューティング
Need help? Contact [Datadog support][3].

## Further Reading

- [https://www.datadoghq.com/blog/migrate-sql-workloads-to-azure-with-datadog/][4]

[1]: https://docs.datadoghq.com/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_sql_managed_instance/azure_sql_managed_instance_metadata.csv
[3]: https://docs.datadoghq.com/help/
[4]: https://www.datadoghq.com/blog/migrate-sql-workloads-to-azure-with-datadog/

