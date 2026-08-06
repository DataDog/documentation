---
further_reading:
- link: /real_user_monitoring/explorer
  tag: ドキュメント
  text: RUM データを Explorer で確認
- link: /real_user_monitoring/guide/mobile-sdk-deprecation-policy
  tag: ドキュメント
  text: Datadog Mobile SDK の廃止方針
title: RUM Mobile SDK のアップグレード
---

## 概要

Mobile RUM、Logs、Trace SDK のメジャーバージョン間を移行する際は、このガイドに従ってください。各 SDK の機能や特長の詳細については、それぞれのドキュメントを参照してください。

## v1 から v2 へ
{{< tabs >}}
{{% tab "Android" %}}

v1 から v2 への移行は、モノリシックな SDK からモジュラー アーキテクチャーへの移行を意味します。RUM、Trace、Logs、Session Replay などがそれぞれ独立したモジュールとなり、必要なものだけをアプリケーションに組み込めます。

SDK v2 は、iOS SDK、Android SDK、その他の Datadog 製品間で API レイアウトと命名規則を統一しています。

SDK v2 により、Android および iOS アプリで [Mobile Session Replay][1] を利用できます。

[1]: /ja/real_user_monitoring/session_replay/mobile/

{{% /tab %}}
{{% tab "iOS" %}}

v1 から v2 への移行は、モノリシックな SDK からモジュラー アーキテクチャーへの移行を意味します。RUM、Trace、Logs、Session Replay などがそれぞれ独立したモジュールとなり、必要なものだけをアプリケーションに組み込めます。

SDK v2 は、iOS SDK、Android SDK、その他の Datadog 製品間で API レイアウトと命名規則を統一しています。

SDK v2 により、Android および iOS アプリで [Mobile Session Replay][1] を利用できます。

[1]: /ja/real_user_monitoring/session_replay/mobile/

{{% /tab %}}
{{% tab "React Native" %}}

v1 から v2 へ移行すると、パフォーマンスが向上します。

{{% /tab %}}
{{% tab "Flutter" %}}

v1 から v2 へ移行すると、パフォーマンスが向上し、v2 ネイティブ SDK が提供する追加機能も利用可能になります。

{{% /tab %}}
{{< /tabs >}}
### モジュール
{{< tabs >}}
{{% tab "Android" %}}

v2 ではアーティファクトがモジュール化されています。以下のアーティファクトを採用してください:

* RUM: `com.datadoghq:dd-sdk-android-rum:x.x.x`
* Logs: `com.datadoghq:dd-sdk-android-logs:x.x.x`
* Trace: `com.datadoghq:dd-sdk-android-trace:x.x.x`
* Session Replay: `com.datadoghq:dd-sdk-android-session-replay:x.x.x`
* WebView Tracking: `com.datadoghq:dd-sdk-android-webview:x.x.x`
* OkHttp instrumentation: `com.datadoghq:dd-sdk-android-okhttp:x.x.x`

**注**: NDK Crash Reporting と WebView Tracking を使用する場合は、それぞれのイベントを RUM と Logs に送信するために RUM および Logs のアーティファクトを追加する必要があります。

`com.datadoghq:dd-sdk-android` アーティファクトは廃止されたため、Gradle ビルド スクリプトからその参照を削除してください。

**注**: 他のすべてのアーティファクトの Maven 座標に変更はありません。

<div class="alert alert-danger">v2 は Android API 19 (KitKat) をサポートしません。サポートされる最小 SDK は API 21 (Lollipop) です。Kotlin 1.7 が必要です。SDK 自体は Kotlin 1.8 でコンパイルされているため、Kotlin 1.6 以下のコンパイラでは SDK クラスのメタデータを読み取れません。</div>

以下のようなエラーが発生した場合:

```
A failure occurred while executing com.android.build.gradle.internal.tasks.CheckDuplicatesRunnable
Duplicate class kotlin.collections.jdk8.CollectionsJDK8Kt found in modules kotlin-stdlib-1.8.10 (org.jetbrains.kotlin:kotlin-stdlib:1.8.10) and kotlin-stdlib-jdk8-1.7.20 (org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.7.20)
```

ビルド スクリプトに以下のルールを追加してください (詳細は関連する [Stack Overflow の issue][2] を参照してください)。

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

SDK のセットアップ例については、[Android サンプル アプリケーション][3] を参照してください。

