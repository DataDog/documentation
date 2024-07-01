---
"aliases":
- "/integrations/aws/"
- "/logs/aws"
- "/integrations/faq/revoking-aws-keys-and-enabling-role-delegation-for-the-datadog-aws-integration/"
- "/integrations/faq/additional-aws-metrics-min-max-sum"
- "/integrations/faq/why-am-i-only-seeing-the-average-values-of-my-custom-aws-cloudwatch-metrics/"
"categories":
- "aws"
- "cloud"
- "iot"
- "log collection"
"custom_kind": "integration"
"dependencies": []
"description": "Integrate your AWS services with Datadog."
"doc_link": "https://docs.datadoghq.com/integrations/amazon_web_services/"
"draft": false
"further_reading":
- "link": "https://www.datadoghq.com/blog/monitor-aws-control-plane-api-usage-metrics/"
  "tag": "Blog"
  "text": "Monitor AWS control plane API usage metrics in Datadog"
- "link": "https://www.datadoghq.com/blog/aws-reinvent-2022-recap/"
  "tag": "Blog"
  "text": "Highlights from AWS re:Invent 2022"
"git_integration_title": "amazon_web_services"
"has_logo": true
"integration_id": "amazon-web-services"
"integration_title": "AWS"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "amazon_web_services"
"public_title": "Datadog-AWS Integration"
"short_description": "Integrate your AWS services with Datadog."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Connect to Amazon Web Services (AWS) to:

- See automatic AWS status updates in your Events Explorer
- Get CloudWatch metrics for EC2 hosts without installing the Agent
- Tag your EC2 hosts with EC2-specific information
- See EC2 scheduled maintenance events in your stream
- Collect CloudWatch metrics and events from many other AWS products
- See CloudWatch alarms in your Events Explorer

To quickly get started using the AWS integration, check out the [AWS getting started guide][1].

Datadog's Amazon Web Services integration collects logs, events, and [all metrics from CloudWatch][2] for over [90 AWS services][3].

## Setup

Use one of the following methods to integrate your AWS accounts into Datadog for metric, event, tag, and log collection.

### Automatic

  * **CloudFormation (Best for quickly getting started)**  
      To set up the AWS integration with CloudFormation, see the [the AWS getting started guide][1].

  * **Terraform**  
      To set up the AWS integration with Terraform, see the [the AWS integration with Terraform][4].

  * **Control Tower**  
      To set up the AWS integration when provisioning a new AWS account with [Control Tower Account Factory][5], see the [Control Tower setup guide][6].

  * **Multi-Account setup for AWS Organizations**  
      To set up the AWS Integration for multiple accounts within an AWS Organization, see the [AWS Organizations setup guide][7].

{{% site-region region="gov" %}}
<div class="alert alert-warning">
  If you are using Datadog's US1-FED site, this integration must be configured with access keys. Follow the steps on the <a href="https://docs.datadoghq.com/integrations/guide/aws-manual-setup/?tab=accesskeysgovcloudorchinaonly">AWS Manual Setup Guide</a>.
</div>
{{% /site-region %}}

### Manual 

   * **Role delegation**  
      To set up the AWS integration manually with role delegation, see the [manual setup guide][8].

   * **Access keys (GovCloud or China\* Only)**  
      To set up the AWS integration with access keys, see the [manual setup guide][9].  

      *\* All use of Datadog Services in (or in connection with environments within) mainland China is subject to the disclaimer published in the [Restricted Service Locations][10] section on our website.*

{{% aws-permissions %}}

## Log collection

There are two ways of sending AWS service logs to Datadog:

- [Amazon Data Firehose destination][11]: Use the Datadog destination in your Amazon Data Firehose delivery stream to forward logs to Datadog. It is recommended to use this approach when sending logs from CloudWatch in a very high volume.
- [Forwarder Lambda function][12]: Deploy the Datadog Forwarder Lambda function, which subscribes to S3 buckets or your CloudWatch log groups and forwards logs to Datadog. Datadog also recommends you use this approach for sending logs from S3 or other resources that cannot directly stream data to Amazon Data Firehose.

## Metric collection

There are two ways to send AWS metrics to Datadog:

