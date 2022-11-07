---
aliases:
- /ja/tracing/manual_instrumentation/cpp
- /ja/tracing/custom_instrumentation/cpp
- /ja/tracing/setup_overview/custom_instrumentation/cpp
code_lang: cpp
code_lang_weight: 50
description: C++ アプリケーションを手動でインスツルメントしてカスタムトレースを Datadog に送信します。
further_reading:
- link: tracing/connect_logs_and_traces
  tag: ドキュメント
  text: ログとトレースの接続
- link: tracing/visualization/
  tag: ドキュメント
  text: サービス、リソース、トレースの詳細
kind: documentation
title: C++ カスタムインスツルメンテーション
type: multi-code-lang
---

<div class="alert alert-info">
セットアップ手順をまだ読んでいない場合は、<a href="https://docs.datadoghq.com/tracing/setup/cpp/">C++ セットアップ手順</a>からご覧ください。
</div>

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

スパンをエラーに関連付けるには、スパンに 1 つ以上のエラー関連タグを設定します。たとえば、以下のようになります。

```cpp
span->SetTag(opentracing::ext::error, true);
```

あるいは

```cpp
span->SetTag("error", true);
```

`error.msg`、`error.stack`、`error.type` タグを組み合わせて、エラーに関するより詳細な情報を設定します。エラータグの詳細については、[エラー追跡][7]を参照してください。

エラータグを組み合わせて追加した例:

```cpp
// このスパンを標準ライブラリの "bad file descriptor "エラーと関連付けて
// ください。
span->SetTag("error.msg", "[EBADF] invalid file");
span->SetTag("error.type", "errno");
```

`error.msg`、`error.stack` または `error.type` タグのいずれかを追加すると、`error` に値 `true` を設定します。

スパンのエラーを解除するには、`error` タグに値 `false` を設定します。このとき、それまで設定されていた `error.msg`、`error.stack`、`error.type` タグはすべて削除されます。

```cpp
// このスパンに関連するすべてのエラー情報をクリアします。
span->SetTag("error", false);
```

## タグの追加

### メソッドの手動インスツルメント

コードの手動インスツルメンテーションをするには、[セットアップ例][8]のとおりトレーサーをインストールし、トレーサーオブジェクトを使用し[スパン][2]を作成します。

```cpp
{
  // 現在のリクエストのルートスパンを作成します。
  auto root_span = tracer->StartSpan("get_ingredients");
  // ルートスパンのリソース名を設定します。
  root_span->SetTag(datadog::tags::resource_name, "bologna_sandwich");
  // ルートスパンを親とする子スパンを作成します。
  auto child_span = tracer->StartSpan(
      "cache_lookup",
      {opentracing::ChildOf(&root_span->context())});
  // 子スパンのリソース名を設定します。
  child_span->SetTag(datadog::tags::resource_name, "ingredients.bologna_sandwich");
  // スパンは、明示的な時間で終了させることも ...
  child_span->Finish();
} // ... デストラクタが起動されたときに暗黙的に終了させることもできます。
  // 例えば、root_span はここで終了します。
```

### 分散トレースのコンテキストの挿入と抽出

分散型トレーシングは[トレーサーの `Inject` そして `Extract` メソッドを使用][9]することで実現でき、[一般的な `Reader` や `Writer` タイプ][10]を受け入れます。スパンの均一なデリバリーのため、優先度付きサンプリング（デフォルトで有効）は有効でなければなりません。

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

Datadog APM トレーサーは、分散型トレーシングの [B3 ヘッダーの抽出][11]と挿入をサポートしています。

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

### リソースのフィルター

トレースはそれぞれのリソース名に基づいて除外可能で、これによりヘルスチェックなどの外形監視トラフィックが Datadog にレポートされるトレースから削除されます。この設定およびその他のセキュリティ/微調整に関するコンフィギュレーションについては[セキュリティ][12]ページを参照してください。

## {{< partial name="whats-next/whats-next.html" >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/glossary/#span-tags
[2]: /ja/tracing/glossary/#spans
[3]: https://github.com/DataDog/dd-opentracing-cpp/blob/master/include/datadog/tags.h
[4]: https://github.com/opentracing/opentracing-cpp/blob/master/include/opentracing/ext/tags.h
[5]: /ja/getting_started/tagging/unified_service_tagging
[6]: https://github.com/opentracing/opentracing-cpp/blob/master/include/opentracing/value.h
[7]: /ja/tracing/error_tracking/
[8]: /ja/tracing/setup/cpp/#installation
[9]: https://github.com/opentracing/opentracing-cpp/#inject-span-context-into-a-textmapwriter
[10]: https://github.com/opentracing/opentracing-cpp/blob/master/include/opentracing/propagation.h
[11]: https://github.com/openzipkin/b3-propagation
[12]: /ja/tracing/security