[2]: https://stackoverflow.com/a/75298544
[3]: https://github.com/DataDog/dd-sdk-android/tree/develop/sample

{{% /tab %}}
{{% tab "iOS" %}}

v2 ではライブラリがモジュール化されています。以下のライブラリを採用してください:

- `DatadogCore`
- `DatadogLogs`
- `DatadogTrace`
- `DatadogSessionReplay`
- `DatadogRUM`
- `DatadogWebViewTracking`

これらは既存の `DatadogCrashReporting` および `DatadogObjc` に加えて取り込む必要があります。

<details>
  <summary>SPM (推奨)</summary>

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

  `Cartfile` はそのままです:
  ```
  github "DataDog/dd-sdk-ios"
  ```

  Xcode では、以下のフレームワークを **必ず** リンクしてください:
  ```
  DatadogInternal.xcframework
  DatadogCore.xcframework
  ```

  次に、使用したいモジュールを選択できます:
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

**注**: Crash Reporting と WebView Tracking を使用する場合は、それぞれのイベントを RUM と Logs に送信するために RUM および Logs のモジュールを追加する必要があります。

{{% /tab %}}

{{% tab "React Native" %}}

package.json 内の `@datadog/mobile-react-native` を更新してください:

```json
"@datadog/mobile-react-native": "2.0.0"
```

iOS の Pod を更新してください:

```bash
(cd ios && bundle exec pod update)
```

`0.67` より新しい React Native バージョンを使用する場合は Java 17 を、`0.67` 以下の場合は Java 11 を使用してください。現在の Java バージョンを確認するには、ターミナルで次のコマンドを実行します:

```bash
java --version
```

### React Native < 0.73 の場合

`android/build.gradle` ファイルで `kotlinVersion` を指定し、Kotlin 依存関係の競合を回避してください:

```groovy
buildscript {
    ext {
        // targetSdkVersion = ...
        kotlinVersion = "1.8.21"
    }
}
```

### React Native < 0.68 の場合

`android/build.gradle` ファイル内で `kotlinVersion` を指定し、Kotlin 依存関係の競合を回避してください:

```groovy
buildscript {
    ext {
        // targetSdkVersion = ...
        kotlinVersion = "1.8.21"
    }
}
```

`android/build.gradle` で `com.android.tools.build:gradle` のバージョンが `5.0` 未満の場合、`android/gradle.properties` ファイルに以下を追加してください:

```properties
android.jetifier.ignorelist=dd-sdk-android-core
```

### トラブルシューティング

#### Android ビルドが `Unable to make field private final java.lang.String java.io.File.path accessible` で失敗する

If your Android build fails with an error like:

```
FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':app:processReleaseMainManifest'.
> Unable to make field private final java.lang.String java.io.File.path accessible: module java.base does not "opens java.io" to unnamed module @1bbf7f0e
```

You are using Java 17, which is not compatible with your React Native version. Switch to Java 11 to solve the issue.

#### Android ビルドが `Unsupported class file major version 61` で失敗する

If your Android build fails with an error like:

```
FAILURE: Build failed with an exception.

* What went wrong:
Could not determine the dependencies of task ':app:lintVitalRelease'.
> Could not resolve all artifacts for configuration ':app:debugRuntimeClasspath'.
   > Failed to transform dd-sdk-android-core-2.0.0.aar (com.datadoghq:dd-sdk-android-core:2.0.0) to match attributes {artifactType=android-manifest, org.gradle.category=library, org.gradle.dependency.bundling=external, org.gradle.libraryelements=aar, org.gradle.status=release, org.gradle.usage=java-runtime}.
      > Execution failed for JetifyTransform: /Users/me/.gradle/caches/modules-2/files-2.1/com.datadoghq/dd-sdk-android-core/2.0.0/a97f8a1537da1de99a86adf32c307198b477971f/dd-sdk-android-core-2.0.0.aar.
         > Failed to transform '/Users/me/.gradle/caches/modules-2/files-2.1/com.datadoghq/dd-sdk-android-core/2.0.0/a97f8a1537da1de99a86adf32c307198b477971f/dd-sdk-android-core-2.0.0.aar' using Jetifier. Reason: IllegalArgumentException, message: Unsupported class file major version 61. (Run with --stacktrace for more details.)
```

Android Gradle Plugin のバージョンが `5.0` 未満です。修正するには、`android/gradle.properties` ファイルに次を追加してください:

