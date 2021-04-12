---
categories:
  - cloud
  - aws
  - ログの収集
ddtype: crawler
dependencies: []
description: Amazon Cognito のキーメトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/amazon_cognito/'
draft: false
git_integration_title: amazon_cognito
has_logo: true
integration_title: Amazon Cognito
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_cognito
public_title: Datadog-Amazon Cognito インテグレーション
short_description: Amazon Cognito のキーメトリクスを追跡
version: '1.0'
---
## 概要

Amazon Cognito は、ユーザーの一意 ID の作成、ID プロバイダーによるユーザー ID の認証、AWS Cloud へのモバイルユーザーデータの保存を行うことができるサービスです。

このインテグレーションを有効にすると、Datadog に Cognito Advanced Security メトリクスを表示できます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションタイル][2]のメトリクス収集で、`Cognito` をオンにします。
2. [Datadog - Amazon Cognito インテグレーション][3]をインストールします。

**注**: AWS で Advanced Security を有効にする必要があります。[User Pool に Advanced Security][4] を追加するには、AWS のドキュメントを参照してください。

### ログの収集

#### ログの有効化

Amazon Cognito から S3 バケットまたは CloudWatch のいずれかにログを送信するよう構成します。

**注**: ユーザープールのログのみが送信可能です。Amazon はその他の Cognito ログの送信をサポートしていません。

**注**: S3 バケットにログを送る場合は、_Target prefix_ が `amazon_cognito` に設定されているかを確認してください。

#### ログを Datadog に送信する方法

1. [Datadog ログコレクション AWS Lambda 関数][5] をまだ設定していない場合は、設定を行ってください。
2. lambda 関数がインストールされたら、AWS コンソールから、Amazon Cognito ログを含む S3 バケットまたは CloudWatch のロググループに手動でトリガーを追加します。

    - [S3 バケットに手動トリガーを追加][6]
    - [Cloudwatch ロググループに手動トリガーを追加][7]

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_cognito" >}}


### イベント

Amazon Cognito インテグレーションには、イベントは含まれません。

### サービスのチェック

Amazon Cognito インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-cognito
[4]: https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pool-settings-advanced-security.html
[5]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
[6]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[7]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[8]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_cognito/amazon_cognito_metadata.csv
[9]: https://docs.datadoghq.com/ja/help/