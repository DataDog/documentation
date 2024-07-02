---
title: Send traces to the Agent by API
kind: guide
further_reading:
  - link: /tracing/
    tag: Documentation
    text: Learn about Datadog APM tracing
  - link: /tracing/glossary/
    tag: Documentation
    text: APM Terminology and Overview
aliases:
  - /api/latest/tracing/
  - /api/v1/tracing/
  - /api/v2/tracing/
---

Datadog APM allows you to collect performance metrics by tracing your code to determine which parts of your application are slow or inefficient.

Tracing data is sent from your instrumented code to the Datadog Agent through an HTTP API. Datadog tracing libraries simplify sending metrics to the Datadog Agent. However you might want to interact directly with the API to instrument applications that cannot use the libraries or are written in languages that don't yet have an official Datadog tracing library.

The tracing API is an Agent API rather than a service side API. Submit your traces to the `http://localhost:8126/v0.3/traces` local endpoint so your Agent can forward them to Datadog.

## Path

{{< code-block lang="bash" >}}
PUT http://localhost:8126/v0.3/traces
{{< /code-block >}}

## Request

Traces can be sent as an array of traces:

```
[ trace1, trace2, trace3 ]
```
And each trace is an array of spans:

```
trace1 = [ span, span2, span3 ]
```
and each span is a dictionary with a `trace_id`, `span_id`, `resource` and so on. Each span within a trace should use the same `trace_id`. However, `trace_id` and span_id must have different values.

### Model

<div class="alert alert-info">Datadog tracing libraries support both 64-bit and 128-bit trace IDs. Read <a href="/tracing/guide/span_and_trace_id_format/">Span and Trace ID formats to learn more.</a></div>

| Field      | Type    | Description                           |
|------------|---------|---------------------------------------|
| `duration`   | int64   | The duration of the request in nanoseconds. |
| `error`      | int32   | Set this value to 1 to indicate if an error occurred. If an error occurs, you should pass additional information, such as the error message, type and stack information in the meta property. |
| `meta`       | object  | A set of key-value metadata. Keys and values must be strings. |
| - `<any-key>` | string | Additional properties for key-value metadata. |
| モニター    | object  | A set of key-value metadata. Keys must be strings and values must be 64-bit floating point numbers. |
| - `<any-key>` | double | Additional properties for key-value metrics. |
| name       | string  | The span name. The span name must not be longer than 100 characters. |
| `parent_id`  | int64   | The span integer ID of the parent span. |
| `resource`   | string  | The resource you are tracing. The resource name must not be longer than 5000 characters. |
| `service`    | string  | The service you are tracing. The service name must not be longer than 100 characters. |
| `span_id`    | int64   | The span integer (64-bit unsigned) ID. |
| `start`      | int64   | The start time of the request in nanoseconds from the UNIX epoch. |
| `trace_id`   | int64 or int128   | The unique integer (64-bit unsigned or 128-bit unsigned) ID of the trace containing this span. |
| `type`       | enum    | The type of request. Allowed enum values: `web`, `db`, `cache`, `custom` |


### Example

{{< code-block lang="json" >}}
[
  [
    {
      "duration": 12345,
      "error": "integer",
      "meta": {
        "<any-key>": "string"
      },
      "metrics": {
        "<any-key>": "number"
      },
      "name": "span_name",
      "parent_id": "integer",
      "resource": "/home",
      "service": "service_name",
      "span_id": 987654321,
      "start": 0,
      "trace_id": 123456789,
      "type": "web"
    }
  ]
]
{{< /code-block >}}


## Response

200
: OK

### Example

{{< tabs >}}

{{% tab "Shell" %}}

{{< code-block lang="curl" >}}
# Curl command
curl -X PUT "http://localhost:8126/v0.3/traces" \
-H "Content-Type: application/json" \
-d @- << EOF
[
  [
    {
      "duration": 12345,
      "name": "span_name",
      "resource": "/home",
      "service": "service_name",
      "span_id": 987654321,
      "start": 0,
      "trace_id": 123456789
    }
  ]
]
EOF
{{< /code-block >}}

{{% /tab %}}

{{% tab "Powershell" %}}
{{< code-block lang="curl" >}}

# Invoke-RestMethod command

$uri = "http://localhost:8126/v0.3/traces"
$headers = @{
    "Content-Type" = "application/json"
}
$body = @"
[
  [
    {
      "duration": 12345,
      "name": "span_name",
      "resource": "/home",
      "service": "service_name",
      "span_id": 987654321,
      "start": 0,
      "trace_id": 123456789
    }
  ]
]
"@

Invoke-RestMethod -Uri $uri -Method Put -Body $body -Headers $headers
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
