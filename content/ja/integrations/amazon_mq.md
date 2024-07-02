---
"aliases":
- "/integrations/awsmq/"
"categories":
- "cloud"
- "aws"
- "log collection"
"custom_kind": "インテグレーション"
"dependencies": []
"description": "AWS MQ のキーメトリクスを追跡。"
"doc_link": "https://docs.datadoghq.com/integrations/amazon_mq/"
"draft": false
"further_reading":
- "link": "https://www.datadoghq.com/blog/monitor-amazonmq-metrics-with-datadog"
  "tag": "ブログ"
  "text": "Datadog で Amazon MQ のメトリクスを監視"
"git_integration_title": "amazon_mq"
"has_logo": true
"integration_id": ""
"integration_title": "Amazon MQ"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "amazon_mq"
"public_title": "Datadog-Amazon MQ Integration"
"short_description": "Track key AWS MQ metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Amazon MQ is a managed message broker service for Apache ActiveMQ that makes it easy to set up and operate message brokers in the cloud.

Enable this integration to see all of your Amazon MQ metrics in Datadog.

## セットアップ

### インストール

If you haven't already, set up the [Amazon Web Services integration first][1].

### Metric collection

1. In the [AWS integration page][2], ensure that `MQ` is enabled under the `Metric Collection` tab.

2. Install the [Datadog - AWS Amazon MQ integration][3].

### Log collection

#### Enable logging

Configure Amazon MQ to send logs either to a S3 bucket or to CloudWatch.

**Note**: If you log to a S3 bucket, make sure that `amazon_mq` is set as _Target prefix_.

#### Send logs to Datadog

1. If you haven’t already, set up the [Datadog Forwarder Lambda function][4].
2. Once the Lambda function is installed, manually add a trigger on the S3 bucket or CloudWatch log group that contains your Amazon MQ logs in the AWS console:

    - [Add a manual trigger on the S3 bucket][5]
    - [Add a manual trigger on the CloudWatch Log Group][6]

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_mq" >}}


Each of the metrics retrieved from AWS are assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

### イベント

The AWS Amazon MQ integration does not include any events.

### サービスチェック

The AWS Amazon MQ integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][8].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-mq
[4]: https://docs.datadoghq.com/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_mq/amazon_mq_metadata.csv
[8]: https://docs.datadoghq.com/help/

