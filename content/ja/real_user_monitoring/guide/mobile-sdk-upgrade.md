---
further_reading:
- link: /real_user_monitoring/explorer
  tag: ドキュメント
  text: RUM データを Explorer で確認
title: RUM Mobile SDK のアップグレード
---

## 概要

Mobile RUM、Logs、Trace SDK のメジャーバージョン間で移行するには、このガイドに従ってください。SDK の特徴と機能の詳細については、SDK ドキュメントを参照してください。

## v1 から v2 へ

v1 から v2 への移行は、モノリス SDK からモジュラーアーキテクチャへの移行を意味します。RUM、Trace、Logs、セッションリプレイなどは、それぞれ個別のモジュールを持っており、必要なものだけをアプリケーションにインテグレーションすることができます。

SDK v2 では、iOS SDK、Android SDK、およびその他の Datadog 製品間で、統一された API レイアウトと命名が提供されます。

SDK v2 では、Android および iOS アプリケーションで[モバイルセッションリプレイ][1]を使用することができます。

### モジュール
{{< tabs >}}
{{% tab "Android" %}}

v2 ではアーティファクトがモジュール化されています。以下のアーティファクトを採用してください。

* RUM: `com.datadoghq:dd-sdk-android-rum:x.x.x`
* Logs: `com.datadoghq:dd-sdk-android-logs:x.x.x`
* Trace: `com.datadoghq:dd-sdk-android-trace:x.x.x`
* セッションリプレイ: `com.datadoghq:dd-sdk-android-session-replay:x.x.x`
* WebView Tracking: `com.datadoghq:dd-sdk-android-webview:x.x.x`
* OkHttp インスツルメンテーション: `com.datadoghq:dd-sdk-android-okhttp:x.x.x`

**注**: NDK Crash Reporting と WebView Tracking を使用する場合は、RUM と Logs にそれぞれイベントを報告するために、RUM と Logs のアーティファクトを追加する必要があります。

`com.datadoghq:dd-sdk-android` アーティファクトへの参照は、Gradle ビルドスクリプトから削除する必要があります (このアーティファクトはもう存在しないため)。

**注**: 他のすべてのアーティファクトの Maven 座標は同じままです。

<div class="alert alert-warning">v2 は Android API 19 (KitKat) をサポートしていません。現在サポートされている最小 SDK は API 21 (Lollipop) です。Kotlin 1.7 が必要です。SDK 自体は Kotlin 1.8 でコンパイルされているため、Kotlin 1.6 以下のコンパイラーは SDK クラスのメタデータを読み込むことができません。</div>

次のようなエラーが発生した場合

```
A failure occurred while executing com.android.build.gradle.internal.tasks.CheckDuplicatesRunnable
Duplicate class kotlin.collections.jdk8.CollectionsJDK8Kt found in modules kotlin-stdlib-1.8.10 (org.jetbrains.kotlin:kotlin-stdlib:1.8.10) and kotlin-stdlib-jdk8-1.7.20 (org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.7.20)
```

ビルドスクリプトに以下のルールを追加してください (詳細は関連する [Stack Overflow 問題][2]を参照してください)。

```kotlin
dependencies {
    constraints {
        implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk7:1.8.10") {
            because("kotlin-stdlib-jdk7 is now a part of kotlin-stdlib")
        }
        implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.8.10") {
            because("kotlin-stdlib-jdk8 is now a part of kotlin-stdlib")
        }
    }
}
```

SDK のセットアップ方法の例については、[Android サンプルアプリケーション][3]をご覧ください。

{{% /tab %}}
{{% tab "iOS" %}}

v2 ではライブラリがモジュール化されています。以下のライブラリを採用してください。

- `DatadogCore`
- `DatadogLogs`
- `DatadogTrace`
- `DatadogSessionReplay`
- `DatadogRUM`
- `DatadogWebViewTracking`

これらは既存の `DatadogCrashReporting` と `DatadogObjc` に追加されます。

