---
title: Lambda Function Log Collection Troubleshooting Guide
kind: documentation
---

If you don't see logs forwarded from a lambda function in the Log Explorer, see the [Datadog-AWS Log integration][1] to configure your environment. If you still do not see your logs, double-check the following points:

There are some common issues that can come up when configuring the AWS Lambda function to forward logs to Datadog. Below are some troubleshooting steps to try if you are using the Lambda function and your logs aren't reaching Datadog. If you continue to have trouble after following these steps, [contact Datadog support][2] for further assistance.

## Are your logs sent to Datadog?

1. Navigate to the [Log Explorer's Live Tail View][3].
2. In the Search Bar, use a filter to limit the Live Tail View to just the logs coming from your lambda function. Some common search queries are:
    * By source: the source is often set to `source:aws` or `source:cloudwatch` but you can find other possible sources in the `parse_event_source` function in the [Lambda function][4]. 
    * By forwarder name: the Lambda function adds a forwardername tag to all the logs it forwards. You can filter on this tag by searching for `forwardername:*` or `forwardername:<FUNCTION_NAME>`.
3. If you don't see the logs in the livetail, the logs are not reaching Datadog this could be due to one of the following common configuration issues:
    * Logs are too far in the past: Datadog only accepts logs with a timestamp older than 6 hours in the past or 1h in the future.
    * If your index has any [exclusion filters][5] set up, they may be filtering out your logs.

## Check the Lambda function monitoring tab

[From the AWS console][6]

1. Open your Lambda function.

2. Click the Monitoring tab.

    {{< img src="logs/guide/lambda-monitoring-tab.png" alt="Monitoring tab"  style="width:80%;" >}}

3. The monitoring tab displays a series of graphs indicating the following information about your Lambda function: 
    * invocations
    * errors
    * logs

4. If you don't see any data points on the **Invocations** graph, there may be a problem with the triggers you set for your function. See [Manage Your Function Triggers](#manage-your-function-triggers). To get insight into your lambda invocations without using the monitoring tab, see [Viewing Lambda metrics in Datadog](#viewing-lambda-metrics-in-datadog).
5. If you see data points on the "Error count and success rate" graph, [Check the Lambda function logs](#check-the-lambda-function-logs) to see what error messages are being reported.

### Viewing Lambda metrics in Datadog

If you have enabled AWS Lambda metrics, you can view metrics related to Lambda invocations and errors within Datadog. The following metrics are all tagged with the `functionname` tag: 

| Metric                        | Description                                                                                        |
|-------------------------------|----------------------------------------------------------------------------------------------------|
| `aws.lambda.invocations `     | Count of times the Lambda function has been triggered / invoked                                    |
| `aws.lambda.errors `          | Count of errors that occurred when the function was invoked                                        |
| `aws.lambda.duration `        | Average amount of time (in milliseconds) that it took for the Lambda function to finish executing  |
| `aws.lambda.duration.maximum` | Maximum amount of time (in milliseconds) that it took for the Lambda function to finish executing  |
| `aws.lambda.throttles`        | Count of invocation attempts that were throttled due to invocation rates exceeding customer limits |

For more information on these and other AWS Lambda metrics, see [Amazon Lambda Metrics][7].

### Manage your function triggers

The Lambda function needs to have triggers set up in order for logs to be forwarded. If you see [in your Lambda function's monitoring tab](#check-the-lambda-function-monitoring-tab) that the function is never invoked, it may not have any triggers set up. There are two ways to set triggers for the Lambda function: manual and automatic.

{{< tabs >}}
{{% tab "Manual trigger" %}}
You can see if there are [manual triggers][1] set up for your Lambda function by looking directly in the Lambda function's Configuration tab as in the screenshot below:

{{< img src="logs/guide/manual-triggers-example.png" alt="Example of manual triggers location"  style="width:80%;" >}}

**Note** If you have triggers on your Lambda function but it still isn't being invoked, there may be a conflict with another resource already subscribed to the same log source. When you add a manual trigger, an error message informs you if a resource is already subscribed to the log source:

{{< img src="logs/guide/creating-trigger-error-example.png" alt="Example of error when creating trigger with subscription"  style="width:80%;" >}}

See [Check for conflicting subscriptions](#check-for-conflicting-subscriptions) for more information on removing subscriptions.

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=allpermissions#manually-setup-triggers
{{% /tab %}}
{{% tab "Automatic trigger" %}}

You can see if there are [automatic triggers][1] set up for your Lambda function with the following steps:

1. Navigate to the [Cloudwatch console][2].
2. Click **Log Groups** in the left sidebar here you will see a list of Log Groups. There is a **subscriptions** column on the right that shows what resources (if any) are currently subscribed to the log source.

{{< img src="logs/guide/log-group-subcriptions-example.png" alt="Log Group subcriptions example"  style="width:80%;" >}}

3. If your Lambda function isn't listed as the subscriber for the Log Group you want to monitor, redo the steps from the [automatic trigger setup documentation][1].
4. If the Log Group you want to monitor already has a different resource subscribed to it, see [Check for conflicting subscriptions](#check-for-conflicting-subscriptions) below.

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=allpermissions#automatically-setup-triggers
[2]: https://console.aws.amazon.com/cloudwatch/
{{% /tab %}}
{{< /tabs >}}

### Check for conflicting subscriptions

AWS doesn't allow for more than one resource to be subscribed to a log source. If you have triggers on your Lambda function but it still isn't being invoked, there may be a conflict with another resource already subscribed to the same log source. The log source needs to be freed up so the Datadog Lambda function can collect logs from it.

If something is already subscribing to a Log Group that you want to monitor with the Datadog Lambda Function, you can remove it: 

* Select the log source 
* Select **Remove Subscription Filter** in the **Actions** pulldown

## Check the Lambda function logs

From the monitoring tab, click **View logs in Cloudwatch**.

{{< img src="logs/guide/lambda-logs-cloudwatch.png" alt="Lambda logs in Cloudwatch"  style="width:80%;" >}}

### API key

If you see one of the following log lines it means that your API key isn't set correctly.

```
module initialization error: Missing Datadog API key
```

This means you didn't set the API key. Places you can set the API key are:

* Directly in the Python code of your Lambda function
* As an environment variable under the name `DD_API_KEY`
* As a KMS Encrypted key under the name `DD_KMS_API_KEY`

```
module initialization error: The API key is not valid.
```

The API key you provided doesn't match any key Datadog recognizes. Double-check the spelling and make sure that your key corresponds to the org you are sending data to. If you are in Datadog's EU site, you need to specify a `DD_SITE` variable with the value `datadoghq.eu` in order for the API key to be properly matched with your account.

```
module initialization error: The API key is not the expected length. Please confirm that your API key is correct
```

The API key is either too short or too long. Double-check that you copied it over correctly.

[1]: /integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
[2]: https://docs.datadoghq.com/help
[3]: https://docs.datadoghq.com/logs/live_tail/#live-tail-view
[4]: https://github.com/DataDog/datadog-serverless-functions/blob/master/aws/logs_monitoring/lambda_function.py
[5]: https://docs.datadoghq.com/logs/indexes/#exclusion-filters
[6]: https://console.aws.amazon.com/lambda/home
[7]: https://docs.datadoghq.com/integrations/amazon_lambda/?tab=awsconsole#metrics
