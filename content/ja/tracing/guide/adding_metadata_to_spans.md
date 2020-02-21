---
title: スパンタグの追加
kind: documentation
aliases:
  - /ja/tracing/advanced/adding_metadata_to_spans/
further_reading:
  - link: tracing/connect_logs_and_traces
    tags: トレースの加工
    text: ログとトレースの接続
  - link: tracing/manual_instrumentation
    tags: トレースの加工
    text: 手動でアプリケーションのインスツルメンテーションを行いトレースを作成します。
  - link: tracing/opentracing
    tags: トレースの加工
    text: アプリケーション全体に Opentracing を実装します。
  - link: tracing/visualization/
    tag: APM の UI を利用する
    text: サービス、リソース、トレースの詳細
---
[タグ][1]をキーと値のペアの形式で追加して、トレースを他の Datadog 製品と関連付けることができます。これにより、特定のスパンに関する詳細が提供されます。タグは、[単一スパン](#adding-tags-to-a-span)にすることも、[グローバルにすべてのスパン](#adding-tags-globally-to-all-spans)に追加することもできます。

**注**: トレースメタデータはタグを介して追加されますが、タグはすでに [Datadog][2] 全体で特定の意味を持っています。

## スパンにタグを追加する

{{< tabs >}}
{{% tab "Java" %}}

Datadog UI は、[タグ][1]を使用して[スパン][2]レベルのメタデータを設定します。これらのタグの完全なリストは、[Datadog][3] および [OpenTracing][4] API にあります。

カスタムタグは、グローバルトレーサーからアクティブなスパンを取得し、`setTag` を使用してタグを設定することにより、自動インスツルメンテーション用に設定できます。

```java
import io.opentracing.Tracer;
import io.opentracing.util.GlobalTracer;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet
class ServletImpl extends AbstractHttpServlet {
  @Override
  void doGet(HttpServletRequest req, HttpServletResponse resp) {
    final Span span = GlobalTracer.get().activeSpan();
    if (span != null) {
      span.setTag("customer.id", req.getParameter("customer_id"));
      span.setTag("<タグキー>", "<タグ値>");
    }
    // サーブレット実装
  }
}
```

[1]: /ja/tracing/visualization/#span-tags
[2]: /ja/tracing/visualization/#spans
[3]: https://github.com/DataDog/dd-trace-java/blob/master/dd-trace-api/src/main/java/datadog/trace/api/DDTags.java
[4]: https://github.com/opentracing/opentracing-java/blob/master/opentracing-api/src/main/java/io/opentracing/tag/Tags.java
{{% /tab %}}
{{% tab "Python" %}}

`set_tag` を呼び出すことにより、[タグ][1]を[スパン][2]に直接追加します。たとえば、次のルートハンドラの場合:

```python
from ddtrace import tracer

@app.route('/customer/<int:customer_id>')
def handle_customer(customer_id):
  with tracer.trace('web.request') as span:
    span.set_tag('customer.id', customer_id)
    span.set_tag('<タグキー>', '<タグ値>')
```

現在のスパンをコンテキストから取得して、タグを設定できます。こうすることで、インスツルメンテーションによってスパンが開始された場合、スパンを取得してカスタムタグを追加できます。**注**: スパンが存在しない場合、`None` が返されます。

```python
from ddtrace import tracer

@app.route('/customer/<int:customer_id>')
@tracer.wrap()
def handle_customer(customer_id):
  # コンテキスト内のアクティブなスパンを取得し、そこに tracer.wrap() で配置します
  current_span = tracer.current_span()
  if current_span:
    current_span.set_tag('customer.id', customer_id)
    current_span.set_tag('<タグキー>', '<タグ値>')
```

[1]: /ja/tracing/visualization/#span-tags
[2]: /ja/tracing/visualization/#spans
{{% /tab %}}
{{% tab "Ruby" %}}

`#set_tag` を呼び出して、`Datadog::Span` オブジェクトに[タグ][1]を直接追加します。

```ruby
# Sinatra エンドポイントの例。
# Datadog がリクエストをトレースします。
get '/posts' do
  Datadog.tracer.trace('web.request') do |span|
    span.set_tag('http.url', request.path)
    span.set_tag('<タグキー>', '<タグ値>')
  end
end
```

コード内の任意のメソッドから現在アクティブな[スパン][2]にアクセスします。**注**: メソッドが呼び出され、現在アクティブなスパンがない場合、`active_span` は `nil` です。

```ruby
# 例: アクティブなスパンにタグを追加する

current_span = Datadog.tracer.active_span
current_span.set_tag('<タグキー>', '<タグ値>') unless current_span.nil?
```

[1]: /ja/tracing/visualization/#span-tags
[2]: /ja/tracing/visualization/#spans
{{% /tab %}}
{{% tab "Go" %}}

`SetTag` を呼び出して、`Span` インターフェイスに[タグ][1]を直接追加します。

```go
package main

import (
    "log"
    "net/http"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    // /posts URL でウェブリクエストのスパンを作成します。
    span := tracer.StartSpan("web.request", tracer.ResourceName("/posts"))
    defer span.Finish()

    // タグを設定
    span.SetTag("http.url", r.URL.Path)
    span.SetTag("<タグキー>", "<タグ値>")
}

func main() {
    tracer.Start(tracer.WithServiceName("<サービス名>"))
    defer tracer.Stop()
    http.HandleFunc("/posts", handler)
    log.Fatal(http.ListenAndServe(":8080", nil))
}
```

Datadog のインテグレーションでは、`Context` タイプを使用して、現在アクティブな[スパン][2]を伝播します。
`Context` にアタッチされたスパンタグを追加したい場合、`SpanFromContext` 関数を呼び出します。

```go
package main

import (
    "net/http"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    // Go Context にアタッチされたウェブリクエストのスパンを取得します。
    if span, ok := tracer.SpanFromContext(r.Context()); ok {
        // タグを設定
        span.SetTag("http.url", r.URL.Path)
    }
}
```

[1]: /ja/tracing/visualization/#span-tags
[2]: /ja/tracing/visualization/#spans
{{% /tab %}}
{{% tab "Node.js" %}}

`setTag` または `addTags` を呼び出して、スパンオブジェクトに[タグ][1]を直接追加します。

```javascript
// Express エンドポイントの例。
// Datadog がリクエストをトレースします。
app.get('/posts', (req, res) => {
  const span = tracer.startSpan('web.request')

  span.setTag('http.url', req.url)
  span.addTags({'http.method': req.method})
  span.addTags({'<タグキー>': '<タグ値>'})
})
```

コード内の任意のメソッドから現在アクティブな[スパン][2]にアクセスします。**注**: メソッドが呼び出され、現在アクティブなスパンがない場合、`tracer.scope().active()` は `null` を返します。

```javascript
// 例: アクティブなスパンにタグを追加する

const span = tracer.scope().active()

span.setTag('<タグキー>', '<タグ値>')
```

[1]: /ja/tracing/visualization/#span-tags
[2]: /ja/tracing/visualization/#spans
{{% /tab %}}
{{% tab ".NET" %}}

`Span.SetTag()` を呼び出して、`Datadog.Trace.Span` オブジェクトに[タグ][1]を直接追加します。例:

```csharp
using Datadog.Trace;

// グローバルトレーサーを介してアクティブなスコープにアクセスします（null を返すことができます）
var scope = Tracer.Instance.ActiveScope;

// スパンにタグを追加します
scope.Span.SetTag("<タグキー>", "<タグ値>");
```

**注**: アクティブ[スパン][2]がない場合、`Datadog.Trace.Tracer.Instance.ActiveScope` は `null` を返します。

[1]: /ja/tracing/visualization/#span-tags
[2]: /ja/tracing/visualization/#spans
{{% /tab %}}
{{% tab "PHP" %}}

`Span::setTag()` を呼び出して、`DDTrace\Span` オブジェクトに[タグ][1]を直接追加します。例:

```php
<?php
  // 現在アクティブなスパンを取得します（null も可能）
  $span = \DDTrace\GlobalTracer::get()->getActiveSpan();
  if (null !== $span) {
    // スパンにタグを追加します
    $span->setTag('<タグキー>', '<タグ値>');
  }
?>
```

**注**: アクティブ[スパン][2]がない場合、`Tracer::getActiveSpan()` は `null` を返します。

[1]: /ja/tracing/visualization/#span-tags
[2]: /ja/tracing/visualization/#spans
{{% /tab %}}
{{< /tabs >}}

## すべてのスパンにグローバルにタグを追加する

{{< tabs >}}
{{% tab "Java" %}}

システムプロパティ `Ddd.trace.global.tags` でトレーサーを構成して、すべての[スパン][2]に[タグ][1]を追加します。

```bash
java -javaagent:<DD-JAVA-エージェントパス>.jar \
     -Ddd.trace.global.tags=env:dev,<タグキー>:<タグ値> \
     -jar <アプリケーションパス>.jar
```

[1]: /ja/tracing/visualization/#span-tags
[2]: /ja/tracing/visualization/#spans
{{% /tab %}}
{{% tab "Python" %}}

`tracer.set_tags` メソッドでトレーサーを構成して、すべての[スパン]スパンに[タグ][1]を追加します。

```python
from ddtrace import tracer

tracer.set_tags({ 'env': 'dev' })
```

[1]: /ja/tracing/visualization/#span-tags
{{% /tab %}}
{{% tab "Ruby" %}}

`tags` オプションでトレーサーを構成して、すべての[スパン][2]に[タグ][1]を追加します。

```ruby
Datadog.configure do |c|
  c.tracer tags: { 'env' => 'dev' }
end
```

詳細については、[API に関するドキュメント][3]を参照してください。

[1]: /ja/tracing/visualization/#span-tags
[2]: /ja/tracing/visualization/#spans
[3]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#environment-and-tags
{{% /tab %}}
{{% tab "Go" %}}

`tags` オプションでトレーサーを構成して、すべての[スパン][2]に[タグ][1]を追加します。

```go
package main

import "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"

func main() {
    tracer.Start(
        tracer.WithGlobalTag("datacenter", "us-1"),
        tracer.WithGlobalTag("env", "dev"),
    )
    defer tracer.Stop()
}
```

[1]: /ja/tracing/visualization/#span-tags
[2]: /ja/tracing/visualization/#spans
{{% /tab %}}
{{% tab "Node.js" %}}

`tags` パラメーターでトレーサーを構成して、すべての[スパン][2]に[タグ][1]を追加します。

```js
const tracer = require('dd-trace').init({
  tags: {
    env: 'dev',
    '<タグキー>': '<タグ値>'
  }
})
```

[1]: /ja/tracing/visualization/#span-tags
[2]: /ja/tracing/visualization/#spans
{{% /tab %}}
{{% tab ".NET" %}}

トレーサーを構成して、生成されたすべての[スパン][2]に[タグ][1]を追加します。[.NET 構成][3]セクションに示すように、構成を設定するにはいくつかの方法があります。

この例では、環境変数を設定します。

```ini
DD_TRACE_GLOBAL_TAGS=key1:value1,key2:value2
```

[1]: /ja/tracing/visualization/#span-tags
[2]: /ja/tracing/visualization/#spans
[3]: /ja/tracing/setup/dotnet/#configuration
{{% /tab %}}
{{% tab "PHP" %}}

環境変数 `DD_TRACE_GLOBAL_TAGS` を使用して、生成されたすべての[スパン][2]に[タグ][1]を追加します。環境変数の設定方法の詳細については、[PHP 構成][3]セクションを参照してください。

```ini
DD_TRACE_GLOBAL_TAGS=key1:value1,key2:value2
```

[1]: /ja/tracing/visualization/#span-tags
[2]: /ja/tracing/visualization/#spans
[3]: /ja/tracing/setup/php/#configuration
{{% /tab %}}
{{% tab "C++" %}}

`Span::SetTag` を呼び出して、[スパン][2]に[タグ][1]を直接追加します。例:

```cpp
auto tracer = ...
auto span = tracer->StartSpan("オペレーション名");
span->SetTag("キーは文字列でなければなりません", "値は変数タイプです");
span->SetTag("キーは文字列でなければなりません", 1234);
```

値は[変数タイプ][3]であり、複雑なオブジェクトにすることができます。値は JSON としてシリアル化されますが、文字列値はそのままシリアル化されます（余分な引用符はありません）。

[1]: /ja/tracing/visualization/#span-tags
[2]: /ja/tracing/visualization/#spans
[3]: https://github.com/opentracing/opentracing-cpp/blob/master/include/opentracing/value.h
{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/visualization/#span-tags
[2]: /ja/tagging