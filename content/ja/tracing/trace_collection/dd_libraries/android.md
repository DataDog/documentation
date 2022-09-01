---
aliases:
- /ja/tracing/setup_overview/setup/android
- /ja/tracing/setup/android
beta: true
dependencies:
- https://github.com/DataDog/dd-sdk-android/blob/master/docs/trace_collection.md
description: Android アプリケーションからトレースを収集する。
further_reading:
- link: https://github.com/DataDog/dd-sdk-android
  tag: GitHub
  text: dd-sdk-android ソースコード
- link: tracing/visualization/
  tag: ドキュメント
  text: サービス、リソース、トレースの詳細
kind: documentation
title: Android トレース収集
---
[Datadog の `dd-sdk-android` クライアント側トレーシングライブラリ][2]を使用すると、Android アプリケーションから Datadog へ[トレース][1]を送信すると共に、次の機能を利用できます。

* アプリケーションでの操作用にカスタム[スパン][3]を作成する。
* 送信される各スパンに `context` およびカスタム属性を追加する。
* 自動一括ポストによってネットワークの利用を最適化する。

## セットアップ

1. `build.gradle` ファイルでライブラリを依存関係として宣言し、Gradle 依存関係を追加します。

```groovy
dependencies {
    implementation "com.datadoghq:dd-sdk-android:x.x.x"
}
```

3. アプリケーションコンテキストと追跡に関する同意、[Datadog クライアントトークン][4]、そして Datadog UI で新しい RUM アプリケーションを作成したときに生成されたアプリケーション ID で、ライブラリを初期化します（詳細は、[Android の RUM データを収集][7]を参照）。セキュリティ上の理由から、クライアントトークンを使用する必要があります。API キーがクライアント側の Android アプリケーションの APK バイトコードで公開されてしまうため、[Datadog API キー][5]を使用して `dd-sdk-android` ライブラリを構成することはできません。クライアントトークンの設定に関する詳細は、[クライアントトークンに関するドキュメント][4]を参照してください。

**US** 

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
class SampleApplication : Application() {
    override fun onCreate() {
      super.onCreate()
      val configuration = Configuration.Builder(
              tracesEnabled = true
      )
              .build()
      val credentials = Credentials(<CLIENT_TOKEN>, <ENV_NAME>, <APP_VARIANT_NAME>, <APPLICATION_ID>)
      Datadog.initialize(this, credentials, configuration, trackingConsent) 
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
        Configuration configuration = new Configuration.Builder(true, true, true, true).build();
        Credentials credentials = new Credentials(<CLIENT_TOKEN>, <ENV_NAME >, <APP_VARIANT_NAME>, <APPLICATION_ID>);
        Datadog.initialize(this, credentials, configuration, trackingConsent);
    }
}
```
{{% /tab %}} 
{{< /tabs >}}

**EU**

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
class SampleApplication : Application() { 
    override fun onCreate() { 
        super.onCreate()
        val configuration = Configuration.Builder(tracesEnabled = true)
                 .useSite(DatadogSite.EU1)
                 .build() 
        val credentials = Credentials(<CLIENT_TOKEN>, <ENV_NAME>, <APP_VARIANT_NAME>, <APPLICATION_ID>)
        Datadog.initialize(this, credentials, configuration, trackingConsent) 
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
        Configuration configuration = new Configuration.Builder(true, true, true, true)
                               .useSite(DatadogSite.EU1)
                               .build();
        Credentials credentials = new Credentials(<CLIENT_TOKEN>, <ENV_NAME>, <APP_VARIANT_NAME >, <APPLICATION_ID>);
        Datadog.initialize(this, credentials, configuration, trackingConsent);
    }
}
```
{{% /tab %}}
{{< /tabs >}}

