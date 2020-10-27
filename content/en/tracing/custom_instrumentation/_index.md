---
title: Custom Instrumentation
kind: documentation
description: 'Customize your instrumentation and observability within your Datadog traces.'
aliases:
    - /tracing/setup/php/manual-installation
    - /agent/apm/php/manual-installation
    - /tracing/guide/distributed_tracing/
    - /tracing/advanced/manual_instrumentation/
    - /tracing/advanced/opentracing/
    - /tracing/opentracing/
    - /tracing/manual_instrumentation/
    - /tracing/guide/adding_metadata_to_spans
    - /tracing/advanced/adding_metadata_to_spans/
further_reading:
    - link: 'tracing/guide/instrument_custom_method'
      text: 'Instrument a custom method to get deep visibility into your business logic'
    - link: 'tracing/connect_logs_and_traces'
      text: 'Connect your Logs and Traces together'
    - link: 'tracing/opentracing'
      text: 'Implement Opentracing across your applications'
    - link: 'tracing/visualization/'
      text: 'Explore your services, resources, and traces'
    - link: 'https://www.datadoghq.com/blog/opentelemetry-instrumentation/'
      text: 'Learn More about Datadog and the OpenTelemetry initiative'
---

Custom instrumentation allows programmatic creation, modification, or deletion of traces to send to Datadog. This is useful for tracing in-house code not captured by automatic instrumentation, removing unwanted spans from traces, as well as for providing deeper visibility and context into spans, including adding any desired [span tags][1].

Before instrumenting your application, review Datadog’s [APM Terminology][2] and familiarize yourself with the core concepts of Datadog APM.

If you’re already using OpenTracing, choose your language below and proceed to the OpenTracing section.

{{< programming-lang-wrapper langs="java,python,ruby,c++,go,nodeJS,.NET,.NET Core,PHP" >}}

{{< programming-lang lang="java" >}}

<div class="alert alert-info">
If you have not yet read the instructions for auto-instrumentation and setup, start with the <a href="https://docs.datadoghq.com/tracing/setup/java/">Java Setup Instructions</a>.
</div>

This page details common use cases for adding and customizing observability with Datadog APM.

## Adding Tags

Add custom [span tags][1] to your [spans][2] to customize your observability within Datadog.  The span tags are applied to your incoming traces, allowing you to correlate observed behavior with code-level information such as merchant tier, checkout amount, or user ID.


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

**Note**: You can add any relevant error metadata listed in the [trace view docs][3]. If the current span isn’t the root span, mark it as an error by using the `dd-trace-api` library to grab the root span with `MutableSpan`, then use `setError(true)`. See the [setting tags & errors on a root span][4] section for more details.



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
    if (span instanceof MutableSpan) {
        MutableSpan localRootSpan = ((MutableSpan) span).getLocalRootSpan();
        localRootSpan.setError(true);
        localRootSpan.setTag("some.other.tag", "value");
    }
} finally {
    // Close span in a finally block
    span.finish();
}
```

If you are not manually creating a span, you can still access the root span through the `GlobalTracer`:

```java
final Span span = GlobalTracer.get().activeSpan();
if (span != null && (span instanceof MutableSpan)) {
    MutableSpan localRootSpan = ((MutableSpan) span).getLocalRootSpan();
    // do stuff with root span
}
```

**Note**: Although `MutableSpan` and `Span` share many similar methods, they are distinct types. `MutableSpan` is Datadog specific and not part of the OpenTracing API.

<br>

## Adding Spans

If you aren’t using a [supported framework instrumentation][5], or you would like additional depth in your application’s [traces][3], you may want to add custom instrumentation to your code for complete flamegraphs or to measure execution times for pieces of code.

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

Datadog’s Trace annotation is provided by the [dd-trace-api dependency][6].

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
Note that through the `dd.trace.annotations` system property, other tracing method annotations can be recognized by Datadog as `@Trace`. You can find a list [here][7] if you have previously decorated your code.


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
            .withTag(DDTags.SERVICE, "<SERVICE_NAME>")
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

Datadog APM tracer supports [B3 headers extraction][8] and injection for distributed tracing.

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

### Resource Filtering

Traces can be excluded based on their resource name, to remove synthetic traffic such as health checks from reporting traces to Datadog.  This and other security and fine-tuning configurations can be found on the [Security][9] page.

[1]: /tracing/visualization/#span-tags
[2]: /tracing/visualization/#spans
[3]: /tracing/visualization/#trace
[4]: /tracing/custom_instrumentation/java/#set-tags-errors-on-a-root-span-from-a-child-span
[5]: /tracing/setup/java/#compatibility
[6]: https://mvnrepository.com/artifact/com.datadoghq/dd-trace-api
[7]: https://github.com/DataDog/dd-trace-java/blob/master/dd-java-agent/instrumentation/trace-annotation/src/main/java/datadog/trace/instrumentation/trace_annotation/TraceAnnotationsInstrumentation.java#L37
[8]: https://github.com/openzipkin/b3-propagation
[9]: /tracing/security



{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

<div class="alert alert-info">
If you have not yet read the instructions for auto-instrumentation and setup, start with the <a href="https://docs.datadoghq.com/tracing/setup/python/">Python Setup Instructions</a>.
</div>

If you aren't using supported library instrumentation (see [library compatibility][1]), you may want to manually instrument your code.

You may also want to extend the functionality of the `ddtrace` library or gain finer control over instrumenting your application. Several techniques are provided by the library to accomplish this.

## Creating spans

The `ddtrace` library creates spans automatically with `ddtrace-run` for [many libraries and frameworks][1]. However, you may want to gain visibility into your own code and this is achieved by using spans.

Within your web request (for example, `make_sandwich_request`), you may perform several operations, like `get_ingredients()` and `assemble_sandwich()`, which are useful to measure.

```python
def make_sandwich_request(request):
    ingredients = get_ingredients()
    sandwich = assemble_sandwich(ingredients)
```

{{< tabs >}}
{{% tab "Decorator" %}}

`ddtrace` provides a decorator `tracer.wrap()` that can be used to decorate the functions of interest. This is useful if you would like to trace the function regardless of where it is being called from.


```python
  from ddtrace import tracer

  @tracer.wrap()
  def get_ingredients():
      # go to the pantry
      # go to the fridge
      # maybe go to the store
      return

  # You can provide more information to customize the span
  @tracer.wrap("assemble_sandwich", service="my-sandwich-making-svc")
  def assemble_sandwich(ingredients):
      return
```

API details for the decorator can be found for `ddtrace.Tracer.wrap()` [here][1].


[1]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#ddtrace.Tracer.wrap
{{% /tab %}}
{{% tab "Context Manager" %}}

To trace an arbitrary block of code, use the `ddtrace.Span` context manager as below, or view the [advanced usage documentation][1].

```python
from ddtrace import tracer

def make_sandwich_request(request):
    # Capture both operations in a span
    with tracer.trace("sandwich.make"):
        ingredients = get_ingredients()
        sandwich = assemble_sandwich(ingredients)

def make_sandwich_request(request):
    # Capture both operations in a span
    with tracer.trace("sandwich.create") as outer_span:
        with tracer.trace("get_ingredients") as span:
            ingredients = get_ingredients()

        with tracer.trace("assemble_sandwich") as span:
            sandwich = assemble_sandwich(ingredients)
```

Full API details for `ddtrace.Tracer()` can be found [here][2]

[1]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#ddtrace.Span
[2]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#tracer
{{% /tab %}}
{{% tab "Manual" %}}

If the decorator and context manager methods are still not enough to satisfy your tracing needs, a manual API is provided which allows you to start and finish [spans][1] however you may require:

```python

def make_sandwich_request(request):
    span = tracer.trace("sandwich.create")
    ingredients = get_ingredients()
    sandwich = assemble_sandwich(ingredients)
    span.finish()  # remember to finish the span