<details>
  <summary>SPM</summary>

  ```swift
let package = Package(
    ...
    dependencies: [
        .package(url: "https://github.com/DataDog/dd-sdk-ios", from: "2.0.0")
    ],
    targets: [
        .target(
            ...
            dependencies: [
                .product(name: "DatadogCore", package: "dd-sdk-ios"),
                .product(name: "DatadogLogs", package: "dd-sdk-ios"),
                .product(name: "DatadogTrace", package: "dd-sdk-ios"),
                .product(name: "DatadogSessionReplay", package: "dd-sdk-ios"),
                .product(name: "DatadogRUM", package: "dd-sdk-ios"),
                .product(name: "DatadogCrashReporting", package: "dd-sdk-ios"),
                .product(name: "DatadogWebViewTracking", package: "dd-sdk-ios"),
            ]
        ),
    ]
)
  ```

</details>

<details>
  <summary>CocoaPods</summary>

  ```ruby
  pod 'DatadogCore'
  pod 'DatadogLogs'
  pod 'DatadogTrace'
  pod 'DatadogSessionReplay'
  pod 'DatadogRUM'
  pod 'DatadogCrashReporting'
  pod 'DatadogWebViewTracking'
  pod 'DatadogObjc'
  ```
</details>

<details>
  <summary>Carthage</summary>

  `Cartfile` は同じままです。
  ```
  github "DataDog/dd-sdk-ios"
  ```

  Xcode では、以下のフレームワークをリンクする**必要があります**。
  ```
  DatadogInternal.xcframework
  DatadogCore.xcframework
  ```

  次に、使用したいモジュールを選択できます。
  ```
  DatadogLogs.xcframework
  DatadogTrace.xcframework
  DatadogSessionReplay.xcframework
  DatadogRUM.xcframework
  DatadogCrashReporting.xcframework + CrashReporter.xcframework
  DatadogWebViewTracking.xcframework
  DatadogObjc.xcframework
  ```
</details>

**注**: Crash Reporting と WebView Tracking を使用している場合は、RUM と Logs にそれぞれイベントを報告するために、RUM と Logs のモジュールを追加する必要があります。

{{% /tab %}}

{{< /tabs >}}



### SDK の初期化
{{< tabs >}}
{{% tab "Android" %}}
異なる製品を独立したモジュールに抽出することで、SDK 構成はモジュールごとに整理されます。

`com.datadog.android.core.configuration.Configuration.Builder` クラスに以下の変更がありました。

* クライアントトークン、環境変数名、バリアント名 (デフォルト値は空の文字列)、サービス名 (デフォルト値はマニフェストから取得したアプリケーション ID) はコンストラクタで指定する必要があります。
* `com.datadog.android.core.configuration.Credentials` クラスは削除されました。
* `logsEnabled`、`tracesEnabled`、`rumEnabled` はコンストラクタから削除され、個別の製品構成が推奨されます (下記参照)。
* `crashReportsEnabled` コンストラクタ引数が削除されました。JVM クラッシュレポートの有効/無効は `Configuration.Builder.setCrashReportsEnabled` メソッドで設定できます。デフォルトでは、JVM クラッシュレポートは有効になっています。
* RUM、Logs、および Trace 製品構成メソッドが `Configuration.Builder` から削除され、個々の製品構成が推奨されます (下記参照)。

`Datadog.initialize` メソッドの引数リストから `Credentials` クラスが削除されました。

`com.datadog.android.plugin` パッケージと関連するすべてのクラス/メソッドが削除されました。

### Logs

Logs 製品に関連するすべてのクラスは `com.datadog.android.log` パッケージ内に厳密に収められています。

Logs 製品を使用するには、以下のアーティファクトをインポートします。

```kotlin
implementation("com.datadoghq:dd-sdk-android-logs:x.x.x")
```

次のスニペットで Logs 製品を有効にすることができます。

```kotlin
val logsConfig = LogsConfiguration.Builder()
    ...
    .build()

Logs.enable(logsConfig)

val logger = Logger.Builder()
    ...
    .build()
```

API の変更:

|`1.x`|`2.0`|
|---|---|
|`com.datadog.android.core.configuration.Configuration.Builder.setLogEventMapper`|`com.datadog.android.log.LogsConfiguration.Builder.setEventMapper`|
|`com.datadog.android.core.configuration.Configuration.Builder.useCustomLogsEndpoint`|`com.datadog.android.log.LogsConfiguration.Builder.useCustomEndpoint`|
|`com.datadog.android.log.Logger.Builder.setLoggerName`|`com.datadog.android.log.Logger.Builder.setName`|
|`com.datadog.android.log.Logger.Builder.setSampleRate`|`com.datadog.android.log.Logger.Builder.setRemoteSampleRate`|
|`com.datadog.android.log.Logger.Builder.setDatadogLogsEnabled`|このメソッドは削除されました。Datadog へのログ送信を無効にするには、代わりに `com.datadog.android.log.Logger.Builder.setRemoteSampleRate(0f)` を使用してください。|
|`com.datadog.android.log.Logger.Builder.setServiceName`|`com.datadog.android.log.Logger.Builder.setService`|
|`com.datadog.android.log.Logger.Builder.setDatadogLogsMinPriority`|`com.datadog.android.log.Logger.Builder.setRemoteLogThreshold`|

