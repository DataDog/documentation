---
further_reading:
- link: https://www.datadoghq.com/blog/monitor-otel-with-w3c-trace-context/
  tag: ブログ
  text: W3C Trace Context に対応した OpenTelemetry インスツルメンテーションされたアプリのモニタリング
- link: /opentelemetry/guide/otel_api_tracing_interoperability
  tag: ドキュメント
  text: OpenTelemetry API と Datadog でインスツルメントされたトレースの相互運用性
kind: ドキュメント
title: (Legacy) Propagating Ruby Trace Context
---

<div class="alert alert-warning">This documentation is for <code>ddtrace</code> gem v1.x. If you are using the <code>datadog</code> gem v2.0 or later, see the latest <a href="/tracing/trace_collection/trace_context_propagation/ruby">Propagating Ruby Trace Context</a> documentation.</div>

### ヘッダーの抽出と挿入

Datadog APM トレーサーは、分散型トレーシングのための [B3][6] と [W3C Trace Context][7] のヘッダー抽出と挿入をサポートしています。

分散したヘッダーの挿入と抽出は、挿入および抽出スタイルを構成することで制御されます。次の 2 つのスタイルがサポートされています。

- Datadog: `datadog`
- B3 マルチヘッダー: `b3multi`
- B3 シングルヘッダー: `b3`
- W3C Trace Context: `tracecontext`
- ノーオペレーション: `none`

挿入スタイルは次を使って構成できます:

- Environment Variable: `DD_TRACE_PROPAGATION_STYLE_INJECT=datadog,b3`

The value of the environment variable is a comma-separated list of header styles that are enabled for injection. The default setting is `datadog,tracecontext`.

抽出スタイルは次を使って構成できます:

- Environment Variable: `DD_TRACE_PROPAGATION_STYLE_EXTRACT=datadog,b3`

The value of the environment variable is a comma-separated list of header styles that are enabled for extraction. The default setting is `datadog,tracecontext`.

複数の抽出スタイルが有効になっている場合、抽出試行はスタイルの構成順で実行され、最初に成功した抽出値が使われます。

The default extraction styles are, in order, `datadog`, `b3multi`, `b3`, and `tracecontext`.

また、`Datadog.configure` を使用することで、コード上でこれらのフォーマットの使用を有効または無効にすることができます。

```ruby
Datadog.configure do |c|
  # List of header formats that should be extracted
  c.tracing.distributed_tracing.propagation_extract_style = [ 'tracecontext', 'datadog', 'b3' ]

  # List of header formats that should be injected
  c.tracing.distributed_tracing.propagation_inject_style = [ 'tracecontext', 'datadog' ]
end
```

トレースコンテキストの伝播の構成については、Ruby トレーシングライブラリ構成ドキュメントの[分散型トレーシングのセクション][1]をお読みください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_collection/dd_libraries/ruby/#distributed-tracing
[6]: https://github.com/openzipkin/b3-propagation
[7]: https://www.w3.org/TR/trace-context/#trace-context-http-headers-format