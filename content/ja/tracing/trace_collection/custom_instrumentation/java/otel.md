---
aliases:
- /ja/tracing/trace_collection/otel_instrumentation/java/
- /ja/tracing/trace_collection/custom_instrumentation/otel_instrumentation/java
code_lang: otel
code_lang_weight: 2
description: OpenTelemetry API を使用して Java アプリケーションをインスツルメントし、Datadog へトレースを送信します。
further_reading:
- link: tracing/glossary/
  tag: ドキュメント
  text: サービス、リソース、トレースの詳細
- link: /opentelemetry/guide/otel_api_tracing_interoperability
  tag: ドキュメント
  text: OpenTelemetry API と Datadog でインスツルメントされたトレースの相互運用性
title: OpenTelemetry API を使用した Java カスタム インスツルメンテーション
type: multi-code-lang
---

{{% otel-custom-instrumentation-lang %}}

## セットアップ

<div class="alert alert-info">OpenTelemetry はバージョン 1.24.0 以降の Java でサポートされています。</div>

OpenTelemetry を Datadog トレースプロバイダーを使用するように構成するには

1. 自動インスツルメンテーションとセットアップの説明をまだお読みでない場合は、[Java セットアップ手順][15]からお読みください。

1. OpenTelemetry SDK ではなく OpenTelemetry API のみを依存関係に含めていることを確認してください。

1. システム プロパティ `dd.trace.otel.enabled` または環境変数 `DD_TRACE_OTEL_ENABLED` を `true` に設定します。

## スパンタグの追加

### カスタムスパンタグを追加する
`customer.id` などのアプリケーションコード内の動的な値に対応するカスタムタグをスパンに追加します。

```java
import io.opentelemetry.api.trace.Span;

public void doSomething() {
  Span span = Span.current();
  span.setAttribute("user-name", "Some User");
}
```

### すべてのスパンにグローバルにタグを追加する

`dd.tags` プロパティを使用すると、アプリケーションに対して生成されたすべてのスパンにタグを設定できます。これは、アプリケーション、データセンター、または Datadog に表示したいその他のタグの統計をグループ化するのに役立ちます。

```shell
java -javaagent:<DD-JAVA-AGENT-PATH>.jar \
    -Ddd.tags=datacenter:njc,<TAG_KEY>:<TAG_VALUE> \
    -jar <YOUR_APPLICATION_PATH>.jar

```

### 子スパンからルートスパンにエラーを設定する

子スパンからルートスパンにエラーを設定するには、次のように現在のスパンで `setStatus` メソッドを使用します。

```java
import static io.opentelemetry.api.trace.StatusCode.ERROR;
import io.opentelemetry.api.trace.Span;

public void doSomething() {
  Span span = Span.current();
  span.setStatus(ERROR, "Some error details...");
}
```

### 子スパンからルートスパンにタグとエラーを設定する

この例では、子スパンからルートスパンにタグとエラーを設定する方法を示します。

```java
import io.opentelemetry.api.OpenTelemetry;
import io.opentelemetry.api.trace.Span;
import io.opentelemetry.api.trace.Tracer;
import io.opentelemetry.context.Context;
import io.opentelemetry.context.ContextKey;
import io.opentelemetry.context.Scope;
import io.opentelemetry.exporter.otlp.trace.OtlpGrpcSpanExporter;
import io.opentelemetry.sdk.OpenTelemetrySdk;
import io.opentelemetry.sdk.resources.Resource;
import io.opentelemetry.sdk.trace.SdkTracerProvider;
import io.opentelemetry.sdk.trace.export.BatchSpanProcessor;
import io.opentelemetry.semconv.ResourceAttributes;
import java.util.concurrent.TimeUnit;

public class Example {

  private final static ContextKey<Span> CONTEXT_KEY =
    ContextKey.named("opentelemetry-traces-local-root-span");

  public void begin() {
    tracer = GlobalOpenTelemetry.getTracer("my-scope", "0.1.0");
    Span parentSpan = tracer.spanBuilder("begin").startSpan();
    try (Scope scope = parentSpan.makeCurrent()) {
      createChildSpan();
    } finally {
      parentSpan.end();
    }
  }

  private void createChildSpan() {
    Span childSpan = tracer.spanBuilder("child-span").startSpan();
    try {
      Span rootSpan = Context.current().get(CONTEXT_KEY);
        if (null != rootSpan) {
          rootSpan.setAttribute("my-attribute", "my-attribute-value");
          rootSpan.setStatus(StatusCode.ERROR, "Some error details...");
        } 
    } finally {
      childSpan.end();
    }
  }

}
```

## タグの追加

[対応するフレームワークインスツルメンテーション][17]を使用しない場合や、より深いアプリケーションの[トレース][16]をする場合、完全なフレームグラフのため、またはコードの断片の実行時間を測定するために、コードにカスタムインスツルメンテーションを追加できます。

アプリケーションコードの変更が不可能な場合は、環境変数 dd.trace.methods を使用してこれらのメソッドの詳細を記述します。

既存の @Trace または同様のアノテーションがある場合、またはアノテーションを使用して Datadog 内の不完全なトレースを完了する場合は、トレースアノテーションを使用します。

