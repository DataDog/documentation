---
description: OpenTelemetry API を使って Rust アプリケーションをインスツルメントし、トレースを Datadog に送信します。
further_reading:
- link: https://www.datadoghq.com/blog/monitor-rust-otel/
  tag: ブログ
  text: OpenTelemetry を使って Rust アプリケーションを監視する方法
- link: tracing/other_telemetry/connect_logs_and_traces
  tag: ドキュメント
  text: Logs と Traces を関連付ける
- link: tracing/glossary/
  tag: ドキュメント
  text: サービス、リソース、トレースを探索する
title: OpenTelemetry API を使用した Rust のカスタム インスツルメンテーション
---

{{< callout header="false" btn_hidden="true" >}}
  Datadog Rust SDK はプレビュー版です。
{{< /callout >}}

Datadog は Rust アプリケーションのカスタム インスツルメンテーションを、 [`datadog-opentelemetry` クレート][3] を通じてサポートしています。このライブラリは OpenTelemetry (OTel) の API と SDK を基盤としており、Datadog 固有の機能を備えたトレーサーとエクスポーターを提供します。

このライブラリは OpenTelemetry をベースにしているため、標準の OpenTelemetry API を使ってトレースとスパンを作成できます。

## セットアップ

Rust アプリケーションから OpenTelemetry のトレースを Datadog に送信するには、必要な依存関係を追加し、Datadog エクスポーターを利用してトレーサー プロバイダーを初期化します。

### 1. 依存関係を追加する

`Cargo.toml` に `datadog-opentelemetry` とコアの `opentelemetry` クレートを追加します。

```shell
cargo add datadog-opentelemetry opentelemetry
```

### 2. トレーサーを初期化する

アプリケーションの main 関数で Datadog のトレーサー プロバイダーを初期化します。`tracing().init()` 関数は、環境変数からトレーサーの設定を自動的に読み込みます。

<div class="alert alert-info">アプリケーションが終了する前にプロバイダーをシャットダウンして、保留中のトレースがすべてフラッシュされるようにしてください。</div>

```rust
use datadog_opentelemetry;
use opentelemetry::{global, trace::Tracer};
use std::time::Duration;

fn main() {
    // 環境変数の設定 (DD_SERVICE など) を読み取り、
    // グローバルなトレーサー プロバイダーを初期化します
    let tracer_provider = datadog_opentelemetry::tracing()
        .init();

    // --- ここからアプリケーション コード ---
    // 以降は標準の OpenTelemetry API を利用できます

    let tracer = global::tracer("my-component");

    tracer.in_span("my-operation", |_cx| {
        // ... 処理を行う ...
    });

    println!("Doing work...");

    // --- ここまでアプリケーション コード ---

    // 残っているスパンをフラッシュするために、トレーサー プロバイダーをシャットダウンします
    tracer_provider.shutdown_with_timeout(Duration::from_secs(5)).expect("tracer shutdown error");
}
```

### 3. Datadog Agent が起動していることを確認する

Datadog エクスポーターはトレースを Datadog Agent に送信します。Datadog Agent は起動しており、アプリケーションから到達できる必要があります。

## 設定

Datadog Rust SDK は環境変数で設定します。利用できるオプションの一覧は、 [設定ドキュメント][1] を参照してください。

## 例

初期化後は、標準の OpenTelemetry API を使ってコードをインスツルメントします。

### Tracer を取得する

グローバル プロバイダーから `Tracer` のインスタンスを取得します。

```rust
use opentelemetry::global;

let tracer = global::tracer("my-component");
```

### スパンを作成する

`tracer.in_span` (`opentelemetry::trace::Tracer` に定義) を使って新しいスパンを作成します。クロージャーの実行が終わると、スパンは自動的に終了します。

```rust
use opentelemetry::{global, trace::Tracer};

fn do_work() {
    let tracer = global::tracer("my-component");

    tracer.in_span("operation_name", |_cx| {
        // このクロージャーの実行中はスパンがアクティブです
        println!("Doing work...");
    });
}
```

### 子スパンを作成する

子スパンを作成するには、`in_span` 呼び出しを入れ子にします。内側のスパンは、現在のコンテキストでアクティブなスパンの子として自動的に関連付けられます。

```rust
use opentelemetry::{global, trace::Tracer};

fn parent_operation() {
    let tracer = global::tracer("my-component");

    tracer.in_span("parent_operation", |_cx| {
        // このスレッドでは "parent_operation" スパンがアクティブです

        tracer.in_span("child_operation", |_cx| {
            // このスパンは自動的に "parent_operation" の子として関連付けられます
            println!("Doing child work...");
        });

        println!("Doing parent work...");
    });
}
```

### アクティブなスパンにアクセスする

コンテキストから現在アクティブなスパンを取得するには、`Span::current()` を使用します。

```rust
use opentelemetry::trace::{Span, Tracer};

fn do_work_with_active_span() {
    let tracer = opentelemetry::global::tracer("my-component");

    tracer.in_span("my-operation", |_cx| {
        // 新しいスパン "my-operation" がアクティブになります。
        // アクティブなコンテキストから次のように取得できます。
        let current_span = opentelemetry::trace::Span::current();

        // 取得したスパンに属性やイベントを追加できます
        current_span.set_attribute(
            opentelemetry::KeyValue::new("accessed.from.context", true)
        );
    });
}
```

### スパン タグを追加する

`set_attribute` メソッドを使ってスパンに属性を追加します。変更するには、コンテキスト `cx` からスパンを取得する必要があります。

```rust
use opentelemetry::trace::{Tracer, TraceContextExt}; // cx.span() を使うには TraceContextExt が必要です
use opentelemetry::KeyValue;

fn add_tags_to_span() {
    let tracer = opentelemetry::global::tracer("my-component");

    tracer.in_span("operation.with.tags", |cx| {
        let span = cx.span(); // コンテキストからスパンを取得します

        // アクティブなスパンに属性 (タグ) を設定します
        span.set_attribute(KeyValue::new("customer.id", "12345"));
        span.set_attribute(KeyValue::new("http.method", "GET"));
        span.set_attribute(KeyValue::new("is.test", true));
        span.set_attribute(KeyValue::new("team.name", "backend"));
    });
}
```

### スパン イベントを追加する

`add_event` メソッドを使うと、タイム スタンプ付きのログ メッセージをスパンに追加できます。

```rust
use opentelemetry::trace::{Tracer, TraceContextExt};
use opentelemetry::KeyValue;

fn add_events_to_span() {
    let tracer = opentelemetry::global::tracer("my-component");

    tracer.in_span("operation.with.events", |cx| {
        let span = cx.span();

        // シンプルなイベントを追加します
        span.add_event("Data received", vec![]);

        // ... ここで何らかの処理が入ります ...

        // 属性付きのイベントを追加します
        span.add_event(
            "Processing data",
            vec![
                KeyValue::new("data.size_bytes", 1024),
                KeyValue::new("data.format", "json"),
            ],
        );

        // ... さらに処理が続きます ...

        span.add_event("Processing complete", vec![]);
    });
}
```

## コンテキストの伝播

Rust には自動インスツルメンテーションがないため、サービス間でトレースをつなぐには、リモート呼び出し (HTTP リクエストなど) の送受信時にトレース コンテキストを手動で伝播させる必要があります。

詳しくは、 [トレース コンテキストの伝播][2] を参照してください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_collection/library_config/rust
[2]: /ja/tracing/trace_collection/trace_context_propagation/?tab=rust
[3]: https://crates.io/crates/datadog-opentelemetry