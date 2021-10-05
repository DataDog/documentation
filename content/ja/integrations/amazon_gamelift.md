---
categories:
  - cloud
  - aws
  - ログの収集
ddtype: crawler
dependencies: []
description: Amazon Gamelift のキーメトリクスを追跡
doc_link: https://docs.datadoghq.com/integrations/amazon_gamelift/
draft: false
git_integration_title: amazon_gamelift
has_logo: true
integration_id: amazon-gamelift
integration_title: Amazon Gamelift
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_gamelift
public_title: Datadog-Amazon Gamelift インテグレーション
short_description: Amazon Gamelift のキーメトリクスを追跡
version: '1.0'
---
## 概要

Amazon GameLift は、セッションベースのマルチプレーヤーゲームサーバーをクラウドでデプロイ、運用、およびスケーリングするためのフルマネージド型サービスです。

このインテグレーションを有効にすると、Datadog にすべての Gamelift メトリクスを表示できます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションタイル][2]のメトリクス収集で、`Gamelift` をオンにします。
2. [Datadog - Amazon Gamelift インテグレーション][3]をインストールします。

### ログの収集

#### ログの有効化

Amazon GameLift から S3 バケットまたは CloudWatch のいずれかにログを送信するよう構成します。

**注**: S3 バケットにログを送る場合は、_Target prefix_ が `amazon_gamelift` に設定されているかを確認してください。

#### ログを Datadog に送信する方法

1. [Datadog ログコレクション AWS Lambda 関数][4] をまだ設定していない場合は、設定を行ってください。
2. Lambda 関数がインストールされたら、AWS コンソールから、Amazon GameLift ログを含む S3 バケットまたは CloudWatch のロググループに手動でトリガーを追加します。

    - [S3 バケットに手動トリガーを追加][5]
    - [CloudWatch ロググループに手動トリガーを追加][6]

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_gamelift" >}}


### イベント

Amazon Gamelift インテグレーションには、イベントは含まれません。

### サービスのチェック

Amazon Gamelift インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-gamelift
[4]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
[5]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_gamelift/amazon_gamelift_metadata.csv
[8]: https://docs.datadoghq.com/ja/help/