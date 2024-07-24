---
code_lang: ruby
code_lang_weight: 20
further_reading:
- link: https://www.datadoghq.com/blog/monitor-otel-with-w3c-trace-context/
  tag: ブログ
  text: W3C Trace Context に対応した OpenTelemetry インスツルメンテーションされたアプリのモニタリング
title: Ruby トレースコンテキストの伝搬
type: multi-code-lang
---

### B3 ヘッダーの抽出と挿入

Datadog APM トレーサーは、分散型トレーシングのための [B3][6] と [W3C Trace Context][7] のヘッダー抽出と挿入をサポートしています。

分散したヘッダーの挿入と抽出は、挿入および抽出スタイルを構成することで制御されます。次の 2 つのスタイルがサポートされています。

- Datadog: `Datadog`
- B3 マルチヘッダー: `b3multi`
- B3 シングルヘッダー: `b3`
- W3C Trace Context: `tracecontext`
- ノーオペレーション: `none`

挿入スタイルは次を使って構成できます:

- 環境変数: `DD_TRACE_PROPAGATION_STYLE_INJECT=Datadog,b3`

環境変数の値は、挿入が有効になっているヘッダースタイルのカンマ区切りリストです。デフォルトでは、`Datadog` 挿入スタイルのみが有効になっています。

抽出スタイルは次を使って構成できます:

- 環境変数: `DD_TRACE_PROPAGATION_STYLE_EXTRACT=Datadog,b3`

環境変数の値は、抽出が有効になっているヘッダースタイルのカンマ区切りリストです。

複数の抽出スタイルが有効になっている場合、抽出試行はスタイルの構成順で実行され、最初に成功した抽出値が使われます。

デフォルトの抽出スタイルは、順番に `Datadog`、`b3multi`、`b3` です。

また、`Datadog.configure` を使用することで、コード上でこれらのフォーマットの使用を有効または無効にすることができます。

```ruby
Datadog.configure do |c|
  # 抽出すべきヘッダーフォーマットのリスト
  c.tracing.distributed_tracing.propagation_extract_style = [ 'tracecontext', 'Datadog', 'b3' ]

  # 挿入すべきヘッダーフォーマットのリスト
  c.tracing.distributed_tracing.propagation_inject_style = [ 'tracecontext', 'Datadog' ]
end
```

トレースコンテキストの伝播の構成については、Ruby トレーシングライブラリ構成ドキュメントの[分散型トレーシングのセクション][1]をお読みください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_collection/dd_libraries/ruby/#distributed-tracing
[6]: https://github.com/openzipkin/b3-propagation
[7]: https://www.w3.org/TR/trace-context/#trace-context-http-headers-format