---
title: Custom Metrics
kind: documentation
---

## Overview

There are a few different ways to submit custom metrics to Datadog from a Lambda function. 

- **Creating custom metrics from logs or traces**: If your Lambda functions are already sending trace or log data to Datadog, and the data you want to query is captured in an existing log or trace, you can [generate custom metrics from logs and traces](#creating-custom-metrics-from-logs-or-traces) without re-deploying or making any changes to your application code.
- **Submitting custom metrics synchronously**: If you want to generate custom metrics from a non-performance-critical Lambda function written in Python, Node.js or Golang and you are not interested in collecting traces, you can use Datadog Lambda Library to [submit custom metrics synchronously](#enabling-synchronous-custom-metrics).
- **Submitting custom metrics asynchronously**: If you want to generate custom metrics from a performance-critical Lambda function, Datadog encourage you to use Datadog Lambda Library to [submit custom metrics asynchronously](#enabling-asynchronous-custom-metrics).
- **(Deprecated) Submitting custom metrics from CloudWatch logs**: The method to submit custom metrics by printing a log formatted as `MONITORING|<UNIX_EPOCH_TIMESTAMP>|<METRIC_VALUE>|<METRIC_TYPE>|<METRIC_NAME>|#<TAG_LIST>` has been [deprecated](#deprecated-cloudwatch-logs), and you should migrate to one of the solutions above.
- **(Not recommended) Using a third-party library**: Most of [third-party libraries](#third-party-libraries) do not submit metrics as distributions and can lead to under-counted results.

### Understanding distribution metrics

Custom metrics submitted from Lambda functions are aggregated as [distributions][1], as they are designed to instrument applications, independent of the underlying hosts. You can query the metrics using aggregation `avg`, `sum`, `max`, `min`, `count`. You can also enable percentile aggregations (p50, p75, p90, p95, p99) and [manage tags][2] for aggregation on the metric summary page.

Certain submission methods allow you submit metrics with timestamps from the past, up-to 20 mins old.

## Creating custom metrics from logs or traces

With log-based metrics, you can record a count of logs that match a query or summarize a numeric value contained in a log, such as request duration. Log-based metrics are a cost-efficient way to summarize log data from the entire ingest stream. Learn more about creating log-based metrics [here][3]. 

You can also generate metrics from 100% of ingested spans, regardless of whether they are indexed by a retention filter. Learn more about creating span-based metrics [here][4].

## Enabling synchronous custom metrics

If you want to generate custom metrics from a Lambda function that is written in Python, Node.js or Golang and is performance-critical, you can use Datadog Lambda Library to submit custom metrics synchronously to Datadog API at the end your Lambda invocation.

1. Follow the general [serverless installation instructions][5] to install the Datadog Lambda Library and configure your Lambda function. Note, you do _NOT_ need to add the Datadog Lambda Extension or Forwarder.
1. Ensure the environment variable `DD_FLUSH_TO_LOG` is set to `false`, which instructs the Datadog Lambda Library to send metrics synchronously to the Datadog API.
1. Ensure the environment variable `DD_TRACE_ENABLED` is set to `false`, which instructs the Datadog Lambda Library to NOT generate traces for the Lambda function.
1. Ensure the environment variable `DD_API_KEY` (or an equivalent one when encrypted) is set with a valid Datadog API key.
1. Import and use the helper function from the Datadog Lambda Library, such as `lambda_metric` or `sendDistributionMetric`, to submit your custom metrics following the [sample code](#custom-metrics-sample-code).
### Running in a VPC

The Datadog Lambda Library requires [access to the public internet][6] to submit custom metrics **synchronously**. If your Lambda function is associated with a VPC, ensure that your function can reach the public internet.

## Enabling asynchronous custom metrics

If you want to generate custom metrics from a performance-critical Lambda function, Datadog encourage you to use Datadog Lambda Library to submit custom metrics asynchronously. The Datadog Lambda Library can either

- Publishes your custom metrics to the [Datadog Lambda Extension][7], which will submit your custom metrics directly to Datadog without impacting your function latency. This solution is easier to set up, but it currently only work for the popular runtimes, and does not support submitting metrics with timestamps from the past.
- Emits your custom metrics as specially-formatted log which the [Datadog Forwarder][8] parses and submits to Datadog. This solution works for any runtime and metrics with timestamps from the past.

### With the Datadog Lambda Extension

{{< img src="serverless/serverless_custom_metrics.png" alt="Collecting Custom Metrics from AWS Lambda" >}}

1. Follow the general [serverless installation instructions][5] to configure your Lambda function and install the Datadog Lambda Library and Extension.
1. If you are not interested in collecting traces from the Lambda function, set the environment variable `DD_TRACE_ENABLED` to `false`.
1. If you are not interested in collecting logs from the Lambda function, set the environment variable `DD_LOGS_ENABLED` to `false`.
1. Import and use the helper function from the Datadog Lambda Library, such as `lambda_metric` or `sendDistributionMetric`, to submit your custom metrics following the [sample code](#custom-metrics-sample-code).

### With the Datadog Forwarder

You can emit metrics to CloudWatch logs using the Datadog Lambda Library.

1. Follow the general [serverless installation instructions][5] (certain runtimes default to using the Extension, and see [here][9] for the Forwarder-based installation guides) to configure your Lambda function, install the Datadog Lambda Library and the Datadog Forwarder Lambda function, and subscribe the Forwarder to your function's log group. For Lambda runtimes not listed in the installation guide, refer to the next section for solutions.
1. If you are not interested in collecting traces from the Lambda function, set the environment variable `DD_TRACE_ENABLED` to `false` on your own Lambda function.
1. If you are not interested in collecting logs from the Lambda function, update the Forwarder's CloudFormation stack parameter `DdForwardLog` to `false`.
1. Import and use the helper function from the Datadog Lambda Library, such as `lambda_metric` or `sendDistributionMetric`, to submit your custom metrics following the [sample code](#custom-metrics-sample-code).

You can also emit metrics to CloudWatch logs in the following json format on your own from any Lambda runtime without installing the Datadog Lambda Library.

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

## Custom metrics sample code

Refer to the following sample code for both synchronous and asynchronous custom metric submissions. 

**Note:** The arguments to the custom metrics reporting methods have the following requirements:

- `<METRIC_NAME>` uniquely identifies your metric and adheres to the [metric naming policy][10].
- `<METRIC_VALUE>` MUST be a number (i.e. integer or float).
- `<TAG_LIST>` is optional and formatted, for example: `['owner:Datadog', 'env:demo', 'cooltag']`.

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
```
{{< /programming-lang >}}
{{< programming-lang lang="nodeJS" >}}

```javascript
const { sendDistributionMetric } = require('datadog-lambda-js');

async function myHandler(event, context) {
    sendDistributionMetric(
        'coffee_house.order_value', // Metric name
        12.45, // Metric value
        'product:latte', // First tag
        'order:online' // Second tag
    );
    return {
        statusCode: 200,
        body: 'hello, dog!'
    };
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
  // You only need to wrap your function handler (Not helper functions). 
  lambda.Start(ddlambda.WrapHandler(myHandler, nil))
  /* OR with manual configuration options
  lambda.Start(ddlambda.WrapHandler(myHandler, &ddlambda.Config{
    BatchInterval: time.Second * 15
    APIKey: "my-api-key",
  }))
  */
}

func myHandler(ctx context.Context, event MyEvent) (string, error) {
  ddlambda.Distribution(
    "coffee_house.order_value",     // Metric name
    12.45,                          // Metric value
    "product:latte", "order:online" // Associated tags
  )
  // ...
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
        return { statusCode: 200, body: 'Hello World' }
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

## Third-party libraries

There are a number of open source libraries that make it easy to submit custom metrics to Datadog. However, many have not been updated to use [Distribution metrics][1], which are optimized for Lambda. Distribution metrics allow for server-side aggregations independent of a host, and give you flexible aggregations and tagging.

When evaluating third-party metrics libraries for AWS Lambda, ensure they support Distribution metrics.

## [DEPRECATED] CloudWatch logs

**This method of submitting custom metrics is no longer supported, and is disabled for all new customers.** The recommended way to submit custom metrics from Lambda is with a [Datadog Lambda Library][5].

This requires the following AWS permissions in your [Datadog IAM policy][0].

| AWS Permission            | Description                                                 |
| ------------------------- | ----------------------------------------------------------- |
| `logs:DescribeLogGroups`  | List available log groups.                                  |
| `logs:DescribeLogStreams` | List available log streams for a group.                     |
| `logs:FilterLogEvents`    | Fetch specific log events for a stream to generate metrics. |

**[DEPRECATED]** To send custom metrics to Datadog from your Lambda logs, print a log line using the following format:

```text
MONITORING|<UNIX_EPOCH_TIMESTAMP>|<METRIC_VALUE>|<METRIC_TYPE>|<METRIC_NAME>|#<TAG_LIST>
```

Where:

- `MONITORING` signals to the Datadog integration that it should collect this log entry.
- `<UNIX_EPOCH_TIMESTAMP>` is in seconds, not milliseconds.
- `<METRIC_VALUE>` MUST be a number (i.e. integer or float).
- `<METRIC_TYPE>` is `count`, `gauge`, `histogram`, or `check`.
- `<METRIC_NAME>` uniquely identifies your metric and adheres to the [metric naming policy][10].
- `<TAG_LIST>` is optional, comma separated, and must be preceded by `#`. The tag `function_name:<name_of_the_function>` is automatically applied to custom metrics.

**Note**: The sum for each timestamp is used for counts and the last value for a given timestamp is used for gauges. It is not recommended to print a log statement every time you increment a metric, as this increases the time it takes to parse your logs. Continually update the value of the metric in your code, and print one log statement for that metric before the function finishes.

**Note**: If you are migrating to one of the recommended solutions, you'll need to start instrumenting your custom metrics under **new metric names** when submitting them to Datadog. The same metric name cannot simultaneously exist as both distribution and non-distribution metric types.

[1]: /metrics/distributions/
[2]: /metrics/distributions/#customize-tagging
[3]: /logs/logs_to_metrics/
[4]: /tracing/generate_metrics/
[5]: /serverless/installation/
[6]: https://aws.amazon.com/premiumsupport/knowledge-center/internet-access-lambda-function
[7]: /serverless/libraries_integrations/extension/
[8]: /serverless/forwarder/
[9]: /serverless/guide/
[10]: /developers/metrics/
