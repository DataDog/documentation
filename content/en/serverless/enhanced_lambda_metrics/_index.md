---
title: Enhanced Lambda Metrics
aliases:
    - /serverless/real-time-enhanced-metrics
    - /serverless/real_time_enhanced_metrics
kind: documentation
---

{{< img src="serverless/lambda-metrics-dashboard.jpeg" alt="Lambda Enhanced Metrics Default Dashboard" >}}

## Overview

[Datadog Lambda library][1] and the [Datadog Lambda Extension][2] (in Node.js and Python) or the [Datadog Forwarder][3] (in other Lambda runtimes) together generate enhanced Lambda metrics out-of-the-box for Node.js, Python, Ruby, Java, and Go applications, with low latency, several second granularity, and detailed metadata for cold starts and custom tags.

Enhanced Lambda metrics give you a view above and beyond the default [Lambda metrics][4] enabled with the AWS Lambda integration. These metrics are distinguished by being in the `aws.lambda.enhanced.*` namespace, and are Datadog’s best practice for setting real-time monitors on your serverless application health.

### Real-time enhanced Lambda metrics

The following real-time enhanced Lambda metrics are available, and they are tagged with the `aws_account`, `region`, `functionname`, `cold_start`, `memorysize`, `executedversion`, `resource` and `runtime`. These metrics are [distributions][5], and you can query them using the `count`, `min`, `max`, `sum`, and `avg` aggregations.


`aws.lambda.enhanced.invocations`     
: Measures the number of times a function is invoked in response to an event or invocation API call.

`aws.lambda.enhanced.errors`          
: Measures the number of invocations that failed due to errors in the function (response code 4XX).

`aws.lambda.enhanced.max_memory_used` 
: Measures the maximum amount of memory (mb) used by the function.

`aws.lambda.enhanced.duration`        
: Measures the elapsed seconds from when the function code starts executing as a result of an invocation to when it stops executing.

`aws.lambda.enhanced.billed_duration` 
: Measures the billed amount of time the function ran for (100ms increments).

`aws.lambda.enhanced.init_duration` 
: Measures the initialization time (second) of a function during a cold start.

`aws.lambda.enhanced.estimated_cost`  
: Measures the total estimated cost of the function invocation (US dollars).

`aws.lambda.enhanced.timeouts`  
: Measures the number of times a function times out.

`aws.lambda.enhanced.out_of_memory`  
: Measures the number of times a function runs out of memory.

**Note**: When you aren't using the [Datadog Lambda Extension][2], enhanced metrics are sent to the Datadog Forwarder via CloudWatch Logs, meaning you’ll see an increased volume of logs in CloudWatch. This may affect your AWS bill. To opt-out, set the `DD_ENHANCED_METRICS` environment variable to `false` on your AWS Lambda functions.

## Enable enhanced Lambda metrics

{{< img src="serverless/integration/lambda_metrics.png" alt="Lambda Metrics Collection" >}}

Follow the [installation instructions][6] to set up instrumentation of your serverless applications, and the enhanced Lambda metrics are enabled by default.

**Note**: To enable enhanced Lambda metrics via the Datadog Forwarder without sending the logs for your functions to Datadog, set the `DD_FORWARD_LOG` environment variable to `false` on the [Datadog Forwarder][3].

## Viewing your dashboard

Once you've enabled Enhanced Lambda Metrics, view your [default dashboard in the Datadog app][7].

[1]: /serverless/datadog_lambda_library
[2]: /serverless/libraries_integrations/extension
[3]: /serverless/forwarder/
[4]: /integrations/amazon_lambda/#metric-collection
[5]: /metrics/distributions/
[6]: /serverless/installation/
[7]: https://app.datadoghq.com/screen/integration/30306
