---
title: Distributed Tracing with AWS Lambda Serverless Applications
kind: documentation
aliases:
  - /tracing/serverless_functions
  - /tracing/setup_overview/serverless_functions/
  - /serverless/troubleshooting/serverless_apm_metrics/
  - /serverless/distributed_tracing/serverless_trace_merging
  - /serverless/distributed_tracing/serverless_trace_propagation
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

By connecting your serverless traces to metrics, Datadog provides a context-rich picture of your application's performance, allowing you to better troubleshoot performance issues given the distributed nature of serverless applications.

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

## Trace Merging

### Use cases

Datadog recommends using only the Datadog APM trace library (`dd-trace`), but in some advanced situations users can combine Datadog tracing and AWS X-Ray using trace merging. Trace merging is available for Node.js and Python AWS Lambda functions. If you aren't sure which tracing library to use, read about [choosing your tracing library][17].

There are two primary reasons for instrumenting both `dd-trace` and AWS X-Ray tracing libraries:
- In an AWS serverless environment, you are already tracing your Lambda functions with `dd-trace`, you require AWS X-Ray active tracing for AWS managed services such as AppSync and Step Functions, and you want to visualize the `dd-trace` and AWS X-Ray spans in one single trace.
- In a hybrid environment with both Lambda functions and hosts, `dd-trace` instruments your hosts, AWS X-Ray instruments your Lambda functions, and you want to visualize connected traces for transactions across Lambda functions and hosts.

**Note:** This may result in higher usage bills. X-Ray spans continue to be available in your merged traces after 2-5 minutes. In many cases, Datadog recommends only using a single tracing library. Learn more about [choosing your tracing library][17].

You can find setup instructions for each of the above use cases below:

- [Trace merging in a serverless-first environment](#trace-merging-in-an-AWS-serverless-environment)
- [Trace merging across AWS Lambda and hosts](#tracing-across-aws-lambda-and-hosts)

### Trace merging in an AWS serverless environment

AWS X-Ray provides both a backend AWS service (AWS X-Ray active tracing) and a set of client libraries. [Enabling the backend AWS service alone in the Lambda console][18] gives you `Initialization` and `Invocation` spans for your AWS Lambda functions. You can also enable AWS X-Ray active tracing from the API Gateway and Step Function consoles.

Both the AWS X-Ray SDK and Datadog APM client libraries (`dd-trace`) add metadata and spans for downstream calls by accessing the function directly. Assuming you are using `dd-trace` to trace at the handler level, your setup should be similar to the following:

1. You have enabled [AWS X-Ray active tracing][18] on your Lambda functions from the AWS Lambda console and our [AWS X-Ray integration within Datadog][19].
2. You have instrumented your Lambda functions with Datadog APM (`dd-trace`) by following the [installation instructions for your Lambda runtime][5].
3. Third-party libraries are automatically patched by `dd-trace`, so the AWS X-Ray client libraries do not need to be installed.
4. Set the `DD_MERGE_XRAY_TRACES` environment variable to `true` on your Lambda functions to merge the X-Ray and `dd-trace` traces (`DD_MERGE_DATADOG_XRAY_TRACES` in Ruby).

### Tracing across AWS Lambda and hosts

If you have installed Datadog's tracing libraries (`dd-trace`) on both your Lambda functions and hosts, your traces will automatically show you the complete picture of requests that cross infrastructure boundaries, whether it be AWS Lambda, containers, on-prem hosts, or managed services.

If `dd-trace` is installed on your hosts with the Datadog Agent, and your Node.js or Python serverless functions are traced with AWS X-Ray, your setup should be similar to the following:

1. You have installed the [AWS X-Ray integration][18] for tracing your Lambda functions, enabling both AWS X-Ray active tracing and installing the X-Ray client libraries.
2. You have installed the [Datadog Lambda Library for your Lambda runtime][5], and the `DD_TRACE_ENABLED` environment variable is set to `false`.
3. [Datadog APM][20] is configured on your hosts and container-based infrastructure.

Then, for X-Ray and Datadog APM traces to appear in the same flame graph, all services must have the same `env` tag.

**Note**: Distributed Tracing is supported for any runtime for your host or container-based applications. Your hosts and Lambda functions do not need to be in the same runtime.

{{< img src="integrations/amazon_lambda/lambda_host_trace.png" alt="trace of a request from a host to a Lambda function" >}}

## Trace Propagation
{{< img src="serverless/lambda-non-http-trace.png" alt="Serverless Distributed Non-HTTP Trace"  style="width:100%;" >}}

### Required setup

Additional instrumentation is sometimes required to see a single, connected trace in Node and Python serverless applications asynchronously triggering Lambda functions. If you are just getting started with monitoring serverless applications in Datadog, [follow our main installation steps][21] and [read this page on choosing your tracing library][22]. Once you are sending traces from your Lambda functions to Datadog using the [Datadog Lambda Library][23], you may want to follow these steps to connect traces between two Lambda functions in cases such as:
- Triggering Lambda functions via Step Functions
- Invoking Lambda functions via non-HTTP protocols such as MQTT

Tracing many AWS Managed services (listed [here][24]) is supported out-of-the-box and does not require following the steps outlined on this page.

To successfully connect trace context between resources sending traces, you need to:
- Include Datadog trace context in outgoing events. The outgoing event can originate from a host or Lambda function with `dd-trace` installed.
- Extract the trace context in the consumer Lambda function.

### Passing trace context

The following code samples outline how to pass trace context in outgoing payloads to services which do not support HTTP headers, or managed services not supported [natively][24] by Datadog in Node and Python:

{{< tabs >}}
{{% tab "Python" %}}

In Python, you can use the `get_dd_trace_context` helper function to pass tracing context to outgoing events in a Lambda functions:

```py
import json
import boto3
import os

from datadog_lambda.tracing import get_dd_trace_context  # Datadog tracing helper function

def handler(event, context):
    my_custom_client.sendRequest(
        {
          'myCustom': 'data',
          '_datadog': {
              'DataType': 'String',
              'StringValue': json.dumps(get_dd_trace_context()) # Includes trace context in outgoing payload.
          },
        },
    )
```

{{% /tab %}}
{{% tab "Node.js" %}}

In Node, you can use the `getTraceHeaders` helper function to pass tracing context to outgoing events in a Lambda function:

```js
const { getTraceHeaders } = require("datadog-lambda-js"); // Datadog tracing helper function

module.exports.handler = async event => {
  const _datadog = getTraceHeaders(); // Captures current Datadog trace context.

  var payload = JSON.stringify({ data: 'sns', _datadog });
  await myCustomClient.sendRequest(payload)
```

{{% /tab %}}
{{< /tabs >}}

#### From hosts

If you aren't passing trace context from your Lambda functions, you can use the following code template in place of the `getTraceHeaders` and `get_dd_trace_context` helper functions to get the current span context. Instructions on how to do this in every runtime are outlined [here][25].

```js
const tracer = require("dd-trace");

exports.handler = async event => {
  const span = tracer.scope().active();
  const _datadog = {}
  tracer.inject(span, 'text_map', _datadog)

  // ...
```

### Extracting trace context

To extract the above trace context from the consumer Lambda function, you need to define an extractor function that captures trace context before the execution of your Lambda function handler. To do this, configure the `DD_TRACE_EXTRACTOR` environment variable to point to the location of your extractor function. The format for this is `<FILE NAME>.<FUNCTION NAME>`. For example, `extractors.json` if the `json` extractor is in the `extractors.js` file. Datadog recommends you place your extractor methods all in one file, as extractors can be re-used across multiple Lambda functions. These extractors are completely customizable to fit any use case.

**Notes**:
- If you are using TypeScript or a bundler like webpack, you must `import` or `require` your Node.js module where the extractors are defined. This ensures the module gets compiled and bundled into your Lambda deployment package.
- If your Node.js Lambda function runs on `arm64`, you must [define the extractor in your function code][26] instead of using the `DD_TRACE_EXTRACTOR` environment variable.

#### Sample extractors

The following code samples outline sample extractors you might use for propagating trace context across a third party system, or an API which does not support standard HTTP headers.

{{< tabs >}}
{{% tab "Python" %}}
```py
def extractor(payload):
    trace_headers = json.loads(payload["_datadog"]);
    trace_id = trace_headers["x-datadog-trace-id"];
    parent_id = trace_headers["x-datadog-parent-id"];
    sampling_priority = trace_headers["x-datadog-sampling-priority"];
    return trace_id, parent_id, sampling_priority
```
{{% /tab %}}
{{% tab "Node.js" %}}

```js
exports.json = (payload) => {
    const traceData = payload._datadog
    const traceID = traceData["x-datadog-trace-id"];
    const parentID = traceData["x-datadog-parent-id"];
    const sampledHeader = traceData["x-datadog-sampling-priority"];
    const sampleMode = parseInt(sampledHeader, 10);

    return {
      parentID,
      sampleMode,
      source: 'event',
      traceID,
    };
};
```
{{% /tab %}}
{{% tab "Go" %}}
```go
var exampleSQSExtractor = func(ctx context.Context, ev json.RawMessage) map[string]string {
	eh := events.SQSEvent{}

	headers := map[string]string{}

	if err := json.Unmarshal(ev, &eh); err != nil {
		return headers
	}

	// Using SQS as a trigger with a batchSize=1 so it's important we check
  // for this as a single SQS message will drive the execution of the handler.
	if len(eh.Records) != 1 {
		return headers
	}

	record := eh.Records[0]

	lowercaseHeaders := map[string]string{}
	for k, v := range record.MessageAttributes {
		if v.StringValue != nil {
			lowercaseHeaders[strings.ToLower(k)] = *v.StringValue
		}
	}

	return lowercaseHeaders
}

cfg := &ddlambda.Config{
    TraceContextExtractor: exampleSQSExtractor,
}
ddlambda.WrapFunction(handler, cfg)
```
{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /serverless/distributed_tracing#distributed-tracing-with-datadog-apm
[2]: /integrations/amazon_xray/#overview
[3]: /tracing/trace_collection/compatibility/python
[4]: /tracing/trace_collection/compatibility/nodejs
[5]: /serverless/installation/
[6]: /serverless/distributed_tracing/#trace-merging
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
[17]: /serverless/distributed_tracing/
[18]: https://docs.aws.amazon.com/lambda/latest/dg/services-xray.html
[19]: https://app.datadoghq.com/account/settings#integrations/amazon_xray
[20]: /tracing/send_traces/
[21]: /serverless/installation
[22]: /serverless/distributed_tracing
[23]: /serverless/datadog_lambda_library
[24]: /serverless/distributed_tracing#runtime-recommendations
[25]: /tracing/trace_collection/custom_instrumentation/
[26]: /serverless/guide/handler_wrapper/
