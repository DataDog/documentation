---
title: .NET용 데이터 스트림 모니터링 설정
---

{{< site-region region="ap1" >}}
<div class="alert alert-info">데이터 스트림 모니터링은 AP1 리전에서 지원되지 않습니다.</a></div>
{{< /site-region >}}

### 전제 조건

데이터 스트림 모니터링을 시작하려면 Datadog 에이전트와 .NET 라이브러리 라이브러리 최신 버전이 필요합니다.
* [Datadog 에이전트 v7.34.0 이상][1]
* .NET Tracer([.NET Core][2], [.NET Framework][3])
  * Kafka 및 RabbitMQ: v2.28.0 이상
  * Amazon SQS: v2.48.0

### 설치

.NET에서는 자동 계측을 사용해 데이터 스트림 모니터링에 필요한 추가 메타 데이터를 삽입하거나 추출해 엔드 투 엔드 대기 시간과 대기열과 서비스 간 관계를 측정합니다. 데이터 스트림 모니터링을 사용하려면 Kafka나 RabbitMQ을 통해 메시지를 보내는 서비스(또는 메시지를 받는 서비스)에서 `DD_DATA_STREAMS_ENABLED` 환경 변수를 `true`로 설정합니다.

예시:
```yaml
environment:
  - DD_DATA_STREAMS_ENABLED: "true"
```
### 지원되는 라이브러리
데이터 스트림 모니터링은 [confluent-kafka 라이브러리][4]를 지원합니다.

### SQS 파이프라인 모니터링
데이터 스트림 모니터링은 하나의 [메시지 속성][5]을 사용하여 SQS 큐를 통해 메시지 경로를 추적합니다. Amazon SQS는 메시지당 허용되는 메시지 속성이 최대 10개로 제한되어 있으므로 데이터 파이프라인을 통해 스트리밍되는 모든 메시지는 9개 이하의 메시지 속성이 설정되어 있어야 합니다. 나머지 속성은 데이터 스트림 모니터링에서 허용됩니다.


[1]: /ko/agent
[2]: /ko/tracing/trace_collection/dd_libraries/dotnet-core
[3]: /ko/tracing/trace_collection/dd_libraries/dotnet-framework
[4]: https://pypi.org/project/confluent-kafka/
[5]: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-message-metadata.html