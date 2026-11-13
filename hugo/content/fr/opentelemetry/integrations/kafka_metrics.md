---
further_reading:
- link: /opentelemetry/collector_exporter/
  tag: Documentation
  text: Configurer le Collector OpenTelemetry
title: Métriques Kafka
---
## Présentation {#overview}

{{< img src="/opentelemetry/collector_exporter/kafka_metrics.png" alt="Métriques Kafka OpenTelemetry dans le dashboard Kafka prêt à l'emploi" style="width:100%;" >}}

Le [récepteur de métriques Kafka][1], le [récepteur JMX][2]/ [collecteur de métriques JMX][3] permettent de collecter les métriques Kafka et d'accéder au [dashboard Kafka][7] prêt à l'emploi, « Vue d'ensemble de Kafka, Zookeeper et du consommateur Kafka ». 

**Remarque** : le [récepteur JMX][2] et le [collecteur de métriques JMX][3] doivent être considérés comme des remplacements. Ils collectent le même ensemble de métriques (le [récepteur JMX][2] lance le [collecteur de métriques JMX][3]).


## Récepteur de métriques Kafka {#kafka-metrics-receiver}

{{< tabs >}}
{{% tab "Host" %}}

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

{{% /tab %}}

{{% tab "Kubernetes" %}}

Utilisez le récepteur de métriques Kafka dans un collecteur fonctionnant en mode `deployment` avec une seule réplique. Cela empêche la même métrique d'être collectée plusieurs fois. Le collecteur peut exporter les métriques directement vers Datadog via OTLP HTTP ou les transférer vers une autre instance de collecteur.

Ajoutez les lignes suivantes à `values.yaml` :

```yaml
mode: deployment
```

Ajoutez ce qui suit dans la configuration du collecteur :

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

{{% /tab %}}

{{< /tabs >}}

## Récepteur JMX {#jmx-receiver}

{{< tabs >}}
{{% tab "Host" %}}

Le récepteur JMX a les exigences suivantes :
- Le JRE est disponible sur l'hôte où vous exécutez le collecteur.
- Le fichier JAR du collecteur de métriques JMX est disponible sur l'hôte où vous exécutez le collecteur. Vous pouvez télécharger la version la plus récente du fichier JAR du collecteur de métriques JMX depuis la [page des versions opentelemetry-java-contrib][1].

Ajoutez ce qui suit dans la configuration du collecteur :

```yaml
receivers:
  jmx:
    jar_path: /path/to/opentelemetry-jmx-metrics.jar
    endpoint: ${env:KAFKA_BROKER_JMX_ADDRESS}
    target_system: kafka,jvm
  jmx/consumer:
    jar_path: /path/to/opentelemetry-jmx-metrics.jar
    endpoint: ${env:KAFKA_CONSUMER_JMX_ADDRESS}
    target_system: kafka-consumer
  jmx/producer:
    jar_path: /path/to/opentelemetry-jmx-metrics.jar
    endpoint: ${env:KAFKA_PRODUCER_JMX_ADDRESS}
    target_system: kafka-producer
```

[1]: https://github.com/open-telemetry/opentelemetry-java-contrib/releases

{{% /tab %}}

{{% tab "Kubernetes" %}}

Utilisez le récepteur JMX dans un collecteur fonctionnant en mode `deployment` avec une seule réplique. Cela empêche la même métrique d'être collectée plusieurs fois. Le collecteur peut exporter les métriques directement vers Datadog via OTLP HTTP ou les transférer vers une autre instance de collecteur.

Le récepteur JMX a les exigences suivantes :
- Le JRE est disponible sur l'hôte sur lequel vous exécutez le collecteur.
- Le fichier JAR du collecteur de métriques JMX est disponible sur l'hôte sur lequel vous exécutez le collecteur. Vous pouvez télécharger la version la plus récente du fichier JAR du collecteur de métriques JMX [ici][1].

Comme l'image par défaut du collecteur OTel ne répond pas aux exigences ci-dessus, une image personnalisée doit être créée. Consultez le Dockerfile ci-dessous pour obtenir un exemple d'image contenant le binaire du collecteur, le JRE et le fichier JAR du collecteur de métriques JMX.

Dockerfile :

