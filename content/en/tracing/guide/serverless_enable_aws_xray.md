---
title: Decide When to Use Datadog APM and AWS X-Ray
description: 'Compare Datadog APM and AWS X-Ray for serverless tracing to make the right choice for your use case'
aliases:
    - /tracing/serverless_functions/enable_aws_xray/
---

## Which one should you use?

### Use AWS X-Ray if:

- You need a fast, lightweight way to get visibility into simple Serverless services.
- You primarily use Lambda and API Gateway.
- You're okay with AWS-managed sampling and limited trace retention.
- You don't need access to payload data, custom tags, or trace/log correlation.

X-Ray is built into AWS and can be enabled with just a few clicks. It's well-suited for teams that need to debug basic issues or visualize service calls in low-complexity systems. However, you won't get function inputs and outputs, and the trace data is limited to what AWS provides. There's also no way to add custom metadata or correlate traces with logs. If you're debugging lightweight workflows and real-time gaps in trace visibility are acceptable, X-Ray is often "good enough."

### Use Datadog APM if:

- You need full visibility into function inputs, outputs, and downstream calls.
- Your system involves complex orchestration with services like Step Functions, SQS, DynamoDB, or third-party APIs.
- You want to correlate traces with logs and metrics for faster debugging.
- You need control over what data is retained and for how long, including full-fidelity traces.

Datadog APM goes far beyond what X-Ray offers. You can tag traces with business or customer context, trace asynchronous workflows end-to-end, and inspect payloads at each step. Sampling rules and retention policies are configurable, so you can reduce ingestion for high-throughput paths while preserving key traces for longer. This flexibility makes it ideal for growing systems and debugging hard-to-reproduce issues.

## Feature comparison

| Capability | AWS X-Ray | Datadog APM |
|------------|-----------|-------------|
| Payload Visibility | ❌ | ✅ |
| Custom Tags | ❌ | ✅ |
| Step Functions Support | ❌ | ✅ |
| Trace → Log Correlation | ❌ | ✅ |
| Sampling & Retention | ❌ (AWS-managed sampling & TTL) | ✅ (User-defined sampling & retention) |
| Breadth of Integration | Limited to core AWS services | Full AWS + infrastructure + 3rd party services |

## Enable AWS X-Ray

If AWS X-Ray meets your current requirements, see the [AWS X-Ray integration documentation][1] for detailed setup instructions.

[1]: https://docs.datadoghq.com/integrations/amazon_xray/
