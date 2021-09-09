---
aliases:
  - /ja/integrations/awsiot/
categories:
  - cloud
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: Amazon Internet of Things のキーメトリクスを追跡。
doc_link: https://docs.datadoghq.com/integrations/amazon_iot/
draft: false
git_integration_title: amazon_iot
has_logo: true
integration_id: amazon-iot
integration_title: Amazon Internet of Things
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_iot
public_title: Datadog-Amazon Internet of Things インテグレーション
short_description: Amazon Internet of Things のキーメトリクスを追跡。
version: '1.0'
---
## 概要

AWS IoT は、接続されたデバイスが簡単かつセキュアにクラウドアプリケーションや他のデバイスと対話できるようにするマネージド型クラウドプラットフォームです。

このインテグレーションを有効にすると、Datadog にすべての IOT メトリクスを表示できます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションタイル][2]のメトリクス収集で、`IoT` をオンにします。
2. [Datadog - AWS IoT インテグレーション][3]をインストールします。

### ログの収集

#### ログの有効化

Amazon IoT から S3 バケットまたは CloudWatch のいずれかにログを送信するよう構成します。

**注**: S3 バケットにログを送る場合は、_Target prefix_ が `amazon_iot` に設定されているかを確認してください。

#### ログを Datadog に送信する方法

1. [Datadog ログコレクション AWS Lambda 関数][4] をまだ設定していない場合は、設定を行ってください。
2. lambda 関数がインストールされたら、AWS コンソールから、Amazon IoT ログを含む S3 バケットまたは CloudWatch のロググループに手動でトリガーを追加します。

    - [S3 バケットに手動トリガーを追加][5]
    - [CloudWatch ロググループに手動トリガーを追加][6]

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_iot" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティグループなど、AWS コンソールに表示されるタグと同じタグが割り当てられます。

### イベント

AWS IoT インテグレーションには、イベントは含まれません。

### サービスのチェック

AWS IoT インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon_iot
[4]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
[5]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_iot/amazon_iot_metadata.csv
[8]: https://docs.datadoghq.com/ja/help/