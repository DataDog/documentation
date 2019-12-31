---
title: Send traces
type: apicontent
order: 34.1
external_redirect: /api/#send-traces
---

## Send traces

Datadog's APM allows you to collect performance metrics by tracing your code to determine which parts of your application are slow or inefficient.

Tracing data is sent to the Datadog Agent via an HTTP API. We provide some [official libraries][1] that simplify sending metrics to the Datadog Agent, however you may want to interact directly with the API to instrument applications that cannot use the libraries or are written in languages that don't yet have an official Datadog Tracing library.

Traces can be sent as an array of [traces][2]:

```
[ trace1, trace2, trace3 ]
```

and each trace is an array of [spans][3]:

```
trace1 = [ span, span2, span3 ]
```

and each span is a dictionary with a `trace_id`, `span_id`, `resource`..

[Learn more about the APM & Distributed Tracing terminology][4]

**Note**: Each span within a trace should use the same `trace_id`. However, `trace_id` and `span_id` must have different values.

**ARGUMENTS**:

*   **`trace_id`** - _required_ The unique integer (64-bit unsigned) ID of the trace containing this span.
*   **`span_id`** - _required_ The span integer (64-bit unsigned) ID.
*   **`name`** - _required_ The span name. The span name must not be longer than 100 characters.
*   **`resource`** - _required_ The resource you are tracing. The resource name must not be longer than 5000 characters.
*   **`service`** - _required_ The service you are tracing. The service name must not be longer than 100 characters.
*   **`type`** - _optional, default=**custom**, case-sensitive_ The type of request. The options available are `web`, `db`, `cache`, and `custom`.
*   **`start`** - _required._ The start time of the request in nanoseconds from the unix epoch.
*   **`duration`** - _required_ The duration of the request in nanoseconds.
*   **`parent_id`** - _optional_ The span integer ID of the parent span.
*   **`error`** - _optional_ Set this value to 1 to indicate if an error occured. If an error occurs, you should pass additional information, such as the error message, type and stack information in the `meta` property.
*   **`meta`** - _optional_ A set of key-value metadata. Keys and values must be strings.
*   **`metrics`** - _optional_ A set of key-value metadata. Keys must be strings and values must be 64-bit floating point numbers.

[1]: /tracing/#instrument-your-application
[2]: /tracing/visualization/trace
[3]: /tracing/visualization/trace/#spans
[4]: /tracing/visualization/services_list
