---
categories:
- aws
- cloud
- compliance
- log collection
custom_kind: インテグレーション
dependencies: []
description: Track key Amazon Inspector metrics.
doc_link: https://docs.datadoghq.com/integrations/amazon_inspector/
draft: false
git_integration_title: amazon_inspector
has_logo: true
integration_id: ''
integration_title: Amazon Inspector
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_inspector
public_title: Datadog-Amazon Inspector Integration
short_description: Track key Amazon Inspector metrics.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Amazon Inspector is a security vulnerability assessment service that helps improve the security and compliance of your AWS resources.

Enable this integration to see all your Inspector metrics in Datadog.

## セットアップ

### インストール

If you haven't already, set up the [Amazon Web Services integration][1] first.

### Metric collection

1. In the [AWS integration page][2], ensure that `Inspector` is enabled under the `Metric Collection` tab.
2. Install the [Datadog - Amazon Inspector integration][3].

### Log collection

#### Enable logging

Configure Amazon Inspector to send logs either to a S3 bucket or to CloudWatch.

**Note**: If you log to a S3 bucket, make sure that `amazon_inspector` is set as _Target prefix_.

#### Send logs to Datadog

1. If you haven't already, set up the [Datadog Forwarder Lambda function][4].
2. Once the Lambda function is installed, manually add a trigger on the S3 bucket or CloudWatch log group that contains your Amazon Inspector logs in the AWS console:

    - [Add a manual trigger on the S3 bucket][5]
    - [Add a manual trigger on the CloudWatch Log Group][6]

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_inspector" >}}


### イベント

The Amazon Inspector integration does not include any events.

### サービスチェック

The Amazon Inspector integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][8].

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-inspector
[4]: https://docs.datadoghq.com/ja/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_inspector/amazon_inspector_metadata.csv
[8]: https://docs.datadoghq.com/ja/help/