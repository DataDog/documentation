---
categories:
- cloud
- aws
- log collection
custom_kind: インテグレーション
dependencies: []
description: Track key AWS Elemental MediaTailor metrics.
doc_link: https://docs.datadoghq.com/integrations/amazon_mediatailor/
draft: false
git_integration_title: amazon_mediatailor
has_logo: true
integration_id: ''
integration_title: AWS Elemental MediaTailor
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_mediatailor
public_title: Datadog-AWS Elemental MediaTailor Integration
short_description: Track key AWS Elemental MediaTailor metrics.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

AWS Elemental MediaTailor is a personalization and monetization service that allows scalable server-side ad insertion.

Enable this integration to see all your Elemental MediaTailor metrics in Datadog.

## セットアップ

### インストール

If you haven't already, set up the [Amazon Web Services integration][1] first.

### Metric collection

1. In the [AWS integration page][2], ensure that `MediaTailor` is enabled under the `Metric Collection` tab.
2. Install the [Datadog - AWS Elemental MediaTailor integration][3].

### Log collection

#### Enable logging

Configure AWS Elemental MediaTailor to send logs either to a S3 bucket or to CloudWatch.

**Note**: If you log to a S3 bucket, make sure that `amazon_mediatailor` is set as _Target prefix_.

#### Send logs to Datadog

1. If you haven’t already, set up the [Datadog Forwarder Lambda function][4].
2. Once the Lambda function is installed, manually add a trigger on the S3 bucket or CloudWatch log group that contains your AWS Elemental MediaTailor logs in the AWS console:

    - [Add a manual trigger on the S3 bucket][5]
    - [Add a manual trigger on the CloudWatch Log Group][6]

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_mediatailor" >}}


### イベント

The AWS Elemental MediaTailor integration does not include any events.

### サービスチェック

The AWS Elemental MediaTailor integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][8].

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-mediatailor
[4]: https://docs.datadoghq.com/ja/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_mediatailor/amazon_mediatailor_metadata.csv
[8]: https://docs.datadoghq.com/ja/help/