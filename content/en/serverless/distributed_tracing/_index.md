---
title: Distributed Tracing with Serverless Applications
kind: documentation
aliases:
  - /tracing/serverless_functions
  - /tracing/setup_overview/serverless_functions/
  - /serverless/troubleshooting/serverless_apm_metrics/
further_reading:
- link: "/tracing/"
  tag: "Documentation"
  text: "Explore Datadog APM"
- link: "/tracing/trace_search_and_analytics/#live-search-for-15-minutes"
  tag: "Documentation"
  text: "Live Search"
- link: "https://www.datadoghq.com/blog/aws-lambda-tracing-go-java-functions/"
  tag: "Blog"
  text: "Real-time distributed tracing for Go and Java Lambda Functions"
- link: "https://www.datadoghq.com/blog/datadog-serverless-view/"
  tag: "Blog"
  text: "Monitor your serverless stack in the Serverless view"
- link: "https://www.datadoghq.com/blog/monitor-aws-fully-managed-services-datadog-serverless-monitoring/"
  tag: "Blog"
  text: "Datadog Serverless Monitoring for AWS fully managed services"
- link: "https://www.datadoghq.com/blog/dotnet-lambda-functions-distributed-tracing/"
  tag: "Blog"
  text: "Real-time distributed tracing for .NET Lambda functions"
---

{{< img src="tracing/serverless_functions/ServerlessDistributedTrace.png" alt="Trace Serverless Functions"  style="width:100%;">}}

By connecting your serverless traces to metrics, Datadog provides a context-rich picture of your application’s performance, allowing you to better troubleshoot performance issues given the distributed nature of serverless applications.

The Datadog Python, Node.js, Ruby, Go, Java, and .NET tracing libraries support distributed tracing for AWS Lambda.

## Choose your tracing solution

{{< img src="serverless/serverless_tracing_installation_instructions.png" alt="Architecture diagram for tracing AWS Lambda with Datadog" >}}

<div class="alert alert-info"> New to serverless monitoring? Follow the installation steps <a href="/serverless/installation/">here</a> to get started.</div>

To start using Datadog APM with your serverless application, you can choose between generating traces using Datadog's tracing client (`dd-trace`) or pulling X-Ray traces from AWS.

| [Datadog APM with dd-trace][1]          | [Datadog APM with AWS X-Ray][2]           |
|---------------------------------|-------------------------------------------------------------------------|
| Uses Datadog APM's integration libraries for end-to-end tracing.  | Pulls traces from AWS X-Ray. |
| Visualize your traces in Datadog in real-time. | Trace data available in Datadog after a few minutes. |
| Tail-based sampling and fully customizable tag-based retention filters. | Sampling rate cannot be configured. |
| Support for all Lambda runtimes. |  Support for all Lambda runtimes. |

### Runtime recommendations

{{< partial name="serverless/serverless-apm-recommendations.html" >}}

#### Python and Node.js

The Datadog Lambda Library and tracing libraries for Python and Node.js support:
- Automatic correlation of Lambda logs and traces with trace ID and tag injection.
- Installation without any code changes using Serverless Framework, AWS SAM and AWS CDK integrations.
- Tracing HTTP requests invoking downstream Lambda functions or containers.
- Tracing consecutive Lambda invocations made via the AWS SDK.
- Tracing asynchronous Lambda invocations through AWS Managed Services
  - API Gateway
  - SQS
  - SNS
  - SNS and SQS direct integration
  - Kinesis
  - EventBridge
- Tracing dozens of additional out-of-the-box [Python][3] and [Node.js][4] libraries.

