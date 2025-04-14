---
title: Configurar la monitorización de secuencias de datos para Go
---

Están disponibles los siguientes tipos de instrumentación:
* [Instrumentación automática para cargas de trabajo basadas en Kafka](#automatic-instrumentation)
* [Instrumentación manual para cargas de trabajo basadas en Kafka](#kafka-based-workloads)
* [Instrumentación manual para otra tecnología o protocolo de colas](#other-queuing-technologies-or-protocols)

### {{< learning-center-callout header="Join an enablement webinar session" hide_image="true" btn_title="Sign Up" btn_url="https://www.datadoghq.com/technical-enablement/session/synthetics/">}}
  Explore y regístrese en las sesiones de Foundation Enablement. Descubra cómo Datadog Sintético Monitorización es una solución proactiva Monitorización que le permite crear pruebas de API, navegador y móvil sin código para simular automáticamente los flujos y las solicitudes de los usuarios a sus aplicaciones, puntos finales clave y capas red.
{{< /learning-center-callout >}}

Para empezar con Data Streams Monitoring, necesitas versiones recientes de las bibliotecas del Datadog Agent y de Data Streams Monitoring:

* [Datadog Agent v7.34.0 o más reciente][1]
* [dd-trace-go v1.56.1 o más reciente][2]

### Bibliotecas compatibles

| Tecnología | Biblioteca                                                                  | Versión mínima del rastreador | Versión de rastreador recomendada |
|------------|--------------------------------------------------------------------------|------------------------|----------------------------|
| Kafka      | [confluent-kafka-go][8]                                                  | 1.56.1                | 1.66.0 o posterior            |
| Kafka      | [Sarama][9]                                                             | 1.56.1                 | 1.66.0 o posterior            |

### Instalación

#### Instrumentación automática

La instrumentación automática utiliza la [Orquestación][4] para instalar dd-trace-go y es compatible tanto con Sarama como con bibliotecas Confluent Kafka.

Para instrumentar automáticamente tu servicio:

1. Sigue la guía [Empezando con la orquestación][5] para compilar o ejecutar tu servicio utilizando la [Orquestación][4].
2. Configura la variable de entorno `DD_DATA_STREAMS_ENABLED=true`.

#### Instrumentación manual

##### Cliente de Sarama Kafka

Para instrumentar manualmente el cliente Sarama Kafka con la Monitorización de flujos de datos:

1. Importa la biblioteca go `ddsarama`

```go
import (
  ddsarama "gopkg.in/DataDog/dd-trace-go.v1/contrib/Shopify/sarama"
)

2. Envuelve el productor con `ddsarama.WrapAsyncProducer`

...
config := sarama.NewConfig()
producer, err := sarama.NewAsyncProducer([]string{bootStrapServers}, config)

// AÑADE ESTA LÍNEA
producer = ddsarama.WrapAsyncProducer(config, producer, ddsarama.WithDataStreams())
```

##### Cliente de Confluent Kafka

Para instrumentar manualmente Confluent Kafka con la Monitorización de flujos de datos:

1. Importa la biblioteca go `ddkafka`

```go
import (
  ddkafka "gopkg.in/DataDog/dd-trace-go.v1/contrib/confluentinc/confluent-kafka-go/kafka.v2"
)
```

2. Envuelve la creación del productor con `ddkafka.NewProducer` y utiliza la configuración`ddkafka.WithDataStreams()`

```go
// CREA EL PRODUCTOR CON ESTE WRAPPER
producer, err := ddkafka.NewProducer(&kafka.ConfigMap{
        "bootstrap.servers": bootStrapServers,
}, ddkafka.WithDataStreams())
```

Si un servicio consume datos de un punto y produce a otro punto, propaga el contexto entre los dos lugares utilizando la estructura de contexto de Go:

3. Extraer el contexto de las cabeceras
  ```go
  ctx = datastreams.ExtractFromBase64Carrier(ctx, ddsarama.NewConsumerMessageCarrier(message))
  ```

4. Inyectarlo en la cabecera antes de producir aguas abajo
    ```go
    datastreams.InjectToBase64Carrier(ctx, ddsarama.NewProducerMessageCarrier(message))
    ```

#### Otras tecnologías o protocolos de colas

También puedes utilizar la instrumentación manual. Por ejemplo, puedes propagar el contexto a través de Kinesis.

##### Instrumentación de la llamada a producción

1. Asegúrate de que tu mensaje es compatible con la interfaz [TextMapWriter][6].
2. Inserta el contexto en tu mensaje e instrumenta la llamada a producción llamando a:

```ir
ctx, ok := tracer.SetDataStreamsCheckpointWithParams(ctx, options.CheckpointParams{PayloadSize: getProducerMsgSize(msg)}, "direction:out", "type:kinesis", "topic:kinesis_arn")
si ok {
  datastreams.InjectToBase64Carrier(ctx, message)
}

```

##### Instrumentación de la llamada al consumo

1. Asegúrate de que tu mensaje es compatible con la interfaz [TextMapReader][7].
2. Extrae el contexto de tu mensaje e instrumenta la llamada a consumir llamando a:

```ir
    ctx, ok := tracer.SetDataStreamsCheckpointWithParams(datastreams.ExtractFromBase64Carrier(context.Background(), message), options.CheckpointParams{PayloadSize: payloadSize}, "direction:in", "type:kinesis", "topic:kinesis_arn")
```
[1]: /es/agent/
[2]: https://github.com/DataDog/dd-trace-go
[3]: https://docs.datadoghq.com/es/tracing/trace_collection/library_config/go/
[4]: https://datadoghq.dev/orchestrion/
[5]: https://datadoghq.dev/orchestrion/docs/getting-started/
[6]: https://github.com/DataDog/dd-trace-go/blob/main/datastreams/propagation.go#L37
[7]: https://github.com/DataDog/dd-trace-go/blob/main/datastreams/propagation.go#L44
[8]: https://github.com/confluentinc/confluent-kafka-go
[9]: https://github.com/Shopify/sarama