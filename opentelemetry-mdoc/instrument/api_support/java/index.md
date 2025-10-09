---
title: Java Custom Instrumentation using the OpenTelemetry API
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: >-
  Docs > OpenTelemetry in Datadog > Instrument Your Applications > OpenTelemetry
  API Support > Java Custom Instrumentation using the OpenTelemetry API
---

# Java Custom Instrumentation using the OpenTelemetry API

{% alert level="info" %}
Unsure when to use OpenTelemetry with Datadog? Start with [Custom Instrumentation with the OpenTelemetry API](http://localhost:1313/tracing/trace_collection/custom_instrumentation/otel_instrumentation/) to learn more.
{% /alert %}

## Overview{% #overview %}

There are a few reasons to manually instrument your applications with the OpenTelemetry API:

- You are not using Datadog [supported library instrumentation](http://localhost:1313/tracing/trace_collection/compatibility/).
- You want to extend the `ddtrace` library's functionality.
- You need finer control over instrumenting your applications.

The `ddtrace` library provides several techniques to help you achieve these goals. The following sections demonstrate how to use the OpenTelemetry API for custom instrumentation to use with Datadog.

## Setup{% #setup %}

{% alert level="info" %}
OpenTelemetry is supported in Java after version 1.24.0.
{% /alert %}

To configure OpenTelemetry to use the Datadog trace provider:

1. If you have not yet read the instructions for auto-instrumentation and setup, start with the [Java Setup Instructions](http://localhost:1313/tracing/setup/java/).

1. Make sure you only depend on the OpenTelemetry API (and not the OpenTelemetry SDK).

1. Set the `dd.trace.otel.enabled` system property or the `DD_TRACE_OTEL_ENABLED` environment variable to `true`.

## Adding span tags{% #adding-span-tags %}

### Add custom span tags{% #add-custom-span-tags %}

Add custom tags to your spans corresponding to any dynamic value within your application code such as `customer.id`.

```java
import io.opentelemetry.api.trace.Span;

public void doSomething() {
  Span span = Span.current();
  span.setAttribute("user-name", "Some User");
}
```

### Adding tags globally to all spans{% #adding-tags-globally-to-all-spans %}

The `dd.tags` property allows you to set tags across all generated spans for an application. This is useful for grouping stats for your applications, data centers, or any other tags you would like to see in Datadog.

```shell
java -javaagent:<DD-JAVA-AGENT-PATH>.jar \
    -Ddd.tags=datacenter:njc,<TAG_KEY>:<TAG_VALUE> \
    -jar <YOUR_APPLICATION_PATH>.jar
```

### Setting errors on span{% #setting-errors-on-span %}

To set an error on a span, you can use the `setStatus` method on the span like this:

```java
import static io.opentelemetry.api.trace.StatusCode.ERROR;
import io.opentelemetry.api.trace.Span;

public void doSomething() {
  Span span = Span.current();
  span.setStatus(ERROR, "Some error details...");
}
```

### Setting tags and errors on a root span from a child span{% #setting-tags-and-errors-on-a-root-span-from-a-child-span %}

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

## Adding spans{% #adding-spans %}

If you aren't using a [supported framework instrumentation](http://localhost:1313/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/?tab=wget#compatibility), or you would like additional depth in your application's [traces](http://localhost:1313/tracing/glossary/#trace), you may want to add custom instrumentation to your code for complete flame graphs or to measure execution times for pieces of code.

If modifying application code is not possible, use the environment variable dd.trace.methods to detail these methods.

If you have existing @Trace or similar annotations, or prefer to use annotations to complete any incomplete traces within Datadog, use Trace Annotations.

Traces may also be created using the OpenTelemetry `@WithSpan` annotation as described in Trace annotations.

### Trace annotations{% #trace-annotations %}

Add `@WithSpan` to methods to have them be traced when running OpenTelemetry and the `dd-java-agent.jar`. If the Agent is not attached, this annotation has no effect on your application. OpenTelemetry's `@WithSpan` annotation is provided by the `opentelemetry-instrumentation-annotations` dependency.

```java
import io.opentelemetry.instrumentation.annotations.WithSpan;

public class SessionManager {

  @WithSpan
  public static void saveSession() {
    // your method implementation here
  }
}
```

### Manually creating a new span{% #manually-creating-a-new-span %}

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

## Adding span events{% #adding-span-events %}

{% alert level="info" %}
Adding span events requires SDK version 1.40.0 or higher.
{% /alert %}

You can add span events using the `addEvent` API. This method requires a `name` parameter and optionally accepts `attributes` and `timestamp` parameters. The method creates a new span event with the specified properties and associates it with the corresponding span.

- **Name** [*required*]: A string representing the event's name.
- **Attributes** [*optional*]: Zero or more key-value pairs with the following properties:
  - The key must be a non-empty string.
  - The value can be either:
    - A primitive type: string, Boolean, or number.
    - A homogeneous array of primitive type values (for example, an array of strings).
  - Nested arrays and arrays containing elements of different data types are not allowed.
- **Timestamp** [*optional*]: A UNIX timestamp representing the event's occurrence time. Expects an `Instant` object.

The following examples demonstrate different ways to add events to a span:

```java
Attributes eventAttributes = Attributes.builder()
    .put(AttributeKey.longKey("int_val"), 1L)
    .put(AttributeKey.stringKey("string_val"), "two")
    .put(AttributeKey.longArrayKey("int_array"), Arrays.asList(3L, 4L))
    .put(AttributeKey.stringArrayKey("string_array"), Arrays.asList("5", "6"))
    .put(AttributeKey.booleanArrayKey("bool_array"), Arrays.asList(true, false))
    .build();

span.addEvent("Event With No Attributes");
span.addEvent("Event With Some Attributes", eventAttributes);
```

Read the [OpenTelemetry](https://opentelemetry.io/docs/specs/otel/trace/api/#add-events) specification for more information.

### Recording exceptions{% #recording-exceptions %}

To record exceptions, use the `recordException` API. This method requires an `exception` parameter and optionally accepts a UNIX `timestamp` parameter. It creates a new span event that includes standardized exception attributes and associates it with the corresponding span.

The following examples demonstrate different ways to record exceptions:

```java
span.recordException(new Exception("Error Message"));
span.recordException(new Exception("Error Message"), 
    Attributes.builder().put(AttributeKey.stringKey("status"), "failed").build());
```

Read the [OpenTelemetry](https://opentelemetry.io/docs/specs/otel/trace/api/#record-exception) specification for more information.

## Trace client and Agent configuration{% #trace-client-and-agent-configuration %}

Both the tracing client and Datadog Agent offer additional configuration options for context propagation. You can also exclude specific resources from sending traces to Datadog if you don't want those traces to be included in calculated metrics, such as traces related to health checks.

### Propagating context with headers extraction and injection{% #propagating-context-with-headers-extraction-and-injection %}

You can configure the propagation of context for distributed traces by injecting and extracting headers. Read [Trace Context Propagation](http://localhost:1313/tracing/trace_collection/trace_context_propagation/) for information.

### Resource filtering{% #resource-filtering %}

Traces can be excluded based on their resource name, to remove synthetic traffic such as health checks from reporting traces to Datadog. This and other security and fine-tuning configurations can be found on the [Security](http://localhost:1313/tracing/security) page or in [Ignoring Unwanted Resources](http://localhost:1313/tracing/guide/ignoring_apm_resources/).

## Further Reading{% #further-reading %}

- [Explore your services, resources, and traces](http://localhost:1313/tracing/glossary/)
- [Interoperability of OpenTelemetry API and Datadog instrumented traces](http://localhost:1313/opentelemetry/guide/otel_api_tracing_interoperability)
