---
description: Android アプリケーションからログを収集する。
further_reading:
- link: https://github.com/DataDog/dd-sdk-android
  tag: ソースコード
  text: dd-sdk-android ソースコード
- link: logs/explorer
  tag: ドキュメント
  text: ログの調査方法
title: Android ログの収集
---

## 概要

[Datadog の `dd-sdk-android-logs` クライアント側ロギングライブラリ][1]を使用すると、Android アプリケーションから Datadog へログを送信するとともに、次の機能を利用できます。

* Datadog に JSON 形式でネイティブに記録する。
* 送信される各ログに `context` およびカスタム属性を追加する。
* Java または Kotlin がキャッチした例外を転送します。
* 実際のクライアント IP アドレスとユーザーエージェントを記録する。
* 自動一括ポストによってネットワークの利用を最適化する。

## セットアップ

1. モジュールレベルの `build.gradle` ファイルでライブラリを依存関係として宣言して、Gradle の依存関係を追加します。以下の例の `x.x.x` は必ず最新バージョンの [dd-sdk-android-logs][2] に置き換えてください。

    ```groovy
    dependencies {
        implementation "com.datadoghq:dd-sdk-android-logs:x.x.x"
    }
    ```

2. アプリケーションコンテキスト、追跡同意を設定し、また [Datadog クライアントトークン][3]を用いて Datadog SDK を初期化します。セキュリティ上の理由から、クライアントトークンを使用する必要があります。API キーが Android アプリケーションの APK バイトコードでクライアント側に公開されてしまうため、[Datadog API キー][4]を使用して Datadog SDK を構成することはできません。

   `APP_VARIANT_NAME` は、データを生成するアプリケーションのバリアントを指定します。これは初期化資格情報に必要です。バリアントがない場合は `BuildConfig.FLAVOR` の値か空文字列を使用してください。ビルド時に適切な ProGuard `mapping.txt` ファイルが自動的にアップロードされ、復号化されたエラーのスタックトレースを見ることができるようになります。詳細については、[Android クラッシュレポートとエラー追跡][5]を参照してください。

   クライアントトークンのセットアップについて、詳しくは[クライアントトークンに関するドキュメント][3]を参照してください。

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

   {{< site-region region="ap2" >}}
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
                    .useSite(DatadogSite.AP2)
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
                               .useSite(DatadogSite.AP2)
                               .build();
               Datadog.initialize(this, configuration, trackingConsent);
           }
       }
   ```
   {{% /tab %}}
   {{< /tabs >}}
   {{< /site-region >}}

   GDPR 規制を遵守するため、SDK は初期化時に追跡に関する同意を求めます。
   追跡に関する同意は以下のいずれかの値で示されます。
   * `TrackingConsent.PENDING`: SDK はデータの収集とバッチ処理を開始しますが、データ
     収集エンドポイントへの送信は行われません。SDK はバッチ処理が完了したデータをどうするかについての新たな同意値が得られるまで待機します。
   * `TrackingConsent.GRANTED`: SDK はデータの収集を開始し、それをデータ収集エンドポイントに送信します。
   * `TrackingConsent.NOT_GRANTED`: SDK がデータを収集することはありません。手動でログやトレース、
     RUM イベントを送信することもできません。

   SDK の初期化後に追跡に関する同意を更新する場合は、 `Datadog.setTrackingConsent(<NEW CONSENT>)` を呼び出してください。
   SDK は新しい同意に応じて動作を変更します。たとえば、現在の同意内容が `TrackingConsent.PENDING` で、それを
   * `TrackingConsent.GRANTED` に更新した場合: SDK は現在のバッチデータと将来的なデータをすべてデータ収集エンドポイントに直接送信します。
   * `TrackingConsent.NOT_GRANTED`: SDK はすべてのバッチデータを消去し、以後のデータも収集しません。

   ユーティリティメソッド `isInitialized` を使用して SDK が適切に初期化されていることを確認します。

   ```kotlin
    if (Datadog.isInitialized()) {
        // your code here
    }
   ```

   アプリケーションを書く際、`setVerbosity` メソッドを呼び出すことで開発ログを有効にできます。指定したレベル以上の優先度を持つライブラリ内のすべての内部メッセージが Android の Logcat に記録されます。
   ```kotlin
   Datadog.setVerbosity(Log.INFO)
   ```

3. ログ機能を構成し、有効にします。

   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
        val logsConfig = LogsConfiguration.Builder().build()
        Logs.enable(logsConfig)
   ```
   {{% /tab %}}

   {{% tab "Java" %}}
   ```java
        LogsConfiguration logsConfig = new LogsConfiguration.Builder().build();
        Logs.enable(logsConfig);
   ```
   {{% /tab %}}
   {{< /tabs >}}