[トレースアノテーション](#trace-annotations)で説明されているように、OpenTelemetry の `@WithSpan` アノテーションを使ってトレースを作成することもできます。

### トレースアノテーション

メソッドに `@WithSpan` を追加すると、OpenTelemetry と `dd-java-agent.jar` の実行時にトレースされます。Agent がアタッチされていない場合、このアノテーションはアプリケーションに影響を与えません。
OpenTelemetry の `@WithSpan` アノテーションは `opentelemetry-instrumentation-annotations` の依存によって提供されます。

```java
import io.opentelemetry.instrumentation.annotations.WithSpan;

public class SessionManager {

  @WithSpan
  public static void saveSession() {
    // ここにメソッドの実装
  }
}
```

### 新しいスパンを手動で作成する

現在のトレースコンテキスト内に新しいスパンを手動で作成するには

```java
import io.opentelemetry.api.OpenTelemetry;
import io.opentelemetry.api.trace.Span;
import io.opentelemetry.api.trace.Tracer;
import io.opentelemetry.context.Scope;
import io.opentelemetry.exporter.otlp.trace.OtlpGrpcSpanExporter;
import io.opentelemetry.sdk.OpenTelemetrySdk;
import io.opentelemetry.sdk.resources.Resource;
import io.opentelemetry.sdk.trace.SdkTracerProvider;
import io.opentelemetry.sdk.trace.export.BatchSpanProcessor;
import io.opentelemetry.semconv.ResourceAttributes;
import java.util.concurrent.TimeUnit;

public class Example {

  public void doSomething() {
    Tracer tracer = GlobalOpenTelemetry.getTracer("my-scope", "0.1.0");
    Span span = tracer.spanBuilder("my-resource").startSpan();
    try (Scope scope = span.makeCurrent()) {
      // 処理内容
    } catch (Throwable t) {
      span.recordException(t);
      throw t;
    } finally {
      span.end();
    }
  }

}
```

## スパン イベントの追加

<div class="alert alert-info">スパン イベントを追加するには SDK バージョン 1.40.0 以上が必要です。</div>

`addEvent` API を使用してスパン イベントを追加できます。このメソッドには必須パラメーター `name` があり、オプションで `attributes` と `timestamp` を受け取ります。メソッドは指定されたプロパティを持つ新しいスパン イベントを作成し、対象のスパンに関連付けます。

- **Name** [_required_]: イベント名を表す文字列。
- **Attributes** [_optional_]: 以下のプロパティを持つ 0 個以上のキーと値のペア。
  - キーは空でない文字列である必要があります。
  - 値として指定できるのは次のいずれかです。
    - プリミティブ型: string、Boolean、number。
    - 同一プリミティブ型の要素のみを含む配列 (例: string の配列)。
  - 入れ子の配列や異なるデータ型を混在させた配列は使用できません。
- **Timestamp** [_optional_]: イベント発生時刻を表す UNIX タイムスタンプ。`Instant` オブジェクトを想定します。

以下の例は、スパンにイベントを追加するさまざまな方法を示しています。

```java
Attributes eventAttributes = Attributes.builder()
    .put(AttributeKey.longKey("int_val"), 1L)
    .put(AttributeKey.stringKey("string_val"), "two")
    .put(AttributeKey.longArrayKey("int_array"), Arrays.asList(3L, 4L))
    .put(AttributeKey.stringArrayKey("string_array"), Arrays.asList("5", "6"))
    .put(AttributeKey.booleanArrayKey("bool_array"), Arrays.asList(true, false))
    .build();

span.addEvent("Event With No Attributes");
span.addEvent("Event With Some Attributes", eventAttributes);
```

詳細は [OpenTelemetry 仕様][21] を参照してください。

### 例外の記録

例外を記録するには `recordException` API を使用します。このメソッドには必須パラメーター `exception` があり、オプションで UNIX `timestamp` を受け取ります。標準化された例外属性を含む新しいスパン イベントを作成し、対象のスパンに関連付けます。

以下の例は、例外を記録するさまざまな方法を示しています。

```java
span.recordException(new Exception("Error Message"));
span.recordException(new Exception("Error Message"), 
    Attributes.builder().put(AttributeKey.stringKey("status"), "failed").build());
```

詳細は [OpenTelemetry 仕様][22] を参照してください。

## トレースクライアントと Agent コンフィギュレーション

トレーシングクライアントと Datadog Agent の両方が、コンテキスト伝播のための追加構成オプションを提供します。また、ヘルスチェックに関連するトレースなど、計算されたメトリクスに含めたくないトレースについては、特定のリソースを Datadog へのトレース送信から除外することもできます。

### ヘッダー抽出と挿入によるコンテキストの伝搬

分散型トレーシングのコンテキストの伝搬は、ヘッダーの挿入と抽出で構成できます。詳しくは[トレースコンテキストの伝播][18]をお読みください。

### リソースのフィルター

トレースはそれぞれのリソース名に基づいて除外可能で、これによりヘルスチェックなどの外形監視トラフィックが Datadog にレポートされるトレースから削除されます。この設定およびその他のセキュリティ/微調整に関するコンフィギュレーションについては[セキュリティ][19]ページまたは[不要なリソースを無視する][20]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[15]: /ja/tracing/setup/java/
[16]: /ja/tracing/glossary/#trace
[17]: /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/?tab=wget#compatibility
[18]: /ja/tracing/trace_collection/trace_context_propagation/
[19]: /ja/tracing/security
[20]: /ja/tracing/guide/ignoring_apm_resources/
[21]: https://opentelemetry.io/docs/specs/otel/trace/api/#add-events
[22]: https://opentelemetry.io/docs/specs/otel/trace/api/#record-exception