---
"aliases": []
"categories":
- azure
- cloud
- containers
"custom_kind": "インテグレーション"
"dependencies": []
"description": "Get metrics from Azure Container Apps."
"doc_link": "https://docs.datadoghq.com/integrations/azure_container_apps/"
"draft": false
"git_integration_title": "azure_container_apps"
"has_logo": true
"integration_id": "azure-container-apps"
"integration_title": "Microsoft Azure Container Apps"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "azure_container_apps"
"public_title": "Datadog-Microsoft Azure Container Apps Integration"
"short_description": "Get metrics from Azure Container Apps."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Azure Container Apps allow you to build and deploy modern apps and microservices using serverless containers. For more information, see [Microsoft's documentation][1] for Azure Container Apps.

## セットアップ

### インストール

If you haven't already, set up the [Microsoft Azure integration first][2]. 

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_container_apps" >}}


### イベント

The Azure Container Apps integration does not include any events.

### サービスチェック

The Azure Container Apps integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][4].

[1]: https://docs.microsoft.com/en-us/azure/container-apps/overview
[2]: https://docs.datadoghq.com/integrations/azure/
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_container_apps/azure_container_apps_metadata.csv
[4]: https://docs.datadoghq.com/help/

