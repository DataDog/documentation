---
"aliases":
- "/integrations/awsses/"
"categories":
- "aws"
- "cloud"
- "log collection"
"custom_kind": "インテグレーション"
"dependencies": []
"description": "メールのバウンス、配信の試行、メッセージの拒否などを追跡。"
"doc_link": "https://docs.datadoghq.com/integrations/amazon_ses/"
"draft": false
"git_integration_title": "amazon_ses"
"has_logo": true
"integration_id": ""
"integration_title": "Amazon Simple Email Service (SES)"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "amazon_ses"
"public_title": "Datadog-Amazon Simple Email Service (SES) Integration"
"short_description": "Track email bounces, delivery attempts, rejected messages, and more."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Amazon Simple Email Service (SES) is a cost-effective, outbound-only email-sending service.

Enable this integration to see in Datadog all your SES metrics.

## セットアップ

### インストール

If you haven't already, set up the [Amazon Web Services integration first][1].

### Metric collection

1. In the [AWS integration page][2], ensure that `SES` is enabled under the `Metric Collection` tab.
2. Add those permissions to your [Datadog IAM policy][3] in order to collect Amazon SES metrics:

    - `ses:GetSendQuota`: Add metrics about send quotas.
    - `ses:GetSendStatistics`: Add metrics about send statistics.

    For more information, see the [SES policies][4] on the AWS website.

3. Install the [Datadog - Amazon Simple Email Service (SES) integration][5].

### Log collection

#### Enable logging

Configure Amazon SES to send logs either to a S3 bucket or to CloudWatch.

**Note**: If you log to a S3 bucket, make sure that `amazon_ses` is set as _Target prefix_.

#### Send logs to Datadog

1. If you haven’t already, set up the [Datadog Forwarder Lambda function][6].
2. Once the Lambda function is installed, manually add a trigger on the S3 bucket or CloudWatch log group that contains your Amazon SES logs in the AWS console:

    - [Add a manual trigger on the S3 bucket][7]
    - [Add a manual trigger on the CloudWatch Log Group][8]

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_ses" >}}


Each of the metrics retrieved from AWS are assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

### イベント

The Amazon Simple Email Service (SES) integration does not include any events.

### サービスチェック

The Amazon Simple Email Service (SES) integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][10].

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.datadoghq.com/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/ses/latest/dg/control-user-access.html
[5]: https://app.datadoghq.com/integrations/amazon-ses
[6]: https://docs.datadoghq.com/logs/guide/forwarder/
[7]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[8]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[9]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_ses/amazon_ses_metadata.csv
[10]: https://docs.datadoghq.com/help/

