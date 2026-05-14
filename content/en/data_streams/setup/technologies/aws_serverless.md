---
title: Data Streams Monitoring for AWS Serverless
further_reading:
    - link: '/data_streams/setup/technologies/sqs/'
      tag: 'Documentation'
      text: 'Data Streams Monitoring for Amazon SQS'
    - link: '/data_streams/setup/technologies/sns/'
      tag: 'Documentation'
      text: 'Data Streams Monitoring for Amazon SNS'
    - link: '/data_streams/manual_instrumentation/'
      tag: 'Documentation'
      text: 'Manual Instrumentation'
    - link: '/serverless/'
      tag: 'Documentation'
      text: 'Serverless Monitoring'
---

Data Streams Monitoring supports tracing event-driven pipelines where AWS Lambda functions communicate through Amazon SQS, Amazon SNS, and Amazon EventBridge. Support varies by language and messaging technology:

| | Amazon SQS | Amazon SNS | Amazon EventBridge |
|---|---|---|---|
| Node.js | Automatic | Automatic | Manual |
| Python | Automatic | Automatic | Manual |
| Go | Manual | Manual | Manual |

## Prerequisites

Install the [Datadog Lambda Extension][5] on your Lambda functions.

| Language | Minimum library version |
|---|---|
| Node.js | [`datadog-lambda-js` v12.128.0][1] |
| Python | [`datadog-lambda-python` v112][2] |
| Go | [`dd-trace-go` v1.56.1][3] |

## Setup

{{< tabs >}}
{{% tab "Node.js" %}}

### Amazon SQS

Node.js Lambda functions automatically instrument Amazon SQS with Data Streams Monitoring. Set the following environment variable on both your producer and consumer Lambda functions:

```yaml
environment:
  DD_DATA_STREAMS_ENABLED: "true"
  DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED: "true"
```

As a default, the context is **only** injected into the first message in the batch. If you need to inject the context into all messages in the batch set the following environment variable:

```yaml
environment:
  DD_TRACE_AWS_SDK_BATCH_PROPAGATION_ENABLED: "true"
```

{{% data_streams/monitoring-sqs-pipelines %}}

### Amazon SNS

Node.js Lambda functions automatically instrument Amazon SNS with Data Streams Monitoring. Set the following environment variable on your producer Lambda function:

```yaml
environment:
  DD_DATA_STREAMS_ENABLED: "true"
  DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED: "true"
```

As a default, the context is **only** injected into the first message in the batch. If you need to inject the context into all messages in the batch set the following environment variable:

```yaml
environment:
  DD_TRACE_AWS_SDK_BATCH_PROPAGATION_ENABLED: "true"
```

{{% data_streams/monitoring-sns-to-sqs-pipelines %}}

### Amazon Kinesis

Node.js Lambda functions automatically instrument Amazon Kinesis with Data Streams Monitoring. Set the following environment variable on your producer Lambda function:

```yaml
environment:
  DD_DATA_STREAMS_ENABLED: "true"
  DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED: "true"
```

As a default, the context is **only** injected into the first message in the batch. If you need to inject the context into all messages in the batch set the following environment variable:

```yaml
environment:
  DD_TRACE_AWS_SDK_BATCH_PROPAGATION_ENABLED: "true"
```

{{% data_streams/monitoring-sns-to-sqs-pipelines %}}

### Amazon EventBridge

Amazon EventBridge does not support message attributes. Data Streams Monitoring context must be embedded directly in the event `detail` object. Use [manual instrumentation][4] to set produce and consume checkpoints on your Lambda functions.

#### Producer Lambda

```typescript
// EventBridge does not carry message attributes, so we inject the DSM carrier manually
const carrier: Record<string, string> = {};

// Calling `setProduceCheckpoint` creates the DSM checkpoint, and then injects the DSM context
// into the `carrier` object.
tracer.dataStreamsCheckpointer.setProduceCheckpoint(
  `eventbridge:${eventBusName}`,
  evt.type,
  carrier,
);

// Construct the Event
const putEventsEntry: PutEventsRequestEntry = {
  EventBusName: eventBusName,
  Source: evt.source,
  DetailType: evt.type,
  Detail: JSON.stringify({
    ...evt,
    _dsm: carrier,
  }),
};

await ebClient.send(
  new PutEventsCommand({
    Entries: [putEventsEntry],
  }),
);
```

#### Consumer Lambda

This applies if you are consuming directly from EventBridge using a Lambda function, or you first send the message to SQS and then on to Lambda.

