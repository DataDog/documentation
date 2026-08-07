---
aliases:
- /ja/integrations/amazon_cloudhsm
app_id: amazon-cloudhsm
categories:
- cloud
- provisioning
- aws
- log collection
custom_kind: integration
description: AWS CloudHSM は、AWS Cloud で利用するためのハードウェア セキュリティ モジュールを提供するサービスです。
media: []
title: AWS CloudHSM
---
## 概要

AWS CloudHSM は、AWS Cloud で利用するためのハードウェア セキュリティ モジュールを提供するサービスです。

このインテグレーションを有効にすると、CloudHSM のすべてのメトリクスを Datadog で確認できます。

## セットアップ

### インストール

まだ設定していない場合は、先に [Amazon Web Services インテグレーション](https://docs.datadoghq.com/integrations/amazon_web_services/) を設定してください。

### メトリクス収集

1. [AWS インテグレーション ページ](https://app.datadoghq.com/integrations/amazon-web-services) の `Metric Collection` タブで、`CloudHSM` が有効になっていることを確認します。
1. [Datadog - AWS CloudHSM インテグレーション](https://app.datadoghq.com/integrations/amazon-cloudhsm) をインストールします。

### ログ収集

#### ログを有効にする

AWS CloudHSM がログを S3 バケットまたは CloudWatch に送信するよう設定します。

**注**: S3 バケットにログを出力する場合は、_Target prefix_ に `amazon_cloudhsm` が設定されていることを確認してください。

#### ログを Datadog に送信する

1. まだ設定していない場合は、[Datadog Forwarder Lambda 関数](https://docs.datadoghq.com/logs/guide/forwarder/) を設定してください。

1. Lambda 関数をインストールしたら、AWS コンソールで AWS CloudHSM のログが保存されている S3 バケットまたは CloudWatch log group に、手動でトリガーを追加します:

   - [S3 バケットに手動でトリガーを追加する](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)
   - [CloudWatch Log Group に手動でトリガーを追加する](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group)

## 収集データ

### メトリクス

| | |
| --- | --- |
| **aws.cloudhsm.hsm_keys_session_occupied** <br>(gauge) | バッファリング済みメモリ量<br>_単位は key_ |
| **aws.cloudhsm.hsm_keys_session_occupied.sum** <br>(count) | バッファリング済みメモリ量の合計<br>_単位は key_ |
| **aws.cloudhsm.hsm_keys_token_occupied** <br>(gauge) | 使用中のキー数<br>_単位は key_ |
| **aws.cloudhsm.hsm_keys_token_occupied.sum** <br>(count) | 使用中のキー数の合計<br>_単位は key_ |
| **aws.cloudhsm.hsm_session_count** <br>(count) | オープン接続数の合計<br>_単位は session_ |
| **aws.cloudhsm.hsm_session_count.average** <br>(gauge) | オープン接続数<br>_単位は session_ |
| **aws.cloudhsm.hsm_session_count.maximum** <br>(gauge) | オープン接続数の最大値<br>_単位は session_ |
| **aws.cloudhsm.hsm_ssl_ctxs_occupied** <br>(gauge) | 確立済みの暗号化チャネル数<br>_単位は process_ |
| **aws.cloudhsm.hsm_ssl_ctxs_occupied.sum** <br>(count) | 確立済みの暗号化チャネル数の合計<br>_単位は process_ |
| **aws.cloudhsm.hsm_temperature** <br>(gauge) | ハードウェア プロセッサのジャンクション温度<br>_単位は degree celsius_ |
| **aws.cloudhsm.hsm_temperature.maximum** <br>(gauge) | ハードウェア プロセッサのジャンクション温度の最大値<br>_単位は degree celsius_ |
| **aws.cloudhsm.hsm_unhealthy** <br>(count) | 異常な HSM インスタンス数の合計<br>_単位は event_ |
| **aws.cloudhsm.hsm_unhealthy.average** <br>(gauge) | 異常な HSM インスタンス数の平均<br>_単位は event_ |
| **aws.cloudhsm.hsm_unhealthy.maximum** <br>(gauge) | 異常な HSM インスタンス数の最大値<br>_単位は event_ |
| **aws.cloudhsm.hsm_users_available** <br>(gauge) | 利用可能な HSM ユーザー数<br>_単位は user_ |
| **aws.cloudhsm.hsm_users_max** <br>(gauge) | HSM ユーザー数の上限<br>_単位は user_ |
| **aws.cloudhsm.interface_eth_2dropped_input** <br>(gauge) | |
| **aws.cloudhsm.interface_eth_2dropped_input.sum** <br>(count) | |
| **aws.cloudhsm.interface_eth_2dropped_output** <br>(gauge) | |
| **aws.cloudhsm.interface_eth_2dropped_output.sum** <br>(count) | |
| **aws.cloudhsm.interface_eth_2errors_input** <br>(gauge) | <br>_単位は error_ |
| **aws.cloudhsm.interface_eth_2errors_input.sum** <br>(count) | <br>_単位は error_ |
| **aws.cloudhsm.interface_eth_2errors_output** <br>(gauge) | <br>_単位は error_ |
| **aws.cloudhsm.interface_eth_2errors_output.sum** <br>(count) | <br>_単位は error_ |
| **aws.cloudhsm.interface_eth_2octets_input** <br>(gauge) | HSM への総受信トラフィック量|
| **aws.cloudhsm.interface_eth_2octets_input.sum** <br>(count) | HSM への総受信トラフィック量の合計|
| **aws.cloudhsm.interface_eth_2octets_output** <br>(gauge) | HSM からの総送信トラフィック量|
| **aws.cloudhsm.interface_eth_2octets_output.sum** <br>(count) | HSM からの総送信トラフィック量の合計|
| **aws.cloudhsm.interface_eth_2packets_input** <br>(gauge) | <br>_単位は packet_ |
| **aws.cloudhsm.interface_eth_2packets_input.sum** <br>(count) | <br>_単位は packet_ |
| **aws.cloudhsm.interface_eth_2packets_output** <br>(gauge) | <br>_単位は packet_ |
| **aws.cloudhsm.interface_eth_2packets_output.sum** <br>(count) | <br>_単位は packet_ |

### イベント

AWS CloudHSM インテグレーションにはイベントは含まれません。

### サービス チェック

AWS CloudHSM インテグレーションにはサービス チェックは含まれません。

## トラブルシューティング

サポートが必要な場合は、[Datadog サポート](https://docs.datadoghq.com/help/) にお問い合わせください。