### Trace 

Trace 製品に関連するすべてのクラスは `com.datadog.android.trace` パッケージ内に厳密に収められています (これは、以前の `com.datadog.android.tracing` にあったすべてのクラスが移動したことを意味します)。

Trace 製品を使用するには、以下のアーティファクトをインポートします。

```kotlin
implementation("com.datadoghq:dd-sdk-android-trace:x.x.x")
```

次のスニペットで Trace 製品を有効にすることができます。

```kotlin
val traceConfig = TraceConfiguration.Builder()
    ...
    .build()

Trace.enable(traceConfig)

val tracer = AndroidTracer.Builder()
    ...
    .build()

GlobalTracer.registerIfAbsent(tracer)
```

API の変更:

|`1.x`|`2.0`|
|---|---|
|`com.datadog.android.core.configuration.Configuration.Builder.setSpanEventMapper`|`com.datadog.android.trace.TraceConfiguration.Builder.setEventMapper`|
|`com.datadog.android.core.configuration.Configuration.Builder.useCustomTracesEndpoint`|`com.datadog.android.trace.TraceConfiguration.Builder.useCustomEndpoint`|
|`com.datadog.android.tracing.AndroidTracer.Builder.setSamplingRate`|`com.datadog.android.trace.AndroidTracer.Builder.setSampleRate`|
|`com.datadog.android.tracing.AndroidTracer.Builder.setServiceName`|`com.datadog.android.trace.AndroidTracer.Builder.setService`|

### RUM

RUM 製品に関連するすべてのクラスは `com.datadog.android.rum` パッケージ内に厳密に収められています。

RUM 製品を使用するには、以下のアーティファクトをインポートします。

```kotlin
implementation("com.datadoghq:dd-sdk-android-rum:x.x.x")
```

次のスニペットで RUM 製品を有効にすることができます。

```kotlin
val rumConfig = RumConfiguration.Builder(rumApplicationId)
    ...
    .build()

Rum.enable(rumConfig)
```

API の変更:

