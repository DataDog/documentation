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

Native mobile tracing gives you precise control over what operations are measured by manually instrumenting spans in your iOS or Android app code. This approach works independently of Datadog RUM, but can also be used alongside it for deeper visibility into user experiences, code level performance, and backend interactions. You can also use [OpenTelemetry for iOS][3] or [OpenTelemetry for Android][4] for custom instrumentation.

Datadog's Trace SDK for [iOS][1] and [Android][2] lets you add APM spans to your mobile apps. This guide covers usage, key use cases, and sampling rates, with or without using the Datadog RUM SDK.

**Note**: When using the Trace SDK independently (without the RUM SDK), root spans for outgoing network requests do not get automatically created. Therefore, you need to manually start and stop spans on the client side to create frontend-to-backend distributed APM traces.

This guide focuses on native iOS and Android apps. For other mobile platforms, see the following documentation:

- [React Native RUM and APM][8]
- [Flutter RUM and APM][9]
- [Kotlin Multiplatform RUM and APM][10]
- [Unity RUM and APM][11]

For a comprehensive overview of correlating RUM with other telemetry data, see [Correlate RUM with other telemetry data][12].

## Use cases

### Wrap a frontend-to-backend distributed trace under a native span

You can create distributed traces that span from your mobile frontend to your backend services. The RUM SDK provides an automated way to produce client spans for outgoing network requests. Datadog's Trace SDK provides similar capability, but also allows you to wrap one or more frontend-to-backend traces under manually created spans.

{{< tabs >}}
{{% tab "iOS" %}}
Use the [manual context propagation][1] (see step 8) to inject trace headers into network requests. Use `setActive()` to link child spans to a parent span ([API reference][2]).

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/ios?tab=swiftpackagemanagerspm
[2]: https://swiftpackageindex.com/datadog/dd-sdk-ios/develop/documentation/datadogtrace/otspan/setactive()

{{% /tab %}}
{{% tab "Android" %}}

Use [OkHttp parent span helpers][1] (see step 10 on the linked page) or [OpenTelemetry addParentSpan][2] to link spans across threads.

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/android/?tab=kotlin#okhttp
[2]: /tracing/trace_collection/custom_instrumentation/android/otel/?tab=kotlin

{{% /tab %}}
{{< /tabs >}}

**Note**: Wrapping RUM resource spans under a native span works automatically if the parent span is on the same thread as the network call. Otherwise, use the provided helpers to set the parent span manually.

### Profiling native application performance

Instrumenting multiple native spans and linking them (using `setActive` on iOS or `activateSpan` on Android) allows you to profile key parts of your app. This helps you:
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

{{% android-otel-note %}}

OpenTelemetry approach (recommended):
```kotlin
import io.opentelemetry.api.GlobalOpenTelemetry
import io.opentelemetry.api.trace.Tracer

val tracer: Tracer = GlobalOpenTelemetry.get().getTracer("<tracer_name>")
val span = tracer.spanBuilder("<span_name>").startSpan()

span.end()
```

Datadog API approach:
```kotlin
import com.datadog.android.trace.GlobalDatadogTracer
import com.datadog.android.trace.api.tracer.DatadogTracer

val tracer: DatadogTracer = GlobalDatadogTracer.get()
val span = tracer.buildSpan("<span_name>").start()

span.finish()
```
See [more Android examples][1].

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/android/?tab=kotlin

{{% /tab %}}
{{< /tabs >}}

## Sampling

Sampling in native mobile tracing controls which spans and traces are ingested in Datadog, helping you balance visibility with data volume. When you manually instrument spans in your app, the ones that are sampled in go through the APM retention filters which determine which ones end up being displayed for analysis in the Datadog interface.

### How sampling works

Sampling affects different types of spans you create in your mobile app:

**Note**: The sampling behavior described below applies to iOS SDK `v2.9.0+` and Android SDK `v1.18.0+`. For earlier versions, see the respective SDK documentation for platform-specific sampling behavior.

