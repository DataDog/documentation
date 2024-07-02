---
title: RUM Android and Android TV Monitoring Setup
aliases:
    - /real_user_monitoring/android/
code_lang: android
type: multi-code-lang
code_lang_weight: 10
further_reading:
- link: /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android
  tag: Documentation
  text: RUM Android Advanced Configuration
- link: "https://github.com/DataDog/dd-sdk-android"
  tag: ソースコード
  text: Source code for dd-sdk-android
- link: /real_user_monitoring
  tag: Documentation
  text: Explore Datadog RUM
---
## 概要

Datadog Real User Monitoring (RUM) を使用すると、アプリケーションの個々のユーザーのリアルタイムパフォーマンスとユーザージャーニーを視覚化して分析できます。

Datadog Android SDK は、Android 5.0+ (API レベル 21) と Android TV をサポートします。

## セットアップ

1. Datadog RUM SDK を依存関係として宣言します。
2. UI でアプリケーションの詳細を指定します。
3. アプリケーションのコンテキストで Datadog SDK を初期化します。
4. RUM 機能を有効にしてデータの送信を開始します。
5. ネットワークイベントを追跡するために RUM Interceptor を初期化します。

### Datadog RUM SDK を依存関係として宣言する

**アプリケーションモジュールの** `build.gradle` ファイルで [dd-sdk-android-rum][1] と [Gradle プラグイン][12]を依存関係として宣言します。

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

1. Navigate to [**Digital Experience** > **Add an Application**][2].
2. アプリケーションタイプとして `android` を選択し、新しいアプリケーション名を入力して一意の Datadog アプリケーション ID とクライアントトークンを生成します。
3. Web ビューをインスツルメントするには、**Instrument your webviews** トグルをクリックします。詳しくは、[Web ビュー追跡][13]を参照してください。
4. クライアント IP またはジオロケーションデータの自動ユーザーデータ収集を無効にするには、これらの設定のチェックボックスをオフにします。詳しくは、[RUM Android データ収集][15]をご覧ください。

   {{< img src="real_user_monitoring/android/android-new-application.png" alt="Datadog で Android 用 RUM アプリケーションを作成する" style="width:90%;">}}

データの安全性を確保するため、クライアントトークンを使用する必要があります。Datadog SDK の構成に [Datadog API キー][3]のみを使用した場合、クライアント側で Android アプリケーションの APK バイトコード内で公開されます。

クライアントトークンのセットアップについて、詳しくは[クライアントトークンに関するドキュメント][4]を参照してください。

### アプリケーションのコンテキストで Datadog SDK を初期化する

初期化スニペットでは、環境名、サービス名、バージョン番号を設定します。以下の例では、`APP_VARIANT_NAME` がデータを生成するアプリケーションのバリアントを指定します。詳しくは、[タグの使用][14]を参照してください。

EU ユーザーのために GDPR コンプライアンスを追加するには [`trackingConsent`][6] を、ライブラリを初期化するには[その他の構成オプション][7]を参照してください。

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

初期化認証情報はアプリケーションのバリアント名を必要とし、`BuildConfig.FLAVOR` の値を使用します。バリアントがあれば、RUM はアプリケーションから報告されたエラーと Gradle プラグインによってアップロードされたマッピングファイルを照合することができます。バリアントがない場合、認証情報には空の文字列が使われます。

Gradle プラグインは、ビルド時に適切な ProGuard `mapping.txt` ファイルを自動的にアップロードするので、難読化された RUM エラースタックトレースを見ることができます。詳しくは、[Android エラーの追跡][8]を参照してください。

### RUM セッションのサンプリング

アプリケーションが Datadog RUM に送信するデータを制御するには、[RUM 機能を初期化][2]し、RUM セッションのサンプルレートを 0～100 パーセントの間で指定します。

```kotlin
val rumConfig = RumConfiguration.Builder(applicationId)
        // ここでは RUM セッションの 75% を Datadog へ送信
        .setSessionSampleRate(75.0f)
        .build()
Rum.enable(rumConfig)
```

