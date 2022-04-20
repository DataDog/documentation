---
title: Serverless Trace Propagation
kind: documentation
further_reading:
- link: "/tracing/"
  tag: "Documentation"
  text: "Explore Datadog APM"
- link: "/tracing/trace_search_and_analytics/#live-search-for-15-minutes"
  tag: "Documentation"
  text: "Live Search"
- link: "https://www.datadoghq.com/blog/aws-serverless-tracing-datadog-apm/"
  tag: "Blog"
  text: "Trace AWS event-driven serverless applications with Datadog APM"
---


{{< img src="serverless/lambda-non-http-trace.png" alt="Serverless Distributed Non-HTTP Trace"  style="width:100%;" >}}

## Required setup

Additional instrumentation is sometimes required to see a single, connected trace in Node and Python serverless applications asynchronously triggering Lambda functions. If you are just getting started with monitoring serverless applications in Datadog, [follow our main installation steps][1] and [read this page on choosing your tracing library][2]. Once you are sending traces from your Lambda functions to Datadog using the [Datadog Lambda Library][3], you may want to follow these steps to connect traces between two Lambda functions in cases such as:
- Triggering Lambda functions via Step Functions
- Invoking Lambda functions via non-HTTP protocols such as MQTT

Tracing many AWS Managed services (listed [here][4]) is supported out-of-the-box and does not require following the steps outlined on this page.

To successfully connect trace context between resources sending traces, you need to:
- Include Datadog trace context in outgoing events. The outgoing event can originate from a host or Lambda function with `dd-trace` installed.
- Extract the trace context in the consumer Lambda function.

## Passing trace context

The following code samples outline how to pass trace context in outgoing payloads to services which do not support HTTP headers, or managed services not supported [natively][4] by Datadog in Node and Python:

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

### From hosts

If you aren't passing trace context from your Lambda functions, you can use the following code template in place of the `getTraceHeaders` and `get_dd_trace_context` helper functions to get the current span context. Instructions on how to do this in every runtime are outlined [here][5].

```js
const tracer = require("dd-trace");

exports.handler = async event => {
  const span = tracer.scope().active();
  const _datadog = {}
  tracer.inject(span, 'text_map', _datadog)

  // ...
```

## Extracting trace context

To extract the above trace context from the consumer Lambda function, you need to define an extractor function that runs captures trace context before the execution of your Lambda function handler. To do this, configure the `DD_TRACE_EXTRACTOR` environment variable to point to the location of your extractor function (format is `<FILE NAME>.<FUNCTION NAME>`, for example, `extractors.json` if the `json` extract method is in the `extractors.js` file). Datadog recommends you place your extractor methods all in one file, as extractors can be re-used across multiple Lambda functions. These extractors are completely customizable to fit any use case.

### Sample extractors

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

[1]: /serverless/installation
[2]: /serverless/distributed_tracing
[3]: /serverless/datadog_lambda_library
[4]: /serverless/distributed_tracing#runtime-recommendations
[5]: /tracing/setup_overview/custom_instrumentation/
