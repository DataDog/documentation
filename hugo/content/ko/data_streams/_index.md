---
aliases:
- /ko/data_streams/troubleshooting
- /ko/data_streams/data_pipeline_lineage
- /ko/data_streams/business_transaction_tracking
cascade:
  algolia:
    rank: 70
further_reading:
- link: /integrations/kafka/
  tag: 문서
  text: Kafka 통합
- link: /integrations/amazon_sqs/
  tag: 문서
  text: Amazon SQS 통합
- link: /internal_developer_portal/catalog/
  tag: 문서
  text: Catalog
- link: https://learn.datadoghq.com/courses/monitor-a-kafka-pipeline-with-dsm
  tag: 학습 센터
  text: Data Streams Monitoring으로 Kafka 파이프라인 모니터링하기
- link: https://www.datadoghq.com/blog/data-streams-monitoring/
  tag: 블로그
  text: Datadog Data Streams Monitoring을 통해 스트리밍 데이터 파이프라인의 성능을 추적하고 향상하세요.
- link: https://www.datadoghq.com/blog/data-streams-monitoring-apm-integration/
  tag: 블로그
  text: 애플리케이션 성능 모니터링(APM)과 Datadog Data Streams Monitoring을 통해 바로 스트리밍 데이터 파이프라인
    문제 해결하기
- link: https://www.datadoghq.com/blog/data-streams-monitoring-sqs/
  tag: 블로그
  text: Data Streams Monitoring으로 SQS 모니터링하기
- link: https://www.datadoghq.com/blog/confluent-connector-dsm-autodiscovery/
  tag: 블로그
  text: Confluent Cloud 커넥터를 자동 탐지하고 Data Streams Monitoring에서 쉽게 성능 모니터링하기
- link: https://www.datadoghq.com/blog/data-observability/
  tag: 블로그
  text: Datadog Data Observability로 전체 데이터 수명 주기 전반의 신뢰성 보장하기
- link: https://www.datadoghq.com/blog/data-pipeline-monitoring/
  tag: 블로그
  text: '데이터 파이프라인 모니터링 기초: 데이터 스택 전반의 상태 및 성능 추적하기'
- link: https://www.datadoghq.com/blog/kafka-console/
  tag: 블로그
  text: Kafka 콘솔을 사용하여 스택의 모든 계층에서 발생하는 Kafka 문제 해결하기
- link: https://www.datadoghq.com/architecture/monitoring-financial-data-mesh-on-aws-using-datadog/
  tag: 아키텍처 센터
  text: Datadog으로 AWS의 금융 데이터 메시 모니터링하기
- link: https://www.datadoghq.com/architecture/observability-in-event-driven-architecture/
  tag: 아키텍처 센터
  text: 이벤트 기반 아키텍처의 관측 가능성
title: Data Streams Monitoring
---
{{< img src="data_streams/map_view2.png" alt="Map 보기가 표시된 Datadog의 Data Streams Monitoring 페이지. 'authenticator'라는 서비스를 강조 표시합니다. 왼쪽에서 오른쪽으로 흐르는 데이터를 보여주는 토폴로지 맵 시각화로, 중앙에 authenticator 서비스가 업스트림 및 다운스트림 서비스와 대기열과 함께 표시됩니다." style="width:100%;" >}}

Data Streams Monitoring은 팀이 대규모 파이프라인을 이해하고 관리할 수 있도록 표준화된 메서드를 제공합니다. 다음 작업을 지원합니다.
* 시스템 전반을 통과하는 이벤트의 엔드투엔드 지연 시간을 통해 파이프라인 상태를 측정합니다.
* 문제가 있는 프로듀서, 컨슈머 또는 대기열을 정확히 파악한 후 관련 로그나 클러스터로 전환하여 더 빠르게 문제를 해결합니다.
* 서비스 소유자가 밀려 있는 이벤트로 인해 다운스트림 서비스에 과부하가 발생하지 않도록 대응할 수 있게 하여 연쇄적인 지연을 방지합니다.