```properties
android.jetifier.ignorelist=dd-sdk-android-core
```

#### Android ビルドが `Duplicate class kotlin.collections.jdk8.*` で失敗する

If your Android build fails with an error like:

```
FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':app:checkReleaseDuplicateClasses'.
> A failure occurred while executing com.android.build.gradle.internal.tasks.CheckDuplicatesRunnable
   > Duplicate class kotlin.collections.jdk8.CollectionsJDK8Kt found in modules jetified-kotlin-stdlib-1.8.10 (org.jetbrains.kotlin:kotlin-stdlib:1.8.10) and jetified-kotlin-stdlib-jdk8-1.7.20 (org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.7.20)
     Duplicate class kotlin.internal.jdk7.JDK7PlatformImplementations found in modules jetified-kotlin-stdlib-1.8.10 (org.jetbrains.kotlin:kotlin-stdlib:1.8.10) and jetified-kotlin-stdlib-jdk7-1.7.20 (org.jetbrains.kotlin:kotlin-stdlib-jdk7:1.7.20)
```

You need to set a Kotlin version for your project to avoid clashes among Kotlin dependencies. In your `android/build.gradle` file, specify the `kotlinVersion`:

```groovy
buildscript {
    ext {
        // targetSdkVersion = ...
        kotlinVersion = "1.8.21"
    }
}
```

Alternatively, you can add the following rules to your build script in your `android/app/build.gradle` file:

```groovy
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

{{% /tab %}}
{{% tab "Flutter" %}}

pubspec.yaml の `datadog_flutter_plugin` を更新してください:

```yaml
dependencies:
  'datadog_flutter_plugin: ^2.0.0
```

## トラブルシューティング

### 重複インターフェイス (iOS)

`datadog_flutter_plugin` を v2.0 にアップグレード後、iOS ビルドでこのエラーが表示される場合:

```
Semantic Issue (Xcode): Duplicate interface definition for class 'DatadogSdkPlugin'
/Users/exampleuser/Projects/test_app/build/ios/Debug-iphonesimulator/datadog_flutter_plugin/datadog_flutter_plugin.framework/Headers/DatadogSdkPlugin.h:6:0
```

`flutter clean && flutter pub get` を実行し、再ビルドしてください。通常はこれで問題が解決します。

### 重複クラス (Android)

`datadog_flutter_plugin` を v2.0 にアップグレード後、Android ビルドでこのエラーが表示される場合:

```
FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':app:checkDebugDuplicateClasses'.
> A failure occurred while executing com.android.build.gradle.internal.tasks.CheckDuplicatesRunnable
```

`build.gradle` ファイルで Kotlin バージョンを 1.8 以上に更新していることを確認してください。

{{% /tab %}}

{{< /tabs >}}

### SDK の初期化
{{< tabs >}}
{{% tab "Android" %}}
さまざまなプロダクトを独立したモジュールとして切り出したことにより、SDK の設定はモジュール単位で整理されました。

`com.datadog.android.core.configuration.Configuration.Builder` クラスには以下の変更があります:

* クライアント トークン、環境名、バリアント名 (デフォルト値は空文字列)、サービス名 (デフォルト値はマニフェストから取得したアプリケーション ID) を**コンストラクタ**で指定する必要があります。
* `com.datadog.android.core.configuration.Credentials` クラスは削除されました。
* `logsEnabled`、`tracesEnabled`、`rumEnabled` はコンストラクタから削除され、各プロダクトごとの設定で有効化します (下記参照)。
* `crashReportsEnabled` 引数は削除されました。JVM クラッシュレポートの有効/無効は `Configuration.Builder.setCrashReportsEnabled` メソッドで設定できます。デフォルトでは有効です。
* RUM、Logs、Trace の各プロダクト設定メソッドは `Configuration.Builder` から削除され、個別のプロダクト設定に置き換えられました (下記参照)。

`Datadog.initialize` メソッドの引数から `Credentials` クラスが削除されました。

`com.datadog.android.plugin` パッケージと関連するすべてのクラス/メソッドは削除されました。

### Logs

Logs に関連するクラスは、すべて厳密に `com.datadog.android.log` パッケージ内に集約されています。

Logs プロダクトを使用するには、次のアーティファクトをインポートしてください:

```kotlin
implementation("com.datadoghq:dd-sdk-android-logs:x.x.x")
```

下記スニペットで Logs プロダクトを有効化できます:

```kotlin
val logsConfig = LogsConfiguration.Builder()
    ...
    .build()

