---
title: Merge AWS X-Ray traces with Datadog APM
aliases:
  - /serverless/distributed_tracing/serverless_trace_merging
---

Datadog recommends using [APM Distributed Tracing][4] to collect traces from your AWS Lambda functions. However, if you are using AWS X-Ray, you can merge your Datadog APM traces with your X-Ray traces for visibility across your environment.

_Supported runtimes_: Python, Node.js

<div class="alert alert-info">Merging AWS X-Ray traces with Datadog APM traces may result in higher usage bills. X-Ray spans continue to be available in your merged traces after 2-5 minutes.</div>

### In a serverless-first environment

If you are already using [Distributed Tracing][4] with your AWS Lambda functions, and you require AWS X-Ray tracing for AWS managed services such as AppSync, perform the following steps to merge your traces:

1. [Enable AWS X-Ray active tracing][1] on your AWS Lambda functions.
1. Enable the Datadog's [AWS X-Ray integration][2].
1. On your AWS Lambda functions, set the `DD_MERGE_XRAY_TRACES` environment variable to `true`. (For Ruby, use `DD_MERGE_DATADOG_XRAY_TRACES`.)
1. Ensure that you have [set up APM Distributed Tracing][3] for your AWS Lambda functions.

Third-party libraries are automatically patched by Datadog APM, so you do not need to install the AWS X-Ray client libraries.

### In a hybrid environment with AWS Lambda and hosts

If you are using Datadog APM to trace your hosts and AWS X-Ray to trace your AWS Lambda functions, perform the following steps to merge your traces:

1. [Enable AWS X-Ray active tracing][1] on your AWS Lambda functions and install your X-Ray client libraries.
1. Enable the Datadog's [AWS X-Ray integration][2].
1. Install the [Datadog Lambda library][5] for your runtime.
1. Set the `DD_TRACE_ENABLED` environment variable to `true`.
1. Ensure that you have set up APM for your hosts.


For X-Ray and Datadog APM traces to appear in the same flame graph, all services must have the same `env` tag.

Your hosts and Lambda functions do not need to be in the same runtime.

{{< img src="integrations/amazon_lambda/lambda_host_trace.png" alt="trace of a request from a host to a Lambda function" >}}

[1]: https://docs.aws.amazon.com/lambda/latest/dg/services-xray.html
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_xray
[3]: /serverless/aws_lambda/installation
[4]: /serverless/aws_lambda/distributed_tracing
[5]: /serverless/libraries_integrations#datadog-lambda-libraries