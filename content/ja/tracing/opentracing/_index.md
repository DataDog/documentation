---
title: OpenTracing
kind: documentation
aliases:
  - /ja/tracing/advanced/opentracing/
description: Datadog APM トレーサーを使用して OpenTracing 標準を実装します。
further_reading:
  - link: tracing/connect_logs_and_traces
    tags: トレースの加工
    text: ログとトレースの接続
  - link: tracing/manual_instrumentation
    tags: トレースの加工
    text: 手動でアプリケーションのインスツルメンテーションを行いトレースを作成します。
  - link: tracing/visualization/
    tag: APM の UI を利用する
    text: サービス、リソース、トレースの詳細
---
OpenTracing は、アプリケーションをトレースするためのベンダーに依存しない、言語間の標準です。Datadog は、多くの APM トレーサーに OpenTracing 実装を提供しています。詳細については、[opentracing.io][1] を参照してください。

{{< tabs >}}
{{% tab "Java" %}}

[OpenTracing API][1] と Datadog Tracer (dd-trace-ot) ライブラリを使用して、特定のコードの実行時間を測定します。これにより、Java Agent だけでできるよりも正確にアプリケーションを[トレース][2]できます。

#### セットアップ

Maven の場合、これを `pom.xml` に追加します。

```xml
<!-- OpenTracing API -->
<dependency>
    <groupId>io.opentracing</groupId>
    <artifactId>opentracing-api</artifactId>
    <version>0.31.0</version>
</dependency>

<!-- OpenTracing Util -->
<dependency>
    <groupId>io.opentracing</groupId>
    <artifactId>opentracing-util</artifactId>
    <version>0.31.0</version>
</dependency>

<!-- Datadog Tracer（dd-java-agent を使用しない場合にのみ必要） -->
<dependency>
    <groupId>com.datadoghq</groupId>
    <artifactId>dd-trace-ot</artifactId>
    <version>${dd-trace-java.version}</version>
</dependency>
```

Gradle の場合は、次を追加します:

```text
compile group: 'io.opentracing', name: 'opentracing-api', version: "0.31.0"
compile group: 'io.opentracing', name: 'opentracing-util', version: "0.31.0"
compile group: 'com.datadoghq', name: 'dd-trace-ot', version: "${dd-trace-java.version}"
```

[構成][3]セクションで説明されているように、環境変数またはシステムプロパティを使用してアプリケーションを構成します。

#### OpenTracing による手動インスツルメンテーション

自動インスツルメンテーションでは十分な深さや詳細が得られない場合は、これらの組み合わせを使用します。

try-finally の使用

```java
import datadog.trace.api.DDTags;

import io.opentracing.Scope;
import io.opentracing.Tracer;
import io.opentracing.util.GlobalTracer;

class InstrumentedClass {

    void method0() {
        /*
         * 1. 環境変数またはシステムプロパティを使用してアプリケーションを構成します
         * 2. dd-java-agent (-javaagent:/path/to/dd-java-agent.jar) を使用すると、
         *    GlobalTracer が自動的にインスタンス化されます。
         */
        Tracer tracer = GlobalTracer.get();

        Scope scope = tracer.buildSpan("<オペレーション名>").startActive(true);
        try {
            scope.span().setTag(DDTags.サービス名, "<サービス名>");

            // トレースしているコード
            Thread.sleep(1000);

        // close() を呼び出さないと、スパンデータは Datadog に到達しません！
        } finally {
            scope.close();
        }
    }
}
```

または、`try-with-resources` ステートメントで[トレース][2]するコードをラップします。

```java
import datadog.trace.api.DDTags;

import io.opentracing.Scope;
import io.opentracing.Tracer;
import io.opentracing.util.GlobalTracer;

class InstrumentedClass {

    void method0() {
        Tracer tracer = GlobalTracer.get();

        try (Scope scope = tracer.buildSpan("<オペレーション名>").startActive(true)) {
            scope.span().setTag(DDTags.サービス名, "<サービス名>");
            Thread.sleep(1000);
        }
    }
}
```

この場合、`scope.close()` を呼び出す必要はありません。

`dd-java-agent.jar` を使用していない場合は、構成済みのトレーサーを `GlobalTracer` に登録する必要があります。そのためには、アプリケーションの起動の早い段階（例: メインメソッド）で `GlobalTracer.register(new DDTracer())` を呼び出します。

