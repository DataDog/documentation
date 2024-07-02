---
title: Java Custom Instrumentation using OpenTelemetry API
kind: documentation
description: 'Instrument your Java application with OpenTelemetry API to send traces to Datadog.'
code_lang: otel
type: multi-code-lang
code_lang_weight: 2
aliases:
- /tracing/trace_collection/otel_instrumentation/java/
- /tracing/trace_collection/custom_instrumentation/otel_instrumentation/java
further_reading:
    - link: tracing/glossary/
      tag: Documentation
      text: Explore your services, resources, and traces
    - link: /opentelemetry/guide/otel_api_tracing_interoperability
      tag: Documentation
      text: Interoperability of OpenTelemetry API and Datadog instrumented traces
---

{{% otel-custom-instrumentation-lang %}}

## Setup

<div class="alert alert-info">OpenTelemetry is supported in Java after version 1.24.0.</div>

To configure OpenTelemetry to use the Datadog trace provider:

1. If you have not yet read the instructions for auto-instrumentation and setup, start with the [Java Setup Instructions][15].

1. Make sure you only depend on the OpenTelemetry API (and not the OpenTelemetry SDK).

1. Set the `dd.trace.otel.enabled` system property or the `DD_TRACE_OTEL_ENABLED` environment variable to `true`.

## Adding span tags

### Add custom span tags
Add custom tags to your spans corresponding to any dynamic value within your application code such as `customer.id`.

```java
import io.opentelemetry.api.trace.Span;

public void doSomething() {
  Span span = Span.current();
  span.setAttribute("user-name", "Some User");
}
```

### Adding tags globally to all spans

The `dd.tags` property allows you to set tags across all generated spans for an application. This is useful for grouping stats for your applications, data centers, or any other tags you would like to see in Datadog.

```shell
java -javaagent:<DD-JAVA-AGENT-PATH>.jar \
    -Ddd.tags=datacenter:njc,<TAG_KEY>:<TAG_VALUE> \
    -jar <YOUR_APPLICATION_PATH>.jar

```

### Setting errors on a root span from a child span

To set an error on a root span from a child span, you can use the `setStatus` method on the current span like this:

```java
import static io.opentelemetry.api.trace.StatusCode.ERROR;
import io.opentelemetry.api.trace.Span;

public void doSomething() {
  Span span = Span.current();
  span.setStatus(ERROR, "Some error details...");
}
```

### Setting tags and errors on a root span from a child span

This example demonstrates how to set tags and errors on a root span from a child span:

```java
import io.opentelemetry.api.OpenTelemetry;
import io.opentelemetry.api.trace.Span;
import io.opentelemetry.api.trace.Tracer;
import io.opentelemetry.context.Context;
import io.opentelemetry.context.ContextKey;
import io.opentelemetry.context.Scope;
import io.opentelemetry.exporter.otlp.trace.OtlpGrpcSpanExporter;
import io.opentelemetry.sdk.OpenTelemetrySdk;
import io.opentelemetry.sdk.resources.Resource;
import io.opentelemetry.sdk.trace.SdkTracerProvider;
import io.opentelemetry.sdk.trace.export.BatchSpanProcessor;
import io.opentelemetry.semconv.ResourceAttributes;
import java.util.concurrent.TimeUnit;

public class Example {

  private final static ContextKey<Span> CONTEXT_KEY =
    ContextKey.named("opentelemetry-traces-local-root-span");

  public void begin() {
    tracer = GlobalOpenTelemetry.getTracer("my-scope", "0.1.0");
    Span parentSpan = tracer.spanBuilder("begin").startSpan();
    try (Scope scope = parentSpan.makeCurrent()) {
      createChildSpan();
    } finally {
      parentSpan.end();
    }
  }

  private void createChildSpan() {
    Span childSpan = tracer.spanBuilder("child-span").startSpan();
    try {
      Span rootSpan = Context.current().get(CONTEXT_KEY);
        if (null != rootSpan) {
          rootSpan.setAttribute("my-attribute", "my-attribute-value");
          rootSpan.setStatus(StatusCode.ERROR, "Some error details...");
        } 
    } finally {
      childSpan.end();
    }
  }

}
```

## Adding spans

If you aren't using a [supported framework instrumentation][17], or you would like additional depth in your application's [traces][16], you may want to add custom instrumentation to your code for complete flame graphs or to measure execution times for pieces of code.

If modifying application code is not possible, use the environment variable dd.trace.methods to detail these methods.

If you have existing @Trace or similar annotations, or prefer to use annotations to complete any incomplete traces within Datadog, use Trace Annotations.

Traces may also be created using the OpenTelemetry `@WithSpan` annotation as described in [Trace annotations](#trace-annotations).

### Trace annotations

Add `@WithSpan` to methods to have them be traced when running OpenTelemetry and the `dd-java-agent.jar`. If the Agent is not attached, this annotation has no effect on your application.
OpenTelemetry's `@WithSpan` annotation is provided by the `opentelemetry-instrumentation-annotations` dependency.

```java
import io.opentelemetry.instrumentation.annotations.WithSpan;

public class SessionManager {

  @WithSpan
  public static void saveSession() {
    // your method implementation here
  }
}
```

### Manually creating a new span

To manually create new spans within the current trace context:

```java
import io.opentelemetry.api.OpenTelemetry;
import io.opentelemetry.api.trace.Span;
import io.opentelemetry.api.trace.Tracer;
import io.opentelemetry.context.Scope;
import io.opentelemetry.exporter.otlp.trace.OtlpGrpcSpanExporter;
import io.opentelemetry.sdk.OpenTelemetrySdk;
import io.opentelemetry.sdk.resources.Resource;
import io.opentelemetry.sdk.trace.SdkTracerProvider;
import io.opentelemetry.sdk.trace.export.BatchSpanProcessor;
import io.opentelemetry.semconv.ResourceAttributes;
import java.util.concurrent.TimeUnit;

public class Example {

  public void doSomething() {
    Tracer tracer = GlobalOpenTelemetry.getTracer("my-scope", "0.1.0");
    Span span = tracer.spanBuilder("my-resource").startSpan();
    try (Scope scope = span.makeCurrent()) {
      // do some work
    } catch (Throwable t) {
      span.recordException(t);
      throw t;
    } finally {
      span.end();
    }
  }

}
```

## Trace client and Agent configuration

Both the tracing client and Datadog Agent offer additional configuration options for context propagation. You can also exclude specific resources from sending traces to Datadog if you don't want those traces to be included in calculated metrics, such as traces related to health checks.

### Propagating context with headers extraction and injection

You can configure the propagation of context for distributed traces by injecting and extracting headers. Read [Trace Context Propagation][18] for information.

### Resource filtering

Traces can be excluded based on their resource name, to remove synthetic traffic such as health checks from reporting traces to Datadog. This and other security and fine-tuning configurations can be found on the [Security][19] page or in [Ignoring Unwanted Resources][20].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[15]: /tracing/setup/java/
[16]: /tracing/glossary/#trace
[17]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/java/?tab=wget#compatibility
[18]: /tracing/trace_collection/trace_context_propagation/java/
[19]: /tracing/security
[20]: /tracing/guide/ignoring_apm_resources/
