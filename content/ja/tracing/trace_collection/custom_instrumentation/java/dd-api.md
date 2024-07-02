---
title: Java Custom Instrumentation using Datadog API
kind: documentation
aliases:
    - /tracing/opentracing/java
    - /tracing/manual_instrumentation/java
    - /tracing/custom_instrumentation/java
    - /tracing/setup_overview/custom_instrumentation/java
    - /tracing/trace_collection/custom_instrumentation/java
    - /tracing/trace_collection/custom_instrumentation/dd_libraries/java
description: 'Instrument your code with the Datadog Java APM tracer.'
code_lang: dd-api
type: multi-code-lang
code_lang_weight: 1
further_reading:
    - link: tracing/other_telemetry/connect_logs_and_traces
      tag: Documentation
      text: Connect your Logs and Traces together
    - link: tracing/glossary/
      tag: Documentation
      text: Explore your services, resources, and traces
---

This page details common use cases for adding and customizing observability with Datadog APM. If you have not read the setup instructions for automatic instrumentation, start with the [Java Setup Instructions][11].

<div class="alert alert-info">The Datadog Java tracer is built on OpenTracing. Although OpenTracing is deprecated in favor of OpenTelemetry, the following examples correctly import the <code>opentracing</code> library.</div>

## `ddtrace` ライブラリの機能性を拡張したり、アプリケーションのインスツルメントをより精確に制御するのに役立つ方法がライブラリにあります。

カスタム[スパンタグ][1]を[スパン][2]に追加して、Datadog 内の可観測性をカスタマイズします。スパンタグは受信トレースに適用されるため、観測された動作を、マーチャントの階層、チェックアウト金額、ユーザー ID などのコードレベルの情報と関連付けることができます。

### カスタムスパンタグを追加する

`customer.id` などのアプリケーションコード内の動的な値に対応するカスタムタグをスパンに追加します。

```java
import org.apache.cxf.transport.servlet.AbstractHTTPServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import io.opentracing.Tracer;
import io.opentracing.util.GlobalTracer;

@WebServlet
class ShoppingCartServlet extends AbstractHttpServlet {
    @Override
    void doGet(HttpServletRequest req, HttpServletResponse resp) {
        // アクティブスパンを取得
        final Span span = GlobalTracer.get().activeSpan();
        if (span != null) {
          // customer_id -> 254889
          // customer_tier -> platinum
          // cart_value -> 867
          span.setTag("customer.id", customer_id);
          span.setTag("customer.tier", customer_tier);
          span.setTag("cart.value", cart_value);
        }
        // [...]
    }
}
```

### すべてのスパンにグローバルにタグを追加する

`dd.tags` プロパティを使用すると、アプリケーションに対して生成されたすべてのスパンにタグを設定できます。これは、アプリケーション、データセンター、または Datadog UI 内に表示したいその他のタグの統計をグループ化するのに役立ちます。

```text
java -javaagent:<DD-JAVA-エージェントパス>.jar \
     -Ddd.tags=datacenter:njc,<タグキー>:<タグ値> \
     -jar <アプリケーションパス>.jar
```

### スパンにエラーを設定する

スパンの 1 つに関連するエラーをカスタマイズするには、スパンにエラータグを設定し、`Span.log()` を使用して「エラーイベント」を設定します。エラーイベントは、`Fields.ERROR_OBJECT->Throwable` エントリ、`Fields.MESSAGE->String`、またはその両方を含む `Map<String,Object>` です。

```java
import io.opentracing.Span;
import io.opentracing.tag.Tags;
import io.opentracing.util.GlobalTracer;
import io.opentracing.log.Fields;
...
    // 現在のメソッドで使用できない場合、アクティブなスパンを取得します
    final Span span = GlobalTracer.get().activeSpan();
    if (span != null) {
      span.setTag(Tags.ERROR, true);
      span.log(Collections.singletonMap(Fields.ERROR_OBJECT, ex));
    }
```

**注**: `Span.log()` は、イベントを現在のタイムスタンプに関連付けるための一般的な OpenTracing メカニズムです。Java Tracer はエラーイベントのロギングのみをサポートします。
または、`log()` を使用せずにスパンに直接エラータグを設定することもできます。

```java
import io.opentracing.Span;
import io.opentracing.tag.Tags;
import io.opentracing.util.GlobalTracer;
import datadog.trace.api.DDTags;
import java.io.PrintWriter;
import java.io.StringWriter;

...
    final Span span = GlobalTracer.get().activeSpan();
    if (span != null) {
      span.setTag(Tags.ERROR, true);
      span.setTag(DDTags.ERROR_MSG, ex.getMessage());
      span.setTag(DDTags.ERROR_TYPE, ex.getClass().getName());

      final StringWriter errorString = new StringWriter();
      ex.printStackTrace(new PrintWriter(errorString));
      span.setTag(DDTags.ERROR_STACK, errorString.toString());
    }
```

**注**: [トレースビューのドキュメント][3]にリストされている関連するエラーメタデータを追加できます。現在のスパンがルートスパンではない場合、`dd-trace-api` ライブラリを使用してエラーとしてマークし、`MutableSpan` でルートスパンを取得してから、`setError(true)` を使用します。詳細については、[ルートスパンでのタグとエラーの設定][4]セクションを参照してください。

### 子スパンからルートスパンにタグとエラーを設定する

イベントまたは条件がダウンストリームで発生した場合、その動作または値をトップレベルまたはルートスパンのタグとして反映させることができます。これは、エラーをカウントしたり、パフォーマンスを測定したり、可観測性のためにダイナミックタグを設定したりするのに役立ちます。

```java
import java.util.Collections;
import io.opentracing.Span;
import io.opentracing.Scope;
import datadog.trace.api.interceptor.MutableSpan;
import io.opentracing.log.Fields;
import io.opentracing.util.GlobalTracer;
import io.opentracing.util.Tracer;

Tracer tracer = GlobalTracer.get();
final Span span = tracer.buildSpan("<OPERATION_NAME>").start();
// 注: 下の try with resource ブロック内のスコープは
// コードブロックの最後に自動的に閉じられます。
// try with resource 句を使用しない場合は、
// scope.close() をコールする必要があります。
try (final Scope scope = tracer.activateSpan(span)) {
    // ここで例外をスロー
} catch (final Exception e) {
    // スパンにエラータグを通常どおり設定します
    span.log(Collections.singletonMap(Fields.ERROR_OBJECT, e));

    // ルートスパンにエラーを設定します
    if (span instanceof MutableSpan) {
        MutableSpan localRootSpan = ((MutableSpan) span).getLocalRootSpan();
        localRootSpan.setError(true);
        localRootSpan.setTag("some.other.tag", "value");
    }
} finally {
    // finally ブロックのスパンを閉じます
    span.finish();
}
```

スパンを手動で作成していない場合でも、 `GlobalTracer` を介してルートスパンにアクセスできます。

```java
import io.opentracing.Span;
import io.opentracing.util.GlobalTracer;
import datadog.trace.api.interceptor.MutableSpan;

...

final Span span = GlobalTracer.get().activeSpan();
if (span != null && (span instanceof MutableSpan)) {
    MutableSpan localRootSpan = ((MutableSpan) span).getLocalRootSpan();
    // ルートスパンを活用
}
```

**注**: `MutableSpan` と `Span` は多くの類似したメソッドを共有していますが、これらは異なる型です。`MutableSpan` は Datadog に固有のもので、OpenTracing API の一部ではありません。

<br>

## タグの追加

[対応するフレームワークインスツルメンテーション][5]を使用しない場合や、より深いアプリケーションの[トレース][3]をする場合、完全なフレームグラフのため、またはコードの断片の実行時間を測定するために、コードにカスタムインスツルメンテーションを追加できます。

アプリケーションコードの変更が不可能な場合は、環境変数 `dd.trace.methods` を使用してこれらのメソッドの詳細を記述します。

