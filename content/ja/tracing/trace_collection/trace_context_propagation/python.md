---
code_lang: php
code_lang_weight: 10
kind: documentation
title: Python トレースコンテキストの伝搬
type: multi-code-lang
---

Datadog APM トレーサーは、分散型トレーシングのために [B3][2] や [W3C][3] のヘッダーの抽出と挿入をサポートしています。

分散したヘッダーの挿入と抽出は、挿入および抽出スタイルを構成することで制御されます。`tracecontext`、`datadog`、`B3`、`B3 single header` のスタイルがサポートされています。

- 環境変数 `DD_TRACE_PROPAGATION_STYLE_INJECT=tracecontext,B3` を用いて挿入スタイルを構成する
- 環境変数 `DD_TRACE_PROPAGATION_STYLE_EXTRACT=tracecontext,B3` を用いて抽出スタイルを構成する
- 環境変数 `DD_TRACE_PROPAGATION_STYLE=tracecontext,B3` を用いて挿入スタイルと抽出スタイルの両方を構成する

これらの環境変数の値は、挿入または抽出が有効になっているヘッダースタイルのコンマ区切りリストです。デフォルトでは、`tracecontext,Datadog` スタイルが有効になっています。

トレースコンテキストの伝搬を無効にするには、環境変数の値を `none` に設定します。
- 環境変数 `DD_TRACE_PROPAGATION_STYLE_INJECT=none` を用いて挿入スタイルを無効にする
- 環境変数 `DD_TRACE_PROPAGATION_STYLE_EXTRACT=none` を用いて抽出スタイルを無効にする
- 環境変数 `DD_TRACE_PROPAGATION_STYLE=none` を使って、すべてのトレースコンテキストの伝搬を無効にします (挿入と抽出の両方)。

複数の環境変数が設定されている場合、`DD_TRACE_PROPAGATION_STYLE_INJECT` と `DD_TRACE_PROPAGATION_STYLE_EXTRACT` は `DD_TRACE_PROPAGATION_STYLE` で指定した値をオーバーライドします。

複数の抽出スタイルが有効な場合、それらのスタイルが指定されている順序で抽出が試行されます。最初に正常に抽出された値が使用されます。

[2]: https://github.com/openzipkin/b3-propagation
[3]: https://github.com/w3c/trace-context