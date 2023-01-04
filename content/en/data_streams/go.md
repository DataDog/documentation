---
title: Setup Data Streams Monitoring for Go
kind: documentation
further_reading:
    - link: '/data_streams/glossary/'
      tag: 'Documentation'
      text: 'Data Streams Glossary'
---

### Prerequisites

To start with Data Streams Monitoring, you need recent versions of the Datadog Agent and Data Streams Monitoring libraries:
* [Datadog Agent v7.34.0+][1]
* [Data Streams Library v0.2+][2]

### Installation

Initiate a Data Streams pathway with `datastreams.Start()` at the start of your pipeline. Then, two types of instrumentation are available:
- Instrumentation for Kafka-based workloads
- Custom instrumentation for any other queuing technology or protocol

<div class="alert alert-info">The default Trace Agent URL is <code>localhost:8126</code>. If this is different for your application, use the option <code>datastreams.Start(datastreams.WithAgentAddr("notlocalhost:8126"))</code>.</div>

### Kafka instrumentation

1. Configure producers to call `TraceKafkaProduce()` before sending out a Kafka message:

```go
import (ddkafka "github.com/DataDog/data-streams-go/integrations/kafka")
...
ctx = ddkafka.TraceKafkaProduce(ctx, &kafkaMsg)
```

This function adds a new checkpoint onto any existing pathway in the provided Go context, or creates a new pathway if none are found. It then adds the pathway into your Kafka message headers.

2. Configure consumers to call `TraceKafkaConsume()`:

```go
import ddkafka "github.com/DataDog/data-streams-go/integrations/kafka"
...
ctx = ddkafka.TraceKafkaConsume(ctx, &kafkaMsg, consumer_group)
```

This function extracts the pathway that a Kafka message has gone through so far. It sets a new checkpoint on the pathway to record the successful consumption of a message and stores the pathway into the provided Go context.

**Note**: The output `ctx` from `TraceKafkaProduce()` and the output `ctx` from `TraceKafkaConsume()` both contain information about the updated pathway. 

For `TraceKafkaProduce()`, if you are sending multiple Kafka messages at once (fan-out), do not reuse the output `ctx` across calls.

For `TraceKafkaConsume()`, if you are aggregating multiple messages to create a smaller number of payloads (fan-in), call `MergeContext()` to merge the contexts into one context that can be passed into the next `TraceKafkaProduce()` call:

```go
import (
    datastreams "github.com/DataDog/data-streams-go"
    ddkafka "github.com/DataDog/data-streams-go/integrations/kafka"
)

...

contexts := []Context{}
for (...) {
    contexts.append(contexts, ddkafka.TraceKafkaConsume(ctx, &consumedMsg, consumer_group))
}
mergedContext = datastreams.MergeContexts(contexts...)

...

ddkafka.TraceKafkaProduce(mergedContext, &producedMsg)
```

### Manual instrumentation

You can also use manual instrumentation.

For example, in HTTP, you can propagate the pathway with HTTP headers.

To inject a pathway:

```go
req, err := http.NewRequest(...)
...
p, ok := datastreams.PathwayFromContext(ctx)
if ok {
   req.Headers.Set(datastreams.PropagationKeyBase64, p.EncodeStr())
}
```

To extract a pathway:

```go
func extractPathwayToContext(req *http.Request) context.Context {
	ctx := req.Context()
	p, err := datastreams.DecodeStr(req.Header.Get(datastreams.PropagationKeyBase64))
	if err != nil {
		return ctx
	}
	ctx = datastreams.ContextWithPathway(ctx, p)
	_, ctx = datastreams.SetCheckpoint(ctx, "type:http")
}
```

### Add a dimension

You can add an additional dimension to end-to-end latency metrics with the `event_type` tag:

```go
_, ctx = datastreams.SetCheckpoint(ctx, "type:internal", "event_type:sell")
```

You only need to add the `event_type` tag for the first service in each pathway. High-cardinality data (such as request IDs or hosts) are not supported as values for the `event_type` tag.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent
[2]: https://github.com/DataDog/data-streams-go