4. Android ロガーの構成：

   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
        val logger = Logger.Builder()
           .setNetworkInfoEnabled(true)
           .setLogcatLogsEnabled(true)
           .setRemoteSampleRate(100f)
           .setBundleWithTraceEnabled(true)
           .setName("<LOGGER_NAME>")
           .build()
   ```
   {{% /tab %}}

   {{% tab "Java" %}}
   ```java
        Logger logger = new Logger.Builder()
           .setNetworkInfoEnabled(true)
           .setLogcatLogsEnabled(true)
           .setRemoteSampleRate(100f)
           .setBundleWithTraceEnabled(true)
           .setName("<LOGGER_NAME>")
           .build();
   ```
   {{% /tab %}}
   {{< /tabs >}}

5. 次のいずれかの関数で、カスタムログエントリを Datadog に直接送信します。

    ```kotlin
    logger.d("A debug message.")
    logger.i("Some relevant information ?")
    logger.w("An important warning...")
    logger.e("An error was met!")
    logger.wtf("What a Terrible Failure!")
    ```

6. キャッチされた例外はメッセージで送信できます。
   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
       try { 
           doSomething() 
       } catch (e: IOException) {
           logger.e("Error while doing something", e) 
       }
   ```
   {{% /tab %}}
   {{% tab "Java" %}}
   ```java
       try {
           doSomething();
       } catch (IOException e) {
           logger.e("Error while doing something", e);
       }
   ```
   {{% /tab %}}
   {{< /tabs >}}

    **注**: すべてのロギングメソッドに Throwable をアタッチすることができます。

7. (任意) ログメッセージと一緒にマップを提供し、発行されたログに属性を追加します。マップの各エントリーは属性として追加されます。

   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
       logger.i("onPageStarted", attributes = mapOf("http.url" to url))
   ```
   {{% /tab %}}
   {{% tab "Java" %}}
   ```java
       Map<String, Object> attributes = new HashMap<>();
       attributes.put("http.url", url);
       logger.i("onPageStarted", null, attributes);
   ```
   {{% /tab %}}
   {{< /tabs >}}

8. バッチ処理前にログイベントで属性を変更する必要がある場合は、ログ機能の初期化時に `EventMapper<LogEvent>` を実装することで上記の処理を行えます。

   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
       val logsConfig = LogsConfiguration.Builder()
                   // ...
                   .setEventMapper(logEventMapper)
                   .build()
   ```
   {{% /tab %}}
   {{% tab "Java" %}}
   ```java
       LogsConfiguration logsConfig = new LogsConfiguration.Builder()
                   // ...
                   .setEventMapper(logEventMapper)
                   .build();
   ```
   {{% /tab %}}
   {{< /tabs >}}

   **注**: `EventMapper<LogEvent>` の実装から null や異なるインスタンスが返された場合、イベントは削除されます。

## 高度なロギング

### ロガーの初期化

ログを Datadog に送信するようにロガーを初期化する際に、`Logger.Builder` の次のメソッドを使用できます。

| メソッド                           | 説明                                                                                                                                                                                                                                                              |
|----------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `setNetworkInfoEnabled(true)`    | すべてのログに `network.client.connectivity` 属性を追加します。デフォルトで記録されるデータには、`connectivity` (`Wifi`、`3G`、`4G`...) と `carrier_name` (`AT&T - US`)です。`carrier_name` は Android API レベル 28 以降でのみ利用できます。                                     |
| `setService(<SERVICE_NAME>)` | Datadog に送信されるすべてのログにアタッチされる `service` [標準属性][6]の値として `<SERVICE_NAME>` を設定します。                                                                                                                                                           |
| `setLogcatLogsEnabled(true)`     | Logcat をロガーとして使用するには、`true` とします。                                                                                                                                                                                                                                  |
| `setBundleWithTraceEnabled(true)`| アプリケーションでアクティブなトレースとログをバンドルするには、`true` (デフォルト) に設定します。このパラメーターにより、Datadog ダッシュボードを使い指定されたトレース中に送信されたすべてのログを表示できます。                                                        |
| `setBundleWithRumEnabled(true)`| アプリケーションで現在の RUM コンテキストとログをバンドルするには、`true` (デフォルト) に設定します。このパラメーターにより、Datadog RUM Explorer 使い指定されたビューがアクティブの間に送信されたすべてのログを表示できます。                                                        |
| `setName(<LOGGER_NAME>)`   | Datadog に送信されるすべてのログに添付される `logger.name` 標準属性の値として `<ロガー名>` を設定します。                                                                                                                                                                  |
| `setRemoteSampleRate(<SAMPLE_RATE>)`   | このロガーのサンプリングレートを設定します。ロガーインスタンスが生成するすべてのログは、指定されたサンプリングレートに従いランダムにサンプリングされます (デフォルト 100f = すべてのログ)。**注**: Logcat ログはサンプリングされません。            |
| `build()`                        | すべてのオプションを設定して新しいロガーインスタンスをビルドします。                                                                                                                                                                                                                       |

