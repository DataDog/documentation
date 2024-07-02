---
"aliases":
- "/integrations/awspolly/"
"categories":
- "cloud"
- "aws"
- "log collection"
"custom_kind": "インテグレーション"
"dependencies": []
"description": "Amazon Polly のキーメトリクスを追跡します。"
"doc_link": "https://docs.datadoghq.com/integrations/amazon_polly/"
"draft": false
"git_integration_title": "amazon_polly"
"has_logo": true
"integration_id": ""
"integration_title": "Amazon Polly"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "amazon_polly"
"public_title": "Datadog-Amazon Polly Integration"
"short_description": "Track key Amazon Polly metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Amazon Polly is a service that turns text into lifelike speech.

Enable this integration to see in Datadog all your Polly metrics.

## セットアップ

### インストール

If you haven't already, set up the [Amazon Web Services integration first][1].

### Metric collection

1. In the [AWS integration page][2], ensure that `Polly` is enabled under the `Metric Collection` tab.
2. Install the [Datadog - Amazon Polly integration][3].

### Log collection

#### Enable logging

Configure Amazon Polly to send logs either to a S3 bucket or to CloudWatch.

**Note**: If you log to a S3 bucket, make sure that `amazon_polly` is set as _Target prefix_.

#### Send logs to Datadog

1. If you haven’t already, set up the [Datadog Forwarder Lambda function][4].
2. Once the Lambda function is installed, manually add a trigger on the S3 bucket or CloudWatch log group that contains your Amazon Polly logs in the AWS console:

    - [Add a manual trigger on the S3 bucket][5]
    - [Add a manual trigger on the CloudWatch Log Group][6]

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_polly" >}}


Each of the metrics retrieved from AWS are assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

### イベント

The Amazon Polly integration does not include any events.

### サービスチェック

The Amazon Polly integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][8].

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-polly
[4]: https://docs.datadoghq.com/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_polly/amazon_polly_metadata.csv
[8]: https://docs.datadoghq.com/help/

