---
code_lang: python
code_lang_weight: 10
further_reading:
- link: https://www.datadoghq.com/blog/monitor-otel-with-w3c-trace-context/
  tag: ブログ
  text: W3C Trace Context に対応した OpenTelemetry インスツルメンテーションされたアプリのモニタリング
title: Python トレースコンテキストの伝搬
type: multi-code-lang
---

Datadog APM トレーサーは、分散型トレーシングのために [B3][2] や [W3C Trace Context][3] のヘッダーの抽出と挿入をサポートしています。

分散したヘッダーの挿入と抽出は、挿入および抽出スタイルを構成することで制御されます。`tracecontext`、`datadog`、`b3multi`、`b3 single header` のスタイルがサポートされています。

- 環境変数 `DD_TRACE_PROPAGATION_STYLE_INJECT=tracecontext,b3mutli` を用いて挿入スタイルを構成します。
- 環境変数 `DD_TRACE_PROPAGATION_STYLE_EXTRACT=tracecontext,b3multi` を用いて抽出スタイルを構成します。
- 環境変数 `DD_TRACE_PROPAGATION_STYLE=tracecontext,b3multi` を用いて挿入スタイルと抽出スタイルの両方を構成します。

これらの環境変数の値は、挿入または抽出が有効になっているヘッダースタイルのコンマ区切りリストです。デフォルトでは、`tracecontext,Datadog` スタイルが有効になっています。

トレースコンテキストの伝搬を無効にするには、環境変数の値を `none` に設定します。
- 環境変数 `DD_TRACE_PROPAGATION_STYLE_INJECT=none` を用いて挿入スタイルを無効にする
- 環境変数 `DD_TRACE_PROPAGATION_STYLE_EXTRACT=none` を用いて抽出スタイルを無効にする
- 環境変数 `DD_TRACE_PROPAGATION_STYLE=none` を使って、すべてのトレースコンテキストの伝搬を無効にします (挿入と抽出の両方)。

複数の環境変数が設定されている場合、`DD_TRACE_PROPAGATION_STYLE_INJECT` と `DD_TRACE_PROPAGATION_STYLE_EXTRACT` は `DD_TRACE_PROPAGATION_STYLE` で指定した値をオーバーライドします。

複数の抽出スタイルが有効になっている場合、そのスタイルが設定された順序で抽出が試みられ、最初に成功した抽出値が使用されます。その後、有効なトレースコンテキストが見つかった場合、それらは終了され、スパンリンクとして追加されます。さらに、`tracecontext` スタイルが有効な場合、W3C Traceparent が抽出されたコンテキストと一致すると、W3C Tracestate が伝播されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://github.com/openzipkin/b3-propagation
[3]: https://github.com/w3c/trace-context