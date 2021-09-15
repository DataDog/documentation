---
categories:
  - cloud
  - aws
  - ログの収集
ddtype: crawler
dependencies: []
description: Amazon Elastic Transcoder のキーメトリクスを追跡
doc_link: https://docs.datadoghq.com/integrations/amazon_elastic_transcoder/
draft: false
git_integration_title: amazon_elastic_transcoder
has_logo: true
integration_id: amazon-elastic-transcoder
integration_title: Amazon Elastic Transcoder
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_elastic_transcoder
public_title: Datadog-Amazon Elastic Transcoder インテグレーション
short_description: Amazon Elastic Transcoder のキーメトリクスを追跡
version: '1.0'
---
## 概要

Amazon Elastic Transcoder を使用すると、Amazon S3 に保存したメディアファイルを、市販再生デバイスに対応した形式のメディアファイルに変換できます。

このインテグレーションを有効にすると、Datadog にすべての Elastic Transcoder メトリクスを表示できます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションタイル][2]のメトリクス収集で、`ElasticTranscoder` をオンにします。
2. [Datadog - Amazon Elastic Transcoder インテグレーション][3]をインストールします。

### ログの収集

#### ログの有効化

Amazon Elastic Transcoder から S3 バケットまたは CloudWatch のいずれかにログを送信するよう構成します。

**注**: S3 バケットにログを送る場合は、_Target prefix_ が `amazon_elastic_transcoder` に設定されているかを確認してください。

#### ログを Datadog に送信する方法

1. [Datadog ログコレクション AWS Lambda 関数][4] をまだ設定していない場合は、設定を行ってください。
2. Lambda 関数がインストールされたら、AWS コンソールから、Amazon Elastic Transcoder ログを含む S3 バケットまたは CloudWatch のロググループに手動でトリガーを追加します。

    - [S3 バケットに手動トリガーを追加][5]
    - [CloudWatch ロググループに手動トリガーを追加][6]

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_elastic_transcoder" >}}


### イベント

Amazon Elastic Transcoder インテグレーションには、イベントは含まれません。

### サービスのチェック

Amazon Elastic Transcoder インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-elastic-transcoder
[4]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
[5]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_elastic_transcoder/amazon_elastic_transcoder_metadata.csv
[8]: https://docs.datadoghq.com/ja/help/