### RUM 機能を有効にしてデータの送信を開始する

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
    val rumConfig = RumConfiguration.Builder(applicationId)
      .trackInteractions()
      .trackLongTasks(durationThreshold)
      .useViewTrackingStrategy(strategy)
      .build()
    Rum.enable(rumConfig)
```
{{% /tab %}}

{{% tab "Java" %}}
```java
    RumConfiguration rumConfig = new RumConfiguration.Builder(applicationId)
      .trackInteractions()
      .trackLongTasks(durationThreshold)
      .useViewTrackingStrategy(strategy)
      .build();
    Rum.enable(rumConfig);
```
{{% /tab %}}
{{< /tabs >}}

すべてのビュー (アクティビティ、フラグメントなど) の自動追跡を有効にするには、[`ViewTrackingStrategy`][5] を参照してください。

### ネットワークイベントを追跡するために RUM Interceptor を初期化する

1. 分散型トレーシングを行いたい場合は、トレース機能を追加して有効にしてください。方法は、[Datadog Android トレース収集ドキュメント][16]を参照してください。
2. モジュールレベルの `build.gradle` ファイルで、`dd-sdk-android-okhttp` ライブラリに Gradle 依存関係を追加します。

    ```groovy
    dependencies {
        implementation "com.datadoghq:dd-sdk-android-okhttp:x.x.x"
    }
    ```

3. OkHttp リクエストをリソースとして追跡するには、提供された[インターセプター][9]を追加します。

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
val okHttpClient = OkHttpClient.Builder()
    .addInterceptor(DatadogInterceptor())
    .build()
```
{{% /tab %}}
{{% tab "Java" %}}
```java
OkHttpClient okHttpClient = new OkHttpClient.Builder()
    .addInterceptor(new DatadogInterceptor())
    .build();
```
{{% /tab %}}
{{< /tabs >}}

これにより、`OkHttpClient` によって処理された各リクエストが RUM でリソースとして記録され、関連するすべての情報 (URL、メソッド、ステータスコード、エラー) が自動的に入力されます。ビューがアクティブな時に開始したネットワークリクエストのみが追跡されます。アプリケーションがバックグラウンドの時にリクエストを追跡するには、[手動でビューを作成][10]します。

**注**: 複数のインターセプターも使用する場合、`DatadogInterceptor` を最初に追加します。

また、`OkHttpClient` に `EventListener` を追加して、サードパーティプロバイダー、ネットワークリクエストで[リソースのタイミングを自動的に追跡][11]することも可能です。

## バックグラウンドイベントの追跡

アプリケーションがバックグラウンドにあるとき (例えば、アクティブなビューがないとき)、クラッシュやネットワークリクエストなどのイベントを追跡することができます。

RUM 構成中に以下のスニペットを追加します。

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

### ローカルアセットを RUM リソースとして追跡する

`getAssetAsRumResource` 拡張機能を使うことで、アセットへのアクセスを追跡することができます。

```kotlin
val inputStream = context.getAssetAsRumResource(fileName)
```

`getRawResAsRumResource` 拡張機能メソッドを使うことで、ローカルリソースの使用状況を追跡することができます。

```kotlin
val inputStream = context.getRawResAsRumResource(id)
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-android/tree/develop/features/dd-sdk-android-rum
[2]: https://app.datadoghq.com/rum/application/create
[3]: /account_management/api-app-keys/#api-keys
[4]: /account_management/api-app-keys/#client-tokens
[5]: /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android/#automatically-track-views
[6]: /real_user_monitoring/mobile_and_tv_monitoring/troubleshooting/#set-tracking-consent-gdpr-compliance
[7]: /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android/#initialization-parameters
[8]: /real_user_monitoring/error_tracking/android/#upload-your-mapping-file
[9]: https://square.github.io/okhttp/interceptors/
[10]: /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android/#custom-views
[11]: /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android/#automatically-track-network-requests
[12]: https://github.com/DataDog/dd-sdk-android-gradle-plugin
[13]: /real_user_monitoring/android/web_view_tracking/
[14]: /getting_started/tagging/using_tags/#rum--session-replay
[15]: /real_user_monitoring/android/data_collected/
[16]: /tracing/trace_collection/dd_libraries/android/?tab=kotlin
