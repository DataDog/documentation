---
app_id: azure_firewall
categories:
- azure
- クラウド
- network
custom_kind: integration
description: Azure Firewall のキーメトリクスを追跡
title: Microsoft Azure Firewall
---
## 概要

Azure Firewall は、Azure Virtual Network のリソースを保護するクラウドネイティブのネットワークセキュリティです。

Datadog Azure インテグレーションを使用して、Firewall からメトリクスを収集できます。

## セットアップ

### インストール

If you haven't already, set up the [Microsoft Azure integration](https://docs.datadoghq.com/integrations/azure/) first. There are no other installation steps.

## 収集データ

### メトリクス

| | |
| --- | --- |
| **azure.network_azurefirewalls.application_rule_hit** <br>(count) | The number of times application rules were hit<br>_Shown as hit_ |
| **azure.network_azurefirewalls.count** <br>(count) | The number of Azure firewalls|
| **azure.network_azurefirewalls.data_processed** <br>(gauge) | The total amount of data processed by a firewall<br>_Shown as byte_ |
| **azure.network_azurefirewalls.firewall_health** <br>(gauge) | Indicates the overall health of a firewall<br>_Shown as percent_ |
| **azure.network_azurefirewalls.network_rule_hit** <br>(count) | The number of times network rules were hit<br>_Shown as hit_ |
| **azure.network_azurefirewalls.snat_port_utilization** <br>(gauge) | The percentage of outbound SNAT ports currently in use<br>_Shown as percent_ |
| **azure.network_azurefirewalls.throughput** <br>(gauge) | The throughput processed by a firewall<br>_Shown as bit_ |

### イベント

Azure Firewall インテグレーションには、イベントは含まれません。

### サービス チェック

Azure Firewall インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

お問合せは、[Datadog サポート](https://docs.datadoghq.com/help/) まで。