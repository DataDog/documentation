---
categories:
  - cloud
  - aws
  - ログの収集
ddtype: crawler
dependencies: []
description: Amazon Trusted Advisor のキーメトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/amazon_trusted_advisor/'
draft: false
git_integration_title: amazon_trusted_advisor
has_logo: true
integration_title: Amazon Trusted Advisor
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_trusted_advisor
public_title: Datadog-Amazon Trusted Advisor インテグレーション
short_description: Amazon Trusted Advisor のキーメトリクスを追跡
version: '1.0'
---
## 概要

Amazon Trusted Advisor は、AWS ベストプラクティスに従ってリソースをプロビジョニングするために、リアルタイムガイダンスを提供するオンラインツールです。

このインテグレーションを有効にすると、Datadog にすべての Trusted Advisor メトリクスを表示できます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションタイル][2]のメトリクス収集で、`TrustedAdvisor` をオンにします。
2. [Datadog - Amazon Trusted Advisor インテグレーション][3]をインストールします。

### ログの収集

#### ログの有効化

Amazon Trusted Advisor から S3 バケットまたは CloudWatch のいずれかにログを送信するよう構成します。

**注**: S3 バケットにログを送る場合は、_Target prefix_ が `amazon_trusted_advisor` に設定されているかを確認してください。

#### Datadog へのログの送信

1. [Datadog ログ コレクション AWS Lambda 関数][4]をまだ実行していない場合は、セットアップします。
2. lambda 関数がインストールされたら、AWS コンソールから、Amazon Trusted Advisor ログを含む S3 バケットまたは CloudWatch のロググループに手動でトリガーを追加します。

    - [S3 バケットに手動トリガーを追加][5]
    - [Cloudwatch ロググループに手動トリガーを追加][6]

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_trusted_advisor" >}}


### イベント

Amazon Trusted Advisor インテグレーションには、イベントは含まれません。

### サービスのチェック

Amazon Trusted Advisor インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-trusted-advisor
[4]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
[5]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_trusted_advisor/amazon_trusted_advisor_metadata.csv
[8]: https://docs.datadoghq.com/ja/help/