Logs.enable(logsConfig)

val logger = Logger.Builder()
    ...
    .build()
```

API 変更点:

|`1.x`|`2.0`|
|---|---|
|`com.datadog.android.core.configuration.Configuration.Builder.setLogEventMapper`|`com.datadog.android.log.LogsConfiguration.Builder.setEventMapper`|
|`com.datadog.android.core.configuration.Configuration.Builder.useCustomLogsEndpoint`|`com.datadog.android.log.LogsConfiguration.Builder.useCustomEndpoint`|
|`com.datadog.android.log.Logger.Builder.setLoggerName`|`com.datadog.android.log.Logger.Builder.setName`|
|`com.datadog.android.log.Logger.Builder.setSampleRate`|`com.datadog.android.log.Logger.Builder.setRemoteSampleRate`|
|`com.datadog.android.log.Logger.Builder.setDatadogLogsEnabled`|このメソッドは削除されました。Datadog へのログ送信を無効にする場合は、`com.datadog.android.log.Logger.Builder.setRemoteSampleRate(0f)` を使用してください。|
|`com.datadog.android.log.Logger.Builder.setServiceName`|`com.datadog.android.log.Logger.Builder.setService`|
|`com.datadog.android.log.Logger.Builder.setDatadogLogsMinPriority`|`com.datadog.android.log.Logger.Builder.setRemoteLogThreshold`|

### Trace

Trace に関連するクラスは、すべて厳密に `com.datadog.android.trace` パッケージ内に集約されています (以前は `com.datadog.android.tracing` 配下にありました)。

Trace プロダクトを使用するには、次のアーティファクトをインポートしてください:

```kotlin
implementation("com.datadoghq:dd-sdk-android-trace:x.x.x")
```

下記スニペットで Trace プロダクトを有効化できます:

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

API 変更点:

|`1.x`|`2.0`|
|---|---|
|`com.datadog.android.core.configuration.Configuration.Builder.setSpanEventMapper`|`com.datadog.android.trace.TraceConfiguration.Builder.setEventMapper`|
|`com.datadog.android.core.configuration.Configuration.Builder.useCustomTracesEndpoint`|`com.datadog.android.trace.TraceConfiguration.Builder.useCustomEndpoint`|
|`com.datadog.android.tracing.AndroidTracer.Builder.setSamplingRate`|`com.datadog.android.trace.AndroidTracer.Builder.setSampleRate`|
|`com.datadog.android.tracing.AndroidTracer.Builder.setServiceName`|`com.datadog.android.trace.AndroidTracer.Builder.setService`|

### RUM

RUM に関連するクラスは、すべて厳密に `com.datadog.android.rum` パッケージ内に集約されています。

RUM プロダクトを使用するには、次のアーティファクトをインポートしてください:

```kotlin
implementation("com.datadoghq:dd-sdk-android-rum:x.x.x")
```

以下のスニペットで RUM プロダクトを有効化できます:

```kotlin
val rumConfig = RumConfiguration.Builder(rumApplicationId)
    ...
    .build()

