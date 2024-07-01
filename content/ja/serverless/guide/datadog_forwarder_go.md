---
title: Instrumenting Go Serverless Applications Using the Datadog Forwarder
kind: guide
---
## Overview

<div class="alert alert-warning">
If you are a new user of Datadog Serverless, follow the <a href="/serverless/installation/go">instructions to instrument your Lambda functions using the Datadog Lambda Extension</a> instead. If you have setup Datadog Serverless with the Datadog Forwarder before Lambda offered out-of-the-box functionality, use this guide to maintain your instance.
</div>

## Required setup

If not already configured:

- Install the [AWS integration][1]. This allows Datadog to ingest Lambda metrics from AWS. 
- Install the [Datadog Forwarder Lambda function][2], which is required to ingest AWS Lambda traces, enhanced metrics, custom metrics, and logs. 

After you have installed the [AWS integration][1] and the [Datadog Forwarder][2], follow these steps to instrument your application to send metrics, logs, and traces to Datadog.

## Configuration

### Install

Install the [Datadog Lambda library][3] locally by running the following command:

```
go get github.com/DataDog/datadog-lambda-go
```

### Instrument

Follow these steps to instrument the function:

1. Set environment variable `DD_FLUSH_TO_LOG` and `DD_TRACE_ENABLED` to `true`.
2. Import the required packages in the file declaring your Lambda function handler.

    ```go
    package main

    import (
      "github.com/aws/aws-lambda-go/lambda"
      "github.com/DataDog/datadog-lambda-go"
      "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
      httptrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http"
    )
    ```
3. Wrap your Lambda function handler using the wrapper provided by the Datadog Lambda library.

    ```go
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
    ```
4. Use the included libraries to create additional spans, connect logs and traces, and pass trace context to other services.
    ```go
    func myHandler(ctx context.Context, event MyEvent) (string, error) {
      // Trace an HTTP request
      req, _ := http.NewRequestWithContext(ctx, "GET", "https://www.datadoghq.com", nil)
      client := http.Client{}
      client = *httptrace.WrapClient(&client)
      client.Do(req)

      // Connect your Lambda logs and traces
      currentSpan, _ := tracer.SpanFromContext(ctx)
      log.Printf("my log message %v", currentSpan)

      // Create a custom span
      s, _ := tracer.StartSpanFromContext(ctx, "child.span")
      time.Sleep(100 * time.Millisecond)
      s.Finish()
    }
    ```

### Subscribe

Subscribe the Datadog Forwarder Lambda function to each of your function's log groups, in order to send metrics, traces, and logs to Datadog.

1. [Install the Datadog Forwarder if you haven't][2].
2. [Subscribe the Datadog Forwarder to your function's log groups][4].

### Tag

Although it's optional, Datadog recommends tagging your serverless applications with the `env`, `service`, and `version` tags for [unified service tagging][5].

## Explore

After configuring your function following the steps above, view your metrics, logs, and traces on the [Serverless homepage][6].

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

Learn more about [custom metric submission][7].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/amazon_web_services/
[2]: /serverless/forwarder/
[3]: https://github.com/DataDog/datadog-lambda-go
[4]: /logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[5]: /getting_started/tagging/unified_service_tagging/#aws-lambda-functions
[6]: https://app.datadoghq.com/functions
[7]: /serverless/custom_metrics?tab=go
