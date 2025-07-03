---
title: Best Practices for Tracing Native iOS and Android Apps
description: Learn how to instrument, use, and optimize Datadog's Trace SDK for native iOS and Android apps.
further_reading:
- link: '/real_user_monitoring/connect_rum_and_traces'
  tag: 'Documentation'
  text: 'Connect RUM and Traces'
- link: '/tracing/trace_collection/automatic_instrumentation/dd_libraries/ios'
  tag: 'Documentation'
  text: 'iOS Trace SDK'
- link: '/tracing/trace_collection/automatic_instrumentation/dd_libraries/android/'
  tag: 'Documentation'
  text: 'Android Trace SDK'
- link: '/tracing/trace_collection/custom_instrumentation/ios/otel/'
  tag: 'Documentation'
  text: 'OpenTelemetry for iOS'
- link: '/tracing/trace_collection/custom_instrumentation/android/otel/'
  tag: 'Documentation'
  text: 'OpenTelemetry for Android'
---

# Overview

Datadog's Trace SDK for [iOS][1] and [Android][2] lets you add APM spans to your mobile apps. This guide covers usage, key use cases, and sampling rates, with or without Datadog RUM.

## Native mobile tracing

Native mobile tracing allows you to manually instrument spans in your iOS or Android app code, giving you precise control over what operations are measured.

Unlike backend APM tracers, which automatically collect spans, mobile tracing requires you to start and stop spans around the specific actions you want to monitor. This approach works independently of Datadog RUM, but can also be used alongside it for deeper visibility into user experiences and backend interactions.

With Datadog's [Trace SDK for iOS][1] and [Trace SDK for Android][2], you can capture detailed performance data directly from your mobile applications. If you prefer, you can also use [OpenTelemetry for iOS][3] or [OpenTelemetry for Android][4] for custom instrumentation. These tools help you understand app performance, trace requests across services, and optimize both frontend and backend monitoring.

## Use cases

### Wrap a frontend-to-backend distributed trace under a native span

You can create distributed traces that span from your mobile frontend to your backend services. This is possible with or without RUM. For example, you can wrap one or more frontend-to-backend traces under a manually created span using the Trace SDK.

{{< tabs >}}
{{% tab "iOS" %}}
Use the [manual context propagation][1] to inject trace headers into network requests. Use `setActive()` to link child spans to a parent span ([API reference][2]).

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/ios?tab=swiftpackagemanagerspm#:~:text=(Optional)%20To%20distribute%20traces%20between%20your%20environments%2C%20for%20example%20frontend%20%2D%20backend%2C%20you%20can%20either%20do%20it%20manually%20or%20leverage%20our%20auto%20instrumentation.%20In%20both%20cases%2C%20network%20traces%20are%20sampled%20with%20an%20adjustable%20sampling%20rate.%20A%20sampling%20of%2020%25%20is%20applied%20by%20default
[2]: https://swiftpackageindex.com/datadog/dd-sdk-ios/develop/documentation/datadogtrace/otspan/setactive/

{{% /tab %}}
{{% tab "Android" %}}

Use [OkHttp parent span helpers][1] or [OpenTelemetry addParentSpan][2] to link spans across threads.

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/android/?tab=kotlin#okhttp
[2]: /tracing/trace_collection/custom_instrumentation/android/otel/?tab=kotlin#:~:text=(Optional)%20Add%20local%20parent%20span%20to%20the%20span%20generated%20around%20the%20OkHttp%20request%20in%20RUM%3A

{{% /tab %}}
{{< /tabs >}}

**Note**: Wrapping RUM resource spans under a native span works automatically if the parent span is on the same thread as the network call. Otherwise, use the provided helpers to set the parent span manually.

### Profiling native application performance

Instrumenting multiple native spans and linking them (using `setActive` on iOS or `addParentSpan` on Android) allows you to profile key parts of your app. This helps you:
- Understand how different methods and components interact
- Break down performance bottlenecks
- Gain actionable insights into app behavior

