---
aliases:
- /ja/integrations/awsdynamo/
categories:
- cloud
- data stores
- aws
- log collection
dependencies: []
description: テーブルサイズ、読み取り/書き込み容量、リクエストレイテンシーなどの追跡。
doc_link: https://docs.datadoghq.com/integrations/amazon_dynamodb/
draft: false
git_integration_title: amazon_dynamodb
has_logo: true
integration_id: ''
integration_title: Amazon DynamoDB
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_dynamodb
public_title: Datadog-Amazon DynamoDB インテグレーション
short_description: テーブルサイズ、読み取り/書き込み容量、リクエストレイテンシーなどの追跡。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< img src="integrations/amazon_dynamodb/dynamodb.png" alt="DynamoDB のデフォルトダッシュボード" popup="true">}}

## 概要

Amazon DynamoDB は、AWS ポートフォリオに含まれる、フルマネージド型 NoSQL データベースクラウドサービスです。スケーリングが高速かつ容易で、大量のデータを扱う場合でもレイテンシーを極めて短く抑える必要があるアプリケーションに対応することができます。ドキュメントストアモデルと key-value ストアモデルの両方をサポートし、データベースと分散ハッシュテーブルの特長を兼ね備えています。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][2]で、`Metric Collection` タブの下にある `DynamoDB` が有効になっていることを確認します。
2. Amazon DynamoDB のメトリクスを収集するために、次のアクセス許可を [Datadog IAM ポリシー][3]に追加します。

    - `dynamodb:ListTables`: 使用できる DynamoDB テーブルをリストするために使用されます。
    - `dynamodb:DescribeTable`: テーブルサイズとアイテムカウントに関するメトリクスを追加するために使用されます。
    - `dynamodb:ListTagsOfResource`: DynamoDB リソースのすべてのタグを収集します。

    詳細については、AWS ウェブサイト上の [DynamoDB ポリシー][4]を参照してください。

3. [Datadog - Amazon DynamoDB インテグレーション][5]をインストールします。

### ログの収集

#### ログの有効化

AWS CloudTrail で [Trail の作成][6]を行い、ログを書き込む S3 バケットを選択します。

#### ログを Datadog に送信する方法

1. AWS アカウントで [Datadog Forwarder Lambda 関数][7] をまだセットアップしていない場合は、セットアップします。
2. 設定したら、Datadog Forwarder Lambda 関数に移動します。Function Overview セクションで、**Add Trigger** をクリックします。
3. Trigger Configuration で **S3** トリガーを選択します。
4. Amazon DynamoDB のログが格納されている S3 バケットを選択します。
5. イベントの種類は `All object create events` のままにしておきます。
6. **Add** をクリックすると、Lambda にトリガーが追加されます。

[ログエクスプローラー][8]に移動して、ログを確認します。

AWS Services のログを収集する方法については、[Datadog Lambda 関数で AWS Services のログを送信する][9]を参照してください。

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_dynamodb" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティ グループなど、AWS コンソールに表示されるのと同じタグが割り当てられます。

### イベント

Amazon DynamoDB インテグレーションには、イベントは含まれません。

### サービスのチェック

Amazon DynamoDB インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/authentication-and-access-control.html
[5]: https://app.datadoghq.com/integrations/amazon-dynamodb
[6]: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-create-and-update-a-trail.html
[7]: https://docs.datadoghq.com/ja/logs/guide/forwarder/
[8]: https://app.datadoghq.com/logs
[9]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[10]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_dynamodb/amazon_dynamodb_metadata.csv
[11]: https://docs.datadoghq.com/ja/help/