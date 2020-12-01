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

## Automatically Inject Trace and Span IDs

Enable injection in the Java tracer's [configuration][1] by adding `-Ddd.logs.injection=true` as a jvm startup argument or through environment variable `DD_LOGS_INJECTION=true`.

If your logs are JSON formated and you are using Logback there is nothing left to do. Otherwise with other logging libraries you need to activate MDC attributes autoinjection into your logs.

If your logs are raw formatted, update your formatter to include `dd.trace_id` and `dd.span_id` in your logger configuration:

{{< tabs >}}
{{% tab "Log4j2" %}}

```xml
<Pattern>"%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %X{dd.trace_id} %X{dd.span_id} - %m%n"</Pattern>
```

{{% /tab %}}
{{% tab "slf4j/logback" %}}

```xml
<Pattern>"%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %X{dd.trace_id:-0} %X{dd.span_id:-0} - %m%n"</Pattern>
```

{{% /tab %}}
{{< /tabs >}}

**Note**: If the `attribute.path` for your trace ID is **not** `dd.trace_id`, ensure your trace ID reserved attribute settings account for the `attribute.path`. More information can be found in the [FAQ on this topic][2].

## Manually Inject Trace and Span IDs

If you prefer to manually correlate your [traces][3] with your logs, leverage the Datadog API to retrieve correlation identifiers:

- Use `CorrelationIdentifier#getTraceId()` and `CorrelationIdentifier#getSpanId()` API methods to inject identifiers at the beginning and end of each [span][4] to log (see examples below).
- Configure MDC to use the injected Keys:

    - `dd.trace_id` Active Trace ID during the log statement (or `0` if no trace)
    - `dd.span_id` Active Span ID during the log statement (or `0` if no trace)

{{< tabs >}}
{{% tab "Log4j2" %}}

```java
import org.apache.logging.log4j.ThreadContext;
import datadog.trace.api.CorrelationIdentifier;

// there must be spans started and active before this block.
try {
    ThreadContext.put("dd.trace_id", String.valueOf(CorrelationIdentifier.getTraceId()));
    ThreadContext.put("dd.span_id", String.valueOf(CorrelationIdentifier.getSpanId()));
}

// Log something

finally {
    ThreadContext.remove("dd.trace_id");
    ThreadContext.remove("dd.span_id");
}
```

Then update your logger configuration to include `dd.trace_id` and `dd.span_id` in your log pattern:

```xml
<Pattern>"%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %X{dd.trace_id} %X{dd.span_id} - %m%n"</Pattern>
```

{{% /tab %}}
{{% tab "slf4j/logback" %}}

```java
import org.slf4j.MDC;
import datadog.trace.api.CorrelationIdentifier;

// there must be spans started and active before this block.
try {
    MDC.put("dd.trace_id", String.valueOf(CorrelationIdentifier.getTraceId()));
    MDC.put("dd.span_id", String.valueOf(CorrelationIdentifier.getSpanId()));
}

// Log something

finally {
    MDC.remove("dd.trace_id");
    MDC.remove("dd.span_id");
}
```

Then update your logger configuration to include `dd.trace_id` and `dd.span_id` in your log pattern:

```xml
<Pattern>"%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %X{dd.trace_id:-0} %X{dd.span_id:-0} - %m%n"</Pattern>
```

{{% /tab %}}
{{< /tabs >}}

**Note**: If you are not using a [Datadog Log Integration][5] to parse your logs, custom log parsing rules need to ensure that `dd.trace_id` and `dd.span_id` are being parsed as strings. More information can be found in the [FAQ on this topic][6].

[See the Java logging documentation][4] for more details about specific logger implementation or to learn how to log in JSON.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/setup/java/#configuration
[2]: /tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel/?tab=jsonlogs#trace-id-option
[3]: /tracing/connect_logs_and_traces/
[4]: /logs/log_collection/java/?tab=log4j
[5]: /logs/log_collection/java/#raw-format
[6]: /tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel/?tab=custom
