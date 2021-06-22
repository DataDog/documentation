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
further_reading:
  - link: 'https://docs.datadoghq.com/dashboards/faq/why-isn-t-my-aws-trusted-advisor-dashboard-showing-any-data/'
    tag: よくあるご質問
    text: AWS Trusted Advisor ダッシュボードにデータが表示されないのはなぜですか？
git_integration_title: amazon_trusted_advisor
has_logo: true
integration_id: amazon-trusted-advisor
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

**注**: このインテグレーションは、AWS のビジネスサポートプランまたはエンタープライズサポートプランのお客様に対してのみ機能します。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. IAM コンソールで、ポリシードキュメントのフィールドにアクションとして `support:describe*` および `support:refresh*` を追加します。AWS サポート API に関する詳細は、[AWS ウェブサイトのドキュメント][2]を参照してください。
2. [AWS インテグレーションタイル][3]のメトリクス収集で、`TrustedAdvisor` をオンにします。
3. [Datadog - Amazon Trusted Advisor インテグレーション][4]をインストールします。

### ログの収集

#### ログの有効化

Amazon Trusted Advisor から S3 バケットまたは CloudWatch のいずれかにログを送信するよう構成します。

**注**: S3 バケットにログを送る場合は、_Target prefix_ が `amazon_trusted_advisor` に設定されているかを確認してください。

#### ログを Datadog に送信する方法

1. [Datadog ログコレクション AWS Lambda 関数][5] をまだ設定していない場合は、設定を行ってください。
2. Lambda 関数がインストールされたら、AWS コンソールから、Amazon Trusted Advisor ログを含む S3 バケットまたは CloudWatch のロググループに手動でトリガーを追加します。

    - [S3 バケットに手動トリガーを追加][6]
    - [CloudWatch ロググループに手動トリガーを追加][7]

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_trusted_advisor" >}}


### イベント

Amazon Trusted Advisor インテグレーションには、イベントは含まれません。

### サービスのチェック

Amazon Trusted Advisor インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}



[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://docs.aws.amazon.com/service-authorization/latest/reference/list_awssupport.html
[3]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[4]: https://app.datadoghq.com/account/settings#integrations/amazon-trusted-advisor
[5]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
[6]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[7]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[8]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_trusted_advisor/amazon_trusted_advisor_metadata.csv
[9]: https://docs.datadoghq.com/ja/help/