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
Datadog Real User Monitoring (RUM) を使用すると、アプリケーションの個々のユーザーのリアルタイムパフォーマンスとユーザージャーニーを視覚化して分析できます。

## セットアップ

1. SDK を依存関係として宣言します。
2. UI でアプリケーションの詳細を指定します。
3. アプリケーションのコンテキストでライブラリを初期化します。
4. RUM モニター、インターセプターを初期化してデータ送信を開始します。

**最小 Android OS バージョン**: Android 用 Datadog SDK は Android OS v19 以降をサポートします。


### SDK を依存関係として宣言

`build.gradle` ファイルで [dd-sdk-android][1] と [Gradle プラグイン][13]を依存関係として宣言します。

```
plugins {
    id("dd-sdk-android-gradle-plugin")
}
dependencies {
    implementation "com.datadoghq:dd-sdk-android:x.x.x" 
}
buildscript {
    dependencies {
        classpath("com.datadoghq:dd-sdk-android-gradle-plugin:x.x.x")
    }
}
```

### UI でアプリケーションの詳細を指定

1. UX Monitoring > RUM Applications > New Application を選択
2. [Datadog UI][2] でアプリケーションタイプとして `android` を選択し、新しいアプリケーション名を入力して一意の Datadog アプリケーション ID とクライアントトークンを生成します。

![image][12]

データの安全性を確保するため、クライアントトークンを使用する必要があります。API キーがAndroid アプリケーション APK バイトコードのクライアント側で公開されてしまうため、[Datadog API キー][3]を使用して `dd-sdk-android` ライブラリを構成することはできません。クライアントトークンの設定に関する詳細は、[クライアントトークンに関するドキュメント][4]を参照してください。

### アプリケーションのコンテキストでライブラリを初期化

{{< tabs >}}
{{% tab "US" %}}
```kotlin
class SampleApplication : Application() {
    override fun onCreate() {
        super.onCreate()

        val configuration = Configuration.Builder(
            rumEnabled = true,
            crashReportsEnabled = true
        )
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
{{% tab "EU" %}}
```kotlin
class SampleApplication : Application() {
    override fun onCreate() {
        super.onCreate()

        val configuration = Configuration.Builder(
            rumEnabled = true,
            crashReportsEnabled = true
        )
                        .trackInteractions()
                        .trackLongTasks(durationThreshold)
                        .useViewTrackingStrategy(strategy)
                        .useEUEndpoints()
                        .build()
        val credentials = Credentials(<CLIENT_TOKEN>, <ENV_NAME>, <APP_VARIANT_NAME>, <APPLICATION_ID>)
        Datadog.initialize(this, credentials, configuration, trackingConsent)

    }
}
```
{{% /tab %}}
{{< /tabs >}}

すべてのビュー（アクティビティ、フラグメントなど）の自動追跡を有効化する [`ViewTrackingStrategy`][5] や、EU ユーザー用に GDPR 準拠を追加する [`trackingConsent`][6]、そしてライブラリを初期化するための[その他のコンフィギュレーションオプション][7]の詳細について、ご確認ください。

**注**: 初期化に必要な認証情報では、アプリケーションのバリアント名も必要となり、値 `BuildConfig.FLAVOR` (バリアントがない場合は空白の文字列) の使用が求められることにご注意ください。これは適切な ProGuard `mapping.txt` ファイルを有効化し、ビルド時の自動アップロードを行うために重要です。この操作により、難読化を解除された RUM エラースタックトレースを表示できるようになります。詳しくは、[Android ソースマッピングファイルのアップロードガイド][8]をご参照ください。

### RUM モニターとインターセプターの初期化

RUM Monitor を構成して登録します。通常はアプリケーションの `onCreate()` メソッドで、一度だけ実行する必要があります。

```kotlin
    val monitor = RumMonitor.Builder()
            .build()
    GlobalRum.registerIfAbsent(monitor)
```


OkHttp リクエストをリソースとして追跡するには、提供された[インターセプター][9]を追加します。

```kotlin
    val okHttpClient =  OkHttpClient.Builder()
        .addInterceptor(DatadogInterceptor())
        .build()
```

これにより、`OkHttpClient` によって処理された各リクエストが RUM でリソースとして記録され、関連するすべての情報 (URL、メソッド、ステータスコード、エラー) が自動的に入力されます。ビューがアクティブな時に開始したネットワークリクエストのみが追跡されます。アプリケーションがバックグラウンドの時にリクエストを追跡するには、[手動でビューを作成][10]します。

**注**: また、複数のインターセプターを使用する場合、`DatadogInterceptor` を最初に呼び出す必要があります。

さらに、`OkHttpClient` に `EventListener` を追加して[リソースのタイミングを自動的に追跡][11]（サードパーティプロバイダー、ネットワークリクエスト）できます。


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-android
[2]: https://app.datadoghq.com/rum/application/create
[3]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#api-keys
[4]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#client-tokens
[5]: /ja/real_user_monitoring/android/advanced_configuration/#automatically-track-views
[6]: /ja/real_user_monitoring/android/troubleshooting/#set-tracking-consent-gdpr-compliance
[7]: /ja/real_user_monitoring/android/advanced_configuration/#initialization-parameters
[8]: /ja/real_user_monitoring/error_tracking/android/#upload-your-mapping-file
[9]: https://square.github.io/okhttp/interceptors/
[10]: /ja/real_user_monitoring/android/advanced_configuration/#custom-views
[11]: /ja/real_user_monitoring/android/advanced_configuration/#automatically-track-network-requests
[12]: https://raw.githubusercontent.com/DataDog/dd-sdk-android/master/docs/images/create_rum_application.png
[13]: https://github.com/DataDog/dd-sdk-android-gradle-plugin