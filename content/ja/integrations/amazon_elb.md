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
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: amazon_elb
integration_id: amazon-elb
integration_title: Amazon Elastic Load Balancing
integration_version: ''
is_public: true
custom_kind: integration
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

## 計画と使用

### インフラストラクチャーリスト

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][2]で、`ApplicationELB`、`ELB`、`NetworkELB` が `Metric Collection` タブで有効になっていることを確認します。
2. [Datadog - Amazon ELB インテグレーション][3]をインストールします。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "amazon_elb" >}}


### ヘルプ

Amazon Elastic Load Balancing インテグレーションには、イベントは含まれません。

### ヘルプ

Amazon Elastic Load Balancing インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-elb
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_elb/metadata.csv
[5]: https://docs.datadoghq.com/ja/help/