|`1.x`|`2.0`|
|---|---|
|`com.datadog.android.core.configuration.Configuration.Builder.setRumViewEventMapper`|`com.datadog.android.rum.RumConfiguration.Builder.setViewEventMapper`|
|`com.datadog.android.core.configuration.Configuration.Builder.setRumResourceEventMapper`|`com.datadog.android.rum.RumConfiguration.Builder.setResourceEventMapper`|
|`com.datadog.android.core.configuration.Configuration.Builder.setRumActionEventMapper`|`com.datadog.android.rum.RumConfiguration.Builder.setActionEventMapper`|
|`com.datadog.android.core.configuration.Configuration.Builder.setRumErrorEventMapper`|`com.datadog.android.rum.RumConfiguration.Builder.setErrorEventMapper`|
|`com.datadog.android.core.configuration.Configuration.Builder.setRumLongTaskEventMapper`|`com.datadog.android.rum.RumConfiguration.Builder.setLongTaskEventMapper`|
|`com.datadog.android.core.configuration.Configuration.Builder.useCustomRumEndpoint`|`com.datadog.android.rum.RumConfiguration.Builder.useCustomEndpoint`|
|`com.datadog.android.event.ViewEventMapper`|`com.datadog.android.rum.event.ViewEventMapper`|
|`com.datadog.android.core.configuration.VitalsUpdateFrequency`|`com.datadog.android.rum.configuration.VitalsUpdateFrequency`|
|`com.datadog.android.core.configuration.Configuration.Builder.trackInteractions`|`com.datadog.android.rum.RumConfiguration.Builder.trackUserInteractions`|
|`com.datadog.android.core.configuration.Configuration.Builder.disableInteractionTracking`|`com.datadog.android.rum.RumConfiguration.Builder.disableUserInteractionTracking`|
|`com.datadog.android.core.configuration.Configuration.Builder.sampleRumSessions`|`com.datadog.android.rum.RumConfiguration.Builder.setSessionSampleRate`|
|`com.datadog.android.core.configuration.Configuration.Builder.sampleTelemetry`|`com.datadog.android.rum.RumConfiguration.Builder.setTelemetrySampleRate`|
|`com.datadog.android.rum.RumMonitor.Builder`|このクラスは削除されました。RUM モニターは、`Rum.enable` コール中に作成および登録されます。|
|`com.datadog.android.rum.RumMonitor.Builder.sampleRumSessions`|`com.datadog.android.rum.RumConfiguration.Builder.setSessionSampleRate`|
|`com.datadog.android.rum.RumMonitor.Builder.setSessionListener`|`com.datadog.android.rum.RumConfiguration.Builder.setSessionListener`|
|`com.datadog.android.rum.RumMonitor.addUserAction`|`com.datadog.android.rum.RumMonitor.addAction`|
|`com.datadog.android.rum.RumMonitor.startUserAction`|`com.datadog.android.rum.RumMonitor.startAction`|
|`com.datadog.android.rum.RumMonitor.stopUserAction`|`com.datadog.android.rum.RumMonitor.stopAction`|
|`com.datadog.android.rum.GlobalRum.registerIfAbsent`|このメソッドは削除されました。RUM モニターは、`Rum.enable` コール中に作成および登録されます。|
|`com.datadog.android.rum.GlobalRum`|`com.datadog.android.rum.GlobalRumMonitor`|
|`com.datadog.android.rum.GlobalRum.addAttribute`|`com.datadog.android.rum.RumMonitor.addAttribute`|
|`com.datadog.android.rum.GlobalRum.removeAttribute`|`com.datadog.android.rum.RumMonitor.removeAttribute`|

### NDK Crash Reporting 

アーティファクト名は以前のままです: `com.datadoghq:dd-sdk-android-ndk:x.x.x`

次のスニペットで NDK Crash Reporting を有効にすることができます。

```kotlin
NdkCrashReports.enable()
```

この構成は `com.datadog.android.core.configuration.Configuration.Builder.addPlugin` コールを置き換えます。

**注**: RUM と Logs でそれぞれ NDK クラッシュレポートを受信するには、RUM と Logs 製品を有効にする必要があります。

### WebView Tracking

アーティファクト名は以前のままです: `com.datadoghq:dd-sdk-android-webview:x.x.x`

次のスニペットで WebView Tracking を有効にすることができます。

```kotlin
WebViewTracking.enable(webView, allowedHosts)
```

**注**: RUM と Logs でそれぞれ WebView からのイベントを受信するには、RUM と Logs 製品を有効にする必要があります。

API の変更:

|`1.x`|`2.0`|
|---|---|
|`com.datadog.android.webview.DatadogEventBridge`|このメソッドは `internal` クラスになりました。代わりに `WebViewTracking` を使用してください。|
|`com.datadog.android.rum.webview.RumWebChromeClient`|このクラスは削除されました。代わりに `WebViewTracking` を使用してください。|
|`com.datadog.android.rum.webview.RumWebViewClient`|このクラスは削除されました。代わりに `WebViewTracking` を使用してください。|

### OkHttp Tracking

OkHttp Tracking を使用するには、以下のアーティファクトをインポートします。

```kotlin
implementation("com.datadoghq:dd-sdk-android-okhttp:x.x.x")
```

OkHttp インスツルメンテーションは、OkHttp クライアントの後に Datadog SDK を初期化することをサポートしているため、Datadog SDK の前に `com.datadog.android.okhttp.DatadogEventListener`、`com.datadog.android.okhttp.DatadogInterceptor`、`com.datadog.android.okhttp.trace.TracingInterceptor`を作成することができます。OkHttp インスツルメンテーションは、Datadog SDK が初期化されると Datadog へのイベント報告を開始します。

`com.datadog.android.okhttp.DatadogInterceptor` と `com.datadog.android.okhttp.trace.TracingInterceptor` により、リモート構成システムとのインテグレーションを通じて、サンプリングを動的に制御することができます。

