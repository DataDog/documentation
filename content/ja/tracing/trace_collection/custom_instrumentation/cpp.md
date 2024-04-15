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

title: Datadog ライブラリを使った C++ カスタムインスツルメンテーション
type: multi-code-lang
---

<div class="alert alert-info">
セットアップ手順をまだ読んでいない場合は、<a href="https://docs.datadoghq.com/tracing/setup/cpp/">C++ セットアップ手順</a>からご覧ください。
</div>

## タグを追加

カスタム[スパンタグ][1]を[スパン][2]に追加して、Datadog 内の可観測性をカスタマイズします。スパンタグは受信トレースに適用されるため、観測された動作を、マーチャントの階層、チェックアウト金額、ユーザー ID などのコードレベルの情報と関連付けることができます。

C++ トレースは「共通タグ」を使用します。このタグは、[Datadog 固有のタグ][3]または [OpenTracing タグ][4]の両方から取得でき、以下のように含めることができます。

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


## ヘッダー抽出と挿入によるコンテキストの伝搬

分散型トレーシングのコンテキストの伝搬は、ヘッダーの挿入と抽出で構成できます。詳しくは[トレースコンテキストの伝播][9]をお読みください。

## リソースのフィルター

トレースは、リソース名に基づいて除外することができ、ヘルスチェックなどの Synthetic トラフィックをトレース送信から除外し、トレースメトリクスに影響を与えることができます。このほか、セキュリティや構成の微調整については、[セキュリティ][12]のページでご確認ください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/glossary/#span-tags
[2]: /ja/tracing/glossary/#spans
[3]: https://github.com/DataDog/dd-opentracing-cpp/blob/master/include/datadog/tags.h
[4]: https://github.com/opentracing/opentracing-cpp/blob/master/include/opentracing/ext/tags.h
[5]: /ja/getting_started/tagging/unified_service_tagging
[6]: https://github.com/opentracing/opentracing-cpp/blob/master/include/opentracing/value.h
[7]: /ja/tracing/error_tracking/
[8]: /ja/tracing/setup/cpp/#installation
[9]: /ja/tracing/trace_collection/trace_context_propagation/cpp
[12]: /ja/tracing/security
