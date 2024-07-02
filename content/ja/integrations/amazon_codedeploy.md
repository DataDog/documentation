---
"aliases":
- "/integrations/awscodedeploy/"
"categories":
- "automation"
- "aws"
- "cloud"
- "configuration & deployment"
- "log collection"
- "provisioning"
"custom_kind": "インテグレーション"
"dependencies": []
"description": "行われているデプロイをリアルタイムで表示し、その所要時間を追跡。"
"doc_link": "https://docs.datadoghq.com/integrations/amazon_codedeploy/"
"draft": false
"git_integration_title": "amazon_codedeploy"
"has_logo": true
"integration_id": "amazon-codedeploy"
"integration_title": "AWS CodeDeploy"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "amazon_codedeploy"
"public_title": "Datadog-AWS CodeDeploy Integration"
"short_description": "See deployments as they happen and track how long they take."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< img src="integrations/amazon_codedeploy/monitor-aws-codedeploy-dashboard.png" alt="CodeDeploy default dashboard" popup="true">}}

## Overview

AWS CodeDeploy is a service that automates code deployment to instances in the cloud and on-premise.

Enable this integration to see AWS CodeDeploy deployment events and metrics in Datadog.

## Setup

### Installation

If you haven't already, set up the [Amazon Web Services integration][1] first.

### Metric collection

1. Add the following permissions to your [Datadog IAM policy][2] in order to collect AWS CodeDeploy metrics. For more information, see the [CodeDeploy policies][3] on the AWS website.

    | AWS Permission                        | Description                                                                   |
    | ------------------------------------- | ----------------------------------------------------------------------------- |
    | `codedeploy:ListApplications`         | Used to list all CodeDeploy applications                                      |
    | `codedeploy:ListDeploymentGroups`     | Used to list all deployment groups within an application (edited)             |
    | `codedeploy:ListDeployments`          | Used to list deployments in a deployment group within an application (edited) |
    | `codedeploy:BatchGetDeployments`      | Gets detailed descriptions of deployments (edited)                            |
    | `codedeploy:BatchGetDeploymentGroups` | Gets detailed descriptions of deployment groups                               |

2. Install the [Datadog - AWS CodeDeploy integration][4].

### Log collection

#### Enable logging

Configure AWS CodeDeploy to send logs either to a S3 bucket or to CloudWatch.

**Note**: If you log to a S3 bucket, make sure that `amazon_codedeploy` is set as _Target prefix_.

#### Send logs to Datadog

1. If you haven’t already, set up the [Datadog Forwarder Lambda function][5].
2. Once the Lambda function is installed, manually add a trigger on the S3 bucket or CloudWatch log group that contains your AWS CodeDeploy logs in the AWS console:

    - [Add a manual trigger on the S3 bucket][6]
    - [Add a manual trigger on the CloudWatch Log Group][7]

## Data Collected

### Metrics
{{< get-metrics-from-git "amazon_codedeploy" >}}


Each of the metrics retrieved from AWS is assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

### Events

The AWS Codedeploy integration includes events for successful, failed, and stopped deployments. See example events below:

{{< img src="integrations/amazon_codedeploy/aws_codedeploy_events.png" alt="AWS Codedeploy Events" >}}

### Service Checks

The AWS Codedeploy integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][9].

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: https://docs.datadoghq.com/integrations/amazon_web_services/#installation
[3]: https://docs.aws.amazon.com/codedeploy/latest/userguide/security-iam.html
[4]: https://app.datadoghq.com/integrations/amazon_codedeploy
[5]: https://docs.datadoghq.com/logs/guide/forwarder/
[6]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[7]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[8]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_codedeploy/amazon_codedeploy_metadata.csv
[9]: https://docs.datadoghq.com/help/

