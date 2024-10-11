---
title: Configurar la monitorización de secuencias de datos para Go
---

### Requisitos previos

Para empezar con Data Streams Monitoring, necesitas versiones recientes de las bibliotecas del Datadog Agent y de Data Streams Monitoring:
* [Datadog Agent v7.34.0 o más reciente][1]
* [dd-trace-go v1.56.1 o más reciente][2]

### Instalación

- Configura la variable de entorno `DD_DATA_STREAMS_ENABLED=true`.
- [Inicia el rastreador][3].

Existen dos tipos de instrumentación:
- Instrumentación para cargas de trabajo basadas en Kafka
- Instrumentación personalizada para cualquier otra tecnología o protocolo de puesta en cola

### Cliente de Confluent Kafka

```ir
importar (
  ddkafka "github.com/DataDog/dd-trace-go/contrib/confluentinc/confluent-kafka-go/kafka.v2/v2"
)

...
// CREA UN PRODUCTOR CON ESTA ENVOLTURA
productor, error:= ddkafka.NewProducer(&kafka.ConfigMap{
        "bootstrap.servers": bootStrapServers,
}, ddkafka.WithDataStreams())

```

Si un servicio consume datos de un punto y produce a otro punto, propague el contexto entre los dos lugares utilizando la estructura de contexto de Go:
1. Extraer el contexto de los encabezados:
    ```go
    ctx = datastreams.ExtractFromBase64Carrier(ctx, ddsarama.NewConsumerMessageCarrier(message))
    ```

2. Insértelo en el encabezado antes de producir aguas abajo:
    ```go
    datastreams.InjectToBase64Carrier(ctx, ddsarama.NewProducerMessageCarrier(message))
    ```

### Cliente de Sarama Kafka

```ir
importar (
  ddsarama "github.com/DataDog/dd-trace-go/contrib/Shopify/sarama/v2"
)

...
configurar:= sarama.NewConfig()
productor, error:= sarama.NewAsyncProducer([]string{bootStrapServers}, config)

// AÑADE ESTA LÍNEA
productor = ddsarama.WrapAsyncProducer(config, producer, ddsarama.WithDataStreams())
```

### Instrumentación manual

También puedes utilizar la instrumentación manual. Por ejemplo, puedes propagar el contexto a través de Kinesis.

#### Instrumentación de la llamada a producción

1. Asegúrate de que tu mensaje sea compatible con la [interfaz TextMapWriter](https://github.com/DataDog/dd-trace-go/blob/main/datastreams/propagation.go#L37).
2. Inserta el contexto en tu mensaje e instrumenta la llamada a producción llamando a:

```ir
ctx, ok := tracer.SetDataStreamsCheckpointWithParams(ctx, options.CheckpointParams{PayloadSize: getProducerMsgSize(msg)}, "direction:out", "type:kinesis", "topic:kinesis_arn")
si ok {
  datastreams.InjectToBase64Carrier(ctx, message)
}

```

#### Instrumentación de la llamada al consumo

1. Asegúrate de que tu mensaje sea compatible con la [interfaz TextMapReader](https://github.com/DataDog/dd-trace-go/blob/main/datastreams/propagation.go#L44).
2. Extrae el contexto de tu mensaje e instrumenta la llamada a consumir llamando a:

```ir
    ctx, ok := tracer.SetDataStreamsCheckpointWithParams(datastreams.ExtractFromBase64Carrier(context.Background(), message), options.CheckpointParams{PayloadSize: payloadSize}, "direction:in", "type:kinesis", "topic:kinesis_arn")
```

[1]: /es/agent
[2]: https://github.com/DataDog/dd-trace-go
[3]: https://docs.datadoghq.com/es/tracing/trace_collection/library_config/go/