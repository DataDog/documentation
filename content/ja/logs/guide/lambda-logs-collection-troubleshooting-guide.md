---
title: Lambda Function Log Collection Troubleshooting Guide
kind: documentation
further_reading:
    - link: "https://www.datadoghq.com/blog/aws-lambda-telemetry-api/"
      tag: Blog
      text: Expanded Datadog Lambda extension capabilities with the AWS Lambda Telemetry API
---

If you don't see logs forwarded from a Datadog forwarder Lambda function in the Log Explorer, follow the troubleshooting steps below. If you continue to have trouble after following these steps, [contact Datadog support][1] for further assistance.

## Are your logs sent to Datadog?

1. Navigate to the [Log Explorer's Live Tail view][2].
2. In the search bar, use a filter to limit the Live Tail view to just the logs coming from your Lambda function. Some common search queries are:
    * By source: the source is often set to `source:lambda`, `source:aws` or `source:cloudwatch` but you can find other possible sources in the `parse_event_source` function in the [Lambda function][3]. 
    * By forwarder name: the Lambda function adds a `forwardername` tag to all the logs it forwards. You can filter on this tag by searching for `forwardername:*` or `forwardername:<FORWARDER_FUNCTION_NAME>`.
3. If you do see the logs in the Live Tail, but not in the Log Explorer, that means your log index has some [exclusion filters][4] set up. These filters are filtering out your logs.
4. If you don't see the logs in the Live Tail, the logs are not reaching Datadog.

## Check the Lambda function monitoring tab

[From the AWS console][5]

1. Open your forwarder Lambda function.

2. Click the Monitoring tab.

    {{< img src="logs/guide/lambda-monitoring-tab.png" alt="Monitoring tab" style="width:80%;" >}}

3. The monitoring tab displays a series of graphs indicating the following information about your Lambda function: 
    * invocations
    * errors
    * logs

4. If you don't see any data points on the **Invocations** graph, there may be a problem with the triggers you set for your function. See [Manage Your Function Triggers](#manage-your-function-triggers). To get insight into your Lambda invocations without using the monitoring tab, see [Viewing Lambda metrics in Datadog](#viewing-lambda-metrics-in-datadog).
5. If you see data points on the "Error count and success rate" graph, [check the Lambda function logs](#check-the-lambda-function-logs) to see what error messages are being reported.

### Viewing Lambda metrics in Datadog

If you have enabled AWS Lambda metrics, you can view metrics related to Lambda invocations and errors within Datadog. The following metrics are all tagged with the `functionname` tag: 

| Metric                        | Description                                                                                        |
|-------------------------------|----------------------------------------------------------------------------------------------------|
| `aws.lambda.invocations `     | Count of times the Lambda function has been triggered/invoked                                      |
| `aws.lambda.errors `          | Count of errors that occurred when the function was invoked                                        |
| `aws.lambda.duration `        | Average amount of time (in milliseconds) that it took for the Lambda function to finish executing  |
| `aws.lambda.duration.maximum` | Maximum amount of time (in milliseconds) that it took for the Lambda function to finish executing  |
| `aws.lambda.throttles`        | Count of invocation attempts that were throttled due to invocation rates exceeding customer limits |

For more information on these and other AWS Lambda metrics, see [AWS Lambda Metrics][6].

### Manage your function triggers

For logs to be forwarded, the forwarder Lambda function needs to have triggers (CloudWatch Logs or S3) set up. Follow the steps below to ensure the triggers are set up correctly.

1. Does the source of your log (CloudWatch log group or S3 bucket) show up in the "Triggers" list in the forwarder Lambda console? If yes, ensure it's enabled. Otherwise, follow the steps below to check in the S3 or CloudWatch log group console, because the "Triggers" list displayed in the Lambda console is known to be incomprehensive.

2. For S3 bucket, navigate to the bucket's "Properties" tab and scroll down to the "Advanced settings" and "Events" tile, or make a query using the AWS CLI command below. Do you see any event notification configured to trigger the forwarder Lambda function? If not, you need to configure a trigger.
   ```
   aws s3api get-bucket-notification-configuration --bucket <BUCKET_NAME>
   ```

3. For CloudWatch log group, navigate to the log group's console's "Subscriptions" field under the "Log group details" section. Alternatively, you can make a query using AWS CLI command below. If the log group is not subscribed by the forwarder Lambda function, you need to configure a trigger.
   ```
   aws logs describe-subscription-filters --log-group-name <LOG_GROUP_NAME>
   ```

4. Set triggers [automatically][7] or [manually][8].

For CloudWatch log group, you can use the following metrics within the Datadog platform to confirm whether logs are delivered from the log group to the forwarder Lambda function. Use the `log_group` tag to filter the data when viewing the metrics.

| Metric                          | Description                                                                                        |
|---------------------------------|----------------------------------------------------------------------------------------------------|
| `aws.logs.incoming_log_events`  | The number of log events uploaded to CloudWatch Logs                                               |
| `aws.logs.forwarded_log_events` | The number of log events forwarded to the subscription destination                                 |
| `aws.logs.delivery_errors`      | The number of log events failed to be delivered to the subscription destination                    |
| `aws.logs.delivery_throttling`  | The number of log events throttled for delivering to the subscription destination                  |

## Check the Lambda function logs

1. From the monitoring tab, click **View logs in Cloudwatch**.

{{< img src="logs/guide/lambda-logs-cloudwatch.png" alt="Lambda logs in Cloudwatch" style="width:80%;" >}}

2. Find the most recent log stream.

3. Do you see any errors? Try searching "?ERROR ?Error ?error".

4. Set environment variable "DD_LOG_LEVEL" to "debug" on the forwarder Lambda function to enable the debugging logs for further debugging. The debugging logs are quite verbose; remember to disable it after debugging.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://docs.datadoghq.com/help
[2]: https://docs.datadoghq.com/logs/live_tail/#live-tail-view
[3]: https://github.com/DataDog/datadog-serverless-functions/blob/master/aws/logs_monitoring/lambda_function.py
[4]: https://docs.datadoghq.com/logs/indexes/#exclusion-filters
[5]: https://console.aws.amazon.com/lambda/home
[6]: https://docs.datadoghq.com/integrations/amazon_lambda/?tab=awsconsole#metrics
[7]: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#automatically-set-up-triggers
[8]: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#manually-set-up-triggers
