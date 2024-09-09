---
title: Instrumenting .NET Serverless Applications Using the Datadog Forwarder

---
## Overview

<div class="alert alert-warning">
If you are a new user of Datadog Serverless, follow the <a href="/serverless/installation/dotnet">instructions to instrument your Lambda functions using the Datadog Lambda Extension</a> instead. If you have already set up Datadog Serverless with the Datadog Forwarder before Lambda offered out-of-the-box functionality, use this guide to maintain your instance.
</div>

## Prerequisites

The [Datadog Forwarder Lambda function][1] is required to ingest AWS Lambda enhanced metrics, custom metrics, and logs.

## Enable X-Ray tracing

1. Enable [AWS X-Ray active tracing][2] for your Lambda function.
2. Install the [AWS X-Ray SDK for .NET][3].

## Subscribe the Datadog Forwarder to log groups

[Subscribe][4] the Datadog Forwarder Lambda function to each of your function's log groups to send metrics, traces, and logs to Datadog.

## What's next?

- You can now view metrics, logs, and traces on the [Serverless Homepage][5].
- See the sample code to [monitor custom business logic](#monitor-custom-business-logic).
- See the [troubleshooting guide][6] if you have trouble collecting the telemetry.

## Monitor custom business logic

If you would like to submit a [custom metric][7] using the Datadog Forwarder, see the sample code below:

```csharp
var myMetric = new Dictionary<string, object>();
myMetric.Add("m", "coffee_house.order_value");
myMetric.Add("v", 12.45);
myMetric.Add("e", (int)(DateTime.UtcNow - new DateTime(1970, 1, 1)).TotalSeconds);
myMetric.Add("t", new string[] {"product:latte", "order:online"});
LambdaLogger.Log(JsonConvert.SerializeObject(myMetric));
```


[1]: /serverless/forwarder
[2]: https://docs.aws.amazon.com/xray/latest/devguide/xray-services-lambda.html
[3]: https://docs.aws.amazon.com/xray/latest/devguide/xray-sdk-dotnet.html
[4]: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[5]: https://app.datadoghq.com/functions
[6]: /serverless/guide/troubleshoot_serverless_monitoring/
[7]: /serverless/custom_metrics
