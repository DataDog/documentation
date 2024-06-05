---
aliases:
- /ja/tracing/setup_overview/open_standards/ruby
- /ja/tracing/trace_collection/open_standards/ruby
- /ja/tracing/trace_collection/opentracing/ruby
code_lang: ruby
code_lang_weight: 20
description: Ruby のための OpenTracing インスツルメンテーション
kind: ドキュメント
title: Ruby OpenTracing インスツルメンテーション
type: multi-code-lang
---

<div class="alert alert-info">OpenTracing のサポートは、非推奨の仕様に基づくものです。オープンな仕様でコードをインスツルメンテーションしたい場合は、代わりに OpenTelemetry を使用してください。<a href="/tracing/trace_collection/otel_instrumentation/ruby/">Datadog トレーシングライブラリの OpenTelemetry インスツルメンテーションからのデータを処理する</a>ためのベータサポートをお試しください。</div>

OpenTracing で Datadog をセットアップするには、詳細について Ruby [OpenTracing のクイックスタート][1]を参照してください。

## Datadog トレーサー設定の構成

基底の Datadog トレーサーは、グローバルトレーサーを構成するときにオプション（ `Datadog::Tracer` と一致）を渡すことで構成できます。

```ruby
# `options` は Datadog::Tracer に提供されるオプションのハッシュです
OpenTracing.global_tracer = Datadog::OpenTracer::Tracer.new(options)
```

[Ruby トレーサー設定][2]セクションで説明されているように、`Datadog.configure` を使用して構成することもできます。

## インテグレーションのアクティブ化と構成

デフォルトでは、Datadog で OpenTracing を構成しても、Datadog が提供する追加のインスツルメンテーションは自動的にアクティブになりません。アプリケーションにある OpenTracing インスツルメンテーションからのみ[スパン][3]と[トレース][4]を受け取ります。

ただし、Datadog が提供する追加のインスツルメンテーションは、`Datadog.configure` を使用して OpenTracing とともにアクティブ化できます。これは、トレースをさらに強化するために使用できます。これを有効にするには、[Ruby インテグレーションインスツルメンテーション][5]で詳細をご覧ください。

## サポートされているシリアル化形式

| タイプ                           | サポート | 追加情報                                                                                                                                                                                                                                                                                        |
| ------------------------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OpenTracing::FORMAT_TEXT_MAP` | はい        |                                                                                                                                                                                                                                                                                                               |
| `OpenTracing::FORMAT_RACK`     | はい        | Rack 形式では解決が失われるため、大文字または `-` のいずれかを含む名前のバゲージアイテムは、往復でそれぞれ小文字と `_` に変換されることに注意してください。Datadog は、これらの文字を避けるか、受信側でそれに応じて対応することをお勧めします。 |
| `OpenTracing::FORMAT_BINARY`   | いいえ         |                                                                                                                                                                                                                                                                                                               |


[1]: /ja/tracing/setup/ruby/#quickstart-for-opentracing
[2]: /ja/tracing/setup/ruby/#tracer-settings
[3]: /ja/tracing/glossary/#spans
[4]: /ja/tracing/glossary/#trace
[5]: /ja/tracing/setup/ruby/#integration-instrumentation