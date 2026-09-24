---
further_reading:
- link: /opentelemetry/collector_exporter/
  tag: 설명서
  text: 오픈 텔레메트리 컬렉터 설정
title: Kafka 메트릭
---
## 개요 {#overview}

{{< img src="/opentelemetry/collector_exporter/kafka_metrics.png" alt="OOTB Kafka 대시보드의 OpenTelemetry Kafka 메트릭" style="width:100%;" >}}

[Kafka카 메트릭 수신기][1], [JMX 수신기][2]/ [JMX 메트릭 수집기][3]를 통해 Kafka 메트릭을 수집하고 즉시 사용 가능한 [Kafka 대시보드][7], "Kafka, Zookeeper 및 Kafka 소비자 개요"에 액세스할 수 있습니다. 

**참고**: [JMX 수신기][2] 및 [JMX 메트릭 수집기][3]를 대체 옵션으로 고려해야 합니다. 이들은 동일한 메트릭 세트를 수집합니다([JMX 수신기][2]가 [JMX 메트릭 수집기][3]를 실행합니다).


## Kafka 메트릭 수신기 {#kafka-metrics-receiver}

{{< tabs >}}
{{% tab "호스트" %}}

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

단일 복제본을 사용하는 `deployment` 모드에서 실행 중인 컬렉터에서 Kafka 메트릭 수신기를 사용하세요. 이렇게 하면 동일한 메트릭이 여러 번 수집되는 것을 방지할 수 있습니다. 컬렉터는 OTLP HTTP를 통해 Datadog으로 메트릭을 직접 내보내거나 다른 컬렉터 인스턴스로 전달할 수 있습니다.

`values.yaml`에 다음 줄을 추가하세요.

```yaml
mode: deployment
```

컬렉터 설정에 다음을 추가합니다.

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

## JMX 수신기 {#jmx-receiver}

{{< tabs >}}
{{% tab "호스트" %}}

JMX 수신기는 다음 요구 사항을 포함합니다.
- JRE는 컬렉터가 실행되는 호스트에서 사용할 수 있습니다.
- JMX 메트릭 수집기 JAR은 컬렉터가 실행되는 호스트에서 사용할 수 있습니다. [opentelemetry-java-contrib 릴리스 페이지][1]에서 JMX 메트릭 수집기 JAR의 최신 릴리스를 다운로드할 수 있습니다.

컬렉터 설정에 다음을 추가합니다.

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

단일 복제본을 사용하는 `deployment` 모드에서 실행 중인 컬렉터에서 JMX 수신기를 사용하세요. 이렇게 하면 동일한 메트릭이 여러 번 수집되는 것을 방지할 수 있습니다. 컬렉터는 OTLP HTTP를 통해 Datadog으로 메트릭을 직접 내보내거나 다른 컬렉터 인스턴스로 전달할 수 있습니다.

JMX 수신기는 다음 요구 사항을 포함합니다.
- JRE는 컬렉터가 실행되는 호스트에서 사용할 수 있습니다.
- JMX 메트릭 수집기 JAR은 컬렉터가 실행되는 호스트에서 사용할 수 있습니다. [여기][1]에서 JMX 메트릭 수집기 JAR의 최신 릴리스를 다운로드할 수 있습니다.

OTel 컬렉터 기본 이미지는 위의 요구 사항을 충족하지 않으므로 사용자 지정 이미지를 빌드해야 합니다. 컬렉터 바이너리, JRE 및 JMX 메트릭 수집기 JAR이 포함된 예시 이미지는 아래 Dockerfile을 참조하세요.

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

`values.yaml`에 다음 줄을 추가하세요.

```yaml
mode: deployment
```

컬렉터 설정에 다음을 추가합니다.

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


## JMX 메트릭 수집기 {#jmx-metrics-gatherer}

{{< tabs >}}
{{% tab "호스트" %}}

JMX 메트릭 수집기는 uber jar로 실행하고 명령줄에서 속성을 사용하여 설정하도록 되어 있습니다. 

컬렉터가 실행되는 호스트에서 JRE를 사용할 수 있는지 확인하세요. 그렇지 않으면 JRE를 다운로드하세요. 예:

```
apt-get update && \
apt-get -y install default-jre-headless
```

이 작업을 완료한 후에는 최신 버전의 JMX 메트릭 Gatherer JAR[여기][1]을 다운로드하고 실행합니다:

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

JMX 메트릭 수집기는 uber jar로 실행하고 명령줄에서 속성을 사용하여 설정하도록 되어 있습니다. 

Kubernetes에 이를 배포하려면 JRE와 JMX 메트릭 수집기 JAR이 포함된 이미지를 빌드해야 합니다. JRE와 JMX 메트릭 수집기 JAR이 포함된 이미지 예시는 아래 Dockerfile을 참조하세요.

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

## 로그 수집 {#log-collection}

[OpenTelemetry 컬렉터 로그 수집][4]을 참조하여 로그를 수집하는 방법에 대한 지침을 확인하세요.

기본 제공 Kafka 대시보드에 표시되려면 Kafka 로그에 `source:kafka` 태그가 지정되어야 합니다. 이를 수행하려면 속성 프로세서를 사용하세요.

```yaml
processors:
  attributes:
    actions:
      - key: ddtags
        value: "source:kafka"
        action: insert
```

이 속성이 Kafka 로그에만 추가되도록 하려면 속성 프로세서의 [포함/제외 필터링][8]을 사용하세요.

## 수집된 데이터 {#data-collected}

### Kafka 메트릭 수신기 {#kafka-metrics-receiver-1}

{{< mapping-table resource="kafkametrics.csv">}}

### JMX 수신기 / JMX 메트릭 수집기 {#jmx-receiver-jmx-metrics-gatherer}

#### Kafka 브로커 {#kafka-broker}

{{< mapping-table resource="kafka.csv">}}

#### Kafka 프로듀서 {#kafka-producer}

{{< mapping-table resource="kafka-producer.csv">}}

#### Kafka 컨슈머 {#kafka-consumer}

{{< mapping-table resource="kafka-consumer.csv">}}

**참고:** Datadog에서 `-`는 `_`으로 변환됩니다. 예를 들어, `kafka.producer.request-rate`가 `kafka.producer.request_rate`로 변환됩니다.

OpenTelemetry와 Datadog 메트릭 이름 간의 전체 매핑은 [OpenTelemetry Metrics Mapping][9]을 참조하세요.

## 로깅 출력 예시 {#example-logging-output}

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

## 앱 예시 {#example-app}

이 문서에서 설명한 구성을 보여주는 다음 [예시 애플리케이션][6]을 참조하세요. 이 예시 애플리케이션은 프로듀서, 컨슈머, 브로커 및 주키퍼 인스턴스로 구성됩니다. 이 애플리케이션은 Kafka 메트릭 수신기, JMX 수신기 및/또는 JMX 메트릭 수집기 사용 방법을 보여줍니다.


[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/kafkametricsreceiver
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/jmxreceiver
[3]: https://github.com/open-telemetry/opentelemetry-java-contrib/blob/main/jmx-metrics 
[4]: /ko/opentelemetry/collector_exporter/log_collection
[6]: https://github.com/DataDog/opentelemetry-examples/tree/main/apps/kafka-metrics
[7]: https://app.datadoghq.com/dash/integration/50/kafka-zookeeper-and-kafka-consumer-overview
[8]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/attributesprocessor/README.md#includeexclude-filtering
[9]: /ko/opentelemetry/guide/metrics_mapping/#kafka-metrics