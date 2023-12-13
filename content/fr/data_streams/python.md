---
further_reading:
- link: /integrations/kafka/
  tag: Documentation
  text: Intégration Kafka
- link: /tracing/service_catalog/
  tag: Documentation
  text: Catalogue des services
kind: documentation
title: Configurer Data Streams Monitoring pour Python
---

{{< site-region region="ap1" >}}
<div class="alert alert-info">La solution Data Streams Monitoring n'est pas prise en charge dans la région AP1.</a></div>
{{< /site-region >}}

### Prérequis

Pour implémenter la solution Data Streams Monitoring, vous devez avoir installé la dernière version de l'Agent Datadog et des bibliothèques Python :
* [Agent Datadog v7.34.0 ou version ultérieure][1]
* [Traceur Python 1.16.0 ou version ultérieure][2] (version 1.20.0 pour Amazon SQS et Kinesis)

### Installation

Python se sert de l'instrumentation automatique afin d'injecter et d'extraire les métadonnées supplémentaires requises par Data Streams Monitoring pour mesurer les latences de bout en bout ainsi que la relation entre les files d'attente et les services. Pour activer Data Streams Monitoring, définissez la variable d'environnement `DD_DATA_STREAMS_ENABLED` sur `true` sur les services qui envoient des messages à Kafka (ou qui consomment des messages à partir de cette plateforme).

Par exemple :
```yaml
environment:
  - DD_DATA_STREAMS_ENABLED: "true"
```

### Bibliothèques prises en charge
Data Streams Monitoring prend en charge la [bibliothèque confluent-kafka][3].

### Surveiller les pipelines SQS
Data Streams Monitoring utilise un [attribut de message][4] pour suivre le chemin d'un message via une file d'attente SQS. Puisque Amazon SQS n'autorise que 10 attributs par message, tous les messages passant par les pipelines de données doivent avoir au maximum neuf attributs de message définis, de manière à ce qu'il reste un attribut pour Data Streams Monitoring.

### Surveiller les pipelines Kinesis
Kinesis n'inclut aucun attribut de message permettant de propager le contexte et de suivre le chemin complet d'un message via un flux Kinesis. Par conséquent, les métriques de latence de bout en bout de Data Streams Monitoring sont calculées de manière approximative en additionnant la latence sur les segments du chemin d'un message, et ce depuis le service émetteur, via un stream Kinesis et vers le service consommateur. Les métriques de débit sont basées sur les segments envoyés au service consommateur depuis le service émetteur via un flux Kinesis. La topologie complète des flux de données peut tout de même être visualisée par le biais de services d'instrumentation.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent
[2]: /fr/tracing/trace_collection/dd_libraries/python
[3]: https://pypi.org/project/confluent-kafka/
[4]: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-message-metadata.html