---
"categories":
- azure
- cloud
- data stores
"custom_kind": "インテグレーション"
"dependencies": []
"description": "Track key Azure Blob Storage metrics."
"doc_link": "https://docs.datadoghq.com/integrations/azure_blob_storage/"
"draft": false
"git_integration_title": "azure_blob_storage"
"has_logo": true
"integration_id": "azure-blob-storage"
"integration_title": "Microsoft Azure Blob Storage"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "azure_blob_storage"
"public_title": "Datadog-Microsoft Azure Blob Storage Integration"
"short_description": "Track key Azure Blob Storage metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Azure Blob Storage is Microsoft's object storage solution for the cloud. Blob storage is optimized for storing massive amounts of unstructured data. Get metrics from Azure Blob Storage to:

- Visualize the performance of your Blob Storage.
- Correlate the performance of your Blob Storage with your applications.

## セットアップ

### インストール

If you haven't already, set up the [Microsoft Azure integration][1] first. There are no other installation steps that need to be performed.

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_blob_storage" >}}


### イベント

The Azure Blob Storage integration does not include any events.

### サービスチェック

The Azure Blob Storage integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][3].

[1]: https://docs.datadoghq.com/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_blob_storage/azure_blob_storage_metadata.csv
[3]: https://docs.datadoghq.com/help/

