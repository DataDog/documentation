---
further_reading:
- link: /opentelemetry/setup/collector_exporter/
  tag: Documentation
  text: Configurer le Collector OpenTelemetry
title: Métriques Kafka
---
## Présentation {#overview}

{{< img src="/opentelemetry/collector_exporter/kafka_metrics.png" alt="Métriques Kafka OpenTelemetry dans le Dashboard Kafka" style="width:100%;" >}}

Le [récepteur de métriques Kafka][1] et le [JMX Scraper][2] collectent les métriques Kafka pour le [Dashboard Kafka][3] prêt à l'emploi, **Kafka, Zookeeper, and Kafka Consumer Overview**.

Les deux collectent des données différentes et la plupart des configurations utilisent les deux. Le récepteur de métriques Kafka lit l'état du cluster via l'API d'administration Kafka. Le JMX Scraper lit les beans JMX exposés par les brokers, les producteurs et les consommateurs.

## Récepteur de métriques Kafka {#kafka-metrics-receiver}

Définissez `KAFKA_BROKER_ADDRESS` sur une adresse de broker au format `host:port`. Pour lister plus d'un broker, séparez les adresses par des virgules.

{{< tabs >}}
{{% tab "Host" %}}

Ajoutez le récepteur à la configuration du Collector :

```yaml
receivers:
  kafkametrics:
    brokers: "${env:KAFKA_BROKER_ADDRESS}"
    protocol_version: 2.0.0
    scrapers:
      - brokers
      - topics
      - consumers
```

Ajoutez `kafkametrics` à la liste `receivers` du pipeline de métriques. Le Collector démarre uniquement les récepteurs utilisés par un pipeline. Par exemple, dans la configuration host recommandée :

```yaml
service:
  pipelines:
    metrics:
      receivers: [otlp, host_metrics, kafkametrics]
      processors: [resource_detection, cumulativetodelta]
      exporters: [otlp_http]
```

{{% /tab %}}

{{% tab "Kubernetes" %}}

Exécutez le récepteur de métriques Kafka dans un déploiement de Collector à réplique unique pour éviter les métriques en double. Le Collector peut exporter les métriques directement vers Datadog via OTLP HTTP ou les transférer vers un autre Collector.

Définissez le mode de déploiement dans `values.yaml` :

```yaml
mode: deployment
```

Ajoutez le récepteur à la configuration du Collector :

```yaml
receivers:
  kafkametrics:
    brokers: ${env:KAFKA_BROKER_ADDRESS}
    protocol_version: 2.0.0
    scrapers:
      - brokers
      - topics
      - consumers
```

Ajoutez `kafkametrics` à un pipeline de métriques dans la même configuration. Le Collector démarre uniquement les récepteurs utilisés par un pipeline. Pour exporter directement vers Datadog, configurez l'exportateur `otlp_http` comme indiqué dans la [configuration recommandée][101] :

```yaml
service:
  pipelines:
    metrics:
      receivers: [kafkametrics]
      exporters: [otlp_http]
```

[101]: /fr/opentelemetry/setup/collector_exporter/#otlp-http-exporter

{{% /tab %}}

{{< /tabs >}}

## JMX Scraper {#jmx-scraper}

Le JMX Scraper s'exécute en tant qu'application Java autonome et envoie les métriques au récepteur OTLP du Collector.

La [configuration recommandée du Collector][4] reçoit OTLP via gRPC sur le port 4317 et inclut le récepteur OTLP dans son pipeline de métriques ; vous n'avez donc pas besoin de modifier la configuration du récepteur.

