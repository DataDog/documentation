---
"aliases":
- "/integrations/awsemr/"
"categories":
- "aws"
- "cloud"
- "log collection"
"custom_kind": "integration"
"dependencies": []
"description": "Track key Amazon EMR metrics."
"doc_link": "https://docs.datadoghq.com/integrations/amazon_emr/"
"draft": false
"git_integration_title": "amazon_emr"
"has_logo": true
"integration_id": ""
"integration_title": "Amazon EMR"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "amazon_emr"
"public_title": "Datadog-Amazon EMR Integration"
"short_description": "Track key Amazon EMR metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Amazon EMR is a web service that makes it easy to quickly and cost-effectively process vast amounts of data.

Enable this integration to see EMR metrics in Datadog.

## Setup

### Installation

If you haven't already, set up the [Amazon Web Services integration][1] first.

### Metric collection

1. In the [AWS integration page][2], ensure that `EMR` is enabled under the `Metric Collection` tab.
2. Add the following permissions to your [Datadog IAM policy][3] to collect Amazon EMR metrics. For more information, see the [EMR policies][4] on the AWS website.

    | AWS Permission                     | Description                         |
    | ---------------------------------- | ----------------------------------- |
    | `elasticmapreduce:ListClusters`    | List available clusters.            |
    | `elasticmapreduce:DescribeCluster` | Add tags to CloudWatch EMR metrics. |

3. Install the [Datadog - Amazon EMR integration][5].

### Log collection

#### Enable logging

Configure Amazon EMR to send logs either to a S3 bucket or to CloudWatch.

**Note**: If you log to a S3 bucket, make sure that `amazon_emr` is set as _Target prefix_.

#### Send logs to Datadog

1. If you haven’t already, set up the [Datadog Forwarder Lambda function][6].
2. Once the Lambda function is installed, manually add a trigger on the S3 bucket or CloudWatch log group that contains your Amazon EMR logs in the AWS console:

    - [Add a manual trigger on the S3 bucket][7]
    - [Add a manual trigger on the CloudWatch Log Group][8]

## Data Collected

### Metrics
{{< get-metrics-from-git "amazon_emr" >}}


Each of the metrics retrieved from AWS is assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

### Events

The Amazon EMR integration does not include any events.

### Service Checks

The Amazon EMR integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][10].

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.datadoghq.com/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/load-balancer-authentication-access-control.html
[5]: https://app.datadoghq.com/integrations/amazon-emr
[6]: https://docs.datadoghq.com/logs/guide/forwarder/
[7]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[8]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[9]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_emr/amazon_emr_metadata.csv
[10]: https://docs.datadoghq.com/help/

