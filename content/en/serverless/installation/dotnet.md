---
title: Instrumenting .NET Applications
kind: documentation
further_reading:
    - link: 'serverless/installation/node'
      tag: 'Documentation'
      text: 'Installing Node.js Serverless Monitoring'
    - link: 'serverless/installation/ruby'
      tag: 'Documentation'
      text: 'Installing Ruby Serverless Monitoring'
    - link: 'serverless/installation/python'
      tag: 'Documentation'
      text: 'Installing Python Serverless Monitoring'
    - link: 'serverless/installation/go'
      tag: 'Documentation'
      text: 'Installing Go Serverless Monitoring'
    - link: 'serverless/installation/java'
      tag: 'Documentation'
      text: 'Installing Java Serverless Monitoring'
---

After you have [installed the AWS integration][1], use .NET to instrument your application to send metrics, logs, and traces to Datadog. 

## Configuration

### Configure the Function

1. Enable [AWS X-Ray active tracing][2] for your Lambda function.

### Subscribe the Datadog Forwarder to the Log Groups

You need to subscribe the Datadog Forwarder Lambda function to each of your function’s log groups to send metrics, traces, and logs to Datadog.

1. [Install the Datadog Forwarder if you haven't][3].
2. [Ensure the option DdFetchLambdaTags is enabled][4].
3. [Subscribe the Datadog Forwarder to your function's log groups][5].

## Explore Datadog Serverless Monitoring

After you have configured your function following the steps above, you should be able to view metrics, logs and traces on the [Serverless page][6]. If you want to submit a custom metric, refer to the sample code below:

```csharp
var myMetric = new Dictionary<string, object>();
myMetric.Add("m", "coffee_house.order_value");
myMetric.Add("v", 12.45);
myMetric.Add("e", (int)(DateTime.UtcNow - new DateTime(1970, 1, 1)).TotalSeconds);
myMetric.Add("t", new string[] {"product:latte", "order:online"});
LambdaLogger.Log(JsonConvert.SerializeObject(myMetric));
```

[1]: /serverless/#1-install-the-cloud-integration
[2]: https://docs.aws.amazon.com/xray/latest/devguide/xray-services-lambda.html
[3]: https://docs.datadoghq.com/serverless/installation/installing_the_forwarder/
[4]: https://docs.datadoghq.com/serverless/installation/installing_the_forwarder/#experimental-optional
[5]: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[6]: https://app.datadoghq.com/functions
