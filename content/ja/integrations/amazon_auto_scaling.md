---
"aliases":
- "/integrations/awsautoscaling/"
- "/integrations/faq/get-your-autoscaling-group-events-and-metrics/"
"categories":
- "automation"
- "aws"
- "cloud"
- "configuration & deployment"
- "log collection"
- "provisioning"
"custom_kind": "インテグレーション"
"dependencies": []
"description": "Auto Scaling グループ内のインスタンスのステータスとカウントを追跡。"
"doc_link": "https://docs.datadoghq.com/integrations/amazon_auto_scaling/"
"draft": false
"git_integration_title": "amazon_auto_scaling"
"has_logo": true
"integration_id": ""
"integration_title": "AWS Auto Scaling"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "amazon_auto_scaling"
"public_title": "Datadog-AWS Auto Scaling Integration"
"short_description": "Track the status and counts of instances in your Auto Scaling groups."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

AWS Auto Scaling is a service to launch or terminate EC2 instances automatically based on user-defined policies.

Enable this integration to see all your Auto Scaling metrics in Datadog.

- Collect EC2 metrics for hosts in Auto Scaling groups with the `autoscaling_group` tag.
- Collect Auto Scaling metrics about the specific group with the `autoscaling_group` and `autoscalinggroupname` tags.

## セットアップ

### インストール

If you haven't already, set up the [Amazon Web Services integration][1] first.

### Metric collection

1. In the Datadog [AWS integration page][2], ensure that `AutoScaling` is enabled under the `Metric Collection` tab.
2. In AWS, Auto Scaling data must be sent to CloudWatch. See [Enable Auto Scaling Group Metrics][3].
3. Add the following permissions to your [Datadog IAM policy][4] in order to collect AWS Auto Scaling metrics. For more information, see the [Auto Scaling policies][5] on the AWS website.

    | AWS Permission                          | Description                                                                                                                                                                                                                                              |
    | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | `autoscaling:DescribeAutoScalingGroups` | Used to list all Auto Scaling groups.                                                                                                                                                                                                                    |
    | `autoscaling:DescribePolicies`          | List available policies (for autocompletion in events and monitors).                                                                                                                                                                                     |
    | `autoscaling:DescribeTags`              | Used to list tags for a given Auto Scaling group. This adds ASG custom tags on ASG CloudWatch metrics.                                                                                                                                               |
    | `autoscaling:DescribeScalingActivities` | Used to generate events when an ASG scales up or down.                                                                                                                                                                                                   |
    | `autoscaling:ExecutePolicy`             | Execute one policy (scale up or down from a monitor or the events feed).<br>This is not included in the [installation Policy Document](#installation) and should only be included if you are using monitors or events to execute an Auto Scaling policy. |

4. Install the [Datadog - AWS Auto Scaling integration][6].

### Log collection

#### Enable logging

Configure AWS Auto Scaling to send logs either to a S3 bucket or to CloudWatch.

**Note**: If you log to a S3 bucket, make sure that `amazon_auto_scaling` is set as _Target prefix_.

#### Send logs to Datadog

1. If you haven’t already, set up the [Datadog Forwarder Lambda function][7].
2. Once the Lambda function is installed, manually add a trigger on the S3 bucket or CloudWatch log group that contains your AWS Auto Scaling logs in the AWS console:

    - [Add a manual trigger on the S3 bucket][8]
    - [Add a manual trigger on the CloudWatch Log Group][9]

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_auto_scaling" >}}


Each of the metrics retrieved from AWS is assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

### イベント

The AWS Auto-Scaling integration includes events for launching and terminating EC2 instances. See example events below:

{{< img src="integrations/amazon_auto_scaling/aws_auto_scaling_events.png" alt="AWS Auto-Scaling Events" >}}

### サービスチェック

The AWS Auto-Scaling integration does not include any service checks.

## トラブルシューティング

In order for the ASG metrics to start appearing in Datadog, first enable them in your AWS console. [See the AWS instructions on how to enable your ASG metrics][11]. **Note**: It may take a while for such metrics to appear after they have been enabled.

Need help? Contact [Datadog support][12].

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-instance-monitoring.html#as-enable-group-metrics
[4]: https://docs.datadoghq.com/integrations/amazon_web_services/#installation
[5]: https://docs.aws.amazon.com/autoscaling/plans/userguide/auth-and-access-control.html
[6]: https://app.datadoghq.com/integrations/amazon-auto-scaling
[7]: https://docs.datadoghq.com/logs/guide/forwarder/
[8]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[9]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[10]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_auto_scaling/amazon_auto_scaling_metadata.csv
[11]: http://docs.aws.amazon.com/autoscaling/latest/userguide/as-instance-monitoring.html#enable-detailed-instance-metrics
[12]: https://docs.datadoghq.com/help/