GDPR 規定を遵守するため、SDK は初期化時に追跡に関する同意を求めます。
追跡の同意は以下のいずれかの値になります。
   * `TrackingConsent.PENDING`: SDK はデータの収集とバッチ処理を開始しますが、データ
     収集エンドポイントへの送信は行われません。SDK はバッチ処理が完了したデータをどうするかについての新たな同意値が得られるまで待機します。
   * `TrackingConsent.GRANTED`: SDK はデータの収集を開始し、それをデータ収集エンドポイントに送信します。
   * `TrackingConsent.NOT_GRANTED`: SDK がデータを収集することはありません。手動でログやトレース、
     RUM イベントを送信することもできません。

   SDK の初期化後に追跡に関する同意を更新する場合は、 `Datadog.setTrackingConsent(<NEW CONSENT>)` を呼び出してください。
   SDK は新しい同意に応じて動作を変更します。たとえば、現在の同意内容が `TrackingConsent.PENDING` で、それを
   * `TrackingConsent.GRANTED` に更新した場合: SDK は現在のバッチデータと将来的なデータをすべてデータ収集エンドポイントに直接送信します。
   * `TrackingConsent.NOT_GRANTED`: SDK はすべてのバッチデータを消去し、以後のデータも収集しません。

**注**: 初期化に必要な認証情報では、アプリケーションのバリアント名も必要となり、値 `BuildConfig.FLAVOR` (バリアントがない場合は空白の文字列) の使用が求められることにご注意ください。これは適切な ProGuard `mapping.txt` ファイルを有効化し、ビルド時の自動アップロードを行うために重要です。この操作により、難読化を解除された RUM エラースタックトレースを表示できるようになります。詳しくは、[Android ソースマッピングファイルのアップロードガイド][8]をご参照ください。

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

3. Android Tracer を構成して登録します。通常はアプリケーションの `onCreate()` メソッドで、一度だけ実行する必要があります。

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
val tracer = AndroidTracer.Builder().build()
GlobalTracer.registerIfAbsent(tracer)
```
{{% /tab %}} 
{{% tab "Java" %}}
```java
final AndroidTracer tracer = new AndroidTracer.Builder().build();
GlobalTracer.registerIfAbsent(tracer);
```
{{% /tab %}}
{{< /tabs >}}

4. (オプション) - 部分フラッシュしきい値を設定します。アプリケーションで多数のスパンを作成する場合、または逆にごく少数の場合は、SDK のワークロードを最適化できます。ライブラリは、終了したスパンの数がしきい値を超えるまでディスクへの書き込みを待機します。値が `1` の場合、各スパンが終了するとすぐに書き込まれます。

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
final AndroidTracer tracer = new AndroidTracer.Builder()
        .setPartialFlushThreshold(10)
        .build();
```
{{% /tab %}}
{{< /tabs >}}

5. 次のメソッドでカスタムスパンを開始します。

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
final GlobalTracer tracer = GlobalTracer.get();
final Span span = tracer.buildSpan("<SPAN_NAME>").start();
// 操作を実行 ...
// ...
// 続いて、スパンを閉じるべき時に
span.finish();
```
{{% /tab %}}
{{< /tabs >}}

6. 同期呼び出しでスコープを使用する:

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
} catch(e: Error) {
    AndroidTracer.logThrowable(span, e)
} finally {
    span.finish()
}
```
{{% /tab %}}
{{% tab "Java" %}}
```java
final Span = tracer.buildSpan("<SPAN_NAME1>").start();
try {
    final Scope scope = tracer.activateSpan(span);
    try {
        // 操作を実行 ...
        // ...
        // 新しいスコープを開始
        final Span childSpan = tracer.buildSpan("<SPAN_NAME2>").start();
        try {
            final Scope innerScope = tracer.activateSpan(childSpan);
            try {
                // 操作を実行 ...
            } finally {
                innerScope.close();
            }   
        } catch(Error e) {
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

7. 非同期呼び出しでスコープを使用する:

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
} catch(e: Error) {
    AndroidTracer.logThrowable(span, e)
} finally {
    span.finish()
}
```
{{% /tab %}}
{{% tab "Java" %}}
```java
final Span span = tracer.buildSpan("<SPAN_NAME1>").start();
try {
    final Scope scope = tracer.activateSpan(span);
    try {
        // Do something ...
        new Thread(() -> {
            // Step 2: reactivate the Span in the worker thread
            final Scope scopeContinuation = tracer.scopeManager().activate(span);
            try {
                // Do something
            } finally {
                scope.close();
            }
        }).start();
    } finally {
        scope.close();
    }
} catch (Exception e){
    AndroidTracer.logThrowable(span, e);
} finally {
    span.finish();
}
```
{{% /tab %}}
    {{< /tabs >}}

