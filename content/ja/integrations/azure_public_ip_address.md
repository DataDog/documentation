---
aliases:
  - /ja/integrations/azure_publicipaddress
categories:
  - cloud
  - azure
ddtype: crawler
dependencies: []
description: Azure パブリック IP アドレスのキーメトリクスを追跡
doc_link: https://docs.datadoghq.com/integrations/azure_public_ip_address/
draft: false
git_integration_title: azure_public_ip_address
has_logo: true
integration_id: azure-publicipaddress
integration_title: Microsoft Azure パブリック IP アドレス
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: azure_public_ip_address
public_title: Datadog-Microsoft Azure Public IP Address インテグレーション
short_description: Azure パブリック IP アドレスのキーメトリクスを追跡
version: '1.0'
---
## 概要

Azure パブリック IP アドレスがリソースに割り当てられると、インターネットとのインバウンド通信およびアウトバウンド接続が可能になります。

Datadog Azure インテグレーションを使用して、Azure パブリック IP アドレスからメトリクスを収集できます。

## セットアップ

### インストール

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_public_ip_address" >}}


### イベント

Azure Public IP Address インテグレーションには、イベントは含まれません。

### サービスのチェック

Azure Public IP Address インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_public_ip_address/azure_public_ip_address_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/