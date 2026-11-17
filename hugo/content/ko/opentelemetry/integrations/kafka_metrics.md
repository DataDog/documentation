---
further_reading:
- link: /opentelemetry/setup/collector_exporter/
  tag: 문서
  text: OpenTelemetry Collector 설정
title: Kafka 메트릭
---
## 개요 {#overview}

{{< img src="/opentelemetry/collector_exporter/kafka_metrics.png" alt="Kafka Dashboard의 OpenTelemetry Kafka 메트릭" style="width:100%;" >}}

[Kafka metrics receiver][1]와 [JMX Scraper][2]는 기본 제공 [Kafka Dashboard][3]인 **Kafka, Zookeeper, and Kafka Consumer Overview**용 Kafka 메트릭을 수집합니다.

이 둘은 서로 다른 데이터를 수집하며 대부분의 설정에서 둘 다 실행합니다. Kafka metrics receiver는 Kafka admin API를 통해 클러스터 상태를 읽습니다. JMX Scraper는 브로커, 프로듀서 및 컨슈머가 노출하는 JMX 빈을 읽습니다.

## Kafka 메트릭 수신기 {#kafka-metrics-receiver}

`KAFKA_BROKER_ADDRESS` 값을 `host:port` 형식의 브로커 주소로 설정하세요. 둘 이상의 브로커를 나열하려면 주소를 쉼표로 구분하세요.

{{< tabs >}}
{{% tab "호스트" %}}

Collector 구성에 receiver를 추가하세요.

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

메트릭 파이프라인의 `receivers` 목록에 `kafkametrics`을 추가하세요. Collector는 파이프라인에서 사용하는 receiver만 시작합니다. 예를 들어 권장 Host 구성에서는 다음과 같습니다:

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

중복 메트릭을 방지하려면 단일 복제본 Collector 배포에서 Kafka metrics receiver를 실행하세요. Collector는 OTLP HTTP를 통해 Datadog으로 메트릭을 직접 내보내거나 다른 Collector로 전달할 수 있습니다.

`values.yaml`에서 배포 모드를 설정하세요.

```yaml
mode: deployment
```

Collector 구성에 receiver를 추가하세요.

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

동일한 구성의 메트릭 pipeline에 `kafkametrics`을 추가하세요. Collector는 파이프라인에서 사용하는 receiver만 시작합니다. Datadog으로 직접 내보내려면 [권장 설정][101]에 표시된 대로 `otlp_http` 익스포터를 구성하세요.

```yaml
service:
  pipelines:
    metrics:
      receivers: [kafkametrics]
      exporters: [otlp_http]
```

[101]: /ko/opentelemetry/setup/collector_exporter/#otlp-http-exporter

{{% /tab %}}

{{< /tabs >}}

## JMX Scraper {#jmx-scraper}

JMX Scraper는 독립형 Java 애플리케이션으로 실행되며 Collector의 OTLP receiver로 메트릭을 보냅니다.

[권장 Collector 설정][4]은 포트 4317에서 gRPC를 통해 OTLP를 수신하며 메트릭 파이프라인에 OTLP receiver를 포함하므로 receiver 구성을 변경할 필요가 없습니다.

JMX Scraper는 누적 시간성의 카운터를 보냅니다. 권장 메트릭 파이프라인에서 `cumulativetodelta` processor를 유지하세요. 이 processor는 카운터를 [Datadog OTLP 메트릭 수집][8]에 필요한 델타 시간성으로 변환합니다.

### Kafka 브로커 구성 {#configure-kafka-brokers}

1. 평가에 적합한 보안되지 않은 JMX 엔드포인트를 시작하려면 각 Kafka 브로커에 다음 JVM 옵션을 추가하세요.

   ```shell
   -Dcom.sun.management.jmxremote=true
   -Dcom.sun.management.jmxremote.port=9999
   -Dcom.sun.management.jmxremote.rmi.port=9999
   -Dcom.sun.management.jmxremote.local.only=false
   -Dcom.sun.management.jmxremote.authenticate=false
   -Dcom.sun.management.jmxremote.ssl=false
   -Djava.rmi.server.hostname=<BROKER_HOSTNAME_OR_IP>
   ```

   <div class="alert alert-warning">이 옵션들은 JMX 인증 및 TLS를 비활성화합니다. 이 구성은 평가 목적으로만 사용하세요. 프로덕션 환경의 경우 인증 및 TLS를 활성화하고 자격 증명 및 신뢰 저장소 설정으로 스크레이퍼를 구성하세요.</div>

   `jmxremote.authenticate`와 `jmxremote.ssl`의 기본값은 `true`이므로, 이 평가 구성을 위해 두 속성을 모두 명시적으로 설정하세요. 비밀번호 파일이 없으면 인증으로 인해 브로커가 `Password file not found` 오류와 함께 실패합니다. `jmxremote.rmi.port` 값과 `jmxremote.port` 값이 일치하면 RMI 레지스트리가 TLS로 보호되지 않고 포트를 공유할 수 없기 때문에 SSL로 인해 `Port already in use` 오류가 발생합니다.

   프로덕션 환경에서 인증 및 TLS를 활성화하려면 `com.sun.management.jmxremote.registry.ssl=true` 설정을 추가하여 레지스트리와 커넥터가 포트를 공유할 수 있도록 하세요. `otel.jmx.username`, `otel.jmx.password`, `otel.jmx.remote.registry.ssl`, `javax.net.ssl.trustStore` 및 `javax.net.ssl.trustStorePassword` 속성을 사용하여 스크레이퍼를 구성하세요.