- **Local span sampling** applies to manually instrumented spans (like performance profiling spans). It's controlled by the `Trace.sampleRate` parameter. For example, if you set this rate to 50, the Trace SD produces spans in 50% of the cases, and sends all of those to Datadog. Visibility of those spans in the UI depends on your APM retention filters. Each span event includes the `_dd.agent_psr` field (the sampling rate) and `metrics._sampling_priority_v1` (1 for sampled, 0 for not sampled).

- **Distributed trace sampling** applies to traces that cross service boundaries, such as network requests to your backend (relevant for the "Wrap a frontend-to-backend distributed trace" use case). This is controlled by the `urlSessionTracking.firstPartyHostsTracing.sampleRate` parameter for iOS and `DatadogInterceptor.Builder.setTraceSampler` parameter for Android. If set to 50, only half of backend requests have the sampled flag set to true, as indicated by the [W3C trace context][7]. All Datadog Agents honor this decision, so you see 50% of distributed traces in the UI.

Sampling rates are applied independently. The most restrictive rate determines what data is visible in the UI for a given session or trace. For example:
- If you set a low RUM session sample rate (for example, 1%), only 1% of user sessions are recorded for RUM, but you can still trace all network requests within those sessions by setting the network tracing sample rate to 100%.
- If you set a high trace sample rate but a low RUM sample rate, you may see traces without corresponding RUM data.

**Example scenario:**
To sample 1% of all app sessions and trace all API network requests within those sessions:
- Set `RUM.sessionSampleRate = 1` (controls RUM session sampling only)
- Set `urlSessionTracking.firstPartyHostsTracing.sampleRate = 100` (controls trace sampling for network requests)

Sampling decisions are communicated through trace headers, ensuring all services in a distributed trace use the same sampling choice.

### Sampling parameters

The following sampling rate parameters control different aspects of data collection:

{{< tabs >}}
{{% tab "iOS" %}}

| Parameter                                              | Description                                                                     | Example                  |
|--------------------------------------------------------|---------------------------------------------------------------------------------|--------------------------|
| `Trace.Configuration.sampleRate`                       | Controls the percentage of manually instrumented spans collected by the tracer. | `50` = 50% of spans      |
| `urlSessionTracking.firstPartyHostsTracing.sampleRate` | Controls the percentage of network requests traced for first-party hosts.       | `100` = 100% of requests |

**Note**: `RUM.sessionSampleRate` controls RUM session sampling and does not affect trace sampling rates. When using the Trace SDK independently of RUM, trace sampling is controlled only by the parameters listed above.

{{% /tab %}}
{{% tab "Android" %}}

| Parameter                                    | Description                                                                                                               | Example                  |
|----------------------------------------------|---------------------------------------------------------------------------------------------------------------------------|--------------------------|
| `OtelTracerProvider.Builder.setSampleRate()` | OpenTelemetry approach (**recommended**). Controls the percentage of manually instrumented spans collected by the tracer. | `50` = 50% of spans      |
| `DatadogTracerBuilder.withSampleRate`        | Datadog API approach. Controls the percentage of manually instrumented spans collected by the tracer.                     | `50` = 50% of spans      |
| `DatadogInterceptor.Builder.setTraceSampler` | Controls the percentage of network requests traced for first-party hosts.                                                 | `100` = 100% of requests |

**Note**: `RUM.sessionSampleRate` controls RUM session sampling and does not affect trace sampling rates. When using the Trace SDK independently of RUM, trace sampling is controlled only by the parameters listed above.

{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/ios
[2]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/android
[3]: /tracing/trace_collection/custom_instrumentation/ios/otel
[4]: /tracing/trace_collection/custom_instrumentation/android/otel
[5]: https://github.com/DataDog/dd-sdk-ios/blob/develop/DatadogTrace/Sources/TraceConfiguration.swift#L32
[6]: https://github.com/DataDog/dd-sdk-ios/blob/develop/DatadogTrace/Sources/TraceConfiguration.swift#L106
[7]: https://www.w3.org/TR/trace-context/#sampled-flag
[8]: /real_user_monitoring/reactnative/
[9]: /real_user_monitoring/flutter/
[10]: /real_user_monitoring/kotlin_multiplatform/
[11]: /real_user_monitoring/unity/
[12]: /real_user_monitoring/correlate_with_other_telemetry/
