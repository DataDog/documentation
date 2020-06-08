---
title: Java Custom Instrumentation
kind: documentation
aliases:
    - /tracing/opentracing/java
description: 'Implement the OpenTracing standard with the Datadog Java APM tracer.'
further_reading:
    - link: 'tracing/connect_logs_and_traces'
      tag: 'Documentation'
      text: 'Connect your Logs and Traces together'
    - link: 'tracing/visualization/'
      tag: 'Documentation'
      text: 'Explore your services, resources, and traces'
---
This page details common use cases for adding and customizing observability with Datadog APM.

## Adding Tags

Add custom [span tags][11] to your [spans][12] to customize your observability within Datadog.  The span tags are applied to your incoming traces, allowing you to correlate observed behavior with code-level information such as merchant tier, checkout amount, or user ID.


### Add custom span tags

Add custom tags to your spans corresponding to any dynamic value within your application code such as `customer.id`.

```java
import io.opentracing.Tracer;
import io.opentracing.util.GlobalTracer;

@WebServlet
class ShoppingCartServlet extends AbstractHttpServlet {
    @Override
    void doGet(HttpServletRequest req, HttpServletResponse resp) {
        // Get the active span
        final Span span = GlobalTracer.get().activeSpan();
        if (span != null) {
          // customer_id -> 254889
          // customer_tier -> platinum
          // cart_value -> 867
          span.setTag("customer.id", customer_id);
          span.setTag("customer.tier", customer_tier);
          span.setTag("cart.value", cart_value);
        }
        // [...]
    }
}
```


### Adding tags globally to all spans

The `dd.tags` property allows setting tags across all generated spans for an application. This can be useful for grouping stats for your applications, datacenters, or any other tags you would like to see within the Datadog UI.

```text
java -javaagent:<DD-JAVA-AGENT-PATH>.jar \
     -Ddd.tags=datacenter:njc,<TAG_KEY>:<TAG_VALUE> \
     -jar <YOUR_APPLICATION_PATH>.jar
```



### Set errors on a span

To customize an error associated with one of your spans, set the error tag on the span and use `Span.log()` to set an “error event”.  The error event is a `Map<String,Object>` containing a `Fields.ERROR_OBJECT->Throwable` entry, a `Fields.MESSAGE->String`, or both.

```java
import io.opentracing.Span;
import io.opentracing.tag.Tags;
import io.opentracing.util.GlobalTracer;
import io.opentracing.log.Fields
...
    // Get active span if not available in current method
    final Span span = GlobalTracer.get().activeSpan();
    if (span != null) {
      span.setTag(Tags.ERROR, true);
      span.log(Collections.singletonMap(Fields.ERROR_OBJECT, ex));
    }
```

**Note**: `Span.log()` is a generic OpenTracing mechanism for associating events to the current timestamp.  The Java Tracer only supports logging error events.
Alternatively, you can set error tags directly on the span without `log()`:

```java
import io.opentracing.Span;
import io.opentracing.tag.Tags;
import io.opentracing.util.GlobalTracer;
import datadog.trace.api.DDTags;
import java.io.PrintWriter;
import java.io.StringWriter;

...
    final Span span = GlobalTracer.get().activeSpan();
    if (span != null) {
      span.setTag(Tags.ERROR, true);
      span.setTag(DDTags.ERROR_MSG, ex.getMessage());
      span.setTag(DDTags.ERROR_TYPE, ex.getClass().getName());

      final StringWriter errorString = new StringWriter();
      ex.printStackTrace(new PrintWriter(errorString));
      span.setTag(DDTags.ERROR_STACK, errorString.toString());
    }
```

**Note**: You can add any relevant error metadata listed in the [trace view docs][2]. If the current span isn’t the root span, mark it as an error by using the `dd-trace-api` library to grab the root span with `MutableSpan`, then use `setError(true)`. See the [setting tags & errors on a root span][9] section for more details.



### Set tags & errors on a root span from a child span

When an event or condition happens downstream, you may want that behavior or value reflected as a tag on the top level or root span. This can be useful to count an error or for measuring performance, or setting a dynamic tag for observability.

```java
final Span span = tracer.buildSpan("<OPERATION_NAME>").start();
try (final Scope scope = tracer.activateSpan(span)) {
    // exception thrown here
} catch (final Exception e) {
    // Set error tag on span as normal
    span.log(Collections.singletonMap(Fields.ERROR_OBJECT, e));

    // Set error on root span
    MutableSpan localRootSpan = ((MutableSpan) span).getLocalRootSpan();
    localRootSpan.setError(true);
    localRootSpan.setTag("some.other.tag", "value");
} finally {
    // Close span in a finally block
    span.finish();
}
```

