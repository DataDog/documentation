---
app_id: amazon-mediaconvert
app_uuid: 9ec40305-4c25-41ee-afd8-cc6cc820dc36
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - aws.mediaconvert.hdoutput_duration
      metadata_path: metadata.csv
      prefix: aws.mediaconvert.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 245
    source_type_name: Amazon MediaConvert
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- aws
- metrics
- log collection
- cloud
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: amazon_mediaconvert
integration_id: amazon-mediaconvert
integration_title: Amazon MediaConvert
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_mediaconvert
public_title: Amazon MediaConvert
short_description: Formats & compresses video content for televisions and connected
  devices
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Metrics
  - Category::Log Collection
  - Category::Cloud
  configuration: README.md#Setup
  description: Formats & compresses video content for televisions and connected devices
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Amazon MediaConvert
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Overview

Amazon Elemental MediaConvert is a service that formats and compresses offline video content for delivery to televisions or connected devices.

Enable this integration to see all your Elemental MediaConvert metrics in Datadog.

## セットアップ

### インストール

If you haven't already, set up the [Amazon Web Services integration][1] first.

### Metric collection

1. In the [AWS integration page][2], ensure that `MediaConvert` is enabled under the `Metric Collection` tab.
2. Install the [Datadog - Amazon Elemental MediaConvert integration][3].

### Log collection

#### Enable logging

Configure Amazon Elemental MediaConvert to send logs to either an S3 bucket or to CloudWatch.

**Note**: If you log to an S3 bucket, make sure that `amazon_mediaconvert` is set as _Target prefix_.

#### Send logs to Datadog

1. If you haven't already, set up the [Datadog Forwarder Lambda function][4].
2. Once the Lambda function is installed, manually add a trigger on the S3 bucket or CloudWatch log group that contains your Amazon Elemental MediaConvert logs in the AWS console:

    - [Add a manual trigger on the S3 bucket][5]
    - [Add a manual trigger on the CloudWatch Log Group][6]

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_mediaconvert" >}}


### イベント

The Amazon Elemental MediaConvert integration does not include any events.

### サービスチェック

The Amazon Elemental MediaConvert integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][8].

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-mediaconvert
[4]: https://docs.datadoghq.com/ja/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_mediaconvert/amazon_mediaconvert_metadata.csv
[8]: https://docs.datadoghq.com/ja/help/