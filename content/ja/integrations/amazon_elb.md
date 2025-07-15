---
app_id: amazon-elb
app_uuid: 1ef7e818-51bc-4935-89b3-c418908c5e69
assets:
  dashboards:
    aws_alb: assets/dashboards/aws_alb_overview.json
    aws_elb: assets/dashboards/aws_elb_overview.json
    aws_nlb: assets/dashboards/aws_nlb_overview.json
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check:
      - aws.elb.request_count
      metadata_path: metadata.csv
      prefix: aws.elb
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 119
    source_type_name: Amazon ELB
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
display_on_public_website: true
draft: false
git_integration_title: amazon_elb
integration_id: amazon-elb
integration_title: Amazon Elastic Load Balancing
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_elb
public_title: Amazon Elastic Load Balancing
short_description: Amazon ELB は自動的に複数の EC2 インスタンスにトラフィックを分散します。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Metrics
  - Category::クラウド
  - Offering::Integration
  configuration: README.md#Setup
  description: Amazon ELB は自動的に複数の EC2 インスタンスにトラフィックを分散します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Amazon Elastic Load Balancing
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Amazon Elastic Load Balancing は、クラウド上の複数の Amazon EC2 インスタンスに受信アプリケーションのトラフィックを自動的に分散します。

Datadog は、AWS が提供する 3 種類の Elastic Load Balancer (Application (ALB)、Classic (ELB)、Network Load Balancers (NLB)) からメトリクスとメタデータを収集します。

このインテグレーションを有効にすると、Datadog にすべての Elastic Load Balancing メトリクスを表示できます。

注: このインテグレーションでは、'ec2:describe**' と 'elasticloadbalancing:describe*' の権限が完全に有効になっている必要があります。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][2]で、`ApplicationELB`、`ELB`、`NetworkELB` が `Metric Collection` タブで有効になっていることを確認します。
2. [Datadog - Amazon ELB インテグレーション][3]をインストールします。

### ログ収集

#### Amazon ELB または ALB のログを有効にする

ログを収集するには、まずご自身の ELB または ALB でログを有効にしてください。ELB または ALB ログを Amazon S3 バケットに書き込み、[Lambda 関数で使用][4]することができます。詳細については、[Classic Load Balancer のアクセスログを有効にする][5]を参照してください。

{{< img src="integrations/amazon_elb/aws_elb_log_enable.png" alt="Amazon ELB ログ有効" popup="true" style="width:70%;" >}}

間隔を 5 分に設定し、S3 バケットとプレフィックスを定義します。[S3 イベント通知設定をあいまいに定義する][6]のを回避するには、他のロードバランサーのログの場所と重複しない**一意の場所**を使用してください。複数のロードバランサーが同じバケットにログを記録している場合は、必ず `my-bucket-for-elb-logs/my-elb-name` などの**一意のプレフィックス**を使用して、ログを別々の場所に保存してください。

{{< img src="integrations/amazon_elb/aws_elb_configure_log.png" alt="Amazon ELB ログ構成" popup="true" style="width:70%;">}}

#### ログを Datadog に送信する方法

1. AWS アカウントで [Datadog Forwarder Lambda 関数][7] をまだセットアップしていない場合は、セットアップします。
2. 設定が完了したら、Datadog Forwarder Lambda 関数のページにアクセスします。ELB ログを保存する S3 バケットで、トリガーを[自動][8]または[手動][9]で設定してください。手動セットアップでは、`All object create events` のイベントタイプを使用します。
3. [ログエクスプローラー][10]を使って、ログを確認します。

AWS Services のログを収集する方法については、[Datadog Lambda 関数で AWS Services のログを送信する][11]を参照してください。

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon-elb" >}}


### イベント

Amazon Elastic Load Balancing インテグレーションには、イベントは含まれません。

### サービスチェック

Amazon Elastic Load Balancing インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][13]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-elb
[4]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function
[5]: https://docs.aws.amazon.com/elasticloadbalancing/latest/classic/enable-access-logs.html
[6]: https://aws.amazon.com/premiumsupport/knowledge-center/lambda-s3-event-configuration-error/
[7]: https://docs.datadoghq.com/ja/logs/guide/forwarder/
[8]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#automatically-set-up-triggers
[9]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets
[10]: https://app.datadoghq.com/logs
[11]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[12]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_elb/metadata.csv
[13]: https://docs.datadoghq.com/ja/help/