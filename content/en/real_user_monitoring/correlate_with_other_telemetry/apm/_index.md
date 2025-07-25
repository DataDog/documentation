---
title: Connect RUM and Traces
aliases:
- /real_user_monitoring/connect_rum_and_traces
- /real_user_monitoring/platform/connect_rum_and_traces/
further_reading:
  - link: "https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/"
    tag: "Blog"
    text: "Real User Monitoring"
  - link: "https://www.datadoghq.com/blog/modern-frontend-monitoring/"
    tag: "Blog"
    text: "Start monitoring single-page applications"
  - link: "/logs/guide/ease-troubleshooting-with-cross-product-correlation/"
    tag: "Guide"
    text: "Ease troubleshooting with cross-product correlation"
  - link: "/tracing/"
    tag: "Documentation"
    text: "APM and Distributed Tracing"
  - link: "/real_user_monitoring"
    tag: "Documentation"
    text: "RUM & Session Replay"
  - link: "https://www.datadoghq.com/blog/troubleshoot-with-session-replay-developer-tools/"
    tag: "Blog"
    text: "Troubleshoot with Session Replay browser dev tools"
  - link: "https://www.datadoghq.com/blog/correlate-traces-datadog-rum-otel/"
    tag: "Blog"
    text: "Correlate Datadog RUM events with traces from OpenTelemetry-instrumented applications"
algolia:
  tags: ['rum traces']
---

{{< img src="real_user_monitoring/connect_rum_and_traces/rum-trace-tab.png" alt="RUM and Traces" style="width:100%;">}}

## Overview

The APM integration with Real User Monitoring allows you to link requests from your web and mobile applications to their corresponding backend traces. This combination enables you to see your full frontend and backend data through one lens.

Use frontend data from RUM, as well as backend, infrastructure, and log information from trace ID injection to pinpoint issues anywhere in your stack and understand what your users are experiencing.

To start sending just your iOS application's traces to Datadog, see [iOS Trace Collection][1].

## Usage

### Prerequisites

