---
aliases:
- /ja/tracing/setup_overview/setup/android
- /ja/tracing/setup/android
- /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/android
code_lang: android
code_lang_weight: 80
description: Android アプリケーションからトレースを収集する。
further_reading:
- link: https://github.com/DataDog/dd-sdk-android
  tag: ソースコード
  text: dd-sdk-android ソースコード
- link: tracing/visualization/
  tag: ドキュメント
  text: サービス、リソース、トレースの調査
title: Android アプリケーションのトレース
type: multi-code-lang
---
[Datadog の `dd-sdk-android-trace` クライアントサイド SDK][2] を使用して Android アプリケーションから Datadog へ [トレース][1] を送信し、以下の機能を利用します。

* アプリケーションでの操作用にカスタム [スパン][3] を作成します。
* 送信される各スパンに `context` およびカスタム属性を追加する。
* 自動一括ポストによってネットワークの利用を最適化する。

{{% android-trace-datadog-api-waning %}}
{{% android-otel-note %}}

## セットアップ {#setup}

1. `build.gradle` ファイルでライブラリを依存関係として宣言して、Gradle 依存関係を追加します。
   ```groovy
   dependencies {
       implementation "com.datadoghq:dd-sdk-android-trace:x.x.x"
   }
   ```
2. アプリケーションコンテキスト、追跡に関する同意、[Datadog クライアントトークン][4] を使用して Datadog SDK を初期化します。セキュリティ上の理由から、クライアントトークンを使用する必要があります。[Datadog API キー][5] は、クライアント側の Android アプリケーションの APK バイトコード内で公開されてしまうため、Datadog SDK の構成には使用できません。クライアントトークンのセットアップの詳細については、[クライアントトークンに関するドキュメント][4] を参照してください。
   {{< site-region region="us" >}}
   {{< tabs >}}
   {{% tab "Kotlin" %}}

   ```kotlin
   class SampleApplication : Application() {
     override fun onCreate() {
       super.onCreate()
       val configuration = Configuration.Builder(
            clientToken = "<CLIENT_TOKEN>",
            env = "<ENV_NAME>",
            variant = "<APP_VARIANT_NAME>"
       ).build()

       Datadog.initialize(this, configuration, trackingConsent)
     }
   }
   ```

   {{% /tab %}}
   {{% tab "Java" %}}

   ```java
   public class SampleApplication extends Application {
     @Override
     public void onCreate() {
       super.onCreate();
       Configuration configuration = new Configuration.Builder("<CLIENT_TOKEN>", "<ENV_NAME>", "<APP_VARIANT_NAME>")
         .build();

       Datadog.initialize(this, configuration, trackingConsent);
     }
   }
   ```

   {{% /tab %}}
   {{< /tabs >}}
   {{< /site-region >}}

   {{< site-region region="eu" >}}
   {{< tabs >}}
   {{% tab "Kotlin" %}}

   ```kotlin
   class SampleApplication : Application() {
     override fun onCreate() {
       super.onCreate()
       val configuration = Configuration.Builder(
            clientToken = "<CLIENT_TOKEN>",
            env = "<ENV_NAME>",
            variant = "<APP_VARIANT_NAME>"
       )
         .useSite(DatadogSite.EU1)
         .build()

       Datadog.initialize(this, configuration, trackingConsent)
     }
   }
   ```

   {{% /tab %}}
   {{% tab "Java" %}}

   ```java
   public class SampleApplication extends Application {
     @Override
     public void onCreate() {
       super.onCreate();
       Configuration configuration = new Configuration.Builder("<CLIENT_TOKEN>", "<ENV_NAME>", "<APP_VARIANT_NAME>")
           .useSite(DatadogSite.EU1)
           .build();

       Datadog.initialize(this, configuration, trackingConsent);
     }
   }
   ```

   {{% /tab %}}
   {{< /tabs >}}
   {{< /site-region >}}

   {{< site-region region="us3" >}}
   {{< tabs >}}
   {{% tab "Kotlin" %}}

   ```kotlin
   class SampleApplication : Application() {
     override fun onCreate() {
       super.onCreate()
       val configuration = Configuration.Builder(
            clientToken = "<CLIENT_TOKEN>",
            env = "<ENV_NAME>",
            variant = "<APP_VARIANT_NAME>"
       )
         .useSite(DatadogSite.US3)
         .build()

       Datadog.initialize(this, configuration, trackingConsent)
     }
   }
   ```

   {{% /tab %}}
   {{% tab "Java" %}}

   ```java
   public class SampleApplication extends Application {
     @Override
     public void onCreate() {
       super.onCreate();
       Configuration configuration = new Configuration.Builder("<CLIENT_TOKEN>", "<ENV_NAME>", "<APP_VARIANT_NAME>")
           .useSite(DatadogSite.US3)
           .build();

       Datadog.initialize(this, configuration, trackingConsent);
     }
   }
   ```

   {{% /tab %}}
   {{< /tabs >}}
   {{< /site-region >}}

   {{< site-region region="us5" >}}
   {{< tabs >}}
   {{% tab "Kotlin" %}}

   ```kotlin
   class SampleApplication : Application() {
     override fun onCreate() {
       super.onCreate()
       val configuration = Configuration.Builder(
            clientToken = "<CLIENT_TOKEN>",
            env = "<ENV_NAME>",
            variant = "<APP_VARIANT_NAME>"
       )
         .useSite(DatadogSite.US5)
         .build()

       Datadog.initialize(this, configuration, trackingConsent)
     }
   }
   ```

   {{% /tab %}}
   {{% tab "Java" %}}

   ```java
   public class SampleApplication extends Application {
     @Override
     public void onCreate() {
       super.onCreate();
       Configuration configuration = new Configuration.Builder("<CLIENT_TOKEN>", "<ENV_NAME>", "<APP_VARIANT_NAME>")
         .useSite(DatadogSite.US5)
         .build();

       Datadog.initialize(this, configuration, trackingConsent);
     }
   }
   ```

   {{% /tab %}}
   {{< /tabs >}}
   {{< /site-region >}}

   {{< site-region region="gov" >}}
   {{< tabs >}}
   {{% tab "Kotlin" %}}

   ```kotlin
   class SampleApplication : Application() {
     override fun onCreate() {
       super.onCreate()
       val configuration = Configuration.Builder(
            clientToken = "<CLIENT_TOKEN>",
            env = "<ENV_NAME>",
            variant = "<APP_VARIANT_NAME>"
       )
         .useSite(DatadogSite.US1_FED)
         .build()

       Datadog.initialize(this, configuration, trackingConsent)
     }
   }
   ```

   {{% /tab %}}
   {{% tab "Java" %}}

   ```java
   public class SampleApplication extends Application {
     @Override
     public void onCreate() {
       super.onCreate();
       Configuration configuration = new Configuration.Builder("<CLIENT_TOKEN>", "<ENV_NAME>", "<APP_VARIANT_NAME>")
         .useSite(DatadogSite.US1_FED)
         .build();

       Datadog.initialize(this, configuration, trackingConsent);
     }
   }
   ```

   {{% /tab %}}
   {{< /tabs >}}
   {{< /site-region >}}

