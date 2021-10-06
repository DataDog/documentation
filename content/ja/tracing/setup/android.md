---
beta: true
dependencies:
  - 'https://github.com/DataDog/dd-sdk-android/blob/master/docs/trace_collection.md'
description: Android アプリケーションからトレースを収集する。
further_reading:
  - link: 'https://github.com/DataDog/dd-sdk-android'
    tag: Github
    text: dd-sdk-android ソースコード
  - link: tracing/visualization/
    tag: ドキュメント
    text: サービス、リソース、トレースを調査する
kind: ドキュメント
title: Android トレース収集
---
[Datadog の `dd-sdk-android` クライアント側トレーシングライブラリ][2]を使用すると、Android アプリケーションから Datadog へ[トレース][1]を送信すると共に、次の機能を利用できます。

* アプリケーションでの操作用にカスタム[スパン][3]を作成する。
* 送信される各スパンに `context` およびカスタム属性を追加する。
* 自動一括ポストによってネットワークの利用を最適化する。

## セットアップ

1. `build.gradle` ファイルでライブラリを依存関係として宣言し、Gradle 依存関係を追加します。

    ```conf
    repositories {
        maven { url "https://dl.bintray.com/datadog/datadog-maven" }
    }

    dependencies {
        implementation "com.datadoghq:dd-sdk-android:x.x.x"
    }
    ```

2. アプリケーションコンテキストと [Datadog クライアントトークン][4]でライブラリを初期化します。セキュリティ上の理由から、クライアントトークンを使用する必要があります。API キーがクライアント側の Android アプリケーションの APK バイトコードで公開されてしまうため、[Datadog API キー][5]を使用して `dd-sdk-android` ライブラリを構成することはできません。クライアントトークンの設定に関する詳細は、[クライアントトークンに関するドキュメント][4]を参照してください。

    {{< tabs >}}
    {{% tab "US" %}}

```kotlin
class SampleApplication : Application() {
    override fun onCreate() {
        super.onCreate()

        val config = DatadogConfig.Builder("<クライアントトークン>", "<環境名>", "<アプリケーション_ID>")
                        .build()
        Datadog.initialize(this, config)
    }
}
```

    {{% /tab %}}
    {{% tab "EU" %}}

```kotlin
class SampleApplication : Application() {
    override fun onCreate() {
        super.onCreate()

        val config = DatadogConfig.Builder("<クライアントトークン>", "<環境名>", "<アプリケーション_ID>")
                        .useEUEndpoints()
                        .build()
        Datadog.initialize(this, config)
    }
}
```

    {{% /tab %}}
    {{< /tabs >}}

3. Android Tracer を構成して登録します。通常はアプリケーションの `onCreate()` メソッドで、一度だけ実行する必要があります。

    ```kotlin
    val tracer = AndroidTracer.Builder().build()
    GlobalTracer.registerIfAbsent(tracer)
    ```

4. (オプション) - 部分フラッシュしきい値を設定します。アプリケーションで多数のスパンを作成する場合、または逆にごく少数の場合は、SDK のワークロードを最適化できます。ライブラリは、終了したスパンの数がしきい値を超えるまでディスクへの書き込みを待機します。値が `1` の場合、各スパンが終了するとすぐに書き込まれます。

    ```kotlin
    val tracer = AndroidTracer.Builder()
        .setPartialFlushThreshold(10)
        .build()
    ```

5. 次のメソッドでカスタムスパンを開始します。

    ```kotlin
    val tracer = GlobalTracer.get()
    val span = tracer.buildSpan("<SPAN_NAME>").start()
    // Do something ...
    // ...
    // Then when the span should be closed
    span.finish()

    ```
7. スコープの使用:
   ```kotlin
   val span = tracer.buildSpan("<SPAN_NAME1>").start()
   try {
     val scope = tracer.activateSpan(span)
     scope.use {
          // Do something ...
          // ...
          // Start a new Scope
          val childSpan = tracer.buildSpan("<SPAN_NAME2>").start()          
          try {
            tracer.activateSpan(childSpan).use {
               // Do something ...
            }  
          }
          catch(e:Error){
            childSpan.error(e)
          }
          finally {
            childSpan.finish()
          }
      }
   }
   catch(e:Error){
     span.error(e)
   }
   finally {
     span.finish()
   }

   ```
