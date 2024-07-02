---
"aliases":
- /integrations/azure_networkinterface
"categories":
- azure
- cloud
- network
"custom_kind": "インテグレーション"
"dependencies": []
"description": "Track key Azure Network Interface metrics."
"doc_link": "https://docs.datadoghq.com/integrations/azure_network_interface/"
"draft": false
"git_integration_title": "azure_network_interface"
"has_logo": true
"integration_id": "azure-networkinterface"
"integration_title": "Microsoft Azure Network Interface"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "azure_network_interface"
"public_title": "Datadog-Microsoft Azure Network Interface Integration"
"short_description": "Track key Azure Network Interface metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Azure Network Interface enables an Azure Virtual Machine to communicate with internet, Azure, and on-premises resources.

Use the Datadog Azure integration to collect metrics from Azure Network Interface.

## セットアップ

### インストール

If you haven't already, set up the [Microsoft Azure integration][1] first. There are no other installation steps.

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_network_interface" >}}


### イベント

The Azure Network Interface integration does not include any events.

### サービスチェック

The Azure Network Interface integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][3].

[1]: https://docs.datadoghq.com/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_network_interface/azure_network_interface_metadata.csv
[3]: https://docs.datadoghq.com/help/

