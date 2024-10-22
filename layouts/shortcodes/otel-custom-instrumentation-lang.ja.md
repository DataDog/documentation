<div class="alert alert-info">
Datadog で OpenTelemetry を使用するタイミングがわからない場合は、<a href="/tracing/trace_collection/custom_instrumentation/otel_instrumentation/">OpenTelemetry API を使用したカスタムインスツルメンテーション</a>から始めて、詳細を学びましょう。
</div>

## 概要

OpenTelemetry API を使用してアプリケーションを手動でインスツルメントする理由はいくつかあります。

- Datadog の[サポート対象ライブラリインスツルメンテーション][101]を使用していない場合
- `ddtrace` ライブラリの機能を拡張したい場合
- アプリケーションのインスツルメンテーションをより細かく制御する必要がある場合

`ddtrace` ライブラリは、これらの目標を達成するためのさまざまなテクニックを提供しています。次のセクションでは、Datadog で使用するために OpenTelemetry API を使用してカスタムインスツルメンテーションを行う方法を説明します。

[101]: /ja/tracing/trace_collection/compatibility/