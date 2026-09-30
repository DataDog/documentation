---
aliases:
- /ja/integrations/amazon_mediaconvert
app_id: amazon-mediaconvert
categories:
- aws
- モニター
- log collection
- cloud
custom_kind: integration
description: テレビ、コネクテッドデバイス向けビデオコンテンツのフォーマットと圧縮
media: []
title: Amazon MediaConvert
---
## 概要

AWS Elemental MediaConvert は、オフラインビデオコンテンツをテレビや接続デバイスへの配信用にフォーマットして圧縮するサービスです。

このインテグレーションを有効にすると、Datadog にすべての Elemental MediaConvert メトリクスを表示できます。

## セットアップ

### インストール

If you haven't already, set up the [Amazon Web Services integration](https://docs.datadoghq.com/integrations/amazon_web_services/) first.

### メトリクスの収集

1. [AWS integration page](https://app.datadoghq.com/integrations/amazon-web-services) の `Metric Collection` タブで、`MediaConvert` が有効になっていることを確認します。
1. [Datadog - AWS Elemental MediaConvert インテグレーション](https://app.datadoghq.com/integrations/amazon-mediaconvert) をインストールします。

### ログ収集

#### ログの有効化

AWS Elemental MediaConvert を構成して、ログを S3 バケットまたは CloudWatch のいずれかに送信するよう設定します。

**注**: S3 バケットにログを送る場合は、_Target prefix_ が `amazon_mediaconvert` に設定されているかを確認してください。

#### ログを Datadog に送信する方法

1. まだ設定していない場合は、[Datadog Forwarder Lambda 関数](https://docs.datadoghq.com/logs/guide/forwarder/) を設定してください。

1. Lambda 関数がインストールされたら、AWS コンソールから、AWS Elemental MediaConvert ログを含む S3 バケットまたは CloudWatch のロググループに手動でトリガーを追加します。

   - [Add a manual trigger on the S3 bucket](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)
   - [Add a manual trigger on the CloudWatch Log Group](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group)

## 収集データ

### メトリクス

| | |
| --- | --- |
| **aws.mediaconvert.8koutput_duration** <br>(count) | キューにおける 8K 出力のミリ秒数<br>_単位は millisecond_ |
| **aws.mediaconvert.audio_output_duration** <br>(count) | キューにおける音声のみの出力のミリ秒数<br>_単位は millisecond_ |
| **aws.mediaconvert.errors** <br>(count) | ジョブ ID を含まないジョブ ステータス要求のような、無効な操作パラメーターによって発生したエラー数<br>_単位は error_ |
| **aws.mediaconvert.hdoutput_duration** <br>(count) | キューにおける高解像度 (HD) 出力のミリ秒数<br>_単位は millisecond_ |
| **aws.mediaconvert.jobs_completed_count** <br>(count) | このキューで完了したジョブ数<br>_単位は job_ |
| **aws.mediaconvert.jobs_errored_count** <br>(count) | 無効な入力が原因で失敗したジョブ数<br>_単位は job_ |
| **aws.mediaconvert.sdoutput_duration** <br>(count) | キューにおける標準解像度 (SD) 出力のミリ秒数<br>_単位は millisecond_ |
| **aws.mediaconvert.standby_time** <br>(count) | AWS Elemental MediaConvert がジョブのトランスコーディングを開始するまでの待機時間 (ミリ秒)<br>_単位は millisecond_ |
| **aws.mediaconvert.transcoding_time** <br>(count) | AWS Elemental MediaConvert がトランスコーディングを完了するまでにかかった時間 (ミリ秒)<br>_単位は millisecond_ |
| **aws.mediaconvert.uhdoutput_duration** <br>(count) | キューにおける超高解像度 (UHD) 出力のミリ秒数<br>_単位は millisecond_ |

### イベント

AWS Elemental MediaConvert インテグレーションには、イベントは含まれません。

### サービス チェック

AWS Elemental MediaConvert インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

お問合せは、[Datadog サポート](https://docs.datadoghq.com/help/) まで。