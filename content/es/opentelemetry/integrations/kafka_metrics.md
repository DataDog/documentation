---
further_reading:
- link: /opentelemetry/collector_exporter/
  tag: Documentación
  text: Configuración de OpenTelemetry Collector
title: Métricas de Kafka
---

<div class="alert alert-danger">
La reasignación de métricas de OTel Kafka está en fase alfa pública. Está disponible en las versiones >= 0.93.0 de Collector. Si tienes algún comentario al respecto, ponte en contacto con el equipo de tu cuenta.
</div>


## Información general

{{< img src="/opentelemetry/collector_exporter/kafka_metrics.png" alt="Métricas de OpenTelemetry Kafka en un dashboard de OOTB Kafka" style="width:100%;" >}}

El [receptor de métricas de Kafka][1], [receptor de JMX][2]/[recopilador de métricas de JMX][3] permiten recopilar métricas de Kafka y acceder al [dashboard de Kafka][7] predefinido, "Kafka, Zookeeper and Kafka Consumer Overview".

Ten en cuenta que el [receptor de JMX][2] y el [recopilador de métricas de JMX][3] deben considerarse sustitutos. Recopilan el mismo conjunto de métricas ([receptor de JMX][2] lanza el [recopilador de métricas de JMX][3]).


## Receptor de métricas de Kafka

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

El receptor de métricas de Kafka debe utilizarse en un recopilador en modo `deployment` con una única réplica. Esto asegura que la misma métrica no se recopile varias veces. El recopilador en modo de despliegue puede entonces aprovechar el Exportador de Datadog para exportar las métricas directamente a Datadog, o aprovechar el exportador OTLP para reenviar las métricas a otra instancia del recopilador.

Añade las siguientes líneas a `values.yaml`:
```yaml
mode: deployment
```

Añade lo siguiente en la configuración de Collector:

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

## Receptor JMX

{{< tabs >}}
{{% tab "Host" %}}

El receptor JMX tiene los siguientes requisitos:
- JRE está disponible en el host en el que se ejecuta el recopilador.
- El JAR del recopilador de métricas de JMX está disponible en el host donde estás ejecutando el recopilador. Puedes descargar la versión más reciente del JAR del recopilador de métricas de JMX desde la [página de versiones de opentelemetry-java-contrib][1].

Añade lo siguiente en la configuración de Collector:

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

El receptor de JMX debe utilizarse en un recopilador en modo `deployment` con una única réplica. Esto asegura que la misma métrica no se recopile varias veces. El recopilador en modo de despliegue puede entonces aprovechar el Exportador de Datadog para exportar las métricas directamente a Datadog, o aprovechar el exportador OTLP para reenviar las métricas a otra instancia del recopilador.

El receptor de JMX tiene los siguientes requisitos:
- JRE está disponible en el host en el que se está ejecutando el recopilador.
- El JAR del recopilador de métricas de JMX está disponible en el host donde estás ejecutando el recopilador. Puedes descargar la versión más reciente del JAR del recopilador de métricas de JMX [aquí][1].

Debido a que la imagen por defecto de OTel Collector no cumple con los requisitos anteriores, es necesario crear una imagen personalizada. Consulta el archivo Dockerfile a continuación para ver una imagen de ejemplo que contiene el archivo binario del recopilador, JRE y JAR del recopilador de métricas de JMX.

Dockerfile:
```Dockerfile
FROM alpine:latest as prep

# Archivo binario de OpenTelemetry Collector
ARG OTEL_VERSION=0.92.0
ARG TARGETARCH=linux_amd64
ADD "https://github.com/open-telemetry/opentelemetry-collector-releases/releases/download/v${OTEL_VERSION}/otelcol-contrib_${OTEL_VERSION}_${TARGETARCH}.tar.gz" /otelcontribcol
RUN tar -zxvf /otelcontribcol

# JAR del recopilador de métricas de JMX
ARG JMX_GATHERER_JAR_VERSION=1.27.0
ADD https://github.com/open-telemetry/opentelemetry-java-contrib/releases/download/v${JMX_GATHERER_JAR_VERSION}/opentelemetry-jmx-metrics.jar /opt/opentelemetry-jmx-metrics.jar
# Id. de usuario no raíz (https://groups.google.com/g/distroless-users/c/-DpzCr7xRDY/m/eQqJmJroCgAJ)
ARG USER_UID=65532
RUN chown ${USER_UID} /opt/opentelemetry-jmx-metrics.jar


FROM gcr.io/distroless/java17-debian11:nonroot

COPY --from=prep /opt/opentelemetry-jmx-metrics.jar /opt/opentelemetry-jmx-metrics.jar
COPY --from=prep /otelcol-contrib /otelcol-contrib

EXPOSE 4317 55680 55679
ENTRYPOINT ["/otelcol-contrib"]
CMD ["--config", "/etc/otelcol-contrib/config.yaml"]
```

