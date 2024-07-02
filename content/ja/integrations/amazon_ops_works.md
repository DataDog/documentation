---
"aliases":
- "/integrations/awsopsworks/"
"categories":
- "aws"
- "cloud"
- "configuration & deployment"
- "log collection"
- "provisioning"
"custom_kind": "インテグレーション"
"dependencies": []
"description": "AWS OpsWorks のリソース使用状況を追跡。"
"doc_link": "https://docs.datadoghq.com/integrations/amazon_ops_works/"
"draft": false
"git_integration_title": "amazon_ops_works"
"has_logo": true
"integration_id": ""
"integration_title": "AWS OpsWorks"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "amazon_ops_works"
"public_title": "Datadog-AWS OpsWorks Integration"
"short_description": "Track AWS OpsWorks resource usage."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

AWS OpsWorks is an application management service that makes it easy to deploy and operate applications of all shapes and sizes.

Enable this integration to see in Datadog all your OpsWorks metrics.

## セットアップ

### インストール

If you haven't already, set up the [Amazon Web Services integration first][1].

### Metric collection

1. In the [AWS integration page][2], ensure that `OpsWorks` is enabled under the `Metric Collection` tab.
2. Install the [Datadog - AWS OpsWork integration][3].

### Log collection

#### Enable logging

Configure AWS OpsWorks to send logs either to a S3 bucket or to CloudWatch.

**Note**: If you log to a S3 bucket, make sure that `amazon_ops_work` is set as _Target prefix_.

#### Send logs to Datadog

1. If you haven’t already, set up the [Datadog Forwarder Lambda function][4].
2. Once the Lambda function is installed, manually add a trigger on the S3 bucket or CloudWatch log group that contains your AWS OpsWorks logs in the AWS console:

    - [Add a manual trigger on the S3 bucket][5]
    - [Add a manual trigger on the CloudWatch Log Group][6]

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_ops_works" >}}


Each of the metrics retrieved from AWS are assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

### イベント

The AWS OpsWorks integration does not include any events.

### サービスチェック

The AWS OpsWorks integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][8].

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-ops-works
[4]: https://docs.datadoghq.com/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_ops_works/amazon_ops_works_metadata.csv
[8]: https://docs.datadoghq.com/help/

