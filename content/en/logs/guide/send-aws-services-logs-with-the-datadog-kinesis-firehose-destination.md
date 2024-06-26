---
title: Send AWS Services Logs with the Datadog Amazon Data Firehose Destination
kind: documentation
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
- link: https://www.datadoghq.com/blog/send-amazon-vpc-flow-logs-to-data-firehose-and-datadog/
  tag: "Blog"
  text: "Send Amazon VPC flow logs to Amazon Kinesis Data Firehose and Datadog"
---

## Overview

You can forward your AWS service logs stored in CloudWatch Log groups to an Amazon Kinesis Data Stream, for subsequent delivery through Amazon Data Firehose to one or multiple destinations. Datadog is one of the default destinations for Amazon Data Firehose Delivery streams. 

AWS fully manages Amazon Data Firehose, so you don't need to maintain any additional infrastructure or forwarding configurations for streaming logs. You can set up an Amazon Data Firehose delivery stream in the AWS Firehose console, or automatically set up the destination using a CloudFormation template.

## Setup

{{< tabs >}}
{{% tab "Amazon Data Firehose Delivery stream" %}}

Datadog recommends using a Kinesis Data Stream as input when using the Datadog destination with Amazon Data Firehose. It gives you the ability to forward your logs to multiple destinations, in case Datadog is not the only consumer for those logs. If Datadog is the only destination for your logs, or if you already have a Kinesis Data Stream with your logs, you can ignore step one.

1. Optionally, use the [Create a Data Stream][1] section of the Amazon Kinesis Data Streams developer guide in AWS to create a new Kinesis data stream. Name the stream something descriptive, like `DatadogLogStream`.
2. Go to [Amazon Data Firehose][2].  
3. Click **Create Firehose stream**.
   a. Set the source: 
      - `Amazon Kinesis Data Streams` if your logs are coming from a Kinesis Data Stream
      - `Direct PUT` if your logs are coming directly from a CloudWatch log group

   b. Set the destination as `Datadog`.  
   c. Provide a name for the delivery stream.  
   d. In the **Destination settings**, choose the `Datadog logs` HTTP endpoint URL that corresponds to your [Datadog site][5].  
   e. Paste your API key into the **API key** field. You can get or create an API key from the [Datadog API Keys page][3].  
   f. Optionally, configure the **Retry duration**, the buffer settings, or add **Parameters**, which are attached as tags to your logs.  
   **Note**: Datadog recommends setting the **Buffer size** to `2 MiB` if the logs are single line messages.  
   g. In the **Backup settings**, select an S3 backup bucket to receive any failed events that exceed the retry duration.  
     **Note**: To ensure any logs that fail through the delivery stream are still sent to Datadog, set the Datadog Forwarder Lambda function to [forward logs][4] from this S3 bucket.  
   h. Click **Create Firehose stream**.

[1]: https://docs.aws.amazon.com/streams/latest/dev/tutorial-stock-data-kplkcl-create-stream.html
[2]: https://console.aws.amazon.com/firehose/
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: /logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=automaticcloudformation#collecting-logs-from-s3-buckets
[5]: /getting_started/site/
{{% /tab %}}

{{% tab "CloudFormation template" %}}

Customize the full [Kinesis CloudFormation template][1] and install it from the AWS Console. 

[1]: /resources/json/kinesis-logs-cloudformation-template.json
{{% /tab %}}
{{< /tabs >}}

## Send AWS logs to your Firehose stream

CloudWatch Logs needs permission to put data into your Kinesis Data Stream or Amazon Data Firehose delivery stream, depending on which approach you're using. [Create an IAM role and policy](#create-an-iam-role-and-policy). Then subscribe your new Kinesis stream or Amazon Data Firehose delivery stream to the CloudWatch log groups you want to ingest into Datadog. Subscriptions can be created through the [AWS console](#console) or [CLI](#cli).  
   **Note**: Each CloudWatch Log group can only have two subscriptions.

### Create an IAM role and policy

Create an IAM role and permissions policy to enable CloudWatch Logs to put data into your Kinesis stream. 
  1. Ensure that `logs.amazonaws.com` or `logs.<region>.amazonaws.com` is configured as the service principal in the role's **Trust relationships**. For example:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Statement1",
      "Effect": "Allow",
      "Principal": {
        "Service": "logs.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```
  2. Ensure that the role's attached permissions policy allows the `firehose:PutRecord` `firehose:PutRecordBatch`, `kinesis:PutRecord`, and `kinesis:PutRecords` actions. If you're using a Kinesis Data Stream, specify its ARN in the **Resource** field. If you're **not** using a Kinesis Data Stream, specify the ARN of your Amazon Data Firehose stream in the **Resource** field.  
  For example:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "firehose:PutRecord",
        "firehose:PutRecordBatch",
        "kinesis:PutRecord",
        "kinesis:PutRecords"
      ],
      "Resource": "arn:aws:kinesis:<REGION>:<ACCOUNT_ID>:stream/<DELIVERY_STREAM>
    }
  ]
}
```
Use the [Subscription filters with Kinesis Data Streams][2] example (steps 3 to 6) for an example of setting this up with the AWS CLI.

### Create a subscription filter

#### CLI

The following example creates a subscription filter through the AWS CLI:

```
  aws logs put-subscription-filter \
    --log-group-name "<MYLOGGROUPNAME>" \
    --filter-name "<MyFilterName>" \
    --filter-pattern "" \
    --destination-arn "<DESTINATIONARN> (data stream or delivery stream)" \
    --role-arn "<MYROLEARN>"
```

#### Console

Follow these steps to create a subscription filter through the AWS console. 

1. Go to your log group in [CloudWatch][1] and click on the **Subscription filters** tab, then **Create**.
   - If you are sending logs through a Kinesis Data Stream, select `Create Kinesis subscription filter`.
   - If you are sending logs directly from your log group to your Amazon Data Firehose delivery stream, select `Create Amazon Data Firehose subscription filter`.

2. Select the data stream or Firehose delivery stream as applicable, as well as the [IAM role](#create-an-iam-role-and-policy) previously created.

3. Provide a name for the subscription filter, and click **Start streaming**.

**Important note**: The destination of the subscription filter must be in the same account as the log group, as described in the [Amazon CloudWatch Logs API Reference][3].

### Validation

Check the **Subscription filters** tab of your log group's detail page in [CloudWatch][1] to confirm that the new Kinesis stream or Amazon Data Firehose stream is subscribed to your log group.

### Find your logs in Datadog

After you have set up the Amazon Data Firehose delivery stream, you can analyze the logs subscribed to your delivery stream in Datadog. 

To populate all logs by ARN:

1. Go to the [Log Explorer][5] in Datadog.
2. In the search bar, type `@aws.firehose.arn:"<ARN>"`, replace `<ARN>` with your Amazon Data Firehose ARN, and press **Enter** to see all of your subscribed logs.

**Note**: A single Kinesis payload must not be be more than 65,000 log messages. Log messages after that limit are dropped.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://console.aws.amazon.com/cloudwatch/home
[2]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs//SubscriptionFilters.html#DestinationKinesisExample
[3]: https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_PutSubscriptionFilter.html
[4]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html#FirehoseExample
[5]: /logs/explorer/
