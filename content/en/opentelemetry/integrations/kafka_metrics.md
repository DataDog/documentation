---
title: Kafka Metrics
further_reading:
- link: "/opentelemetry/collector_exporter/"
  tag: "Documentation"
  text: "Setting Up the OpenTelemetry Collector"
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

## Data collected


| OpenTelemetry Metric | Datadog Metric | Source | Transform done on Datadog Metric |
|---|---|---|---|
| otel.kafka.producer.request-rate | kafka.producer.request_rate | JMX Receiver / JMX Metrics Gatherer {target_system:kafka-producer} | |
| otel.kafka.producer.response-rate | kafka.producer.response_rate | JMX Receiver / JMX Metrics Gatherer {target_system:kafka-producer} | |
| otel.kafka.producer.request-latency-avg|kafka.producer.request_latency_avg | JMX Receiver / JMX Metrics Gatherer {target_system:kafka-producer}| |
| kafka.producer.outgoing-byte-rate | kafka.producer.outgoing-byte-rate | JMX Receiver / JMX Metrics Gatherer {target_system:kafka-producer}| |
| kafka.producer.io-wait-time-ns-avg | kafka.producer.io_wait | JMX Receiver / JMX Metrics Gatherer {target_system:kafka-producer}| |
| kafka.producer.byte-rate | kafka.producer.bytes_out | JMX Receiver / JMX Metrics Gatherer {target_system:kafka-producer} | |
| kafka.consumer.total.bytes-consumed-rate | kafka.consumer.bytes_in | JMX Receiver / JMX Metrics Gatherer {target_system:kafka-consumer} | |
| kafka.consumer.total.records-consumed-rate | kafka.consumer.messages_in | JMX Receiver / JMX Metrics Gatherer {target_system:kafka-consumer} | |
| kafka.network.io{state:out} | kafka.net.bytes_out.rate | JMX Receiver / JMX Metrics Gatherer {target_system:kafka} | Compute rate per second and submitted as Gauge |
| kafka.network.io{state:in} | kafka.net.bytes_in.rate | JMX Receiver / JMX Metrics Gatherer {target_system:kafka} | Compute rate per second and submitted as Gauge |
| kafka.purgatory.size{type:produce} | kafka.request.producer_request_purgatory.size | JMX Receiver / JMX Metrics Gatherer {target_system:kafka} | |
| kafka.purgatory.size{type:fetch} | kafka.request.fetch_request_purgatory.size | JMX Receiver / JMX Metrics Gatherer {target_system:kafka} | |
| kafka.partition.under_replicated | kafka.replication.under_replicated_partitions | JMX Receiver / JMX Metrics Gatherer {target_system:kafka} | |
| kafka.isr.operation.count{operation:shrink} | kafka.replication.isr_shrinks.rate | JMX Receiver / JMX Metrics Gatherer {target_system:kafka} | Compute rate per second and submitted as Gauge |
| kafka.isr.operation.count{operation:expand} | kafka.replication.isr_expands.rate | JMX Receiver / JMX Metrics Gatherer {target_system:kafka} | Compute rate per second and submitted as Gauge | 
| kafka.leader.election.rate | kafka.replication.leader_elections.rate | JMX Receiver / JMX Metrics Gatherer {target_system:kafka} | Compute rate per second and submitted as Gauge | 
| kafka.partition.offline | kafka.replication.offline_partitions_count | JMX Receiver / JMX Metrics Gatherer {target_system:kafka} | |
| kafka.request.time.avg{type:produce} | kafka.request.produce.time.avg | JMX Receiver / JMX Metrics Gatherer {target_system:kafka} | |
| kafka.request.time.avg{type:fetchconsumer} | kafka.request.fetch_consumer.time.avg | JMX Receiver / JMX Metrics Gatherer {target_system:kafka} | |
| kafka.request.time.avg{type:fetchfollower} | kafka.request.fetch_follower.time.avg |JMX Receiver / JMX Metrics Gatherer {target_system:kafka} | |
| kafka.message.count |kafka.messages_in.rate | JMX Receiver / JMX Metrics Gatherer {target_system:kafka} | Compute rate per second and submitted as Gauge |
| kafka.request.failed{type:produce} | kafka.request.produce.failed.rate | JMX Receiver / JMX Metrics Gatherer {target_system:kafka} | Compute rate per second and submitted as Gauge |
| kafka.request.failed{type:fetch} | kafka.request.fetch.failed.rate | JMX Receiver / JMX Metrics Gatherer {target_system:kafka} | Compute rate per second and submitted as Gauge |
| kafka.request.time.99p{type:produce} | kafka.request.produce.time.99percentile | JMX Receiver / JMX Metrics Gatherer {target_system:kafka} | |
| kafka.request.time.99p{type:fetchconsumer} | kafka.request.fetch_consumer.time.99percentile | JMX Receiver / JMX Metrics Gatherer {target_system:kafka} | |
| kafka.request.time.99p{type:fetchfollower} | kafka.request.fetch_follower.time.99percentile | JMX Receiver / JMX Metrics Gatherer {target_system:kafka} | |
| kafka.partition.count | kafka.replication.partition_count | JMX Receiver / JMX Metrics Gatherer {target_system:kafka} | |
| kafka.max.lag | kafka.replication.max_lag | JMX Receiver / JMX Metrics Gatherer {target_system:kafka} | |
| kafka.controller.active.count | kafka.replication.active_controller_count | JMX Receiver / JMX Metrics Gatherer {target_system:kafka} | |
| kafka.unclean.election.rate | kafka.replication.unclean_leader_elections.rate | JMX Receiver / JMX Metrics Gatherer {target_system:kafka} | Compute rate per second and submitted as Gauge |
| kafka.request.queue | kafka.request.channel.queue.size | JMX Receiver / JMX Metrics Gatherer {target_system:kafka} | |
| kafka.logs.flush.time.count | kafka.log.flush_rate.rate | JMX Receiver / JMX Metrics Gatherer {target_system:kafka} | Compute rate per second and submitted as Gauge |
| kafka.consumer.bytes-consumed-rate | kafka.consumer.bytes_consumed | JMX Receiver / JMX Metrics Gatherer {target_system:kafka-consumer} | |
| kafka.consumer.records-consumed-rate | kafka.consumer.records_consumed | JMX Receiver / JMX Metrics Gatherer {target_system:kafka-consumer} | |
| otel.kafka.consumer.fetch-size-avg | kafka.consumer.fetch_size_avg | JMX Receiver / JMX Metrics Gatherer {target_system:kafka-consumer} | |
| otel.kafka.producer.compression-rate | kafka.producer.compression-rate | JMX Receiver / JMX Metrics Gatherer {target_system:kafka-producer} | |
| otel.kafka.producer.record-error-rate | kafka.producer.record_error_rate | JMX Receiver / JMX Metrics Gatherer {target_system:kafka-producer} | |
| otel.kafka.producer.record-retry-rate | kafka.producer.record_retry_rate | JMX Receiver / JMX Metrics Gatherer {target_system:kafka-producer} | |
| otel.kafka.producer.record-send-rate | kafka.producer.record_send_rate | JMX Receiver / JMX Metrics Gatherer {target_system:kafka-producer} | |
| kafka.partition.current_offset | kafka.broker_offset | kafkametricsreceiver | |
| kafka.consumer_group.lag | kafka.consumer_lag | kafkametricsreceiver
| kafka.consumer_group.offset | kafka.consumer_offset | kafkametricsreceiver
| jvm.gc.collections.count{name:Copy && name:PS Scavenge && name:ParNew && name:G1 Young Generation} | jvm.gc.min&&_collection_count | JMX Receiver / JMX Metrics Gatherer {target_system:jvm} | Compute rate per second and submitted as Gauge |
| jvm.gc.maj&&_collection_count{name:MarkSweepCompact && name:PS MarkSweep &&name:ConcurrentMarkSweep &&name:G1 Mixed Generation && G1 Old Generation && Shenandoah Cycles && ZGC} | jvm.gc.maj&&_collection_count | JMX Receiver / JMX Metrics Gatherer {target_system:jvm} | Compute rate per second and submitted as Gauge |
| jvm.gc.collections.elapsed{name:Copy && name:PS Scavenge && name:ParNew && name:G1 Young Generation} | jvm.gc.min&&_collection_time | JMX Receiver / JMX Metrics Gatherer {target_system:jvm} | Compute rate per second and submitted as Gauge |
| jvm.gc.collections.elapsed{name:MarkSweepCompact && name:PS MarkSweep &&name:ConcurrentMarkSweep &&name:G1 Mixed Generation && G1 Old Generation && Shenandoah Cycles && ZGC} | jvm.gc.major_collection_time | JMX Receiver / JMX Metrics Gatherer {target_system:jvm} | Compute rate per second and submitted as Gauge

**Note:** In Datadog `-` gets translated to `_`. For the metrics prepended by `otel.`, this means that the OTel metric name and the Datadog metric name are the same (for example, `kafka.producer.request-rate` and `kafka.producer.request_rate`). In order to avoid double counting for these metrics, the OTel metric is then prepended with `otel.`.

See [OpenTelemetry Metrics Mapping][9] for more information.

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
[4]: /opentelemetry/collector_exporter/log_collection
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/kafka.yaml
[6]: https://github.com/DataDog/opentelemetry-examples/tree/main/apps/kafka-metrics
[7]: https://app.datadoghq.com/dash/integration/50/kafka-zookeeper-and-kafka-consumer-overview
[8]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/attributesprocessor/README.md#includeexclude-filtering
[9]: /opentelemetry/guide/metrics_mapping/#kafka-metrics
