---
aliases:
- /ja/integrations/azure_loadbalancer
categories:
- cloud
- azure
dependencies: []
description: Azure Load Balancer のキーメトリクスを追跡
doc_link: https://docs.datadoghq.com/integrations/azure_load_balancer/
draft: false
git_integration_title: azure_load_balancer
has_logo: true
integration_id: azure-load-balancer
integration_title: Microsoft Azure Load Balancer
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: azure_load_balancer
public_title: Datadog-Microsoft Azure Load Balancer インテグレーション
short_description: Azure Load Balancer のキーメトリクスを追跡
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Azure Load Balancer は、インバウンドとアウトバウンドのどちらのシナリオもサポートし、低レイテンシーと高スループットを実現して、あらゆる TCP および UDP アプリケーションの数百万のフローにスケールアップできます。

Datadog Azure インテグレーションを使用して、Azure Load Balancer からメトリクスを収集できます。

## 計画と使用

### インフラストラクチャーリスト

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "azure_load_balancer" >}}


### ヘルプ

Azure Load Balancer インテグレーションには、イベントは含まれません。

### ヘルプ

Azure Load Balancer インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_load_balancer/azure_load_balancer_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/