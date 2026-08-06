---
aliases:
- /ja/integrations/awscloudfront/
app_id: amazon-cloudfront
app_uuid: cd25d530-0cab-41b3-b810-9c1589f584ce
assets:
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check:
      - aws.cloudfront.requests
      metadata_path: assets/metrics/metric-spec.yaml
      prefix: aws.cloudfront
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 167
    source_type_name: Amazon CloudFront
  monitors:
    4XX Error Rate is High: assets/monitors/rec_mon_4xx_errors.json
    5XX Error Rate is High: assets/monitors/rec_mon_5xx_errors.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- aws
- metrics
- cloud
custom_kind: インテグレーション
dependencies: []
description: エラー率、リクエストカウント数、ダウンロードバイト数、アップロードバイト数を追跡。
display_on_public_website: true
doc_link: https://docs.datadoghq.com/integrations/amazon_cloudfront/
draft: false
git_integration_title: amazon_cloudfront
has_logo: true
integration_id: amazon-cloudfront
integration_title: Amazon CloudFront
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_cloudfront
public_title: Amazon CloudFront
short_description: Amazon CloudFront は、Web アセットの配信を高速化するグローバルな CDN サービスです。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Metrics
  - Category::クラウド
  - Offering::Integration
  configuration: README.md#Setup
  description: Amazon CloudFront は、Web アセットの配信を高速化するグローバルな CDN サービスです。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Amazon CloudFront
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Amazon CloudFront は、Web サイト、API、ビデオコンテンツなどの Web 資産の配信を高速化するグローバルなコンテンツ配信ネットワーク (CDN) サービスです。

このインテグレーションを有効にすると、Datadog にすべての CloudFront メトリクスを表示できます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][2]で、`Metric Collection` タブの下にある `CloudFront` が有効になっていることを確認します。
2. [Datadog - Amazon CloudFront インテグレーション][3]をインストールします。
3. 任意: [CloudFront ディストリビューションの追加メトリクス][4] を有効化すると、CloudFront トラフィックのパフォーマンスの可視性を高めることができます。

### ログ収集

{{< tabs >}}
{{% tab "Standard Logs" %}}

#### ログの有効化

ディストリビューションで CloudFront ログを有効にする際は、CloudFront がログファイルを格納するために使用する Amazon S3 バケットを指定します。Amazon S3 を発信元として使用する場合、Datadog ではログファイルに同じバケットを使用しないことをお勧めしています。別のバケットを使用することで、メンテナンスを簡略化できます。

**注**: Datadog は、ログ転送が 1 つのバケットにサブスクライブするだけでよいように、複数のディストリビューションのログファイルを同じバケットに格納することを推奨します。

<div class="alert alert-info">
ログを CloudFront ソースで自動的に分類するには、ロギングを有効にする際にファイル名のプレフィックスとして <code>cloudfront</code> を指定してください。それ以外の場合、ログは <code>s3</code> に分類されます。
</div>

#### ログを Datadog に送信する方法

1. AWS アカウントで [Datadog Forwarder Lambda 関数][1]をまだセットアップしていない場合は、セットアップします。
2. 設定したら、Datadog Forwarder Lambda 関数に移動します。Function Overview セクションで、**Add Trigger** をクリックします。
3. Trigger Configuration で **S3** トリガーを選択します。
4. CloudFront のログが格納されている S3 バケットを選択します。
5. イベントの種類は `All object create events` のままにしておきます。
6. **Add** をクリックすると、Lambda にトリガーが追加されます。

[ログエクスプローラー][2]に移動して、ログを確認します。

AWS Services のログを収集する方法については、[Datadog Lambda 関数で AWS Services のログを送信する][3]を参照してください。


[1]: https://docs.datadoghq.com/ja/logs/guide/forwarder/
[2]: https://app.datadoghq.com/logs
[3]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
{{% /tab %}}
{{% tab "Real-Time Logs" %}}

#### ログの有効化

##### 特定のコンフィギュレーションの作成

リアルタイムのログコンフィギュレーションを作成する際、受信するログのフィールドを指定することができます。デフォルトでは、すべての[利用可能なフィールド][1]が選択されています。

![CloudFront のログ 3][2]

Datadog は、このデフォルトのコンフィギュレーションを維持し、以下のカスタムパースルールを追加して、すべてのフィールドが有効な状態でログを自動的に処理することをおすすめします。

[Pipelines ページ][1] に移動し、Amazon CloudFront を検索して、[grok parser processor を作成または編集][3] し、*Advanced Settings* に次の補助ルールを追加します:

```java
      real_time_logs (%{number:timestamp:scale(1000)}|%{number:timestamp})\s+%{_client_ip}\s+%{_time_to_first_byte}\s+%{_status_code}\s+%{_bytes_write}\s+%{_method}\s+%{regex("[a-z]*"):http.url_details.scheme}\s+%{notSpace:http.url_details.host:nullIf("-")}\s+%{notSpace:http.url_details.path:nullIf("-")}\s+%{_bytes_read}\s+%{notSpace:cloudfront.edge-location:nullIf("-")}\s+%{_request_id}\s+%{_ident}\s+%{_duration}\s+%{_version}\s+IPv%{integer:network.client.ip_version}\s+%{_user_agent}\s+%{_referer}\s+%{notSpace:cloudfront.cookie}\s+(%{notSpace:http.url_details.queryString:querystring}|%{notSpace:http.url_details.queryString:nullIf("-")})\s+%{notSpace:cloudfront.edge-response-result-type:nullIf("-")}\s+%{_x_forwarded_for}\s+%{_ssl_protocol}\s+%{_ssl_cipher}\s+%{notSpace:cloudfront.edge-result-type:nullIf("-")}\s+%{_fle_encrypted_fields}\s+%{_fle_status}\s+%{_sc_content_type}\s+%{_sc_content_len}\s+%{_sc_range_start}\s+%{_sc_range_end}\s+%{_client_port}\s+%{_x_edge_detailed_result_type}\s+%{notSpace:network.client.country:nullIf("-")}\s+%{notSpace:accept-encoding:nullIf("-")}\s+%{notSpace:accept:nullIf("-")}\s+%{notSpace:cache-behavior-path-pattern:nullIf("-")}\s+%{notSpace:headers:nullIf("-")}\s+%{notSpace:header-names:nullIf("-")}\s+%{integer:headers-count}.*
```

#### ログを Datadog に送信する方法

リアルタイム ログは、任意の Kinesis Data Stream に配信され、[Kinesis Firehose インテグレーション][4] を使って Datadog に直接転送できます。

また、Amazon Kinesis Data Firehose などのコンシューマーを設定してリアルタイム ログを S3 バケットに送り、[Datadog Lambda forwarder][5] を使って Datadog にログを転送することもできます。


[1]: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/real-time-logs.html#understand-real-time-log-config-fields
[2]: images/cloudfront_logging_3.png
[3]: https://docs.datadoghq.com/ja/logs/log_configuration/processors/?tab=ui#grok-parser
[4]: https://docs.datadoghq.com/ja/integrations/amazon_kinesis/
[5]: https://docs.datadoghq.com/ja/serverless/forwarder/
{{% /tab %}}
{{< /tabs >}}

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_cloudfront" >}}


AWS から取得される各メトリクスには、`aws_account`、`region`、`distributionid` など、AWS コンソールに表示されるタグと同じタグが割り当てられます。

### イベント

Amazon CloudFront インテグレーションには、イベントは含まれません。

### サービスチェック

Amazon CloudFront インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。


[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-cloudfront
[4]: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/viewing-cloudfront-metrics.html
[5]: https://docs.datadoghq.com/ja/help/