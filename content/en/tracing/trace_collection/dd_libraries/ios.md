---
title: iOS Trace Collection
kind: documentation
aliases:
- /tracing/setup_overview/setup/ios/
- /tracing/setup/ios/
description: Collect traces from your iOS applications.
further_reading:
- link: https://github.com/DataDog/dd-sdk-ios
  tag: GitHub
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

## Setup

1. Declare the library as a dependency depending on your package manager:

{{< tabs >}}
{{% tab "CocoaPods" %}}

You can use [CocoaPods][4] to install `dd-sdk-ios`:
```
pod 'DatadogSDK'
```

[4]: https://cocoapods.org/

{{% /tab %}}
{{% tab "Swift Package Manager (SPM)" %}}

To integrate using Apple's Swift Package Manager, add the following as a dependency to your `Package.swift`:
```swift
.package(url: "https://github.com/Datadog/dd-sdk-ios.git", .upToNextMajor(from: "1.0.0"))
```

{{% /tab %}}
{{% tab "Carthage" %}}

You can use [Carthage][5] to install `dd-sdk-ios`:
```
github "DataDog/dd-sdk-ios"
```

[5]: https://github.com/Carthage/Carthage

{{% /tab %}}
{{< /tabs >}}

2. Initialize the library with your application context and your [Datadog client token][6]. For security reasons, you must use a client token: you cannot use [Datadog API keys][7] to configure the `dd-sdk-ios` library as they would be exposed client-side in the iOS application IPA byte code. For more information about setting up a client token, see the [client token documentation][6].