```

API details of the decorator can be found in the `ddtrace.Tracer.trace` [documentation][2] or the `ddtrace.Span.finish`[documentation][3].



[1]: /tracing/visualization/#spans
[2]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#ddtrace.Tracer.trace
[3]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#ddtrace.Span.finish
{{% /tab %}}
{{< /tabs >}}


## Accessing active spans

The built-in instrumentation and your own custom instrumentation will create spans around meaningful operations. You can access the active span in order to include meaningful data.

```python
from ddtrace import tracer

def make_sandwich_request(request):
    # Capture both operations in a span
    with tracer.trace("sandwich.make") as my_span:
        ingredients = get_ingredients()
        sandwich = assemble_sandwich(ingredients)
```

{{< tabs >}}
{{% tab "Current span" %}}

```python
def get_ingredients():
    # Get the active span
    span = tracer.current_span()
    # this span is my_span from make_sandwich_request above
```

{{% /tab %}}

{{% tab "Root span" %}}

```python
def assemble_sandwich(ingredients):
    with tracer.trace("another.operation") as another_span:
        # Get the active root span
        span = tracer.current_root_span()
        # this span is my_span from make_sandwich_request above
```
{{% /tab %}}
{{< /tabs >}}


## Adding tags

{{< tabs >}}
{{% tab "Locally" %}}

Tags can be added to a span using the `set_tag` method on a span:

```python
from ddtrace import tracer

def make_sandwich_request(request):
    with tracer.trace("sandwich.make") as span:
        ingredients = get_ingredients()
        span.set_tag("num_ingredients", len(ingredients))
```
{{% /tab %}}
{{% tab "Globally" %}}

Tags can be globally set on the tracer. These tags will be applied to every span that is created.

```python
from ddtrace import tracer
from myapp import __version__

# This will be applied to every span
tracer.set_tags({"version": __version__, "<TAG_KEY_2>": "<TAG_VALUE_2>"})
```
{{% /tab %}}
{{% tab "Errors" %}}

Exception information is captured and attached to a span if there is one active when the exception is raised.

```python
from ddtrace import tracer

with tracer.trace("throws.an.error") as span:
    raise Exception("Oops!")

# `span` will be flagged as erroneous and have
# the stack trace and exception message attached as tags
```

Flagging a span as erroneous can also be done manually:

```python
from ddtrace import tracer

span = tracer.trace("operation")
span.error = 1
span.finish()
```
{{% /tab %}}
{{< /tabs >}}

## Resource Filtering

Traces can be excluded based on their resource name, to remove synthetic traffic such as health checks from reporting traces to Datadog.  This and other security and fine-tuning configurations can be found on the [Security][2] page.

[1]: /tracing/compatibility_requirements/python
[2]: /tracing/security

{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

<div class="alert alert-info">
If you have not yet read the instructions for auto-instrumentation and setup, please start with the <a href="https://docs.datadoghq.com/tracing/setup/ruby/">Ruby Setup Instructions</a>.
</div>

This page details common use cases for adding and customizing observability with Datadog APM.

## Adding Tags

Add custom [span tags][1] to your [spans][2] to customize your observability within Datadog.  The span tags are applied to your incoming traces, allowing you to correlate observed behavior with code-level information such as merchant tier, checkout amount, or user ID.

### Add custom span tags

Add custom tags to your spans corresponding to any dynamic value within your application code such as `customer.id`.

{{< tabs >}}
{{% tab "Active Span" %}}
Access the current active [span][1] from any method within your code. **Note**: If the method is called and there is no span currently active, `active_span` is `nil`.

```ruby
require 'ddtrace'

# get '/shopping_cart/:customer_id', to: 'shopping_cart#index'
class ShoppingCartController < ApplicationController
  # GET /shopping_cart
  def index
    # Get the active span
    current_span = Datadog.tracer.active_span
    # customer_id -> 254889
    current_span.set_tag('customer.id', params.permit([:customer_id])) unless current_span.nil?

    # [...]
  end

  # POST /shopping_cart
  def create
    # [...]
  end
end
```

[1]: /tracing/visualization/#spans
{{% /tab %}}

{{% tab "Manually Instrumented Spans" %}}

Add [tags][1] directly to `Datadog::Span` objects by calling `#set_tag`:

```ruby
# An example of a Sinatra endpoint,
# with Datadog tracing around the request.
get '/posts' do
  Datadog.tracer.trace('web.request') do |span|
    span.set_tag('http.url', request.path)
    span.set_tag('<TAG_KEY>', '<TAG_VALUE>')
  end
end
```


[1]: /tracing/visualization/#span-tags
{{% /tab %}}
{{< /tabs >}}

### Adding tags globally to all spans

Add [tags][1] to all [spans][2] by configuring the tracer with the `tags` option:

```ruby
Datadog.configure do |c|
  c.tags = { 'team' => 'qa' }
end
```

You can also use the `DD_TAGS` environment variable to set tags on all spans for an application. For more information on Ruby environment variables, refer to the [setup documentation][3].

### Setting Errors on a Span

There are two ways to set an error on a span

- The first is to simply call `span.set_error` and pass in the Exception Object.
- This will automatically extract the error type, message, and backtrace.

```ruby
require 'ddtrace'
require 'timeout'

def example_method
  span = Datadog.tracer.trace('example.trace')
  puts 'some work'
  sleep(1)
  raise StandardError.new "This is an exception"
rescue StandardError => error
  span = Datadog.tracer.active_span
  span.set_error(error) unless span.nil?
  raise error
ensure
  span.finish
end

example_method()
```

- The second is to use `tracer.trace` which will by default set the error type, message, and backtrace.
- To configure this behavior you can use the `on_error` option, which is the Handler invoked when a block is provided to `trace`, and the block raises an error.
- The Proc is provided `span` and `error` as arguments.
- By default, `on_error` Sets error on the span.

Default Behavior: `on_error`

```ruby
require 'ddtrace'
require 'timeout'

def example_method
  puts 'some work'
  sleep(1)
  raise StandardError.new "This is a exception"
end

Datadog.tracer.trace('example.trace', on_error: custom_error_handler) do |span|
  example_method()
end
```

Custom Behavior: `on_error`

```ruby
require 'ddtrace'
require 'timeout'

def example_method
  puts 'some work'
  sleep(1)
  raise StandardError.new "This is a special exception"
end

custom_error_handler = proc do |span, error|
  span.set_tag('custom_tag', 'custom_value')
  span.set_error(error) unless error.message.include?("a special exception")
end

Datadog.tracer.trace('example.trace', on_error: custom_error_handler) do |span|
  example_method()
end
```


## Adding Spans

If you aren't using supported library instrumentation (see [library compatibility][4]), you may want to to manually instrument your code. Adding tracing to your code is easy using the `Datadog.tracer.trace` method, which you can wrap around any Ruby code:

To trace any Ruby code, you can use the `Datadog.tracer.trace` method:

```ruby
Datadog.tracer.trace(name, options) do |span|
  # Wrap this block around the code you want to instrument
  # Additionally, you can modify the span here.
  # e.g. Change the resource name, set tags, etc...
end
```

Where `name` should be a `String` that describes the generic kind of operation being done (e.g. `'web.request'`, or `'request.parse'`)

And `options` is an optional `Hash` that accepts the following parameters:

| Key | Type | Description | Default |
| --- | --- | --- | --- |
| `service`     | `String` | The service name which this span belongs (e.g. `'my-web-service'`) | Tracer `default-service`, `$PROGRAM_NAME` or `'ruby'` |
| `resource`    | `String` | Name of the resource or action being operated on. Traces with the same resource value will be grouped together for the purpose of metrics (but still independently viewable.) Usually domain specific, such as a URL, query, request, etc. (e.g. `'Article#submit'`, `http://example.com/articles/list`.) | `name` of Span. |
| `span_type`   | `String` | The type of the span (such as `'http'`, `'db'`, etc.) | `nil` |
| `child_of`    | `Datadog::Span` / `Datadog::Context` | Parent for this span. If not provided, will automatically become current active span. | `nil` |
| `start_time`  | `Integer` | When the span actually starts. Useful when tracing events that have already happened. | `Time.now.utc` |
| `tags`        | `Hash` | Extra tags which should be added to the span. | `{}` |
| `on_error`    | `Proc` | Handler invoked when a block is provided to trace, and it raises an error. Provided `span` and `error` as arguments. Sets error on the span by default. | `proc { |span, error| span.set_error(error) unless span.nil? }` |

