---
title: AWS Lambda metrics
aliases:
  - /serverless/custom_metrics
  - /serverless/enhanced_lambda_metrics
  - /serverless/real-time-enhanced-metrics
  - /serverless/real_time_enhanced_metrics
---

This page discusses metrics for monitoring serverless applications on AWS Lambda. 

After you [install Serverless Monitoring for AWS Lambda][1], Datadog generates [enhanced metrics](#enhanced-lambda-metrics) from your Lambda runtime. You can also [submit custom metrics](#submit-custom-metrics) to Datadog from your Lambda functions.

{{< img src="serverless/serverless_custom_metrics.png" alt="Collecting Enhanced Metrics from AWS Lambda" >}}

### Collect metrics from non-Lambda resources

Datadog can also help you collect metrics for AWS managed resources—such as [API Gateway][2], [AppSync][3], and [SQS][4]—to help you monitor your entire serverless application. These metrics are enriched with corresponding AWS resource tags.

To collect these metrics, set up the [Datadog AWS integration][5].

[1]: /serverless/aws_lambda/installation
[2]: /integrations/amazon_api_gateway/#data-collected
[3]: /integrations/amazon_appsync/#data-collected
[4]: /integrations/amazon_sqs/#data-collected
[5]: /integrations/amazon_web_services/

## Enhanced Lambda metrics

{{< img src="serverless/lambda-metrics-dashboard.jpeg" alt="Lambda Enhanced Metrics Default Dashboard" width="80%">}}

Datadog generates enhanced Lambda metrics from your Lambda runtime out-of-the-box with low latency, several second granularity, and detailed metadata for cold starts and custom tags.

Enhanced Lambda metrics are in addition to the default [Lambda metrics][6] enabled with the AWS Lambda integration. Enhanced metrics are distinguished by being in the `aws.lambda.enhanced.*` namespace. You can view these metrics on the [Enhanced Lambda Metrics default dashboard][7].

The following real-time enhanced Lambda metrics are available, and they are tagged with corresponding `aws_account`, `region`, `functionname`, `cold_start`, `memorysize`, `executedversion`, `resource` and `runtime` tags. 

These metrics are [distributions][8]: you can query them using the `count`, `min`, `max`, `sum`, and `avg` aggregations.

`aws.lambda.enhanced.invocations`
: Measures the number of times a function is invoked in response to an event or an invocation of an API call.

`aws.lambda.enhanced.errors`
: Measures the number of invocations that failed due to errors in the function.

`aws.lambda.enhanced.max_memory_used`
: Measures the maximum amount of memory (mb) used by the function.

`aws.lambda.enhanced.duration`
: Measures the elapsed seconds from when the function code starts executing as a result of an invocation to when it stops executing.

`aws.lambda.enhanced.billed_duration`
: Measures the billed amount of time the function ran for (100ms increments).

`aws.lambda.enhanced.init_duration`
: Measures the initialization time (second) of a function during a cold start.

`aws.lambda.enhanced.runtime_duration`
: Measures the elapsed milliseconds from when the function code starts executing to when it returns the response back to the client, excluding the post-runtime duration added by Lambda extension executions.

`aws.lambda.enhanced.post_runtime_duration`
: Measures the elapsed milliseconds from when the function code returns the response back to the client to when the function stops executing, representing the duration added by Lambda extension executions.

`aws.lambda.enhanced.response_latency`
: Measures the elapsed time in milliseconds from when the invocation request is received to when the first byte of response is sent to the client.

`aws.lambda.enhanced.response_duration`
: Measures the elapsed time in milliseconds from when the first byte of response to the last byte of response is sent to the client.

`aws.lambda.enhanced.produced_bytes`
: Measures the number of bytes returned by a function.

`aws.lambda.enhanced.estimated_cost`
: Measures the total estimated cost of the function invocation (US dollars).

`aws.lambda.enhanced.timeouts`
: Measures the number of times a function times out.

`aws.lambda.enhanced.out_of_memory`
: Measures the number of times a function runs out of memory.

[6]: /integrations/amazon_lambda/#metric-collection
[7]: https://app.datadoghq.com/screen/integration/aws_lambda_enhanced_metrics
[8]: /metrics/distributions/

## Submit custom metrics

### Create custom metrics from logs or traces
If your Lambda functions are already sending trace or log data to Datadog, and the data you want to query is captured in an existing log or trace, you can generate custom metrics from logs and traces without re-deploying or making any changes to your application code.

With log-based metrics, you can record a count of logs that match a query or summarize a numeric value contained in a log, such as a request duration. Log-based metrics are a cost-efficient way to summarize log data from the entire ingest stream. Learn more about [creating log-based metrics][9].

You can also generate metrics from all ingested spans, regardless of whether they are indexed by a retention filter. Learn more about [creating span-based metrics][10].

### Submit custom metrics directly from a Lambda function

All custom metrics are submitted as [distributions](#understanding-distribution-metrics).

**Note**: Distribution metrics must be submitted with a new name, do not re-use a name of a previously submitted metric.

1. [Install Serverless Monitoring for AWS Lambda][1] and ensure that you have installed the Datadog Lambda extension.

2. Choose your runtime:

{{< programming-lang-wrapper langs="python,nodeJS,go,java,dotnet,other" >}}
{{< programming-lang lang="python" >}}

```python
from datadog_lambda.metric import lambda_metric

def lambda_handler(event, context):
    lambda_metric(
        "coffee_house.order_value",             # Metric name
        12.45,                                  # Metric value
        tags=['product:latte', 'order:online']  # Associated tags
    )
```
{{< /programming-lang >}}
{{< programming-lang lang="nodeJS" >}}

```javascript
const { sendDistributionMetric } = require('datadog-lambda-js');

async function myHandler(event, context) {
    sendDistributionMetric(
        'coffee_house.order_value', // Metric name
        12.45,                      // Metric value
        'product:latte',            // First tag
        'order:online'              // Second tag
    );
}
```
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

```go
package main

import (
  "github.com/aws/aws-lambda-go/lambda"
  "github.com/DataDog/datadog-lambda-go"
)

func main() {
  lambda.Start(ddlambda.WrapFunction(myHandler, nil))
}

func myHandler(ctx context.Context, event MyEvent) (string, error) {
  ddlambda.Distribution(
    "coffee_house.order_value",     // Metric name
    12.45,                          // Metric value
    "product:latte", "order:online" // Associated tags
  )
}
```
{{< /programming-lang >}}
{{< programming-lang lang="java" >}}

Install the latest version of [`java-dogstatsd-client`][1].

```java
package com.datadog.lambda.sample.java;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayV2ProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayV2ProxyResponseEvent;

// import the statsd client builder
import com.timgroup.statsd.NonBlockingStatsDClientBuilder;
import com.timgroup.statsd.StatsDClient;

public class Handler implements RequestHandler<APIGatewayV2ProxyRequestEvent, APIGatewayV2ProxyResponseEvent> {

    // instantiate the statsd client
    private static final StatsDClient Statsd = new NonBlockingStatsDClientBuilder().hostname("localhost").build();

    @Override
    public APIGatewayV2ProxyResponseEvent handleRequest(APIGatewayV2ProxyRequestEvent request, Context context) {

        // submit a distribution metric
        Statsd.recordDistributionValue("my.custom.java.metric", 1, new String[]{"tag:value"});

        APIGatewayV2ProxyResponseEvent response = new APIGatewayV2ProxyResponseEvent();
        response.setStatusCode(200);
        return response;
    }
}
```

[1]: https://github.com/DataDog/java-dogstatsd-client
{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}

Install the latest version of [`dogstatsd-csharp-client`][1].

```csharp
using System.IO;

// import the statsd client
using StatsdClient;

namespace Example
{
  public class Function
  {
    static Function()
    {
        // instantiate the statsd client
        var dogstatsdConfig = new StatsdConfig
        {
            StatsdServerName = "127.0.0.1",
            StatsdPort = 8125,
        };
        if (!DogStatsd.Configure(dogstatsdConfig))
            throw new InvalidOperationException("Cannot initialize DogstatsD. Set optionalExceptionHandler argument in the `Configure` method for more information.");
    }

    public Stream MyHandler(Stream stream)
    {
        // submit a distribution metric
        DogStatsd.Distribution("my.custom.dotnet.metric", 1, tags: new[] { "tag:value" });
        // your function logic
    }
  }
}
```

[1]: https://github.com/DataDog/dogstatsd-csharp-client
{{< /programming-lang >}}
{{< programming-lang lang="other" >}}

1. [Install][1] the DogStatsD client for your runtime
2. Follow the [sample code][2] to submit your custom metrics.

[1]: /developers/dogstatsd/?tab=hostagent#install-the-dogstatsd-client
[2]: /developers/dogstatsd/?tab=hostagent#instantiate-the-dogstatsd-client
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### Submit historical metrics with the Datadog Forwarder

In most cases, Datadog recommends that you use the Datadog Lambda extension to submit custom metrics. However, the Lambda extension can only submit metrics with a current timestamp.

To submit historical metrics, use the Datadog Forwarder. These metrics can have timestamps within the last one hour.

Start by [installing Serverless Monitoring for AWS Lambda][1]. Ensure that you have installed the Datadog Lambda Forwarder.

Then, choose your runtime:

{{< programming-lang-wrapper langs="python,nodeJS,go,ruby,java,other" >}}
{{< programming-lang lang="python" >}}

```python
from datadog_lambda.metric import lambda_metric

def lambda_handler(event, context):
    lambda_metric(
        "coffee_house.order_value",             # Metric name
        12.45,                                  # Metric value
        tags=['product:latte', 'order:online']  # Associated tags
    )

    # Submit a metric with a timestamp that is within the last 20 minutes
    lambda_metric(
        "coffee_house.order_value",             # Metric name
        12.45,                                  # Metric value
        timestamp=int(time.time()),             # Unix epoch in seconds
        tags=['product:latte', 'order:online']  # Associated tags
    )
```
{{< /programming-lang >}}
{{< programming-lang lang="nodeJS" >}}

```javascript
const { sendDistributionMetric } = require('datadog-lambda-js');

async function myHandler(event, context) {
    sendDistributionMetric(
        'coffee_house.order_value', // Metric name
        12.45,                      // Metric value
        'product:latte',            // First tag
        'order:online'              // Second tag
    );

    // Submit a metric with a timestamp that is within the last 20 minutes
    sendDistributionMetricWithDate(
        'coffee_house.order_value', // Metric name
        12.45,                      // Metric value
        new Date(Date.now()),       // date
        'product:latte',            // First tag
        'order:online',             // Second tag
    );
}
```
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

```go
package main

import (
  "github.com/aws/aws-lambda-go/lambda"
  "github.com/DataDog/datadog-lambda-go"
)

func main() {
  lambda.Start(ddlambda.WrapFunction(myHandler, nil))
}

func myHandler(ctx context.Context, event MyEvent) (string, error) {
  ddlambda.Distribution(
    "coffee_house.order_value",     // Metric name
    12.45,                          // Metric value
    "product:latte", "order:online" // Associated tags
  )

  // Submit a metric with a timestamp that is within the last 20 minutes
  ddlambda.MetricWithTimestamp(
    "coffee_house.order_value",     // Metric name
    12.45,                          // Metric value
    time.Now(),                     // Timestamp
    "product:latte", "order:online" // Associated tags
  )
}
```

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

```ruby
require 'datadog/lambda'

def handler(event:, context:)
    # You only need to wrap your function handler (Not helper functions).
    Datadog::Lambda.wrap(event, context) do
        Datadog::Lambda.metric(
          'coffee_house.order_value',         # Metric name
          12.45,                              # Metric value
          "product":"latte", "order":"online" # Associated tags
        )

        # Submit a metric with a timestamp that is within the last 20 minutes
        Datadog::Lambda.metric(
          'coffee_house.order_value',         # Metric name
          12.45,                              # Metric value
          time: Time.now.utc,                 # Timestamp
          "product":"latte", "order":"online" # Associated tags
        )
    end
end
```

{{< /programming-lang >}}
{{< programming-lang lang="java" >}}

```java
public class Handler implements RequestHandler<APIGatewayV2ProxyRequestEvent, APIGatewayV2ProxyResponseEvent> {
    public Integer handleRequest(APIGatewayV2ProxyRequestEvent request, Context context){
        DDLambda dd = new DDLambda(request, lambda);

        Map<String,String> myTags = new HashMap<String, String>();
            myTags.put("product", "latte");
            myTags.put("order", "online");

        dd.metric(
            "coffee_house.order_value", // Metric name
            12.45,                      // Metric value
            myTags);                    // Associated tags
    }
}
```

{{< /programming-lang >}}
{{< programming-lang lang="other" >}}

Write a reusable function that logs your custom metrics in the following format:

```json
{
    "m": "Metric name",
    "v": "Metric value",
    "e": "Unix timestamp (seconds)",
    "t": "Array of tags"
}
```

For example:

```json
{
    "m": "coffee_house.order_value",
    "v": 12.45,
    "e": 1572273854,
    "t": ["product:latte", "order:online"]
}
```

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

#### Submitting many data points

Using the Forwarder to submit many data points for the same metric and the same set of tags (for example, inside a big `for`-loop) may impact Lambda performance and CloudWatch cost. 

You can aggregate the data points in your application to avoid the overhead. 

For example, in Python:

```python
def lambda_handler(event, context):

    # Inefficient when event['Records'] contains many records
    for record in event['Records']:
      lambda_metric("record_count", 1)

    # Improved implementation
    record_count = 0
    for record in event['Records']:
      record_count += 1
    lambda_metric("record_count", record_count)
```

### Understanding distribution metrics

When Datadog receives multiple count or gauge metric points that share the same timestamp and set of tags, only the most recent one counts. This works for host-based applications because metric points get aggregated by the Datadog agent and tagged with a unique `host` tag.

A Lambda function may launch many concurrent execution environments when traffic increases. The function may submit count or gauge metric points that overwrite each other and cause undercounted results. To avoid this problem, custom metrics generated by Lambda functions are submitted as [distributions][11] because distribution metric points are aggregated on the Datadog backend, and every metric point counts.

Distributions provide `avg`, `sum`, `max`, `min`, `count` aggregations by default. On the Metric Summary page, you can enable percentile aggregations (p50, p75, p90, p95, p99) and also [manage tags][12]. To monitor a distribution for a gauge metric type, use `avg` for both the [time and space aggregations][13]. To monitor a distribution for a count metric type, use `sum` for both the [time and space aggregations][13]. Refer to the guide [Query to the Graph][14] for how time and space aggregations work.

[9]: /logs/logs_to_metrics/
[10]: /tracing/trace_pipeline/generate_metrics/
[11]: /metrics/distributions/
[12]: /metrics/distributions/#customize-tagging
[13]: /metrics/#time-and-space-aggregation
[14]: /dashboards/guide/query-to-the-graph/
