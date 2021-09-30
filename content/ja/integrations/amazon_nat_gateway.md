---
categories:
  - cloud
  - aws
  - ログの収集
ddtype: crawler
dependencies: []
description: Amazon NAT Gateway のキーメトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/amazon_nat_gateway/'
draft: false
git_integration_title: amazon_nat_gateway
has_logo: true
integration_id: amazon-nat-gateway
integration_title: Amazon NAT Gateway
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_nat_gateway
public_title: Datadog-Amazon NAT Gateway インテグレーション
short_description: Amazon NAT Gateway のキーメトリクスを追跡
version: '1.0'
---
## 概要

Amazon NAT Gateway を使用すると、プライベートサブネットのインスタンスからインターネットに接続できても、インターネットからはこれらのインスタンスとの接続を開始できないようにすることができます。

このインテグレーションを有効にすると、Datadog にすべての NAT Gateway メトリクスを表示できます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションタイル][2]のメトリクス収集で、`NATGateway` をオンにします。
2. [Datadog - Amazon NAT Gateway インテグレーション][3]をインストールします。

### ログの収集

#### ログの有効化

Amazon NAT Gateway から S3 バケットまたは CloudWatch のいずれかにログを送信するよう構成します。

**注**: S3 バケットにログを送る場合は、_Target prefix_ が `amazon_nat_gateway` に設定されているかを確認してください。

#### ログを Datadog に送信する方法

1. [Datadog ログコレクション AWS Lambda 関数][4] をまだ設定していない場合は、設定を行ってください。
2. lambda 関数がインストールされたら、AWS コンソールから手動で、Amazon NAT Gateway ログを含む CloudWatch ロググループにトリガーを追加します。

    - [S3 バケットに手動トリガーを追加][5]
    - [CloudWatch ロググループに手動トリガーを追加][6]

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_nat_gateway" >}}


### イベント

Amazon NAT Gateway インテグレーションには、イベントは含まれません。

### サービスのチェック

Amazon NAT Gateway インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-nat-gateway
[4]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
[5]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_nat_gateway/amazon_nat_gateway_metadata.csv
[8]: https://docs.datadoghq.com/ja/help/