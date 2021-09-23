---
title: C++ カスタムインスツルメンテーション
kind: ドキュメント
aliases:
  - /ja/tracing/manual_instrumentation/cpp
description: C++ アプリケーションを手動でインスツルメントしてカスタムトレースを Datadog に送信します。
further_reading:
  - link: tracing/connect_logs_and_traces
    tag: Documentation
    text: ログとトレースの接続
  - link: tracing/visualization/
    tag: Documentation
    text: サービス、リソース、トレースの詳細
---
{{< alert type="info" >}}
セットアップ手順をまだ読んでいない場合は、<a href="https://docs.datadoghq.com/tracing/setup/cpp/">C++ セットアップ手順</a>からご覧ください。
{{< /alert >}}

## タグを追加

カスタム[スパンタグ][1]を[スパン][2]に追加して、Datadog 内の可観測性をカスタマイズします。スパンタグは受信トレースに適用されるため、観測された動作を、マーチャントの階層、チェックアウト金額、ユーザー ID などのコードレベルの情報と関連付けることができます。

C++ トレースは「共通タグ」を使用します。このタグは、[Datadog 固有のタグ][3]または [OpenTracing タグ][4]の両方から取得でき、以下を介して含めることができます。

```cpp
#include <opentracing/ext/tags.h>
#include <datadog/tags.h>
```

[統合サービスタグ付け][5]には Datadog タグが必要であることに注意してください。

### カスタムスパンタグを追加する

`Span::SetTag` を呼び出して、[スパン][2]に[タグ][1]を直接追加します。例:

```cpp
auto tracer = ...
auto span = tracer->StartSpan("オペレーション名");
span->SetTag("キーは文字列でなければなりません", "値は変数タイプです");
span->SetTag("キーは文字列でなければなりません", 1234);
```

値は[変数タイプ][6]であり、複雑なオブジェクトにすることができます。値は JSON としてシリアル化されますが、文字列値はそのままシリアル化されます（余分な引用符はありません）。

### すべてのスパンにグローバルにタグを追加する

すべてのスパンにタグを設定するには、`DD_TAGS` 環境変数をカンマで区切られた `key:value` ペアのリストとして設定します。

### スパンにエラーを設定する

スパンの 1 つに関連するエラーをカスタマイズするには、以下を使用します。

```cpp
span->SetTag(opentracing::ext::error, true);
```

エラーメタデータは、同じスパンの追加タグとしても設定できます。

## スパンの追加

### メソッドの手動インスツルメント

コードの手動インスツルメンテーションをするには、[セットアップ例][7]のとおりトレーサーをインストールし、トレーサーオブジェクトを使用し[スパン][2]を作成します。

```cpp
{
  // ルートスパンを作成。
  auto root_span = tracer->StartSpan("operation_name");
  // 子スパンを作成。
  auto child_span = tracer->StartSpan(
      "operation_name",
      {opentracing::ChildOf(&root_span->context())});
  // スパンは指定した時間に終了させることができます...
  child_span->Finish();
} // ... または破壊された場合（root_span はここで終了します）。
```

### 分散トレースのコンテキストの挿入と抽出

分散型トレーシングは[トレーサーの `Inject` そして `Extract` メソッドを使用][8]することで実現でき、[一般的な `Reader` や `Writer` タイプ][9]を受け入れます。スパンの均一なデリバリーのため、優先度付きサンプリング（デフォルトで有効）は有効でなければなりません。

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

## トレースクライアントと Agent コンフィギュレーション

トレーシングクライアントと Datadog Agent の両方で、コンフィギュレーションを追加することで、B3 ヘッダーを使用したコンテキスト伝播や、ヘルスチェックなどの計算されたメトリクスでこれらのトレースがカウントされないように、特定のリソースがトレースを Datadog に送信しないように除外することができます。


### B3 ヘッダーの抽出と挿入

Datadog APM トレーサーは、分散型トレーシングの [B3 ヘッダーの抽出][10]と挿入をサポートしています。

分散したヘッダーの挿入と抽出は、挿入/抽出スタイルを構成することで制御されます。現在、次の 2 つのスタイルがサポートされています:

- Datadog: `Datadog`
- B3: `B3`

挿入スタイルは次を使って構成できます:

- 環境変数: `DD_PROPAGATION_STYLE_INJECT="Datadog B3"`

環境変数の値は、挿入が有効になっているヘッダースタイルのカンマ (またはスペース) 区切りリストです。デフォルトでは、Datadog 挿入スタイルのみが有効になっています。

抽出スタイルは次を使って構成できます:

- 環境変数: `DD_PROPAGATION_STYLE_EXTRACT="Datadog B3"`

環境変数の値は、抽出が有効になっているヘッダースタイルのカンマ (またはスペース) 区切りリストです。デフォルトでは、Datadog 抽出スタイルのみが有効になっています。

複数の抽出スタイルが有効になっている場合、抽出試行はスタイルの構成順で実行され、最初に成功した抽出値が使われます。

### リソースフィルター

トレースはそれぞれのリソース名に基づいて除外可能で、これによりヘルスチェックなどの外形監視トラフィックが Datadog にレポートされるトレースから削除されます。この設定およびその他のセキュリティ/微調整に関するコンフィギュレーションについては[セキュリティ][11]ページを参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/visualization/#span-tags
[2]: /ja/tracing/visualization/#spans
[3]: https://github.com/DataDog/dd-opentracing-cpp/blob/master/include/datadog/tags.h
[4]: https://github.com/opentracing/opentracing-cpp/blob/master/include/opentracing/ext/tags.h
[5]: /ja/getting_started/tagging/unified_service_tagging
[6]: https://github.com/opentracing/opentracing-cpp/blob/master/include/opentracing/value.h
[7]: /ja/tracing/setup/cpp/#installation
[8]: https://github.com/opentracing/opentracing-cpp/#inject-span-context-into-a-textmapwriter
[9]: https://github.com/opentracing/opentracing-cpp/blob/master/include/opentracing/propagation.h
[10]: https://github.com/openzipkin/b3-propagation
[11]: /ja/tracing/security