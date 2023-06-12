---
code_lang: java
code_lang_weight: 0
kind: documentation
title: Java トレースコンテキストの伝搬
type: multi-code-lang
---


Datadog APM トレーサーは、分散型トレーシングのための [B3][13] と [W3C (トレースコンテキスト)][14] のヘッダー抽出と挿入をサポートしています。

分散ヘッダーの挿入と抽出のスタイルを構成することができます。

Java トレーサーは、以下のスタイルをサポートしています。

- Datadog: `datadog`
- B3 マルチヘッダー: `b3multi` (`b3` エイリアスは非推奨)
- W3C トレースコンテキスト: `tracecontext` (1.11.0 以降で利用可能)
- B3 シングルヘッダー: `b3 single header` (`b3single`)

挿入スタイルは次を使って構成できます:

- システムプロパティ: `-Ddd.trace.propagation.style.inject=datadog,b3multi`
- 環境変数: `DD_TRACE_PROPAGATION_STYLE_INJECT=datadog,b3multi`

プロパティまたは環境変数の値は、挿入が有効になっているヘッダースタイルのカンマ (またはスペース) 区切りリストです。デフォルトでは、Datadog 挿入スタイルのみが有効になっています。

抽出スタイルは次を使って構成できます:

- システムプロパティ: `-Ddd.trace.propagation.style.extract=datadog,b3multi`
- 環境変数: `DD_TRACE_PROPAGATION_STYLE_EXTRACT=datadog,b3multi`

プロパティまたは環境変数の値は、抽出が有効になっているヘッダースタイルのカンマ (またはスペース) 区切りリストです。デフォルトでは、Datadog 抽出スタイルのみが有効になっています。

複数の抽出スタイルが有効になっている場合、抽出試行はスタイルの構成順で実行され、最初に成功した抽出値が使われます。

コンテキスト伝播の設定およびその他の構成の詳細については、[Java トレーシングライブラリの構成][1]をお読みください。

[1]: /ja/tracing/trace_collection/library_config/java/#headers-extraction-and-injection
[13]: https://github.com/openzipkin/b3-propagation
[14]: https://www.w3.org/TR/trace-context/#trace-context-http-headers-format