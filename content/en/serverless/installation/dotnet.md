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

After you have installed the [AWS integration][1] and the [Datadog Forwarder][2], follow these steps to instrument your application to send metrics, logs, and traces to Datadog.

## Configuration

### Install the Datadog Lambda Extension

Install the [Datadog Lambda Extension][3] as a Lambda Layer on your Lambda function using the ARN in the following format:

```
arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension:<EXTENSION_VERSION>
```

For `EXTENSION_VERSION`, see the [latest release][2].

### Configure the function

1. Enable [AWS X-Ray active tracing][4] for your Lambda function.
2. Install the [AWS X-Ray SDK for .NET][5].
3. Add the environment variable `DD_API_KEY` or `DD_KMS_API_KEY`, and set the value to your Datadog API key on the [API Management page][6]. 

### Unified service tagging

Although it's optional, Datadog highly recommends tagging you serverless applications with the `env`, `service`, and `version` tags following the [unified service tagging documentation][7].

## Explore Datadog serverless monitoring

After you have configured your function following the steps above, you should be able to view metrics, logs and traces on the [Serverless homepage][8].

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

For more information on custom metric submission, see [here][6].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/amazon_web_services/
[2]: https://gallery.ecr.aws/datadog/lambda-extension
[3]: /serverless/libraries_integrations/extension/
[4]: https://docs.aws.amazon.com/xray/latest/devguide/xray-services-lambda.html
[5]: https://docs.aws.amazon.com/xray/latest/devguide/xray-sdk-dotnet.html
[6]: /serverless/custom_metrics?tab=otherruntimes
[7]: /getting_started/tagging/unified_service_tagging/#aws-lambda-functions
[8]: https://app.datadoghq.com/functions
