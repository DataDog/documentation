---
aliases:
- /fr/data_streams/python
further_reading:
- link: /integrations/kafka/
  tag: Documentation
  text: Intégration Kafka
- link: /tracing/software_catalog/
  tag: Documentation
  text: Software Catalog
- link: https://www.datadoghq.com/blog/confluent-connector-dsm-autodiscovery/
  tag: Blog
  text: Détecter automatiquement les connecteurs Confluent Cloud et surveiller facilement
    les performances dans Data Streams Monitoring
title: Configurer Data Streams Monitoring pour Python
---

### Prérequis

-   [Agent Datadog v7.34.0 ou version ultérieure][10]

### Bibliothèques compatibles

| Technologies     | Bibliothèque                                                      | Version minimale du traceur                                                        | Version recommandée du traceur                                                        | Version minimale de la bibliothèque Lambda                                                |
| -------------- | ------------------------------------------------------------ | ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Kafka          | [confluent-kafka](https://pypi.org/project/confluent-kafka/) | {{< dsm-tracer-version lang="python" lib="confluent-kafka" type="minimal" >}} | {{< dsm-tracer-version lang="python" lib="confluent-kafka" type="recommended" >}} | [112](https://github.com/DataDog/datadog-lambda-python/releases/tag/v7.112.0) |
| Kafka          | [aiokafka](https://pypi.org/project/aiokafka/)               | {{< dsm-tracer-version lang="python" lib="aiokafka" type="minimal" >}}        | {{< dsm-tracer-version lang="python" lib="aiokafka" type="recommended" >}}        | Non prise en charge                                                                 |
| RabbitMQ       | [Kombu](https://pypi.org/project/kombu/)                     | {{< dsm-tracer-version lang="python" lib="kombu" type="minimal" >}}           | {{< dsm-tracer-version lang="python" lib="kombu" type="recommended" >}}           | [112](https://github.com/DataDog/datadog-lambda-python/releases/tag/v7.112.0) |
| Amazon SQS     | [Botocore](https://pypi.org/project/botocore/)               | {{< dsm-tracer-version lang="python" lib="botocore" type="minimal" >}}        | {{< dsm-tracer-version lang="python" lib="botocore" type="recommended" >}}        | [112](https://github.com/DataDog/datadog-lambda-python/releases/tag/v7.112.0) |
| Amazon Kinesis | [Botocore](https://pypi.org/project/botocore/)               | {{< dsm-tracer-version lang="python" lib="botocore" type="minimal" >}}        | {{< dsm-tracer-version lang="python" lib="botocore" type="recommended" >}}        | [112](https://github.com/DataDog/datadog-lambda-python/releases/tag/v7.112.0) |
| Amazon SNS     | [Botocore](https://pypi.org/project/botocore/)               | {{< dsm-tracer-version lang="python" lib="botocore" type="minimal" >}}        | {{< dsm-tracer-version lang="python" lib="botocore" type="recommended" >}}        | [112](https://github.com/DataDog/datadog-lambda-python/releases/tag/v7.112.0) |

### Installation

Python utilise l'instrumentation automatique pour injecter et extraire les métadonnées supplémentaires requises par Data Streams Monitoring afin de mesurer les latences de bout en bout et les relations entre les files d'attente et les services. Pour activer Data Streams Monitoring, définissez la variable d'environnement `DD_DATA_STREAMS_ENABLED` sur `true` sur les services qui envoient des messages à Kafka (ou qui en consomment).

Exemple :

```yaml
environment:
    - DD_DATA_STREAMS_ENABLED: 'true'
    - DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED: 'true'
```

{{% data_streams/monitoring-kafka-pipelines %}}

{{% data_streams/monitoring-sqs-pipelines %}}

{{% data_streams/monitoring-rabbitmq-pipelines %}}

{{% data_streams/monitoring-kinesis-pipelines %}}

{{% data_streams/monitoring-sns-to-sqs-pipelines %}}

### Instrumentation manuelle

Data Streams Monitoring propage le contexte via les en-têtes de messages. Si vous utilisez une technologie de file d'attente de messages qui n'est pas prise en charge par DSM, ou une technologie sans en-têtes (comme Kinesis), utilisez l'[instrumentation manuelle pour configurer DSM][6].

### Surveillance des connecteurs

#### Connecteurs Confluent Cloud

{{% data_streams/dsm-confluent-connectors %}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[10]: /fr/agent
[2]: /fr/tracing/trace_collection/dd_libraries/python
[3]: https://pypi.org/project/confluent-kafka/
[5]: https://pypi.org/project/kombu/
[6]: /fr/data_streams/manual_instrumentation/?tab=python