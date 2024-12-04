---
further_reading:
- link: /tracing/trace_collection
  tags: 설명서
  text: 트레이스 수집 설정
- link: /integrations/kafka
  tags: 설명서
  text: Kafka 통합
- link: /data_streams/
  tags: 설명서
  text: 데이터 스트림 모니터링

title: Kafka 대기열 모니터링
---

## 개요

이벤트 중심 파이프라인에서 Kafka와 같은 큐잉 및 스트리밍 기술은 시스템의 성공적인 운영을 위해 필수적입니다. 이러한 환경에서는 많은 기술과 팀이 연관되어 있기 때문에 서비스 간에 안정적이고 신속한 메시지 전달을 보장하는 것이 어려울 수 있습니다. Datadog Kafka 통합 및 APM을 통해 팀은 인프라스트럭처 및 파이프라인의 상태와 효율성을 모니터링할 수 있습니다.

### Kafka 통합

[Datadog Kafka 통합][1]을 사용하여 클러스터 성능을 실시간으로 시각화하고 Kafka 성능을 나머지 애플리케이션과 상호 연관시키세요. Datadog은 [MSK 통합][2]도 제공합니다.

{{< img src="tracing/guide/monitor_kafka_queues/kafka_dashboard.png" alt="Kafka 대시보드">}}

### 데이터 스트림 모니터링

[Datadog 데이터 스트림 모니터링][3]은 팀이 시스템을 통과하는 이벤트에 대한 파이프라인 상태와 엔드투엔드 대기 시간을 측정할 수 있는 표준화된 방법을 제공합니다. 데이터 스트림 모니터링이 제공하는 심층적인 가시성을 통해 파이프라인에서 지연과 지체를 유발하는 생산자, 소비자 또는 대기열을 정확히 찾아낼 수 있습니다. 차단된 메시지, 핫 파티션, 오프라인 소비자 등 디버깅하기 어려운 파이프라인 문제도 발견할 수 있습니다. 또한 관련 인프라스트럭처 또는 앱 팀 간에 원활하게 협업할 수 있습니다.

{{< img src="tracing/guide/monitor_kafka_queues/dash-2022-data-streams-compressed-blurb.mp4" alt="데이터 스트림 모니터링 데모" video="true">}}

### 분산된 트레이스

APM의 분산 추적은 요청 볼륨과 지연 시간을 측정하여 서비스 성능에 대한 확장된 가시성을 제공합니다. 그래프와 알림을 생성하여 APM 데이터를 모니터링하고 아래와 같은 플레임 그래프에서 단일 요청의 활동을 시각화하여 지연 시간과 오류의 원인을 더 잘 이해할 수 있습니다.

{{< img src="tracing/guide/monitor_kafka_queues/kafka_trace.png" alt="Kafka 소비자 스팬" >}}

APM은 Kafka 클라이언트와의 요청을 자동으로 추적할 수 있습니다. 즉, 소스 코드를 수정하지 않고도 트레이스를 수집할 수 있습니다. Datadog은 추적 컨텍스트를 생산자에서 소비자로 전파하기 위해 Kafka 메시지에 헤더를 삽입합니다.

[호환성 페이지][4]에서 어떤 Kafka 라이브러리가 지원되는지 확인하세요.

#### 설정

Kafka 애플리케이션을 추적하기 위해 Datadog은 Kafka SDK 내에서 생성 및 소비 호출을 추적합니다. 따라서 Kafka를 모니터링하려면 서비스에 APM을 설정하기만 하면 됩니다. APM 및 분산 추적에 대한 지침은 [APM 트레이스 수집 문서][5]를 참조하세요.

## APM에서 애플리케이션 모니터링

원래의 Kafka 설정은 생산자 스팬과 하위 스팬인 소비자 스팬의 트레이스를 보여줍니다. 소비 측면에서 트레이스를 생성하는 모든 작업은 소비자 스팬의 하위 스팬으로 표시됩니다. 각 스팬에는 접두사 `messaging`이 포함된 태그 집합이 있습니다. 다음 표에서는 Kafka 스팬에서 찾을 수 있는 태그를 설명합니다.

<div class="alert alert-info">
  <div class="alert-info">
    <div>Datadog의 스팬 메타데이터에 대해 종합적으로 이해하려면 <a href="/tracing/trace_collection/tracing_naming_convention">스팬 태그 시맨틱</a></strong>을 읽어보세요.</div>
  </div>
</div>

