---
title: Instrumenting Go Applications
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

After you have installed the [AWS integration][1] and the [Datadog Forwarder][2], follow the steps below to instrument your application to send metrics, logs, and traces to Datadog.

## Configuration

### Install the Datadog Lambda Library

You can install the [Datadog Lambda Library][3] locally by running the following command:

```
go get github.com/DataDog/datadog-lambda-go
```

### Configure the Function

1. Set environment variable `DD_FLUSH_TO_LOG` to `true`.
1. Enable [AWS X-Ray active tracing][4] for your Lambda function.

### Subscribe the Datadog Forwarder to the Log Groups

You need to subscribe the Datadog Forwarder Lambda function to each of your function’s log groups, in order to send metrics, traces and logs to Datadog.

1. [Install the Datadog Forwarder if you haven't][2].
2. [Ensure the option DdFetchLambdaTags is enabled][5].
3. [Subscribe the Datadog Forwarder to your function's log groups][6].

## Explore Datadog Serverless Monitoring

After you have configured your function following the steps above, you should be able to view metrics, logs and traces on the [Serverless Homepage][7].

If you would like to submit a custom metric, see the sample code below:

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

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /serverless/#1-install-the-cloud-integration
[2]: https://docs.datadoghq.com/serverless/forwarder/
[3]: https://github.com/DataDog/datadog-lambda-go
[4]: https://docs.aws.amazon.com/xray/latest/devguide/xray-services-lambda.html
[5]: https://docs.datadoghq.com/serverless/forwarder/#experimental-optional
[6]: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[7]: https://app.datadoghq.com/functions
