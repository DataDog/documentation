---
aliases:
- /ja/integrations/awsredshift/
categories:
- aws
- cloud
- data stores
- log collection
custom_kind: インテグレーション
dependencies: []
description: Amazon Redshift のキーメトリクスを追跡。
doc_link: https://docs.datadoghq.com/integrations/amazon_redshift/
draft: false
git_integration_title: amazon_redshift
has_logo: true
integration_id: ''
integration_title: Amazon Redshift
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_redshift
public_title: Datadog-Amazon Redshift Integration
short_description: Track key Amazon Redshift metrics.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Amazon Redshift is a fast, fully managed, petabyte-scale data warehouse service that makes it simple and cost-effective to efficiently analyze all your data.

Enable this integration to see all your Redshift metrics in Datadog.

## セットアップ

### インストール

If you haven't already, set up the [Amazon Web Services integration first][1].

### Metric collection

1. In the [AWS integration page][2], ensure that `Redshift` is enabled under the `Metric Collection` tab.
2. Add these permissions to your [Datadog IAM policy][3] in order to collect Amazon Redshift metrics:

    - `redshift:DescribeClusters`: List all Redshift Clusters in your account.
    - `redshift:DescribeLoggingStatus`: Get S3 bucket where Redshift logs are stored.
    - `tag:GetResources`: Get custom tags on your Redshift clusters.

    For more information, see the [Redshift policies][4] on the AWS website.

3. Install the [Datadog - Amazon Redshift integration][5].

### Log collection

#### Enable logging

Enable the logging on your Redshift Cluster first to collect your logs. Redshift logs can be written to an Amazon S3 bucket and [consumed by a Lambda function][6]. For more information, see [Configuring auditing using the console][7].

#### Send logs to Datadog

1. If you haven't already, set up the [Datadog Forwarder Lambda function][8] in your AWS account.
2. Once the Lambda function is installed, there are two ways to collect your Redshift logs:

    - Automatically: Redshift logs are managed automatically if you grant Datadog access with a set of permissions. See [Automatically Set Up Triggers][9] for more information on configuring automatic log collection on the Datadog Forwarder Lambda function.
    - Manually: In the AWS console, add a trigger on the S3 bucket that contains your Redshift logs. See the [manual installation steps](#manual-installation-steps).

#### Manual installation steps

1. If you haven't already, set up the [Datadog Forwarder Lambda function][8] in your AWS account.
2. Once set up, go to the Datadog Forwarder Lambda function. In the Function Overview section, click **Add Trigger**. 
3. Select the **S3** trigger for the Trigger Configuration.
4. Select the S3 bucket that contains your Redshift logs.
5. Leave the event type as `All object create events`.
6. Click **Add** to add the trigger to your Lambda.

Go to the [Log Explorer][10] to start exploring your logs.

For more information on collecting AWS Services logs, see [Send AWS Services Logs with the Datadog Lambda Function][11].

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_redshift" >}}


Each of the metrics retrieved from AWS are assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

### イベント

The Amazon Redshift integration does not include any events.

### サービスチェック

The Amazon Redshift integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][13].

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/redshift/latest/mgmt/redshift-iam-authentication-access-control.html
[5]: https://app.datadoghq.com/integrations/amazon-redshift
[6]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tabs=awsconsole#collecting-logs-from-s3-buckets
[7]: https://docs.aws.amazon.com/redshift/latest/mgmt/db-auditing-console.html
[8]: https://docs.datadoghq.com/ja/logs/guide/forwarder/
[9]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tabs=awsconsole#automatically-set-up-triggers
[10]: https://app.datadoghq.com/logs
[11]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[12]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_redshift/amazon_redshift_metadata.csv
[13]: https://docs.datadoghq.com/ja/help/