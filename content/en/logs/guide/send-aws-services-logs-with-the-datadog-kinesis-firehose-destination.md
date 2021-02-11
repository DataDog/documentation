---
title: Send AWS services logs with the Datadog Kinesis Firehose Destination
kind: documentation
further_reading:
- link: "/logs/explorer/"
  tag: "Documentation"
  text: "Learn how to explore your logs"
- link: "/logs/explorer/#visualize"
  tag: "Documentation"
  text: "Perform Log Analytics"
- link: "/logs/processing/"
  tag: "Documentation"
  text: "Learn how to process your logs"
---
​
AWS service logs are usually stored in S3 buckets or CloudWatch Log groups. It is possible to subscribe to these logs and forward them to an Amazon Kinesis stream to then forward them to one or multiple destinations. Datadog is one of the default destinations for Amazon Kinesis Delivery streams.
​
AWS fully manages Amazon Kinesis Data Firehose, so you don't need to maintain any additional infrastructure or forwarding configurations for streaming logs.
​
You can set up a Kinesis Firehose Delivery Stream in the AWS Firehose console, or automatically set up the destination using a CloudFormation template:
​
{{< tabs >}}
{{% tab "Kinesis Firehose Delivery stream" %}}
## Setup the Datadog Destination in the Kinesis Firehose Delivery Stream
​
Datadog recommends using a Kinesis stream as input when using the Datadog Kinesis destination. It gives you the ability to forward your logs to multiple destinations in case Datadog is not the only consumer for those logs.
​
If you only want to send logs to Datadog, or if you already have a Kinesis Datastream with your logs, ignore step 1.
​
1. (Optional) Create a new Kinesis stream (see the [Kinesis documentation][1]). Name the stream something descriptive, like `DatadogLogStream`, and give it a shard count of 1 (increase the shard count for each MB/s throughput that you need).
2. Create a [new delivery stream][2] and name it `DatadogLogsforwarder`.
3. Set the source as "Kinesis stream" (or leave the source as `Direct PUT or other sources` if you don’t want to use a Kinesis stream) and select `DatadogLogStream` (or the existing Kinesis stream that already contains your logs).
4. Disable the data transformation and record transformation and hit `next`.
5. Select the `Datadog` destination and select the `Datadog US` or `Datadog EU` region, depending on the Datadog Region of your account.
  {{< img src="logs/guide/choose-destination.png" alt="Choose your destination" style="width:100%;">}}
6. Paste your `APIKEY` into the `AccessKey` box. (You can get your API key from [your Datadog API settings page][3]).
7. (Optional) Add custom `parameters`, which are added as custom tags to your logs.
{{< img src="logs/guide/kinesis_logs_datadog_destination.png" alt="Datadog destination configuration" style="width:100%;">}}
8. Choose to backup failed events to an S3 bucket.
9. Configure the delivery stream parameters. The two important parameters are:
    * Retry time: How long the delivery stream should retry before sending an event to the backup S3 bucket.
    * Batch size: Datadog recommends a value between 1MB and 4MB. The logs are sent by the delivery stream if the batch size or the linger time (minimum 60 seconds) is reached. Datadog recommends reducing the batch size to be as close to real-time as possible.
    {{< img src="logs/guide/kinesis_logs_datadog_batch.png" alt="Batch configuration" style="width:100%;" >}}

To ensure that logs that fail through the Delivery Stream are still sent to Datadog, [configure the Datadog Lambda function to trigger on this S3 bucket][4].


[1]: https://docs.aws.amazon.com/kinesisanalytics/latest/dev/app-hotspots-prepare.html#app-hotspots-create-two-streams
[2]: https://console.aws.amazon.com/firehose/
[3]: https://app.datadoghq.com/account/settings#api
[4]: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=automaticcloudformation#collecting-logs-from-s3-buckets
{{% /tab %}}

{{% tab "CloudFormation template" %}}
## Upload with a CloudFormation Template
​
Alternatively, customize this CloudFormation template and install it from the AWS Console:
​
[See the full Kinesis CloudFormation template here.][1]
​
​

[1]: /resources/json/kinesis-logs-cloudformation-template.json
{{% /tab %}}
{{< /tabs >}}

## Send AWS logs to your Kinesis stream

1. Check the `Subscriptions` column on the [log groups index page][1] to see current subscriptions to your relevant log groups. Because CloudWatch Log groups can only have one subscription, delete any existing subscriptions to the log groups before adding the new Kinesis stream as a subscriber.
  * **Note**: If you have something else you want to subscribe to, you can subscribe to the new Kinesis stream after completing this setup.
2. Subscribe your new Kinesis stream to the CloudWatch log groups you want to ingest into Datadog. Refer to [this CloudWatch Logs documentation section][2] (step 3 to 6) to:
  a. Use the `aws iam create-role` command to create the IAM role that gives CloudWatch Logs permission to put logs data into the Kinesis stream.
  b. Create a permissions policy allowing the `firehose:PutRecord` `firehose:PutRecordBatch`, `kinesis:PutRecord` and `kinesis:PutRecordBatch` actions.
  c. Attach the permissions policy to your newly created IAM role using the `aws iam put-role-policy` command.
  d. Use the `aws logs put-subscription-filter` command to subscribe your Kinesis stream to each CloudWatch log group you want to ingest into Datadog.
​
​
    Example of subscription filter:
​
    ```
    aws logs put-subscription-filter \
        --log-group-name "MYLOGGROUPNAME" \
        --filter-name "MyFilterName" \
        --filter-pattern "" \
        --destination-arn "DESTINATIONARN (data stream or delivery stream)" \
        --role-arn "MYROLEARN"
    ```
​
    **Important note**: The destination of the subscription filter must be in the same account as the log group, as described in the [AWS documentation][3].
3. Check the `Subscriptions` column in the [log groups index page][1] to confirm that the new Kinesis stream is now subscribed to your log groups.
​
If you want to push logs directly to the delivery stream without going through a Kinesis data stream, you can subscribe the CloudWatch log groups directly to the Kinesis Firehose Destination by adding the Kinesis Firehose ARN in the `destination-arn` parameter of the subscription filter, as shown in [the AWS Subscription Filters documentation][4] (step 12).
​

[1]: https://console.aws.amazon.com/cloudwatch/home
[2]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs//SubscriptionFilters.html#DestinationKinesisExample
[3]: https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_PutSubscriptionFilter.html
[4]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html#FirehoseExample
