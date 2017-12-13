---
title: Traces
type: apicontent
order: 19.1
---

## Traces
Datadog's APM allows you to collect performance metrics by tracing your code to determine which parts of your application are slow or inefficient.

Tracing data is sent to the Datadog Agent via an HTTP API. We provide some [official libraries](/tracing/#instrument-your-application) that simplify sending metrics to the Datadog Agent, however you may want to interact directly with the API to instrument applications that cannot use the libraries or are written in languages that don't yet have an official Datadog Tracing library.
##### Arguments

*   `trace_id` - _Required._ The unique integer (64-bit unsigned) ID of the trace containing this span.
*   `span_id` - _Required._ The span integer (64-bit unsigned) ID.
*   `name` - _Required._ The span name.
*   `resource` - _Required._ The resource you are tracing.
*   `service` - _Required._The service name.
*   `type` - _Required._ The type of request.
*   `start` - _Required._ The start time of the request in nanoseconds from the unix epoch.
*   `duration` - _Required._ The duration of the request in nanoseconds.
*   `parent_id` - _Optional._ The span integer ID of the parent span.
*   `error` - _Optional._ Set this value to 1 to indicate if an error occured. If an error occurs, you should pass additional information, such as the error message, type and stack information in the `meta` property.
*   `meta` - _Optional._ A dictionary of key-value metadata. e.g. tags.

Learn more about the APM (tracing) terminology [here](/tracing/terminology)

Note: You may send multiple spans within a trace array and each span within a trace should use the same trace_id. You may also send multiple traces.