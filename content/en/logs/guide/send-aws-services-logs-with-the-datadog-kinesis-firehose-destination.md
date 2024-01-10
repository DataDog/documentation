---
title: Send AWS Services Logs with the Datadog Kinesis Firehose Destination
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
- link: https://www.datadoghq.com/blog/send-amazon-vpc-flow-logs-to-kinesis-firehose-and-datadog/
  tag: "Blog"
  text: "Send Amazon VPC flow logs to Amazon Kinesis Data Firehose and Datadog"
---

## Overview

It is possible to subscribe to AWS service logs stored in CloudWatch Log groups and forward them to an Amazon Kinesis stream to then forward them to one or multiple destinations. Datadog is one of the default destinations for Amazon Kinesis Delivery streams. 

AWS fully manages Amazon Kinesis Data Firehose, so you don't need to maintain any additional infrastructure or forwarding configurations for streaming logs. You can set up a Kinesis Firehose Delivery Stream in the AWS Firehose console, or automatically set up the destination using a CloudFormation template.

## Setup

{{< tabs >}}
{{% tab "Kinesis Firehose Delivery stream" %}}

Datadog recommends using a Kinesis data stream as input when using the Datadog Kinesis destination. It gives you the ability to forward your logs to multiple destinations in case Datadog is not the only consumer for those logs. If Datadog is the only destination for your logs, or if you already have a Kinesis data stream with your logs, you can ignore step one.

1. Optionally, use the [Create a Data Stream][1] section of the Amazon Kinesis Data Streams developer guide in AWS to create a new Kinesis data stream. Name the stream something descriptive, like `DatadogLogStream`.
2. Create a [new delivery stream][2].  
   a. Set the source: 
      - `Amazon Kinesis Data Streams` if your logs are coming from a Kinesis data stream
      - `Direct PUT` if your logs are coming directly from a CloudWatch log group

   b. Set the destination as `Datadog`.  
   c. Provide a name for the delivery stream.  
   d. In the **Destination settings**, choose the `Datadog logs` HTTP endpoint URL that corresponds to your [Datadog site][5].  
   e. Paste your API key into the **API key** field. You can get or create an API key from the [Datadog API Keys page][3].  
   f. Optionally, configure the **Retry duration**, the buffer settings, or add **Parameters**, which are attached as tags to your logs.  
   **Note**: Datadog recommends setting the **Buffer size** to `2 MiB` if the logs are single line messages.  
   g. In the **Backup settings**, select an S3 backup bucket to receive any failed events that exceed the retry duration.  
     **Note**: To ensure that logs that fail through the delivery stream are still sent to Datadog, set the Datadog Forwarder Lambda function to [forward logs][4] from this S3 bucket.  
   h. Click **Create delivery stream**.

[1]: https://docs.aws.amazon.com/streams/latest/dev/tutorial-stock-data-kplkcl-create-stream.html
[2]: https://console.aws.amazon.com/firehose/
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: /logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=automaticcloudformation#collecting-logs-from-s3-buckets
[5]: /getting_started/site/
{{% /tab %}}

{{% tab "CloudFormation template" %}}

Alternatively, customize this CloudFormation template and install it from the AWS Console. See the full [Kinesis CloudFormation template][1].

[1]: /resources/json/kinesis-logs-cloudformation-template.json
{{% /tab %}}
{{< /tabs >}}

## Send AWS logs to your Kinesis stream

Subscribe your new Kinesis stream to the CloudWatch log groups you want to ingest into Datadog. You can check the **Subscriptions** column on the [log groups index page][1] to see current subscriptions to your log groups. Subscriptions can be created through the AWS console or API with the specifications below.  
   **Note**: Each CloudWatch Log group can only have two subscriptions.

### Create an IAM Role and Policy

Create an IAM role and permissions policy to enable CloudWatch Logs to put data into your Kinesis stream. 
   - Ensure that `logs.amazonaws.com` or `logs.<region>.amazonaws.com` is configured as the service principal in the role's **Trust relationships**.
   - Ensure that the role's attached permissions policy allows the `firehose:PutRecord` `firehose:PutRecordBatch`, `kinesis:PutRecord`, and `kinesis:PutRecords` actions.   
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
            "Resource": "arn:aws:firehose:<REGION>:<ACCOUNT_ID>:deliverystream/<DELIVERY_STREAM>"
          }
        ]
      }
      ```

Use the [Subscription filters with Kinesis][2] example (steps 3 to 6) for an example of setting this up with the AWS CLI.

### Create a subscription filter

The following example creates a subscription filter through the AWS CLI:

    ```
    aws logs put-subscription-filter \
        --log-group-name "<MYLOGGROUPNAME>" \
        --filter-name "<MyFilterName>" \
        --filter-pattern "" \
        --destination-arn "<DESTINATIONARN> (data stream or delivery stream)" \
        --role-arn "<MYROLEARN>"
    ```

You can also create a subscription filter through the AWS console. 

1. Go to your log group in [CloudWatch][1] and click on the **Subscription filters** tab, then **Create**.
   - If you are sending logs through a Kinesis data stream, select `Create Kinesis subscription filter`.
   - If you are sending logs directly from your log group to your Kinesis Firehose delivery stream, select `Create Kinesis Firehose subscription filter`.

2. Select the data stream or Firehose delivery stream as applicable, as well as the [IAM role](#create-an-iam-role-and-policy) previously created.

3. Provide a name for the subscription filter, and click **Start streaming**.

**Important note**: The destination of the subscription filter must be in the same account as the log group, as described in the [Amazon CloudWatch Logs API Reference][3].

### Validation

Check the **Subscriptions** column in the log groups index page in [CloudWatch][1] to confirm that the new Kinesis stream is now subscribed to your log groups.

### Search for Amazon Kinesis logs in Datadog

After you have set up an Amazon Kinesis delivery stream, you can analyze the logs subscribed to your delivery stream in Datadog. 

To populate all logs by ARN:

1. Go to the [Logs Explorer][5] in Datadog to see all of your subscribed logs.
2. In the search bar, type `@aws.firehose.arn:"<ARN>"`, replace `<ARN>` with your Amazon Kinesis Data Firehose ARN, and press **Enter**.

**Note**: A single Kinesis payload must not be be more than 65,000 log messages. Log messages after that limit are dropped.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://console.aws.amazon.com/cloudwatch/home
[2]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs//SubscriptionFilters.html#DestinationKinesisExample
[3]: https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_PutSubscriptionFilter.html
[4]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html#FirehoseExample
[5]: /logs/explorer/
