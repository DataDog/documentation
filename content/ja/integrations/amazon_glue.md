---
categories:
  - cloud
  - aws
  - ログの収集
ddtype: crawler
dependencies: []
description: Amazon Glue のキーメトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/amazon_glue/'
draft: false
git_integration_title: amazon_glue
has_logo: true
integration_id: amazon-glue
integration_title: Amazon Glue
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_glue
public_title: Datadog-Amazon Glue インテグレーション
short_description: Amazon Glue のキーメトリクスを追跡
version: '1.0'
---
## 概要

Amazon Glue は、シンプルかつコスト効率よくデータを分類、クリーニング、補完したり、さまざまなデータストア間のデータ移動を高い信頼性で行うことができるフルマネージド型 ETL (抽出、変換、ロード) サービスです。

このインテグレーションを有効にすると、Datadog にすべての Glue メトリクスを表示できます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションタイル][2]のメトリクス収集で、`Glue` をオンにします。
2. [Datadog - Amazon Glue インテグレーション][3]をインストールします。

### ログの収集

#### ログの有効化

Amazon Glue から S3 バケットまたは CloudWatch のいずれかにログを送信するよう構成します。

**注**: S3 バケットにログを送る場合は、_Target prefix_ が `amazon_glue` に設定されているかを確認してください。

#### ログを Datadog に送信する方法

1. [Datadog ログコレクション AWS Lambda 関数][4] をまだ設定していない場合は、設定を行ってください。
2. Lambda 関数がインストールされたら、AWS コンソールから、Amazon Glue ログを含む S3 バケットまたは CloudWatch のロググループに手動でトリガーを追加します。

    - [S3 バケットに手動トリガーを追加][5]
    - [CloudWatch ロググループに手動トリガーを追加][6]

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_glue" >}}


### イベント

Amazon Glue インテグレーションには、イベントは含まれません。

### サービスのチェック

Amazon Glue インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-glue
[4]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
[5]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_glue/amazon_glue_metadata.csv
[8]: https://docs.datadoghq.com/ja/help/