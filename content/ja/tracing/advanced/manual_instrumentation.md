---
title: 手動インスツルメンテーション
kind: documentation
aliases:
  - /ja/tracing/setup/php/manual-installation
  - /ja/agent/apm/php/manual-installation
  - /ja/tracing/guide/distributed_tracing/
further_reading:
  - link: tracing/connect_logs_and_traces
    tags: トレースの加工
    text: ログとトレースの接続
  - link: tracing/opentracing
    tags: トレースの加工
    text: アプリケーション全体に Opentracing を実装します。
  - link: tracing/visualization/
    tag: APM の UI を利用する
    text: サービス、リソース、トレースの詳細
---
手動インスツルメンテーションにより、Datadogへ送信するためのトレースをプログラムで作成できます。これは、自動インスツルメンテーションでキャプチャできない社内コードのトレースに役立ちます。アプリケーションのインスツルメンテーション前に、Datadog の [APM 用語][1] を確認し、Datadog APM の基本理念をよく理解してください。

{{< tabs >}}
{{% tab "Java" %}}

 [対応するフレームワークインスツルメンテーション][1]を使用しない場合や、より深いアプリケーションの[トレース][2]をする場合、手動でコードをインスツルメントする必要があります。

簡単なメソッド呼び出しトレーシングにはトレースアノテーションを使い、複雑なトレーシングには OpenTracing API を使うことで、これを実行します。

Datadog のトレースアノテーションは、[dd-trace-api 依存関係][3]が提供します。

**使用例**

```java
import datadog.trace.api.Trace;

public class MyJob {
  @Trace(operationName = "job.exec", resourceName = "MyJob.process")
  public static void process() {
    // 独自のメソッドをここに実装
  }
}
```


[1]: /ja/tracing/setup/java/#compatibility
[2]: /ja/tracing/visualization/#trace
[3]: https://mvnrepository.com/artifact/com.datadoghq/dd-trace-api
{{% /tab %}}
{{% tab "Python" %}}

対応するライブラリインスツルメンテーションを使用しない場合（ [ライブラリの互換性][1]参照）、手動でコードをインスツルメントする必要があります。

`ddtrace` ライブラリの機能性を拡張したり、アプリケーションのインスツルメントをより精確に制御するのに役立つ方法がライブラリにあります。

以下の例はグローバルトレーサーオブジェクトを使用します。インポート元：

```python
  from ddtrace import tracer
```

**デコレータ**

`ddtrace` はアプリケーションで特定のメソッドをトレースする際に使用できるデコレータを提供します。

```python
  @tracer.wrap()
  def business_logic():
    """トレース対象のメソッド"""
    # ...
    # ...
```

デコレータの API 詳細は、[`ddtrace.Tracer.wrap()`][2]で確認できます。

**コンテキストマネージャー**

任意のコードブロックをトレースするのに、[`ddtrace.Span`][3] コンテキストマネージャーを使用できます。

```python
  # 操作をトレース
  with tracer.trace('interesting.operations'):
    # 操作を実行
    # ...
    # ...
```

API の詳細は [`ddtrace.Tracer()`][4] で確認できます

**API の使用**

上記以外のトレーシング方法として、[スパン][5]の開始と終了を可能にする手動 API があります。これに必要なのは、

```python
span = tracer.trace('operations.of.interest')

# 間に操作を実行

# 注：span.finish() を呼び出すか、トレース全体が送信されないようにします
# Datadog 宛て
span.finish()
```

デコレータの API 詳細はこちらで確認できます。

- [`ddtrace.Tracer.trace`][6]
- [`ddtrace.Span.finish`][7]



[1]: /ja/tracing/setup/python/#compatibility
[2]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#ddtrace.Tracer.wrap
[3]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#ddtrace.Span
[4]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#tracer
[5]: /ja/tracing/visualization/#spans
[6]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#ddtrace.Tracer.trace
[7]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#ddtrace.Span.finish
{{% /tab %}}
{{% tab "Ruby" %}}

対応するライブラリインスツルメンテーションを使用しない場合（ [ライブラリの互換性][1]参照）、手動でコードをインスツルメントする必要があります。コードにトレーシングを追加するには、Ruby コードにラップできる `Datadog.tracer.trace` メソッドを使うと簡単です。

**使用例**