It's highly recommended you set both `service` and `resource` at a minimum. Spans without a `service` or `resource` as `nil` will be discarded by the Datadog agent.


### Manually creating a new span

Programmatically create spans around any block of code.  Spans created in this manner integrate with other tracing mechanisms automatically. In other words, if a trace has already started, the manual span will have its caller as its parent span. Similarly, any traced methods called from the wrapped block of code will have the manual span as its parent.

```ruby
# An example of a Sinatra endpoint,
# with Datadog tracing around the request,
# database query, and rendering steps.
get '/posts' do
  Datadog.tracer.trace('web.request', service: '<SERVICE_NAME>', resource: 'GET /posts') do |span|
    # Trace the activerecord call
    Datadog.tracer.trace('posts.fetch') do
      @posts = Posts.order(created_at: :desc).limit(10)
    end

    # Add some APM tags
    span.set_tag('http.method', request.request_method)
    span.set_tag('posts.count', @posts.length)

    # Trace the template rendering
    Datadog.tracer.trace('template.render') do
      erb :index
    end
  end
end
```


### Post-Processing Traces

Some applications might require that traces be altered or filtered out before they are sent upstream. The processing pipeline allows users to create *processors* to define such behavior.

Processors can be any object that responds to `#call` accepting `trace` as an argument (which is an `Array` of `Datadog::Span`s.)

For example:

```ruby
lambda_processor = ->(trace) do
  # Processing logic...
  trace
end

class MyCustomProcessor
  def call(trace)
    # Processing logic...
    trace
  end
end
custom_processor = MyFancyProcessor.new
```

`#call` blocks of processors *must* return the `trace` object; this return value will be passed to the next processor in the pipeline.

These processors must then be added to the pipeline via `Datadog::Pipeline.before_flush`:

```ruby
Datadog::Pipeline.before_flush(lambda_processor, custom_processor)
```

You can also define processors using the short-hand block syntax for `Datadog::Pipeline.before_flush`:

```ruby
Datadog::Pipeline.before_flush do |trace|
  trace.delete_if { |span| span.name =~ /forbidden/ }
end
```

#### Filtering

You can use the `Datadog::Pipeline::SpanFilter` processor to remove spans, when the block evaluates as truthy:

```ruby
Datadog::Pipeline.before_flush(
  # Remove spans that match a particular resource
  Datadog::Pipeline::SpanFilter.new { |span| span.resource =~ /PingController/ },
  # Remove spans that are trafficked to localhost
  Datadog::Pipeline::SpanFilter.new { |span| span.get_tag('host') == 'localhost' }
)
```

#### Processing

You can use the `Datadog::Pipeline::SpanProcessor` processor to modify spans:

```ruby
Datadog::Pipeline.before_flush(
  # Strip matching text from the resource field
  Datadog::Pipeline::SpanProcessor.new { |span| span.resource.gsub!(/password=.*/, '') }
)
```

## Trace Client & Agent Configuration

There are additional configurations possible for both the tracing client and Datadog Agent for context propagation with B3 Headers, as well as to exclude specific Resources from sending traces to Datadog in the event these traces are not wanted to count in metrics calculated, such as Health Checks.


### B3 Headers Extraction and Injection

Datadog APM tracer supports [B3 headers extraction][5] and injection for distributed tracing.

Distributed headers injection and extraction is controlled by configuring injection/extraction styles. Currently two styles are supported:

- Datadog: `Datadog`
- B3: `B3`

Injection styles can be configured using:

- Environment Variable: `DD_PROPAGATION_STYLE_INJECT=Datadog,B3`

The value of the environment variable is a comma separated list of header styles that are enabled for injection. By default only Datadog injection style is enabled.

Extraction styles can be configured using:

- Environment Variable: `DD_PROPAGATION_STYLE_EXTRACT=Datadog,B3`

The value of the environment variable is a comma separated list of header styles that are enabled for extraction. By default only Datadog extraction style is enabled.

If multiple extraction styles are enabled extraction attempt is done on the order those styles are configured and first successful extracted value is used.

### Resource Filtering

Traces can be excluded based on their resource name, to remove synthetic traffic such as health checks from reporting traces to Datadog.  This and other security and fine-tuning configurations can be found on the [Security][6] page.

[1]: /tracing/visualization/#span-tags
[2]: /tracing/visualization/#spans
[3]: /tracing/setup/ruby/#environment-and-tags
[4]: /tracing/compatibility_requirements/ruby/
[5]: https://github.com/openzipkin/b3-propagation
[6]: /tracing/security


{{< /programming-lang >}}

{{< programming-lang lang="c++" >}}


<div class="alert alert-info">
If you have not yet read the setup instructions, start with the <a href="https://docs.datadoghq.com/tracing/setup/cpp/">C++ Setup Instructions</a>.
</div>

## Add tags

Add custom [span tags][1] to your [spans][2] to customize your observability within Datadog.  The span tags are applied to your incoming traces, allowing you to correlate observed behavior with code-level information such as merchant tier, checkout amount, or user ID.

C++ tracing uses "common tags".  These tags can be sourced from both [Datadog specific tags][3] or [OpenTracing tags][4], and included via the below:

```cpp
#include <opentracing/ext/tags.h>
#include <datadog/tags.h>
```

Note that the Datadog tags are necessary for [unified service tagging][5].

### Add custom span tags

Add [tags][1] directly to a [span][2] object by calling `Span::SetTag`. For example:

```cpp
auto tracer = ...
auto span = tracer->StartSpan("operation_name");
span->SetTag("key must be string", "Values are variable types");
span->SetTag("key must be string", 1234);
```

Values are of [variable type][6] and can be complex objects. Values are serialized as JSON, with the exception of a string value being serialized bare (without extra quotation marks).

### Adding tags globally to all spans

To set tags across all your spans, set the `DD_TAGS` environment variable as a list of `key:value` pairs separated by commas.

### Set errors on a span

To customize an error associated with one of your spans, use the below:

```cpp
span->SetTag(opentracing::ext::error, true);
```

Error metadata may be set as additional tags on the same span as well.

## Adding Spans

### Manually instrument a method

To manually instrument your code, install the tracer as in the [setup examples][7], and then use the tracer object to create [spans][2].

```cpp
{
  // Create a root span.
  auto root_span = tracer->StartSpan("operation_name");
  // Create a child span.
  auto child_span = tracer->StartSpan(
      "operation_name",
      {opentracing::ChildOf(&root_span->context())});
  // Spans can be finished at a specific time ...
  child_span->Finish();
} // ... or when they are destructed (root_span finishes here).
```

### Inject & Extract context for Distributed Tracing

Distributed tracing can be accomplished by [using the `Inject` and `Extract` methods on the tracer][8], which accept [generic `Reader` and `Writer` types][9]. Priority sampling (enabled by default) should be on to ensure uniform delivery of spans.

```cpp
// Allows writing propagation headers to a simple map<string, string>.
// Copied from https://github.com/opentracing/opentracing-cpp/blob/master/mocktracer/test/propagation_test.cpp
struct HTTPHeadersCarrier : HTTPHeadersReader, HTTPHeadersWriter {
  HTTPHeadersCarrier(std::unordered_map<std::string, std::string>& text_map_)
      : text_map(text_map_) {}

  expected<void> Set(string_view key, string_view value) const override {
    text_map[key] = value;
    return {};
  }

  expected<void> ForeachKey(
      std::function<expected<void>(string_view key, string_view value)> f)
      const override {
    for (const auto& key_value : text_map) {
      auto result = f(key_value.first, key_value.second);
      if (!result) return result;
    }
    return {};
  }

  std::unordered_map<std::string, std::string>& text_map;
};

void example() {
  auto tracer = ...
  std::unordered_map<std::string, std::string> headers;
  HTTPHeadersCarrier carrier(headers);

  auto span = tracer->StartSpan("operation_name");
  tracer->Inject(span->context(), carrier);
  // `headers` now populated with the headers needed to propagate the span.
}
```

