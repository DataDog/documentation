---
aliases:
- /ja/integrations/awsebs/
categories:
- cloud
- data stores
- aws
- log collection
custom_kind: インテグレーション
dependencies: []
description: スナップショットの経過時間、IOPS、読み取り/書き込み回数などを追跡。
doc_link: https://docs.datadoghq.com/integrations/amazon_ebs/
draft: false
git_integration_title: amazon_ebs
has_logo: true
integration_id: ''
integration_title: Amazon Elastic Block Store
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_ebs
public_title: Datadog-Amazon Elastic Block Store Integration
short_description: Track snapshot age, IOPS, read/write times, and more.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Amazon EBS provides persistent block storage volumes for use with Amazon EC2 instances in the AWS Cloud.

Enable this integration to see in Datadog all your EBS metrics.

## セットアップ

### インストール

If you haven't already, set up the [Amazon Web Services integration first][1].

### Metric collection

1. In the [AWS integration page][2], ensure that `EBS` is enabled under the `Metric Collection` tab.
2. Install the [Datadog - Amazon EBS integration][3].

**Note**: This integration collects metrics for EBS volumes attached to a monitored EC2. To collect all EBS metrics, make sure that EC2 is checked in the [AWS integration page][2] and that the EC2 is not excluded from monitoring with the [limit resource collection][4] setting.

### Log collection

#### Enable logging

Configure Amazon EBS to send logs either to a S3 bucket or to CloudWatch.

**Note**: If you log to a S3 bucket, make sure that `amazon_ebs` is set as _Target prefix_.

#### Send logs to Datadog

1. If you haven’t already, set up the [Datadog Forwarder Lambda function][5].
2. Once the Lambda function is installed, manually add a trigger on the S3 bucket or CloudWatch log group that contains your Amazon EBS logs in the AWS console:

    - [Add a manual trigger on the S3 bucket][6]
    - [Add a manual trigger on the CloudWatch Log Group][7]

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_ebs" >}}


Each of the metrics retrieved from AWS are assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

### イベント

The Amazon EBS integration does not include any events.

### サービスチェック

The Amazon EBS integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][9].

## Further Reading

- [Key metrics for Amazon EBS monitoring][10]
- [Collecting Amazon EBS metrics][11]
- [Monitoring Amazon EBS volumes with Datadog][12]

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-ebs
[4]: https://docs.datadoghq.com/ja/account_management/billing/aws/#aws-resource-exclusion
[5]: https://docs.datadoghq.com/ja/logs/guide/forwarder/
[6]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[7]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[8]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_ebs/amazon_ebs_metadata.csv
[9]: https://docs.datadoghq.com/ja/help/
[10]: https://www.datadoghq.com/blog/amazon-ebs-monitoring
[11]: https://www.datadoghq.com/blog/collecting-amazon-ebs-metrics
[12]: https://www.datadoghq.com/blog/monitoring-amazon-ebs-volumes-with-datadog