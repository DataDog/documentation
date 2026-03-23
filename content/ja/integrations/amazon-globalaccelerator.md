---
aliases:
- /ja/integrations/amazon_globalaccelerator
app_id: amazon-globalaccelerator
categories:
- aws
- モニター
- cloud
custom_kind: integration
description: Global Accelerator は、アクセラレータを使用してアプリケーションのパフォーマンスを向上させます。
media: []
title: Amazon Global Accelerator
---
## 概要

AWS Global Accelerator は、ローカルおよびグローバルユーザー向けにアプリケーションのパフォーマンスを向上させるアクセラレータを作成するサービスです。

このインテグレーションを有効にすると、すべての Global Accelerator メトリクスを Datadog に表示できます。

## セットアップ

### インストール

If you haven't already, set up the [Amazon Web Services integration](https://docs.datadoghq.com/integrations/amazon_web_services/) first.

### メトリクスの収集

1. [AWS integration page](https://app.datadoghq.com/integrations/amazon-web-services) の **Metric Collection** タブで、Global Accelerator が有効になっていることを確認します。
1. [Datadog - AWS Global Accelerator インテグレーション](https://app.datadoghq.com/integrations/amazon-globalaccelerator) をインストールします。

## 収集データ

### メトリクス

| | |
| --- | --- |
| **aws.globalaccelerator.flows_dropped_no_endpoint_found** <br>(count) | 利用可能な IPv6 エンドポイントがなかったために破棄された TCP IPv6 パケット フロー数<br>_単位は packet_ |
| **aws.globalaccelerator.healthy_endpoint_count** <br>(gauge) | AWS Global Accelerator が正常と判断しているエンドポイント数<br>_単位は resource_ |
| **aws.globalaccelerator.new_flow_count** <br>(count) | 対象期間中に、クライアントからエンドポイントへ新たに確立された TCP および UDP フロー (または接続) の数<br>_単位は connection_ |
| **aws.globalaccelerator.processed_bytes_in** <br>(count) | アクセラレーターが処理した受信バイト数。TCP/IP ヘッダーを含み、エンドポイントへのすべてのトラフィックが対象です。<br>_単位は byte_ |
| **aws.globalaccelerator.processed_bytes_out** <br>(count) | アクセラレーターが処理した送信バイト数。TCP/IP ヘッダーを含み、エンドポイントからのトラフィックからヘルス チェック トラフィックを除いたものが対象です。<br>_単位は byte_ |
| **aws.globalaccelerator.unhealthy_endpoint_count** <br>(gauge) | AWS Global Accelerator が異常と判断しているエンドポイント数<br>_単位は resource_ |

### サービス チェック

AWS Global Accelerator にはサービス チェックは含まれません。

### イベント

AWS Global Accelerator にはイベントは含まれません。

## トラブルシューティング

お問合せは、[Datadog サポート](https://docs.datadoghq.com/help/) まで。