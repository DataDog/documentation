---
title: Monitoring AWS Lambda Managed Instances
description: Install and configure the Datadog Agent for AWS Lambda Managed Instances.
---

Datadog Serverless Monitoring enables visibility into AWS Lambda Managed Instances.
Datadog provides full visibility into the metrics, logs, and traces emitted by your Lambda Managed Instances. With Datadog, you can monitor Lambda Managed Instances alongside your other serverless compute services in a single, unified view. This enables you to spot bottlenecks, fix errors, and determine which workloads to refactor in order to optimize concurrency, whether that means increasing throughput or reducing unnecessary parallel executions.
## Setup

To start monitoring your AWS Lambda Managed Instances, use Datadog's standard setup for instrumenting AWS Lambda functions. Choose your runtime:

{{< partial name="serverless/getting-started-languages.html" >}}

## Data collected

Datadog collects the same metrics for AWS Lambda Managed Instances as it does for standard AWS Lambda applications, **excluding** `aws.lambda.enhanced.estimated_cost` and `aws.lambda.enhanced.billed_duration`. These two metrics are not available for AWS Lambda Managed Instances.

See the [list of all metrics collected from AWS Lambda applications][1].

## Correlating logs and traces
To get full logs and trace correlation on Datadog, ensure that you have set `DD_TRACE_ENABLED` and `DD_LOGS_INJECTION ` to `true`.
## Known limitations
At the moment, the Datadog Lambda Extension and Tracing Layers only support Node and Python Runtimes  for tracing. 
[1]:  /integrations/amazon-lambda/#data-collected