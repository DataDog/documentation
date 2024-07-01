---
"aliases":
- "/integrations/awsefs/"
"categories":
- "aws"
- "cloud"
- "data stores"
- "log collection"
- "os & system"
"custom_kind": "integration"
"dependencies": []
"description": "Track key Amazon Elastic Filesystem metrics."
"doc_link": "https://docs.datadoghq.com/integrations/amazon_efs/"
"draft": false
"git_integration_title": "amazon_efs"
"has_logo": true
"integration_id": ""
"integration_title": "Amazon Elastic File System"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "amazon_efs"
"public_title": "Datadog-Amazon Elastic File System Integration"
"short_description": "Track key Amazon Elastic Filesystem metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Amazon EFS provides simple, scalable file storage for use with AWS Lambda functions or Amazon EC2 instances.

Enable this integration to collect all your EFS metrics in Datadog.

## Setup

### Installation

If you haven't already, set up the [Amazon Web Services integration first][1].

### Metric collection

1. In the [AWS integration page][2], ensure that `EFS` is enabled under the `Metric Collection` tab.
2. Add those permissions to your [Datadog IAM policy][3] in order to collect Amazon EFS metrics:

    - `elasticfilesystem:DescribeTags`: Gets custom tags applied to file systems
    - `elasticfilesystem:DescribeFileSystems`: Provides a list of active file systems

    For more information, see the [EFS policies][4] on the AWS website.

3. Install the [Datadog - Amazon EFS integration][5].

### Log collection

#### Enable logging

Configure Amazon EFS to send logs either to a S3 bucket or to CloudWatch.

**Note**: If you log to a S3 bucket, make sure that `amazon_efs` is set as _Target prefix_.

#### Send logs to Datadog

1. If you haven’t already, set up the [Datadog Forwarder Lambda function][6].
2. Once the Lambda function is installed, manually add a trigger on the S3 bucket or CloudWatch log group that contains your Amazon EFS logs in the AWS console:

    - [Add a manual trigger on the S3 bucket][7]
    - [Add a manual trigger on the CloudWatch Log Group][8]

### Amazon EFS for Lambda

[Amazon EFS for Lambda][9] allows you to connect an EFS to your Lambda functions. Organizations can use EFS for Lambda to simplify their machine learning and data processing workloads to be entirely serverless. To divide Lambda metrics and logs by EFS:

1. Install the [AWS Lambda integration][10] and enable metric collection.
2. Add this permission to your [Datadog IAM policy][3]:

    - `elasticfilesystem:DescribeAccessPoints`: Lists active EFS connected to Lambda functions

## Data Collected

### Metrics
{{< get-metrics-from-git "amazon_efs" >}}


Each of the metrics retrieved from AWS are assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

### Events

The AWS Elastic File System integration does not include any events.

### Service Checks

The AWS Elastic File System integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][12].

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.datadoghq.com/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/efs/latest/ug/auth-and-access-control.html
[5]: https://app.datadoghq.com/integrations/amazon-efs
[6]: https://docs.datadoghq.com/logs/guide/forwarder/
[7]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[8]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[9]: /integrations/amazon_lambda/#amazon-efs-for-lambda
[10]: https://docs.datadoghq.com/integrations/amazon_lambda/#aws-lambda-metrics
[11]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_efs/amazon_efs_metadata.csv
[12]: https://docs.datadoghq.com/help/

