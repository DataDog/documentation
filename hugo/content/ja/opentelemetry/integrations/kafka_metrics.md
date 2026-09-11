---
further_reading:
- link: /opentelemetry/collector_exporter/
  tag: ドキュメント
  text: OpenTelemetry Collector のセットアップ
title: Kafka メトリクス
---

<div class="alert alert-danger">
OTel Kafka Metrics Remapping は公開アルファ版です。コレクターのバージョン >= 0.93.0 で利用可能です。これに関連するフィードバックがある場合は、アカウントチームに連絡して意見を提供してください。
</div>


## 概要

{{< img src="/opentelemetry/collector_exporter/kafka_metrics.png" alt="OOTB Kafka ダッシュボードの OpenTelemetry Kafka メトリクス" style="width:100%;" >}}

[Kafka メトリクスレシーバー][1]、[JMX Receiver][2]/ [JMX Metrics Gatherer][3] を使用すると、Kafka メトリクスを収集し、すぐに使える Kafka Dashboard "Kafka, Zookeeper and Kafka Consumer Overview" にアクセスできます。

[JMX Receiver][2] と [JMX Metrics Gatherer][3] は代用品とお考えください。これらは同じメトリクスセットを収集します ([JMX Receiver][2] は [JMX Metrics Gatherer][3] を起動します)。


## Kafka メトリクスレシーバー

{{< tabs >}}
{{% tab "ホスト" %}}

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

Kafka メトリクスレシーバーは、単一のレプリカを持つ `deployment` モードのコレクターで使用する必要があります。これにより、同じメトリクスが複数回収集されることはありません。デプロイメントモードのコレクターは、Datadog Exporter を活用してメトリクスを直接 Datadog にエクスポートしたり、OTLP エクスポーターを活用してメトリクスを別のコレクターインスタンスに転送したりできます。

以下の行を `values.yaml` に追加します。
```yaml
mode: deployment
```

Collector 構成に以下を追加します。

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

## JMX Receiver

{{< tabs >}}
{{% tab "ホスト" %}}

JMX Receiver には以下の要件があります。
- コレクターを実行しているホストで JRE が使用可能であること。
- コレクターを実行しているホストで JMX Metric Gatherer JAR が使用可能であること。JMX Metric Gatherer JAR の最新リリースは、[opentelemetry-java-contrib リリースページ][1]からダウンロードできます。

Collector 構成に以下を追加します。

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

JMX Receiver は、単一のレプリカを持つ `deployment` モードのコレクターで使用する必要があります。これにより、同じメトリクスが複数回収集されることはありません。デプロイメントモードのコレクターは、Datadog Exporter を活用してメトリクスを直接 Datadog にエクスポートしたり、OTLP エクスポーターを活用してメトリクスを別のコレクターインスタンスに転送したりできます。

JMX Receiver には以下の要件があります。
- コレクターを実行しているホストで JRE が使用可能であること。
- コレクターを実行しているホストで JMX Metric Gatherer JAR が利用可能であること。JMX Metric Gatherer JAR の最新リリースは、[こちら][1]でダウンロードできます。

OTel コレクターのデフォルトイメージは上記の要件を満たさないため、カスタムイメージをビルドする必要があります。コレクターのバイナリ、JRE、JMX Metrics Gatherer JAR を含むイメージの例については、以下の Dockerfile を参照してください。

