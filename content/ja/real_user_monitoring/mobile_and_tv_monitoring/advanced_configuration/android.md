---
title: RUM Android Advanced Configuration
code_lang: android
type: multi-code-lang
code_lang_weight: 10
aliases:
    - /real_user_monitoring/android/advanced_configuration/
further_reading:
- link: "https://github.com/DataDog/dd-sdk-android"
  tag: ソースコード
  text: Source code for dd-sdk-android
- link: /real_user_monitoring
  tag: Documentation
  text: Explore Datadog RUM
---
## 概要

まだ SDK をインストールしていない場合は、[アプリ内セットアップ手順][1]に従うか、[Android RUM セットアップドキュメント][2]を参照してください。

## ユーザーセッションの充実

Android RUM は、ユーザーアクティビティ、画面、エラー、ネットワークリクエストなどの属性を自動的に追跡します。RUM イベントおよびデフォルト属性については、[RUM データ収集ドキュメント][3]をご参照ください。カスタムイベントを追跡することで、ユーザーセッション情報を充実させ、収集された属性をより細かく制御することが可能になります。

### カスタムビュー

[ビューを自動追跡する][4]ほかに、特定のさまざまなビュー（アクティビティやフラグメントなど）が `onResume()` ライフサイクルでインタラクティブに確認できるようになったら自動追跡することも可能です。ビューが確認できなくなったら追跡を停止します。ほとんどの場合、このメソッドは、最前面の `Activity` または `Fragment` で呼び出す必要があります。


{{< tabs >}}
{{% tab "Kotlin" %}}
   ```kotlin
       fun onResume() {
         GlobalRumMonitor.get().startView(viewKey, viewName, viewAttributes)
       }

       fun onPause() {
         GlobalRumMonitor.get().stopView(viewKey, viewAttributes)
       }
   ```
{{% /tab %}}
{{% tab "Java" %}}
   ```java
       public void onResume() {
            GlobalRumMonitor.get().startView(viewKey, viewName, viewAttributes);
       }

       public void onPause() {
            GlobalRumMonitor.get().stopView(viewKey, viewAttributes);
       }
   ```
{{% /tab %}}
{{< /tabs >}}

### 独自のパフォーマンスタイミングを追加

RUM のデフォルト属性に加えて、`addTiming` API を使用して、アプリケーションが時間を費やしている場所を測定できます。タイミング測定は、現在の RUM ビューの開始を基準にしています。たとえば、ヒーロー画像が表示されるまでにかかる時間を計ることができます。
{{< tabs >}}
{{% tab "Kotlin" %}}
   ```kotlin
      fun onHeroImageLoaded() {
            GlobalRumMonitor.get().addTiming("hero_image")
      } 
   ```
{{% /tab %}}
{{% tab "Java" %}}
   ```java
       public void onHeroImageLoaded() {
            GlobalRumMonitor.get().addTiming("hero_image");
       }
   ```
{{% /tab %}}
{{< /tabs >}}

タイミングが送信されると、タイミングは `@view.custom_timings.<timing_name>` としてアクセス可能になります (例: `@view.custom_timings.hero_image`)。RUM 分析またはダッシュボードでグラフを作成する前に、[メジャーを作成][10]する必要があります。

### カスタムアクション

[アクションを自動追跡する][5]ほかに、`RumMonitor#addAction` で特定のカスタムユーザーアクション (タップ、クリック、スクロールなど) を追跡することも可能です。継続的なアクションの追跡 (リストをスクロールするユーザーの追跡) には、`RumMonitor#startAction` および `RumMonitor#stopAction` を使用します。

アクションタイプは、"カスタム"、"クリック"、"タップ"、"スクロール"、"スワイプ"、"戻る" のいずれかを指定する必要があることに注意してください。

{{< tabs >}}
{{% tab "Kotlin" %}}
   ```kotlin
       fun onUserInteraction() { 
            GlobalRumMonitor.get().addAction(actionType, name, actionAttributes)
       }
   ```
{{% /tab %}}
{{% tab "Java" %}}
   ```java
       public void onUserInteraction() {
            GlobalRumMonitor.get().addAction(actionType, name, actionAttributes);
       }
   ```
{{% /tab %}}
{{< /tabs >}}

### リソースの強化

[リソースを自動的に追跡する][6]場合、追跡する各ネットワークリクエストにカスタム属性を追加するために、カスタムの `RumResourceAttributesProvider` インスタンスを提供します。例えば、ネットワークリクエストのヘッダを追跡したい場合は、以下のような実装を作成し、`DatadogInterceptor` のコンストラクタに渡します。

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
class CustomRumResourceAttributesProvider : RumResourceAttributesProvider {
    override fun onProvideAttributes(
        request: Request,
        response: Response?,
        throwable: Throwable?
    ): Map<String, Any?> {
        val headers = request.headers
        return headers.names().associate {
            "headers.${it.lowercase(Locale.US)}" to headers.values(it).first()
        }
    }
}
```
{{% /tab %}}
{{% tab "Java" %}}
```java
public class CustomRumResourceAttributesProvider implements RumResourceAttributesProvider {
    @NonNull
    @Override
    public Map<String, Object> onProvideAttributes(
            @NonNull Request request,
            @Nullable Response response,
            @Nullable Throwable throwable
    ) {
        Map<String, Object> result = new HashMap<>();
        Headers headers = request.headers();

        for (String key : headers.names()) {
            String attrName = "headers." + key.toLowerCase(Locale.US);
            result.put(attrName, headers.values(key).get(0));
        }

        return result;
    }
}
```
{{% /tab %}}
{{< /tabs >}}

### カスタムリソース

[リソースを自動追跡する][6]ほかに、メソッド（`GET` や `POST` など）を使用して、`RumMonitor#startResource` でリソースを読み込みながら特定のカスタムリソース（ネットワークリクエストやサードパーティプロバイダ API など）を追跡することも可能です。完全に読み込まれたら `RumMonitor#stopResource` で追跡を停止し、リソースの読み込み中にエラーが発生した場合は `RumMonitor#stopResourceWithError` で停止します。

{{< tabs >}} 
{{% tab "Kotlin" %}}
   ```kotlin
       fun loadResource() {
            GlobalRumMonitor.get().startResource(resourceKey, method, url, resourceAttributes)
            try {
              // リソースをロードします
              GlobalRumMonitor.get().stopResource(resourceKey, resourceKind, additionalAttributes)
            } catch (e: Exception) {
              GlobalRumMonitor.get().stopResourceWithError(resourceKey, message, origin, e)
            } 
       }
   ```
{{% /tab %}}
{{% tab "Java" %}}
   ```java
       public void loadResource() {
            GlobalRumMonitor.get().startResource(resourceKey, method, url, resourceAttributes);
            try {
                // リソースをロードします
                GlobalRumMonitor.get().stopResource(resourceKey, resourceKind, additionalAttributes);
            } catch (Exception e) {
                GlobalRumMonitor.get().stopResourceWithError(resourceKey, message, origin, e);
            }
       }
   ```
{{% /tab %}}
{{< /tabs >}}

### カスタムエラー

特定のエラーを追跡するには、エラーが発生したときにメッセージ、ソース、例外、追加属性でモニターに通知します。[エラー属性ドキュメント][9]をご参照ください。

   ```kotlin
      GlobalRumMonitor.get().addError(message, source, throwable, attributes)
   ```

## カスタムグローバル属性の追跡

RUM Android SDK により自動的に取得される[デフォルトの RUM 属性][3]に加えて、カスタム属性などのコンテキスト情報を RUM イベントに追加し、Datadog 内の可観測性を強化することも可能です。カスタム属性により、コードレベルの情報（バックエンドサービス、セッションタイムライン、エラーログ、ネットワークの状態など）を利用して、観察されたユーザー行動（カート内の金額、マーチャントティア、広告キャンペーンなど）を分類することができます。

### ユーザーセッションの追跡

RUM セッションにユーザー情報を追加すると、次のことが簡単になります。
* 特定のユーザーのジャーニーをたどる
* エラーの影響を最も受けているユーザーを把握する
* 最も重要なユーザーのパフォーマンスを監視する

{{< img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt="RUM UI のユーザー API" >}}

以下の属性は**任意**で、**少なくとも 1 つ**提供する必要があります。

| 属性  | タイプ | 説明                                                                                              |
|------------|------|----------------------------------------------------------------------------------------------------|
| usr.id    | 文字列 | 一意のユーザー識別子。                                                                                  |
| usr.name  | 文字列 | RUM UI にデフォルトで表示されるユーザーフレンドリーな名前。                                                  |
| usr.email | 文字列 | ユーザー名が存在しない場合に RUM UI に表示されるユーザーのメール。Gravatar をフェッチするためにも使用されます。 |

