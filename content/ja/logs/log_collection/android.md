---
description: Android アプリケーションからログを収集する。
further_reading:
- link: https://github.com/DataDog/dd-sdk-android
  tag: GitHub
  text: dd-sdk-android ソースコード
- link: logs/explorer
  tag: ドキュメント
  text: ログの調査方法
title: Android ログの収集
---

[Datadog の `dd-sdk-android` クライアント側ロギングライブラリ][1]を使用すると、Android アプリケーションから Datadog へログを送信すると共に、次の機能を利用できます。

* Datadog に JSON 形式でネイティブに記録する。
* 送信される各ログに `context` およびカスタム属性を追加する。
* Java/Kotlin がキャッチした例外を転送します。
* 実際のクライアント IP アドレスとユーザーエージェントを記録する。
* 自動一括ポストによってネットワークの利用を最適化する。

## セットアップ

1. モジュールレベルの `build.gradle` ファイルでライブラリを依存関係として宣言し、Gradle 依存関係を追加します。

    ```conf
    dependencies {
        implementation "com.datadoghq:dd-sdk-android-logs:x.x.x"
    }
    ```

2. アプリケーションコンテキストと追跡に関する同意、[Datadog クライアントトークン][2]、そして Datadog UI で新しい RUM アプリケーションを作成したときに生成されたアプリケーション ID で、ライブラリを初期化します (詳細は、[Android の RUM データを収集][6]を参照)。セキュリティ上の理由から、クライアントトークンを使用する必要があります。API キーがクライアント側の Android アプリケーションの APK バイトコードで公開されてしまうため、[Datadog API キー][3]を使用して `dd-sdk-android` ライブラリを構成することはできません。クライアントトークンの設定に関する詳細は、[クライアントトークンに関するドキュメント][2]を参照してください。`APP_VARIANT_NAME` は、データを生成するアプリケーションのバリアントを指定します。

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
            ).build()
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
            Configuration configuration =
                    new Configuration.Builder(true, true, true, true)
                            .build();
            Credentials credentials = new Credentials( < CLIENT_TOKEN >, <ENV_NAME >, <APP_VARIANT_NAME >, <
            APPLICATION_ID >);
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
            Configuration configuration =
                    new Configuration.Builder(true, true, true, true)
                            .useSite(DatadogSite.EU1)
                            .build();
            Credentials credentials = new Credentials( < CLIENT_TOKEN >, <ENV_NAME >, <APP_VARIANT_NAME >, <
            APPLICATION_ID >);
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
            Configuration configuration =
                    new Configuration.Builder(true, true, true, true)
                            .useSite(DatadogSite.US3)
                            .build();
            Credentials credentials = new Credentials( < CLIENT_TOKEN >, <ENV_NAME >, <APP_VARIANT_NAME >, <
            APPLICATION_ID >);
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
            Configuration configuration =
                    new Configuration.Builder(true, true, true, true)
                            .useSite(DatadogSite.US5)
                            .build();
            Credentials credentials = new Credentials( < CLIENT_TOKEN >, <ENV_NAME >, <APP_VARIANT_NAME >, <
            APPLICATION_ID >);
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
            Configuration configuration =
                    new Configuration.Builder(true, true, true, true)
                            .useSite(DatadogSite.US1_FED)
                            .build();
            Credentials credentials = new Credentials( < CLIENT_TOKEN >, <ENV_NAME >, <APP_VARIANT_NAME >, <
            APPLICATION_ID >);
            Datadog.initialize(this, credentials, configuration, trackingConsent);
        }
    }
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