Dockerfile:
```Dockerfile
FROM alpine:latest as prep

# OpenTelemetry コレクターのバイナリ
ARG OTEL_VERSION=0.92.0
ARG TARGETARCH=linux_amd64
ADD "https://github.com/open-telemetry/opentelemetry-collector-releases/releases/download/v${OTEL_VERSION}/otelcol-contrib_${OTEL_VERSION}_${TARGETARCH}.tar.gz" /otelcontribcol
RUN tar -zxvf /otelcontribcol

# JMX Metrics Gatherer Jar
ARG JMX_GATHERER_JAR_VERSION=1.27.0
ADD https://github.com/open-telemetry/opentelemetry-java-contrib/releases/download/v${JMX_GATHERER_JAR_VERSION}/opentelemetry-jmx-metrics.jar /opt/opentelemetry-jmx-metrics.jar
# 非 root ユーザーの ID (https://groups.google.com/g/distroless-users/c/-DpzCr7xRDY/m/eQqJmJroCgAJ)
ARG USER_UID=65532
RUN chown ${USER_UID} /opt/opentelemetry-jmx-metrics.jar


FROM gcr.io/distroless/java17-debian11:nonroot

COPY --from=prep /opt/opentelemetry-jmx-metrics.jar /opt/opentelemetry-jmx-metrics.jar
COPY --from=prep /otelcol-contrib /otelcol-contrib

EXPOSE 4317 55680 55679
ENTRYPOINT ["/otelcol-contrib"]
CMD ["--config", "/etc/otelcol-contrib/config.yaml"]
```

以下の行を `values.yaml` に追加します。
```yaml
mode: deployment
```

Collector 構成に以下を追加します。

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
{{% tab "ホスト" %}}

JMX Metric Gatherer は、uber jar として実行し、コマンドラインからプロパティを構成することを目的としています。

コレクターを実行するホストで JRE が使用可能であることを確認してください。JRE がない場合は、必ずダウンロードしてください。例:
```
apt-get update && \
apt-get -y install default-jre-headless
```

これが完了したら、JMX Metric Gatherer JAR の最新リリースを[こちら][1]でダウンロードして、以下を実行してください。
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

JMX Metric Gatherer は、uber jar として実行し、コマンドラインからプロパティを構成することを目的としています。

これを Kubernetes でデプロイするには、JRE と JMX Metrics Gatherer Jar を含むイメージをビルドする必要があります。JRE と JMX Metrics Gatherer Jar を含むイメージの例については、以下の Dockerfile を参照してください。

Dockerfile:
```Dockerfile
FROM alpine:latest as prep

# JMX Metrics Gatherer Jar
ARG JMX_GATHERER_JAR_VERSION=1.27.0
ADD https://github.com/open-telemetry/opentelemetry-java-contrib/releases/download/v${JMX_GATHERER_JAR_VERSION}/opentelemetry-jmx-metrics.jar /opt/opentelemetry-jmx-metrics.jar
# 非 root ユーザー ID (https://groups.google.com/g/distroless-users/c/-DpzCr7xRDY/m/eQqJmJroCgAJ)
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

## 収集データ

OpenTelemetry Collector を使用してログを収集する方法については、[ログ収集][4]を参照してください。

すぐに使える Kafka ダッシュボードに表示するには、Kafka ログに `source:kafka` タグを付ける必要があります。これを行うには、属性プロセッサーを使用します。

```yaml
processors:
  attributes:
    actions:
      - key: ddtags
        value: "source:kafka"
        action: insert
```

この属性のみが Kafka ログに追加されるようにするには、属性プロセッサーの[包含/除外フィルター][8]を使用します。

## データ収集

収集した Kafka メトリクスについては、[OpenTelemetry Metrics Mapping][9] を参照してください。



## 完全な構成例

Datadog エクスポーターを使用した完全な構成例については、[`kafka.yaml`][5] を参照してください。

## ログ出力例

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

## アプリ例

このドキュメントで説明する構成を次の[アプリケーション例][6]で示します。このサンプルアプリケーションは、プロデューサー、コンシューマー、ブローカー、および zookeeper インスタンスで構成されています。Kafka メトリクスレシーバー、JMX Receiver、JMX Metrics Gatherer の使用例を示しています。


[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/kafkametricsreceiver
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/jmxreceiver
[3]: https://github.com/open-telemetry/opentelemetry-java-contrib/blob/main/jmx-metrics 
[4]: /ja/opentelemetry/collector_exporter/log_collection
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/kafka.yaml
[6]: https://github.com/DataDog/opentelemetry-examples/tree/main/apps/kafka-metrics
[7]: https://app.datadoghq.com/dash/integration/50/kafka-zookeeper-and-kafka-consumer-overview
[8]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/attributesprocessor/README.md#includeexclude-filtering
[9]: /ja/opentelemetry/guide/metrics_mapping/#kafka-metrics