ユーザーセッションを識別するには、`setUserInfo` API を使用します。例:

```kotlin
Datadog.setUserInfo('1234', 'John Doe', 'john@doe.com')
```

### 属性の追跡

```kotlin
    // Adds an attribute to all future RUM events
    GlobalRumMonitor.get().addAttribute(key, value)

    // Removes an attribute to all future RUM events
    GlobalRumMonitor.get().removeAttribute(key)
```

## ウィジェットの追跡

ウィジェットは、SDK で自動的に追跡されません。ウィジェットから手動で UI インタラクションを送信するには、Datadog API を呼び出します。[例をご参照ください][7]。


## 初期化パラメーター

ライブラリを初期化するよう Datadog のコンフィギュレーションを作成する際、`Configuration.Builder` で以下のメソッドを使用できます。

`setFirstPartyHosts()` 
: Defines hosts that have tracing enabled and have RUM resources categorized as `first-party`. **Note**: If you define custom tracing header types in the Datadog configuration and are using a tracer registered with `GlobalTracer`, make sure the same tracing header types are set for the tracer in use.

`useSite(DatadogSite)` 
: ターゲットデータを EU1、US1、US3、US5、US1_FED、および AP1 のサイトに切り替えます。

RUM を有効にするよう RUM 構成を作成する際、`RumConfiguration.Builder` で以下のメソッドを使用できます。

`trackUserInteractions(Array<ViewAttributesProvider>)` 
: ユーザーインタラクション (タップ、スクロール、スワイプなど) の追跡を有効にします。このパラメーターを使用すると、ユーザーが操作したウィジェットに基づいて、カスタム属性を RUM アクションイベントに追加できます。

`useViewTrackingStrategy(strategy)` 
: ビューの追跡に使用される戦略を定義します。ご使用のアプリケーションのアーキテクチャにより、[`ViewTrackingStrategy`][4] の実装から 1 つを選択するか、独自のものを実装します。

`trackLongTasks(durationThreshold)` 
: メインスレッドで `durationThreshold` より時間がかかっているタスクを Datadog でロングタスクとして追跡できます。

`setBatchSize([SMALL|MEDIUM|LARGE])` 
: Datadog に送信されるリクエストの個別のバッチサイズを定義します。

`setUploadFrequency([FREQUENT|AVERAGE|RARE])` 
: Datadog エンドポイントに対し作成されたリクエストの頻度を定義します (リクエストがある場合)。

`setVitalsUpdateFrequency([FREQUENT|AVERAGE|RARE|NEVER])` 
: モバイルバイタルを収集するための好ましい頻度を設定します。

`setSessionSampleRate(<sampleRate>)` 
: RUM セッションのサンプルレートを設定します (0 の値は RUM イベントが送信されないことを意味し、100 の値はすべてのセッションが保持されることを意味します)。

`setXxxEventMapper()` 
: ビュー、アクション、リソース、エラーのデータスクラビングコールバックを設定します。


### ビューの自動追跡

ビュー (アクティビティやフラグメントなど) を自動追跡するには、初期化時に追跡ストラテジーを提供する必要があります。ご使用のアプリケーションのアーキテクチャにより、以下のストラテジーから 1 つ選択します。

`ActivityViewTrackingStrategy`
: アプリケーションの各アクティビティが個別のビューとみなされます。

`FragmentViewTrackingStrategy`
: アプリケーションの各フラグメントが個別のビューとみなされます。

`MixedViewTrackingStrategy` 
: すべてのアクティビティまたはフラグメントが個別のビューとみなされます。

`NavigationViewTrackingStrategy`
: Android Jetpack Navigation ライブラリのユーザーに推奨。各ナビゲーション先が個別のビューとみなされます。


たとえば、各フラグメントを個別のビューとして設定するには、[セットアップ][1]で以下の構成を使用します。

