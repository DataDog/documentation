---
aliases:
- /ja/tracing/setup_overview/open_standards/java
- /ja/tracing/trace_collection/open_standards/java
- /ja/tracing/trace_collection/opentracing/java/
code_lang: java
code_lang_weight: 0
description: Java のための OpenTracing インスツルメンテーション
kind: ドキュメント
title: Java OpenTracing インスツルメンテーション
type: multi-code-lang
---

<div class="alert alert-info">OpenTracing のサポートは、非推奨の仕様に基づくものです。オープンな仕様でコードをインスツルメンテーションしたい場合は、代わりに OpenTelemetry を使用してください。<a href="/tracing/trace_collection/otel_instrumentation/java/">Datadog トレーシングライブラリの OpenTelemetry インスツルメンテーションからのデータを処理する</a>ためのベータサポートをお試しください。</div>

Datadog は [OpenTracing API][1] との連携が可能です。

## トラブルシューティング

Maven の場合、これを `pom.xml` に追加します。
```xml
<!-- OpenTracing API -->
<dependency>
    <groupId>io.opentracing</groupId>
    <artifactId>opentracing-api</artifactId>
    <version>0.32.0</version>
</dependency>

<dependency>
    <groupId>io.opentracing</groupId>
    <artifactId>opentracing-util</artifactId>
    <version>0.32.0</version>
</dependency>

<!-- Datadog API -->
<dependency>
    <groupId>com.datadoghq</groupId>
    <artifactId>dd-trace-api</artifactId>
    <version>${dd-trace-java.version}</version>
</dependency>

<!-- Datadog OpenTracing ブリッジ (自動インスツルメンテーションに dd-java-agent を使用しない場合にのみ必要) -->
<dependency>
    <groupId>com.datadoghq</groupId>
    <artifactId>dd-trace-ot</artifactId>
    <version>${dd-trace-java.version}</version>
</dependency>
```

Gradle の場合は、次を追加します:

```text
compile group: 'io.opentracing', name: 'opentracing-api', version: "0.32.0"
compile group: 'io.opentracing', name: 'opentracing-util', version: "0.32.0"
compile group: 'com.datadoghq', name: 'dd-trace-api', version: "${dd-trace-java.version}"
// Datadog OpenTracing ブリッジ (自動インスツルメンテーションに dd-java-agent を使用しない場合にのみ必要)
compile group: 'com.datadoghq', name: 'dd-trace-ot', version: "${dd-trace-java.version}"
```

コンフィギュレーションセクションで説明されているように、環境変数またはシステムプロパティを使用してアプリケーションを構成します。

自動インスツルメンテーションを使用していない場合は、構成済みのトレーサーを `GlobalTracer` に登録する必要があります。そのためには、アプリケーションの起動の早い段階 (例: メインメソッド) で `GlobalTracer.register(DDTracer.builder().build())` を呼び出します。

```java
import datadog.opentracing.DDTracer;
import io.opentracing.Tracer;
import io.opentracing.util.GlobalTracer;

public class Application {
    public static void main(String[] args) {
        DDTracer tracer = DDTracer.builder().build();
        GlobalTracer.register(tracer);
        // 同じトレーサーを Datadog API に登録します
        datadog.trace.api.GlobalTracer.registerIfAbsent(tracer);
    }
}
```

環境変数とシステムプロパティの他に、`DDTracer.Builder` インターフェイスの一部として追加のコンフィギュレーションオプションがあります。完全なリストについては、[Javadoc][2] を参照してください。

**注:** classpath に `dd-java-agent` を追加しないでください。予期せぬ挙動が生じる場合があります。

## 非同期トレース

非同期トレースは、スパンが 1 つのスレッドで開始され、別のスレッドで終了したときです。この動作をインスツルメントするには、スパンがアクティブな各スレッドで新しいスコープを使用する必要があります。
```java
// ステップ 1: ワーク送信スレッドでスコープ/スパンを開始します
final Tracer tracer = GlobalTracer.get();
final Span span = tracer.buildSpan("ServicehandlerSpan").start();

try (final Scope scope = tracer.activateSpan(span)) {
    // 送信スレッド実装...

    submitAsyncTask(new Runnable() {
        @Override
        public void run() {
            // ステップ 2: ワーカースレッドでスパンを再アクティブ化します
            try (final Scope scope = tracer.activateSpan(span)) {
              // ワーカースレッド実装
            } finally {
              // ステップ 3: ワークが完了したらスパンを終了します
              span.finish();
            }
       }
    });
}
```

## 分散トレースのコンテキストの挿入と抽出

OpenTracing の手動インスツルメンテーションを使用して分散トレースを作成する:

```java
// ステップ 1: クライアントコードに Datadog ヘッダーを挿入します
Span span = tracer.buildSpan("httpClientSpan").start();
try (Scope scope = tracer.activate(span)) {
    HttpRequest request = /* your code here */;

    tracer.inject(span.context(),
                  Format.Builtin.HTTP_HEADERS,
                  new MyHttpHeadersInjectAdapter(request));

    // HTTP リクエストの実装...
} finally {
    span.finish();
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

// Step 2: ステップ 2: サーバーコードで Datadog ヘッダーを抽出します
HttpRequest request = /* ここにコードを記載 */;

final SpanContext extractedContext =
  GlobalTracer.get().extract(Format.Builtin.HTTP_HEADERS,
                             new MyHttpRequestExtractAdapter(request));

// ステップ 1 の HTTP クライアントスパンの子
Span span = tracer.buildSpan("httpServerSpan").asChildOf(extractedContext).start();
try (Scope scope = tracer.activateSpan(span)) {
    // HTTP サーバーの実装...
} finally {
    span.finish();
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


[1]: https://github.com/opentracing/opentracing-java
[2]: https://github.com/DataDog/dd-trace-java/blob/master/dd-trace-ot/src/main/java/datadog/opentracing/DDTracer.java