8. (任意) フロントエンド - バックエンドなど、環境間でトレースを手動で分散する:

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
final Tracer tracer = GlobalTracer.get();
final Span span = tracer.buildSpan("<SPAN_NAME>").start();
final Request.Builder tracedRequestBuilder = new Request.Builder();
tracer.inject(
        span.context(),
        Format.Builtin.TEXT_MAP_INJECT,
        new TextMapInject() {
            @Override 
            public void put(String key, String value) {
                tracedRequestBuilder.addHeader(key, value);
            }
        });
final Request request = tracedRequestBuilder.build();
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
final Tracer tracer = GlobalTracer.get();
final SpanContext extractedContext = tracer.extract(
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
final Span serverSpan = tracer.buildSpan("<SERVER_SPAN_NAME>").asChildOf(extractedContext).start();
```
   {{% /tab %}}
   {{< /tabs >}}

**注**: OkHttp クライアントを使用するコードベースの場合、Datadog は[以下の実装](#okhttp)を提供します。

9. (任意) スパンと一緒に追加のタグを指定する:

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

12. バッチ処理前にスパンのイベントで属性を変更する必要がある場合は、SDK の初期化時に `SpanEventMapper` を実装することで上記の処理を行えます。

{{< tabs >}} 
{{% tab "Kotlin" %}}
```kotlin
val config = Configuration.Builder(tracesEnabled = true, ...) 
        // ...  
        .setSpanEventMapper(spanEventMapper)
        .build()    
```
{{% /tab %}}
{{% tab "Java" %}}
```java
final Configuration config = new Configuration.Builder(true, true, true, true)
        // ...
        .setSpanEventMapper(spanEventMapper)
        .build();    
```
{{% /tab %}}
{{< /tabs >}}

## インテグレーション

手動トレースに加えて、`dd-sdk-android` ライブラリは次のインテグレーションを提供しています。

### OkHttp

OkHttp リクエストをトレースする場合は、次のようにして提供された[インターセプター][6]を追加できます。

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
val okHttpClient = OkHttpClient.Builder() 
        .addInterceptor(
            DatadogInterceptor(listOf("example.com", "example.eu"), traceSamplingRate = 20f)
        )
        .build()
```
{{% /tab %}}
{{% tab "Java" %}}
```java
float traceSamplingRate = 20f;
final OkHttpClient okHttpClient =  new OkHttpClient.Builder() 
        .addInterceptor(
                new DatadogInterceptor(Arrays.asList("example.com", "example.eu"), traceSamplingRate)
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
        .addInterceptor(DatadogInterceptor(tracedHosts, traceSamplingRate = 20f))
        .addNetworkInterceptor(TracingInterceptor(tracedHosts, traceSamplingRate = 20f))
        .build()
```
{{% /tab %}}
{{% tab "Java" %}}
```java
float traceSamplingRate = 20f;
final List<String> tracedHosts = Arrays.asList("example.com", "example.eu"); 
final OkHttpClient okHttpClient =  new OkHttpClient.Builder()
        .addInterceptor(new DatadogInterceptor(tracedHosts, traceSamplingRate))
        .addNetworkInterceptor(new TracingInterceptor(tracedHosts, traceSamplingRate))
        .build();
```
{{% /tab %}}
{{< /tabs >}}

この場合、特定のリクエストに対して上流のインターセプターが行ったトレースサンプリングの判断は、下流のインターセプターによって尊重されます。

OkHttp リクエストの実行方法 (スレッドプールを使用) のため、リクエストスパンはリクエストをトリガーしたスパンに自動的にリンクされません。次のように、`OkHttp Request.Builder` で親スパンを手動で指定することは可能です。

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
val request = Request.Builder()
        .url(requestUrl)
        .tag(Span::class.java, parentSpan)
        .build()
```
{{% /tab %}}
{{% tab "Java" %}}
```java
final Request request = new Request.Builder()
        .url(requestUrl)
        .tag(Span.class, parentSpan)
        .build();
```
{{% /tab %}}
{{< /tabs >}}

または、`dd-sdk-android-ktx` ライブラリで提供される拡張機能を使用している場合

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
final Request request = new Request.Builder()
        .url(requestUrl)
        .parentSpan(parentSpan)
        .build();
```
{{% /tab %}}
{{< /tabs >}}

**注**: 複数のインターセプターを使用する場合、これを最初に呼び出す必要があります。

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
Single.fromSupplier{} 
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
            GlobalTracer.get().scopeManager().activate(span)
        }
        .doFinally {
            GlobalTracer.get().scopeManager().activeSpan()?.let {
                it.finish()
            }
        }
