---
title: Instrumenting Go Applications
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
    - link: 'serverless/installation/dotnet'
      tag: 'Documentation'
      text: 'Installing .NET Serverless Monitoring'
    - link: 'serverless/installation/java'
      tag: 'Documentation'
      text: 'Installing Java Serverless Monitoring'
---

After you have [installed the AWS integration][1], follow the steps below to instrument your application to send metrics, logs, and traces to Datadog.

## Configuration

### Install the Datadog Lambda Library

You can install the [Datadog Lambda Library][2] locally by running the following command:

```
go get github.com/DataDog/datadog-lambda-go
```

### Configure the Function

1. Set environment variable `DD_FLUSH_TO_LOG` to `true`.
1. Enable [AWS X-Ray active tracing][3] for your Lambda function.

### Subscribe the Datadog Forwarder to the Log Groups

You need to subscribe the Datadog Forwarder Lambda function to each of your function’s log groups, in order to send metrics, traces and logs to Datadog.

1. [Install the Datadog Forwarder if you haven't][4].
2. [Ensure the option DdFetchLambdaTags is enabled][5].
3. [Subscribe the Datadog Forwarder to your function's log groups][6].

## Explore Datadog Serverless Monitoring

After you have configured your function following the steps above, you should be able to view metrics, logs and traces on the [Serverless page][7]. If you need to submit a custom metric, refer to the sample code below:

```go
package main

import (
  "github.com/aws/aws-lambda-go/lambda"
  "github.com/DataDog/datadog-lambda-go"
)

func main() {
  // Wrap your handler function
  lambda.Start(ddlambda.WrapHandler(myHandler, nil))
}

func myHandler(ctx context.Context, event MyEvent) (string, error) {
  // Submit a custom metric
  ddlambda.Metric(
    "coffee_house.order_value", // Metric name
    12.45, // Metric value
    "product:latte", "order:online" // Associated tags
  )

  req, err := http.NewRequest("GET", "http://example.com/status")

  // Add the datadog distributed tracing headers
  ddlambda.AddTraceHeaders(ctx, req)

  client := http.Client{}
  client.Do(req)
}
```

[1]: /serverless/#1-install-the-cloud-integration
[2]: https://github.com/DataDog/datadog-lambda-go
[3]: https://docs.aws.amazon.com/xray/latest/devguide/xray-services-lambda.html
[4]: https://docs.datadoghq.com/serverless/troubleshooting/installing_the_forwarder
[5]: https://docs.datadoghq.com/serverless/troubleshooting/installing_the_forwarder/#ddfetchlambdatags
[6]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=automaticcloudformation#send-aws-service-logs-to-datadog
[7]: https://app.datadoghq.com/functions
