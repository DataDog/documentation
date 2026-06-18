---
title: Data Streams Monitoring for Amazon Event Bridge
---

### Prerequisites

* [Datadog Agent v7.34.0 or later][1] or [Datadog Lambda Extension][2]

## Setup

{{< tabs >}}
{{% tab "Node.js" %}}

### Amazon EventBridge

Amazon EventBridge does not support message attributes. Data Streams Monitoring context must be embedded directly in the event `detail` object. Use [manual instrumentation][3] to set produce and consume checkpoints on your Lambda functions.

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

[3]: /data_streams/manual_instrumentation/

{{% /tab %}}
{{% tab "Python" %}}

### Amazon EventBridge

Amazon EventBridge does not support message attributes. Data Streams Monitoring context must be embedded directly in the event `detail` object. Use [manual instrumentation][3] to set produce and consume checkpoints on your Lambda functions.

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

[3]: /data_streams/manual_instrumentation/

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

### Consumer code

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

[1]: /agent
[2]: /serverless/aws_lambda/instrumentation/