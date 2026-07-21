---
aliases:
- /ja/integrations/amazon_cloudfront
app_id: amazon-cloudfront
categories:
- aws
- metrics
- cloud
custom_kind: integration
description: Amazon CloudFront は、Web アセットの配信を高速化するグローバル コンテンツ デリバリー ネットワーク (CDN) サービスです。
integration_version: 1.0.0
media: []
title: Amazon CloudFront
---
## 概要

Amazon CloudFront は、Web サイト、API、動画コンテンツ、そのほかの Web アセットの配信を高速化するグローバル コンテンツ デリバリー ネットワーク (CDN) サービスです。

このインテグレーションを有効にすると、CloudFront のすべてのメトリクスを Datadog で確認できます。

## セットアップ

### インストール

まだ設定していない場合は、先に [Amazon Web Services インテグレーション](https://docs.datadoghq.com/integrations/amazon_web_services/) を設定してください。

### メトリクス収集

1. [AWS インテグレーション ページ](https://app.datadoghq.com/integrations/amazon-web-services) の `Metric Collection` タブで、`CloudFront` が有効になっていることを確認します。
1. [Datadog - Amazon CloudFront インテグレーション](https://app.datadoghq.com/integrations/amazon-cloudfront) をインストールします。
1. 任意: CloudFront トラフィックのパフォーマンスをより詳しく把握するには、[CloudFront Distribution の追加メトリクス](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/viewing-cloudfront-metrics.html) を有効にします。

### ログ収集

{{< tabs >}}

{{% tab "Standard Logs" %}}

#### ログを有効にする

ディストリビューションで CloudFront のロギングを有効にする際は、CloudFront がログ ファイルを保存する Amazon S3 バケットを指定します。オリジンとして Amazon S3 を使っている場合、ログ ファイル用に同じバケットを使わないことを Datadog は推奨します。バケットを分けると運用がシンプルになります。

**注**: 複数のディストリビューションのログ ファイルは同じバケットに保存し、ログ フォワーダーのサブスクライブ先を 1 つにまとめることを Datadog は推奨しています。

<div class="alert alert-info">
ログを CloudFront ソースとして自動的に分類するには、ロギングを有効にする際にファイル名のプレフィックスとして <code>cloudfront</code> を指定してください。指定しない場合、ログは <code>s3</code> として分類されます。
</div>

#### ログを Datadog に送信する

1. まだ設定していない場合は、AWS アカウントで [Datadog Forwarder Lambda 関数](https://docs.datadoghq.com/logs/guide/forwarder/) を設定してください。
1. 設定が完了したら、Datadog Forwarder Lambda 関数に移動します。Function Overview セクションで **Add Trigger** をクリックします。
1. Trigger Configuration では **S3** トリガーを選択します。
1. CloudFront のログが保存されている S3 バケットを選択します。
1. イベント タイプは `All object create events` のままにします。
1. **Add** をクリックして、Lambda にトリガーを追加します。

[Log Explorer](https://app.datadoghq.com/logs) を開いて、ログの確認を開始します。

AWS Services のログ収集について詳しくは、[Datadog Lambda 関数で AWS Services Logs を送信する](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/) を参照してください。

{{% /tab %}}

{{% tab "Real-Time Logs" %}}

#### ログを有効にする

##### 専用の設定を作成する

リアル タイム ログ設定を作成する際は、受信したいログ フィールドを指定できます。既定では、[利用可能なフィールド](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/real-time-logs.html#understand-real-time-log-config-fields) がすべて選択されています。

![CloudFront logging 3](images/cloudfront_logging_3.png)

Datadog では、この既定設定をそのまま使い、すべてのフィールドを有効にしたログを自動処理できるよう、次のカスタム パース ルールを追加することを推奨しています。

[Pipelines ページ](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/real-time-logs.html#understand-real-time-log-config-fields) に移動し、Amazon CloudFront を検索して、[grok parser processor を作成または編集](https://docs.datadoghq.com/logs/log_configuration/processors/?tab=ui#grok-parser) し、*Advanced Settings* に次のヘルパー ルールを追加します:

```java
      real_time_logs (%{number:timestamp:scale(1000)}|%{number:timestamp})\s+%{_client_ip}\s+%{_time_to_first_byte}\s+%{_status_code}\s+%{_bytes_write}\s+%{_method}\s+%{regex("[a-z]*"):http.url_details.scheme}\s+%{notSpace:http.url_details.host:nullIf("-")}\s+%{notSpace:http.url_details.path:nullIf("-")}\s+%{_bytes_read}\s+%{notSpace:cloudfront.edge-location:nullIf("-")}\s+%{_request_id}\s+%{_ident}\s+%{_duration}\s+%{_version}\s+IPv%{integer:network.client.ip_version}\s+%{_user_agent}\s+%{_referer}\s+%{notSpace:cloudfront.cookie}\s+(%{notSpace:http.url_details.queryString:querystring}|%{notSpace:http.url_details.queryString:nullIf("-")})\s+%{notSpace:cloudfront.edge-response-result-type:nullIf("-")}\s+%{_x_forwarded_for}\s+%{_ssl_protocol}\s+%{_ssl_cipher}\s+%{notSpace:cloudfront.edge-result-type:nullIf("-")}\s+%{_fle_encrypted_fields}\s+%{_fle_status}\s+%{_sc_content_type}\s+%{_sc_content_len}\s+%{_sc_range_start}\s+%{_sc_range_end}\s+%{_client_port}\s+%{_x_edge_detailed_result_type}\s+%{notSpace:network.client.country:nullIf("-")}\s+%{notSpace:accept-encoding:nullIf("-")}\s+%{notSpace:accept:nullIf("-")}\s+%{notSpace:cache-behavior-path-pattern:nullIf("-")}\s+%{notSpace:headers:nullIf("-")}\s+%{notSpace:header-names:nullIf("-")}\s+%{integer:headers-count}.*
```

#### ログを Datadog に送信する

リアル タイム ログは任意の Kinesis Data Stream に配信され、[Kinesis Firehose インテグレーション](https://docs.datadoghq.com/integrations/amazon_kinesis/) を使って Datadog に直接転送できます。

Amazon Kinesis Data Firehose などのコンシューマーを設定し、リアル タイム ログを S3 バケットへ送信したうえで、[Datadog Lambda forwarder](https://docs.datadoghq.com/serverless/forwarder/) を使って Datadog に転送することもできます。

{{% /tab %}}

{{< /tabs >}}

## 収集データ

### メトリクス

| | |
| --- | --- |
| **aws.cloudfront.401_error_rate** <br>(gauge) | すべてのビューワー リクエストのうち、レスポンスの HTTP ステータス コードが 401 である割合 (Additional Metrics を有効にする必要があります)。<br>_単位は percent_ |
| **aws.cloudfront.403_error_rate** <br>(gauge) | すべてのビューワー リクエストのうち、レスポンスの HTTP ステータス コードが 403 である割合 (Additional Metrics を有効にする必要があります)。<br>_単位は percent_ |
| **aws.cloudfront.404_error_rate** <br>(gauge) | すべてのビューワー リクエストのうち、レスポンスの HTTP ステータス コードが 404 である割合 (Additional Metrics を有効にする必要があります)。<br>_単位は percent_ |
| **aws.cloudfront.4xx_error_rate** <br>(gauge) | すべてのリクエストのうち、HTTP ステータス コードが 4xx である割合<br>_単位は percent_ |
| **aws.cloudfront.502_error_rate** <br>(gauge) | すべてのビューワー リクエストのうち、レスポンスの HTTP ステータス コードが 502 である割合 (Additional Metrics を有効にする必要があります)。<br>_単位は percent_ |
| **aws.cloudfront.503_error_rate** <br>(gauge) | すべてのビューワー リクエストのうち、レスポンスの HTTP ステータス コードが 503 である割合 (Additional Metrics を有効にする必要があります)。<br>_単位は percent_ |
| **aws.cloudfront.504_error_rate** <br>(gauge) | すべてのビューワー リクエストのうち、レスポンスの HTTP ステータス コードが 504 である割合 (Additional Metrics を有効にする必要があります)。<br>_単位は percent_ |
| **aws.cloudfront.5xx_error_rate** <br>(gauge) | すべてのリクエストのうち、HTTP ステータス コードが 5xx である割合<br>_単位は percent_ |
| **aws.cloudfront.bytes_downloaded** <br>(count) | GET、HEAD、OPTIONS リクエストについて、ビューワーがダウンロードしたバイト数<br>_単位は byte_ |
| **aws.cloudfront.bytes_uploaded** <br>(count) | POST および PUT リクエストで、CloudFront を通じてオリジンにアップロードされたバイト数<br>_単位は byte_ |
| **aws.cloudfront.cache_hit_rate** <br>(gauge) | キャッシュ可能なすべてのリクエストのうち、CloudFront がコンテンツを自身のキャッシュから配信した割合。HTTP POST と PUT リクエスト (およびエラー) はキャッシュ可能なリクエストには含まれません (Additional Metrics を有効にする必要があります)。<br>_単位は percent_ |
| **aws.cloudfront.function_compute_utilization** <br>(gauge) | 関数の実行にかかった時間を、許可された最大実行時間に対する割合で表した値<br>_単位は percent_ |
| **aws.cloudfront.function_execution_errors** <br>(gauge) | 指定期間中に発生した実行エラー数<br>_単位は error_ |
| **aws.cloudfront.function_invocations** <br>(count) | 指定期間中に関数が開始された回数<br>_単位は invocation_ |
| **aws.cloudfront.function_throttles** <br>(count) | 指定期間中に関数がスロットリングされた回数<br>_単位は throttle_ |
| **aws.cloudfront.function_validation_errors** <br>(gauge) | 指定期間中に関数で発生した検証エラー数<br>_単位は error_ |
| **aws.cloudfront.lambda_execution_error** <br>(count) | 指定期間中に発生した Lambda 実行エラー数<br>_単位は error_ |
| **aws.cloudfront.lambda_limit_exceeded_error** <br>(count) | 指定期間中に発生した Lambda の上限超過エラー数<br>_単位は error_ |
| **aws.cloudfront.lambda_validation_error** <br>(count) | 指定期間中に発生した Lambda 検証エラー数<br>_単位は error_ |
| **aws.cloudfront.origin_latency** <br>(gauge) | オリジン (CloudFront キャッシュではありません) から配信されるリクエストについて、CloudFront がリクエストを受信してから、ネットワーク (ビューワーではありません) へのレスポンス送信を開始するまでの合計時間。これは first byte latency または time-to-first-byte とも呼ばれます (Additional Metrics を有効にする必要があります)。<br>_単位は millisecond_ |
| **aws.cloudfront.requests** <br>(count) | すべての HTTP メソッド、および HTTP / HTTPS の両方におけるリクエスト数|
| **aws.cloudfront.total_error_rate** <br>(gauge) | すべてのリクエストのうち、HTTP ステータス コードが 4xx または 5xx である割合<br>_単位は percent_ |

AWS から取得した各メトリクスには、AWS console に表示されるものと同じタグが付与されます。これには `aws_account`、`region`、`distributionid` などが含まれますが、これらに限りません。

### イベント

Amazon CloudFront インテグレーションにはイベントは含まれません。

### サービス チェック

Amazon CloudFront インテグレーションにはサービス チェックは含まれません。

## トラブルシューティング

サポートが必要な場合は、[Datadog サポート](https://docs.datadoghq.com/help/) にお問い合わせください。