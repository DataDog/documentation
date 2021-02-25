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

2. アプリケーションコンテキストと追跡に関する同意、[Datadog クライアントトークン][2]、そして Datadog UI で新しい RUM アプリケーションを作成したときに生成されたアプリケーション ID で、ライブラリを初期化します（詳細は、[Android の RUM データを収集][6]を参照）。セキュリティ上の理由から、クライアントトークンを使用する必要があります。API キーがクライアント側の Android アプリケーションの APK バイトコードで公開されてしまうため、[Datadog API キー][3]を使用して `dd-sdk-android` ライブラリを構成することはできません。クライアントトークンの設定に関する詳細は、[クライアントトークンに関するドキュメント][2]を参照してください。

    {{< tabs >}}
    {{% tab "US" %}}
```kotlin
class SampleApplication : Application() {
    override fun onCreate() {
        super.onCreate()

        val config = DatadogConfig.Builder("<CLIENT_TOKEN>", "<ENVIRONMENT_NAME>", "<APPLICATION_ID>")
                        .build()
        Datadog.initialize(this, trackingConsent, config)
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
                        .useEUEndpoints()
                        .build()
        Datadog.initialize(this, trackingConsent, config)
    }
}
```
    {{% /tab %}}
    {{< /tabs >}}

   GDPR 既成を遵守するために、SDK は初期化時に追跡に関する同意を求めます。
   追跡に関する同意は以下のいずれかの値で示されます。
    * `TrackingConsent.PENDING`: SDK はデータの収集とバッチ処理を開始しますが、データは送信されません
     収集エンドポイントへの送信は行われません。SDK はバッチ処理が完了したデータをどうするかについての新たな同意値が得られるまで待機します。
    * `TrackingConsent.GRANTED`: SDK はデータの収集を開始し、それをデータ収集エンドポイントに送信します。
    * `TrackingConsent.NOT_GRANTED`: SDK がデータを収集することはありません。手動でログやトレース、
     RUM イベントを送信することもできません。

    SDK の初期化後に追跡に関する同意を更新する場合は、 `Datadog.setTrackingConsent(<NEW CONSENT>)` の呼び出しを行います。
    SDK は新しい同意に応じて動作を変更します。たとえば、現在の同意内容が `TrackingConsent.PENDING` で、それを
    * `TrackingConsent.GRANTED` に更新した場合: SDK は現在のバッチデータと将来的なデータをすべてデータ収集エンドポイントに直接送信します。
    * `TrackingConsent.NOT_GRANTED`: SDK はすべてのバッチデータを消去し、以後のデータも収集しません。

   **注**: ユーティリティメソッド `isInitialized` を使用して SDK が適切に初期化されているかを確認します。

    ```kotlin
    if (Datadog.isInitialized()) {
        // your code here
    }
    ```
   アプリケーションを書く際、`setVerbosity` メソッドを呼び出すことで開発ログを有効にできます。指定したレベル以上の優先度を持つライブラリ内のすべての内部メッセージが Android の Logcat に記録されます。

    ```kotlin
    Datadog.setVerbosity(Log.INFO)
    ```

3. SDK で自動ビュー追跡を有効にするには、初期化時に追跡ストラテジーを提供する必要があります。
   ご使用のアプリケーションのアーキテクチャにより、`ViewTrackingStrategy` の実装から 1 つを選択します。

   - `ActivityViewTrackingStrategy`: アプリケーションの各アクティビティが個別のビューとみなされます。
   - `FragmentViewTrackingStrategy`: アプリケーションの各フラグメントが個別のビューとみなされます。
   - `NavigationViewTrackingStrategy`: Android Jetpack Navigation ライブラリを使用している場合は、この方法をお勧めします。ナビゲーション先を個別のビューとして自動的に追跡します。
   - `MixedViewTrackingStrategy`: すべてのアクティビティまたはフラグメントが個別のビューとみなされます。この方法は、`ActivityViewTrackingStrategy` と `FragmentViewTrackingStrategy` の融合型です。

   ```kotlin
   class SampleApplication : Application() {
       override fun onCreate() {
           super.onCreate()

          val configuration = Configuration.Builder()
                           .trackInteractions()
                           .useViewTrackingStrategy(strategy)
                           .build()

          Datadog.initialize(this, credentials, configuration, trackingConsent)
       }
   }
   ```

   **注**: `ActivityViewTrackingStrategy`、`FragmentViewTrackingStrategy`、`MixedViewTrackingStrategy` のいずれかを使用する場合、コンストラクターで `ComponentPredicate` の実装を提供することで、RUM View として追跡する `Fragment` または `Activity` を絞り込むことができます。

   **注**: デフォルトで、ライブラリはいずれのビューも追跡しません。ビューの追跡ストラテジーを提供しないことにした場合は、自身で `startView` および `stopView` メソッドを呼び出してビューを手動で送信する必要があります。


