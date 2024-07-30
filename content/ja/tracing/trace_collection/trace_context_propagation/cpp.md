---
code_lang: cpp
code_lang_weight: 50
further_reading:
- link: https://www.datadoghq.com/blog/monitor-otel-with-w3c-trace-context/
  tag: ブログ
  text: W3C Trace Context に対応した OpenTelemetry インスツルメンテーションされたアプリのモニタリング
title: C++ トレースコンテキストの伝搬
type: multi-code-lang
---

## 概要

Datadog APM トレーサーは、分散型トレーシングの [B3][11] ヘッダーの抽出と挿入をサポートしています。

分散ヘッダーの挿入と抽出は、挿入/抽出スタイルを構成することで制御されます。C++ でサポートされているスタイルは以下の通りです。

- Datadog: `Datadog`
- B3: `B3`

挿入スタイルは次を使って構成できます:

- 環境変数: `DD_TRACE_PROPAGATION_STYLE_INJECT="Datadog B3"`

環境変数の値は、挿入が有効になっているヘッダースタイルのカンマ (またはスペース) 区切りリストです。デフォルトでは、Datadog 挿入スタイルのみが有効になっています。

抽出スタイルは次を使って構成できます:

- 環境変数: `DD_TRACE_PROPAGATION_STYLE_EXTRACT="Datadog B3"`

環境変数の値は、抽出が有効になっているヘッダースタイルのカンマ (またはスペース) 区切りリストです。デフォルトでは、Datadog 抽出スタイルのみが有効になっています。

複数の抽出スタイルが有効になっている場合、抽出試行はスタイルの構成順で実行され、最初に成功した抽出値が使われます。

### 分散トレースのコンテキストの挿入と抽出

分散型トレーシングは[トレーサーの `Inject` そして `Extract` メソッドを使用][9]することで実現でき、[一般的な `Reader` や `Writer` タイプ][10]を受け入れます。優先度付きサンプリング (デフォルトで有効) はスパンの均一なデリバリーを保証します。

```cpp
// Allows writing propagation headers to a simple map<string, string>.
// Copied from https://github.com/opentracing/opentracing-cpp/blob/master/mocktracer/test/propagation_test.cpp
struct HTTPHeadersCarrier : HTTPHeadersReader, HTTPHeadersWriter {
  HTTPHeadersCarrier(std::unordered_map<std::string, std::string>& text_map_)
      : text_map(text_map_) {}

  expected<void> Set(string_view key, string_view value) const override {
    text_map[key] = value;
    return {};
  }

  expected<void> ForeachKey(
      std::function<expected<void>(string_view key, string_view value)> f)
      const override {
    for (const auto& key_value : text_map) {
      auto result = f(key_value.first, key_value.second);
      if (!result) return result;
    }
    return {};
  }

  std::unordered_map<std::string, std::string>& text_map;
};

void example() {
  auto tracer = ...
  std::unordered_map<std::string, std::string> headers;
  HTTPHeadersCarrier carrier(headers);

  auto span = tracer->StartSpan("operation_name");
  tracer->Inject(span->context(), carrier);
  // `headers` now populated with the headers needed to propagate the span.
}
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[9]: https://github.com/opentracing/opentracing-cpp/#inject-span-context-into-a-textmapwriter
[10]: https://github.com/opentracing/opentracing-cpp/blob/master/include/opentracing/propagation.h
[11]: https://github.com/openzipkin/b3-propagation