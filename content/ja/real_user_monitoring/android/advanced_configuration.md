---
dependencies:
  - https://github.com/DataDog/dd-sdk-android/blob/master/docs/configure_rum_android_sdk.md
further_reading:
  - link: https://github.com/DataDog/dd-sdk-android
    tag: Github
    text: dd-sdk-android ソースコード
  - link: /real_user_monitoring
    tag: ホームページ
    text: Datadog RUM を探索する
kind: documentation
title: RUM Android の高度なコンフィギュレーション
---
まだ SDK をインストールしていない場合は、[アプリ内セットアップ手順][1]に従うか、[Android RUM セットアップドキュメント][2]を参照してください。


## ユーザーセッションの充実

Android RUM は、ユーザーアクティビティ、画面、エラー、ネットワークリクエストなどの属性を自動的に追跡します。RUM イベントおよびデフォルト属性については、[RUM データ収集ドキュメント][3]をご参照ください。カスタムイベントを追跡することで、ユーザーセッション情報を充実させ、収集された属性をより細かく制御することが可能になります。

### カスタムビュー

[ビューを自動追跡する][4]ほかに、特定のさまざまなビュー（アクティビティ、フラグメントなど）が `onResume()` ライフサイクルでインタラクティブに確認できるようになったら自動追跡することも可能です。ビューが確認できなくなったら追跡を停止します。ほとんどの場合、このメソッドは、最前面の `Activity` または `Fragment` で呼び出す必要があります。


   ```kotlin
      fun onResume() {
        GlobalRum.get().startView(viewKey, viewName, viewAttributes)        
      }

      fun onPause() {
        GlobalRum.get().stopView(viewKey, viewAttributes)        
      }
   ```

### 独自のパフォーマンスタイミングを追加

RUM のデフォルト属性に加えて、`addTiming` API を使用して、アプリケーションが時間を費やしている場所を測定できます。タイミング測定は、現在の RUM ビューの開始を基準にしています。たとえば、ヒーロー画像が表示されるまでにかかる時間を計ることができます。

   ```kotlin
       fun onHeroImageLoaded() {
           GlobalRum.get().addTiming("hero_image")
       } 
   ```

