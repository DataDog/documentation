---
dependencies:
  - 'https://github.com/DataDog/dd-sdk-android/blob/master/docs/log_collection.md'
description: Android アプリケーションからログを収集する。
further_reading:
  - link: 'https://github.com/DataDog/dd-sdk-android'
    tag: Github
    text: dd-sdk-android ソースコード
  - link: logs/explorer
    tag: ドキュメント
    text: ログの調査方法
kind: ドキュメント
title: Android ログの収集
---
[Datadog の `dd-sdk-android` クライアント側ロギングライブラリ][1]を使用すると、Android アプリケーションから Datadog へログを送信すると共に、次の機能を利用できます。

* Datadog に JSON 形式でネイティブに記録。
* 送信される各ログに `context` およびカスタム属性を追加する。
* Java/Kotlin がキャッチした例外を転送します。
* 実際のクライアント IP アドレスとユーザーエージェントを記録する。
* 自動一括ポストによってネットワークの利用を最適化する。

**注意**: `dd-sdk-android` ライブラリは API レベル 19 (KitKat) 以降のすべてのバージョンの Android に対応しています。

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

2. アプリケーションコンテキストと [Datadog クライアントトークン][2]でライブラリを初期化します。セキュリティ上の理由から、クライアントトークンを使用する必要があります。API キーがクライアント側の Android アプリケーションの APK バイトコードで公開されてしまうため、[Datadog API キー][3]を使用して `dd-sdk-android` ライブラリを構成することはできません。クライアントトークンの設定に関する詳細は、[クライアントトークンに関するドキュメント][2]を参照してください。

    {{< tabs >}}
    {{% tab "US" %}}

```kotlin
class SampleApplication : Application() {
    override fun onCreate() {
        super.onCreate()

        val config = DatadogConfig.Builder("<クライアントトークン>", "<環境名>", "<アプリケーション_ID>")
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

        val config = DatadogConfig.Builder("<クライアントトークン>", "<環境名>", "<アプリケーション_ID>")
                        .useEUEndpoints()
                        .build()
        Datadog.initialize(this, config)
    }
}
```

    {{% /tab %}}
    {{< /tabs >}}

     SDK の現在の状態を表示するユーティリティメソッドもあります。これを使用して、初期化が正しく行われたかを確認できます。

    ```kotlin
        if(Datadog.isInitialized()){
          // ここにあなたのコードを挿入
        }
    ```

     アプリケーションを書く際、開発ログを有効にできます。指定したレベル以上の優先度を持つライブラリ内のすべての内部メッセージが Android の Logcat に記録されます。

    ```kotlin
        Datadog.setVerbosity(Log.INFO)
    ```

3. Android ロガーの構成：

    ```kotlin
    val logger = Logger.Builder()
        .setNetworkInfoEnabled(true)
        .setLogcatLogsEnabled(true)
        .setDatadogLogsEnabled(true)
        .setBundleWithTraceEnabled(true)
        .setLoggerName("<LOGGER_NAME>")
        .build();
    ```

4. 次のいずれかの関数で、カスタムログエントリを Datadog に直接送信します。

    ```kotlin
    logger.d("A debug message.")
    logger.i("Some relevant information ?")
    logger.w("An important warning…")
    logger.e("An error was met!")
    logger.wtf("What a Terrible Failure!")
    ```

   キャッチされた例外はメッセージで送信できます。

    ```kotlin
    try {
        doSomething()
    } catch (e : IOException) {
        logger.e("Error while doing something", e)
    }
    ```

    **注**: すべてのロギングメソッドに Throwable をアタッチすることができます。

5. (任意) - ログメッセージと一緒にマップを提供し、発行されたログに属性を追加します。マップの各エントリーは属性として追加されます。

    ```kotlin
    logger.i("onPageStarted", attributes = mapOf("http.url", url))
    ```

   Java では次のようにします。

    ```java
    Logger.d(
            "onPageStarted",
            null,
            new HashMap<String, Object>() {{
                put("http.url", url);
            }}
    );
    ```

## 高度なロギング

### 初期化

ログを Datadog に送信するようにロガーを初期化する際に、`Logger.Builder` の次のメソッドを使用できます。

| メソッド                           | 説明                                                                                                                                                                                                                                                             |
|----------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `setNetworkInfoEnabled(true)`    | すべてのログに `network.client.connectivity` 属性を追加します。デフォルトで記録されるデータには、`connectivity` (`Wifi`、`3G`、`4G`...) と `carrier_name` (`AT&T - US`)です。`carrier_name` は Android API レベル 28 以降でのみ利用できます。                                     |
| `setServiceName(<サービス名>)` | Datadog に送信されるすべてのログに添付される `service` [標準属性][4] の値として `<サービス名>` を設定します。                                                                                                                                                           |
| `setLogcatLogsEnabled(true)`     | Logcat をロガーとして使用するには、`true` とします。                                                                                                                                                                                                                                  |
| `setDatadogLogsEnabled(true)`    | Datadog にログを送信するには、`true` とします。                                                                                                                                                                                                                                  |
| `setBundleWithTraceEnabled(true)`| アプリケーションでアクティブなトレースとログをバンドルするには、`true` (デフォルト) に設定します。このパラメーターは、Datadog ダッシュボードを使い指定されたトレース中に送信されたすべてのログを表示します。                                                        |
| `setLoggerName(<ロガー名>)`   | Datadog に送信されるすべてのログに添付される `logger.name` 標準属性の値として `<ロガー名>` を設定します。                                                                                                                                                                  |
| `setVerbosity(Log.INFO)`         | ロガーの詳細度を設定します。指定したレベル以上の優先度を持つライブラリ内のすべての内部メッセージがAndroid の Logcat に記録されます。

    ```swift
    Datadog.verbosityLevel = .debug
    ```                                                                                                       |
| `setSampleRate(<サンプルレート>)`   | このロガーのサンプリングレートを設定します。ロガーインスタンスが生成するすべてのログは、指定されたサンプリングレートに従いランダムにサンプリングされます (デフォルト 1.0 = すべてのログ)。**注**: Logcat ログはサンプリングされません。            |
| `addPlugin(DatadogPlugin, Feature)`   | 特定の機能 (CRASH、LOG、TRACE、RUM) についてのプラグインの実装を追加します。プラグインはこの機能の初期化に伴い登録され、機能が停止すると登録解除されます。 |
| `build()`                        | すべてのオプションを設定して新しいロガーインスタンスをビルドします。                                                                                                                                                                                                                       |

### グローバルコンフィギュレーション

指定されたロガーから送信されるすべてのログにタグと属性を追加/削除する関数を以下に記します。

#### グローバルタグ

##### タグを追加

 `addTag("<タグキー>"","タグの値")` 関数を使い、指定されたロガーから送信されるすべてのログにタグを追加します。

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

## 拡張

既存のコードベースが Timber を使用している場合、 [専用ライブラリ](timber_integration.md) を使用してすべてのログを自動的に Datadog へ転送できます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-android
[2]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#client-tokens
[3]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#api-keys
[4]: https://docs.datadoghq.com/ja/logs/processing/attributes_naming_convention/
[5]: https://docs.datadoghq.com/ja/tagging/