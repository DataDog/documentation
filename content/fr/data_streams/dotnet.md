---
kind: documentation
title: Configurer Data Streams Monitoring pour .NET
---

{{< site-region region="ap1" >}}
<div class="alert alert-info">La solution Data Streams Monitoring n'est pas prise en charge dans la région AP1.</a></div>
{{< /site-region >}}

### Prérequis

Pour implémenter la solution Data Streams Monitoring, vous devez avoir installé la dernière version de l'Agent Datadog et des bibliothèques .NET :
* [Agent Datadog v7.34.0 ou version ultérieure][1]
* Traceur .NET ([.NET Core][2], [.NET Framework][3])
  * Kafka et RabbitMQ: v2.28.0 ou version ultérieure
  * Amazon SQS : v2.48.0

### Installation

.NET se sert de l'instrumentation automatique afin d'injecter et d'extraire les métadonnées supplémentaires requises par Data Streams Monitoring pour mesurer les latences de bout en bout ainsi que la relation entre les files d'attente et les services. Pour activer Data Streams Monitoring, définissez la variable d'environnement `DD_DATA_STREAMS_ENABLED` sur `true` sur les services qui envoient des messages à Kafka ou RabbitMQ (ou qui consomment des messages à partir de ces plateformes).

Exemple :
```yaml
environment:
  - DD_DATA_STREAMS_ENABLED: "true"
```
### Bibliothèques compatibles
Data Streams Monitoring prend en charge la [bibliothèque confluent-kafka][4].

### Surveiller des pipelines SQS
La solution Data Streams Monitoring utilise un [attribut de message][5] pour suivre le parcours d'un message dans une file d'attente SQS. Amazon SQS ayant une limite maximale de 10 attributs de message autorisés par message, tous les messages transmis par les pipelines de données doivent avoir 9 attributs de message ou moins définis, ce qui permet à Data Streams Monitoring d'utiliser l'attribut restant.


[1]: /fr/agent
[2]: /fr/tracing/trace_collection/dd_libraries/dotnet-core
[3]: /fr/tracing/trace_collection/dd_libraries/dotnet-framework
[4]: https://pypi.org/project/confluent-kafka/
[5]: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-message-metadata.html