| **이름**                         | **유형** | **설명**                                                                                                     |
|----------------------------------|----------|---------------------------------------------------------------------------------------------------------------------|
| `messaging.system`               | `string` | `Kafka`                                                                                                             |
| `messaging.destination`          | `string` | 메시지가 전송되는 주제.                                                                                   |
| `messaging.destination_kind`     | `string` | `Queue`                                                                                                             |
| `messaging.protocol`             | `string` | 전송 프로토콜의 이름.                                                                                 |
| `messaging.protocol_version`     | `string` | 전송 프로토콜의 버전.                                                                              |
| `messaging.url`                  | `string` | 메시징 시스템에 대한 연결 문자열.                                                                      |
| `messaging.message_id`           | `string` | 메시징 시스템에서 메시지 식별자로 사용하는 값으로, 문자열로 표시됨.                     |
| `messaging.conversation_id`      | `string` | 메시지가 속한 대화의 대화 ID로, 문자열로 표시됨.             |
| `messaging.message_payload_size` | `number` | 압축되지 않은 메시지 페이로드의 크기(바이트).                                                              |
| `messaging.operation`            | `string` | 메시지 소비 종류를 식별하는 문자열. <br>예: `send` (생산자에게 전송된 메시지), `receive` (소비자가 메시지를 수신함) 또는 `process` (이전에 수신한 메시지를 소비자가 처리함).                                                                |
| `messaging.consumer_id`          | `string` | 둘 다 존재하면 `{messaging.kafka.consumer_group} - {messaging.kafka.client_id}`<br> 그렇지 않으면 `messaging.kafka.consumer_group`                                                                                                                                                                |
| `messaging.kafka.message_key`    | `string` |  Kafka의 메시지 키는 유사한 메시지를 그룹화하여 동일한 파티션에서 처리되도록 하는 데 사용됩니다. <br> 이들은 고유하지 않다는 점에서 `messaging.message_id`와 다릅니다.                                                                                                             |
| `messaging.kafka.consumer_group` | `string` |  메시지를 처리하는 Kafka 소비자 그룹의 이름. 생산자가 아닌 소비자에게만 적용됨.
| `messaging.kafka.client_id`      | `string` |  메시지를 처리하는 소비자 또는 생산자의 클라이언트 ID.                                               |
| `messaging.kafka.partition`      | `string` |  메시지가 전송되는 파티션.                                                                                  |
| `messaging.kafka.tombstone`      | `string` |  메시지가 툼스톤인 경우 true인 부울.                                                              |
| `messaging.kafka.client_id`      | `string` |  메시지를 처리하는 소비자 또는 생산자의 클라이언트 ID.                                               |

## 특수한 사용 사례

{{< tabs >}}

{{% tab "Java" %}}

Datadog Kafka 통합은 Header API를 지원하는 Kafka 버전 0.11+에서 작동합니다. 이 API는 트레이스 컨텍스트를 삽입하고 추출하는 데 사용됩니다. 혼합 버전 환경을 실행하는 경우 Kafka 브로커가 최신 버전의 Kafka를 잘못 보고할 수 있습니다. 이로 인해 트레이서가 로컬 생산자가 지원하지 않는 헤더를 삽입하려고 하면 문제가 발생합니다. 또한 이전 소비자는 헤더가 있기 때문에 메시지를 사용할 수 없습니다. 이러한 문제를 방지하려면 0.11 이전 버전의 혼합 버전 Kafka 환경을 실행하는 경우 환경 변수 `DD_KAFKA_CLIENT_PROPAGATION_ENABLED=false`를 사용하여 컨텍스트 전파를 비활성화합니다.

{{< /tabs >}}

{{% tab ".NET" %}}

[Kafka .NET 클라이언트 문서][1]에 따르면 일반적인 Kafka 소비자 애플리케이션은 Consume 메서드를 반복적으로 호출하여 레코드를 하나씩 검색하는 소비 루프가 중심이 됩니다. `Consume` 메서드는 시스템에서 메시지를 폴링합니다. 따라서 기본적으로 소비자 스팬은 메시지가 반환될 때 생성되고 다음 메시지를 소비하기 전에 닫힙니다. 그러면 스팬 기간은 한 메시지 소비와 다음 메시지 소비 사이의 계산을 나타냅니다.

다음 메시지를 소비하기 전에 메시지가 완전히 처리되지 않거나 여러 메시지가 동시에 소비되는 경우 소비 애플리케이션에서 `DD_TRACE_KAFKA_CREATE_CONSUMER_SCOPE_ENABLED`를 `false`로 설정할 수 있습니다. 이 설정이 `false`면 소비자 스팬이 생성되고 즉시 닫힙니다. 추적할 하위 스팬이 있는 경우 [.NET 커스텀 계측에 대한 헤더 추출 및 삽입 문서][2]에 따라 추적 컨텍스트를 추출하세요.

.NET 트레이서는 [v1.27.0][3]부터 Confluent.Kafka 추적을 허용합니다. 추적 컨텍스트 전파 API는 [v2.7.0][4]부터 사용할 수 있습니다.

[1]: https://docs.confluent.io/kafka-clients/dotnet/current/overview.html#the-consume-loop
[2]: /ko/tracing/trace_collection/custom_instrumentation/dotnet/#headers-extraction-and-injection
[3]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v1.27.0
[4]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v2.7.0
{{< /tabs >}}

{{% tab "Ruby" %}}

Kafka 통합은 `ruby-kafka` gem 추적을 제공합니다. [Ruby의 트레이서 문서][1]를 따라 활성화하세요.

[1]: /ko/tracing/trace_collection/dd_libraries/ruby/#kafka
{{< /tabs >}}

{{< /tabs >}}

### Kafka 추적 비활성화

애플리케이션에서 Kafka 추적을 비활성화하려면 `DD_TRACE_KAFKA_ENABLED`를 `false`로 설정합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/integrations/kafka
[2]: /ko/integrations/amazon_msk/
[3]: https://app.datadoghq.com/data-streams/onboarding
[4]: /ko/tracing/trace_collection/compatibility/
[5]: /ko/tracing/trace_collection/