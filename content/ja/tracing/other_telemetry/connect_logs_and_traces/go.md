---
aliases:
- /ja/tracing/connect_logs_and_traces/go
code_lang: go
code_lang_weight: 30
description: Connect your Go logs and traces to correlate them in Datadog.
further_reading:
- link: tracing/trace_collection/custom_instrumentation
  tag: Documentation
  text: Manually instrument your application to create traces.
- link: tracing/glossary/
  tag: Documentation
  text: Explore your services, resources, and traces
- link: https://www.datadoghq.com/blog/request-log-correlation/
  tag: Blog
  text: Correlate request logs with traces automatically
- link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
  tag: Guide
  text: Ease troubleshooting with cross product correlation.
kind: documentation
title: Correlating Go Logs and Traces
type: multi-code-lang
---

## Manual injection

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

The above example illustrates how to use the span's context in the standard library's `log` package. Similar logic may be applied to third party packages too.

**Note**: If you are not using a [Datadog Log Integration][1] to parse your logs, custom log parsing rules need to ensure that `dd.trace_id`, `dd.span_id`, `dd.service`, `dd.env` and `dd.version` are being parsed as strings. More information can be found in [Correlated Logs Not Showing Up in the Trace ID Panel][2].

## Injection into logrus logs

A hook for the logrus package is available to automatically link your log and spans.
The package is available in the Go tracer.

```go
package main

import (
    "github.com/sirupsen/logrus"

    dd_logrus "gopkg.in/DataDog/dd-trace-go.v1/contrib/sirupsen/logrus"
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func main() {
    // Optional: Change log format to use JSON (Cf. Go Log Collection)
    logrus.SetFormatter(&logrus.JSONFormatter{})

    // Add Datadog context log hook
    logrus.AddHook(&dd_logrus.DDContextLogHook{}) 

    // ...
}
```

This automatically injects the trace id to your logs when you log with the context.
```go
    // Log with the context
    logrus.WithContext(ctx).Info("Go logs and traces connected!")
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/log_collection/go/#configure-your-logger
[2]: /ja/tracing/troubleshooting/correlated-logs-not-showing-up-in-the-trace-id-panel/?tab=custom