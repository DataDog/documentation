---
title: Custom Instrumentation of Java Applications with the OpenTelemetry API
kind: documentation
description: 'Instrument your Java application with OpenTelemetry API to send traces to Datadog.'
code_lang: java
type: multi-code-lang
code_lang_weight: 0
aliases:
- /tracing/trace_collection/otel_instrumentation/java/
further_reading:
    - link: 'tracing/glossary/'
      tag: 'Documentation'
      text: 'Explore your services, resources, and traces'
    - link: '/opentelemetry/guide/otel_api_tracing_interoperability'
      tag: 'Documentation'
      text: 'Interoperability of OpenTelemetry API and Datadog instrumented traces'
---

{{% otel-custom-instrumentation %}}

## Requirements and limitations

- Datadog Java tracing library `dd-trace-java` version 1.10.0 or greater.

The following OpenTelemetry features implemented in the Datadog library as noted:

| Feature                                           | Support notes                                                                               |
|---------------------------------------------------|---------------------------------------------------------------------------------------------|
| [OpenTelemetry Context propagation][1]            | [Datadog distributed header format][2] is used instead by default.                          |
| [Span processors][3]                              | Unsupported                                                                                 |
| [Span Exporters][4]                               | Unsupported                                                                                 |
| Trace/span [ID generators][5]                     | ID generation is performed by the tracing library, with support for [128-bit trace IDs][6]. |
| [Metrics][7], [Baggage][8] and [Context][9] API   | Unsupported                                                                                 |
| [Span links ][14] (Beta)                          | Requires `dd-trace-java` version 1.24.0 or greater.                                         |

## Configuring OpenTelemetry to use the Datadog tracing library

<div class="alert alert-info">
If you have not yet read the instructions for auto-instrumentation and setup, start with the <a href="https://docs.datadoghq.com/tracing/setup/java/">Java Setup Instructions</a>.
</div>

1. Add your desired manual OpenTelemetry instrumentation to your Java code following the [OpenTelemetry Java Manual Instrumentation documentation][10].

1. Add the [Datadog tracing library to the JVM][11]. **Beta:** You can optionally do this with [One-Step APM Instrumentation][12].

1. Make sure you only depend on the OpenTelemetry API (and not the OpenTelemetry SDK).

{{< tabs >}}
{{% tab "Gradle" %}}

{{< code-block lang="groovy" >}}
// OpenTelemetry API
implementation "io.opentelemetry:opentelemetry-api:${opentelemetryVersion}"
{{< /code-block >}}

{{% /tab %}}
{{% tab "Maven" %}}

{{< code-block lang="xml" >}}
<!-- OpenTelemetry API -->
<dependency>
    <groupId>io.opentelemetry</groupId>
    <artifactId>opentelemetry-api</artifactId>
    <version>${io.opentelemtry.version}</version>
</dependency>
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

1. Set the `dd.trace.otel.enabled` system property or the `DD_TRACE_OTEL_ENABLED` environment variable to `true`.

Datadog combines these OpenTelemetry spans with other Datadog APM spans into a single trace of your application.


## Common use cases

### Add custom attributes to the current or local root span

```java
// Add attributes to the current span
Span currentSpan = Span.current();
currentSpan.setAttributes("some-key", "some-value");

// Add attributes to the local root span
ContextKey<OtelSpan> localRootSpanKey = ContextKey.named("datadog-root-span-key");
Span rootSpan = Context.current().get(localRootSpanKey);
rootSpan.setAttributes("some-key", "some-value");
```

**Note:** If there isn't a current or local root span, the returned span is invalid, not `null`, and attributes are not set.

### Add custom spans using annotations

First add a dependency to the `opentelemetry-instrumentation-annotations` library.

{{< tabs >}}
{{% tab "Gradle" %}}

{{< code-block lang="groovy" >}}
  // OpenTelemetry instrumentation annotations
  implementation "io.opentelemetry.instrumentation:opentelemetry-instrumentation-annotations:${opentelemetryVersion}"
{{< /code-block >}}

{{% /tab %}}
{{% tab "Maven" %}}

{{< code-block lang="xml" >}}
<!-- OpenTelemetry instrumentation annotations -->
<dependency>
    <groupId>io.opentelemetry.instrumentation</groupId>
    <artifactId>opentelemetry-instrumentation-annotations</artifactId>
    <version>${io.opentelemtry.version}</version>
</dependency>
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

Then annotate your methods with the `@WithSpan` annotation to create a new span each call. The parameters of the call can be annotated with the `@SpanAttribute` annotation to capture the arguments as span attributes:

```java
@WithSpan
public void myMethod(@SpanAttribute("parameter1") String parameter1,
    @SpanAttribute("parameter2") long parameter2) {
    <...>
}
```

**Note:** Using the `@AddingSpanAttributes` method annotation instead of `@WithSpan` allows capturing method arguments using the `@SpanAttribute` annotation without creating a new span. The current span, if it exists, is going to be updated with the captured arguments.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/instrumentation/java/manual/#context-propagation
[2]: /tracing/trace_collection/trace_context_propagation/java/
[3]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-processor
[4]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-exporter
[5]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#id-generators
[6]: /opentelemetry/guide/otel_api_tracing_interoperability/
[7]: https://opentelemetry.io/docs/specs/otel/metrics/api/
[8]: https://opentelemetry.io/docs/specs/otel/baggage/api/
[9]: https://opentelemetry.io/docs/specs/otel/context/
[10]: https://opentelemetry.io/docs/instrumentation/java/manual/
[11]: /tracing/trace_collection/dd_libraries/java/?tab=springboot#add-the-java-tracer-to-the-jvm
[12]: /tracing/trace_collection/single-step-apm/
[13]: /tracing/trace_collection/single-step-apm/
[14]: https://opentelemetry.io/docs/instrumentation/java/manual/#create-spans-with-links
