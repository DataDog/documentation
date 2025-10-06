---
title: Kafka Metrics
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: Docs > OpenTelemetry in Datadog > Integrations > Kafka Metrics
---

# Kafka Metrics

{% alert level="warning" %}
OTel Kafka Metrics Remapping is in public alpha. It is available in versions >= 0.93.0 of the collector. If you have feedback related to this, reach out to your account team to provide your input.
{% /alert %}

## Overview{% #overview %}

{% image
   source="http://localhost:1313/images/opentelemetry/collector_exporter/kafka_metrics.34bf4de835ecb56a140a92077ecf86cd.png?auto=format"
   alt="OpenTelemetry Kafka metrics in OOTB Kafka dashboard" /%}

The [Kafka metrics receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/kafkametricsreceiver), [JMX Receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/jmxreceiver)/ [JMX Metrics Gatherer](https://github.com/open-telemetry/opentelemetry-java-contrib/blob/main/jmx-metrics) allow collecting Kafka metrics and access to the out of the box [Kafka Dashboard](https://app.datadoghq.com/dash/integration/50/kafka-zookeeper-and-kafka-consumer-overview), "Kafka, Zookeeper and Kafka Consumer Overview".

**Note**: the [JMX Receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/jmxreceiver) and [JMX Metrics Gatherer](https://github.com/open-telemetry/opentelemetry-java-contrib/blob/main/jmx-metrics) should be considered as replacements. They collect the same set of metrics ([JMX Receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/jmxreceiver) launches the [JMX Metrics Gatherer](https://github.com/open-telemetry/opentelemetry-java-contrib/blob/main/jmx-metrics)).

## Kafka metrics receiver{% #kafka-metrics-receiver %}

{% tab title="Host" %}

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

{% /tab %}

{% tab title="Kubernetes" %}
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

{% /tab %}

## JMX receiver{% #jmx-receiver %}

{% tab title="Host" %}
The JMX Receiver has the following requirements:

- JRE is available on the host where you are running the collector.
- The JMX Metric Gatherer JAR is available on the host where you are running the collector. You can download the most recent release of the JMX Metric Gatherer JAR from the [opentelemetry-java-contrib releases page](https://github.com/open-telemetry/opentelemetry-java-contrib/releases).

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

{% /tab %}

{% tab title="Kubernetes" %}
The JMX receiver needs to be used in a collector in `deployment` mode with a single replica. This ensures that the same metric is not collected multiple times. The collector in deployment mode can then leverage the Datadog Exporter to export the metrics directly to Datadog, or leverage the OTLP exporter to forward the metrics to another collector instance.

The JMX Receiver has the following requirements:

- JRE is available on the host in which you are running the collector.
- The JMX Metric Gatherer JAR is available on the host in which you are running the collector. You can download the most recent release of the JMX Metric Gatherer JAR [here](https://github.com/open-telemetry/opentelemetry-java-contrib/releases).

Because the OTel collector default image does not meet the requirements above, a custom image needs to be built. See the Dockerfile below for an example image that contains the collector binary, JRE, and JMX Metrics Gatherer Jar.

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

{% /tab %}

## JMX Metrics Gatherer{% #jmx-metrics-gatherer %}

{% tab title="Host" %}
The JMX Metric Gatherer is intended to be run as an uber jar and configured with properties from the command line.

Please make sure that JRE is available on the host in which you are running the collector. If not, please make sure to download it, e.g.

```
apt-get update && \
apt-get -y install default-jre-headless
```

Once you have done this, download the most recent release of the JMX Metric Gatherer JAR [here](https://github.com/open-telemetry/opentelemetry-java-contrib/releases) and run:

```gdscript3
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

{% /tab %}

{% tab title="Kubernetes" %}
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

{% /tab %}

## Log collection{% #log-collection %}

See [Log Collection](http://localhost:1313/opentelemetry/collector_exporter/log_collection) for instructions on how to collect logs using the OpenTelemetry Collector.

To appear in the out-of-the-box Kafka Dashboard, the Kafka logs need to be tagged with `source:kafka`. To do this, use an attributes processor:

```yaml
processors:
  attributes:
    actions:
      - key: ddtags
        value: "source:kafka"
        action: insert
```

In order to ensure this attribute only gets added to your Kafka logs, use [include/exclude filtering](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/attributesprocessor/README.md#includeexclude-filtering) of the attributes processor.

## Data collected{% #data-collected %}

**Note:** In Datadog `-` gets translated to `_`. For the metrics prepended by `otel.`, this means that the OTel metric name and the Datadog metric name are the same (for example, `kafka.producer.request-rate` and `kafka.producer.request_rate`). In order to avoid double counting for these metrics, the OTel metric is then prepended with `otel.`.

See [OpenTelemetry Metrics Mapping](http://localhost:1313/opentelemetry/guide/metrics_mapping/#kafka-metrics) for more information.

## Full example configuration{% #full-example-configuration %}

For a full working example configuration with the Datadog exporter, see [`kafka.yaml`](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/kafka.yaml).

## Example logging output{% #example-logging-output %}

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

## Example app{% #example-app %}

Please see the following [example application](https://github.com/DataDog/opentelemetry-examples/tree/main/apps/kafka-metrics) which demonstrates the configurations discussed in this documentation. This example application is comprised of a producer, consumer, broker and zookeeper instance. It demonstrates using the Kafka metrics receiver, JMX Receiver and/or JMX Metrics Gatherer.