### 지원되는 언어 및 기술 {#supported-languages-and-technologies}

Data Streams Monitoring은 Kafka _클라이언트_(컨슈머/프로듀서)를 계측합니다. 클라이언트 인프라를 계측할 수 있다면 Data Streams Monitoring을 사용할 수 있습니다.

|   | Java | Python | .NET | Node.js | Go | Ruby |
| - | ---- | ------ | ---- | ------- | -- | ---- |
| Apache Kafka <br/>(자체 호스팅, Amazon MSK, Confluent Cloud 또는 기타 호스팅 플랫폼) | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| Amazon Kinesis | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | | |
| Amazon SNS | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | | |
| Amazon SQS | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | | |
| Azure Service Bus | | | {{< X >}} | | | |
| Google Pub/Sub | {{< X >}} | {{< X >}} | | {{< X >}} | | |
| IBM MQ | {{< X >}} | | {{< X >}} | | | |
| RabbitMQ | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | | |

Data Streams Monitoring을 사용하려면 최소 Datadog SDK 버전 요구 사항을 충족해야 합니다. 자세한 내용은 각 설정 페이지를 참조하세요.

#### OpenTelemetry 지원 {#support-for-opentelemetry}
Data Streams Monitoring은 OpenTelemetry를 지원합니다. Datadog APM을 OpenTelemetry와 함께 작동하도록 설정했다면, Data Streams Monitoring을 사용하기 위해 추가 설정이 필요하지 않습니다. [OpenTelemetry 호환성][11]을 참조하세요.

## 설정 {#setup}

### 언어별 {#by-language}

{{< card-grid card_width="200px" >}}
  {{< image-card href="/data_streams/java/" src="integrations_logos/java.png" alt="java" >}}
  {{< image-card href="/data_streams/python" src="integrations_logos/python.png" alt="Python" >}}
  {{< image-card href="/data_streams/dotnet/" src="integrations_logos/dotnet_text.png" alt=".NET" >}}
  {{< image-card href="/data_streams/nodejs/" src="integrations_logos/node.png" alt="Node" >}}
  {{< image-card href="/data_streams/go" src="integrations_logos/go-metro.png" alt="Go" >}}
  {{< image-card href="/data_streams/ruby" src="integrations_logos/ruby.png" alt="Ruby" >}}
{{< /card-grid >}}


### 기술별 {#by-technology}

{{< card-grid card_width="200px" >}}
  {{< image-card href="/data_streams/setup/technologies/kafka/" src="integrations_logos/kafka.png" alt="Kafka" >}}
  {{< image-card href="/data_streams/setup/technologies/sqs/" src="integrations_logos/sqs.png" alt="Amazon SQS" >}}
  {{< image-card href="/data_streams/setup/technologies/rabbitmq/" src="integrations_logos/rabbitmq.png" alt="RabbitMQ" >}}
  {{< image-card href="/data_streams/setup/technologies/sns/" src="integrations_logos/amazon_sns.png" alt="Amazon SNS" >}}
  {{< image-card href="/data_streams/setup/technologies/kinesis/" src="integrations_logos/amazon_kinesis.png" alt="Kinesis" >}}
  {{< image-card href="/data_streams/setup/technologies/google_pubsub/" src="integrations_logos/google_cloud_pubsub.png" alt="Google Cloud Pub/Sub" >}}
  {{< image-card href="/data_streams/setup/technologies/ibm_mq/" src="integrations_logos/ibm_mq.png" alt="IBM MQ" >}}
  {{< image-card href="/data_streams/setup/technologies/azure_service_bus/" src="integrations_logos/azure_service_bus.png" alt="Azure Service Bus" >}}
  {{< image-card href="/data_streams/setup/technologies/bullmq/" src="integrations_logos/bullmq2.png" alt="BullMQ" >}}
{{< /card-grid >}}

## Data Streams Monitoring 살펴보기 {#explore-data-streams-monitoring}

### 스트리밍 데이터 파이프라인 아키텍처 시각화 {#visualize-the-architecture-of-your-streaming-data-pipelines}

