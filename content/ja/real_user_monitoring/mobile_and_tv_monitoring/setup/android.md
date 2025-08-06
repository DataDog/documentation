---
aliases:
- /ja/real_user_monitoring/android/
code_lang: android
code_lang_weight: 10
further_reading:
- link: /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android
  tag: ドキュメント
  text: RUM Android の高度なコンフィギュレーション
- link: https://github.com/DataDog/dd-sdk-android
  tag: ソースコード
  text: dd-sdk-android のソースコード
- link: /real_user_monitoring
  tag: ドキュメント
  text: Datadog RUM を探索する
title: RUM Android および Android TV のモニタリングのセットアップ
type: multi-code-lang
---
## 概要

このページでは、Android SDK を使用してアプリケーションを [Real User Monitoring (RUM)][1] と [Error Tracking][2] 用にインスツルメントする方法について説明します。RUM (Error Tracking を含む) または Error Tracking (スタンドアロン製品として購入した場合) 用にアプリケーションをインスツルメントするには、以下の手順に従います。

Datadog Android SDK は、Android 5.0+ (API レベル 21) と Android TV をサポートします。

## セットアップ

### UI でアプリケーションの詳細を指定

1. Datadog SDK を依存関係として宣言します。
2. UI でアプリケーションの詳細を指定します。
3. アプリケーションのコンテキストで Datadog SDK を初期化します。
4. 機能を有効にしてデータの送信を開始します。
5. ネットワークイベントを追跡するために Interceptor を初期化します。

### Datadog SDK を依存関係として宣言します。

**アプリケーションモジュールの** `build.gradle` ファイルで [dd-sdk-android-rum][3] と [Gradle プラグイン][4]を依存関係として宣言します。

```groovy
buildscript {
    dependencies {
        classpath("com.datadoghq:dd-sdk-android-gradle-plugin:x.x.x")
    }
}
plugins {
    id("com.datadoghq.dd-sdk-android-gradle-plugin")
    //(...)
}
android {
    //(...)
}
dependencies {
    implementation "com.datadoghq:dd-sdk-android-rum:x.x.x" 
    //(...)
}

```

### UI でアプリケーションの詳細を指定
{{< tabs >}}
{{% tab "RUM" %}}

1. [**Digital Experience** > **Add an Application**][1] に移動します。
2. アプリケーションタイプとして `android` を選択し、新しいアプリケーション名を入力して一意の Datadog アプリケーション ID とクライアントトークンを生成します。
3. Web ビューをインスツルメントするには、**Instrument your webviews** トグルをクリックします。詳しくは、[Web ビュー追跡][2]を参照してください。
4. クライアント IP またはジオロケーションデータの自動ユーザーデータ収集を無効にするには、これらの設定のトグルを使用します。詳しくは、[RUM Android データ収集][3]をご覧ください。

   {{< img src="real_user_monitoring/android/android-new-application.png" alt="Datadog で Android 用 RUM アプリケーションを作成する" style="width:90%;">}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: /ja/real_user_monitoring/android/web_view_tracking/
[3]: /ja/real_user_monitoring/android/data_collected/

{{% /tab %}}
{{% tab "Error Tracking" %}}

1. [**Error Tracking** > **Settings** > **Browser and Mobile** > **Add an Application**][1] に移動します。
2. アプリケーションタイプとして `android` を選択し、新しいアプリケーション名を入力して一意の Datadog アプリケーション ID とクライアントトークンを生成します。
3. Web ビューをインスツルメントするには、**Instrument your webviews** トグルをクリックします。詳しくは、[Web ビュー追跡][2]を参照してください。
4. クライアント IP またはジオロケーションデータの自動ユーザーデータ収集を無効にするには、これらの設定のトグルを使用します。詳しくは、[Android データ収集][3]をご覧ください。

   {{< img src="real_user_monitoring/error_tracking/mobile-new-application.png" alt="Datadog で Android 用アプリケーションを作成する" style="width:90%;">}}

[1]: https://app.datadoghq.com/error-tracking/settings/setup/client
[2]: /ja/real_user_monitoring/android/web_view_tracking/
[3]: /ja/real_user_monitoring/android/data_collected/

{{% /tab %}}
{{< /tabs >}}

データの安全性を確保するため、クライアントトークンを使用する必要があります。[Datadog API キー][5] だけで Datadog SDK を構成すると、Android アプリケーションの APK バイトコードにクライアントサイドで露出してしまいます。

クライアントトークンのセットアップについて、詳しくは[クライアントトークンに関するドキュメント][6]を参照してください。

### アプリケーションのコンテキストで Datadog SDK を初期化する

初期化スニペットでは、環境名、サービス名、バージョン番号を設定します。以下の例では、`APP_VARIANT_NAME` がデータを生成するアプリケーションのバリアントを指定します。詳しくは、[タグの使用][7]を参照してください。

EU ユーザー向けに GDPR 準拠を追加するには、[`trackingConsent`][8] を参照してください。ライブラリを初期化するその他の方法については、[その他の構成オプション][9] を参照してください。

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

初期化認証情報はアプリケーションのバリアント名を必要とし、`BuildConfig.FLAVOR` の値を使用します。バリアントがあれば、SDK はアプリケーションから報告されたエラーと Gradle プラグインによってアップロードされたマッピングファイルを照合することができます。バリアントがない場合、認証情報には空の文字列が使われます。

Gradle プラグインはビルド時に適切な ProGuard `mapping.txt` ファイルを自動的にアップロードするため、難読化解除されたエラースタックトレースを確認できます。詳しくは、[Android エラーの追跡][10] を参照してください。

### セッションのサンプリング

<div class="alert alert-warning">セッションのサンプリングレートの設定は Error Tracking には適用されません。</div>

アプリケーションが Datadog に送信するデータを制御するには、[RUM を初期化][11] する際にセッションのサンプリングレートを 0～100 の範囲で指定できます。デフォルトでは `sessionSamplingRate` が 100 (すべてのセッションを保持) に設定されています。

```kotlin
val rumConfig = RumConfiguration.Builder(applicationId)
        // ここでは RUM セッションの 75% を Datadog へ送信
        .setSessionSampleRate(75.0f)
        .build()
Rum.enable(rumConfig)
```

### トラッキングの同意を設定 (GDPR の遵守)

GDPR に準拠するため、SDK は初期化時に tracking consent の値を必須とします。

追跡に関する同意は以下のいずれかの値で示されます。

- `TrackingConsent.PENDING`: (デフォルト) SDK はデータの収集とバッチ処理を開始しますが、
 収集エンドポイントへの送信は行われません。SDK はバッチ処理が完了したデータをどうするかについての新たな同意値が得られるまで待機します。
- `TrackingConsent.GRANTED`: SDK はデータの収集を開始し、それをデータ収集エンドポイントに送信します。
- `TrackingConsent.NOT_GRANTED`: SDK がデータを収集することはありません。ログ、トレース、またはイベントを手動で送信することはできません。

SDK の初期化後に追跡に関する同意を更新する場合は、 `Datadog.setTrackingConsent(<NEW CONSENT>)` を呼び出します。SDK は新しい同意に応じて動作を変更します。たとえば、現在の同意内容が `TrackingConsent.PENDING` で、それを

- `TrackingConsent.GRANTED` に更新した場合: SDK は現在のバッチデータと将来的なデータをすべてデータ収集エンドポイントに直接送信します。
- `TrackingConsent.NOT_GRANTED`: SDK はすべてのバッチデータを消去し、以後のデータも収集しません。


### 機能を有効にしてデータの送信を開始する

Android SDK を有効にしてデータの送信を開始するには: 

{{< tabs >}}
{{% tab "Kotlin" %}}

```kotlin
   val rumConfig = RumConfiguration.Builder(applicationId)
     .trackInteractions()
     .trackLongTasks(durationThreshold) // Error Tracking には適用されません
     .useViewTrackingStrategy(strategy)
     .build()
   Rum.enable(rumConfig)
```

{{% /tab %}}
{{% tab "Java" %}}

```java
   RumConfiguration rumConfig = new RumConfiguration.Builder(applicationId)
     .trackInteractions()
     .trackLongTasks(durationThreshold)  // Error Tracking には適用されません
     .useViewTrackingStrategy(strategy)
     .build();
   Rum.enable(rumConfig);
```

{{% /tab %}}
{{< /tabs >}}

すべてのビュー (アクティビティ、フラグメントなど) の自動追跡を有効にするには、[`ViewTrackingStrategy`][12] を参照してください。

### ネットワークイベントを追跡するために Interceptor を初期化する

ネットワークイベントを追跡するために Interceptor を初期化するには:

1. 分散型トレーシングを行いたい場合は、[トレース機能を追加して有効にしてください][13]。
2. モジュールレベルの `build.gradle` ファイルで、`dd-sdk-android-okhttp` ライブラリに Gradle 依存関係を追加します。

    ```groovy
    dependencies {
        implementation "com.datadoghq:dd-sdk-android-okhttp:x.x.x"
    }
    ```

3. OkHttp リクエストをリソースとして追跡するには、提供されている [Interceptor][14] を追加します。

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
val tracedHostsWithHeaderType = mapOf(
    "example.com" to setOf(
        TracingHeaderType.DATADOG,
        TracingHeaderType.TRACECONTEXT),
    "example.eu" to  setOf(
        TracingHeaderType.DATADOG,
        TracingHeaderType.TRACECONTEXT))
val okHttpClient = OkHttpClient.Builder()
    .addInterceptor(DatadogInterceptor.Builder(tracedHostsWithHeaderType).build())
    .build()
```
{{% /tab %}}
{{% tab "Java" %}}
```java
final Map<String, Set<TracingHeaderType>> tracedHostsWithHeaderType = new HashMap<>();
final Set<TracingHeaderType> datadogAndW3HeadersTypes = new HashSet<>(Arrays.asList(TracingHeaderType.DATADOG, TracingHeaderType.TRACECONTEXT));
tracedHostsWithHeaderType.put("example.com", datadogAndW3HeadersTypes);
tracedHostsWithHeaderType.put("example.eu", datadogAndW3HeadersTypes);
OkHttpClient okHttpClient = new OkHttpClient.Builder()
    .addInterceptor(new DatadogInterceptor.Builder(tracedHostsWithHeaderType).build())
    .build();
```
{{% /tab %}}
{{< /tabs >}}

これにより、`OkHttpClient` によって処理された各リクエストが RUM でリソースとして記録され、関連するすべての情報 (URL、メソッド、ステータスコード、エラー) が自動的に入力されます。ビューがアクティブな時に開始したネットワークリクエストのみが追跡されます。アプリケーションがバックグラウンドの時にリクエストを追跡するには、[手動でビューを作成][15]します。

**注**: 複数のインターセプターも使用する場合、`DatadogInterceptor` を最初に追加します。

また、`OkHttpClient` に `EventListener` を追加することで、サードパーティプロバイダーやネットワークリクエストの [リソースタイミングを自動的に追跡][16] することもできます。

## バックグラウンドイベントの追跡

アプリケーションがバックグラウンドにあるとき (例えば、アクティブなビューがないとき)、クラッシュやネットワークリクエストなどのイベントを追跡することができます。

構成中に以下のスニペットを追加します。

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
.trackBackgroundEvents(true)
```
{{% /tab %}}
{{% tab "Java" %}}
```java
.trackBackgroundEvents(true)
```
{{% /tab %}}
{{< /tabs >}}
<div class="alert alert-info"><p>バックグラウンドイベントを追跡すると、セッションが追加され、課金に影響を与える可能性があります。ご質問は、<a href="https://docs.datadoghq.com/help/">Datadog サポートまでお問い合わせ</a>ください。</p>
</div>

## Kotlin 拡張機能

### `Closeable` 拡張機能

`useMonitored` メソッドを使用して `Closeable` インスタンスの使用状況を監視できます。発生したエラーが Datadog に報告され、その後リソースが閉じられます。

```kotlin
val closeable: Closeable = ...
closeable.useMonitored {
    // コードをここに
}

```

### ローカルアセットをリソースとして追跡する

`getAssetAsRumResource` 拡張機能を使うことで、アセットへのアクセスを追跡することができます。

```kotlin
val inputStream = context.getAssetAsRumResource(fileName)
```

`getRawResAsRumResource` 拡張機能メソッドを使うことで、ローカルリソースの使用状況を追跡することができます。

```kotlin
val inputStream = context.getRawResAsRumResource(id)
```

## デバイスがオフラインの時のデータ送信

Android SDK では、ユーザーのデバイスがオフラインのときにもデータを確実に利用できます。ネットワークの状態が悪いエリアやデバイスのバッテリーが非常に少ないなどの場合でも、すべてのイベントは最初にローカルデバイスにバッチで格納されます。

各バッチはインテークの仕様に従います。ネットワークが利用可能で、Datadog SDK がエンドユーザーのエクスペリエンスに影響を与えないようにバッテリーの残量が十分にあれば、バッチはすぐに送信されます。アプリケーションがフォアグラウンドにあるときにネットワークが利用できない場合、またはデータのアップロードが失敗した場合、バッチは正常に送信されるまで保持されます。

つまり、ユーザーがオフラインでアプリケーションを開いても、データが失われることはありません。SDK がディスク容量を使いすぎないようにするため、ディスク上のデータは、古すぎる場合自動的に破棄されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/
[2]: /ja/error_tracking/
[3]: https://github.com/DataDog/dd-sdk-android/tree/develop/features/dd-sdk-android-rum
[4]: https://github.com/DataDog/dd-sdk-android-gradle-plugin
[5]: /ja/account_management/api-app-keys/#api-keys
[6]: /ja/account_management/api-app-keys/#client-tokens
[7]: /ja/getting_started/tagging/using_tags/#rum--session-replay
[8]: #set-tracking-consent-gdpr-compliance
[9]: /ja/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android/#initialization-parameters
[10]: /ja/real_user_monitoring/error_tracking/android/#upload-your-mapping-file
[11]: https://app.datadoghq.com/rum/application/create/
[12]: /ja/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android/#automatically-track-views
[13]: /ja/tracing/trace_collection/dd_libraries/android/?tab=kotlin
[14]: https://square.github.io/okhttp/interceptors/
[15]: /ja/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android/#custom-views
[16]: /ja/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android/#automatically-track-network-requests