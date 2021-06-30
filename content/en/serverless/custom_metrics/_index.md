---
title: Custom Metrics
kind: documentation
---

## Overview

There are a few different ways to submit custom metrics to Datadog from a Lambda function. 

- **Creating custom metrics from logs or traces**: If your Lambda functions are already sending trace or log data to Datadog, and the data you want to query is captured in an existing log or trace, you can [generate custom metrics from logs and traces](#creating-custom-metrics-from-logs-or-traces) without re-deploying or making any changes to your application code.
- **Submitting custom metrics using the Datadog Lambda Extension**: If you want to submit custom metrics directly from your Lambda function, Datadog recommends using the [Datadog Lambda Extension](#with-the-datadog-lambda-extension). [Check whether the Datadog Lambda Extension is supported][1] in your Lambda function runtime.  
- **Submitting custom metrics using the Datadog Forwarder Lambda**: If you want to submit custom metrics from a runtime that is not yet supported by the Datadog Lambda Extension, you can use the [Datadog Forwarder Lambda](#with-the-datadog-forwarder).
- **(Deprecated) Submitting custom metrics from CloudWatch logs**: The method to submit custom metrics by printing a log formatted as `MONITORING|<UNIX_EPOCH_TIMESTAMP>|<METRIC_VALUE>|<METRIC_TYPE>|<METRIC_NAME>|#<TAG_LIST>` has been [deprecated](#deprecated-cloudwatch-logs), and you should migrate to one of the solutions above.
- **(Not recommended) Using a third-party library**: Most [third-party libraries](#third-party-libraries) do not submit metrics as distributions and can lead to under-counted results.

### Understanding distribution metrics

Custom metrics submitted from Lambda functions are aggregated as [distributions][2], because they are designed to instrument applications, independent of the underlying hosts. You can query the metrics using aggregations: `avg`, `sum`, `max`, `min`, `count`. You can also enable percentile aggregations (p50, p75, p90, p95, p99), and [manage tags][3] for aggregation on the Metric Summary page.

## Creating custom metrics from logs or traces

With log-based metrics, you can record a count of logs that match a query or summarize a numeric value contained in a log, such as request duration. Log-based metrics are a cost-efficient way to summarize log data from the entire ingest stream. Learn more about creating log-based metrics [here][4]. 

You can also generate metrics from 100% of ingested spans, regardless of whether they are indexed by a retention filter. Learn more about creating span-based metrics [here][5].
## With the Datadog Lambda Extension

{{< img src="serverless/serverless_custom_metrics.png" alt="Collecting Custom Metrics from AWS Lambda" >}}

Datadog recommends using the [Datadog Lambda Extension][1] to submit custom metrics from supported Lambda runtimes.

1. Follow the general [serverless installation instructions][6] to configure your Lambda function and install the Datadog Lambda Library and Extension.
1. If you are not interested in collecting traces from your Lambda function, set the environment variable `DD_TRACE_ENABLED` to `false`.
1. If you are not interested in collecting logs from your Lambda function, set the environment variable `DD_SERVERLESS_LOGS_ENABLED` to `false`.
1. Import and use the helper function from the Datadog Lambda Library, such as `lambda_metric` or `sendDistributionMetric`, to submit your custom metrics following the [sample code](#custom-metrics-sample-code).

If your Lambda function is running in a VPC, ensure that your function can reach Datadog API endpoints either through the public internet, [PrivateLink][7] or a [proxy][8].

## With the Datadog Forwarder

Datadog recommends using the [Datadog Forwarder Lambda][9] to submit custom metrics from Lambda runtimes that are not yet supported by the Datadog Lambda Extension.

1. Follow the general [serverless installation instructions][6] to configure your Lambda function, install the Datadog Lambda Library and the Datadog Forwarder Lambda function, and subscribe the Forwarder to your function's log group.
1. If you are not interested in collecting traces from your Lambda function, set the environment variable `DD_TRACE_ENABLED` to `false` on your own Lambda function.
1. If you are not interested in collecting logs from your Lambda function, set the Forwarder's CloudFormation stack parameter `DdForwardLog` to `false`.
1. Import and use the helper function from the Datadog Lambda Library, such as `lambda_metric` or `sendDistributionMetric`, to submit your custom metrics following the [sample code](#custom-metrics-sample-code).

If the Datadog Lambda Library is not available for your runtime, you can print metrics to CloudWatch logs in the expected JSON format on your own. Select the "Other" tab from the [sample code](#custom-metrics-sample-code) section.

## Custom metrics sample code

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

There are a number of open source libraries that make it easy to submit custom metrics to Datadog. However, many have not been updated to use [Distribution metrics][2], which are optimized for Lambda. Distribution metrics allow for server-side aggregations independent of a host, and give you flexible aggregations and tagging.

When evaluating third-party metrics libraries for AWS Lambda, ensure they support Distribution metrics.

## [DEPRECATED] CloudWatch logs

**This method of submitting custom metrics is no longer supported, and is disabled for all new customers. Migrate to one of the recommended solutions.**

**Note**: If you are migrating to one of the recommended solutions, you'll need to start instrumenting your custom metrics under **new metric names** when submitting them to Datadog. The same metric name cannot simultaneously exist as both distribution and non-distribution metric types.

This requires the following AWS permissions in your [Datadog IAM policy][0].

| AWS Permission            | Description                                                 |
| ------------------------- | ----------------------------------------------------------- |
| `logs:DescribeLogGroups`  | List available log groups.                                  |
| `logs:DescribeLogStreams` | List available log streams for a group.                     |
| `logs:FilterLogEvents`    | Fetch specific log events for a stream to generate metrics. |

To send custom metrics to Datadog from your Lambda logs, print a log line using the following format:

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

[1]: /serverless/libraries_integrations/extension/
[2]: /metrics/distributions/
[3]: /metrics/distributions/#customize-tagging
[4]: /logs/logs_to_metrics/
[5]: /tracing/generate_metrics/
[6]: /serverless/installation/
[7]: /agent/guide/private-link/
[8]: /agent/proxy/
[9]: /serverless/forwarder/
[10]: /developers/metrics/
