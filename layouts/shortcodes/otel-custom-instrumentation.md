Custom instrumentation allows programmatic creation, modification, or deletion of traces to send to Datadog, over and above the default automatic instrumentation from the tracing SDKs. This section describes how to custom instrument your code to generate Datadog spans and tags using the [OpenTelemetry (OTel) API][101].

This custom instrumentation provides an alternate way to custom (manually) instrument your code. The Datadog tracing libraries implement the OTel API spec with the OTel Datadog Trace Provider, which processes the telemetry with the tracing library and sends it to Datadog. You can use this approach, for example, if your code has already been instrumented with OTel and you want to gain the benefits of using the Datadog tracing libraries without changing your code.

If you're looking for a way to auto-instrument your code with OpenTelemetry and then send it to Datadog without going through the Datadog tracing library, see [Trace Collection Through OpenTelemetry][102]


[101]: https://opentelemetry.io/docs/reference/specification/trace/api
[102]: /opentelemetry/otel_tracing/
