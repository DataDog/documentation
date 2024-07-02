---
"categories":
- "cloud"
- "configuration & deployment"
- "network"
- "azure"
"custom_kind": "インテグレーション"
"dependencies": []
"description": "トリガーワークフロー、アクションのレイテンシー、失敗したアクションなどを追跡。"
"doc_link": "https://docs.datadoghq.com/integrations/azure_logic_app/"
"draft": false
"git_integration_title": "azure_logic_app"
"has_logo": true
"integration_id": "azure-logic-app"
"integration_title": "Microsoft Azure Logic App"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "azure_logic_app"
"public_title": "Datadog-Microsoft Azure Logic App Integration"
"short_description": "Track trigger workflows, action latency, failed actions, and more."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Logic App allows developers to design workflows that articulate intent through a trigger and series of steps.

Get metrics from Azure Logic App to:

- Visualize the performance of your Logic App workflows.
- Correlate the performance of your Logic App workflows with your applications.

## セットアップ

### インストール

If you haven't already, set up the [Microsoft Azure integration first][1]. There are no other installation steps that need to be performed.

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_logic_app" >}}


### イベント

The Azure Logic App integration does not include any events.

### サービスチェック

The Azure Logic App integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][3].

[1]: https://docs.datadoghq.com/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_logic_app/azure_logic_app_metadata.csv
[3]: https://docs.datadoghq.com/help/

