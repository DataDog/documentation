---
"categories":
- aws
- cloud
- data stores
- log collection
"custom_kind": "integration"
"dependencies": []
"description": "Track key Amazon S3 Storage Lens metrics."
"doc_link": "https://docs.datadoghq.com/integrations/amazon_s3_storage_lens"
"draft": false
"further_reading":
- "link": "https://www.datadoghq.com/blog/amazon-s3-storage-lens-monitoring-datadog/"
  "tag": Blog
  "text": Monitor and optimize S3 storage with Amazon S3 Storage Lens metrics
"git_integration_title": "amazon_s3_storage_lens"
"has_logo": true
"integration_id": ""
"integration_title": "Amazon S3 Storage Lens"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "amazon_s3_storage_lens"
"public_title": "Datadog-Amazon S3 Storage Lens Integration"
"short_description": "Track key Amazon S3 Storage Lens metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Amazon S3 Storage Lens provides a single view of usage and activity across your Amazon S3 storage. You can use S3 Storage Lens to generate summary insights, such as finding out how much storage you have across your entire organization, or which are the fastest growing buckets and prefixes. Identify outliers in your storage metrics, and then drill down to further investigate the source of the spike in usage or activity.

Enable this integration to see all your S3 Storage Lens metrics in Datadog.

## Setup

### Installation

If you haven't already, set up the [Amazon Web Services integration][1] first.

### Metric collection

1. Enable [CloudWatch publishing for S3 Storage Lens][2] within your AWS account. You must be using "Advanced metrics and recommendations" to use this feature.
2. In the [AWS integration page][3], ensure that `S3 Storage Lens` is enabled under the `Metric Collection` tab.
3. Install the [Datadog - Amazon S3 Storage Lens integration][4].

**Note:** S3 Storage Lens metrics are daily metrics and are published to CloudWatch once per day. 

## Data Collected

### Metrics
{{< get-metrics-from-git "amazon_s3_storage_lens" >}}


### Events

The Amazon S3 Storage Lens integration does not include any events.

### Service Checks

The Amazon S3 Storage Lens integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][6].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-lens-cloudwatch-enable-publish-option.html
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://app.datadoghq.com/integrations/amazon-s3-storage-lens
[5]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_s3_storage_lens/amazon_s3_storage_lens_metadata.csv
[6]: https://docs.datadoghq.com/help/

