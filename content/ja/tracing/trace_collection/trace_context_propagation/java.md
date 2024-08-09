---
code_lang: java
code_lang_weight: 0
further_reading:
- link: https://www.datadoghq.com/blog/monitor-otel-with-w3c-trace-context/
  tag: ブログ
  text: W3C Trace Context に対応した OpenTelemetry インスツルメンテーションされたアプリのモニタリング
title: Java トレースコンテキストの伝搬
type: multi-code-lang
---


Datadog APM トレーサーは、分散型トレーシングのための [B3][13] と [W3C Trace Context][14] のヘッダー抽出と挿入をサポートしています。

分散ヘッダーの挿入と抽出のスタイルを構成することができます。

Java トレーサーは、以下のスタイルをサポートしています。

- Datadog: `datadog`
- B3 マルチヘッダー: `b3multi` (`b3` エイリアスは非推奨)
- W3C トレースコンテキスト: `tracecontext` (1.11.0 以降で利用可能)
- B3 シングルヘッダー: `b3 single header` (`b3single`)

挿入スタイルは次を使って構成できます:

- システムプロパティ: `-Ddd.trace.propagation.style.inject=datadog,b3multi`
- 環境変数: `DD_TRACE_PROPAGATION_STYLE_INJECT=datadog,b3multi`

プロパティまたは環境変数の値は、注入が有効になっているヘッダースタイルのカンマ (またはスペース) 区切りリストです。デフォルトでは、`datadog` および `tracecontext` 注入スタイルが有効になっています。

抽出スタイルは次を使って構成できます:

- システムプロパティ: `-Ddd.trace.propagation.style.extract=datadog,b3multi`
- 環境変数: `DD_TRACE_PROPAGATION_STYLE_EXTRACT=datadog,b3multi`

プロパティまたは環境変数の値は、抽出が有効になっているヘッダースタイルのカンマ (またはスペース) 区切りリストです。デフォルトでは、`datadog` および `tracecontext` 抽出スタイルは `datadog,tracecontext` 設定を使用して有効になります。つまり、`datadog` スタイルの方が `tracecontext` スタイルよりも優先順位が高いということです。

複数の抽出スタイルが有効になっている場合、そのスタイルが設定された順序で抽出が試みられ、最初に成功した抽出値が使用されます。その後、有効なトレースコンテキストが見つかった場合、それらは終了され、スパンリンクとして追加されます。さらに、`tracecontext` スタイルが有効な場合、W3C Traceparent が抽出されたコンテキストと一致すると、W3C Tracestate が伝播されます。

コンテキスト伝播の設定およびその他の構成の詳細については、[Java トレーシングライブラリの構成][1]をお読みください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_collection/library_config/java/#headers-extraction-and-injection
[13]: https://github.com/openzipkin/b3-propagation
[14]: https://www.w3.org/TR/trace-context/#trace-context-http-headers-format