-   You have set up [APM tracing][2] on the services targeted by your RUM applications.
-   Your services use an HTTP server.
-   Your HTTP servers are using [a library that supports distributed tracing](#supported-libraries).
-   You have the following set up based on your SDK:
    - With the **Browser SDK**, you have added the XMLHttpRequest (XHR) or Fetch resources on the RUM Explorer to your `allowedTracingUrls`.
    - With the **Mobile SDK**, you have added the Native or XMLHttpRequest (XHR) to your `firstPartyHosts`.
-   You have a corresponding trace for requests to `allowedTracingUrls` or `firstPartyHosts`.

### Setup RUM

**Note:** Configuring RUM and Traces makes use of APM paid data in RUM, which may impact your APM billing.

{{< tabs >}}
{{% tab "Browser RUM" %}}

1. Set up [RUM Browser Monitoring][1].

2. Initialize the RUM SDK. Configure the `allowedTracingUrls` initialization parameter with the list of internal, first-party origins called by your browser application.

   For **npm install**:
    ```javascript
    import { datadogRum } from '@datadog/browser-rum'

    datadogRum.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      site: 'datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      allowedTracingUrls: [
        "https://api.example.com",
        // Matches any subdomain of my-api-domain.com, such as https://foo.my-api-domain.com
        /^https:\/\/[^\/]+\.my-api-domain\.com/,
        // You can also use a function for advanced matching:
        (url) => url.startsWith("https://api.example.com")
      ],
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // if not specified, defaults to 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    })
    ```

   For **CDN install**:

   ```javascript
   window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      site: 'datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      allowedTracingUrls: [
        "https://api.example.com",
        // Matches any subdomain of my-api-domain.com, such as https://foo.my-api-domain.com
        /^https:\/\/[^\/]+\.my-api-domain\.com/,
        // You can also use a function for advanced matching:
        (url) => url.startsWith("https://api.example.com")
      ],
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // if not included, the default is 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    })
   ```

    To connect RUM to Traces, you need to specify your browser application in the `service` field.

    `allowedTracingUrls` matches the full URL (`<scheme>://<host>[:<port>]/<path>[?<query>][#<fragment>]`). It accepts the following types:
      - `string`: matches any URL that starts with the value, so `https://api.example.com` matches `https://api.example.com/v1/resource`.
      - `RegExp`: matches if any substring of the URL matches the provided RegExp. For example, `/^https:\/\/[^\/]+\.my-api-domain\.com/` matches URLs like `https://foo.my-api-domain.com/path`, but not `https://notintended.com/?from=guess.my-api-domain.com`. **Note:** The RegExp is not anchored to the start of the URL unless you use `^`. Be careful, as overly broad patterns can unintentionally match unwanted URLs and cause CORS errors.
      - `function`: evaluates with the URL as parameter. Returning a `boolean` set to `true` indicates a match.

<div class="alert alert-warning">When using RegExp, the pattern is tested against the entire URL as a substring, not just the prefix. To avoid unintended matches, anchor your RegExp with `^` and be as specific as possible. </div>

3.  _(Optional)_ Configure the `traceSampleRate` initialization parameter to keep a defined percentage of the backend traces. If not set, 100% of the traces coming from browser requests are sent to Datadog. To keep 20% of backend traces, for example:

    ```javascript
    import { datadogRum } from '@datadog/browser-rum'

    datadogRum.init({
        ...otherConfig,
        traceSampleRate: 20
    })
    ```

**Note**: `traceSampleRate` **does not** impact RUM sessions sampling. Only backend traces are sampled out.

4. _(Optional)_ If you set a `traceSampleRate`, to ensure backend services' sampling decisions are still applied, configure the `traceContextInjection` initialization parameter to `sampled` (set to `all` by default).

    For example, if you set the `traceSampleRate` to 20% in the Browser SDK:
    - When `traceContextInjection` is set to `all`, **20%** of backend traces are kept and **80%** of backend traces are dropped.

  {{< img src="real_user_monitoring/connect_rum_and_traces/traceContextInjection_all-2.png" alt="traceContextInjection set to all" style="width:90%;">}}

  - When `traceContextInjection` is set to `sampled`, **20%** of backend traces are kept. For the remaining **80%**, the browser SDK **does not inject** a sampling decision. The decision is made on the server side and is based on the tracing library head-based sampling [configuration][2]. In the example below, the backend sample rate is set to 40%, and therefore 32% of the remaining backend traces are kept.

    {{< img src="real_user_monitoring/connect_rum_and_traces/traceContextInjection_sampled-3.png" alt="traceContextInjection set to sampled" style="width:90%;">}}

<div class="alert alert-info">End-to-end tracing is available for requests fired after the Browser SDK is initialized. End-to-end tracing of the initial HTML document and early browser requests is not supported.</div>

[1]: /real_user_monitoring/browser/
[2]: /tracing/trace_pipeline/ingestion_mechanisms/#head-based-sampling
{{% /tab %}}
{{% tab "Android RUM" %}}

1. Set up [RUM Android Monitoring][1].
2. Set up [Android Trace Collection][2].
3. Add the Gradle dependency to the `dd-sdk-android-okhttp` library in the module-level `build.gradle` file:

    ```groovy
    dependencies {
        implementation "com.datadoghq:dd-sdk-android-okhttp:x.x.x"
    }
    ```

4. Configure the `OkHttpClient` interceptor with the list of internal, first-party origins called by your Android application.
    ```kotlin
    val tracedHosts = listOf("example.com", "example.eu")

    val okHttpClient = OkHttpClient.Builder()
        .addInterceptor(DatadogInterceptor.Builder(tracedHosts).build())
        .addNetworkInterceptor(TracingInterceptor.Builder(tracedHosts).build())
        .eventListenerFactory(DatadogEventListener.Factory())
        .build()
    ```

    By default, all subdomains of listed hosts are traced. For instance, if you add `example.com`, you also enable the tracing for `api.example.com` and `foo.example.com`.

3.  _(Optional)_ Configure the `traceSampler` parameter to keep a defined percentage of the backend traces. If not set, 20% of the traces coming from application requests are sent to Datadog. To keep 100% of backend traces:

    ```kotlin
        val tracedHosts = listOf("example.com")

        val okHttpClient = OkHttpClient.Builder()
        .addInterceptor(
            DatadogInterceptor.Builder(tracedHosts)
                .setTraceSampler(RateBasedSampler(100f))
                .build()
        )
        .build()
    ```

**Note**:
* `traceSampler` **does not** impact RUM sessions sampling. Only backend traces are sampled out.
* If you define custom tracing header types in the Datadog configuration and are using a tracer registered with `GlobalTracer`, make sure the same tracing header types are set for the tracer in use.

[1]: /real_user_monitoring/android/
[2]: /tracing/trace_collection/dd_libraries/android/?tab=kotlin
{{% /tab %}}
{{% tab "iOS RUM" %}}

1. Set up [RUM iOS Monitoring][1].

2. Enable `RUM` with the `urlSessionTracking` option and `firstPartyHostsTracing` parameter:
    ```swift
    RUM.enable(
        with: RUM.Configuration(
            applicationID: "<rum application id>",
            urlSessionTracking: .init(
                firstPartyHostsTracing: .trace(
                    hosts: [
                        "example.com",
                        "api.yourdomain.com"
                    ]
                )
            )
        )
    )
    ```

3. Enable URLSession instrumentation for your `SessionDelegate` type, which conforms to `URLSessionDataDelegate` protocol:
    ```swift
    URLSessionInstrumentation.enable(
        with: .init(
            delegateClass: <YourSessionDelegate>.self
        )
    )
    ```

4. Initialize URLSession as stated in [Setup][1]:
    ```swift
    let session =  URLSession(
        configuration: ...,
        delegate: <YourSessionDelegate>(),
        delegateQueue: ...
    )
    ```

   By default, all subdomains of listed hosts are traced. For instance, if you add `example.com`, you also enable tracing for `api.example.com` and `foo.example.com`.

   Trace ID injection works when you are providing a `URLRequest` to the `URLSession`. Distributed tracing does not work when you are using a `URL` object.

5. _(Optional)_ Set the `sampleRate` parameter to keep a defined percentage of the backend traces. If not set, 20% of the traces coming from application requests are sent to Datadog.

     To keep 100% of backend traces:
    ```swift
    RUM.enable(
        with: RUM.Configuration(
            applicationID: "<rum application id>",
            urlSessionTracking: .init(
                firstPartyHostsTracing: .trace(
                    hosts: [
                        "example.com",
                        "api.yourdomain.com"
                    ],
                    sampleRate: 100
                )
            )
        )
    )
    ```
**Note**: `sampleRate` **does not** impact RUM sessions sampling. Only backend traces are sampled out.

[1]: /real_user_monitoring/ios/
{{% /tab %}}
{{% tab "React Native RUM" %}}

1. Set up [RUM React Native Monitoring][1].

2. Set the `firstPartyHosts` initialization parameter to define the list of internal, first-party origins called by your React Native application:
    ```javascript
    const config = new DatadogProviderConfiguration(
        // ...
    );
    config.firstPartyHosts = ["example.com", "api.yourdomain.com"];
    ```

    By default, all subdomains of listed hosts are traced. For instance, if you add `example.com`, you also enable tracing for `api.example.com` and `foo.example.com`.

3. _(Optional)_ Set the `resourceTracingSamplingRate` initialization parameter to keep a defined percentage of the backend traces. If not set, 20% of the traces coming from application requests are sent to Datadog.

     To keep 100% of backend traces:
    ```javascript
    const config = new DatadogProviderConfiguration(
        // ...
    );
    config.resourceTracingSamplingRate = 100;
    ```

    **Note**: `resourceTracingSamplingRate` **does not** impact RUM sessions sampling. Only backend traces are sampled out.

[1]: /real_user_monitoring/reactnative/
{{% /tab %}}
{{% tab "Flutter RUM" %}}

1. Set up [RUM Flutter Monitoring][1].

2. Follow the instructions under [Automatically track resources][2] to include the Datadog Tracking HTTP Client package and enable HTTP tracking. This includes the following changes to your initialization to add a list of internal, first-party origins called by your Flutter application:
    ```dart
    final configuration = DatadogConfiguration(
      // ...
      // added configuration
      firstPartyHosts: ['example.com', 'api.yourdomain.com'],
    )..enableHttpTracking()
    ```

[1]: /real_user_monitoring/mobile_and_tv_monitoring/flutter/setup/
[2]: /real_user_monitoring/mobile_and_tv_monitoring/flutter/advanced_configuration#automatically-track-resources
{{% /tab %}}


{{% tab "Roku RUM" %}}

{{< site-region region="gov" >}}
<div class="alert alert-warning">RUM for Roku is not available on the US1-FED Datadog site.</div>
{{< /site-region >}}

1. Set up [RUM Roku Monitoring][1].

2. Use the `datadogroku_DdUrlTransfer` component to perform your network requests.
    ```brightscript
        ddUrlTransfer = datadogroku_DdUrlTransfer(m.global.datadogRumAgent)
        ddUrlTransfer.SetUrl(url)
        ddUrlTransfer.EnablePeerVerification(false)
        ddUrlTransfer.EnableHostVerification(false)
        result = ddUrlTransfer.GetToString()
    ```

[1]: /real_user_monitoring/mobile_and_tv_monitoring/roku/setup/


{{% /tab %}}
{{% tab "Kotlin Multiplatform RUM" %}}

1. Set up [RUM Kotlin Multiplatform Monitoring][1].
2. Set up [Ktor instrumentation][2].

3. Set the `tracedHosts` initialization parameter in the Datadog Ktor Plugin configuration to define the list of internal, first-party origins called by your Kotlin Multiplatform application:
    ```kotlin
    val ktorClient = HttpClient {
        install(
            datadogKtorPlugin(
                tracedHosts = mapOf(
                    "example.com" to setOf(TracingHeaderType.DATADOG),
                    "example.eu" to setOf(TracingHeaderType.DATADOG)
                ),
                traceSampleRate = 100f
            )
        )
    }
    ```

    By default, all subdomains of listed hosts are traced. For instance, if you add `example.com`, you also enable tracing for `api.example.com` and `foo.example.com`.

4. _(Optional)_ Set the `traceSampleRate` initialization parameter to keep a defined percentage of the backend traces. If not set, 20% of the traces coming from application requests are sent to Datadog.

     To keep 100% of backend traces:
    ```kotlin
    val ktorClient = HttpClient {
        install(
            datadogKtorPlugin(
                tracedHosts = mapOf(
                    "example.com" to setOf(TracingHeaderType.DATADOG),
                    "example.eu" to setOf(TracingHeaderType.DATADOG)
                ),
                traceSampleRate = 100f
            )
        )
    }
    ```

    **Note**: `traceSampleRate` **does not** impact RUM sessions sampling. Only backend traces are sampled out.

[1]: /real_user_monitoring/mobile_and_tv_monitoring/kotlin_multiplatform/setup
[2]: /real_user_monitoring/mobile_and_tv_monitoring/kotlin_multiplatform/setup?tab=rum#initialize-the-rum-ktor-plugin-to-track-network-events-made-with-ktor
{{% /tab %}}
{{< /tabs >}}

### Verifying setup

To verify you've configured the APM integration with RUM, follow the steps below based on the SDK you installed RUM with.


{{< tabs >}}
{{% tab "Browser" %}}

1. Visit a page in your application.
2. In your browser's developer tools, go to the **Network** tab.
3. Check the request headers for a resource request that you expect to be correlated contains the [correlation headers from Datadog][1].

[1]: /real_user_monitoring/correlate_with_other_telemetry/apm?tab=browserrum#how-rum-resources-are-linked-to-traces

{{% /tab %}}
{{% tab "Android" %}}

1. Run your application from Android Studio.
2. Visit a screen in your application.
3. Open Android Studio's [Network Inspector][1].
4. Check the request headers for a RUM resource and verify that the [required headers are set by the SDK][2].

[1]: https://developer.android.com/studio/debug/network-profiler#network-inspector-overview
[2]: /real_user_monitoring/correlate_with_other_telemetry/apm?tab=androidrum#how-rum-resources-are-linked-to-traces

{{% /tab %}}
{{% tab "iOS" %}}

1. Run your application from Xcode.
2. Visit a screen in your application.
3. Open Xcode's [Network Connections and HTTP Traffic instrument][1].
4. Check the request headers for a RUM resource and verify that the [required headers are set by the SDK][2].

[1]: https://developer.apple.com/documentation/foundation/url_loading_system/analyzing_http_traffic_with_instruments
[2]: /real_user_monitoring/correlate_with_other_telemetry/apm/?tab=iosrum#how-rum-resources-are-linked-to-traces

{{% /tab %}}
{{% tab "React Native" %}}

1. Run your application from Xcode (iOS) or Android Studio (Android).
2. Visit a screen in your application.
3. Open Xcode's [Network Connections and HTTP Traffic instrument][1] or Android Studio's [Network Inspector][2].
4. Check the request headers for a RUM resource and verify that the [required headers are set by the SDK][3].

[1]: https://developer.apple.com/documentation/foundation/url_loading_system/analyzing_http_traffic_with_instruments
[2]: https://developer.android.com/studio/debug/network-profiler#network-inspector-overview
[3]: /real_user_monitoring/correlate_with_other_telemetry/apm/?tab=reactnativerum#how-rum-resources-are-linked-to-traces

{{% /tab %}}
{{% tab "Flutter" %}}

1. Run your application using your preferred IDE or `flutter run`.
2. Visit a screen in your application.
3. Open Flutter's [Dev Tools][1] and navigate to [Network View][2].
4. Check the request headers for a RUM resource and verify that the [required headers are set by the SDK][3].

[1]: https://docs.flutter.dev/tools/devtools/overview
[2]: https://docs.flutter.dev/tools/devtools/network
[3]: /real_user_monitoring/correlate_with_other_telemetry/apm/?tab=reactnativerum#how-rum-resources-are-linked-to-traces

{{% /tab %}}
{{% tab "Kotlin Multiplatform" %}}

1. Run your application from Xcode (iOS) or Android Studio (Android).
2. Visit a screen in your application.
3. Open Xcode's [Network Connections and HTTP Traffic instrument][1] or Android Studio's [Network Inspector][2].
4. Check the request headers for a RUM resource and verify that the [required headers are set by the SDK][3].

[1]: https://developer.apple.com/documentation/foundation/url_loading_system/analyzing_http_traffic_with_instruments
[2]: https://developer.android.com/studio/debug/network-profiler#network-inspector-overview
[3]: /real_user_monitoring/correlate_with_other_telemetry/apm/?tab=kotlinmultiplatformrum#how-rum-resources-are-linked-to-traces

{{% /tab %}}
{{< /tabs >}}

## RUM Explorer to Traces

{{< img src="real_user_monitoring/connect_rum_and_traces/rum-trace-apm-link.png" alt="RUM and Traces" style="width:100%;">}}

To view traces from the RUM Explorer:

1. Navigate to your [list of sessions][21] and click on a session that has traces available. You can also query for sessions with traces by using`@_dd.trace_id:*`.

When you select a session, the session panel appears with a request duration breakdown, a flame graph for each span, and a **View Trace in APM** link.

## Traces to RUM Explorer

{{< img src="real_user_monitoring/connect_rum_and_traces/rum-traces-to-rum.png" alt="RUM and Traces" style="width:100%;">}}

To view the RUM event from Traces:

1. Within a trace view, click **VIEW** to see all traces created during the view's lifespan, or **RESOURCE** to see traces associated with the specific resource from the Overview tab.
1. Click **See View in RUM** or **See Resource in RUM** to open the corresponding event in the RUM Explorer.

## Supported libraries

Below is a list of the supported backend libraries that need to be on the services receiving the network requests.

| Library          | Minimum Version |
| ---------------- | --------------- |
| [Python][3]      | [0.22.0][4]     |
| [Go][5]          | [1.10.0][6]     |
| [Java][7]        | [0.24.1][8]     |
| [Ruby][9]        | [0.20.0][10]    |
| [JavaScript][11] | [0.10.0][12]    |
| [PHP][13]        | [0.33.0][14]    |
| [.NET][15]       | [1.18.2][16]    |


## OpenTelemetry support

RUM supports several propagator types to connect resources with backends that are instrumented with OpenTelemetry libraries.

The default injection style is `tracecontext`, `Datadog`.

{{< tabs >}}
{{% tab "Browser RUM" %}}

**Note**: If you are using a backend framework such as Next.js/Vercel that uses OpenTelemetry, follow these steps.

1. Set up RUM to connect with APM as described above.

2. Modify `allowedTracingUrls` as follows:
    ```javascript
    import { datadogRum } from '@datadog/browser-rum'

    datadogRum.init({
        ...otherConfig,
        allowedTracingUrls: [
          { match: "https://api.example.com", propagatorTypes: ["tracecontext"]}
        ]
    })
    ```
    `match` accepts the same parameter types (`string`, `RegExp` or `function`) as when used in its simple form, described above.

    `propagatorTypes` accepts a list of strings for desired propagators:
      - `datadog`: Datadog's propagator (`x-datadog-*`)
      - `tracecontext`: [W3C Trace Context](https://www.w3.org/TR/trace-context/) (`traceparent`, `tracestate`)
      - `b3`: [B3 single header](https://github.com/openzipkin/b3-propagation#single-header) (`b3`)
      - `b3multi`: [B3 multiple headers](https://github.com/openzipkin/b3-propagation#multiple-headers) (`X-B3-*`)

{{% /tab %}}
{{% tab "iOS RUM" %}}

1. Set up RUM to connect with APM as described above.

2. Use `.traceWithHeaders(hostsWithHeaders:sampleRate:)` instead of `.trace(hosts:sampleRate:)` as follows:
    ```swift
      RUM.enable(
          with: RUM.Configuration(
              applicationID: "<rum application id>",
              urlSessionTracking: .init(
                  firstPartyHostsTracing: .traceWithHeaders(
                      hostsWithHeaders: [
                          "api.example.com": [.tracecontext]
                      ],
                      sampleRate: 100
                  )
              )
          )
      )
    ```
    `.traceWithHeaders(hostsWithHeaders:sampleRate:)` takes `Dictionary<String, Set<TracingHeaderType>>` as a parameter, where the key is a host and the value is a list of supported tracing header types.

    `TracingHeaderType` in an enum representing the following tracing header types:
      - `.datadog`: Datadog's propagator (`x-datadog-*`)
      - `.tracecontext`: [W3C Trace Context](https://www.w3.org/TR/trace-context/) (`traceparent`)
      - `.b3`: [B3 single header](https://github.com/openzipkin/b3-propagation#single-header) (`b3`)
      - `.b3multi`: [B3 multiple headers](https://github.com/openzipkin/b3-propagation#multiple-headers) (`X-B3-*`)
{{% /tab %}}

{{% tab "Android RUM" %}}
1. Set up RUM to connect with APM as described above.

2. Configure the `OkHttpClient` interceptor with the list of internal, first-party origins and the tracing header type to use as follows:
    ```kotlin
    val tracedHosts = mapOf("example.com" to setOf(TracingHeaderType.TRACECONTEXT),
                          "example.eu" to setOf(TracingHeaderType.DATADOG))

    val okHttpClient = OkHttpClient.Builder()
        .addInterceptor(DatadogInterceptor.Builder(tracedHosts).build())
        .addNetworkInterceptor(TracingInterceptor.Builder(tracedHosts).build())
        .eventListenerFactory(DatadogEventListener.Factory())
        .build()
    ```

    `TracingHeaderType` is an enum representing the following tracing header types:
      - `.DATADOG`: Datadog's propagator (`x-datadog-*`)
      - `.TRACECONTEXT`: [W3C Trace Context](https://www.w3.org/TR/trace-context/) (`traceparent`)
      - `.B3`: [B3 single header](https://github.com/openzipkin/b3-propagation#single-header) (`b3`)
      - `.B3MULTI`: [B3 multiple headers](https://github.com/openzipkin/b3-propagation#multiple-headers) (`X-B3-*`)

{{% /tab %}}

{{% tab "React Native RUM" %}}
1. Set up RUM to [connect with APM](#setup-rum).

2. Configure the RUM SDK with the list of internal, first-party origins and the tracing header type to use as follows:
    ```javascript
    const config = new DatadogProviderConfiguration(
        // ...
    );
    config.firstPartyHosts = [{
        match: "example.com",
        propagatorTypes: [
            PropagatorType.TRACECONTEXT,
            PropagatorType.DATADOG
        ]
    }];
    ```

    `PropagatorType` is an enum representing the following tracing header types:
      - `PropagatorType.DATADOG`: Datadog's propagator (`x-datadog-*`)
      - `PropagatorType.TRACECONTEXT`: [W3C Trace Context](https://www.w3.org/TR/trace-context/) (`traceparent`)
      - `PropagatorType.B3`: [B3 single header](https://github.com/openzipkin/b3-propagation#single-header) (`b3`)
      - `PropagatorType.B3MULTI`: [B3 multiple headers](https://github.com/openzipkin/b3-propagation#multiple-headers) (`X-B3-*`)

{{% /tab %}}

{{% tab "Flutter RUM" %}}
1. Set up RUM to connect with APM as described above.

2. Use `firstPartyHostsWithTracingHeaders` instead of `firstPartyHosts` as follows:
    ```dart
    final configuration = DatadogConfiguration(
      // ...
      // added configuration
      firstPartyHostsWithTracingHeaders: {
        'example.com': { TracingHeaderType.tracecontext },
      },
    )..enableHttpTracking()
    ```

    `firstPartyHostsWithTracingHeaders` takes `Map<String, Set<TracingHeaderType>>` as a parameter, where the key is a host and the value is a list of supported tracing header types.

    `TracingHeaderType` in an enum representing the following tracing header types:
      - `TracingHeaderType.datadog`: Datadog's propagator (`x-datadog-*`)
      - `TracingHeaderType.tracecontext`: [W3C Trace Context](https://www.w3.org/TR/trace-context/) (`traceparent`)
      - `TracingHeaderType.b3`: [B3 single header](https://github.com/openzipkin/b3-propagation#single-header) (`b3`)
      - `TracingHeaderType.b3multi`: [B3 multiple headers](https://github.com/openzipkin/b3-propagation#multiple-headers) (`X-B3-*`)

{{% /tab %}}

{{% tab "Kotlin Multiplatform RUM" %}}
1. Set up RUM to [connect with APM](#setup-rum).

2. Configure the RUM SDK with the list of internal, first-party origins and the tracing header type to use as follows:
    ```kotlin
    val ktorClient = HttpClient {
        install(
            datadogKtorPlugin(
                tracedHosts = mapOf(
                    "example.com" to setOf(TracingHeaderType.DATADOG),
                    "example.eu" to setOf(TracingHeaderType.DATADOG)
                ),
                traceSampleRate = 100f
            )
        )
    }
    ```

    `TracingHeaderType` is an enum representing the following tracing header types:
      - `TracingHeaderType.DATADOG`: Datadog's propagator (`x-datadog-*`)
      - `TracingHeaderType.TRACECONTEXT`: [W3C Trace Context](https://www.w3.org/TR/trace-context/) (`traceparent`)
      - `TracingHeaderType.B3`: [B3 single header](https://github.com/openzipkin/b3-propagation#single-header) (`b3`)
      - `TracingHeaderType.B3MULTI`: [B3 multiple headers](https://github.com/openzipkin/b3-propagation#multiple-headers) (`X-B3-*`)

{{% /tab %}}

{{< /tabs >}}


## How RUM resources are linked to traces

Datadog uses the distributed tracing protocol and sets up the HTTP headers below. By default, both trace context and Datadog-specific headers are used.
{{< tabs >}} {{% tab "Datadog" %}}
`x-datadog-trace-id`
: Generated from the Real User Monitoring SDK. Allows Datadog to link the trace with the RUM resource.

`x-datadog-parent-id`
: Generated from the Real User Monitoring SDK. Allows Datadog to generate the first span from the trace.

`x-datadog-origin: rum`
: To make sure the generated traces from Real User Monitoring don't affect your APM Index Spans counts.

`x-datadog-sampling-priority`
: Set to `1` by the Real User Monitoring SDK if the trace was sampled, or `0` if it was not.
{{% /tab %}}
{{% tab "W3C Trace Context" %}}

`traceparent: [version]-[trace id]-[parent id]-[trace flags]`
: `version`: The current specification assumes version is set to `00`.
: `trace id`: 128 bits trace ID, hexadecimal on 32 characters. The source trace ID is 64 bits to keep compatibility with APM.
: `parent id`: 64 bits span ID, hexadecimal on 16 characters.
: `trace flags`: Sampled (`01`) or not sampled (`00`)

`tracestate: dd=s:[sampling priority];o:[origin]`
: `dd`: Datadog's vendor prefix.
: `sampling priority`: Set to `1` if the trace was sampled, or `0` if it was not.
: `origin`: Always set to `rum` to make sure the generated traces from Real User Monitoring don't affect your APM Index Spans counts.

Example:
: `traceparent: 00-00000000000000008448eb211c80319c-b7ad6b7169203331s-01`
: `tracestate: dd=s:1;o:rum`

{{% /tab %}}
{{% tab "b3 / b3 Multiple Headers" %}}
`b3: [trace id]-[span id]-[sampled]`
: `trace id`: 64 bits trace ID, hexadecimal on 16 characters.
: `span id`: 64 bits span ID, hexadecimal on 16 characters.
: `sampled`: True (`1`) or False (`0`)

Example for b3 single header:
: `b3: 8448eb211c80319c-b7ad6b7169203331-1`

Example for b3 multiple headers:
: `X-B3-TraceId: 8448eb211c80319c`
: `X-B3-SpanId:  b7ad6b7169203331`
: `X-B3-Sampled: 1`
{{% /tab %}}
{{< /tabs >}}

These HTTP headers are not CORS-safelisted, so you need to [configure Access-Control-Allow-Headers][17] on your server handling requests that the SDK is set up to monitor. The server must also accept [preflight requests][18] (OPTIONS requests), which are made by the browser prior to every request when tracing is allowed on cross-site URLs.

## Effect on APM quotas

Connecting RUM and traces may significantly increase the APM-ingested volumes. Use the initialization parameter `traceSampleRate` to keep a share of the backend traces starting from browser and mobile requests.

## Trace retention

These traces are available for 15 minutes in the [Live Search][19] explorer. To retain the traces for a longer period of time, create [retention filters][20]. Scope these retention filters on any span tag to retain traces for critical pages and user actions.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/dd_libraries/ios/?tab=swiftpackagemanagerspm
[2]: /tracing
[3]: /tracing/trace_collection/dd_libraries/python/
[4]: https://github.com/DataDog/dd-trace-py/releases/tag/v0.22.0
[5]: /tracing/trace_collection/dd_libraries/go/
[6]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.10.0
[7]: /tracing/trace_collection/dd_libraries/java/
[8]: https://github.com/DataDog/dd-trace-java/releases/tag/v0.24.1
[9]: /tracing/trace_collection/dd_libraries/ruby/
[10]: https://github.com/DataDog/dd-trace-rb/releases/tag/v0.20.0
[11]: /tracing/trace_collection/dd_libraries/nodejs/
[12]: https://github.com/DataDog/dd-trace-js/releases/tag/v0.10.0
[13]: /tracing/trace_collection/dd_libraries/php/
[14]: https://github.com/DataDog/dd-trace-php/releases/tag/0.33.0
[15]: /tracing/trace_collection/dd_libraries/dotnet-core/
[16]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v1.18.2
[17]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Headers
[18]: https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request
[19]: /tracing/trace_explorer/#live-search-for-15-minutes
[20]: /tracing/trace_pipeline/trace_retention/#retention-filters
[21]: https://app.datadoghq.com/rum/explorer