Añade las siguientes líneas a `values.yaml`:
```yaml
mode: deployment
```

Añade lo siguiente en la configuración de Collector:

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


## Recopilador de métricas de JMX

{{< tabs >}}
{{% tab "Host" %}}

El Recopilador de métricas de JMX está pensado para ser ejecutado como un uber jar y está configurado con propiedades desde la línea de comandos.

Asegúrate de que JRE está disponible en el host en el que estás ejecutando el recopilador. Si no es así, asegúrate de descargarlo, por ejemplo.
```
apt-get update && \
apt-get -y install default-jre-headless
```

Una vez hecho esto, descarga la versión más reciente del JAR del Recopilador de métricas de JMX [aquí][1] y ejecútala:
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

El Recopilador de métricas de JMX está pensado para ser ejecutado como un uber jar y está configurado con propiedades desde la línea de comandos.

Para desplegar esto en Kubernetes, necesitas crear una imagen que contenga JRE y el JAR del Recopilador de métricas de JMX. Consulta el Dockerfile a continuación para ver una imagen de ejemplo que contiene JRE y el JAR del Recopilador de métricas de JMX.

Dockerfile:
```Dockerfile
FROM alpine:latest as prep

# JAR del Recopilador de métricas de JMX
ARG JMX_GATHERER_JAR_VERSION=1.27.0
ADD https://github.com/open-telemetry/opentelemetry-java-contrib/releases/download/v${JMX_GATHERER_JAR_VERSION}/opentelemetry-jmx-metrics.jar /opt/opentelemetry-jmx-metrics.jar
# Id. de usuario no raíz (https://groups.google.com/g/distroless-users/c/-DpzCr7xRDY/m/eQqJmJroCgAJ)
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

## APM

Consulta [Recopilación de logs][4] para obtener instrucciones sobre cómo recopilar logs con OpenTelemetry Collector.

Para que aparezca en el dashboard predefinido de Kafka, los logs de Kafka deben tener la etiqueta `source:kafka`. Para ello, utiliza un procesador de atributos:

```yaml
processors:
  attributes:
    actions:
      - key: ddtags
        value: "source:kafka"
        action: insert
```

Para asegurarte de que este atributo solo se añade a tus logs de Kafka, utiliza [el filtro include/exclude][8] del procesador de atributos.

## Datos recopilados

Consulta [asignación de métricas de OpenTelemetry][9] para obtener información sobre las métricas de Kafka recopiladas.



## Ejemplo completo de configuración

Para ver un ejemplo completo de configuración en funcionamiento con el exportador de Datadog, consulta [`kafka.yaml`][5].

## Ejemplo de salida de registro

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

## Ejemplo de aplicación

Consulta el siguiente [ejemplo de aplicación][6] que demuestra las configuraciones que se abordan en esta documentación. Esta aplicación de ejemplo está compuesta por un productor, un consumidor, un broker y una instancia de zookeeper. Demuestra el uso del receptor de métricas de Kafka, el receptor de JMX o el Recopilador de métricas de JMX.


[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/kafkametricsreceiver
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/jmxreceiver
[3]: https://github.com/open-telemetry/opentelemetry-java-contrib/blob/main/jmx-metrics 
[4]: /es/opentelemetry/collector_exporter/log_collection
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/kafka.yaml
[6]: https://github.com/DataDog/opentelemetry-examples/tree/main/apps/kafka-metrics
[7]: https://app.datadoghq.com/dash/integration/50/kafka-zookeeper-and-kafka-consumer-overview
[8]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/attributesprocessor/README.md#includeexclude-filtering
[9]: /es/opentelemetry/guide/metrics_mapping/#kafka-metrics