---
aliases:
  - /ja/integrations/awsdynamo/
categories:
  - cloud
  - data store
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: テーブルサイズ、読み取り/書き込み容量、リクエストレイテンシーなどの追跡。
doc_link: https://docs.datadoghq.com/integrations/amazon_dynamodb/
draft: false
git_integration_title: amazon_dynamodb
has_logo: true
integration_id: amazon-dynamodb
integration_title: Amazon DynamoDB
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_dynamodb
public_title: Datadog-Amazon DynamoDB インテグレーション
short_description: テーブルサイズ、読み取り/書き込み容量、リクエストレイテンシーなどの追跡。
version: '1.0'
---
{{< img src="integrations/amazon_dynamodb/dynamodb.png" alt="DynamoDB デフォルトダッシュボード" popup="true">}}

## 概要

Amazon DynamoDB は、AWS ポートフォリオに含まれる、フルマネージド型 NoSQL データベースクラウドサービスです。スケーリングが高速かつ容易で、大量のデータを扱う場合でもレイテンシーを極めて短く抑える必要があるアプリケーションに対応することができます。ドキュメントストアモデルと key-value ストアモデルの両方をサポートし、データベースと分散ハッシュテーブルの特長を兼ね備えています。

DynamoDB のパフォーマンスメトリクスを監視する方法については、[こちらの記事をご参照ください][1]。キーパフォーマンスメトリクス、その収集方法、Datadog を使用して [Medium][2] が DynamoDB を監視する方法について詳しく説明されています。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][3]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションタイル][4]のメトリクス収集で、`DynamoDB` をオンにします。
2. Amazon DynamoDB のメトリクスを収集するために、次のアクセス許可を [Datadog IAM ポリシー][5]に追加します。

    - `dynamodb:ListTables`: 使用できる DynamoDB テーブルをリストするために使用されます。
    - `dynamodb:DescribeTable`: テーブルサイズとアイテムカウントに関するメトリクスを追加するために使用されます。
    - `dynamodb:ListTagsOfResource`: DynamoDB リソースのすべてのタグを収集します。

    DynamoDB ポリシーの詳細については、[AWS Web サイトのガイド][6]を参照してください。

3. [Datadog - AWS DynamoDB インテグレーション][7]をインストールします。

### ログの収集

#### ログの有効化

証跡を定義する場合は、ログの書き込み先になる S3 バケットを選択します。

{{< img src="integrations/amazon_cloudtrail/cloudtrail_logging.png" alt="CloudTrail ロギング" popup="true" style="width:70%;">}}

#### ログを Datadog に送信する方法

1. [Datadog ログコレクション AWS Lambda 関数][8]をまだセットアップしていない場合は、セットアップします。
2. Lambda 関数がインストールされたら、AWS コンソールで DynamoDB ログを含む S3 バケットに手動でトリガーを追加します。Lambda で、トリガーリストから S3 をクリックします。
   {{< img src="integrations/amazon_s3/s3_trigger_configuration.png" alt="S3 トリガーコンフィギュレーション" popup="true" style="width:70%;">}}
   DynamoDB ログを含む S3 バケットを選択してトリガーを構成し、イベントタイプを `Object Created (All)` に変更して、Add ボタンをクリックします。
   {{< img src="integrations/amazon_s3/s3_lambda_trigger_configuration.png" alt="S3 Lambda トリガーコンフィギュレーション" popup="true" style="width:70%;">}}

完了したら、[Datadog Log セクション][9]に移動し、ログを確認します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_dynamodb" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティグループなど、AWS コンソールに表示されるタグと同じタグが割り当てられます。

### イベント

AWS DynamoDB インテグレーションには、イベントは含まれません。

### サービスのチェック

AWS DynamoDB インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。

[1]: https://www.datadoghq.com/blog/top-dynamodb-performance-metrics
[2]: https://medium.com
[3]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[4]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[5]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#installation
[6]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_dynamodb.html
[7]: https://app.datadoghq.com/account/settings#integrations/amazon_dynamodb
[8]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#create-a-new-lambda-function
[9]: https://app.datadoghq.com/logs
[10]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_dynamodb/amazon_dynamodb_metadata.csv
[11]: https://docs.datadoghq.com/ja/help/