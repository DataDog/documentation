---
code_lang: go
code_lang_weight: 30
further_reading:
- link: https://www.datadoghq.com/blog/monitor-otel-with-w3c-trace-context/
  tag: Blog
  text: Monitor OpenTelemetry-instrumented apps with support for W3C Trace Context
- link: /opentelemetry/guide/otel_api_tracing_interoperability
  tag: Documentation
  text: Interoperability of OpenTelemetry API and Datadog instrumented traces
title: Propagating Go Trace Context
type: multi-code-lang
---


Datadog APM トレーサーは、分散型トレーシングのために [B3][8] や [W3C Trace Context][10] のヘッダーの抽出と挿入をサポートしています。

Distributed headers injection and extraction is controlled by
configuring injection/extraction styles. Supported styles are:
`tracecontext`, `datadog`, `B3`, and `B3 single header`.

- 環境変数 `DD_TRACE_PROPAGATION_STYLE_INJECT=tracecontext,B3` を用いて挿入スタイルを構成する
- 環境変数 `DD_TRACE_PROPAGATION_STYLE_EXTRACT=tracecontext,B3` を用いて抽出スタイルを構成する
- 環境変数 `DD_TRACE_PROPAGATION_STYLE=tracecontext,B3` を用いて挿入スタイルと抽出スタイルの両方を構成する

The values of these environment variables are comma-separated lists of
header styles enabled for injection or extraction. By default,
the `datadog,tracecontext` styles are enabled.

トレースコンテキストの伝搬を無効にするには、環境変数の値を `none` に設定します。
- 環境変数 `DD_TRACE_PROPAGATION_STYLE_INJECT=none` を用いて挿入スタイルを無効にする
- 環境変数 `DD_TRACE_PROPAGATION_STYLE_EXTRACT=none` を用いて抽出スタイルを無効にする
- 環境変数 `DD_TRACE_PROPAGATION_STYLE=none` を使って、すべてのトレースコンテキストの伝搬を無効にします (挿入と抽出の両方)。

複数の環境変数が設定されている場合、`DD_TRACE_PROPAGATION_STYLE_INJECT` と `DD_TRACE_PROPAGATION_STYLE_EXTRACT` は `DD_TRACE_PROPAGATION_STYLE` で指定した値をオーバーライドします。

複数の抽出スタイルが有効な場合、それらのスタイルが指定されている順序で抽出が試行されます。最初に正常に抽出された値が使用されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[8]: https://github.com/openzipkin/b3-propagation
[10]: https://github.com/w3c/trace-context