---
aliases:
  - /ja/integrations/awscloudfront/
categories:
  - cloud
  - caching
  - web
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: エラー率、リクエストカウント数、ダウンロードバイト数、アップロードバイト数を追跡。
doc_link: https://docs.datadoghq.com/integrations/amazon_cloudfront/
draft: false
git_integration_title: amazon_cloudfront
has_logo: true
integration_id: amazon-cloudfront
integration_title: Amazon CloudFront
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_cloudfront
public_title: Datadog-Amazon CloudFront インテグレーション
short_description: エラー率、リクエストカウント数、ダウンロードバイト数、アップロードバイト数を追跡。
version: '1.0'
---
## 概要

Amazon CloudFront は、Web サイト、API、ビデオコンテンツなどの Web 資産の配信を高速化するグローバルなコンテンツ配信ネットワーク (CDN) サービスです。

このインテグレーションを有効にすると、Datadog にすべての CloudFront メトリクスを表示できます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションタイル][2]のメトリクス収集で、`CloudFront` をオンにします。
2. [Datadog - AWS CloudFront インテグレーション][3]をインストールします。
3. 任意: [CloudFront ディストリビューションの追加メトリクス][4] を有効化すると、CloudFront トラフィックのパフォーマンスの可視性を高めることができます。

### ログの収集

{{< tabs >}}
{{% tab "Standard Logs" %}}

#### ログの有効化

ディストリビューションで CloudFront ログを有効にする際は、CloudFront がログファイルを格納するために使用する Amazon S3 バケットを指定します。Amazon S3 を発信元として使用する場合、Datadog ではログファイルに同じバケットを使用しないことをお勧めしています。別のバケットを使用することで、メンテナンスを簡略化できます。

{{< img src="integrations/amazon_cloudfront/cloudfront_logging_1.png" alt="Cloudfront ロギング 1" popup="true" style="width:70%;">}}

{{< img src="integrations/amazon_cloudfront/cloudfront_logging_2.png" alt="Cloudfront ロギング 2" popup="true" style="width:70%;">}}

**重要**: 複数のディストリビューションのログファイルは同じバケットに格納してください。ログを有効にする場合は、[どのログファイルがどのディストリビューションに関連付けられているかを追跡できるように][1]、`cloudfront` をファイル名のプレフィックスとして指定します。

#### ログを Datadog に送信する方法

1. [Datadog ログコレクション AWS Lambda 関数][2]をまだセットアップしていない場合は、セットアップします。
2. Lambda 関数がインストールされたら、AWS コンソールで Lambda のトリガーリストの S3 をクリックして、 Cloudfront ログを含む S3 バケットに手動でトリガーを追加します。
   {{< img src="integrations/amazon_s3/s3_trigger_configuration.png" alt="S3 トリガーコンフィギュレーション" popup="true" style="width:70%;">}}
   Cloudfront ログを含む S3 バケットを選択してトリガーを構成し、イベントタイプを `Object Created (All)` に変更して、Add ボタンをクリックします。
   {{< img src="integrations/amazon_s3/s3_lambda_trigger_configuration.png" alt="S3 Lambda トリガーコンフィギュレーション" popup="true" style="width:70%;">}}

完了したら、[Datadog Log セクション][3]に移動し、ログを確認します。

[1]: http://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/AccessLogs.html#access-logs-choosing-s3-bucket
[2]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#create-a-new-lambda-function
[3]: https://app.datadoghq.com/logs
{{% /tab %}}
{{% tab "Real-Time Logs" %}}

#### ログの有効化

##### 特定のコンフィギュレーションの作成

リアルタイムのログコンフィギュレーションを作成する際、受信するログのフィールドを指定することができます。デフォルトでは、すべての[利用可能なフィールド][1]が選択されています。

{{< img src="integrations/amazon_cloudfront/cloudfront_logging_3.png" alt="Cloudfront ロギング 3" popup="true" style="width:70%;">}}

このデフォルトのコンフィギュレーションを維持し、以下のカスタムパースルールを追加して、すべてのフィールドが有効な状態でログを自動的に処理することをおすすめします。

{{< code-block lang="java" >}}
      real_time_logs (%{number:timestamp:scale(1000)}|%{number:timestamp})\s+%{_client_ip}\s+%{_time_to_first_byte}\s+%{_status_code}\s+%{_bytes_write}\s+%{_method}\s+%{regex("[a-z]*"):http.url_details.scheme}\s+%{notSpace:http.url_details.host:nullIf("-")}\s+%{notSpace:http.url_details.path:nullIf("-")}\s+%{_bytes_read}\s+%{notSpace:cloudfront.edge-location:nullIf("-")}\s+%{_request_id}\s+%{_ident}\s+%{_duration}\s+%{_version}\s+IPv%{integer:network.client.ip_version}\s+%{_user_agent}\s+%{_referer}\s+%{notSpace:cloudfront.cookie}\s+(%{notSpace:http.url_details.queryString:querystring}|%{notSpace:http.url_details.queryString:nullIf("-")})\s+%{notSpace:cloudfront.edge-response-result-type:nullIf("-")}\s+%{_x_forwarded_for}\s+%{_ssl_protocol}\s+%{_ssl_cipher}\s+%{notSpace:cloudfront.edge-result-type:nullIf("-")}\s+%{_fle_encrypted_fields}\s+%{_fle_status}\s+%{_sc_content_type}\s+%{_sc_content_len}\s+%{_sc_range_start}\s+%{_sc_range_end}\s+%{_client_port}\s+%{_x_edge_detailed_result_type}\s+%{notSpace:network.client.country:nullIf("-")}\s+%{notSpace:accept-encoding:nullIf("-")}\s+%{notSpace:accept:nullIf("-")}\s+%{notSpace:cache-behavior-path-pattern:nullIf("-")}\s+%{notSpace:headers:nullIf("-")}\s+%{notSpace:header-names:nullIf("-")}\s+%{integer:headers-count}.*
{{< /code-block >}}

#### ログを Datadog に送信する方法

リアルタイムログは、選択した Kinesis Data Stream へ配信され、[Kinesis Firehose インテグレーション][2]により Datadog に直接転送することが可能です。

Amazon Kinesis Data Firehose などのコンシューマーを構成してリアルタイムログを S3 バケットに送信し、[Datadog Lambda forwarder][3] を使用してログを Datadog へ送信することもできます。

[1]: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/real-time-logs.html#understand-real-time-log-config-fields
[2]: https://docs.datadoghq.com/ja/integrations/amazon_kinesis/
[3]: https://docs.datadoghq.com/ja/serverless/forwarder/
{{% /tab %}}
{{< /tabs >}}

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_cloudfront" >}}


AWS から取得される各メトリクスには、`aws_account`、`region`、`distributionid` など、AWS コンソールに表示されるタグと同じタグが割り当てられます。

### イベント

AWS Cloudfront インテグレーションには、イベントは含まれません。

### サービスのチェック

AWS Cloudfront インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon_cloudfront
[4]: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/viewing-cloudfront-metrics.html
[5]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_cloudfront/amazon_cloudfront_metadata.csv
[6]: https://docs.datadoghq.com/ja/help/