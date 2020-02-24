---
title: Connecting Go Logs and Traces
kind: documentation
description: 'Connect your Go logs and traces to correlate them in Datadog.'
further_reading:
    - link: 'tracing/manual_instrumentation'
      tag: 'Documentation'
      text: 'Instrument manually your application to create traces.'
    - link: 'tracing/opentracing'
      tag: 'Documentation'
      text: 'Implement Opentracing across your applications.'
    - link: 'tracing/visualization/'
      tag: 'Documentation'
      text: 'Explore your services, resources, and traces'
    - link: 'https://www.datadoghq.com/blog/request-log-correlation/'
      tag: 'Blog'
      text: 'Correlate request logs with traces automatically'
---

## Automatic Trace ID injection

Coming Soon. Reach out to [the Datadog support team][1] to learn more.

## Manual Trace ID injection

The Go tracer exposes two API calls to allow printing [trace][2] and [span][3] identifiers along with log statements using exported methods from `SpanContext` type:

```go
package main

import (
    "net/http"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    // Create a span for a web request at the /posts URL.
    span := tracer.StartSpan("web.request", tracer.ResourceName("/posts"))
    defer span.Finish()

    // Retrieve Trace ID and Span ID
    traceID := span.Context().TraceID()
    spanID := span.Context().SpanID()

    // Append them to log messages as fields:
    log.Printf("my log message dd.trace_id=%d dd.span_id=%d", traceID, spanID)
}
```

The above example illustrates how to use the span's context in the standard library's `log` package. Similar logic may be applied to 3rd party packages too.

**Note**: If you are not using a [Datadog Log Integration][4] to parse your logs, custom log parsing rules need to ensure that `trace_id` and `span_id` are being parsed as a string. More information can be found in the [FAQ on this topic][5].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help
[2]: /tracing/visualization/#trace
[3]: /tracing/visualization/#spans
[4]: /logs/log_collection/go/#configure-your-logger
[5]: /tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel
