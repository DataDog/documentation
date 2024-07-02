---
"aliases":
- "/integrations/awsdirectconnect/"
"categories":
- "cloud"
- "aws"
- "log collection"
"custom_kind": "インテグレーション"
"dependencies": []
"description": "Track key AWS Direct Connect metrics."
"doc_link": "https://docs.datadoghq.com/integrations/amazon_directconnect/"
"draft": false
"git_integration_title": "amazon_directconnect"
"has_logo": true
"integration_id": ""
"integration_title": "AWS Direct Connect"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "amazon_directconnect"
"public_title": "Datadog-AWS Direct Connect Integration"
"short_description": "Track key AWS Direct Connect metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

This integration collects metrics from AWS Direct Connect, such as connection state, bit rate ingress and egress, packet rate ingress and egress, and more.

## セットアップ

### インストール

If you haven't already, set up the [Amazon Web Services integration first][1].

### Metric collection

1. In the [AWS integration page][2], ensure that `DirectConnect` is enabled under the `Metric Collection` tab.
2. Add those permissions to your [Datadog IAM policy][3] in order to collect AWS Direct Connect metrics:

    - `directconnect:DescribeConnections`: Used to list available Direct Connect connections.
    - `directconnect:DescribeTags`: Used to gather custom tags applied to Direct Connect connections.

    For more information, see the [Direct Connect policies][4] on the AWS website.

3. Install the [Datadog - AWS Direct Connect integration][5].

### Log collection

#### Enable logging

Configure AWS Direct Connect to send logs either to a S3 bucket or to CloudWatch.

**Note**: If you log to a S3 bucket, make sure that `amazon_directconnect` is set as _Target prefix_.

#### Send logs to Datadog

1. If you haven’t already, set up the [Datadog Forwarder Lambda function][6].
2. Once the Lambda function is installed, manually add a trigger on the S3 bucket or CloudWatch log group that contains your AWS Direct Connect logs in the AWS console:

    - [Add a manual trigger on the S3 bucket][7]
    - [Add a manual trigger on the CloudWatch Log Group][8]

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_directconnect" >}}


Each of the metrics retrieved from AWS are assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

### イベント

The AWS Direct Connect integration does not include any events.

### サービスチェック

The AWS Direct Connect integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][10].

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.datadoghq.com/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/directconnect/latest/UserGuide/security-iam.html
[5]: https://app.datadoghq.com/integrations/amazon-directconnect
[6]: https://docs.datadoghq.com/logs/guide/forwarder/
[7]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[8]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[9]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_directconnect/amazon_directconnect_metadata.csv
[10]: https://docs.datadoghq.com/help/