Le JMX Scraper envoie des compteurs avec une temporalité cumulative. Gardez le processeur `cumulativetodelta` dans le pipeline de métriques recommandé, qui les convertit en temporalité delta requise par [l'ingestion de métriques OTLP Datadog][8].

### Configurez les brokers Kafka {#configure-kafka-brokers}

1. Ajoutez les options JVM suivantes à chaque broker Kafka pour démarrer un endpoint JMX non sécurisé adapté à l'évaluation :

   ```shell
   -Dcom.sun.management.jmxremote=true
   -Dcom.sun.management.jmxremote.port=9999
   -Dcom.sun.management.jmxremote.rmi.port=9999
   -Dcom.sun.management.jmxremote.local.only=false
   -Dcom.sun.management.jmxremote.authenticate=false
   -Dcom.sun.management.jmxremote.ssl=false
   -Djava.rmi.server.hostname=<BROKER_HOSTNAME_OR_IP>
   ```

   <div class="alert alert-warning">Ces options désactivent l'authentification JMX et TLS. Utilisez cette configuration uniquement pour l'évaluation. Pour la production, activez l'authentification et TLS et configurez le JMX Scraper avec les identifiants et les paramètres du magasin de confiance.</div>

   `jmxremote.authenticate` et `jmxremote.ssl` ont `true` comme valeur par défaut, donc définissez explicitement les deux propriétés pour cette configuration d'évaluation. Sans fichier de mot de passe, l'authentification entraîne l'échec du broker avec `Password file not found`. Lorsque `jmxremote.rmi.port` correspond à `jmxremote.port`, SSL provoque `Port already in use` car le registre RMI n'est pas protégé par TLS et ne peut pas partager le port.

   Pour activer l'authentification et TLS en production, ajoutez `com.sun.management.jmxremote.registry.ssl=true` afin que le registre et le connecteur puissent partager un port. Configurez le JMX Scraper avec les propriétés `otel.jmx.username`, `otel.jmx.password`, `otel.jmx.remote.registry.ssl`, `javax.net.ssl.trustStore` et `javax.net.ssl.trustStorePassword`.

2. Définissez `java.rmi.server.hostname` sur le nom d'hôte ou l'adresse IP que le JMX Scraper utilise pour se connecter. Le broker inclut cette valeur dans un stub RMI, et le JMX Scraper ouvre une seconde connexion vers cette adresse.

   - Utilisez une adresse de bouclage uniquement lorsque le JMX Scraper s'exécute sur le host ou le pod du broker lui-même. Plusieurs distributions Kafka et images de conteneurs, y compris Confluent Platform, utilisent l'adresse de bouclage par défaut.
   - N'utilisez pas `0.0.0.0`. Il s'agit d'une adresse de liaison et le JMX Scraper ne peut pas s'y connecter.
   - Dans Kubernetes, utilisez l'adresse IP du pod du broker ou un nom DNS.

   Dans les images de conteneur Kafka, `KAFKA_JMX_HOSTNAME` définit `java.rmi.server.hostname`. Définissez-la sur la même adresse.

   Une adresse inaccessible peut permettre à la connexion initiale de réussir, mais l'extraction échoue ensuite avec `Failed to retrieve RMIServer stub` ou `Connection refused to host: <UNREACHABLE_ADDRESS>`.

3. Définissez `jmxremote.rmi.port` sur le même port que `jmxremote.port`. Sans port RMI fixe, la seconde connexion utilise un port aléatoire qu'un pare-feu ou un mappage de port pourrait bloquer.

Pour extraire les données des producteurs et des consommateurs, ajoutez les mêmes options JVM à ces applications.

### Exécutez le JMX Scraper {#run-the-jmx-scraper}

Définissez `otel.jmx.target.source` sur `legacy` pour conserver les noms de métriques JVM attendus par les Dashboards et les monitors existants. Sans cela, le JMX Scraper utilise `auto` par défaut et tous les noms de métriques JVM changent.

{{< tabs >}}
{{% tab "Host" %}}

Installez un JRE sur le host qui exécute le JMX Scraper. Sur Debian ou Ubuntu, exécutez :

```shell
apt-get update && \
apt-get -y install default-jre-headless
```

Téléchargez le JAR du JMX Scraper depuis les [versions d'OpenTelemetry Java Contrib][201]. Définissez chaque variable d'adresse au format `host:port`.

Chaque processus de scraper extrait les données d'un seul endpoint JMX. Exécutez un processus pour chaque broker, producteur et consommateur, avec l'adresse de cette JVM :

```shell
# Kafka broker
java \
  -Dotel.jmx.service.url=service:jmx:rmi:///jndi/rmi://${KAFKA_BROKER_JMX_ADDRESS}/jmxrmi \
  -Dotel.jmx.target.system=kafka,jvm \
  -Dotel.jmx.target.source=legacy \
  -Dotel.metrics.exporter=otlp \
  -Dotel.exporter.otlp.endpoint=http://localhost:4317 \
  -jar /path/to/opentelemetry-jmx-scraper.jar

# Kafka producer
java \
  -Dotel.jmx.service.url=service:jmx:rmi:///jndi/rmi://${KAFKA_PRODUCER_JMX_ADDRESS}/jmxrmi \
  -Dotel.jmx.target.system=kafka-producer \
  -Dotel.jmx.target.source=legacy \
  -Dotel.metrics.exporter=otlp \
  -Dotel.exporter.otlp.endpoint=http://localhost:4317 \
  -jar /path/to/opentelemetry-jmx-scraper.jar

# Kafka consumer
java \
  -Dotel.jmx.service.url=service:jmx:rmi:///jndi/rmi://${KAFKA_CONSUMER_JMX_ADDRESS}/jmxrmi \
  -Dotel.jmx.target.system=kafka-consumer \
  -Dotel.jmx.target.source=legacy \
  -Dotel.metrics.exporter=otlp \
  -Dotel.exporter.otlp.endpoint=http://localhost:4317 \
  -jar /path/to/opentelemetry-jmx-scraper.jar
```

[201]: https://github.com/open-telemetry/opentelemetry-java-contrib/releases

{{% /tab %}}

{{% tab "Kubernetes" %}}

Utilisez le Dockerfile suivant pour construire une image avec un JRE et le JAR du JMX Scraper :

```Dockerfile
FROM alpine:latest AS prep

# JMX Scraper JAR
ARG JMX_SCRAPER_JAR_VERSION=1.60.0
ADD https://github.com/open-telemetry/opentelemetry-java-contrib/releases/download/v${JMX_SCRAPER_JAR_VERSION}/opentelemetry-jmx-scraper.jar /opt/opentelemetry-jmx-scraper.jar
ARG USER_UID=65532
RUN chown ${USER_UID} /opt/opentelemetry-jmx-scraper.jar

FROM gcr.io/distroless/java17-debian11:nonroot

COPY --from=prep /opt/opentelemetry-jmx-scraper.jar /opt/opentelemetry-jmx-scraper.jar

ENTRYPOINT ["java"]
CMD ["-Dotel.jmx.service.url=service:jmx:rmi:///jndi/rmi://kafka:9999/jmxrmi", \
"-Dotel.jmx.target.system=kafka,jvm", \
"-Dotel.jmx.target.source=legacy", \
"-Dotel.metrics.exporter=otlp", \
"-Dotel.exporter.otlp.endpoint=http://otelcol:4317", \
"-jar", \
"/opt/opentelemetry-jmx-scraper.jar"]
```

Remplacez `kafka:9999` par l'adresse JMX du broker et `otelcol:4317` par l'endpoint OTLP gRPC du Collector.

Pour extraire les données des producteurs ou des consommateurs, définissez `otel.jmx.target.system` sur `kafka-producer` ou `kafka-consumer` et pointez `otel.jmx.service.url` vers l'endpoint JMX de cette JVM.

Exécutez une seule instance par endpoint JMX. Plusieurs réplicas extrayant les données du même endpoint produisent des métriques en double.

{{% /tab %}}

{{< /tabs >}}

## Collecte de logs {#log-collection}

Pour collecter des logs avec l'OpenTelemetry Collector, consultez [Log Collection][5].

Pour inclure les logs Kafka dans le Dashboard Kafka prêt à l'emploi, utilisez un processeur d'attributs pour ajouter le tag `source:kafka` :

```yaml
processors:
  attributes:
    actions:
      - key: ddtags
        value: "source:kafka"
        action: insert
```

Pour ajouter cet attribut uniquement aux logs Kafka, utilisez le [filtrage include/exclude][6] dans le processeur d'attributs.

## Données collectées {#data-collected}

### Récepteur de métriques Kafka {#kafka-metrics-receiver-1}

{{< mapping-table resource="kafkametrics.csv">}}

### JMX Scraper {#jmx-scraper-1}

#### Courtier Kafka {#kafka-broker}

{{< mapping-table resource="kafka.csv">}}

#### Producteur Kafka {#kafka-producer}

{{< mapping-table resource="kafka-producer.csv">}}

#### Consommateur Kafka {#kafka-consumer}

{{< mapping-table resource="kafka-consumer.csv">}}

**Note** : Datadog remplace les tirets (`-`) par des underscores (`_`) dans les noms de métriques. Par exemple, `kafka.producer.request-rate` devient `kafka.producer.request_rate`.

Pour le mappage complet entre les noms de métriques OpenTelemetry et Datadog, consultez [OpenTelemetry Metrics Mapping][7].

## Exemple de sortie de journalisation {#example-logging-output}

```
Metric #0
Descriptor:
     -> Name: kafka.message.count
     -> Description: The number of messages received by the broker
     -> Unit: {messages}
     -> DataType: Sum
     -> IsMonotonic: true
     -> AggregationTemporality: Cumulative
NumberDataPoints #0
StartTimestamp: 2024-01-22 15:50:24.212 +0000 UTC
Timestamp: 2024-01-22 15:51:24.218 +0000 UTC
Value: 25
```

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/kafkametricsreceiver
[2]: https://github.com/open-telemetry/opentelemetry-java-contrib/tree/main/jmx-scraper
[3]: https://app.datadoghq.com/dash/integration/50/kafka-zookeeper-and-kafka-consumer-overview
[4]: /fr/opentelemetry/setup/collector_exporter/
[5]: /fr/opentelemetry/config/log_collection
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/attributesprocessor/README.md#includeexclude-filtering
[7]: /fr/opentelemetry/mapping/metrics_mapping/
[8]: /fr/opentelemetry/setup/otlp_ingest/metrics/#ensure-only-delta-metrics-are-sent