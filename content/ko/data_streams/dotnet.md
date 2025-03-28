---
title: .NET용 데이터 스트림 모니터링 설정
---

### 사전 필수 조건

* [Datadog 에이전트 v7.34.0 이상][1]

### 지원되는 라이브러리

| 기술        | 라이브러리                         | 최소 트레이서 버전 | 권장 트레이서 버전 |
|-------------------|---------------------------------|------------------------|----------------------------|
| Kafka             | [Confluent.Kafka][3]            | 2.28.0                 | 2.41.0 이상            |
| RabbitMQ          | [RabbitMQ.Client][4]            | 2.28.0                 | 2.37.0 이상            |
| Amazon SQS        | [Amazon SQS SDK][5]             | 2.48.0                 | 2.48.0 이상            |
| Amazon SNS        | [Amazon SNS SDK][6]             | 3.6.0                  | 3.6.0 이상             |
| IBM MQ            | [IBMMQDotnetClient][7]          | 2.49.0                 | 2.49.0 이상            |
| Azure 서비스 버스 | [Azure.Messaging.ServiceBus][8] | 2.38.0                 | 2.38.0 이상            |

### 설치

.NET에서는 자동 계측을 사용해 데이터 스트림 모니터링에 필요한 추가 메타 데이터를 삽입하거나 추출해 엔드 투 엔드 대기 시간과 대기열과 서비스 간 관계를 측정합니다. 데이터 스트림 모니터링을 사용하려면 Kafka나 RabbitMQ을 통해 메시지를 보내는 서비스(또는 메시지를 받는 서비스)에서 `DD_DATA_STREAMS_ENABLED` 환경 변수를 `true`로 설정합니다.

예시:
```yaml
environment:
  - DD_DATA_STREAMS_ENABLED: "true"
```

### SQS 파이프라인 모니터링
데이터 스트림 모니터링은 하나의 [메시지 속성][2]을 사용하여 SQS 큐를 통해 메시지의 경로를 추적합니다. Amazon SQS에는 메시지당 허용되는 메시지 속성이 최대 10개로 제한되어 있으므로 데이터 파이프라인을 통해 스트리밍되는 모든 메시지는 9개 이하의 메시지 속성이 설정되어야 합니다. 나머지 속성은 데이터 스트림 모니터링에 사용됩니다.

### SNS-to-SQS 파이프라인 모니터링
Amazon SNS와 Amazon SQS가 직접 통신하는 데이터 파이프라인을 모니터링하려면 [Amazon SNS 원시 메시지 전송][9]을 활성화해야 합니다.


[1]: /ko/agent
[2]: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-message-metadata.html
[3]: https://www.nuget.org/packages/Confluent.Kafka
[4]: https://www.nuget.org/packages/RabbitMQ.Client
[5]: https://www.nuget.org/packages/AWSSDK.SQS
[6]: https://www.nuget.org/packages/AWSSDK.SimpleNotificationService
[7]: https://www.nuget.org/packages/IBMMQDotnetClient
[8]: https://www.nuget.org/packages/Azure.Messaging.ServiceBus
[9]: https://docs.aws.amazon.com/sns/latest/dg/sns-large-payload-raw-message-delivery.html