Rum.enable(rumConfig)
```

API 変更点:

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
|`com.datadog.android.rum.RumMonitor.Builder`|このクラスは削除されました。`Rum.enable` 呼び出し時に RUM モニターが作成および登録されます。|
|`com.datadog.android.rum.RumMonitor.Builder.sampleRumSessions`|`com.datadog.android.rum.RumConfiguration.Builder.setSessionSampleRate`|
|`com.datadog.android.rum.RumMonitor.Builder.setSessionListener`|`com.datadog.android.rum.RumConfiguration.Builder.setSessionListener`|
|`com.datadog.android.rum.RumMonitor.addUserAction`|`com.datadog.android.rum.RumMonitor.addAction`|
|`com.datadog.android.rum.RumMonitor.startUserAction`|`com.datadog.android.rum.RumMonitor.startAction`|
|`com.datadog.android.rum.RumMonitor.stopUserAction`|`com.datadog.android.rum.RumMonitor.stopAction`|
|`com.datadog.android.rum.GlobalRum.registerIfAbsent`|このメソッドは削除されました。`Rum.enable` 呼び出し時に RUM モニターが作成および登録されます。|
|`com.datadog.android.rum.GlobalRum`|`com.datadog.android.rum.GlobalRumMonitor`|
|`com.datadog.android.rum.GlobalRum.addAttribute`|`com.datadog.android.rum.RumMonitor.addAttribute`|
|`com.datadog.android.rum.GlobalRum.removeAttribute`|`com.datadog.android.rum.RumMonitor.removeAttribute`|

### NDK Crash Reporting

アーティファクト名は以前と同じです: `com.datadoghq:dd-sdk-android-ndk:x.x.x`

以下のスニペットで NDK クラッシュレポートを有効化できます:

```kotlin
NdkCrashReports.enable()
```

この設定は `com.datadog.android.core.configuration.Configuration.Builder.addPlugin` 呼び出しを置き換えます。

**注**: NDK クラッシュレポートを RUM と Logs で受信するには、RUM と Logs プロダクトを有効にしておく必要があります。

### WebView Tracking

アーティファクト名は以前と同じです: `com.datadoghq:dd-sdk-android-webview:x.x.x`

以下のスニペットで WebView トラッキングを有効化できます:

```kotlin
WebViewTracking.enable(webView, allowedHosts)
```

**注**: WebView から送信されるイベントを RUM と Logs で受信するには、RUM と Logs プロダクトを有効にしておく必要があります。

API 変更点:

|`1.x`|`2.0`|
|---|---|
|`com.datadog.android.webview.DatadogEventBridge`|このメソッドは `internal` に変更されました。代わりに `WebViewTracking` を使用してください。|
|`com.datadog.android.rum.webview.RumWebChromeClient`|このクラスは削除されました。代わりに `WebViewTracking` を使用してください。|
|`com.datadog.android.rum.webview.RumWebViewClient`|このクラスは削除されました。代わりに `WebViewTracking` を使用してください。|

### OkHttp Tracking

OkHttp トラッキングを使用するには、次のアーティファクトをインポートしてください:

```kotlin
implementation("com.datadoghq:dd-sdk-android-okhttp:x.x.x")
```

OkHttp インスツルメンテーションは、OkHttp クライアントの後に Datadog SDK を初期化できるため、Datadog SDK より前に `com.datadog.android.okhttp.DatadogEventListener`、`com.datadog.android.okhttp.DatadogInterceptor`、`com.datadog.android.okhttp.trace.TracingInterceptor` を作成できます。SDK が初期化されると、OkHttp インスツルメンテーションは Datadog へのイベント送信を開始します。

`com.datadog.android.okhttp.DatadogInterceptor` と `com.datadog.android.okhttp.trace.TracingInterceptor` の両方は、リモート設定システムとの連携によりサンプリングを動的に制御できます。

サンプリングを動的に調整するには、`com.datadog.android.okhttp.DatadogInterceptor`/`com.datadog.android.okhttp.trace.TracingInterceptor` のコンストラクタに `com.datadog.android.core.sampling.Sampler` インターフェイスを実装した独自クラスを渡してください。各リクエストごとにサンプリング判定が行われます。

### `dd-sdk-android-ktx` モジュールの削除

利用する Datadog SDK ライブラリの粒度を高めるため、`dd-sdk-android-ktx` モジュールは削除されました。コードは他のモジュールに分割され、RUM と Trace 向けの拡張メソッドを提供します。

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

### セッション リプレイ

Mobile Session Replay のセットアップと構成については、[Mobile Session Replay のセットアップと構成][4]を参照してください。

[4]: /ja/real_user_monitoring/session_replay/mobile/setup_and_configuration/?tab=android

{{% /tab %}}
{{% tab "iOS" %}}

異なるプロダクトを独立したモジュールに抽出したことにより、SDK の設定はモジュール単位で整理されました。

> SDK は任意のプロダクトを有効化する前に初期化する必要があります。

SDK 初期化の Builder パターンは廃止され、構造体定義に置き換えられました。以下は `1.x` の初期化が `2.0` ではどのようになるかを示す例です。

**V1 の初期化**
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
**V2 の初期化**
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

API 変更点:

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

Logs に関連するクラスは、すべて厳密に `DatadogLogs` モジュールに含まれています。まずこのプロダクトを有効化してください:

```swift
import DatadogLogs

Logs.enable(with: Logs.Configuration(...))
```

次に、ロガー インスタンスを作成できます:

```swift
import DatadogLogs

