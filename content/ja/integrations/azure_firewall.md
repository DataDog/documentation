---
categories:
- azure
- クラウド
- ネットワーク
dependencies: []
description: Azure Firewall のキーメトリクスを追跡
doc_link: https://docs.datadoghq.com/integrations/azure_firewall/
draft: false
git_integration_title: azure_firewall
has_logo: true
integration_id: ''
integration_title: Microsoft Azure Firewall
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: azure_firewall
public_title: Datadog-Microsoft Azure Firewall インテグレーション
short_description: Azure Firewall のキーメトリクスを追跡
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Azure Firewall は、Azure Virtual Network のリソースを保護するクラウドネイティブのネットワークセキュリティです。

Datadog Azure インテグレーションを使用して、Firewall からメトリクスを収集できます。

## 計画と使用

### インフラストラクチャーリスト

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "azure_firewall" >}}


### ヘルプ

Azure Firewall インテグレーションには、イベントは含まれません。

### ヘルプ

Azure Firewall インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_firewall/azure_firewall_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/