{{< img src="data_streams/topology_map.png" alt="DSM 토폴로지 맵 시각화 " style="width:100%;" >}}

Data Streams Monitoring은 기본 제공 [토폴로지 맵][10]을 제공하므로 파이프라인 전체의 데이터 흐름을 시각화하고 생산자/소비자 서비스, 대기열 종속성, 서비스 소유권 및 주요 상태 메트릭을 식별할 수 있습니다.

### 새로운 메트릭을 사용한 엔드투엔드 파이프라인 상태 측정 {#measure-end-to-end-pipeline-health-with-new-metrics}

Data Streams Monitoring을 사용하면 비동기 시스템의 두 지점 사이를 이벤트가 이동하는 데 걸리는 시간을 측정할 수 있습니다

| 메트릭 이름 | 주요 태그 | 설명 |
|---|---|-----|
| data_streams.latency | `start`, `end`, `env` | 특정 소스에서 목적지 서비스까지 경로의 엔드투엔드 지연 시간 |
| data_streams.kafka.lag_seconds | `consumer_group`, `partition`, `topic`, `env` | 프로듀서와 컨슈머 간 지연 시간(초) Java Agent v1.9.0 이상이 필요합니다. |
| data_streams.payload_size | `consumer_group`, `topic`, `env` | 바이트 단위의 인바운드 및 아웃바운드 처리량|


또한 대시보드 또는 노트북에서 이러한 메트릭을 그래프화 및 시각화할 수 있습니다.

{{< img src="data_streams/data_streams_metric_monitor.png" alt="Datadog Data Streams Monitoring 모니터" style="width:100%;" >}}

### 모든 경로의 엔드투엔드 지연 시간 모니터링 {#monitor-end-to-end-latency-of-any-pathway}

이벤트가 시스템을 통과하는 방식에 따라, 서로 다른 경로가 지연 시간 증가로 이어질 수 있습니다. [{{< ui >}}Measure{{< /ui >}} 탭][7]을 사용하면 시작 서비스와 종료 서비스를 선택하여 엔드투엔드 지연 시간 정보를 확인하고 병목 현상을 파악하며 성능을 최적화할 수 있습니다. 해당 경로에 대한 모니터를 쉽게 생성하거나 대시보드로 내보낼 수 있습니다.

또는 서비스를 클릭하여 상세 사이드 패널을 열고 {{< ui >}}Pathways{{< /ui >}} 탭에서 해당 서비스와 업스트림 서비스 간의 지연 시간을 확인하세요.

### 이벤트 기반 애플리케이션의 속도 저하에 대한 경보 {#alert-on-slowdowns-in-event-driven-applications}

높은 컨슈머 지연이나 오래된 메시지로 인한 속도 저하는 연쇄 장애를 일으키고 가동 중지 시간을 늘릴 수 있습니다. 기본 제공 경보를 사용하면 파이프라인에서 병목 현상이 발생하는 위치를 정확히 파악하고 즉시 대응할 수 있습니다. 보조 메트릭을 위해 Datadog은 [Kafka][4] 및 [SQS][5]와 같은 메시지 큐 기술에 대한 추가 통합을 제공합니다.

Data Stream Monitoring의 기본 제공 모니터 템플릿을 사용하면 소비자 지연, 처리량, 대기 시간과 같은 메트릭에 대한 모니터를 클릭 한 번으로 설정할 수 있습니다.

{{< img src="data_streams/add_monitors_and_synthetic_tests.png" alt="Datadog Data Streams Monitoring 모니터 템플릿" style="width:100%;" caption="'Add Monitors and Synthetic Tests'를 클릭하여 모니터 템플릿을 확인하세요." >}}

### 수신 메시지를 대기열, 서비스 또는 클러스터와 연결 {#attribute-incoming-messages-to-any-queue-service-or-cluster}

