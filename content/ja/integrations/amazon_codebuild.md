---
"aliases":
- /integrations/awscodebuild/
"categories":
- aws
- cloud
- configuration & deployment
- log collection
"custom_kind": "integration"
"dependencies": []
"description": "See deployments as they happen and track how long they take."
"doc_link": "https://docs.datadoghq.com/integrations/amazon_codebuild/"
"draft": false
"git_integration_title": "amazon_codebuild"
"has_logo": true
"integration_id": ""
"integration_title": "AWS CodeBuild"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "amazon_codebuild"
"public_title": "Datadog-AWS CodeBuild Integration"
"short_description": "See deployments as they happen and track how long they take."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

AWS CodeBuild is a build service that compiles source code, runs tests, and produces software packages that are ready to deploy.

Install the Datadog AWS CodeBuild integration to:

- Track your builds by project
- Collect metrics on your builds
- Correlate builds with the rest of your Datadog metrics

## Setup

### Installation

If you haven't already, set up the [Amazon Web Services integration][1] first.

### Metric collection

1. In the [AWS integration page][2], ensure that `CloudBuild` is enabled under the `Metric Collection` tab.

2. Install the [Datadog - AWS Codebuild integration][3].

### Log collection

#### Enable logging

Configure AWS CodeBuild to send logs either to a S3 bucket or to CloudWatch.

**Note**: If you log to a S3 bucket, make sure that `amazon_codebuild` is set as _Target prefix_.

#### Send logs to Datadog

1. If you haven’t already, set up the [Datadog Forwarder Lambda function][4].
2. Once the Lambda function is installed, manually add a trigger on the S3 bucket or CloudWatch log group that contains your AWS CodeBuild logs in the AWS console:

    - [Add a manual trigger on the S3 bucket][5]
    - [Add a manual trigger on the CloudWatch Log Group][6]

## Data Collected

### Metrics
{{< get-metrics-from-git "amazon_codebuild" >}}


### Events

The AWS CodeBuild integration does not include any events.

### Service Checks

The AWS CodeBuild integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][8].

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-codebuild
[4]: https://docs.datadoghq.com/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_codebuild/amazon_codebuild_metadata.csv
[8]: https://docs.datadoghq.com/help/

