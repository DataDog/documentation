---
aliases:
- /ja/integrations/amazon_config
app_id: amazon-config
categories:
- aws
- metrics
- cloud
custom_kind: integration
description: AWS Config を使うと、AWS リソースの構成を監査して評価できます。
integration_version: 1.0.0
media: []
title: AWS Config
---
## 概要

[AWS Config](https://docs.aws.amazon.com/config/latest/developerguide/WhatIsConfig.html) は、AWS アカウント内の AWS リソース構成を詳細に可視化します。
これには、リソース同士の関連性や過去にどのように設定されていたかも含まれるため、
構成や関連性が時間の経過とともにどう変化したかを確認できます。

このインテグレーションを有効にすると、AWS Config のすべてのメトリクスを Datadog で確認できます。[イベント](#events) を使うと、AWS Config が検知した構成変更を監視できます。

## セットアップ

### インストール

まだ設定していない場合は、先に [Amazon Web Services インテグレーション](https://docs.datadoghq.com/integrations/amazon_web_services/) を設定してください。

### リソース変更の収集

{{< callout url="https://www.datadoghq.com/product-preview/recent-changes-tab/" header="プレビューに参加!" >}}
<strong>リソース変更の収集</strong> は現在 Preview ですが、簡単にアクセスを申請できます。このフォームから今すぐ申し込めます。
{{< /callout >}}

AWS Config が構成スナップショットや履歴の変更を検知すると、Datadog でイベントを受け取れます。以下の [CloudFormation](https://docs.aws.amazon.com/cloudformation/) スタックで必要なリソースを作成・設定するか、[Amazon Data Firehose](https://aws.amazon.com/firehose/) を手動で設定して AWS Config イベントを転送してください。

{{< tabs >}}

{{% tab "Terraform" %}}

[config-changes-datadog Terraform module](https://registry.terraform.io/modules/DataDog/config-changes-datadog/aws/latest) を使うと、AWS Config データを Datadog と共有し始めることができます。導入例については [terraform-aws-config-changes-datadog repo](https://github.com/DataDog/terraform-aws-config-changes-datadog?tab=readme-ov-file#aws-config-change-streaming-module) を参照してください。指定できる各パラメーターの詳しい説明も掲載されています。

{{% /tab %}}

{{% tab "CloudFormation" %}}

[![Launch Stack](https://s3.amazonaws.com/cloudformation-examples/cloudformation-launch-stack.png)](https://console.aws.amazon.com/cloudformation/home#/stacks/create/review?stackName=datadog-aws-config-stream&templateURL=https://datadog-cloudformation-template.s3.amazonaws.com/aws/main_config_stream.yaml)

**注**: Datadog アカウントが US1 の [Datadog サイト](https://docs.datadoghq.com/getting_started/site/) にない場合は、利用中の Datadog サイトに対応する `DatadogSite` の値を選択してください:

| Datadog サイト   | **DatadogSite** の値 |
| -------------  | --------------------- |
| EU             | datadoghq.eu          |
| US3            | us3.datadoghq.com     |
| US5            | us5.datadoghq.com     |
| AP1            | ap1.datadoghq.com     |

{{% /tab %}}

{{% tab "Manual" %}}

以下の手順で、Amazon Data Firehose を使って AWS Config イベント転送を手動で設定します。

#### 前提条件

1. Datadog とインテグレーション済みの AWS アカウント
   - Datadog インテグレーション用 IAM ロールに、Config データが格納されているバケットに対する `s3:GetObject` 権限があること
1. AWS Config イベントを受信するための [SNS トピック](https://docs.aws.amazon.com/sns/latest/dg/sns-create-topic.html) を作成済みであること
1. 256 kB を超えるイベントのバックアップ受信用に、[S3 バケット](https://docs.aws.amazon.com/AmazonS3/latest/userguide/create-bucket-overview.html) を作成済みであること
1. [アクセス キー](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html) を作成済みであること。Datadog API キーも手元に用意してください。

#### Amazon Data Firehose stream を作成する

1. AWS Console で **Create Firehose stream** をクリックします。
   - **Source** には `Direct PUT` を選択します。
   - **Destination** には `Datadog` を選択します。
1. **Destination settings** セクションで、利用中の [Datadog サイト](https://docs.datadoghq.com/getting_started/site/) に対応する **HTTP endpoint URL** を選択します:

| Datadog サイト   | Destination URL                                                                                        |
| -------------- | ------------------------------------------------------------------------------------------------------ |
| US1            | `https://cloudplatform-intake.datadoghq.com/api/v2/cloudchanges?dd-protocol=aws-kinesis-firehose`      |
| US3            | `https://cloudplatform-intake.us3.datadoghq.com/api/v2/cloudchanges?dd-protocol=aws-kinesis-firehose`  |
| US5            | `https://cloudplatform-intake.us5.datadoghq.com/api/v2/cloudchanges?dd-protocol=aws-kinesis-firehose`  |
| EU             | `https://cloudplatform-intake.datadoghq.eu/api/v2/cloudchanges?dd-protocol=aws-kinesis-firehose`       |
| AP1            | `https://cloudplatform-intake.ap1.datadoghq.com/api/v2/cloudchanges?dd-protocol=aws-kinesis-firehose`  |

3. **Authentication** では、[Datadog API key](https://app.datadoghq.com/organization-settings/api-keys) の値を入力するか、その値を保存した AWS Secrets Manager のシークレットを選択します。
1. **Content encoding** には `GZIP` を入力します。
1. **Retry duration** には `300` を入力します。
1. **Add parameter** をクリックします。
   - **Key** には `dd-s3-bucket-auth-account-id` を入力します。
   - **Value** には 12 桁の AWS account ID を入力します。
1. **Buffer hints** で **Buffer size** を `4 MiB` に設定します。
1. **Backup settings** で、S3 バックアップ バケットを選択します。
1. **Create Firehose stream** をクリックします。

#### AWS Config の配信方法を設定する

1. [AWS Config page](https://console.aws.amazon.com/config/home) で左側のパネルを開き、**Settings** をクリックします。
1. **Edit** をクリックします。
1. **Delivery method** セクションで、256 kB を超えるイベントをバックアップとして受け取る S3 バケットを選択または作成します。
1. **Amazon SNS topic** のチェック ボックスをオンにし、AWS Config イベントを受信する SNS topic を選択または作成します。
1. **Save** をクリックします。

#### Amazon Data Firehose stream を SNS トピックにサブスクライブする

1. [SNS Developer Guide](https://docs.aws.amazon.com/sns/latest/dg/firehose-endpoints-subscribe.html) の手順に従って設定します。**Subscription role** には次の権限が必要です:
   - `firehose:DescribeDeliveryStream`
   - `firehose:ListDeliveryStreams`
   - `firehose:ListTagsForDeliveryStream`
   - `firehose:PutRecord`
   - `firehose:PutRecordBatch`
1. Firehose の **Monitoring** タブで、Datadog にデータが流れていることを確認します。

{{% /tab %}}

{{< /tabs >}}

### メトリクス収集

1. [AWS インテグレーション ページ](https://app.datadoghq.com/integrations/amazon-web-services) の `Metric Collection` タブで、`Config` が有効になっていることを確認します。
1. [Datadog - AWS Config インテグレーション](https://app.datadoghq.com/integrations/amazon-config) をインストールします。

## 収集データ

### メトリクス

| | |
| --- | --- |
| **aws.config.configuration_recorder_insufficient_permissions_failure** <br>(count) | 構成レコーダーに割り当てられた IAM ロール ポリシーの権限不足により発生した、権限アクセス失敗の回数|
| **aws.config.configuration_items_recorded** <br>(count) | 各リソース タイプ、またはすべてのリソース タイプについて記録された構成アイテム数<br>_単位は item_ |
| **aws.config.config_history_export_failed** <br>(count) | Amazon S3バケットへの構成履歴エクスポートに失敗した回数|
| **aws.config.config_snapshot_export_failed** <br>(count) | Amazon S3 バケットへの構成スナップショット エクスポートに失敗した回数|
| **aws.config.change_notifications_delivery_failed** <br>(count) | 配信チャネルの Amazon SNS トピックへの変更通知配信に失敗した回数|
| **aws.config.compliance_score** <br>(gauge) | コンフォーマンス パックにおいて準拠しているルールとリソースの組み合わせが、取り得る総組み合わせ数に占める割合<br>_単位は percent_ |

<!-- ### イベント

AWS Config インテグレーションでは、[AWS リソース変更](#resource-change-collection) に関連するイベントを収集します。 -->

#### 検証

[Resource Catalog](https://docs.datadoghq.com/infrastructure/resource_catalog/) のリソース サイド パネルにある **Recent Changes** タブで、構成変更を確認できます。また、[Event Management ページ](https://app.datadoghq.com/event/overview) に移動し、`source:amazon_config` でクエリすると、データが Datadog アカウントに流入していることを確認できます。

### サービス チェック

AWS Config インテグレーションにはサービス チェックは含まれません。

## トラブルシューティング

サポートが必要な場合は、[Datadog サポート](https://docs.datadoghq.com/help/) にお問い合わせください。

## 参考資料

役立つドキュメント、リンク、記事:

- [Resource Catalog の Recent Changes でインフラ変更の調査をすばやく進める](https://www.datadoghq.com/blog/recent-changes-tab/)