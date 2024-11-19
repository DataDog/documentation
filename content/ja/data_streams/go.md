---
title: Data Streams Monitoring for Go のセットアップ
---

### 前提条件

Data Streams Monitoring を開始するには、Datadog Agent と Data Streams Monitoring ライブラリの最新バージョンが必要です。
* [Datadog Agent v7.34.0 以降][1]
* [dd-trace-go v1.56.1 以降][2]

### インストール

- 環境変数 `DD_DATA_STREAMS_ENABLED=true` を設定します。
- [トレーサーを起動します][3]。

2 種類のインスツルメンテーションが用意されています。
- Kafka ベースのワークロードのためのインスツルメンテーション
- その他のキューイング技術やプロトコルのためのカスタムインスツルメンテーション

### Confluent Kafka クライアント

```go
import (
  ddkafka "gopkg.in/DataDog/dd-trace-go.v1/contrib/confluentinc/confluent-kafka-go/kafka.v2"
)

...
// このラッパーでプロデューサーを作成します
producer, err := ddkafka.NewProducer(&kafka.ConfigMap{
        "bootstrap.servers": bootStrapServers,
}, ddkafka.WithDataStreams())

```

サービスがある地点からデータを消費し、別の地点にデータを生成する場合、Go コンテキスト構造を使用して、2つの地点間でコンテキストを伝播します。
1. ヘッダーからコンテキストを抽出します。
    ```go
    ctx = datastreams.ExtractFromBase64Carrier(ctx, ddsarama.NewConsumerMessageCarrier(message))
    ```

2. 下流にデータを生成する前に、そのコンテキストをヘッダーに注入します。
    ```go
    datastreams.InjectToBase64Carrier(ctx, ddsarama.NewProducerMessageCarrier(message))
    ```

### Sarama Kafka クライアント

```go
import (
  ddsarama "gopkg.in/DataDog/dd-trace-go.v1/contrib/IBM/sarama.v1"
)

...
config := sarama.NewConfig()
producer, err := sarama.NewAsyncProducer([]string{bootStrapServers}, config)

// この行を追加します
producer = ddsarama.WrapAsyncProducer(config, producer, ddsarama.WithDataStreams())
```

### 手動インスツルメンテーション

また、手動インスツルメンテーションを使用することもできます。例えば、Kinesis を介してコンテキストを伝搬させることができます。

#### produce 呼び出しのインスツルメンテーション

1. メッセージが [TextMapWriter インターフェース](https://github.com/DataDog/dd-trace-go/blob/main/datastreams/propagation.go#L37)をサポートしていることを確認します。
2. コンテキストをメッセージに注入し、以下を呼び出して produce 呼び出しをインスツルメントします。

```go
ctx, ok := tracer.SetDataStreamsCheckpointWithParams(ctx, options.CheckpointParams{PayloadSize: getProducerMsgSize(msg)}, "direction:out", "type:kinesis", "topic:kinesis_arn")
if ok {
  datastreams.InjectToBase64Carrier(ctx, message)
}

```

#### consume 呼び出しのインスツルメンテーション

1. メッセージが [TextMapReader インターフェース](https://github.com/DataDog/dd-trace-go/blob/main/datastreams/propagation.go#L44)をサポートしていることを確認します。
2. メッセージからコンテキストを抽出し、以下を呼び出して consume 呼び出しをインスツルメントします。

```go
    ctx, ok := tracer.SetDataStreamsCheckpointWithParams(datastreams.ExtractFromBase64Carrier(context.Background(), message), options.CheckpointParams{PayloadSize: payloadSize}, "direction:in", "type:kinesis", "topic:kinesis_arn")
```

[1]: /ja/agent
[2]: https://github.com/DataDog/dd-trace-go
[3]: https://docs.datadoghq.com/ja/tracing/trace_collection/library_config/go/