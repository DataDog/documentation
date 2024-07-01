---
"categories":
- cloud
- aws
- log collection
"custom_kind": "integration"
"dependencies": []
"description": "Track key Amazon Elastic Transcoder metrics."
"doc_link": "https://docs.datadoghq.com/integrations/amazon_elastic_transcoder/"
"draft": false
"git_integration_title": "amazon_elastic_transcoder"
"has_logo": true
"integration_id": ""
"integration_title": "Amazon Elastic Transcoder"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "amazon_elastic_transcoder"
"public_title": "Datadog-Amazon Elastic Transcoder Integration"
"short_description": "Track key Amazon Elastic Transcoder metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Amazon Elastic Transcoder lets you convert media files stored in Amazon S3 into media file formats required by consumer playback devices.

Enable this integration to see all your Elastic Transcoder metrics in Datadog.

## Setup

### Installation

If you haven't already, set up the [Amazon Web Services integration][1] first.

### Metric collection

1. In the [AWS integration page][2], ensure that `Elastic Transcoder` is enabled under the `Metric Collection` tab.
2. Install the [Datadog - Amazon Elastic Transcoder integration][3].

### Log collection

#### Enable logging

Configure Amazon Elastic Transcoder to send logs either to a S3 bucket or to CloudWatch.

**Note**: If you log to a S3 bucket, make sure that `amazon_elastic_transcoder` is set as _Target prefix_.

#### Send logs to Datadog

1. If you haven’t already, set up the [Datadog Forwarder Lambda function][4].
2. Once the Lambda function is installed, manually add a trigger on the S3 bucket or CloudWatch log group that contains your Amazon Elastic Transcoder logs in the AWS console:

    - [Add a manual trigger on the S3 bucket][5]
    - [Add a manual trigger on the CloudWatch Log Group][6]

## Data Collected

### Metrics
{{< get-metrics-from-git "amazon_elastic_transcoder" >}}


### Events

The Amazon Elastic Transcoder integration does not include any events.

### Service Checks

The Amazon Elastic Transcoder integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][8].

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-elastic-transcoder
[4]: https://docs.datadoghq.com/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_elastic_transcoder/amazon_elastic_transcoder_metadata.csv
[8]: https://docs.datadoghq.com/help/

