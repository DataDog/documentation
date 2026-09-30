---
further_reading:
- link: /real_user_monitoring/explorer
  tag: ドキュメント
  text: RUM データを Explorer で確認
title: Mobile SDK の複数インスタンスの使用
---

## 概要


<div class="alert alert-info">複数の SDK インスタンスを使用するには、バージョン <code>2.0.0</code> 以降にアップグレードする必要があります。<a href="https://docs.datadoghq.com/real_user_monitoring/guide/mobile-sdk-upgrade">RUM Mobile SDK のアップグレード</a> ガイドを参照してください。</div>

このガイドに従って、複数の名前付き SDK インスタンスを使用してください。SDK の多くのメソッドは、オプションで SDK インスタンスを引数として受け取ります。指定しない場合、その呼び出しはデフォルト (名前なし) の SDK インスタンスに関連付けられます。

**注**: SDK インスタンス名は、アプリケーションの起動間で一貫している必要があります。SDK のイベントの保存パスはこれに依存します。

**注**: Session Replay は同時に 1 つの Core でのみ実行できます。別の Core に切り替えるには、まず現在実行中の Core を停止してください。

{{< tabs >}}
{{% tab "Android" %}}

```kotlin
val namedSdkInstance = Datadog.initialize("myInstance", context, configuration, trackingConsent)

val userInfo = UserInfo(...)
Datadog.setUserInfo(userInfo, sdkCore = namedSdkInstance)

Logs.enable(logsConfig, namedSdkInstance)
val logger = Logger.Builder(namedSdkInstance)
    ...
    .build()

Trace.enable(traceConfig, namedSdkInstance)
val tracer = AndroidTracer.Builder(namedSdkInstance)
    ...
    .build()

Rum.enable(rumConfig, namedSdkInstance)
GlobalRumMonitor.get(namedSdkInstance)

NdkCrashReports.enable(namedSdkInstance)

WebViewTracking.enable(webView, allowedHosts, namedSdkInstance)

SessionReplay.enable(sessionReplayConfig, namedSdkInstance)
```

**注**:
WebView コンポーネントでインスツルメンテーションを機能させるには、WebView で JavaScript を有効にすることが非常に重要です。有効にするには、以下のコードスニペットを使用します。

```kotlin
    webView.settings.javaScriptEnabled = true
```

名前付き SDK インスタンスは `Datadog.getInstance(<name>)` を呼び出して取得でき、特定の SDK インスタンスが初期化済みかどうかは `Datadog.isInitialized(<name>)` メソッドで確認できます。

{{% /tab %}}
{{% tab "iOS" %}}

```swift
import DatadogCore
import DatadogRUM
import DatadogLogs
import DatadogTrace

let core = Datadog.initialize(
    with: configuration, 
    trackingConsent: trackingConsent, 
    instanceName: "my-instance"
)

RUM.enable(
    with: RUM.Configuration(applicationID: "<RUM Application ID>"),
    in: core
)

Logs.enable(in: core)

Trace.enable(in: core)

SessionReplay.enable(with: sessionReplayConfig, in: core)
```

名前付き SDK インスタンスが初期化されたら、`Datadog.sdkInstance(named: "<name>")` を呼び出して取得し、以下のとおりに使用できます。

```swift
import DatadogCore

let core = Datadog.sdkInstance(named: "my-instance")
```

### ログ
```swift
import DatadogLogs

let logger = Logger.create(in: core)
```

### Trace
```swift
import DatadogRUM

let monitor = RUMMonitor.shared(in: core)
```

### RUM
```swift
import DatadogRUM

let monitor = RUMMonitor.shared(in: core)
```


{{% /tab %}}
{{< /tabs >}}


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}