4. RUM Monitor を構成して登録します。通常はアプリケーションの `onCreate()` メソッドで、一度だけ実行する必要があります。

    ```kotlin
    val monitor = RumMonitor.Builder()
            // Optionally set a sampling between 0.0 and 100.0%
            // Here 75% of the RUM Sessions will be sent to Datadog
            .sampleRumSessions(75.0f)
            .build()
    GlobalRum.registerIfAbsent(monitor)
    ```

5. OkHttp リクエストをリソースとして追跡したい場合は、提供された[インターセプター][6]を追加してください。

    ```kotlin
    val okHttpClient =  OkHttpClient.Builder()
        .addInterceptor(DatadogInterceptor())
        .build()
    ```

    これにより、OkHttpClient によって処理される各リクエストに関する RUM Resource データが作成され、関連するすべての情報 (URL、メソッド、ステータスコード、エラー) が自動的に入力されます。ビューがアクティブな時に開始したネットワークリクエストのみが追跡されます。アプリケーションがバックグラウンドの時にリクエストを追跡するには、以下で説明するように手動でビューを作成します。

    **注**: また、複数のインターセプターを使用する場合、これを最初に呼び出す必要があります。

6. (任意) リソースでタイミング情報 (最初の 1 バイトまで、DNS 解決など) を取得するには、以下の方法で[イベント][6]リスナーファクトリを追加します。

    ```kotlin
    val okHttpClient =  OkHttpClient.Builder()
        .addInterceptor(DatadogInterceptor())
        .eventListenerFactory(DatadogEventListener.Factory())
        .build()
    ```

7. (任意) RUM イベントを手動で追跡する場合は、`GlobalRum` クラスを使用します。

  ビューを追跡するには、ビューがインタラクティブに確認できるようになったら (ライフサイクルイベントが `onResume` と同等) `RumMonitor#startView` を呼び出し、次に、ビューが確認できなくなったら (ライフサイクルイベントが `onPause` と同等)  `RumMonitor#stopView` を呼び出します。

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

  ユーザーアクションを追跡するには、以下のように、`RumMonitor#addUserAction` を呼び出します。継続的なアクションの場合は `RumMonitor#startUserAction` および `RumMonitor#stopUserAction` を呼び出します。

   ```kotlin
      fun onUserInteraction(){
        GlobalRum.get().addUserAction(resourceKey, method, url, resourceAttributes)
      }
   ```

8. (任意) すべての RUM イベントに属性としてカスタム情報を追加する場合は、`GlobalRum` クラスを使用します。

   ```kotlin
      // Adds an attribute to all future RUM events
      GlobalRum.addAttribute(key, value)

      // Removes an attribute to all future RUM events
      GlobalRum.removeAttribute(key)
   ```
8. RUM イベントで属性を変更する、またバッチ処理前にイベントを丸ごと削除する必要がある場合は、SDK の初期化時に `EventMapper<T>` を実装することで上記の処理を行えます。
   ```kotlin
      val config = DatadogConfig.Builder("<CLIENT_TOKEN>", "<ENVIRONMENT_NAME>", "<APPLICATION_ID>")
                        ...
                        .setRumErrorEventMapper(rumErrorEventMapper)
                        .setRumActionEventMapper(rumActionEventMapper)
                        .setRumResourceEventMapper(rumResourceEventMapper)
                        .setRumViewEventMapper(rumViewEventMapper)
                        .build()
   ```
   `EventMapper<T>` インターフェースを実装する場合、各イベントタイプの属性は以下のように一部のみしか変更することができません。

   | イベントタイプ    | 属性キー      | 説明                                     |
   |---------------|--------------------|-------------------------------------------------|
   | ViewEvent     | `view.referrer`      | ページの初期ビューへのリンク URL |
   |               | `view.url`           | ビューの URL                                 |
   | ActionEvent   |                    |                                                 |
   |               | `action.target.name` | ターゲット名                                     |
   | ErrorEvent    |                    |                                                 |
   |               | `error.message`      | エラーメッセージ                                   |
   |               | `error.stack`        | エラーの Stacktrace                         |
   |               | `error.resource.url` | リソース URL                             |
   | ResourceEvent |                    |                                                 |
   |               | `resource.url`       | リソース URL                             |

   **注**: `EventMapper<T>` の実装から null が返された場合、イベントは削除されます。