## Trace Client & Agent Configuration

There are additional configurations possible for both the tracing client and Datadog Agent for context propagation with B3 Headers, as well as to exclude specific Resources from sending traces to Datadog in the event these traces are not wanted to count in metrics calculated, such as Health Checks.


### B3 Headers Extraction and Injection

Datadog APM tracer supports [B3 headers extraction][10] and injection for distributed tracing.

Distributed headers injection and extraction is controlled by configuring injection/extraction styles. Currently two styles are supported:

- Datadog: `Datadog`
- B3: `B3`

Injection styles can be configured using:

- Environment Variable: `DD_PROPAGATION_STYLE_INJECT="Datadog B3"`

The value of the environment variable is a comma (or space) separated list of header styles that are enabled for injection. By default only Datadog injection style is enabled.

Extraction styles can be configured using:

- Environment Variable: `DD_PROPAGATION_STYLE_EXTRACT="Datadog B3"`

The value of the environment variable is a comma (or space) separated list of header styles that are enabled for extraction. By default only Datadog extraction style is enabled.

If multiple extraction styles are enabled extraction attempt is done on the order those styles are configured and first successful extracted value is used.

### Resource Filtering

Traces can be excluded based on their resource name, to remove synthetic traffic such as health checks from reporting traces to Datadog.  This and other security and fine-tuning configurations can be found on the [Security][11] page.

[1]: /tracing/visualization/#span-tags
[2]: /tracing/visualization/#spans
[3]: https://github.com/DataDog/dd-opentracing-cpp/blob/master/include/datadog/tags.h
[4]: https://github.com/opentracing/opentracing-cpp/blob/master/include/opentracing/ext/tags.h
[5]: /getting_started/tagging/unified_service_tagging
[6]: https://github.com/opentracing/opentracing-cpp/blob/master/include/opentracing/value.h
[7]: /tracing/setup/cpp/#installation
[8]: https://github.com/opentracing/opentracing-cpp/#inject-span-context-into-a-textmapwriter
[9]: https://github.com/opentracing/opentracing-cpp/blob/master/include/opentracing/propagation.h
[10]: https://github.com/openzipkin/b3-propagation
[11]: /tracing/security


{{< /programming-lang >}}


{{< programming-lang lang="go" >}}

<div class="alert alert-info">
If you have not yet read the instructions for auto-instrumentation and setup, start with the <a href="https://docs.datadoghq.com/tracing/setup/go/">Go Setup Instructions</a>.
</div>

This page details common use cases for adding and customizing observability with Datadog APM.

## Adding Tags

Add custom [span tags][1] to your [spans][2] to customize your observability within Datadog. The span tags are applied to your incoming traces, allowing you to correlate observed behavior with code-level information such as merchant tier, checkout amount, or user ID.

### Add custom span tags

Add [tags][1] directly to a `Span` interface by calling `SetTag`:

```go
package main

import (
    "log"
    "net/http"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    // Create a span for a web request at the /posts URL.
    span := tracer.StartSpan("web.request", tracer.ResourceName("/posts"))
    defer span.Finish()

    // Set tag
    span.SetTag("http.url", r.URL.Path)
    span.SetTag("<TAG_KEY>", "<TAG_VALUE>")
}

func main() {
    tracer.Start(tracer.WithServiceName("<SERVICE_NAME>"))
    defer tracer.Stop()
    http.HandleFunc("/posts", handler)
    log.Fatal(http.ListenAndServe(":8080", nil))
}
```

Datadog's integrations make use of the `Context` type to propagate the current active [span][2].
If you want to add span tags attached to a `Context`, call the `SpanFromContext` function:

```go
package main

import (
    "net/http"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    // Retrieve a span for a web request attached to a Go Context.
    if span, ok := tracer.SpanFromContext(r.Context()); ok {
        // Set tag
        span.SetTag("http.url", r.URL.Path)
    }
}
```

### Adding tags globally to all spans

Add [tags][1] to all [spans][2] by configuring the tracer with the `WithGlobalTag` option:

```go
package main

import "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"

func main() {
    tracer.Start(
        tracer.WithGlobalTag("datacenter", "us-1"),
        tracer.WithGlobalTag("env", "dev"),
    )
    defer tracer.Stop()
}
```

### Set errors on a span

To set an error on one of your spans, use `tracer.WithError` as below:

```go
err := someOperation()
span.Finish(tracer.WithError(err))
```

## Adding spans

If you aren't using supported library instrumentation (see [Library compatibility][3]), you may want to to manually instrument your code.

### Manually creating a new span

To make use of manual instrumentation, use the `tracer` package which is documented on Datadog's [godoc page][4]:

There are two functions available to create spans. API details are available for `StartSpan` [here][5] and for `StartSpanFromContext` [here][6].

```go
//Create a span with a resource name, which is the child of parentSpan.
span := tracer.StartSpan(“mainOp”, tracer.ResourceName("/user"), tracer.ChildOf(parentSpan))

// Create a span which will be the child of the span in the Context ctx, if there is a span in the context.
// Returns the new span, and a new context containing the new span.
span, ctx := tracer.StartSpanFromContext(ctx, “mainOp”, tracer.ResourceName("/user"))
```

### Asynchronous Traces

```go
func main() {
	span, ctx := tracer.StartSpanFromContext(context.Background(), “mainOp”)
	defer span.Finish()

	go func() {
		asyncSpan := tracer.StartSpanFromContext(ctx, “asyncOp”)
		defer asyncSpan.Finish()
		performOp()
	}()
}
```

### Distributed Tracing

Create a distributed [trace][7] by manually propagating the tracing context:

```go
package main

import (
    "net/http"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    span, ctx := tracer.StartSpanFromContext(r.Context(), "post.process")
    defer span.Finish()

    req, err := http.NewRequest("GET", "http://example.com", nil)
    req = req.WithContext(ctx)
    // Inject the span Context in the Request headers
    err = tracer.Inject(span.Context(), tracer.HTTPHeadersCarrier(req.Header))
    if err != nil {
        // Handle or log injection error
    }
    http.DefaultClient.Do(req)
}
```

Then, on the server side, to continue the trace, start a new [Span][2] from the extracted `Context`:

```go
package main

import (
    "net/http"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    // Extract the span Context and continue the trace in this service
    sctx, err := tracer.Extract(tracer.HTTPHeadersCarrier(r.Header))
    if err != nil {
        // Handle or log extraction error
    }

    span := tracer.StartSpan("post.filter", tracer.ChildOf(sctx))
    defer span.Finish()
}
```

## Trace Client & Agent Configuration

There are additional configurations possible for both the tracing client and Datadog Agent for context propagation with B3 Headers, as well as excluding specific resources from sending traces to Datadog in the event these traces are not wanted in metrics calculated, such as Health Checks.

### B3 Headers Extraction and Injection

The Datadog APM tracer supports [B3 headers extraction][8] and injection for distributed tracing.

Distributed headers injection and extraction is controlled by
configuring injection/extraction styles. Two styles are
supported: `Datadog` and `B3`.

Configure injection styles using the environment variable:
`DD_PROPAGATION_STYLE_INJECT=Datadog,B3`

Configure extraction styles using the environment variable:
`DD_PROPAGATION_STYLE_EXTRACT=Datadog,B3`

The values of these environment variables are comma separated lists of
header styles that are enabled for injection or extraction. By default,
the `Datadog` extraction style is enabled.

If multiple extraction styles are enabled, extraction attempts are made
in the order that those styles are specified. The first successfully
extracted value is used.

### Resource Filtering

Traces can be excluded based on their resource name, to remove synthetic traffic such as health checks from reporting traces to Datadog.  This and other security and fine-tuning configurations can be found on the [Security][9] page.

