---
title: Go용 데이터 스트림 모니터링 설정
---

### 필수 요건

데이터 스트림 모니터링을 시작하려면, 다음과 같은 Datadog 에이전트 및 데이터 스트림 모니터링 라이브러리 최신 버전이 필요합니다:
* [Datadog 에이전트 v7.34.0 이상][1]
* [dd-trace-go v1.56.1 이상][2]

### 설치

- `DD_DATA_STREAMS_ENABLED=true` 환경변수를 설정합니다.
- [트레이서를 시작][3]합니다.

다음과 같은 두 가지 계측 유형을 사용할 수 있습니다:
- Kafka 기반 워크로드용 계측
- 기타 대기행렬 기술(queuing technology) 또는 프로토콜용 커스텀 계측

### Confluent Kafka 클라이언트

```go
import (
  ddkafka "gopkg.in/DataDog/dd-trace-go.v1/contrib/confluentinc/confluent-kafka-go/kafka.v2"
)

...
// 이 래퍼로 프로듀서 생성
producer, err := ddkafka.NewProducer(&kafka.ConfigMap{
        "bootstrap.servers": bootStrapServers,
}, ddkafka.WithDataStreams())

```

서비스가 하나의 포인트에서 데이터를 사용하고 다른 포인트를 생성하는 경우, 다음과 같은 Go 컨텍스트 구조를 활용하여 두 포인트 간에 컨텍스트를 전파합니다:
1. 헤더에서 컨텍스트를 추출합니다:
    ```go
    ctx = datastreams.ExtractFromBase64Carrier(ctx, ddsarama.NewConsumerMessageCarrier(message))
    ```

2. 다운스트림 생성 전에 헤더에 삽입합니다:
    ```go
    datastreams.InjectToBase64Carrier(ctx, ddsarama.NewProducerMessageCarrier(message))
    ```

### Sarama Kafka 클라이언트

```go
import (
  ddsarama "gopkg.in/DataDog/dd-trace-go.v1/contrib/Shopify/sarama"
)

...
config := sarama.NewConfig()
producer, err := sarama.NewAsyncProducer([]string{bootStrapServers}, config)

// 하단 코드 추가
producer = ddsarama.WrapAsyncProducer(config, producer, ddsarama.WithDataStreams())
```

### 수동 계측

수동 계측을 사용할 수도 있습니다. 예를 들어, Kinesis로 컨텍스트를 전파할 수 있습니다.

#### 생성 콜(produce call) 계측

1. 메시지가 [TextMapWriter 인터페이스]를 지원하는지 확인합니다(https://github.com/DataDog/dd-trace-go/blob/main/datastreams/propagation.go#L37).
2. 메시지에 컨텍스트를 삽입하고 호출하여 생성 콜(produce call)을 계측합니다:

```go
ctx, ok := tracer.SetDataStreamsCheckpointWithParams(ctx, options.CheckpointParams{PayloadSize: getProducerMsgSize(msg)}, "direction:out", "type:kinesis", "topic:kinesis_arn")
if ok {
  datastreams.InjectToBase64Carrier(ctx, message)
}

```

#### 소비 콜(consume call) 계측

1. 메시지가 [TextMapReader 인터페이스]를 지원하는지 확인합니다(https://github.com/DataDog/dd-trace-go/blob/main/datastreams/propagation.go#L44).
2. 메시지에 컨텍스트를 삽입하고 호출하여 소비 콜(consume call)을 계측합니다:

```go
    ctx, ok := tracer.SetDataStreamsCheckpointWithParams(datastreams.ExtractFromBase64Carrier(context.Background(), message), options.CheckpointParams{PayloadSize: payloadSize}, "direction:in", "type:kinesis", "topic:kinesis_arn")
```

[1]: /ko/agent
[2]: https://github.com/DataDog/dd-trace-go
[3]: https://docs.datadoghq.com/ko/tracing/trace_collection/library_config/go/