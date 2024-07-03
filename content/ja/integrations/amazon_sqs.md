---
app_id: amazon-sqs
app_uuid: 3a036cf4-b953-441a-ad13-a99f2b8a684e
assets:
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check:
      - aws.sqs.sent_message_size
      metadata_path: metadata.csv
      prefix: aws.sqs.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 102
    source_type_name: Amazon SQS
  monitors:
    sqs_message_processing_time: assets/monitors/sqs_message_processing_time.json
    sqs_message_queue_anomaly: assets/monitors/sqs_message_queue_anomaly.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- metrics
- cloud
- log collection
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: amazon_sqs
integration_id: amazon-sqs
integration_title: Amazon SQS
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_sqs
public_title: Amazon SQS
short_description: Amazon Simple Queue Service (SQS) is a fast, reliable, scalable,
  fully managed message queuing service.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Metrics
  - Category::Cloud
  - Category::Log Collection
  configuration: README.md#Setup
  description: Amazon Simple Queue Service (SQS) is a fast, reliable, scalable, fully
    managed message queuing service.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Amazon SQS
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
{{< img src="integrations/amazon_sqs/sqsdashboard.png" alt="SQS Dashboard" popup="true">}}

## Overview

Amazon Simple Queue Service (SQS) is a fast, reliable, scalable, fully managed message queuing service.

Enable this integration to see all your SQS metrics in Datadog.

## セットアップ

### インストール

If you haven't already, set up the [Amazon Web Services integration first][1].

### Metric collection

1. In the [AWS integration page][2], ensure that `SQS` is enabled under the `Metric Collection` tab.
2. Add these permissions to your [Datadog IAM policy][3] in order to collect Amazon SQS metrics:

    - `sqs:ListQueues`: Used to list alive queues.
    - `tag:GetResources`: Get custom tags applied to SQS queues.

    For more information, see the [SQS policies][4] on the AWS website.

3. Install the [Datadog - Amazon SQS integration][5].

### Log collection

#### Enable SQS logging

See [Logging Amazon SQS API Calls Using AWS CloudTrail][6] to configure your trail. When you define your trails, select a S3 bucket to write the logs in:

{{< img src="integrations/amazon_cloudtrail/cloudtrail_logging.png" alt="CloudTrail logging" popup="true" style="width:70%;">}}

#### Send logs to Datadog

1. If you haven't already, set up the [Datadog log collection AWS Lambda function][7].
2. Once the lambda function is installed, manually add a trigger on the S3 bucket that contains your Amazon SQS logs in the AWS console. In your Lambda, click on S3 in the trigger list:
   {{< img src="integrations/amazon_s3/s3_trigger_configuration.png" alt="S3 trigger configuration" popup="true" style="width:70%;">}}
   Configure your trigger by choosing the S3 bucket that contains your Amazon SQS logs and change the event type to `Object Created (All)` then click on the add button.
   {{< img src="integrations/amazon_s3/s3_lambda_trigger_configuration.png" alt="S3 Lambda trigger configuration" popup="true" style="width:70%;">}}

Once the trigger has been added, use the [Datadog Log Explorer][8] to view your logs.

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_sqs" >}}


Each of the metrics retrieved from AWS are assigned the same tags that appear in the AWS console, including, but not limited to, host name, security-groups, and more.

### Events

The Amazon SQS integration does not include any events.

### Service Checks

The Amazon SQS integration does not include any service checks.

## Out-of-the-box monitoring

The Amazon SQS integration provides ready-to-use monitoring capabilities to monitor and optimize performance.

- Amazon SQS Dashboard: Gain a comprehensive overview of your SQS queues using the out-of-the-box [Amazon SQS dashboard][10].
- Recommended Monitors: Enable [recommended Amazon SQS monitors][11] to proactively detect issues and receive timely alerts.

## Troubleshooting

Need help? Contact [Datadog support][12].

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-authentication-and-access-control.html
[5]: https://app.datadoghq.com/integrations/amazon-sqs
[6]: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/logging-using-cloudtrail.html
[7]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function
[8]: https://app.datadoghq.com/logs
[9]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_sqs/amazon_sqs_metadata.csv
[10]: https://app.datadoghq.com/dash/integration/6/aws-sqs
[11]: https://app.datadoghq.com/monitors/recommended
[12]: https://docs.datadoghq.com/ja/help/