---
aliases:
- /fr/data_streams/nodejs
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
title: Configurer Data Streams Monitoring pour Node.js
---

### Prérequis

-   [Agent Datadog v7.34.0 ou version ultérieure][10]

### Bibliothèques compatibles

| Technologies      | Bibliothèque                                                                                  | Version minimale du traceur                                                                   | Version recommandée du traceur                                                                   |
| --------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Kafka           | [kafkajs](https://www.npmjs.com/package/kafkajs)                                         | {{< dsm-tracer-version lang="nodejs" lib="kafkajs" type="minimal" >}}                    | {{< dsm-tracer-version lang="nodejs" lib="kafkajs" type="recommended" >}}                    |
| Confluent Kafka | [confluent-kafka-javascript](https://github.com/confluentinc/confluent-kafka-javascript) | {{< dsm-tracer-version lang="nodejs" lib="confluent-kafka-javascript" type="minimal" >}} | {{< dsm-tracer-version lang="nodejs" lib="confluent-kafka-javascript" type="recommended" >}} |
| RabbitMQ        | [amqplib](https://www.npmjs.com/package/amqplib)                                         | {{< dsm-tracer-version lang="nodejs" lib="amqplib" type="minimal" >}}                    | {{< dsm-tracer-version lang="nodejs" lib="amqplib" type="recommended" >}}                    |
| RabbitMQ        | [rhea] (https://www.npmjs.com/package/rhea)                                               | {{< dsm-tracer-version lang="nodejs" lib="rhea" type="minimal" >}}                       | {{< dsm-tracer-version lang="nodejs" lib="rhea" type="recommended" >}}                       |
| Amazon SQS      | [client-sqs](https://www.npmjs.com/package/@aws-sdk/client-sqs)                          | {{< dsm-tracer-version lang="nodejs" lib="client-sqs" type="minimal" >}}                 | {{< dsm-tracer-version lang="nodejs" lib="client-sqs" type="recommended" >}}                 |
| Amazon Kinesis  | [client-kinesis](https://www.npmjs.com/package/@aws-sdk/client-kinesis)                  | {{< dsm-tracer-version lang="nodejs" lib="client-kinesis" type="minimal" >}}             | {{< dsm-tracer-version lang="nodejs" lib="client-kinesis" type="recommended" >}}             |
| Amazon SNS      | [client-sns](https://www.npmjs.com/package/@aws-sdk/client-sns)                          | {{< dsm-tracer-version lang="nodejs" lib="client-sns" type="minimal" >}}                 | {{< dsm-tracer-version lang="nodejs" lib="client-sns" type="recommended" >}}                 |
| Google Pub/Sub  | [google-cloud/pubsub](https://www.npmjs.com/package/@google-cloud/pubsub)                | {{< dsm-tracer-version lang="nodejs" lib="google-cloud-pubsub" type="minimal" >}}        | {{< dsm-tracer-version lang="nodejs" lib="google-cloud-pubsub" type="recommended" >}}        |
| BullMQ          | [bullmq](https://www.npmjs.com/package/bullmq)                                           | {{< dsm-tracer-version lang="nodejs" lib="bullmq" type="minimal" >}}                     | {{< dsm-tracer-version lang="nodejs" lib="bullmq" type="recommended" >}}                     |

#### Prise en charge d'Amazon SQS avec AWS Lambda

Pour surveiller les flux de données pour les fonctions Lambda Node.js appelant Amazon SQS, SNS ou Kinesis, utilisez le traceur Lambda Node.js de Datadog, [`datadog-lambda-js` v.12.128.0][8] ou version ultérieure.

### Installation

Node.js utilise l'auto-instrumentation pour injecter et extraire les métadonnées supplémentaires requises par Data Streams Monitoring pour mesurer les latences de bout en bout et les relations entre les files d'attente et les services. Pour activer Data Streams Monitoring, définissez la variable d'environnement `DD_DATA_STREAMS_ENABLED` sur `true` sur les services envoyant des messages à votre technologie de streaming (ou en consommant).

Exemple :

```yaml
environment:
    - DD_DATA_STREAMS_ENABLED: 'true'
    - DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED: 'true'
```

{{% data_streams/monitoring-kafka-pipelines %}}

{{% data_streams/monitoring-sqs-pipelines %}}

{{% data_streams/monitoring-rabbitmq-pipelines %}}

{{% data_streams/monitoring-sns-to-sqs-pipelines %}}

{{% data_streams/monitoring-kinesis-pipelines %}}

### Instrumentation manuelle

Data Streams Monitoring propage le contexte via les en-têtes de messages. Si vous utilisez une technologie de file d'attente non prise en charge par DSM, une technologie sans en-têtes (comme Kinesis) ou des Lambdas, utilisez l'[instrumentation manuelle pour configurer DSM][7].

### Surveillance des connecteurs

#### Connecteurs Confluent Cloud

{{% data_streams/dsm-confluent-connectors %}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[10]: /fr/agent
[2]: /fr/tracing/trace_collection/dd_libraries/nodejs
[3]: https://pypi.org/project/confluent-kafka/
[5]: https://www.npmjs.com/package/amqplib
[6]: https://www.npmjs.com/package/rhea
[7]: /fr/data_streams/manual_instrumentation/?tab=nodejs
[8]: https://github.com/DataDog/datadog-lambda-js/releases/tag/v12.128.0