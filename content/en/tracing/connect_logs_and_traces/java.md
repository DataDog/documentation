---
title: Connecting Java Logs and Traces
kind: documentation
description: 'Connect your Java logs and traces to correlate them in Datadog.'
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
## Before you begin

Ensure log collection is configured.  See [Java Log Collection][1] for Log4j, Log4j 2, or Logback instructions.

## Automatically inject trace and span IDs

Starting in version 0.74.0, the Java tracer automatically injects trace correlation identifiers into logs.  For earlier versions, enable automatic injection in the Java tracer by adding `dd.logs.injection=true` as a system property, or through the environment variable `DD_LOGS_INJECTION=true`.  Full configuration details can be found on the [Java tracer configuration][2] page.

**Note**: If the `attribute.path` for your trace ID is *not* `dd.trace_id`, ensure that your trace ID reserved attribute settings account for the `attribute.path`. For more information, see the [FAQ on this topic][3].

## Manually inject trace and span IDs

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
{{< /tabs >}}

**Note**: If you are [not using a Datadog Log Integration][4] to parse your logs, custom log parsing rules need to ensure that `dd.trace_id` and `dd.span_id` are being parsed as strings. For more information, see the [FAQ on this topic][5].

[See the Java log collection documentation][1] for more details about specific logger implementation and instructions for logging in JSON format.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/log_collection/java/
[2]: /tracing/setup_overview/setup/java/
[3]: /tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel/?tab=jsonlogs#trace_id-option
[4]: /logs/log_collection/java/#raw-format
[5]: /tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel/?tab=custom
