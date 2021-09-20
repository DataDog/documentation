---
aliases:
  - /ja/integrations/awsemr/
categories:
  - cloud
  - processing
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: Amazon Elastic Map Reduce のキーメトリクスを追跡。
doc_link: https://docs.datadoghq.com/integrations/amazon_emr/
draft: false
git_integration_title: amazon_emr
has_logo: true
integration_id: amazon-emr
integration_title: Amazon Elastic Map Reduce
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_emr
public_title: Datadog-Amazon Elastic Map Reduce インテグレーション
short_description: Amazon Elastic Map Reduce のキーメトリクスを追跡。
version: '1.0'
---
## 概要

Amazon Elastic MapReduce (Amazon EMR) は、膨大な量のデータを迅速かつコスト効率よく簡単に処理できる Web サービスです。

このインテグレーションを有効にすると、EMR メトリクスを Datadog に表示できます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションタイル][2]のメトリクス収集で、`EMR` をオンにします。
2. Amazon EMR のメトリクスを収集するには、次のアクセス許可を [Datadog IAM ポリシー][3]に追加します。EMR ポリシーの詳細については、[AWS Web サイトのガイド][4]を参照してください。

    | AWS アクセス許可                     | 説明                         |
    | ---------------------------------- | ----------------------------------- |
    | `elasticmapreduce:ListClusters`    | 使用できるクラスターを一覧表示します。          |
    | `elasticmapreduce:DescribeCluster` | CloudWatch EMR メトリクスにタグを追加します。|

3. [Datadog - AWS EMR インテグレーション][5]をインストールします。

### ログの収集

#### ログの有効化

Amazon EMR から S3 バケットまたは CloudWatch のいずれかにログを送信するよう構成します。

**注**: S3 バケットにログを送る場合は、_Target prefix_ が `amazon_emr` に設定されているかを確認してください。

#### ログを Datadog に送信する方法

1. [Datadog ログ コレクション AWS Lambda 関数][6]をまだ実行していない場合は、セットアップします。
2. Lambda 関数がインストールされたら、AWS コンソールから、Amazon EMR ログを含む S3 バケットまたは CloudWatch のロググループに手動でトリガーを追加します。

    - [S3 バケットに手動トリガーを追加][7]
    - [CloudWatch ロググループに手動トリガーを追加][8]

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_emr" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティ グループなど、AWS コンソールに表示されるのと同じタグが割り当てられます。

### イベント

AWS Elastic MapReduce インテグレーションには、イベントは含まれません。

### サービスのチェック

AWS Elastic MapReduce インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_elasticmapreduce.html
[5]: https://app.datadoghq.com/account/settings#integrations/amazon_emr
[6]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
[7]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[8]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[9]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_emr/amazon_emr_metadata.csv
[10]: https://docs.datadoghq.com/ja/help/