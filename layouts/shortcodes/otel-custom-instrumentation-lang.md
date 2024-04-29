<div class="alert alert-info">
If you are new to custom instrumentation with OpenTelemetry, start by reading the <a href="/tracing/trace_collection/custom_instrumentation/otel_instrumentation/">Custom Instrumentation with the OpenTelemetry API</a> overview to understand how OpenTelemetry integrates with Datadog.
</div>

## Overview

There are a few reasons to use the OpenTelemetry API for custom instrumentation of your applications:

- You are not using [supported library instrumentation][101].
- You want to extend the functionality of the `ddtrace` library.
- You need finer control over instrumenting your applications.

The `ddtrace` library provides several techniques to help you achieve these goals. The following sections demonstrate how to use the OpenTelemetry API for custom instrumentation to use with Datadog.

[101]: /tracing/trace_collection/compatibility/