---
aliases:
- /ja/integrations/awsautoscaling/
- /ja/integrations/faq/get-your-autoscaling-group-events-and-metrics/
app_id: amazon-auto-scaling
app_uuid: f5a62c95-2e7e-4e58-8782-b9847ce08b5b
assets:
  dashboards:
    aws_auto_scaling: assets/dashboards/aws_auto_scaling.json
  integration:
    auto_install: false
    events:
      creates_events: true
    metrics:
      check: aws.autoscaling.group_desired_capacity
      metadata_path: assets/metrics/metric-spec.yaml
      prefix: aws.autoscaling
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 131
    source_type_name: Amazon Auto Scaling
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 自動化
- aws
- クラウド
- 構成とデプロイ
- ログの収集
- プロビジョニング
custom_kind: インテグレーション
dependencies: []
description: Auto Scaling グループ内のインスタンスのステータスとカウントを追跡
display_on_public_website: true
doc_link: https://docs.datadoghq.com/integrations/amazon_auto_scaling/
draft: false
git_integration_title: amazon_auto_scaling
has_logo: true
integration_id: amazon-auto-scaling
integration_title: AWS Auto Scaling
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_auto_scaling
public_title: AWS Auto Scaling
short_description: Launch and terminate EC2 instances based on user-defined policies.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Automation
  - Category::AWS
  - Category::Cloud
  - Category::Configuration & Deployment
  - Category::Log Collection
  - Category::Provisioning
  - Offering::Integration
  configuration: README.md#Setup
  description: Launch and terminate EC2 instances based on user-defined policies.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: AWS Auto Scaling
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

AWS Auto Scaling は、ユーザー定義のポリシーに基づいて EC2 インスタンスを自動的に起動または終了するサービスです。

このインテグレーションを有効にすると、Datadog にすべての Auto Scaling メトリクスを表示できます。

- `autoscaling_group` タグを使用して、Auto Scaling グループ内のホストの EC2 メトリクスを収集できます。
- `autoscaling_group` タグと `autoscalinggroupname` タグを使用して、特定のグループに関する Auto Scaling メトリクスを収集できます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. Datadog [AWS インテグレーションページ][2]で、`Metric Collection` タブの下にある `AutoScaling` が有効になっていることを確認します。
2. AWS の Auto Scaling データは CloudWatch に送信する必要があります。詳細は、[Auto Scaling グループメトリクスを有効にする][3]を参照してください。
3. AWS Auto Scaling のメトリクスを収集するには、次のアクセス許可を [Datadog IAM ポリシー][4]に追加します。詳細については、AWS ウェブサイト上の [Auto Scaling ポリシー][5]を参照してください。

    | AWS アクセス許可                          | 説明                                                                                                                                                                                                                                             |
    | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | `autoscaling:DescribeAutoScalingGroups` | すべての Auto Scaling グループをリストするために使用されます。                                                                                                                                                                                                                  |
    | `autoscaling:DescribePolicies`          | 有効なポリシーをリストします (イベントやモニターでオートコンプリートに使用)。                                                                                                                                                                                  |
    | `autoscaling:DescribeTags`              | 特定の Auto Scaling グループのタグをリストするために使用されます。これにより、ASG CloudWatch メトリクスに ASG カスタムタグが追加されます。                                                                                                                                             |
    | `autoscaling:DescribeScalingActivities` | ASG がスケールアップまたはダウンするときにイベントを生成するために使用されます。                                                                                                                                                                                                |
    | `autoscaling:ExecutePolicy`             | 1 つのポリシーを実行します (モニターまたはイベントフィードからのスケールアップまたはダウン)。<br>これは[インストールポリシードキュメント](#installation)に含まれません。モニターまたはイベントを使用して Auto Scaling ポリシーを実行する場合にのみ追加してください。|

4. [Datadog - AWS Auto Scaling インテグレーション][6]をインストールします。

### ログ収集

#### ログの有効化

S3 バケットまたは CloudWatch のいずれかにログを送信するよう AWS Auto Scaling を構成します。

**注**: S3 バケットにログを送る場合は、_Target prefix_ が `amazon_auto_scaling` に設定されているかを確認してください。

#### ログを Datadog に送信する方法

1. [Datadog Forwarder Lambda 関数][7]をまだセットアップしていない場合は、セットアップします。
2. Lambda 関数がインストールされたら、AWS コンソールで、AWS Auto Scaling ログを含む S3 バケットまたは CloudWatch のロググループに手動でトリガーを追加します。

    - [S3 バケットに手動でトリガーを追加][8]
    - [CloudWatch ロググループに手動トリガーを追加][9]

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_auto_scaling" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティ グループなど、AWS コンソールに表示されるのと同じタグが割り当てられます。

### イベント

AWS Auto-Scaling インテグレーションには、EC2 インスタンスを起動および終了するためのイベントが含まれています。以下はイベントの例です。

{{< img src="integrations/amazon_auto_scaling/aws_auto_scaling_events.png" alt="AWS Auto-Scaling イベント" >}}

### サービスチェック

AWS Auto-Scaling インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ASG メトリクスを Datadog に表示するには、まず、それらのメトリクスを AWS コンソールで有効にする必要があります。[ASG メトリクスを有効にする方法については、AWS のガイドを参照してください][11]。**注**: これらのメトリクスは、有効にされてから表示されるまでに多少時間がかかる場合があります。

ご不明な点は、[Datadog のサポートチーム][12]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-instance-monitoring.html#as-enable-group-metrics
[4]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#installation
[5]: https://docs.aws.amazon.com/autoscaling/plans/userguide/auth-and-access-control.html
[6]: https://app.datadoghq.com/integrations/amazon-auto-scaling
[7]: https://docs.datadoghq.com/ja/logs/guide/forwarder/
[8]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets
[9]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[10]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_auto_scaling/assets/metrics/metric-spec.yaml
[11]: http://docs.aws.amazon.com/autoscaling/latest/userguide/as-instance-monitoring.html#enable-detailed-instance-metrics
[12]: https://docs.datadoghq.com/ja/help/