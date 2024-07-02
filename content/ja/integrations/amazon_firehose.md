---
"aliases":
- "/integrations/awsfirehose/"
"categories":
- "aws"
- "cloud"
- "log collection"
"custom_kind": "インテグレーション"
"dependencies": []
"description": "Amazon Data Firehose のキーメトリクスを追跡。"
"doc_link": "https://docs.datadoghq.com/integrations/amazon_firehose/"
"draft": false
"git_integration_title": "amazon_firehose"
"has_logo": true
"integration_id": ""
"integration_title": "Amazon Data Firehose"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "amazon_firehose"
"public_title": "Datadog-Amazon Data Firehose Integration"
"short_description": "Track key Amazon Data Firehose metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Amazon Data Firehose is the easiest way to load streaming data into AWS.

Enable this integration to see in Datadog all your Firehose metrics.

**Note**: Amazon Data Firehose was formerly known as Amazon Kinesis Data Firehose. Read the [AWS What's New][1] post to learn more.

## セットアップ

### インストール

If you haven't already, set up the [Amazon Web Services integration first][2].

### Metric collection

1. In the [AWS integration page][3], ensure that `Firehose` is enabled under the `Metric Collection` tab.
2. Install the [Datadog - Amazon Data Firehose integration][4].

### Log collection

#### Enable logging

Configure Amazon Data Firehose to send logs either to a S3 bucket or to CloudWatch.

**Note**: If you log to a S3 bucket, make sure that `amazon_firehose` is set as _Target prefix_.

#### Send logs to Datadog

1. If you haven’t already, set up the [Datadog Forwarder Lambda function][5].
2. Once the Lambda function is installed, manually add a trigger on the S3 bucket or CloudWatch log group that contains your Amazon Data Firehose logs in the AWS console:

    - [Add a manual trigger on the S3 bucket][6]
    - [Add a manual trigger on the CloudWatch Log Group][7]

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_firehose" >}}


Each of the metrics retrieved from AWS is assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

### イベント

The Amazon Data Firehose integration does not include any events.

### サービスチェック

The Amazon Data Firehose integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][9].

[1]: https://aws.amazon.com/about-aws/whats-new/2024/02/amazon-data-firehose-formerly-kinesis-data-firehose/
[2]: https://docs.datadoghq.com/integrations/amazon_web_services/
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://app.datadoghq.com/integrations/amazon-firehose
[5]: https://docs.datadoghq.com/logs/guide/forwarder/
[6]: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#collecting-logs-from-s3-buckets
[7]: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#collecting-logs-from-cloudwatch-log-group
[8]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_firehose/amazon_firehose_metadata.csv
[9]: https://docs.datadoghq.com/help/