GDPR 規定を遵守するため、SDK は初期化時に追跡に関する同意を求めます。
追跡の同意は以下のいずれかの値になります。
   * `TrackingConsent.PENDING`: SDK はデータの収集とバッチ処理を開始しますが、データ
     収集エンドポイントへの送信は行われません。SDK はバッチ処理が完了したデータをどうするかについての新たな同意値が得られるまで待機します。
   * `TrackingConsent.GRANTED`: SDK はデータの収集を開始し、それをデータ収集エンドポイントに送信します。
   * `TrackingConsent.NOT_GRANTED`: SDK がデータを収集することはありません。手動でログやトレース、
     RUM イベントを送信することもできません。

   SDK の初期化後に追跡に関する同意を更新する場合は、 `Datadog.setTrackingConsent(<NEW CONSENT>)` を呼び出してください。
   SDK は新しい同意に応じて動作を変更します。たとえば、現在の同意内容が `TrackingConsent.PENDING` で、それを
   * `TrackingConsent.GRANTED` に更新した場合: SDK は現在のバッチデータと将来的なデータをすべてデータ収集エンドポイントに直接送信します。
   * `TrackingConsent.NOT_GRANTED`: SDK はすべてのバッチデータを消去し、以後のデータも収集しません。

**注**: 初期化に必要な認証情報では、アプリケーションのバリアント名も必要となり、値 `BuildConfig.FLAVOR` (バリアントがない場合は空白の文字列) の使用が求められることにご注意ください。これは適切な ProGuard `mapping.txt` ファイルを有効化し、ビルド時の自動アップロードを行うために重要です。この操作により、難読化を解除された RUM エラースタックトレースを表示できるようになります。詳しくは、[Android ソースマッピングファイルのアップロードガイド][7]をご参照ください。

   ユーティリティメソッド `isInitialized` を使用して SDK が適切に初期化されていることを確認します。

   ```kotlin
    if (Datadog.isInitialized()) {
        // your code here
    }
   ```

   アプリケーションを書く際、 `setVerbosity` メソッドを呼び出すことで開発ログを有効にできます。指定したレベル以上の優先度を持つライブラリ内のすべての内部メッセージが Android の Logcat に記録されます。
   ```kotlin
   Datadog.setVerbosity(Log.INFO)
   ```

3. Android ロガーの構成：
   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
         val logger = Logger.Builder()
            .setNetworkInfoEnabled(true)
            .setLogcatLogsEnabled(true)
            .setDatadogLogsEnabled(true)
            .setBundleWithTraceEnabled(true)
            .setLoggerName("<LOGGER_NAME>")
            .build()
   ```
   {{% /tab %}}
   {{% tab "Java" %}}
   ```java
          final Logger logger = new Logger.Builder()
            .setNetworkInfoEnabled(true)
            .setLogcatLogsEnabled(true)
            .setDatadogLogsEnabled(true)
            .setBundleWithTraceEnabled(true)
            .setLoggerName("<LOGGER_NAME>")
            .build();
   ```
   {{% /tab %}}
   {{< /tabs >}}

4. 次のいずれかの関数で、カスタムログエントリを Datadog に直接送信します。

    ```kotlin
    logger.d("A debug message.")
    logger.i("Some relevant information ?")
    logger.w("An important warning...")
    logger.e("An error was met!")
    logger.wtf("What a Terrible Failure!")
    ```

5. キャッチされた例外はメッセージで送信できます。
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

6. (任意) - ログメッセージと一緒にマップを提供し、発行されたログに属性を追加します。マップの各エントリーは属性として追加されます。

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

7. バッチ処理前にログイベントで属性を変更する必要がある場合は、SDK の初期化時に `EventMapper<LogEvent>` を実装することで上記の処理を行えます。

   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
        val config = Configuration.Builder(logsEnabled = true, ...)
                    // ...
                    .setLogEventMapper(logEventMapper)
                    .build()
   ```
   {{% /tab %}}
   {{% tab "Java" %}}
   ```java
        Configuration config = new Configuration.Builder(true, true, true, true)
                    // ...
                    .setLogEventMapper(logEventMapper)
                    .build();
   ```
   {{% /tab %}}
   {{< /tabs >}}

   **注**: `EventMapper<LogEvent>` の実装から null や異なるインスタンスが返された場合、イベントは削除されます。

## 高度なロギング

### ライブラリの初期化

ライブラリを初期化するよう Datadog のコンフィギュレーションを作成する際、`Configuration.Builder` の以下のメソッドを使用できます。

