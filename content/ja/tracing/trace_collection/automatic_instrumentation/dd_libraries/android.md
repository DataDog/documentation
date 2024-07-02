---
aliases:
- /tracing/setup_overview/setup/android
- /tracing/setup/android
- /tracing/trace_collection/dd_libraries/android
description: Collect traces from your Android applications.
code_lang: android
type: multi-code-lang
code_lang_weight: 80
further_reading:
- link: "https://github.com/DataDog/dd-sdk-android"
  tag: Source Code
  text: dd-sdk-android Source code
- link: tracing/visualization/
  tag: Documentation
  text: Explore your services, resources, and traces
title: Tracing Android Applications
---
[Datadog の `dd-sdk-android-trace` クライアント側トレーシングライブラリ][2]を使用すると、Android アプリケーションから Datadog へ[トレース][1]を送信するとともに、次の機能を利用できます。

* アプリケーションでの操作用にカスタム[スパン][3]を作成する。
* 送信される各スパンに `context` およびカスタム属性を追加する。
* 自動一括ポストによってネットワークの利用を最適化する。

<div class="alert alert-info"><strong>注</strong>: Datadog は、Android アプリケーションから送信された、 <strong>取り込まれ、インデックス化された</strong>スパンについては課金しますが、基底のデバイスについては課金しません。詳しくは、<a href="/account_management/billing/apm_tracing_profiler/">APM 請求のドキュメント</a>をご覧ください。</div>

Datadog tracer implements both [Open Tracing][11] and [Open Telemetry][10] standards. 

## セットアップ

1. `build.gradle` ファイルでライブラリを依存関係として宣言し、Gradle 依存関係を追加します。

```groovy
dependencies {
    implementation "com.datadoghq:dd-sdk-android-trace:x.x.x"
}
```