- [Metric polling][13]: API polling comes out of the box with the AWS integration. A metric-by-metric crawl of the CloudWatch API pulls data and sends it to Datadog. New metrics are pulled every ten minutes, on average.
- [Metric streams with Amazon Data Firehose][14]: You can use Amazon CloudWatch Metric Streams and Amazon Data Firehose to see your metrics. **Note**: This method has a two to three minute latency, and requires a separate setup.

See the [AWS Integration Billing page][15] for options to exclude specific resources for cost control.

## Resource collection

Some Datadog products leverage information about how your AWS resources (such as S3 buckets, RDS snapshots, and CloudFront distributions) are configured. Datadog collects this information by making read-only API calls to your AWS account.

### AWS Security Audit Policy

To use <a href="https://docs.datadoghq.com/integrations/amazon_web_services/#resource-collection" target="_blank">resource collection</a>, attach AWS's managed <a href="https://console.aws.amazon.com/iam/home#policies/arn:aws:iam::aws:policy/SecurityAudit" target="_blank">SecurityAudit Policy</a> to your Datadog IAM role.

**Note**: Warning messages appear on the AWS integration tile in Datadog if you enable resource collection, but do not have the AWS Security Audit Policy attached to your Datadog IAM role.

### Cloud Security Management

#### Setup

If you do not have the AWS integration set up for your AWS account, complete the [set up process][16] above. Ensure that you enable Cloud Security Management when mentioned.

**Note:** The AWS integration must be set up with **Role delegation** to use this feature.

To add Cloud Security Management to an existing AWS integration, follow the steps below to enable resource collection.

1. Provide the necessary permissions to the Datadog IAM role by attaching the AWS managed `SecurityAudit` policy to your Datadog AWS IAM role. You can find this policy in the [AWS console][17]. 

2. Complete the setup in the [Datadog AWS integration page][18] with the steps below. Alternatively, you can use the [Update an AWS Integration][8] API endpoint.

   1. Select the AWS account where you wish to enable resource collection.
   2. Go to the **Resource collection** tab for that account and enable `Cloud Security Posture Management Collection`.
   3. At the bottom right of the page, click `Save`.

## Alarm collection

There are two ways to send AWS CloudWatch alarms to the Datadog Events Explorer:

- Alarm polling: Alarm polling comes out of the box with the AWS integration and fetches metric alarms through the [DescribeAlarmHistory][19] API. If you follow this method, your alarms are categorized under the event source `Amazon Web Services`. **Note**: The crawler does not collect composite alarms. 
- SNS topic: You can see all AWS CloudWatch alarms in your Events Explorer by subscribing the alarms to an SNS topic, then forwarding the SNS messages to Datadog. To learn how to receive SNS messages as events in Datadog, see [Receive SNS messages][20]. If you follow this method, your alarms are categorized under the event source `Amazon SNS`.

## Data Collected

### Metrics
{{< get-metrics-from-git "amazon_web_services" >}}


### Events

