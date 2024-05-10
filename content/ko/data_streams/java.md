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
* [Java Agent v1.9.0 이상에서 APM 활성화][2]

### 설치

Java는 자동 계측을 사용하여 Data Streams Monitoring에 필요한 추가 메타데이터를 주입하고 추출하며 엔드투엔드 지연 시간, 대기열과 서비스 간의 관계를 측정합니다. Data Streams Monitoring을 활성화하려면 Kafka 또는 RabbitMQ로 메시지를 보내거나 또는 메시지를 소비하는 서비스에서 `DD_DATA_STREAMS_ENABLED` 환경 변수를 `true`로 설정합니다.

예를 들면 다음과 같습니다.
```yaml
environment:
  - DD_DATA_STREAMS_ENABLED: "true"
```

또는 Java 애플리케이션을 시작할 때 다음을 실행하여 `-Ddd.data.streams.enabled=true` 시스템 속성을 설정할 수 있습니다.

```bash
java -javaagent:/path/to/dd-java-agent.jar -Ddd.data.streams.enabled=true -jar path/to/your/app.jar
```

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent
[2]: /ko/tracing/trace_collection/dd_libraries/java/