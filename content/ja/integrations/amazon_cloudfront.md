---
aliases:
  - /ja/integrations/awscloudfront/
categories:
  - cloud
  - caching
  - web
  - aws
  - log collection
ddtype: クローラー
dependencies: []
description: エラー率、リクエストカウント、ダウンロードバイト数、アップロードバイト数を追跡
doc_link: 'https://docs.datadoghq.com/integrations/amazon_cloudfront/'
git_integration_title: amazon_cloudfront
has_logo: true
integration_title: Amazon CloudFront
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_cloudfront
public_title: Datadog-Amazon CloudFront インテグレーション
short_description: エラー率、リクエストカウント、ダウンロードバイト数、アップロードバイト数を追跡
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

### ログの収集
#### Cloudfront ログの有効化

ディストリビューションでログを有効にする際は、CloudFront がログファイルを格納するために使用する Amazon S3 バケットを指定します。Amazon S3 を発信元として使用する場合は、ログファイルに同じバケットを使用しないことをお勧めします。別のバケットを使用することで、メンテナンスを簡略化できます。

{{< img src="integrations/amazon_cloudfront/cloudfront_logging_1.png" alt="Cloudfront logging 1" responsive="true" popup="true" style="width:70%;">}}

{{< img src="integrations/amazon_cloudfront/cloudfront_logging_2.png" alt="Cloudfront logging 1" responsive="true" popup="true" style="width:70%;">}}

**重要**: 複数のディストリビューションのログファイルは同じバケットに格納してください。ログを有効にする場合は、[どのログファイルがどのディストリビューションに関連付けられているかを追跡できるように][4]、`cloudfront` をファイル名のプレフィックスとして指定します。

#### Datadog へのログの送信

1. [Datadog ログコレクション AWS Lambda 関数][5]をまだセットアップしていない場合は、セットアップします。
2. Lambda 関数がインストールされたら、AWS コンソールで Cloudfront ログを含む S3 バケットに手動でトリガーを追加します。Lambda で、トリガーリストから S3 をクリックします。
{{< img src="integrations/amazon_s3/s3_trigger_configuration.png" alt="S3 trigger configuration" responsive="true" popup="true" style="width:70%;">}}
    Cloudfront ログを含む S3 バケットを選択してトリガーを構成し、イベントタイプを `Object Created (All)` に変更して、Add ボタンをクリックします。
{{< img src="integrations/amazon_s3/s3_lambda_trigger_configuration.png" alt="S3 Lambda trigger configuration" responsive="true" popup="true" style="width:70%;">}}

完了したら、[Datadog Log セクション][6]に移動し、ログを確認します。

## 収集データ
### メトリクス
{{< get-metrics-from-git "amazon_cloudfront" >}}


AWS から取得される各メトリクスには、`aws_account`、`region`、`distributionid` など、AWS コンソールに表示されるタグと同じタグが割り当てられます。

### イベント
AWS Cloudfront インテグレーションには、イベントは含まれません。

### サービスのチェック
AWS Cloudfront インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon_cloudfront
[4]: http://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/AccessLogs.html#access-logs-choosing-s3-bucket
[5]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#create-a-new-lambda-function
[6]: https://app.datadoghq.com/logs
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_cloudfront/amazon_cloudfront_metadata.csv
[8]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}