## OpenTracing

Datadog also supports the OpenTracing standard.  For more details and information, view the [OpenTracing API][10], or see the setup information below.

### Setup

Import the [`opentracer` package][11] to expose the Datadog tracer as an [OpenTracing][12] compatible tracer.

A basic usage example:

```go
package main

import (
    "github.com/opentracing/opentracing-go"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/opentracer"
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func main() {
    // Start the regular tracer and return it as an opentracing.Tracer interface. You
    // may use the same set of options as you normally would with the Datadog tracer.
    t := opentracer.New(tracer.WithServiceName("<SERVICE_NAME>"))

    // Stop it using the regular Stop call for the tracer package.
    defer tracer.Stop()

    // Set the global OpenTracing tracer.
    opentracing.SetGlobalTracer(t)

    // Use the OpenTracing API as usual.
}
```

**Note**: Using the [OpenTracing API][10] in parallel with the regular API or Datadog integrations is fully supported. Under the hood, all of them make use of the same tracer. See the [API documentation][11] for more examples and details.


[1]: /tracing/visualization/#span-tags
[2]: /tracing/visualization/#spans
[3]: /tracing/setup/go/#compatibility
[4]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer
[5]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#StartSpan
[6]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#StartSpanFromContext
[7]: /tracing/visualization/#trace
[8]: https://github.com/openzipkin/b3-propagation
[9]: /tracing/security

{{< /programming-lang >}}

{{< programming-lang lang="nodeJS" >}}

<div class="alert alert-info">
If you have not yet read the instructions for auto-instrumentation and setup, please start with the <a href="https://docs.datadoghq.com/tracing/setup/nodejs/">NodeJS Setup Instructions</a>.
</div>

If you aren’t using supported library instrumentation (see [library compatibility][1]), you may want to manually instrument your code.

You may also want to extend the functionality of the `dd-trace` library or gain finer control over instrumenting your application. Several techniques are provided by the library to accomplish this.

## Creating Spans

The `dd-trace` library creates [spans][2] automatically with `tracer.init()` for [many libraries and frameworks][1]. However, you may want to gain visibility into your own code and this is achieved using spans.

Within your web request (for example, `/make-sandwich`), you may perform several operations, like `getIngredients()` and `assembleSandwich()`, which are useful to measure.

{{< tabs >}}
{{% tab "Synchronous" %}}

Synchronous code can be traced with `tracer.trace()` which will automatically finish the span when its callback returns and capture any thrown error automatically.

```javascript
app.get('/make-sandwich', (req, res) => {
  const sandwich = tracer.trace('sandwich.make', () => {
    const ingredients = tracer.trace('get_ingredients', () => {
      return getIngredients()
    })

    return tracer.trace('assemble_sandwich', () => {
      assembleSandwich(ingredients)
    })
  })

  res.end(sandwich)
})
```

API details for `tracer.trace()` can be found [here][1].


[1]: https://datadoghq.dev/dd-trace-js/interfaces/tracer.html#trace
{{% /tab %}}

{{% tab "Promises" %}}

Promises can be traced with `tracer.trace()` which will automatically finish the span when the returned promise resolves and capture any rejection error automatically.

```javascript
app.get('/make-sandwich', (req, res) => {
  return tracer.trace('sandwich.make', () => {
    return tracer.trace('get_ingredients', () => getIngredients())
      .then(() => {
        return tracer.trace('assemble_sandwich', () => {
          return assembleSandwich(ingredients)
        })
      })
  }).then(sandwich => res.end(sandwich))
})
```

API details for `tracer.trace()` can be found [here][1].


[1]: https://datadoghq.dev/dd-trace-js/interfaces/tracer.html#trace
{{% /tab %}}

{{% tab "Async/await" %}}

Async/await can be traced with `tracer.trace()` which will automatically finish the span when the returned promise resolves and capture any rejection error automatically.

```javascript
app.get('/make-sandwich', async (req, res) => {
  const sandwich = await tracer.trace('sandwich.make', async () => {
    const ingredients = await tracer.trace('get_ingredients', () => {
      return getIngredients()
    })

    return tracer.trace('assemble_sandwich', () => {
      return assembleSandwich(ingredients)
    })
  })

  res.end(sandwich)
})
```

API details for `tracer.trace()` can be found [here][1].


[1]: https://datadoghq.dev/dd-trace-js/interfaces/tracer.html#trace
{{% /tab %}}

{{% tab "Wrapper" %}}

It's also possible to wrap an existing function without changing its code. This is useful to trace functions for which you don't control the code. This can be done with `tracer.wrap()` which takes the same arguments as `tracer.trace()` except its last argument which is the function to wrap instead of a callback.

```javascript
app.get('/make-sandwich', (req, res) => {
  getIngredients = tracer.wrap('get_ingredients', getIngredients)
  assembleSandwich = tracer.wrap('assemble_sandwich', assembleSandwich)

  const sandwich = tracer.trace('sandwich.make', () => {
    const ingredients = getIngredients()

    return assembleSandwich(ingredients))
  })

  res.end(sandwich)
})
```

API details for `tracer.trace()` can be found [here][1].


[1]: https://datadoghq.dev/dd-trace-js/interfaces/tracer.html#wrap
{{% /tab %}}

{{% tab "Manual" %}}

If the other methods are still not enough to satisfy your tracing needs, a manual API is provided which allows you to start and finish spans however you may require:

```javascript
app.get('/make-sandwich', (req, res) => {
  const sandwichSpan = tracer.startSpan('sandwich.make')

  const ingredientsSpan = tracer.startSpan('get_ingredients')
  const ingredients = getIngredients()
  ingredientsSpan.finish()

  const assembleSpan = tracer.startSpan('assemble_sandwich')
  const assemble = assembleSandwich()
  assembleSpan.finish()

  sandwichSpan.finish()

  res.end(sandwich)
})
```

API details for `tracer.startSpan()` can be found [here][1].


[1]: https://datadoghq.dev/dd-trace-js/interfaces/tracer.html#startspan
{{% /tab %}}
{{< /tabs >}}

## Accessing active spans

The built-in instrumentation and your own custom instrumentation will create spans around meaningful operations. You can access the active span in order to include meaningful data. It's also possible to set the active span on a new scope by using the `activate` method of the scope manager.

```javascript
tracer.trace('sandwich.make', () => {
  const span = tracer.scope().active() // the sandwich.make span
  const child = tracer.startSpan('get_ingredients')

  tracer.scope().activate(child, () => {
    const span = tracer.scope().active() // the get_ingredients span
  })
})
```

API details for `Scope` can be found [here][3].

## Adding tags

{{< tabs >}}
{{% tab "Locally" %}}

Tags can be added to a span using the `setTag` or `addTags` method on a span. Supported value types are string, number and object.

```javascript
// add a foo:bar tag
span.setTag('foo', 'bar')

// add a user_id:5 tag
span.setTag('user_id', 5)

// add a obj.first:foo and obj.second:bar tags
span.setTag('obj', { first: 'foo', second: 'bar' })

// add a foo:bar and baz:qux tags
span.addTags({
  foo: 'bar',
  baz: 'qux'
})
```

{{% /tab %}}

{{% tab "Globally" %}}

Tags can be added to every span by configuring them directly on the tracer. This can be done with the comma-separated `DD_TAGS` environment variable or with the `tags` option on the tracer initialization.

```javascript
// equivalent to DD_TAGS=foo:bar,baz:qux
tracer.init({
  tags: {
    foo: 'bar',
    baz: 'qux'
  }
})

// this span will have the above tags
const span = tracer.startSpan()
```

{{% /tab %}}

{{% tab "Component" %}}

Some of our integrations support span hooks that can be used to update the span right before it's finished. This is useful to modify or add tags to a span that is otherwise inaccessible from your code.

```javascript
// at the top of the entry point right after tracer.init()
tracer.use('express', {
  // hook will be executed right before the request span is finished
  hooks: {
    request: (span, req, res) => {
      span.setTag('customer.id', req.query.customer_id)
    }
  }
})
```

