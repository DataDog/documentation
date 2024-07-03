---
further_reading:
- link: /opentelemetry/collector_exporter/
  tag: Documentation
  text: Setting Up the OpenTelemetry Collector
title: Kafka Metrics
---

<div class="alert alert-warning">
OTel Kafka Metrics Remapping is in public alpha. It is available in versions >= 0.93.0 of the collector. If you have feedback related to this, reach out to your account team to provide your input.
</div>


## Overview

{{< img src="/opentelemetry/collector_exporter/kafka_metrics.png" alt="OpenTelemetry Kafka metrics in OOTB Kafka dashboard" style="width:100%;" >}}

The [Kafka metrics receiver][1], [JMX Receiver][2]/ [JMX Metrics Gatherer][3] allow collecting Kafka metrics and access to the out of the box [Kafka Dashboard][7], "Kafka, Zookeeper and Kafka Consumer Overview". 

Please note that the [JMX Receiver][2] and [JMX Metrics Gatherer][3] should be considered as replacements. They collect the same set of metrics ([JMX Receiver][2] launches the [JMX Metrics Gatherer][3]).


## Kafka metrics receiver

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

The Kafka metrics receiver needs to be used in a collector in `deployment` mode with a single replica. This ensures that the same metric is not collected multiple times. The collector in deployment mode can then leverage the Datadog Exporter to export the metrics directly to Datadog, or leverage the OTLP exporter to forward the metrics to another collector instance. 

Add the following lines to `values.yaml`:
```yaml
mode: deployment
```

Add the following in the Collector configuration:

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

## JMX receiver

{{< tabs >}}
{{% tab "Host" %}}

The JMX Receiver has the following requirements:
- JRE is available on the host where you are running the collector.
- The JMX Metric Gatherer JAR is available on the host where you are running the collector. You can download the most recent release of the JMX Metric Gatherer JAR from the [opentelemetry-java-contrib releases page][1].

Add the following in the Collector configuration:

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

The JMX receiver needs to be used in a collector in `deployment` mode with a single replica. This ensures that the same metric is not collected multiple times. The collector in deployment mode can then leverage the Datadog Exporter to export the metrics directly to Datadog, or leverage the OTLP exporter to forward the metrics to another collector instance. 

The JMX Receiver has the following requirements:
- JRE is available on the host in which you are running the collector.
- The JMX Metric Gatherer JAR is available on the host in which you are running the collector. You can download the most recent release of the JMX Metric Gatherer JAR [here][1].

Because the OTel collector default image does not meet the requirements above, a custom image needs to be built. Please refer to the Dockerfile below for an example image that contains the collector binary, JRE, and JMX Metrics Gatherer Jar.

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

Add the following lines to `values.yaml`:
```yaml
mode: deployment
```

Add the following in the Collector configuration:

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


## JMX Metrics Gatherer

{{< tabs >}}
{{% tab "Host" %}}

The JMX Metric Gatherer is intended to be run as an uber jar and configured with properties from the command line. 

Please make sure that JRE is available on the host in which you are running the collector. If not, please make sure to download it, e.g.
```
apt-get update && \
apt-get -y install default-jre-headless
```

Once you have done this, download the most recent release of the JMX Metric Gatherer JAR [here][1] and run:
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

The JMX Metric Gatherer is intended to be run as an uber jar and configured with properties from the command line. 

In order to deploy this in Kubernetes, you need to build an image which contains JRE and the JMX Metrics Gatherer Jar. Please see the Dockerfile below for an example image that contains JRE and JMX Metrics Gatherer Jar.

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

## Log collection

See [Log Collection][4] for instructions on how to collect logs using the OpenTelemetry Collector.

To appear in the out-of-the-box Kafka Dashboard, the Kafka logs need to be tagged with `source:kafka`. To do this, use an attributes processor:

```yaml
processors:
  attributes:
    actions:
      - key: ddtags
        value: "source:kafka"
        action: insert
```

In order to ensure this attribute only gets added to your Kafka logs, use [include/exclude filtering][8] of the attributes processor.

## データ収集

See [OpenTelemetry Metrics Mapping][9] for information about collected Kafka metrics.



## Full example configuration

For a full working example configuration with the Datadog exporter, see [`kafka.yaml`][5].

## Example logging output

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

## Example app

Please see the following [example application][6] which demonstrates the configurations discussed in this documentation. This example application is comprised of a producer, consumer, broker and zookeeper instance. It demonstrates using the Kafka metrics receiver, JMX Receiver and/or JMX Metrics Gatherer.


[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/kafkametricsreceiver
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/jmxreceiver
[3]: https://github.com/open-telemetry/opentelemetry-java-contrib/blob/main/jmx-metrics 
[4]: /ja/opentelemetry/collector_exporter/log_collection
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/kafka.yaml
[6]: https://github.com/DataDog/opentelemetry-examples/tree/main/apps/kafka-metrics
[7]: https://app.datadoghq.com/dash/integration/50/kafka-zookeeper-and-kafka-consumer-overview
[8]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/attributesprocessor/README.md#includeexclude-filtering
[9]: /ja/opentelemetry/guide/metrics_mapping/#kafka-metrics