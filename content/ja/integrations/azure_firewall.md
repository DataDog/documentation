---
categories:
  - cloud
  - azure
ddtype: crawler
dependencies: []
description: Azure Firewall のキーメトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/azure_firewall/'
draft: false
git_integration_title: azure_firewall
has_logo: true
integration_id: ''
integration_title: Microsoft Azure Firewall
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: azure_firewall
public_title: Datadog-Microsoft Azure Firewall インテグレーション
short_description: Azure Firewall のキーメトリクスを追跡
version: '1.0'
---
## 概要

Azure Firewall は、Azure Virtual Network のリソースを保護するクラウドネイティブのネットワークセキュリティです。

Datadog Azure インテグレーションを使用して、Firewall からメトリクスを収集できます。

## セットアップ

### インストール

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。これ以外のインストール手順はありません。

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_firewall" >}}


### イベント

Azure Firewall インテグレーションには、イベントは含まれません。

### サービスのチェック

Azure Firewall インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_firewall/azure_firewall_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/