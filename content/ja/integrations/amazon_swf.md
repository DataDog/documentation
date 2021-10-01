---
aliases:
  - /ja/integrations/awsswf/
categories:
  - cloud
  - configuration & deployment
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: Amazon Simple Workflow Service のキーメトリクスを追跡。
doc_link: 'https://docs.datadoghq.com/integrations/amazon_swf/'
draft: false
git_integration_title: amazon_swf
has_logo: true
integration_id: amazon-swf
integration_title: Amazon Simple Workflow Service
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_swf
public_title: Datadog-Amazon Simple Workflow Service インテグレーション
short_description: Amazon Simple Workflow Service のキーメトリクスを追跡。
version: '1.0'
---
## 概要

Amazon SWF は、並列ステップまたは順次ステップからなるバックグラウンドジョブを構築、実行、スケーリングする開発者を支援します。

このインテグレーションを有効にすると、Datadog にすべての SWF メトリクスを表示できます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションタイル][2]のメトリクス収集で、`SWF` をオンにします。
2. [Datadog - AWS SWF インテグレーション][3]をインストールします。

### ログの収集

#### ログの有効化

Amazon SWF から S3 バケットまたは CloudWatch のいずれかにログを送信するよう構成します。

**注**: S3 バケットにログを送る場合は、_Target prefix_ が `amazon_swf` に設定されているかを確認してください。

#### ログを Datadog に送信する方法

1. [Datadog ログコレクション AWS Lambda 関数][4] をまだ設定していない場合は、設定を行ってください。
2. lambda 関数がインストールされたら、AWS コンソールから、Amazon SWF ログを含む S3 バケットまたは CloudWatch のロググループに手動でトリガーを追加します。

    - [S3 バケットに手動トリガーを追加][5]
    - [CloudWatch ロググループに手動トリガーを追加][6]

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_swf" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティグループなど、AWS コンソールに表示されるタグと同じタグが割り当てられます。

### イベント

AWS SWF インテグレーションには、イベントは含まれません。

### サービスのチェック

AWS SWF インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon_swf
[4]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
[5]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_swf/amazon_swf_metadata.csv
[8]: https://docs.datadoghq.com/ja/help/