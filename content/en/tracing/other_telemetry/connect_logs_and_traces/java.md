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

For a more universal, configuration-based approach, you can also use OpenTelemetry's log appenders. See [Correlating OpenTelemetry Traces and Logs][6] for setup instructions.

**Notes**:
- Automatic injection of trace correlation is available for Log4j2, Log4j, or SLF4J and Logback.
- If the `attribute.path` for your trace ID is *not* `dd.trace_id`, ensure that your trace ID reserved attribute settings account for the `attribute.path`. For more information, see [Correlated Logs Not Showing Up in the Trace ID Panel][3].

<div class="alert alert-info">Starting in version 1.18.3, if <a href="/tracing/guide/remote_config">Agent Remote Configuration</a> is enabled where the service runs, you can set <code>DD_LOGS_INJECTION</code> in the <a href="/tracing/software_catalog">Software Catalog</a> UI.</div>

## Manual injection

If you prefer to manually add correlation identifiers to your logs, you can use a tracing API. Datadog recommends using the standard OpenTelemetry API for vendor-neutrality and broader compatibility. Alternatively, you can use the Datadog-specific API.

### OpenTelemetry API (Recommended)

To correlate logs and traces with the OpenTelemetry API, first add the `opentelemetry-api` dependency to your project.

{{< tabs >}}
{{% tab "Maven" %}}

```xml
<dependency>
    <groupId>io.opentelemetry</groupId>
    <artifactId>opentelemetry-api</artifactId>
    <version>1.40.0</version> <scope>provided</scope>
</dependency>
```

{{% /tab %}}
{{% tab "Gradle" %}}

```groovy
compileOnly 'io.opentelemetry:opentelemetry-api:1.40.0'
```
{{% /tab %}}
{{% tab "Gradle (Kotlin DSL)" %}}

```kotlin
compileOnly("io.opentelemetry:opentelemetry-api:1.40.0")
```

{{% /tab %}}
{{< /tabs >}}

After adding the dependency, use the OpenTelemetry `Span` class to access the current trace and span IDs and add them to your logging context.

For example:

```java
import io.opentelemetry.api.trace.Span;
import io.opentelemetry.api.trace.SpanContext;
import org.slf4j.MDC;

// ...

SpanContext spanContext = Span.current().getSpanContext();
if (spanContext.isValid()) {
   try {
        MDC.put("dd.trace_id", spanContext.getTraceId());
        MDC.put("dd.span_id", spanContext.getSpanId());
        // Log something
    } finally {
        MDC.remove("dd.trace_id");
        MDC.remove("dd.span_id");
    }
}
```

**Note**: If no span is active, `spanContext.isValid()` returns `false`, and no IDs are added to the logs.

### Datadog API

To manually correlate logs and traces with the Datadog API, add the `dd-trace-api` dependency to your project.

{{< tabs >}}
{{% tab "Maven" %}}

```xml
<dependency>
    <groupId>com.datadoghq</groupId>
    <artifactId>dd-trace-api</artifactId>
    <version>LATEST_VERSION</version>
</dependency>
```

{{% /tab %}}
{{% tab "Gradle" %}}

```groovy
implementation 'com.datadoghq:dd-trace-api:LATEST_VERSION'
```
{{% /tab %}}
{{% tab "Gradle (Kotlin DSL)" %}}

```kotlin
implementation("com.datadoghq:dd-trace-api:LATEST_VERSION")
```

{{% /tab %}}
{{< /tabs >}}

Replace `LATEST_VERSION` with the same version as your Datadog Java tracer (`dd-java-agent`).

After you add the dependency, use `CorrelationIdentifier.getTraceId()` and `CorrelationIdentifier.getSpanId()` to retrieve and inject the IDs into your logging context, as shown in the following examples.

<div class="alert alert-info">If no span is active, <code>CorrelationIdentifier.getTraceId()</code> and <code>getSpanId()</code> return <code>"0"</code>. Ensure that spans are started before this code is executed.</div>

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
[6]: /tracing/connect_logs_and_traces/opentelemetry