For Python and Node.js serverless applications, Datadog recommends you [install Datadog's tracing libraries][5]. If your application requires AWS X-Ray active tracing in AWS managed services such as AppSync or Step Functions, Datadog recommends you augment AWS X-Ray traces with Datadog APM by configuring _both_ AWS X-Ray and Datadog APM tracing libraries as described in [Serverless Trace Merging][6].

If you are already tracing your serverless functions with X-Ray and want to continue using X-Ray, you can [install the AWS X-Ray integration][2].

*Looking to trace through serverless resources not listed above? [Open a feature request][7].*

#### Ruby

The Datadog Lambda Library and tracing libraries for Ruby support:
- Automatic correlation of Lambda logs and traces with trace ID and tag injection.
- Tracing HTTP requests invoking downstream Lambda functions or containers.
- Tracing dozens of additional out-of-the-box [Ruby][8] libraries.

You can trace your serverless functions in Datadog with [Datadog's tracing libraries][5] or by [installing the AWS X-Ray integration][2]. If you are using [Datadog's tracing libraries][5], and need to connect Lambda function traces across AWS managed services, Datadog recommends you augment your traces by configuring _both_ [AWS X-Ray and Datadog APM tracing libraries][6].

*Looking to trace through serverless resources not listed above? [Open a feature request][7].*

#### Go

The Datadog Lambda Library and tracing libraries for Go support:
- Manual correlation of Lambda logs and traces with trace ID and tag injection.
- Tracing HTTP requests invoking downstream Lambda functions or containers.
- Tracing dozens of additional out-of-the-box [Go][9] libraries.

For Go serverless applications, Datadog recommends installing [Datadog's tracing libraries][5]. If your application requires AWS X-Ray active tracing in AWS managed services such as API Gateway or Step Functions, you may want to consider instead using [Datadog APM with AWS X-Ray tracing][2].

*Looking to trace through serverless resources not listed above? [Open a feature request][7].*

#### Java

The Datadog Lambda Library and tracing libraries for Java support:
- Correlation of Lambda logs and traces with trace ID and tag injection. See [Connecting Java logs and traces][10] for more details.
- Tracing HTTP requests invoking downstream Lambda functions or containers.
- Tracing dozens of additional out-of-the-box [Java][11] libraries.

For Java serverless applications, Datadog recommends [installing Datadog's tracing libraries][5]. If your application requires AWS X-Ray active tracing in AWS managed services such as API Gateway or Step Functions, you may want to consider instead using [Datadog APM with AWS X-Ray tracing][2].

*Have feedback on the Datadog's tracing libraries for Java Lambda functions? Make sure to check out discussions going on in the [#serverless][12] channel in the [Datadog Slack community][13].*

#### .NET

The tracing library for .NET supports:
- Tracing HTTP requests invoking downstream Lambda functions or containers.
- Tracing dozens of additional out-of-the-box [.NET][14] libraries.

For .NET serverless applications, Datadog recommends [installing Datadog's tracing libraries][5]. If your application requires AWS X-Ray active tracing in AWS managed services such as API Gateway or Step Functions, you may want to consider instead using [Datadog APM with AWS X-Ray tracing][2].

Learn more about [tracing through .NET Azure serverless applications][15].

### Hybrid environments

If you have installed Datadog's tracing libraries (`dd-trace`) on both your Lambda functions and hosts, your traces automatically show you the complete picture of requests that cross infrastructure boundaries, whether it be AWS Lambda, containers, on-prem hosts, or managed services.

If `dd-trace` is installed on your hosts with the Datadog Agent, and your serverless functions are traced with AWS X-Ray, trace merging is required to see a single, connected trace across your infrastructure. See the [Serverless Trace Merging][6] documentation to learn more about merging traces from `dd-trace` and AWS X-Ray.

Datadog's [AWS X-Ray integration][2] only provides traces for Lambda functions. See the [Datadog APM documentation][16] to learn more about tracing in container or host-based environments.

## Enable Datadog APM

{{< img src="tracing/live_search/livesearchmain.mp4" alt="Live Search" video=true >}}

The Datadog Python, Node.js, Ruby, Go, Java, and .NET tracing libraries support distributed tracing for AWS Lambda. To enable tracing on your functions, follow [the installation instructions][5].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /serverless/distributed_tracing#distributed-tracing-with-datadog-apm
[2]: /integrations/amazon_xray/#overview
[3]: /tracing/trace_collection/compatibility/python
[4]: /tracing/trace_collection/compatibility/nodejs
[5]: /serverless/installation/
[6]: /serverless/distributed_tracing/serverless_trace_merging
[7]: https://docs.datadoghq.com/help/
[8]: /tracing/trace_collection/compatibility/ruby
[9]: /tracing/trace_collection/compatibility/go
[10]: /tracing/other_telemetry/connect_logs_and_traces/java/
[11]: /tracing/trace_collection/compatibility/java
[12]: https://datadoghq.slack.com/archives/CFDPB83M4
[13]: https://chat.datadoghq.com/
[14]: /tracing/trace_collection/compatibility/dotnet-core
[15]: /serverless/azure_app_services
[16]: /tracing/trace_collection/
