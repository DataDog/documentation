---
categories:
- cloud
- azure
custom_kind: integration
dependencies: []
description: Azure Front Door のキーメトリクスを追跡します。
doc_link: https://docs.datadoghq.com/integrations/azure_frontdoor/
draft: false
git_integration_title: azure_frontdoor
has_logo: true
integration_id: ''
integration_title: Microsoft Azure Front Door
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_frontdoor
public_title: Datadog-Microsoft Azure Front Door インテグレーション
short_description: Azure Front Door のキーメトリクスを追跡します。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Azure Front Door は、マイクロソフトの最新のクラウドコンテンツデリバリーネットワーク (CDN) で、ユーザーとアプリケーションの静的および動的な Web コンテンツとの間に高速で信頼性が高く、安全なアクセスを世界中に提供します。

Datadog Azure インテグレーションを使用して、Azure Front Door からメトリクスを収集できます。

## Setup

### Installation

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## Data Collected

### Metrics
{{< get-metrics-from-git "azure_frontdoor" >}}


**注**: Classic 階層では、`azure.network_frontdoors.*` ネームスペースを使用します。Standard および Premium 階層では、代わりにメトリクスは `azure.cdn_profiles.*` ネームスペースで表示されます。

### Events

The Azure Front Door integration does not include any events.

### Service Checks

The Azure Front Door integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][3].

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_frontdoor/azure_frontdoor_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/