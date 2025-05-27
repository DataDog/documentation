---
title: Decide When to Use Datadog APM and AWS X-Ray
description: 'Compare Datadog APM and AWS X-Ray for serverless tracing to make the right choice for your use case'
aliases:
    - /tracing/serverless_functions/enable_aws_xray/
---

## Which one should you use?

### Overview

X-Ray is built into AWS and can be enabled with just a few clicks. It's well-suited for teams that need to debug basic issues or visualize service calls in low-complexity systems. However, you won't get function inputs and outputs, and the trace data is limited to what AWS provides. There's also no way to add custom metadata or correlate traces with logs.

Datadog APM goes far beyond what X-Ray offers. You can tag traces with business or customer context, trace asynchronous workflows end-to-end, and inspect payloads at each step. Sampling rules and retention policies are configurable, so you can reduce ingestion for high-throughput paths while preserving key traces for longer. This flexibility makes it ideal for growing systems and debugging hard-to-reproduce issues.

### Feature comparison

| Capability | AWS X-Ray | Datadog APM |
|------------|-----------|-------------|
| Payload Visibility | None | Collect, visualize, and query the [JSON request and response payloads][1] |
| Enhanced Metrics | Limited CloudWatch metrics | Numerous [real-time metrics][2] with queryable tags  |
| Trace → Log Correlation | Manually log the X-Ray trace ID to use in queries | [Automatic support][3] |
| Sampling & Retention | AWS-managed | [User-defined][4] |
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
