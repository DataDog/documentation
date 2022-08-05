---
dependencies:
- https://github.com/DataDog/dd-sdk-android/blob/master/docs/rum_getting_started.md
further_reading:
- link: https://github.com/DataDog/dd-sdk-android
  tag: Github
  text: dd-sdk-android ソースコード
- link: /real_user_monitoring
  tag: ホームページ
  text: Datadog RUM を探索する
kind: documentation
title: RUM Android モニタリング
---
## 概要

Datadog Real User Monitoring (RUM) を使用すると、アプリケーションの個々のユーザーのリアルタイムパフォーマンスとユーザージャーニーを視覚化して分析できます。

Datadog Android SDK は、Android 4.4 (API レベル 19)+ と Android TV をサポートします。

## セットアップ

1. SDK を依存関係として宣言します。
2. UI でアプリケーションの詳細を指定します。
3. アプリケーションのコンテキストでライブラリを初期化します。
4. RUM モニター、インターセプターを初期化してデータ送信を開始します。

### SDK を依存関係として宣言

**アプリケーションモジュールの** `build.gradle` ファイルで [dd-sdk-android][1] と [Gradle プラグイン][12]を依存関係として宣言します。

```
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
    implementation "com.datadoghq:dd-sdk-android:x.x.x" 
    //(...)
}

```

### UI でアプリケーションの詳細を指定

1. [**UX Monitoring** > **RUM Applications** > **New Application**][2] へ移動します。
2. アプリケーションタイプとして `android` を選択し、新しいアプリケーション名を入力して一意の Datadog アプリケーション ID とクライアントトークンを生成します。

{{< img src="real_user_monitoring/android/create_rum_application.png" alt="Datadog ワークフローで RUM アプリケーションを作成" style="width:90%;">}}

データの安全性を確保するため、クライアントトークンを使用する必要があります。`dd-sdk-android`  ライブラリの構成に [Datadog API キー][3]のみを使用した場合、クライアント側で Android アプリケーションの APK バイトコード内で公開されます。

クライアントトークンのセットアップについて、詳しくは[クライアントトークンに関するドキュメント][4]を参照してください。

### アプリケーションのコンテキストでライブラリを初期化

すべてのビュー（アクティビティ、フラグメントなど）の自動追跡を有効化する [`ViewTrackingStrategy`][5] や、EU ユーザー用に GDPR 準拠を追加する [`trackingConsent`][6]、そしてライブラリを初期化するための[その他のコンフィギュレーションオプション][7]について、ご確認ください。

{{< site-region region="us" >}}
{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
    class SampleApplication : Application() {
        override fun onCreate() {
            super.onCreate()
            val configuration = Configuration.Builder(
                    logsEnabled = true,
                    tracesEnabled = true,
                    crashReportsEnabled = true,
                    rumEnabled = true
                )
                .useSite(DatadogSite.US1)
                .trackInteractions()
                .trackLongTasks(durationThreshold)
                .useViewTrackingStrategy(strategy)
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
            final Configuration configuration = 
                    new Configuration.Builder(true, true, true, true)
                            .trackInteractions()
                            .trackLongTasks(durationThreshold)
                            .useViewTrackingStrategy(strategy)
                            .useSite(DatadogSite.US1)
                            .build();
               final Credentials credentials = new Credentials(<CLIENT_TOKEN>, <ENV_NAME>, <APP_VARIANT_NAME>, <APPLICATION_ID>);
               Datadog.initialize(this, credentials, configuration, trackingConsent); 
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
                    logsEnabled = true,
                    tracesEnabled = true,
                    crashReportsEnabled = true,
                    rumEnabled = true
                )
                .useSite(DatadogSite.EU1)
                .trackInteractions()
                .trackLongTasks(durationThreshold)
                .useViewTrackingStrategy(strategy)
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
            final Configuration configuration = 
                    new Configuration.Builder(true, true, true, true)
                            .trackInteractions()
                            .trackLongTasks(durationThreshold)
                            .useViewTrackingStrategy(strategy)
                            .useSite(DatadogSite.EU1)
                            .build();
            Credentials credentials = new Credentials(<CLIENT_TOKEN>, <ENV_NAME>, <APP_VARIANT_NAME>, <APPLICATION_ID>);
            Datadog.initialize(this, credentials, configuration, trackingConsent); 
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
                    logsEnabled = true,
                    tracesEnabled = true,
                    crashReportsEnabled = true,
                    rumEnabled = true
                )
                .useSite(DatadogSite.US3)
                .trackInteractions()
                .trackLongTasks(durationThreshold)
                .useViewTrackingStrategy(strategy)
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
            final Configuration configuration = 
                    new Configuration.Builder(true, true, true, true)
                            .trackInteractions()
                            .trackLongTasks(durationThreshold)
                            .useViewTrackingStrategy(strategy)
                            .useSite(DatadogSite.US3)
                            .build();
            Credentials credentials = new Credentials(<CLIENT_TOKEN>, <ENV_NAME>, <APP_VARIANT_NAME>, <APPLICATION_ID>);
            Datadog.initialize(this, credentials, configuration, trackingConsent); 
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
                    logsEnabled = true,
                    tracesEnabled = true,
                    crashReportsEnabled = true,
                    rumEnabled = true
                )
                .useSite(DatadogSite.US5)
                .trackInteractions()
                .trackLongTasks(durationThreshold)
                .useViewTrackingStrategy(strategy)
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
            final Configuration configuration = 
                    new Configuration.Builder(true, true, true, true)
                            .trackInteractions()
                            .trackLongTasks(durationThreshold)
                            .useViewTrackingStrategy(strategy)
                            .useSite(DatadogSite.US5)
                            .build();
            Credentials credentials = new Credentials(<CLIENT_TOKEN>, <ENV_NAME>, <APP_VARIANT_NAME>, <APPLICATION_ID>);
            Datadog.initialize(this, credentials, configuration, trackingConsent); 
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
                    logsEnabled = true,
                    tracesEnabled = true,
                    crashReportsEnabled = true,
                    rumEnabled = true
                )
                .useSite(DatadogSite.US1_FED)
                .trackInteractions()
                .trackLongTasks(durationThreshold)
                .useViewTrackingStrategy(strategy)
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
            final Configuration configuration = 
                    new Configuration.Builder(true, true, true, true)
                            .trackInteractions()
                            .trackLongTasks(durationThreshold)
                            .useViewTrackingStrategy(strategy)
                            .useSite(DatadogSite.US1_FED)
                            .build();
            Credentials credentials = new Credentials(<CLIENT_TOKEN>, <ENV_NAME>, <APP_VARIANT_NAME>, <APPLICATION_ID>);
            Datadog.initialize(this, credentials, configuration, trackingConsent); 
        }
    }
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