```java
import datadog.opentracing.DDTracer;
import io.opentracing.Tracer;
import io.opentracing.util.GlobalTracer;
import datadog.trace.common.sampling.AllSampler;
import datadog.trace.common.writer.DDAgentWriter;

//API の例の場合
import datadog.trace.common.writer.Writer;
import datadog.trace.common.sampling.Sampler;

public class Application {

    public static void main(String[] args) {

        // 環境変数またはシステムプロパティからトレーサーを初期化します
        DDTracer tracer = new DDTracer();
        GlobalTracer.register(tracer);
        // 同じトレーサーを Datadog API に登録します
        datadog.trace.api.GlobalTracer.registerIfAbsent(tracer);

        // または API から
        Writer writer = new DDAgentWriter();
        Sampler sampler = new AllSampler();
        String service = "Service Name";
        Tracer tracer = new DDTracer(service,writer, sampler);
        GlobalTracer.register(tracer);

        // ...
    }
}
```

#### 非同期トレースの手動インスツルメンテーション

OpenTracing API を使用して、手動インスツルメンテーションで非同期[トレース][2]を作成します。

```java
// ステップ 1: ワーク送信スレッドでスコープ/スパンを開始します
try (Scope scope = tracer.buildSpan("ServiceHandlerSpan").startActive(false)) {
    final Span span = scope.span();
    doAsyncWork(new Runnable() {
        @Override
        public void run() {
            // ステップ 2: ワーカースレッドでスパンを再アクティブ化します
            try (Scope scope = tracer.scopeManager().activate(span, false)) {
              // ワーカースレッドの実装...
            }
        }
    });
    // 送信スレッドの実装...
}
```

#### OpenTracing の手動インスツルメンテーションを使用して分散トレースを作成する

```java
// ステップ 1: クライアントコードに Datadog ヘッダーを挿入します
try (Scope scope = tracer.buildSpan("httpClientSpan").startActive(true)) {
    final Span span = scope.span();
    HttpRequest request = /* ここにあなたのコード */;

    tracer.inject(span.context(),
                  Format.Builtin.HTTP_HEADERS,
                  new MyHttpHeadersInjectAdapter(request));

    // HTTP リクエストの実装...
}

public static class MyHttpHeadersInjectAdapter implements TextMap {
  private final HttpRequest httpRequest;

  public HttpHeadersInjectAdapter(final HttpRequest httpRequest) {
    this.httpRequest = httpRequest;
  }

  @Override
  public void put(final String key, final String value) {
    httpRequest.addHeader(key, value);
  }

  @Override
  public Iterator<Map.Entry<String, String>> iterator() {
    throw new UnsupportedOperationException("このクラスは、tracer#inject() でのみ使用する必要があります");
  }
}

// ステップ 2: サーバーコードで Datadog ヘッダーを抽出します
HttpRequest request = /* ここにあなたのコード */;

final SpanContext extractedContext =
  GlobalTracer.get().extract(Format.Builtin.HTTP_HEADERS,
                             new MyHttpRequestExtractAdapter(request));

try (Scope scope = tracer.buildSpan("httpServerSpan").asChildOf(extractedContext).startActive(true)) {
    final Span span = scope.span(); // ステップ 1 の HTTP クライアントスパンの子
    // HTTP サーバーの実装...
}

public class MyHttpRequestExtractAdapter implements TextMap {
  private final HttpRequest request;

  public HttpRequestExtractAdapter(final HttpRequest request) {
    this.request = request;
  }

  @Override
  public Iterator<Map.Entry<String, String>> iterator() {
    return request.headers().iterator();
  }

  @Override
  public void put(final String key, final String value) {
    throw new UnsupportedOperationException("このクラスは、Tracer.extract()! でのみ使用する必要があります");
  }
}
```

上記の例では OpenTracing クラスのみを使用していることに注意してください。詳細については、[OpenTracing API][1] を確認してください。

#### エラーを設定する

スパンの 1 つに関連するエラーをカスタマイズするには、 `io.opentracing.Span`、`io.opentracing.tag.Tags`、および `io.opentracing.util.GlobalTracer` ライブラリをエラーが発生するメソッドにインポートします。

```java
import io.opentracing.Span;
import io.opentracing.tag.Tags;
import io.opentracing.util.GlobalTracer;
```

次に、エラーを `true` に設定し、*少なくとも* `error.msg`、`error.type`、`error.stack` タグをスパンに追加します。

```java
    final Span span = GlobalTracer.get().activeSpan();
    if (span != null) {
      Tags.ERROR.set(span, true);
      span.log(Collections.singletonMap(Fields.ERROR_OBJECT, ex));
    }
```