2. `java.rmi.server.hostname` 값을 스크레이퍼가 연결에 사용하는 호스트 이름 또는 IP 주소로 설정하세요. 브로커는 이 값을 RMI 스텁에 포함하며, 스크레이퍼는 이에 대한 두 번째 연결을 엽니다.

   - 스크레이퍼가 브로커와 동일한 호스트 또는 포드에서 실행되는 경우에만 루프백 주소를 사용하세요. Confluent Platform을 포함한 여러 Kafka 배포판 및 컨테이너 이미지는 기본적으로 루프백을 사용합니다.
   - `0.0.0.0` 주소를 사용하지 마세요. 이는 바인드 주소이므로 스크레이퍼가 연결할 수 없습니다.
   - Kubernetes에서는 브로커 포드 IP 또는 DNS 이름을 사용하세요.

   Kafka 컨테이너 이미지에서 `KAFKA_JMX_HOSTNAME` 설정은 `java.rmi.server.hostname` 값을 설정합니다. 동일한 주소로 설정하세요.

   연결할 수 없는 주소를 설정해도 초기 연결은 성공할 수 있지만, 이후 스크랩 작업은 `Failed to retrieve RMIServer stub` 또는 `Connection refused to host: <UNREACHABLE_ADDRESS>` 오류로 실패합니다.

3. `jmxremote.rmi.port`에 `jmxremote.port`과 동일한 포트를 설정하세요. 고정된 RMI 포트가 없으면 두 번째 연결은 방화벽이나 포트 매핑에 의해 차단될 수 있는 임의의 포트를 사용합니다.

프로듀서와 컨슈머를 스크랩하려면 해당 애플리케이션에 동일한 JVM 옵션을 추가하세요.

### JMX Scraper 실행 {#run-the-jmx-scraper}

기존 대시보드와 모니터가 예상하는 JVM 메트릭 이름을 유지하려면 `otel.jmx.target.source`의 값을 `legacy`로 설정하세요. 그렇지 않으면 스크레이퍼는 기본적으로 `auto` 값을 사용하며 모든 JVM 메트릭 이름이 변경됩니다.

{{< tabs >}}
{{% tab "호스트" %}}

JMX Scraper를 실행하는 호스트에 JRE를 설치하세요. Debian 또는 Ubuntu에서는 다음을 실행하세요.

```shell
apt-get update && \
apt-get -y install default-jre-headless
```

[OpenTelemetry Java Contrib 릴리스][201]에서 JMX Scraper JAR을 다운로드하세요. 각 주소 변수를 `host:port` 형식으로 설정하세요.

각 스크레이퍼 프로세스는 단일 JMX 엔드포인트를 스크랩합니다. 각 브로커, 프로듀서, 컨슈머에 대해 해당 JVM 주소를 사용하여 프로세스를 하나씩 실행하세요.

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

다음 Dockerfile을 사용하여 JRE와 JMX Scraper JAR이 포함된 이미지를 빌드하세요.

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

`kafka:9999`을 브로커의 JMX 주소로, `otelcol:4317`를 Collector의 OTLP gRPC 엔드포인트로 바꾸세요.

프로듀서나 컨슈머를 스크랩하려면 `otel.jmx.target.system`을 `kafka-producer` 또는 `kafka-consumer`로 설정하고 `otel.jmx.service.url`이 해당 JVM의 JMX 엔드포인트를 가리키도록 하세요.

JMX 엔드포인트당 단일 인스턴스를 실행하세요. 동일한 엔드포인트를 스크랩하는 여러 복제본은 중복된 메트릭을 생성합니다.

{{% /tab %}}

{{< /tabs >}}

## 로그 수집 {#log-collection}

OpenTelemetry Collector로 로그를 수집하려면 [로그 수집][5]을 참조하세요.

기본 제공 Kafka Dashboard에 Kafka 로그를 포함하려면 속성 프로세서를 사용하여 `source:kafka` 태그를 추가하세요.

```yaml
processors:
  attributes:
    actions:
      - key: ddtags
        value: "source:kafka"
        action: insert
```

이 속성을 Kafka 로그에만 추가하려면 속성 프로세서에서 [포함/제외 필터링][6]을 사용하세요.

## 수집되는 데이터 {#data-collected}

### Kafka 메트릭 수신기 {#kafka-metrics-receiver-1}

{{< mapping-table resource="kafkametrics.csv">}}

### JMX Scraper {#jmx-scraper-1}

#### Kafka 브로커 {#kafka-broker}

{{< mapping-table resource="kafka.csv">}}

#### Kafka 프로듀서 {#kafka-producer}

{{< mapping-table resource="kafka-producer.csv">}}

#### Kafka 컨슈머 {#kafka-consumer}

{{< mapping-table resource="kafka-consumer.csv">}}

**참고**: Datadog은 메트릭 이름의 하이픈(`-`)을 밑줄(`_`)로 바꿉니다. 예를 들어, `kafka.producer.request-rate`가 `kafka.producer.request_rate`로 변환됩니다.

OpenTelemetry와 Datadog 메트릭 이름 간의 전체 매핑은 [OpenTelemetry Metrics Mapping][7]을 참조하세요.

## 로깅 출력 예시 {#example-logging-output}

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
[4]: /ko/opentelemetry/setup/collector_exporter/
[5]: /ko/opentelemetry/config/log_collection
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/attributesprocessor/README.md#includeexclude-filtering
[7]: /ko/opentelemetry/mapping/metrics_mapping/
[8]: /ko/opentelemetry/setup/otlp_ingest/metrics/#ensure-only-delta-metrics-are-sent