サンプリングを動的に調整するには、`com.datadog.android.okhttp.DatadogInterceptor`/`com.datadog.android.okhttp.trace.TracingInterceptor` コンストラクタに `com.datadog.android.core.sampling.Sampler` インターフェイスの独自の実装を指定します。これは各リクエストに対してクエリされ、サンプリングの決定を行います。

### `dd-sdk-android-ktx` モジュールの削除

使用する Datadog SDK ライブラリの粒度を改善するために、`dd-sdk-android-ktx` モジュールは削除されました。RUM と Trace 機能の両方の拡張機能メソッドを提供するために、他のモジュール間にコードが分散されます。

| `1.x`                                                                                     | '2.0'                                                                                       | モジュール名                       |
|-------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------|-----------------------------------|
| `com.datadog.android.ktx.coroutine#kotlinx.coroutines.CoroutineScope.launchTraced`        | `com.datadog.android.trace.coroutines#kotlinx.coroutines.CoroutineScope.launchTraced`       | `dd-sdk-android-trace-coroutines` |
| `com.datadog.android.ktx.coroutine#runBlockingTraced`                                     | `com.datadog.android.trace.coroutines#runBlockingTraced`                                    | `dd-sdk-android-trace-coroutines` |
| `com.datadog.android.ktx.coroutine#kotlinx.coroutines.CoroutineScope.asyncTraced`         | `com.datadog.android.trace.coroutines#kotlinx.coroutines.CoroutineScope.asyncTraced`        | `dd-sdk-android-trace-coroutines` |
| `com.datadog.android.ktx.coroutine#kotlinx.coroutines.Deferred<T>.awaitTraced`            | `com.datadog.android.trace.coroutines#kotlinx.coroutines.Deferred<T>.awaitTraced`           | `dd-sdk-android-trace-coroutines` |
| `com.datadog.android.ktx.coroutine#withContextTraced`                                     | `com.datadog.android.trace.coroutines#withContextTraced`                                    | `dd-sdk-android-trace-coroutines` |
| `com.datadog.android.ktx.coroutine.CoroutineScopeSpan`                                    | `com.datadog.android.trace.coroutines.CoroutineScopeSpan`                                   | `dd-sdk-android-trace-coroutines` |
| `com.datadog.android.ktx.sqlite#android.database.sqlite.SQLiteDatabase.transactionTraced` | `com.datadog.android.trace.sqlite#android.database.sqlite.SQLiteDatabase.transactionTraced` | `dd-sdk-android-trace`            |
| `com.datadog.android.ktx.tracing#io.opentracing.Span.setError`                            | `com.datadog.android.trace#io.opentracing.Span.setError`                                    | `dd-sdk-android-trace`            |
| `com.datadog.android.ktx.tracing#withinSpan`                                              | `com.datadog.android.trace#withinSpan`                                                      | `dd-sdk-android-trace`            |
| `com.datadog.android.ktx.coroutine#sendErrorToDatadog`                                    | `com.datadog.android.rum.coroutines#sendErrorToDatadog`                                     | `dd-sdk-android-rum-coroutines`   |
| `com.datadog.android.ktx.rum#java.io.Closeable.useMonitored`                              | `com.datadog.android.rum#java.io.Closeable.useMonitored`                                    | `dd-sdk-android-rum`              |
| `com.datadog.android.ktx.rum#android.content.Context.getAssetAsRumResource`               | `com.datadog.android.rum.resource#android.content.Context.getAssetAsRumResource`            | `dd-sdk-android-rum`              |
| `com.datadog.android.ktx.rum#android.content.Context.getRawResAsRumResource`              | `com.datadog.android.rum.resource#android.content.Context.getRawResAsRumResource`           | `dd-sdk-android-rum`              |
| `com.datadog.android.ktx.rum#java.io.InputStream.asRumResource`                           | `com.datadog.android.rum.resource#java.io.InputStream.asRumResource`                        | `dd-sdk-android-rum`              |
| `com.datadog.android.ktx.tracing#okhttp3.Request.Builder.parentSpan`                      | `com.datadog.android.okhttp.trace#okhttp3.Request.Builder.parentSpan`                       | `dd-sdk-android-okhttp`           |

### セッションリプレイ

モバイルセッションリプレイのセットアップ方法については、[モバイルセッションリプレイのセットアップと構成][4]を参照してください。

[4]: /ja/real_user_monitoring/session_replay/mobile/setup_and_configuration/?tab=android

{{% /tab %}}
{{% tab "iOS" %}}

