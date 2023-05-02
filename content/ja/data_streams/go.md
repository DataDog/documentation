---
kind: documentation
title: Data Streams Monitoring for Go のセットアップ
---

{{< site-region region="ap1" >}}
<div class="alert alert-info">Data Streams Monitoring は、AP1 リージョンではサポートされていません。</a></div>
{{< /site-region >}}

### 前提条件

Data Streams Monitoring を始めるには、Datadog Agent と Data Streams Monitoring ライブラリの最近のバージョンが必要です。
* [Datadog Agent v7.34.0 以降][1]
* [Data Streams Library v0.2 以降][2]

### インストール

パイプラインの開始時に `datastreams.Start()` で Data Streams の経路を開始します。

2 種類のインスツルメンテーションが用意されています。
- Kafka ベースのワークロードのためのインスツルメンテーション
- その他のキューイング技術やプロトコルに対応したカスタムインスツルメンテーション

<div class="alert alert-info">デフォルトの Trace Agent URL は <code>localhost:8126</code>アプリケーションでこれが異なる場合は、<code>datastreams.Start(datastreams.WithAgentAddr("notlocalhost:8126"))</code> オプションを使用してください。</div>



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

また、手動インスツルメンテーションを使用することもできます。例えば、HTTP では、HTTP ヘッダーで経路を伝搬させることができます。

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