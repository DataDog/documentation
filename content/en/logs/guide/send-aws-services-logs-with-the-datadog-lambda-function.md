---
title: Send AWS Services Logs With The Datadog Lambda Function
further_reading:
- link: "/logs/explorer/"
  tag: "Documentation"
  text: "Learn how to explore your logs"
- link: "/logs/explorer/#visualize"
  tag: "Documentation"
  text: "Perform Log Analytics"
- link: "/logs/log_configuration/processors"
  tag: "Documentation"
  text: "Learn how to process your logs"
- link: "/logs/guide/reduce_data_transfer_fees"
  tag: "Guide"
  text: "How to send logs to Datadog while reducing data transfer fees"
---

AWS service logs can be collected with the Datadog Forwarder Lambda function. This Lambda—which triggers on S3 Buckets, CloudWatch log groups, and EventBridge events—forwards logs to Datadog.

To start collecting logs from your AWS services:

1. Set up the [Datadog Forwarder Lambda function][1] in your AWS account.
2. [Enable logging](#enable-logging-for-your-aws-service) for your AWS service (most AWS services can log to a S3 bucket or CloudWatch Log Group).
3. [Set up the triggers](#set-up-triggers) that cause the Forwarder Lambda to execute when there are new logs to be forwarded. There are two ways to configure the triggers.

**Notes**:
   - You can use [AWS PrivateLink][2] to send your logs over a private connection.
   - CloudFormation creates an IAM policy which includes `KMS:Decrypt` for all resources, and does not align with AWS Security Hub's best practice. This permission is used to decrypt objects from KMS-encrypted S3 buckets to set up the Lambda function, and the KMS key used to encrypt the S3 buckets cannot be predicted. You can safely delete this permission after the installation finishes successfully.

## Enable logging for your AWS service

Any AWS service that generates logs into a S3 bucket or a CloudWatch Log Group is supported. Find setup instructions for the most used services in the table below:

| AWS service                        | Activate AWS service logging                                                                                   | Send AWS logs to Datadog                                                                                                     |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| [API Gateway][3]                   | [Enable Amazon API Gateway logs][4]                                                                            | [Manual][5] and [automatic](#automatically-set-up-triggers) log collection.                                                  |
| [AppSync][64]                      | [Enable AWS AppSync Logs][65]                                                                                  | [Manual][65] and [automatic](#automatically-set-up-triggers) log collection.                                                  |
| Batch                              | `-`                                                                                                            | [Automatic](#automatically-set-up-triggers) log collection.                                                  |
| [Cloudfront][6]                    | [Enable Amazon CloudFront logs][7]                                                                             | [Manual][8] and [automatic](#automatically-set-up-triggers) log collection.                                                  |
| [CloudTrail][9]                    | [Enable AWS CloudTrail logs][9]                                                                                | [Manual][10] and [automatic](#automatically-set-up-triggers) log collection. See [AWS Configuration for Cloud SIEM][11] if you are setting up AWS CloudTrail for Cloud SIEM. |
| [CodeBuild][66]                    | [Enable AWS CodeBuild logs][67]                                                                                | [Manual][67] and [automatic](#automatically-set-up-triggers) log collection.                                                  |
| [DMS][68]                          | [Enable AWS Database Migration Service logs][69]                                                               | [Manual][69] and [automatic](#automatically-set-up-triggers) log collection.                                                  |
| [DocumentDB][70]                   | [Enable Amazon DocumentDB logs][71]                                                                            | [Manual][71] and [automatic](#automatically-set-up-triggers) log collection.                                                  |
| [DynamoDB][12]                     | [Enable Amazon DynamoDB logs][13]                                                                              | [Manual][14] log collection.                                                                                                 |
| [EC2][15]                          | `-`                                                                                                            | Use the [Datadog Agent][15] to send your logs to Datadog.                                                                    |
| [ECS][16]                          | `-`                                                                                                            | [Use the Docker Agent to gather your logs][17] or [automatic](#automatically-set-up-triggers) log collection.                                                                              |
| [EKS][62]                          | [Enable Amazon EKS logs][63]                                                                                   | [Manual][63] and [automatic](#automatically-set-up-triggers) log collection.                                                 |
| [Elastic Load Balancing (ELB)][18] | [Enable Amazon ELB logs][19]                                                                                   | [Manual][20] and [automatic](#automatically-set-up-triggers) log collection.                                                 |
| [Lambda][21]                       | `-`                                                                                                            | [Manual][22] and [automatic](#automatically-set-up-triggers) log collection.                                                 |
| [MWAA][55]                         | [Enable Amazon MWAA logs][56]                                                                                  | [Manual][56] and [automatic](#automatically-set-up-triggers) log collection.                                                 |
| [Network Firewall][57]             | [Enable AWS Network Firewall logs][58]                                                                         | [Manual][58] and [automatic](#automatically-set-up-triggers) log collection.                                                 |
| [RDS][23]                          | [Enable Amazon RDS logs][24]                                                                                   | [Manual][25] log collection.                                                                                                |
| [RedShift][34]                     | [Enable Amazon Redshift logs][35]                                                                              | [Manual][36] and [automatic](#automatically-set-up-triggers) log collection.                                                 |
| Redshift Serverless                | `-`                                                                                                            | [Automatic](#automatically-set-up-triggers) log collection.                                                                  |
| [Route 53][59]                     | Enable Amazon Route 53 [DNS query logging][60] and [resolver query logging][73]                                                                                                                                                  | [Manual][61] and [automatic](#automatically-set-up-triggers) log collection.                                                 |
| [S3][29]                           | [Enable Amazon S3 logs][30]                                                                                    | [Manual][31] and [automatic](#automatically-set-up-triggers) log collection.                                                 |
| [SNS][32]                          | SNS does not provide logs, but you can process logs and events that are transiting through to the SNS Service. | [Manual][33] log collection.                                                                                                 |
| SSM                                | `-`                                                                                                            | [Automatic](#automatically-set-up-triggers) log collection.                                                            |
| [Step Functions][52]               | [Enable Amazon Step Functions logs][53]                                                                        | [Manual][54] log collection.                                                                                                 |
| [Verified Access][37]              | [Enable Verified Access logs][38]                                                                              | [Manual][39] and [automatic](#automatically-set-up-triggers) log collection.                                                                                                 |
| [VPC][40]                          | [Enable Amazon VPC logs][41]                                                                                   | [Manual][42] and [automatic](#automatically-set-up-triggers) log collection.                                                                                                 |
| [VPN][26]                          | [Enable AWS VPN logs][72]                                                                                      | [Manual][27] and [automatic](#automatically-set-up-triggers) log collection.                                                                                                 |
| [Web Application Firewall][49]     | [Enable AWS WAF logs][50]                                                                                      | [Manual][51] and [automatic](#automatically-set-up-triggers) log collection.                                                 |



## Set up triggers

There are two options when configuring triggers on the Datadog Forwarder Lambda function:

- [Automatically](#automatically-set-up-triggers): Datadog automatically retrieves the log locations for the selected AWS services and adds them as triggers on the Datadog Forwarder Lambda function. Datadog also keeps the list up to date.
- [Manually](#manually-set-up-triggers): Set up each trigger yourself.

### Automatically set up triggers

Datadog can automatically configure triggers on the Datadog Forwarder Lambda function to collect AWS logs. However, automatic subscription does not support creating triggers across different AWS accounts or regions. For scenarios where logs are published to S3 buckets in a separate account, we recommend manually creating a trigger in the same account as the bucket to work around this limitation.

The following sources and locations are supported:

| Source                      | Location       |
| --------------------------- | -------------- |
| Apache Airflow (MWAA)       | CloudWatch     |
| API Gateway Access Logs     | CloudWatch     |
| API Gateway Execution Logs  | CloudWatch     |
| Application ELB Access Logs | S3             |
| AppSync Logs                | CloudWatch     |
| Batch                       | CloudWatch     |
| Classic ELB Access Logs     | S3             |
| CloudFront Access Logs      | S3             |
| Cloudtrail Logs             | S3, CloudWatch |
| CodeBuild Logs              | S3, CloudWatch |
| DMS Logs                    | CloudWatch     |
| DocumentDB Logs             | CloudWatch     |
| ECS Logs                    | CloudWatch     |
| EKS Control Plane Logs      | CloudWatch     |
| EKS Container Insights Logs | CloudWatch     |
| Lambda Logs                 | CloudWatch     |
| Lambda@Edge Logs            | Cloudwatch     |
| Network Firewall Logs       | S3, CloudWatch |
| Redshift Logs               | S3, Cloudwatch |
| Redshift Serverless Logs    | CloudWatch     |
| RDS Logs                    | CloudWatch     |
| Route53 DNS Query Logs      | CloudWatch     |
| Route53 Resolver query Logs | S3, CloudWatch |
| S3 Access Logs              | S3             |
| SSM Command Logs            | CloudWatch     |
| Step Functions              | CloudWatch     |
| Verified Access Logs        | S3, CloudWatch |
| VPC Flow Logs               | S3, CloudWatch |
| VPN Logs                    | CloudWatch     |
| Web Application Firewall    | S3, CloudWatch |

**Note**: [Subscription filters][48] are automatically created on CloudWatch log groups by the DatadogForwarder, and are named in the format `DD_LOG_SUBSCRIPTION_FILTER_<LOG_GROUP_NAME>`.

1. If you haven't already, set up the [Datadog log collection AWS Lambda function][1].
2. Ensure the policy of the IAM role used for [Datadog-AWS integration][43] has the following permissions. Information on how these permissions are used can be found in the descriptions below:

    ```text
    "airflow:GetEnvironment",
    "airflow:ListEnvironments",
    "appsync:ListGraphqlApis",
    "batch:DescribeJobDefinitions",
    "cloudfront:GetDistributionConfig",
    "cloudfront:ListDistributions",
    "cloudtrail:GetTrail",
    "cloudtrail:ListTrails",
    "codebuild:BatchGetProjects",
    "codebuild:ListProjects",
    "dms:DescribeReplicationInstances",
    "ec2:DescribeFlowLogs",
    "ec2:DescribeVerifiedAccessInstanceLoggingConfigurations",
    "ec2:DescribeVpnConnections",
    "ecs:DescribeTaskDefinition",
    "ecs:ListTaskDefinitionFamilies",
    "eks:DescribeCluster",
    "eks:ListClusters",
    "elasticloadbalancing:DescribeLoadBalancerAttributes",
    "elasticloadbalancing:DescribeLoadBalancers",
    "lambda:GetPolicy",
    "lambda:InvokeFunction",
    "lambda:List*",
    "logs:DeleteSubscriptionFilter",
    "logs:DescribeLogGroups",
    "logs:DescribeSubscriptionFilters",
    "logs:PutSubscriptionFilter",
    "network-firewall:DescribeLoggingConfiguration",
    "network-firewall:ListFirewalls",
    "rds:DescribeDBClusters",
    "rds:DescribeDBInstances",
    "redshift-serverless:ListNamespaces",
    "redshift:DescribeClusters",
    "redshift:DescribeLoggingStatus",
    "route53:ListQueryLoggingConfigs",
    "route53resolver:ListResolverQueryLogConfigs",
    "s3:GetBucketLocation",
    "s3:GetBucketLogging",
    "s3:GetBucketNotification",
    "s3:ListAllMyBuckets",
    "s3:PutBucketNotification",
    "ssm:GetServiceSetting",
    "ssm:ListCommands",
    "states:DescribeStateMachine",
    "states:ListStateMachines",
    "wafv2:ListLoggingConfigurations"
    ```

    | AWS Permission                                              | Description                                                                  |
    | ----------------------------------------------------------- | ---------------------------------------------------------------------------- |
    | `airflow:ListEnvironments`                                  | List all MWAA environment names.                                             |
    | `airflow:GetEnvironment`                                    | Get information about a MWAA environment.                                    |
    | `appsync:ListGraphqlApis`                                   | List all GraphQL Apis.                                                       |
    | `batch:DescribeJobDefinitions`                              | List all Batch job definitions.                                              |
    | `cloudfront:GetDistributionConfig`                          | Get the name of the S3 bucket containing CloudFront access logs.             |
    | `cloudfront:ListDistributions`                              | List all CloudFront distributions.                                           |
    | `cloudtrail:GetTrail`                                       | Get Trail logging information.                                               |
    | `cloudtrail:ListTrails`                                     | List all Cloudtrail trails.                                                  |
    | `codebuild:BatchGetProjects`                                | List all CodeBuild projects.                                                 |
    | `codebuild:ListProjects`                                    | Get information on CodeBuild projects.                                       |
    | `dms:DescribeReplicationInstances`                          | List all replication instances for DMS.                                      |
    | `ec2:DescribeFlowLogs`                                      | List all Flow log configurations.                                            |
    | `ec2:DescribeVerifiedAccessInstanceLoggingConfigurations`   | List all Verified Access instance logging configurations.                    |
    | `ec2:DescribeVpnConnections`                                | List all VPN connections.                                                    |
    | `ecs:DescribeTaskDefinition`                                | Describe ECS task definition.                                                |
    | `ecs:ListTaskDefinitionFamilies`                            | List all task definition families.                                           |
    | `elasticloadbalancing:`<br>`DescribeLoadBalancers`          | List all load balancers.                                                     |
    | `elasticloadbalancing:`<br>`DescribeLoadBalancerAttributes` | Get the name of the S3 bucket containing ELB access logs.                    |
    | `eks:DescribeCluster`                                       | Describe an EKS cluster.                                                     |
    | `eks:ListClusters`                                          | List all EKS clusters.                                                       |
    | `lambda:InvokeFunction`                                     | Invoke a Lambda function.                                                    |
    | `lambda:List*`                                              | List all Lambda functions.                                                   |
    | `lambda:GetPolicy`                                          | Get the Lambda policy when triggers are to be removed.                       |
    | `logs:PutSubscriptionFilter`                                | Add a Lambda trigger based on CloudWatch Log events.                         |
    | `logs:DeleteSubscriptionFilter`                             | Remove a Lambda trigger based on CloudWatch Log events.                      |
    | `logs:DescribeLogGroups`                                    | Describe CloudWatch log groups.                                              |
    | `logs:DescribeSubscriptionFilters`                          | List the subscription filters for the specified log group.                   |
    | `network-firewall:DescribeLoggingConfiguration`             | Get the logging configuration of a firewall.                                 |
    | `network-firewall:ListFirewalls`                            | List all Network Firewall firewalls.                                         |
    | `rds:DescribeDBClusters`                                    | List all RDS clusters.                                                       |
    | `rds:DescribeDBInstances`                                   | List all RDS instances.                                                      |
    | `redshift:DescribeClusters`                                 | List all Redshift clusters.                                                  |
    | `redshift:DescribeLoggingStatus`                            | Get the name of the S3 bucket containing Redshift Logs.                      |
    | `redshift-serverless:ListNamespaces`                        | List all Redshift Serverless namespaces.                                     |
    | `route53:ListQueryLoggingConfigs`                           | List all DNS query logging configurations for Route 53.                      |
    | `route53resolver:ListResolverQueryLogConfigs`               | List all Resolver query logging configurations for Route 53.                 |
    | `s3:GetBucketLogging`                                       | Get the name of the S3 bucket containing S3 access logs.                     |
    | `s3:GetBucketLocation`                                      | Get the region of the S3 bucket containing S3 access logs.                   |
    | `s3:GetBucketNotification`                                  | Get existing Lambda trigger configurations.                                  |
    | `s3:ListAllMyBuckets`                                       | List all S3 buckets.                                                         |
    | `s3:PutBucketNotification`                                  | Add or remove a Lambda trigger based on S3 bucket events.                    |
    | `ssm:GetServiceSetting`                                     | Get the SSM service setting for customer script log group name.              |
    | `ssm:ListCommands`                                          | List all SSM commands.                                                       |
    | `states:ListStateMachines`                                  | List all Step Functions.                                                     |
    | `states:DescribeStateMachine`                               | Get logging details about a Step Function.                                   |
    | `wafv2:ListLoggingConfigurations`                           | List all logging configurations of the Web Application Firewall.             |


3. In the [AWS Integration page][44], select the AWS Account to collect logs from and click on the **Log Collection** tab.
4. In the **Datadog Forwarder Lambda** section, enter the ARN of the Lambda created in the previous section and click **Add**. The Lambda function appears in the table below with its name, version, and region.
5. In the **Log Autosubscription** section, under **Log Sources**, enable the services from which you'd like to collect logs by toggling them on. To stop collecting logs from a particular service, toggle the log source off.
6. (Optional) In the **Log Source Tag Filters** section, you can filter log collection by resource tags for each log source. Select a log source from the dropdown menu and add tags in `key:value` format to limit which resources' logs are collected.
7. If you have logs across multiple regions, you must create additional Lambda functions in those regions and add them in the **Datadog Forwarder Lambda** section.
8. To stop collecting all AWS logs from a specific Lambda function, hover over the Lambda in the table and click the delete icon. All triggers for that function are removed.
9. Within a few minutes of this initial setup, your AWS Logs appear in the Datadog [Log Explorer][45].

### Manually set up triggers

#### Collecting logs from CloudWatch log group

If you are collecting logs from a CloudWatch log group, configure the trigger to the [Datadog Forwarder Lambda function][1] using one of the following methods:

{{< tabs >}}
{{% tab "AWS console" %}}

1. In the AWS console, go to **Lambda**.
2. Click **Functions** and select the Datadog Forwarder.
3. Click **Add trigger** and select **CloudWatch Logs**.
4. Select the log group from the dropdown menu.
5. Enter a name for your filter, and optionally specify a filter pattern.
6. Click **Add**.
7. Go to the [Datadog Log section][1] to explore any new log events sent to your log group.

[1]: https://app.datadoghq.com/logs
{{% /tab %}}
{{% tab "Terraform" %}}

For Terraform users, you can provision and manage your triggers using the [aws_cloudwatch_log_subscription_filter][1] resource. See sample code below.

```conf
data "aws_cloudwatch_log_group" "some_log_group" {
  name = "/some/log/group"
}

resource "aws_lambda_permission" "lambda_permission" {
  action        = "lambda:InvokeFunction"
  function_name = "datadog-forwarder" # this is the default but may be different in your case
  principal     = "logs.amazonaws.com" # or logs.amazonaws.com.cn for China*
  source_arn    = data.aws_cloudwatch_log_group.some_log_group.arn
}

resource "aws_cloudwatch_log_subscription_filter" "datadog_log_subscription_filter" {
  name            = "datadog_log_subscription_filter"
  log_group_name  = <CLOUDWATCH_LOG_GROUP_NAME> # for example, /some/log/group
  destination_arn = <DATADOG_FORWARDER_ARN> # for example,  arn:aws:lambda:us-east-1:123:function:datadog-forwarder
  filter_pattern  = ""
}
```
\*{{% mainland-china-disclaimer %}}

[1]: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_subscription_filter
{{% /tab %}}
{{% tab "CloudFormation" %}}

For AWS CloudFormation users, you can provision and manage your triggers using the CloudFormation [AWS::Logs::SubscriptionFilter][1] resource. See sample code below.

The sample code also work for AWS [SAM][2] and [Serverless Framework][3]. For Serverless Framework, put the code under the [resources][4] section within your `serverless.yml`.

```yaml
Resources:
  MyLogSubscriptionFilter:
    Type: "AWS::Logs::SubscriptionFilter"
    Properties:
      DestinationArn: "<DATADOG_FORWARDER_ARN>"
      LogGroupName: "<CLOUDWATCH_LOG_GROUP_NAME>"
      FilterPattern: ""
```

[1]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-logs-subscriptionfilter.html
[2]: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html
[3]: https://www.serverless.com/
[4]: https://www.serverless.com/framework/docs/providers/aws/guide/resources/
{{% /tab %}}
{{< /tabs >}}

#### Collecting logs from S3 buckets

If you are collecting logs from an S3 bucket, configure the trigger to the [Datadog Forwarder Lambda function][1] using one of the following methods:

{{< tabs >}}
{{% tab "AWS Console" %}}

1. Once the Lambda function is installed, manually add a trigger on the S3 bucket that contains your logs in the AWS console:
  {{< img src="logs/aws/adding_trigger.png" alt="Adding trigger" popup="true"style="width:80%;">}}

2. Select the bucket and then follow the AWS instructions:
  {{< img src="logs/aws/integration_lambda.png" alt="Integration Lambda" popup="true" style="width:80%;">}}

3. Set the correct event type on S3 buckets:
  {{< img src="logs/aws/object_created.png" alt="Object Created" popup="true" style="width:80%;">}}

Once done, go into your [Datadog Log section][1] to start exploring your logs!

[1]: https://app.datadoghq.com/logs
{{% /tab %}}
{{% tab "Terraform" %}}

For Terraform users, you can provision and manage your triggers using the [aws_s3_bucket_notification][1] resource. See the sample code below.

```conf
resource "aws_s3_bucket_notification" "my_bucket_notification" {
  bucket = my_bucket
  lambda_function {
    lambda_function_arn = "<DATADOG_FORWARDER_ARN>"
    events              = ["s3:ObjectCreated:*"]
    filter_prefix       = "AWSLogs/"
    filter_suffix       = ".log"
  }
}
```


[1]: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket_notification
{{% /tab %}}
{{% tab "CloudFormation" %}}

For CloudFormation users, you can configure triggers using the CloudFormation [NotificationConfiguration][1] for your S3 bucket. See the sample code below.

```yaml
Resources:
  Bucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: "<MY_BUCKET>"
      NotificationConfiguration:
        LambdaConfigurations:
        - Event: 's3:ObjectCreated:*'
          Function: "<DATADOG_FORWARDER_ARN>"
```


[1]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-notificationconfig.html
{{% /tab %}}
{{< /tabs >}}


## Scrubbing and filtering

You can scrub emails or IP address from logs sent by the Lambda function, or define a custom scrubbing rule [in the Lambda parameters][46].
You can also exclude or send only those logs that match a specific pattern by using the [filtering option][47].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /serverless/forwarder/
[2]: /serverless/forwarder#aws-privatelink-support
[3]: /integrations/amazon_api_gateway/
[4]: /integrations/amazon_api_gateway/#log-collection
[5]: /integrations/amazon_api_gateway/#send-logs-to-datadog
[6]: /integrations/amazon_cloudfront/
[7]: /integrations/amazon_cloudfront/#enable-cloudfront-logging
[8]: /integrations/amazon_cloudfront/#send-logs-to-datadog
[9]: /integrations/amazon_cloudtrail/#enable-cloudtrail-logging
[10]: /integrations/amazon_cloudtrail/#send-logs-to-datadog
[11]: /security/cloud_siem/guide/aws-config-guide-for-cloud-siem/
[12]: /integrations/amazon_dynamodb/#enable-dynamodb-logging
[13]: /integrations/amazon_dynamodb/
[14]: /integrations/amazon_dynamodb/#send-logs-to-datadog
[15]: /integrations/amazon_ec2/
[16]: /integrations/amazon_ecs/
[17]: /integrations/amazon_ecs/#log-collection
[18]: /integrations/amazon_elb/
[19]: /integrations/amazon_elb/#enable-aws-elb-logging
[20]: /integrations/amazon_elb/#manual-installation-steps
[21]: /integrations/amazon_lambda/
[22]: /integrations/amazon_lambda/#log-collection
[23]: /integrations/amazon_rds/
[24]: /integrations/amazon_rds/#enable-rds-logging
[25]: /integrations/amazon_rds/#send-logs-to-datadog
[26]: /integrations/amazon-vpn/
[27]: /integrations/amazon-vpn/#send-logs-to-datadog
[28]: /integrations/amazon_route53/#send-logs-to-datadog
[29]: /integrations/amazon_s3/
[30]: /integrations/amazon_s3/#enable-s3-access-logs
[31]: /integrations/amazon_s3/#manual-installation-steps
[32]: /integrations/amazon_sns/
[33]: /integrations/amazon_sns/#send-logs-to-datadog
[34]: /integrations/amazon_redshift/
[35]: /integrations/amazon-redshift/#enable-logging
[36]: /integrations/amazon-redshift/#log-collection
[37]: /integrations/amazon-verified-access/
[38]: /integrations/amazon-verified-access/#enable-verified-access-logs
[39]: /integrations/amazon-verified-access/#log-collection
[40]: /integrations/amazon_vpc/
[41]: /integrations/amazon_vpc/#enable-vpc-flow-log-logging
[42]: /integrations/amazon_vpc/#log-collection
[43]: /integrations/amazon_web_services/
[44]: https://app.datadoghq.com/integrations/amazon-web-services
[45]: https://app.datadoghq.com/logs
[46]: https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/logs_monitoring#log-scrubbing-optional
[47]: https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/logs_monitoring#log-filtering-optional
[48]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters
[49]: /integrations/amazon_waf/
[50]: /integrations/amazon_waf/#log-collection
[51]: /integrations/amazon_waf/#send-logs-to-datadog
[52]: /integrations/amazon_step_functions/
[53]: /integrations/amazon_step_functions/#log-collection
[54]: /integrations/amazon_step_functions/#send-logs-to-datadog
[55]: /integrations/amazon_mwaa/
[56]: /integrations/amazon_mwaa/#log-collection
[57]: /integrations/amazon_network_firewall/
[58]: /integrations/amazon_network_firewall/#log-collection
[59]: /integrations/amazon_route53/
[60]: /integrations/amazon_route53/#enable-route53-dns-query-logging
[61]: /integrations/amazon_route53/#send-logs-to-datadog
[62]: /integrations/amazon-eks/
[63]: /integrations/amazon-eks/#log-collection
[64]: /integrations/amazon-appsync/
[65]: /integrations/amazon-appsync/#send-logs-to-datadog
[66]: /integrations/amazon-codebuild/
[67]: /integrations/amazon-codebuild/#send-logs-to-datadog
[68]: /integrations/amazon-dms/
[69]: /integrations/amazon-dms/#send-logs-to-datadog
[70]: /integrations/amazon-documentdb/
[71]: /integrations/amazon-documentdb/#send-logs-to-datadog
[72]: /integrations/amazon-vpn/#enable-logging
[73]: /integrations/amazon_route53/#enable-route53-resolver-query-logging
