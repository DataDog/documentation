---
title: Custom Instrumentation of iOS and tvOS applications with the OpenTelemetry API
kind: documentation
code_lang: swift
type: multi-code-lang
code_lang_weight: 80
description: 'Instrument your iOS and tvOS application with OpenTelemetry API, to send traces to Datadog.'
aliases:
- /tracing/trace_collection/otel_instrumentation/swift/
fur
ther_reading:
    - link: 'tracing/glossary/'
      tag: 'Documentation'
      text: 'Explore your services, resources, and traces'
    - link: '/opentelemetry/guide/otel_api_tracing_interoperability'
      tag: 'Documentation'
      text: 'Interoperability of OpenTelemetry API and Datadog instrumented traces'
---

{{% otel-custom-instrumentation %}}

## Requirements and limitations

<!-- TODO: version needs to corrected after release -->
- DatadogTrace for iOS and tvOS version 1.0.0+.

The following OpenTelemetry Swift features are implemented in the Datadog library as noted:

| Feature | Support notes |
|-|-|
| [Span attributes][2] | Supported |
| [Span events][3] | Unsupported |
| [Span exporters][5] | Unsupported |
| [Span links][1] | Supported |
| [Span processors][4] | Unsupported |
| Context propagation | [W3C Trace Context and Datadog header formats][6] are enabled by default.  |

## Tracing iOS Applications with OpenTelemetry

1. Declare the library as a dependency depending on your package manager:

{{< tabs >}}
{{% tab "CocoaPods" %}}

You can use [CocoaPods][7] to install `dd-sdk-ios`:
```
pod 'DatadogCore'
pod 'DatadogTrace'
```

{{% /tab %}}
{{% tab "Swift Package Manager (SPM)" %}}

To integrate using Apple's Swift Package Manager, add the following as a dependency to your `Package.swift`:
```swift
.package(url: "https://github.com/Datadog/dd-sdk-ios.git", .upToNextMajor(from: "2.0.0"))
```

In your project, link the following libraries:
```
DatadogCore
DatadogTrace
```

{{% /tab %}}
{{% tab "Carthage" %}}

You can use [Carthage][8] to install `dd-sdk-ios`:
```
github "DataDog/dd-sdk-ios"
```

In Xcode, link the following frameworks:
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

To be compliant with the GDPR regulation, the SDK requires the `trackingConsent` value at initialization.
The `trackingConsent` can be one of the following values:

- `.pending`: The SDK starts collecting and batching the data but does not send it to Datadog. The SDK waits for the new tracking consent value to decide what to do with the batched data.
- `.granted`: The SDK starts collecting the data and sends it to Datadog.
- `.notGranted`: The SDK does not collect any data: logs, traces, and RUM events are not sent to Datadog.

To change the tracking consent value after the SDK is initialized, use the `Datadog.set(trackingConsent:)` API call.

The SDK changes its behavior according to the new value. For example, if the current tracking consent is `.pending`:

- If changed to `.granted`, the SDK send all current and future data to Datadog;
- If changed to `.notGranted`, the SDK wipe all current data and stop collecting any future data.

Before data is uploaded to Datadog, it is stored in cleartext in the cache directory (`Library/Caches`) of your [application sandbox][12]. The cache directory cannot be read by any other app installed on the device.

When writing your application, enable development logs to log to console all internal messages in the SDK with a priority equal to or higher than the provided level.

{{< tabs >}}
{{% tab "Swift" %}}
```swift
Datadog.verbosityLevel = .debug
```
{{% /tab %}}
{{< /tabs >}}

3. Datadog tracer implements the [Open Telemetry standard][13]. Enable the Datadog tracer, register the tracer provider, and get the tracer instance.

{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogTrace

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

4. Instrument your code with the OpenTelemetry API.

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

1. (Optional) Attach an error to a span

{{< tabs >}}
{{% tab "Swift" %}}
```swift
span.status = .error(description: "Failed to decode response")
```
{{% /tab %}}
{{< /tabs >}}

8. (Optional) Add span links to your span

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
[6]: https://docs.datadoghq.com/real_user_monitoring/platform/connect_rum_and_traces/?tab=browserrum#opentelemetry-support
[7]: https://cocoapods.org/
[8]: https://github.com/Carthage/Carthage
[9]: https://docs.datadoghq.com/account_management/api-app-keys/#client-tokens
[10]: https://docs.datadoghq.com/account_management/api-app-keys/#api-keys
[11]: https://docs.datadoghq.com/account_management/api-app-keys/#client-tokens
[12]: https://support.apple.com/en-gb/guide/security/sec15bfe098e/web
[13]: https://opentelemetry.io/docs/concepts/signals/traces/
