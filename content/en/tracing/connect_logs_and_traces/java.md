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
## Configure your logger

The first step to correlating logs and traces is to configure your logger.  Follow the [configuration instructions][4] for Log4j, Log4j2, or Logback.

## Automatically inject trace and span IDs

As of version 0.74.0, the Java tracer automatically injects correlation identifiers into logs.  For versions <= 0.73.0, enable automatic injection in the Java tracer by adding `dd.logs.injection=true` as a system property or through the environment variable `DD_LOGS_INJECTION=true`.  Full configuration details can be found on the [Java tracer configuration][1] page.

**Note**: If the `attribute.path` for your trace ID is **not** `dd.trace_id`, ensure your trace ID reserved attribute settings account for the `attribute.path`. More information can be found in the [FAQ on this topic][2].

## Manually Inject Trace and Span IDs

If you prefer to manually correlate your traces with your logs, leverage the Java tracer's API to retrieve correlation identifiers:

- Use `CorrelationIdentifier#getTraceId()` and `CorrelationIdentifier#getSpanId()` API methods to inject identifiers at the beginning of span being logged
- Remove the identifiers when the span is complete

{{< tabs >}}
{{% tab "Log4j2" %}}

```java
import org.apache.logging.log4j.ThreadContext;
import datadog.trace.api.CorrelationIdentifier;

// there must be spans started and active before this block.
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
{{% tab "Slf4j/Logback" %}}

```java
import org.slf4j.MDC;
import datadog.trace.api.CorrelationIdentifier;

// there must be spans started and active before this block.
try {
    MDC.put("dd.trace_id", CorrelationIdentifier.getTraceId());
    MDC.put("dd.span_id", CorrelationIdentifier.getSpanId());
}

// Log something

finally {
    MDC.remove("dd.trace_id");
    MDC.remove("dd.span_id");
}
```
{{% /tab %}}
{{< /tabs >}}

**Note**: If you are not using a [Datadog Log Integration][5] to parse your logs, custom log parsing rules need to ensure that `dd.trace_id` and `dd.span_id` are being parsed as strings. More information can be found in the [FAQ on this topic][6].

[See the Java logging documentation][4] for more details about specific logger implementation or to learn how to log in JSON.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/setup/java/#configuration
[2]: /tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel/?tab=jsonlogs#trace-id-option
[4]: /logs/log_collection/java/?tab=log4j
[5]: /logs/log_collection/java/#raw-format
[6]: /tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel/?tab=custom
