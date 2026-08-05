---
aliases:
- /ja/integrations/amazon_app_runner
app_id: amazon-app-runner
categories:
- aws
- cloud
- 構成とデプロイ
- log collection
- プロビジョニング
custom_kind: integration
description: ソース コードまたはコンテナ イメージから、すばやく簡単に、しかもコスト効率よくデプロイできます。
media: []
title: AWS App Runner
---
## 概要

AWS App Runner を使用すると、ソースコードまたはコンテナイメージから AWS にアプリケーションをデプロイできます。

このインテグレーションを有効にすると、Datadog にすべての App Runner メトリクスを表示できます。

## セットアップ

### インストール

If you haven't already, set up the [Amazon Web Services integration](https://docs.datadoghq.com/integrations/amazon_web_services/) first.

### メトリクスの収集

1. [AWS インテグレーション ページ](https://app.datadoghq.com/integrations/amazon-web-services) の `Metric Collection` タブで、`AppRunner` が有効になっていることを確認します。
1. [Datadog - AWS App Runner インテグレーション](https://app.datadoghq.com/integrations/amazon-app-runner) をインストールします。

### ログ収集

AWS App Runner によって管理されるアプリケーションから Datadog と統合できるログには 2 種類あります。これらのログは、2 つの異なるロググループで CloudWatch に送信されます。1 つ目は、アプリケーションのビルドやデプロイなど、App Runner サービスのすべてのライフサイクルアクティビティログをキャプチャするサービスロググループです。2 つ目は、実行中のアプリケーションのコードからのログ出力を含むアプリケーションロググループです。

#### ログを Datadog に送信する方法

1. If you haven’t already, set up the [Datadog Forwarder Lambda function](https://docs.datadoghq.com/logs/guide/forwarder/).
1. Lambda 関数をインストールしたら、AWS コンソールで App Runner サービスまたはアプリケーション CloudWatch ロググループにトリガーを手動で追加します。
   {{< img src="integrations/amazon_cloudwatch/cloudwatch_log_collection_1.png" alt="CloudWatch Logs グループ" popup="true" style="width:70%;">}}
   対応する CloudWatch ロググループを選択し、フィルター名を追加して (空にすることも可能)、トリガーを追加します。
   {{< img src="integrations/amazon_cloudwatch/cloudwatch_log_collection_2.png" alt="Cloudwatch トリガー" popup="true" style="width:70%;">}}
1. 手順 2 を繰り返して、追加のロググループを追加します。
1. 設定が完了したら、[Datadog Log section](https://app.datadoghq.com/logs) に移動してログの確認を始めてください。

### イベント収集

AWS App Runner は、サービスとオペレーションの両方のステータス変更イベントを EventBridge に送信します。これらを Datadog に転送すれば、[Event Stream](https://app.datadoghq.com/event/stream) で確認できます。これらのイベントを Datadog に送るには、次の手順を実施します:

1. [Datadog Events 用の EventBridge API Destination](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-api-destination-partners.html#eb-api-destination-datadog) を作成します。
1. AWS App Runner イベントを処理する EventBridge ルールを作成します ([Handling App Runner events in EventBridge](https://docs.aws.amazon.com/apprunner/latest/dg/monitor-ev.html) を参照)。ターゲットには API Destination を選択します。
1. Datadog イベントストリームで新しいステータス変更イベントの表示を開始します。

## 収集データ

### メトリクス

| | |
| --- | --- |
| **aws.apprunner.2xx_status_responses** <br>(count) | 2XX HTTP レスポンス数<br>_単位は response_ |
| **aws.apprunner.4xx_status_responses** <br>(count) | 4XX HTTP レスポンス数<br>_単位は response_ |
| **aws.apprunner.5xx_status_responses** <br>(count) | 5XX HTTP レスポンス数<br>_単位は response_ |
| **aws.apprunner.active_instances** <br>(gauge) | アクティブなインスタンス数<br>_単位は instance_ |
| **aws.apprunner.cpuutilization** <br>(gauge) | 1 分単位で見た平均 CPU 使用率<br>_単位は percent_ |
| **aws.apprunner.memory_utilization** <br>(gauge) | 1 分単位で見た平均メモリ使用率<br>_単位は percent_ |
| **aws.apprunner.request_latency** <br>(gauge) | Web サービスが HTTP リクエストを処理するのにかかった時間<br>_単位は millisecond_ |
| **aws.apprunner.request_latency.p50** <br>(gauge) | Web サービスが HTTP リクエストを処理するのにかかった時間の 50 パーセンタイル値<br>_単位は millisecond_ |
| **aws.apprunner.request_latency.p95** <br>(gauge) | Web サービスが HTTP リクエストを処理するのにかかった時間の 95 パーセンタイル値<br>_単位は millisecond_ |
| **aws.apprunner.request_latency.p99** <br>(gauge) | Web サービスが HTTP リクエストを処理するのにかかった時間の 99 パーセンタイル値<br>_単位は millisecond_ |
| **aws.apprunner.requests** <br>(count) | サービスが受信した HTTP リクエスト数<br>_単位は request_ |

### イベント

AWS App Runner インテグレーションは、EventBridge からのサービスとオペレーションのステータス変更イベントの両方をサポートします。

### サービス チェック

AWS App Runner  インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

お問合せは、[Datadog サポート](https://docs.datadoghq.com/help/) まで。