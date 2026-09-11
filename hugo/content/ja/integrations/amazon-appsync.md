---
aliases:
- /ja/integrations/amazon_appsync
app_id: amazon-appsync
categories:
- aws
- cloud
- data stores
- log collection
custom_kind: integration
description: AppSync の柔軟で安全な API を使えば、さまざまなソースのデータにアクセスして組み合わせるアプリを簡単に開発できます。
media: []
title: AWS AppSync
---
## 概要

AWS AppSync を使うと、1 つ以上のデータ ソースに安全にアクセスし、データを操作して組み合わせるための柔軟な API を作成できるため、アプリケーション開発を簡素化できます。

このインテグレーションを有効にすると、AppSync のすべてのメトリクスを Datadog で確認できます。

## セットアップ

### インストール

まだ設定していない場合は、先に [Amazon Web Services インテグレーション](https://docs.datadoghq.com/integrations/amazon_web_services/) を設定してください。

### メトリクス収集

1. [AWS integration ページ](https://app.datadoghq.com/integrations/amazon-web-services) の `Metric Collection` タブで、`AppSync` が有効になっていることを確認します。
1. [Datadog - AWS AppSync インテグレーション](https://app.datadoghq.com/integrations/amazon-appsync) をインストールします。

### ログ収集

#### ログを有効にする

AWS AppSync がログを S3 バケットまたは CloudWatch に送信するよう設定します。

**注**: S3 バケットにログを出力する場合は、_Target prefix_ に `amazon_appsync` が設定されていることを確認してください。

#### ログを Datadog に送信する

1. まだ設定していない場合は、[Datadog Forwarder Lambda 関数](https://docs.datadoghq.com/logs/guide/forwarder/) を設定してください。

1. Lambda 関数をインストールしたら、AWS コンソールで AWS AppSync のログが保存されている S3 バケットまたは CloudWatch log group に、手動でトリガーを追加します:

   - [S3 バケットに手動でトリガーを追加する](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)
   - [CloudWatch Log Group に手動でトリガーを追加する](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group)

## 収集データ

### メトリクス

| | |
| --- | --- |
| **aws.appsync.4xxerror** <br>(count) | 誤ったクライアント設定による無効なリクエストの結果として記録されたエラー数<br>_単位は error_ |
| **aws.appsync.5xxerror** <br>(count) | GraphQL クエリの実行中に発生したエラー数<br>_単位は error_ |
| **aws.appsync.active_connections** <br>(count) | 1 分間における、クライアントから AWS AppSync への同時 WebSocket 接続数|
| **aws.appsync.connect_server_error** <br>(count) | 接続処理中に AWS AppSync 側で発生したエラー数。これは、予期しないサーバー側の問題が起きた場合に発生することがあります。<br>_単位は error_ |
| **aws.appsync.connect_success** <br>(count) | AWS AppSync への WebSocket 接続が正常に確立された回数。サブスクリプションがない接続もあり得ます。<br>_単位は success_ |
| **aws.appsync.connection_duration** <br>(count) | 接続が維持された時間<br>_単位は millisecond_ |
| **aws.appsync.disconnect_client_error** <br>(count) | WebSocket 接続の切断処理中に AWS AppSync 側で発生したクライアント エラー数<br>_単位は error_ |
| **aws.appsync.disconnect_server_error** <br>(count) | WebSocket 接続の切断処理中に AWS AppSync 側で発生したサーバー エラー数<br>_単位は error_ |
| **aws.appsync.disconnect_success** <br>(count) | AWS AppSync との WebSocket 切断が正常に完了した回数<br>_単位は success_ |
| **aws.appsync.latency** <br>(gauge) | AWS AppSync がクライアントからリクエストを受信してから、クライアントにレスポンスを返すまでの平均時間。レスポンスがエンド デバイスに到達するまでのネットワーク遅延は含みません。<br>_単位は millisecond_ |
| **aws.appsync.latency.maximum** <br>(gauge) | AWS AppSync がクライアントからリクエストを受信してから、クライアントにレスポンスを返すまでの最大時間。レスポンスがエンド デバイスに到達するまでのネットワーク遅延は含みません。<br>_単位は millisecond_ |
| **aws.appsync.latency.p90** <br>(gauge) | AWS AppSync がクライアントからリクエストを受信してから、クライアントにレスポンスを返すまでの時間の 90 パーセンタイル値。レスポンスがエンド デバイスに到達するまでのネットワーク遅延は含みません。<br>_単位は millisecond_ |
| **aws.appsync.publish_data_message_client_error** <br>(count) | クライアント側のエラーにより発行に失敗したサブスクリプション イベント メッセージ数<br>_単位は error_ |
| **aws.appsync.publish_data_message_server_error** <br>(count) | サブスクリプション イベント メッセージの発行中に AWS AppSync 側で発生したエラー数。これは、予期しないサーバー側の問題が起きた場合に発生することがあります。<br>_単位は error_ |
| **aws.appsync.publish_data_message_size** <br>(gauge) | 発行されたサブスクリプション イベント メッセージのサイズ<br>_単位は byte_ |
| **aws.appsync.publish_data_message_success** <br>(count) | 正常に発行されたサブスクリプション イベント メッセージ数<br>_単位は success_ |
| **aws.appsync.requests** <br>(count) | アカウント内のすべての API が処理したリクエスト数 (クエリ + ミューテーション)<br>_単位は request_ |
| **aws.appsync.subscribe_client_error** <br>(count) | クライアント側のエラーにより AWS AppSync に拒否されたサブスクリプション数。これは、JSON ペイロードが不正な場合、サービスがスロットリングされている場合、または Authorization 設定が誤っている場合に発生することがあります。<br>_単位は error_ |
| **aws.appsync.subscribe_server_error** <br>(count) | サブスクリプション処理中に AWS AppSync 側で発生したエラー数。これは、予期しないサーバー側の問題が起きた場合に発生することがあります。<br>_単位は error_ |
| **aws.appsync.subscribe_success** <br>(count) | WebSocket 経由で AWS AppSync に正常に登録されたサブスクリプション数。サブスクリプションがない接続はあり得ますが、接続のないサブスクリプションはあり得ません。<br>_単位は success_ |
| **aws.appsync.unsubscribe_client_error** <br>(count) | クライアント側のエラーにより AWS AppSync に拒否されたサブスクリプション解除数<br>_単位は error_ |
| **aws.appsync.unsubscribe_server_error** <br>(count) | サブスクリプション解除の処理中に AWS AppSync 側で発生したエラー数。これは、予期しないサーバー側の問題が起きた場合に発生することがあります。<br>_単位は error_ |
| **aws.appsync.unsubscribe_success** <br>(count) | AWS AppSync で正常に処理されたサブスクリプション解除数<br>_単位は success_ |
| **aws.appsync.active_connections.sum** <br>(count) | 1 分間における、クライアントから AWS AppSync への同時 WebSocket 接続数の合計|
| **aws.appsync.active_subscriptions** <br>(count) | 1 分間における、クライアントからの同時サブスクリプション数|
| **aws.appsync.active_subscriptions.sum** <br>(count) | 1 分間における、クライアントからの同時サブスクリプション数の合計|
| **aws.appsync.connect_client_error** <br>(count) | クライアント側のエラーにより AWS AppSync に拒否された WebSocket 接続数。これは、サービスがスロットリングされているか、Authorization 設定が誤っていることを示している可能性があります。<br>_単位は error_ |
| **aws.appsync.connect_client_error.sum** <br>(count) | クライアント側のエラーにより AWS AppSync に拒否された WebSocket 接続数の合計。これは、サービスがスロットリングされているか、Authorization 設定が誤っていることを示している可能性があります。<br>_単位は error_ |
| **aws.appsync.connect_server_error.sum** <br>(count) | 接続処理中に AWS AppSync 側で発生したエラー数の合計。これは、予期しないサーバー側の問題が起きた場合に発生することがあります。<br>_単位は error_ |
| **aws.appsync.connect_success.sum** <br>(count) | AWS AppSync への WebSocket 接続が正常に確立された回数の合計。サブスクリプションがない接続もあり得ます。<br>_単位は success_ |
| **aws.appsync.disconnect_client_error.sum** <br>(count) | WebSocket 接続の切断処理中に AWS AppSync 側で発生したクライアント エラー数の合計<br>_単位は error_ |
| **aws.appsync.disconnect_server_error.sum** <br>(count) | WebSocket 接続の切断処理中に AWS AppSync 側で発生したサーバー エラー数の合計<br>_単位は error_ |
| **aws.appsync.disconnect_success.sum** <br>(count) | AWS AppSync との WebSocket 切断が正常に完了した回数の合計<br>_単位は success_ |
| **aws.appsync.publish_data_message_client_error.sum** <br>(count) | クライアント側のエラーにより発行に失敗したサブスクリプション イベント メッセージ数の合計<br>_単位は error_ |
| **aws.appsync.publish_data_message_server_error.sum** <br>(count) | サブスクリプション イベント メッセージの発行中に AWS AppSync 側で発生したエラー数。これは、予期しないサーバー側の問題が起きた場合に発生することがあります。<br>_単位は error_ |
| **aws.appsync.publish_data_message_success.sum** <br>(count) | 正常に発行されたサブスクリプション イベント メッセージ数の合計<br>_単位は success_ |
| **aws.appsync.subscribe_client_error.sum** <br>(count) | クライアント側のエラーにより AWS AppSync に拒否されたサブスクリプション数の合計。これは、JSON ペイロードが不正な場合、サービスがスロットリングされている場合、または Authorization 設定が誤っている場合に発生することがあります。<br>_単位は error_ |
| **aws.appsync.subscribe_server_error.sum** <br>(count) | サブスクリプション処理中に AWS AppSync 側で発生したエラー数の合計。これは、予期しないサーバー側の問題が起きた場合に発生することがあります。<br>_単位は error_ |
| **aws.appsync.subscribe_success.sum** <br>(count) | WebSocket 経由で AWS AppSync に正常に登録されたサブスクリプション数の合計。サブスクリプションがない接続はあり得ますが、接続のないサブスクリプションはあり得ません。<br>_単位は success_ |
| **aws.appsync.unsubscribe_client_error.sum** <br>(count) | クライアント側のエラーにより AWS AppSync に拒否されたサブスクリプション解除数の合計<br>_単位は error_ |
| **aws.appsync.unsubscribe_server_error.sum** <br>(count) | サブスクリプション解除の処理中に AWS AppSync 側で発生したエラー数の合計。これは、予期しないサーバー側の問題が起きた場合に発生することがあります。<br>_単位は error_ |
| **aws.appsync.unsubscribe_success.sum** <br>(count) | AWS AppSync で正常に処理されたサブスクリプション解除数の合計<br>_単位は success_ |

### イベント

AWS AppSync インテグレーションにはイベントは含まれません。

### サービス チェック

AWS AppSync インテグレーションにはサービス チェックは含まれません。

## トラブルシューティング

サポートが必要な場合は、[Datadog サポート](https://docs.datadoghq.com/help/) にお問い合わせください。