```ruby
# Sinatra エンドポイントの例、
# Datadog でリクエスト周りをトレーシング
# データベースクエリ、およびレンダリング手順。
get '/posts' do
  Datadog.tracer.trace('web.request', service: '<サービス名>', resource: 'GET /posts') do |span|
    # activerecord 呼び出しをトレース
    Datadog.tracer.trace('posts.fetch') do
      @posts = Posts.order(created_at: :desc).limit(10)
    end

    # APM タグを追加
    span.set_tag('http.method', request.request_method)
    span.set_tag('posts.count', @posts.length)

    # テンプレートレンダリングをトレース
    Datadog.tracer.trace('template.render') do
      erb :index
    end
  end
end
```

手動インスツルメンテーションに関する詳細は、[API ドキュメント][2]を参照してください。

[1]: /ja/tracing/setup/ruby/#compatibility
[2]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#manual-instrumentation
{{% /tab %}}
{{% tab "Go" %}}

対応するライブラリインスツルメンテーションを使用しない場合（ [ライブラリの互換性][1]参照）、手動でコードをインスツルメントする必要があります。

手動インスツルメンテーションの活用には、Datadog の [godoc ページ][2]を参考に、`tracer` パッケージを使用してください。

**使用例**

```go
package main

import "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"

func main() {
    // オプションの数にかかわらずトレーサーを開始します。
    tracer.Start(tracer.WithServiceName("<サービス名>"))
    defer tracer.Stop()

    // /posts URL で Web リクエストのスパンを作成します。
    span := tracer.StartSpan("web.request", tracer.ResourceName("/posts"))
    defer span.Finish()

    // メタデータを設定
    span.SetTag("<タグキー>", "<タグの値>")
}
```

**トレースコンテキストを手動で伝播して、分散[トレース][3]を作成します。**

```go
package main

import (
    "net/http"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    span, ctx := tracer.StartSpanFromContext(r.Context(), "post.process")
    req, err := http.NewRequest("GET", "http://example.com", nil)
    req = req.WithContext(ctx)
    // リクエストヘッダへスパンコンテキストを挿入します。
    err = tracer.Inject(span.Context(), tracer.HTTPHeadersCarrier(r.Header))
    if err != nil {
        // 挿入エラーの処理またはログ
    }
    http.DefaultClient.Do(req)
}
```

**次に、サーバー側で抽出された`コンテキスト`から[スパン][4]を開始し、トレースを続けます。**

```go
package main

import (
    "net/http"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    // スパンコンテキストを抽出し、このサービスでトレースを続行
    sctx, err := tracer.Extract(tracer.HTTPHeadersCarrier(r.Header))
    if err != nil {
        // 挿入エラーの処理またはログ
    }

    span := tracer.StartSpan("post.filter", tracer.ChildOf(sctx))
    defer span.Finish()
}
```


[1]: /ja/tracing/setup/go/#compatibility
[2]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer
[3]: /ja/tracing/visualization/#trace
[4]: /ja/tracing/visualization/#spans
{{% /tab %}}
{{% tab "Node.js" %}}

対応するライブラリインスツルメンテーションを使用しない場合（ [ライブラリの互換性][1]参照）、手動でコードをインスツルメントする必要があります。

次の例では Datadog トレーサーを初期化し、`web.request` と呼ばれる[スパン][2]を作成します。

```javascript
const tracer = require('dd-trace').init()
const span = tracer.startSpan('web.request')

span.setTag('http.url', '/login')
span.finish()
```

手動インスツルメンテーションに関する詳細は、[API ドキュメント][3]を参照してください。

[1]: /ja/tracing/setup/nodejs/#compatibility
[2]: /ja/tracing/visualization/#spans
[3]: https://datadog.github.io/dd-trace-js/#manual-instrumentation
{{% /tab %}}
{{% tab ".NET" %}}

自動インスツルメンテーションでサポートされるライブラリを使用しない場合（[インテグレーション][1]参照）、手動でコードをインスツルメントする必要があります。

次の例ではグローバル`トレーサー`を使いカスタム[スパン][2]を作成し、Web リクエストを[トレース][3]します。

```csharp
using Datadog.Trace;

using(var scope = Tracer.Instance.StartActive("web.request"))
{
    var span = scope.Span;
    span.Type = SpanTypes.Web;
    span.ResourceName = request.Url;
    span.SetTag(Tags.HttpMethod, request.Method);

    // 作業を実行...
}
```

[1]: /ja/tracing/setup/dotnet/#integrations
[2]: /ja/tracing/visualization/#spans
[3]: /ja/tracing/visualization/#trace
{{% /tab %}}

{{% tab "PHP" %}}

Datadog が公式にはサポートしていない Web フレームワークでも、手動インスツルメンテーションが必要ない場合もあります。詳細は、[自動インスツルメンテーション][1]をご覧ください。

