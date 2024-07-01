---
"categories":
- aws
- cloud
- data stores
- log collection
"custom_kind": "integration"
"dependencies": []
"description": "Track key AWS AppSync metrics."
"doc_link": "https://docs.datadoghq.com/integrations/amazon_appsync/"
"draft": false
"git_integration_title": "amazon_appsync"
"has_logo": true
"integration_id": ""
"integration_title": "AWS AppSync"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "amazon_appsync"
"public_title": "Datadog-AWS AppSync Integration"
"short_description": "Track key AWS AppSync metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

AWS AppSync simplifies application development by letting you create a flexible API to securely access, manipulate, and combine data from one or more data sources.

Enable this integration to see all your AppSync metrics in Datadog.

## Setup

### Installation

If you haven't already, set up the [Amazon Web Services integration][1] first.

### Metric collection

1. In the [AWS integration page][2], ensure that `AppSync` is enabled under the `Metric Collection` tab.
2. Install the [Datadog - AWS AppSync integration][3].

### Log collection

#### Enable logging

Configure AWS AppSync to send logs either to a S3 bucket or to CloudWatch.

**Note**: If you log to a S3 bucket, make sure that `amazon_appsync` is set as _Target prefix_.

#### Send logs to Datadog

1. If you haven’t already, set up the [Datadog Forwarder Lambda function][4].
2. Once the Lambda function is installed, manually add a trigger on the S3 bucket or CloudWatch log group that contains your AWS AppSync logs in the AWS console:

    - [Add a manual trigger on the S3 bucket][5]
    - [Add a manual trigger on the CloudWatch Log Group][6]

## Data Collected

### Metrics
{{< get-metrics-from-git "amazon_appsync" >}}


### Events

The AWS AppSync integration does not include any events.

### Service Checks

The AWS AppSync integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][8].

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-appsync
[4]: https://docs.datadoghq.com/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_appsync/amazon_appsync_metadata.csv
[8]: https://docs.datadoghq.com/help/

