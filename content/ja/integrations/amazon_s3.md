---
app_id: amazon-s3
app_uuid: e7f3a9d8-7ddc-4ed4-b70c-9c95ef5f8581
assets:
  dashboards:
    aws_s3: assets/dashboards/amazon_s3_overview.json
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check:
      - aws.s3.bucket_size_bytes
      metadata_path: metadata.csv
      prefix: aws.s3
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 157
    source_type_name: Amazon S3
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- aws
- metrics
- cloud
- data stores
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: amazon_s3
integration_id: amazon-s3
integration_title: Amazon S3
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_s3
public_title: Amazon S3
short_description: Amazon S3 は、可用性と拡張性に優れたクラウドストレージサービスです。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Metrics
  - Category::クラウド
  - Category::Data Stores
  - Offering::Integration
  configuration: README.md#Setup
  description: Amazon S3 は、可用性と拡張性に優れたクラウドストレージサービスです。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Amazon S3
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Amazon S3 は、可用性と拡張性に優れたクラウドストレージサービスです。

このインテグレーションを有効にすると、Datadog にすべての S3 メトリクスを表示できます。

注: このインテグレーションでは、's3:GetBucketTagging' の権限が完全に有効になっている必要があります。

注: S3 リクエストメトリクスはバケット自体で有効にする必要があります。[AWS ドキュメント][1]を参照してください。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][2]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][3]で、`Metric Collection` タブの下にある `S3` が有効になっていることを確認します。
2. [Datadog - Amazon S3 インテグレーション][4]をインストールします。

### ログ収集

#### S3 アクセスログの有効化

1. S3 バケットに移動します。
2. **Properties** をクリックします。
3. Services Access Logging セクションに移動し、**Edit** をクリックします。
4. **Enable** を選択します。
5. ログの送信先となる S3 バケットを選択します。

 詳しくは、[Amazon S3 サーバーのアクセスロギングを有効にする][5]を参照してください。

#### ログを Datadog に送信する方法

1. AWS アカウントで [Datadog Forwarder Lambda 関数][6]をまだセットアップしていない場合は、セットアップします。
2. Lambda 関数がインストールされたら、S3 アクセスログを収集する方法を以下の 2 つから選択します。

    - 自動: Datadog に権限を設定してアクセスを許可した場合、S3 のログは自動的に管理されます。Datadog Forwarder Lambda 関数での自動ログ収集の構成については、[トリガーを自動的にセットアップする][7]を参照してください。
    - 手動: AWS コンソールで、S3 のアクセスログが格納されている S3 バケットにトリガーを追加します。[手動インストール手順](#manual-installation-steps)を参照してください。

#### 手動インストールの手順

1. AWS アカウントで [Datadog Forwarder Lambda 関数][6]をまだセットアップしていない場合は、セットアップします。
2. 設定したら、Datadog Forwarder Lambda 関数に移動します。Function Overview セクションで、**Add Trigger** をクリックします。
3. Trigger Configuration で **S3** トリガーを選択します。
4. S3 のログが格納されている S3 バケットを選択します。
5. イベントの種類は `All object create events` のままにしておきます。
6. **Add** をクリックすると、Lambda にトリガーが追加されます。

[ログエクスプローラー][8]に移動して、ログを確認します。

AWS Services のログを収集する方法については、[Datadog Lambda 関数で AWS Services のログを送信する][9]を参照してください。

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon-s3" >}}


### イベント

Amazon S3 インテグレーションには、イベントは含まれません。

### サービスチェック

Amazon S3 インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。

[1]: https://docs.aws.amazon.com/AmazonS3/latest/dev/cloudwatch-monitoring.html
[2]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://app.datadoghq.com/integrations/amazon-s3
[5]: https://docs.aws.amazon.com/AmazonS3/latest/user-guide/server-access-logging.html
[6]: https://docs.datadoghq.com/ja/logs/guide/forwarder/
[7]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#automatically-set-up-triggers
[8]: https://app.datadoghq.com/logs
[9]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[10]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_s3/metadata.csv
[11]: https://docs.datadoghq.com/ja/help/