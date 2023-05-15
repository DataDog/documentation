---
aliases:
- /ja/tracing/opentracing/go
- /ja/tracing/manual_instrumentation/go
- /ja/tracing/custom_instrumentation/go
- /ja/tracing/setup_overview/custom_instrumentation/go
code_lang: go
code_lang_weight: 30
description: Datadog Go APM トレーサーを使用して OpenTracing 標準を実装します。
further_reading:
- link: tracing/other_telemetry/connect_logs_and_traces
  tag: ドキュメント
  text: ログとトレースの接続
- link: tracing/glossary/
  tag: ドキュメント
  text: サービス、リソース、トレースの詳細
kind: documentation
title: Go カスタムインスツルメンテーション
type: multi-code-lang
---
<div class="alert alert-info">
自動インスツルメンテーションとセットアップの手順をまだ読んでいない場合は、<a href="https://docs.datadoghq.com/tracing/setup/go/">Go セットアップ手順</a>からご覧ください。
</div>

このページでは、Datadog APM を使用して可観測性を追加およびカスタマイズする一般的な使用例について説明します。

## `ddtrace` ライブラリの機能性を拡張したり、アプリケーションのインスツルメントをより精確に制御するのに役立つ方法がライブラリにあります。

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
    span.SetTag("<TAG_KEY>", "<TAG_VALUE>")
}

func main() {
    tracer.Start(tracer.WithService("<SERVICE_NAME>"))
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

## タグの追加

対応するライブラリインスツルメンテーションを使用しない場合（ [ライブラリの互換性][3]参照）、手動でコードをインスツルメントする必要があります。

### 新しいスパンを手動で作成する

手動インスツルメンテーションの活用には、Datadog の [godoc ページ][4]を参考に、`tracer` パッケージを使用してください。

スパンの作成に使用できる関数は 2 つあります。API の詳細は、`StartSpan` は[こちら][5]、 `StartSpanFromContext` は[こちら][6]をご覧ください。

```go
//parentSpan の子であるリソース名を持つスパンを作成します。
span := tracer.StartSpan("mainOp", tracer.ResourceName("/user"), tracer.ChildOf(parentSpan))

// Context ctx にスパンがある場合、その子となるスパンを作成します。
// 新しいスパン、および新しいスパンを含む新しいコンテキストを返します。
span, ctx := tracer.StartSpanFromContext(ctx, "mainOp", tracer.ResourceName("/user"))
```

### 非同期トレース

```go
func main() {
    span, ctx := tracer.StartSpanFromContext(context.Background(), "mainOp")
    defer span.Finish()

    go func() {
        asyncSpan := tracer.StartSpanFromContext(ctx, "asyncOp")
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

## 分散型トレーシングのためのトレースコンテキストの伝搬

Datadog APM トレーサーは、分散型トレーシングのために [B3][8] や [W3C][10] のヘッダーの抽出と挿入をサポートしています。

分散したヘッダーの挿入と抽出は、挿入/抽出スタイルを構成することで制御されます。`tracecontext`、`Datadog`、`B3`、`B3 single header` のスタイルがサポートされています。

- 環境変数 `DD_PROPAGATION_STYLE_INJECT=tracecontext,B3` を用いて挿入スタイルを構成する
- 環境変数 `DD_PROPAGATION_STYLE_EXTRACT=tracecontext,B3` を用いて抽出スタイルを構成する
- 環境変数 `DD_TRACE_PROPAGATION_STYLE=tracecontext,B3` を用いて挿入スタイルと抽出スタイルの両方を構成する

これらの環境変数の値は、挿入または抽出が有効になっているヘッダースタイルのコンマ区切りリストです。デフォルトでは、`tracecontext,Datadog` スタイルが有効になっています。

トレースコンテキストの伝搬を無効にするには、環境変数の値を `none` に設定します。
- 環境変数 `DD_PROPAGATION_STYLE_INJECT=none` を用いて挿入スタイルを無効にする
- 環境変数 `DD_PROPAGATION_STYLE_EXTRACT=none` を用いて抽出スタイルを無効にする
- 環境変数 `DD_PROPAGATION_STYLE=none` を使って、すべてのトレースコンテキストの伝搬を無効にします (挿入と抽出の両方)。

複数の環境変数が設定されている場合、 `DD_PROPAGATION_STYLE_INJECT` と `DD_PROPAGATION_STYLE_EXTRACT` は `DD_TRACE_PROPAGATION_STYLE` で指定した値をオーバーライドします。

複数の抽出スタイルが有効な場合、それらのスタイルが指定されている順序で抽出が試行されます。最初に正常に抽出された値が使用されます。

### リソースのフィルター

トレースはそれぞれのリソース名に基づいて除外可能で、これによりヘルスチェックなどの外形監視トラフィックが Datadog にレポートされるトレースから削除されます。この設定およびその他のセキュリティ/微調整に関するコンフィギュレーションについては[セキュリティ][9]ページを参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/glossary/#span-tags
[2]: /ja/tracing/glossary/#spans
[3]: /ja/tracing/setup/go/#compatibility
[4]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer
[5]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#StartSpan
[6]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#StartSpanFromContext
[7]: /ja/tracing/glossary/#trace
[8]: https://github.com/openzipkin/b3-propagation
[9]: /ja/tracing/security
[10]: https://github.com/w3c/trace-context