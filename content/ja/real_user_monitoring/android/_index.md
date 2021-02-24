---
dependencies:
  - 'https://github.com/DataDog/dd-sdk-android/blob/master/docs/rum_collection.md'
kind: ドキュメント
title: Android の RUM データを収集する
---
[Datadog の `dd-sdk-android` クライアント側 RUM ライブラリ][2]を使用すると、Android アプリケーションから Datadog へ[リアルユーザーモニタリングのデータ][1]を送信すると共に、次の機能を利用できます。

* アプリのパフォーマンスおよびデモグラフィックに関する総合的なデータを把握。
* 最も遅いリソースを特定。
* OS およびデバイスタイプ別にエラーを分析。

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

2. アプリケーションコンテキストと [Datadog クライアントトークン][4]でライブラリを初期化します。セキュリティ上の理由から、クライアントトークンを使用する必要があります。API キーがクライアント側の Android アプリケーションの APK バイトコードで公開されてしまうため、[Datadog API キー][5]を使用して `dd-sdk-android` ライブラリを構成することはできません。クライアントトークンの設定に関する詳細は、[クライアントトークンに関するドキュメント][4]を参照してください。また、アプリケーション ID を提供する必要があります (see our [RUM の使用方法ページ][3]参照）。

    {{< tabs >}}
    {{% tab "US" %}}

```kotlin
class SampleApplication : Application() {
    override fun onCreate() {
        super.onCreate()

        val config = DatadogConfig.Builder("<CLIENT_TOKEN>", "<ENVIRONMENT_NAME>", "<APPLICATION_ID>")
                        .trackInteractions()
                        .useViewTrackingStrategy(strategy)
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

        val config = DatadogConfig.Builder("<CLIENT_TOKEN>", "<ENVIRONMENT_NAME>", "<APPLICATION_ID>")
                        .trackInteractions()
                        .useViewTrackingStrategy(strategy)
                        .useEUEndpoints()
                        .build()
        Datadog.initialize(this, config)
    }
}
```

    {{% /tab %}}
    {{< /tabs >}}

ご使用のアプリケーションのアーキテクチャにより、`ViewTrackingStrategy` の実装から 1 つを選択します。

  - `ActivityViewTrackingStrategy`: アプリケーションの各アクティビティが個別のビューとみなされます。
  - `FragmentViewTrackingStrategy`: アプリケーションの各フラグメントが個別のビューとみなされます。
  - `NavigationViewTrackingStrategy`: Android Jetpack Navigation ライブラリを使用している場合は、この方法をお勧めします。ナビゲーション先を個別のビューとして自動的に追跡します。
  - `MixedViewTrackingStrategy`: すべてのアクティビティまたはフラグメントが個別のビューとみなされます。この方法は、`ActivityViewTrackingStrategy` と `FragmentViewTrackingStrategy` の融合型です。

  **注**: `ActivityViewTrackingStrategy`、`FragmentViewTrackingStrategy`、`MixedViewTrackingStrategy` のいずれかを使用する場合、コンストラクターで `ComponentPredicate` の実装を提供することで、RUM View として追跡する `Fragment` または `Activity` を絞り込むことができます。

  **注**: デフォルトで、ライブラリはいずれのビューも追跡しません。ビューの追跡ストラテジーを提供しないことにした場合は、自身で `startView` および `stopView` メソッドを呼び出してビューを手動で送信する必要があります。

3. RUM Monitor を構成して登録します。通常はアプリケーションの `onCreate()` メソッドで、一度だけ実行する必要があります。

    ```kotlin
    val monitor = RumMonitor.Builder().build()
    GlobalRum.registerIfAbsent(monitor)
    ```

4. OkHttp リクエストをリソースとして追跡する場合は、次のようにして提供された[インターセプター][6]を追加できます。

    ```kotlin
    val okHttpClient =  OkHttpClient.Builder()
        .addInterceptor(DatadogInterceptor())
        .build()
    ```

    これにより、OkHttpClient によって処理される各リクエストに関する RUM Resource データが作成され、関連するすべての情報 (URL、メソッド、ステータスコード、エラー) が自動的に入力されます。ビューがアクティブな時に開始したネットワークリクエストのみが追跡されます。アプリケーションがバックグラウンドの時にリクエストを追跡するには、以下で説明するように手動でビューを作成します。

    **注**: また、複数のインターセプターを使用する場合、これを最初に呼び出す必要があります。

5. (任意) リソースでタイミング情報 (最初の 1 バイトまで、DNS 解決など) を取得するには、以下の方法で提供されている[イベント][6]リスナーを追加します。

    ```kotlin
    val okHttpClient =  OkHttpClient.Builder()
        .addInterceptor(DatadogInterceptor())
        .eventListenerFactory(DatadogEventListener.Factory())
        .build()
    ```

6. (任意) RUM イベントを手動で追跡する場合は、`GlobalRum` クラスを使用します。

  ビューを追跡するには、ビューがインタラクティブに確認できるようになったら (ライフサイクルイベントが `onResume` と同等) `RumMonitor#startView` を呼び出し、次に、ビューが確認できなくなったら (ライフサイクルイベントが `onPause` と同等)  `RumMonitor#stopView` を呼び出します。以下を参照してください。

   ```kotlin
      fun onResume(){
        GlobalRum.get().startView(viewKey, viewName, viewAttributes)
      }

      fun onPause(){
        GlobalRum.get().stopView(viewKey, viewAttributes)
      }
   ```

  リソースを追跡するには、リソースが読み込まれ始めたら `RumMonitor#startResource` を呼び出し、完全に読み込まれたら `RumMonitor#stopResource` を、リソースの読み込み中にエラーが発生したら `RumMonitor#stopResourceWithError` を呼び出します。以下を参照してください。

   ```kotlin
      fun loadResource(){
        GlobalRum.get().startResource(resourceKey, method, url, resourceAttributes)
        try {
          // do load the resource
          GlobalRum.get().stopResource(resourceKey, resourceKind, additionalAttributes)
        } catch (e : Exception) {
          GlobalRum.get().stopResourceWithError(resourceKey, message, origin, e)
        }
      }
   ```

  ユーザーアクションを追跡するには、以下のように、`RumMonitor#addAction` を呼び出します。継続的なアクションの場合は `RumMonitor#startUserAction` および `RumMonitor#stopUserAction` を呼び出します。

   ```kotlin
      fun onUserInteraction(){
        GlobalRum.get().addAction(resourceKey, method, url, resourceAttributes)
      }
   ```

## ウィジェットの追跡

通常の場合、ウィジェットは HomeScreen アプリケーションにより提供される `AppWidgetHostView` に表示されます。このコンポーネントに自動インスツルメンテーションは提供されません。ウィジェットから UI インタラクション情報を送信するには、Datadog の API を手動で呼び出します。サンプルアプリケーションで、例をご参照ください:
[ウィジェットの追跡](https://github.com/DataDog/dd-sdk-android/tree/master/sample/kotlin/src/main/kotlin/com/datadog/android/sample/widget)

## バッチコレクション

すべての RUM イベントは、最初にローカルデバイスにバッチで格納されます。各バッチはインテークの仕様に従います。ネットワークが利用可能で、Datadog SDK がエンドユーザーのエクスペリエンスに影響を与えないようにバッテリーの残量が十分にあれば、バッチはすぐに送信されます。アプリケーションがフォアグラウンドにあるときにネットワークが利用できない場合、またはデータのアップロードが失敗した場合、バッチは正常に送信されるまで保持されます。

つまり、ユーザーがオフラインでアプリケーションを開いても、データが失われることはありません。

ディスク上のデータは、古すぎる場合は SDK がディスク容量を使いすぎないようにするために自動的に破棄されます。

## 拡張

### Glide

既存のコードベースが Glide を使用している場合、[専用ライブラリ](glide_integration.md) を使用してさらにその他の情報 (RUM リソースやエラーなど) を自動的に Datadog へ転送できます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/real_user_monitoring/data_collected/
[2]: https://github.com/DataDog/dd-sdk-android
[3]: https://docs.datadoghq.com/ja/real_user_monitoring/installation/?tab=us
[4]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#client-tokens
[5]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#api-keys
[6]: https://square.github.io/okhttp/interceptors/
[7]: https://square.github.io/okhttp/events/
