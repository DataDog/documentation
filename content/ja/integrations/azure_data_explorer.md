---
"categories":
- azure
- cloud
- network
"custom_kind": "インテグレーション"
"dependencies": []
"description": "Track key Azure Data Explorer metrics."
"doc_link": "https://docs.datadoghq.com/integrations/azure_data_explorer/"
"draft": false
"git_integration_title": "azure_data_explorer"
"has_logo": true
"integration_id": ""
"integration_title": "Microsoft Azure Data Explorer"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "azure_data_explorer"
"public_title": "Datadog-Microsoft Azure Data Explorer Integration"
"short_description": "Track key Azure Data Explorer metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Azure Data Explorer is a highly scalable and secure analytics service that enables you to do rich exploration of structured and unstructured data for instant insights. Optimized for ad-hoc queries, Azure Data Explorer enables data exploration over raw, structured, and semi-structured data delivering fast time to insight. Use Datadog to monitor your Azure Data Explorer performance and utilization in context with the rest of your applications and infrastructure.

Get metrics from Azure Data Explorer to:

* Track ingestion, processing, and latency performance of your Data Explorer instances.
* Monitor the utilization of your Data Explorer compute, memory, and network resources.

## セットアップ
### インストール

If you haven't already, set up the [Microsoft Azure integration][1] first. There are no other installation steps.

## 収集データ
### メトリクス
{{< get-metrics-from-git "azure_data_explorer" >}}


### イベント
The Azure Data Explorer integration does not include any events.

### サービスチェック
The Azure Data Explorer integration does not include any service checks.

## トラブルシューティング
Need help? Contact [Datadog support][3].

[1]: https://docs.datadoghq.com/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_data_explorer/azure_data_explorer_metadata.csv
[3]: https://docs.datadoghq.com/help/

