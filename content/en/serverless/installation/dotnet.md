---
title: Instrumenting .NET Applications
kind: documentation
further_reading:
- link: 'serverless/serverless_tagging/'
  tag: "Serverless"
  text: 'Tagging Serverless Applications'
- link: 'serverless/distributed_tracing/'
  tag: "Serverless"
  text: 'Tracing Serverless Applications'
- link: 'serverless/custom_metrics/'
  tag: "Serverless"
  text: 'Submitting Custom Metrics from Serverless Applications'
---

## Required setup

If not already configured:

- Install the [AWS integration][1]. This allows Datadog to ingest Lambda metrics from AWS. 
- Install the [Datadog Forwarder Lambda function][2], which is required to ingest AWS Lambda traces, enhanced metrics, custom metrics, and logs. 

After you have installed the [AWS integration][1] and the [Datadog Forwarder][2], follow these steps to instrument your application to send metrics, logs, and traces to Datadog.

## Configuration

### Configure the function

1. Enable [AWS X-Ray active tracing][3] for your Lambda function.
2. Install the [AWS X-Ray SDK for .NET][4].

### Subscribe the Datadog Forwarder to the log groups

You need to subscribe the Datadog Forwarder Lambda function to each of your function’s log groups to send metrics, traces, and logs to Datadog.

1. [Install the Datadog Forwarder if you haven't][2].
2. [Subscribe the Datadog Forwarder to your function's log groups][5].

### Unified service tagging

Although it's optional, Datadog highly recommends tagging you serverless applications with the `env`, `service`, and `version` tags following the [unified service tagging documentation][6].

## Explore Datadog serverless monitoring

After you have configured your function following the steps above, you should be able to view metrics, logs and traces on the [Serverless homepage][7].

## Monitor custom business logic

If you would like to submit a custom metric, see the sample code below:

```csharp
var myMetric = new Dictionary<string, object>();
myMetric.Add("m", "coffee_house.order_value");
myMetric.Add("v", 12.45);
myMetric.Add("e", (int)(DateTime.UtcNow - new DateTime(1970, 1, 1)).TotalSeconds);
myMetric.Add("t", new string[] {"product:latte", "order:online"});
LambdaLogger.Log(JsonConvert.SerializeObject(myMetric));
```

For more information on custom metric submission, see [here][8].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/amazon_web_services/
[2]: /serverless/forwarder/
[3]: https://docs.aws.amazon.com/xray/latest/devguide/xray-services-lambda.html
[4]: https://docs.aws.amazon.com/xray/latest/devguide/xray-sdk-dotnet.html
[5]: /logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[6]: /getting_started/tagging/unified_service_tagging/#aws-lambda-functions
[7]: https://app.datadoghq.com/functions
[8]: /serverless/custom_metrics?tab=otherruntimes
