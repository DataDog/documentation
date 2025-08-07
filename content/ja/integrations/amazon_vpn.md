---
app_id: amazon_vpn
categories:
- aws
- クラウド
- ログの収集
- ネットワーク
custom_kind: インテグレーション
description: AWS VPN のキーメトリクスを追跡します。
title: AWS VPN
---
## 概要

AWS VPN を使用すると、ユーザーネットワークまたはデバイスから AWS グローバルネットワークへの安全なプライベートトンネルを確立できます。

このインテグレーションを有効にすると、Datadog にすべての VPN メトリクスを表示できます。

## セットアップ

### インストール

If you haven't already, set up the [Amazon Web Services integration](https://docs.datadoghq.com/integrations/amazon_web_services/) first.

### メトリクスの収集

1. In the [AWS integration page](https://app.datadoghq.com/integrations/amazon-web-services), ensure that `VPN` is enabled under the `Metric Collection` tab.
1. Install the [Datadog - AWS VPN integration](https://app.datadoghq.com/integrations/amazon-vpn).

### ログ収集

#### ログの有効化

AWS VPN から S3 バケットまたは CloudWatch のいずれかにログを送信するよう構成します。

**注**: S3 バケットにログを送る場合は、_Target prefix_ が `amazon_vpn` に設定されているかを確認してください。

#### ログを Datadog に送信する方法

1. If you haven’t already, set up the [Datadog Forwarder Lambda function](https://docs.datadoghq.com/logs/guide/forwarder/).

1. Lambda 関数がインストールされたら、AWS コンソールから、AWS VPN ログを含む S3 バケットまたは CloudWatch のロググループに手動でトリガーを追加します。

   - [Add a manual trigger on the S3 bucket](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)
   - [Add a manual trigger on the CloudWatch Log Group](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group)

## 収集データ

### メトリクス

| | |
| --- | --- |
| **aws.vpn.tunnel_data_in** <br>(count) | The average number of bytes that have come in through the VPN tunnel<br>_Shown as byte_ |
| **aws.vpn.tunnel_data_in.sum** <br>(count) | The total number of bytes that have come in through the VPN tunnel<br>_Shown as byte_ |
| **aws.vpn.tunnel_data_out** <br>(count) | The average number of bytes that have gone out through the VPN tunnel<br>_Shown as byte_ |
| **aws.vpn.tunnel_data_out.sum** <br>(count) | The total number of bytes that have gone out through the VPN tunnel<br>_Shown as byte_ |
| **aws.vpn.tunnel_state** <br>(gauge) | This metric is 1 when all tunnels for the VPN are up, and 0 when all tunnels are down. Values between 0 and 1 indicate some tunnels for the VPN are up.|
| **aws.vpn.tunnel_state.maximum** <br>(gauge) | This metric is 1 when any tunnel for the VPN is up, and 0 when all tunnels are down.|
| **aws.vpn.tunnel_state.minimum** <br>(gauge) | This metric is 1 when all tunnels for the VPN are up, and 0 when any tunnel is down.|

### イベント

AWS VPN インテグレーションには、イベントは含まれません。

### サービス チェック

AWS VPN インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

お問合せは、[Datadog サポート](https://docs.datadoghq.com/help/) まで。