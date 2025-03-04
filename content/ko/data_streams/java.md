---
further_reading:
- link: /integrations/kafka/
  tag: 설명서
  text: Kafka 통합
- link: /tracing/service_catalog/
  tag: 설명서
  text: 서비스 카탈로그
title: Data Streams Monitoring for Java 설정
---

### 사전 필수 조건

* [Datadog 에이전트 v7.34.0 이상][1]

### 지원되는 라이브러리

| 기술     | 라이브러리                                                                                         | 최소 트레이서 버전 | 권장 트레이서 버전 |
|----------------|-------------------------------------------------------------------------------------------------|------------------------|-----------------------------
| Kafka          | [kafka-clients](https://mvnrepository.com/artifact/org.apache.kafka/kafka-clients) (v3.7 is not fully supported)              | 1.9.0                  | 1.43.0 이상            |
| RabbitMQ       | [amqp-client](https://mvnrepository.com/artifact/com.rabbitmq/amqp-client)                      | 1.9.0                  | 1.42.2 이상            |
| Amazon SQS     | [aws-java-sdk-sqs (v1)](https://mvnrepository.com/artifact/com.amazonaws/aws-java-sdk-sqs)      | 1.27.0                 | 1.42.2 이상            |
| Amazon SQS     | [SQL (V2)](https://mvnrepository.com/artifact/software.amazon.awssdk/sqs)                       | 1.27.0                 | 1.42.2 이상            |
| Amazon Kinesis | [Kinesis (v1)](https://mvnrepository.com/artifact/com.amazonaws/aws-java-sdk-kinesis)           | 1.22.0                 | 1.42.2 이상            |
| Amazon Kinesis | [Kinesis (v2)](https://mvnrepository.com/artifact/software.amazon.awssdk/kinesis)               | 1.22.0                 | 1.42.2 이상            |
| Amazon SNS     | [SNS (v1)](https://mvnrepository.com/artifact/com.amazonaws/AWS-자바(Java)-sdk-sns)                   | 1.31.0                 | 1.42.2 이상            |
| Amazon SNS     | [SNS (v2)](https://mvnrepository.com/artifact/software.amazon.awssdk/sns)                       | 1.31.0                 | 1.42.2 이상            |
| Google PubSub  | [Google Cloud Pub/Sub](https://mvnrepository.com/artifact/com.google.cloud/google-cloud-pubsub) | 1.25.0                 | 1.42.2 이상            |

### 설치

Java는 자동 계측을 사용하여 엔드투엔드 대기 시간, 대기열과 서비스 간의 관계를 측정하기 위해 Data Streams Monitoring에 필요한 추가 메타데이터를 주입하고 추출합니다. 데이터 스트림 모니터링을 활성화하려면 Kafka, SQS 또는 RabbitMQ로 메시지를 보내는(또는 메시지를 소비하는) 서비스에서 `DD_DATA_STREAMS_ENABLED` 환경 변수를 `true`로 설정합니다.

또한 `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED` 변수를 `true`로 설정하여 트레이스에서 `DD_SERVICE`가 서비스 이름으로 사용되도록 합니다.

예시:
```yaml
environment:
  - DD_DATA_STREAMS_ENABLED: "true"
  - DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED: "true"
```

또는 Java 애플리케이션을 시작할 때 다음을 실행하여 `-Ddd.data.streams.enabled=true` 시스템 속성을 설정할 수 있습니다.

```bash
java -javaagent:/path/to/dd-java-agent.jar -Ddd.data.streams.enabled=true -Ddd.trace.remove.integration-service-names.enabled=true -jar path/to/your/app.jar
```

### 원클릭 설치
서비스를 다시 시작할 필요 없이 Datadog UI에서 데이터 스트림 모니터링을 설정하려면 [런타임에서 설정][4]을 사용하세요. 애플리케이션 성능 모니터링(APM) 서비스 페이지 및 `Enable DSM`으로 이동합니다.

{{< img src="data_streams/enable_dsm_service_catalog.png" alt="APM 서비스 페이지의 Dependencies 페이지에서 데이터 스트림 모니터링 활성화" >}}

### SQS 파이프라인 모니터링
데이터 스트림 모니터링은 하나의 [메시지 속성][3]을 사용하여 SQS 큐를 통해 메시지의 경로를 추적합니다. Amazon SQS에는 메시지당 허용되는 메시지 속성이 최대 10개로 제한되어 있으므로 데이터 파이프라인을 통해 스트리밍되는 모든 메시지는 9개 이하의 메시지 속성이 설정되어야 합니다. 나머지 속성은 데이터 스트림 모니터링에 사용됩니다.

### SNS-to-SQS 파이프라인 모니터링
Amazon SNS와 Amazon SQS가 바로 소통하는 데이터 파이프라인을 모니터링하려면 다음 추가 구성 단계를 실행해야 합니다.

{{< tabs >}}
{{% tab "SQS v1" %}}
- 환경 변수 `DD_TRACE_SQS_BODY_PROPAGATION_ENABLED`를 `true`로 설정합니다.

  예:
   ```yaml
   environment:
     - DD_DATA_STREAMS_ENABLED: "true"
     - DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED: "true"
     - DD_TRACE_SQS_BODY_PROPAGATION_ENABLED: "true"
   ```
- [Java 트레이서 v1.44.0+][1]를 사용하는지 확인합니다.

[1]: https://github.com/DataDog/dd-trace-java/releases
{{% /tab %}}
{{% tab "SQS v2" %}}
[Amazon SNS 원시 메시지 전송][1]을 활성화합니다.

[1]: https://docs.aws.amazon.com/sns/latest/dg/sns-large-payload-raw-message-delivery.html
{{% /tab %}}
{{< /tabs >}}

### Kinesis 파이프라인 모니터링
Kinesis에는 컨텍스트를 전파하고 Kinesis 스트림을 통해 메시지 전체 경로를 추적할 수 있는 메시지 속성이 없습니다. 따라서 데이터 스트림 모니터링의 엔드투엔드 지연 메트릭의 경우, 서비스에서 Kinesis 스트림을 거쳐 소비자 서비스에 이르는 메시지 경로의 세그먼트 지연 시간을 합산하여 근사치를 구합니다. 처리량 메트릭은 생산자 서비스에서 Kinesis 스트림을 거쳐 소비자 서비스까지 세그먼트를 기반으로 합니다. 데이터 스트림 전체 토폴로지는 계측 서비스를 통해 계속 시각화할 수 있습니다.

### 수동 계측
데이터 스트림 모니터링은 메시지 헤더를 통해 컨텍스트를 전파합니다. 사용 중인 메시지 대기열 기술이 헤더가 없고 DSM 지원이 불가하거나(Kinesis) Lambdas인 경우, [DSM 설정을 위한 수동 계측][6]을 사용하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent
[2]: /ko/tracing/trace_collection/dd_libraries/java/
[3]: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-message-metadata.html
[4]: /ko/agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration
[5]: /ko/data_streams/manual_instrumentation/?tab=java