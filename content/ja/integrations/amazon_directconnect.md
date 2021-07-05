---
aliases:
  - /ja/integrations/awsdirectconnect/
categories:
  - cloud
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: Amazon Direct Connect のキーメトリクスを追跡します。
doc_link: 'https://docs.datadoghq.com/integrations/amazon_directconnect/'
draft: false
git_integration_title: amazon_directconnect
has_logo: true
integration_id: amazon-direct-connect
integration_title: Amazon Direct Connect
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_directconnect
public_title: Datadog-Amazon Direct Connect インテグレーション
short_description: Amazon Direct Connect のキーメトリクスを追跡。
version: '1.0'
---
## 概要

このインテグレーションは、AWS Direct Connect から接続状態、送受信ビットレート、送受信パケットレートなどのメトリクスを収集します。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションタイル][2]のメトリクス収集で、`DirectConnect` をオンにします。
2. Amazon Direct Connect のメトリクスを収集するために、次のアクセス許可を [Datadog IAM ポリシー][3]に追加します。

    - `directconnect:DescribeConnections`: 使用できる Direct Connect 接続をリストするために使用されます。
    - `directconnect:DescribeTags`: Direct Connect 接続に適用されるカスタムタグを収集するために使用されます。

    Direct Connect ポリシーの詳細については、[AWS Web サイトのガイド][4]を参照してください。

3. [Datadog - AWS Direct Connect インテグレーション][5]をインストールします。

### ログの収集

#### ログの有効化

Amazon Direct Connect から S3 バケットまたは CloudWatch のいずれかにログを送信するよう構成します。

**注**: S3 バケットにログを送る場合は、_Target prefix_ が `amazon_directconnect` に設定されているかを確認してください。

#### ログを Datadog に送信する方法

1. [Datadog ログ コレクション AWS Lambda 関数][6]をまだ実行していない場合は、セットアップします。
2. Lambda 関数がインストールされたら、AWS コンソールから、Amazon Direct Connect ログを含む S3 バケットまたは CloudWatch ロググループに手動でトリガーを追加します。

    - [S3 バケットに手動トリガーを追加][7]
    - [CloudWatch ロググループに手動トリガーを追加][8]

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_directconnect" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティグループなど、AWS コンソールに表示されるタグと同じタグが割り当てられます。

### イベント

AWS Direct Connect インテグレーションには、イベントは含まれません。

### サービスのチェック

AWS Direct Connect インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_directconnect.html
[5]: https://app.datadoghq.com/account/settings#integrations/amazon_directconnect
[6]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
[7]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[8]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[9]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_directconnect/amazon_directconnect_metadata.csv
[10]: https://docs.datadoghq.com/ja/help/