---
"categories":
- cloud
- azure
"custom_kind": "インテグレーション"
"dependencies": []
"description": "Track key Azure Front Door metrics."
"doc_link": "https://docs.datadoghq.com/integrations/azure_frontdoor/"
"draft": false
"git_integration_title": "azure_frontdoor"
"has_logo": true
"integration_id": ""
"integration_title": "Microsoft Azure Front Door"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "azure_frontdoor"
"public_title": "Datadog-Microsoft Azure Front Door Integration"
"short_description": "Track key Azure Front Door metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Azure Front Door is Microsoft’s modern cloud Content Delivery Network (CDN) that provides fast, reliable, and secure access between your users and your applications’ static and dynamic web content across the globe.

Use the Datadog Azure integration to collect metrics from Azure Front Door.

## セットアップ

### インストール

If you haven't already, set up the [Microsoft Azure integration][1] first. There are no other installation steps.

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_frontdoor" >}}


**Note**: The Classic tier uses the `azure.network_frontdoors.*` namespace as shown. On the Standard and Premium tiers, metrics appear under the `azure.cdn_profiles.*` namespace instead.

### イベント

Azure Front Door インテグレーションには、イベントは含まれません。

### サービスチェック

Azure Front Door インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_frontdoor/azure_frontdoor_metadata.csv
[3]: https://docs.datadoghq.com/help/