```Dockerfile
FROM alpine:latest as prep

# OpenTelemetry Collector Binary
ARG OTEL_VERSION=0.92.0
ARG TARGETARCH=linux_amd64
ADD "https://github.com/open-telemetry/opentelemetry-collector-releases/releases/download/v${OTEL_VERSION}/otelcol-contrib_${OTEL_VERSION}_${TARGETARCH}.tar.gz" /otelcontribcol
RUN tar -zxvf /otelcontribcol

# JMX Metrics Gatherer Jar
ARG JMX_GATHERER_JAR_VERSION=1.27.0
ADD https://github.com/open-telemetry/opentelemetry-java-contrib/releases/download/v${JMX_GATHERER_JAR_VERSION}/opentelemetry-jmx-metrics.jar /opt/opentelemetry-jmx-metrics.jar
# nonroot user id (https://groups.google.com/g/distroless-users/c/-DpzCr7xRDY/m/eQqJmJroCgAJ)
ARG USER_UID=65532
RUN chown ${USER_UID} /opt/opentelemetry-jmx-metrics.jar


FROM gcr.io/distroless/java17-debian11:nonroot

COPY --from=prep /opt/opentelemetry-jmx-metrics.jar /opt/opentelemetry-jmx-metrics.jar
COPY --from=prep /otelcol-contrib /otelcol-contrib

EXPOSE 4317 55680 55679
ENTRYPOINT ["/otelcol-contrib"]
CMD ["--config", "/etc/otelcol-contrib/config.yaml"]
```

Ajoutez les lignes suivantes à `values.yaml` :

```yaml
mode: deployment
```

Ajoutez ce qui suit dans la configuration du collecteur :

```yaml
receivers:
  jmx:
    jar_path: /path/to/opentelemetry-jmx-metrics.jar
    endpoint: ${env:KAFKA_BROKER_JMX_ADDRESS}
    target_system: kafka,jvm
  jmx/consumer:
    jar_path: /path/to/opentelemetry-jmx-metrics.jar
    endpoint: ${env:KAFKA_CONSUMER_JMX_ADDRESS}
    target_system: kafka-consumer
  jmx/producer:
    jar_path: /path/to/opentelemetry-jmx-metrics.jar
    endpoint: ${env:KAFKA_PRODUCER_JMX_ADDRESS}
    target_system: kafka-producer
```

[1]: https://github.com/open-telemetry/opentelemetry-java-contrib/releases


{{% /tab %}}

{{< /tabs >}}


## Collecteur de métriques JMX {#jmx-metrics-gatherer}

{{< tabs >}}
{{% tab "Host" %}}

Le collecteur de métriques JMX est conçu pour être exécuté en tant qu'uber jar et configuré avec des propriétés à partir de la ligne de commande. 

Veuillez vous assurer que le JRE est disponible sur l'hôte sur lequel vous exécutez le collecteur. Si ce n'est pas le cas, veuillez vous assurer de le télécharger, par exemple.

```
apt-get update && \
apt-get -y install default-jre-headless
```

Une fois cela fait, téléchargez la version la plus récente du JAR du collecteur de métriques JMX [ici][1] et exécutez :

```
// Kafka Broker
java -jar -Dotel.jmx.service.url=service:jmx:rmi:///jndi/rmi://{KAFKA_BROKER_JMX_ADDRESS}/jmxrmi \ -Dotel.jmx.target.system=kafka,jvm \
-Dotel.metrics.exporter=otlp \
-Dotel.exporter.otlp.endpoint=http://localhost:4317 \
-jar /path/to/opentelemetry-jmx-metrics.jar

// Kafka Producer
java -jar -Dotel.jmx.service.url=service:jmx:rmi:///jndi/rmi://{KAFKA_PRODUCER_JMX_ADDRESS}/jmxrmi \ -Dotel.jmx.target.system=kafka-producer \
-Dotel.metrics.exporter=otlp \
-Dotel.exporter.otlp.endpoint=http://localhost:4317 \
-jar /path/to/opentelemetry-jmx-metrics.jar

// Kafka Consumer
java -jar -Dotel.jmx.service.url=service:jmx:rmi:///jndi/rmi://{KAFKA_CONSUMER_JMX_ADDRESS}/jmxrmi \ -Dotel.jmx.target.system=kafka-consumer \
-Dotel.metrics.exporter=otlp \
-Dotel.exporter.otlp.endpoint=http://localhost:4317 \
-jar /path/to/opentelemetry-jmx-metrics.jar
```

[1]: https://github.com/open-telemetry/opentelemetry-java-contrib/releases

{{% /tab %}}

{{% tab "Kubernetes" %}}

Le collecteur de métriques JMX est conçu pour être exécuté en tant qu'uber jar et configuré avec des propriétés à partir de la ligne de commande. 

Afin de déployer ceci dans Kubernetes, vous devez créer une image contenant le JRE et le fichier JAR du collecteur de métriques JMX. Veuillez consulter le Dockerfile ci-dessous pour obtenir un exemple d'image contenant le JRE et le fichier JAR du collecteur de métriques JMX.

