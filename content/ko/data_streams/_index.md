---
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
- link: /tracing/service_catalog/
  tag: 설명서
  text: 리액트 네이티브 모니터링
- link: https://www.datadoghq.com/blog/data-streams-monitoring/
  tag: 블로그
  text: Datadog 데이터 스트림 모니터링을 통해 스트리밍 데이터 파이프라인의 성능을 추적하고 향상하세요.
- link: https://www.datadoghq.com/blog/data-streams-monitoring-apm-integration/
  tag: 블로그
  text: 애플리케이션 성능 모니터링(APM)과 Datadog 데이터 스트림 모니터링을 통해 바로 스트리밍 데이터 파이프라인 트러블 슈팅
kind: 설명서
title: 로그 수집 & 통합
---


{{% site-region region="gov,ap1" %}}
<div class="alert alert-warning">
   데이터 스트림 모니터링은 {{< region-param key="dd_site_name" >}} 사이트에서 이용할 수 없습니다.
</div>
{{% /site-region %}}

{{< img src="data_streams/data_streams_hero_feature.jpg" alt="Datadog 데이터 스트림 모니터링" style="width:100%;" >}}

데이터 스트림 모니터링은 팀이 대규모 파이프라인을 이해하고 관리할 수 있도록 표준화된 메서드를 제공합니다. 다음 작업을 지원합니다.
* 시스템 전반의 이벤트에 대한 엔드투엔드 지연을 통해 파이프라인 상태 측정
* 잘못된 생산자, 소비자 또는 대기열을 파악하고 관련 로그와 클러스터에 전송해 더 빠른 트러블슈팅을 가능케 합니다.
* 서비스 소유자가 다운스트림 서비스를 저해하는 백업 이벤트를 생산하지 않도록 하여 연이은 지연을 방지합니다.

## 설정

시작하려면 설치 지침을 따라 데이터 스트림 모니터링을 사용해 서비스를 설정하세요.

{{< partial name="data_streams/setup-languages.html" >}}

<br/>

| 런타임 | 지원되는 기술 |
|---|----|
| 자바(Java)/Scala | Kafka(자체 호스팅됨, Amazon MSK, Confluent Cloud / Platform), RabbitMQ, HTTP, gRPC, Amazon SQS |
| Python | Kafka(자체 호스팅됨, Amazon MSK, Confluent Cloud / Platform), Amazon SQS, Amazon Kinesis |
| .NET | Kafka(자체 호스팅됨, Amazon MSK, Confluent Cloud / Platform), RabbitMQ |
| .NET | Kafka(자체 호스팅됨, Amazon MSK, Confluent Cloud / Platform) |
| Go | 전체([수동 계측 포함][1]) |


## 데이터 스트림 모니터링 살펴보기

### 새로운 메트릭 및 엔드투엔드 파이프라인 상태 측정

데이터 스트림 모니터링이 설정되면 이벤트가 비동기적 시스템의 두 포인트 간 이동하는 데 걸리는 일반적인 시간을 측정할 수 있습니다.

| 메트릭 이름 | 주목할 태그 | 설명 |
|---|---|-----|
| data_streams.latency | `start`, `end`, `env` | 특정 소스에서 목적지 소스로의 엔드투엔드 경로 지연 |
| data_streams.kafka.lag_seconds | `consumer_group`, `partition`, `topic`, `env` | 생산자 및 소비자 간 초 단위의 지연이 있습니다. 자바(Java) 에이전트 v1.9.0 이상이 필요합니다. |

또한 대시보드 또는 노트북에서 이러한 메트릭을 그래프화 및 시각화할 수 있습니다.

{{< img src="data_streams/data_streams_monitor.jpg" alt="Datadog 데이터 스트리밍 모니터링 모니터" style="width:100%;" >}}

### 모든 경로의 엔드투엔드 지연 모니터링

시스템에 존재하는 이벤트의 이동 방식에 따라 **경로** 탭의 다른 경로는 지연을 높일 수 있다. 파이프라인 내 양 지전 사이의 지연 시간을 보면(병목 현상을 파악하고 성능을 최적화할 목적으로 대기, 생산자 및 소비자가 병목현상 문제를 해결하고 성능을 최적화할 수 있다. 경로용 모니터를 손쉽게 생성하여  대시보드로 내보내기합니다.

{{< img src="data_streams/data_streams_pathway.jpg" alt="Datadogy 데이터 스트림 모니터링 b" style="width:100%;" >}}

### 수신 메시지를 대기열, 서비스 또는 클러스터에 적용

CPU 사용량이 많은 서비스의 높은 지연, Kafka 브로커에서 증가된 리소스 사용, 증가된 RabbitMQ 또는 Amazon SQS 대기열 크기는 이러한 엔터티에서 소비되거나 생산되는 근접 서비스의 변경 사항으로 자주 설명됩니다.

데이터 스트림 모니터링의 서비스 또는 대기열에서 **처리량** 탭을 클릭하여 빠르게 처리량 변경 사항을 감지하고 어느 업스트림 또는 다운스트림 서비스가 이러한 변경을 야기했는지 파악할 수 있습니다. [서비스 카탈로그][2]가 설정되면 즉시 해당 팀의 Slack 채널이나 근무 중인 엔지니어에게 전송할 수 있습니다.

단일 Kafka, RabbitMQ 또는 Amazon SQS 클러스터에 필터링하여 해당 클러스터에서 실행되는 모든 감지된 주제나 대기열의 수신 또는 발신 트래픽의 변경 사항을 감지할 수 있습니다.

{{< img src="data_streams/data_streams_throughput.jpg" alt="Datadog 데이터 스트림 모니터링" style="width:100%;" >}}

### 빠르게 인프라스트럭처, 로그 또는 트레이스의 근본 원인 파악

Datadog는 자동으로 서비스를 지원하는 인프라스트럭처와 관련 로그를 [통합 서비스 태깅][3]을 통해 연결합니다. 그러므로 손쉽게 병목 현상을 확인할 수 있습니다. **인프라** 또는 **로그** 탭을 클릭해 경로 지연 또는 소비자 지연이 늘어난 이유를 확인하여 트러블슈팅합니다. 경로 내 트레이스를 확인하려면 **지연 처리** 탭을 클릭합니다.

{{< img src="data_streams/data_streams_infra.jpg" alt="Datadog 데이터 스트림 모니터링 인프라 탭" style="width:100%;" >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/data_streams/go#manual-instrumentation
[2]: /ko/tracing/service_catalog/
[3]: /ko/getting_started/tagging/unified_service_tagging