API details for individual plugins can be found [here][1].


[1]: https://datadoghq.dev/dd-trace-js/modules/plugins.html
{{% /tab %}}

{{% tab "Errors" %}}

Errors can be added to a span with the special `error` tag that supports error objects. This will split the error in 3 different tags: `error.type`, `error.msg` and `error.stack`.

```javascript
try {
  getIngredients()
} catch (e) {
  span.setTag('error', e)
}

```

When using `tracer.trace()` or `tracer.wrap()` this is done automatically when an error is thrown.

{{% /tab %}}
{{< /tabs >}}

## Request filtering

In most applications, some of the requests should not be instrumented. A common case would be health checks. These can be ignored by using the `blacklist` or `whitelist` option on the `http` plugin.

```javascript
// at the top of the entry point right after tracer.init()
tracer.use('http', {
  blacklist: ['/health', '/ping']
})
```

Additionally, traces can also be discarded at the Datadog Agent hecks from reporting traces to Datadog.  This and other security and fine-tuning Agent configurations can be found on the [Security][4] page.

[1]: /tracing/compatibility_requirements/nodejs/
[2]: /tracing/visualization/#spans
[3]: https://datadoghq.dev/dd-trace-js/interfaces/scope.html
[4]: /tracing/security

{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}

<div class="alert alert-info">
For instructions on how to setup the .NET Tracer and enable automatic instrumentation, see the <a href="https://docs.datadoghq.com/tracing/setup/dotnet/">.NET setup instructions</a>.
</div>

**Note:** When using both custom and automatic instrumentation, it is important to keep the MSI installer and NuGet package versions in sync.

This page details common use cases for adding and customizing observability with Datadog APM.

Add the `Datadog.Trace` [NuGet package][1] to your application. To create new spans, access the global tracer through the `Datadog.Trace.Tracer.Instance` property.

Custom instrumentation is supported on **.NET Framework 4.5+** for Windows and on **.NET Core 2.1, 3.0, and 3.1** for Windows and Linux.


## Add tags and spans

To customize your observability within Datadog, add custom [span tags][2] to your [spans][3].  Span tags are applied to your incoming traces, allowing you to correlate observed behavior with code-level information such as merchant tier, checkout amount, user ID, etc.


### Add custom span tags

Add custom tags to your spans corresponding to any dynamic value within your application code such as `customer.id`.

Add tags directly to a `Datadog.Trace.Span` object by calling `Span.SetTag()`. For example:

```csharp
public class ShoppingCartController : Controller
{
    private IShoppingCartRepository _shoppingCartRepository;

    [HttpGet]
    public IActionResult Index(int customerId)
    {
        // Access the active scope through
        // the global tracer (can return null)
        var scope = Tracer.Instance.ActiveScope;

        if (scope != null)
        {
            // Add a tag to the span for use in the Datadog web UI
            scope.Span.SetTag("customer.id", customerId.ToString());
        }

        var cart = _shoppingCartRepository.Get(customerId);

        return View(cart);
    }
}
```

**Note**: `Datadog.Trace.Tracer.Instance.ActiveScope` returns `null` if there is no active span.



### Adding tags globally to all spans

Use the `DD_TAGS` environment variable to set tags across all generated spans for an application. This can be useful for grouping stats for your applications, data centers, regions, etc. within the Datadog UI. For example:

```ini
DD_TAGS=datacenter:njc,key2:value2
```

### Set errors on a span

To recognize and mark errors that occur in your code, utilize the `Span.SetException(Exception)` method available to spans. The method marks the span as an error and adds [related span metadata][4] to provide insight into the exception.

```csharp
try
{
    // do work that can throw an exception
}
catch(Exception e)
{
    span.SetException(e);
}
```

This sets three tags on the span: `"error.msg":exception.Message`,  `"error.stack":exception.ToString()`, and `"error.type":exception.GetType().ToString()`.

### Manually creating a new span

Customize your observability by programmatically creating spans around any block of code. Spans created in this manner integrate with other tracing mechanisms automatically. In other words, if a trace has already started, the manual span has its caller as its parent span. Similarly, any traced methods called from the wrapped block of code have the manual span as its parent.

```csharp
using (var parentScope =
       Tracer.Instance.StartActive("manual.sortorders"))
{
    using (var childScope =
           Tracer.Instance.StartActive("manual.sortorders.child"))
    {
        // Nest using statements around the code to trace
        SortOrders();
    }
}
```
## Resource Filtering

Traces can be excluded based on their resource name, to remove synthetic traffic such as health checks from reporting traces to Datadog.  This and other security and fine-tuning configurations can be found on the [Security][5] page.

[1]: https://www.nuget.org/packages/Datadog.Trace
[2]: /tracing/visualization/#span-tags
[3]: /tracing/visualization/#spans
[4]: /tracing/visualization/trace/?tab=spantags#more-information
[5]: /tracing/security

{{< /programming-lang >}}

{{< programming-lang lang="PHP" >}}

<div class="alert alert-info">
If you have not yet read the instructions for auto-instrumentation and setup, start with the <a href="https://docs.datadoghq.com/tracing/setup/php/">PHP Setup Instructions</a>.
</div>

Even if Datadog does not officially support your web framework, you may not need to perform any manual instrumentation. See [automatic instrumentation][1] for more details.

## Creating spans

To manually instrument code to [trace][2] specific custom methods in your application or add tags to your spans, use `DDTrace\trace_function()` or `DDTrace\trace_method()`.

<div class="alert alert-info">If you are using a version of ddtrace prior to 0.47.0, use <code>dd_trace_function()</code> instead of <code>DDTrace\trace_function()</code> and <code>dd_trace_method()</code> instead of <code>DDTrace\trace_method()</code> or upgrade to the latest tracer version.</div>

### Trace a custom function or method

The `DDTrace\trace_function()` and `DDTrace\trace_method()` functions instrument (trace) specific function and method calls. These functions automatically handle the following tasks:

- Open a [span][3] before the code executes
- Set any errors from the instrumented call on the span
- Close the span when the instrumented call is done

Additional [tags][4] are set on the span from the closure (called a tracing closure).

For example, the following snippet traces the `CustomDriver::doWork()` method and adds custom tags. Exceptions are automatically tracked on the span.

```php
<?php
// For ddtrace < v0.47.0 use dd_trace_method()
\DDTrace\trace_method(
    'CustomDriver',
    'doWork',
    function (\DDTrace\SpanData $span, array $args, $retval, $exception) {
        // This closure runs after the instrumented call
        // Span was automatically created before the instrumented call

        // SpanData::$name defaults to 'ClassName.methodName' if not set (>= v0.47.0)
        $span->name = 'CustomDriver.doWork';
        // SpanData::$resource defaults to SpanData::$name if not set (>= v0.47.0)
        $span->resource = 'CustomDriver.doWork';
        $span->service = 'php';

        $span->meta = [
            // If an exception was thrown from the instrumented call, return value is null
            'doWork.size' => $exception ? 0 : count($retval),
            // Access object members via $this
            'doWork.thing' => $this->workToDo,
        ];

        // The span will automatically close
    }
);

// For functions
// For ddtrace < v0.47.0 use dd_trace_function()
\DDTrace\trace_function(
    'doCustomDriverWork',
    function (\DDTrace\SpanData $span, array $args, $retval, $exception) {
        // Same as DDTrace\trace_method tracing closure
    }
);
?>
```

{{< tabs >}}
{{% tab "Tracing function calls" %}}

Function calls are instrumented with `DDTrace\trace_function()` and the tracing closure is executed after the instrumented call is made.

```php
<?php

use DDTrace\SpanData;

function addNums($a, $b) {
    $sum = $a + $b;
    printf("%d + %d = %d\n", $a, $b, $sum);
    return $sum;
}

\DDTrace\trace_function(
    'addNums',
    function(SpanData $span, $args, $retval) {
        echo "Traced" . PHP_EOL;
    }
);

var_dump(addNums(2, 8));
// 2 + 8 = 10
// Traced
// int(10)
```