異なる製品を独立したモジュールに抽出することで、SDK 構成はモジュールごとに整理されます。

> 製品を有効にする前に、SDK を初期化する必要があります。

SDK 初期化の Builder パターンは削除され、構造定義が推奨されます。次の例は `1.x` の初期化が `2.0` でどのように変換されるかを示しています。

**V1 初期化**
```swift
import Datadog

Datadog.initialize(
    appContext: .init(),
    trackingConsent: .granted,
    configuration: Datadog.Configuration
        .builderUsing(
            clientToken: "<client token>",
            environment: "<environment>"
        )
        .set(serviceName: "<service name>")
        .build()
```
**V2 初期化**
```swift
import DatadogCore

Datadog.initialize(
    with: Datadog.Configuration(
        clientToken: "<client token>",
        env: "<environment>",
        service: "<service name>"
    ), 
    trackingConsent: .granted
)
```

API の変更:

|`1.x`|`2.0`|
|---|---|
|`Datadog.Configuration.Builder.set(serviceName:)`|`Datadog.Configuration.service`|
|`Datadog.Configuration.Builder.set(batchSize:)`|`Datadog.Configuration.batchSize`|
|`Datadog.Configuration.Builder.set(uploadFrequency:)`|`Datadog.Configuration.uploadFrequency`|
|`Datadog.Configuration.Builder.set(proxyConfiguration:)`|`Datadog.Configuration.proxyConfiguration`|
|`Datadog.Configuration.Builder.set(encryption:)`|`Datadog.Configuration.encryption`|
|`Datadog.Configuration.Builder.set(serverDateProvider:)`|`Datadog.Configuration.serverDateProvider`|
|`Datadog.AppContext(mainBundle:)`|`Datadog.Configuration.bundle`|

### Logs

Logs に関連するすべてのクラスは `DatadogLogs` モジュール内に厳密に収められています。まず、製品を有効にする必要があります。

```swift
import DatadogLogs

Logs.enable(with: Logs.Configuration(...))
```

次に、ロガーインスタンスを作成できます。

```swift
import DatadogLogs

let logger = Logger.create(
    with: Logger.Configuration(name: "<logger name>")
)
```

API の変更:

|`1.x`|`2.0`|
|---|---|
|`Datadog.Configuration.Builder.setLogEventMapper(_:)`|`Logs.Configuration.eventMapper`|
|`Datadog.Configuration.Builder.set(loggingSamplingRate:)`|`Logs.Configuration.eventMapper`|
|`Logger.Builder.set(serviceName:)`|`Logger.Configuration.service`|
|`Logger.Builder.set(loggerName:)`|`Logger.Configuration.name`|
|`Logger.Builder.sendNetworkInfo(_:)`|`Logger.Configuration.networkInfoEnabled`|
|`Logger.Builder.bundleWithRUM(_:)`|`Logger.Configuration.bundleWithRumEnabled`|
|`Logger.Builder.bundleWithTrace(_:)`|`Logger.Configuration.bundleWithTraceEnabled`|
|`Logger.Builder.sendLogsToDatadog(false)`|`Logger.Configuration.remoteSampleRate = 0`|
|`Logger.Builder.set(datadogReportingThreshold:)`|`Logger.Configuration.remoteLogThreshold`|
|`Logger.Builder.printLogsToConsole(_:, usingFormat)`|`Logger.Configuration.consoleLogFormat`|

### Trace

Trace に関連するすべてのクラスは `DatadogTrace` モジュール内に厳密に収められています。まず、製品を有効にする必要があります。

```swift
import DatadogTrace

Trace.enable(
    with: Trace.Configuration(...)
)
```

次に、共有された Tracer インスタンスにアクセスできます。

```swift
import DatadogTrace

let tracer = Tracer.shared()
```

API の変更:

|`1.x`|`2.0`|
|---|---|
|`Datadog.Configuration.Builder.trackURLSession(_:)`|`Trace.Configuration.urlSessionTracking`|
|`Datadog.Configuration.Builder.setSpanEventMapper(_:)`|`Trace.Configuration.eventMapper`|
|`Datadog.Configuration.Builder.set(tracingSamplingRate:)`|`Trace.Configuration.sampleRate`|
|`Tracer.Configuration.serviceName`|`Trace.Configuration.service`|
|`Tracer.Configuration.sendNetworkInfo`|`Trace.Configuration.networkInfoEnabled`|
|`Tracer.Configuration.globalTags`|`Trace.Configuration.tags`|
|`Tracer.Configuration.bundleWithRUM`|`Trace.Configuration.bundleWithRumEnabled`|
|`Tracer.Configuration.samplingRate`|`Trace.Configuration.sampleRate`|

