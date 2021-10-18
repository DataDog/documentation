---
categories:
  - cloud
  - azure
ddtype: crawler
dependencies: []
description: Azure Virtual Network のキーメトリクスを追跡。
doc_link: 'https://docs.datadoghq.com/integrations/azure_virtual_networks/'
draft: false
git_integration_title: azure_virtual_networks
has_logo: true
integration_id: ''
integration_title: Microsoft Azure Virtual Network
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: azure_virtual_networks
public_title: Datadog-Microsoft Azure Virtual Network インテグレーション
short_description: Azure Virtual Network のキーメトリクスを追跡。
version: '1.0'
---
## 概要

Azure Virtual Network は、Azure の非公開ネットワーク用の基本的な構成要素です。Virtual Network により、Azure Virtual Machine など、数々のタイプの Azure リソースが互いに、または internet やオンプレミスのネットワークと安全に通信できるようになります。Datadog を使用して有効なアドレス空間を監視し、肝心な時にアドレス空間が不足することを防げます。

Azure Virtual Network からメトリクスを取得して、以下のことを実施できます。

* 仮想ネットワークに割り当てられているアドレス数と割り当てられていないアドレス数を監視。
* ネットワークピアリングの総数と接続数を追跡。
* 利用可能なアドレス数とサブネット内に割り当てられているアドレス数を追跡。
* 肝心な時にアドレス空間が不足することを防止。

## セットアップ
### インストール

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## 収集データ
### メトリクス
{{< get-metrics-from-git "azure_virtual_networks" >}}


### イベント
Azure Virtual Network インテグレーションには、イベントは含まれません。

### サービスのチェック
Azure Virtual Network インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_virtual_networks/azure_virtual_networks_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/