---
title: Send AWS services logs with the Datadog Lambda function
kind: documentation
further_reading:
- link: "/logs/explorer/"
  tag: "Documentation"
  text: "Learn how to explore your logs"
- link: "/logs/explorer/analytics/"
  tag: "Documentation"
  text: "Perform Log Analytics"
- link: "/logs/processing/"
  tag: "Documentation"
  text: "Learn how to process your logs"
---

AWS service logs can be collected with the Datadog Forwarder Lambda function. This Lambda—which triggers on S3 Buckets, CloudWatch log groups, and CloudWatch events—forwards logs to Datadog.

To start collecting logs from your AWS services:

1. Set up the Datadog Forwarder Lambda function in your AWS account by following the instructions in the [DataDog/datadog-serverless-functions Github repository][1].
2. [Enable logging](#enable-logging-for-your-aws-service) for your AWS service (most AWS services can log to a S3 bucket or CloudWatch Log Group).
3. Configure the triggers that cause the Lambda to execute. There are two ways to configure the triggers:

    - [Automatically](#automatically-setup-triggers): Datadog automatically retrieves the logs for the selected AWS services and adds them as triggers on the Datadog Lambda function. Datadog also keeps the list up to date.
    - [Manually](#manually-setup-triggers): Set up each trigger yourself via the AWS console.

**Note**: If you are in AWS us-east-1 region, [leverage Datadog-AWS Private Link][2] to forward your logs to Datadog. If you do so, your forwarder function [must have the `VPCLambdaExecutionRole` permission][3].


## Send AWS service logs to Datadog

There are two options when configuring triggers on the Datadog Lambda function:

- Manually set up triggers on S3 buckets, CloudWatch Log Groups, or CloudWatch Events.
- Let Datadog automatically set and manage the list of triggers.

### Automatically set up triggers

If you are storing logs in many S3 buckets or CloudWatch Log groups, Datadog can automatically manage triggers for you.

1. If you haven't already, set up the [Datadog log collection AWS Lambda function][4].
2. Ensure the [policy](#datadog-aws-iam-policy) of the IAM role used for Datadog-AWS integration has the following permissions. Information on how these permissions are used can be found in the descriptions below:

    ```text
    "cloudfront:GetDistributionConfig",
    "cloudfront:ListDistributions",
    "elasticloadbalancing:DescribeLoadBalancers",
    "elasticloadbalancing:DescribeLoadBalancerAttributes",
    "lambda:List*",
    "lambda:AddPermission",
    "lambda:GetPolicy",
    "lambda:RemovePermission",
    "redshift:DescribeClusters",
    "redshift:DescribeLoggingStatus",
    "s3:GetBucketLogging",
    "s3:GetBucketLocation",
    "s3:GetBucketNotification",
    "s3:ListAllMyBuckets",
    "s3:PutBucketNotification",
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
    | `lambda:List*`                                              | List all Lambda functions. |
    | `lambda:AddPermission`                                      | Add permission allowing a particular S3 bucket to trigger a Lambda function. |
    | `lambda:GetPolicy`                                          | Gets the Lambda policy when triggers are to be removed.                      |
    | `lambda:RemovePermission`                                   | Remove permissions from a Lambda policy.                                     |
    | `redshift:DescribeClusters`                                 | List all Redshift clusters.                                                  |
    | `redshift:DescribeLoggingStatus`                            | Get the name of the S3 bucket containing Redshift Logs.                      |
    | `s3:GetBucketLogging`                                       | Get the name of the S3 bucket containing S3 access logs.                     |
    | `s3:GetBucketLocation`                                      | Get the region of the S3 bucket containing S3 access logs.                   |
    | `s3:GetBucketNotification`                                  | Get existing Lambda trigger configurations.                                  |
    | `s3:ListAllMyBuckets`                                       | List all S3 buckets.                                                         |
    | `s3:PutBucketNotification`                                  | Add or remove a Lambda trigger based on S3 bucket events.                    |
    | `logs:PutSubscriptionFilter`                                | Add a Lambda trigger based on CloudWatch Log events                          |
    | `logs:DeleteSubscriptionFilter`                             | Remove a Lambda trigger based on CloudWatch Log events                       |
    | `logs:DescribeSubscriptionFilters`                          | Lists the subscription filters for the specified log group.                  |

3. Navigate to the _Collect Logs_ tab in the [AWS Integration tile][5].
4. Select the AWS Account from where you want to collect logs, and enter the ARN of the Lambda created in the previous section.
   {{< img src="logs/aws/AWSLogStep1.png" alt="Enter Lambda" popup="true" style="width:80%;" >}}
5. Select the services from which you'd like to collect logs and hit save. To stop collecting logs from a particular service, uncheck it.
   {{< img src="logs/aws/AWSLogStep2.png" alt="Select services" popup="true" style="width:80%;" >}}
6. If you have logs across multiple regions, you must create additional Lambda functions in those regions and enter them in this tile.
7. To stop collecting all AWS logs, press the _x_ next to each Lambda ARN. All triggers for that function are removed.
8. Within a few minutes of this initial setup, your AWS Logs appear in your Datadog [log explorer page][6] in near real time.

## Manually set up triggers

### Collecting logs from CloudWatch Log Group

If you are storing logs in a CloudWatch Log Group, send them to Datadog as follows:

1. If you haven't already, set up the [Datadog log collection AWS Lambda function][4].
2. Once the lambda function is installed, manually add a trigger on the CloudWatch Log Group that contains your logs in the AWS console:

{{< img src="integrations/amazon_cloudwatch/cloudwatch_log_collection_1.png" alt="cloudwatch log group" popup="true" style="width:70%;">}}

Select the corresponding CloudWatch Log Group, add a filter name (but feel free to leave the filter empty) and add the trigger:
{{< img src="integrations/amazon_cloudwatch/cloudwatch_log_collection_2.png" alt="cloudwatch trigger" popup="true" style="width:70%;">}}

Once done, go into your [Datadog Log section][6] to start exploring your logs.

For Terraform users, you can provision and manage your triggers using the [aws_cloudwatch_log_subscription_filter][7] resource. See sample code below.

```text
resource "aws_cloudwatch_log_subscription_filter" "datadog_log_subscription_filter" {
  name            = "datadog_log_subscription_filter"
  log_group_name  = <CLOUDWATCH_LOG_GROUP_NAME> # e.g., /aws/lambda/my_lambda_name
  destination_arn = <DATADOG_FORWARDER_ARN> # e.g., arn:aws:lambda:us-east-1:123:function:datadog-forwarder
  filter_pattern  = ""
}
```

For Serverless Framework, SAM, and CloudFormation users, you can provision and manage your triggers using the CloudFormation [AWS::Logs::SubscriptionFilter][109] resource. See sample code below. For Serverless Framework users, you need to put the code snippet under the [resources][110] section within your `serverless.yml`.

```yaml
Resources:
  MyLogSubscriptionFilter:
    Type: "AWS::Logs::SubscriptionFilter"
    Properties:
      DestinationArn: "<DATADOG_FORWARDER_ARN>"
      LogGroupName: "<CLOUDWATCH_LOG_GROUP_NAME>"
      FilterPattern: ""
```

##### Collecting logs from S3 buckets

If you are storing logs in an S3 bucket, send them to Datadog as follows:

1. If you haven't already, set up the [Datadog log collection AWS Lambda function][4].
2. Once the lambda function is installed, manually add a trigger on the S3 bucket that contains your logs in the AWS console:
   {{< img src="logs/aws/adding_trigger.png" alt="Adding trigger" popup="true"style="width:80%;">}}

3. Select the bucket and then follow the AWS instructions:
   {{< img src="logs/aws/integration_lambda.png" alt="Integration Lambda" popup="true" style="width:80%;">}}

4. Set the correct event type on S3 buckets:
   {{< img src="logs/aws/object_created.png" alt="Object Created" popup="true" style="width:80%;">}}

Once done, go into your [Datadog Log section][6] to start exploring your logs!

For Terraform users, you can provision and manage your triggers using the [aws_s3_bucket_notification][8] resource. See the sample code below.

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

resource "aws_lambda_permission" "allow_bucket" {
  statement_id  = "AllowExecutionFromS3Bucket"
  action        = "lambda:InvokeFunction"
  function_name = "<DATADOG_FORWARDER_ARN>"
  principal     = "s3.amazonaws.com"
  source_arn    = "<MY_BUCKET_ARN>"
}
```

For Serverless Framework, SAM, and CloudFormation users, you can configure triggers using the CloudFormation [NotificationConfiguration][9] for your S3 bucket. See the sample code below. For Serverless Framework users, you need to put the code snippet under the [resources][10] section within your `serverless.yml`.

```yaml
Resources:
  Bucket:
    Type: AWS::S3::Bucket
    DependsOn: BucketPermission
    Properties:
      BucketName: "<MY_BUCKET>"
      NotificationConfiguration:
        LambdaConfigurations:
        - Event: 's3:ObjectCreated:*'
          Function: "<DATADOG_FORWARDER_ARN>"
  BucketPermission:
    Type: AWS::Lambda::Permission
    Properties:
      Action: 'lambda:InvokeFunction'
      FunctionName: "<DATADOG_FORWARDER_ARN>"
      Principal: s3.amazonaws.com
      SourceArn: <MY_BUCKET_ARN>
      SourceAccount: !Ref "AWS::AccountId"
```

### Enable logging for your AWS service

Any AWS service that generates logs into a S3 bucket or a CloudWatch Log Group is supported. Find specific setup instructions for the most used services in the table below:

| AWS service                        | Activate AWS service logging                                                                    | Send AWS logs to Datadog                                                    |
| ---------------------------------- | ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| [API Gateway][11]                  | [Enable AWS API Gateway logs][12]                                                               | [Manual][13] log collection                                                 |
| [Cloudfront][14]                   | [Enable AWS Cloudfront logs][15]                                                                | [Manual][16] and [automatic](#automatically-setup-triggers) log collection  |
| [Cloudtrail][11]                   | [Enable AWS Cloudtrail logs][17]                                                                | [Manual][18] log collection                                                 |
| [DynamoDB][19]                     | [Enable AWS DynamoDB logs][20]                                                                  | [Manual][21] log collection                                                 |
| [EC2][22]                          | `-`                                                                                             | Use the [Datadog Agent][22] to send your logs to Datadog                    |
| [ECS][23]                          | `-`                                                                                             | [Use the docker agent to gather your logs][24]                              |
| [Elastic Load Balancing (ELB)][25] | [Enable AWS ELB logs][26]                                                                       | [Manual][27] and [automatic](#automatically-setup-triggers) log collection  |
| [Lambda][28]                       | `-`                                                                                             | [Manual][29] and [automatic](#automatically-setup-triggers) log collection |
| [RDS][30]                         | [Enable AWS RDS logs][31]                                                                      | [Manual][32] log collection                                                |
| [Route 53][33]                    | [Enable AWS Route 53 logs][34]                                                                 | [Manual][35] log collection                                                |
| [S3][36]                          | [Enable AWS S3 logs][37]                                                                       | [Manual][38] and [automatic](#automatically-setup-triggers) log collection |
| [SNS][39]                         | There is no "SNS Logs". Process logs and events that are transiting through to the SNS Service. | [Manual][40] log collection                                                |
| [RedShift][41]                    | [Enable AWS Redshift logs][42]                                                                 | [Manual][43] and [automatic](#automatically-setup-triggers) log collection |
| [VPC][44]                         | [Enable AWS VPC logs][45]                                                                      | [Manual][46] log collection                                                |




[1]: https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/logs_monitoring#installation
[2]: /agent/guide/private-link/?tab=logs
[3]: https://docs.aws.amazon.com/lambda/latest/dg/lambda-intro-execution-role.html
[4]: /integrations/amazon_web_services/#log-collection
[5]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[6]: https://app.datadoghq.com/logs
[7]: https://www.terraform.io/docs/providers/aws/r/cloudwatch_log_subscription_filter.html
[8]: https://www.terraform.io/docs/providers/aws/r/s3_bucket_notification.html
[9]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-notificationconfig.html
[10]: https://serverless.com/framework/docs/providers/aws/guide/resources/
[11]: /integrations/amazon_api_gateway/
[12]: /integrations/amazon_api_gateway/#log-collection
[13]: /integrations/amazon_api_gateway/#send-logs-to-datadog
[14]: /integrations/amazon_cloudfront/
[15]: /integrations/amazon_cloudfront/#enable-cloudfront-logging
[16]: /integrations/amazon_cloudfront/#send-logs-to-datadog
[17]: /integrations/amazon_cloudtrail/#enable-cloudtrail-logging
[18]: /integrations/amazon_cloudtrail/#send-logs-to-datadog
[19]: /integrations/amazon_dynamodb/#enable-dynamodb-logging
[20]: /integrations/amazon_dynamodb/
[21]: /integrations/amazon_dynamodb/#send-logs-to-datadog
[22]: /integrations/amazon_ec2/
[23]: /integrations/amazon_ecs/
[24]: /integrations/amazon_ecs/#log-collection
[25]: /integrations/amazon_elb/
[26]: /integrations/amazon_elb/#enable-aws-elb-logging
[27]: /integrations/amazon_elb/#manual-installation-steps
[28]: /integrations/amazon_lambda/
[29]: /integrations/amazon_lambda/#log-collection
[30]: /integrations/amazon_rds/
[31]: /integrations/amazon_rds/#enable-rds-logging
[32]: /integrations/amazon_rds/#send-logs-to-datadog
[33]: /integrations/amazon_route53/
[34]: /integrations/amazon_route53/#enable-route53-logging
[35]: /integrations/amazon_route53/#send-logs-to-datadog
[36]: /integrations/amazon_s3/
[37]: /integrations/amazon_s3/#enable-s3-access-logs
[38]: /integrations/amazon_s3/#manual-installation-steps
[39]: /integrations/amazon_sns/
[40]: /integrations/amazon_sns/#send-logs-to-datadog
[41]: /integrations/amazon_redshift/
[42]: /integrations/amazon_redshift/#enable-aws-redshift-logging
[43]: /integrations/amazon_redshift/#log-collection
[44]: /integrations/amazon_vpc/
[45]: /integrations/amazon_vpc/#enable-vpc-flow-log-logging
[46]: /integrations/amazon_vpc/#log-collection