{{< site-region region="gov2" >}}
   {{< tabs >}}
   {{% tab "Kotlin" %}}

   ```kotlin
   class SampleApplication : Application() {
     override fun onCreate() {
       super.onCreate()
       val configuration = Configuration.Builder(
            clientToken = "<CLIENT_TOKEN>",
            env = "<ENV_NAME>",
            variant = "<APP_VARIANT_NAME>"
       )
         .useSite(DatadogSite.US2_FED)
         .build()

       Datadog.initialize(this, configuration, trackingConsent)
     }
   }
   ```

   {{% /tab %}}
   {{% tab "Java" %}}

   ```java
   public class SampleApplication extends Application {
     @Override
     public void onCreate() {
       super.onCreate();
       Configuration configuration = new Configuration.Builder("<CLIENT_TOKEN>", "<ENV_NAME>", "<APP_VARIANT_NAME>")
         .useSite(DatadogSite.US2_FED)
         .build();

       Datadog.initialize(this, configuration, trackingConsent);
     }
   }
   ```

   {{% /tab %}}
   {{< /tabs >}}
   {{< /site-region >}}

   {{< site-region region="ap1" >}}
   {{< tabs >}}
   {{% tab "Kotlin" %}}

   ```kotlin
   class SampleApplication : Application() {
     override fun onCreate() {
       super.onCreate()
       val configuration = Configuration.Builder(
            clientToken = "<CLIENT_TOKEN>",
            env = "<ENV_NAME>",
            variant = "<APP_VARIANT_NAME>"
       )
         .useSite(DatadogSite.AP1)
         .build()

       Datadog.initialize(this, configuration, trackingConsent)
     }
   }
   ```

   {{% /tab %}}
   {{% tab "Java" %}}

   ```java
   public class SampleApplication extends Application {
     @Override
     public void onCreate() {
       super.onCreate();
       Configuration configuration = new Configuration.Builder("<CLIENT_TOKEN>", "<ENV_NAME>", "<APP_VARIANT_NAME>")
         .useSite(DatadogSite.AP1)
         .build();

       Datadog.initialize(this, configuration, trackingConsent);
     }
   }
   ```

   {{% /tab %}}
   {{< /tabs >}}
   {{< /site-region >}}

   {{< site-region region="ap2" >}}
   {{< tabs >}}
   {{% tab "Kotlin" %}}

   ```kotlin
   class SampleApplication : Application() {
     override fun onCreate() {
       super.onCreate()
       val configuration = Configuration.Builder(
            clientToken = "<CLIENT_TOKEN>",
            env = "<ENV_NAME>",
            variant = "<APP_VARIANT_NAME>"
       )
         .useSite(DatadogSite.AP2)
         .build()

       Datadog.initialize(this, configuration, trackingConsent)
     }
   }
   ```

   {{% /tab %}}
   {{% tab "Java" %}}

   ```java
   public class SampleApplication extends Application {
     @Override
     public void onCreate() {
       super.onCreate();
       Configuration configuration = new Configuration.Builder("<CLIENT_TOKEN>", "<ENV_NAME>", "<APP_VARIANT_NAME>")
         .useSite(DatadogSite.AP2)
         .build();

       Datadog.initialize(this, configuration, trackingConsent);
     }
   }
   ```

   {{% /tab %}}
   {{< /tabs >}}
   {{< /site-region >}}

   {{< site-region region="uk1" >}}
   {{< tabs >}}
   {{% tab "Kotlin" %}}

   ```kotlin
   class SampleApplication : Application() {
     override fun onCreate() {
       super.onCreate()
       val configuration = Configuration.Builder(
            clientToken = "<CLIENT_TOKEN>",
            env = "<ENV_NAME>",
            variant = "<APP_VARIANT_NAME>"
       )
         .useSite(DatadogSite.UK1)
         .build()

       Datadog.initialize(this, configuration, trackingConsent)
     }
   }
   ```

   {{% /tab %}}
   {{% tab "Java" %}}

   ```java
   public class SampleApplication extends Application {
     @Override
     public void onCreate() {
       super.onCreate();
       Configuration configuration = new Configuration.Builder("<CLIENT_TOKEN>", "<ENV_NAME>", "<APP_VARIANT_NAME>")
         .useSite(DatadogSite.UK1)
         .build();

       Datadog.initialize(this, configuration, trackingConsent);
     }
   }
   ```

   {{% /tab %}}
   {{< /tabs >}}
   {{< /site-region >}}

   GDPR 規制を遵守するため、SDK は
   初期化時に追跡に関する同意を求めます。
   追跡に関する同意は以下のいずれかの値で示されます。

   * `TrackingConsent.PENDING`: SDK はデータの収集とバッチ処理を開始しますが、
     データ
     収集エンドポイントには送信しません。SDK は、バッチ処理が完了したデータをどうするかについての新たな同意値が得られるまで
     待機します。
   * `TrackingConsent.GRANTED`: SDK はデータの収集を開始し、データ収集
     エンドポイントへ送信します。
   * `TrackingConsent.NOT_GRANTED`: SDK がデータを収集することはありません。ログ、トレース、
     RUM イベントを手動で
     送信することもできません。

   SDK の初期化後に追跡に関する同意を更新するには、
   `Datadog.setTrackingConsent(<NEW CONSENT>)` を呼び出します。
   SDK は新しい同意に応じて動作を変更します。たとえば、現在の追跡に関する
   同意が `TrackingConsent.PENDING` であり、

   * `TrackingConsent.GRANTED` に更新した場合、SDK は現在のバッチデータと将来的なデータをすべて
     データ収集エンドポイントに直接送信します。
   * `TrackingConsent.NOT_GRANTED`: SDK はすべてのバッチデータを消去し、以後のデータを一切
     収集しません。

   **注**: 初期化に必要な認証情報では、アプリケーションのバリアント名も
   必要となり、`BuildConfig.FLAVOR` の値 (バリアントがない場合は
   空白の文字列) の使用が求められます。これは適切な ProGuard `mapping.txt` ファイルを有効化し、
   ビルド時にこのファイルが自動的にアップロードされるようにするために重要です。この操作により、難読化を解除された RUM エラースタックトレースを表示できるようになります。詳細については、
   [Android ソースマッピングファイルのアップロードガイド][7] を参照してください。

   ユーティリティメソッド `isInitialized` を使用して SDK が適切に初期化されていることを確認します。

   ```kotlin
   if (Datadog.isInitialized()) {
     // your code here
   }
   ```

   アプリケーションを作成する際、`setVerbosity` メソッドを呼び出すことで開発ログを有効にできます。
   指定したレベル以上の優先度を持つライブラリ内のすべての内部メッセージが
   Android の Logcat に記録されます。

   ```kotlin
   Datadog.setVerbosity(Log.INFO)
   ```
