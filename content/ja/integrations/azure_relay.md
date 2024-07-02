---
"categories":
- azure
- cloud
- network
"custom_kind": "インテグレーション"
"dependencies": []
"description": "Track key Azure Relay metrics."
"doc_link": "https://docs.datadoghq.com/integrations/azure_relay/"
"draft": false
"git_integration_title": "azure_relay"
"has_logo": true
"integration_id": "azure-relay"
"integration_title": "Microsoft Azure Relay"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "azure_relay"
"public_title": "Datadog-Microsoft Azure Relay Integration"
"short_description": "Track key Azure Relay metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

The Azure Relay service enables you to securely expose services that run in your corporate network to the public cloud without opening a port on your firewall, or making intrusive changes to your corporate network infrastructure.

Use the Datadog Azure integration to collect metrics from Azure Relay.

## セットアップ

### インストール

If you haven't already, set up the [Microsoft Azure integration][1] first. There are no other installation steps.

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_relay" >}}


### イベント

The Azure Relay integration does not include any events.

### サービスチェック

The Azure Relay integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][3].

[1]: https://docs.datadoghq.com/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_relay/azure_relay_metadata.csv
[3]: https://docs.datadoghq.com/help/

