---
aliases:
- /ja/integrations/awsdynamo/
app_id: amazon-dynamodb
app_uuid: dc7abf1f-b346-49bb-a02d-83a4bda1d493
assets:
  dashboards:
    amazon-dynamodb: assets/dashboards/amazon_dynamodb_overview.json
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check:
      - aws.dynamodb.table_size
      metadata_path: assets/metrics/metric-spec.yaml
      prefix: aws.dynamodb
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 96
    source_type_name: Amazon DynamoDB
  monitors:
    DynamoDB Throttled Requests is High: assets/monitors/rec_mon_throttles.json
    Read Consumed Capacity is High: assets/monitors/rec_mon_read_cap_high.json
    Write Consumed Capacity is High: assets/monitors/rec_mon_write_cap_high.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- aws
- metrics
- cloud
custom_kind: インテグレーション
dependencies: []
description: テーブルサイズ、読み取り/書き込み容量、リクエストレイテンシーなどの追跡。
display_on_public_website: true
doc_link: https://docs.datadoghq.com/integrations/amazon_dynamodb/
draft: false
git_integration_title: amazon_dynamodb
has_logo: true
integration_id: amazon-dynamodb
integration_title: Amazon DynamoDB
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_dynamodb
public_title: Amazon DynamoDB
short_description: Amazon DynamoDB は高速で柔軟な NoSQL データベース サービスです
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Metrics
  - Category::クラウド
  - Offering::Integration
  configuration: README.md#Setup
  description: Amazon DynamoDB は高速で柔軟な NoSQL データベースサービスです
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Amazon DynamoDB
version: '1.0'
---

<!-- SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
![DynamoDB デフォルト ダッシュボード][1]

## 概要

Amazon DynamoDB は、AWS ポートフォリオに含まれる、フルマネージド型 NoSQL データベースクラウドサービスです。スケーリングが高速かつ容易で、大量のデータを扱う場合でもレイテンシーを極めて短く抑える必要があるアプリケーションに対応することができます。ドキュメントストアモデルと key-value ストアモデルの両方をサポートし、データベースと分散ハッシュテーブルの特長を兼ね備えています。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][2]をまだセットアップしていない場合は、セットアップしてください。

### メトリクスの収集

1. [AWS インテグレーション ページ][3]で、`Metric Collection` タブで `DynamoDB` が有効になっていることを確認します。
2. Amazon DynamoDB のメトリクスを収集するために、次のアクセス許可を [Datadog IAM ポリシー][4]に追加します。

    - `dynamodb:ListTables`: 使用できる DynamoDB テーブルをリストするために使用されます。
    - `dynamodb:DescribeTable`: テーブルサイズとアイテムカウントに関するメトリクスを追加するために使用されます。
    - `dynamodb:ListTagsOfResource`: DynamoDB リソースのすべてのタグを収集します。

    詳細については、AWS ウェブ サイトの [DynamoDB ポリシー][5]を参照してください。

3. [Datadog - Amazon DynamoDB インテグレーション][6]をインストールします。

### ログ収集

#### ログの有効化

AWS CloudTrail で [Trail の作成][7]を行い、ログを書き込む S3 バケットを選択します。

#### ログを Datadog に送信する方法

1. AWS アカウントで [Datadog Forwarder Lambda 関数][8] をまだセットアップしていない場合は、セットアップします。
2. 設定したら、Datadog Forwarder Lambda 関数に移動します。Function Overview セクションで、**Add Trigger** をクリックします。
3. Trigger Configuration で **S3** トリガーを選択します。
4. Amazon DynamoDB のログが格納されている S3 バケットを選択します。
5. イベントの種類は `All object create events` のままにしておきます。
6. **Add** をクリックすると、Lambda にトリガーが追加されます。

[ログエクスプローラー][9]に移動して、ログを確認します。

AWS Services のログを収集する方法については、[Datadog Lambda 関数で AWS Services のログを送信する][10]を参照してください。

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_dynamodb" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティ グループなど、AWS コンソールに表示されるのと同じタグが割り当てられます。

### イベント

Amazon DynamoDB インテグレーションには、イベントは含まれません。

### サービスチェック

Amazon DynamoDB インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][12]までお問合せください。

[1]: images/dynamodb.png
[2]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#installation
[5]: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/authentication-and-access-control.html
[6]: https://app.datadoghq.com/integrations/amazon-dynamodb
[7]: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-create-and-update-a-trail.html
[8]: https://docs.datadoghq.com/ja/logs/guide/forwarder/
[9]: https://app.datadoghq.com/logs
[10]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[11]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_dynamodb/assets/metrics/metric-spec.yaml
[12]: https://docs.datadoghq.com/ja/help/