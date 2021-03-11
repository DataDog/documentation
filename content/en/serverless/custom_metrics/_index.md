---
title: Custom Metrics
kind: documentation
---

If your Lambda functions are sending trace or log data to Datadog, and the data you want to query is captured in an existing log or trace, you can [generate custom metrics from logs and traces](#creating-custom-metrics-from-logs-or-traces) without re-deploying or making any changes to your application code. If you want to send new data not captured in an existing log or trace, you can [send custom metrics using the Datadog Lambda Library](#sending-custom-metrics-from-the-datadog-lambda-library).

## Creating custom metrics from logs or traces

With log-based metrics, you can record a count of logs that match a query or summarize a numeric value contained in a log, such as request duration. Log-based metrics are a cost-efficient way to summarize log data from the entire ingest stream. Learn more about creating log-based metrics [here][1]. 

You can also generate metrics from 100% of ingested spans, regardless of whether they are indexed by a retention filter. Learn more about creating span-based metrics [here][2].

## Sending custom metrics from the Datadog Lambda library

{{< img src="integrations/amazon_lambda/lambda_custom_metrics.png" alt="architecture diagram for collecting custom metrics from AWS Lambda" >}}

Install the Datadog Lambda Library to collect and send custom metrics. Metrics sent from the Datadog Lambda Library are automatically aggregated into [distributions][3], so you can graph the `avg`, `sum`, `max`, `min`, and `count`. You can also calculate aggregations over a set of tags for the 50th, 75th, 95th, and 99th percentile values on the [Distribution Metrics][3] page.

Distribution metrics are designed to instrument logical objects, like services, independent of the underlying hosts. So, they are well-suited for serverless infrastructure because they aggregate metrics server-side instead of locally with an Agent.

### Synchronous vs. asynchronous custom metrics

The Datadog Lambda Library supports submitting custom metrics in Lambda, both synchronously and asynchronously.

**Synchronous**: The default behavior. This method submits your custom metrics to Datadog via HTTP periodically (every 10 seconds) and at the end of your Lambda invocation. If the invocation lasts for less than 10 seconds, your custom metrics are submitted at the end of the invocation.

**Asynchronous (recommended)**: It's possible to submit your custom metrics with zero latency overhead **and** have them appear in Datadog in near-real-time. To accomplish this, the Lambda Library emits your custom metrics as a specially-formatted log, which the [Datadog Forwarder][4] parses and submits to Datadog. Logging in AWS Lambda is 100% asynchronous, so this method ensures there is zero latency overhead to your function.

### Enabling asynchronous custom metrics

1. Set the environment variable `DD_FLUSH_TO_LOG` to `True` on your Lambda function.
2. Update your [Datadog Forwarder][4] to at least version 1.4.0.

If you are not using Datadog Logs, you can still use asynchronous custom metric submission. Set the environment variable `DD_FORWARD_LOG` to `False` on the [Datadog log collection AWS Lambda function][4]. This intelligently forwards only custom metrics to Datadog, and not regular logs.

### Custom metrics sample code

In your function code, you must import the necessary methods from the Lambda Library and add a wrapper around your function handler. You do not need to wrap your helper functions. 

**Note:** The arguments to the custom metrics reporting methods have the following requirements:

- `<METRIC_NAME>` uniquely identifies your metric and adheres to the [metric naming policy][5].
- `<METRIC_VALUE>` MUST be a number (i.e. integer or float).
- `<TAG_LIST>` is optional and formatted, for example: `['owner:Datadog', 'env:demo', 'cooltag']`.

{{< programming-lang-wrapper langs="python,nodeJS,go,ruby,java,other" >}}
{{< programming-lang lang="python" >}}

```python
from datadog_lambda.metric import lambda_metric
from datadog_lambda.wrapper import datadog_lambda_wrapper

# You only need to wrap your function handler (Not helper functions). 
@datadog_lambda_wrapper
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
const { datadog, sendDistributionMetric } = require('datadog-lambda-js');

async function myHandler(event, context) {
    sendDistributionMetric(
        'coffee_house.order_value', // Metric name
        12.45, // Metric value
        'product:latte',
        'order:online' // Associated tags
    );
    return {
        statusCode: 200,
        body: 'hello, dog!'
    };
}
// You only need to wrap your function handler (Not helper functions).
module.exports.myHandler = datadog(myHandler);

/* OR with manual configuration options
module.exports.myHandler = datadog(myHandler, {
    apiKey: "my-api-key"
});
*/
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
            myTags.put("order","online");
        
        dd.metric(
            "coffee_house.order_value", // Metric name
            12.45,                      // Metric value
            myTags);                    // Associated tags
    }
}
```

{{< /programming-lang >}}
{{< programming-lang lang="other" >}}

Emitting [asynchronous custom metrics](#synchronous-vs-asynchronous-custom-metrics) is possible for any language or custom runtime. It works by printing a special JSON-formatted string in your Lambda function that the [Datadog Forwarder][1] identifies and submits to Datadog. To use this:

1. [Enable asynchronous cusstom metrics](#enabling-asynchronous-custom-metrics)
2. Write a reusable function that logs your custom metrics in the following format:

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

**Note:** These custom metrics are submitted as [distributions](#custom-metrics). If you were previously submitting custom metrics another way, [consult the documentation on the implications of upgrading to distributions](#understanding-distribution-metrics).

[1]: /serverless/forwarder/
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### Tagging custom metrics

You should tag your custom metrics when submitting them with the [Datadog Lambda Library][6]. Use the [Distribution Metrics][3] page to [customize the set of tags][7] applied to your custom metrics.

To add Lambda resource tags to your custom metrics, set the parameter `DdFetchLambdaTags` to `true` on the Datadog forwarder CloudFormation stack.

### Understanding distribution metrics

With distribution metrics, you select the aggregation when graphing or querying it instead of specifying it at submission time.

If you previously submitted custom metrics from Lambda without using one of the Datadog Lambda Libraries, you'll need to start instrumenting your custom metrics under **new metric names** when submitting them to Datadog. The same metric name cannot simultaneously exist as both distribution and non-distribution metric types.

To enable percentile aggregations for your distribution metrics, consult the [Distribution Metrics][7] page.

## Other submission methods

### Running in a VPC

The Datadog Lambda Library requires [access to the public internet][8] to submit custom metrics **synchronously**. If your Lambda function is associated with a VPC, ensure that it is instead submitting custom metrics **asynchronously** or that your function can reach the public internet.

### Using third-party libraries

There are a number of open source libraries that make it easy to submit custom metrics to Datadog. However, many have not been updated to use [Distribution metrics][3], which are optimized for Lambda. Distribution metrics allow for server-side aggregations independent of a host or locally-running [agent][9]. In a serverless environment where there is no agent, Distribution metrics give you flexible aggregations and tagging.

When evaluating third-party metrics libraries for AWS Lambda, ensure they support Distribution metrics.

### [DEPRECATED] Using CloudWatch logs

**This method of submitting custom metrics is no longer supported, and is disabled for all new customers.** The recommended way to submit custom metrics from Lambda is with a [Datadog Lambda Library][6].

This requires the following AWS permissions in your [Datadog IAM policy][10].

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
- `<METRIC_NAME>` uniquely identifies your metric and adheres to the [metric naming policy][5].
- `<TAG_LIST>` is optional, comma separated, and must be preceded by `#`. The tag `function_name:<name_of_the_function>` is automatically applied to custom metrics.

**Note**: The sum for each timestamp is used for counts and the last value for a given timestamp is used for gauges. It is not recommended to print a log statement every time you increment a metric, as this increases the time it takes to parse your logs. Continually update the value of the metric in your code, and print one log statement for that metric before the function finishes.

[1]: /logs/logs_to_metrics/
[2]: /tracing/generate_metrics/
[3]: https://docs.datadoghq.com/metrics/distributions/
[4]: /serverless/forwarder/
[5]: /developers/metrics/
[6]: /serverless/installation/
[7]: /metrics/distributions/#customize-tagging
[8]: https://aws.amazon.com/premiumsupport/knowledge-center/internet-access-lambda-function
[9]: /agent/
[10]: https://docs.datadoghq.com/integrations/amazon_web_services/#installation
