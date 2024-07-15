---
title: Tracing iOS Applications
aliases:
- /tracing/setup_overview/setup/ios/
- /tracing/setup/ios/
- /tracing/trace_collection/dd_libraries/ios
description: Collect traces from your iOS applications.
code_lang: ios
type: multi-code-lang
code_lang_weight: 90
further_reading:
- link: https://github.com/DataDog/dd-sdk-ios
  tag: "Source Code"
  text: dd-sdk-ios Source code
- link: tracing/visualization/
  tag: Documentation
  text: Explore your services, resources, and traces
---
Send [traces][1] to Datadog from your iOS applications with [Datadog's `dd-sdk-ios` client-side tracing library][2] and leverage the following features:

* Create custom [spans][3] for various operations in your app.
* Send logs for each span individually.
* Use default and add custom attributes to each span.
* Leverage optimized network usage with automatic bulk posts.

<div class="alert alert-info"><strong>Note</strong>: Datadog charges for <strong>ingested and indexed</strong> spans sent from your iOS applications, but does not charge for the underlying devices. Read more in the <a href="/account_management/billing/apm_tracing_profiler/">APM billing documentation</a>.</div>

## Setup

1. Declare the library as a dependency depending on your package manager:

{{< tabs >}}
{{% tab "CocoaPods" %}}

You can use [CocoaPods][4] to install `dd-sdk-ios`. For security reasons, use the Git provider and the hash of a specific commit:
```
pod 'DatadogCore', :git => 'https://github.com/DataDog/dd-sdk-ios.git', :commit => '<COMMIT_HASH>' # Example hash: '312e7c2f43'
pod 'DatadogTrace'
```

[4]: https://cocoapods.org/

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

You can use [Carthage][5] to install `dd-sdk-ios`:
```
github "DataDog/dd-sdk-ios"
```

In Xcode, link the following frameworks:
```
DatadogInternal.xcframework
DatadogCore.xcframework
DatadogTrace.xcframework
```

[5]: https://github.com/Carthage/Carthage

{{% /tab %}}
{{< /tabs >}}

2. Initialize the library with your application context and your [Datadog client token][2]. For security reasons, you must use a client token: you cannot use [Datadog API keys][3] to configure the `dd-sdk-ios` library as they would be exposed client-side in the iOS application IPA byte code.

For more information about setting up a client token, see the [client token documentation][2].

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
{{% tab "Objective-C" %}}
```objective-c
DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";

[DDDatadog initializeWithConfiguration:configuration
                        trackingConsent:trackingConsent];
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
{{% tab "Objective-C" %}}
```objective-c
DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
configuration.site = [DDSite eu1];

[DDDatadog initializeWithConfiguration:configuration
                        trackingConsent:trackingConsent];
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
{{% tab "Objective-C" %}}
```objective-c
DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
configuration.site = [DDSite us3];

[DDDatadog initializeWithConfiguration:configuration
                        trackingConsent:trackingConsent];
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
{{% tab "Objective-C" %}}
```objective-c
DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
configuration.site = [DDSite us5];

[DDDatadog initializeWithConfiguration:configuration
                        trackingConsent:trackingConsent];
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
{{% tab "Objective-C" %}}
```objective-c
DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
configuration.site = [DDSite us1_fed];

[DDDatadog initializeWithConfiguration:configuration
                        trackingConsent:trackingConsent];
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
{{% tab "Objective-C" %}}
```objective-c
DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
configuration.site = [DDSite ap1];

[DDDatadog initializeWithConfiguration:configuration
                        trackingConsent:trackingConsent];
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

Before data is uploaded to Datadog, it is stored in cleartext in the cache directory (`Library/Caches`) of your [application sandbox][6]. The cache directory cannot be read by any other app installed on the device.

When writing your application, enable development logs to log to console all internal messages in the SDK with a priority equal to or higher than the provided level.

{{< tabs >}}
{{% tab "Swift" %}}
```swift
Datadog.verbosityLevel = .debug
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```
DDDatadog.verbosityLevel = DDSDKVerbosityLevelDebug;
```
{{% /tab %}}
{{< /tabs >}}

3. Datadog tracer implements both [OpenTracing][8] and [OpenTelemetry][12] standards. Configure and enable the shared an OpenTracing `Tracer` as `Tracer.shared()`:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogTrace

Trace.enable(
    with: Trace.Configuration(
        networkInfoEnabled: true
    )
)

let tracer = Tracer.shared()
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDTraceConfiguration *configuration = [[DDTraceConfiguration alloc] init];
configuration.networkInfoEnabled = YES;

[DDTrace enableWithConfiguration:configuration];

DDTracer *tracer = [Tracer shared];
```
{{% /tab %}}
{{< /tabs >}}

4. Instrument your code using the following methods:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
let span = tracer.startSpan(operationName: "<span_name>")
// do something you want to measure ...
// ... then, when the operation is finished:
span.finish()
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
id<OTSpan> span = [tracer startSpan:@"<span_name>"];
// do something you want to measure ...
// ... then, when the operation is finished:
[span finish];
```
{{% /tab %}}
{{< /tabs >}}

5. (Optional) - Set child-parent relationship between your spans:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
let responseDecodingSpan = tracer.startSpan(
    operationName: "response decoding",
    childOf: networkRequestSpan.context // make it a child of `networkRequestSpan`
)
// ... decode HTTP response data ...
responseDecodingSpan.finish()
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
id<OTSpan> responseDecodingSpan = [tracer startSpan:@"response decoding"
                                                            childOf:networkRequestSpan.context];
// ... decode HTTP response data ...
[responseDecodingSpan finish];
```
{{% /tab %}}
{{< /tabs >}}

6. (Optional) - Provide additional tags alongside your span:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
span.setTag(key: "http.url", value: url)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
[span setTag:@"http.url" value:url];
```
{{% /tab %}}
{{< /tabs >}}

7. (Optional) Attach an error to a span - you can do so by logging the error information using the [standard Open Tracing log fields][9]:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
span.log(
    fields: [
        OTLogFields.event: "error",
        OTLogFields.errorKind: "I/O Exception",
        OTLogFields.message: "File not found",
        OTLogFields.stack: "FileReader.swift:42",
    ]
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
[span log:@{
    @"event": @"error",
    @"error.kind": @"I/O Exception",
    @"message": @"File not found",
    @"stack": @"FileReader.swift:42",
}];
```
{{% /tab %}}
{{< /tabs >}}

8. (Optional) To distribute traces between your environments, for example frontend - backend, you can either do it manually or leverage our auto instrumentation. In both cases, network traces are sampled with an adjustable sampling rate. A sampling of 20% is applied by default.

* To manually propagate the trace, inject the span context into `URLRequest` headers:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
var request: URLRequest = ... // the request to your API

let span = tracer.startSpan(operationName: "network request")

let headersWriter = HTTPHeadersWriter(samplingRate: 20)
tracer.inject(spanContext: span.context, writer: headersWriter)

for (headerField, value) in headersWriter.tracePropagationHTTPHeaders {
    request.addValue(value, forHTTPHeaderField: headerField)
}
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
id<OTSpan> span = [tracer startSpan:@"network request"];
DDHTTPHeadersWriter *headersWriter = [[DDHTTPHeadersWriter alloc] initWithSamplingRate:20];

NSError *error = nil;
[tracer inject:span.context
        format:OT.formatTextMap
    carrier:headersWriter
        error:&error];

for (NSString *key in headersWriter.tracePropagationHTTPHeaders) {
    NSString *value = headersWriter.tracePropagationHTTPHeaders[key];
    [request addValue:value forHTTPHeaderField:key];
}
```
{{% /tab %}}
{{< /tabs >}}

This sets additional tracing headers on your request so your backend can extract the request and continue distributed tracing. Once the request is done, call `span.finish()` within a completion handler. If your backend is also instrumented with [Datadog APM & Distributed Tracing][10], the entire front-to-back trace appears in the Datadog dashboard.

* In order for the SDK to automatically trace all network requests made to the given hosts, specify the `firstPartyHosts` array in the Datadog initialization, enable `URLSessionInstrumentation` for your delegate type and pass the delegate instance to the URLSession:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogTrace

Trace.enable(
    with: Trace.Configuration(
        urlSessionTracking: Trace.Configuration.URLSessionTracking(
            firstPartyHostsTracing: .trace(hosts: ["example.com", "api.yourdomain.com"])
        )
    )
)

URLSessionInstrumentation.enable(
    with: .init(
        delegateClass: SessionDelegate.self,
    )
)

let session = URLSession(
    configuration: .default,
    delegate: SessionDelegate(),
    delegateQueue: nil
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
@import DatadogObjc;

DDTraceFirstPartyHostsTracing *firstPartyHosts = [DDTraceFirstPartyHostsTracing alloc] initWithHosts:@[@"example.com", @"api.yourdomain.com"]
                                                                                            sampleRate: 20];

DDTraceURLSessionTracking *urlSessionTracking = [DDTraceURLSessionTracking alloc] initWithFirstPartyHostsTracing:firstPartyHosts];
DDTraceConfiguration *configuration = [[DDTraceConfiguration] alloc] init];
[configuration setURLSessionTracking:urlSessionTracking];

[DDTrace enableWithConfiguration:configuration];

NSURLSession *session = [NSURLSession sessionWithConfiguration:[NSURLSessionConfiguration defaultSessionConfiguration]
                                                        delegate:[[DDNSURLSessionDelegate alloc] init]
                                                    delegateQueue:nil];
```
{{% /tab %}}
{{< /tabs >}}

This traces all requests made with this `session` to `example.com` and `api.yourdomain.com` hosts (for example, `https://api.yourdomain.com/v2/users` or `https://subdomain.example.com/image.png`).

**Note**: Tracing auto-instrumentation uses `URLSession` swizzling and is opt-in. If you do not specify `firstPartyHosts`, swizzling is not applied.

## Batch collection

All the spans are first stored on the local device in batches. Each batch follows the intake specification. They are sent periodically if network is available, and the battery is high enough to ensure the Datadog SDK does not impact the end user's experience. If the network is not available while your application is in the foreground, or if an upload of data fails, the batch is kept until it can be sent successfully.

This means that even if users open your application while being offline, no data will be lost.

The data on disk will automatically be discarded if it gets too old to ensure the SDK doesn't use too much disk space.

## Initialization

The following attributes in `Trace.Configuration` can be used when creating the Tracer:

| Method | Description |
|---|---|
| `service` | Set the value for the `service`. |
| `networkInfoEnabled` | Set to `true` to enrich traces with network connection info (reachability status, connection type, mobile carrier name, and more).|
| `tags` | Set a `<KEY>:<VALUE>` pair of tags to be added to spans created by the Tracer. |
| `bundleWithRumEnabled` | Set to `true` to enable spans to be enriched with the current RUM View information. This enables you to see all of the spans produced during a specific View lifespan in the RUM Explorer. |
| `sampleRate` | Set a value `0-100` to define the percentage of Traces to collect. |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/tracing/visualization/#trace
[2]: https://github.com/DataDog/dd-sdk-ios
[3]: https://docs.datadoghq.com/tracing/visualization/#spans
[6]: https://docs.datadoghq.com/account_management/api-app-keys/#client-tokens
[7]: https://docs.datadoghq.com/account_management/api-app-keys/#api-keys
[8]: https://opentracing.io
[9]: https://github.com/opentracing/specification/blob/master/semantic_conventions.md#log-fields-table
[10]: https://docs.datadoghq.com/tracing/
[11]: https://support.apple.com/guide/security/security-of-runtime-process-sec15bfe098e/web
[12]: /tracing/trace_collection/custom_instrumentation/ios/otel