Dockerfile :

```Dockerfile
FROM alpine:latest as prep

# JMX Metrics Gatherer Jar
ARG JMX_GATHERER_JAR_VERSION=1.27.0
ADD https://github.com/open-telemetry/opentelemetry-java-contrib/releases/download/v${JMX_GATHERER_JAR_VERSION}/opentelemetry-jmx-metrics.jar /opt/opentelemetry-jmx-metrics.jar
# nonroot user id (https://groups.google.com/g/distroless-users/c/-DpzCr7xRDY/m/eQqJmJroCgAJ)
ARG USER_UID=65532
RUN chown ${USER_UID} /opt/opentelemetry-jmx-metrics.jar

FROM gcr.io/distroless/java17-debian11:nonroot

COPY --from=prep /opt/opentelemetry-jmx-metrics.jar /opt/opentelemetry-jmx-metrics.jar

EXPOSE 4317 55680 55679
ENTRYPOINT ["java"]
CMD ["-Dotel.jmx.service.url=service:jmx:rmi:///jndi/rmi://kafka:1099/jmxrmi", \
"-Dotel.jmx.target.system=kafka,jvm", \
"-Dotel.metrics.exporter=otlp", \
"-Dotel.exporter.otlp.endpoint=http://otelcol:4317", \
"-jar", \
"/opt/opentelemetry-jmx-metrics.jar"]
```
{{% /tab %}}

{{< /tabs >}}

## Collecte de logs {#log-collection}

Consultez [Log Collection][4] pour obtenir des instructions sur la collecte de logs à l'aide du collecteur OpenTelemetry.

Pour apparaître dans le dashboard Kafka prêt à l'emploi, les logs Kafka doivent être marqués avec `source:kafka`. Pour ce faire, utilisez un processeur d'attributs :

```yaml
processors:
  attributes:
    actions:
      - key: ddtags
        value: "source:kafka"
        action: insert
```

Afin de vous assurer que cet attribut n'est ajouté qu'à vos logs Kafka, utilisez le [filtrage include/exclude][8] du processeur d'attributs.

## Données collectées {#data-collected}

### Récepteur de métriques Kafka {#kafka-metrics-receiver-1}

{{< mapping-table resource="kafkametrics.csv">}}

### Récepteur JMX / Collecteur de métriques JMX {#jmx-receiver-jmx-metrics-gatherer}

#### Courtier Kafka {#kafka-broker}

{{< mapping-table resource="kafka.csv">}}

#### Producteur Kafka {#kafka-producer}

{{< mapping-table resource="kafka-producer.csv">}}

#### Consommateur Kafka {#kafka-consumer}

{{< mapping-table resource="kafka-consumer.csv">}}

**Remarque :** Dans Datadog, `-` est traduit par `_`. Par exemple, `kafka.producer.request-rate` devient `kafka.producer.request_rate`.

Pour le mappage complet entre les noms de métriques OpenTelemetry et Datadog, consultez [OpenTelemetry Metrics Mapping][9].

## Exemple de sortie de journalisation {#example-logging-output}

```
Resource SchemaURL: https://opentelemetry.io/schemas/1.20.0
Resource attributes:
     -> service.name: Str(unknown_service:java)
     -> telemetry.sdk.language: Str(java)
     -> telemetry.sdk.name: Str(opentelemetry)
     -> telemetry.sdk.version: Str(1.27.0)
ScopeMetrics #0
ScopeMetrics SchemaURL: 
InstrumentationScope io.opentelemetry.contrib.jmxmetrics 1.27.0-alpha
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

## Exemple d'application {#example-app}

Veuillez consulter l'[exemple d'application][6] suivant qui démontre les configurations abordées dans cette documentation. Cet exemple d'application est composé d'un producteur, d'un consommateur, d'un courtier et d'une instance Zookeeper. Il démontre l'utilisation du récepteur de métriques Kafka, du récepteur JMX et/ou du collecteur de métriques JMX.


[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/kafkametricsreceiver
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/jmxreceiver
[3]: https://github.com/open-telemetry/opentelemetry-java-contrib/blob/main/jmx-metrics 
[4]: /fr/opentelemetry/collector_exporter/log_collection
[6]: https://github.com/DataDog/opentelemetry-examples/tree/main/apps/kafka-metrics
[7]: https://app.datadoghq.com/dash/integration/50/kafka-zookeeper-and-kafka-consumer-overview
[8]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/attributesprocessor/README.md#includeexclude-filtering
[9]: /fr/opentelemetry/guide/metrics_mapping/#kafka-metrics