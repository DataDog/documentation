---
title: Instrumenting Go Applications
kind: documentation
further_reading:
- link: 'serverless/serverless_tagging/'
  tag: "Documentation"
  text: 'Tagging Serverless Applications'
- link: 'serverless/distributed_tracing/'
  tag: "Documentation"
  text: 'Tracing Serverless Applications'
- link: 'serverless/custom_metrics/'
  tag: "Documentation"
  text: 'Submitting Custom Metrics from Serverless Applications'
---

## Required setup

If not already configured:

- Install the [AWS integration][1]. This allows Datadog to ingest Lambda metrics from AWS. 
- Install the [Datadog Forwarder Lambda function][2], which is required to ingest AWS Lambda traces, enhanced metrics, custom metrics, and logs. 

After you have installed the [AWS integration][1] and the [Datadog Forwarder][2], follow these steps to instrument your application to send metrics, logs, and traces to Datadog.

## Configuration

### Install the Datadog Lambda Library

You can install the [Datadog Lambda Library][3] locally by running the following command:

```
go get github.com/DataDog/datadog-lambda-go
```

### Configure the function

1. Set environment variable `DD_FLUSH_TO_LOG` to `true`.
2. Enable [AWS X-Ray active tracing][4] for your Lambda function.
3. Wrap your Lambda handler function using the wrapper provided by the Datadog Lambda library.
    ```go
    package main

    import (
      "github.com/aws/aws-lambda-go/lambda"
      "github.com/DataDog/datadog-lambda-go"
    )

    func main() {
      // Wrap your lambda handler like this
      lambda.Start(ddlambda.WrapHandler(myHandler, nil))
      /* OR with manual configuration options
      lambda.Start(ddlambda.WrapHandler(myHandler, &ddlambda.Config{
        BatchInterval: time.Second * 15
        APIKey: "my-api-key",
      }))
      */
    }

    func myHandler(ctx context.Context, event MyEvent) (string, error) {
      // ...
    }
    ```

### Subscribe the Datadog Forwarder to the log groups

You need to subscribe the Datadog Forwarder Lambda function to each of your function’s log groups, in order to send metrics, traces and logs to Datadog.

1. [Install the Datadog Forwarder if you haven't][2].
2. [Subscribe the Datadog Forwarder to your function's log groups][5].

### Unified service tagging

Although it's optional, Datadog highly recommends tagging you serverless applications with the `env`, `service`, and `version` tags following the [unified service tagging documentation][6].

## Explore Datadog serverless monitoring

After you have configured your function following the steps above, you should be able to view metrics, logs and traces on the [Serverless Homepage][7].

## Monitor custom business logic

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

  // Submit a custom metric with timestamp
  ddlambda.MetricWithTimestamp(
    "coffee_house.order_value", // Metric name
    12.45, // Metric value
    time.Now(), // Timestamp, must be within last 20 mins
    "product:latte", "order:online" // Associated tags
  )
  
  req, err := http.NewRequest("GET", "http://example.com/status")

  // Add the datadog distributed tracing headers
  ddlambda.AddTraceHeaders(ctx, req)

  client := http.Client{}
  client.Do(req)
}
```

For more information on custom metric submission, see [here][8].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/amazon_web_services/
[2]: /serverless/forwarder/
[3]: https://github.com/DataDog/datadog-lambda-go
[4]: https://docs.aws.amazon.com/xray/latest/devguide/xray-services-lambda.html
[5]: /logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[6]: /getting_started/tagging/unified_service_tagging/#aws-lambda-functions
[7]: https://app.datadoghq.com/functions
[8]: /serverless/custom_metrics?tab=go
