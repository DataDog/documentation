---
categories:
- AWS
- クラウド
- ログの収集
- モバイル
dependencies: []
description: Amazon Cognito のキーメトリクスを追跡
doc_link: https://docs.datadoghq.com/integrations/amazon_cognito/
draft: false
git_integration_title: amazon_cognito
has_logo: true
integration_id: ''
integration_title: Amazon Cognito
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_cognito
public_title: Datadog-Amazon Cognito インテグレーション
short_description: Amazon Cognito のキーメトリクスを追跡
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Amazon Cognito は、ユーザーの一意 ID の作成、ID プロバイダーによるユーザー ID の認証、AWS Cloud へのモバイルユーザーデータの保存を行うことができるサービスです。

このインテグレーションを有効にすると、Datadog に Cognito Advanced Security メトリクスを表示できます。

## 計画と使用

### インフラストラクチャーリスト

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][2]で、`Metric Collection` タブの下にある `Cognito` が有効になっていることを確認します。
2. [Datadog - Amazon Cognito インテグレーション][3]をインストールします。

**注**: AWS で Advanced Security を有効にする必要があります。[User Pool に Advanced Security][4] を追加するには、AWS のドキュメントを参照してください。

### 収集データ

#### ログの有効化

Amazon Cognito から S3 バケットまたは CloudWatch のいずれかにログを送信するよう構成します。

**注**: ユーザープールのログのみが送信可能です。Amazon はその他の Cognito ログの送信をサポートしていません。

**注**: S3 バケットにログを送る場合は、_Target prefix_ が `amazon_cognito` に設定されているかを確認してください。

#### ログを Datadog に送信する方法

1. [Datadog Forwarder Lambda 関数][5]をまだセットアップしていない場合は、セットアップします。
2. Lambda 関数がインストールされたら、AWS コンソールから、Amazon Cognito ログを含む S3 バケットまたは CloudWatch のロググループに手動でトリガーを追加します。

    - [S3 バケットに手動トリガーを追加][6]
    - [CloudWatch ロググループに手動トリガーを追加][7]

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "amazon_cognito" >}}


### ヘルプ

Amazon Cognito インテグレーションには、イベントは含まれません。

### ヘルプ

Amazon Cognito インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-cognito
[4]: https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pool-settings-advanced-security.html
[5]: https://docs.datadoghq.com/ja/logs/guide/forwarder/
[6]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[7]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[8]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_cognito/amazon_cognito_metadata.csv
[9]: https://docs.datadoghq.com/ja/help/