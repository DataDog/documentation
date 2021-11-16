---
aliases:
  - /ja/integrations/awscloudsearch/
categories:
  - cloud
  - processing
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: インデックスの使用率、正常に完了したリクエストの数などを追跡。
doc_link: 'https://docs.datadoghq.com/integrations/awscloudsearch/'
draft: false
git_integration_title: amazon_cloudsearch
has_logo: true
integration_id: amazon-cloudsearch
integration_title: Amazon CloudSearch
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_cloudsearch
public_title: Datadog-Amazon CloudSearch インテグレーション
short_description: インデックスの使用率、正常に完了したリクエストの数などを追跡。
version: '1.0'
---
## 概要

Amazon CloudSearch は、AWS クラウドにおけるマネージド型サービスであり、検索ソリューションを容易かつコスト効率よくセットアップ、管理、スケーリングできます。

このインテグレーションを有効にすると、Datadog にすべての CloudSearch メトリクスを表示できます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションタイル][2]のメトリクス収集で、`CloudSearch` をオンにします。
2. [Datadog - AWS CloudSearch インテグレーション][3]をインストールします。

### ログの収集

#### ログの有効化

Amazon CloudSearch から S3 バケットまたは CloudWatch のいずれかにログを送信するよう構成します。

**注**: S3 バケットにログを送る場合は、_Target prefix_ が `amazon_cloudsearch` に設定されているかを確認してください。

#### ログを Datadog に送信する方法

1. [Datadog ログコレクション AWS Lambda 関数][4] をまだ設定していない場合は、設定を行ってください。
2. Lambda 関数がインストールされたら、AWS コンソールから、Amazon CloudSearch ログを含む S3 バケットまたは CloudWatch のロググループに手動でトリガーを追加します。

    - [S3 バケットに手動トリガーを追加][5]
    - [CloudWatch ロググループに手動トリガーを追加][6]

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_cloudsearch" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティグループなど、AWS コンソールに表示されるタグと同じタグが割り当てられます。

### イベント

AWS Cloudsearch インテグレーションには、イベントは含まれません。

### サービスのチェック

AWS Cloudsearch インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon_cloudsearch
[4]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
[5]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_cloudsearch/amazon_cloudsearch_metadata.csv
[8]: https://docs.datadoghq.com/ja/help/