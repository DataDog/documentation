---
aliases:
- /ja/tracing/trace_collection/otel_instrumentation/ios/
- /ja/tracing/trace_collection/custom_instrumentation/otel_instrumentation/ios
description: Instrument your iOS and tvOS application with OpenTelemetry API to send
  traces to Datadog.
further_reading:
- link: tracing/glossary/
  tag: ドキュメント
  text: サービス、リソース、トレースの詳細
- link: /opentelemetry/guide/otel_api_tracing_interoperability
  tag: ドキュメント
  text: OpenTelemetry API と Datadog でインスツルメントされたトレースの相互運用性
title: iOS and tvOS Custom Instrumentation using OpenTelemetry API
---

{{% otel-custom-instrumentation-lang %}}

## 要件と制限

- DatadogTrace for iOS and tvOS version 2.12.0+.


## Tracing iOS applications with OpenTelemetry

1. パッケージマネージャーに応じてライブラリを依存関係として宣言します。

{{< tabs >}}
{{% tab "CocoaPods" %}}

You can use [CocoaPods](https://cocoapods.org/) to install `dd-sdk-ios`:

```
pod 'DatadogCore'
pod 'DatadogTrace'
```

{{% /tab %}}
{{% tab "Swift Package Manager (SPM)" %}}

Apple の Swift Package Manager を使用して統合するには、`Package.swift` に以下を依存関係として追加します。
```swift
.package(url: "https://github.com/Datadog/dd-sdk-ios.git", .upToNextMajor(from: "2.0.0"))
```

プロジェクトで、以下のライブラリをリンクします。
```
DatadogCore
DatadogTrace
```

{{% /tab %}}
{{% tab "Carthage" %}}

You can use [Carthage](https://github.com/Carthage/Carthage) to install `dd-sdk-ios`:

```
github "DataDog/dd-sdk-ios"
```

Xcode で、以下のフレームワークをリンクします。
```
OpenTelemetryApi.xcframework
DatadogInternal.xcframework
DatadogCore.xcframework
DatadogTrace.xcframework
```

{{% /tab %}}
{{< /tabs >}}

2. Initialize the library with your application context and your [Datadog client token][9]. For security reasons, you must use a client token: you cannot use [Datadog API keys][10] to configure the `dd-sdk-ios` library as they would be exposed client-side in the iOS application IPA byte code.

For more information about setting up a client token, see the [client token documentation][11].

{{< site-region region="us" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore

Datadog.initialize(
    with: Datadog.Configuration(
        clientToken: "<client token>",
        env: "<environment>",
        service: "<service name>"
    ),
    trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="eu" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore

Datadog.initialize(
    with: Datadog.Configuration(
        clientToken: "<client token>",
        env: "<environment>",
        site: .eu1,
        service: "<service name>"
    ),
    trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="us3" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore

Datadog.initialize(
    with: Datadog.Configuration(
        clientToken: "<client token>",
        env: "<environment>",
        site: .us3,
        service: "<service name>"
    ),
    trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="us5" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore

Datadog.initialize(
    with: Datadog.Configuration(
        clientToken: "<client token>",
        env: "<environment>",
        site: .us5,
        service: "<service name>"
    ),
    trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="gov" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore

Datadog.initialize(
    with: Datadog.Configuration(
        clientToken: "<client token>",
        env: "<environment>",
        site: .us1_fed,
        service: "<service name>"
    ),
    trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="ap1" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore

Datadog.initialize(
    with: Datadog.Configuration(
        clientToken: "<client token>",
        env: "<environment>",
        site: .ap1,
        service: "<service name>"
    ),
    trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

To be GDPR compliant, the SDK requires the `trackingConsent` value at initialization.
The `trackingConsent` can be one of the following values:

- `.pending`: - SDK はデータの収集とバッチ処理を開始しますが、Datadog へは送信しません。SDK はバッチ処理が完了したデータをどうするかについての新たな同意値が得られるまで待機します。
- `.granted`: SDK はデータの収集を開始し、Datadog へ送信します。
- `.notGranted`: SDK はデータを収集しません。ログ、トレース、RUM イベントは Datadog に送信されません。 

SDK の初期化後に追跡同意値を変更するには、`Datadog.set(trackingConsent:)` API 呼び出しを使用します。

SDK は新しい値に応じて動作を変更します。例えば、現在の追跡に関する同意が `.pending` であった場合:

- If changed to `.granted`, the SDK sends all current and future data to Datadog;
- If changed to `.notGranted`, the SDK wipes all current data and stops collecting any future data.

Before data is uploaded to Datadog, it is stored in cleartext in the cache directory (`Library/Caches`) of your [application sandbox][12]. The cache directory cannot be read by any other app installed on the device.

アプリケーションを作成する際、開発ログを有効にし、提供されたレベルと同等以上の優先度を持つ SDK のすべての内部メッセージをコンソールにログ出力するようにしてください。

{{< tabs >}}
{{% tab "Swift" %}}
```swift
Datadog.verbosityLevel = .debug
```
{{% /tab %}}
{{< /tabs >}}

3. Datadog tracer implements the [Open Telemetry standard][13]. Enable the Datadog tracer, register the tracer provider, and get the tracer instance:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogTrace
import OpenTelemetryApi

Trace.enable(
    with: Trace.Configuration(
        networkInfoEnabled: true
    )
)

OpenTelemetry.registerTracerProvider(
    tracerProvider: OTelTracerProvider()
)

let tracer = OpenTelemetry
    .instance
    .tracerProvider
    .get(instrumentationName: "", instrumentationVersion: nil)
```
{{% /tab %}}
{{< /tabs >}}

4. Instrument your code with the OpenTelemetry API:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
let span = tracer.spanBuilder(spanName: "<span_name>").startSpan()
// do something you want to measure ...
// ... then, when the operation is finished:
span.end()
```
{{% /tab %}}
{{< /tabs >}}

5. (Optional) Set child-parent relationship between your spans:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
let responseDecodingSpan = tracer.spanBuilder(spanName: "response decoding")
    .setParent(networkRequestSpan) // make it child of `networkRequestSpan`
    .startSpan()

// ... decode HTTP response data ...
responseDecodingSpan.end()
```
{{% /tab %}}
{{< /tabs >}}

6. (Optional) Provide additional attributes alongside your span:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
span.setAttribute(key: "http.url", value: url)
```
{{% /tab %}}
{{< /tabs >}}

7. (Optional) Attach an error to a span:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
span.status = .error(description: "Failed to decode response")
```
{{% /tab %}}
{{< /tabs >}}

8. (Optional) Add span links to your span:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
let linkedSpan = tracer.spanBuilder(spanName: "linked span").startSpan()
linkedSpan.end()

let spanWithLinks = tracer.spanBuilder(spanName: "span with links")
    .addLink(spanContext: linkedSpan.context)
    .startSpan()
spanWithLinks.end()
```
{{% /tab %}}
{{< /tabs >}}

[1]: https://opentelemetry.io/docs/concepts/signals/traces/#span-links
[2]: https://opentelemetry.io/docs/concepts/signals/traces/#attributes
[3]: https://opentelemetry.io/docs/concepts/signals/traces/#span-events
[4]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-processor
[5]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-exporter
[6]: /ja/real_user_monitoring/platform/connect_rum_and_traces/?tab=browserrum#opentelemetry-support
[9]: /ja/account_management/api-app-keys/#client-tokens
[10]: /ja/account_management/api-app-keys/#api-keys
[11]: /ja/account_management/api-app-keys/#client-tokens
[12]: https://support.apple.com/en-gb/guide/security/sec15bfe098e/web
[13]: https://opentelemetry.io/docs/concepts/signals/traces/