{{< tabs >}}
{{% tab "Kotlin" %}}
   ```kotlin
       val rumConfig = RumConfiguration.Builder(applicationId)
        .useViewTrackingStrategy(FragmentViewTrackingStrategy(...))
        .build()
   ```
{{% /tab %}}
{{% tab "Java" %}}
   ```java
       RumConfiguration rumConfig = new RumConfiguration.Builder(applicationId)
        .useViewTrackingStrategy(new FragmentViewTrackingStrategy(...))
        .build();
   ```
{{% /tab %}}
{{< /tabs >}}


`ActivityViewTrackingStrategy`、`FragmentViewTrackingStrategy`、`MixedViewTrackingStrategy` のいずれかを使用する場合、コンストラクターで `ComponentPredicate` の実装を提供することで、RUM View として追跡する `Fragment` または `Activity` を絞り込むことができます。

{{< tabs >}}
{{% tab "Kotlin" %}}
   ```kotlin
       val rumConfig = RumConfiguration.Builder(applicationId)
        .useViewTrackingStrategy(
        ActivityViewTrackingStrategy(
            trackExtras = true,
            componentPredicate = object : ComponentPredicate<Activity> {
                override fun accept(component: Activity): Boolean {
                    return true
                }

                override fun getViewName(component: Activity): String? = null
            })
        )
        .build()  
   ```
{{% /tab %}}
{{% tab "Java" %}}
   ```java
        RumConfiguration rumConfig = new RumConfiguration.Builder(applicationId)
            .useViewTrackingStrategy(new ActivityViewTrackingStrategy(
                true,
                new ComponentPredicate<Activity>() {
                    @Override
                    public boolean accept(Activity component) {
                        return true;
                    }

                    @Override
                    public String getViewName(Activity component) {
                        return null;
                    }
                }
            ))
            .build();
   ```
{{% /tab %}}
{{< /tabs >}}


**注**: デフォルトで、ライブラリは `ActivityViewTrackingStrategy` を使用しています。ビューの追跡ストラテジーを提供しないことにした場合は、自身で `startView` および `stopView` メソッドを呼び出してビューを手動で送信する必要があります。


### ネットワークリクエストの自動追跡

リソース (サードパーティプロバイダー、ネットワークリクエストなど) で、最初の 1 バイトまで、または DNS 解決などのタイミング情報を取得するには、`OkHttpClient` をカスタマイズして [EventListener][8] ファクトリーを追加します。

1. モジュールレベルの `build.gradle` ファイルで、`dd-sdk-android-okhttp` ライブラリに Gradle 依存関係を追加します。

    ```groovy
    dependencies {
        implementation "com.datadoghq:dd-sdk-android-okhttp:x.x.x"
    }
    ```

2. [EventListener][8] ファクトリーの追加

{{< tabs >}}
{{% tab "Kotlin" %}}
   ```kotlin
       val okHttpClient = OkHttpClient.Builder()
        .addInterceptor(DatadogInterceptor())
        .eventListenerFactory(DatadogEventListener.Factory())
        .build()
   ```
{{% /tab %}}
{{% tab "Java" %}}
   ```java
       OkHttpClient okHttpClient = new OkHttpClient.Builder()
        .addInterceptor(new DatadogInterceptor())
        .eventListenerFactory(new DatadogEventListener.Factory())
        .build();
   ```
{{% /tab %}}
{{< /tabs >}}

### ロングタスクの自動追跡

メインスレッドで長時間実行されるオペレーションは、アプリケーションの視覚的パフォーマンスとリアクティビティに影響を与えることがあります。このようなオペレーションを追跡するには、タスクを長すぎるとみなすための閾値を定義します。

{{< tabs >}}
{{% tab "Kotlin" %}}
   ```kotlin
       val rumConfig = RumConfiguration.Builder(applicationId)
        // ...
        .trackLongTasks(durationThreshold)
        .build()
   ```

たとえば、デフォルトの `100 ms` の実行時間を置換するため、コンフィギュレーションでカスタム閾値を設定します。

   ```kotlin
      val rumConfig = RumConfiguration.Builder(applicationId)
        // ...
        .trackLongTasks(250L) // track tasks longer than 250ms as long tasks
        .build()
   ```
{{% /tab %}}
{{% tab "Java" %}}
  ```java
      RumConfiguration rumConfig = new RumConfiguration.Builder(applicationId)
        // ...
        .trackLongTasks(durationThreshold)
        .build();
   ```

