---
title: Track frontend-to-backend traces
description: "Connect frontend RUM data with backend APM traces for end-to-end visibility across your application stack and user journey."
aliases:
- /real_user_monitoring/correlate_with_other_telemetry/apm/
content_filters:
  - trait_id: platform
    option_group_id: client_sdk_platform_options
further_reading:
- link: "/tracing/"
  tag: "Documentation"
  text: "APM and Distributed Tracing"
- link: "/real_user_monitoring/setup/data_collected/"
  tag: "Documentation"
  text: "Data collected by the RUM SDKs"
---

Select your SDK for platform-specific instructions on connecting frontend RUM data to backend APM traces.

{% img src="real_user_monitoring/connect_rum_and_traces/rum-trace-tab.png" alt="RUM and Traces" style="width:100%;" /%}

## Overview

The APM integration with Real User Monitoring allows you to link requests from your web and mobile applications to their corresponding backend traces. This combination enables you to see your full frontend and backend data through one lens.

Use frontend data from RUM, as well as backend, infrastructure, and log information from trace ID injection to pinpoint issues anywhere in your stack and understand what your users are experiencing.

## Prerequisites

- You have set up [APM tracing][1] on the services targeted by your RUM applications.
- Your services use an HTTP server.
- Your HTTP servers use [a library that supports distributed tracing](#supported-libraries).
- You have configured your allowed tracing URLs or first-party hosts, depending on your SDK. See the setup instructions for your platform below.
- You have a corresponding trace for requests to your allowed tracing URLs or first-party hosts.

<!-- Browser -->

{% if equals($platform, "browser") %}
{% partial file="sdk/track_frontend_to_backend_traces/browser.mdoc.md" /%}
{% /if %}

<!-- Android -->

{% if equals($platform, "android") %}
{% partial file="sdk/track_frontend_to_backend_traces/android.mdoc.md" /%}
{% /if %}

<!-- iOS -->

{% if equals($platform, "ios") %}
{% partial file="sdk/track_frontend_to_backend_traces/ios.mdoc.md" /%}
{% /if %}

<!-- React Native -->

{% if equals($platform, "react_native") %}
{% partial file="sdk/track_frontend_to_backend_traces/react_native.mdoc.md" /%}
{% /if %}

<!-- Flutter -->

{% if equals($platform, "flutter") %}
{% partial file="sdk/track_frontend_to_backend_traces/flutter.mdoc.md" /%}
{% /if %}

<!-- Kotlin Multiplatform -->

{% if equals($platform, "kotlin_multiplatform") %}
{% partial file="sdk/track_frontend_to_backend_traces/kotlin_multiplatform.mdoc.md" /%}
{% /if %}

<!-- Roku -->

{% if equals($platform, "roku") %}
{% partial file="sdk/track_frontend_to_backend_traces/roku.mdoc.md" /%}
{% /if %}

<!-- .NET MAUI -->

{% if equals($platform, "maui") %}
{% partial file="sdk/track_frontend_to_backend_traces/maui.mdoc.md" /%}
{% /if %}

<!-- Unity -->

{% if equals($platform, "unity") %}
{% partial file="sdk/track_frontend_to_backend_traces/unity.mdoc.md" /%}
{% /if %}

<!-- C / C++ -->

{% if equals($platform, "cpp") %}
{% partial file="sdk/track_frontend_to_backend_traces/unavailable.mdoc.md" /%}
{% /if %}

## View traces from the RUM Explorer

{% img src="real_user_monitoring/connect_rum_and_traces/rum-trace-apm-link.png" alt="RUM and Traces" style="width:100%;" /%}

To view traces from the RUM Explorer:

1. Navigate to your [list of sessions][2] and click on a session that has traces available. You can also query for resources with traces by using `@_dd.trace_id:*`.

When you select a session, the session panel appears with a request duration breakdown, a flame graph for each span, and a {% ui %}View Trace in APM{% /ui %} link.

## Traces to the RUM Explorer

{% img src="real_user_monitoring/connect_rum_and_traces/rum-traces-to-rum.png" alt="RUM and Traces" style="width:100%;" /%}

To view the RUM event from Traces:

1. Within a trace view, click {% ui %}VIEW{% /ui %} to see all traces created during the view's lifespan, or {% ui %}RESOURCE{% /ui %} to see traces associated with the specific resource from the {% ui %}Overview{% /ui %} tab.
2. Click {% ui %}See View in RUM{% /ui %} or {% ui %}See Resource in RUM{% /ui %} to open the corresponding event in the RUM Explorer.

## Supported libraries

The following are the supported backend libraries that need to be on the services receiving the network requests.

| Library          | Minimum Version |
| ---------------- | --------------- |
| [Python][3]      | [0.22.0][4]     |
| [Go][5]          | [1.10.0][6]     |
| [Java][7]        | [0.24.1][8]     |
| [Ruby][9]        | [0.20.0][10]    |
| [JavaScript][11] | [0.10.0][12]    |
| [PHP][13]        | [0.33.0][14]    |
| [.NET][15]       | [1.18.2][16]    |

## How RUM resources are linked to traces

Datadog uses the distributed tracing protocol and sets up the following HTTP headers. By default, both trace context and Datadog-specific headers are used.

These headers are added only when their corresponding propagator type is active. By default, RUM includes the `datadog` propagator alongside trace context. See OpenTelemetry support above to view or change which propagators are enabled.

{% tabs %}
{% tab label="Datadog" %}
`x-datadog-trace-id`
: Generated from the Real User Monitoring SDK. Allows Datadog to link the trace with the RUM resource.

`x-datadog-parent-id`
: Generated from the Real User Monitoring SDK. Allows Datadog to generate the first span from the trace.

`x-datadog-origin: rum`
: Generated from the Real User Monitoring SDK. Allows Datadog to detect the source of the trace.

`x-datadog-sampling-priority`
: Set to `1` by the Real User Monitoring SDK if the trace was sampled, or `0` if it was not.
{% /tab %}
{% tab label="W3C Trace Context" %}

`traceparent: [version]-[trace id]-[parent id]-[trace flags]`
: `version`: The current specification assumes version is set to `00`.
: `trace id`: 128 bits trace ID, hexadecimal on 32 characters. The source trace ID is 64 bits to keep compatibility with APM.
: `parent id`: 64 bits span ID, hexadecimal on 16 characters.
: `trace flags`: Sampled (`01`) or not sampled (`00`)

**Trace ID Conversion**: The 128-bit W3C trace ID is created by padding the original 64-bit source trace ID with leading zeros. This keeps the ID compatible with APM while conforming to the W3C Trace Context specification. The original 64-bit trace ID becomes the lower 64 bits of the 128-bit W3C trace ID.

`tracestate: dd=s:[sampling priority];o:[origin]`
: `dd`: Datadog's vendor prefix.
: `sampling priority`: Set to `1` if the trace was sampled, or `0` if it was not.
: `origin`: Always set to `rum` so the generated traces from Real User Monitoring don't affect your APM Index Spans counts.

**Examples**:

Source trace ID (64-bit): `8448eb211c80319c`

W3C Trace Context (128-bit): `00000000000000008448eb211c80319c`

The relationship shows that the original 64-bit trace ID `8448eb211c80319c` is padded with 16 leading zeros (`0000000000000000`) to create the 128-bit W3C trace ID.

Complete traceparent example:
: `traceparent: 00-00000000000000008448eb211c80319c-b7ad6b7169203331-01`
: `tracestate: dd=s:1;o:rum`

{% /tab %}
{% tab label="b3 / b3 Multiple Headers" %}
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
{% /tab %}
{% /tabs %}

These HTTP headers are not CORS-safelisted, so you need to [configure Access-Control-Allow-Headers][17] on your server handling requests that the SDK is set up to monitor. The server must also accept [preflight requests][18] (OPTIONS requests), which are made by the browser prior to every request when tracing is allowed on cross-site URLs.

## Trace retention

Ingested traces are available for 15 minutes in the [Live Search][19] explorer. To retain the traces for a longer period of time, [create APM retention filters][20]. Scope these retention filters on any span tag to retain traces for critical pages and user actions.

If using RUM Without Limits, you can also use [cross-product retention filters][21] to retain APM traces associated to specific RUM sessions, optimizing the correlation between your frontend and your backend. By default 1% of RUM [sessions and their traces are automatically retained][22] at no additional cost.

## Effect on APM quotas

Connecting RUM and traces may significantly increase the APM-ingested volumes. Use the initialization parameter `traceSampleRate` to control a share of the backend traces starting from browser and mobile requests to ingest.

Configuring cross-product retention filters may also increase the APM-indexed volumes. Use the retention rate of the cross-product retention filters to control the share of the backend traces to index.

[1]: /tracing
[2]: https://app.datadoghq.com/rum/explorer
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
[21]: /real_user_monitoring/rum_without_limits/retention_filters/#cross-product-retention-filters
[22]: /tracing/trace_pipeline/trace_retention/#one-percent-flat-sampling