3. トレース機能を構成し、有効にします。
   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
   val traceConfig = TraceConfiguration.Builder().build()
   Trace.enable(traceConfig)
   ```
   {{% /tab %}}
   {{% tab "Java" %}}
   ```java
   TraceConfiguration traceConfig = new TraceConfiguration.Builder().build();
   Trace.enable(traceConfig);
   ```
   {{% /tab %}}
   {{< /tabs >}}
4. `DatadogTracer` を構成して登録します。通常はアプリケーションの `onCreate()` メソッドで一度だけ実行する必要があります。
   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
   import com.datadog.android.trace.GlobalDatadogTracer
   import com.datadog.android.trace.DatadogTracing

   GlobalDatadogTracer.registerIfAbsent(
       DatadogTracing.newTracerBuilder()
           .build()
   )
   ```
   {{% /tab %}}
   {{% tab "Java" %}}
   ```java
   import com.datadog.android.trace.GlobalDatadogTracer;
   import com.datadog.android.trace.DatadogTracing;

   GlobalDatadogTracer.registerIfAbsent(
       DatadogTracing.newTracerBuilder(Datadog.getInstance())
           .build()
   );
   ```
   {{% /tab %}}
   {{< /tabs >}}
5. (オプション) -アプリケーションが生成するスパン数に基づいて SDK のワークロードを最適化するために、部分フラッシュしきい値を設定します。ライブラリは、終了したスパンをディスクに書き込む前に、終了したスパンの数がしきい値を超えるまで待機します。この値を `1` に設定すると、各スパンは終了次第すぐに書き込まれます。
   {{< tabs >}}
   {{% tab "Kotlin" %}}

   ```kotlin
   val tracer = DatadogTracing.newTracerBuilder()
       .withPartialFlushMinSpans(10)
       .build()
   ```

   {{% /tab %}}
   {{% tab "Java" %}}

   ```java
   DatadogTracer tracer = DatadogTracing.newTracerBuilder(Datadog.getInstance())
       .withPartialFlushMinSpans(10)
       .build();
   ```
   {{% /tab %}}
   {{< /tabs >}}
