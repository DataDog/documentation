---
aliases:
- /ja/integrations/awskinesis/
categories:
- aws
- cloud
- log collection
custom_kind: インテグレーション
dependencies: []
description: Amazon Kinesis のキーメトリクスを追跡。
doc_link: https://docs.datadoghq.com/integrations/amazon_kinesis/
draft: false
git_integration_title: amazon_kinesis
has_logo: true
integration_id: ''
integration_title: Amazon Kinesis
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_kinesis
public_title: Datadog-Amazon Kinesis Integration
short_description: Track key Amazon Kinesis metrics.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Amazon Kinesis is a fully managed, cloud-based service for real-time processing of large, distributed data streams.

Enable this integration to see in Datadog all your Kinesis metrics, and collect custom Kinesis tags.

## セットアップ

### インストール

If you haven't already, set up the [Amazon Web Services integration first][1]. There are no other installation steps that need to be performed.

### Metric collection

1. In the [AWS integration page][2], ensure that `Kinesis` is enabled under the `Metric Collection` tab.
2. Add those permissions to your [Datadog IAM policy][3] in order to collect Amazon Kinesis metrics:

    - `kinesis:ListStreams`: List available streams.
    - `kinesis:DescribeStream`: Add tags and new metrics for kinesis streams.
    - `kinesis:ListTagsForStream`: Add custom tags.

    For more information, see the [Kinesis policies][4] on the AWS website.

3. Install the [Datadog - Amazon Kinesis integration][5].

### Log collection

#### Enable logging

Datadog is one of the default destinations for Amazon Data Firehose delivery streams. AWS fully manages Amazon Data Firehose, so you don’t need to maintain any additional infrastructure or forwarding configurations for streaming logs. 

You can set up an Amazon Data Firehose delivery stream in the AWS Firehose console, or automatically set up the destination using a CloudFormation template:

- [AWS Firehose console][6]
- [CloudFormation template][7]

However, if you log to an S3 bucket, then use the AWS Lambda function. Make sure that `amazon_kinesis` is set as _Target prefix_.

1. If you haven’t already, set up the [Datadog Forwarder Lambda function][8].
2. Once the Lambda function is installed, manually add a trigger on the S3 bucket or CloudWatch log group that contains your Amazon Kinesis logs in the AWS console:

    - [Add a manual trigger on the S3 bucket][9]
    - [Add a manual trigger on the CloudWatch Log Group][10]

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_kinesis" >}}


Each of the metrics retrieved from AWS are assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

### イベント

The Amazon Kinesis integration does not include any events.

### サービスチェック

The Amazon Kinesis integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][12].

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/streams/latest/dev/controlling-access.html
[5]: https://app.datadoghq.com/integrations/amazon-kinesis
[6]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination/?tab=amazondatafirehosedeliverystream
[7]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination/?tab=cloudformationtemplate
[8]: https://docs.datadoghq.com/ja/logs/guide/forwarder/
[9]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[10]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[11]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_kinesis/amazon_kinesis_metadata.csv
[12]: https://docs.datadoghq.com/ja/help/