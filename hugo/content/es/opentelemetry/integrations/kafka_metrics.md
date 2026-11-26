---
further_reading:
- link: /opentelemetry/setup/collector_exporter/
  tag: Documentación
  text: Configuración del OpenTelemetry Collector
title: Métricas de Kafka
---
## Descripción general {#overview}

{{< img src="/opentelemetry/collector_exporter/kafka_metrics.png" alt="Métricas de Kafka de OpenTelemetry en el Dashboard de Kafka" style="width:100%;" >}}

El [receptor de métricas de Kafka][1] y el [JMX Scraper][2] recopilan métricas de Kafka para el [Kafka Dashboard][3] listo para usar, **Kafka, Zookeeper, and Kafka Consumer Overview**.

Ambos recopilan datos diferentes y la mayoría de las configuraciones ejecutan ambos. El receptor de métricas de Kafka lee el estado del clúster a través de la API de administración de Kafka. El JMX Scraper lee los beans de JMX expuestos por brokers, productores y consumidores.

## Receptor de métricas de Kafka {#kafka-metrics-receiver}

Establezca `KAFKA_BROKER_ADDRESS` en una dirección de broker en formato `host:port`. Para listar más de un broker, separe las direcciones con comas.

{{< tabs >}}
{{% tab "Servidor" %}}

Agregue el receptor a la configuración del Collector:

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

Agregue `kafkametrics` a la lista `receivers` de la canalización de métricas. El Collector inicia solo los receptores que utiliza una canalización. Por ejemplo, en la configuración de Host recomendada:

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

Ejecute el receptor de métricas de Kafka en una implementación de Collector de réplica única para evitar métricas duplicadas. El Collector puede exportar métricas directamente a Datadog a través de OTLP HTTP o reenviarlas a otro Collector.

Establezca el modo de implementación en `values.yaml`:

```yaml
mode: deployment
```

Agregue el receptor a la configuración del Collector:

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

Agregue `kafkametrics` a una canalización de métricas en la misma configuración. El Collector inicia solo los receptores que utiliza una canalización. Para exportar directamente a Datadog, configure el exportador `otlp_http` como se muestra en la [configuración recomendada][101]:

```yaml
service:
  pipelines:
    metrics:
      receivers: [kafkametrics]
      exporters: [otlp_http]
```

[101]: /es/opentelemetry/setup/collector_exporter/#otlp-http-exporter

{{% /tab %}}

{{< /tabs >}}

## JMX Scraper {#jmx-scraper}

El JMX Scraper se ejecuta como una aplicación Java independiente y envía métricas al receptor OTLP del Collector.

La [configuración recomendada del Collector][4] recibe OTLP a través de gRPC en el puerto 4317 e incluye el receptor OTLP en su canalización de métricas, por lo que no necesita cambiar la configuración del receptor.

El JMX Scraper envía contadores con temporalidad acumulativa. Mantenga el procesador `cumulativetodelta` en la canalización de métricas recomendada, el cual los convierte a la temporalidad delta que requiere la [ingesta de métricas OTLP de Datadog][8].

### Configure los brokers de Kafka {#configure-kafka-brokers}

1. Agregue las siguientes opciones de JVM a cada broker de Kafka para iniciar un punto de conexión JMX sin seguridad adecuado para la evaluación:

   ```shell
   -Dcom.sun.management.jmxremote=true
   -Dcom.sun.management.jmxremote.port=9999
   -Dcom.sun.management.jmxremote.rmi.port=9999
   -Dcom.sun.management.jmxremote.local.only=false
   -Dcom.sun.management.jmxremote.authenticate=false
   -Dcom.sun.management.jmxremote.ssl=false
   -Djava.rmi.server.hostname=<BROKER_HOSTNAME_OR_IP>
   ```

   <div class="alert alert-warning">Estas opciones deshabilitan la autenticación JMX y TLS. Utilice esta configuración solo para evaluación. Para producción, habilite la autenticación y TLS, y configure el scraper con las credenciales y la configuración del almacén de confianza.</div>

   `jmxremote.authenticate` y `jmxremote.ssl` tienen como valor predeterminado `true`, así que establezca ambas propiedades explícitamente para esta configuración de evaluación. Sin un archivo de contraseña, la autenticación hace que el broker falle con `Password file not found`. Cuando `jmxremote.rmi.port` coincide con `jmxremote.port`, SSL causa `Port already in use` porque el registro RMI no está protegido con TLS y no puede compartir el puerto.

   Para habilitar la autenticación y TLS para producción, agregue `com.sun.management.jmxremote.registry.ssl=true` para que el registro y el conector puedan compartir un puerto. Configure el scraper con las propiedades `otel.jmx.username`, `otel.jmx.password`, `otel.jmx.remote.registry.ssl`, `javax.net.ssl.trustStore` y `javax.net.ssl.trustStorePassword`.

