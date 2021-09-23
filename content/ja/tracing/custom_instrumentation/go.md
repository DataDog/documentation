---
title: Go カスタムインスツルメンテーション
kind: ドキュメント
aliases:
  - /ja/tracing/opentracing/go
  - /ja/tracing/manual_instrumentation/go
description: Datadog Go APM トレーサーを使用して OpenTracing 標準を実装します。
further_reading:
  - link: tracing/connect_logs_and_traces
    tag: Documentation
    text: ログとトレースの接続
  - link: tracing/visualization/
    tag: Documentation
    text: サービス、リソース、トレースの詳細
---
{{< alert type="info" >}}
自動インスツルメンテーションとセットアップの手順をまだ読んでいない場合は、<a href="https://docs.datadoghq.com/tracing/setup/go/">Go セットアップ手順</a>からご覧ください。
{{< /alert >}}

このページでは、Datadog APM を使用して可観測性を追加およびカスタマイズする一般的な使用例について説明します。

## タグの追加

カスタム[スパンタグ][1]を[スパン][2]に追加して、Datadog 内の可観測性をカスタマイズします。スパンタグは受信トレースに適用されるため、観測された動作を、マーチャントの階層、チェックアウト金額、ユーザー ID などのコードレベルの情報と関連付けることができます。

### カスタムスパンタグを追加する

`SetTag` を呼び出して、`Span` インターフェイスに[タグ][1]を直接追加します。

```go
package main

import (
    "log"
    "net/http"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    // /posts URL でウェブリクエストのスパンを作成します。
    span := tracer.StartSpan("web.request", tracer.ResourceName("/posts"))
    defer span.Finish()

    // タグを設定
    span.SetTag("http.url", r.URL.Path)
    span.SetTag("<タグキー>", "<タグ値>")
}

func main() {
    tracer.Start(tracer.WithServiceName("<サービス名>"))
    defer tracer.Stop()
    http.HandleFunc("/posts", handler)
    log.Fatal(http.ListenAndServe(":8080", nil))
}
```

Datadog のインテグレーションでは、`Context` タイプを使用して、現在アクティブな[スパン][2]を伝播します。
`Context` にアタッチされたスパンタグを追加したい場合、`SpanFromContext` 関数を呼び出します。

```go
package main

import (
    "net/http"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    // Go Context にアタッチされたウェブリクエストのスパンを取得します。
    if span, ok := tracer.SpanFromContext(r.Context()); ok {
        // タグを設定
        span.SetTag("http.url", r.URL.Path)
    }
}
```

### すべてのスパンにグローバルにタグを追加する

`WithGlobalTag` オプションでトレーサーを構成して、すべての[スパン][2]に[タグ][1]を追加します。

```go
package main

import "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"

func main() {
    tracer.Start(
        tracer.WithGlobalTag("datacenter", "us-1"),
        tracer.WithGlobalTag("env", "dev"),
    )
    defer tracer.Stop()
}
```

### スパンにエラーを設定する

スパンのいずれかでエラーを設定する場合は、以下の `tracer.WithError` を使用します。

```go
err := someOperation()
span.Finish(tracer.WithError(err))
```

## スパンの追加

対応するライブラリインスツルメンテーションを使用しない場合（ [ライブラリの互換性][3]参照）、手動でコードをインスツルメントする必要があります。

### 新しいスパンを手動で作成する

手動インスツルメンテーションの活用には、Datadog の [godoc ページ][4]を参考に、`tracer` パッケージを使用してください。

スパンの作成に使用できる関数は 2 つあります。API の詳細は、`StartSpan` は[こちら][5]、 `StartSpanFromContext` は[こちら][6]をご覧ください。

```go
// スパンを作成
span := tracer.StartSpan(“mainOp”, tracer.ResourceName("/user"), tracer.ChildOf(parentSpan))

// parentSpan の子となるリソース名でスパンを作成します。
span := tracer.StartSpan(“mainOp”, tracer.ResourceName("/user"), tracer.ChildOf(parentSpan))

// コンテキストにスパンが存在する場合は、Context ctx でスパンの子となる別のスパンを作成します。
// 新しいスパンと、そのスパンを含む新しいコンテキストを返します。
span, ctx := tracer.StartSpanFromContext(ctx, “mainOp”, tracer.ResourceName("/user"))
```

### 非同期トレース

```go
func main() {
    span, ctx := tracer.StartSpanFromContext(context.Background(), “mainOp”)
    defer span.Finish()

    go func() {
        asyncSpan := tracer.StartSpanFromContext(ctx, “asyncOp”)
        defer asyncSpan.Finish()
        performOp()
    }()
}
```

