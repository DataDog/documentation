---
app_id: amazon-config
app_uuid: 43ee05ac-8a93-4328-92e7-3bfe76d7839e
assets:
  integration:
    auto_install: false
    events:
      creates_events: true
    metrics:
      check:
      - aws.config.configuration_recorder_insufficient_permissions_failure
      metadata_path: assets/metrics/metric-spec.yaml
      prefix: aws.config.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 376
    source_type_name: Amazon Config
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- AWS
- モニター
- クラウド
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: amazon_config
integration_id: amazon-config
integration_title: AWS Config
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_config
public_title: AWS Config
short_description: AWS Config では、AWS リソースの構成を監査および評価することができます。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Metrics
  - Category::Cloud
  - Offering::Integration
  configuration: README.md#Setup
  description: AWS Config では、AWS リソースの構成を監査および評価することができます。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: AWS Config
---

<!-- SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

[AWS Config][1] は、ご使用の AWS アカウント内の AWS リソースの構成を詳細に可視化します。
これには、リソース同士の関係や過去の構成内容が含まれるため、
時間の経過に伴う構成とリレーションシップの変化を確認できます。

このインテグレーションを有効化すると、Datadog で AWS Config のすべてのメトリクスを確認できます。AWS Config によって検出された構成変更は、[Events](#events) を使用して監視します。

## セットアップ

### インストール

まだ設定していない場合は、まず [Amazon Web Services インテグレーション][2] をセットアップしてください。

### リソース変更の収集

{{< callout url="https://www.datadoghq.com/product-preview/recent-changes-tab/" header="プレビューに参加しよう!" >}}
  <strong>リソース変更の収集</strong> はプレビューですが、簡単にアクセスをリクエストできます。今すぐこのフォームから申請してください。
{{< /callout >}}

AWS Config が構成スナップショットや履歴の変更を検出すると、Datadog でイベントを受信できます。以下の [CloudFormation][3] スタックで必要なリソースを作成・構成するか、[Amazon Data Firehose][4] を手動で設定して AWS Config イベントを転送してください。

{{< tabs >}}
{{% tab "Terraform" %}}

Datadog と AWS Config データの共有を開始するには、[config-changes-datadog Terraform module][1] を使用できます。導入用のサンプルや、指定可能な各パラメーターの詳細な説明については、[terraform-aws-config-changes-datadog repo][2] を参照してください。

[1]: https://registry.terraform.io/modules/DataDog/config-changes-datadog/aws/latest
[2]: https://github.com/DataDog/terraform-aws-config-changes-datadog?tab=readme-ov-file#aws-config-change-streaming-module
{{% /tab %}}
{{% tab "CloudFormation" %}}

[![Launch Stack][1]](https://console.aws.amazon.com/cloudformation/home#/stacks/create/review?stackName=datadog-aws-config-stream&templateURL=https://datadog-cloudformation-template.s3.amazonaws.com/aws/main_config_stream.yaml)

**注**: Datadog アカウントが **US1** の [Datadog サイト][2] 以外にある場合は、使用している Datadog サイトに対応する `DatadogSite` の値を選択してください。

| Datadog サイト | **DatadogSite** の値 |
| -------------  | --------------------- |
| EU             | datadoghq.eu          |
| US3            | us3.datadoghq.com     |
| US5            | us5.datadoghq.com     |
| AP1            | ap1.datadoghq.com     |

[1]: https://s3.amazonaws.com/cloudformation-examples/cloudformation-launch-stack.png
[2]: https://docs.datadoghq.com/ja/getting_started/site/
{{% /tab %}}
{{% tab "Manual" %}}

Amazon Data Firehose を介して AWS Config のイベントを手動で転送するには、次の手順に従って設定します。

#### 前提条件

1. Datadog と統合済みの AWS アカウント。
   - Datadog インテグレーションの IAM ロールは、Config データが入っているバケットに対して `s3:GetObject` 権限を持っている必要があります。
2. AWS Config イベントを受信するための [SNS トピック][1] が設定されていること。
3. 256 kB を超えるイベントをバックアップとして受け取るための [S3 バケット][2] が設定されていること。
4. [Access key][3] が設定されていること。Datadog API key を用意してください。

#### Amazon Data Firehose ストリームを作成する

1. AWS Console で **Create Firehose stream** をクリックします。
   - **Source** には `Direct PUT` を選択します。
   - **Destination** には `Datadog` を選択します。
2. **Destination settings** セクションで、使用中の [Datadog サイト][4] に対応する **HTTP endpoint URL** を選択します:

| Datadog サイト   | Destination URL                                                                                        |
| -------------- | ------------------------------------------------------------------------------------------------------ |
| US1            | `https://cloudplatform-intake.datadoghq.com/api/v2/cloudchanges?dd-protocol=aws-kinesis-firehose`      |
| US3            | `https://cloudplatform-intake.us3.datadoghq.com/api/v2/cloudchanges?dd-protocol=aws-kinesis-firehose`  |
| US5            | `https://cloudplatform-intake.us5.datadoghq.com/api/v2/cloudchanges?dd-protocol=aws-kinesis-firehose`  |
| EU             | `https://cloudplatform-intake.datadoghq.eu/api/v2/cloudchanges?dd-protocol=aws-kinesis-firehose`       |
| AP1            | `https://cloudplatform-intake.ap1.datadoghq.com/api/v2/cloudchanges?dd-protocol=aws-kinesis-firehose`  |

3. **Authentication** には [Datadog API key][5] の値を入力するか、その値を含む AWS Secrets Manager secret を選択します。
4. **Content encoding** には `GZIP` を入力します。
5. **Retry duration** には `300` を入力します。
6. **Add parameter** をクリックします。
   - **Key** には `dd-s3-bucket-auth-account-id` を入力します。
   - **Value** には 12 桁の AWS アカウント ID を入力します。
6. **Buffer hints** で **Buffer size** を `4 MiB` に設定します。
7. **Backup settings** で S3 バックアップ バケットを選択します。
8. **Create Firehose stream** をクリックします。

#### AWS Config の配信方法を構成する

1. [AWS Config ページ][6] で、左側のパネルを開き **Settings** をクリックします。
2. **Edit** をクリックします。
3. **Delivery method** セクションで、256 kB を超えるイベントをバックアップとして受け取るための S3 バケットを選択または作成します。
4. **Amazon SNS topic** のチェックボックスをオンにし、AWS Config イベントを受け取るための SNS トピックを選択または作成します。
5. **Save** をクリックします。

#### Amazon Data Firehose ストリームを SNS トピックにサブスクライブさせる

1. [SNS Developer Guide][7] の手順に従います。**Subscription role** に次の権限があることを確認します:
   - `firehose:DescribeDeliveryStream`
   - `firehose:ListDeliveryStreams`
   - `firehose:ListTagsForDeliveryStream`
   - `firehose:PutRecord`
   - `firehose:PutRecordBatch`
2. Firehose の **Monitoring** タブで Datadog へのデータ フローを確認します。

[1]: https://docs.aws.amazon.com/sns/latest/dg/sns-create-topic.html
[2]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/create-bucket-overview.html
[3]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html
[4]: https://docs.datadoghq.com/ja/getting_started/site/
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://console.aws.amazon.com/config/home
[7]: https://docs.aws.amazon.com/sns/latest/dg/firehose-endpoints-subscribe.html
{{% /tab %}}
{{< /tabs >}}

### メトリクス収集

1. [AWS インテグレーション ページ][5] で、`Metric Collection` タブの `Config` が有効になっていることを確認します。
2. [Datadog - AWS Config integration][6] をインストールします。

## 収集されるデータ

### メトリクス
{{< get-metrics-from-git "amazon_config" >}}


<!-- ### イベント

AWS Config インテグレーションは、[AWS リソース変更](#resource-change-collection) に関連するイベントを収集します。 -->

#### 検証

[Resource Catalog][7] のリソースのサイド パネルにある **Recent Changes** タブで、構成変更を確認します。また、[Event Management page][8] に移動して `source:amazon_config` をクエリし、Datadog アカウントにデータが取り込まれていることを検証できます。

### サービスチェック

AWS Config インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:
- [Resource Catalog の Recent Changes でインフラストラクチャーの変更をより迅速にトラブルシューティングする][10]


[1]: https://docs.aws.amazon.com/config/latest/developerguide/WhatIsConfig.html
[2]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[3]: https://docs.aws.amazon.com/cloudformation/
[4]: https://aws.amazon.com/firehose/
[5]: https://app.datadoghq.com/integrations/amazon-web-services
[6]: https://app.datadoghq.com/integrations/amazon-config
[7]: https://docs.datadoghq.com/ja/infrastructure/resource_catalog/
[8]: https://app.datadoghq.com/event/overview
[9]: https://docs.datadoghq.com/ja/help/
[10]: https://www.datadoghq.com/blog/recent-changes-tab/