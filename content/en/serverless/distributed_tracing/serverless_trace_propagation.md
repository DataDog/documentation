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
---


{{< img src="serverless/lambda-non-http-trace.png" alt="Serverless Distributed Non-HTTP Trace"  style="width:100%;" >}}

## Required Setup

Additional instrumentation is sometimes required to see a single, connected trace in Node and Python serverless applications asynchronously triggering Lambda functions. If you are just getting started with monitoring serverless applications in Datadog, first [follow our main installation steps][1] and [read this page on choosing your tracing library][2]. Once you are sending traces from your Lambda functions to Datadog using the [Datadog Lambda Library][3], you may want to follow these steps to connect traces between two Lambda functions in cases such as:
- Asynchronously triggering Lambda functions via SNS, Kinesis or EventBridge
- Invoking Lambda functions via non-HTTP protocols such as MQTT

To successfully connect trace context between resources sending traces, you need to:
- Include Datadog trace context in outgoing events. The outgoing event can originate from a host or Lambda function with `dd-trace` installed.
- Extract the trace context in the consumer Lambda function.

## Passing Trace Context to Outgoing Events

The following code samples outline how to pass trace context in outgoing events to some technologies in Node and Python:

{{< tabs >}}
{{% tab "Python" %}}

In Python, you can use the `get_dd_trace_context` helper function to easily pass tracing context to outgoing events:

```py
import json
import boto3
import os

from datadog_lambda.tracing import get_dd_trace_context  # Datadog tracing helper function

SNS_CLIENT = boto3.client('sns')

def handler(event, context):
    SNS_CLIENT.publish(
        TopicArn = os.getenv('SNS_ARN'),
        Message = 'Asynchronously invoking a Lambda function with SNS.',
        MessageAttributes = {
            '_datadog': {
                'DataType': 'String',
                'StringValue': json.dumps(get_dd_trace_context()) # Includes trace context in outgoing message to SNS topic.
            },
        },
    )
```

{{% /tab %}}
{{% tab "Node.js" %}}

In Node, you can use the `getTraceHeaders` helper function to easily pass tracing context to outgoing events:

```js
const AWS = require('aws-sdk');
const { getTraceHeaders } = require("datadog-lambda-js"); // Datadog tracing helper function

const sns = new AWS.SNS();
const eventBridge = new AWS.EventBridge();

module.exports.handler = async event => {
  const _datadog = getTraceHeaders(); // Captures current Datadog trace context.

  var snsParams = {
    Message: JSON.stringify({ data: 'sns' }),
    MessageAttributes: {
      '_datadog': {
        DataType: 'String',
        StringValue: JSON.stringify(_datadog)  // Includes trace context in outgoing message to SNS topic.
      },
    },
    TopicArn: process.env.SNS_ARN
  };

  var eventBridgeParams = {
    Entries: [{
      EventBusName: 'tracing-tests',
      Source: 'tracing-tests-node',
      DetailType: 'transaction',
      Detail: JSON.stringify({ data: 'eventBridge', _datadog }), // Includes trace context in outgoing message to event bus.
    }]
  };
  
  await sns.publish(snsParams).promise();
  await eventBridge.putEvents(eventBridgeParams).promise()
```

{{% /tab %}}
{{< /tabs >}}

## Extracting Trace Context from Consumer Lambda Functions

To extract the above trace context from the consumer Lambda function, you need to define an extractor function that runs captures trace context before the execution of your Lambda function handler. To do this, configure the `DD_TRACE_EXTRACTOR` environment variable to point to the location of your extractor function. We recommend you place your extractor methods in the same file as your Lambda function handler, or all in one file, as extractors can be re-used across multiple Lambda functions. These extractors are completely customizable to fit any use case, and we included some sample extractors for common use cases in the next section.

### Sample Extractors

The following code samples outline sample extractors you might use for propagating trace context across managed resources such as SNS, Kinesis or EventBridge.

{{< tabs >}}
{{% tab "SNS" %}}

Python:

```py
def extractor(event, context):
    trace_headers = json.loads(event["Records"][0]["Sns"]["MessageAttributes"]["_datadog"]["Value"])
    trace_id = trace_headers["x-datadog-trace-id"]
    parent_id = trace_headers["x-datadog-parent-id"]
    sampling_priority = trace_headers["x-datadog-sampling-priority"]
    return trace_id, parent_id, sampling_priority
```

Node.js:

```js
exports.sns = (event, context) => {
    const traceData = JSON.parse(event.Records[0].Sns.MessageAttributes._datadog.Value);
    const traceID = traceData["x-datadog-trace-id"];
    const parentID = traceData["x-datadog-parent-id"];
    const sampledHeader = traceData["x-datadog-sampling-priority"];
    const sampleMode = parseInt(sampledHeader, 10);
    const result = {
      parentID,
      sampleMode,
      source: 'event',
      traceID,
    };
    console.log(JSON.stringify(result));
    return result
  }
```

{{% /tab %}}
{{% tab "Kinesis" %}}

Python:

```py
def extractor(event, context):
    trace_headers = json.loads(event["Records"][0]["kinesis"]["data"])
    trace_data = trace_headers["_datadog"]
    trace_id = trace_data["x-datadog-trace-id"]
    parent_id = trace_data["x-datadog-parent-id"]
    sampling_priority = trace_data["x-datadog-sampling-priority"]
    return trace_id, parent_id, sampling_priority
```

Node.js:

```js
exports.kinesis = (event, context) => {
  const JSONData = Buffer.from(event.Records[0].kinesis.data, 'base64').toString('utf-8')
  const parsedData = JSON.parse(JSONData);
  const traceData = parsedData._datadog;

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
{{% tab "EventBridge" %}}

Python:

```py
def extractor(event, context):
    trace_headers = json.loads(event["detail"]["_datadog"]);
    trace_id = trace_headers["x-datadog-trace-id"];
    parent_id = trace_headers["x-datadog-parent-id"];
    sampling_priority = trace_headers["x-datadog-sampling-priority"];
    return trace_id, parent_id, sampling_priority
```

Node.js:

```js
exports.eventBridge = (event, context) => {
    const traceData = event.detail._datadog
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
{{< /tabs >}}

[1]: /serverless/installation
[2]: /serverless/distributed_tracing
[3]: /serverless/datadog_lambda_library