```typescript
// Extract the _dsm carrier from the event detail to parse the DSM context
const datadogHeaders = (event.detail as Record<string, unknown>)["_dsm"];
const dsmCarrier: Record<string, string> =
  datadogHeaders && typeof datadogHeaders === "object"
    ? { ...(datadogHeaders as Record<string, string>) }
    : {};

tracer.dataStreamsCheckpointer.setConsumeCheckpoint(
  process.env.EVENT_BUS_NAME ?? (() => { throw new Error("EVENT_BUS_NAME environment variable is not set"); })(),
  event["detail-type"],
  dsmCarrier,
);
```

{{% /tab %}}
{{% tab "Python" %}}

### Amazon SQS

Python Lambda functions automatically instrument Amazon SQS with Data Streams Monitoring. Set the following environment variable on both your producer and consumer Lambda functions:

```yaml
environment:
  DD_DATA_STREAMS_ENABLED: "true"
```

{{% data_streams/monitoring-sqs-pipelines %}}

### Amazon SNS

Python Lambda functions automatically instrument Amazon SNS with Data Streams Monitoring. Set the following environment variable on your producer Lambda function:

```yaml
environment:
  DD_DATA_STREAMS_ENABLED: "true"
```

{{% data_streams/monitoring-sns-to-sqs-pipelines %}}

### Amazon EventBridge

Amazon EventBridge does not support message attributes. Data Streams Monitoring context must be embedded directly in the event `detail` object. Use [manual instrumentation][4] to set produce and consume checkpoints on your Lambda functions.

#### Producer Lambda

```python
# EventBridge has no native message attributes, so DSM context is injected manually
# into a _dsm field on the event detail — the consumer extracts it from there.
dsm_carrier = {}
set_produce_checkpoint(
  typ=f"eventbridge:{event_bus_name}",
  target=evt["type"],
  carrier_set=lambda key, value: dsm_carrier.update({key: value}),
)

detail = {
  **json.loads(to_json(evt).decode("utf-8")),
  "_dsm": dsm_carrier,
}

eb_client.put_events(
  Entries=[
    {
      "EventBusName": event_bus_name,
      "Source": evt["source"],
      "DetailType": evt["type"],
      "Detail": json.dumps(detail),
    }
  ]
)
```

#### Consumer Lambda

This applies if you are consuming directly from EventBridge using a Lambda function, or you first send the message to SQS and then on to Lambda.

```python
# Extract the _dsm carrier embedded in the event detail to restore DSM pathway context.
detail = event.get("detail", {})
dsm_carrier = dict(detail.get("_dsm") or {})

# Set the type to the name of the event bus, and the message type to be
# the detail type of the event.
set_consume_checkpoint(
  typ=f"eventbridge:{event_bus_name}",
  source=event["detail-type"],
  carrier_get=lambda key: dsm_carrier.get(key, ""),
)
```

{{% /tab %}}
{{% tab "Go" %}}

Go Lambda functions require manual instrumentation for all supported messaging technologies. For each messaging scenario, set a produce checkpoint before sending and a consume checkpoint when receiving. Use `datastreams.InjectToBase64Carrier` and `datastreams.ExtractFromBase64Carrier` to carry DSM context with the message.

Set the following environment variable on all Lambda functions in the pipeline:

```yaml
environment:
  DD_DATA_STREAMS_ENABLED: "true"
```

### Producer Code

The producer embeds the context in the message body before sending.

```go
func handler(ctx context.Context, _ json.RawMessage) error {
  carrier := make(map[string]string)
  ctx, ok := ddtracer.SetDataStreamsCheckpointWithParams(
    ctx,
    options.CheckpointParams{},
    "direction:out", "type:sqs", "topic:"+queueURL,
  )
  if !ok {
    log.Println("failed to set DSM produce checkpoint")
  }
  datastreams.InjectToBase64Carrier(ctx, dsm.Carrier(carrier))

  // Then include the carrier in your message body
  message := Message{
    DSM: carrier
  }
}
```

### Consumer Code

Regardless of the message transport used, the consumer needs to extract the DSM context from the inbound message and use that to call `SetDataStreamsCheckpointWithParams`.

```go
func handler(ctx context.Context, event events.SQSEvent) (lambdainternal.BatchResponse, error) {
  // Restore the DSM pathway from the carrier embedded in the message body,
  // then set the consume-side checkpoint to close the pipeline edge.
  recordCtx := ctx

  recordCtx = datastreams.ExtractFromBase64Carrier(recordCtx, dsm.Carrier(message.DSM))
  recordCtx, _ = tracer.SetDataStreamsCheckpointWithParams(
    recordCtx,
    options.CheckpointParams{},
    "direction:in", "type:sqs", "topic:"+record.EventSourceARN,
  )
}
```

{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-lambda-js/releases/tag/v12.128.0
[2]: https://github.com/DataDog/datadog-lambda-python/releases/tag/v7.112.0
[3]: https://github.com/DataDog/dd-trace-go
[4]: /data_streams/manual_instrumentation/
[5]: /serverless/aws_lambda/instrumentation/
