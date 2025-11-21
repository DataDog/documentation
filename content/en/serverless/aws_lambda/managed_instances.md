---
title: Monitoring AWS Lambda Managed Instances
description: Install and configure the Datadog Agent for AWS Lambda Managed Instances.
---

{{< callout url=
 btn_hidden="true" header="Join the Preview!">}}
Datadog Serverless Monitoring for AWS Lambda Managed Instances is in Preview. To send feedback during the Preview, use the <strong>Share Feedback</strong> option on the <a href="https://app.datadoghq.com/serverless/aws/lambda">Serverless page</a> in Datadog.
{{< /callout >}}

Datadog provides full visibility into the metrics, logs, and traces emitted by your AWS Lambda Managed Instances. You can monitor your AWS Lambda Managed Instances alongside your other serverless compute services in a single, unified view. This enables you to spot bottlenecks, fix errors, and determine which workloads to refactor to optimize concurrency, whether that means increasing throughput or reducing unnecessary parallel executions.

## Setup

<div class="alert alert-info"><strong>Standard metrics and log collection</strong>: Supported for Python, Node.js, Java, .NET<br/>
<strong>Enhanced metrics and trace collection</strong>: Supported for Python, Node.js
 </div>

### Metrics and logs

To collect standard (not enhanced) metrics and logs, set up [Datadog's AWS integration][1].

### Traces

To collect traces and [enhanced Lambda metrics][2], use Datadog's standard setup for instrumenting AWS Lambda functions. Choose your runtime:

{{< partial name="serverless/lambda-managed-instances-runtimes.html" >}}

## Data collected

Datadog collects the same metrics for AWS Lambda Managed Instances as it does for standard AWS Lambda applications, **excluding** `aws.lambda.enhanced.estimated_cost` and `aws.lambda.enhanced.billed_duration`. These two metrics are not available for AWS Lambda Managed Instances.

See the [list of all metrics collected from AWS Lambda applications][3].

## Correlating logs and traces
To [correlate your logs and traces][4], ensure that you have set `DD_TRACE_ENABLED` and `DD_LOGS_INJECTION ` to `true`.

## Known limitations
The Datadog Lambda Extension and Lambda Libraries only support trace collection for Python and Node.js runtimes.

[1]: /integrations/amazon-web-services/
[2]: /serverless/aws_lambda/metrics?tab=python#enhanced-lambda-metrics
[3]: /integrations/amazon-lambda/#data-collected
[4]: /tracing/other_telemetry/connect_logs_and_traces/