アプリケーションで特定のカスタムメソッドを[トレース][2]したいなど、手動でのインスツルメンテーションが絶対に必要な場合は、最初に Composer を使い PHP トレーサーの依存関係をインストールします。

```bash
$ composer require datadog/dd-trace
```

**カスタム関数またはメソッドのトレース**

`dd_trace()` 関数は既存の関数やメソッドにフックして、以下を行います。

* コードを実行する前に [スパン][3]を開く
* スパンに追加の[タグ][4]やエラーを設定
* 終了時にスパンを閉じる
* 引数または戻り値を変更

たとえば、次のスニペットは `CustomDriver::doWork()` メソッドをトレースし、カスタムタグを追加し、例外をスパンのエラーとして報告してから例外を再度スローします。

```php
<?php
  dd_trace("CustomDriver", "doWork", function (...$args) {
      // 新しいスパンを開始
      $scope = \DDTrace\GlobalTracer::get()->startActiveSpan('CustomDriver.doWork');
      $span = $scope->getSpan();

      // $thisを介しオブジェクトメンバーにアクセス
      $span->setTag(\DDTrace\Tag::RESOURCE_NAME, $this->workToDo);

      try {
          // オリジナルのメソッドを実行。注：dd_trace_forward_call() - パラメーターを自動的に処理します
          $result = dd_trace_forward_call();
          // 戻り値に基づいてタグを設定
          $span->setTag('doWork.size', count($result));
          return $result;
      } catch (Exception $e) {
          // 例外がスローされたことをトレーサーに通知
          $span->setError($e);
          // 例外をバブルアップ
          throw $e;
      } finally {
          // スパンを閉じる
          $span->finish();
      }
  });
?>
```

ルートスパンには、グローバルトレーサーから `Tracer::getRootScope()` を介して後から直接アクセスできます。これはルートスパンに追加されるべきメタデータが初期のスクリプト実行時に存在しない場合などに便利です。

```php
<?php
  $rootSpan = \DDTrace\GlobalTracer::get()
      ->getRootScope()
      ->getSpan();
  $rootSpan->setTag(\DDTrace\Tag::HTTP_STATUS_CODE, 200);
?>
```

**Zend Framework 1 手動インスツルメンテーション**

デフォルトで、Zend Framework 1 は自動的にインスツルメントされるため、ZF1 プロジェクトを変更する必要はありません。ただし、自動インスツルメンテーションが無効になっている場合は、トレーサーを手動で有効にします。

まず、[リリースページから最新のソースコードをダウンロードします][5]。ZIP ファイルを解凍し、アプリケーションの`/library` フォルダに `src/DDTrace` フォルダをコピーします。次に、`application/configs/application.ini` ファイルに以下を追加します。

```ini
autoloaderNamespaces[] = "DDTrace_"
pluginPaths.DDTrace = APPLICATION_PATH "/../library/DDTrace/Integrations/ZendFramework/V1"
resources.ddtrace = true
```

**手動インスツルメンテーションと PHP コードの最適化**

 PHP 7 より前のフレームワークでは、Laravel の `php artisan optimize` コマンドなど、PHP クラスをコンパイルする方法がありました。

これは[推奨されませんが][6]、PHP 7.x を使用している場合、バージョン 7 より前のアプリでは、このキャッシュメカニズムを使うことができます。この場合、Datadog は Composer ファイルに `datadog/dd-trace` を追加する方法ではなく、[OpenTracing][7] API の使用を推奨します。

[1]: /ja/tracing/setup/php/#automatic-instrumentation
[2]: /ja/tracing/visualization/#trace
[3]: /ja/tracing/visualization/#spans
[4]: /ja/tracing/visualization/#span-tags
[5]: https://github.com/DataDog/dd-trace-php/releases/latest
[6]: https://laravel-news.com/laravel-5-6-removes-artisan-optimize
[7]: /ja/tracing/opentracing/?tab=php
{{% /tab %}}
{{% tab "C++" %}}

コードの手動インスツルメンテーションをするには、セットアップ例のとおりトレーサーをインストールし、トレーサーオブジェクトを使用し [スパン][1] を作成します。

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

分散型トレーシングは[トレーサーの `Inject` そして `Extract` メソッドを使用][2]することで実現でき、[一般的な `Reader` や `Writer` タイプ][3]を受け入れます。スパンの均一なデリバリーのため、優先度付きサンプリング（デフォルトで有効）は有効でなければなりません。

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

[1]: /ja/tracing/visualization/#spans
[2]: https://github.com/opentracing/opentracing-cpp/#inject-span-context-into-a-textmapwriter
[3]: https://github.com/opentracing/opentracing-cpp/blob/master/include/opentracing/propagation.h
{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/visualization