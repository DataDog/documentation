---
further_reading:
- link: /integrations/kafka/
  tag: Documentation
  text: Intégration Kafka
- link: /tracing/service_catalog/
  tag: Documentation
  text: Service Catalog

title: Configurer Data Streams Monitoring pour Java
---

{{< site-region region="ap1" >}}
<div class="alert alert-info">La solution Data Streams Monitoring n'est pas prise en charge dans la région AP1.</a></div>
{{< /site-region >}}

### Prérequis

Pour implémenter la solution Data Streams Monitoring, vous devez avoir installé la dernière version de l'Agent Datadog et des bibliothèques Java :
* [Agent Datadog v7.34.0 ou version ultérieure][1]
* [APM activé avec l'Agent Java v1.9.0 ou une version ultérieure][2]

### Installation

Java se sert de l'instrumentation automatique afin d'injecter et d'extraire les métadonnées supplémentaires requises par Data Streams Monitoring pour mesurer les latences de bout en bout ainsi que la relation entre les files d'attente et les services. Pour activer Data Streams Monitoring, définissez la variable d'environnement `DD_DATA_STREAMS_ENABLED` sur `true` sur les services qui envoient des messages à Kafka ou RabbitMQ (ou qui consomment des messages à partir de ces plateformes).

Par exemple :
```yaml
environment:
  - DD_DATA_STREAMS_ENABLED: "true"
```

Vous pouvez également définir la propriété système `-Ddd.data.streams.enabled=true` en exécutant la ligne suivante au lancement de votre application Java :

```bash
java -javaagent:/chemin/vers/dd-java-agent.jar -Ddd.data.streams.enabled=true -jar chemin/vers/votre/application.jar
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent
[2]: /fr/tracing/trace_collection/dd_libraries/java/
