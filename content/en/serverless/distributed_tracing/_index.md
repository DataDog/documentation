---
title: Distributed Tracing
kind: documentation
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

The Datadog Python, Node.js, Ruby, Go and Java tracing libraries support distributed tracing for AWS Lambda. The easiest way to add tracing to your application is with the [Datadog Lambda Library][2], which includes the Datadog tracing librarsy as a dependency.

## Choose your Tracing Library

{{< img src="integrations/amazon_lambda/lambda_tracing.png" alt="architecture diagram for tracing AWS Lambda with Datadog" >}}

To start using Datadog APM with your serverless application, you need to first choose between installing Datadog's tracing libraries (`dd-trace`) or AWS X-Ray tracing libraries based on your Lambda runtime and individual requirements. To see all of your traces in Datadog in real-time in the Live Search view, you need to use Datadog's tracing libraries.

| [Datadog APM with dd-trace][1]          | [Datadog APM with AWS X-Ray][2]           |
|---------------------------------|-------------------------------------------------------------------------|
| Uses Datadog APM's integration libraries for end-to-end tracing.  | Pulls traces from AWS X-Ray. |
| Visualize your traces in Datadog in real-time. | Trace data available in Datadog after 2-5 minutes. |
| Tail-based sampling and fully customizable tag-based retention filters. | Sampling can be modified from the AWS X-Ray console. |
| Support for Python, Node.js, Ruby, Go, Java. |  Support for all Lambda runtimes. |

### Runtime Recommendations

{{< partial name="serverless/serverless-apm-recommendations.html" >}}

#### Python and Node.js

The Datadog Lambda Library and tracing libraries for Python and Node.js support:
- Automatic correlation of Lambda logs and traces with trace ID and tag injection.
- Installation without any code changes using Serverless Framework, AWS SAM and AWS CDK integrations.
- Tracing HTTP requests invoking downstream Lambda functions or containers.
- Tracing synchronous Lambda invokes with the AWS SDK.
- Tracing asynchronous Lambda invocations through AWS SQS.
- Tracing dozens of additional out-of-the-box [Python][7] and [Node.js][11] libraries.

For Python and Node.js serverless applications, we recommend you [install Datadog's tracing libraries][8]. If your application requires AWS X-Ray active tracing in AWS managed services such as API Gateway or Step Functions, we recommend you augment AWS X-Ray traces with Datadog APM by configuring _both_ AWS X-Ray and Datadog APM tracing libraries as described [here][10].

If you are already tracing your serverless functions with X-Ray and want to continue using X-Ray, you can [install our AWS X-Ray integration][12].

*Looking to trace through serverless resources not listed above? Open a feature request [here][9].*

#### Ruby

The Datadog Lambda Library and tracing libraries for Ruby support:
- Automatic correlation of Lambda logs and traces with trace ID and tag injection.
- Tracing HTTP requests invoking downstream Lambda functions or containers.
- Tracing dozens of additional out-of-the-box [Ruby][13] libraries.

You can trace your serverless functions in Datadog with [Datadog's tracing libraries][8] or by [installing our AWS X-Ray integration][12]. If you are using [Datadog's tracing libraries][8], and need to connect Lambda function traces across AWS managed services, we recommend you augment your traces by configuring _both_ AWS X-Ray and Datadog APM tracing libraries as described [here][10].

*Looking to trace through serverless resources not listed above? Open a feature request [here][9].*

#### Go

The Datadog Lambda Library and tracing libraries for Go support:
- Manual correlation of Lambda logs and traces with trace ID and tag injection.
- Tracing HTTP requests invoking downstream Lambda functions or containers.
- Tracing dozens of additional out-of-the-box [Go][14] libraries.

You can trace your serverless functions in Datadog with [Datadog's tracing libraries][8] or by [installing our AWS X-Ray integration][12]. If you are using [Datadog's tracing libraries][8], and need to connect multiple Lambda function traces in event-driven architectures, we recommend you augment your traces by configuring _both_ AWS X-Ray and Datadog APM tracing libraries as described [here][10].

*Looking to trace through serverless resources not listed above? Open a feature request [here][9].*

#### Java

The Datadog Lambda Library for Java supports manual correlation of Lambda logs and AWS X-Ray traces with trace ID and tag injection. Datadog's tracing library for Java is currently in [beta][15]. We recommend you configure tracing for your Java serverless applications by [installing our AWS X-Ray integration][12].

*Have feedback on the Datadog's tracing libraries for Java Lambda functions? Make sure to check out discussions going on in the <a href="https://datadoghq.slack.com/archives/CFDPB83M4">#serverless</a> channel in the <a href="https://chat.datadoghq.com/">Datadog Slack community</a>.*

#### .NET

We recommend you configure tracing for your .NET AWS Lambda serverless applications by [installing our AWS X-Ray integration][12].

Learn more about tracing through .NET Azure serverless applications [here][16].

*Looking to trace through .NET AWS Lambda serverless applications with Datadog tracing libraries? Open a feature request [here][9].*

## Enable Datadog APM

{{< img src="tracing/live_search/livesearchmain.gif" alt="Live Search" >}}

The Datadog Python, Node.js, Ruby, Go and Java tracing libraries support distributed tracing for AWS Lambda. To enable tracing on your functions, follow [the installation instructions][8].

To enable Datadog APM without enabling logging for your functions, ensure the `DdForwarderLog` environment variable is set to `false` on your Datadog Forwarder.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /serverless/distributed_tracing#distributed-tracing-with-datadog-apm
[2]: /integrations/amazon_xray/#overview
[2]: /serverless/datadog_lambda_library/
[3]: https://app.datadoghq.com/functions
[4]: https://app.datadoghq.com/apm/traces
[5]: https://app.datadoghq.com/apm/map
[7]: /tracing/setup_overview/compatibility_requirements/python
[8]: /serverless/installation/
[9]: https://docs.datadoghq.com/help/
[10]: /serverless/distributed_tracing/serverless_trace_merging
[11]: /tracing/setup_overview/compatibility_requirements/nodejs
[12]: /integrations/amazon_xray/#overview
[13]: /tracing/setup_overview/compatibility_requirements/ruby
[14]: /tracing/setup_overview/compatibility_requirements/go
[15]: /serverless/datadog_lambda_library/java#distributed-tracing
[16]: /serverless/azure_app_services