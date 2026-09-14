---
title: Kafka Metrics
further_reading:
- link: "/opentelemetry/collector_exporter/"
  tag: "Documentation"
  text: "Setting Up the OpenTelemetry Collector"
---


## Overview

{{< img src="/opentelemetry/collector_exporter/kafka_metrics.png" alt="OpenTelemetry Kafka metrics in the Kafka dashboard" style="width:100%;" >}}

The [Kafka metrics receiver][1] and [JMX Scraper][2] collect Kafka metrics for the out-of-the-box [Kafka Dashboard][7], **Kafka, Zookeeper and Kafka Consumer Overview**.

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

Run the Kafka metrics receiver in a single-replica Collector deployment to prevent duplicate metrics. The Collector can export metrics directly to Datadog over OTLP HTTP or forward them to another Collector.

Set the deployment mode in `values.yaml`:

```yaml
mode: deployment
```

Add the receiver to the Collector configuration:

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

## JMX Scraper

The JMX Scraper runs as a standalone Java application and sends metrics to the Collector's OTLP receiver.

### Configure Kafka brokers

Configure JMX authentication and TLS for your environment. Add these JVM options to each Kafka broker:

```shell
-Dcom.sun.management.jmxremote=true
-Dcom.sun.management.jmxremote.port=9999
-Dcom.sun.management.jmxremote.rmi.port=9999
-Dcom.sun.management.jmxremote.local.only=false
-Djava.rmi.server.hostname=<BROKER_HOSTNAME_OR_IP>
```

Set `java.rmi.server.hostname` to the hostname or IP address that the scraper uses to connect. The broker includes this value in an RMI stub, and the scraper opens a second connection to it.

- Do not use `0.0.0.0`, which is a bind address rather than a routable address.
- Use a loopback address only when the scraper runs on the broker's host or Pod.
- In Kubernetes, use the broker Pod IP or a DNS name.

Set `jmxremote.rmi.port` to the same port as `jmxremote.port`. Without a fixed RMI port, the second connection uses a random port that a firewall or port mapping might block. For Kafka containers, set `KAFKA_JMX_HOSTNAME` to the same address as `java.rmi.server.hostname`.

An unreachable address can allow the initial connection to succeed, but the scrape then fails with `Failed to retrieve RMIServer stub` or `Connection refused to host: <UNREACHABLE_ADDRESS>`.

### Run the JMX Scraper

Set `otel.jmx.target.source` to `legacy` to preserve the JVM metric names expected by existing dashboards and monitors.

{{< tabs >}}
{{% tab "Host" %}}

Install a JRE on the host that runs the JMX Scraper. On Debian or Ubuntu, run:

```shell
apt-get update && \
apt-get -y install default-jre-headless
```

Download the [JMX Scraper JAR for OpenTelemetry Java Contrib v1.60.0][3]. Set each address variable in `host:port` format. Then run one or more of the following commands:

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

{{% /tab %}}

{{% tab "Kubernetes" %}}

Use the following Dockerfile to build an image with a JRE and the JMX Scraper JAR:

```Dockerfile
FROM alpine:latest as prep

# JMX Scraper JAR
ARG JMX_SCRAPER_JAR_VERSION=1.60.0
ADD https://github.com/open-telemetry/opentelemetry-java-contrib/releases/download/v${JMX_SCRAPER_JAR_VERSION}/opentelemetry-jmx-scraper.jar /opt/opentelemetry-jmx-scraper.jar
ARG USER_UID=65532
RUN chown ${USER_UID} /opt/opentelemetry-jmx-scraper.jar

FROM gcr.io/distroless/java17-debian11:nonroot

COPY --from=prep /opt/opentelemetry-jmx-scraper.jar /opt/opentelemetry-jmx-scraper.jar

EXPOSE 4317 55680 55679
ENTRYPOINT ["java"]
CMD ["-Dotel.jmx.service.url=service:jmx:rmi:///jndi/rmi://kafka:1099/jmxrmi", \
"-Dotel.jmx.target.system=kafka,jvm", \
"-Dotel.jmx.target.source=legacy", \
"-Dotel.metrics.exporter=otlp", \
"-Dotel.exporter.otlp.endpoint=http://otelcol:4317", \
"-jar", \
"/opt/opentelemetry-jmx-scraper.jar"]
```

Replace `kafka:1099` with the broker's JMX address and `otelcol:4317` with the Collector's OTLP gRPC endpoint.

{{% /tab %}}

{{< /tabs >}}

## Log collection

See [Log Collection][4] for instructions on how to collect logs using the OpenTelemetry Collector.

To include Kafka logs in the out-of-the-box Kafka Dashboard, use an attributes processor to add the `source:kafka` tag:

```yaml
processors:
  attributes:
    actions:
      - key: ddtags
        value: "source:kafka"
        action: insert
```

To add this attribute only to Kafka logs, use [include/exclude filtering][8] in the attributes processor.

## Data collected

### Kafka metrics receiver

{{< mapping-table resource="kafkametrics.csv">}}

### JMX Scraper

#### Kafka broker

{{< mapping-table resource="kafka.csv">}}

#### Kafka producer

{{< mapping-table resource="kafka-producer.csv">}}

#### Kafka consumer

{{< mapping-table resource="kafka-consumer.csv">}}

**Note:** Datadog replaces hyphens (`-`) with underscores (`_`) in metric names. For example, `kafka.producer.request-rate` becomes `kafka.producer.request_rate`.

For the complete mapping between OpenTelemetry and Datadog metric names, see [OpenTelemetry Metrics Mapping][9].

## Full example configuration

For a complete configuration with the Datadog exporter, see [`kafka.yaml`][5].

## Example logging output

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

## Example application

See the [Kafka metrics example application][6] for a producer, consumer, broker, and ZooKeeper setup.

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/kafkametricsreceiver
[2]: https://github.com/open-telemetry/opentelemetry-java-contrib/tree/main/jmx-scraper
[3]: https://github.com/open-telemetry/opentelemetry-java-contrib/releases/tag/v1.60.0
[4]: /opentelemetry/collector_exporter/log_collection
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/kafka.yaml
[6]: https://github.com/DataDog/opentelemetry-examples/tree/main/apps/kafka-metrics
[7]: https://app.datadoghq.com/dash/integration/50/kafka-zookeeper-and-kafka-consumer-overview
[8]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/attributesprocessor/README.md#includeexclude-filtering
[9]: /opentelemetry/guide/metrics_mapping/#kafka-metrics