let logger = Logger.create(
    with: Logger.Configuration(name: "<logger name>")
)
```

API 変更点:

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

Trace に関連するクラスは、すべて厳密に `DatadogTrace` モジュールに含まれています。まずこのプロダクトを有効化してください:

```swift
import DatadogTrace

Trace.enable(
    with: Trace.Configuration(...)
)
```

次に、共有 Tracer インスタンスにアクセスできます:

```swift
import DatadogTrace

let tracer = Tracer.shared()
```

API 変更点:

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

RUM に関連するクラスは、すべて厳密に `DatadogRUM` モジュールに含まれています。まずこのプロダクトを有効化してください:

```swift
import DatadogRUM

RUM.enable(
    with: RUM.Configuration(applicationID: "<RUM Application ID>")
)
```

次に、共有 RUM モニター インスタンスにアクセスできます:

```swift
import DatadogRUM

let monitor = RUMMonitor.shared()
```

API 変更点:

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

### クラッシュレポート

クラッシュ レポートを有効化するには、RUM と Logs を有効化し、それぞれのプロダクトにレポートを送信できるようにしてください。

```swift
import DatadogCrashReporting

CrashReporting.enable()
```

|`1.x`|`2.0`|
|---|---|
|`Datadog.Configuration.Builder.enableCrashReporting()`|`CrashReporting.enable()`|

### WebView Tracking

WebViewTracking を有効化する場合も、RUM と Logs を有効化して、それぞれにイベントを送信できるようにしてください。

```swift
import WebKit
import DatadogWebViewTracking

