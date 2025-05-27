---
title: Decide When to Use Datadog APM and AWS X-Ray
description: 'Compare Datadog APM and AWS X-Ray for serverless tracing to make the right choice for your use case'
aliases:
    - /tracing/serverless_functions/enable_aws_xray/
---

## Which one should you use?

X-Ray is built into AWS and can be enabled with just a few clicks. It's well-suited for teams that need to debug basic issues or visualize service calls in low-complexity systems. However, you won't get function inputs and outputs, and the trace data is limited to what AWS provides. There's also no way to add custom metadata or correlate traces with logs.

Datadog APM goes far beyond what X-Ray offers. You can tag traces with business or customer context, trace asynchronous workflows end-to-end, and inspect payloads at each step. Sampling rules and retention policies are configurable, so you can reduce ingestion for high-throughput paths while preserving key traces for longer. This flexibility makes it ideal for growing systems and debugging hard-to-reproduce issues.

## Feature comparison

| Capability | AWS X-Ray | Datadog APM |
|------------|-----------|-------------|
| Payload Visibility | ❌ | ✅ Collect, visualize, and query the JSON request and response payloads |
| Enhanced Metrics | ❌ | ✅ Numerous real-time metrics with default tags  |
| Trace → Log Correlation | ❌ | ✅ |
| Sampling & Retention | ❌ AWS-managed | ✅ User-defined |
| Integrations | Limited to core AWS services | Comprehensive support for AWS & 3rd party services |
| Step Functions Support | ❌ | ✅ End-to-end visiblity |

## Enable AWS X-Ray

If AWS X-Ray meets your current requirements, see the [AWS X-Ray integration documentation][1] for detailed setup instructions.

[1]: https://docs.datadoghq.com/integrations/amazon_xray/
