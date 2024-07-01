---
"aliases":
- "/integrations/awsstoragegateway/"
"categories":
- "cloud"
- "data stores"
- "aws"
- "log collection"
"custom_kind": "integration"
"dependencies": []
"description": "Track key AWS Storage Gateway metrics."
"doc_link": "https://docs.datadoghq.com/integrations/amazon_storage_gateway/"
"draft": false
"git_integration_title": "amazon_storage_gateway"
"has_logo": true
"integration_id": ""
"integration_title": "AWS Storage Gateway"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "amazon_storage_gateway"
"public_title": "Datadog-AWS Storage Gateway Integration"
"short_description": "Track key AWS Storage Gateway metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

AWS Storage Gateway provides seamless and secure integration between an organization's IT environment and AWS's storage infrastructure.

Enable this integration to see in Datadog all your Storage Gateway metrics.

## Setup

### Installation

If you haven't already, set up the [Amazon Web Services integration first][1].

### Metric collection

1. In the [AWS integration page][2], ensure that `StorageGateway` is enabled under the `Metric Collection` tab.
2. Install the [Datadog - AWS Storage Gateway integration][3].

### Log collection

#### Enable logging

Configure AWS Storage Gateway to send logs either to a S3 bucket or to CloudWatch.

**Note**: If you log to a S3 bucket, make sure that `amazon_storage_gateway` is set as _Target prefix_.

#### Send logs to Datadog

1. If you haven’t already, set up the [Datadog Forwarder Lambda function][4].
2. Once the Lambda function is installed, manually add a trigger on the S3 bucket or CloudWatch log group that contains your AWS Storage Gateway logs in the AWS console:

    - [Add a manual trigger on the S3 bucket][5]
    - [Add a manual trigger on the CloudWatch Log Group][6]

## Data Collected

### Metrics
{{< get-metrics-from-git "amazon_storage_gateway" >}}


Each of the metrics retrieved from AWS are assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

### Events

The AWS Storage Gateway integration does not include any events.

### Service Checks

The AWS Storage Gateway integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][8].

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-storage-gateway
[4]: https://docs.datadoghq.com/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_storage_gateway/amazon_storage_gateway_metadata.csv
[8]: https://docs.datadoghq.com/help/