6. 次のメソッドでカスタムスパンを開始します。
   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
   val tracer = GlobalDatadogTracer.get()
   val span = tracer.buildSpan("<SPAN_NAME>").start()
   // Do something ...
   // ...
   // Then when the span should be closed
   span.finish()
   ```
   {{% /tab %}}
   {{% tab "Java" %}}
   ```java
   DatadogTracer tracer = GlobalDatadogTracer.get();
   DatadogSpan span = tracer.buildSpan("<SPAN_NAME>").start();
   // Do something ...
   // ...
   // Then when the span should be closed
   span.finish();
   ```
   {{% /tab %}}
   {{< /tabs >}}
7. 同期呼び出しでスコープを使用するには、次のようにします。
   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
   val span = tracer.buildSpan("<SPAN_NAME1>").start()
   try {
       val scope = tracer.activateSpan(span)
       scope?.use {
           // Do something ...
           // ...
           // Start a new Scope
           val childSpan = tracer.buildSpan("<SPAN_NAME2>").start()
           try {
               val innerScope = tracer.activateSpan(childSpan).use { innerScope ->

               }
           } catch (e: Throwable) {
               childSpan.logThrowable(e)
           } finally {
               childSpan.finish()
           }
       }
   } catch (e: Throwable) {
   }
   ```
   {{% /tab %}}
   {{% tab "Java" %}}
   ```java
   DatadogSpan span = tracer.buildSpan("<SPAN_NAME1>").start();
   try {
       DatadogScope scope = tracer.activateSpan(span);
       try {
           // Do something ...
           // ...
           // Start a new Scope
           DatadogSpan childSpan = tracer.buildSpan("<SPAN_NAME2>").start();
           try {
               DatadogScope innerScope = tracer.activateSpan(childSpan);
               try {
                   // Do something ...
               } finally {
                   innerScope.close();
               }
           } catch (Throwable e) {
               childSpan.logThrowable(e);
           } finally {
               childSpan.finish();
           }
       } finally {
           scope.close();
       }
   } catch (Throwable e) {
   }
   ```
   {{% /tab %}}
   {{< /tabs >}}
