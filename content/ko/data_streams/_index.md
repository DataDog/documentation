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
  text: 서비스 카탈로그
- link: https://www.datadoghq.com/blog/data-streams-monitoring/
  tag: 블로그
  text: Datadog 데이터 스트림 모니터링을 통해 스트리밍 데이터 파이프라인의 성능을 추적하고 향상하세요.
- link: https://www.datadoghq.com/blog/data-streams-monitoring-apm-integration/
  tag: 블로그
  text: 애플리케이션 성능 모니터링(APM)과 Datadog 데이터 스트림 모니터링을 통해 바로 스트리밍 데이터 파이프라인 트러블 슈팅
- link: https://www.datadoghq.com/blog/data-streams-monitoring-sqs/
  tag: 블로그
  text: 데이터 스트림 모니터링으로 SQS 모니터링
kind: 설명서
title: 데이터 스트림 모니터링
---


{{% site-region region="gov,ap1" %}}
<div class="alert alert-warning">
   데이터 스트림 모니터링은 {{< region-param key="dd_site_name" >}} 사이트에서 이용할 수 없습니다.
</div>
{{% /site-region %}}

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
| 파이썬(Python) | Kafka(자체 호스팅, Amazon MSK, Confluent Cloud/플랫폼), RabbitMQ, Amazon SQS |
| .NET | Kafka(자체 호스팅, Amazon MSK, Confluent Cloud/플랫폼), RabbitMQ, Amazon SQS |
| Node.js | Kafka(자체 호스팅, Amazon MSK, Confluent Cloud/플랫폼), RabbitMQ, Amazon SQS |
| 고(Go) | 전체([수동 계측 포함][1]) |

## 데이터 스트림 모니터링 살펴보기

### 새로운 메트릭 및 엔드투엔드 파이프라인 상태 측정

데이터 스트림 모니터링이 설정되면 이벤트가 비동기적 시스템의 두 포인트 간 이동하는 데 걸리는 일반적인 시간을 측정할 수 있습니다.

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

데이터 스트림 모니터링의 기본 권장 모니터를 통해 한 번의 클릭으로 소비자 지연, 처리량 및 지연 시간과 같은 메트릭에 대한 모니터를 설정할 수 있습니다.

{{< img src="data_streams/add_monitors_and_synthetic_tests.png" alt="Datadog 데이터 스트림 모니터링 권장 모니터" style="width:100%;" caption="모니터 및 신서틱(Synthetic) 테스트 추가'를 클릭하여 권장 모니터를 확인하세요." >}}

### 수신 메시지를 대기열, 서비스 또는 클러스터에 적용

CPU 사용량이 많은 서비스의 높은 지연, Kafka 브로커에서 증가된 리소스 사용, 증가된 RabbitMQ 또는 Amazon SQS 대기열 크기는 이러한 엔터티에서 소비되거나 생산되는 근접 서비스의 변경 사항으로 자주 설명됩니다.

데이터 스트림 모니터링의 서비스 또는 대기열에서 **처리량** 탭을 클릭하여 빠르게 처리량 변경 사항을 감지하고 어느 업스트림 또는 다운스트림 서비스가 이러한 변경을 야기했는지 파악할 수 있습니다. [서비스 카탈로그][2]가 설정되면 즉시 해당 팀의 Slack 채널이나 근무 중인 엔지니어에게 전송할 수 있습니다.

단일 Kafka, RabbitMQ 또는 Amazon SQS 클러스터에 필터링하여 해당 클러스터에서 실행되는 모든 감지된 주제나 대기열의 수신 또는 발신 트래픽의 변경 사항을 감지할 수 있습니다.

### 빠르게 인프라스트럭처, 로그 또는 트레이스의 근본 원인 파악

Datadog은 [통합 서비스 태깅][3]을 통해 서비스 및 관련 로그를 지원하는 인프라스트럭처를 자동으로 연결하므로 병목 현상을 쉽게 현지화할 수 있습니다. **Infra**, **Logs** 또는 **Traces** 탭을 클릭하여 경로 지연 시간 또는 소비자 지연이 증가한 이유를 추가로 해결하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/data_streams/go#manual-instrumentation
[2]: /ko/tracing/service_catalog/
[3]: /ko/getting_started/tagging/unified_service_tagging
[4]: /ko/integrations/kafka/
[5]: /ko/integrations/amazon_sqs/
[6]: /ko/tracing/trace_collection/runtime_config/
[7]: https://app.datadoghq.com/data-streams/measure