{{< site-region region="us" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
Datadog.initialize(
    appContext: .init(),
    trackingConsent: trackingConsent,
    configuration: Datadog.Configuration
        .builderUsing(clientToken: "<client_token>", environment: "<environment_name>")
        .set(serviceName: "app-name")
        .set(endpoint: .us1)
        .build()
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDConfigurationBuilder *builder = [DDConfiguration builderWithClientToken:@"<client_token>"
                                                              environment:@"<environment_name>"];
[builder setWithServiceName:@"app-name"];
[builder setWithEndpoint:[DDEndpoint us1]];

[DDDatadog initializeWithAppContext:[DDAppContext new]
                    trackingConsent:trackingConsent
                      configuration:[builder build]];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="eu" >}}
{{< tabs >}}
{{% tab "Swift" %}}
```swift
Datadog.initialize(
    appContext: .init(),
    trackingConsent: trackingConsent,
    configuration: Datadog.Configuration
        .builderUsing(clientToken: "<client_token>", environment: "<environment_name>")
        .set(serviceName: "app-name")
        .set(endpoint: .eu1)
        .build()
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDConfigurationBuilder *builder = [DDConfiguration builderWithClientToken:@"<client_token>"
                                                              environment:@"<environment_name>"];
[builder setWithServiceName:@"app-name"];
[builder setWithEndpoint:[DDEndpoint eu1]];

[DDDatadog initializeWithAppContext:[DDAppContext new]
                    trackingConsent:trackingConsent
                      configuration:[builder build]];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="us3" >}}
{{< tabs >}}
{{% tab "Swift" %}}
```swift
Datadog.initialize(
    appContext: .init(),
    trackingConsent: trackingConsent,
    configuration: Datadog.Configuration
        .builderUsing(clientToken: "<client_token>", environment: "<environment_name>")
        .set(serviceName: "app-name")
        .set(endpoint: .us3)
        .build()
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDConfigurationBuilder *builder = [DDConfiguration builderWithClientToken:@"<client_token>"
                                                              environment:@"<environment_name>"];
[builder setWithServiceName:@"app-name"];
[builder setWithEndpoint:[DDEndpoint us3]];

[DDDatadog initializeWithAppContext:[DDAppContext new]
                    trackingConsent:trackingConsent
                      configuration:[builder build]];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="us5" >}}
{{< tabs >}}
{{% tab "Swift" %}}
```swift
Datadog.initialize(
    appContext: .init(),
    trackingConsent: trackingConsent,
    configuration: Datadog.Configuration
        .builderUsing(clientToken: "<client_token>", environment: "<environment_name>")
        .set(serviceName: "app-name")
        .set(endpoint: .us5)
        .build()
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDConfigurationBuilder *builder = [DDConfiguration builderWithClientToken:@"<client_token>"
                                                              environment:@"<environment_name>"];
[builder setWithServiceName:@"app-name"];
[builder setWithEndpoint:[DDEndpoint us5]];

[DDDatadog initializeWithAppContext:[DDAppContext new]
                    trackingConsent:trackingConsent
                      configuration:[builder build]];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="gov" >}}
{{< tabs >}}
{{% tab "Swift" %}}
```swift
Datadog.initialize(
    appContext: .init(),
    trackingConsent: trackingConsent,
    configuration: Datadog.Configuration
        .builderUsing(clientToken: "<client_token>", environment: "<environment_name>")
        .set(serviceName: "app-name")
        .set(endpoint: .us1_fed)
        .build()
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDConfigurationBuilder *builder = [DDConfiguration builderWithClientToken:@"<client_token>"
                                                              environment:@"<environment_name>"];
[builder setWithServiceName:@"app-name"];
[builder setWithEndpoint:[DDEndpoint us1_fed]];

[DDDatadog initializeWithAppContext:[DDAppContext new]
                    trackingConsent:trackingConsent
                      configuration:[builder build]];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

To comply with GDPR regulations, the SDK requires the `trackingConsent` value at initialization.

Use one of the following values for `trackingConsent`:

- `.pending` - the SDK starts collecting and batching the data but does not send it to Datadog. The SDK waits for the new tracking consent value to decide what to do with the batched data.
- `.granted` - the SDK starts collecting the data and sends it to Datadog.
- `.notGranted` - the SDK does not collect any data. No logs, traces, or RUM events are sent to Datadog.

To change the tracking consent value after the SDK is initialized, use the `Datadog.set(trackingConsent:)` API call.

The SDK changes its behavior according to the new value.

For example, if the current tracking consent is `.pending`:

- If changed to `.granted`, the SDK sends all current and future data to Datadog.
- If changed to `.notGranted`, the SDK wipes all current data and does not collect future data.

Before data is uploaded to Datadog, it is stored in cleartext in the cache directory (`Library/Caches`) of your [application sandbox][11], which can't be read by any other app installed on the device.

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

3. Datadog tracer implements the [Open Tracing standard][8]. Configure and register the `Tracer` globally as Open Tracing `Global.sharedTracer`. You only need to do it once, usually in your `AppDelegate` code:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
Global.sharedTracer = Tracer.initialize(
    configuration: Tracer.Configuration(
        sendNetworkInfo: true
    )
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDTracerConfiguration *configuration = [[DDTracerConfiguration alloc] init];
[configuration sendNetworkInfo:YES];
DDGlobal.sharedTracer = [[DDTracer alloc] initWithConfiguration:configuration];
```
{{% /tab %}}
{{< /tabs >}}

4. Instrument your code using the following methods:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
let span = Global.sharedTracer.startSpan(operationName: "<span_name>")
// do something you want to measure ...
// ... then, when the operation is finished:
span.finish()
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
id<OTSpan> span = [DDGlobal.sharedTracer startSpan:@"<span_name>"];
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
let responseDecodingSpan = Global.sharedTracer.startSpan(
    operationName: "response decoding",
    childOf: networkRequestSpan.context // make it a child of `networkRequestSpan`
)
// ... decode HTTP response data ...
responseDecodingSpan.finish()
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
id<OTSpan> responseDecodingSpan = [DDGlobal.sharedTracer startSpan:@"response decoding"
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

let span = Global.sharedTracer.startSpan(operationName: "network request")

let headersWriter = HTTPHeadersWriter(samplingRate: 20)
Global.sharedTracer.inject(spanContext: span.context, writer: headersWriter)

for (headerField, value) in headersWriter.tracePropagationHTTPHeaders {
    request.addValue(value, forHTTPHeaderField: headerField)
}
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
id<OTSpan> span = [DDGlobal.sharedTracer startSpan:@"network request"];
DDHTTPHeadersWriter *headersWriter = [[DDHTTPHeadersWriter alloc] initWithSamplingRate:20];

NSError *error = nil;
[DDGlobal.sharedTracer inject:span.context
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

* In order for the SDK to automatically trace all network requests made to the given hosts, specify the `firstPartyHosts` array in the Datadog initialization and use `DDURLSessionDelegate` as a delegate of the `URLSession` instance you want to monitor:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
Datadog.initialize(
    appContext: .init(),
    configuration: Datadog.Configuration
        .builderUsing(clientToken: "<client_token>", environment: "<environment_name>")
        .trackURLSession(firstPartyHosts: ["example.com", "api.yourdomain.com"])
        .set(tracingSamplingRate: 20)
        .build()
)

let session = URLSession(
    configuration: .default,
    delegate: DDURLSessionDelegate(),
    delegateQueue: nil
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDConfigurationBuilder *builder = [DDConfiguration builderWithClientToken:@"<client_token>"
                                                                environment:@"<environment_name>"];

[builder trackURLSessionWithFirstPartyHosts:[NSSet setWithArray:@[@"example.com", @"api.yourdomain.com"]]];
[builder setWithTracingSamplingRate:20];

[DDDatadog initializeWithAppContext:[DDAppContext new]
                    trackingConsent:trackingConsent
                        configuration:[builder build]];

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

The following attributes in `Tracer.Configuration` can be used when creating the Tracer:

| Method                           | Description                                                                                                                                                                                                                         |
|----------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `serviceName`    | Set the value for the `service`. |
| `sendNetworkInfo` | Set to `true` to enrich traces with network connection info (reachability status, connection type, mobile carrier name, and more).|
| `globalTags`     | Set a `<KEY>:<VALUE>` pair of tags to be added to spans created by the Tracer. |
| `bundleWithRUM`    | Set to `true` to enable spans to be enriched with the current RUM View information. This enables you to see all of the spans produced during a specific View lifespan in the RUM Explorer. |
| `samplingRate`   | Set a value `0-100` to define the percentage of Traces to collect. |



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
