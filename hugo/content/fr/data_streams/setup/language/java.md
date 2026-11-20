---
aliases:
- /fr/data_streams/java
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
title: Configurer Data Streams Monitoring pour Java
---

### Prérequis

* [Agent Datadog v7.34.0 ou version ultérieure][10]

### Bibliothèques compatibles

| Technologies     | Bibliothèque                                                                                                                       | Version minimale du traceur                                                          | Version recommandée du traceur                                                          |
|----------------|-------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------|-------------------------------------------------------------------------------------|
| Kafka          | [kafka-clients](https://mvnrepository.com/artifact/org.apache.kafka/kafka-clients) (la génération de lag n'est pas prise en charge pour v3.7*) | {{< dsm-tracer-version lang="java" lib="kafka-clients" type="minimal" >}}       | {{< dsm-tracer-version lang="java" lib="kafka-clients" type="recommended" >}}       |
| RabbitMQ       | [amqp-client](https://mvnrepository.com/artifact/com.rabbitmq/amqp-client)                                                    | {{< dsm-tracer-version lang="java" lib="amqp-client" type="minimal" >}}         | {{< dsm-tracer-version lang="java" lib="amqp-client" type="recommended" >}}         |
| Amazon SQS     | [aws-java-sdk-sqs (v1)](https://mvnrepository.com/artifact/com.amazonaws/aws-java-sdk-sqs)                                    | {{< dsm-tracer-version lang="java" lib="aws-java-sdk-sqs-v1" type="minimal" >}} | {{< dsm-tracer-version lang="java" lib="aws-java-sdk-sqs-v1" type="recommended" >}} |
| Amazon SQS     | [sqs (v2)](https://mvnrepository.com/artifact/software.amazon.awssdk/sqs)                                                     | {{< dsm-tracer-version lang="java" lib="sqs-v2" type="minimal" >}}              | {{< dsm-tracer-version lang="java" lib="sqs-v2" type="recommended" >}}              |
| Amazon Kinesis | [Kinesis (v1)](https://mvnrepository.com/artifact/com.amazonaws/aws-java-sdk-kinesis)                                         | {{< dsm-tracer-version lang="java" lib="kinesis-v1" type="minimal" >}}          | {{< dsm-tracer-version lang="java" lib="kinesis-v1" type="recommended" >}}          |
| Amazon Kinesis | [Kinesis (v2)](https://mvnrepository.com/artifact/software.amazon.awssdk/kinesis)                                             | {{< dsm-tracer-version lang="java" lib="kinesis-v2" type="minimal" >}}          | {{< dsm-tracer-version lang="java" lib="kinesis-v2" type="recommended" >}}          |
| Amazon SNS     | [SNS (v1)](https://mvnrepository.com/artifact/com.amazonaws/aws-java-sdk-sns)                                                 | {{< dsm-tracer-version lang="java" lib="sns-v1" type="minimal" >}}              | {{< dsm-tracer-version lang="java" lib="sns-v1" type="recommended" >}}              |
| Amazon SNS     | [SNS (v2)](https://mvnrepository.com/artifact/software.amazon.awssdk/sns)                                                     | {{< dsm-tracer-version lang="java" lib="sns-v2" type="minimal" >}}              | {{< dsm-tracer-version lang="java" lib="sns-v2" type="recommended" >}}              |
| Google PubSub  | [Google Cloud Pub/Sub](https://mvnrepository.com/artifact/com.google.cloud/google-cloud-pubsub)                               | {{< dsm-tracer-version lang="java" lib="google-pubsub" type="minimal" >}}       | {{< dsm-tracer-version lang="java" lib="google-pubsub" type="recommended" >}}       |
| IBM MQ         | [Classes IBM MQ pour Java et JMS](https://mvnrepository.com/artifact/com.ibm.mq/com.ibm.mq.jakarta.client)                    | {{< dsm-tracer-version lang="java" lib="ibmmqjmsclient" type="minimal" >}}      | {{< dsm-tracer-version lang="java" lib="ibmmqjmsclient" type="recommended" >}}      |

*Spring Boot 3.3.x et spring-kafka 3.2.x utilisent kafka-clients 3.7.x, qui ne prend pas en charge la génération de lag. Pour résoudre ce problème, <a href="https://docs.spring.io/spring-kafka/reference/appendix/override-boot-dependencies.html">mettez à jour votre version de kafka-clients</a> vers 3.8.0 ou une version ultérieure.</span>

### Installation

Pour activer Data Streams Monitoring, définissez les variables d'environnement suivantes sur `true` sur les services qui envoient ou consomment des messages :

- `DD_DATA_STREAMS_ENABLED`
- `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED`

{{< tabs >}}
{{% tab "Environment variables" %}}

```yaml
environment:
  - DD_DATA_STREAMS_ENABLED: "true"
  - DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED: "true"
```

{{% /tab %}}
{{% tab "Command line" %}}

Exécutez la commande suivante au démarrage de votre application Java :

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.data.streams.enabled=true -Ddd.trace.remove.integration-service-names.enabled=true -jar path/to/your/app.jar
```

{{% /tab %}}
{{< /tabs >}}

### Installation en un clic
Pour configurer Data Streams Monitoring à partir de l'interface utilisateur de Datadog sans avoir à redémarrer votre service, utilisez [la configuration à lʼexécution][4]. Accédez à la page du service APM et `Enable DSM`.

{{< img src="data_streams/enable_dsm_service_catalog.png" alt="Activer la solution Data Streams Monitoring depuis la section Dépendances de la page du service APM" >}}

##### Configuration

Utilisez le traceur Java de Datadog, [`dd-trace-java`][6], pour collecter des informations auprès de vos workers Kafka Connect.

1. [Ajoutez le fichier `dd-java-agent.jar`][7] à vos workers Kafka Connect. Assurez-vous d'utiliser `dd-trace-java` [v1.44+][8].
1. Modifiez vos options Java pour inclure le traceur Java Datadog sur vos nœuds worker. Par exemple, sur Strimzi, modifiez `STRIMZI_JAVA_OPTS` pour ajouter `-javaagent:/path/to/dd-java-agent.jar`.

{{% data_streams/monitoring-sqs-pipelines %}}

{{% data_streams/monitoring-rabbitmq-pipelines %}}

### Surveillance des pipelines SNS vers SQS
Pour surveiller un pipeline de données où Amazon SNS communique directement avec Amazon SQS, vous devez effectuer les étapes de configuration supplémentaires suivantes :

{{< tabs >}}
{{% tab "SQS v1" %}}
- Définissez la variable d'environnement `DD_TRACE_SQS_BODY_PROPAGATION_ENABLED` sur `true`.

  Par exemple :
   ```yaml
   environment:
     - DD_DATA_STREAMS_ENABLED: "true"
     - DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED: "true"
     - DD_TRACE_SQS_BODY_PROPAGATION_ENABLED: "true"
   ```
- Assurez-vous d'utiliser le [traceur Java v1.44.0+][11].

[11]: https://github.com/DataDog/dd-trace-java/releases
{{% /tab %}}
{{% tab "SQS v2" %}}
Activez la [diffusion de messages bruts Amazon SNS][1].

[1]: https://docs.aws.amazon.com/sns/latest/dg/sns-large-payload-raw-message-delivery.html
{{% /tab %}}
{{< /tabs >}}

{{% data_streams/monitoring-kinesis-pipelines %}}

### Instrumentation manuelle
Data Streams Monitoring propage le contexte via les en-têtes de messages. Si vous utilisez une technologie de file d'attente non prise en charge par DSM, une technologie sans en-têtes (comme Kinesis) ou des Lambdas, utilisez l'[instrumentation manuelle pour configurer DSM][5].

### Surveillance des connecteurs

#### Connecteurs Confluent Cloud
{{% data_streams/dsm-confluent-connectors %}}

#### Connecteurs Kafka auto-hébergés

_Prérequis_ : [`dd-trace-java` v1.44.0+][8]

<div class="alert alert-info">Cette fonctionnalité est en version Preview.</div>

Data Streams Monitoring peut collecter des informations auprès de vos connecteurs Kafka auto-hébergés. Dans Datadog, ces connecteurs sont affichés comme des services connectés aux topics Kafka. Datadog collecte le débit vers et depuis tous les topics Kafka. Datadog ne collecte pas le statut des connecteurs ni les sinks et sources des connecteurs Kafka auto-hébergés.

##### Configuration

1. Assurez-vous que l'Agent Datadog est en cours d'exécution sur vos workers Kafka Connect.
2. Assurez-vous que [`dd-trace-java`][6] est installé sur vos workers Kafka Connect.
3. Modifiez vos options Java pour inclure `dd-trace-java` sur vos nœuds worker Kafka Connect. Par exemple, sur Strimzi, modifiez `STRIMZI_JAVA_OPTS` pour ajouter `-javaagent:/path/to/dd-java-agent.jar`.


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[10]: /fr/agent
[2]: /fr/tracing/trace_collection/dd_libraries/java/
[4]: /fr/remote_configuration
[5]: /fr/data_streams/manual_instrumentation/?tab=java
[6]: https://github.com/DataDog/dd-trace-java
[7]: /fr/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/?tab=wget
[8]: https://github.com/DataDog/dd-trace-java/releases/tag/v1.44.0