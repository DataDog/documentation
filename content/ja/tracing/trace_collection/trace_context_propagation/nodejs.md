---
code_lang: nodejs
code_lang_weight: 40
kind: documentation
title: Node.js トレースコンテキストの伝搬
type: multi-code-lang
---

Datadog APM トレーサーは、分散型トレーシングのための [B3][5] と [W3C (TraceParent)][6] のヘッダー抽出と挿入をサポートしています。

分散ヘッダーの挿入と抽出のスタイルを構成することができます。

Node.js トレーサーは、以下のスタイルをサポートしています。

- Datadog: `Datadog`
- B3 マルチヘッダー: `b3multi` (`B3` は非推奨)
- W3C Trace Context: `tracecontext`
- B3 シングルヘッダー: `B3 single header`

コンテキスト伝播の設定について、詳しくは [Node.js トレーシングライブラリの構成][1]をお読みください。

[1]: /ja/tracing/trace_collection/library_config/nodejs/#headers-extraction-and-injection
[5]: https://github.com/openzipkin/b3-propagation
[6]: https://www.w3.org/TR/trace-context/#trace-context-http-headers-format