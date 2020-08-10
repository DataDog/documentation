---
title: Enhanced Lambda Metrics
kind: documentation
---

{{< img src="serverless/lambda-metrics-dashboard.jpeg" alt="Lambda Enhanced Metrics Default Dashboard" >}}

## Overview

Datadog generates real-time Lambda runtime metrics out-of-the-box for Node.js, Python, Ruby, Java, and Go runtimes. These metrics are enabled by default, but only get sent asynchronously. 

Using the [Datadog Lambda Library][1] and [Datadog Forwarder][2], Datadog can generate metrics with low latency, several second granularity, and detailed metadata for cold starts and custom tags. These metrics are distinguished by being in the `aws.lambda.enhanced.*` namespace, and are Datadog’s best practice for setting real-time monitors on your serverless application health.

Enhanced Lambda metrics give you a view above and beyond the default [Amazon CloudWatch metrics][3] enabled with the AWS Lambda integration.

### Real-time enhanced Lambda metrics

Datadog generates real-time Lambda runtime metrics out-of-the-box for Node.js, Python, and Ruby runtimes.

Using the Datadog Lambda Layers and Datadog Forwarder, Datadog can generate metrics with low latency, several second granularities, and detailed metadata for cold starts and custom tags.

| Metric                                  | Description                                                                                                                                        |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **aws.lambda.enhanced.invocations**     | Measures the number of times a function is invoked in response to an event or invocation API call.                                                 |
| **aws.lambda.enhanced.errors**          | Measures the number of invocations that failed due to errors in the function (response code 4XX).                                                  |
| **aws.lambda.enhanced.max_memory_used** | Measures the amount of memory used by the function.                                                                                                |
| **aws.lambda.enhanced.duration**        | Measures the average elapsed wall clock time from when the function code starts executing as a result of an invocation to when it stops executing. |
| **aws.lambda.enhanced.billed_duration** | Measures the billed amount of time the function ran for (100ms increments).                                                                        |
| **aws.lambda.enhanced.init_duration** | Measures the initialization time of a function during a cold start.                                  |
| **aws.lambda.enhanced.estimated_cost**  | Measures the total estimated cost of the function invocation (US dollars).                                                                         |
| **aws.lambda.enhanced.timeouts**  | Measures the number of times a function times out.                        |
| **aws.lambda.enhanced.out_of_memory**  | Measures the number of times a function runs out of memory.                        |

These metrics are tagged with the `functionname`, `cold_start`, `memorysize`, `region`, `account_id`, `allocated_memory`, `executedversion`, `resource` and `runtime`. These are [DISTRIBUTION][10] type metrics, so you can display their `count`, `min`, `max`, `sum`, and `avg`.

**Note**: Enhanced metrics are sent to the Datadog Forwarder via CloudWatch Logs, meaning you’ll see an increased volume of logs in CloudWatch. This may affect your AWS bill. To opt-out, set the DD_ENHANCED_METRICS environment variable to false on your AWS Lambda functions.

## Enable Enhanced Lambda Metrics

Datadog generates real-time Lambda runtime metrics out-of-the-box for Node.js, Python, Ruby, Java, and Go runtimes. To enable enhanced Lambda metrics on your functions, follow the [installation instructions][4].

To enable enhanced Lambda metrics without enabling logging for your functions, ensure the `DdForwarderLog` environment variable is set to `false` on your Datadog Forwarder.

## Viewing your dashboard

Once you've enabled Enhanced Lambda Metrics, view your [default dashboard in the Datadog app][5].

[1]: /serverless/installation/installing_the_library
[2]: /serverless/forwarder/
[3]: /integrations/amazon_lambda/?tab=nodejs#metric-collection
[4]: /serverless/installation/
[5]: https://app.datadoghq.com/screen/integration/30306/aws-lambda-enhanced-metrics
