---
title: Correlating Java Logs and Traces
description: 'Connect your Java logs and traces to correlate them in Datadog.'
code_lang: java
type: multi-code-lang
code_lang_weight: 10
aliases:
  - /tracing/connect_logs_and_traces/java
further_reading:
    - link: 'tracing/trace_collection/custom_instrumentation'
      tag: 'Documentation'
      text: 'Manually instrument your application to create traces.'
    - link: 'tracing/glossary/'
      tag: 'Documentation'
      text: 'Explore your services, resources, and traces'
    - link: 'https://www.datadoghq.com/blog/request-log-correlation/'
      tag: 'Blog'
      text: 'Correlate request logs with traces automatically'
    - link: '/logs/guide/ease-troubleshooting-with-cross-product-correlation/'
      tag: 'Guide'
      text: 'Ease troubleshooting with cross product correlation.'
---
## Before you begin

Ensure log collection is configured. See [Java Log Collection][1] for Log4j, Log4j 2, or Logback instructions.

## Automatic injection

Starting in version 0.74.0, the Java tracer automatically injects trace correlation identifiers into JSON formatted logs. For earlier versions, enable automatic injection in the Java tracer by adding `dd.logs.injection=true` as a system property, or through the environment variable `DD_LOGS_INJECTION=true`. Full configuration details can be found on the [Java tracer configuration][2] page.

**Notes**:
- Automatic injection of trace correlation is available for Log4j2, Log4j, or SLF4J and Logback.
- If the `attribute.path` for your trace ID is *not* `dd.trace_id`, ensure that your trace ID reserved attribute settings account for the `attribute.path`. For more information, see [Correlated Logs Not Showing Up in the Trace ID Panel][3].

<div class="alert alert-info"><strong>Beta</strong>: Starting in version 1.18.3, if <a href="/agent/remote_config/">Agent Remote Configuration</a> is enabled where the service runs, you can set <code>DD_LOGS_INJECTION</code> in the <a href="/tracing/service_catalog">Service Catalog</a> UI.</div>

## Manual injection

If you prefer to manually correlate your traces with your logs, use the Java tracer's API to retrieve correlation identifiers. Use `CorrelationIdentifier.getTraceId` and `CorrelationIdentifier.getSpanId` methods to inject identifiers at the beginning of the span being logged, and remove the identifiers when the span is complete.

{{< tabs >}}
{{% tab "Log4j 2" %}}

```java
import org.apache.logging.log4j.ThreadContext;
import datadog.trace.api.CorrelationIdentifier;

// There must be spans started and active before this block.
try {
    ThreadContext.put("dd.trace_id", CorrelationIdentifier.getTraceId());
    ThreadContext.put("dd.span_id", CorrelationIdentifier.getSpanId());

// Log something

} finally {
    ThreadContext.remove("dd.trace_id");
    ThreadContext.remove("dd.span_id");
}
```

{{% /tab %}}
{{% tab "SLF4J and Logback" %}}

```java
import org.slf4j.MDC;
import datadog.trace.api.CorrelationIdentifier;

// There must be spans started and active before this block.
try {
    MDC.put("dd.trace_id", CorrelationIdentifier.getTraceId());
    MDC.put("dd.span_id", CorrelationIdentifier.getSpanId());

// Log something

} finally {
    MDC.remove("dd.trace_id");
    MDC.remove("dd.span_id");
}
```
{{% /tab %}}
{{% tab "Tinylog" %}}

```java
import org.tinylog.ThreadContext;
import datadog.trace.api.CorrelationIdentifier;

// There must be spans started and active before this block.
try {
    ThreadContext.put("dd.trace_id", CorrelationIdentifier.getTraceId());
    ThreadContext.put("dd.span_id", CorrelationIdentifier.getSpanId());

// Log something

} finally {
    ThreadContext.remove("dd.trace_id");
    ThreadContext.remove("dd.span_id");
}
```
{{% /tab %}}
{{< /tabs >}}

**Note**: If you are [not using a Datadog Log Integration][4] to parse your logs, custom log parsing rules need to ensure that `dd.trace_id` and `dd.span_id` are being parsed as strings. For more information, see [Correlated Logs Not Showing Up in the Trace ID Panel][5].

[See the Java log collection documentation][1] for more details about specific logger implementation and instructions for logging in JSON format.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/log_collection/java/
[2]: /tracing/trace_collection/dd_libraries/java/
[3]: /tracing/troubleshooting/correlated-logs-not-showing-up-in-the-trace-id-panel/?
[4]: /logs/log_collection/java/#raw-format
[5]: /tracing/troubleshooting/correlated-logs-not-showing-up-in-the-trace-id-panel/?tab=custom
