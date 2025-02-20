---
title: Go용 데이터 스트림 모니터링 설정
---

다음 계측 유형을 사용할 수 있습니다.
* [Kafka 기반 워크로드용 자동 계측](#automatic-instrumentation)
* [Kafka 기반 워크로드용 수동 계측](#kafka-based-workloads)
* [다른 대기열 기술 또는 프로토콜의 사전 계측](#other-queuing-technologies-or-protocols)

### 사전 필수 조건

데이터 스트림 모니터링을 시작하려면, 다음과 같은 Datadog 에이전트 및 데이터 스트림 모니터링 라이브러리 최신 버전이 필요합니다:

* [Datadog 에이전트 v7.34.0 이상][1]
* [dd-trace-go v1.56.1 이상][2]

### 지원되는 라이브러리

| 기술 | 라이브러리                                                                  | 최소 트레이서 버전 | 권장 트레이서 버전 |
|------------|--------------------------------------------------------------------------|------------------------|----------------------------|
| Kafka      | [confluent-kafka-go][8]                                                  | 1.56.1                | 1.66.0 이상            |
| Kafka      | [Sarama][9]                                                             | 1.56.1                 | 1.66.0 이상            |

### 설치

#### 자동 계측

자동 계측에서는 [오케스트레이션][4]을 사용해 dd-trace-go를 설치하며 Sarama와 Confluent Kafka 라이브러리 모두 지원합니다.

서비스를 자동으로 계측하는 방법:

1. [오케스트레이션][4]을 사용해 서비스를 컴파일하거나 실행하려면 [오케스트레이션 시작 방법][5] 가이드를 따르세요.
2. `DD_DATA_STREAMS_ENABLED=true` 환경 변수 설정

#### 수동 계측

##### Sarama Kafka 클라이언트

데이터 스트림 모니터링으로 Sarama Kafka 클라이언트 수동 계측하는 방법:

1. `ddsarama` go 라이브러리 가져오기

```go
import (
  ddsarama "gopkg.in/DataDog/dd-trace-go.v1/contrib/Shopify/sarama" // 1.x
  // ddsarama "github.com/DataDog/dd-trace-go/contrib/Shopify/sarama/v2" // 2.x
)

2. `ddsarama.WrapAsyncProducer`로 생산자 래핑

...
config := sarama.NewConfig()
producer, err := sarama.NewAsyncProducer([]string{bootStrapServers}, config)

// 이 줄 추가
producer = ddsarama.WrapAsyncProducer(config, producer, ddsarama.WithDataStreams())
```

##### Confluent Kafka 클라이언트

데이터 스트림 모니터링으로 Confluent Kafka를 수동 계측하는 방법:

1. `ddkafka` go 라이브러리 가져오기

```go
import (
  ddkafka "gopkg.in/DataDog/dd-trace-go.v1/contrib/confluentinc/confluent-kafka-go/kafka.v2" // 1.x
  // ddkafka "github.com/DataDog/dd-trace-go/contrib/confluentinc/confluent-kafka-go/kafka.v2/v2" // 2.x
)
```

2. `ddkafka.NewProducer`로 생산자를 래핑하고 `ddkafka.WithDataStreams()` 구성 사용

```go
// 이 래퍼로 생산자 생성
producer, err := ddkafka.NewProducer(&kafka.ConfigMap{
        "bootstrap.servers": bootStrapServers,
}, ddkafka.WithDataStreams())
```

서비스가 하나의 포인트에서 데이터를 사용하고 다른 포인트를 생성하는 경우, 다음과 같은 Go 컨텍스트 구조를 활용하여 두 포인트 간에 컨텍스트를 전파합니다:

3. 헤더에서 컨텍스트 추출
  ```go
  ctx = datastreams.ExtractFromBase64Carrier(ctx, ddsarama.NewConsumerMessageCarrier(message))
  ```

4. 다운스트림 생성 전에 헤더에 삽입
    ```go
    datastreams.InjectToBase64Carrier(ctx, ddsarama.NewProducerMessageCarrier(message))
    ```

#### 다른 대기열 기술 또는 프로토콜

수동 계측을 사용할 수도 있습니다. 예를 들어, Kinesis로 컨텍스트를 전파할 수 있습니다.

##### 생성 콜(produce call) 계측

1. 메시지가 [TextMapWriter 인터페이스][6]를 지원하는지 확인하세요.
2. 메시지에 컨텍스트를 삽입하고 호출하여 생성 콜(produce call)을 계측합니다:

```go
ctx, ok := tracer.SetDataStreamsCheckpointWithParams(ctx, options.CheckpointParams{PayloadSize: getProducerMsgSize(msg)}, "direction:out", "type:kinesis", "topic:kinesis_arn")
if ok {
  datastreams.InjectToBase64Carrier(ctx, message)
}

```

##### 소비 콜(consume call) 계측

1. 메시지가 [TextMapReader 인터페이스][6]를 지원하는지 확인하세요.
2. 메시지에 컨텍스트를 삽입하고 호출하여 소비 콜(consume call)을 계측합니다:

```go
    ctx, ok := tracer.SetDataStreamsCheckpointWithParams(datastreams.ExtractFromBase64Carrier(context.Background(), message), options.CheckpointParams{PayloadSize: payloadSize}, "direction:in", "type:kinesis", "topic:kinesis_arn")
```
[1]: /ko/agent/
[2]: https://github.com/DataDog/dd-trace-go
[3]: https://docs.datadoghq.com/ko/tracing/trace_collection/library_config/go/
[4]: https://datadoghq.dev/orchestrion/
[5]: https://datadoghq.dev/orchestrion/docs/getting-started/
[6]: https://github.com/DataDog/dd-trace-go/blob/main/datastreams/propagation.go#L37
[7]: https://github.com/DataDog/dd-trace-go/blob/main/datastreams/propagation.go#L44
[8]: https://github.com/confluentinc/confluent-kafka-go
[9]: https://github.com/Shopify/sarama