CPU 사용량이 많은 서비스의 높은 지연, Kafka 브로커에서 증가된 리소스 사용, 증가된 RabbitMQ 또는 Amazon SQS 대기열 크기는 이러한 엔터티에서 소비되거나 생산되는 근접 서비스의 변경 사항으로 자주 설명됩니다.

Data Streams Monitoring에서 서비스나 대기열의 {{< ui >}}Throughput{{< /ui >}} 탭을 클릭하면 처리량 변화와 이러한 변화가 발생한 업스트림 또는 다운스트림 서비스를 빠르게 탐지할 수 있습니다. [Catalog][2]가 구성되면 즉시 해당 팀의 Slack 채널이나 온콜 엔지니어로 전환할 수 있습니다.

단일 Kafka, RabbitMQ 또는 Amazon SQS 클러스터에 필터링하여 해당 클러스터에서 실행되는 모든 탐지된 주제나 대기열의 수신 또는 발신 트래픽의 변경 사항을 탐지할 수 있습니다.

### 인프라, 로그 또는 트레이스의 근본 원인으로 빠르게 전환하여 파악 {#quickly-pivot-to-identify-root-causes-in-infrastructure-logs-or-traces}

Datadog은 [Unified Service Tagging][3]을 통해 서비스를 구동하는 인프라와 관련 로그를 자동으로 연결하므로 병목 현상을 쉽게 파악할 수 있습니다. {{< ui >}}Infra{{< /ui >}}, {{< ui >}}Logs{{< /ui >}} 또는 {{< ui >}}Traces{{< /ui >}} 탭을 클릭하여 경로 지연 시간이나 컨슈머 지연이 증가한 원인을 추가로 조사하세요.

### 커넥터 처리량 및 상태 모니터링 {#monitor-connector-throughput-and-status}
{{< img src="data_streams/connectors_topology.png" alt="'analytics-sink'라는 커넥터를 보여주는 DSM 토폴로지 맵 시각화 결과는 커넥터 상태가 FAILED임을 나타냅니다." style="width:100%;" >}}

Datadog은 관리형 [Confluent Cloud][8] 커넥터를 자동으로 탐지하고 Data Streams Monitoring 토폴로지 맵에 시각화할 수 있습니다. [Confluent Cloud integration][9]을 설치하고 구성하여 처리량, 상태 및 토픽 종속성을 포함한 Confluent Cloud 커넥터 정보를 수집하세요.

## 문제 해결 {#troubleshooting}

### 엔드투엔드 지연 시간 메트릭이 정확하지 않음 {#end-to-end-latency-metric-doesnt-look-accurate}

경로의 지연 시간을 계산하려면 단일 스레드 메시지 처리가 필요합니다. 파이프라인의 메시지가 여러 스레드를 사용하는 경우 수동 계측을 추가하세요. 수동 계측은 [Go][12] 및 [Java][13] 애플리케이션에서 사용할 수 있습니다. 다른 언어의 경우 [수동 계측 가이드][14]를 참조하세요. .NET 수동 계측에 대해서는 [지원팀][15]에 문의하세요.

Pathways 탭에서 정확한 지연 시간 값을 얻기 위해 수동 계측이 필요한 경로에는 **이러한 경로의 지연 시간 값은 근사치일 수 있습니다**라는 메시지가 표시됩니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/data_streams/go#manual-instrumentation
[2]: /ko/internal_developer_portal/catalog/
[3]: /ko/getting_started/tagging/unified_service_tagging
[4]: /ko/integrations/kafka/
[5]: /ko/integrations/amazon_sqs/
[6]: /ko/tracing/trace_collection/runtime_config/
[7]: https://app.datadoghq.com/data-streams/measure
[8]: https://www.confluent.io/confluent-cloud/
[9]: /ko/integrations/confluent_cloud/
[10]: https://app.datadoghq.com/data-streams/map
[11]: /ko/opentelemetry/compatibility
[12]: /ko/data_streams/go#manual-instrumentation
[13]: /ko/data_streams/java#manual-instrumentation
[14]: /ko/data_streams/manual_instrumentation/
[15]: /ko/help/