たとえば、デフォルトの `100 ms` の実行時間を置換するため、コンフィギュレーションでカスタム閾値を設定します。

   ```java
      RumConfiguration rumConfig = new RumConfiguration.Builder(applicationId)
        // ...
        .trackLongTasks(250L) // track tasks longer than 250ms as long tasks
        .build();
   ```
{{% /tab %}}
{{< /tabs >}}

## RUM イベントの変更または削除

一括処理前に、RUM イベントの一部の属性を変更または一部のイベント全体を削除したりするには、RUM Android SDK を初期化する際に `EventMapper<T>` を実装します。


{{< tabs >}}
{{% tab "Kotlin" %}}
   ```kotlin
       val rumConfig = RumConfiguration.Builder(applicationId)
        // ...
        .setErrorEventMapper(rumErrorEventMapper)
        .setActionEventMapper(rumActionEventMapper)
        .setResourceEventMapper(rumResourceEventMapper)
        .setViewEventMapper(rumViewEventMapper)
        .setLongTaskEventMapper(rumLongTaskEventMapper)
        .build()
   ```
{{% /tab %}}
{{% tab "Java" %}}
  ```java
      RumConfiguration rumConfig = new RumConfiguration.Builder(applicationId)
        // ...
        .setErrorEventMapper(rumErrorEventMapper)
        .setActionEventMapper(rumActionEventMapper)
        .setResourceEventMapper(rumResourceEventMapper)
        .setViewEventMapper(rumViewEventMapper)
        .setLongTaskEventMapper(rumLongTaskEventMapper)
        .build();

   ```
{{% /tab %}}
{{< /tabs >}}

`EventMapper<T>` インターフェースを実装する場合、各イベントタイプの属性は一部のみしか変更することができません。

   | イベントタイプ    | 属性キー      | 説明                                     |
   |---------------|--------------------|-------------------------------------------------|
   | ViewEvent     | `view.referrer`      | ページの初期ビューへのリンク URL。 |
   |               | `view.url`           | ビューの URL。                                 |
   |               | `view.name`           | ビューの名前。                                |
   | ActionEvent   |                    |                                                 |
   |               | `action.target.name` | ターゲット名。                                     |
   |               | `view.referrer`      | ページの初期ビューへのリンク URL。 |
   |               | `view.url`           | ビューの URL。                                 |
   |               | `view.name`           | ビューの名前。                               |
   | ErrorEvent    |                      |                                                 |
   |               | `error.message`      | エラーメッセージ。                                   |
   |               | `error.stack`        | エラーのスタックトレース。                         |
   |               | `error.resource.url` | リソースの URL。                             |
   |               | `view.referrer`      | ページの初期ビューへのリンク URL。 |
   |               | `view.url`           | ビューの URL。                                 |
   |               | `view.name`           | ビューの名前。                                |
   | ResourceEvent |                    |                                                 |
   |               | `resource.url`       | リソースの URL。                             |
   |               | `view.referrer`      | ページの初期ビューへのリンク URL。 |
   |               | `view.url`           | ビューの URL。                                 |
   |               | `view.name`           | ビューの名前。                                |
   | LongTaskEvent |                    |                                                 |
   |               | `view.referrer`       | ページの初期ビューへのリンク URL。 |
   |               | `view.url`            | ビューの URL。                                 |
   |               | `view.name`           | ビューの名前。                                |

   **注**: `EventMapper<T>` の実装から null が返された場合、イベントは削除されます。

## Retrieve the RUM session ID

Retrieving the RUM session ID can be helpful for troubleshooting. For example, you can attach the session ID to support requests, emails, or bug reports so that your support team can later find the user session in Datadog.

You can access the RUM session ID at runtime without waiting for the `sessionStarted` event:

```kotlin
GlobalRumMonitor.get().getCurrentSessionId { sessionId ->
  currentSessionId = sessionId
}
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: /real_user_monitoring/android
[3]: /real_user_monitoring/android/data_collected
[4]: /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android/#automatically-track-views
[5]: /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android/#initialization-parameters
[6]: /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android/#automatically-track-network-requests
[7]: https://github.com/DataDog/dd-sdk-android/tree/master/sample/kotlin/src/main/kotlin/com/datadog/android/sample/widget
[8]: https://square.github.io/okhttp/features/events/
[9]: /real_user_monitoring/android/data_collected/#event-specific-attributes
[10]: /real_user_monitoring/explorer/search/#setup-facets-and-measures
