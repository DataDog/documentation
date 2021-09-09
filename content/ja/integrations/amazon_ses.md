---
aliases:
  - /ja/integrations/awsses/
categories:
  - cloud
  - Collaboration
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: メールのバウンス、配信の試行、メッセージの拒否などを追跡。
doc_link: https://docs.datadoghq.com/integrations/amazon_ses/
draft: false
git_integration_title: amazon_ses
has_logo: true
integration_id: amazon-ses
integration_title: Amazon SES
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_ses
public_title: Datadog-Amazon SES インテグレーション
short_description: メールのバウンス、配信の試行、メッセージの拒否などを追跡。
version: '1.0'
---
## 概要

Amazon Simple Email Service (SES) は、費用効率の高いアウトバウンド専用のメール送信サービスです。

このインテグレーションを有効にすると、Datadog にすべての SES メトリクスを表示できます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションタイル][2]のメトリクス収集で、`SES` をオンにします。
2. Amazon SES のメトリクスを収集するために、次のアクセス許可を [Datadog IAM ポリシー][3]に追加します。

    - `ses:GetSendQuota`: 送信クオータに関するメトリクスを追加します。
    - `ses:GetSendStatistics`: 送信統計に関するメトリクスを追加します。

    SES ポリシーの詳細については、[AWS Web サイトのガイド][4]を参照してください。

3. [Datadog - AWS SES インテグレーション][5]をインストールします。

### ログの収集

#### ログの有効化

Amazon SES から S3 バケットまたは CloudWatch のいずれかにログを送信するよう構成します。

**注**: S3 バケットにログを送る場合は、_Target prefix_ が `amazon_ses` に設定されているかを確認してください。

#### ログを Datadog に送信する方法

1. [Datadog ログ コレクション AWS Lambda 関数][6]をまだ実行していない場合は、セットアップします。
2. lambda 関数がインストールされたら、AWS コンソールから、Amazon SES ログを含む S3 バケットまたは CloudWatch のロググループに手動でトリガーを追加します。

    - [S3 バケットに手動トリガーを追加][7]
    - [CloudWatch ロググループに手動トリガーを追加][8]

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_ses" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティグループなど、AWS コンソールに表示されるタグと同じタグが割り当てられます。

### イベント

AWS SES インテグレーションには、イベントは含まれません。

### サービスのチェック

AWS SES インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_ses.html
[5]: https://app.datadoghq.com/account/settings#integrations/amazon_ses
[6]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
[7]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[8]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[9]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_ses/amazon_ses_metadata.csv
[10]: https://docs.datadoghq.com/ja/help/