8. 非同期呼び出しでスコープを使用する:
   ```kotlin
   val span = tracer.buildSpan("<SPAN_NAME1>").start()
   try{
     val scope = tracer.activateSpan(span)
     scope.use {
        // Do something ...
        doAsynWork {
          // Step 2: reactivate the Span in the worker thread
           val scopeContinuation = tracer.scopeManager().activate(span)
           scopeContinuation.use {
              // Do something ...
           }
        }
      }   
   }
   catch(e:Error){
     span.error(e)
   }
   finally{
     span.finish()
   }

   ```  
9. (オプション) フロントエンド - バックエンドなど、環境間でトレースを手動で分散する方法:

   * ステップ 1: クライアントリクエストにトレーサーコンテキストを挿入します。

   ```kotlin
   val tracer = GlobalTracer.get()
   val span = tracer.buildSpan("<SPAN_NAME>").start()
   val tracedRequestBuilder = Request.Builder()
   tracer.inject(
           span.context(),
           Format.Builtin.TEXT_MAP_INJECT,
           TextMapInject { key, value ->
               tracedRequestBuilder.addHeader(key, value)
           }
   )
    val request = tracedRequestBuilder.build()
    // Dispatch the request and finish the span after.
   ```

   * ステップ 2: サーバーコードのヘッダーからクライアントトレーサーコンテキストを抽出します。

   ```kotlin
   val extractedContext = GlobalTracer.get()
        .extract(
            Format.Builtin.TEXT_MAP_EXTRACT,
            TextMapExtract {
                request.headers()
                    .toMultimap()
                    .map { it.key to it.value.joinToString(";") }
                    .toMap()
                    .toMutableMap()
                    .iterator()
            }
        )
   val serverSpan = tracer.buildSpan("<SERVER_SPAN_NAME>").asChildOf(extractedContext).start()      

   ```

**注**: OkHttp クライアントを使用するコードベースの場合、Datadog は以下の実装を提供します。

10. (オプション) - スパンと一緒に追加のタグを指定します。

    ```kotlin
    span.setTag("http.url", url)
    ```
11. (オプション) エラー情報をスパンにアタッチします。

    スパンにエラーがあるとマークしたい場合は、公式の OpenTracing タグを使用してログに記録することでできます。

    ```kotlin
    span.log(mapOf(Fields.ERROR_OBJECT to throwable))
    ```
    ```kotlin
    span.log(mapOf(Fields.MESSAGE to errorMessage))
    ```
    AndroidTracer で次のヘルパーメソッドのいずれかを使用することもできます

    ```kotlin
    AndroidTracer.logThrowable(span, throwable)
    ```
    ```kotlin
    AndroidTracer.logErrorMessage(span, message)
    ```

## インテグレーション

手動トレースに加えて、`dd-sdk-android` ライブラリは次のインテグレーションを提供しています。

### OkHttp

OkHttp リクエストをトレースする場合は、次のようにして提供された[インターセプター][6]を追加できます。

```kotlin
val okHttpClient =  OkHttpClient.Builder()
    .addInterceptor(
        DatadogInterceptor(
            listOf("example.com", "example.eu")
        )
    )
    .build()
```

これにより、OkHttpClient によって処理される各リクエストに関するスパンが作成され (提供されたホストに一致)、関連するすべての情報 (URL、メソッド、ステータスコード、エラー) が自動的に入力され、トレース情報がバックエンドに伝播されて、Datadog 内で統合されたトレースが取得されます

インターセプターは、アプリケーションレベルでリクエストを追跡します。ネットワークレベルで `TracingInterceptor` を追加すると、さらに詳しいデータを取得（リダイレクトをフォローするなど）できます。

 ```kotlin
val tracedHosts = listOf("example.com", "example.eu")
val okHttpClient =  OkHttpClient.Builder()
    .addInterceptor(DatadogInterceptor(tracedHosts))
    .addNetworkInterceptor(TracingInterceptor(tracedHosts))
    .build()
 ```

OkHttp リクエストの実行方法 (スレッドプールを使用) のため、リクエストスパンはリクエストをトリガーしたスパンに自動的にリンクされません。次のように、`OkHttp Request.Builder` で親スパンを手動で指定することは可能です。

```kotlin
val request = Request.Builder()
              .url(requestUrl)
              .tag(Span::class.java, parentSpan)
              .build()
```

または、`dd-sdk-android-ktx` ライブラリで提供される拡張機能を使用している場合

```kotlin
val request = Request.Builder()
              .url(requestUrl)
              .parentSpan(parentSpan)
              .build()
```

**注**: 複数のインターセプターを使用する場合、これを最初に呼び出す必要があります。

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