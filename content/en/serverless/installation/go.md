---
title: Instrumenting Go Applications
kind: documentation
further_reading:
- link: 'serverless/datadog_lambda_library/go'
  tag: "Documentation"
  text: 'Datadog Lambda Library for Go'
- link: 'serverless/serverless_tagging/'
  tag: "Documentation"
  text: 'Tagging Serverless Applications'
- link: 'serverless/distributed_tracing/'
  tag: "Documentation"
  text: 'Tracing Serverless Applications'
- link: 'serverless/custom_metrics/'
  tag: "Documentation"
  text: 'Submitting Custom Metrics from Serverless Applications'
aliases:
    - /serverless/datadog_lambda_library/go/
---

{{< img src="serverless/go-lambda-tracing.png" alt="Monitor Go Lambda Functions with Datadog"  style="width:100%;">}}

## Required setup

If not already configured, install the [AWS integration][1]. This allows Datadog to ingest Lambda metrics from AWS. After you have installed the [AWS integration][1], follow these steps to instrument your application to send metrics, logs, and traces to Datadog.

If you previously set up Datadog Serverless using the Datadog Forwarder, see the [installation instructions][2].

## Configuration

### Install the Datadog Lambda library

Install the [Datadog Lambda library][3] locally by running the following command:

```
go get github.com/DataDog/datadog-lambda-go
```

### Install the Datadog Lambda Extension

Add the Datadog Lambda Extension layer for your Lambda function using the ARN in the following format:

{{< site-region region="us,us3,eu" >}}
```
arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension:<EXTENSION_VERSION>
```
{{< /site-region >}}
{{< site-region region="gov" >}}
```
arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension:<EXTENSION_VERSION>
```
{{< /site-region >}}

The latest `EXTENSION_VERSION` is {{< latest-lambda-layer-version layer="extension" >}}.

### Instrument

Follow these steps to instrument the function:

1. Set the environment variable `DD_API_KEY` to your Datadog API key from [API Management][4]. 
1. Set environment variable `DD_FLUSH_TO_LOG` and `DD_TRACE_ENABLED` to `true`.
1. Import the required packages in the file declaring your Lambda function handler.

    ```go
    package main

    import (
      "github.com/aws/aws-lambda-go/lambda"
      "github.com/DataDog/datadog-lambda-go"
      "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
      httptrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http"
    )
    ```
1. Wrap your Lambda function handler using the wrapper provided by the Datadog Lambda library.

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
1. Use the included libraries to create additional spans, connect logs and traces, and pass trace context to other services.
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

### Tag

Although it's optional, Datadog highly recommends tagging you serverless applications with the `env`, `service`, and `version` tags following the [unified service tagging documentation][5].

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

For more information on custom metric submission, see [here][7].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/amazon_web_services/
[2]: /serverless/guide/datadog_forwarder_go
[3]: https://github.com/DataDog/datadog-lambda-go
[4]: https://app.datadoghq.com/account/settings#api
[5]: /getting_started/tagging/unified_service_tagging/#aws-lambda-functions
[6]: https://app.datadoghq.com/functions
[7]: /serverless/custom_metrics?tab=go
