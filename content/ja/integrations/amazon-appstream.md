---
aliases:
- /ja/integrations/amazon_appstream
app_id: amazon-appstream
categories:
- aws
- cloud
- configuration & deployment
- log collection
custom_kind: integration
description: AWS から Web ブラウザーへデスクトップ アプリをストリーミングするための、安全でフル マネージドなサービス。
media: []
title: Amazon AppStream
---
## 概要

Amazon AppStream は、AWS から Web ブラウザーへデスクトップ アプリケーションをストリーミングできる、フル マネージドで安全なアプリケーション ストリーミング サービスです。

このインテグレーションを有効にすると、AppStream のすべてのメトリクスを Datadog で確認できます。

## セットアップ

### インストール

まだ設定していない場合は、先に [Amazon Web Services インテグレーション](https://docs.datadoghq.com/integrations/amazon_web_services/) を設定してください。

### メトリクス収集

1. [AWS インテグレーション ページ](https://app.datadoghq.com/integrations/amazon-web-services) の `Metric Collection` タブで、`AppStream` が有効になっていることを確認します。
1. [Datadog - Amazon AppStream インテグレーション](https://app.datadoghq.com/integrations/amazon-appstream) をインストールします。

### ログ収集

#### ログを有効にする

Amazon AppStream がログを S3 バケットまたは CloudWatch に送信するよう設定します。

**注**: S3 バケットにログを出力する場合は、_Target prefix_ に `amazon_appstream` が設定されていることを確認してください。

#### ログを Datadog に送信する

1. まだ設定していない場合は、[Datadog Forwarder Lambda 関数](https://docs.datadoghq.com/logs/guide/forwarder/) を設定してください。

1. Lambda 関数をインストールしたら、AWS コンソールで Amazon AppStream のログが保存されている S3 バケットまたは CloudWatch log group に、手動でトリガーを追加します:

   - [S3 バケットに手動でトリガーを追加する](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)
   - [CloudWatch Log Group に手動でトリガーを追加する](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group)

## 収集データ

### メトリクス

| | |
| --- | --- |
| **aws.appstream.actual_capacity** <br>(count) | ストリーミングに利用可能、または現在ストリーミング中のインスタンスの平均数|
| **aws.appstream.actual_capacity.maximum** <br>(count) | ストリーミングに利用可能、または現在ストリーミング中のインスタンスの最大数|
| **aws.appstream.actual_capacity.minimum** <br>(count) | ストリーミングに利用可能、または現在ストリーミング中のインスタンスの最小数|
| **aws.appstream.available_capacity** <br>(count) | 現在ユーザー セッションに利用可能なアイドル インスタンスの平均数|
| **aws.appstream.available_capacity.maximum** <br>(count) | 現在ユーザー セッションに利用可能なアイドル インスタンスの最大数|
| **aws.appstream.available_capacity.minimum** <br>(count) | 現在ユーザー セッションに利用可能なアイドル インスタンスの最小数|
| **aws.appstream.capacity_utilization** <br>(count) | フリート内で使用されているインスタンスの平均割合<br>_単位は percent_ |
| **aws.appstream.capacity_utilization.maximum** <br>(count) | フリート内で使用されているインスタンスの最大割合<br>_単位は percent_ |
| **aws.appstream.capacity_utilization.minimum** <br>(count) | フリート内で使用されているインスタンスの最小割合<br>_単位は percent_ |
| **aws.appstream.desired_capacity** <br>(count) | 実行中または保留中のインスタンスの平均数。これは、定常状態でそのフリートがサポートできる同時ストリーミング セッションの総数を表します|
| **aws.appstream.desired_capacity.maximum** <br>(count) | 実行中または保留中のインスタンスの最大数。これは、定常状態でそのフリートがサポートできる同時ストリーミング セッションの総数を表します|
| **aws.appstream.desired_capacity.minimum** <br>(count) | 実行中または保留中のインスタンスの最小数。これは、定常状態でそのフリートがサポートできる同時ストリーミング セッションの総数を表します|
| **aws.appstream.in_use_capacity** <br>(count) | 現在ストリーミング セッションに使用されているインスタンスの平均数|
| **aws.appstream.in_use_capacity.maximum** <br>(count) | 現在ストリーミング セッションに使用されているインスタンスの最大数|
| **aws.appstream.in_use_capacity.minimum** <br>(count) | 現在ストリーミング セッションに使用されているインスタンスの最小数|
| **aws.appstream.insufficient_capacity_error** <br>(count) | 容量不足のため拒否されたセッション リクエストの平均数|
| **aws.appstream.insufficient_capacity_error.maximum** <br>(count) | 容量不足のため拒否されたセッション リクエストの最大数|
| **aws.appstream.insufficient_capacity_error.minimum** <br>(count) | 容量不足のため拒否されたセッション リクエストの最小数|
| **aws.appstream.insufficient_capacity_error.sum** <br>(count) | 容量不足のため拒否されたセッション リクエスト数の合計|
| **aws.appstream.pending_capacity** <br>(count) | AppStream によりプロビジョニング中のインスタンスの平均数。これは、プロビジョニング完了後にそのフリートが追加でサポートできるストリーミング セッション数を表します|
| **aws.appstream.pending_capacity.maximum** <br>(count) | AppStream によりプロビジョニング中のインスタンスの最大数。これは、プロビジョニング完了後にそのフリートが追加でサポートできるストリーミング セッション数を表します|
| **aws.appstream.pending_capacity.minimum** <br>(count) | AppStream によりプロビジョニング中のインスタンスの最小数。これは、プロビジョニング完了後にそのフリートが追加でサポートできるストリーミング セッション数を表します|
| **aws.appstream.running_capacity** <br>(count) | 現在稼働中のインスタンスの平均数。これは、その時点のフリートの状態でサポートできる同時ストリーミング セッション数を表します|
| **aws.appstream.running_capacity.maximum** <br>(count) | 現在稼働中のインスタンスの最大数。これは、その時点のフリートの状態でサポートできる同時ストリーミング セッション数を表します|
| **aws.appstream.running_capacity.minimum** <br>(count) | 現在稼働中のインスタンスの最小数。これは、その時点のフリートの状態でサポートできる同時ストリーミング セッション数を表します|

### イベント

Amazon AppStream インテグレーションにはイベントは含まれません。

### サービス チェック

Amazon AppStream インテグレーションにはサービス チェックは含まれません。

## トラブルシューティング

サポートが必要な場合は、[Datadog サポート](https://docs.datadoghq.com/help/) にお問い合わせください。