初期化に必要な認証情報にはアプリケーションのバリアント名が必要で、値 `BuildConfig.FLAVOR`、またはバリアントがない場合は空白の文字列を使用します。これにより、適切な ProGuard `mapping.txt` ファイルが有効化され、ビルド時の自動アップロードが行われて、難読化を解除された RUM エラースタックトレースを表示できるようになります。詳しくは、[Android ソースマッピングファイルのアップロードガイド][8]をご参照ください。

### RUM モニターとインターセプターの初期化

RUM Monitor を構成して登録します。アプリケーションの `onCreate()` メソッドで、一度だけ実行する必要があります。

{{< tabs >}}
{{% tab "Kotlin" %}}
   ```kotlin
        val monitor = RumMonitor.Builder().build()
        GlobalRum.registerIfAbsent(monitor)
   ```
{{% /tab %}}
{{% tab "Java" %}}
   ```java
        final RumMonitor monitor = new RumMonitor.Builder().build();
        GlobalRum.registerIfAbsent(monitor);
   ```
{{% /tab %}}
{{< /tabs >}}

OkHttp リクエストをリソースとして追跡するには、提供された[インターセプター][9]を追加します。

{{< tabs >}}
{{% tab "Kotlin" %}}
   ```kotlin
        val okHttpClient =  OkHttpClient.Builder()
            .addInterceptor(DatadogInterceptor())
            .build()
   ```
{{% /tab %}}
{{% tab "Java" %}}
   ```java
        final OkHttpClient okHttpClient =  new OkHttpClient.Builder()
            .addInterceptor(new DatadogInterceptor())
            .build();
   ```
{{% /tab %}}
{{< /tabs >}}

これにより、`OkHttpClient` によって処理された各リクエストが RUM でリソースとして記録され、関連するすべての情報 (URL、メソッド、ステータスコード、エラー) が自動的に入力されます。ビューがアクティブな時に開始したネットワークリクエストのみが追跡されます。アプリケーションがバックグラウンドの時にリクエストを追跡するには、[手動でビューを作成][10]します。

**注**: 複数のインターセプターも使用する場合、`DatadogInterceptor` を最初に呼び出します。

また、`OkHttpClient` に `EventListener` を追加して、サードパーティプロバイダー、ネットワークリクエストで[リソースのタイミングを自動的に追跡][11]することも可能です。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-android
[2]: https://app.datadoghq.com/rum/application/create
[3]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#api-keys
[4]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#client-tokens
[5]: https://docs.datadoghq.com/ja/real_user_monitoring/android/advanced_configuration/#automatically-track-views
[6]: https://docs.datadoghq.com/ja/real_user_monitoring/android/troubleshooting/#set-tracking-consent-gdpr-compliance
[7]: https://docs.datadoghq.com/ja/real_user_monitoring/android/advanced_configuration/#initialization-parameters
[8]: https://docs.datadoghq.com/ja/real_user_monitoring/error_tracking/android/#upload-your-mapping-file
[9]: https://square.github.io/okhttp/interceptors/
[10]: https://docs.datadoghq.com/ja/real_user_monitoring/android/advanced_configuration/#custom-views
[11]: https://docs.datadoghq.com/ja/real_user_monitoring/android/advanced_configuration/#automatically-track-network-requests
[12]: https://github.com/DataDog/dd-sdk-android-gradle-plugin