8. 非同期呼び出しでスコープを使用するには、次のようにします。
   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
   val span = tracer.buildSpan("<SPAN_NAME1>").start()
   try {
       val scope = tracer.activateSpan(span)
       scope.use {
           // Do something ...
           Thread {
               // Step 2: reactivate the Span in the worker thread
               tracer.activateSpan(span).use {
                   // Do something ...
               }
           }.start()
       }
   } catch (e: Throwable) {
       span.logThrowable(e)
   } finally {
       span.finish()
   }
   ```
   {{% /tab %}}
   {{% tab "Java" %}}
   ```java
   DatadogSpan span = tracer.buildSpan("<SPAN_NAME1>").start();
   try {
       DatadogScope scope = tracer.activateSpan(span);
       try {
           // Do something ...
           new Thread(() -> {
               // Step 2: reactivate the Span in the worker thread
               DatadogScope scopeContinuation = tracer.activateSpan(span);
               try {
                   // Do something
               } finally {
                   scope.close();
               }
           }).start();
       } finally {
           scope.close();
       }
   } catch (Throwable e){
       span.logThrowable(e);
   } finally {
       span.finish();
   }
   ```
   {{% /tab %}}
   {{< /tabs >}}

9. (オプション) フロントエンド - バックエンドなど、環境間でトレースを手動で分散します。
   1. クライアントリクエストにトレーサーコンテキストを挿入します。
   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
   val tracer = GlobalDatadogTracer.get()
   val span = tracer.buildSpan("<SPAN_NAME>").start()
   val tracedRequestBuilder = Request.Builder()
   tracer.propagate().inject<Request.Builder?>(
       span.context(),
       tracedRequestBuilder
   ) { builder, key, value ->
       builder?.addHeader(key, value)
   }
   val request = tracedRequestBuilder.build()
   // Dispatch the request and finish the span after.
   ```
   {{% /tab %}}
   {{% tab "Java" %}}
   ```java
   DatadogTracer tracer = GlobalDatadogTracer.get();
   DatadogSpan span = tracer.buildSpan("<SPAN_NAME>").start();
   Request.Builder tracedRequestBuilder = new Request.Builder();
   tracer.propagate().inject(
       span.context(),
       tracedRequestBuilder,
       new Function3<Request.Builder,String,String,Unit>(){
           @Override
           public Unit invoke(Request.Builder builder, String key, String value) {
             builder.addHeader(key, value);
             return Unit.INSTANCE;
           }
       }
   );
   Request request = tracedRequestBuilder.build();
   // Dispatch the request and finish the span after.
   ```
   {{% /tab %}}
   {{< /tabs >}}
   1. サーバーコードのヘッダーからクライアントトレーサーコンテキストを抽出します。
   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
   val tracer = GlobalDatadogTracer.get()
   val extractedContext = tracer.propagate()
       .extract(request) { carrier, classifier ->
           val headers = carrier.headers.toMultimap()
               .map { it.key to it.value.joinToString(";") }
               .toMap()

           for ((key, value) in headers) classifier(key, value)
       }

   val serverSpan = tracer.buildSpan("<SERVER_SPAN_NAME>").withParentContext(extractedContext).start()
   ```
   {{% /tab %}}
   {{% tab "Java" %}}
   ```java
   DatadogTracer tracer = GlobalDatadogTracer.get();
   DatadogSpanContext extractedContext = tracer.propagate()
     .extract(request,
       new Function2<Request, Function2<? super String, ? super String, Boolean>, Unit>() {
         @Override
         public Unit invoke(
           Request carrier,
           Function2<? super String, ? super String, Boolean> classifier
         ) {
           request.headers().forEach(pair -> {
             String key = pair.component1();
             String value = pair.component2();

             classifier.invoke(key, value);
           });

           return Unit.INSTANCE;
         }
       });
   DatadogSpan serverSpan = tracer.buildSpan("<SERVER_SPAN_NAME>").withParentContext(extractedContext).start();
   ```
   {{% /tab %}}
   {{< /tabs >}}

   **注**: OkHttp クライアントを使用するコードベースの場合、Datadog は [以下の実装](#okhttp)を提供します。

10. (オプション) スパンと一緒に追加のタグを指定するには、次のようにします。
    ```kotlin
    span.setTag("http.url", url)
    ```
11. (オプション) スパンをエラーがあるとマークし、対応するメソッドを使用してログに記録するには、次のようにします。
    ```kotlin
    span.logThrowable(throwable)
    ```
    ```kotlin
    span.logErrorMessage(message)
    ```
12. バッチ処理前にスパンイベントで属性を変更する必要がある場合は、トレース機能の有効化時に `SpanEventMapper` を実装することでそれらの属性を変更できるようになります。
   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
   val traceConfig = TraceConfiguration.Builder()
     // ...
     .setEventMapper(spanEventMapper)
     .build()
   ```
   {{% /tab %}}
   {{% tab "Java" %}}
   ```java
   TraceConfiguration config = new TraceConfiguration.Builder()
     // ...
     .setEventMapper(spanEventMapper)
     .build();
   ```
   {{% /tab %}}
   {{< /tabs >}}

## Kotlin 拡張機能 {#kotlin-extensions}