| メソッド                           | 説明                                                                                                                                                                                                                                                             |
|----------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `constructor(logsEnabled = true)`     | Datadog へのログ送信を有効にするには、`true` に設定します。                                                                                                                                                                                                                                  |
| `addPlugin(DatadogPlugin, Feature)`   | 特定の機能 (CRASH、LOG、TRACE、RUM) についてのプラグインの実装を追加します。プラグインはこの機能の初期化に伴い登録され、機能が停止すると登録解除されます。 |

### ロガーの初期化

ログを Datadog に送信するようにロガーを初期化する際に、`Logger.Builder` の次のメソッドを使用できます。

| メソッド                           | 説明                                                                                                                                                                                                                                                             |
|----------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `setNetworkInfoEnabled(true)`    | すべてのログに `network.client.connectivity` 属性を追加します。デフォルトで記録されるデータには、`connectivity` (`Wifi`、`3G`、`4G`...) と `carrier_name` (`AT&T - US`)です。`carrier_name` は Android API レベル 28 以降でのみ利用できます。                                     |
| `setServiceName(<サービス名>)` | Datadog に送信されるすべてのログに添付される `service` [標準属性][4] の値として `<サービス名>` を設定します。                                                                                                                                                           |
| `setLogcatLogsEnabled(true)`     | Logcat をロガーとして使用するには、`true` とします。                                                                                                                                                                                                                                  |
| `setDatadogLogsEnabled(true)`    | Datadog にログを送信するには、`true` とします。                                                                                                                                                                                                                                  |
| `setBundleWithTraceEnabled(true)`| アプリケーションでアクティブなトレースとログをバンドルするには、`true` (デフォルト) に設定します。このパラメーターにより、Datadog ダッシュボードを使い指定されたトレース中に送信されたすべてのログを表示できます。                                                        |
| `setBundleWithRumEnabled(true)`| アプリケーションで現在の RUM コンテキストとログをバンドルするには、`true` (デフォルト) に設定します。このパラメーターにより、Datadog RUM Explorer 使い指定されたビューがアクティブの間に送信されたすべてのログを表示できます。                                                        |
| `setLoggerName(<ロガー名>)`   | Datadog に送信されるすべてのログに添付される `logger.name` 標準属性の値として `<ロガー名>` を設定します。                                                                                                                                                                  |
| `setSampleRate(<サンプルレート>)`   | このロガーのサンプリングレートを設定します。ロガーインスタンスが生成するすべてのログは、指定されたサンプリングレートに従いランダムにサンプリングされます (デフォルト 1.0 = すべてのログ)。**注**: Logcat ログはサンプリングされません。            |
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

**注意**: `<タグの値>` は文字列でなければなりません。

##### タグを削除

`removeTagsWithKey("<タグキー>")` 関数を使い、指定されたロガーから送信されるすべてのログからタグを削除します。

```kotlin
// これにより "build_type" で始まるすべてのタグが削除されます
logger.removeTagsWithKey("build_type")
```

[Datadog タグに関する詳細][5]。

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

**注**: `<属性の値>` にはプリミティブ、文字列、日付を使用できます。

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

**注**: データが Datadog にアップロードされる前に、アプリケーションのキャッシュディレクトリに平文で保存されます。このキャッシュフォルダは、[Android のアプリケーションサンドボックス][8]によって保護されており、ほとんどのデバイスで、このデータは他のアプリケーションによって読み取られることはありません。しかし、モバイルデバイスがルート化されていたり、誰かが Linux カーネルをいじったりすると、保存されているデータが読めるようになる可能性があります。

## 拡張

### Timber 

既存のコードベースが Timber を使用している場合、[専用ライブラリ](https://github.com/DataDog/dd-sdk-android/tree/master/dd-sdk-android-timber) を使用してすべてのログを自動的に Datadog へ転送できます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-android
[2]: /ja/account_management/api-app-keys/#client-tokens
[3]: /ja/account_management/api-app-keys/#api-keys
[4]: /ja/logs/processing/attributes_naming_convention/
[5]: /ja/tagging/
[6]: /ja/real_user_monitoring/android/?tab=us
[7]: /ja/real_user_monitoring/error_tracking/android/#upload-your-mapping-file
[8]: https://source.android.com/security/app-sandbox