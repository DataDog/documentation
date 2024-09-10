---
further_reading:
- link: /integrations/kafka/
  tag: Documentation
  text: Intégration Kafka
- link: /tracing/service_catalog/
  tag: Documentation
  text: Catalogue des services
title: Configurer Data Streams Monitoring pour Java
---

{{< site-region region="ap1" >}}
<div class="alert alert-info">La solution Data Streams Monitoring n'est pas prise en charge dans la région AP1.</a></div>
{{< /site-region >}}

### Prérequis

Pour implémenter la solution Data Streams Monitoring, vous devez avoir installé la dernière version de l'Agent Datadog et des bibliothèques Java :
* [Agent Datadog v7.34.0 ou version ultérieure][1]
* [APM activé avec l'Agent Java][2]
  * Kafka et RabbitMQ : v1.9.0 ou version ultérieure
  * Amazon SQS : v1.27.0 ou version ultérieure

### Installation

Java se sert de l'instrumentation automatique afin d'injecter et d'extraire les métadonnées supplémentaires requises par Data Streams Monitoring pour mesurer les latences de bout en bout ainsi que la relation entre les files d'attente et les services. Pour activer Data Streams Monitoring, définissez la variable d'environnement `DD_DATA_STREAMS_ENABLED` sur `true` sur les services qui envoient des messages à Kafka ou RabbitMQ (ou qui consomment des messages à partir de ces plateformes).

Exemple :
```yaml
environment:
  - DD_DATA_STREAMS_ENABLED: "true"
```

Vous pouvez également définir la propriété système `-Ddd.data.streams.enabled=true` en exécutant la ligne suivante au lancement de votre application Java :

```bash
java -javaagent:/chemin/vers/dd-java-agent.jar -Ddd.data.streams.enabled=true -jar chemin/vers/votre/application.jar
```

### Installation en un clic
Pour configurer Data Streams Monitoring à partir de l'interface utilisateur de Datadog sans avoir à redémarrer votre service, utilisez [la configuration à lʼexécution][5]. Accédez à la page du service APM et `Enable DSM`.

{{< img src="data_streams/enable_dsm_service_catalog.png" alt="Activer la solution Data Streams Monitoring depuis la section Dépendances de la page du service APM" >}}

### Bibliothèques compatibles
Data Streams Monitoring prend en charge la [bibliothèque confluent-kafka][3].

### Surveiller des pipelines SQS
La solution Data Streams Monitoring utilise un [attribut de message][4] pour suivre le parcours d'un message dans une file d'attente SQS. Amazon SQS ayant une limite maximale de 10 attributs de message autorisés par message, tous les messages transmis par les pipelines de données doivent avoir 9 attributs de message ou moins définis, ce qui permet à Data Streams Monitoring d'utiliser l'attribut restant.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent
[2]: /fr/tracing/trace_collection/dd_libraries/java/
[3]: https://pypi.org/project/confluent-kafka/
[4]: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-message-metadata.html
[5]: /fr/agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration