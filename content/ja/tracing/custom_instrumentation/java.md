---
title: Java カスタムインスツルメンテーション
kind: ドキュメント
aliases:
  - /ja/tracing/opentracing/java
  - /ja/tracing/manual_instrumentation/java
description: Datadog Java APM トレーサーを使用して OpenTracing 標準を実装します。
further_reading:
  - link: tracing/connect_logs_and_traces
    tag: Documentation
    text: ログとトレースの接続
  - link: tracing/visualization/
    tag: Documentation
    text: サービス、リソース、トレースの詳細
---
<div class="alert alert-info">
自動インスツルメンテーションとセットアップの手順をまだ読んでいない場合は、<a href="https://docs.datadoghq.com/tracing/setup/java/">Java セットアップ手順</a>からご覧ください。
</div>

このページでは、Datadog APM を使用して可観測性を追加およびカスタマイズする一般的な使用例について説明します。

## タグの追加

カスタム[スパンタグ][1]を[スパン][2]に追加して、Datadog 内の可観測性をカスタマイズします。スパンタグは受信トレースに適用されるため、観測された動作を、マーチャントの階層、チェックアウト金額、ユーザー ID などのコードレベルの情報と関連付けることができます。


### カスタムスパンタグを追加する

`customer.id` などのアプリケーションコード内の動的な値に対応するカスタムタグをスパンに追加します。

```java
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
import io.opentracing.log.Fields
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
final Span span = tracer.buildSpan("<OPERATION_NAME>").start();
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
    // ブロックのスパンを閉じます
    span.finish();
}
```

スパンを手動で作成していない場合でも、 `GlobalTracer` を介してルートスパンにアクセスできます。

```java
final Span span = GlobalTracer.get().activeSpan();
if (span != null && (span instanceof MutableSpan)) {
    MutableSpan localRootSpan = ((MutableSpan) span).getLocalRootSpan();
    // ルートスパンを活用
}
```

**注**: `MutableSpan` と `Span` は多くの類似したメソッドを共有していますが、これらは異なる型です。`MutableSpan` は Datadog に固有のもので、OpenTracing API の一部ではありません。

<br>

## スパンの追加

[対応するフレームワークインスツルメンテーション][5]を使用しない場合や、より深いアプリケーションの[トレース][3]をする場合、完全なフレームグラフのため、またはコードの断片の実行時間を測定するために、コードにカスタムインスツルメンテーションを追加できます。

アプリケーションコードの変更が不可能な場合は、環境変数 `dd.trace.methods` を使用してこれらのメソッドの詳細を記述します。

既存の `@Trace` または同様のアノテーションがある場合、またはアノテーションを使用して Datadog 内の不完全なトレースを完了する場合は、トレースアノテーションを使用します。


### DD Trace Methods

`dd.trace.methods` システムプロパティを使用すると、アプリケーションコードを変更せずに、サポートされていないフレームワークを可視化できます。

```text
java -javaagent:/path/to/dd-java-agent.jar -Ddd.env=prod -Ddd.service.name=db-app -Ddd.trace.methods=store.db.SessionManager[saveSession] -jar path/to/application.jar
```

このアプローチと `@Trace` アノテーションの使用の唯一の違いは、オペレーション名とリソース名のカスタマイズオプションです。DD Trace Methods では、`operationName` は `trace.annotation` で、`resourceName` は `SessionManager.saveSession` です。


### トレースアノテーション

`@Trace` をメソッドに追加して、`dd-java-agent.jar` での実行時にメソッドがトレースされるようにします。Agent が添付されていない場合は、このアノテーションはアプリケーションに影響しません。

Datadog のトレースアノテーションは、[dd-trace-api 依存関係][6]が提供します。

`@Trace`  アノテーションには、デフォルトのオペレーション名 `trace.annotation` とトレースされるメソッドのリソース名があります。これらは `@Trace` アノテーションの引数として設定でき、インスツルメンテーション対象をより適切に反映します。これらは、`@Trace` アノテーションに設定できる唯一の引数です。

```java
import datadog.trace.api.Trace;

public class SessionManager {

    @Trace(operationName = "database.persist", resourceName = "SessionManager.saveSession")
    public static void saveSession() {
        // ここにメソッドを実装
    }
}
```
`dd.trace.annotations` システムプロパティを通じて、他のトレースメソッドアノテーションが Datadog によって `@Trace` として認識されることに注意してください。以前にコードを装飾したことがある場合は、[こちら][7]で一覧を確認できます。


### 新しいスパンを手動で作成する

自動インスツルメンテーション、`@Trace` アノテーション、`dd.trace.methods` コンフィギュレーションに加えて、プログラムでコードのブロックの周囲にスパンを作成することで、可観測性をカスタマイズできます。この方法で作成されたスパンは、他のトレースメカニズムと自動的に統合されます。つまり、トレースがすでに開始されている場合、手動スパンはその親スパンとして呼び出し元を持ちます。同様に、コードのラップされたブロックから呼び出されたトレースメソッドは、その親として手動スパンを持ちます。

```java
import datadog.trace.api.DDTags;
import io.opentracing.Scope;
import io.opentracing.Tracer;
import io.opentracing.util.GlobalTracer;

class SomeClass {
    void someMethod() {
        Tracer tracer = GlobalTracer.get();

        // スパンの作成時にタグを設定できます
        Span span = tracer.buildSpan("<OPERATION_NAME>")
            .withTag(DDTags.SERVICE_NAME, "<SERVICE_NAME>")
            .start()
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

トレーシングライブラリは拡張できるように設計されています。`TraceInterceptor` と呼ばれるカスタムポストプロセッサーを作成してスパンをインターセプトし、適宜 (正規表現などを使用して) 調整または破棄することが可能です。次の例では、2 つのインターセプターを実装して、複雑な後処理ロジックを実現しています。

```java
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

トレーシングクライアントと Datadog Agent の両方で、コンフィギュレーションを追加することで、B3 ヘッダーを使用したコンテキスト伝播や、ヘルスチェックなどの計算されたメトリクスでこれらのトレースがカウントされないように、特定のリソースがトレースを Datadog に送信しないように除外することができます。


### B3 ヘッダーの抽出と挿入

Datadog APM トレーサーは、分散型トレーシングの [B3 ヘッダーの抽出][8]と挿入をサポートしています。

分散したヘッダーの挿入と抽出は、挿入/抽出スタイルを構成することで制御されます。現在、次の 2 つのスタイルがサポートされています:

- Datadog: `Datadog`
- B3: `B3`

挿入スタイルは次を使って構成できます:

- システムプロパティ: `-Ddd.propagation.style.inject=Datadog,B3`
- 環境変数: `DD_PROPAGATION_STYLE_INJECT=Datadog,B3`

プロパティまたは環境変数の値は、挿入が有効になっているヘッダースタイルのカンマ (またはスペース) 区切りリストです。デフォルトでは、Datadog 挿入スタイルのみが有効になっています。

抽出スタイルは次を使って構成できます:

- システムプロパティ: `-Ddd.propagation.style.extract=Datadog,B3`
- 環境変数: `DD_PROPAGATION_STYLE_EXTRACT=Datadog,B3`

プロパティまたは環境変数の値は、抽出が有効になっているヘッダースタイルのカンマ (またはスペース) 区切りリストです。デフォルトでは、Datadog 抽出スタイルのみが有効になっています。

複数の抽出スタイルが有効になっている場合、抽出試行はスタイルの構成順で実行され、最初に成功した抽出値が使われます。

### リソースフィルター

トレースはそれぞれのリソース名に基づいて除外可能で、これによりヘルスチェックなどの外形監視トラフィックが Datadog にレポートされるトレースから削除されます。この設定およびその他のセキュリティ/微調整に関するコンフィギュレーションについては[セキュリティ][9]ページを参照してください。

## OpenTracing

Datadog は [OpenTracing API][10] とシームレスに統合します。

### セットアップ

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

自動インスツルメンテーションを使用していない場合は、構成済みのトレーサーを `GlobalTracer` に登録する必要があります。そのためには、アプリケーションの起動の早い段階（例: メインメソッド）で `GlobalTracer.register(DDTracer.builder().build())` を呼び出します。

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

環境変数とシステムプロパティの他に、`DDTracer.Builder` インターフェイスの一部として追加のコンフィギュレーションオプションがあります。完全なリストについては、[Javadoc][11] を参照してください。


### 非同期トレース

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

### 分散トレースのコンテキストの挿入と抽出

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

上記の例では OpenTracing クラスのみを使用していることに注意してください。詳細については、[OpenTracing API][10] を確認してください。


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/visualization/#span-tags
[2]: /ja/tracing/visualization/#spans
[3]: /ja/tracing/visualization/#trace
[4]: /ja/tracing/custom_instrumentation/java/#set-tags-errors-on-a-root-span-from-a-child-span
[5]: /ja/tracing/setup/java/#compatibility
[6]: https://mvnrepository.com/artifact/com.datadoghq/dd-trace-api
[7]: https://github.com/DataDog/dd-trace-java/blob/master/dd-java-agent/instrumentation/trace-annotation/src/main/java/datadog/trace/instrumentation/trace_annotation/TraceAnnotationsInstrumentation.java#L37
[8]: https://github.com/openzipkin/b3-propagation
[9]: /ja/tracing/security
[10]: https://github.com/opentracing/opentracing-java
[11]: https://github.com/DataDog/dd-trace-java/blob/master/dd-trace-ot/src/main/java/datadog/opentracing/DDTracer.java