**注**: [トレースビューのドキュメント][4]で説明されている関連エラーメタデータも追加できます。
現在のスパンがルートスパンではない場合、`dd-trace-api` ライブラリを使用してエラーとしてマークし、`MutableSpan` でルートスパンを取得してから、`setError(true)` を使用します。詳細については、[ソースコード][5]を参照してください。

[1]: https://github.com/opentracing/opentracing-java
[2]: /ja/tracing/visualization/#trace
[3]: /ja/tracing/setup/java/#configuration
[4]: /ja/tracing/visualization/trace/?tab=spantags#more-information
[5]: https://github.com/DataDog/dd-trace-java/blob/master/dd-trace-api/src/main/java/datadog/trace/api/interceptor/MutableSpan.java#L51
{{% /tab %}}
{{% tab "Python" %}}

**セットアップ**:

OpenTracing のサポートは `ddtrace` パッケージに含まれています。`pip` を使用して、必要な `opentracing` パッケージをインストールします。

```sh
$ pip install ddtrace[opentracing]
```

**使用方法**:

トレーサーを初期化するための OpenTracing の規則は、新しいトレーサーを構成、インスタンス化し、グローバルな `opentracing.tracer` 参照を上書きする初期化メソッドを定義することです。

```python
import time
import opentracing
from ddtrace.opentracer import Tracer, set_global_tracer

def init_tracer(service_name):
    config = {
      'agent_hostname': 'localhost',
      'agent_port': 8126,
    }
    tracer = Tracer(service_name, config=config)
    set_global_tracer(tracer)
    return tracer

def my_operation():
  span = opentracing.tracer.start_span('<オペレーション名>')
  span.set_tag('<タグキー>', '<タグ値>')
  time.sleep(0.05)
  span.finish()

init_tracer('<サービス名>')
my_operation()
```

より高度な使用法と構成情報については、[Datadog Python Opentracing API ドキュメント][1]および [Python OpenTracing リポジトリ][2]を参照してください。

[1]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#opentracing
[2]: https://github.com/opentracing/opentracing-python
{{% /tab %}}
{{% tab "Ruby" %}}

OpenTracing で Datadog をセットアップするには、詳細について Ruby [OpenTracing のクイックスタート][1]を参照してください。

**Datadog トレーサー設定の構成**

基底の Datadog トレーサーは、グローバルトレーサーを構成するときにオプション（ `Datadog::Tracer` と一致）を渡すことで構成できます。

```ruby
# `options` は Datadog::Tracer に提供されるオプションのハッシュです
OpenTracing.global_tracer = Datadog::OpenTracer::Tracer.new(options)
```

[Ruby トレーサー設定][2]セクションで説明されているように、`Datadog.configure` を使用して構成することもできます。

**インテグレーションのアクティブ化と構成**

デフォルトでは、Datadog で OpenTracing を構成しても、Datadog が提供する追加のインスツルメンテーションは自動的にアクティブになりません。アプリケーションにある OpenTracing インスツルメンテーションからのみ[スパン][3]と[トレース][4]を受け取ります。

ただし、Datadog が提供する追加のインスツルメンテーションは、`Datadog.configure` を使用して OpenTracing とともにアクティブ化できます。これは、トレースをさらに強化するために使用できます。これを有効にするには、[Ruby インテグレーションインスツルメンテーション][5]で詳細をご覧ください。

**サポートされているシリアル化形式**

| 種類                           | サポート | 追加情報                                                                                                                                                                                                                                                                                        |
|--------------------------------|------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `OpenTracing::FORMAT_TEXT_MAP` | はい        |                                                                                                                                                                                                                                                                                                               |
| `OpenTracing::FORMAT_RACK`     | はい        | Rack 形式では解決が失われるため、大文字または `-` のいずれかを含む名前のバゲージアイテムは、往復でそれぞれ小文字と `_` に変換されることに注意してください。Datadog は、これらの文字を避けるか、受信側でそれに応じて対応することをお勧めします。 |
| `OpenTracing::FORMAT_BINARY`   | いいえ         |                                                                                                                                                                                                                                                                                                               |

[1]: /ja/tracing/setup/ruby/#quickstart-for-opentracing
[2]: /ja/tracing/setup/ruby/#tracer-settings
[3]: /ja/tracing/visualization/#spans
[4]: /ja/tracing/visualization/#trace
[5]: /ja/tracing/setup/ruby/#integration-instrumentation
{{% /tab %}}
{{% tab "Go" %}}

