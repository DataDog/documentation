---
description: RUM、Logs、およびトレースモバイル SDK のメジャーバージョンアップグレードにおける、変更の分割と新機能に関する移行ガイド。
further_reading:
- link: /real_user_monitoring/explorer
  tag: ドキュメント
  text: エクスプローラーで RUM データを視覚化する
- link: /real_user_monitoring/guide/mobile-sdk-deprecation-policy
  tag: ドキュメント
  text: Datadog Mobile SDK の廃止方針
title: RUM モバイル SDK をアップグレードする
---
## 概要 {#overview}

モバイル RUM、Logs、トレース SDK のメジャーバージョン間を移行する際は、このガイドに従ってください。各 SDK の機能や特長の詳細については、それぞれのドキュメントを参照してください。


**最も一般的な移行**:
- [**v2 〜 v3**](#from-v2-to-v3): Open Tracing の削除と API の更新に重点を置く
- [**v1 〜 v2**](#from-v1-to-v2): モジュール設計への主要なアーキテクチャ変更

## v2 〜 v3 {#from-v2-to-v3}
{{< tabs >}}
{{% tab "Android" %}}

バージョン 2 からバージョン 3 への移行では、従来の Open Tracing プロジェクトのサポートを削除し、SDK の安定性と一貫性を向上させることに重点を置いています。

{{% /tab %}}

{{% tab "iOS" %}}

v2 から v3 への移行では、モジュールの合理化、デフォルト設定の洗練、および製品機能全体の信頼性向上に重点を置いています。

すべての SDK 製品 (RUM、トレース、Logs、Session Replay など) は引き続きモジュール化され、個別のライブラリに分離されます。主な変更点は、`DatadogObjc` モジュールが削除され、そのコンテンツが対応する製品モジュールに統合されたことです。

{{% /tab %}}

{{% tab "React Native" %}}

v2 から v3 への移行では、構成を v3 のモジュール式 SDK の動作に合わせ、`CoreConfiguration`、`RumConfiguration`、`LogsConfiguration`、および `TraceConfiguration` における構成の所有権を統合することに重点を置いています。

変更点の全リストについては、公式 React Native リポジトリの [MIGRATION.md ガイド][1] をお読みください。

<div class="alert alert-warning">
<strong>重要:</strong> v2.x (SDK の初期化時にすべての機能モジュールが常に有効になっていた) とは異なり、v3 では機能モジュールの設定を明示的に渡さない限りその機能モジュールは初期化または有効化<strong>されません</strong>。
</div>

[1]: https://github.com/DataDog/dd-sdk-reactnative/blob/develop/MIGRATION.md

{{% /tab %}}
{{< /tabs >}}

### モジュール {#modules}
{{< tabs >}}
{{% tab "Android" %}}

<div class="alert alert-danger">
Datadog は、Google の <a href="https://developer.android.com/jetpack/androidx/versions#version-table">AndroidX ライブラリバージョンポリシー</a>に従って <code>AndroidX</code> ライブラリにかかわっているため、SDK v3 でサポートされる最小 Android API レベルは <code>23</code>です。
</div>

**要件**:
- Kotlin 1.9 が必須
- `Open Tracing` 依存関係は廃止されたため削除済み


{{% /tab %}}

{{% tab "iOS" %}}

v3 でライブラリは引き続きモジュール化されています。以下のライブラリを採用してください。

- `DatadogCore`
- `DatadogCrashReporting`
- `DatadogLogs`
- `DatadogRUM`
- `DatadogSessionReplay`
- `DatadogTrace`
- `DatadogWebViewTracking`

<details>
  <summary>SPM (推奨)</summary>

  ```swift
let package = Package(
    ...
    dependencies: [
        .package(url: "https://github.com/DataDog/dd-sdk-ios", from: "3.0.0")
    ],
    targets: [
        .target(
            ...
            dependencies: [
                .product(name: "DatadogCore", package: "dd-sdk-ios"),
                .product(name: "DatadogCrashReporting", package: "dd-sdk-ios"),
                .product(name: "DatadogLogs", package: "dd-sdk-ios"),
                .product(name: "DatadogRUM", package: "dd-sdk-ios"),
                .product(name: "DatadogSessionReplay", package: "dd-sdk-ios"),
                .product(name: "DatadogTrace", package: "dd-sdk-ios"),
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
  pod 'DatadogCrashReporting'
  pod 'DatadogLogs'
  pod 'DatadogRUM'
  pod 'DatadogSessionReplay'
  pod 'DatadogTrace'
  pod 'DatadogWebViewTracking'
  ```
</details>

<details>
  <summary>Carthage</summary>

`Cartfile` は変更されません。
  ```
  github "DataDog/dd-sdk-ios"
  ```

Xcode では、以下のフレームワークを **必ず** リンクしてください。
  ```
  DatadogInternal.xcframework
  DatadogCore.xcframework
  ```

その後、使用するモジュールを選択できます。
  ```
  DatadogCrashReporting.xcframework
  DatadogLogs.xcframework
  DatadogRUM.xcframework
  DatadogSessionReplay.xcframework
  DatadogTrace.xcframework
  DatadogWebViewTracking.xcframework
  ```
</details>

{{% /tab %}}

{{% tab "React Native" %}}

推奨されるアップグレード手順および必要な依存関係の更新については、公式 React Native リポジトリの [MIGRATION.md ガイド][1] を参照してください。

<div class="alert alert-warning">
<strong>重要:</strong> v3 では、機能モジュールは初期化中にその構成を渡した場合にのみ有効になります (例: RUM / Logs / Trace)。機能設定を省略した場合、その機能は初期化も有効化もされません。
</div>

[1]: https://github.com/DataDog/dd-sdk-reactnative/blob/develop/MIGRATION.md

{{% /tab %}}

{{< /tabs >}}

### 必要な変更と API の更新 {#required-changes-and-api-updates}
{{< tabs >}}
{{% tab "Android" %}}

### コア {#core}

<div class="alert alert-info">
<strong>必要なアクション:</strong> SDK v3 では、ユーザー情報 ID が必須となり、 <code>null</code> 値は提供できなくなりました。
</div>

API 変更点:

| `2.x`                                                         | `3.0`                                                              |
|---------------------------------------------------------------|--------------------------------------------------------------------|
| `Datadog.setUserInfo(null, "Jane Smith", "jane@example.com")` | `Datadog.setUserInfo("user123", "Jane Smith", "jane@example.com")` |

### RUM {#rum}

RUM モジュールに軽微な改善を行いました。コードに大きな変更を加える必要はありませんが、冗長なパラメーターをリファクタリングできるか確認することをお勧めします。

`useCustomEndpoint` メソッドで提供される URL は、完全なエンドポイント URL
(`https://example.com/rum/upload`) でなければならず、ホスト名のみでは不十分です。

```kotlin
Rum.enable(
  RumConfiguration.Builder(...)
      .useCustomEndpoint("https://example.com/rum/upload")
      .build()
)
```

API 変更点:

| `2.x`                                                                               | `3.0`                                                                                |
|-------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------|
| `DatadogRumMonitor.startResource(String, String, String,Map<String, Any?>)`         | `method` パラメーターとして `RumHttpMethod` を受け取る `startResource` メソッドを使用します |
| `com.datadog.android.rum.GlobalRum`                                                 | `GlobalRum` オブジェクトは `com.datadog.android.rum.GlobalRumMonitor`         | に名前が変更されました
| `com.datadog.android.rum.RumMonitor.addAction()`                                    | パラメーター `attributes: Map<String, Any?>` はオプションです                                |
| `com.datadog.android.rum.RumMonitor.startAction()`                                  | パラメーター `attributes: Map<String, Any?>` はオプションです                                |
| `com.datadog.android.rum.RumMonitor.stopResource()`                                 | パラメーター `attributes: Map<String, Any?>` はオプションです                                |
| `com.datadog.android.rum.RumMonitor.addError()`                                     | パラメーター `attributes: Map<String, Any?>` はオプションです                                |
| `com.datadog.android.rum.RumMonitor.addErrorWithStacktrace()`                       | パラメーター `attributes: Map<String, Any?>` はオプションです                                |
| `com.datadog.android.rum.internal.monitor.AdvancedNetworkRumMonitor.stopResource()` | パラメーター `attributes: Map<String, Any?>` はオプションです                                |
| `com.datadog.android.rum.internal.monitor.AdvancedNetworkRumMonitor.stopResource()` | パラメーター `attributes: Map<String, Any?>` はオプションです                                |

### ログ {#logs}

Logs 製品は、致命的なエラーを報告しなくなりました。クラッシュの Error Tracking を有効にするには、RUM と組み合わせてクラッシュレポートを有効にする必要があります。

`useCustomEndpoint` メソッドで提供される URL は、完全なエンドポイント URL
(`https://example.com/logs/upload`) でなければならず、ホスト名のみでは不十分です。

```kotlin
Logs.enable(
  LogsConfiguration.Builder()
      .useCustomEndpoint("https://example.com/logs/upload")
      .build()
)
```

### トレース {#trace}

`useCustomEndpoint` メソッドで提供される URL は、完全なエンドポイント URL
(例: `https://example.com/trace/upload`) でなければならず、ホスト名のみでは不十分です。例:

```kotlin
Trace.enable(
  TraceConfiguration.Builder()
      .useCustomEndpoint(`https://example.com/trace/upload`)
      .build()
)
```

[`Open Tracing`](https://opentracing.io/)プロジェクトはアーカイブ済みとしてマークされており、サポートは終了しています。`Open Tracing` への依存関係は、SDK v3 から削除されました。

Datadog SDK はすでに [`Open Telemetry`](https://opentelemetry.io/) をサポートしており、これがトレース機能 API を使用するための推奨方法です。

**注**: `Open Telemetry` 仕様ライブラリは、[ < 26 のプロジェクトに対して ](https://github.com/open-telemetry/opentelemetry-java?tab=readme-ov-file#requirements)desugaring`minSdk` を有効にする必要があります。

#### `Open Tracing` から `Open Telemetry` へのトレース移行 (推奨) {#migrating-tracing-from-open-tracing-to-open-telemetry-recommended}

1. `build.gradle.kts` に `Open Telemetry` 依存関係を追加する:

```kotlin
implementation(project("com.datadoghq:dd-sdk-android-trace-otel:x.x.x"))
```

2. `Open Tracing` 構成を置き換える:

```kotlin
GlobalTracer.registerIfAbsent(
  AndroidTracer.Builder()
    .setService(BuildConfig.APPLICATION_ID)
    .build()
)
```

`Open Telemetry` 構成:

```kotlin
GlobalOpenTelemetry.set(
  DatadogOpenTelemetry(BuildConfig.APPLICATION_ID)
)
```

手動 (カスタム) トレースでトレーサーオブジェクトにアクセスするには、`io.opentracing.util.GlobalTracer.get()` の代わりに `io.opentelemetry.api.GlobalOpenTelemetry.get()` を使用します。
例:

```kotlin
val tracer: Tracer = GlobalOpenTelemetry
  .get()
  .getTracer("SampleApplicationTracer")

val span = tracer
  .spanBuilder("Executing operation")
  .startSpan()

// Code that should be instrumented

span.end()
```

詳細は公式の `Open Telemetry` [ドキュメント](https://opentelemetry.io/docs/)を参照してください。

#### `Open Tracing` から `DatadogTracing` へのトレース移行 (移行期間) {#migrating-tracing-from-open-tracing-to-datadogtracing-transition-period}

<div class="alert alert-danger">このオプションは、互換性のため、および Open Tracing から Open Telemetry への移行を簡素化するために追加されましたが、将来のメジャーリリースでは利用できなくなる可能性があります。Datadog は、トレースタスクの標準として Open Telemetry を使用することを推奨しています。ただし、なんらかの理由でプロジェクトの desugaring を有効にできない場合は、この方法を使用できます。</div>
`Open Tracing` 構成を置き換える:

```kotlin
GlobalTracer.registerIfAbsent(
  AndroidTracer.Builder()
    .setService(BuildConfig.APPLICATION_ID)
    .build()
)
```

`DatadogTracing` 構成:

```kotlin
GlobalDatadogTracer.registerIfAbsent(
  DatadogTracing.newTracerBuilder()
    .build()
)
```

手動 (カスタム) トレースでトレーサーオブジェクトにアクセスするには、`io.opentracing.util.GlobalTracer.get()` の代わりに `com.datadog.android.trace.GlobalDatadogTracer.get()` を使用します。
例:

```kotlin
val tracer = GlobalDatadogTracer.get()

val span = tracer
  .buildSpan("Executing operation")
  .start()

// Code that should be instrumented

span.finish()
```
詳細は Datadog [ドキュメント](https://docs.datadoghq.com/ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/android?tab=kotlin) を参照してください。

API 変更点:

| `2.x`                                     | `3.0` `Open Telemetry`                     | `3.0` `Datadog API`                                     |
|-------------------------------------------|--------------------------------------------|---------------------------------------------------------|
| `io.opentracing.util.GlobalTracer`        | `io.opentelemetry.api.GlobalOpenTelemetry` | `com.datadog.android.trace.GlobalDatadogTracer`         |
| `com.datadog.android.trace.AndroidTracer` | `io.opentelemetry.api.trace.Tracer`        | `com.datadog.android.trace.api.tracer.DatadogTracer`    |
| `io.opentracing.Span`                     | `io.opentelemetry.api.trace.Span`          | `com.datadog.android.trace.api.span.DatadogSpan`        |
| `io.opentracing.Scope`                    | `io.opentelemetry.context.Scope`           | `com.datadog.android.trace.api.scope.DatadogScope`      |
| `io.opentracing.SpanContext`              | `io.opentelemetry.api.trace.SpanContext`   | `com.datadog.android.trace.api.span.DatadogSpanContext` |

置き換えのヒント:

| `2.x`                                         | `3.0` `Open Telemetry`                                | `3.0` `Datadog API`                               |
|-----------------------------------------------|-------------------------------------------------------|---------------------------------------------------|
| `AndroidTracer.Builder().build()`             |                                                       | `DatadogTracing.newTracerBuilder().build()`       |
| `AndroidTracer.setPartialFlushThreshold(Int)` | `OtelTracerProvider.setPartialFlushThreshold()`       | `DatadogTracerBuilder.withPartialFlushMinSpans()` |
| `io.opentracing.SpanContext.toTraceId()`      | `io.opentelemetry.api.trace.SpanContext.getTraceId()` | `DatadogSpanContext.traceId.toString()`           |
| `io.opentracing.Span.setError()`              | `io.opentelemetry.api.trace.recordException()`        | `DatadogSpan.addThrowable()`                      |

### OkHttp インスツルメンテーション {#okhttp-instrumentation}

OkHttp インスツルメンテーション (`com.datadoghq:dd-sdk-android-okhttp:x.x.x`) は desugaring サポートを必要としません。ただし、いくつかの移行アクションが必要になる場合があります。

API 変更点:

| `2.x`                                                                                                                                  | `3.0`                                       |
|----------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------|
| `TracingInterceptor(String, List<String>, TracedRequestListener,Sampler<Span>)`                                                        | 代わりに `TracingInterceptor.Builder()` を使用してください。|
| `TracingInterceptor(String?,Map<String, Set<TracingHeaderType>>, TracedRequestListener, Sampler<Span>)`                                | 代わりに `TracingInterceptor.Builder()` を使用してください。|
| `TracingInterceptor(String?,TracedRequestListener,Sampler<Span>)`                                                                      | 代わりに `TracingInterceptor.Builder()` を使用してください。|
| `DatadogInterceptor(String?, Map<String, Set<TracingHeaderType>>,TracedRequestListener, RumResourceAttributesProvider, Sampler<Span>)` | 代わりに `DatadogInterceptor.Builder()` を使用してください。|
| `DatadogInterceptor(String?,List<String>,TracedRequestListener,RumResourceAttributesProvider,Sampler<Span>)`                           | 代わりに `DatadogInterceptor.Builder()` を使用してください。|
| `DatadogInterceptor(String?,TracedRequestListener,RumResourceAttributesProvider,Sampler<Span>) `                                       | 代わりに `DatadogInterceptor.Builder()` を使用してください。|


### Session Replay {#session-replay}

`useCustomEndpoint` メソッドで提供される URL は、完全なエンドポイント URL
(例: `https://example.com/session_replay/upload`) でなければならず、ホスト名のみでは不十分です。例:

```kotlin
SessionReplay.enable(
  SessionReplayConfiguration.Builder(...)
      .useCustomEndpoint("https://example.com/session_replay/upload")
      .build()
)
```

{{% /tab %}}
{{% tab "iOS" %}}

SDK は、アプリのライフサイクルのできる限り早い段階、具体的には `AppDelegate` の `application(_:didFinishLaunchingWithOptions:)` コールバックで初期化する必要があります。これにより、アプリケーションの起動時間を含むすべてのメトリクスを正確に測定できます。SwiftUI で構築されたアプリの場合は、`@UIApplicationDelegateAdaptor` を使用して `AppDelegate` にアクセスします。

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

**注**: SDK を他の場所 (ビューの読み込み中など) で初期化すると、特にアプリ起動時のパフォーマンスでテレメトリが不正確になったり欠落したりする可能性があります。

<div class="alert alert-info">
<strong>必須アクション:</strong> ユーザー情報を設定するための API には <code>id</code> パラメータが必要で、これは 2.x ではオプションでした。
</div>

| `2.x`                               | `3.0`                              |
|-------------------------------------|------------------------------------|
| `Datadog.setUserInfo(id: nil, name: "Jane Smith", email: "jane@example.com")` | `Datadog.setUserInfo(id: "user123", name: "Jane Smith", email: "jane@example.com")` |

### RUM {#rum-1}

RUM 表示レベルの属性は、リソース、ユーザーアクション、エラー、ロングタスクなど、関連するすべての子イベントに自動的に伝播されます。これにより、イベント間で一貫したメタデータが確保され、Datadog ダッシュボードでのデータのフィルタリングや関連付けが容易になります。

表示レベルの属性をより効果的に管理するために、新しい API が追加されました。
- `Monitor.addViewAttribute(forKey:value:)`
- `Monitor.addViewAttributes(_:)`
- `Monitor.removeViewAttribute(forKey:)`
- `Monitor.removeViewAttributes(forKeys:)`

その他の注目すべき変更点:
- すべての Objective-C RUM API が `DatadogRUM` に含まれます。個別の `DatadogObjc` モジュールは使用できなくなりました。
- App Hangs および Watchdog による終了は、アプリ拡張機能やウィジェットから報告されなくなりました。
- 新しいプロパティ `trackMemoryWarnings` が `RUM.Configuration` に追加され、メモリ警告が RUM エラーとして報告されるようになりました。

API 変更点:

|`2.x`|`3.0`|
|---|---|
|-|`RUM.Configuration.trackMemoryWarnings`|
|`RUMView(path:attributes:)`|`RUMView(name:attributes:isUntrackedModal:)`|
|-|`Monitor.addViewAttribute(forKey:value:)`|
|-|`Monitor.addViewAttributes(:)`|
|-|`Monitor.removeViewAttribute(forKey:)`|
|-|`Monitor.removeViewAttributes(forKeys:)`|

### ログ {#logs-1}

Logs 製品は、致命的なエラーを報告しなくなりました。クラッシュの Error Tracking を有効にするには、RUM と組み合わせてクラッシュレポートを有効にする必要があります。

すべての Objective-C Logs API が `DatadogLogs` に含まれます。個別の `DatadogObjc` モジュールは使用できなくなりました。

### トレース {#trace-1}

トレースのサンプリングは、RUM と併用する場合、決定論的になりました。一貫したサンプリングを保証するために、RUM `session.id` を使用します。

また、
- `Trace.Configuration.URLSessionTracking.FirstPartyHostsTracing` 構成はデフォルトですべてのリクエストのサンプリングを設定し、トレースコンテキストはサンプリングされたリクエストにのみ挿入されます。
- すべての Objective-C Trace API が `DatadogTrace` に含まれます。個別の `DatadogObjc` モジュールは使用できなくなりました。

**注**: `RUM.Configuration.URLSessionTracking.FirstPartyHostsTracing` にも同様の構成が存在します。

### Session Replay {#session-replay-1}

プライバシー設定がより詳細になりました。以前の `defaultPrivacyLevel` パラメーターは以下に置き換えられました。
- `textAndInputPrivacyLevel`
- `imagePrivacyLevel`
- `touchPrivacyLevel`

[プライバシーレベル][1] の詳細をご覧ください。

API 変更点:

|`2.x`|`3.0`|
|---|---|
|`SessionReplay.Configuration(replaySampleRate:defaultPrivacyLevel:startRecordingImmediately:customEndpoint:)`|`SessionReplay.Configuration(replaySampleRate:textAndInputPrivacyLevel:imagePrivacyLevel:touchPrivacyLevel:startRecordingImmediately:customEndpoint:featureFlags:)`|
|`SessionReplay.Configuration(replaySampleRate:defaultPrivacyLevel:startRecordingImmediately:customEndpoint:)`|`SessionReplay.Configuration(replaySampleRate:textAndInputPrivacyLevel:imagePrivacyLevel:touchPrivacyLevel:startRecordingImmediately:customEndpoint:featureFlags:)`|

### URLSession インスツルメンテーション {#urlsession-instrumentation}

URLSession インスツルメンテーションを有効にするには、RUM やトレースも有効にして、それぞれの製品に報告が送信されるようにしてください。

従来のデリゲート型は、統合されたインスツルメンテーション API に置き換えられました。

|`2.x`|`3.0`|
|---|---|
|`DatadogURLSessionDelegate()`|`URLSessionInstrumentation.enable(with:)`|
|`DDURLSessionDelegate()`|`URLSessionInstrumentation.enable(with:)`|
|`DDNSURLSessionDelegate()`|`URLSessionInstrumentation.enable(with:)`|

[1]: /ja/session_replay/privacy_options?platform=ios

{{% /tab %}}

{{% tab "React Native" %}}

公式 React Native リポジトリの [MIGRATION.md ガイド][1] を参照してください。

<div class="alert alert-warning">
<strong>重要:</strong> v2.x (SDK の初期化時にすべての機能モジュールが常に有効になっていた) とは異なり、v3 では機能モジュールの設定を明示的に渡さない限りその機能モジュールは初期化または有効化<strong>されません</strong>。
</div>

### 構成の変更 {#configuration-changes}

特定の構成プロパティが移動、名前変更、削除、または分割されました。

| プロパティ | 新しい場所 | 変更 |
| :--- | :--- | :--- |
| `sampleRate` | *削除* | 非推奨のプロパティが削除されました。|
| `sessionSamplingRate` | `RumConfiguration` | 移動され、`sessionSampleRate` に名前が変更されました。|
| `resourceTracingSamplingRate` | `RumConfiguration` | 移動され、`resourceTraceSampleRate` に名前が変更されました。|
| `proxyConfig` | `CoreConfiguration` | `proxyConfiguration` に名前が変更されました。|
| `serviceName` | `CoreConfiguration` | `service` に名前が変更されました。|
| `customEndpoints` | *分割* | `RumConfiguration`、`LogsConfiguration`、および `TraceConfiguration` 内で `customEndpoint` に分割されました。|
| *(新しいプロパティ)* | `CoreConfiguration` | `attributeEncoders` が追加されました。|
| *(新しいプロパティ)* | `RumConfiguration` | `trackMemoryWarnings` が追加されました。|
| `nativeCrashReportEnabled` | `RumConfiguration` | 移動されました。|
| `nativeViewTracking` | `RumConfiguration` | 移動されました。|
| `nativeInteractionTracking` | `RumConfiguration` | 移動されました。|
| `firstPartyHosts` | `RumConfiguration` | `FirstPartyHost[]` タイプの使用が強制され、移動されました。|
| `telemetrySampleRate` | `RumConfiguration` | 移動されました。|
| `nativeLongTaskThresholdMs` | `RumConfiguration` | 移動されました。|
| `longTaskThresholdMs` | `RumConfiguration` | 移動されました。|
| `vitalsUpdateFrequency` | `RumConfiguration` | 移動されました。|
| `trackFrustrations` | `RumConfiguration` | 移動されました。|
| `trackBackgroundEvents` | `RumConfiguration` | 移動されました。|
| `bundleLogsWithRum` | `LogsConfiguration` | 移動されました。|
| `bundleLogsWithTraces` | `LogsConfiguration` | 移動されました。|
| `trackNonFatalAnrs` | `RumConfiguration` | 移動されました。|
| `appHangThreshold` | `RumConfiguration` | 移動されました。|
| `initialResourceThreshold` | `RumConfiguration` | 移動されました。|
| `trackWatchdogTerminations` | `RumConfiguration` | 移動されました。|
| `actionNameAttribute` | `RumConfiguration` | 移動されました。|
| `logEventMapper` | `LogsConfiguration` | 移動されました。|
| `errorEventMapper` | `RumConfiguration` | 移動されました。|
| `resourceEventMapper` | `RumConfiguration` | 移動されました。|
| `actionEventMapper` | `RumConfiguration` | 移動されました。|
| `useAccessibilityLabel` | `RumConfiguration` | 移動されました。|
| `trackInteractions` | `RumConfiguration` | 移動されました。|
| `trackResources` | `RumConfiguration` | 移動されました。|
| `trackErrors` | `RumConfiguration` | 移動されました。|

### 名前が変更された構造 {#renamed-structures}

| `2.x` | `3.x` |
|---|---|
| `DdSdkConfiguration` | `CoreConfiguration` |

### API の更新 {#api-updates}

構成の所有権の変更 (Core と機能設定) に加え、v3 のモジュール設計に合わせて、いくつかのパブリック型および API の名前変更や再配置が行われました。信頼できるリストとコード例については、[MIGRATION.md ガイド][1] を参照してください。

[1]: https://github.com/DataDog/dd-sdk-reactnative/blob/develop/MIGRATION.md

{{% /tab %}}

{{< /tabs >}}

## v1 から v2 へ {#from-v1-to-v2}
{{< tabs >}}
{{% tab "Android" %}}

v1 から v2 への移行は、モノリシックな SDK からモジュラーアーキテクチャーへの移行を意味します。RUM、Trace、Logs、Session Replay などがそれぞれ独立したモジュールとなり、必要なもののみをアプリケーションに組み込めます。

SDK v2 は、iOS SDK、Android SDK、その他の Datadog 製品間で API レイアウトと命名規則を統一しています。

SDK v2 により、Android および iOS アプリで [Mobile Session Replay][2] を利用できます。

[2]: /ja/session_replay/?platform=android

{{% /tab %}}
{{% tab "iOS" %}}

v1 から v2 への移行は、モノリシックな SDK からモジュラーアーキテクチャーへの移行を意味します。RUM、Trace、Logs、Session Replay などがそれぞれ独立したモジュールとなり、必要なもののみをアプリケーションに組み込めます。

SDK v2 は、iOS SDK、Android SDK、その他の Datadog 製品間で API レイアウトと命名規則を統一しています。

SDK v2 により、Android および iOS アプリで [Mobile Session Replay][3] を利用できます。

[3]: /ja/session_replay/?platform=ios

{{% /tab %}}
{{% tab "React Native" %}}

v1 から v2 へ移行すると、パフォーマンスが向上します。

{{% /tab %}}
{{% tab "Flutter" %}}

v1 から v2 へ移行すると、パフォーマンスが向上し、v2 ネイティブ SDK が提供する追加機能も利用可能になります。

{{% /tab %}}
{{< /tabs >}}

### モジュール {#modules-1}
{{< tabs >}}
{{% tab "Android" %}}

v2 ではアーティファクトがモジュール化されています。以下のアーティファクトを採用してください。

* RUM: `com.datadoghq:dd-sdk-android-rum:x.x.x`
* Logs: `com.datadoghq:dd-sdk-android-logs:x.x.x`
* Trace: `com.datadoghq:dd-sdk-android-trace:x.x.x`
* Session Replay: `com.datadoghq:dd-sdk-android-session-replay:x.x.x`
* WebView Tracking: `com.datadoghq:dd-sdk-android-webview:x.x.x`
* OkHttp インスツルメンテーション: `com.datadoghq:dd-sdk-android-okhttp:x.x.x`

**注**: NDK Crash Reporting と WebView Tracking を使用する場合は、それぞれのイベントを RUM と Logs に送信するために RUM および Logs のアーティファクトを追加する必要があります。

`com.datadoghq:dd-sdk-android` アーティファクトは廃止されたため、Gradle ビルドスクリプトからその参照を削除してください。

**注**: 他のすべてのアーティファクトの Maven 座標に変更はありません。

<div class="alert alert-danger">v2 は Android API 19 (KitKat) をサポートしていません。サポートされている最小 SDK は API 21 (Lollipop) です。Kotlin 1.7 が必要です。SDK 自体は Kotlin 1.8 でコンパイルされているため、Kotlin 1.6 以下のコンパイラでは SDK クラスのメタデータを読み取ることができません。</div>

以下のようなエラーが発生した場合:

```
A failure occurred while executing com.android.build.gradle.internal.tasks.CheckDuplicatesRunnable
Duplicate class kotlin.collections.jdk8.CollectionsJDK8Kt found in modules kotlin-stdlib-1.8.10 (org.jetbrains.kotlin:kotlin-stdlib:1.8.10) and kotlin-stdlib-jdk8-1.7.20 (org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.7.20)
```

ビルドスクリプトに以下のルールを追加してください (詳細は関連する [Stack Overflow の問題][4] を参照してください)。

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

SDK のセットアップ例については、[Android サンプルアプリケーション][5] を参照してください。

[4]: https://stackoverflow.com/a/75298544
[5]: https://github.com/DataDog/dd-sdk-android/tree/develop/sample

{{% /tab %}}
{{% tab "iOS" %}}

v2 ではライブラリがモジュール化されています。以下のライブラリを採用してください。

- `DatadogCore`
- `DatadogLogs`
- `DatadogTrace`
- `DatadogSessionReplay`
- `DatadogRUM`
- `DatadogWebViewTracking`

これらは、既存の `DatadogCrashReporting` および `DatadogObjc` に加えて取り込む必要があります。

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

`Cartfile` は変更されません。
  ```
  github "DataDog/dd-sdk-ios"
  ```

Xcode では、以下のフレームワークを **必ず** リンクしてください。
  ```
  DatadogInternal.xcframework
  DatadogCore.xcframework
  ```

その後、使用するモジュールを選択できます。
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

package.json 内の `@datadog/mobile-react-native` を更新します。

```json
"@datadog/mobile-react-native": "2.0.0"
```

iOS の Pod を更新します。

```bash
(cd ios && bundle exec pod update)
```

`0.67` より新しい React Native バージョンを使用する場合は Java 17 を、`0.67` 以下の場合は Java 11 を使用します。現在の Java バージョンを確認するには、ターミナルで次のコマンドを実行します。

```bash
java --version
```

### React Native < 0.73 の場合 {#for-react-native-073}

`android/build.gradle` ファイルで `kotlinVersion` を指定し、Kotlin 依存関係の競合を回避してください。

```groovy
buildscript {
    ext {
        // targetSdkVersion = ...
        kotlinVersion = "1.8.21"
    }
}
```

### React Native < 0.68 の場合 {#for-react-native-068}

`android/build.gradle` ファイルで `kotlinVersion` を指定し、Kotlin 依存関係の競合を回避してください。

```groovy
buildscript {
    ext {
        // targetSdkVersion = ...
        kotlinVersion = "1.8.21"
    }
}
```

`android/build.gradle` で `5.0` 未満の `com.android.tools.build:gradle` バージョンを使用している場合は、`android/gradle.properties` ファイルに以下を追加してください。

```properties
android.jetifier.ignorelist=dd-sdk-android-core
```

### トラブルシューティング {#troubleshooting}

#### Android ビルドが `Unable to make field private final java.lang.String java.io.File.path accessible` で失敗する {#android-build-fails-with-unable-to-make-field-private-final-javalangstring-javaiofilepath-accessible}

Android ビルドが次のようなエラーで失敗した場合:

```
FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':app:processReleaseMainManifest'.
> Unable to make field private final java.lang.String java.io.File.path accessible: module java.base does not "opens java.io" to unnamed module @1bbf7f0e
```

使用している Java 17 は React Native バージョンと互換性がありません。この問題を解決するには、Java 11 に切り替えてください。

#### Android ビルドが `Unsupported class file major version 61` で失敗する {#android-build-fails-with-unsupported-class-file-major-version-61}

Android ビルドが次のようなエラーで失敗した場合:

```
FAILURE: Build failed with an exception.

* What went wrong:
Could not determine the dependencies of task ':app:lintVitalRelease'.
> Could not resolve all artifacts for configuration ':app:debugRuntimeClasspath'.
   > Failed to transform dd-sdk-android-core-2.0.0.aar (com.datadoghq:dd-sdk-android-core:2.0.0) to match attributes {artifactType=android-manifest, org.gradle.category=library, org.gradle.dependency.bundling=external, org.gradle.libraryelements=aar, org.gradle.status=release, org.gradle.usage=java-runtime}.
      > Execution failed for JetifyTransform: /Users/me/.gradle/caches/modules-2/files-2.1/com.datadoghq/dd-sdk-android-core/2.0.0/a97f8a1537da1de99a86adf32c307198b477971f/dd-sdk-android-core-2.0.0.aar.
         > Failed to transform '/Users/me/.gradle/caches/modules-2/files-2.1/com.datadoghq/dd-sdk-android-core/2.0.0/a97f8a1537da1de99a86adf32c307198b477971f/dd-sdk-android-core-2.0.0.aar' using Jetifier. Reason: IllegalArgumentException, message: Unsupported class file major version 61. (Run with --stacktrace for more details.)
```

使用している Android Gradle Plugin バージョンが `5.0` 未満です。この問題を解決するには、`android/gradle.properties` ファイルに以下を追加してください。

```properties
android.jetifier.ignorelist=dd-sdk-android-core
```

#### Android ビルドが `Duplicate class kotlin.collections.jdk8.*` で失敗する {#android-build-fails-with-duplicate-class-kotlincollectionsjdk8}

Android ビルドが次のようなエラーで失敗した場合:

```
FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':app:checkReleaseDuplicateClasses'.
> A failure occurred while executing com.android.build.gradle.internal.tasks.CheckDuplicatesRunnable
   > Duplicate class kotlin.collections.jdk8.CollectionsJDK8Kt found in modules jetified-kotlin-stdlib-1.8.10 (org.jetbrains.kotlin:kotlin-stdlib:1.8.10) and jetified-kotlin-stdlib-jdk8-1.7.20 (org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.7.20)
     Duplicate class kotlin.internal.jdk7.JDK7PlatformImplementations found in modules jetified-kotlin-stdlib-1.8.10 (org.jetbrains.kotlin:kotlin-stdlib:1.8.10) and jetified-kotlin-stdlib-jdk7-1.7.20 (org.jetbrains.kotlin:kotlin-stdlib-jdk7:1.7.20)
```

Kotlin の依存関係間の競合を避けるため、プロジェクトの Kotlin バージョンを設定する必要があります。`android/build.gradle` ファイルで、`kotlinVersion` を指定します。

```groovy
buildscript {
    ext {
        // targetSdkVersion = ...
        kotlinVersion = "1.8.21"
    }
}
```

あるいは、`android/app/build.gradle` ファイルのビルドスクリプトに次のルールを追加することもできます。

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

pubspec.yaml の `datadog_flutter_plugin` を更新します。

```yaml
dependencies:
  'datadog_flutter_plugin: ^2.0.0
```

## トラブルシューティング {#troubleshooting-1}

### Duplicate interface (iOS) {#duplicate-interface-ios}

`datadog_flutter_plugin` v2.0 にアップグレードした後、iOS のビルド中にこのエラーが表示される場合:

```
Semantic Issue (Xcode): Duplicate interface definition for class 'DatadogSdkPlugin'
/Users/exampleuser/Projects/test_app/build/ios/Debug-iphonesimulator/datadog_flutter_plugin/datadog_flutter_plugin.framework/Headers/DatadogSdkPlugin.h:6:0
```

`flutter clean && flutter pub get` を実行し、再ビルドしてください。通常、これで問題は解決します。

### Duplicate classes (Android) {#duplicate-classes-android}

`datadog_flutter_plugin` v2.0 にアップグレードした後、Android のビルド中にこのエラーが表示される場合:

```
FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':app:checkDebugDuplicateClasses'.
> A failure occurred while executing com.android.build.gradle.internal.tasks.CheckDuplicatesRunnable
```

`build.gradle` ファイルで Kotlin のバージョンを 1.8 以上に更新していることを確認してください。

{{% /tab %}}

{{< /tabs >}}

### SDK の初期化 {#sdk-initialization}
{{< tabs >}}
{{% tab "Android" %}}
異なるプロダクトを独立したモジュールに抽出したことにより、SDK の構成はモジュール単位で整理されました。

`com.datadog.android.core.configuration.Configuration.Builder`クラスには以下の変更があります。

* クライアント トークン、環境名、バリアント名 (デフォルト値は空文字列)、サービス名 (デフォルト値はマニフェストから取得したアプリケーション ID) を**コンストラクタ**で指定する必要があります。
* `com.datadog.android.core.configuration.Credentials` クラスは削除されました。
* `logsEnabled`、`tracesEnabled`、`rumEnabled` はコンストラクタから削除され、各プロダクトごとの設定で有効化されます (下記参照)。
* `crashReportsEnabled`コンストラクタ引数は削除されました。`Configuration.Builder.setCrashReportsEnabled` メソッドを使用して、JVM クラッシュレポートを有効または無効にできます。デフォルトでは、JVM クラッシュレポートは有効になっています。
* RUM、Logs、Trace の各プロダクト設定メソッドは `Configuration.Builder` から削除され、個別のプロダクト設定に置き換えられました (下記参照)。

`Datadog.initialize` メソッドの引数リストから `Credentials` クラスが削除されました。

`com.datadog.android.plugin` パッケージとそれに関連するすべてのクラス/メソッドは削除されました。

### Logs {#logs-2}

Logs に関連するクラスは、すべて厳密に `com.datadog.android.log` パッケージ内に集約されています。

Logs プロダクトを使用するには、次のアーティファクトをインポートしてください。

```kotlin
implementation("com.datadoghq:dd-sdk-android-logs:x.x.x")
```

下記スニペットで Logs プロダクトを有効化できます。

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
|`com.datadog.android.log.Logger.Builder.setDatadogLogsEnabled`|このメソッドは削除されました。Datadog へのログ送信を無効にするには、代わりに `com.datadog.android.log.Logger.Builder.setRemoteSampleRate(0f)` を使用してください。|
|`com.datadog.android.log.Logger.Builder.setServiceName`|`com.datadog.android.log.Logger.Builder.setService`|
|`com.datadog.android.log.Logger.Builder.setDatadogLogsMinPriority`|`com.datadog.android.log.Logger.Builder.setRemoteLogThreshold`|

### Trace {#trace-2}

Trace に関連するクラスは、すべて厳密に `com.datadog.android.trace` パッケージ内に集約されています (以前は `com.datadog.android.tracing` 配下にありました)。

Trace プロダクトを使用するには、次のアーティファクトをインポートしてください。

```kotlin
implementation("com.datadoghq:dd-sdk-android-trace:x.x.x")
```

下記スニペットで Trace プロダクトを有効化できます。

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

### RUM {#rum-2}

RUM に関連するクラスは、すべて厳密に `com.datadog.android.rum` パッケージ内に集約されています。

RUM プロダクトを使用するには、次のアーティファクトをインポートしてください。

```kotlin
implementation("com.datadoghq:dd-sdk-android-rum:x.x.x")
```

以下のスニペットで RUM プロダクトを有効化できます。

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
|`com.datadog.android.rum.RumMonitor.Builder`|このクラスは削除されました。RUM モニターは `Rum.enable` 呼び出し中に作成および登録されます。|
|`com.datadog.android.rum.RumMonitor.Builder.sampleRumSessions`|`com.datadog.android.rum.RumConfiguration.Builder.setSessionSampleRate`|
|`com.datadog.android.rum.RumMonitor.Builder.setSessionListener`|`com.datadog.android.rum.RumConfiguration.Builder.setSessionListener`|
|`com.datadog.android.rum.RumMonitor.addUserAction`|`com.datadog.android.rum.RumMonitor.addAction`|
|`com.datadog.android.rum.RumMonitor.startUserAction`|`com.datadog.android.rum.RumMonitor.startAction`|
|`com.datadog.android.rum.RumMonitor.stopUserAction`|`com.datadog.android.rum.RumMonitor.stopAction`|
|`com.datadog.android.rum.GlobalRum.registerIfAbsent`|このメソッドは削除されました。RUM モニターは `Rum.enable` 呼び出し中に作成および登録されます。|
|`com.datadog.android.rum.GlobalRum`|`com.datadog.android.rum.GlobalRumMonitor`|
|`com.datadog.android.rum.GlobalRum.addAttribute`|`com.datadog.android.rum.RumMonitor.addAttribute`|
|`com.datadog.android.rum.GlobalRum.removeAttribute`|`com.datadog.android.rum.RumMonitor.removeAttribute`|

### NDK クラッシュレポート {#ndk-crash-reporting}

アーティファクト名は以前と同じ `com.datadoghq:dd-sdk-android-ndk:x.x.x` です。

以下のスニペットで NDK クラッシュレポートを有効化できます。

```kotlin
NdkCrashReports.enable()
```

この構成は `com.datadog.android.core.configuration.Configuration.Builder.addPlugin` 呼び出しを置き換えるものです。

**注**: NDK クラッシュレポートを RUM と Logs で受信するには、RUM と Logs プロダクトを有効にしておく必要があります。

### WebView Tracking {#webview-tracking}

アーティファクト名は以前と同じ `com.datadoghq:dd-sdk-android-webview:x.x.x` です。

以下のスニペットで WebView トラッキングを有効化できます。

```kotlin
WebViewTracking.enable(webView, allowedHosts)
```

**注**: WebView から送信されるイベントを RUM と Logs で受信するには、RUM と Logs プロダクトを有効にしておく必要があります。

API 変更点:

|`1.x`|`2.0`|
|---|---|
|`com.datadog.android.webview.DatadogEventBridge`|このメソッドは `internal` クラスになりました。代わりに `WebViewTracking` を使用してください。|
|`com.datadog.android.rum.webview.RumWebChromeClient`|このクラスは削除されました。代わりに `WebViewTracking` を使用してください。|
|`com.datadog.android.rum.webview.RumWebViewClient`|このクラスは削除されました。代わりに `WebViewTracking` を使用してください。|

### OkHttp Tracking {#okhttp-tracking}

OkHttp トラッキングを使用するには、次のアーティファクトをインポートしてください。

```kotlin
implementation("com.datadoghq:dd-sdk-android-okhttp:x.x.x")
```

OkHttp インスツルメンテーションは、OkHttp クライアントの後に Datadog SDK を初期化することをサポートしており、Datadog SDK より前に `com.datadog.android.okhttp.DatadogEventListener`、`com.datadog.android.okhttp.DatadogInterceptor`、および `com.datadog.android.okhttp.trace.TracingInterceptor` を作成できます。Datadog SDK が初期化されると、OkHttp インスツルメンテーションは Datadog へのイベント送信を開始します。

`com.datadog.android.okhttp.DatadogInterceptor` と `com.datadog.android.okhttp.trace.TracingInterceptor` の両方は、リモート構成システムとの統合を通じてサンプリングを動的に制御できます。

サンプリングを動的に調整するには、`com.datadog.android.okhttp.DatadogInterceptor`/`com.datadog.android.okhttp.trace.TracingInterceptor` のコンストラクタに `com.datadog.android.core.sampling.Sampler` インターフェースを実装した独自クラスを提供してください。各リクエストごとにサンプリング判定が行われます。

### `dd-sdk-android-ktx`モジュールの削除 {#dd-sdk-android-ktx-module-removal}

利用する Datadog SDK の粒度を高めるため、`dd-sdk-android-ktx` モジュールは削除されました。コードは他のモジュールに分割され、RUM と Trace 向けの拡張メソッドを提供します。

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

### Session Replay {#session-replay-2}

Mobile Session Replay のセットアップ方法については、[Mobile Session Replay のセットアップと構成][6] を参照してください。

[6]: /ja/session_replay/setup_and_configuration/?platform=android

{{% /tab %}}
{{% tab "iOS" %}}

異なるプロダクトを独立したモジュールに抽出したことにより、SDK の構成はモジュール単位で整理されました。

> SDK は任意のプロダクトを有効化する前に初期化する必要があります。

SDK 初期化の Builder パターンは廃止され、構造体定義に置き換えられました。以下は、`1.x` の初期化が `2.0` でどのように変換されるかを示す例です。

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

### Logs {#logs-3}

Logs に関連するクラスは、すべて厳密に `DatadogLogs` モジュールに含まれています。まず、プロダクトを有効にする必要があります。

```swift
import DatadogLogs

Logs.enable(with: Logs.Configuration(...))
```

その後、ロガーインスタンスを作成できます。

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

### Trace {#trace-3}

Trace に関連するクラスは、すべて厳密に `DatadogTrace` モジュールに含まれています。まず、プロダクトを有効にする必要があります。

```swift
import DatadogTrace

Trace.enable(
    with: Trace.Configuration(...)
)
```

次に、共有 Tracer インスタンスにアクセスできます。

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

### RUM {#rum-3}

RUM に関連するクラスは、すべて厳密に `DatadogRUM` モジュールに含まれています。まず、プロダクトを有効にする必要があります。

```swift
import DatadogRUM

RUM.enable(
    with: RUM.Configuration(applicationID: "<RUM Application ID>")
)
```

次に、共有 RUM モニターインスタンスにアクセスできます。

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

### クラッシュレポート {#crash-reporting}

クラッシュ レポートを有効化するには、RUM と Logs を有効化し、それぞれのプロダクトにレポートを送信できるようにしてください。

```swift
import DatadogCrashReporting

CrashReporting.enable()
```

|`1.x`|`2.0`|
|---|---|
|`Datadog.Configuration.Builder.enableCrashReporting()`|`CrashReporting.enable()`|

### WebView Tracking {#webview-tracking-1}

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

### Session Replay {#session-replay-3}

Mobile Session Replay のセットアップ方法については、[Mobile Session Replay のセットアップと構成][7] を参照してください。

[7]: /ja/session_replay/setup_and_configuration/?platform=ios

{{% /tab %}}
{{% tab "React Native" %}}

SDK 初期化の変更は不要です。

{{% /tab %}}

{{% tab "Flutter" %}}

## SDK 構成の変更 {#sdk-configuration-changes}

Datadog のネイティブ SDK のモジュラー化に伴い、一部の構成プロパティが移動またはリネームされました。

以下の構造体がリネームされました。

| `1.x` | `2.x` |
|-------|-------|
| `DdSdkConfiguration` | `DatadogConfiguration` |
| `LoggingConfiguration` | `DatadogLoggingConfiguration` |
| `RumConfiguration` | `DatadogRumConfiguration` |
| `DdSdkExistingConfiguration` | `DatadogAttachConfiguration` |

以下のプロパティが変更されました。

| 1.x | 2.x | メモ |
|-------|-------|-------|
| `DdSdkConfiguration.trackingConsent`| 削除 | 次の一部: `Datadog.initialize` | |
| `DdSdkConfiguration.customEndpoint` | 削除 | 現在はフィーチャーごとに設定されます | |
| `DdSdkConfiguration.serviceName` | `DatadogConfiguration.service` | |
| `DdSdkConfiguration.logEventMapper` | `DatadogLoggingConfiguration.eventMapper` | |
| `DdSdkConfiguration.customLogsEndpoint` | `DatadogLoggingConfiguration.customEndpoint` | |
| `DdSdkConfiguration.telemetrySampleRate` | `DatadogRumConfiguration.telemetrySampleRate` | |

さらに、以下の API が変更されました。

| 1.x | 2.x | メモ |
|-------|-------|-------|
| `Verbosity` | 削除 | 次を参照: `CoreLoggerLevel` または `LogLevel` |
| `DdLogs DatadogSdk.logs` | `DatadogLogging DatadogSdk.logs` | タイプが変更されました |
| `DdRum DatadogSdk.rum` | `DatadogRum DatadogSdk.rum` | タイプが変更されました
| `Verbosity DatadogSdk.sdkVerbosity` | `CoreLoggerLevel DatadogSdk.sdkVerbosity` |
| `DatadogSdk.runApp` | `DatadogSdk.runApp` | 追加 `trackingConsent` パラメーター |
| `DatadogSdk.initialize` | `DatadogSdk.initialize` | 追加 `trackingConsent` パラメーター |
| `DatadogSdk.createLogger` | `DatadogLogging.createLogger` | 移動されました |

## Flutter Web の変更点 {#flutter-web-changes}

Flutter Web を使用するクライアントは、Datadog Browser SDK v5 を使用するように更新してください。`index.html` のインポートを次のように変更します。

```diff
-  <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/datadog-logs-v4.js"></script>
-  <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/datadog-rum-slim-v4.js"></script>
+  <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/us1/v5/datadog-logs.js"></script>
+  <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/us1/v5/datadog-rum-slim.js"></script>
```

**注**: Datadog はサイトごとに 1 つの CDN バンドルを提供しています。すべてのサイト URL のリストについては、[Browser SDK README](https://github.com/DataDog/browser-sdk/#cdn-bundles) を参照してください。

## Logs プロダクトの変更点 {#logs-product-changes}

v1 と同様、Datadog Logging は `DatadogConfiguration.loggingConfiguration` メンバーを設定することで有効にできます。ただし、v1 とは異なり、Datadog はデフォルトのロガーを作成しません。`DatadogSdk.logs` は `DatadogLogging` のインスタンスになり、ログの作成に使用できるようになりました。個々のロガーに対してより詳細なサポートを提供するため、多くのオプションが `DatadogLoggerConfiguration` に移動されました。

以下の API が変更されました。

| 1.x | 2.x | メモ |
|-------|-------|-------|
| `LoggingConfiguration` | `DatadogLoggingConfiguration` | ほとんどのメンバーが `DatadogLoggerConfiguration` | でリネームされました
| `LoggingConfiguration.sendNetworkInfo` | `DatadogLoggerConfiguration.networkInfoEnabled` | |
| `LoggingConfiguration.printLogsToConsole` | `DatadogLoggerConfiguration.customConsoleLogFunction` | |
| `LoggingConfiguration.sendLogsToDatadog` | 削除されました。代わりに `remoteLogThreshold` を使用してください | |
| `LoggingConfiguration.datadogReportingThreshold` | `DatadogLoggerConfiguration.remoteLogThreshold` | |
| `LoggingConfiguration.bundleWithRum` | `DatadogLoggerConfiguration.bundleWithRumEnabled` | |
| `LoggingConfiguration.bundleWithTrace` | `DatadogLoggerConfiguration.bundleWithTraceEnabled` | |
| `LoggingConfiguration.loggerName` | `DatadogLoggerConfiguration.name` | |
| `LoggingConfiguration.sampleRate` | `DatadogLoggerConfiguration.remoteSampleRate` | |

## RUM プロダクトの変更点 {#rum-product-changes}

以下の API が変更されました。

| 1.x | 2.x | メモ |
|-------|-------|-------|
| `RumConfiguration` | `DatadogRumConfiguration` | タイプがリネームされました |
| `RumConfiguration.vitalsUpdateFrequency` | `DatadogRumConfiguration.vitalsUpdateFrequency` | バイタルの更新を無効にするには `null` を設定してください |
| `RumConfiguration.tracingSampleRate` | `DatadogRumConfiguration.traceSampleRate` |
| `RumConfiguration.rumViewEventMapper` | `DatadogRumConfiguration.viewEventMapper` |
| `RumConfiguration.rumActionEventMapper` | `DatadogRumConfiguration.actionEventMapper` |
| `RumConfiguration.rumResourceEventMapper` | `DatadogRumConfiguration.resourceEventMapper` |
| `RumConfiguration.rumErrorEventMapper` | `DatadogRumConfiguration.rumErrorEventMapper` |
| `RumConfiguration.rumLongTaskEventMapper` | `DatadogRumConfiguration.longTaskEventMapper` |
| `RumUserActionType` | `RumActionType` | タイプがリネームされました |
| `DdRum.addUserAction` | `DdRum.addAction` | |
| `DdRum.startUserAction` | `DdRum.startAction` | |
| `DdRum.stopUserAction` | `DdRum.stopAction` | |
| `DdRum.startResourceLoading` | `DdRum.startResource` | |
| `DdRum.stopResourceLoading` | `DdRum.stopResource` | |
| `DdRum.stopResourceLoadingWithError` | `DdRum.stopResourceWithError` | |

さらに、イベントマッパーで表示名を変更することはできなくなりました。表示する名前を変更するには、代わりにカスタム [`ViewInfoExtractor`](https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/ViewInfoExtractor.html) を使用してください。


{{% /tab %}}

{{< /tabs >}}


## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}