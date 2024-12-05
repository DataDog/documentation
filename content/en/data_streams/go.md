---
title: Setup Data Streams Monitoring for Go
---

### Prerequisites

To start with Data Streams Monitoring, you need recent versions of the Datadog Agent and Data Streams Monitoring libraries:
* [Datadog Agent v7.34.0 or later][1]
* [dd-trace-go v1.56.1 or later][2]

### Prerequisites

* [Datadog Agent v7.34.0 or later][1]

### Supported libraries

| Technology | Library                                                                  | Minimal tracer version | Recommended tracer version |
|------------|--------------------------------------------------------------------------|------------------------|----------------------------|
| Kafka      | [confluent-kafka-go](https://github.com/confluentinc/confluent-kafka-go) | 1.56.1                 | 1.66.0 or later            |
| Kafka      | [Sarama](https://github.com/Shopify/sarama)                              | 1.56.1                 | 1.66.0 or later            |

### Installation

- Set the `DD_DATA_STREAMS_ENABLED=true` environment variable.
- [Start the tracer][3].

Two types of instrumentation are available:
- Instrumentation for Kafka-based workloads
- Custom instrumentation for any other queuing technology or protocol

### Confluent Kafka client

```go
import (
  ddkafka "gopkg.in/DataDog/dd-trace-go.v1/contrib/confluentinc/confluent-kafka-go/kafka.v2" // use "github.com/DataDog/dd-trace-go/contrib/confluentinc/confluent-kafka-go/kafka.v2/v2" if you're using v2.x
)

...
// CREATE PRODUCER WITH THIS WRAPPER
producer, err := ddkafka.NewProducer(&kafka.ConfigMap{
		"bootstrap.servers": bootStrapServers,
}, ddkafka.WithDataStreams())

```

If a service consumes data from one point and produces to another point, propagate context between the two places using the Go context structure:
1. Extract the context from headers:
    ```go
    ctx = datastreams.ExtractFromBase64Carrier(ctx, ddsarama.NewConsumerMessageCarrier(message))
    ```

2. Inject it into the header before producing downstream:
    ```go
    datastreams.InjectToBase64Carrier(ctx, ddsarama.NewProducerMessageCarrier(message))
    ```

### Sarama Kafka client

```go
import (
  ddsarama "gopkg.in/DataDog/dd-trace-go.v1/contrib/Shopify/sarama" // use "github.com/DataDog/dd-trace-go/contrib/Shopify/sarama" if you're using 2.x
)

...
config := sarama.NewConfig()
producer, err := sarama.NewAsyncProducer([]string{bootStrapServers}, config)

// ADD THIS LINE
producer = ddsarama.WrapAsyncProducer(config, producer, ddsarama.WithDataStreams())
```

### Manual instrumentation

You can also use manual instrumentation. For example, you can propagate context through Kinesis.

#### Instrumenting the produce call

1. Ensure your message supports the [TextMapWriter interface](https://github.com/DataDog/dd-trace-go/blob/main/datastreams/propagation.go#L37).
2. Inject the context into your message and instrument the produce call by calling:

```go
ctx, ok := tracer.SetDataStreamsCheckpointWithParams(ctx, options.CheckpointParams{PayloadSize: getProducerMsgSize(msg)}, "direction:out", "type:kinesis", "topic:kinesis_arn")
if ok {
  datastreams.InjectToBase64Carrier(ctx, message)
}

```

#### Instrumenting the consume call

1. Ensure your message supports the [TextMapReader interface](https://github.com/DataDog/dd-trace-go/blob/main/datastreams/propagation.go#L44).
2. Extract the context from your message and instrument the consume call by calling:

```go
	ctx, ok := tracer.SetDataStreamsCheckpointWithParams(datastreams.ExtractFromBase64Carrier(context.Background(), message), options.CheckpointParams{PayloadSize: payloadSize}, "direction:in", "type:kinesis", "topic:kinesis_arn")
```

[1]: /agent
[2]: https://github.com/DataDog/dd-trace-go
[3]: https://docs.datadoghq.com/tracing/trace_collection/library_config/go/
