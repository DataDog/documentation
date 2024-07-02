---
"categories":
- azure
- cloud
- network
"custom_kind": "インテグレーション"
"dependencies": []
"description": "Track key Azure Firewall metrics."
"doc_link": "https://docs.datadoghq.com/integrations/azure_firewall/"
"draft": false
"git_integration_title": "azure_firewall"
"has_logo": true
"integration_id": ""
"integration_title": "Microsoft Azure Firewall"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "azure_firewall"
"public_title": "Datadog-Microsoft Azure Firewall Integration"
"short_description": "Track key Azure Firewall metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Azure Firewall is cloud-native network security used to protect your Azure Virtual Network resources.

Use the Datadog Azure integration to collect metrics from Firewall.

## セットアップ

### インストール

If you haven't already, set up the [Microsoft Azure integration][1] first. There are no other installation steps.

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_firewall" >}}


### イベント

The Azure Firewall integration does not include any events.

### サービスチェック

The Azure Firewall integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][3].

[1]: https://docs.datadoghq.com/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_firewall/azure_firewall_metadata.csv
[3]: https://docs.datadoghq.com/help/

