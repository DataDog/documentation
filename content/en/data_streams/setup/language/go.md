---
title: Setup Data Streams Monitoring for Go
further_reading:
    - link: 'https://www.datadoghq.com/blog/confluent-connector-dsm-autodiscovery/'
      tag: 'Blog'
      text: 'Autodiscover Confluent Cloud connectors and easily monitor performance in Data Streams Monitoring'
aliases:
    - /data_streams/go
---

The following instrumentation types are available:

-   [Automatic instrumentation for Kafka-based workloads](#automatic-instrumentation)
-   [Manual Instrumentation for Kafka-based workloads](#kafka-based-workloads)
-   [Manual instrumentation for other queuing technology or protocol](#other-queuing-technologies-or-protocols)

### Prerequisites

To start with Data Streams Monitoring, you need recent versions of the Datadog Agent and Data Streams Monitoring libraries.

-   [Datadog Agent v7.34.0 or later][1]
-   [dd-trace-go v1.56.1 or later][2]

{{% tracing-go-v2 %}}

Data Streams Monitoring has not been changed between v1 and v2 of the tracer.

### Supported libraries

| Technology | Library                 | Minimal tracer version                                                       | Recommended tracer version                                                       |
| ---------- | ----------------------- | ---------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Kafka      | [confluent-kafka-go][8] | {{< dsm-tracer-version lang="go" lib="confluent-kafka-go" type="minimal" >}} | {{< dsm-tracer-version lang="go" lib="confluent-kafka-go" type="recommended" >}} |
| Kafka      | [Sarama][9]             | {{< dsm-tracer-version lang="go" lib="sarama" type="minimal" >}}             | {{< dsm-tracer-version lang="go" lib="sarama" type="recommended" >}}             |
| Kafka      | [kafka-go][10]          | {{< dsm-tracer-version lang="go" lib="kafka-go" type="minimal" >}}           | {{< dsm-tracer-version lang="go" lib="kafka-go" type="recommended" >}}           |

### Installation

{{% data_streams/monitoring-kafka-pipelines %}}

{{% data_streams/monitoring-rabbitmq-pipelines %}}

#### Automatic Instrumentation

Automatic instrumentation uses [Orchestrion][4] to install dd-trace-go and supports both the Sarama and Confluent Kafka libraries.

To automatically instrument your service:

1. Follow the [Orchestrion Getting Started][5] guide to compile or run your service using [Orchestrion][4].
2. Set the `DD_DATA_STREAMS_ENABLED=true` environment variable

#### Manual instrumentation

##### Sarama Kafka client

To manually instrument the Sarama Kafka client with Data Streams Monitoring:

1. Import the `ddsarama` go library

```go
import (
  ddsarama "github.com/DataDog/dd-trace-go/contrib/IBM/sarama/v2"
)

2. Wrap the producer with `ddsarama.WrapAsyncProducer`

...
config := sarama.NewConfig()
producer, err := sarama.NewAsyncProducer([]string{bootStrapServers}, config)

// ADD THIS LINE
producer = ddsarama.WrapAsyncProducer(config, producer, ddsarama.WithDataStreams())
```

##### Confluent Kafka client

To manually instrument Confluent Kafka with Data Streams Monitoring:

1. Import the `ddkafka` go library

```go
import (
  ddkafka "github.com/DataDog/dd-trace-go/contrib/confluentinc/confluent-kafka-go/kafka.v2/v2"
)
```

2. Wrap the producer creation with `ddkafka.NewProducer` and use the `ddkafka.WithDataStreams()` configuration

```go
// CREATE PRODUCER WITH THIS WRAPPER
producer, err := ddkafka.NewProducer(&kafka.ConfigMap{
		"bootstrap.servers": bootStrapServers,
}, ddkafka.WithDataStreams())
```

If a service consumes data from one point and produces to another point, propagate context between the two places using the Go context structure:

3. Extract the context from headers

```go
ctx = datastreams.ExtractFromBase64Carrier(ctx, ddsarama.NewConsumerMessageCarrier(message))
```

4. Inject it into the header before producing downstream
    ```go
    datastreams.InjectToBase64Carrier(ctx, ddsarama.NewProducerMessageCarrier(message))
    ```

#### Other queuing technologies or protocols

You can also use manual instrumentation. For example, you can propagate context through Kinesis.

##### Instrumenting the produce call

1. Ensure your message supports the [TextMapWriter interface][6].
2. Inject the context into your message and instrument the produce call by calling:

```go
ctx, ok := tracer.SetDataStreamsCheckpointWithParams(ctx, options.CheckpointParams{PayloadSize: getProducerMsgSize(msg)}, "direction:out", "type:kinesis", "topic:kinesis_arn")
if ok {
  datastreams.InjectToBase64Carrier(ctx, message)
}

```

##### Instrumenting the consume call

1. Ensure your message supports the [TextMapReader interface][7].
2. Extract the context from your message and instrument the consume call by calling:

```go
	ctx, ok := tracer.SetDataStreamsCheckpointWithParams(datastreams.ExtractFromBase64Carrier(context.Background(), message), options.CheckpointParams{PayloadSize: payloadSize}, "direction:in", "type:kinesis", "topic:kinesis_arn")
```

### Monitoring connectors

#### Confluent Cloud connectors

{{% data_streams/dsm-confluent-connectors %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/
[2]: https://github.com/DataDog/dd-trace-go
[3]: /tracing/trace_collection/library_config/go/
[4]: https://datadoghq.dev/orchestrion/
[5]: https://datadoghq.dev/orchestrion/docs/getting-started/
[6]: https://github.com/DataDog/dd-trace-go/blob/main/datastreams/propagation.go#L37
[7]: https://github.com/DataDog/dd-trace-go/blob/main/datastreams/propagation.go#L44
[8]: https://github.com/confluentinc/confluent-kafka-go
[9]: https://github.com/IBM/sarama
[10]: https://github.com/segmentio/kafka-go