Here's how to manually instrument a span in your mobile app using the Trace SDK:

{{< tabs >}}
{{% tab "iOS" %}}
```swift
let span = tracer.startSpan(operationName: "<span_name>")
// ... code to measure ...
span.finish()
```
See [more iOS examples][1].

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/ios?tab=swiftpackagemanagerspm

{{% /tab %}}
{{% tab "Android" %}}

```kotlin
val span = tracer.buildSpan("<span_name>").start()
// ... code to measure ...
span.finish()
```
See [more Android examples][1].

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/android/?tab=kotlin

{{% /tab %}}
{{< /tabs >}}

### Creating business spans

The Trace SDK is independent from RUM, so you can track business processes or flows that span multiple screens or views. For example, you can measure how long it takes users to complete a checkout flow, or how long a background sync takes, regardless of RUM session sampling. These business spans appear in the APM UI and can be used for custom metrics and dashboards.

## Sampling

Sampling in native mobile tracing controls which spans and traces appear in the Datadog UI, helping you balance visibility with data volume. All spans you instrument in your app are recorded and sent to Datadog, but only a subset that are based on your sampling rates and are displayed for analysis.

There are a few sampling rate parameters in the Datadog iOS SDK:

| Parameter                                   | Description                                                      |
|---------------------------------------------|------------------------------------------------------------------|
| `Trace.sampleRate`                          | Controls the percentage of traces (spans) collected by the tracer.|
| `urlSessionTracking.firstPartyHostsTracing.sampleRate` | Controls the percentage of network requests traced for first-party hosts. |
| `RUM.sessionSampleRate`                     | Controls the percentage of user sessions that are recorded for RUM.|
| `WebViewTracking.logsSampleRate`            | Controls the percentage of logs collected from WebViews.          |

### How sampling works

- **Local span sampling** applies to spans you create manually in your app. It's controlled by the `Trace.sampleRate` parameter. For example, if you set this rate to 50, all spans are sent, but only 50% are visible in the UI. Each span event includes the `_dd.agent_psr` field (the sampling rate) and `metrics._sampling_priority_v1` (1 for sampled, 0 for not sampled).
- **Distributed trace sampling** applies to traces that cross service boundaries, such as network requests to your backend. This is controlled by the `urlSessionTracking.firstPartyHostsTracing.sampleRate` parameter. If set to 50, only half of backend requests have the sampled flag set to true, as indicated by the [W3C trace context][7]. All Datadog agents honor this decision, so you see 50% of distributed traces in the UI.

Sampling rates are applied independently. The most restrictive rate determines what data is visible in the UI for a given session or trace. For example:
- If you set a low RUM session sample rate (for example, 1%), only 1% of user sessions are recorded for RUM, but you can still trace all network requests within those sessions by setting the network tracing sample rate to 100%.
- If you set a high trace sample rate but a low RUM sample rate, you may see traces without corresponding RUM data.

**Example scenario:**  
To sample 1% of all app sessions and trace all API networks within those sessions:
- Set `RUM.sessionSampleRate = 1`
- Set `urlSessionTracking.firstPartyHostsTracing.sampleRate = 100`

Sampling decisions are communicated through trace headers, ensuring all services in a distributed trace use the same sampling choice.

**Note**: This behavior applies only to iOS SDK `v2.9.0+`.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/ios
[2]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/android
[3]: /tracing/trace_collection/custom_instrumentation/ios/otel
[4]: /tracing/trace_collection/custom_instrumentation/android/otel
[5]: https://github.com/DataDog/dd-sdk-ios/blob/develop/DatadogTrace/Sources/TraceConfiguration.swift#L32
[6]: https://github.com/DataDog/dd-sdk-ios/blob/develop/DatadogTrace/Sources/TraceConfiguration.swift#L106
[7]: https://www.w3.org/TR/trace-context/#sampled-flag