```
{{% /tab %}}
{{% tab "Java" %}}
```java
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
            GlobalTracer.get().scopeManager().activate(span);
        })
        .doFinally(() -> {
            final Span activeSpan = GlobalTracer.get().scopeManager().activeSpan();
            if (activeSpan != null) {
                activeSpan.finish();
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
remoteDataSource.getData(query)
    .subscribeOn(Schedulers.io())
    .map { // ... } 
    .doOnSuccess {
        localDataSource.persistData(it)
    }
    .doOnSubscribe {
        val span = GlobalTracer.get().buildSpan("<YOUR_OP_NAME>").start()
        GlobalTracer.get().scopeManager().activate(span)
    }
    .doFinally {
        GlobalTracer.get().scopeManager().activeSpan()?.let {
            it.finish()
        }
    }
```
{{% /tab %}}
{{% tab "Java" %}}
```java
remoteDataSource.getData(query)
    .subscribeOn(Schedulers.io())
    .map(data -> { // ... })
    .doOnSuccess(data -> {
        localDataSource.persistData(data);
    })
    .doOnSubscribe(disposable -> {
        final Span span = GlobalTracer.get().buildSpan("<YOUR_OP_NAME>").start();
        GlobalTracer.get().scopeManager().activate(span);
    })
    .doFinally(() -> { 
        final Span activeSpan = GlobalTracer.get().scopeManager().activeSpan();
        if (activeSpan != null) {
            activeSpan.finish();
        }
    });
 ```
{{% /tab %}}
{{< /tabs >}}

## バッチコレクション

すべてのスパンは、最初にローカルデバイスにバッチで格納されます。各バッチはインテークの仕様に従います。ネットワークが利用可能で、Datadog SDK がエンドユーザーのエクスペリエンスに影響を与えないようにバッテリーの残量が十分にあれば、バッチはすぐに送信されます。アプリケーションがフォアグラウンドにあるときにネットワークが利用できない場合、またはデータのアップロードが失敗した場合、バッチは正常に送信されるまで保持されます。

つまり、ユーザーがオフラインでアプリケーションを開いても、データが失われることはありません。

ディスク上のデータは、古すぎる場合は SDK がディスク容量を使いすぎないようにするために自動的に破棄されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/tracing/visualization/#trace
[2]: https://github.com/DataDog/dd-sdk-android
[3]: https://docs.datadoghq.com/ja/tracing/visualization/#spans
[4]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#client-tokens
[5]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#api-keys
[6]: https://square.github.io/okhttp/interceptors/
[7]: https://docs.datadoghq.com/ja/real_user_monitoring/android/?tab=us
[8]: https://github.com/opentracing-contrib/java-rxjava
[9]: https://github.com/square/retrofit/tree/master/retrofit-adapters/rxjava3