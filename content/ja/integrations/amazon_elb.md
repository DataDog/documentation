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
short_description: Amazon ELB automatically distributes traffic across multiple EC2
  instances.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Metrics
  - Category::Cloud
  configuration: README.md#Setup
  description: Amazon ELB automatically distributes traffic across multiple EC2 instances.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Amazon Elastic Load Balancing
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Overview

Amazon Elastic Load Balancing automatically distributes incoming application traffic across multiple Amazon EC2 instances in the cloud.

Datadog collects metrics and metadata from all three flavors of Elastic Load Balancers that AWS offers: Application (ALB), Classic (ELB), and Network Load Balancers (NLB).

Enable this integration to see in Datadog all your Elastic Load Balancing metrics.

Note: This integration requires the permissions 'ec2:describe*\*' and 'elasticloadbalancing:describe\*' to be fully enabled.

## セットアップ

### インストール

If you haven't already, set up the [Amazon Web Services integration][1] first.

### Metric collection

1. In the [AWS integration page][2], ensure that `ApplicationELB`, `ELB`, and `NetworkELB` are enabled under the `Metric Collection` tab.
2. Install the [Datadog - Amazon ELB integration][3].

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_elb" >}}


### イベント

The Amazon Elastic Load Balancing integration does not include any events.

### サービスチェック

The Amazon Elastic Load Balancing integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][5].

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-elb
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_elb/metadata.csv
[5]: https://docs.datadoghq.com/ja/help/