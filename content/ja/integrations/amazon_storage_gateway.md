---
aliases:
  - /ja/integrations/awsstoragegateway/
categories:
  - cloud
  - data store
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: AWS Storage Gateway のキーメトリクスを追跡。
doc_link: https://docs.datadoghq.com/integrations/amazon_storage_gateway/
draft: false
git_integration_title: amazon_storage_gateway
has_logo: true
integration_id: amazon-storage-gateway
integration_title: Amazon Storage Gateway
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_storage_gateway
public_title: Datadog-Amazon Storage Gateway インテグレーション
short_description: AWS Storage Gateway のキーメトリクスを追跡。
version: '1.0'
---
## 概要

AWS Storage Gateway は、オーガニゼーションの IT 環境と AWS のストレージインフラストラクチャーとの間にシームレスで安全なインテグレーションを提供します。

このインテグレーションを有効にすると、Datadog にすべての Storage Gateway メトリクスを表示できます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションタイル][2]のメトリクス収集で、`StorageGateway` をオンにします。
2. [Datadog - AWS Storage Gateway インテグレーション][3]をインストールします。

### ログの収集

#### ログの有効化

Amazon Storage Gateway から S3 バケットまたは CloudWatch のいずれかにログを送信するよう構成します。

**注**: S3 バケットにログを送る場合は、_Target prefix_ が `amazon_storage_gateway` に設定されているかを確認してください。

#### ログを Datadog に送信する方法

1. [Datadog ログコレクション AWS Lambda 関数][4] をまだ設定していない場合は、設定を行ってください。
2. lambda 関数がインストールされたら、AWS コンソールから、Amazon Storage Gateway ログを含む S3 バケットまたは CloudWatch のロググループに手動でトリガーを追加します。

    - [S3 バケットに手動トリガーを追加][5]
    - [CloudWatch ロググループに手動トリガーを追加][6]

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_storage_gateway" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティグループなど、AWS コンソールに表示されるタグと同じタグが割り当てられます。

### イベント

AWS Storage Gateway インテグレーションには、イベントは含まれません。

### サービスのチェック

AWS Storage Gateway インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon_storage_gateway
[4]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
[5]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_storage_gateway/amazon_storage_gateway_metadata.csv
[8]: https://docs.datadoghq.com/ja/help/