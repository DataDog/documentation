---
further_reading:
- link: /opentelemetry/collector_exporter/
  tag: 설명서
  text: 오픈 텔레메트리 설정 컬렉터(Collector)
title: Kafka 메트릭
---

<div class="alert alert-danger">
OTel Kafka 메트릭 리매핑은 공개 알파 버전입니다. 컬렉터(Collector) 0.93.0 이상 버전에서 사용할 수 있습니다. 이와 관련된 피드백이 있으면 계정 팀에 연락하여 의견을 제시해 주세요.
</div>


## 개요

{{< img src="/opentelemetry/collector_exporter/kafka_metrics.png" alt="OOTB Kafka 대시보드의 OpenTelemetry Kafka <txprotected>메트릭" style="width:100%;" >}}

Kafka카 메트릭 수신기][1], [JMX 수신기][2]/ [JMX 메트릭 수집기][3]를 통해 Kafka 메트릭를 수집하고 즉시 사용 가능한 [Kafka 대시보드][7], "Kafka, Zookeeper 및 Kafka 소비자 개요"에 액세스할 수 있습니다. 

JMX 리시버][2]와 [JMX 메트릭 개더][3]를 대체품으로 고려해야 한다는 점에 유의하세요. 이들은 동일한 메트릭 세트를 수집합니다([JMX 수신기][2]는 [JMX 메트릭 수집기][3]를 실행).


## Kafka 메트릭 수신기

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

Kafka 메트릭 수신기는 단일 복제본이 있는 `deployment` 모드의 컬렉터(Collector) 에서 사용해야 합니다. 이렇게 하면 동일한 메트릭이 여러 번 수집되지 않습니다. 그런 다음 배포 모드의 컬렉터는 Datadog 내보내기를 활용하여 메트릭을 Datadog로 직접 내보내거나 OTLP 내보내기를 활용하여 메트릭을 다른 컬렉터 인스턴스로 전달할 수 있습니다. 

`values.yaml` 에 다음 줄을 추가합니다:
```yaml
mode: deployment
```

컬렉터(Collector) 설정 에 다음을 추가합니다:

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

## JMX 수신기

{{< tabs >}}
{{% tab "Host" %}}

JMX 수신기는 다음 요구 사항을 포함합니다.
- JRE는 컬렉터(Collector)가 실행되는 호스팅에서 사용할 수 있습니다.
- JMX 메트릭 Gatherer JAR은 컬렉터(Collector)를 실행하는 호스트에서 사용할 수 있으며, [opentelemetry-java-contrib releases page][1]에서 최신 릴리스인 JMX 메트릭 Gatherer JAR을 다운로드할 수 있습니다.

컬렉터(Collector) 설정 에 다음을 추가합니다:

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

JMX 수신기는 단일 복제본이 있는 `deployment` 모드의 컬렉터에서 사용해야 합니다. 이렇게 하면 동일한 메트릭 이 여러 번 수집되지 않습니다. 그런 다음 배포 모드의 컬렉터는 Datadog 내보내기를 활용하여 메트릭을 Datadog 로 직접 내보내거나 OTLP 내보내기를 활용하여 메트릭을 다른 컬렉터(Collector) 인스턴스로 전달할 수 있습니다. 

JMX 수신기는 다음 요구 사항을 포함합니다.
- JRE는 컬렉터가 실행되는 호스트에서 사용할 수 있습니다.
- JMX 메트릭 Gatherer JAR은 컬렉터를 실행하는 호스트에서 사용할 수 있으며, 최신 버전의 JMX 메트릭 Gatherer JAR은 [여기][1]에서 다운로드할 수 있습니다.

OTel 컬렉터 기본 이미지는 위의 요구 사항을 충족하지 않으므로 커스텀 이미지를 빌드해야 합니다. 컬렉터 바이너리, JRE 및 JMX 메트릭 수집기 항아리가 포함된 예제 이미지는 아래 도커 파일을 참조하세요.

