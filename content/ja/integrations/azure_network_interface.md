---
aliases:
- /ja/integrations/azure_networkinterface
categories:
- azure
- クラウド
- ネットワーク
dependencies: []
description: Azure Network Interface のキーメトリクスを追跡
doc_link: https://docs.datadoghq.com/integrations/azure_network_interface/
draft: false
git_integration_title: azure_network_interface
has_logo: true
integration_id: azure-networkinterface
integration_title: Microsoft Azure Network Interface
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: azure_network_interface
public_title: Datadog-Microsoft Azure Network Interface インテグレーション
short_description: Azure Network Interface のキーメトリクスを追跡
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Azure Network Interface によって、Azure 仮想マシンがインターネット、Azure、オンプレミスリソースなどと通信できるようになります。

Datadog Azure インテグレーションを使用して、Azure Network Interface からメトリクスを収集できます。

## 計画と使用

### インフラストラクチャーリスト

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "azure_network_interface" >}}


### ヘルプ

Azure Network Interface インテグレーションには、イベントは含まれません。

### ヘルプ

Azure Network Interface インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_network_interface/azure_network_interface_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/