### スパン内での Lambda の実行 {#running-a-lambda-within-a-span}

特定の Lambda のパフォーマンスを監視するには、`withinSpan()` メソッドを使用できます。デフォルトではスパンのスコープが作成されますが、`activate` パラメーターを false に設定することでこの動作を無効にできます。

```kotlin
import com.datadog.android.trace.withinSpan
import com.datadog.android.trace.api.span.DatadogSpan

withinSpan("<SPAN_NAME>", parentSpan, activate) {
   // Your code here
}
```

### SQLite トランザクションのトレース {#tracing-sqlite-transaction}

`SQLiteDatabase` を使用してローカルにデータを保存している場合は、以下の方法でデータベースのトランザクションをトレースすることができます。

```kotlin
import com.datadog.android.trace.sqlite.transactionTraced
import android.database.sqlite.SQLiteDatabase

sqliteDatabase.transactionTraced("<SPAN_NAME>", isExclusive) { database ->
  // Your queries here
  database.insert("<TABLE_NAME>", null, contentValues)

  // Decorate the Span
  setTag("<TAG_KEY>", "<TAG_VALUE>")
}
```
このメソッドは `core-ktx` AndroidX パッケージで提供されている `SQLiteDatabase.transaction` メソッドと同じように動作し、スパンオペレーション名のみを必要とします。

## インテグレーション {#integrations}

Datadog SDK は、手動トレースに加えて、以下のインテグレーションを提供します。

### OkHttp {#okhttp}

OkHttp リクエストをトレースする場合は、次のようにして提供された [インターセプター][6] (`dd-sdk-android-okhttp` ライブラリにあります) を追加できます。

1. モジュールレベルの `build.gradle` ファイルに `dd-sdk-android-okhttp` ライブラリへの Gradle 依存関係を追加します。
   ```groovy
   dependencies {
     implementation "com.datadoghq:dd-sdk-android-okhttp:x.x.x"
   }
   ```
2. `DatadogInterceptor` を `OkHttpClient` に追加します。各ホストエントリーは、プレーンなホスト名 (例: `"example.com"`) また単一 `*` を含むワイルドカードパターン (例: `"*.example.com"`) を受け入れます。ワイルドカードは登録可能なドメインのサブドメインのみに一致するため、`"*.com"` のようなパターンは拒否されます。
   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
   val tracedHosts = listOf("example.com", "example.eu", "*.example.eu")
   val okHttpClient = OkHttpClient.Builder()
     .addInterceptor(
       DatadogInterceptor.Builder(tracedHosts)
         .setTraceSampleRate(20f)
         .build()
     )
     .build()
   ```
   {{% /tab %}}
   {{% tab "Java" %}}
   ```java
   List<String> tracedHosts = Arrays.asList("example.com", "example.eu", "*.example.eu");
   OkHttpClient okHttpClient = new OkHttpClient.Builder()
     .addInterceptor(
       new DatadogInterceptor.Builder(tracedHosts)
         .setTraceSampleRate(20f)
         .build()
     )
     .build();
   ```
   {{% /tab %}}
   {{< /tabs >}}

これにより、OkHttpClient によって処理される各リクエストに関するスパンが作成され (提供されたホストに一致)、関連するすべての情報 (URL、メソッド、ステータスコード、エラー) が自動的に入力され、トレース情報がバックエンドに伝播されて、Datadog 内で統合されたトレースが取得されます

ネットワークトレースは、調整可能なサンプリングレートでサンプリングされます。デフォルトでは、100% のサンプリングが適用されます。

このインターセプターは、アプリケーションレベルでリクエストを追跡します。ネットワークレベルで `TracingInterceptor` を追加すると、リダイレクトの追跡時などにより詳細な情報を取得できます。

{{< tabs >}}
{{% tab "Kotlin" %}}

```kotlin
val tracedHosts = listOf("example.com", "example.eu", "*.example.eu")
val okHttpClient =  OkHttpClient.Builder()
  .addInterceptor(
    DatadogInterceptor.Builder(tracedHosts)
      .setTraceSampleRate(20f)
      .build()
  )
  .addNetworkInterceptor(
    TracingInterceptor.Builder(tracedHosts)
      .setTraceSampleRate(100f)
      .build()
  )
  .build()
```
{{% /tab %}}
{{% tab "Java" %}}

```java
List<String> tracedHosts = Arrays.asList("example.com", "example.eu", "*.example.eu");
OkHttpClient okHttpClient = new OkHttpClient.Builder()
  .addInterceptor(
    new DatadogInterceptor.Builder(tracedHosts)
      .setTraceSampleRate(20f)
      .build()
  )
  .addNetworkInterceptor(
    new TracingInterceptor.Builder(tracedHosts)
      .setTraceSampleRate(20f)
      .build()
  )
  .build();