{{% /tab %}}
{{% tab "Tracing method calls" %}}

Methods are instrumented with `DDTrace\trace_method()` which provides the same functionality as `DDTrace\trace_function()`. One key difference is that the tracing closure is bound to the instrumented class which exposes an instance of the instrumented class via `$this`.

```php
<?php

use DDTrace\SpanData;

class Calc {
    public $foo = 'bar';
    public function addNums($a, $b) {
        $sum = $a + $b;
        printf("%d + %d = %d\n", $a, $b, $sum);
        return $sum;
    }
}

\DDTrace\trace_method(
    'Calc', 'addNums',
    function(SpanData $span, $args, $retval) {
        echo '$this->foo: ' . $this->foo . PHP_EOL;
    }
);

$calc = new Calc();
var_dump($calc->addNums(2, 8));
// 2 + 8 = 10
// $this->foo: bar
// int(10)
```
{{% /tab %}}
{{< /tabs >}}

## Accessing active spans

The built-in instrumentation and your own custom instrumentation will create spans around meaningful operations. You can access the active span in order to include meaningful data.

{{< tabs >}}
{{% tab "Current span" %}}

```php
<?php
$span = \DDTrace\GlobalTracer::get()->getActiveSpan();
if ($span) {
    $span->setTag('customer.id', get_customer_id());
}
?>
```

{{% /tab %}}
{{% tab "Root span" %}}

The root span of the trace can be accessed later directly from the global tracer via `Tracer::getRootScope()`. This is useful in contexts where the metadata to be added to the root span does not exist in early script execution.

```php
<?php
$scope = \DDTrace\GlobalTracer::get()->getRootScope();
if ($scope) {
    $scope->getSpan()->setTag(\DDTrace\Tag::HTTP_STATUS_CODE, 200);
}
?>
```

{{% /tab %}}
{{< /tabs >}}

## Adding Tags

{{< tabs >}}
{{% tab "Locally" %}}

Add tags to a span via the `DDTrace\SpanData::$meta` array.

```php
<?php

\DDTrace\trace_function(
    'myRandFunc',
    function(\DDTrace\SpanData $span, array $args, $retval) {
        // ...
        $span->meta = [
            'rand.range' => $args[0] . ' - ' . $args[1],
            'rand.value' => $retval,
        ];
    }
);
```

{{% /tab %}}
{{% tab "Globally" %}}

Set the `DD_TAGS` environment variable (version 0.47.0+) to automatically apply tags to every span that is created. This was previously `DD_TRACE_GLOBAL_TAGS`. For more information about configuring the older version, see [environment variable configuration][1].

```
DD_TAGS=key1:value1,<TAG_KEY>:<TAG_VALUE>
```

[1]: /tracing/setup/php/#environment-variable-configuration
{{% /tab %}}
{{% tab "Errors" %}}

Thrown exceptions are automatically attached to the active span.

```php
<?php

function doRiskyThing() {
    throw new Exception('Oops!');
}

\DDTrace\trace_function(
    'doRiskyThing',
    function() {
        // Span will be flagged as erroneous and have
        // the stack trace and exception message attached as tags
    }
);
```

Set the `error.msg` tag to manually flag a span as erroneous.

```php
<?php

function doRiskyThing() {
    return SOME_ERROR_CODE;
}

\DDTrace\trace_function(
    'doRiskyThing',
    function(\DDTrace\SpanData $span, $args, $retval) {
        if ($retval === SOME_ERROR_CODE) {
            $span->meta = [
                'error.msg' => 'Foo error',
                // Optional:
                'error.type' => 'CustomError',
                'error.stack' => my_get_backtrace(),
            ];
        }
    }
);
```

{{% /tab %}}
{{< /tabs >}}

## Resource Filtering

Traces can be excluded based on their resource name, to remove synthetic traffic such as health checks from reporting traces to Datadog.  This and other security and fine-tuning configurations can be found on the [Security][5] page.

## API Reference

### Parameters of the tracing closure

The tracing closure provided to `DDTrace\trace_method()` and `DDTrace\trace_function()` has four parameters:

```php
function(
    DDTrace\SpanData $span,
    array $args,
    mixed $retval,
    Exception|null $exception
);
```

1. **$span**: An instance of `DDTrace\SpanData` to write to the span properties
2. **$args**: An `array` of arguments from the instrumented call
3. **$retval**: The return value of the instrumented call
4. **$exception**: An instance of the exception that was thrown in the instrumented call or `null` if no exception was thrown

#### Parameter 1: `DDTrace\SpanData $span`

The `DDTrace\SpanData` instance contains [the same span information that the Agent expects][7]. A few exceptions are `trace_id`, `span_id`, `parent_id`, `start`, and `duration` which are set at the C level and not exposed to userland via `DDTrace\SpanData`. Exceptions from the instrumented call are automatically attached to the span and the `error` field is managed automatically.

| Property | Type | Description |
| --- | --- | --- |
| `SpanData::$name` | `string` | The span name _(Optional as of ddtrace v0.47.0; defaults to 'ClassName.methodName' if not set)_ |
| `SpanData::$resource` | `string` | The resource you are tracing _(Optional as of ddtrace v0.47.0; defaults to `SpanData::$name` if not set)_ |
| `SpanData::$service` | `string` | The service you are tracing |
| `SpanData::$type` | `string` | The type of request which can be set to: **web**, **db**, **cache**, or **custom** _(Optional)_ |
| `SpanData::$meta` | `string[]` | An array of key-value span metadata; keys and values must be strings _(Optional)_ |
| `SpanData::$metrics` | `float[]` | An array of key-value span metrics; keys must be strings and values must be floats _(Optional)_ |

```php
<?php

use DDTrace\SpanData;

function myRandFunc($min, $max) {
    return mt_rand($min, $max);
}

\DDTrace\trace_function(
    'myRandFunc',
    function(SpanData $span, $args, $retval) {
        // SpanData::$name defaults to 'functionName' if not set (>= v0.47.0)
        $span->name = 'myRandFunc';
        // SpanData::$resource defaults to SpanData::$name if not set (>= v0.47.0)
        $span->resource = 'myRandFunc';
        $span->service = 'php';
        // The following are optional
        $span->type = 'web';
        $span->meta = [
            'rand.range' => $args[0] . ' - ' . $args[1],
            'rand.value' => $retval,
        ];
        $span->metrics = [
            '_sampling_priority_v1' => 0.9,
        ];
    }
);
```

#### Parameter 2: `array $args`

The second parameter to the tracing closure is an array of arguments from the instrumented call. It functions similarly to [`func_get_args()`][8].

By default the tracing closure is executed _after_ the instrumented call which means any arguments passed by reference could be a different value when they reach the tracing closure.

```php
<?php

use DDTrace\SpanData;

function argsByRef(&$a) {
    return ++$a;
}

\DDTrace\trace_function(
    'argsByRef',
    function(SpanData $span, $args) {
        var_dump($args);
    }
);

$foo = 10;
var_dump(argsByRef($foo));
// array(1) {
//   [0]=>
//   int(11)
// }
// int(11)
```

On PHP 7, the tracing closure has access to the same arguments passed to the instrumented call. If the instrumented call mutates an argument, including arguments passed by value, the `posthook` tracing closure will receive the mutated argument.

This is the expected behavior of arguments in PHP 7 as illustrated in the following example:

```php
<?php

function foo($a) {
    var_dump(func_get_args());
    $a = 'Dogs';
    var_dump(func_get_args());
}

foo('Cats');

/*
array(1) {
  [0]=>
  string(4) "Cats"
}
array(1) {
  [0]=>
  string(4) "Dogs"
}
*/
```

The following example demonstrates this effect on `posthook` tracing closures.

```php
<?php

function foo($a) {
    $a = 'Dogs';
}

\DDTrace\trace_function('foo', function ($span, array $args) {
    var_dump($args[0]);
});

foo('Cats');

// string(4) "Dogs"
```

