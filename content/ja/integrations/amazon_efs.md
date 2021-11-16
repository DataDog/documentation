---
aliases:
  - /ja/integrations/awsefs/
categories:
  - cloud
  - os & system
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: Amazon Elastic Filesystem のキーメトリクスを追跡します。
doc_link: 'https://docs.datadoghq.com/integrations/amazon_efs/'
draft: false
git_integration_title: amazon_efs
has_logo: true
integration_id: amazon-efs
integration_title: Amazon Elastic File System
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_efs
public_title: Datadog-Amazon Elastic File System インテグレーション
short_description: Amazon Elastic Filesystem のキーメトリクスを追跡。
version: '1.0'
---
## 概要

Amazon EFS は、AWS Lambda 関数または Amazon EC2 インスタンスと共に使用されるシンプルでスケーラブルなファイルストレージです。

Datadog アプリのすべての EFS メトリクスを収集するには、このインテグレーションを有効にします。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションタイル][2]のメトリクス収集で、`EFS` をオンにします。
2. Amazon EFS のメトリクスを収集するために、次のアクセス許可を [Datadog IAM ポリシー][3]に追加します。

    - `elasticfilesystem:DescribeTags`: ファイルシステムに適用されたカスタムタグを取得します。
    - `elasticfilesystem:DescribeFileSystems`: アクティブなファイルシステムをリストします。

    EFS ポリシーの詳細については、[AWS Web サイトのガイド][4]を参照してください。

3. [Datadog - AWS EFS インテグレーション][5]をインストールします。

### ログの収集

#### ログの有効化

Amazon EFS から S3 バケットまたは CloudWatch のいずれかにログを送信するよう構成します。

**注**: S3 バケットにログを送る場合は、_Target prefix_ が `amazon_efs` に設定されているかを確認してください。

#### ログを Datadog に送信する方法

1. [Datadog ログ コレクション AWS Lambda 関数][6]をまだ実行していない場合は、セットアップします。
2. Lambda 関数がインストールされたら、AWS コンソールから、Amazon EFS ログを含む S3 バケットまたは CloudWatch のロググループに手動でトリガーを追加します。

    - [S3 バケットに手動トリガーを追加][7]
    - [CloudWatch ロググループに手動トリガーを追加][8]

### Amazon EFS for Lambda

[Amazon EFS for Lambda][9] により、EFS を Lambda 関数に接続できます。組織は Lambda の EFS を使用し、機械学習およびデータ処理のワークロードを簡素化し、完全なサーバーレスを実現できます。Lambda メトリクスとログを EFS で分けるには、以下の手順に従います。

1. [AWS Lambda インテグレーション][10]をインストールしてメトリクスの収集を有効にします。
2. このアクセス許可を既存の [Datadog IAM ポリシー][3]に追加します。

    - `elasticfilesystem:DescribeAccessPoints`: Lambda 関数に接続された有効な EFS を一覧表示します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_efs" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティグループなど、AWS コンソールに表示されるタグと同じタグが割り当てられます。

### イベント

AWS Elastic File System インテグレーションには、イベントは含まれません。

### サービスのチェック

AWS Elastic File System インテグレーションには、サービスのチェックは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][12]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_elasticfilesystem.html
[5]: https://app.datadoghq.com/account/settings#integrations/amazon_efs
[6]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
[7]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[8]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[9]: /ja/integrations/amazon_lambda/#amazon-efs-for-lambda
[10]: https://docs.datadoghq.com/ja/integrations/amazon_lambda/#aws-lambda-metrics
[11]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_efs/amazon_efs_metadata.csv
[12]: https://docs.datadoghq.com/ja/help/