```
{{% /tab %}}
{{< /tabs >}}

この場合、特定のリクエストに対して上流のインターセプターが行ったトレースサンプリングの判断は、下流のインターセプターによって尊重されます。

OkHttp リクエストの実行方法 ( スレッドプールを使用) のため、リクエストスパンはリクエストをトリガーしたスパンと自動的にリンクされません。次のように、`Request.Builder.parentSpan` 拡張メソッドを使用して `OkHttp Request.Builder` で親スパンを手動で指定することは可能です。

{{< tabs >}}
{{% tab "Kotlin" %}}

```kotlin
val request = Request.Builder()
  .url(requestUrl)
  .parentSpan(parentSpan)
  .build()
```
{{% /tab %}}
{{% tab "Java" %}}

```java
Request.Builder requestBuilder = new Request.Builder()
  .url(requestUrl);

Request request = OkHttpRequestExtKt
  .parentSpan(requestBuilder, parentSpan)
  .build();
```
{{% /tab %}}
{{< /tabs >}}

**注**:
* 複数のインターセプターを使用する場合、このインターセプターを最初に呼び出す必要があります。
* Datadog 構成でカスタムトレースヘッダータイプを定義し、`GlobalDatadogTracer` で登録された SDK を使用している場合は、使用中の SDK に対して同じトレースヘッダータイプが設定されていることを確認してください。

### Cronet {#cronet}

OkHttp の代わりに Cronet を使用する場合は、分散トレースのために `CronetEngine` をインスツルメントできます。

1. モジュールレベルの `build.gradle` ファイルに Gradle 依存関係を追加します。
   ```groovy
   dependencies {
     implementation "com.datadoghq:dd-sdk-android-cronet:x.x.x"
   }
   ```
2. `CronetEngine.Builder` をインスツルメントします。
   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
   val cronetEngine = CronetEngine.Builder(context)
     .configureDatadogInstrumentation(
       apmInstrumentationConfiguration = ApmNetworkInstrumentationConfiguration(
         tracedHosts = listOf("example.com", "example.eu")
       )
     )
     .build()
   ```
   {{% /tab %}}
   {{% tab "Java" %}}
   ```java
   CronetEngine.Builder builder = new CronetEngine.Builder(context);
   CronetEngine cronetEngine = CronetIntegrationPluginKt
     .configureDatadogInstrumentation(
       builder,
       null,
       new ApmNetworkInstrumentationConfiguration(
         Arrays.asList("example.com", "example.eu")
       )
     )
     .build();
   ```
   {{% /tab %}}
   {{< /tabs >}}

これにより、指定されたホストに一致する `CronetEngine` によって処理される各リクエストに関するスパンが作成されます。関連するすべての情報 (URL、メソッド、ステータスコード、エラー) が自動的に入力され、トレース情報がバックエンドに伝播されます。

#### リダイレクトのトレース {#tracing-redirects}

デフォルトでは、トレースはアプリケーションレベルで適用されます。リダイレクトされたリクエストもトレースするには、トレーススコープを `ALL` に設定します。

{{< tabs >}}
{{% tab "Kotlin" %}}

```kotlin
val cronetEngine = CronetEngine.Builder(context)
  .configureDatadogInstrumentation(
    apmInstrumentationConfiguration = ApmNetworkInstrumentationConfiguration(
      tracedHosts = listOf("example.com", "example.eu")
    ).setTraceScope(ApmNetworkTracingScope.ALL)
  )
  .build()
```
{{% /tab %}}
{{% tab "Java" %}}

```java
CronetEngine.Builder builder = new CronetEngine.Builder(context);
CronetEngine cronetEngine = CronetIntegrationPluginKt
  .configureDatadogInstrumentation(
    builder,
    null,
    new ApmNetworkInstrumentationConfiguration(
      Arrays.asList("example.com", "example.eu")
    ).setTraceScope(ApmNetworkTracingScope.ALL)
  )
  .build();
```
{{% /tab %}}
{{< /tabs >}}

#### ヘッダー伝播専用 {#header-propagation-only}

ローカルスパンを作成せずにトレースヘッダーを伝播するには、ヘッダー伝播専用モードを使用します。

**注**: このモードでは、リソースの追跡が RUM インスツルメンテーションによって処理されるため、RUM を有効にする必要があります。`configureDatadogInstrumentation` 呼び出しに `RumNetworkInstrumentationConfiguration` を指定する必要があります。

{{< tabs >}}
{{% tab "Kotlin" %}}

