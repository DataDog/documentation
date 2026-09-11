---
aliases:
- /ja/integrations/amazon_connect
app_id: amazon-connect
categories:
- cloud
- aws
- log collection
custom_kind: integration
description: Amazon Connect は、セルフ サービスで設定でき、柔軟でパーソナルかつ自然な顧客エンゲージメントを実現します。
media: []
title: Amazon Connect
---
## 概要

Amazon Connect は、セルフ サービスで設定でき、柔軟でパーソナルかつ自然な顧客エンゲージメントを実現します。

このインテグレーションを有効にすると、Connect のすべてのメトリクスを Datadog で確認できます。

## セットアップ

### インストール

まだ設定していない場合は、先に [Amazon Web Services インテグレーション](https://docs.datadoghq.com/integrations/amazon_web_services/) を設定してください。

### メトリクス収集

1. [AWS integration ページ](https://app.datadoghq.com/integrations/amazon-web-services) の `Metric Collection` タブで、`Connect` が有効になっていることを確認します。
1. [Datadog - Amazon Connect インテグレーション](https://app.datadoghq.com/integrations/amazon-connect) をインストールします。

### ログ収集

#### ログを有効にする

Amazon Connect がログを S3 バケットまたは CloudWatch に送信するよう設定します。

**注**: S3 バケットにログを出力する場合は、_Target prefix_ に `amazon_connect` が設定されていることを確認してください。

#### ログを Datadog に送信する

1. まだ設定していない場合は、[Datadog Forwarder Lambda 関数](https://docs.datadoghq.com/logs/guide/forwarder/) を設定してください。

1. Lambda 関数をインストールしたら、AWS コンソールで Amazon Connect のログが保存されている S3 バケットまたは CloudWatch log group に、手動でトリガーを追加します:

   - [S3 バケットに手動でトリガーを追加する](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)
   - [CloudWatch Log Group に手動でトリガーを追加する](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group)

## 収集データ

### メトリクス

| | |
| --- | --- |
| **aws.connect.call_back_not_dialable_number** <br>(count) | キューに入った顧客へのコールバックで、顧客の電話番号がそのインスタンスで発信を許可していない国の番号だったため発信できなかった平均回数|
| **aws.connect.call_back_not_dialable_number.maximum** <br>(count) | キューに入った顧客へのコールバックで、顧客の電話番号がそのインスタンスで発信を許可していない国の番号だったため発信できなかった最大回数|
| **aws.connect.call_back_not_dialable_number.minimum** <br>(count) | キューに入った顧客へのコールバックで、顧客の電話番号がそのインスタンスで発信を許可していない国の番号だったため発信できなかった最小回数|
| **aws.connect.call_recording_upload_error** <br>(count) | インスタンス用に設定された Amazon S3 バケットへのアップロードに失敗した通話録音の平均件数|
| **aws.connect.call_recording_upload_error.maximum** <br>(count) | インスタンス用に設定された Amazon S3 バケットへのアップロードに失敗した通話録音の最大件数|
| **aws.connect.call_recording_upload_error.minimum** <br>(count) | インスタンス用に設定された Amazon S3 バケットへのアップロードに失敗した通話録音の最小件数|
| **aws.connect.calls_breaching_concurrency_quota** <br>(count) | インスタンスの同時アクティブ音声通話の上限を超えた音声通話の平均件数|
| **aws.connect.calls_breaching_concurrency_quota.maximum** <br>(count) | インスタンスの同時アクティブ音声通話の上限を超えた音声通話の最大件数|
| **aws.connect.calls_breaching_concurrency_quota.minimum** <br>(count) | インスタンスの同時アクティブ音声通話の上限を超えた音声通話の最小件数|
| **aws.connect.calls_per_interval** <br>(count) | インスタンスで 1 秒あたりに受信または発信された音声通話の平均件数|
| **aws.connect.calls_per_interval.maximum** <br>(count) | インスタンスで 1 秒あたりに受信または発信された音声通話の最大件数|
| **aws.connect.calls_per_interval.minimum** <br>(count) | インスタンスで 1 秒あたりに受信または発信された音声通話の最小件数|
| **aws.connect.concurrent_calls** <br>(count) | ダッシュボードにデータが表示された時点での、インスタンス内の同時アクティブ音声通話数の平均|
| **aws.connect.concurrent_calls.maximum** <br>(count) | ダッシュボードにデータが表示された時点での、インスタンス内の同時アクティブ音声通話数の最大値|
| **aws.connect.concurrent_calls.minimum** <br>(count) | ダッシュボードにデータが表示された時点での、インスタンス内の同時アクティブ音声通話数の最小値|
| **aws.connect.concurrent_calls_percentage** <br>(gauge) | インスタンスで使用されている同時アクティブ音声通話のサービス上限に対する平均使用率<br>_単位は percent_ |
| **aws.connect.concurrent_calls_percentage.maximum** <br>(gauge) | インスタンスで使用されている同時アクティブ音声通話のサービス上限に対する最大使用率<br>_単位は percent_ |
| **aws.connect.concurrent_calls_percentage.minimum** <br>(gauge) | インスタンスで使用されている同時アクティブ音声通話のサービス上限に対する最小使用率<br>_単位は percent_ |
| **aws.connect.contact_flow_errors** <br>(count) | コンタクト フローのエラー分岐が実行された平均回数|
| **aws.connect.contact_flow_errors.maximum** <br>(count) | コンタクト フローのエラー分岐が実行された最大回数|
| **aws.connect.contact_flow_errors.minimum** <br>(count) | コンタクト フローのエラー分岐が実行された最小回数|
| **aws.connect.contact_flow_fatal_errors** <br>(count) | システム エラーによりコンタクト フローの実行が失敗した平均回数|
| **aws.connect.contact_flow_fatal_errors.maximum** <br>(count) | システム エラーによりコンタクト フローの実行が失敗した最大回数|
| **aws.connect.contact_flow_fatal_errors.minimum** <br>(count) | システム エラーによりコンタクト フローの実行が失敗した最小回数|
| **aws.connect.longest_queue_wait_time** <br>(count) | コンタクトがキューで待機した最長時間 (秒) の平均。これは、更新間隔中にコンタクトがキューで待機した時間です。|
| **aws.connect.longest_queue_wait_time.maximum** <br>(count) | コンタクトがキューで待機した最長時間 (秒) の平均。これは、更新間隔中にコンタクトがキューで待機した時間です。|
| **aws.connect.longest_queue_wait_time.minimum** <br>(count) | コンタクトがキューで待機した最長時間 (秒) の平均。これは、更新間隔中にコンタクトがキューで待機した時間です。|
| **aws.connect.misconfigured_phone_numbers** <br>(count) | 電話番号がコンタクト フローに関連付けられていなかったため失敗した通話の平均件数|
| **aws.connect.misconfigured_phone_numbers.maximum** <br>(count) | 電話番号がコンタクト フローに関連付けられていなかったため失敗した通話の最大件数|
| **aws.connect.misconfigured_phone_numbers.minimum** <br>(count) | 電話番号がコンタクト フローに関連付けられていなかったため失敗した通話の最小件数|
| **aws.connect.missed_calls** <br>(count) | 更新間隔中にエージェントが取り逃した音声通話の平均件数|
| **aws.connect.missed_calls.maximum** <br>(count) | 更新間隔中にエージェントが取り逃した音声通話の最大件数|
| **aws.connect.missed_calls.minimum** <br>(count) | 更新間隔中にエージェントが取り逃した音声通話の最小件数|
| **aws.connect.public_signing_key_usage** <br>(count) | コンタクト フロー セキュリティ キー (公開署名キー) を使用して、コンタクト フロー内の顧客入力を暗号化した平均回数|
| **aws.connect.public_signing_key_usage.maximum** <br>(count) | コンタクト フロー セキュリティ キー (公開署名キー) を使用して、コンタクト フロー内の顧客入力を暗号化した最大回数|
| **aws.connect.public_signing_key_usage.minimum** <br>(count) | コンタクト フロー セキュリティ キー (公開署名キー) を使用して、コンタクト フロー内の顧客入力を暗号化した最小回数|
| **aws.connect.queue_size** <br>(count) | キュー内のコンタクト数の平均|
| **aws.connect.queue_size.maximum** <br>(count) | キュー内のコンタクト数の最大値|
| **aws.connect.queue_size.minimum** <br>(count) | キュー内のコンタクト数の最小値|
| **aws.connect.throttled_calls** <br>(count) | 1 秒あたりの通話数がサポート上限を超えたため拒否された音声通話の平均件数|
| **aws.connect.throttled_calls.maximum** <br>(count) | 1 秒あたりの通話数がサポート上限を超えたため拒否された音声通話の最大件数|
| **aws.connect.throttled_calls.minimum** <br>(count) | 1 秒あたりの通話数がサポート上限を超えたため拒否された音声通話の最小件数|
| **aws.connect.to_instance_packet_loss_rate** <br>(count) | 10 秒ごとに報告される、インスタンス内の通話における平均パケット損失率|
| **aws.connect.to_instance_packet_loss_rate.maximum** <br>(count) | 10 秒ごとに報告される、インスタンス内の通話における最大パケット損失率|
| **aws.connect.to_instance_packet_loss_rate.minimum** <br>(count) | 10 秒ごとに報告される、インスタンス内の通話における最小パケット損失率|
| **aws.connect.queue_capacity_exceeded_error** <br>(count) | キューが満杯だったため拒否された通話の平均件数|
| **aws.connect.queue_capacity_exceeded_error.maximum** <br>(count) | キューが満杯だったため拒否された通話の最大件数|
| **aws.connect.queue_capacity_exceeded_error.minimum** <br>(count) | キューが満杯だったため拒否された通話の最小件数|

### イベント

Amazon Connect インテグレーションにはイベントは含まれません。

### サービス チェック

Amazon Connect インテグレーションにはサービス チェックは含まれません。

## トラブルシューティング

サポートが必要な場合は、[Datadog サポート](https://docs.datadoghq.com/help/) にお問い合わせください。