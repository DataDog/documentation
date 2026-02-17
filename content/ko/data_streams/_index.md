---
aliases:
- /ko/data_streams/troubleshooting
cascade:
  algolia:
    rank: 70
further_reading:
- link: /integrations/kafka/
  tag: 설명서
  text: Kafka 통합
- link: /integrations/amazon_sqs/
  tag: 설명서
  text: Amazon SQS 통합
- link: /tracing/software_catalog/
  tag: 설명서
  text: 소프트웨어 카탈로그
- link: https://www.datadoghq.com/blog/data-streams-monitoring/
  tag: 블로그
  text: Datadog 데이터 스트림 모니터링을 통해 스트리밍 데이터 파이프라인의 성능을 추적하고 향상하세요.
- link: https://www.datadoghq.com/blog/data-streams-monitoring-apm-integration/
  tag: 블로그
  text: 애플리케이션 성능 모니터링(APM)과 Datadog 데이터 스트림 모니터링을 통해 바로 스트리밍 데이터 파이프라인 트러블 슈팅
- link: https://www.datadoghq.com/blog/data-streams-monitoring-sqs/
  tag: 블로그
  text: 데이터 스트림 모니터링으로 SQS 모니터링
- link: https://www.datadoghq.com/blog/confluent-connector-dsm-autodiscovery/
  tag: 블로그
  text: Confluent Cloud 커넥터를 자동 탐지하고 데이터 스트림 모니터링에서 쉽게 성능 모니터링하기
title: 데이터 스트림 모니터링
---


{{% site-region region="gov" %}}
<div class="alert alert-danger">
   데이터 스트림 모니터링은 {{< region-param key="dd_site_name" >}} 사이트에서 이용할 수 없습니다.
</div>
{{% /site-region %}}

{{< img src="data_streams/map_view2.png" alt="Datadog의 Data Streams Monitoring 페이지에서 Map 뷰를 보여줍니다. 'authenticator'라는 서비스를 강조 표시합니다. 왼쪽에서 오른쪽으로 흐르는 데이터 흐름의 토폴로지 맵 시각화로, 중앙에 authenticator 서비스가 표시되고, 업스트림 및 다운스트림 서비스와 큐가 표시됩니다." style="width:100%;" >}}

데이터 스트림 모니터링은 팀이 대규모 파이프라인을 이해하고 관리할 수 있도록 표준화된 메서드를 제공합니다. 다음 작업을 지원합니다.
* 시스템 전반의 이벤트에 대한 엔드투엔드 지연을 통해 파이프라인 상태 측정
* 잘못된 생산자, 소비자 또는 대기열을 파악하고 관련 로그와 클러스터에 전송해 더 빠른 트러블슈팅을 가능케 합니다.
* 서비스 소유자가 다운스트림 서비스를 저해하는 백업 이벤트를 생산하지 않도록 하여 연이은 지연을 방지합니다.

## 설정

Data Streams Monitoring은 Kafka _클라이언트_(소비자/생산자)를 계측합니다. 클라이언트 인프라스트럭처를 계측할 수 있다면 Data Streams Monitoring을 사용할 수 있습니다.

설치 지침과 지원되는 기술 목록을 보려면 언어를 선택하세요.

{{< partial name="data_streams/setup-languages.html" >}}

<br/>

## 데이터 스트림 모니터링 살펴보기

### 스트리밍 데이터 파이프라인의 아키텍처를 시각화하세요

{{< img src="data_streams/topology_map.png" alt="DSM 토폴로지 맵 시각화. " style="width:100%;" >}}

Data Streams Monitoring은 기본 [토폴로지 맵][10]을 제공하므로 파이프라인 전체의 데이터 흐름을 시각화하고 생산자/소비자 서비스, 대기열 종속성, 서비스 소유권 및 주요 상태 메트릭을 식별할 수 있습니다.

### 새로운 메트릭 및 엔드투엔드 파이프라인 상태 측정

Data Streams Monitoring을 사용하면 비동기 시스템의 두 지점 사이를 이벤트가 이동하는 데 걸리는 시간을 측정할 수 있습니다

| 메트릭 이름 | 주목할 태그 | 설명 |
|---|---|-----|
| data_streams.latency | `start`, `end`, `env` | 특정 소스에서 대상 서비스로 가는 경로의 엔드투엔드 대기 시간 |
| data_streams.kafka.lag_seconds | `consumer_group`, `partition`, `topic`, `env` | 생산자 및 소비자 간 초 단위의 지연이 있습니다. 자바(Java) 에이전트 v1.9.0 이상이 필요합니다. |
| data_streams.payload_size | `consumer_group`, `topic`, `env` | 수신 및 발신 처리량 바이트|


또한 대시보드 또는 노트북에서 이러한 메트릭을 그래프화 및 시각화할 수 있습니다.

