---
kind: documentation
title: Configurer Data Streams Monitoring pour Go
---

### Prérequis

Pour implémenter la solution Data Streams Monitoring, vous devez avoir installé la dernière version de l'Agent Datadog et des bibliothèques Data Streams Monitoring :
* [Agent Datadog v7.34.0 ou version ultérieure][1]
* [dd-trace-go v1.56.1 ou version ultérieure][2]

### Installation

- Définissez la variable d'environnement `DD_DATA_STREAMS_ENABLED=true`.
- [Démarrez le traceur][3].

Vous avez le choix entre deux types d'instrumentation :
- une instrumentation pour les workloads basés sur Kafka ;
- Une instrumentation personnalisée pour les autres technologies ou protocoles de mise en file d'attente

### Client Confluent Kafka

```go
import (
  ddkafka "gopkg.in/DataDog/dd-trace-go.v1/contrib/confluentinc/confluent-kafka-go/kafka.v2"
)

...
// CRÉEZ UN PRODUCTEUR AVEC CE WRAPPER
producer, err := ddkafka.NewProducer(&kafka.ConfigMap{
        "bootstrap.servers": bootStrapServers,
}, ddkafka.WithDataStreams())

```

Si un service consomme des données en un point et en produit en un autre point, propagez le contexte entre ces deux points à l'aide de la structure du contexte Go :
1. Extrayez le contexte des en-têtes :
    ```go
    ctx = datastreams.ExtractFromBase64Carrier(ctx, ddsarama.NewConsumerMessageCarrier(message))
    ```

2. Injectez-le dans l'en-tête avant la production des données en aval :
    ```go
    datastreams.InjectToBase64Carrier(ctx, ddsarama.NewProducerMessageCarrier(message))
    ```

### Client Sarama Kafka

```go
import (
  ddsarama "gopkg.in/DataDog/dd-trace-go.v1/contrib/Shopify/sarama"
)

...
config := sarama.NewConfig()
producer, err := sarama.NewAsyncProducer([]string{bootStrapServers}, config)

// AJOUTEZ CETTE LIGNE
producer = ddsarama.WrapAsyncProducer(config, producer, ddsarama.WithDataStreams())
```

### Instrumentation manuelle

Vous pouvez également utiliser l'instrumentation manuelle. Par exemple, vous pouvez propager le contexte via Kinesis.

#### Instrumenter l'appel de production

1. Assurez-vous que votre message prend en charge l'[interface TextMapWriter](https://github.com/DataDog/dd-trace-go/blob/main/datastreams/propagation.go#L37).
2. Injectez le contexte dans votre message et instrumentez l'appel de production comme suit :

```go
ctx, ok := tracer.SetDataStreamsCheckpointWithParams(ctx, options.CheckpointParams{PayloadSize: getProducerMsgSize(msg)}, "direction:out", "type:kinesis", "topic:kinesis_arn")
if ok {
  datastreams.InjectToBase64Carrier(ctx, message)
}

```

#### Instrumenter l'appel de consommation

1. Assurez-vous que votre message prend en charge l'[interface TextMapReader](https://github.com/DataDog/dd-trace-go/blob/main/datastreams/propagation.go#L44).
2. Extrayez le contexte de votre message et instrumentez l'appel de consommation comme suit :

```go
    ctx, ok := tracer.SetDataStreamsCheckpointWithParams(datastreams.ExtractFromBase64Carrier(context.Background(), message), options.CheckpointParams{PayloadSize: payloadSize}, "direction:in", "type:kinesis", "topic:kinesis_arn")
```

[1]: /fr/agent
[2]: https://github.com/DataDog/dd-trace-go
[3]: https://docs.datadoghq.com/fr/tracing/trace_collection/library_config/go/