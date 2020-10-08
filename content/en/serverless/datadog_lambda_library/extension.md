---
title: Datadog Lambda Extension (Preview)
kind: documentation
further_reading:
    - link: 'serverless/custom_metrics'
      tag: 'Documentation'
      text: 'Submitting Custom Metrics from AWS Lambda'
---

## Overview

<div class="alert alert-warning"> The Datadog AWS Lambda Extension is in public preview. If you have any feedback, contact <a href="/help">Datadog support</a>.</div>

AWS Lambda Extensions are companion processes that augment your Lambda functions. They run within the Lambda execution environment, alongside your Lambda function code. The Datadog Extension is a lightweight version of the Datadog agent built to run alongside your code with minimal performance overhead.

The Datadog Extension currently supports submitting custom metrics [synchronously][1] while your AWS Lambda function executes. This means that you can submit your custom metrics without the [Datadog Forwarder][2]. Note that the Datadog Forwarder is still required to submit logs and traces to Datadog.

## Setup

The Datadog Extension is distributed as its own Lambda Layer (separate from the [Datadog Lambda Library][3]) and supports Node.js, Python, and Go runtimes.

1. Instrument your [Python][4], [Node.js][5], or [Go][6] application.

2. Add the Lambda Layer for the Datadog Extension to your AWS Lambda function:

    `arn:aws:lambda:AWS_REGION:464622532012:layer:Datadog-Extension:3`

    Replace the placeholder `AWS_REGION` and `VERSION` in the Lambda Layer ARN with appropriate values.

3. Reference the [sample code][7] to submit a custom metric.
## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /serverless/custom_metrics?tab=python#synchronous-vs-asynchronous-custom-metrics
[2]: /serverless/forwarder
[3]: /serverless/datadog_lambda_library
[4]: /serverless/installation/python
[5]: /serverless/installation/nodejs
[6]: /serverless/installation/go
[7]: /serverless/custom_metrics#custom-metrics-sample-code
