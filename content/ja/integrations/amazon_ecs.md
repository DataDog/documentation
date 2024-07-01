---
"aliases":
- "/integrations/ecs/"
"categories":
- "cloud"
- "containers"
- "aws"
- "log collection"
"custom_kind": "integration"
"dependencies": []
"description": "Monitor container statuses, track resource usage, and more."
"doc_link": "https://docs.datadoghq.com/integrations/amazon_ecs/"
"draft": false
"further_reading":
- "link": "https://www.datadoghq.com/blog/amazon-ecs-metrics"
  "tag": "Blog"
  "text": "Key ECS metrics to monitor"
- "link": "https://docs.datadoghq.com/integrations/ecs_fargate"
  "tag": "Documentation"
  "text": "ECS Fargate Integration"
"git_integration_title": "amazon_ecs"
"has_logo": true
"integration_id": ""
"integration_title": "Amazon ECS on EC2"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "amazon_ecs"
"public_title": "Datadog-Amazon ECS on EC2 Integration"
"short_description": "Monitor container statuses, track resource usage, and more."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
<div class="alert alert-warning">
Looking to deploy the containerized Datadog Agent to your ECS cluster? See the <a href="https://docs.datadoghq.com/agent/amazon_ecs/"><b>Amazon ECS Agent documentation</b></a>.
</div>

## Overview

Amazon ECS on EC2 is a highly scalable, high performance container management service for Docker containers running on EC2 instances.

Collect ECS metrics automatically from CloudWatch using the Amazon ECS Datadog integration. Expand on those metrics by querying the ECS API for ECS events, tags, and the status of container instances, tasks, and services.

## Setup

### Installation

If you haven't already, set up the [Amazon Web Services integration][1] first.

### Metric collection

1. Follow the AWS Integration [role delegation setup][1] instructions.
2. Ensure the following permissions for your [Datadog IAM policy][2] are set to collect Amazon ECS metrics. For more information on ECS policies, read [Actions, resources, and condition keys for Amazon Elastic Container Service][3] in the AWS documentation.

| AWS Permission                   | Description                                                   |
| -------------------------------- | ------------------------------------------------------------- |
| `ecs:ListClusters`               | Returns a list of existing clusters.                          |
| `ecs:ListContainerInstances`     | Returns a list of container instances in a specified cluster. |
| `ecs:ListServices`               | Lists the services that are running in a specified cluster.   |
| `ecs:DescribeContainerInstances` | Describes Amazon ECS container instances.                     |

3. In the [AWS integration page][4], ensure that `ECS` is enabled under the `Metric Collection` tab.

    {{< img src="integrations/amazon_ecs/aws_tile.png" alt="Amazon ECS Configuration" >}}

When metric collection is enabled, an [out-of-the-box dashboard][5] that provides detailed information about your ECS metrics is available for this integration. See [Monitoring ECS with Datadog][6] for more details.

## Data collected

### Metrics
{{< get-metrics-from-git "amazon_ecs" >}}


Each of the metrics retrieved from AWS is assigned the same tags that appear in the AWS console, including but not limited to hostname, security-groups, and more.

**Note**: Metrics prefixed with `ecs.containerinsights.*` can be collected by enabling `Collect custom metrics` under the `Metric Collection` tab of the [AWS Integration page][4].

### Events

To reduce noise, the Amazon ECS integration is automatically set up to include only events that contain the following words: `drain`, `error`, `fail`, `insufficient memory`, `pending`, `reboot`, `terminate`. See example events below:

{{< img src="integrations/amazon_ecs/aws_ecs_events.png" alt="Amazon ECS Events" >}}

To remove the inclusion list and receive all events from your Datadog Amazon ECS integration, reach out to [Datadog support][8].

### Service Checks
{{< get-service-checks-from-git "amazon_ecs" >}}


## Troubleshooting

Need help? Contact [Datadog support][8].



[1]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=automaticcloudformation#setup
[2]: https://docs.datadoghq.com/integrations/amazon_web_services/#datadog-aws-iam-policy
[3]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_amazonelasticcontainerservice.html
[4]: https://app.datadoghq.com/integrations/amazon-web-services
[5]: https://app.datadoghq.com/screen/integration/82/aws-ecs
[6]: https://www.datadoghq.com/blog/monitoring-ecs-with-datadog/#get-comprehensive-visibility-with-datadog-dashboards
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_ecs/amazon_ecs_metadata.csv
[8]: https://docs.datadoghq.com/help/
[9]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_ecs/service_checks.json

