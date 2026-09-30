---
title: Send AWS Services Logs With The Datadog Lambda Function
further_reading:
- link: "https://learn.datadoghq.com/courses/send-aws-logs"
  tag: "Learning Center"
  text: "Send AWS Logs"
- link: "https://learn.datadoghq.com/courses/visibility-aws-lambda"
  tag: "Learning Center"
  text: "Configure AWS Lambda for Serverless Monitoring with Datadog"
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
2. Enable logging for your AWS service. Find your service in [Supported AWS services](#supported-aws-services) to see its setup instructions. Most AWS services can log to a S3 bucket or a CloudWatch log group.
3. [Set up the triggers](#set-up-triggers) that cause the Forwarder Lambda to execute when there are new logs to be forwarded. There are two ways to configure the triggers.

**Notes**:
   - You can use [AWS PrivateLink][2] to send your logs over a private connection.
   - CloudFormation creates an IAM policy which includes `KMS:Decrypt` for all resources, and does not align with AWS Security Hub's best practice. This permission is used to decrypt objects from KMS-encrypted S3 buckets to set up the Lambda function, and the KMS key used to encrypt the S3 buckets cannot be predicted. You can safely delete this permission after the installation finishes successfully.

## Supported AWS services

The Datadog Forwarder Lambda function supports any AWS service that generates logs into a S3 bucket or a CloudWatch log group. The following table lists the services it can collect:

- **AWS service**: The AWS service that generates the logs. Each service name links to its log collection setup instructions. Services without a link require no service-side setup.
- **Log source**: The `source` tag Datadog applies to the logs. Use it to find your logs in the [Log Explorer][40].
- **Storage**: Where the AWS service can write logs that the Forwarder collects.
- **Automatic collection**: Whether Datadog can [automatically set up the triggers](#automatically-set-up-triggers) for that log source. If not, [set up the triggers manually](#manually-set-up-triggers).

| AWS service                        | Log source                    | Storage        | Automatic collection |
| ---------------------------------- | ----------------------------- | -------------- | -------------------- |
| [API Gateway][3]                   | `source:apigateway`           | CloudWatch, S3 | Yes                  |
| [AppSync][4]                       | `source:appsync`              | CloudWatch     | Yes                  |
| Batch                              | `source:batch`                | CloudWatch     | Yes                  |
| [Bedrock][5]                       | `source:bedrock`              | CloudWatch, S3 | No                   |
| Bedrock Agentcore                  | `source:bedrock-agentcore`    | CloudWatch, S3 | Yes                  |
| [CloudFront][6]                    | `source:cloudfront`           | CloudWatch, S3 | Yes                  |
| [CloudTrail][7]                    | `source:cloudtrail`           | CloudWatch, S3 | Yes                  |
| [CodeBuild][8]                     | `source:codebuild`            | CloudWatch, S3 | Yes                  |
| [DMS][9]                           | `source:dms`                  | CloudWatch, S3 | Yes                  |
| [DocumentDB][10]                   | `source:docdb`                | CloudWatch, S3 | Yes                  |
| [ECS][11]                          | `source:ecs`                  | CloudWatch     | Yes                  |
| [EKS][12]                          | `source:eks` <sup>1</sup>     | CloudWatch     | Yes                  |
| [Elastic Beanstalk][13]            | - <sup>2</sup>                | CloudWatch     | Yes                  |
| [Elastic Load Balancing (ELB)][14] | `source:elb`                  | CloudWatch, S3 | Yes                  |
| [FSx][15]                          | `source:aws.fsx`              | CloudWatch, S3 | No                   |
| [Glue][16]                         | `source:glue`                 | CloudWatch, S3 | Yes                  |
| [IoT][17]                          | `source:iot`                  | CloudWatch     | Partial <sup>3</sup> |
| [Lambda][18]                       | `source:lambda`               | CloudWatch     | Yes                  |
| Lambda@Edge                        | `source:lambda`               | CloudWatch     | Yes                  |
| [MWAA][19]                         | `source:mwaa`                 | CloudWatch     | Yes                  |
| [Network Firewall][20]             | `source:network-firewall`     | CloudWatch, S3 | Yes                  |
| [OpenSearch][21]                   | `source:opensearch`           | CloudWatch     | No                   |
| [PCS][22]                          | - <sup>2</sup>                | CloudWatch     | Partial <sup>4</sup> |
| [RDS][23]                          | `source:rds` <sup>5</sup>     | CloudWatch     | Yes                  |
| [Redshift][24]                     | `source:redshift`             | CloudWatch, S3 | Yes                  |
| Redshift Serverless                | `source:redshift-serverless`  | CloudWatch     | Yes                  |
| [Route 53][25]                     | `source:route53` <sup>6</sup> | CloudWatch     | Yes                  |
| [S3][26]                           | `source:s3`                   | S3             | Yes                  |
| SSM                                | `source:ssm`                  | CloudWatch     | Yes                  |
| [Step Functions][27]               | `source:stepfunction`         | CloudWatch     | Yes                  |
| [Transit Gateway][28]              | `source:transitgateway`       | CloudWatch, S3 | No                   |
| [Verified Access][29]              | `source:verified-access`      | CloudWatch, S3 | Yes                  |
| [VPC][30]                          | `source:vpc`                  | CloudWatch, S3 | Yes                  |
| [VPN][31]                          | - <sup>2</sup>                | CloudWatch, S3 | Yes <sup>7</sup>     |
| [Web Application Firewall][32]     | `source:waf`                  | S3             | Yes                  |

<sup>1</sup> EKS control plane logs also use the `kubernetes.audit`, `kube-scheduler`, `kube-apiserver`, `kube-controller-manager`, and `aws-iam-authenticator` sources.<br>
<sup>2</sup> Datadog does not apply a service-specific source tag to these logs.<br>
<sup>3</sup> Automatic collection for IoT is available at the account level only.<br>
<sup>4</sup> Automatic collection for PCS is available for CloudWatch log groups only.<br>
<sup>5</sup> RDS engine logs also use the `postgresql`, `mariadb`, and `mysql` sources.<br>
<sup>6</sup> Covers both DNS query logs and Resolver query logs.<br>
<sup>7</sup> Automatic collection is available for CloudWatch log groups. For S3 buckets, [set up the trigger manually](#collecting-logs-from-s3-buckets).

**Note**: The Datadog Forwarder automatically creates [subscription filters][43] on CloudWatch log groups. Each filter is named in the format `DD_LOG_SUBSCRIPTION_FILTER_<LOG_GROUP_NAME>`.

### Services collected through another method

The following AWS services are supported for log collection, but do not use the Datadog Forwarder Lambda function in the same way:

| AWS service    | How logs are collected                                                                                                                         |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| [DynamoDB][33] | DynamoDB does not generate its own logs. API activity is captured through CloudTrail. See [Send logs to Datadog][34].                           |
| [EC2][35]      | Use the [Datadog Agent][35] to send your logs to Datadog.                                                                                      |
| [SNS][36]      | SNS does not provide logs, but you can process logs and events that are transiting through to the SNS service. See [Send logs to Datadog][37].  |

## Set up triggers

There are two options when configuring triggers on the Datadog Forwarder Lambda function:

- [Automatically](#automatically-set-up-triggers): Datadog automatically retrieves the log locations for the selected AWS services and adds them as triggers on the Datadog Forwarder Lambda function. Datadog also keeps the list up to date.
- [Manually](#manually-set-up-triggers): Set up each trigger yourself.

### Automatically set up triggers

Datadog can automatically configure triggers on the Datadog Forwarder Lambda function to collect AWS logs. However, automatic subscription does not support creating triggers across different AWS accounts or regions. For scenarios where logs are published to S3 buckets in a separate account, we recommend manually creating a trigger in the same account as the bucket to work around this limitation.

To see which services support automatic collection, and the storage locations they support, see [Supported AWS services](#supported-aws-services).

1. If you haven't already, set up the [Datadog log collection AWS Lambda function][1].
2. Ensure the policy of the IAM role used for [Datadog-AWS integration][38] has the following permissions. Information on how these permissions are used can be found in the descriptions below:

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
    "elasticbeanstalk:DescribeEnvironments",
    "elasticloadbalancing:DescribeLoadBalancerAttributes",
    "elasticloadbalancing:DescribeLoadBalancers",
    "glue:BatchGetJobs",
    "glue:GetJobs",
    "glue:GetJob",
    "glue:ListJobs",
    "iot:GetV2LoggingOptions",
    "lambda:GetPolicy",
    "lambda:InvokeFunction",
    "lambda:List*",
    "logs:DeleteSubscriptionFilter",
    "logs:DescribeDeliveries",
    "logs:DescribeDeliverySources",
    "logs:DescribeLogGroups",
    "logs:DescribeSubscriptionFilters",
    "logs:GetDeliveryDestination",
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
    | `glue:BatchGetJobs`                                             | Get information about multiple Glue jobs.                                    |
    | `glue:GetJob`                                               | Get information about a Glue job.                                            |
    | `glue:GetJobs`                                              | List all Glue jobs.                                                          |
    | `glue:ListJobs`                                             | List all Glue job names.                                                     |
    | `eks:DescribeCluster`                                       | Describe an EKS cluster.                                                     |
    | `eks:ListClusters`                                          | List all EKS clusters.                                                       |
    | `elasticbeanstalk:DescribeEnvironments`                     | List all Elastic Beanstalk environments.                                     |
    | `iot:GetV2LoggingOptions`                                   | Get IoT V2 logging options.                                                  |
    | `lambda:InvokeFunction`                                     | Invoke a Lambda function.                                                    |
    | `lambda:List*`                                              | List all Lambda functions.                                                   |
    | `lambda:GetPolicy`                                          | Get the Lambda policy when triggers are to be removed.                       |
    | `logs:PutSubscriptionFilter`                                | Add a Lambda trigger based on CloudWatch Log events.                         |
    | `logs:DeleteSubscriptionFilter`                             | Remove a Lambda trigger based on CloudWatch Log events.                      |
    | `logs:DescribeLogGroups`                                    | Describe CloudWatch log groups.                                              |
    | `logs:DescribeDeliveries`                                   | Describe CloudWatch log deliveries.                                          |
    | `logs:DescribeDeliverySources`                              | Describe CloudWatch log delivery sources.                                    |
    | `logs:DescribeSubscriptionFilters`                          | List the subscription filters for the specified log group.                   |
    | `logs:GetDeliveryDestination`                               | Get a CloudWatch log delivery destination.                                   |
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


3. In the [AWS Integration page][39], select the AWS Account to collect logs from and click on the {{< ui >}}Log Collection{{< /ui >}} tab.
4. In the {{< ui >}}Datadog Forwarder Lambda{{< /ui >}} section, enter the ARN of the Lambda created in the previous section and click {{< ui >}}Add{{< /ui >}}. The Lambda function appears in the table below with its name, version, and region.
5. In the {{< ui >}}Log Autosubscription{{< /ui >}} section, under {{< ui >}}Log Sources{{< /ui >}}, enable the services from which you'd like to collect logs by toggling them on. To stop collecting logs from a particular service, toggle the log source off.
6. (Optional) In the {{< ui >}}Log Source Tag Filters{{< /ui >}} section, you can filter log collection by resource tags for each log source. Select a log source from the dropdown menu and add tags in `key:value` format to limit which resources' logs are collected. **Note**: Resource tags are automatically lowercased to match Datadog platform conventions. Define your tag filters in lowercase to avoid mismatches.
7. If you have logs across multiple regions, you must create additional Lambda functions in those regions and add them in the **Datadog Forwarder Lambda** section.
8. To stop collecting all AWS logs from a specific Lambda function, hover over the Lambda in the table and click the delete icon. All triggers for that function are removed.
9. Within a few minutes of this initial setup, your AWS Logs appear in the Datadog [Log Explorer][40].

### Manually set up triggers

#### Collecting logs from CloudWatch log group

If you are collecting logs from a CloudWatch log group, configure the trigger to the [Datadog Forwarder Lambda function][1] using one of the following methods:

{{< tabs >}}
{{% tab "AWS console" %}}

1. In the AWS console, go to {{< ui >}}Lambda{{< /ui >}}.
2. Click {{< ui >}}Functions{{< /ui >}} and select the Datadog Forwarder.
3. Click {{< ui >}}Add trigger{{< /ui >}} and select {{< ui >}}CloudWatch Logs{{< /ui >}}.
4. Select the log group from the dropdown menu.
5. Enter a name for your filter, and optionally specify a filter pattern.
6. Click {{< ui >}}Add{{< /ui >}}.
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

You can scrub emails or IP address from logs sent by the Lambda function, or define a custom scrubbing rule [in the Lambda parameters][41].
You can also exclude or send only those logs that match a specific pattern by using the [filtering option][42].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /serverless/forwarder/
[2]: /serverless/forwarder#aws-privatelink-support
[3]: /integrations/amazon_api_gateway/#log-collection
[4]: /integrations/amazon-appsync/#send-logs-to-datadog
[5]: /integrations/amazon-bedrock/
[6]: /integrations/amazon_cloudfront/#log-collection
[7]: /integrations/amazon_cloudtrail/#send-logs-to-datadog
[8]: /integrations/amazon-codebuild/#send-logs-to-datadog
[9]: /integrations/amazon-dms/#send-logs-to-datadog
[10]: /integrations/amazon-documentdb/#send-logs-to-datadog
[11]: /containers/amazon_ecs/logs/
[12]: /integrations/amazon-eks/#log-collection
[13]: /integrations/amazon-elastic-beanstalk/
[14]: /integrations/amazon_elb/#log-collection
[15]: /integrations/amazon_fsx/#log-collection
[16]: /integrations/amazon_glue/#log-collection
[17]: /integrations/amazon-iot/#enable-logging
[18]: /integrations/amazon_lambda/#log-collection
[19]: /integrations/amazon_mwaa/#log-collection
[20]: /integrations/amazon_network_firewall/#log-collection
[21]: /integrations/amazon_es/#log-collection
[22]: /integrations/amazon-pcs/
[23]: /integrations/amazon_rds/#log-collection
[24]: /integrations/amazon-redshift/#log-collection
[25]: /integrations/amazon_route53/#send-logs-to-datadog
[26]: /integrations/amazon_s3/#enable-s3-access-logs
[27]: /integrations/amazon_step_functions/#log-collection
[28]: /integrations/amazon_transit_gateway/#log-collection
[29]: /integrations/amazon-verified-access/#log-collection
[30]: /integrations/amazon_vpc/#log-collection
[31]: /integrations/amazon-vpn/#send-logs-to-datadog
[32]: /integrations/amazon_waf/#log-collection
[33]: /integrations/amazon_dynamodb/
[34]: /integrations/amazon_dynamodb/#send-logs-to-datadog
[35]: /integrations/amazon_ec2/
[36]: /integrations/amazon_sns/
[37]: /integrations/amazon_sns/#send-logs-to-datadog
[38]: /integrations/amazon_web_services/
[39]: https://app.datadoghq.com/integrations/amazon-web-services
[40]: https://app.datadoghq.com/logs
[41]: https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/logs_monitoring#log-scrubbing-optional
[42]: https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/logs_monitoring#log-filtering-optional
[43]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters
