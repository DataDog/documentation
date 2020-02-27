---
aliases:
  - /ja/integrations/azure_networkinterface
categories:
  - クラウド
  - azure
ddtype: crawler
dependencies: []
description: Azure Network Interface のキーメトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/azure_network_interface/'
git_integration_title: azure_network_interface
has_logo: true
integration_title: Microsoft Azure Network Interface
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: azure_network_interface
public_title: Datadog-Microsoft Azure Network Interface インテグレーション
short_description: Azure Network Interface のキーメトリクスを追跡
version: '1.0'
---
## 概要

Azure Network Interface によって、Azure 仮想マシンがインターネット、Azure、オンプレミスリソースなどと通信できるようになります。

Datadog Azure インテグレーションを使用して、Azure Network Interface からメトリクスを収集できます。

## セットアップ

### インストール

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。これ以外のインストール手順はありません。

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_network_interface" >}}


### イベント

Azure Network Interface インテグレーションには、イベントは含まれません。

### サービスのチェック

Azure Network Interface インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_network_interface/azure_network_interface_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/