### グローバルコンフィギュレーション

指定されたロガーから送信されるすべてのログにタグと属性を追加/削除する関数を以下に記します。

#### グローバルタグ

##### タグを追加

`addTag("<TAG_KEY>", "<TAG_VALUE>")` 関数を使い、指定されたロガーから送信されるすべてのログにタグを追加します。

```kotlin
// これにより、"build_type:debug" タグまたは "build_type:release" タグが適宜追加されます
logger.addTag("build_type", BuildConfig.BUILD_TYPE)

// これにより、"device:android" タグが追加されます
logger.addTag("device", "android")
```

`<TAG_VALUE>` は `String` である必要があります。

##### タグを削除

`removeTagsWithKey("<タグキー>")` 関数を使い、指定されたロガーから送信されるすべてのログからタグを削除します。

```kotlin
// これにより "build_type" で始まるすべてのタグが削除されます
logger.removeTagsWithKey("build_type")
```

詳しくは、[タグ入門][7]をご覧ください。

#### グローバル属性

##### 属性を追加

デフォルトで、ロガーにより送信されるすべてのログに次の属性が追加されます。

* `http.useragent` と抽出された `device` と `OS` プロパティ
* `network.client.ip` と抽出された地理的プロパティ (`country`, `city`)

`addAttribute("<属性キー>", "<属性の値>")` 関数を使い、指定されたロガーから送信されるすべてのログにカスタム属性を追加します。

```kotlin
// これにより整数値を持つ "version_code" 属性が追加されます
logger.addAttribute("version_code", BuildConfig.VERSION_CODE)

// これにより文字列値を持つ "version_name" 属性が追加されます
logger.addAttribute("version_name", BuildConfig.VERSION_NAME)
```

`<ATTRIBUTE_VALUE>` には、任意のプリミティブ、`String`、または Date を指定することができます。

##### 属性を削除

`removeAttribute("<属性キー>", "<属性の値>")` 関数を使い、指定されたロガーから送信されるすべてのログからカスタム属性を削除します。

```kotlin
// これにより、"version_code" 属性は今後送信されるすべてのログから削除されます。
logger.removeAttribute("version_code")

// これにより、"version_name" 属性は今後送信されるすべてのログから削除されます。
logger.removeAttribute("version_name")
```

## バッチコレクション

すべてのログは、最初にローカルデバイスにバッチで格納されます。各バッチはインテークの仕様に従います。ネットワークが利用可能で、Datadog SDK がエンドユーザーのエクスペリエンスに影響を与えないようにバッテリーの残量が十分にあれば、バッチはすぐに送信されます。アプリケーションがフォアグラウンドにあるときにネットワークが利用できない場合、またはデータのアップロードが失敗した場合、バッチは正常に送信されるまで保持されます。

つまり、ユーザーがオフラインでアプリケーションを開いても、データが失われることはありません。

ディスク上のデータは、古すぎる場合は SDK がディスク容量を使いすぎないようにするために自動的に破棄されます。

データが Datadog にアップロードされる前に、アプリケーションのキャッシュディレクトリに平文で保存されます。このキャッシュフォルダは、[Android のアプリケーションサンドボックス][8]によって保護されており、ほとんどのデバイスで、このデータは他のアプリケーションによって読み取られることはありません。しかし、モバイルデバイスがルート化されていたり、誰かが Linux カーネルをいじったりすると、保存されているデータが読めるようになる可能性があります。

## 拡張

### Timber 

既存のコードベースが Timber を使用している場合、 [専用ライブラリ][9]を使用してすべてのログを自動的に Datadog へ転送できます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-android/tree/develop/features/dd-sdk-android-logs
[2]: https://github.com/DataDog/dd-sdk-android/blob/develop/CHANGELOG.md
[3]: /ja/account_management/api-app-keys/#client-tokens
[4]: /ja/account_management/api-app-keys/#api-keys
[5]: /ja/real_user_monitoring/error_tracking/android/#upload-your-mapping-file
[6]: /ja/logs/processing/attributes_naming_convention/
[7]: /ja/getting_started/tagging/
[8]: https://source.android.com/security/app-sandbox
[9]: https://github.com/DataDog/dd-sdk-android/tree/develop/integrations/dd-sdk-android-timber