## 高度なロギング

### ライブラリの初期化

ライブラリを初期化するよう Datadog のコンフィギュレーションを作成する際、`DatadogConfig.Builder` の以下のメソッドを使用できます。

| メソッド                           | 説明                                                                                                                                                                                                                                                             |
|----------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `setServiceName(<サービス名>)` | Datadog に送信されるすべてのログに添付される `service` [標準属性][4] のデフォルト値として `<SERVICE_NAME>` を設定します（各ロガーで上書きすることが可能です）。                                                                                                                                                           |
| `setRumEnabled(true)`     | Datadog への RUM データ送信を有効にするには、`true` に設定します。                                                                                                                                                                                                                                  |
| `trackInteractions(Array<ViewAttributesProvider>)` | ユーザーインタラクション (タップ、スクロール、スワイプなど) の追跡を有効にします。このパラメーターを使用すると、ユーザーが操作したウィジェットに基づいて、カスタム属性を RUM アクションイベントに追加できます。 |
| `useViewTrackingStrategy(strategy)` | ビューの追跡に使用される戦略を定義します。ご使用のアプリケーションのアーキテクチャにより、`ViewTrackingStrategy` の実装から 1 つを選択するか (上記を参照)、独自のものを実装します。 |
| `addPlugin(DatadogPlugin, Feature)`   | 特定の機能 (CRASH、LOG、TRACE、RUM) についてのプラグインの実装を追加します。プラグインはこの機能の初期化に伴い登録され、機能が停止すると登録解除されます。 |

### RumMonitor の初期化

RUM データを追跡するために RumMonitor を作成する場合、`RumMonitor.Builder` の次のメソッドを使用できます。

| メソッド                           | 説明                                                                                                                                                                                                                                                             |
|----------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `sampleRumSessions(float)`   | RUM セッションのサンプリングレートを設定します。このメソッドは 0〜100 の値を想定しており、データが Datadog に送信されるセッションのパーセンテージとして使用されます。 |

### 手動追跡

イベントを手動で追跡する必要がある場合は、アクティブな `RumMonitor` インスタンスを取得し、次のいずれかのメソッドを呼び出すことで追跡できます。

| メソッド                           | 説明                                                                                                                                                                                                                                                             |
|----------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `startView(<key>, <name>, <attributes>)`   | 新しいビューが開始されたことを RumMonitor に通知します。ほとんどの場合、このメソッドは、最前面の `Activity` または `Fragment` の `onResume()` メソッドで呼び出す必要があります。 |
| `stopView(<key>, <attributes>)`   | 現在のビューが停止したことを RumMonitor に通知します。ほとんどの場合、このメソッドは、最前面の `Activity` または `Fragment` の `onPause()` メソッドで呼び出す必要があります。 |
| `addUserAction(<type>, <name>, <attributes>)`   | ユーザーアクションが発生したことを RumMonitor に通知します。 |
| `startUserAction(<type>, <name>, <attributes>)`   | 継続的なユーザーアクションが開始されたことを RumMonitor に通知します (たとえば、ユーザーがリストをスクロールする)。 |
| `stopUserAction(<type>, <name>, <attributes>)`   | 継続的なユーザーアクションが停止したことを RumMonitor に通知します。 |
| `startResource(<key>, <method>, <url>, <attributes>)`   | アプリケーションが指定された URL で指定されたメソッド (例: `GET` または `POST`) を使用してリソースのロードを開始したことを RumMonitor に通知します。 |
| `stopResource(<key>, <status>, <size>, <kind> <attributes>)`   | 特定のステータス (通常は HTTP ステータスコード)、サイズ (バイト単位)、および種類を使用して、リソースのロードが終了したことを RumMonitor に通知します。 |
| `stopResourceWithError(<key>, <status>, <message>, <source>, <throwable>)` | 例外のため、リソースのロードを終了できなかったことを RumMonitor に通知します。 |
| `addError(<message>, <source>, <throwable>, <attributes>)` | エラーが発生したことを RumMonitor に通知します。 |



