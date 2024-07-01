---
title: Enhanced Lambda Metrics
aliases:
    - /serverless/real-time-enhanced-metrics
    - /serverless/real_time_enhanced_metrics
kind: documentation
---

{{< img src="serverless/lambda-metrics-dashboard.jpeg" alt="Lambda Enhanced Metrics Default Dashboard" >}}

## Overview

Datadog generates enhanced Lambda metrics from your Lambda runtime out-of-the-box with low latency, several second granularity, and detailed metadata for cold starts and custom tags.

Enhanced Lambda metrics give you a view above and beyond the default [Lambda metrics][1] enabled with the AWS Lambda integration. These metrics are distinguished by being in the `aws.lambda.enhanced.*` namespace, and are Datadog's best practice for setting real-time monitors on your serverless application health.

### Real-time enhanced Lambda metrics

The following real-time enhanced Lambda metrics are available, and they are tagged with the `aws_account`, `region`, `functionname`, `cold_start`, `memorysize`, `executedversion`, `resource` and `runtime`. These metrics are [distributions][2], and you can query them using the `count`, `min`, `max`, `sum`, and `avg` aggregations.


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

## Enable enhanced Lambda metrics

{{< img src="serverless/serverless_custom_metrics.png" alt="Collecting Enhanced Metrics from AWS Lambda" >}}

Follow the [installation instructions][3] to set up instrumentation of your serverless applications. Enhanced Lambda metrics are enabled by default.

## Viewing your dashboard

Once you've enabled Enhanced Lambda Metrics, view your [default dashboard in the Datadog app][4].

[1]: /integrations/amazon_lambda/#metric-collection
[2]: /metrics/distributions/
[3]: /serverless/installation/
[4]: https://app.datadoghq.com/screen/integration/aws_lambda_enhanced_metrics
