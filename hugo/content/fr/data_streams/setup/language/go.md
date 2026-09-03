---
aliases:
- /fr/data_streams/go
further_reading:
- link: https://www.datadoghq.com/blog/confluent-connector-dsm-autodiscovery/
  tag: Blog
  text: Détecter automatiquement les connecteurs Confluent Cloud et surveiller facilement
    les performances dans Data Streams Monitoring
title: Configurer Data Streams Monitoring pour Go
---

Les types d'instrumentation suivants sont disponibles :

-   [Instrumentation automatique pour les workloads basés sur Kafka](#instrumentation-automatique)
-   [Instrumentation manuelle pour les workloads basés sur Kafka](#workloads-bases-sur-kafka)
-   [Instrumentation manuelle pour les autres technologies de file d'attente ou protocoles](#autres-technologies-de-file-d-attente-ou-protocoles)

### Prérequis

Pour implémenter la solution Data Streams Monitoring, vous devez avoir installé la dernière version de l'Agent Datadog et des bibliothèques Data Streams Monitoring.

-   [Agent Datadog v7.34.0 ou version ultérieure][1]
-   [dd-trace-go v1.56.1 ou version ultérieure][2]

{{% tracing-go-v2 %}}

Data Streams Monitoring n'a pas été modifié entre les versions v1 et v2 du traceur.

### Bibliothèques compatibles

| Technologies | Bibliothèque                 | Version minimale du traceur                                                       | Version recommandée du traceur                                                       |
| ---------- | ----------------------- | ---------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Kafka      | [confluent-kafka-go][8] | {{< dsm-tracer-version lang="go" lib="confluent-kafka-go" type="minimal" >}} | {{< dsm-tracer-version lang="go" lib="confluent-kafka-go" type="recommended" >}} |
| Kafka      | [Sarama][9]             | {{< dsm-tracer-version lang="go" lib="sarama" type="minimal" >}}             | {{< dsm-tracer-version lang="go" lib="sarama" type="recommended" >}}             |
| Kafka      | [kafka-go][10]          | {{< dsm-tracer-version lang="go" lib="kafka-go" type="minimal" >}}           | {{< dsm-tracer-version lang="go" lib="kafka-go" type="recommended" >}}           |

### Installation

{{% data_streams/monitoring-kafka-pipelines %}}

{{% data_streams/monitoring-rabbitmq-pipelines %}}

#### Instrumentation automatique

L'instrumentation automatique utilise [Orchestrion][4] pour installer dd-trace-go et prend en charge les bibliothèques Sarama et Confluent Kafka.

Pour instrumenter automatiquement votre service :

1. Suivez le guide [Prise en main d'Orchestrion][5] pour compiler ou exécuter votre service avec [Orchestrion][4].
2. Définissez la variable d'environnement `DD_DATA_STREAMS_ENABLED=true`

#### Instrumentation manuelle

##### Client Sarama Kafka

Pour instrumenter manuellement le client Sarama Kafka avec Data Streams Monitoring :

1. Importez la bibliothèque go `ddsarama`

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

##### Client Confluent Kafka

Pour instrumenter manuellement Confluent Kafka avec Data Streams Monitoring :

1. Importez la bibliothèque go `ddkafka`

```go
import (
  ddkafka "github.com/DataDog/dd-trace-go/contrib/confluentinc/confluent-kafka-go/kafka.v2/v2"
)
```

2. Encapsulez la création du producteur avec `ddkafka.NewProducer` et utilisez la configuration `ddkafka.WithDataStreams()`

```go
// CREATE PRODUCER WITH THIS WRAPPER
producer, err := ddkafka.NewProducer(&kafka.ConfigMap{
        "bootstrap.servers": bootStrapServers,
}, ddkafka.WithDataStreams())
```

Si un service consomme des données en un point et en produit en un autre point, propagez le contexte entre ces deux points à l'aide de la structure du contexte Go :

3. Extrayez le contexte des en-têtes

    ```go
    ctx = datastreams.ExtractFromBase64Carrier(ctx, ddsarama.NewConsumerMessageCarrier(message))
    ```

4. Injectez-le dans l'en-tête avant la production des données en aval
    ```go
    datastreams.InjectToBase64Carrier(ctx, ddsarama.NewProducerMessageCarrier(message))
    ```

#### Autres technologies de file d'attente ou protocoles

Vous pouvez également utiliser l'instrumentation manuelle. Par exemple, vous pouvez propager le contexte via Kinesis.

##### Instrumenter l'appel de production

1. Assurez-vous que votre message prend en charge l'[interface TextMapWriter][6].
2. Injectez le contexte dans votre message et instrumentez l'appel de production comme suit :

```go
ctx, ok := tracer.SetDataStreamsCheckpointWithParams(ctx, options.CheckpointParams{PayloadSize: getProducerMsgSize(msg)}, "direction:out", "type:kinesis", "topic:kinesis_arn")
if ok {
  datastreams.InjectToBase64Carrier(ctx, message)
}

```

##### Instrumenter l'appel de consommation

1. Assurez-vous que votre message prend en charge l'[interface TextMapReader][7].
2. Extrayez le contexte de votre message et instrumentez l'appel de consommation comme suit :

```go
    ctx, ok := tracer.SetDataStreamsCheckpointWithParams(datastreams.ExtractFromBase64Carrier(context.Background(), message), options.CheckpointParams{PayloadSize: payloadSize}, "direction:in", "type:kinesis", "topic:kinesis_arn")
```

### Surveillance des connecteurs

#### Connecteurs Confluent Cloud

{{% data_streams/dsm-confluent-connectors %}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/
[2]: https://github.com/DataDog/dd-trace-go
[3]: /fr/tracing/trace_collection/library_config/go/
[4]: https://datadoghq.dev/orchestrion/
[5]: https://datadoghq.dev/orchestrion/docs/getting-started/
[6]: https://github.com/DataDog/dd-trace-go/blob/main/datastreams/propagation.go#L37
[7]: https://github.com/DataDog/dd-trace-go/blob/main/datastreams/propagation.go#L44
[8]: https://github.com/confluentinc/confluent-kafka-go
[9]: https://github.com/IBM/sarama
[10]: https://github.com/segmentio/kafka-go