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
    - link: '/logs/guide/ease-troubleshooting-with-cross-product-correlation/'
      tag: 'Guide'
      text: 'Ease troubleshooting with cross product correlation.'
---

## Manually Inject Trace and Span IDs

The Go tracer API allows printing span information along with log statements using the `%v` format specifier:

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

    // Append span info to log messages:
    log.Printf("my log message %v", span)
}
```

The above example illustrates how to use the span's context in the standard library's `log` package. Similar logic may be applied to 3rd party packages too.

**Note**: If you are not using a [Datadog Log Integration][1] to parse your logs, custom log parsing rules need to ensure that `dd.trace_id`, `dd.span_id`, `dd.service`, `dd.env` and `dd.version` are being parsed as strings. More information can be found in the [FAQ on this topic][2].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /logs/log_collection/go/#configure-your-logger
[2]: /tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel/?tab=custom