2. Establezca `java.rmi.server.hostname` en el nombre del servidor o la dirección IP que el scraper utiliza para conectarse. El broker incluye este valor en un stub RMI, y el scraper abre una segunda conexión hacia él.

   - Utilice una dirección de loopback solo cuando el scraper se ejecute en el mismo servidor o pod que el broker. Varias distribuciones de Kafka e imágenes de contenedor, incluida Confluent Platform, utilizan loopback de forma predeterminada.
   - No utilice `0.0.0.0`. Es una dirección de escucha y el scraper no puede conectarse a ella.
   - En Kubernetes, utilice la IP del pod del broker o un nombre DNS.

   En las imágenes de contenedor de Kafka, `KAFKA_JMX_HOSTNAME` establece `java.rmi.server.hostname`. Establézcalo en la misma dirección.

   Una dirección inalcanzable puede permitir que la conexión inicial tenga éxito, pero la recopilación de métricas falla posteriormente con `Failed to retrieve RMIServer stub` o `Connection refused to host: <UNREACHABLE_ADDRESS>`.

3. Establezca `jmxremote.rmi.port` en el mismo puerto que `jmxremote.port`. Sin un puerto RMI fijo, la segunda conexión utiliza un puerto aleatorio que un firewall o un mapeo de puertos podría bloquear.

Para recopilar métricas de productores y consumidores, agregue las mismas opciones de JVM a esas aplicaciones.

### Ejecute el JMX Scraper {#run-the-jmx-scraper}

Establezca `otel.jmx.target.source` en `legacy` para preservar los nombres de métricas de JVM que esperan los dashboards y monitores existentes. Sin esto, el scraper utiliza `auto` de forma predeterminada y cada nombre de métrica de JVM cambia.

{{< tabs >}}
{{% tab "Servidor" %}}

Instale un JRE en el servidor que ejecuta el JMX Scraper. En Debian o Ubuntu, ejecute:

```shell
apt-get update && \
apt-get -y install default-jre-headless
```

Descargue el JAR de JMX Scraper desde [OpenTelemetry Java Contrib releases][201]. Establezca cada variable de dirección en formato `host:port`.

Cada proceso del scraper recopila métricas de un único punto de conexión JMX. Ejecute un proceso para cada broker, productor y consumidor, con la dirección de esa JVM:

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

Utilice el siguiente Dockerfile para crear una imagen con un JRE y el JAR de JMX Scraper:

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

Reemplace `kafka:9999` con la dirección JMX del broker y `otelcol:4317` con el punto de conexión OTLP gRPC del Collector.

Para recopilar métricas de productores o consumidores, establezca `otel.jmx.target.system` en `kafka-producer` o `kafka-consumer` y apunte `otel.jmx.service.url` al punto de conexión JMX de esa JVM.

Ejecute una sola instancia por punto de conexión JMX. Varias réplicas que recopilan métricas del mismo punto de conexión producen métricas duplicadas.

{{% /tab %}}

{{< /tabs >}}

## Recopilación de registros {#log-collection}

Para recopilar registros con el OpenTelemetry Collector, consulte [Recopilación de registros][5].

Para incluir registros de Kafka en el Kafka Dashboard listo para usar, utilice un procesador de atributos para añadir la etiqueta `source:kafka`:

```yaml
processors:
  attributes:
    actions:
      - key: ddtags
        value: "source:kafka"
        action: insert
```

Para añadir este atributo solo a los registros de Kafka, utilice el [filtrado de inclusión/exclusión][6] en el procesador de atributos.

## Datos recopilados {#data-collected}

### Receptor de métricas de Kafka {#kafka-metrics-receiver-1}

{{< mapping-table resource="kafkametrics.csv">}}

### JMX Scraper {#jmx-scraper-1}

#### Kafka broker {#kafka-broker}

{{< mapping-table resource="kafka.csv">}}

#### Kafka producer {#kafka-producer}

{{< mapping-table resource="kafka-producer.csv">}}

#### Kafka consumer {#kafka-consumer}

{{< mapping-table resource="kafka-consumer.csv">}}

**Nota**: Datadog reemplaza los guiones (`-`) con guiones bajos (`_`) en los nombres de las métricas. Por ejemplo, `kafka.producer.request-rate` se convierte en `kafka.producer.request_rate`.

Para ver la asignación completa entre los nombres de métricas de OpenTelemetry y Datadog, consulte [Asignación de métricas de OpenTelemetry][7].

## Ejemplo de salida de registro {#example-logging-output}

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
[4]: /es/opentelemetry/setup/collector_exporter/
[5]: /es/opentelemetry/config/log_collection
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/attributesprocessor/README.md#includeexclude-filtering
[7]: /es/opentelemetry/mapping/metrics_mapping/
[8]: /es/opentelemetry/setup/otlp_ingest/metrics/#ensure-only-delta-metrics-are-sent