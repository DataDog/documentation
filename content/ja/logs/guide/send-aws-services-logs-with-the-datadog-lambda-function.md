---
title: Send AWS Services Logs With The Datadog Lambda Function
kind: documentation
further_reading:
- link: /logs/explorer/
  tag: Documentation
  text: Learn how to explore your logs
- link: "/logs/explorer/#visualize"
  tag: Documentation
  text: Perform Log Analytics
- link: /logs/log_configuration/processors
  tag: Documentation
  text: Learn how to process your logs
---

AWS service logs can be collected with the Datadog Forwarder Lambda function. This Lambda—which triggers on S3 Buckets, CloudWatch log groups, and EventBridge events—forwards logs to Datadog.

To start collecting logs from your AWS services:

1. Set up the [Datadog Forwarder Lambda function][1] in your AWS account.
2. [Enable logging](#enable-logging-for-your-aws-service) for your AWS service (most AWS services can log to a S3 bucket or CloudWatch Log Group).
3. [Set up the triggers](#set-up-triggers) that cause the Forwarder Lambda to execute when there are new logs to be forwarded. There are two ways to configure the triggers.

**Note**: If you are in the AWS `us-east-1` region, leverage [Datadog-AWS Private Link][2].

**Note**: Cloudformation creates an IAM policy which includes KMS:Decrypt for all resources, and does not align with AWS Security Hub's best practice. This permission is used is to decrypt objects from KMS-encrypted S3 buckets to set up Lambda function, and which KMS key is used to encrypt the S3 buckets cannot be predicted. You can safely delete this permission after the installation successfully finished.

## Enable logging for your AWS service

Any AWS service that generates logs into a S3 bucket or a CloudWatch Log Group is supported. Find setup instructions for the most used services in the table below:

| AWS service                        | Activate AWS service logging                                                                                   | Send AWS logs to Datadog                                                                                                     |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| [API Gateway][3]                   | [Enable Amazon API Gateway logs][4]                                                                            | [Manual][5] and [automatic](#automatically-set-up-triggers) log collection.                                                  |
| [Cloudfront][6]                    | [Enable Amazon CloudFront logs][7]                                                                             | [Manual][8] and [automatic](#automatically-set-up-triggers) log collection.                                                  |
| [CloudTrail][9]                    | [Enable AWS CloudTrail logs][9]                                                                                | [Manual][10] log collection. See [AWS Configuration for Cloud SIEM][11] if you are setting up AWS CloudTrail for Cloud SIEM. |
| [DynamoDB][12]                     | [Enable Amazon DynamoDB logs][13]                                                                              | [Manual][14] log collection.                                                                                                 |
| [EC2][15]                          | `-`                                                                                                            | Use the [Datadog Agent][15] to send your logs to Datadog.                                                                    |
| [ECS][16]                          | `-`                                                                                                            | [Use the docker agent to gather your logs][17].                                                                              |
| [Elastic Load Balancing (ELB)][18] | [Enable Amazon ELB logs][19]                                                                                   | [Manual][20] and [automatic](#automatically-set-up-triggers) log collection.                                                 |
| [Lambda][21]                       | `-`                                                                                                            | [Manual][22] and [automatic](#automatically-set-up-triggers) log collection.                                                 |
| [RDS][23]                          | [Enable Amazon RDS logs][24]                                                                                   | [Manual][25] log. collection.                                                                                                |
| [Route 53][26]                     | [Enable Amazon Route 53 logs][27]                                                                              | [Manual][28] log collection.                                                                                                 |
| [S3][29]                           | [Enable Amazon S3 logs][30]                                                                                    | [Manual][31] and [automatic](#automatically-set-up-triggers) log collection.                                                 |
| [SNS][32]                          | SNS does not provide logs, but you can process logs and events that are transiting through to the SNS Service. | [Manual][33] log collection.                                                                                                 |
| [RedShift][34]                     | [Enable Amazon Redshift logs][35]                                                                              | [Manual][36] and [automatic](#automatically-set-up-triggers) log collection.                                                 |
| [Verified Access][37]              | [Enable Verified Access logs][38]                                                                              | [Manual][39] log collection.                                                                                                 |
| [VPC][40]                          | [Enable Amazon VPC logs][41]                                                                                   | [Manual][42] log collection.                                                                                                 |
| [Step Functions][52]               | [Enable Amazon Step Functions logs][53]                                                                        | [Manual][54] log collection.                                                                                                 |
| [Web Application Firewall][49]     | [Enable Amazon WAF logs][50]                                                                                   | [Manual][51] and [automatic](#automatically-set-up-triggers) log collection.                                                                                               |
| [MWAA][55]                         | [Enable Amazon MWAA logs][56]                                                                                  | [Manual][56] log collection.                                                                                                 |


## Set up triggers

There are two options when configuring triggers on the Datadog Forwarder Lambda function:

- [Automatically](#automatically-set-up-triggers): Datadog automatically retrieves the log locations for the selected AWS services and adds them as triggers on the Datadog Forwarder Lambda function. Datadog also keeps the list up to date.
- [Manually](#manually-set-up-triggers): Set up each trigger yourself.

### Automatically set up triggers

Datadog can automatically configure triggers on the Datadog Forwarder Lambda function to collect AWS logs from the following sources and locations:

| Source                      | Location       |
| --------------------------- | -------------- |
| API Gateway Access Logs     | CloudWatch     |
| API Gateway Execution Logs  | CloudWatch     |
| Application ELB Access Logs | S3             |
| Classic ELB Access Logs     | S3             |
| CloudFront Access Logs      | S3             |
| Lambda Logs                 | CloudWatch     |
| Redshift Logs               | S3             |
| S3 Access Logs              | S3             |
| Step Functions              | CloudWatch     |
| Web Application Firewall    | S3, CloudWatch |

**Note**: [Subscription filters][48] are not created automatically by the DatadogForwarder. Create them directly on a Log Group.

1. If you haven't already, set up the [Datadog log collection AWS Lambda function][1].
2. Ensure the policy of the IAM role used for [Datadog-AWS integration][43] has the following permissions. Information on how these permissions are used can be found in the descriptions below:

    ```text
    "cloudfront:GetDistributionConfig",
    "cloudfront:ListDistributions",
    "elasticloadbalancing:DescribeLoadBalancers",
    "elasticloadbalancing:DescribeLoadBalancerAttributes",
    "lambda:List*",
    "lambda:GetPolicy",
    "redshift:DescribeClusters",
    "redshift:DescribeLoggingStatus",
    "s3:GetBucketLogging",
    "s3:GetBucketLocation",
    "s3:GetBucketNotification",
    "s3:ListAllMyBuckets",
    "s3:PutBucketNotification",
    "states:ListStateMachines",
    "states:DescribeStateMachine",
    "wafv2:ListLoggingConfigurations",
    "logs:PutSubscriptionFilter",
    "logs:DeleteSubscriptionFilter",
    "logs:DescribeSubscriptionFilters"
    ```

    | AWS Permission                                              | Description                                                                  |
    | ----------------------------------------------------------- | ---------------------------------------------------------------------------- |
    | `cloudfront:GetDistributionConfig`                          | Get the name of the S3 bucket containing CloudFront access logs.             |
    | `cloudfront:ListDistributions`                              | List all CloudFront distributions.                                           |
    | `elasticloadbalancing:`<br>`DescribeLoadBalancers`          | List all load balancers.                                                     |
    | `elasticloadbalancing:`<br>`DescribeLoadBalancerAttributes` | Get the name of the S3 bucket containing ELB access logs.                    |
    | `lambda:List*`                                              | List all Lambda functions.                                                   |
    | `lambda:GetPolicy`                                          | Gets the Lambda policy when triggers are to be removed.                      |
    | `redshift:DescribeClusters`                                 | List all Redshift clusters.                                                  |
    | `redshift:DescribeLoggingStatus`                            | Get the name of the S3 bucket containing Redshift Logs.                      |
    | `s3:GetBucketLogging`                                       | Get the name of the S3 bucket containing S3 access logs.                     |
    | `s3:GetBucketLocation`                                      | Get the region of the S3 bucket containing S3 access logs.                   |
    | `s3:GetBucketNotification`                                  | Get existing Lambda trigger configurations.                                  |
    | `s3:ListAllMyBuckets`                                       | List all S3 buckets.                                                         |
    | `s3:PutBucketNotification`                                  | Add or remove a Lambda trigger based on S3 bucket events.                    |
    | `states:ListStateMachines`                                  | List all Step Functions.                                                     |
    | `states:DescribeStateMachine`                               | Get logging details about a Step Function.                                   |
    | `wafv2:ListLoggingConfigurations`                           | Lists all logging configurations of the Web Application Firewall.            |
    | `logs:PutSubscriptionFilter`                                | Add a Lambda trigger based on CloudWatch Log events                          |
    | `logs:DeleteSubscriptionFilter`                             | Remove a Lambda trigger based on CloudWatch Log events                       |
    | `logs:DescribeSubscriptionFilters`                          | Lists the subscription filters for the specified log group.                  |

3. In the [AWS Integration page][44], select the AWS Account to collect logs from and click on the **Log Collection** tab.  
   {{< img src="logs/aws/aws_log_setup_step1.png" alt="The Log Collection tab of the AWS integration page for a specific AWS account with instructions to send AWS Services logs and a textbox to autosubscribe the Forwarder Lambda function by entering the ARN of the Forwarder Lambda function" popup="true" style="width:90%;" >}}
4. Enter the ARN of the Lambda created in the previous section and click **Add**.
5. Select the services from which you'd like to collect logs and click **Save**. To stop collecting logs from a particular service, deselect the log source.
   {{< img src="logs/aws/aws_log_setup_step2.png" alt="The Log Collection tab of the AWS integration page for a specific AWS account with one Lambda function successfully entered under Included ARNs and some of the services enabled under Log Sources" popup="true" style="width:90%;" >}}
6. If you have logs across multiple regions, you must create additional Lambda functions in those regions and enter them in this page.
7. To stop collecting all AWS logs, hover over a Lambda and click the Delete icon. All triggers for that function are removed.
8. Within a few minutes of this initial setup, your AWS Logs appear in the Datadog [Log Explorer][45].

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
resource "aws_cloudwatch_log_subscription_filter" "datadog_log_subscription_filter" {
  name            = "datadog_log_subscription_filter"
  log_group_name  = <CLOUDWATCH_LOG_GROUP_NAME> # for example, /aws/lambda/my_lambda_name
  destination_arn = <DATADOG_FORWARDER_ARN> # for example,  arn:aws:lambda:us-east-1:123:function:datadog-forwarder
  filter_pattern  = ""
}
```

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
[26]: /integrations/amazon_route53/
[27]: /integrations/amazon_route53/#enable-route53-logging
[28]: /integrations/amazon_route53/#send-logs-to-datadog
[29]: /integrations/amazon_s3/
[30]: /integrations/amazon_s3/#enable-s3-access-logs
[31]: /integrations/amazon_s3/#manual-installation-steps
[32]: /integrations/amazon_sns/
[33]: /integrations/amazon_sns/#send-logs-to-datadog
[34]: /integrations/amazon_redshift/
[35]: /integrations/amazon_redshift/#enable-aws-redshift-logging
[36]: /integrations/amazon_redshift/#log-collection
[37]: /integrations/aws_verified_access/
[38]: /integrations/aws_verified_access/#enable-verified-access-logs
[39]: /integrations/aws_verified_access/#log-collection
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
