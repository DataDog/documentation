---
"categories":
- cloud
- aws
- log collection
"custom_kind": "integration"
"dependencies": []
"description": "Track key Amazon Rekognition metrics."
"doc_link": "https://docs.datadoghq.com/integrations/amazon_rekognition/"
"draft": false
"git_integration_title": "amazon_rekognition"
"has_logo": true
"integration_id": ""
"integration_title": "Amazon Rekognition"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "amazon_rekognition"
"public_title": "Datadog-Amazon Rekognition Integration"
"short_description": "Track key Amazon Rekognition metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Amazon Rekognition makes it easy to add image and video analysis to your applications. You just provide an image or video to the Rekognition API, and the service can identify objects, people, text, scenes, and activities.

Enable this integration to see all your Rekognition metrics in Datadog.

## Setup

### Installation

If you haven't already, set up the [Amazon Web Services integration][1] first.

### Metric collection

1. In the [AWS integration page][2], ensure that `Rekognition` is enabled under the `Metric Collection` tab.
2. Install the [Datadog - Amazon Rekognition integration][3].

### Log collection

#### Enable logging

Configure Amazon Rekognition to send logs either to a S3 bucket or to CloudWatch.

**Note**: If you log to a S3 bucket, make sure that `amazon_rekognition` is set as _Target prefix_.

#### Send logs to Datadog

1. If you haven’t already, set up the [Datadog Forwarder Lambda function][4].
2. Once the Lambda function is installed, manually add a trigger on the S3 bucket or CloudWatch log group that contains your Amazon Rekognition logs in the AWS console:

    - [Add a manual trigger on the S3 bucket][5]
    - [Add a manual trigger on the CloudWatch Log Group][6]

## Data Collected

### Metrics
{{< get-metrics-from-git "amazon_rekognition" >}}


### Events

The Amazon Rekognition integration does not include any events.

### Service Checks

The Amazon Rekognition integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][8].

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-rekognition
[4]: https://docs.datadoghq.com/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_rekognition/amazon_rekognition_metadata.csv
[8]: https://docs.datadoghq.com/help/