### ウィジェットの追跡

通常の場合、ウィジェットは HomeScreen アプリケーションにより提供される `AppWidgetHostView` に表示されます。このコンポーネントに自動インスツルメンテーションは提供されません。ウィジェットから UI インタラクション情報を送信するには、Datadog の API を手動で呼び出します。サンプルアプリケーションで、例をご参照ください: 
[ウィジェットの追跡](https://github.com/DataDog/dd-sdk-android/tree/master/sample/kotlin/src/main/kotlin/com/datadog/android/sample/widget)

## バッチコレクション

すべての RUM イベントは、最初にローカルデバイスにバッチで格納されます。各バッチはインテークの仕様に従います。ネットワークが利用可能で、Datadog SDK がエンドユーザーのエクスペリエンスに影響を与えないようにバッテリーの残量が十分にあれば、バッチはすぐに送信されます。アプリケーションがフォアグラウンドにあるときにネットワークが利用できない場合、またはデータのアップロードが失敗した場合、バッチは正常に送信されるまで保持されます。

つまり、ユーザーがオフラインでアプリケーションを開いても、データが失われることはありません。

ディスク上のデータは、古すぎる場合は SDK がディスク容量を使いすぎないようにするために自動的に破棄されます。

## 拡張

### Coil

Coil を使用してアプリケーションに画像を読み込む場合は、Datadog の[専用ライブラリ](https://github.com/DataDog/dd-sdk-android/tree/master/dd-sdk-android-coil)をご覧ください。

### Fresco

Fresco を使用してアプリケーションに画像を読み込む場合は、Datadog の[専用ライブラリ](https://github.com/DataDog/dd-sdk-android/tree/master/dd-sdk-android-fresco)をご覧ください。

### Glide

Glide を使用してアプリケーションに画像を読み込む場合は、Datadog の[専用ライブラリ](https://github.com/DataDog/dd-sdk-android/tree/master/dd-sdk-android-glide)をご覧ください。

### Picasso

Picasso を使用している場合は、`OkHttpClient` を使用するようにすると、Picasso によって行われたネットワークリクエストに関する RUM および APM 情報を取得できます。

```kotlin
        val picasso = Picasso.Builder(context)
                .downloader(OkHttp3Downloader(okHttpClient))
                // …
                .build()
        Picasso.setSingletonInstance(picasso)
```

### Retrofit

Retrofit を使用している場合は、`OkHttpClient` を使用するようにすると、Retrofit によって行われたネットワークリクエストに関する RUM および APM 情報を取得できます。

```kotlin
        val retrofitClient = Retrofit.Builder()
                .client(okHttpClient)
                // …
                .build()
```

### SQLDelight

SQLDelight を使用している場合は、Datadog の[専用ライブラリ](https://github.com/DataDog/dd-sdk-android/tree/master/dd-sdk-android-sqldelight)をご覧ください。

### SQLite

SQLiteOpenHelper の[生成された API ドキュメント][8]に従って、コンストラクターで DatabaseErrorHandler -> `DatadogDatabaseErrorHandler` の実装を指定するだけで済みます。

これを行うと、データベースが破損している場合は常に検出され、関連する RUM エラーイベントが送信されます。

```kotlint
   class <YourOwnSqliteOpenHelper>: SqliteOpenHelper(<Context>, 
                                                     <DATABASE_NAME>, 
                                                     <CursorFactory>, 
                                                     <DATABASE_VERSION>, 
                                                     DatadogDatabaseErrorHandler()) {
                                // …

   }
```

### Apollo (GraphQL)

Apollo を使用している場合は、`OkHttpClient` を使用するようにすると、Apollo クライアントを介して実行されたすべてのクエリに関する RUM および APM 情報を取得できます。

```kotlin
        val apolloClient =  ApolloClient.builder()
                 .okHttpClient(okHttpClient)
                 .serverUrl(<APOLLO_SERVER_URL>)
                 .build()
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/real_user_monitoring/data_collected/
[2]: https://github.com/DataDog/dd-sdk-android
[3]: https://docs.datadoghq.com/ja/real_user_monitoring/installation/?tab=us
[4]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#client-tokens
[5]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#api-keys
[6]: https://square.github.io/okhttp/interceptors/
[7]: https://square.github.io/okhttp/events/
[8]: https://developer.android.com/reference/android/database/sqlite/SQLiteOpenHelper