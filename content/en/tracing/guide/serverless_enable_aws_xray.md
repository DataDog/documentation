---
title: Decide When to Use Datadog APM and AWS X-Ray
description: 'Compare Datadog APM and AWS X-Ray for serverless tracing to make the right choice for your use case'
aliases:
    - /tracing/serverless_functions/enable_aws_xray/
---

## Which one should you use?

### Overview

X-Ray is natively integrated and can be enabled in just a few steps, making it convenient for basic observability needs. It's a good fit for teams troubleshooting simple workflows or visualizing service dependencies in low-complexity environments. However, it doesn't capture Lambda payloads and trace data is restricted to what AWS surfaces.

Datadog APM offers deeper visibility than X-Ray. You can enrich traces with business or user context, follow async workflows across services, and capture payloads at every step. It supports custom sampling and retention, letting you dial down ingestion on noisy paths while retaining critical traces longer. This level of control is especially useful for scaling systems and debugging edge cases that are hard to reproduce.

### Feature comparison

| Capability | AWS X-Ray | Datadog APM |
|------------|-----------|-------------|
| Enhanced Metrics | Limited CloudWatch metrics | Numerous [real-time metrics][2] with queryable tags  |
| Trace → Log Correlation | None | [Automatic support][3] |
| Sampling & Retention | AWS-managed | [User-defined][4] |
| Payload Visibility | None | Collect, visualize, and query the [JSON request and response payloads][1] |
| Integrations | Limited to core AWS services | [Comprehensive support][5] for AWS & 3rd party services |
| Distributed Tracing | Primitive subsegments | [Support through hybrid environments][6] |
| Step Functions Support | Limited support | [End-to-end trace merging][7] |

## Enable AWS X-Ray

If AWS X-Ray meets your current requirements, see the [AWS X-Ray integration documentation][8] for detailed setup instructions.

[1]: https://docs.datadoghq.com/serverless/aws_lambda/configuration?tab=others#collect-the-request-and-response-payloads
[2]: https://docs.datadoghq.com/serverless/aws_lambda/metrics?tab=python#enhanced-lambda-metrics
[3]: https://docs.datadoghq.com/serverless/aws_lambda/logs?tab=serverlessframework#connect-logs-and-traces
[4]: https://docs.datadoghq.com/serverless/aws_lambda/configuration?tab=datadogcli#select-sampling-rates-for-ingesting-apm-spans
[5]: https://docs.datadoghq.com/serverless/aws_lambda/configuration?tab=others#collect-traces-from-non-lambda-resources
[6]: https://docs.datadoghq.com/serverless/aws_lambda/distributed_tracing
[7]: https://docs.datadoghq.com/serverless/step_functions/merge-step-functions-lambda?tab=serverlessframework
[8]: https://docs.datadoghq.com/integrations/amazon_xray/
