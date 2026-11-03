---
further_reading:
- link: /opentelemetry/collector_exporter/
  tag: Documentación
  text: Configuración del OpenTelemetry Collector
title: Métricas de Kafka
---
## Descripción general {#overview}

{{< img src="/opentelemetry/collector_exporter/kafka_metrics.png" alt="Métricas de Kafka de OpenTelemetry en el Dashboard de Kafka OOTB" style="width:100%;" >}}

El [Kafka metrics receiver][1], [JMX Receiver][2]/[JMX Metrics Gatherer][3] permiten recopilar métricas de Kafka y acceder al [Kafka Dashboard][7] preconfigurado, "Kafka, Zookeeper and Kafka Consumer Overview". 

**Nota**: el [receptor JMX][2] y el [JMX Metrics Gatherer][3] deben considerarse como reemplazos. Recopilan el mismo conjunto de métricas (el [receptor JMX][2] inicia el [JMX Metrics Gatherer][3]).


## Receptor de métricas de Kafka {#kafka-metrics-receiver}

{{< tabs >}}
{{% tab "Servidor" %}}

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

Use el receptor de métricas de Kafka en un Collector que se ejecute en modo `deployment` con una sola réplica. Esto evita que la misma métrica se recopile varias veces. El Collector puede exportar métricas directamente a Datadog a través de OTLP HTTP o reenviarlas a otra instancia del Collector.

Agregue las siguientes líneas a `values.yaml`:

```yaml
mode: deployment
```

Agregue lo siguiente en la configuración del Collector:

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

## Receptor JMX {#jmx-receiver}

{{< tabs >}}
{{% tab "Servidor" %}}

El receptor JMX tiene los siguientes requisitos:
- JRE está disponible en el servidor donde ejecuta el collector.
- El JAR del JMX Metric Gatherer está disponible en el servidor donde ejecuta el collector. Puede descargar la versión más reciente del JAR del JMX Metric Gatherer desde la [página de versiones de opentelemetry-java-contrib][1].

Agregue lo siguiente en la configuración del Collector:

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

Use el receptor JMX en un Collector que se ejecute en modo `deployment` con una sola réplica. Esto evita que la misma métrica se recopile varias veces. El Collector puede exportar métricas directamente a Datadog a través de OTLP HTTP o reenviarlas a otra instancia del Collector.

El receptor JMX tiene los siguientes requisitos:
- JRE está disponible en el servidor en el que ejecuta el collector.
- El JAR del JMX Metrics Gatherer está disponible en el servidor en el que está ejecutando el collector. Puede descargar la versión más reciente del JMX Metrics Gatherer JAR [aquí][1].

Debido a que la imagen predeterminada del collector OTel no cumple con los requisitos anteriores, es necesario crear una imagen personalizada. Consulte el Dockerfile a continuación para ver un ejemplo de una imagen que contiene el binario del collector, JRE y el JAR del JMX Metrics Gatherer.

Dockerfile:

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

Agregue las siguientes líneas a `values.yaml`:

```yaml
mode: deployment
```

Agregue lo siguiente en la configuración del Collector:

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


## JMX Metrics Gatherer {#jmx-metrics-gatherer}

{{< tabs >}}
{{% tab "Servidor" %}}

El JMX Metrics Gatherer está diseñado para ejecutarse como un uber jar y configurarse con propiedades desde la línea de comandos. 

Asegúrese de que JRE esté disponible en el servidor en el que está ejecutando el recopilador. Si no, asegúrese de descargarlo, por ejemplo.

```
apt-get update && \
apt-get -y install default-jre-headless
```

Una vez que haya hecho esto, descargue la versión más reciente del JMX Metrics Gatherer JAR [aquí][1] y ejecute:

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

El JMX Metrics Gatherer está diseñado para ejecutarse como un uber jar y configurarse con propiedades desde la línea de comandos. 

Para implementar esto en Kubernetes, necesita crear una imagen que contenga JRE y el JAR del JMX Metrics Gatherer. Consulte el Dockerfile a continuación para ver un ejemplo de una imagen que contiene JRE y el JAR del JMX Metrics Gatherer.

Dockerfile:

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

## Recopilación de registros {#log-collection}

Consulte [Recopilación de registros][4] para obtener instrucciones sobre cómo recopilar registros utilizando el recopilador de OpenTelemetry.

Para aparecer en el Kafka Dashboard preconfigurado, los registros de Kafka deben estar etiquetados con `source:kafka`. Para hacer esto, utilice un procesador de atributos:

```yaml
processors:
  attributes:
    actions:
      - key: ddtags
        value: "source:kafka"
        action: insert
```

Para asegurarse de que este atributo solo se agregue a sus registros de Kafka, utilice el [filtrado de inclusión/exclusión][8] del procesador de atributos.

## Datos recopilados {#data-collected}

### Receptor de métricas de Kafka {#kafka-metrics-receiver-1}

{{< mapping-table resource="kafkametrics.csv">}}

### JMX Receiver / JMX Metrics Gatherer {#jmx-receiver-jmx-metrics-gatherer}

#### Kafka broker {#kafka-broker}

{{< mapping-table resource="kafka.csv">}}

#### Kafka producer {#kafka-producer}

{{< mapping-table resource="kafka-producer.csv">}}

#### Kafka consumer {#kafka-consumer}

{{< mapping-table resource="kafka-consumer.csv">}}

**Nota:** En Datadog `-` se traduce como `_`. Por ejemplo, `kafka.producer.request-rate` se convierte en `kafka.producer.request_rate`.

Para ver la asignación completa entre los nombres de métricas de OpenTelemetry y Datadog, consulte [Asignación de métricas de OpenTelemetry][9].

## Ejemplo de salida de registro {#example-logging-output}

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

## Aplicación de ejemplo {#example-app}

Consulte la siguiente [aplicación de ejemplo][6] que demuestra las configuraciones analizadas en esta documentación. Esta aplicación de ejemplo se compone de una instancia de Kafka producer, Kafka consumer, Kafka broker y zookeeper. Demuestra el uso del Kafka metrics receiver, del JMX Receiver y/o del JMX Metrics Gatherer.


[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/kafkametricsreceiver
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/jmxreceiver
[3]: https://github.com/open-telemetry/opentelemetry-java-contrib/blob/main/jmx-metrics 
[4]: /es/opentelemetry/collector_exporter/log_collection
[6]: https://github.com/DataDog/opentelemetry-examples/tree/main/apps/kafka-metrics
[7]: https://app.datadoghq.com/dash/integration/50/kafka-zookeeper-and-kafka-consumer-overview
[8]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/attributesprocessor/README.md#includeexclude-filtering
[9]: /es/opentelemetry/guide/metrics_mapping/#kafka-metrics