Dockerfile:
```Dockerfile
FROM alpine:latest as prep

# OpenTelemetry 컬렉터 바이너리
ARG OTEL_VERSION=0.92.0
ARG TARGETARCH=linux_amd64
ADD "https://github.com/open-telemetry/opentelemetry-collector-releases/releases/download/v${OTEL_VERSION}/otelcol-contrib_${OTEL_VERSION}_${TARGETARCH}.tar.gz" /otelcontribcol
RUN tar -zxvf /otelcontribcol

# JMX 메트릭 Gatherer Jar
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

`values.yaml` 에 다음 줄을 추가합니다:
```yaml
mode: deployment
```

컬렉터(Collector) 설정 에 다음을 추가합니다:

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


## JMX 메트릭 수집기

{{< tabs >}}
{{% tab "Host" %}}

JMX 메트릭 수집기는 uber jar로 실행하고 명령줄에서 속성을 사용하여 설정하도록 되어 있습니다. 

컬렉터(Collector)를 실행하는 호스트에서 JRE를 사용할 수 있는지 확인하세요. 그렇지 않은 경우 다운로드하세요.
```
apt-get update && \
apt-get -y install default-jre-headless
```

이 작업을 완료한 후에는 최신 버전의 JMX 메트릭 Gatherer JAR[여기][1]을 다운로드하고 실행합니다:
```
// Kafka 브로커
java -jar -Dotel.jmx.service.url=service:jmx:rmi:///jndi/rmi://{KAFKA_BROKER_JMX_ADDRESS}/jmxrmi \ -Dotel.jmx.target.system=kafka,jvm \
-Dotel.metrics.exporter=otlp \
-Dotel.exporter.otlp.endpoint=http://localhost:4317 \
-jar /path/to/opentelemetry-jmx-metrics.jar

// Kafka 생산자
java -jar -Dotel.jmx.service.url=service:jmx:rmi:///jndi/rmi://{KAFKA_PRODUCER_JMX_ADDRESS}/jmxrmi \ -Dotel.jmx.target.system=kafka-producer \
-Dotel.metrics.exporter=otlp \
-Dotel.exporter.otlp.endpoint=http://localhost:4317 \
-jar /path/to/opentelemetry-jmx-metrics.jar

// Kafka 소비자
java -jar -Dotel.jmx.service.url=service:jmx:rmi:///jndi/rmi://{KAFKA_CONSUMER_JMX_ADDRESS}/jmxrmi \ -Dotel.jmx.target.system=kafka-consumer \
-Dotel.metrics.exporter=otlp \
-Dotel.exporter.otlp.endpoint=http://localhost:4317 \
-jar /path/to/opentelemetry-jmx-metrics.jar
```

[1]: https://github.com/open-telemetry/opentelemetry-java-contrib/releases

{{% /tab %}}

{{% tab "Kubernetes" %}}

JMX 메트릭 수집기는 uber jar로 실행하고 명령줄에서 속성을 사용하여 설정하도록 되어 있습니다. 

쿠버네티스(Kubernetes)에 배포하려면 JRE와 JMX 메트릭 Gatherer Jar가 포함된 이미지를 빌드해야 합니다. JRE와 JMX 메트릭 Gatherer Jar가 포함된 이미지 예시는 아래 도커 파일을 참조하세요.

Dockerfile:
```Dockerfile
FROM alpine:latest as prep

# JMX 메트릭 Gatherer Jar
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

## 로그 수집

[OpenTelemetry 컬렉터 로그 수집][4]을 참조하여 로그를 수집하는 방법에 대한 지침을 확인하세요,

즉시 사용 가능한 Kafka 대시보드에 표시하려면 Kafka 로그에 `source:kafka` 태그를 지정해야 합니다. 이렇게 하려면 속성 프로세서를 사용하세요.

```yaml
processors:
  attributes:
    actions:
      - key: ddtags
        value: "source:kafka"
        action: insert
```

이 속성이 Kafka 로그에만 추가되도록 하려면 속성 프로세서의 [포함/제외 필터링][8]을 사용하세요.

## 수집한 데이터

수집된 카프카 메트릭에 대한 정보는 [OpenTelemetry 메트릭 매핑][9]을 참조하세요.



## 전체 예제 설정

Datadog 내보내기를 사용한 전체 작업 예제 설정은 [`kafka.yaml`][5]를 참조하세요.

## 로깅 출력 예시

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

## 앱 예시

이 문서에서 설명하는 설정을 보여주는 다음 [예제 애플리케이션][6]을 참조하세요. 이 예제 애플리케이션은 생산자, 소비자, 브로커, 주키퍼(zookeeper) 인스턴스로 구성되어 있습니다. 이 예시에서는 Kafka 메트릭 수신기, JMX 수신기 및/또는 JMX 메트릭 수집기를 사용하는 것을 보여줍니다.


[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/kafkametricsreceiver
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/jmxreceiver
[3]: https://github.com/open-telemetry/opentelemetry-java-contrib/blob/main/jmx-metrics 
[4]: /ko/opentelemetry/collector_exporter/log_collection
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/kafka.yaml
[6]: https://github.com/DataDog/opentelemetry-examples/tree/main/apps/kafka-metrics
[7]: https://app.datadoghq.com/dash/integration/50/kafka-zookeeper-and-kafka-consumer-overview
[8]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/attributesprocessor/README.md#includeexclude-filtering
[9]: /ko/opentelemetry/guide/metrics_mapping/#kafka-metrics