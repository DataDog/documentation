---
"categories":
- "cloud"
- "configuration & deployment"
- "azure"
"custom_kind": "インテグレーション"
"dependencies": []
"description": "Azure Batch Service のキーメトリクスを追跡。"
"doc_link": "https://docs.datadoghq.com/integrations/azure_batch/"
"draft": false
"git_integration_title": "azure_batch"
"has_logo": true
"integration_id": "azure-batch"
"integration_title": "Microsoft Azure Batch"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "azure_batch"
"public_title": "Datadog-Microsoft Azure Batch Integration"
"short_description": "Track key Azure Batch Service metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Azure Batch Service is a managed task scheduler and processor for your Azure applications. Get metrics from Azure Batch Service to:

- Visualize the performance of your Batch Accounts.
- Correlate the performance of your Batch Accounts with your applications.

## セットアップ

### インストール

If you haven't already, set up the [Microsoft Azure integration first][1]. There are no other installation steps that need to be performed.

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_batch" >}}


### イベント

The Azure Batch Service integration does not include any events.

### サービスチェック

The Azure Batch Service integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][3].

[1]: https://docs.datadoghq.com/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_batch/azure_batch_metadata.csv
[3]: https://docs.datadoghq.com/help/

