---
"categories":
- cloud
- azure
"custom_kind": "インテグレーション"
"dependencies": []
"description": "Track key Azure App Configuration metrics."
"doc_link": "https://docs.datadoghq.com/integrations/azure_app_configuration/"
"draft": false
"git_integration_title": "azure_app_configuration"
"has_logo": true
"integration_id": "azure-app-configuration"
"integration_title": "Microsoft Azure App Configuration"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "azure_app_configuration"
"public_title": "Datadog-Microsoft Azure App Configuration Integration"
"short_description": "Track key Azure App Configuration metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Azure App Configuration provides a central service to manage application settings and feature flags. App Configuration enables you to store all the settings for your application and secure their access in one place.

By using the [Datadog Azure integration][1], you can collect metrics from Azure App Configuration to monitor incoming requests, latency, and throttling errors.

## セットアップ
### インストール

If you haven't already, set up the [Microsoft Azure integration][2] first. There are no other installation steps.

## 収集データ
### メトリクス
{{< get-metrics-from-git "azure_app_configuration" >}}


### イベント
The Azure App Configuration integration does not include any events.

### サービスチェック
The Azure App Configuration integration does not include any service checks.

## トラブルシューティング
Need help? Contact [Datadog support][4].

[1]: https://docs.datadoghq.com/integrations/azure/
[2]: https://app.datadoghq.com/integrations/azure
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_app_configuration/azure_app_configuration_metadata.csv
[4]: https://docs.datadoghq.com/help/

