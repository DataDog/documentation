<div class="alert alert-info">
Unsure when to use OpenTelemetry with Datadog? Start with <a href="/tracing/trace_collection/custom_instrumentation/otel_instrumentation/">Custom Instrumentation with the OpenTelemetry API</a> to learn more.
</div>

## Overview

There are a few reasons to manually instrument your applications with the OpenTelemetry API:

- You are not using Datadog [supported library instrumentation][101].
- You want to extend the `ddtrace` library's functionality.
- You need finer control over instrumenting your applications.

The `ddtrace` library provides several techniques to help you achieve these goals. The following sections demonstrate how to use the OpenTelemetry API for custom instrumentation to use with Datadog.

[101]: /tracing/trace_collection/compatibility/