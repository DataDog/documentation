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
- Asynchronously triggering Lambda functions via SNS, Kinesis or EventBridge
- Invoking Lambda functions via non-HTTP protocols such as MQTT

Many tracing integrations (listed [here][4]) are supported out-of-the-box and do not require following the steps outlined on this page.

To successfully connect trace context between resources sending traces, you need to:
- Include Datadog trace context in outgoing events. The outgoing event can originate from a host or Lambda function with `dd-trace` installed.
- Extract the trace context in the consumer Lambda function.

## Passing trace context

The following code samples outline how to pass trace context in outgoing events to some technologies in Node and Python:

{{< tabs >}}
{{% tab "Python" %}}

In Python, you can use the `get_dd_trace_context` helper function to easily pass tracing context to outgoing events in a Lambda functions:

```py
import json
import boto3
import os

from datadog_lambda.tracing import get_dd_trace_context  # Datadog tracing helper function

sns_client = boto3.client('sns')
kinesis_client = boto3.client('kinesis')
eventbridge_client = boto3.client('eventbridge')

def handler(event, context):
    sns_client.publish(
        TopicArn = 'PLACEHOLDER' # Your SNS topic ARN.
        Message = 'Asynchronously invoking a Lambda function with SNS.',
        MessageAttributes = {
            '_datadog': {
                'DataType': 'String',
                'StringValue': json.dumps(get_dd_trace_context()) # Includes trace context in outgoing message to SNS topic.
            },
        },
    )

    kinesis_client.put_record(
      Data= json.dumps(get_dd_trace_context()),
      PartitionKey='test',
      StreamName='PLACEHOLDER', # Your Kinesis stream ARN.
    )

    eventbridge_client.put_events(
      Entries=[
        {
            'Source': 'tracing-tests-python',
            'DetailType': 'transaction',
            'Detail': json.dumps(get_dd_trace_context()),
            'EventBusName': 'PLACEHOLDER', # Your Event Bus name.
        }
      ]
    )
```

{{% /tab %}}
{{% tab "Node.js" %}}

In Node, you can use the `getTraceHeaders` helper function to easily pass tracing context to outgoing events in a Lambda function:

```js
const AWS = require('aws-sdk');
const { getTraceHeaders } = require("datadog-lambda-js"); // Datadog tracing helper function

const sns = new AWS.SNS();
const kinesis = new AWS.Kinesis();
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

  const kinesisParams = {
    Data: JSON.stringify({ data: 'kinesis', _datadog }),
    PartitionKey: 'test',
    StreamName: 'PLACEHOLDER', // Your Kinesis stream ARN.
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
  await kinesis.putRecord(kinesisParams).promise();
  await eventBridge.putEvents(eventBridgeParams).promise()
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

To extract the above trace context from the consumer Lambda function, you need to define an extractor function that runs captures trace context before the execution of your Lambda function handler. To do this, configure the `DD_TRACE_EXTRACTOR` environment variable to point to the location of your extractor function (format is `<FILE NAME>.<FUNCTION NAME>`, for example, `extractors.sns` if the `sns` extract method is in the `extractors.js` file). We recommend you place your extractor methods all in one file, as extractors can be re-used across multiple Lambda functions. These extractors are completely customizable to fit any use case, and we included some sample extractors for common use cases in the next section.

### Sample extractors

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

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /serverless/installation
[2]: /serverless/distributed_tracing
[3]: /serverless/datadog_lambda_library
[4]: /serverless/distributed_tracing#runtime-recommendations
[5]: /tracing/setup_overview/custom_instrumentation/