2. アプリケーションコンテキスト、追跡同意、[Datadog クライアントトークン][4]で Datadog SDK を初期化します。セキュリティ上の理由から、クライアントトークンを使用する必要があります。API キーがクライアント側の Android アプリケーションの APK バイトコードで公開されてしまうため、[Datadog API キー][5]を使用して Datadog SDK を構成することはできません。クライアントトークンの設定に関する詳細は、[クライアントトークンに関するドキュメント][4]を参照してください。

   {{< site-region region="us" >}}
   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
       class SampleApplication : Application() {
           override fun onCreate() {
               super.onCreate()
               val configuration = Configuration.Builder(
                   clientToken = <CLIENT_TOKEN>,
                   env = <ENV_NAME>,
                   variant = <APP_VARIANT_NAME>
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
               Configuration configuration =
                       new Configuration.Builder(<CLIENT_TOKEN>, <ENV_NAME>, <APP_VARIANT_NAME>)
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
                        clientToken = <CLIENT_TOKEN>,
                        env = <ENV_NAME>,
                        variant = <APP_VARIANT_NAME>
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
               Configuration configuration =
                       new Configuration.Builder(<CLIENT_TOKEN>, <ENV_NAME>, <APP_VARIANT_NAME>)
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
                        clientToken = <CLIENT_TOKEN>,
                        env = <ENV_NAME>,
                        variant = <APP_VARIANT_NAME>
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
               Configuration configuration =
                       new Configuration.Builder(<CLIENT_TOKEN>, <ENV_NAME>, <APP_VARIANT_NAME>)
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
                        clientToken = <CLIENT_TOKEN>,
                        env = <ENV_NAME>,
                        variant = <APP_VARIANT_NAME>
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
               Configuration configuration =
                       new Configuration.Builder(<CLIENT_TOKEN>, <ENV_NAME>, <APP_VARIANT_NAME>)
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
                        clientToken = <CLIENT_TOKEN>,
                        env = <ENV_NAME>,
                        variant = <APP_VARIANT_NAME>
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
               Configuration configuration =
                       new Configuration.Builder(<CLIENT_TOKEN>, <ENV_NAME>, <APP_VARIANT_NAME>)
                               .useSite(DatadogSite.US1_FED)
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
                        clientToken = <CLIENT_TOKEN>,
                        env = <ENV_NAME>,
                        variant = <APP_VARIANT_NAME>
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
               Configuration configuration =
                       new Configuration.Builder(<CLIENT_TOKEN>, <ENV_NAME>, <APP_VARIANT_NAME>)
                               .useSite(DatadogSite.AP1)
                               .build();
               Datadog.initialize(this, configuration, trackingConsent);
           }
       }
   ```
   {{% /tab %}}
   {{< /tabs >}}
   {{< /site-region >}}

   GDPR 規制を遵守するため、SDK は初期化時に追跡に関する同意を求めます。
   追跡に関する同意は以下のいずれかの値で示されます。
   * `TrackingConsent.PENDING`: SDK はデータの収集とバッチ処理を開始しますが、データ
     収集エンドポイントへの送信は行われません。SDK はバッチ処理が完了したデータをどうするかについての新たな同意値が得られるまで待機します。
   * `TrackingConsent.GRANTED`: SDK はデータの収集を開始し、それをデータ収集エンドポイントに送信します。
   * `TrackingConsent.NOT_GRANTED`: SDK がデータを収集することはありません。手動でログやトレース、
     RUM イベントを送信することもできません。

   SDK の初期化後に追跡に関する同意を更新する場合は、 `Datadog.setTrackingConsent(<NEW CONSENT>)` を呼び出してください。
   SDK は新しい同意に応じて動作を変更します。たとえば、現在の同意内容が `TrackingConsent.PENDING` で、それを
   * `TrackingConsent.GRANTED` に更新した場合: SDK は現在のバッチデータと将来的なデータをすべてデータ収集エンドポイントに直接送信します。
   * `TrackingConsent.NOT_GRANTED`: SDK はすべてのバッチデータを消去し、以後のデータも収集しません。

**Note**: In the credentials required for initialization, your application variant name is also required, and should use your `BuildConfig.FLAVOR` value (or an empty string if you don't have variants). This is important because it enables the right ProGuard `mapping.txt` file to be automatically uploaded at build time to be able to view de-obfuscated RUM error stack traces. For more information see the [guide to uploading Android source mapping files][12].

   ユーティリティメソッド `isInitialized` を使用して SDK が適切に初期化されていることを確認します。

   ```kotlin
    if (Datadog.isInitialized()) {
        // your code here
    }
   ```
   アプリケーションを書く際、 `setVerbosity` メソッドを呼び出すことで開発ログを有効にできます。指定したレベル以上の優先度を持つライブラリ内のすべての内部メッセージが Android の Logcat に記録されます。
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
    TraceConfiguration traceConfig = TraceConfiguration.Builder().build();
    Trace.enable(traceConfig);
```
{{% /tab %}}
{{< /tabs >}}

4. Android Tracer を構成して登録します。通常はアプリケーションの `onCreate()` メソッドで、一度だけ実行する必要があります。

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
val tracer = AndroidTracer.Builder().build()
GlobalTracer.registerIfAbsent(tracer)
```
{{% /tab %}} 
{{% tab "Java" %}}
```java
AndroidTracer tracer = new AndroidTracer.Builder().build();
GlobalTracer.registerIfAbsent(tracer);
```
{{% /tab %}}
{{< /tabs >}}

5. (Optional) - Set the partial flush threshold to optimize the SDK's workload based on the number of spans your application generates. The library waits until the number of finished spans exceeds the threshold before writing them to disk. Setting this value to `1` writes each span as soon as it finishes.

{{< tabs >}} 
{{% tab "Kotlin" %}}

```kotlin
val tracer = AndroidTracer.Builder()
        .setPartialFlushThreshold(10)
        .build()
```

{{% /tab %}}
{{% tab "Java" %}}

```java
AndroidTracer tracer = new AndroidTracer.Builder()
        .setPartialFlushThreshold(10)
        .build();
```
{{% /tab %}}
{{< /tabs >}}

6. 次のメソッドでカスタムスパンを開始します。

{{< tabs >}} 
{{% tab "Kotlin" %}}
```kotlin
val tracer = GlobalTracer.get()
val span = tracer.buildSpan("<SPAN_NAME>").start()
// 操作を実行 ...
// ...
// 続いて、スパンを閉じるべき時に
span.finish()
```
{{% /tab %}}
{{% tab "Java" %}}
```java
GlobalTracer tracer = GlobalTracer.get();
Span span = tracer.buildSpan("<SPAN_NAME>").start();
// 操作を実行 ...
// ...
// 続いて、スパンを閉じるべき時に
span.finish();
```
{{% /tab %}}
{{< /tabs >}}

7. 同期呼び出しでスコープを使用する:

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
val span = tracer.buildSpan("<SPAN_NAME1>").start()
try {
    val scope = tracer.activateSpan(span)
    scope.use {
        // 操作を実行 ...
        // ...
        // 新しいスコープを開始
        val childSpan = tracer.buildSpan("<SPAN_NAME2>").start()
        try {
            tracer.activateSpan(childSpan).use {
                // 操作を実行 ...
            }
        } catch(e: Error) {
            childSpan.error(e)
        } finally {
            childSpan.finish()
        }
    }
} catch(e: Throwable) {
    AndroidTracer.logThrowable(span, e)
} finally {
    span.finish()
}
```
{{% /tab %}}
{{% tab "Java" %}}
```java
Span = tracer.buildSpan("<SPAN_NAME1>").start();
try {
    Scope scope = tracer.activateSpan(span);
    try {
        // 操作を実行 ...
        // ...
        // 新しいスコープを開始
        Span childSpan = tracer.buildSpan("<SPAN_NAME2>").start();
        try {
            Scope innerScope = tracer.activateSpan(childSpan);
            try {
                // 操作を実行 ...
            } finally {
                innerScope.close();
            }   
        } catch(Throwable e) {
            AndroidTracer.logThrowable(childSpan, e);
        } finally {
            childSpan.finish();
        }
    }
    finally {
        scope.close();
    }
} catch(Error e) {
    AndroidTracer.logThrowable(span, e);
} finally {
    span.finish();
}
```
{{% /tab %}}
{{< /tabs >}}

8. 非同期呼び出しでスコープを使用する:

    {{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
val span = tracer.buildSpan("<SPAN_NAME1>").start()
try{
    val scope = tracer.activateSpan(span)
    scope.use {
        // Do something ...
        doAsyncWork {
            // Step 2: reactivate the Span in the worker thread
            val scopeContinuation = tracer.scopeManager().activate(span)
            scopeContinuation.use {
                // Do something ...
            }
        }
    }
} catch(e: Throwable) {
    AndroidTracer.logThrowable(span, e)
} finally {
    span.finish()
}
```
{{% /tab %}}
{{% tab "Java" %}}
```java
Span span = tracer.buildSpan("<SPAN_NAME1>").start();
try {
    Scope scope = tracer.activateSpan(span);
    try {
        // Do something ...
        new Thread(() -> {
            // Step 2: reactivate the Span in the worker thread
            Scope scopeContinuation = tracer.scopeManager().activate(span);
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
    AndroidTracer.logThrowable(span, e);
} finally {
    span.finish();
}
```
{{% /tab %}}
    {{< /tabs >}}

9. (任意) フロントエンド - バックエンドなど、環境間でトレースを手動で分散する:

   a. クライアントリクエストにトレーサーコンテキストを挿入します。

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
val tracer = GlobalTracer.get()
val span = tracer.buildSpan("<SPAN_NAME>").start()
val tracedRequestBuilder = Request.Builder()
tracer.inject(span.context(), Format.Builtin.TEXT_MAP_INJECT,         
        TextMapInject { key, value -> 
            tracedRequestBuilder.addHeader(key, value) 
        }
)
val request = tracedRequestBuilder.build() 
// リクエストをディスパッチして、スパンを終了させます。
```
{{% /tab %}}
{{% tab "Java" %}}
```java
Tracer tracer = GlobalTracer.get();
Span span = tracer.buildSpan("<SPAN_NAME>").start();
Request.Builder tracedRequestBuilder = new Request.Builder();
tracer.inject(
        span.context(),
        Format.Builtin.TEXT_MAP_INJECT,
        new TextMapInject() {
            @Override 
            public void put(String key, String value) {
                tracedRequestBuilder.addHeader(key, value);
            }
        });
Request request = tracedRequestBuilder.build();
// リクエストをディスパッチして、スパンを終了させます
```
{{% /tab %}}
{{< /tabs >}}

b. サーバーコードのヘッダーからクライアントトレーサーコンテキストを抽出します。

   {{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
val tracer = GlobalTracer.get() 
val extractedContext = tracer.extract(
        Format.Builtin.TEXT_MAP_EXTRACT, 
        TextMapExtract { 
            request.headers().toMultimap()
            .map { it.key to it.value.joinToString(";") }
                    .toMap()
                    .entrySet()
                    .iterator()
            }
        ) 
val serverSpan = tracer.buildSpan("<SERVER_SPAN_NAME>").asChildOf(extractedContext).start()      
```
   {{% /tab %}}
   {{% tab "Java" %}}
```java
Tracer tracer = GlobalTracer.get();
SpanContext extractedContext = tracer.extract(
        Format.Builtin.TEXT_MAP_EXTRACT,
        new TextMapExtract() {
            @Override 
            public Iterator<Map.Entry<String, String>> iterator() {                 
                return request.headers().toMultimap()
                  .entrySet()
                  .stream()
                  .collect(
                          Collectors.toMap(
                                  Map.Entry::getKey,
                                  entry -> String.join(";", entry.getValue())
                          )
                  )
                  .entrySet()
                  .iterator();
            }
        });
Span serverSpan = tracer.buildSpan("<SERVER_SPAN_NAME>").asChildOf(extractedContext).start();
```
   {{% /tab %}}
   {{< /tabs >}}

**注**: OkHttp クライアントを使用するコードベースの場合、Datadog は[以下の実装](#okhttp)を提供します。

10. (任意) スパンと一緒に追加のタグを指定する:

```kotlin
span.setTag("http.url", url)
```

11. (任意) スパンをエラーがあるとマークし、OpenTracing タグを使用してログに記録する:

```kotlin
span.log(mapOf(Fields.ERROR_OBJECT to throwable))
```
```kotlin
span.log(mapOf(Fields.MESSAGE to errorMessage))
```
AndroidTracer で次のヘルパーメソッドのいずれかを使用することもできます。

```kotlin
AndroidTracer.logThrowable(span, throwable)
```
```kotlin
AndroidTracer.logErrorMessage(span, message)
```

12. バッチ処理前にスパンのイベントで属性を変更する必要がある場合は、トレース機能の有効化時に `SpanEventMapper` を実装することで上記の処理を行えます。

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

## Kotlin 拡張機能

### スパン内での Lambda の実行

指定した Lambda のパフォーマンスを監視するには、`withinSpan()` メソッドを使用します。デフォルトでは、スパンに対してスコープが作成されますが、`activate` パラメーターを false に設定することで、このアクティビティを無効にすることができます。

```kotlin
    withinSpan("<SPAN_NAME>", parentSpan, activate) {
        // コードをここに
    }
```

### スパン拡張機能メソッド

次の `error()` メソッドのいずれかを使って、スパンをエラーとしてマークすることができます。

```kotlin
    val span = tracer.buildSpan("<SPAN_NAME>").start()
    try {
        // ...
    } catch (e: IOException) {
        span.setError(e)
    }
    span.finish()
```

```kotlin
    val span = tracer.buildSpan("<SPAN_NAME>").start()
    if (invalidState) {
        span.setError("Something unexpected happened")
    }
    span.finish()
```

### SQLite トランザクションのトレース

`SQLiteDatabase` を使ってローカルにデータを保存している場合は、以下の方法でデータベースのトランザクションをトレースすることができます。

```kotlin
   sqliteDatabase.transactionTraced("<SPAN_NAME>", isExclusive) { database ->
        // クエリをここに
        database.insert("<TABLE_NAME>", null, contentValues)

        // スパンを修飾
        setTag("<TAG_KEY>", "<TAG_VALUE>")
   }
```
このメソッドは `core-ktx` AndroidX パッケージで提供されている `SQLiteDatabase.transaction` メソッドと同じように動作します。

## インテグレーション

Datadog SDK は、手動トレースに加えて、以下のインテグレーションを提供します。

### OkHttp

OkHttp リクエストをトレースする場合は、次のようにして提供された[インターセプター][6] (`dd-sdk-android-okhttp` ライブラリにあります) を追加できます。

1. モジュールレベルの `build.gradle` ファイルで、`dd-sdk-android-okhttp` ライブラリに Gradle 依存関係を追加します。

    ```groovy
    dependencies {
        implementation "com.datadoghq:dd-sdk-android-okhttp:x.x.x"
    }
    ```

2. `DatadogInterceptor` を `OkHttpClient` に追加します。

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
val okHttpClient = OkHttpClient.Builder() 
        .addInterceptor(
            DatadogInterceptor(listOf("example.com", "example.eu"), traceSampler = RateBasedSampler(20f))
        )
        .build()
```
{{% /tab %}}
{{% tab "Java" %}}
```java
final List<String> tracedHosts = Arrays.asList("example.com", "example.eu");
final OkHttpClient okHttpClient = new OkHttpClient.Builder()
        .addInterceptor(
                new DatadogInterceptor(/** SDK instance name or null **/, tracedHosts, null, null, new RateBasedSampler(20f))
        )
        .build();
```
{{% /tab %}}
{{< /tabs >}}

これにより、OkHttpClient によって処理される各リクエストに関するスパンが作成され (提供されたホストに一致)、関連するすべての情報 (URL、メソッド、ステータスコード、エラー) が自動的に入力され、トレース情報がバックエンドに伝播されて、Datadog 内で統合されたトレースが取得されます

ネットワークトレースは、調整可能なサンプリングレートでサンプリングされます。デフォルトでは、20% のサンプリングが適用されます。

インターセプターは、アプリケーションレベルでリクエストを追跡します。ネットワークレベルで `TracingInterceptor` を追加すると、さらに詳しいデータを取得（リダイレクトをフォローするなど）できます。

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
val tracedHosts = listOf("example.com", "example.eu") 
val okHttpClient =  OkHttpClient.Builder()
        .addInterceptor(DatadogInterceptor(tracedHosts, traceSampler = RateBasedSampler(20f)))
        .addNetworkInterceptor(TracingInterceptor(tracedHosts, traceSampler = RateBasedSampler(20f)))
        .build()
```
{{% /tab %}}
{{% tab "Java" %}}
```java
final List<String> tracedHosts = Arrays.asList("example.com", "example.eu");
final OkHttpClient okHttpClient = new OkHttpClient.Builder()
        .addInterceptor(
                new DatadogInterceptor(/** SDK instance name or null **/, tracedHosts, null, null, new RateBasedSampler(20f))
        )
        .addNetworkInterceptor(
                new TracingInterceptor(/** SDK instance name or null **/, tracedHosts, null, new RateBasedSampler(20f))
        )
        .build();
```
{{% /tab %}}
{{< /tabs >}}

この場合、特定のリクエストに対して上流のインターセプターが行ったトレースサンプリングの判断は、下流のインターセプターによって尊重されます。

OkHttp リクエストの実行方法 (スレッドプールを使用) のため、リクエストスパンはリクエストをトリガーしたスパンに自動的にリンクされません。次のように、`Request.Builder.parentSpan` 拡張機能メソッドを使用して `OkHttp Request.Builder` で親スパンを手動で指定することは可能です。

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
        .url(requestUrl)
Request request = OkHttpRequestExtKt
        .parentSpan(requestBuilder, parentSpan)
        .build();
```
{{% /tab %}}
{{< /tabs >}}

**注**:
* 複数のインターセプターを使用する場合、このインターセプターを最初に呼び出す必要があります。
* If you define custom tracing header types in the Datadog configuration and are using a tracer registered with `GlobalTracer`, make sure the same tracing header types are set for the tracer in use.

### RxJava

RxJava ストリーム内で継続的にトレースを提供するには、以下のステップに従う必要があります。
1. [OpenTracing for RxJava][8] 依存関係をプロジェクトに追加し、**Readme** ファイルの指示に従います。
   たとえば、継続的なトレースには、以下を追加します。
   ```kotlin
   TracingRxJava3Utils.enableTracing(GlobalTracer.get())
   ```
2. 次に、プロジェクトで Observable がサブスクライブされたときにスコープを開き、完了したら閉じます。
   ストリームの演算子で作成されたスパンは、このスコープ（親スパン）内に表示されます。

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
var spanScope: Scope? = null
Single.fromSupplier { } 
        .subscribeOn(Schedulers.io())
        .map {  
            val span = GlobalTracer.get().buildSpan("<YOUR_OP_NAME>").start()
            // ...
            span.finish()
        }
        .doOnSubscribe {
            val span = GlobalTracer.get()
                    .buildSpan("<YOUR_OP_NAME>")
                    .start()
            spanScope = GlobalTracer.get().scopeManager().activate(span)
        }
        .doFinally {
            GlobalTracer.get().scopeManager().activeSpan()?.let {
                it.finish()
            }
            spanScope?.close()
        }
```
{{% /tab %}}
{{% tab "Java" %}}
```java
ThreadLocal<Scope> scopeStorage = new ThreadLocal<>();
...
Single.fromSupplier({})
        .subscribeOn(Schedulers.io())
        .map(data -> {
            final Span span = GlobalTracer.get().buildSpan("<YOUR_OP_NAME>").start();
            // ...
            span.finish();
            // ...
         })
        .doOnSubscribe(disposable -> {
            final Span span = GlobalTracer.get().buildSpan("<YOUR_OP_NAME>").start();
            Scope spanScope = GlobalTracer.get().scopeManager().activate(span);
            scopeStorage.set(spanScope);
        })
        .doFinally(() -> {
            final Span activeSpan = GlobalTracer.get().scopeManager().activeSpan();
            if (activeSpan != null) {
                activeSpan.finish();
            }
            Scope spanScope = scopeStorage.get();
            if (spanScope != null) {
                spanScope.close();
                scopeStorage.remove();
            }
        })
    };
```
{{% /tab %}}
{{< /tabs >}}

### RxJava + Retrofit
ネットワークリクエストに Retrofit を使用する RxJava ストリーム内の継続的トレースの場合:
1. [Datadog Interceptor](#okhttp) を構成
2. [Retrofit RxJava][9] アダプターを使用してネットワークリクエストに同期 Observables を使用。

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
Retrofit.Builder()
    .baseUrl("<YOUR_URL>")
    .addCallAdapterFactory(RxJava3CallAdapterFactory.createSynchronous())
    .client(okHttpClient)
    .build()
```
{{% /tab %}}
{{% tab "Java" %}}
```java
new Retrofit.Builder()
    .baseUrl("<YOUR_URL>")
    .addCallAdapterFactory(RxJava3CallAdapterFactory.createSynchronous())
    .client(okHttpClient)
    .build();
 ```
{{% /tab %}}
{{< /tabs >}}

3. 以下のように、Rx ストリームの周りにスコープを開きます。

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
var spanScope: Scope? = null
remoteDataSource.getData(query)
    .subscribeOn(Schedulers.io())
    .map { // ... } 
    .doOnSuccess {
        localDataSource.persistData(it)
    }
    .doOnSubscribe {
        val span = GlobalTracer.get().buildSpan("<YOUR_OP_NAME>").start()
        spanScope = GlobalTracer.get().scopeManager().activate(span)
    }
    .doFinally {
        GlobalTracer.get().scopeManager().activeSpan()?.let {
            it.finish()
        }
        spanScope?.close()
    }
```
{{% /tab %}}
{{% tab "Java" %}}
```java
ThreadLocal<Scope> scopeStorage = new ThreadLocal<>();
...
remoteDataSource.getData(query)
    .subscribeOn(Schedulers.io())
    .map(data -> { // ... })
    .doOnSuccess(data -> {
        localDataSource.persistData(data);
    })
    .doOnSubscribe(disposable -> {
        final Span span = GlobalTracer.get().buildSpan("<YOUR_OP_NAME>").start();
        Scope spanScope = GlobalTracer.get().scopeManager().activate(span);
        scopeStorage.set(spanScope);
    })
    .doFinally(() -> { 
        final Span activeSpan = GlobalTracer.get().scopeManager().activeSpan();
        if (activeSpan != null) {
            activeSpan.finish();
        }
        Scope spanScope = scopeStorage.get();
        if (spanScope != null) {
            spanScope.close();
            scopeStorage.remove();
        }
    });
 ```
{{% /tab %}}
{{< /tabs >}}

## バッチコレクション

すべてのスパンは、最初にローカルデバイスにバッチで格納されます。各バッチはインテークの仕様に従います。ネットワークが利用可能で、Datadog SDK がエンドユーザーのエクスペリエンスに影響を与えないようにバッテリーの残量が十分にあれば、バッチはすぐに送信されます。アプリケーションがフォアグラウンドにあるときにネットワークが利用できない場合、またはデータのアップロードが失敗した場合、バッチは正常に送信されるまで保持されます。

つまり、ユーザーがオフラインでアプリケーションを開いても、データが失われることはありません。

ディスク上のデータは、古すぎる場合は SDK がディスク容量を使いすぎないようにするために自動的に破棄されます。

## 初期化
`Tracer` を初期化する際には、`AndroidTracer.Builder` の以下のメソッドを使用します。


| メソッド                           | 説明                                                                                                                                                                                                                         |
|----------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `setService(<SERVICE_NAME>)   `    | `service` に値を設定します。 |
| `setPartialFlushThreshold(<INT>)` |  このしきい値に達すると (特定の `<INT>` 量のクローズされたスパンが待機している)、フラッシュメカニズムがトリガーされ、保留中のクローズされたスパンがすべて処理されインテークに送られます。|
| `addTag(<KEY>, <VALUE>)`     | トレーサーが作成するスパンに追加するタグを `<KEY>:<VALUE>` のペアで設定します。 |
| `setBundleWithRumEnabled(true)`    | スパンを現在の RUM View 情報でリッチ化することを有効にするには、`true` に設定します。これにより、RUM エクスプローラーで特定の View ライフスパン中に生成されたすべてのスパンを確認することができます。 |
| `setSampleRate(<FLOAT>)`   | トレースを収集する割合を設定します (`0-100`)。 |
| `setTracingHeaderTypes(Set<TracingHeaderType>)`   | トレーサーによって挿入されるトレースヘッダースタイルを設定します。 |

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/visualization/#trace
[2]: https://github.com/DataDog/dd-sdk-android/tree/develop/features/dd-sdk-android-trace
[3]: /tracing/visualization/#spans
[4]: /account_management/api-app-keys/#client-tokens
[5]: /account_management/api-app-keys/#api-keys
[6]: https://square.github.io/okhttp/interceptors/
[7]: /real_user_monitoring/android/?tab=us
[8]: https://github.com/opentracing-contrib/java-rxjava
[9]: https://github.com/square/retrofit/tree/master/retrofit-adapters/rxjava3
[10]: /tracing/trace_collection/custom_instrumentation/android/otel
[11]: https://opentracing.io
[12]: /real_user_monitoring/error_tracking/mobile/android/?tab=us#upload-your-mapping-file