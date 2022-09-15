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
- link: "/logs/log_configuration/processors"
  tag: "Documentation"
  text: "Learn how to process your logs"
- link: https://www.datadoghq.com/blog/send-amazon-vpc-flow-logs-to-kinesis-firehose-and-datadog/
  tag: "Blog"
  text: "Send Amazon VPC flow logs to Amazon Kinesis Data Firehose and Datadog"
---

## Overview

AWS service logs are usually stored in S3 buckets or CloudWatch Log groups. It is possible to subscribe to these logs and forward them to an Amazon Kinesis stream to then forward them to one or multiple destinations. Datadog is one of the default destinations for Amazon Kinesis Delivery streams. 

AWS fully manages Amazon Kinesis Data Firehose, so you don't need to maintain any additional infrastructure or forwarding configurations for streaming logs. You can set up a Kinesis Firehose Delivery Stream in the AWS Firehose console, or automatically set up the destination using a CloudFormation template.

## Setup

{{< tabs >}}
{{< tab "Kinesis Firehose Delivery stream" >}}
{{< /tab >}}

{{< tab "CloudFormation template" >}}
{{< /tab >}}
{{< /tabs >}}

## Send AWS logs to your Kinesis stream

1. Check the `Subscriptions` column on the [log groups index page][1] to see current subscriptions to your relevant log groups. Add the new Kinesis stream as a subscriber. Note: CloudWatch Log groups can only have two subscriptions each.
  * **Note**: If you have more than two sources you want to subscribe to, you can subscribe to the new Kinesis stream after completing this setup.
2. Subscribe your new Kinesis stream to the CloudWatch log groups you want to ingest into Datadog. Refer to [this CloudWatch Logs documentation section][2] (step 3 to 6) to:  
   - Use the `aws iam create-role` command to create the IAM role that gives CloudWatch Logs permission to put logs data into the Kinesis stream.
   - Create a permissions policy allowing the `firehose:PutRecord` `firehose:PutRecordBatch`, `kinesis:PutRecord`, and `kinesis:PutRecords` actions.
   - Attach the permissions policy to your newly created IAM role using the `aws iam put-role-policy` command.
   - Use the `aws logs put-subscription-filter` command to subscribe your Kinesis stream to each CloudWatch log group you want to ingest into Datadog.  

   Example of subscription filter:
    ```
    aws logs put-subscription-filter \
        --log-group-name "MYLOGGROUPNAME" \
        --filter-name "MyFilterName" \
        --filter-pattern "" \
        --destination-arn "DESTINATIONARN (data stream or delivery stream)" \
        --role-arn "MYROLEARN"
    ```
    **Important note**: The destination of the subscription filter must be in the same account as the log group, as described in the [AWS documentation][3].

3. Check the `Subscriptions` column in the [log groups index page][1] to confirm that the new Kinesis stream is now subscribed to your log groups.

If you want to push logs directly to the delivery stream without going through a Kinesis data stream, you can subscribe the CloudWatch log groups directly to the Kinesis Firehose Destination by adding the Kinesis Firehose ARN in the `destination-arn` parameter of the subscription filter, as shown in [the AWS Subscription Filters documentation][4] (step 12).

## Search for AWS Kinesis logs in Datadog

Once you have set up an Amazon Kinesis delivery stream, you can analyze the logs subscribed to your delivery stream in Datadog. 

To populate all logs by ARN:

1. Navigate to the [Logs Explorer][5] in Datadog to see all of your subscribed logs.
2. In the search bar, type `@aws.firehose.arn:"<ARN>"`, replace `<ARN>` with your Amazon Kinesis Data Firehose ARN, and press **Enter**.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://console.aws.amazon.com/cloudwatch/home
[2]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs//SubscriptionFilters.html#DestinationKinesisExample
[3]: https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_PutSubscriptionFilter.html
[4]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html#FirehoseExample
[5]: /logs/explorer/