```kotlin
val cronetEngine = CronetEngine.Builder(context)
  .configureDatadogInstrumentation(
    rumInstrumentationConfiguration = RumNetworkInstrumentationConfiguration(),
    apmInstrumentationConfiguration = ApmNetworkInstrumentationConfiguration(
      tracedHosts = listOf("example.com", "example.eu")
    ).setHeaderPropagationOnly()
  )
  .build()
```
{{% /tab %}}
{{% tab "Java" %}}

```java
CronetEngine.Builder builder = new CronetEngine.Builder(context);
CronetEngine cronetEngine = CronetIntegrationPluginKt
  .configureDatadogInstrumentation(
    builder,
    new RumNetworkInstrumentationConfiguration(),
    new ApmNetworkInstrumentationConfiguration(
      Arrays.asList("example.com", "example.eu")
    ).setHeaderPropagationOnly()
  )
  .build();
```
{{% /tab %}}
{{< /tabs >}}

#### サンプリングレート {#sampling-rate}

トレースのサンプリングレートを構成するには、次のようにします。

{{< tabs >}}
{{% tab "Kotlin" %}}

```kotlin
val cronetEngine = CronetEngine.Builder(context)
  .configureDatadogInstrumentation(
    apmInstrumentationConfiguration = ApmNetworkInstrumentationConfiguration(
      tracedHosts = listOf("example.com", "example.eu")
    ).setTraceSampleRate(20f)
  )
  .build()
```
{{% /tab %}}
{{% tab "Java" %}}

```java
CronetEngine.Builder builder = new CronetEngine.Builder(context);
CronetEngine cronetEngine = CronetIntegrationPluginKt
  .configureDatadogInstrumentation(
    builder,
    null,
    new ApmNetworkInstrumentationConfiguration(
      Arrays.asList("example.com", "example.eu")
    ).setTraceSampleRate(20f)
  )
  .build();
```
{{% /tab %}}
{{< /tabs >}}

**既知の制限**:
* Cronet API の制限により、リダイレクトされたリクエストのトレースヘッダーが伝播されません。
* 再試行はインスツルメントできません。

## バッチコレクション {#batch-collection}

すべてのスパンは、最初にローカルデバイスにバッチで格納されます。各バッチは、取り込み仕様に従います。バッチは、ネットワークが利用可能でバッテリー残量が十分に高い場合に送信され、Datadog SDK がエンドユーザーの体験に影響を与えないようになっています。アプリケーションがフォアグラウンドにある間にネットワークが利用できない場合、またはデータのアップロードが失敗した場合、送信に成功するまでバッチは保持されます。

つまり、ユーザーがオフラインでアプリケーションを開いても、データが失われることはありません。

ディスク上のデータは、古すぎる場合は SDK がディスク容量を使いすぎないようにするために自動的に破棄されます。

## 初期化 {#initialization}
`DatadogTracer` を初期化する際には、`DatadogTracerBuilder` の以下のメソッドを使用できます。

| メソッド                                            | 説明                                                                                                                                                                                  |
|---------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `withServiceName(<SERVICE_NAME>)	`                | `service` の値を設定します。                                                                                                                                                            |
| `withPartialFlushMinSpans(<INT>)`                 | このしきい値に達すると (特定の `<INT>` 量のクローズされたスパンが待機している)、フラッシュメカニズムがトリガーされ、保留中のクローズされたスパンがすべて処理されインテークに送られます。|
| `withTag(<KEY>, <VALUE>)`                         | トレーサーが作成するスパンに追加するタグを `<KEY>:<VALUE>` のペアで設定します。                                                                                                              |
| `setBundleWithRumEnabled(true)`                   | スパンを現在の RUM View 情報でリッチ化することを有効にするには、`true` に設定します。これにより、RUM エクスプローラーで特定の View ライフスパン中に生成されたすべてのスパンを確認することができます。  |
| `withSampleRate(<FLOAT>)`                         | トレースを収集する割合を設定します (`0-100`)。                                                                                                                          |
| `withTracingHeadersTypes(Set<TracingHeaderType>)` | トレーサーによって挿入されるトレースヘッダースタイルを設定します。                                                                                                                          |
| `setTraceRateLimit(<INT>)`                        | トレースレート制限を設定します。これは、受け入れられる 1 秒あたりの最大トレース数です。                                                                                           |

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/glossary/#trace
[2]: https://github.com/DataDog/dd-sdk-android/tree/develop/features/dd-sdk-android-trace
[3]: /ja/glossary/#span
[4]: /ja/account_management/api-app-keys/#client-tokens
[5]: /ja/account_management/api-app-keys/#api-keys
[6]: https://square.github.io/okhttp/interceptors/

[7]: /ja/real_user_monitoring/error_tracking/mobile/android/?tab=us#upload-your-mapping-file