If you are not manually creating a span, you can still access the root span through the `GlobalTracer`:

```java
final Span span = GlobalTracer.get().activeSpan();
if (span != null) {
    MutableSpan localRootSpan = ((MutableSpan) span).getLocalRootSpan();
    // do stuff with root span
}
```

**Note**: Although `MutableSpan` and `Span` share many similar methods, they are distinct types. `MutableSpan` is Datadog specific and not part of the OpenTracing API.

<br>

## Adding Spans

If you aren’t using a [supported framework instrumentation][1], or you would like additional depth in your application’s [traces][2], you may want to add custom instrumentation to your code for complete flamegraphs or to measure execution times for pieces of code.

If modifying application code is not possible, use the environment variable `dd.trace.methods` to detail these methods.

If you have existing `@Trace` or similar annotations, or prefer to use annotations to complete any incomplete traces within Datadog, use Trace Annotations.


### DD Trace Methods

Using the `dd.trace.methods` system property, you can get visibility into unsupported frameworks without changing application code.

```text
java -javaagent:/path/to/dd-java-agent.jar -Ddd.env=prod -Ddd.service.name=db-app -Ddd.trace.methods=store.db.SessionManager[saveSession] -jar path/to/application.jar
```

The only difference between this approach and using `@Trace` annotations is the customization options for the operation and resource names.  With DD Trace Methods, `operationName` is `trace.annotation` and `resourceName` is `SessionManager.saveSession`.


### Trace Annotations

Add `@Trace` to methods to have them be traced when running with `dd-java-agent.jar`. If the Agent is not attached, this annotation has no effect on your application.

Datadog’s Trace annotation is provided by the [dd-trace-api dependency][3].

`@Trace` annotations have the default operation name `trace.annotation` and resource name of the traced method. These can be set as arguments of the `@Trace` annotation to better reflect what is being instrumented.  These are the only possible arguments that can be set for the `@Trace` annotation.

```java
import datadog.trace.api.Trace;

public class SessionManager {

    @Trace(operationName = "database.persist", resourceName = "SessionManager.saveSession")
    public static void saveSession() {
        // your method implementation here
    }
}
```
Note that through the `dd.trace.annotations` system property, other tracing method annotations can be recognized by Datadog as `@Trace`. You can find a list [here][4] if you have previously decorated your code.


### Manually creating a new span

In addition to automatic instrumentation, the `@Trace` annotation, and `dd.trace.methods` configurations , you can customize your observability by programmatically creating spans around any block of code.  Spans created in this manner integrate with other tracing mechanisms automatically. In other words, if a trace has already started, the manual span will have its caller as its parent span. Similarly, any traced methods called from the wrapped block of code will have the manual span as its parent.

```java
import datadog.trace.api.DDTags;
import io.opentracing.Scope;
import io.opentracing.Tracer;
import io.opentracing.util.GlobalTracer;

class SomeClass {
    void someMethod() {
        Tracer tracer = GlobalTracer.get();

        // Tags can be set when creating the span
        Span span = tracer.buildSpan("<OPERATION_NAME>")
            .withTag(DDTags.SERVICE_NAME, "<SERVICE_NAME>")
            .start()
        try (Scope scope = tracer.activateSpan(span)) {
            // Tags can also be set after creation
            span.setTag("my.tag", "value");

            // The code you’re tracing
            
        } catch (Exception e) {
            // Set error on span
        } finally {
            // Close span in a finally block
            span.finish();
        }
    }
}
```


### Extending Tracers

The tracing libraries are designed to be extensible. Customers may consider writing a custom post-processor called a `TraceInterceptor` to intercept Spans then adjust or discard them accordingly (e.g. based on a regular expressions). The following example implements two interceptors to achieve complex post-processing logic.

```java
class FilteringInterceptor implements TraceInterceptor {
    @Override
    public Collection<? extends MutableSpan> onTraceComplete(
            Collection<? extends MutableSpan> trace) {

        List<MutableSpan> filteredTrace = new ArrayList<>();
        for (final MutableSpan span : trace) {
          String orderId = (String) span.getTags().get("order.id");

          // Drop spans when the order id starts with "TEST-"
          if (orderId == null || !orderId.startsWith("TEST-")) {
            filteredTrace.add(span);
          }
        }

        return filteredTrace;
    }

    @Override
    public int priority() {
        // some high unique number so this interceptor is last
        return 100; 
    }
}

class PricingInterceptor implements TraceInterceptor {
    @Override
    public Collection<? extends MutableSpan> onTraceComplete(
            Collection<? extends MutableSpan> trace) {

        for (final MutableSpan span : trace) {
          Map<String, Object> tags = span.getTags();
          Double originalPrice = (Double) tags.get("order.price");
          Double discount = (Double) tags.get("order.discount");

          // Set a tag from a calculation from other tags
          if (originalPrice != null && discount != null) {
            span.setTag("order.value", originalPrice - discount);
          }
        }

        return trace;
    }

    @Override
    public int priority() {
        return 20; // some unique number
    }
}
```

Near the start of your application, register the interceptors with the following:
```java
datadog.trace.api.GlobalTracer.get().addTraceInterceptor(new FilteringInterceptor());
datadog.trace.api.GlobalTracer.get().addTraceInterceptor(new PricingInterceptor());
```

<br>

## Trace Client & Agent Configuration

There are additional configurations possible for both the tracing client and Datadog Agent for context propagation with B3 Headers, as well as to exclude specific Resources from sending traces to Datadog in the event these traces are not wanted to count in metrics calculated, such as Health Checks.


### B3 Headers Extraction and Injection

Datadog APM tracer supports [B3 headers extraction][10] and injection for distributed tracing.

Distributed headers injection and extraction is controlled by configuring injection/extraction styles. Currently two styles are supported:

- Datadog: `Datadog`
- B3: `B3`

Injection styles can be configured using:

- System Property: `-Ddd.propagation.style.inject=Datadog,B3`
- Environment Variable: `DD_PROPAGATION_STYLE_INJECT=Datadog,B3`

The value of the property or environment variable is a comma (or space) separated list of header styles that are enabled for injection. By default only Datadog injection style is enabled.

Extraction styles can be configured using:

- System Property: `-Ddd.propagation.style.extract=Datadog,B3`
- Environment Variable: `DD_PROPAGATION_STYLE_EXTRACT=Datadog,B3`

The value of the property or environment variable is a comma (or space) separated list of header styles that are enabled for extraction. By default only Datadog extraction style is enabled.

If multiple extraction styles are enabled extraction attempt is done on the order those styles are configured and first successful extracted value is used.

### Resource Filtering for Health Checks & other endpoints

The Agent can be configured to exclude a specific Resource from Traces sent by the Agent to the Datadog application. To prevent the submission of specific Resources, use the `ignore_resources` setting in the `datadog.yaml` file . This setting enables the creation of a list containing one or more regular expressions, which instructs the Agent to filter out Traces based on their Resource name.

If you are running in a containerized environment, set `DD_APM_IGNORE_RESOURCES` on the container with the Datadog Agent instead. To learn more, [click here][13].

This can be useful for excluding any Health Checks or otherwise simulated traffic from the calculation of metrics for your services.
```text
## @param ignore_resources - list of strings - optional
## A blacklist of regular expressions can be provided to disable certain traces based on their resource name
## all entries must be surrounded by double quotes and separated by commas.
# ignore_resources: ["(GET|POST) /healthcheck"]
```



<br>

## Open Tracing

Datadog integrates seamlessly with the [OpenTracing API][7].

### Setup

For Maven, add this to `pom.xml`:
```xml
<!-- OpenTracing API -->
<dependency>
    <groupId>io.opentracing</groupId>
    <artifactId>opentracing-api</artifactId>
    <version>0.32.0</version>
</dependency>

<dependency>
    <groupId>io.opentracing</groupId>
    <artifactId>opentracing-util</artifactId>
    <version>0.32.0</version>
</dependency>

<!-- Datadog API -->
<dependency>
    <groupId>com.datadoghq</groupId>
    <artifactId>dd-trace-api</artifactId>
    <version>${dd-trace-java.version}</version>
</dependency>

<!-- Datadog OpenTracing bridge (only needed if you do not use dd-java-agent for autoinstrumentation) -->
<dependency>
    <groupId>com.datadoghq</groupId>
    <artifactId>dd-trace-ot</artifactId>
    <version>${dd-trace-java.version}</version>
</dependency>
```

For Gradle, add:

```text
compile group: 'io.opentracing', name: 'opentracing-api', version: "0.32.0"
compile group: 'io.opentracing', name: 'opentracing-util', version: "0.32.0"
compile group: 'com.datadoghq', name: 'dd-trace-api', version: "${dd-trace-java.version}"
// Datadog OpenTracing bridge (only needed if you do not use dd-java-agent for autoinstrumentation)
compile group: 'com.datadoghq', name: 'dd-trace-ot', version: "${dd-trace-java.version}"
```

Configure your application using environment variables or system properties as discussed in the configuration section.

If you’re not using autoinstrumentation, you must register a configured tracer with `GlobalTracer`. For this, call `GlobalTracer.register(DDTracer.builder().build())` early on in your application startup (for example, main method).

```java
import datadog.opentracing.DDTracer;
import io.opentracing.Tracer;
import io.opentracing.util.GlobalTracer;

public class Application {
    public static void main(String[] args) {
        DDTracer tracer = DDTracer.builder().build();
        GlobalTracer.register(tracer);
        // register the same tracer with the Datadog API
        datadog.trace.api.GlobalTracer.registerIfAbsent(tracer);
    }
}
```

Aside from environment variables and system properties, there are additional configuration options as part of the `DDTracer.Builder` interface.  Consult the [Javadoc][8] for a full listing.


### Asynchronous traces

An asynchronous trace is when a span is started in one thread and finished in another. To instrument this behavior, a new scope must be used in each thread the span is active.
```java
// Step 1: start the Scope/Span on the work submission thread
final Tracer tracer = GlobalTracer.get();
final Span span = tracer.buildSpan("ServicehandlerSpan").start();

try (final Scope scope = tracer.activateSpan(span)) {
    // submission thread impl...

    submitAsyncTask(new Runnable() {
        @Override
        public void run() {
            // Step 2: reactivate the Span in the worker thread
            try (final Scope scope = tracer.activateSpan(span)) {
              // worker thread impl
            } finally {
              // Step 3: Finish Span when work is complete
              span.finish();
            }
       }
    });
}
```

### Inject & Extract context for Distributed Tracing

Create a distributed trace using manual instrumentation with OpenTracing:

```java
// Step 1: Inject the Datadog headers in the client code
Span span = tracer.buildSpan("httpClientSpan").start();
try (Scope scope = tracer.activate(span)) {
    HttpRequest request = /* your code here */;

    tracer.inject(span.context(),
                  Format.Builtin.HTTP_HEADERS,
                  new MyHttpHeadersInjectAdapter(request));

    // http request impl...
} finally {
    span.finish();
}

public static class MyHttpHeadersInjectAdapter implements TextMap {
    private final HttpRequest httpRequest;

    public HttpHeadersInjectAdapter(final HttpRequest httpRequest) {
        this.httpRequest = httpRequest;
    }

    @Override
    public void put(final String key, final String value) {
        httpRequest.addHeader(key, value);
    }

    @Override
    public Iterator<Map.Entry<String, String>> iterator() {
        throw new UnsupportedOperationException("This class should be used only with tracer#inject()");
    }
}

// Step 2: Extract the Datadog headers in the server code
HttpRequest request = /* your code here */;

final SpanContext extractedContext =
  GlobalTracer.get().extract(Format.Builtin.HTTP_HEADERS,
                             new MyHttpRequestExtractAdapter(request));

// is a child of http client span in step 1
Span span = tracer.buildSpan("httpServerSpan").asChildOf(extractedContext).start();
try (Scope scope = tracer.activateSpan(span)) {
    // http server impl...
} finally {
    span.finish();
}

public class MyHttpRequestExtractAdapter implements TextMap {
    private final HttpRequest request;

    public HttpRequestExtractAdapter(final HttpRequest request) {
        this.request = request;
    }

    @Override
    public Iterator<Map.Entry<String, String>> iterator() {
        return request.headers().iterator();
    }

    @Override
    public void put(final String key, final String value) {
        throw new UnsupportedOperationException("This class should be used only with Tracer.extract()!");
    }
}
```

Notice the above examples only use the OpenTracing classes. Check the [OpenTracing API][7] for more details and information.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/setup/java/#compatibility
[2]: /tracing/visualization/#trace
[3]: https://mvnrepository.com/artifact/com.datadoghq/dd-trace-api
[4]: https://github.com/DataDog/dd-trace-java/blob/master/dd-java-agent/instrumentation/trace-annotation/src/main/java/datadog/trace/instrumentation/trace_annotation/TraceAnnotationsInstrumentation.java#L37
[4]: /tracing/setup/java/#configuration
[5]: /tracing/visualization/trace/?tab=spantags#more-information
[6]: https://github.com/DataDog/dd-trace-java/blob/master/dd-trace-api/src/main/java/datadog/trace/api/interceptor/MutableSpan.java#L51
[7]: https://github.com/opentracing/opentracing-java
[8]: https://github.com/DataDog/dd-trace-java/blob/master/dd-trace-ot/src/main/java/datadog/opentracing/DDTracer.java
[9]: /tracing/manual_instrumentation/java/#set-tags-errors-on-a-root-span-from-a-child-span
[10]: https://github.com/openzipkin/b3-propagation
[11]: /tracing/visualization/#span-tags
[12]: /tracing/visualization/#spans
[13]: /agent/docker/apm/?tab=standard#docker-apm-agent-environment-variables
