---
title: Custom Instrumentation of Java Applications with the OpenTelemetry API
kind: documentation
description: 'Instrument your Java application with OpenTelemetry API to send traces to Datadog.'
code_lang: java
type: multi-code-lang
code_lang_weight: 0
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

| Feature                                           | Support notes                                                      |
|---------------------------------------------------|--------------------------------------------------------------------|
| [OpenTelemetry Context propagation][1]            | [Datadog distributed header format][9] is used instead by default. | 
| [Span processors][2]                              | Unsupported                                                        | 
| [Span Exporters][3]                               | Unsupported                                                        |
| Trace/span [ID generators][4]                     | ID generation is performed by the tracing library, with support for [128-bit trace IDs][12].|
| [Metrics][7], [Baggage][14] and [Context][10] API | Unsupported                                                        |
| Instrumentation [annotations][6]                  | Unsupported                                                        |

## Configuring OpenTelemetry to use the Datadog tracing library

1. Add your desired manual OpenTelemetry instrumentation to your Java code following the [OpenTelemetry Java Manual Instrumentation documentation][5]. **Important!** Where those instructions indicate that your code should call the OpenTelemetry SDK, call the Datadog tracing library instead.

1. Add the [Datadog tracing library to the JVM][11]. **Beta:** You can optionally do this with [One-Step APM Instrumentation][13].


1. Make sure you only depends from OpenTelemetry API (and not OpenTelemetry SDK).

    Using Maven:
    ```xml
      <!-- OpenTelemetry API -->
      <dependency>
              <groupId>io.opentelemetry</groupId>
              <artifactId>opentelemetry-api</artifactId>
              <version>${io.opentelemtry.version}</version>
          </dependency>
      <dependency>
    ```

    Using Gradle:
    ```groovy
      // OpenTelemetry API
      implementation "io.opentelemetry:opentelemetry-api:${opentelemetryVersion}"
    ```

1. Set the `dd.trace.otel.enabled` system property to `true`.

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

**Note:** When no current or local root span, the returned span will not be `null` but invalid, and attributes will not be set.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/instrumentation/java/manual/#context-propagation
[2]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-processor
[3]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-exporter
[4]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#id-generators
[5]: https://opentelemetry.io/docs/instrumentation/java/manual/
[6]: https://opentelemetry.io/docs/instrumentation/java/automatic/annotations/
[7]: https://opentelemetry.io/docs/specs/otel/metrics/api/
[8]: https://opentelemetry.io/docs/instrumentation/java/automatic/
[9]: /tracing/trace_collection/trace_context_propagation/java/
[10]: https://opentelemetry.io/docs/specs/otel/context/
[11]: /tracing/trace_collection/dd_libraries/java/?tab=springboot#add-the-java-tracer-to-the-jvm
[12]: /opentelemetry/guide/otel_api_tracing_interoperability/
[13]: /tracing/trace_collection/single-step-apm/
[14]: https://opentelemetry.io/docs/specs/otel/baggage/api/
