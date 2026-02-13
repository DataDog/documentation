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

### Feature Comparison

| Capability | AWS X-Ray | Datadog APM Lambda | Datadog APM Step Functions |
|------------|-----------|---------------------|---------------------------|
| Enhanced Metrics | Limited CloudWatch metrics | [Numerous real-time metrics][2] | [Detailed metrics for each step execution][9] |
| Trace → Log Correlation | None | [Automatic support][3] | Automatic support |
| Sampling & Retention | AWS-managed | [User-defined][4] | [User-defined][13] |
| Distributed Tracing | Primitive subsegments, limited cross-service visibility | [Support through hybrid environments][6] | [Full support across Step Functions and Lambda][7], including other Step Functions |
| Payload Visibility | None | Collect, visualize, and query the [JSON request and response payloads][1] | Capture and visualize input and output data at each step |
| Integrations | Limited to core AWS services | [Comprehensive support][5] for AWS & 3rd party services | Support for all Task types with relevant tags |
| Distributed Maps | None | N/A | [Full support for distributed maps][10] |

## Get Started

### Enable Datadog Monitoring

If you need the enhanced capabilities that Datadog APM provides, follow these setup guides:
- [Serverless monitoring for AWS Lambda][11] 
- [Serverless monitoring for AWS Step Functions][12]

### Enable AWS X-Ray Integration

If AWS X-Ray meets your current requirements, see the [AWS X-Ray Integration documentation][8] for detailed setup instructions.

[1]: https://docs.datadoghq.com/serverless/aws_lambda/configuration?tab=others#collect-the-request-and-response-payloads
[2]: https://docs.datadoghq.com/serverless/aws_lambda/metrics?tab=python#enhanced-lambda-metrics
[3]: https://docs.datadoghq.com/serverless/aws_lambda/logs?tab=serverlessframework#connect-logs-and-traces
[4]: https://docs.datadoghq.com/serverless/aws_lambda/configuration?tab=datadogcli#select-sampling-rates-for-ingesting-apm-spans
[5]: https://docs.datadoghq.com/serverless/aws_lambda/configuration?tab=others#collect-traces-from-non-lambda-resources
[6]: https://docs.datadoghq.com/serverless/aws_lambda/distributed_tracing
[7]: https://docs.datadoghq.com/serverless/step_functions/merge-step-functions-lambda?tab=serverlessframework
[8]: https://docs.datadoghq.com/integrations/amazon_xray/
[9]: https://docs.datadoghq.com/serverless/step_functions/enhanced-metrics
[10]: https://docs.datadoghq.com/serverless/step_functions/distributed-maps
[11]: https://docs.datadoghq.com/serverless/aws_lambda/
[12]: https://docs.datadoghq.com/serverless/step_functions
[13]: https://docs.datadoghq.com/serverless/step_functions/installation?tab=custom#sample-traces