[`opentracer` パッケージ][1]をインポートして、Datadog トレーサーを [OpenTracing][2] 互換トレーサーとして公開します。

**例**:

基本的な使用例

```go
package main

import (
    "github.com/opentracing/opentracing-go"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/opentracer"
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func main() {
    // 通常のトレーサーを起動し、opentracing.Tracer インターフェイスとして返します。
    // Datadog トレーサーで通常使用するのと同じオプションのセットを使用できます。
    t := opentracer.New(tracer.WithServiceName("<サービス名>"))

    // トレーサーパッケージの通常の Stop 呼び出しを使用して停止します。
    defer tracer.Stop()

    // グローバル OpenTracing トレーサーを設定します。
    opentracing.SetGlobalTracer(t)

    // 通常どおり OpenTracing API を使用します。
}
```

**注**: [OpenTracing API][3] を通常の API または Datadog インテグレーションと並行して使用することは完全にサポートされています。内部的には、それらはすべて同じトレーサーを使用します。その他の例と詳細については、[API ドキュメント][1]を参照してください。

[1]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/opentracer
[2]: http://opentracing.io
[3]: https://github.com/opentracing/opentracing-go
{{% /tab %}}
{{% tab "Node.js" %}}
このライブラリは OpenTracing に準拠しています。（[OpenTracing API][1] と Datadog Tracer（[dd-trace][2]）ライブラリを使用して、特定のコードの実行時間を測定します。次の例では、Datadog Tracer が初期化され、グローバルトレーサーとして使用されます。

```javascript
// server.js

const tracer = require('dd-trace').init()
const opentracing = require('opentracing')

opentracing.initGlobalTracer(tracer)

const app = require('./app.js')

// app.js

const tracer = opentracing.globalTracer()
```

以下のタグを使用して、Datadog 固有のオプションをオーバーライドできます。

* `service.name`: このスパンに使用されるサービス名。これを指定しなかった場合、トレーサーからのサービス名が使用されます。
* `resource.name`: このスパンに使用されるリソース名。これを指定しなかった場合、オペレーション名が使用されます。
* `span.type`: このスパンに使用されるスパンタイプ。指定しなかった場合、スパンタイプは `custom` にフォールバックします。

[1]: https://doc.esdoc.org/github.com/opentracing/opentracing-javascript
[2]: https://datadog.github.io/dd-trace-js
{{% /tab %}}
{{% tab ".NET" %}}

OpenTracing をサポートするには、[`Datadog.Trace.OpenTracing`][1] NuGet パッケージをアプリケーションに追加します。アプリケーションの起動時に、OpenTracing ライブラリを初期化します。

```csharp
using Datadog.Trace.OpenTracing;

public void ConfigureServices(IServiceCollection services)
{
    // デフォルト設定で OpenTracing ITracer を作成します
    OpenTracing.ITracer tracer = OpenTracingTracerFactory.CreateTracer();

    // ASP.NET Core 依存関係の挿入でトレーサーを使用するには
    services.AddSingleton<ITracer>(tracer);

    // OpenTracing.GlobalTracer.Instance でトレーサーを使用するには
    GlobalTracer.Register(tracer);
}
```

[1]: https://www.nuget.org/packages/Datadog.Trace.OpenTracing
{{% /tab %}}
{{% tab "PHP" %}}

PHP トレーサーは、Composer と共にインストールされる [**opentracing/opentracing** ライブラリ][1]を介して OpenTracing をサポートします。

```bash
$ composer require opentracing/opentracing:1.0.0-beta5
```

[自動インスツルメンテーション][2]が有効になっている場合、OpenTracing 互換のトレーサーがグローバルトレーサーとして利用可能になります。

```php
<?php
  $otTracer = \OpenTracing\GlobalTracer::get();
  $span = $otTracer->startActiveSpan('web.request')->getSpan();
  $span->setTag('span.type', 'web');
  $span->setTag('http.method', $_SERVER['REQUEST_METHOD']);
  // ...期待どおりに OpenTracing を使用します
?>
```

[1]: https://github.com/opentracing/opentracing-php
[2]: /ja/tracing/setup/php/#automatic-instrumentation
{{% /tab %}}
{{% tab "C++" %}}

Datadog C++ トレーサーは、OpenTracing API を介してのみ使用できます。このドキュメントの使用手順はすべて、一般的な OpenTracing 機能について説明しています。

{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentracing.io