---
aliases:
- /ja/tracing/manual_instrumentation/cpp
- /ja/tracing/custom_instrumentation/cpp
- /ja/tracing/setup_overview/custom_instrumentation/cpp
- /ja/tracing/trace_collection/custom_instrumentation/cpp
- /ja/tracing/trace_collection/custom_instrumentation/dd_libraries/cpp
description: C++ アプリケーションを手動でインスツルメントしてカスタムトレースを Datadog に送信します。
further_reading:
- link: tracing/connect_logs_and_traces
  tag: ドキュメント
  text: ログとトレースの接続
- link: tracing/visualization/
  tag: ドキュメント
  text: サービス、リソース、トレースの詳細
title: C++ で Datadog API を使用したカスタム インスツルメンテーション
---

<div class="alert alert-info">
セットアップ手順をまだ読んでいない場合は、<a href="https://docs.datadoghq.com/tracing/setup/cpp/">C++ セットアップ手順</a>からご覧ください。
</div>

## スパンの作成

メソッドを手動でインスツルメントするには:

```cpp
{
  // 現在のリクエスト用にルート スパンを作成します。
  auto root_span = tracer.create_span();
  root_span.set_name("get_ingredients");
  // ルート スパンにリソース名を設定します。
  root_span.set_resource_name("bologna_sandwich");
  // ルート スパンを親として子スパンを作成します。
  auto child_span = root_span.create_child();
  child_span.set_name("cache_lookup");
  // 子スパンにリソース名を設定します。
  child_span.set_resource_name("ingredients.bologna_sandwich");
  // スパンは明示的な時刻で終了することもできます ...
  child_span.set_end_time(std::chrono::steady_clock::now());
} // ... あるいはデストラクタが呼び出されたときに暗黙的に終了します。
  // 例えば、 root_span はここで終了します。
```

## タグの追加

Datadog 内での可観測性をカスタマイズするために、独自の[スパン タグ][1]を[スパン][2]に追加します。スパン タグは受信したトレースに適用され、マーチャント階層、チェックアウト金額、ユーザー ID などのコード レベルの情報と観測された動作を関連付けることができます。

一部の Datadog タグは[統合サービスタグ付け][3]に必要であることに注意してください。

{{< tabs >}}

{{% tab "Locally" %}}

### 手動インストール

`Span::set_tag` を呼び出して、スパン オブジェクトにタグを直接追加します。例:

```cpp
// Add `Span::set_tag` を呼び出してスパンにタグを直接追加します
auto span = tracer.create_span();
span.set_tag("key must be string", "value must also be a string");

// または、`SpanConfig` を設定してタグを追加します
datadog::tracing::SpanConfig opts;
opts.tags.emplace("team", "apm-proxy");
auto span2 = tracer.create_span(opts);
```

{{% /tab %}}

{{% tab "グローバル" %}}

### 環境変数

すべてのスパンにタグを設定するには、`DD_TAGS` 環境変数をカンマで区切られた `key:value` ペアのリストとして設定します。

```
export DD_TAGS=team:apm-proxy,key:value
```

### 手動インストール

```cpp
datadog::tracing::TracerConfig tracer_config;
tracer_config.tags = {
  {"team", "apm-proxy"},
  {"apply", "on all spans"}
};

const auto validated_config = datadog::tracing::finalize_config(tracer_config);
auto tracer = datadog::tracing::Tracer(*validated_config);

// すべての新しいスパンには `tracer_config.tags` に定義されたタグが含まれます
auto span = tracer.create_span();
```

{{% /tab %}}

{{< /tabs >}}

### スパンにエラーを設定する

スパンをエラーに関連付けるには、スパンに 1 つ以上のエラー関連タグを設定します。たとえば、以下のようになります。

```cpp
span.set_error(true);
```

`Span::set_error_message`、`Span::set_error_stack`、`Span::set_error_type` をそれぞれ使用して、`error.message`、`error.stack`、`error.type` の任意の組み合わせを設定し、エラーに関するより具体的な情報を追加します。エラー タグの詳細については [Error Tracking][4] を参照してください。

エラータグを組み合わせて追加した例:

```cpp
// このスパンを標準ライブラリの "bad file descriptor" エラーに
// 関連付けます。
span.set_error_message("error");
span.set_error_stack("[EBADF] invalid file");
span.set_error_type("errno");
```

<div class="alert alert-info">
`Span::set_error_*` のいずれかを使用すると、内部的には `Span::set_error(true)` が呼び出されます。
</div>

スパンのエラーを解除するには、`Span::set_error` を `false` に設定します。これにより、`Span::set_error_stack`、`Span::set_error_type`、`Span::set_error_message` の組み合わせがすべて削除されます。

```cpp
// このスパンに関連付けられたエラー情報をクリアします。
span.set_error(false);
```

## ヘッダー抽出と挿入によるコンテキストの伝搬

ヘッダーの注入と抽出によって分散トレースのコンテキスト伝播を構成できます。詳細は[トレース コンテキスト伝播][5]を参照してください。

## リソースのフィルター

リソース名を基準にトレースを除外して、ヘルス チェックのような合成トラフィックがトレースを送信したり、トレース メトリクスに影響したりしないようにできます。この設定やその他のセキュリティ、微調整に関する情報は[セキュリティ][6]ページを参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/glossary/#span-tags
[2]: /ja/tracing/glossary/#spans
[3]: /ja/getting_started/tagging/unified_service_tagging
[4]: /ja/tracing/error_tracking/
[5]: /ja/tracing/trace_collection/trace_context_propagation/
[6]: /ja/tracing/security