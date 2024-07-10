---
code_lang: nodejs
code_lang_weight: 40
further_reading:
- link: https://www.datadoghq.com/blog/monitor-otel-with-w3c-trace-context/
  tag: ブログ
  text: W3C Trace Context に対応した OpenTelemetry インスツルメンテーションされたアプリのモニタリング
title: Node.js トレースコンテキストの伝搬
type: multi-code-lang
---

Datadog APM トレーサーは、分散型トレーシングのための [B3][5] と [W3C Trace Context][6] のヘッダー抽出と挿入をサポートしています。

分散ヘッダーの挿入と抽出のスタイルを構成することができます。

Node.js トレーサーは、以下のスタイルをサポートしています。

- Datadog: `Datadog`
- B3 マルチヘッダー: `b3multi` (`B3` エイリアスは非推奨)
- W3C Trace Context: `tracecontext`
- B3 シングルヘッダー: `B3 single header`

コンテキスト伝播の設定について、詳しくは [Node.js トレーシングライブラリの構成][1]をお読みください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_collection/library_config/nodejs/#headers-extraction-and-injection
[5]: https://github.com/openzipkin/b3-propagation
[6]: https://www.w3.org/TR/trace-context/#trace-context-http-headers-format