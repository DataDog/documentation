---
further_reading:
- link: /integrations/kafka/
  tag: 설명서
  text: Kafka 통합
- link: /tracing/service_catalog/
  tag: 설명서
  text: 서비스 카탈로그
kind: 설명서
title: Data Streams Monitoring for Java 설정
---

{{< site-region region="ap1" >}}
<div class="alert alert-info">데이터 스트림 모니터링은 AP1 리전에서 지원되지 않습니다.</a></div>
{{< /site-region >}}

### 전제 조건

Data Streams Monitoring을 시작하려면 최신 버전의 Datadog Agent 및 Java 라이브러리가 필요합니다.
* [Datadog 에이전트 v7.34.0 이상][1]
* [Java 에이전트로 APM 활성화][2]
  * Kafka 및 RabbitMQ: v1.9.0 이상
  * Amazon SQS: v1.27.0 이상

### 설치

Java는 자동 계측을 사용하여 Data Streams Monitoring에 필요한 추가 메타데이터를 주입하고 추출하며 엔드투엔드 지연 시간, 대기열과 서비스 간의 관계를 측정합니다. Data Streams Monitoring을 활성화하려면 Kafka 또는 RabbitMQ로 메시지를 보내거나 또는 메시지를 소비하는 서비스에서 `DD_DATA_STREAMS_ENABLED` 환경 변수를 `true`로 설정합니다.

예시:
```yaml
environment:
  - DD_DATA_STREAMS_ENABLED: "true"
```

또는 Java 애플리케이션을 시작할 때 다음을 실행하여 `-Ddd.data.streams.enabled=true` 시스템 속성을 설정할 수 있습니다.

```bash
java -javaagent:/path/to/dd-java-agent.jar -Ddd.data.streams.enabled=true -jar path/to/your/app.jar
```

### 원클릭 설치
서비스 재시작 필요 없이 Datadog UI에서 데이터 스트림 모니터링을 설정하려면 [런타임에서 구성][5]을 사용하세요. APM 서비스 페이지로 이동해 `Enable DSM`으로 설정하세요.

{{< img src="data_streams/enable_dsm_service_catalog.png" alt="APM 서비스 페이지의 Dependencies 페이지에서 데이터 스트림 모니터링 활성화" >}}

### 지원되는 라이브러리
데이터 스트림 모니터링은 [confluent-kafka 라이브러리][3]를 지원합니다.

### SQS 파이프라인 모니터링
데이터 스트림 모니터링은 하나의 [메시지 속성][4]을 사용하여 SQS 대기열을 통해 메시지 경로를 추적합니다. Amazon SQS는 메시지당 허용되는 메시지 속성이 최대 10개로 제한되어 있으므로 데이터 파이프라인을 통해 스트리밍되는 모든 메시지는 9개 이하의 메시지 속성이 설정되어 있어야 합니다. 나머지 속성은 데이터 스트림 모니터링에서 허용됩니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent
[2]: /ko/tracing/trace_collection/dd_libraries/java/
[3]: https://pypi.org/project/confluent-kafka/
[4]: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-message-metadata.html
[5]: /ko/agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration