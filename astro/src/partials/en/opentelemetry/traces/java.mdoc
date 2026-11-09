<!--
This partial contains Java traces content for the OTel API.
It can be included directly in language-specific pages or wrapped in conditionals.
-->

## Setup {% #setup-otel-java %}

{% alert level="info" %}
OpenTelemetry is supported in Java after version 1.24.0.
{% /alert %}

To configure OpenTelemetry to use the Datadog trace provider:

1. If you have not yet read the instructions for auto-instrumentation and setup, start with the [Java Setup Instructions][100].

2. Make sure you only depend on the OpenTelemetry API (and not the OpenTelemetry SDK).

3. Set the `dd.trace.otel.enabled` system property or the `DD_TRACE_OTEL_ENABLED` environment variable to `true`.

## Adding span tags {% #adding-span-tags-otel-java %}

### Add custom span tags {% #add-custom-span-tags-otel-java %}

Add custom tags to your spans corresponding to any dynamic value within your application code such as `customer.id`.

```java
import io.opentelemetry.api.trace.Span;

public void doSomething() {
  Span span = Span.current();
  span.setAttribute("user-name", "Some User");
}
```

### Adding tags globally to all spans {% #adding-tags-globally-otel-java %}

The `dd.tags` property allows you to set tags across all generated spans for an application. This is useful for grouping stats for your applications, data centers, or any other tags you would like to see in Datadog.

```shell
java -javaagent:<DD-JAVA-AGENT-PATH>.jar \
    -Ddd.tags=datacenter:njc,<TAG_KEY>:<TAG_VALUE> \
    -jar <YOUR_APPLICATION_PATH>.jar
```

### Setting errors on span {% #setting-errors-on-span-otel-java %}

To set an error on a span, use the `setStatus` method:

```java
import static io.opentelemetry.api.trace.StatusCode.ERROR;
import io.opentelemetry.api.trace.Span;

public void doSomething() {
  Span span = Span.current();
  span.setStatus(ERROR, "Some error details...");
}
```

### Setting tags and errors on a root span from a child span {% #setting-tags-errors-root-span-otel-java %}

When you want to set tags or errors on the root span from within a child span, you can use the OpenTelemetry Context API:

```java
import io.opentelemetry.api.trace.Span;
import io.opentelemetry.api.trace.Tracer;
import io.opentelemetry.context.Context;
import io.opentelemetry.context.ContextKey;
import io.opentelemetry.context.Scope;

public class Example {

  private final static ContextKey<Span> CONTEXT_KEY =
    ContextKey.named("opentelemetry-traces-local-root-span");

  public void begin() {
    Tracer tracer = GlobalOpenTelemetry.getTracer("my-scope", "0.1.0");
    Span parentSpan = tracer.spanBuilder("begin").startSpan();
    try (Scope scope = parentSpan.makeCurrent()) {
      createChildSpan();
    } finally {
      parentSpan.end();
    }
  }

  private void createChildSpan() {
    Tracer tracer = GlobalOpenTelemetry.getTracer("my-scope", "0.1.0");
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

## Adding spans {% #adding-spans-otel-java %}

If you aren't using a [supported framework instrumentation][101], or you would like additional depth in your application's [traces][102], you may want to add custom instrumentation to your code for complete flame graphs or to measure execution times for pieces of code.

If modifying application code is not possible, use the environment variable `dd.trace.methods` to detail these methods.

If you have existing `@Trace` or similar annotations, or prefer to use annotations to complete any incomplete traces within Datadog, use Trace Annotations.

### Trace annotations {% #trace-annotations-otel-java %}

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

### Manually creating a new span {% #manually-creating-a-new-span-otel-java %}

To manually create new spans within the current trace context:

```java
import io.opentelemetry.api.trace.Span;
import io.opentelemetry.api.trace.Tracer;
import io.opentelemetry.context.Scope;

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

## Adding span events {% #adding-span-events-otel-java %}

{% alert level="info" %}
Adding span events requires SDK version 1.40.0 or higher.
{% /alert %}

You can add span events using the `addEvent` API. This method requires a `name` parameter and optionally accepts `attributes` and `timestamp` parameters. The method creates a new span event with the specified properties and associates it with the corresponding span.

- **Name** [_required_]: A string representing the event's name.
- **Attributes** [_optional_]: Key-value pairs where the key is a non-empty string and the value is a primitive type or a homogeneous array of primitive values.
- **Timestamp** [_optional_]: A UNIX timestamp representing the event's occurrence time. Expects an `Instant` object.

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

Read the [OpenTelemetry specification for adding events][103] for more information.

### Recording exceptions {% #recording-exceptions-otel-java %}

To record exceptions, use the `recordException` API:

```java
span.recordException(new Exception("Error Message"));
span.recordException(new Exception("Error Message"),
    Attributes.builder().put(AttributeKey.stringKey("status"), "failed").build());
```

Read the [OpenTelemetry specification for recording exceptions][104] for more information.

## Trace client and Agent configuration {% #trace-client-agent-config-otel-java %}

Both the tracing client and Datadog Agent offer additional configuration options for context propagation. You can also exclude specific resources from sending traces to Datadog if you don't want those traces to be included in calculated metrics, such as traces related to health checks.

### Propagating context with headers extraction and injection {% #propagating-context-otel-java %}

You can configure the propagation of context for distributed traces by injecting and extracting headers. Read [Trace Context Propagation][105] for information.

### Resource filtering {% #resource-filtering-otel-java %}

Traces can be excluded based on their resource name, to remove synthetic traffic such as health checks from reporting traces to Datadog. This and other security and fine-tuning configurations can be found on the [Security][106] page or in [Ignoring Unwanted Resources][107].

[100]: /tracing/setup/java/
[101]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/java/?tab=wget#compatibility
[102]: /tracing/glossary/#trace
[103]: https://opentelemetry.io/docs/specs/otel/trace/api/#add-events
[104]: https://opentelemetry.io/docs/specs/otel/trace/api/#record-exception
[105]: /tracing/trace_collection/trace_context_propagation/
[106]: /tracing/security
[107]: /tracing/guide/ignoring_apm_resources/
