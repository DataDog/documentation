---
title: Data Streams Monitoring for Go のセットアップ
---

利用可能ないくつかのインスツルメンテーションの種類は以下のとおりです:
* [Kafka ベースのワークロードの自動インスツルメンテーション](#automatic-instrumentation)
* [Kafka ベースのワークロードの手動インスツルメンテーション](#kafka-based-workloads)
* [その他のキューイング技術やプロトコルの手動インスツルメンテーション](#other-queuing-technologies-or-protocols)

### 前提条件

Data Streams Monitoring を開始するには、Datadog Agent と Data Streams Monitoring ライブラリの最新バージョンが必要です。

* [Datadog Agent v7.34.0 以降][1]
* [dd-trace-go v1.56.1 以降][2]

### サポートされるライブラリ

| IT業界 | ライブラリ                                                                  | Minimal tracer version | Recommended tracer version |
|------------|--------------------------------------------------------------------------|------------------------|----------------------------|
| Kafka      | [confluent-kafka-go][8]                                                  | 1.56.1                | 1.66.0 以降            |
| Kafka      | [Sarama][9]                                                             | 1.56.1                 | 1.66.0 以降            |

### インストール

#### 自動インスツルメンテーション

自動インスツルメンテーションでは [Orchestrion][4] を使用して dd-trace-go をインストールし、Sarama と Confluent Kafka の両方のライブラリをサポートします。

サービスを自動インスツルメンテーションするには:

1. [Orchestrion Getting Started][5] ガイドに従って、[Orchestrion][4] を使用してサービスをコンパイルまたは実行します。
2. `DD_DATA_STREAMS_ENABLED=true` という環境変数を設定します。

#### 手動インスツルメンテーション

##### Sarama Kafka クライアント

Data Streams Monitoring を使用して Sarama Kafka クライアントを手動でインスツルメンテーションするには:

1. `ddsarama` Go ライブラリをインポートします

```go
import (
ddsarama "gopkg.in/DataDog/dd-trace-go.v1/contrib/Shopify/sarama"
)

2. プロデューサーを `ddsarama.WrapAsyncProducer` でラップします

...
config := sarama.NewConfig()
producer, err := sarama.NewAsyncProducer([]string{bootStrapServers}, config)

// この行を追加してください
producer = ddsarama.WrapAsyncProducer(config, producer, ddsarama.WithDataStreams())
```

##### Confluent Kafka クライアント

Data Streams Monitoring を使用して Confluent Kafka を手動でインスツルメンテーションするには:

1. `ddkafka` Go ライブラリをインポートします

```go
import (
  ddkafka "gopkg.in/DataDog/dd-trace-go.v1/contrib/confluentinc/confluent-kafka-go/kafka.v2"
)
```

2. `ddkafka.NewProducer` でプロデューサーの作成をラップし、`ddkafka.WithDataStreams()` 構成を使用します。

```go
// このラッパーを使用してプロデューサーを作成します
producer, err := ddkafka.NewProducer(&kafka.ConfigMap{
"bootstrap.servers": bootStrapServers,
}, ddkafka.WithDataStreams())
```

サービスがある地点からデータを消費し、別の地点にデータを生成する場合、Go コンテキスト構造を使用して、2つの地点間でコンテキストを伝播します。

3. ヘッダーからコンテキストを抽出します。
  ```go
  ctx = datastreams.ExtractFromBase64Carrier(ctx, ddsarama.NewConsumerMessageCarrier(message))
  ```

4. ダウンストリームへデータを生成する前にヘッダーにコンテキストを注入します。
    ```go
    datastreams.InjectToBase64Carrier(ctx, ddsarama.NewProducerMessageCarrier(message))
    ```

#### その他のキューイング技術やプロトコル

また、手動インスツルメンテーションを使用することもできます。例えば、Kinesis を介してコンテキストを伝搬させることができます。

##### produce 呼び出しのインスツルメンテーション

1. メッセージが [TextMapWriter インターフェイス][6]をサポートしていることを確認します。
2. コンテキストをメッセージに注入し、以下を呼び出して produce 呼び出しをインスツルメントします。

```go
ctx, ok := tracer.SetDataStreamsCheckpointWithParams(ctx, options.CheckpointParams{PayloadSize: getProducerMsgSize(msg)}, "direction:out", "type:kinesis", "topic:kinesis_arn")
if ok {
  datastreams.InjectToBase64Carrier(ctx, message)
}

```

##### consume 呼び出しのインスツルメンテーション

1. メッセージが [TextMapReader インターフェイス][7]をサポートしていることを確認します。
2. メッセージからコンテキストを抽出し、以下を呼び出して consume 呼び出しをインスツルメントします。

```go
    ctx, ok := tracer.SetDataStreamsCheckpointWithParams(datastreams.ExtractFromBase64Carrier(context.Background(), message), options.CheckpointParams{PayloadSize: payloadSize}, "direction:in", "type:kinesis", "topic:kinesis_arn")
```
[1]: /ja/agent/
[2]: https://github.com/DataDog/dd-trace-go
[3]: https://docs.datadoghq.com/ja/tracing/trace_collection/library_config/go/
[4]: https://datadoghq.dev/orchestrion/
[5]: https://datadoghq.dev/orchestrion/docs/getting-started/
[6]: https://github.com/DataDog/dd-trace-go/blob/main/datastreams/propagation.go#L37
[7]: https://github.com/DataDog/dd-trace-go/blob/main/datastreams/propagation.go#L44
[8]: https://github.com/confluentinc/confluent-kafka-go
[9]: https://github.com/Shopify/sarama