---
title: Distributed Tracing for AWS Lambda
aliases:
  - /tracing/serverless_functions
  - /tracing/setup_overview/serverless_functions/
  - /serverless/troubleshooting/serverless_apm_metrics/
  - /serverless/distributed_tracing
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

{{< img src="serverless/lambda/tracing/serverless_trace2.png" alt="In Datadog's Trace Explorer, a trace from an AWS Lambda application" style="width:100%;">}}

Datadog [Application Performance Monitoring][1] (APM) supports distributed tracing for AWS Lambda applications. Connecting serverless traces to your [Lambda metrics][2] provides a context-rich picture of your AWS Lambda application's performance, allowing you to better troubleshoot performance issues.

## Send traces from your AWS Lambda application

{{< img src="serverless/serverless_custom_metrics.png" alt="Architecture diagram for collecting traces, enhanced metrics, custom metrics, and logs from an AWS Lambda application and sending the data to Datadog" >}}

A runtime-specific [Datadog Lambda library][3] collects traces, enhanced metrics, and custom metrics from your Lambda function runtime. The Lambda library submits this data to the [Datadog Lambda Extension][4], a build of the Datadog Agent that then pushes your data to Datadog.

For detailed installation instructions, select your Lambda runtime:

{{< partial name="serverless/getting-started-languages.html" >}}

### Supported features

{{< tabs >}}
{{% tab "Python" %}}
- Automatic correlation of Lambda logs and traces with trace ID and tag injection.
- Installation without any code changes using Serverless Framework, AWS SAM and AWS CDK integrations.
- Tracing HTTP requests invoking downstream Lambda functions or containers.
- Tracing consecutive Lambda invocations made via the AWS SDK.
- Cold start tracing
- Tracing asynchronous Lambda invocations through AWS Managed Services
  - API Gateway
  - SQS
  - SNS
  - SNS and SQS direct integration
  - Kinesis
  - EventBridge
  - DynamoDB
  - S3
- Tracing dozens of additional out-of-the-box [Python libraries][1].

[1]: /tracing/trace_collection/compatibility/python

{{% /tab %}}

{{% tab "Node.js" %}}
- Automatic correlation of Lambda logs and traces with trace ID and tag injection.
- Installation without any code changes using Serverless Framework, AWS SAM and AWS CDK integrations.
- Tracing HTTP requests invoking downstream Lambda functions or containers.
- Tracing consecutive Lambda invocations made via the AWS SDK.
- Cold start tracing
- Tracing asynchronous Lambda invocations through AWS Managed Services
  - API Gateway
  - SQS
  - SNS
  - SNS and SQS direct integration
  - Kinesis
  - EventBridge
  - DynamoDB
  - S3
- Tracing dozens of additional out-of-the-box [Node.js libraries][1].

[1]: /tracing/trace_collection/compatibility/nodejs

{{% /tab %}}
{{% tab "Ruby" %}}
- Automatic correlation of Lambda logs and traces with trace ID and tag injection.
- Tracing HTTP requests invoking downstream Lambda functions or containers.
- Tracing dozens of additional out-of-the-box [Ruby][1] libraries.

[1]: /tracing/trace_collection/compatibility/ruby

{{% /tab %}}
{{% tab "Java" %}}
- Correlation of Lambda logs and traces with trace ID and tag injection. See [Connecting Java logs and traces][1] for more details.
- Tracing HTTP requests invoking downstream Lambda functions or containers.
- Tracing dozens of additional out-of-the-box [Java][2] libraries.

[1]: /tracing/other_telemetry/connect_logs_and_traces/java/
[2]: /tracing/trace_collection/compatibility/java

{{% /tab %}}
{{% tab "Go" %}}
- Manual correlation of Lambda logs and traces with trace ID and tag injection.
- Tracing HTTP requests invoking downstream Lambda functions or containers.
- Tracing dozens of additional out-of-the-box [Go][1] libraries.

[1]: /tracing/trace_collection/compatibility/go
{{% /tab %}}
{{% tab ".NET" %}}
- Tracing HTTP requests invoking downstream Lambda functions or containers.
- Tracing dozens of additional out-of-the-box [.NET][1] libraries.

For Azure applications, see [tracing .NET Azure applications][2].

[1]: /tracing/trace_collection/compatibility/dotnet-core
[2]: /serverless/azure_app_services
{{% /tab %}}
{{< /tabs >}}

## Visualize your AWS Lambda traces

In Datadog, the [Serverless > AWS Lambda][5] view displays all of your functions, grouped by service. 

{{< img src="serverless/lambda/tracing/service-view.png" alt="Your image description" style="width:90%;" >}}

Click on a function to see its details. Under the **Invocations** tab, choose an invocation and click **Open trace** to view the individual trace.

{{< img src="serverless/lambda/tracing/open-trace.png" alt="Your image description" style="width:90%;" >}}

To understand your trace, you can use the following visualizations:
- **Flame Graph**: Displays color-coded spans on a timeline. Useful for understanding the execution path of a request and where time was spent over a trace.
- **Waterfall**: Displays color-coded spans on a timeline, where each row corresponds to a span. Useful for isolating and focusing on specific parts of a trace.
- **Span List**: Displays grouped resources and sorts them according to span count. Useful for scanning latency information by resource or grouping.
- **Map**: Displays all services involved in the trace and their dependencies. Useful for understanding the transaction lifecycle at the service level.

{{< img src="serverless/lambda/tracing/trace-view.png" alt="Waterfall visualization for a trace." style="width:90%;" >}}

See [APM Trace Explorer][6] for more information, including how to search traces and spans.

## Further configuration

### Tagging traces with AWS Payload Extraction

Datadog's [AWS Payload Extraction][7] captures request and response data exchanged between your application and AWS services, and attaches the extracted information as tags to your traces. 

For configuration instructions and further details, see [Capture Requests and Responses from AWS Services][7].

_Supported runtimes_: Python, Node.js, Java

_Supported AWS services_: SNS, SQS, Kinesis, S3, EventBridge

### Span Auto-linking

Datadog uses [Span Auto-linking][9] to link spans when segments of your asynchronous requests cannot propagate trace context. Span Auto-linking is enabled by default in supported runtimes, but the DynamoDB `PutItem` operation requires additional configuration. See [Instrumenting Python Lambda Applications][10] or [Instrumenting Node.js Lambda Applications][11] for details.

_Supported runtimes_: Python, Node.js

### Manual trace propagation

TK

For configuration instructions and further details, see [Manual Trace Propagation][12].

_Supported runtimes_: Python, Node.js

### Merging AWS X-Ray traces

If you are tracing some of your functions with AWS X-Ray, you can merge your X-Ray traces with Datadog to see connected traces across your infrastructure. 

For configuration instructions and further details, see [Merge AWS X-Ray traces with Datadog APM][8].

_Supported runtimes_: Python, Node.js

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing
[2]: /serverless/aws_lambda/metrics
[3]: /serverless/libraries_integrations#datadog-lambda-libraries
[4]: /serverless/libraries_integrations/extension/
[5]: https://app.datadoghq.com/functions?cloud=aws&entity_view=lambda_functions
[6]: /tracing/trace_explorer/
[7]: /tracing/guide/aws_payload_tagging/
[8]: /serverless/guide/lambda-xray-trace-merging
[9]: /serverless/guide/lambda-span-autolinking
[10]: /serverless/aws_lambda/installation/python/#span-auto-linking
[11]: /serverless/aws_lambda/installation/nodejs/#span-auto-linking
[12]: /serverless/guide/manual-trace-propagation