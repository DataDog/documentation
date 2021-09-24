---
aliases:
  - /ja/integrations/awsml/
categories:
  - cloud
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: AWS Machine Learning の予測カウントおよび失敗数を追跡。
doc_link: https://docs.datadoghq.com/integrations/amazon_machine_learning/
draft: false
git_integration_title: amazon_machine_learning
has_logo: true
integration_id: amazon-machine-learning
integration_title: Amazon Machine Learning
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_machine_learning
public_title: Datadog-Amazon Machine Learning インテグレーション
short_description: AWS Machine Learning の予測カウントおよび失敗数を追跡。
version: '1.0'
---
## 概要

Amazon Machine Learning は、あらゆるスキルレベルの開発者が機械学習テクノロジーを簡単に利用できるサービスです。

このインテグレーションを有効にすると、Datadog にすべての Machine Learning メトリクスを表示できます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションタイル][2]のメトリクス収集で、`MachineLearning` をオンにします。
2. [Datadog - AWS Machine Learning インテグレーション][3]をインストールします。

### ログの収集

#### ログの有効化

Amazon Machine Learning から S3 バケットまたは CloudWatch のいずれかにログを送信するよう構成します。

**注**: S3 バケットにログを送る場合は、_Target prefix_ が `amazon_machine_learning` に設定されているかを確認してください。

#### ログを Datadog に送信する方法

1. [Datadog ログコレクション AWS Lambda 関数][4] をまだ設定していない場合は、設定を行ってください。
2. lambda 関数がインストールされたら、AWS コンソールから、Amazon Machine Learning ログを含む S3 バケットまたは CloudWatch のロググループに手動でトリガーを追加します。

    - [S3 バケットに手動トリガーを追加][5]
    - [CloudWatch ロググループに手動トリガーを追加][6]

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_machine_learning" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティグループなど、AWS コンソールに表示されるタグと同じタグが割り当てられます。

### イベント

AWS Machine Learning インテグレーションには、イベントは含まれません。

### サービスのチェック

AWS Machine Learning インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon_machine_learning
[4]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
[5]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_machine_learning/amazon_machine_learning_metadata.csv
[8]: https://docs.datadoghq.com/ja/help/