---
app_id: amazon_kinesis_data_analytics
categories:
- クラウド
- aws
- ログの収集
custom_kind: インテグレーション
description: Amazon Kinesis Data Analytics のキーメトリクスを追跡します。
title: Amazon Kinesis Data Analytics
---
## 概要

Amazon Kinesis Data Analytics は、Apache Flink を使用して、ストリーミングデータを簡単に変換、クエリ、およびリアルタイムで分析することができます。

このインテグレーションを有効にすると、Datadog で Amazon Kinesis Data Analytics のすべてのメトリクスを見ることができます。

## セットアップ

### インストール

If you haven't already, set up the [Amazon Web Services integration](https://docs.datadoghq.com/integrations/amazon_web_services/) first.

### メトリクスの収集

1. In the [AWS integration page](https://app.datadoghq.com/integrations/amazon-web-services), ensure that `Kinesis Analytics` is enabled under the `Metric Collection` tab.
1. Install the [Datadog - Amazon Kinesis Data Analytics integration](https://app.datadoghq.com/integrations/amazon-kinesis-data-analytics).

## 収集データ

### メトリクス

| | |
| --- | --- |
| **aws.kinesisanalytics.bytes** <br>(count) | The number of bytes read (per input stream) or written (per output stream).<br>_Shown as byte_ |
| **aws.kinesisanalytics.input_processing_dropped_records** <br>(count) | The number of records returned by the input processing Lambda function that were marked with Dropped status.<br>_Shown as record_ |
| **aws.kinesisanalytics.input_processing_duration** <br>(gauge) | The average time taken for an input processing Lambda function invocation performed by Kinesis Data Analytics.<br>_Shown as millisecond_ |
| **aws.kinesisanalytics.input_processing_duration.maximum** <br>(gauge) | The maximum time taken for an input processing Lambda function invocation performed by Kinesis Data Analytics.<br>_Shown as millisecond_ |
| **aws.kinesisanalytics.input_processing_duration.minimum** <br>(gauge) | The minimum time taken for an input processing Lambda function invocation performed by Kinesis Data Analytics.<br>_Shown as millisecond_ |
| **aws.kinesisanalytics.input_processing_ok_bytes** <br>(count) | The sum of bytes of the records returned by the input processing Lambda function that were marked with Ok status.<br>_Shown as byte_ |
| **aws.kinesisanalytics.input_processing_ok_records** <br>(count) | The number of records returned by the input processing Lambda function that were marked with Ok status.<br>_Shown as record_ |
| **aws.kinesisanalytics.input_processing_processing_failed_records** <br>(count) | The number of records returned by the input processing Lambda function that were marked with ProcessingFailed status.<br>_Shown as record_ |
| **aws.kinesisanalytics.input_processing_success** <br>(count) | The number of successful input processing Lambda invocations by Kinesis Data Analytics.<br>_Shown as invocation_ |
| **aws.kinesisanalytics.input_processing_success.average** <br>(gauge) | The fraction of input processing Lambda invocations that were successful.<br>_Shown as fraction_ |
| **aws.kinesisanalytics.kpus** <br>(count) | The number of Kinesis Processing Units that are used to run your stream processing application.<br>_Shown as unit_ |
| **aws.kinesisanalytics.kpus.average** <br>(gauge) | The average number of Kinesis Processing Units that are used to run your stream processing application. The average number of KPUs used each hour determines the billing for your application.<br>_Shown as unit_ |
| **aws.kinesisanalytics.lambda_delivery_delivery_failed_records** <br>(count) | The number of records returned by a delivery Lambda function that were marked with DeliveryFailed status.<br>_Shown as record_ |
| **aws.kinesisanalytics.lambda_delivery_duration** <br>(gauge) | The average time taken for a delivery Lambda function invocation performed by Kinesis Data Analytics.<br>_Shown as millisecond_ |
| **aws.kinesisanalytics.lambda_delivery_duration.maximum** <br>(gauge) | The maximum time taken for a delivery Lambda function invocation performed by Kinesis Data Analytics.<br>_Shown as millisecond_ |
| **aws.kinesisanalytics.lambda_delivery_duration.minimum** <br>(gauge) | The minimum time taken for a delivery Lambda function invocation performed by Kinesis Data Analytics.<br>_Shown as millisecond_ |
| **aws.kinesisanalytics.lambda_delivery_ok_records** <br>(count) | The number of records returned by a delivery Lambda function that were marked with Ok status.<br>_Shown as record_ |
| **aws.kinesisanalytics.millis_behind_latest** <br>(gauge) | The average duration in milliseconds behind the current time that the application was reading from the streaming source.<br>_Shown as millisecond_ |
| **aws.kinesisanalytics.millis_behind_latest.maximum** <br>(gauge) | The maximum duration in milliseconds behind the current time that the application was reading from the streaming source<br>_Shown as millisecond_ |
| **aws.kinesisanalytics.millis_behind_latest.minimum** <br>(gauge) | The minimum duration in milliseconds behind the current time that the application was reading from the streaming source.<br>_Shown as millisecond_ |
| **aws.kinesisanalytics.records** <br>(count) | The number of records read (per input stream) or written (per output stream).<br>_Shown as record_ |
| **aws.kinesisanalytics.success** <br>(count) | The number of successful delivery attempts to the destination configured for your application.<br>_Shown as unit_ |
| **aws.kinesisanalytics.success.average** <br>(gauge) | The fraction of delivery attempts to the destination configured for your application that are successful.<br>_Shown as fraction_ |

### イベント

Amazon Kinesis Data Analytics インテグレーションには、イベントは含まれません。

### サービス チェック

Amazon Kinesis Data Analytics インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

お問合せは、[Datadog サポート](https://docs.datadoghq.com/help/) まで。