### RUM

RUM に関連するすべてのクラスは `DatadogRUM` モジュール内に厳密に収められています。まず、製品を有効にする必要があります。

```swift
import DatadogRUM

RUM.enable(
    with: RUM.Configuration(applicationID: "<RUM Application ID>")
)
```

次に、共有された RUM モニターインスタンスにアクセスできます。

```swift
import DatadogRUM

let monitor = RUMMonitor.shared()
```

API の変更:

|`1.x`|`2.0`|
|---|---|
|`Datadog.Configuration.Builder.trackURLSession(_:)`|`RUM.Configuration.urlSessionTracking`|
|`Datadog.Configuration.Builder.set(rumSessionsSamplingRate:)`|`RUM.Configuration.sessionSampleRate`|
|`Datadog.Configuration.Builder.onRUMSessionStart`|`RUM.Configuration.onSessionStart`|
|`Datadog.Configuration.Builder.trackUIKitRUMViews(using:)`|`RUM.Configuration.uiKitViewsPredicate`|
|`Datadog.Configuration.Builder.trackUIKitRUMActions(using:)`|`RUM.Configuration.uiKitActionsPredicate`|
|`Datadog.Configuration.Builder.trackRUMLongTasks(threshold:)`|`RUM.Configuration.longTaskThreshold`|
|`Datadog.Configuration.Builder.setRUMViewEventMapper(_:)`|`RUM.Configuration.viewEventMapper`|
|`Datadog.Configuration.Builder.setRUMResourceEventMapper(_:)`|`RUM.Configuration.resourceEventMapper`|
|`Datadog.Configuration.Builder.setRUMActionEventMapper(_:)`|`RUM.Configuration.actionEventMapper`|
|`Datadog.Configuration.Builder.setRUMErrorEventMapper(_:)`|`RUM.Configuration.errorEventMapper`|
|`Datadog.Configuration.Builder.setRUMLongTaskEventMapper(_:)`|`RUM.Configuration.longTaskEventMapper`|
|`Datadog.Configuration.Builder.setRUMResourceAttributesProvider(_:)`|`RUM.Configuration.urlSessionTracking.resourceAttributesProvider`|
|`Datadog.Configuration.Builder.trackBackgroundEvents(_:)`|`RUM.Configuration.trackBackgroundEvents`|
|`Datadog.Configuration.Builder.trackFrustrations(_:)`|`RUM.Configuration.frustrationsTracking`|
|`Datadog.Configuration.Builder.set(mobileVitalsFrequency:)`|`RUM.Configuration.vitalsUpdateFrequency`|
|`Datadog.Configuration.Builder.set(sampleTelemetry:)`|`RUM.Configuration.telemetrySampleRate`|

### Crash Reporting

Crash Reporting を有効にするには、RUM と Logs を有効にして、これらの製品それぞれに報告するようにしてください。

```swift
import DatadogCrashReporting

CrashReporting.enable()
```

|`1.x`|`2.0`|
|---|---|
|`Datadog.Configuration.Builder.enableCrashReporting()`|`CrashReporting.enable()`|

### WebView Tracking 

WebViewTracking を有効にするには、RUM と Logs も有効にして、これらの製品それぞれに報告するようにしてください。

```swift
import WebKit
import DatadogWebViewTracking

let webView = WKWebView(...)
WebViewTracking.enable(webView: webView)
```

|`1.x`|`2.0`|
|---|---|
|`WKUserContentController.startTrackingDatadogEvents`|`WebViewTracking.enable(webView:)`|

### セッションリプレイ

モバイルセッションリプレイのセットアップ方法については、[モバイルセッションリプレイのセットアップと構成][5]を参照してください。

[5]: /ja/real_user_monitoring/session_replay/mobile/setup_and_configuration/?tab=ios

{{% /tab %}}
{{< /tabs >}}


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/session_replay/mobile/
[2]: https://stackoverflow.com/a/75298544
[3]: https://github.com/DataDog/dd-sdk-android/sample