{{< img src="data_streams/data_streams_metric_monitor.png" alt="Datadog 데이터 스트림 모니터링 모니터" style="width:100%;" >}}

### 모든 경로의 엔드투엔드 지연 모니터링

이벤트가 시스템을 통과하는 방식에 따라 경로가 다르면 대기 시간이 늘어날 수 있습니다. [**측정** 탭][7]을 사용하면 엔드투엔드 지연 시간 정보에 대해 시작 서비스와 종료 서비스를 선택하여 병목 현상을 파악하고 성능을 최적화할 수 있습니다. 해당 경로에 대한 모니터를 손쉽게 생성하고 대시보드로 내보낼 수 있습니다.

또는 서비스를 클릭하여 세부 측면 패널을 열고 **경로** 탭에서 서비스와 업스트림 서비스 간의 대기 시간을 확인하세요.

### 이벤트 기반 애플리케이션의 속도 저하에 대한 경고

높은 소비자 지연율이나 오래된 메시지로 인한 속도 저하로 연속적인 오류가 발생하고 가동 중지 시간이 늘어날 수 있습니다. 기본 경고를 통해 파이프라인에서 병목 현상이 발생하는 위치를 정확히 찾아내고 즉시 대응할 수 있습니다. 보조 메트릭에 대해 Datadog은 [Kafka][4] 및 [SQS][5]와 같은 메시지 대기열 기술에 대한 추가 통합을 제공합니다.

Data Stream Monitoring의 기본 모니터 템플릿을 사용하면 소비자 지연, 처리량, 대기 시간과 같은 메트릭에 대한 모니터를 클릭 한 번으로 설정할 수 있습니다.

{{< img src="data_streams/add_monitors_and_synthetic_tests.png" alt="Datadog Data Streams Monitoring 모니터 템플릿" style="width:100%;" caption="모니터 템플릿을 확인하려면 'Add Monitors and Synthetic Tests'를 클릭합니다" >}}

### 수신 메시지를 대기열, 서비스 또는 클러스터에 적용

CPU 사용량이 많은 서비스의 높은 지연, Kafka 브로커에서 증가된 리소스 사용, 증가된 RabbitMQ 또는 Amazon SQS 대기열 크기는 이러한 엔터티에서 소비되거나 생산되는 근접 서비스의 변경 사항으로 자주 설명됩니다.

Data Streams Monitoring에서 서비스나 대기열의 **Throughput** 탭을 클릭하면 처리량의 변화와 이러한 변화가 발생한 업스트림 또는 다운스트림 서비스를 빠르게 감지할 수 있습니다. [Software Catalog][2]가 구성되면 해당 팀의 Slack 채널이나 대기 중인 엔지니어에게 즉시 연결할 수 있습니다.

단일 Kafka, RabbitMQ 또는 Amazon SQS 클러스터에 필터링하여 해당 클러스터에서 실행되는 모든 감지된 주제나 대기열의 수신 또는 발신 트래픽의 변경 사항을 감지할 수 있습니다.

### 빠르게 인프라스트럭처, 로그 또는 트레이스의 근본 원인 파악

Datadog은 [통합 서비스 태깅][3]을 통해 서비스 및 관련 로그를 지원하는 인프라스트럭처를 자동으로 연결하므로 병목 현상을 쉽게 현지화할 수 있습니다. **Infra**, **Logs** 또는 **Traces** 탭을 클릭하여 경로 지연 시간 또는 소비자 지연이 증가한 이유를 추가로 해결하세요.

### 커넥터 처리량 및 상태 모니터링
{{< img src="data_streams/connectors_topology.png" alt="DSM 토폴로지 맵은 'analytics-sink'라는 커넥터를 보여줍니다. 시각화는 커넥터가 FAILED 상태임을 나타냅니다." style="width:100%;" >}}

Datadog은 관리되는 [Confluent Cloud][8] 커넥터를 자동으로 감지하고 Data Streams Monitoring 토폴로지 맵에서 시각화할 수 있습니다. [Confluent Cloud 통합][9]을 설치하고 구성하여 처리량, 상태, 토픽 종속성을 포함한 Confluent Cloud 커넥터의 정보를 수집하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/data_streams/go#manual-instrumentation
[2]: /ko/tracing/software_catalog/
[3]: /ko/getting_started/tagging/unified_service_tagging
[4]: /ko/integrations/kafka/
[5]: /ko/integrations/amazon_sqs/
[6]: /ko/tracing/trace_collection/runtime_config/
[7]: https://app.datadoghq.com/data-streams/measure
[8]: https://www.confluent.io/confluent-cloud/
[9]: /ko/integrations/confluent_cloud/
[10]: https://app.datadoghq.com/data-streams/map