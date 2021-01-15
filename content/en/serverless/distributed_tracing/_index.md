---
title: Distributed Tracing
kind: documentation
aliases:
  - /tracing/serverless_functions
  - /tracing/setup_overview/serverless_functions/
further_reading:
- link: "/tracing/"
  tag: "Documentation"
  text: "Explore Datadog APM"
- link: "/tracing/trace_search_and_analytics/#live-search-for-15-minutes"
  tag: "Documentation"
  text: "Live Search"
---

{{< img src="tracing/serverless_functions/ServerlessDistributedTrace.png" alt="Trace Serverless Functions"  style="width:100%;">}}

By connecting your serverless traces to metrics, Datadog provides a context-rich picture of your application’s performance, allowing you to better troubleshoot performance issues given the distributed nature of serverless applications.

The Datadog Python, Node.js, Ruby, Go and Java tracing libraries support distributed tracing for AWS Lambda. The easiest way to add tracing to your application is with the [Datadog Lambda Library][1], which includes the Datadog tracing library as a dependency.

## Choose your Tracing Library

{{< img src="integrations/amazon_lambda/lambda_tracing.png" alt="architecture diagram for tracing AWS Lambda with Datadog" >}}

<div class="alert alert-info"> New to serverless monitoring? Follow the installation steps <a href="/serverless/installation/">here</a> to get started.</div>

To start using Datadog APM with your serverless application, you can choose between installing Datadog's tracing libraries (`dd-trace`) or AWS X-Ray tracing libraries based on your Lambda runtime and individual requirements. To see all of your traces in Datadog in real-time in the Live Search view, you need to use Datadog's tracing libraries.

| [Datadog APM with dd-trace][2]          | [Datadog APM with AWS X-Ray][3]           |
|---------------------------------|-------------------------------------------------------------------------|
| Uses Datadog APM's integration libraries for end-to-end tracing.  | Pulls traces from AWS X-Ray. |
| Visualize your traces in Datadog in real-time. | Trace data available in Datadog after a few minutes. |
| Tail-based sampling and fully customizable tag-based retention filters. | Sampling rate cannot be configured. |
| Support for Python, Node.js, Ruby, Go, Java. |  Support for all Lambda runtimes. |

### Runtime recommendations

{{< partial name="serverless/serverless-apm-recommendations.html" >}}

#### Python and Node.js

The Datadog Lambda Library and tracing libraries for Python and Node.js support:
- Automatic correlation of Lambda logs and traces with trace ID and tag injection.
- Installation without any code changes using Serverless Framework, AWS SAM and AWS CDK integrations.
- Tracing HTTP requests invoking downstream Lambda functions or containers.
- Tracing synchronous Lambda invokes with the AWS SDK (coming soon for Node.js).
- Tracing asynchronous Lambda invocations through AWS SQS (coming soon for Node.js).
- Tracing dozens of additional out-of-the-box [Python][4] and [Node.js][5] libraries.

For Python and Node.js serverless applications, Datadog recommends you [install Datadog's tracing libraries][6]. If your application requires AWS X-Ray active tracing in AWS managed services such as API Gateway or Step Functions, we recommend you augment AWS X-Ray traces with Datadog APM by configuring _both_ AWS X-Ray and Datadog APM tracing libraries as described [here][7].

If you are already tracing your serverless functions with X-Ray and want to continue using X-Ray, you can [install our AWS X-Ray integration][3].

*Looking to trace through serverless resources not listed above? Open a feature request [here][8].*

#### Ruby

The Datadog Lambda Library and tracing libraries for Ruby support:
- Automatic correlation of Lambda logs and traces with trace ID and tag injection.
- Tracing HTTP requests invoking downstream Lambda functions or containers.
- Tracing dozens of additional out-of-the-box [Ruby][9] libraries.

You can trace your serverless functions in Datadog with [Datadog's tracing libraries][6] or by [installing our AWS X-Ray integration][3]. If you are using [Datadog's tracing libraries][6], and need to connect Lambda function traces across AWS managed services, we recommend you augment your traces by configuring _both_ AWS X-Ray and Datadog APM tracing libraries as described [here][7].

*Looking to trace through serverless resources not listed above? Open a feature request [here][8].*

#### Go

The Datadog Lambda Library and tracing libraries for Go support:
- Manual correlation of Lambda logs and traces with trace ID and tag injection.
- Tracing HTTP requests invoking downstream Lambda functions or containers.
- Tracing dozens of additional out-of-the-box [Go][10] libraries.

You can trace your serverless functions in Datadog with [Datadog's tracing libraries][6] or by [installing our AWS X-Ray integration][3]. If you are using [Datadog's tracing libraries][6], and need to connect multiple Lambda function traces in event-driven architectures, we recommend you augment your traces by configuring _both_ AWS X-Ray and Datadog APM tracing libraries as described [here][7].

*Looking to trace through serverless resources not listed above? Open a feature request [here][8].*

#### Java

The Datadog Lambda Library for Java supports manual correlation of Lambda logs and AWS X-Ray traces with trace ID and tag injection. Datadog's tracing library for Java is currently in [beta][11]. We recommend you configure tracing for your Java serverless applications by [installing our AWS X-Ray integration][3].

*Have feedback on the Datadog's tracing libraries for Java Lambda functions? Make sure to check out discussions going on in the [#serverless][12] channel in the [Datadog Slack community][13].*

#### .NET

Datadog recommends you configure tracing for your .NET AWS Lambda serverless applications by [installing our AWS X-Ray integration][3].

Learn more about tracing through .NET Azure serverless applications [here][14].

*Looking to trace through .NET AWS Lambda serverless applications with Datadog tracing libraries? Open a feature request [here][8].*

### Hybrid environments

If you have installed Datadog's tracing libraries (`dd-trace`) on both your Lambda functions and hosts, your traces will automatically show you the complete picture of requests that cross infrastructure boundaries, whether it be AWS Lambda, containers, on-prem hosts, or managed services.

If `dd-trace` is installed on your hosts with the Datadog Agent, and your serverless functions are traced with AWS X-Ray, trace merging is required to see a single, connected trace across your infrastructure. Learn more about merging traces from `dd-trace` and AWS X-Ray [here][7].

Datadog's [AWS X-Ray integration][3] only provides traces for Lambda functions. Learn more about tracing in container or host-based environments [here][15].

## Enable Datadog APM

{{< img src="tracing/live_search/livesearchmain.gif" alt="Live Search" >}}

The Datadog Python, Node.js, Ruby, Go and Java tracing libraries support distributed tracing for AWS Lambda. To enable tracing on your functions, follow [the installation instructions][6].

To enable Datadog APM without enabling logging for your functions, ensure the `DdForwarderLog` environment variable is set to `false` on your Datadog Forwarder.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /serverless/datadog_lambda_library/
[2]: /serverless/distributed_tracing#distributed-tracing-with-datadog-apm
[3]: /integrations/amazon_xray/#overview
[4]: /tracing/setup_overview/compatibility_requirements/python
[5]: /tracing/setup_overview/compatibility_requirements/nodejs
[6]: /serverless/installation/
[7]: /serverless/distributed_tracing/serverless_trace_merging
[8]: https://docs.datadoghq.com/help/
[9]: /tracing/setup_overview/compatibility_requirements/ruby
[10]: /tracing/setup_overview/compatibility_requirements/go
[11]: /serverless/datadog_lambda_library/java#distributed-tracing
[12]: https://datadoghq.slack.com/archives/CFDPB83M4
[13]: https://chat.datadoghq.com/
[14]: /serverless/azure_app_services
[15]: /tracing/setup_overview/
