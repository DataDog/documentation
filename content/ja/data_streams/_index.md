---
kind: documentation
title: データストリーム モニタリング
---

{{< img src="data_streams/data_streams_hero.png" alt="Datadog Data Streams Monitoring" style="width:100%;" >}}

## 概要

Data Streams Monitoring は、大規模なパイプラインを理解し管理するための標準的な方法を提供し、以下を容易にします。

* システム内を通過するイベントのエンドツーエンドのレイテンシーでパイプラインの健全性を測定します。
* 障害のあるプロデューサー、コンシューマー、キューを特定し、関連するログやクラスターにピボットして、トラブルシューティングを迅速に行います。
* バックアップされたイベントがダウンストリームのサービスを圧倒するのを阻止するために、サービスオーナーが装備することによって、連鎖的な遅延を防止します。

## セットアップ

{{< programming-lang-wrapper langs="java,go,dotnet" >}}

{{< programming-lang lang="java" >}}

### 前提条件

Data Streams Monitoring を開始するには、Datadog Agent と Java ライブラリの最新バージョンが必要です。
* [Datadog Agent v7.34.0+][1]
* [Java Agent v0.105+ で APM を有効にする][2]

### APM に Datadog Agent を構成する

Java は自動インスツルメンテーションを使用して、Data Streams Monitoring がエンドツーエンドのレイテンシーやキューとサービス間の関係を測定するために必要な追加のメタデータを挿入し抽出します。Data Streams Monitoring を有効にするには、Kafka または RabbitMQ にメッセージを送信する (またはメッセージを消費する) サービス上で環境変数 `DD_DATA_STREAMS_ENABLED` を `true` に設定します。

例:
```yaml
environment:
  - DD_DATA_STREAMS_ENABLED: "true"
```

代わりに、Java アプリケーションの起動時に以下を実行して、システムプロパティ `-Ddd.data.streams.enabled=true` を設定することも可能です。

```bash
java -javaagent:/path/to/dd-java-agent.jar -Ddd.data.streams.enabled=true -jar path/to/your/app.jar
```


[1]: /ja/agent
[2]: /ja/tracing/trace_collection/dd_libraries/java/
{{< /programming-lang >}}

{{< programming-lang lang="dotnet" >}}

### 前提条件

Data Streams Monitoring を開始するには、Datadog Agent と .NET ライブラリの最新バージョンが必要です。
* [Datadog Agent v7.34.0+][1]
* .NET Tracer v2.17.0+ ([.NET Core][2]、[.NET Framework][3])

### APM に Datadog Agent を構成する

.NET は自動インスツルメンテーションを使用して、Data Streams Monitoring がエンドツーエンドのレイテンシーやキューとサービス間の関係を測定するために必要な追加のメタデータを挿入し抽出します。Data Streams Monitoring を有効にするには、Kafka にメッセージを送信する (またはメッセージを消費する) サービス上で環境変数 `DD_DATA_STREAMS_ENABLED` を `true` に設定します。

例:
```yaml
environment:
  - DD_DATA_STREAMS_ENABLED: "true"
```


[1]: /ja/agent
[2]: /ja/tracing/trace_collection/dd_libraries/dotnet-core
[3]: /ja/tracing/trace_collection/dd_libraries/dotnet-framework
{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

### 前提条件

Data Streams Monitoring を開始するには、Datadog Agent と Data Streams Monitoring ライブラリの最新バージョンが必要です。
* [Datadog Agent v7.34.0+][1]
* [Data Streams Library v0.2+][2]

### APM に Datadog Agent を構成する

パイプラインの最初に `datastreams.Start()` でデータストリームの経路を開始します。すると、2 種類のインスツルメンテーションが利用できるようになります。
- Kafka ベースのワークロードのためのインスツルメンテーション
- その他のキューイング技術やプロトコルのためのカスタムインスツルメンテーション

<div class="alert alert-info">Trace Agent のデフォルトの URL は <code>localhost:8126</code> です。これがアプリケーションによって異なる場合は、オプション <code>datastreams.Start(datastreams.WithAgentAddr("notlocalhost:8126"))</code> を使ってください。</div>

### Kafka インスツルメンテーション

1. Kafka メッセージを送信する前に、`TraceKafkaProduce()` を呼び出すようにプロデューサーを構成します。

```go
import (ddkafka "github.com/DataDog/data-streams-go/integrations/kafka")
...
ctx = ddkafka.TraceKafkaProduce(ctx, &kafkaMsg)
```

この関数は、指定した Go コンテキスト内の既存の経路に新しいチェックポイントを追加し、 見つからなければ新しい経路を作成します。そして、そのパスウェイを Kafka メッセージのヘッダーに追加します。

2. コンシューマーが `TraceKafkaConsume()` を呼び出すように構成します。

```go
import ddkafka "github.com/DataDog/data-streams-go/integrations/kafka"
...
ctx = ddkafka.TraceKafkaConsume(ctx, &kafkaMsg, consumer_group)
```

この関数は、Kafka メッセージがこれまでに通過した経路を抽出します。メッセージの消費に成功したことを記録するために、経路上に新しいチェックポイントを設定し、提供された Go コンテキストに経路を格納します。

**注**: `TraceKafkaProduce()` の出力 `ctx` と `TraceKafkaConsume()` の出力 `ctx` の両方が、更新された経路に関する情報を含んでいます。

`TraceKafkaProduce()` では、複数の Kafka メッセージを一度に送信する場合 (ファンアウト)、コール間で出力 `ctx` を再利用しないようにします。

`TraceKafkaConsume()` では、複数のメッセージを集計してより少ないペイロードを作成する場合 (ファンイン)、`MergeContext()` を呼び出してコンテキストをマージし、次の `TraceKafkaProduce()` コールに渡せるコンテキストを 1 つ作ります。

```go
import (
    datastreams "github.com/DataDog/data-streams-go"
    ddkafka "github.com/DataDog/data-streams-go/integrations/kafka"
)

...

contexts := []Context{}
for (...) {
    contexts.append(contexts, ddkafka.TraceKafkaConsume(ctx, &consumedMsg, consumer_group))
}
mergedContext = datastreams.MergeContexts(contexts...)

...

ddkafka.TraceKafkaProduce(mergedContext, &producedMsg)
```

### 手動インスツルメンテーション

また、手動インスツルメンテーションを使用することもできます。

例えば、HTTP では、HTTP ヘッダーで経路を伝搬させることができます。

経路を挿入するには

```go
req, err := http.NewRequest(...)
...
p, ok := datastreams.PathwayFromContext(ctx)
if ok {
   req.Headers.Set(datastreams.PropagationKeyBase64, p.EncodeStr())
}
```

経路を抽出するには

```go
func extractPathwayToContext(req *http.Request) context.Context {
    ctx := req.Context()
    p, err := datastreams.DecodeStr(req.Header.Get(datastreams.PropagationKeyBase64))
    if err != nil {
        return ctx
    }
    ctx = datastreams.ContextWithPathway(ctx, p)
    _, ctx = datastreams.SetCheckpoint(ctx, "type:http")
}
```

### ディメンションを追加する

`event_type` タグを使用すると、エンドツーエンドのレイテンシーメトリクスに追加のディメンションを追加することができます。

```go
_, ctx = datastreams.SetCheckpoint(ctx, "type:internal", "event_type:sell")
```

各経路の最初のサービスに対してのみ `event_type` タグを追加する必要があります。カーディナリティの高いデータ (リクエスト ID やホストなど) は `event_type` タグの値としてサポートされていません。


[1]: /ja/agent
[2]: https://github.com/DataDog/data-streams-go
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}