Events from AWS are collected on a per AWS-service basis. See [your AWS service's documentation][3] to learn more about collected events.

### Tags

The following tags are collected with the AWS integration. **Note**: Some tags only display on specific metrics.

| Integration            | Datadog Tag Keys                                                                                                                                                                                              |
|------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| All                    | `region`                                                                                                                                                                                                      |
| [API Gateway][22]      | `apiid`, `apiname`, `method`, `resource`, `stage`                                                                                                                                                             |
| [App Runner][23]      | `instance`, `serviceid`, `servicename`                                                                                                                                                                       |
| [Auto Scaling][24]    | `autoscalinggroupname`, `autoscaling_group`                                                                                                                                                                   |
| [Billing][25]          | `account_id`, `budget_name`, `budget_type`, `currency`, `servicename`, `time_unit`                                                                                                                            |
| [CloudFront][26]       | `distributionid`                                                                                                                                                                                              |
| [CodeBuild][27]              | `project_name`                                                                                                                                                                                                |
| [CodeDeploy][28]       | `application`, `creator`, `deployment_config`, `deployment_group`, `deployment_option`, `deployment_type`, `status`                                                                                           |
| [DirectConnect][29]    | `connectionid`                                                                                                                                                                                                |
| [DynamoDB][30]         | `globalsecondaryindexname`, `operation`, `streamlabel`, `tablename`                                                                                                                                           |
| [EBS][31]              | `volumeid`, `volume-name`, `volume-type`                                                                                                                                                                      |
| [EC2][32]              | `autoscaling_group`, `availability-zone`, `image`, `instance-id`, `instance-type`, `kernel`, `name`, `security_group_name`                                                                                    |
| [ECS][33]              | `clustername`, `servicename`, `instance_id`                                                                                                                                                                   |
| [EFS][34]              | `filesystemid`                                                                                                                                                                                                |
| [ElastiCache][35]      | `cachenodeid`, `cache_node_type`, `cacheclusterid`, `cluster_name`, `engine`, `engine_version`, `preferred_availability-zone`, `replication_group`                                                             |
| [ElasticBeanstalk][36] | `environmentname`, `enviromentid`                                                                                                                                                                             |
| [ELB][37]              | `availability-zone`, `hostname`, `loadbalancername`, `name`, `targetgroup`                                                                                                                                    |
| [EMR][38]              | `cluster_name`, `jobflowid`                                                                                                                                                                                   |
| [ES][39]               | `dedicated_master_enabled`, `ebs_enabled`, `elasticsearch_version`, `instance_type`, `zone_awareness_enabled`                                                                                                 |
| [Firehose][40]         | `deliverystreamname`                                                                                                                                                                                          |
| [FSx][41]             | `filesystemid`, `filesystemtype`                                                                                                                                                                               |
| [Health][42]           | `event_category`, `status`, `service`                                                                                                                                                                         |
| [IoT][43]              | `actiontype`, `protocol`, `rulename`                                                                                                                                                                          |
| [Kinesis][44]          | `streamname`, `name`, `state`                                                                                                                                                                                 |
| [KMS][45]              | `keyid`                                                                                                                                                                                                       |
| [Lambda][46]           | `functionname`, `resource`, `executedversion`, `memorysize`, `runtime`                                                                                                                                        |
| [Machine Learning][47] | `mlmodelid`, `requestmode`                                                                                                                                                                                    |
| [MQ][48]               | `broker`, `queue`, `topic`                                                                                                                                                                                    |
| [OpsWorks][49]         | `stackid`, `layerid`, `instanceid`                                                                                                                                                                            |
| [Polly][50]            | `operation`                                                                                                                                                                                                   |
| [RDS][51]              | `auto_minor_version_upgrade`, `dbinstanceclass`, `dbclusteridentifier`, `dbinstanceidentifier`, `dbname`, `engine`, `engineversion`, `hostname`, `name`, `publicly_accessible`, `secondary_availability-zone` |
| [RDS Proxy][52]       | `proxyname`, `target`, `targetgroup`, `targetrole`                                                                                                                                                                                                  |
| [Redshift][53]       | `clusteridentifier`, `latency`, `nodeid`, `service_class`, `stage`, `wlmid`                                                                                                                                   |
| [Route 53][54]        | `healthcheckid`                                                                                                                                                                                               |
| [S3][55]             | `bucketname`, `filterid`, `storagetype`                                                                                                                                                                       |
| [SES][56]             | Tag keys are custom set in AWS.                                                                                                                                                                               |
| [SNS][57]              | `topicname`                                                                                                                                                                                                   |
| [SQS][58]              | `queuename`                                                                                                                                                                                                   |
| [VPC][59]              | `nategatewayid`, `vpnid`, `tunnelipaddress`                                                                                                                                                                   |
| [WorkSpaces][60]       | `directoryid`, `workspaceid`                                                                                                                                                                                  |

### Service Checks
{{< get-service-checks-from-git "amazon_web_services" >}}


## Troubleshooting

See the [AWS Integration Troubleshooting guide][62] to resolve issues related to the AWS integration.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/getting_started/integrations/aws/
[2]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/aws-services-cloudwatch-metrics.html
[3]: https://docs.datadoghq.com/integrations/#cat-aws
[4]: https://docs.datadoghq.com/integrations/guide/aws-terraform-setup
[5]: https://docs.aws.amazon.com/controltower/latest/userguide/account-factory.html
[6]: https://aws.amazon.com/blogs/awsmarketplace/deploy-datadogs-aws-integration-accounts-aws-control-tower-account-factory-customization/
[7]: https://docs.datadoghq.com/integrations/guide/aws-organizations-setup/
[8]: https://docs.datadoghq.com/integrations/guide/aws-manual-setup/
[9]: https://docs.datadoghq.com/integrations/guide/aws-manual-setup/?tab=accesskeysgovcloudorchinaonly
[10]: https://www.datadoghq.com/legal/restricted-service-locations/
[11]: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination/
[12]: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[13]: https://docs.datadoghq.com/integrations/guide/cloud-metric-delay/#aws
[14]: https://docs.datadoghq.com/integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/
[15]: https://docs.datadoghq.com/account_management/billing/aws/
[16]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=roledelegation#setup
[17]: https://console.aws.amazon.com/iam/home#policies/arn:aws:iam::aws:policy/SecurityAudit
[18]: https://app.datadoghq.com/integrations/amazon-web-services
[19]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/APIReference/API_DescribeAlarmHistory.html#API_DescribeAlarmHistory_RequestParameters
[20]: https://docs.datadoghq.com/integrations/amazon_sns/#receive-sns-messages
[21]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_web_services/amazon_web_services_metadata.csv
[22]: https://docs.datadoghq.com/integrations/amazon_api_gateway/
[23]: https://docs.datadoghq.com/integrations/amazon_app_runner
[24]: https://docs.datadoghq.com/integrations/amazon_auto_scaling/
[25]: https://docs.datadoghq.com/integrations/amazon_billing/
[26]: https://docs.datadoghq.com/integrations/amazon_cloudfront/
[27]: https://docs.datadoghq.com/integrations/amazon_codebuild/
[28]: https://docs.datadoghq.com/integrations/amazon_codedeploy/
[29]: https://docs.datadoghq.com/integrations/amazon_directconnect/
[30]: https://docs.datadoghq.com/integrations/amazon_dynamodb/
[31]: https://docs.datadoghq.com/integrations/amazon_ebs/
[32]: https://docs.datadoghq.com/integrations/amazon_ec2/
[33]: https://docs.datadoghq.com/integrations/amazon_ecs/
[34]: https://docs.datadoghq.com/integrations/amazon_efs/
[35]: https://docs.datadoghq.com/integrations/amazon_elasticache/
[36]: https://docs.datadoghq.com/integrations/amazon_elasticbeanstalk/
[37]: https://docs.datadoghq.com/integrations/amazon_elb/
[38]: https://docs.datadoghq.com/integrations/amazon_emr/
[39]: https://docs.datadoghq.com/integrations/amazon_es/
[40]: https://docs.datadoghq.com/integrations/amazon_firehose/
[41]: https://docs.datadoghq.com/integrations/amazon_fsx/
[42]: https://docs.datadoghq.com/integrations/amazon_health/
[43]: https://docs.datadoghq.com/integrations/amazon_iot/
[44]: https://docs.datadoghq.com/integrations/amazon_kinesis/
[45]: https://docs.datadoghq.com/integrations/amazon_kms/
[46]: https://docs.datadoghq.com/integrations/amazon_lambda/
[47]: https://docs.datadoghq.com/integrations/amazon_machine_learning/
[48]: https://docs.datadoghq.com/integrations/amazon_mq/
[49]: https://docs.datadoghq.com/integrations/amazon_ops_works/
[50]: https://docs.datadoghq.com/integrations/amazon_polly/
[51]: https://docs.datadoghq.com/integrations/amazon_rds/
[52]: https://docs.datadoghq.com/integrations/amazon_rds_proxy/
[53]: https://docs.datadoghq.com/integrations/amazon_redshift/
[54]: https://docs.datadoghq.com/integrations/amazon_route53/
[55]: https://docs.datadoghq.com/integrations/amazon_s3/
[56]: https://docs.datadoghq.com/integrations/amazon_ses/
[57]: https://docs.datadoghq.com/integrations/amazon_sns/
[58]: https://docs.datadoghq.com/integrations/amazon_sqs/
[59]: https://docs.datadoghq.com/integrations/amazon_vpc/
[60]: https://docs.datadoghq.com/integrations/amazon_workspaces/
[61]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_web_services/service_checks.json
[62]: https://docs.datadoghq.com/integrations/guide/aws-integration-troubleshooting/