If an argument needs to be accessed before mutation, the tracing closure [can be marked as `prehook`](#running-the-tracing-closure-before-the-instrumented-call) to access the arguments before the instrumented call.

#### Parameter 3: `mixed $retval`

The third parameter of the tracing closure is the return value of the instrumented call. Functions or methods that declare a `void` return type or ones that do not return a value will have a value of `null`.

```php
<?php

use DDTrace\SpanData;

function message(): void {
    echo "Hello!\n";
}

\DDTrace\trace_function(
    'message',
    function(SpanData $span, $args, $retval) {
        echo "Traced\n";
        var_dump($retval);
    }
);

var_dump(message());
// Hello!
// Traced
// NULL
// NULL
```

#### Parameter 4: `Exception|null $exception`

The final parameter of the tracing closure is an instance of the exception that was thrown in the instrumented call or `null` if no exception was thrown.

```php
<?php

use DDTrace\SpanData;

function mightThrowException() {
  throw new Exception('Oops!');
  return 'Hello';
}

\DDTrace\trace_function(
  'mightThrowException',
  function(SpanData $span, $args, $retval, $ex) {
    if ($ex) {
      echo 'Exception from instrumented call: ';
      echo $ex->getMessage() . PHP_EOL;
    }
  }
);

mightThrowException();

/*
Exception from instrumented call: Oops!
NULL
PHP Fatal error:  Uncaught Exception: Oops! ...
*/
```

As exceptions are attached to spans automatically, there is no need to manually set `SpanData::$meta['error.*']` metadata. But having access to the exception instance enables you to check for a thrown exception before accessing the return value.

```php
<?php

use DDTrace\SpanData;

\DDTrace\trace_function(
    'mightThrowException',
    function(SpanData $span, $args, $retval, $ex) {
        if (null === $ex) {
            // Do something with $retval
        }
    }
);
```

## Advanced Configurations

### Tracing internal functions and methods

An optimization was added starting in **0.46.0** to ignore all internal functions and methods for instrumentation. Internal functions and methods can still be instrumented by setting the `DD_TRACE_TRACED_INTERNAL_FUNCTIONS` environment variable. This takes a CSV of functions or methods that will be instrumented e.g. `DD_TRACE_TRACED_INTERNAL_FUNCTIONS=array_sum,mt_rand,DateTime::add`. Once a function or method has been added to the list, it can be instrumented using `DDTrace\trace_function()` and `DDTrace\trace_method()` respectively.

### Running the tracing closure before the instrumented call

By default, tracing closures are treated as `posthook` closures meaning they will be executed _after_ the instrumented call. Some cases require running the tracing closure _before_ the instrumented call. In that case, tracing closures are marked as `prehook` using an associative configuration array.

```php
\DDTrace\trace_function('foo', [
    'prehook' => function (\DDTrace\SpanData $span, array $args) {
        // This tracing closure will run before the instrumented call
    }
]);
```

### Debugging sandboxed errors

Tracing closures are "sandboxed" in that exceptions thrown and errors raised inside of them do no impact the instrumented call.

```php
<?php

function my_func() {
  echo 'Hello!' . PHP_EOL;
}

\DDTrace\trace_function(
  'my_func',
  function() {
    throw new \Exception('Oops!');
  }
);

my_func();
echo 'Done.' . PHP_EOL;

/*
Hello!
Done.
*/
```

To debug, set the environment variable `DD_TRACE_DEBUG=1` to expose any exceptions or errors that may have occurred in a tracing closure.

```php
/*
Hello!
Exception thrown in tracing closure for my_func: Oops!
Done.
*/
```

### Zend Framework 1 manual instrumentation

Zend Framework 1 is automatically instrumented by default, so you are not required to modify your ZF1 project. However, if automatic instrumentation is disabled, enable the tracer manually.

First, [download the latest source code from the releases page][9]. Extract the zip file and copy the `src/DDTrace` folder to your application's `/library` folder. Then add the following to your `application/configs/application.ini` file:

```ini
autoloaderNamespaces[] = "DDTrace_"
pluginPaths.DDTrace = APPLICATION_PATH "/../library/DDTrace/Integrations/ZendFramework/V1"
resources.ddtrace = true
```

### PHP code optimization

Prior to PHP 7, some frameworks provided ways to compile PHP classes—e.g., through the Laravel's `php artisan optimize` command.

While this [has been deprecated][10] if you are using PHP 7.x, you still may use this caching mechanism in your app prior to version 7.x. In this case, Datadog suggests you use the [OpenTracing](#opentracing) API instead of adding `datadog/dd-trace` to your Composer file.

## Legacy API upgrade guide

Datadog recommends that you update custom instrumentations implemented using the legacy `dd_trace()` API.

There is an important paradigm distinction to understand between the legacy API and the "sandbox" API. The legacy API forwards the instrumented call from inside the tracing closure using `dd_trace_forward_call()`.

{{< img src="tracing/manual_instrumentation/php_legacy_api.png" alt="Legacy API" style="width:100%;">}}

The sandbox API runs the tracing closure after the instrumented call so there is no need to forward the original call along with `dd_trace_forward_call()`.

{{< img src="tracing/manual_instrumentation/php_sandbox_api.png" alt="Sandbox API" style="width:100%;">}}

Contrary to the legacy API, the sandbox API handles the following tasks automatically:

1. Creating the span
2. Forwarding the original call
3. Attaching exceptions to the span

### Upgrading example

The sandbox API reduces the amount of boilerplate required to instrument a call. Below is a side-by-side comparison of a full legacy API example and the sandbox API equivalent.

```php
# Legacy API
dd_trace('CustomDriver', 'doWork', function (...$args) {
    // Start a new span
    $scope = \DDTrace\GlobalTracer::get()->startActiveSpan('CustomDriver.doWork');
    $span = $scope->getSpan();

    // Access object members via $this
    $span->setTag(\DDTrace\Tag::RESOURCE_NAME, $this->workToDo);

    try {
        // Execute the original method. Note: dd_trace_forward_call() - handles any parameters automatically
        $result = dd_trace_forward_call();
        // Set a tag based on the return value
        $span->setTag('doWork.size', count($result));
        return $result;
    } catch (Exception $e) {
        // Inform the tracer that there was an exception thrown
        $span->setError($e);
        // Bubble up the exception
        throw $e;
    } finally {
        // Close the span
        $span->finish();
    }
});

# Sandbox API
\DDTrace\trace_method(
    'CustomDriver',
    'doWork',
    function (\DDTrace\SpanData $span, array $args, $retval, $exception) {
        // This closure runs after the instrumented call
        // Span was automatically created before the instrumented call

        // SpanData::$name defaults to 'ClassName.methodName' if not set (>= v0.47.0)
        $span->name = 'CustomDriver.doWork';
        // SpanData::$resource defaults to SpanData::$name if not set (>= v0.47.0)
        $span->resource = 'CustomDriver.doWork';
        $span->service = 'php';

        $span->meta = [
            // If an exception was thrown from the instrumented call, return value is null
            'doWork.size' => $exception ? 0 : count($retval),
            // Access object members via $this
            'doWork.thing' => $this->workToDo,
        ];

        // No need to explicitly forward the call with dd_trace_forward_call()
        // No need to explicitly catch/attach exceptions
        // The span will automatically close
    }
);
```


[1]: /tracing/setup/php/#automatic-instrumentation
[2]: /tracing/visualization/#trace
[3]: /tracing/visualization/#spans
[4]: /tracing/visualization/#span-tags
[5]: /tracing/security
[6]: https://github.com/opentracing/opentracing-php
[7]: /api/v1/tracing/#send-traces
[8]: https://www.php.net/func_get_args
[9]: https://github.com/DataDog/dd-trace-php/releases/latest
[10]: https://laravel-news.com/laravel-5-6-removes-artisan-optimize


{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

<br>

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /tracing/guide/add_span_md_and_graph_it/
[2]: /tracing/visualization
