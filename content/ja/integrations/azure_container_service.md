---
"aliases":
- /integrations/azure_containerservice
"categories":
- cloud
- containers
- azure
"custom_kind": "インテグレーション"
"dependencies": []
"description": "Track key Azure Kubernetes Service metrics."
"doc_link": "https://docs.datadoghq.com/integrations/azure_container_service/"
"draft": false
"git_integration_title": "azure_container_service"
"has_logo": true
"integration_id": "azure-containerservice"
"integration_title": "Microsoft Azure Kubernetes Service"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "azure_container_service"
"public_title": "Datadog-Microsoft Azure Kubernetes Service Integration"
"short_description": "Track key Azure Kubernetes Service metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Azure Kubernetes Service allows you to quickly deploy a production-ready Kubernetes cluster.

Use the Datadog Azure integration to collect metrics from Azure Kubernetes Service.

## セットアップ

### インストール

If you haven't already, set up the [Microsoft Azure integration][1] first. There are no other installation steps.

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_container_service" >}}


### イベント

The Azure Kubernetes Service integration does not include any events.

### サービスチェック

The Azure Kubernetes Service integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][3].

[1]: https://docs.datadoghq.com/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_container_service/azure_container_service_metadata.csv
[3]: https://docs.datadoghq.com/help/

