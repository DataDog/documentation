---
aliases:
- /ja/integrations/azure_expressroute
categories:
- azure
- クラウド
- ネットワーク
dependencies: []
description: Azure ExpressRoute のキーメトリクスを追跡
doc_link: https://docs.datadoghq.com/integrations/azure_express_route/
draft: false
git_integration_title: azure_express_route
has_logo: true
integration_id: azure-expressroute
integration_title: Microsoft Azure ExpressRoute
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: azure_express_route
public_title: Datadog-Microsoft Azure ExpressRoute インテグレーション
short_description: Azure ExpressRoute のキーメトリクスを追跡
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Azure ExpressRoute サービスを使用すると、接続プロバイダーから提供されるプライベート接続を介して、オンプレミスネットワークを Microsoft クラウドまで拡張できます。

Datadog Azure インテグレーションを使用すると、Azure ExpressRoute からメトリクスを収集できます。

## 計画と使用

### インフラストラクチャーリスト

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "azure_express_route" >}}


### ヘルプ

Azure ExpressRoute インテグレーションには、イベントは含まれません。

### ヘルプ

Azure ExpressRoute インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_express_route/azure_express_route_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/