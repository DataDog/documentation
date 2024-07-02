---
"categories":
- cloud
- aws
- log collection
"custom_kind": "インテグレーション"
"dependencies": []
"description": "Track key Amazon Managed Streaming for Apache Kafka (MSK) metrics."
"doc_link": "https://docs.datadoghq.com/integrations/amazon_msk/"
"draft": false
"further_reading":
- "link": "https://www.datadoghq.com/blog/monitor-amazon-msk/"
  "tag": Blog
  "text": Monitor Amazon Managed Streaming for Apache Kafka with Datadog
"git_integration_title": "amazon_msk"
"has_logo": true
"integration_id": ""
"integration_title": "Amazon Managed Streaming for Apache Kafka (MSK)"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "amazon_msk"
"public_title": "Datadog-Amazon Managed Streaming for Apache Kafka (MSK) Integration"
"short_description": "Track key Amazon MSK metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Amazon Managed Streaming for Apache Kafka (MSK) is a fully managed service that makes it easy to build and run applications that use Apache Kafka to process streaming data.

This integration uses a crawler that collects metrics from CloudWatch. Read the [Amazon MSK (Agent)][1] page for information about monitoring MSK through the Datadog Agent.

## セットアップ

Enable the Amazon MSK crawler to see MSK metrics from CloudWatch in Datadog.

### インストール

If you haven't already, set up the [Amazon Web Services integration][2] first.

### Metric collection

1. In the [AWS integration page][3], ensure that `Kafka` is enabled under the `Metric Collection` tab.

2. Install the [Amazon MSK integration][4].

### Log collection

#### Enable logging

Configure Amazon MSK to send logs either to a S3 bucket or to CloudWatch.

**Notes**: 
- If you log to a S3 bucket, make sure that `amazon_msk` is set as _Target prefix_.
- If you log to a CloudWatch log group, make sure its name contains the substring `msk`.

#### Send logs to Datadog

1. If you haven’t already, set up the [Datadog Forwarder Lambda function][5].
2. Once the Lambda function is installed, manually add a trigger on the S3 bucket or CloudWatch log group that contains your Amazon MSK logs in the AWS console:

    - [Add a manual trigger on the S3 bucket][6]
    - [Add a manual trigger on the CloudWatch Log Group][7]

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_msk" >}}


### イベント

The Amazon MSK crawler does not include any events.

### サービスチェック

The Amazon MSK integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][9].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/integrations/amazon_kafka/
[2]: https://docs.datadoghq.com/integrations/amazon_web_services/
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://app.datadoghq.com/integrations/amazon-msk
[5]: https://docs.datadoghq.com/logs/guide/forwarder/
[6]: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets
[7]: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[8]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_msk/amazon_msk_metadata.csv
[9]: https://docs.datadoghq.com/help/

