---
"aliases":
- "/integrations/awscloudsearch/"
"categories":
- "aws"
- "cloud"
- "log collection"
"custom_kind": "integration"
"dependencies": []
"description": "Track index utilization, successful request count, and more."
"doc_link": "https://docs.datadoghq.com/integrations/awscloudsearch/"
"draft": false
"git_integration_title": "amazon_cloudsearch"
"has_logo": true
"integration_id": ""
"integration_title": "Amazon CloudSearch"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "amazon_cloudsearch"
"public_title": "Datadog-Amazon CloudSearch Integration"
"short_description": "Track index utilization, successful request count, and more."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Amazon CloudSearch is a managed service in the AWS Cloud that makes it simple and cost-effective to set up, manage, and scale a search solution.

Enable this integration to see in Datadog all your CloudSearch metrics.

## Setup

### Installation

If you haven't already, set up the [Amazon Web Services integration first][1].

### Metric collection

1. In the [AWS integration page][2], ensure that `CloudSearch` is enabled under the `Metric Collection` tab.
2. Install the [Datadog - Amazon CloudSearch integration][3].

### Log collection

#### Enable logging

Configure Amazon CloudSearch to send logs either to a S3 bucket or to CloudWatch.

**Note**: If you log to a S3 bucket, make sure that `amazon_cloudsearch` is set as _Target prefix_.

#### Send logs to Datadog

1. If you haven’t already, set up the [Datadog Forwarder Lambda function][4].
2. Once the Lambda function is installed, manually add a trigger on the S3 bucket or CloudWatch log group that contains your Amazon CloudSearch logs in the AWS console:

    - [Add a manual trigger on the S3 bucket][5]
    - [Add a manual trigger on the CloudWatch Log Group][6]

## Data Collected

### Metrics
{{< get-metrics-from-git "amazon_cloudsearch" >}}


Each of the metrics retrieved from AWS are assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

### Events

The Amazon CloudSearch integration does not include any events.

### Service Checks

The Amazon CloudSearch integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][8].

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-cloudsearch
[4]: https://docs.datadoghq.com/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_cloudsearch/amazon_cloudsearch_metadata.csv
[8]: https://docs.datadoghq.com/help/

