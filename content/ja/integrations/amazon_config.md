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
      metadata_path: metadata.csv
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
- metrics
- クラウド
custom_kind: integration
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
short_description: AWS Config allows you to audit and evaluate configuration of your
  AWS resources.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Metrics
  - Category::Cloud
  configuration: README.md#Setup
  description: AWS Config allows you to audit and evaluate configuration of your AWS
    resources.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: AWS Config
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

[AWS Config][1] provides a detailed view of the configuration of AWS resources in your AWS account. 
This includes how the resources are related to one another and how they were configured in the past 
so that you can see how the configurations and relationships change over time.

Enable this integration to see all your AWS Config metrics in Datadog.

## セットアップ

### インストール

If you haven't already, set up the [Amazon Web Services integration][2] first.

### メトリクスの収集

1. In the [AWS integration page][3], ensure that `Config` is enabled under the `Metric Collection` tab.
2. Install the [Datadog - AWS Config integration][4].

## Data Collected

### メトリクス
{{< get-metrics-from-git "amazon_config" >}}


### イベント

You can receive events in Datadog when AWS Config detects changes to your configuration snapshots and history. Create and configure the necessary resources with the [CloudFormation][6] stack below:

[![Launch Stack][7]](https://console.aws.amazon.com/cloudformation/home#/stacks/create/review?stackName=datadog-aws-config-stream&templateURL=https://datadog-cloudformation-template.s3.amazonaws.com/aws/main_config_stream.yaml)

Inspect configuration changes with the **Recent Changes** tab available in the resource's side panel on the [Resource Catalog][8].

### Service Checks

The AWS Config integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][9].

[1]: https://docs.aws.amazon.com/config/latest/developerguide/WhatIsConfig.html
[2]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://app.datadoghq.com/integrations/amazon-config
[5]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_config/metadata.csv
[6]: https://docs.aws.amazon.com/cloudformation/
[7]: https://s3.amazonaws.com/cloudformation-examples/cloudformation-launch-stack.png
[8]: https://docs.datadoghq.com/ja/infrastructure/resource_catalog/
[9]: https://docs.datadoghq.com/ja/help/