let webView = WKWebView(...)
WebViewTracking.enable(webView: webView)
```

|`1.x`|`2.0`|
|---|---|
|`WKUserContentController.startTrackingDatadogEvents`|`WebViewTracking.enable(webView:)`|

### セッション リプレイ

Mobile Session Replay のセットアップ方法については [Mobile Session Replay のセットアップと構成][5]を参照してください。

[5]: /ja/real_user_monitoring/session_replay/mobile/setup_and_configuration/?tab=ios

{{% /tab %}}
{{% tab "React Native" %}}

SDK 初期化の変更は不要です。

{{% /tab %}}

{{% tab "Flutter" %}}

## SDK 設定の変更

Datadog のネイティブ SDK のモジュラー化に伴い、一部の設定プロパティが移動またはリネームされました。

以下の構造体がリネームされました:

| `1.x` | `2.x` |
|-------|-------|
| `DdSdkConfiguration` | `DatadogConfiguration` |
| `LoggingConfiguration` | `DatadogLoggingConfiguration` |
| `RumConfiguration` | `DatadogRumConfiguration` |
| `DdSdkExistingConfiguration` | `DatadogAttachConfiguration` |

以下のプロパティが変更されました:

| 1.x | 2.x | 注 |
|-------|-------|-------|
| `DdSdkConfiguration.trackingConsent`| 削除 | `Datadog.initialize` の一部 | |
| `DdSdkConfiguration.customEndpoint` | 削除 | 現在はフィーチャーごとに設定されます | |
| `DdSdkConfiguration.serviceName` | `DatadogConfiguration.service` | |
| `DdSdkConfiguration.logEventMapper` | `DatadogLoggingConfiguration.eventMapper` | |
| `DdSdkConfiguration.customLogsEndpoint` | `DatadogLoggingConfiguration.customEndpoint` | |
| `DdSdkConfiguration.telemetrySampleRate` | `DatadogRumConfiguration.telemetrySampleRate` | |

さらに、以下の API が変更されました:

| 1.x | 2.x | 注 |
|-------|-------|-------|
| `Verbosity` | 削除 | `CoreLoggerLevel` または `LogLevel` を参照してください |
| `DdLogs DatadogSdk.logs` | `DatadogLogging DatadogSdk.logs` | 型が変更されました |
| `DdRum DatadogSdk.rum` | `DatadogRum DatadogSdk.rum` | 型が変更されました
| `Verbosity DatadogSdk.sdkVerbosity` | `CoreLoggerLevel DatadogSdk.sdkVerbosity` |
| `DatadogSdk.runApp` | `DatadogSdk.runApp` | `trackingConsent` パラメーターが追加されました |
| `DatadogSdk.initialize` | `DatadogSdk.initialize` | `trackingConsent` パラメーターが追加されました |
| `DatadogSdk.createLogger` | `DatadogLogging.createLogger` | 移動しました |

## Flutter Web の変更点

Flutter Web を使用するクライアントは、Datadog Browser SDK v5 を使用するように更新してください。`index.html` の import を次のように変更します:

```diff
-  <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/datadog-logs-v4.js"></script>
-  <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/datadog-rum-slim-v4.js"></script>
+  <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/us1/v5/datadog-logs.js"></script>
+  <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/us1/v5/datadog-rum-slim.js"></script>
```

**注**: Datadog はサイトごとに1つの CDN バンドルを提供しています。すべてのサイト URL については [Browser SDK README](https://github.com/DataDog/browser-sdk/#cdn-bundles) を参照してください。

## Logs プロダクトの変更点

v1 と同様に、`DatadogConfiguration.loggingConfiguration` メンバーを設定することで Datadog Logging を有効化できます。ただし v1 と異なり、Datadog はデフォルト ロガーを自動で作成しません。`DatadogSdk.logs` は `DatadogLogging` のインスタンスとなり、これを使用してログを作成できます。多くのオプションは `DatadogLoggerConfiguration` に移動し、開発者が個々のロガーをより細かく制御できるようになりました。

API 変更点

| 1.x | 2.x | 注 |
|-------|-------|-------|
| `LoggingConfiguration` | `DatadogLoggingConfiguration` | 大半のメンバーはリネームされ、`DatadogLoggerConfiguration` に移動しました |
| `LoggingConfiguration.sendNetworkInfo` | `DatadogLoggerConfiguration.networkInfoEnabled` | |
| `LoggingConfiguration.printLogsToConsole` | `DatadogLoggerConfiguration.customConsoleLogFunction` | |
| `LoggingConfiguration.sendLogsToDatadog` | 削除されました。代わりに `remoteLogThreshold` を使用してください | |
| `LoggingConfiguration.datadogReportingThreshold` | `DatadogLoggerConfiguration.remoteLogThreshold` | |
| `LoggingConfiguration.bundleWithRum` | `DatadogLoggerConfiguration.bundleWithRumEnabled` | |
| `LoggingConfiguration.bundleWithTrace` | `DatadogLoggerConfiguration.bundleWithTraceEnabled` | |
| `LoggingConfiguration.loggerName` | `DatadogLoggerConfiguration.name` | |
| `LoggingConfiguration.sampleRate` | `DatadogLoggerConfiguration.remoteSampleRate` | |

## RUM プロダクトの変更点

API 変更点

| 1.x | 2.x | 注 |
|-------|-------|-------|
| `RumConfiguration` | `DatadogRumConfiguration` | 型がリネームされました |
| `RumConfiguration.vitalsUpdateFrequency` | `DatadogRumConfiguration.vitalsUpdateFrequency` | バイタルの更新を無効にするには `null` を設定してください |
| `RumConfiguration.tracingSampleRate` | `DatadogRumConfiguration.traceSampleRate` |
| `RumConfiguration.rumViewEventMapper` | `DatadogRumConfiguration.viewEventMapper` |
| `RumConfiguration.rumActionEventMapper` | `DatadogRumConfiguration.actionEventMapper` |
| `RumConfiguration.rumResourceEventMapper` | `DatadogRumConfiguration.resourceEventMapper` |
| `RumConfiguration.rumErrorEventMapper` | `DatadogRumConfiguration.rumErrorEventMapper` |
| `RumConfiguration.rumLongTaskEventMapper` | `DatadogRumConfiguration.longTaskEventMapper` |
| `RumUserActionType` | `RumActionType` | 型がリネームされました |
| `DdRum.addUserAction` | `DdRum.addAction` | |
| `DdRum.startUserAction` | `DdRum.startAction` | |
| `DdRum.stopUserAction` | `DdRum.stopAction` | |
| `DdRum.startResourceLoading` | `DdRum.startResource` | |
| `DdRum.stopResourceLoading` | `DdRum.stopResource` | |
| `DdRum.stopResourceLoadingWithError` | `DdRum.stopResourceWithError` | |

さらに、イベント マッパーではビュー名を変更できなくなりました。ビューをリネームする場合は、カスタム [`ViewInfoExtractor`](https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/ViewInfoExtractor.html) を使用してください。


{{% /tab %}}

{{< /tabs >}}


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}