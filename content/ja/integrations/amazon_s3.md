---
"app_id": "amazon-s3"
"app_uuid": "e7f3a9d8-7ddc-4ed4-b70c-9c95ef5f8581"
"assets":
  "dashboards":
    "aws_s3": "assets/dashboards/amazon_s3_overview.json"
  "integration":
    "auto_install": false
    "events":
      "creates_events": false
    "metrics":
      "check":
      - "aws.s3.bucket_size_bytes"
      "metadata_path": "metadata.csv"
      "prefix": "aws.s3"
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "157"
    "source_type_name": "Amazon S3"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "aws"
- "metrics"
- "cloud"
- "data stores"
"custom_kind": "インテグレーション"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "amazon_s3"
"integration_id": "amazon-s3"
"integration_title": "Amazon S3"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "amazon_s3"
"public_title": "Amazon S3"
"short_description": "Amazon S3 is a highly available and scalable cloud storage service."
"supported_os": []
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::AWS"
  - "Category::Metrics"
  - "Category::Cloud"
  - "Category::Data Stores"
  "configuration": "README.md#Setup"
  "description": "Amazon S3 is a highly available and scalable cloud storage service."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Amazon S3"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Overview

Amazon S3 is a highly available and scalable cloud storage service.

Enable this integration to see in Datadog all your S3 metrics.

Note: This integration requires the permission 's3:GetBucketTagging' to be fully enabled.

Note: S3 requests metrics have to be enabled on the buckets themselves, see the [AWS documentation][1]

## セットアップ

### インストール

If you haven't already, set up the [Amazon Web Services integration][2] first.

### Metric collection

1. In the [AWS integration page][3], ensure that `S3` is enabled under the `Metric Collection` tab.
2. Install the [Datadog - Amazon S3 integration][4].

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_s3" >}}


### イベント

The Amazon S3 integration does not include any events.

### サービスチェック

The Amazon S3 integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][6].

[1]: https://docs.aws.amazon.com/AmazonS3/latest/dev/cloudwatch-monitoring.html
[2]: https://docs.datadoghq.com/integrations/amazon_web_services/
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://app.datadoghq.com/integrations/amazon-s3
[5]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_s3/metadata.csv
[6]: https://docs.datadoghq.com/help/