### 分散型トレーシング

トレースコンテキストを手動で伝播して、分散[トレース][7]を作成します。

```go
package main

import (
    "net/http"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    span, ctx := tracer.StartSpanFromContext(r.Context(), "post.process")
    defer span.Finish()

    req, err := http.NewRequest("GET", "http://example.com", nil)
    req = req.WithContext(ctx)
    // リクエストヘッダへスパンコンテキストを挿入します。
    err = tracer.Inject(span.Context(), tracer.HTTPHeadersCarrier(req.Header))
    if err != nil {
        // 挿入エラーの処理またはログ
    }
    http.DefaultClient.Do(req)
}
```

次に、サーバー側で抽出された`コンテキスト`から[スパン][2]を開始し、トレースを続けます。

```go
package main

import (
    "net/http"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    // スパンコンテキストを抽出し、このサービスでトレースを続行
    sctx, err := tracer.Extract(tracer.HTTPHeadersCarrier(r.Header))
    if err != nil {
        // 挿入エラーの処理またはログ
    }

    span := tracer.StartSpan("post.filter", tracer.ChildOf(sctx))
    defer span.Finish()
}
```

## トレースクライアントと Agent コンフィギュレーション

トレーシングクライアントと Datadog Agent の両方でコンフィギュレーションを追加することで、B3 ヘッダーを使用したコンテキスト伝播や、ヘルスチェックなどの計算されたメトリクスでこれらのトレースが不要な場合に、特定のリソースがトレースを Datadog に送信しないよう除外することができます。

### B3 ヘッダーの抽出と挿入

Datadog APM トレーサーは、分散型トレーシングの [B3 ヘッダーの抽出][8]と挿入をサポートしています。

分散したヘッダーの挿入と抽出は、挿入/抽出スタイルを構成することで制御されます。`Datadog` と `B3` の 2 つのスタイルがサポートされています。

以下の環境変数を使用して挿入スタイルを構成します。
`DD_PROPAGATION_STYLE_INJECT=Datadog,B3`

以下の環境変数を使用して抽出スタイルを構成します。
`DD_PROPAGATION_STYLE_EXTRACT=Datadog,B3`

これらの環境変数の値は、挿入または抽出が有効になっている
ヘッダースタイルのコンマ区切りリストです。デフォルトでは、
`Datadog` 抽出スタイルが有効になっています。

複数の抽出スタイルが有効な場合、それらのスタイルが指定されている順序で抽出が試行されます。最初に正常に抽出された値が使用されます。

### リソースフィルター

トレースはそれぞれのリソース名に基づいて除外可能で、これによりヘルスチェックなどの外形監視トラフィックが Datadog にレポートされるトレースから削除されます。この設定およびその他のセキュリティ/微調整に関するコンフィギュレーションについては[セキュリティ][9]ページを参照してください。

## OpenTracing

Datadog では、OpenTracing 標準もサポートしています。詳細は、[OpenTracing API][10] または以下の設定情報をご覧ください。

### セットアップ

[`opentracer` パッケージ][11]をインポートして、Datadog トレーサーを [OpenTracing][12] 互換トレーサーとして公開します。

基本的な使用例

```go
package main

import (
    "github.com/opentracing/opentracing-go"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/opentracer"
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func main() {
    // 通常のトレーサーを起動し、opentracing.Tracer インターフェイスとして返します。
    // Datadog トレーサーで通常使用するのと同じオプションのセットを使用できます。
    t := opentracer.New(tracer.WithServiceName("<サービス名>"))

    // トレーサーパッケージの通常の Stop 呼び出しを使用して停止します。
    defer tracer.Stop()

    // グローバル OpenTracing トレーサーを設定します。
    opentracing.SetGlobalTracer(t)

    // 通常どおり OpenTracing API を使用します。
}
```

**注**: [OpenTracing API][10] を通常の API または Datadog インテグレーションと並行して使用することは完全にサポートされています。内部的には、それらはすべて同じトレーサーを使用します。その他の例と詳細については、[API ドキュメント][11]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/visualization/#span-tags
[2]: /ja/tracing/visualization/#spans
[3]: /ja/tracing/setup/go/#compatibility
[4]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer
[5]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#StartSpan
[6]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#StartSpanFromContext
[7]: /ja/tracing/visualization/#trace
[8]: https://github.com/openzipkin/b3-propagation
[9]: /ja/tracing/security
[10]: https://github.com/opentracing/opentracing-go
[11]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/opentracer
[12]: http://opentracing.io