既存の `@Trace` または同様のアノテーションがある場合、またはアノテーションを使用して Datadog 内の不完全なトレースを完了する場合は、トレースアノテーションを使用します。


### Datadog のトレース方法

`dd.trace.methods` システムプロパティを使用すると、アプリケーションコードを変更せずに、サポートされていないフレームワークを可視化できます。

```text
java -javaagent:/path/to/dd-java-agent.jar -Ddd.env=prod -Ddd.service.name=db-app -Ddd.trace.methods=store.db.SessionManager[saveSession] -jar path/to/application.jar
```

To trace several functions within the same class, use the following syntax:

```text
java -javaagent:/path/to/dd-java-agent.jar -Ddd.env=prod -Ddd.service.name=db-app -Ddd.trace.methods=store.db.SessionManager[saveSession,loadSession] -jar path/to/application.jar
```

このアプローチと `@Trace` アノテーションの使用の唯一の違いは、オペレーション名とリソース名のカスタマイズオプションです。DD Trace Methods では、`operationName` は `trace.annotation` で、`resourceName` は `SessionManager.saveSession` です。

### トレースアノテーション

`@Trace` をメソッドに追加して、`dd-java-agent.jar` での実行時にメソッドがトレースされるようにします。Agent が添付されていない場合は、このアノテーションはアプリケーションに影響しません。

Datadog のトレースアノテーションは、[dd-trace-api 依存関係][6]が提供します。

The available arguments for the `@Trace` annotation are:

- `operationName`: Set the operation name for the trace (default: The method's name).
- `resourceName`: Set the resource name for the trace (default: The same value as `operationName`).
- `noParent`: Set to `true` to always start a new trace at that method. Supported from v1.22.0+ of `dd-trace-java` (default: `false`).

```java
import datadog.trace.api.Trace;

public class SessionManager {

    @Trace(operationName = "database.persist", resourceName = "SessionManager.saveSession")
    public static void saveSession() {
        // ここにメソッドを実装
    }
}
```
**Note**: Through the `dd.trace.annotations` system property, other tracing method annotations can be recognized by Datadog as `@Trace`. You can find a list in [TraceAnnotationsInstrumentation.java][7] if you have previously decorated your code.

### 新しいスパンを手動で作成する

自動インスツルメンテーション、`@Trace` アノテーション、`dd.trace.methods` コンフィギュレーションに加えて、プログラムで任意のコードブロックの周囲にスパンを作成することで、可観測性をカスタマイズできます。この方法で作成されたスパンは、他のトレースメカニズムと自動的に統合されます。つまり、トレースがすでに開始されている場合、手動スパンはその親スパンとして呼び出し元を持ちます。同様に、ラップされたコードブロックから呼び出されたトレースメソッドは、その親として手動スパンを持ちます。

```java
import datadog.trace.api.DDTags;
import io.opentracing.Scope;
import io.opentracing.Span;
import io.opentracing.Tracer;
import io.opentracing.util.GlobalTracer;

class SomeClass {
    void someMethod() {
        Tracer tracer = GlobalTracer.get();

        // サービス名とリソース名のタグが必要です。
        // サービス名とリソース名のタグが必要です。
        Span span = tracer.buildSpan("<OPERATION_NAME>")
            .withTag(DDTags.SERVICE_NAME, "<SERVICE_NAME>")
            .withTag(DDTags.RESOURCE_NAME, "<RESOURCE_NAME>")
            .start();
        // 注: 下の try with resource ブロック内のスコープは
        // コードブロックの最後に自動的に閉じられます。
        // try with resource 句を使用しない場合は、
        // scope.close() をコールする必要があります。
        try (Scope scope = tracer.activateSpan(span)) {
            // タグは作成後に設定することもできます
            span.setTag("my.tag", "value");

            // トレースしているコード

        } catch (Exception e) {
            // スパンにエラーを設定します
        } finally {
            // finally ブロックのスパンを閉じます
            span.finish();
        }
    }
}
```

### トレーサーの拡張

トレーシングライブラリは拡張できるように設計されています。`TraceInterceptor` と呼ばれるカスタムポストプロセッサーを作成してスパンをインターセプトし、適宜 (例えば、正規表現を使用して) 調整または破棄することが可能です。次の例では、2 つのインターセプターを実装して、複雑な後処理ロジックを実現しています。

```java
import java.util.List;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;
import datadog.trace.api.interceptor.TraceInterceptor;
import datadog.trace.api.interceptor.MutableSpan;

class FilteringInterceptor implements TraceInterceptor {
    @Override
    public Collection<? extends MutableSpan> onTraceComplete(
            Collection<? extends MutableSpan> trace) {

        List<MutableSpan> filteredTrace = new ArrayList<>();
        for (final MutableSpan span : trace) {
          String orderId = (String) span.getTags().get("order.id");

          // オーダー ID が "TEST-" で始まる場合はスパンをドロップします
          if (orderId == null || !orderId.startsWith("TEST-")) {
            filteredTrace.add(span);
          }
        }

        return filteredTrace;
    }

    @Override
    public int priority() {
        // 番号の一意性が高いため、このインターセプターが最後になります
        return 100;
    }
}

class PricingInterceptor implements TraceInterceptor {
    @Override
    public Collection<? extends MutableSpan> onTraceComplete(
            Collection<? extends MutableSpan> trace) {

        for (final MutableSpan span : trace) {
          Map<String, Object> tags = span.getTags();
          Double originalPrice = (Double) tags.get("order.price");
          Double discount = (Double) tags.get("order.discount");

          // 他のタグの計算からタグを設定します
          if (originalPrice != null && discount != null) {
            span.setTag("order.value", originalPrice - discount);
          }
        }

        return trace;
    }

    @Override
    public int priority() {
        return 20; // ある一意の番号
    }
}
```

アプリケーションの開始近くに、インターセプターを以下で登録します。
```java
datadog.trace.api.GlobalTracer.get().addTraceInterceptor(new FilteringInterceptor());
datadog.trace.api.GlobalTracer.get().addTraceInterceptor(new PricingInterceptor());
```

<br>

## トレースクライアントと Agent コンフィギュレーション

トレーシングクライアントと Datadog Agent の両方で、コンフィギュレーションを追加することで、コンテキスト伝播のための構成を行ったり、特定のリソースがトレースを Datadog に送信しないように除外して、ヘルスチェックなどのメトリクスの算出でこれらのトレースがカウントされないようにすることができます。

### ヘッダー抽出と挿入によるコンテキストの伝搬

分散型トレーシングのコンテキストの伝搬は、ヘッダーの挿入と抽出で構成できます。詳しくは[トレースコンテキストの伝播][8]をお読みください。

### リソースのフィルター

トレースはそれぞれのリソース名に基づいて除外可能で、これによりヘルスチェックなどの外形監視トラフィックが Datadog にレポートされるトレースから削除されます。この設定およびその他のセキュリティ/微調整に関するコンフィギュレーションについては[セキュリティ][9]ページまたは[不要なリソースを無視する][10]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/glossary/#span-tags
[2]: /tracing/glossary/#spans
[3]: /tracing/glossary/#trace
[4]: /tracing/custom_instrumentation/java/#set-tags-errors-on-a-root-span-from-a-child-span
[5]: /tracing/setup/java/#compatibility
[6]: https://mvnrepository.com/artifact/com.datadoghq/dd-trace-api
[7]: https://github.com/DataDog/dd-trace-java/blob/master/dd-java-agent/instrumentation/trace-annotation/src/main/java/datadog/trace/instrumentation/trace_annotation/TraceAnnotationsInstrumentation.java#L37
[8]: /tracing/trace_collection/trace_context_propagation/java/
[9]: /tracing/security
[10]: /tracing/guide/ignoring_apm_resources/
[11]: /tracing/setup/java/