タイミングが送信されると、タイミングには `@view.custom_timings.<timing_name>` としてアクセスできるようになります (例: `@view.custom_timings.hero_image`)。RUM 分析またはダッシュボードでグラフ化する前に、[メジャーを作成](https://docs.datadoghq.com/real_user_monitoring/explorer/?tab=measures#setup-facets-and-measures)する必要があります。

### カスタムアクション

[アクションを自動追跡する][5]ほかに、`RumMonitor#addUserAction` で特定のカスタムユーザーアクション（タップ、クリック、スクロールなど）を追跡することも可能です。継続的なアクションの追跡（リストをスクロールするユーザーの追跡）には、`RumMonitor#startUserAction` および `RumMonitor#stopUserAction` を使用します。

   ```kotlin
      fun onUserInteraction() {
        GlobalRum.get().addUserAction(resourceKey, method, url, resourceAttributes)
      }
   ```

### カスタムリソース

[リソースを自動追跡する][6]ほかに、メソッド（`GET`、`POST` など）を使用して、`RumMonitor#startResource` でリソースを読み込みながら特定のカスタムリソース（ネットワークリクエスト、サードパーティプロバイダ API など）を追跡することも可能です。完全に読み込まれたら `RumMonitor#stopResource` で追跡を停止し、リソースの読み込み中にエラーが発生した場合は `RumMonitor#stopResourceWithError` で停止します。


   ```kotlin
      fun loadResource() {
        GlobalRum.get().startResource(resourceKey, method, url, resourceAttributes)
        try {
          // リソースをロードします
          GlobalRum.get().stopResource(resourceKey, resourceKind, additionalAttributes)
        } catch (e: Exception) {
          GlobalRum.get().stopResourceWithError(resourceKey, message, origin, e)
        }
      }
   ```

### カスタムエラー

特定のエラーを追跡するには、エラーが発生したときにメッセージ、ソース、例外、追加属性でモニターに通知します。[エラー属性ドキュメント][9]をご参照ください。


   ```kotlin
      GlobalRum.get().addError(message, source, throwable, attributes)
   ```


## カスタムグローバル属性の追跡

モバイル SDK により自動的に取得される[デフォルトの RUM 属性][3]に加えて、カスタム属性などのコンテキスト情報を RUM イベントに追加し、Datadog 内の可観測性を強化することも可能です。カスタム属性により、コードレベルの情報（バックエンドサービス、セッションタイムライン、エラーログ、ネットワークの状態など）を利用して、観察されたユーザー行動（カート内の金額、マーチャントティア、広告キャンペーンなど）を分類することができます。

### ユーザーセッションの追跡
RUM セッションにユーザー情報を追加すると、次のことが簡単になります。
* 特定のユーザーのジャーニーをたどる
* エラーの影響を最も受けているユーザーを把握する
* 最も重要なユーザーのパフォーマンスを監視する

{{< img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt="RUM UI のユーザー API"  >}}

以下の属性は**任意**で、**少なくとも 1 つ**提供する必要があります。

| 属性  | タイプ | 説明                                                                                              |
|------------|------|----------------------------------------------------------------------------------------------------|
| usr.id    | 文字列 | 一意のユーザー識別子。                                                                                  |
| usr.name  | 文字列 | RUM UI にデフォルトで表示されるユーザーフレンドリーな名前。                                                  |
| usr.email | 文字列 | ユーザー名が存在しない場合に RUM UI に表示されるユーザーのメール。Gravatar をフェッチするためにも使用されます。 |

ユーザーセッションを識別するには、`setUser` API を使用します。例:

```kotlin
Datadog.setUserInfo('1234', 'John Doe', 'john@doe.com')
```

### 属性の追跡

   ```kotlin
      // 今後のすべての RUM イベントに属性を追加
      GlobalRum.addAttribute(key, value)

      // 今後のすべての RUM イベントから属性を削除
      GlobalRum.removeAttribute(key)
   ```

## ウィジェットの追跡

ウィジェットは、SDK で自動的に追跡されません。ウィジェットから手動で UI インタラクションを送信するには、Datadog API を呼び出します。[例をご参照ください][7]。


## 初期化パラメーター

ライブラリを初期化するよう Datadog のコンフィギュレーションを作成する際、`Configuration.Builder` で以下のメソッドを使用できます。

`trackInteractions(Array<ViewAttributesProvider>)` 
: ユーザーインタラクション (タップ、スクロール、スワイプなど) の追跡を有効にします。このパラメーターを使用すると、ユーザーが操作したウィジェットに基づいて、カスタム属性を RUM アクションイベントに追加できます。

`useViewTrackingStrategy(strategy)` 
: ビューの追跡に使用される戦略を定義します。ご使用のアプリケーションのアーキテクチャにより、[`ViewTrackingStrategy`][4] の実装から 1 つを選択するか、独自のものを実装します。

`addPlugin(DatadogPlugin, Feature)`
: 特定の機能 (`CRASH`、`LOG`、`TRACE`、`RUM`) についてのプラグインの実装を追加します。プラグインはこの機能の初期化に伴い登録され、機能が停止すると登録解除されます。

`trackLongTasks(durationThreshold)` 
: メインスレッドで `durationThreshold` より時間がかかっているタスクを Datadog でロングタスクとして追跡できます。

`setFirstPartyHosts()` 
: トレースが有効で、`first-party` のカテゴリーに入る RUM リソースを持つホストを定義します。

`useEUEndpoints()` 
: ターゲットデータを EU エンドポイントに変更します。

`useUSEndpoints()` 
: ターゲットデータを US エンドポイントに変更します。

`useGovEndpoints()` 
: ターゲットデータを US1-FED エンドポイントに変更します。

`setBatchSize([SMALL|MEDIUM|LARGE])` 
: Datadog に送信されるリクエストの個別のバッチサイズを定義します。

`setUploadFrequency([FREQUENT|AVERAGE|RARE])` 
: Datadog エンドポイントに対し作成されたリクエストの頻度を定義します（リクエストがある場合）。

`sampleRumSessions(<samplingRate>)` 
: RUM セッションのサンプリングレートを設定します（0 の値は RUM イベントの送信がなかったことを示し、100 の値はすべてのセッションが維持されたことを示します）。

`setRumXxxEventMapper()` 
: ビュー、アクション、リソース、エラーのデータスクラビングコールバックを設定します。


### ビューの自動追跡

ビュー（アクティビティ、フラグメントなど）を自動追跡するには、初期化時に追跡ストラテジーを提供する必要があります。ご使用のアプリケーションのアーキテクチャにより、以下のストラテジーから 1 つ選択します。

`ActivityViewTrackingStrategy`
: アプリケーションの各アクティビティが個別のビューとみなされます。

`FragmentViewTrackingStrategy`
: アプリケーションの各フラグメントが個別のビューとみなされます。

`MixedViewTrackingStrategy` 
: すべてのアクティビティまたはフラグメントが個別のビューとみなされます。

`NavigationViewTrackingStrategy`
: Android Jetpack Navigation ライブラリのユーザーに推奨。各ナビゲーション先が個別のビューとしみなされます。


たとえば、各フラグメントを個別のビューとして設定するには、[セットアップ][1]で以下のコンフィギュレーションを使用します。

```kotlin
val configuration = Configuration.Builder(rumEnabled = true, ...)
                 .useViewTrackingStrategy(FragmentViewTrackingStrategy(...))
                 .build()
```

**ヒント**: `ActivityViewTrackingStrategy`、`FragmentViewTrackingStrategy`、`MixedViewTrackingStrategy` のいずれかを使用する場合、コンストラクターで `ComponentPredicate` の実装を提供することで、RUM View として追跡する `Fragment` または `Activity` を絞り込むことができます。

**注**: デフォルトで、ライブラリはいずれのビューも追跡しません。ビューの追跡ストラテジーを提供しないことにした場合は、自身で `startView` および `stopView` メソッドを呼び出してビューを手動で送信する必要があります。


### ネットワークリクエストの自動追跡

リソース（サードパーティプロバイダー、ネットワークリクエスト）で、最初の 1 バイトまで、またはDNS 解決などのタイミング情報を取得するには、`okHttpClient` をカスタマイズして[EventListener][8] ファクトリを追加します。

```kotlin
val okHttpClient = OkHttpClient.Builder()
    .addInterceptor(DatadogInterceptor())
    .eventListenerFactory(DatadogEventListener.Factory())
    .build()
```

### ロングタスクの自動追跡

メインスレッドで長時間実行されるオペレーションは、アプリケーションの視覚的パフォーマンスとリアクティビティに影響を与えることがあります。このようなオペレーションを追跡するには、タスクを長すぎるとみなすための閾値を定義します。


```kotlin
val config = Configuration.Builder(rumEnabled = true, ...)
                    .trackLongTasks(durationThreshold)
                    .build()
```

## RUM イベントの変更または削除

一括処理前に、RUM イベントの一部の属性を変更または一部のイベント全体を削除したりするには、SDK を初期化する際に `EventMapper<T>` を実装します。

```kotlin
val config = Configuration.Builder(rumEnabled = true, ...)
              ...
              .setRumErrorEventMapper(rumErrorEventMapper)
              .setRumActionEventMapper(rumActionEventMapper)
              .setRumResourceEventMapper(rumResourceEventMapper)
              .setRumViewEventMapper(rumViewEventMapper)
              .setRumLongTaskEventMapper(rumLongTaskEventMapper)
              .build()
```
   `EventMapper<T>` インターフェースを実装する場合、各イベントタイプの属性は以下のように一部のみしか変更することができません。

   | イベントタイプ    | 属性キー      | 説明                                     |
   |---------------|--------------------|-------------------------------------------------|
   | ViewEvent     | `view.referrer`      | ページの初期ビューへのリンク URL |
   |               | `view.url`           | ビューの URL                                 |
   |               | `view.name`           | ビューの名前                                |
   | ActionEvent   |                    |                                                 |
   |               | `action.target.name` | ターゲット名                                     |
   |               | `view.referrer`      | ページの初期ビューへのリンク URL |
   |               | `view.url`           | ビューの URL                                 |
   |               | `view.name`           | ビューの名前                               |
   | ErrorEvent    |                      |                                                 |
   |               | `error.message`      | エラーメッセージ                                   |
   |               | `error.stack`        | エラーのスタックトレース                         |
   |               | `error.resource.url` | リソースの URL                             |
   |               | `view.referrer`      | ページの初期ビューへのリンク URL |
   |               | `view.url`           | ビューの URL                                 |
   |               | `view.name`           | ビューの名前                                |
   | ResourceEvent |                    |                                                 |
   |               | `resource.url`       | リソースの URL                             |
   |               | `view.referrer`      | ページの初期ビューへのリンク URL |
   |               | `view.url`           | ビューの URL                                 |
   |               | `view.name`           | ビューの名前                                |
   | LongTaskEvent |                    |                                                 |
   |               | `view.referrer`       | ページの初期ビューへのリンク URL |
   |               | `view.url`            | ビューの URL                                 |
   |               | `view.name`           | ビューの名前                                |

   **注**: `EventMapper<T>` の実装から null が返された場合、イベントは削除されます。

   ## その他の参照先

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: /ja/real_user_monitoring/android
[3]: /ja/real_user_monitoring/android/data_collected
[4]: /ja/real_user_monitoring/android/advanced_configuration/#automatically-track-views
[5]: /ja/real_user_monitoring/android/advanced_configuration/#initialization-parameters
[6]: /ja/real_user_monitoring/android/advanced_configuration/#automatically-track-network-requests
[7]: https://github.com/DataDog/dd-sdk-android/tree/master/sample/kotlin/src/main/kotlin/com/datadog/android/sample/widget
[8]: https://square.github.io/okhttp/events/
[9]: /ja/real_user_monitoring/android/data_collected/?tab=error#event-specific-attributes