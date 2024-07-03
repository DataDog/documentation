---
categories:
- cloud
- aws
- log collection
custom_kind: インテグレーション
dependencies: []
description: Track key AWS Elemental MediaPackage metrics.
doc_link: https://docs.datadoghq.com/integrations/amazon_mediapackage/
draft: false
git_integration_title: amazon_mediapackage
has_logo: true
integration_id: ''
integration_title: AWS Elemental MediaPackage
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_mediapackage
public_title: Datadog-AWS Elemental MediaPackage Integration
short_description: Track key AWS Elemental MediaPackage metrics.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

AWS Elemental MediaPackage is a just-in-time video packaging and origination service that delivers highly secure, scalable, and reliable video streams to a wide variety of playback devices.

Enable this integration to see all your Elemental MediaPackage metrics in Datadog.

## セットアップ

### インストール

If you haven't already, set up the [Amazon Web Services integration][1] first.

### Metric collection

1. In the [AWS integration page][2], ensure that `MediaPackage` is enabled under the `Metric Collection` tab.
2. Install the [Datadog - AWS Elemental MediaPackage integration][3].

### Log collection

#### Enable logging

Configure AWS Elemental MediaPackage to send logs either to a S3 bucket or to CloudWatch.

**Note**: If you log to a S3 bucket, make sure that `amazon_mediapackage` is set as _Target prefix_.

#### Send logs to Datadog

1. If you haven’t already, set up the [Datadog Forwarder Lambda function][4].
2. Once the Lambda function is installed, manually add a trigger on the S3 bucket or CloudWatch log group that contains your AWS Elemental MediaPackage logs in the AWS console:

    - [Add a manual trigger on the S3 bucket][5]
    - [Add a manual trigger on the CloudWatch Log Group][6]

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_mediapackage" >}}


### イベント

The AWS Elemental MediaPackage integration does not include any events.

### サービスチェック

The AWS Elemental MediaPackage integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][8].

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-mediapackage
[4]: https://docs.datadoghq.com/ja/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_mediapackage/amazon_mediapackage_metadata.csv
[8]: https://docs.datadoghq.com/ja/help/