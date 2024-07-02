---
"aliases":
- /integrations/azure_expressroute
"categories":
- azure
- cloud
- network
"custom_kind": "インテグレーション"
"dependencies": []
"description": "Track key Azure ExpressRoute metrics."
"doc_link": "https://docs.datadoghq.com/integrations/azure_express_route/"
"draft": false
"git_integration_title": "azure_express_route"
"has_logo": true
"integration_id": "azure-expressroute"
"integration_title": "Microsoft Azure ExpressRoute"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "azure_express_route"
"public_title": "Datadog-Microsoft Azure ExpressRoute Integration"
"short_description": "Track key Azure ExpressRoute metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Use the Azure ExpressRoute service to extend your on-premises networks into the Microsoft cloud over a private connection facilitated by a connectivity provider.

Use the Datadog Azure integration to collect metrics from Azure ExpressRoute.

## セットアップ

### インストール

If you haven't already, set up the [Microsoft Azure integration][1] first. There are no other installation steps.

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_express_route" >}}


### イベント

The Azure ExpressRoute integration does not include any events.

### サービスチェック

The Azure ExpressRoute integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][3].

[1]: https://docs.datadoghq.com/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_express_route/azure_express_route_metadata.csv
[3]: https://docs.datadoghq.com/help/

