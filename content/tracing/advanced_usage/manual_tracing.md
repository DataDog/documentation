---
title: Manual Tracing
kind: documentation
---

Manual Tracing allows programmatic creation of traces to send to Datadog. This is useful for tracing in-house code not captured by automatic instrumentation. Before instrumenting your application, review Datadog’s [APM Terminology][apm terminology] and familiarize yourself with the core concepts of Datadog APM. 

{{< tabs >}}
{{% tab "Java" %}}
If you aren't using a [supported framework instrumentation][java framework], or you would like additional depth in your application’s traces, you may want to to manually instrument your code.

Do this either using the Trace annotation for simple method call tracing or with the [OpenTracing API][opentracing] for complex tracing.

Datadog's Trace annotation is provided by the [dd-trace-api dependency][trace api maven docs].

Example Trace usage:

```java
import datadog.trace.api.Trace;

public class MyClass {
  @Trace
  public static void myMethod() {
    // your method implementation here
  }
}
```

[opentracing]: /tracing/advanced_usage/open_tracing
[java framework]: /tracing/setup/java/#integrations
[apm terminology]: /tracing/visualization/services_list/
[trace api maven docs]: https://mvnrepository.com/artifact/com.datadoghq/dd-trace-api

{{% /tab %}}
{{% tab "Python" %}}

If you would like to extend the functionality of the ``ddtrace`` library or gain
finer control over instrumenting your application, several techniques are
provided by the library.

The following examples use the global tracer object which can be imported via:

```python
  from ddtrace import tracer
```

**Decorator**

``ddtrace`` provides a decorator that can be used to trace a particular method
in your application:

```python
  @tracer.wrap()
  def business_logic():
    """A method that would be of interest to trace."""
    # ...
    # ...
```

API details for the decorator can be found at [`ddtrace.Tracer.wrap()`][py_wrap]

**Context Manager**

To trace an arbitrary block of code, you can use the [`ddtrace.Span`][py_span]
context manager:

```python
  # trace some interesting operation
  with tracer.trace('interesting.operations'):
    # do some interesting operation(s)
    # ...
    # ...
```

Further API details can be found at [`ddtrace.Tracer()`][py_tracer]

**Using the API**

If the above methods are still not enough to satisfy your tracing needs, a
manual API is provided which will allow you to start and finish spans however
you may require:

```python
  span = tracer.trace('operations.of.interest')

  # do some operation(s) of interest in between

  # NOTE: make sure to call span.finish() or the entire trace will not be sent
  # to Datadog
  span.finish()
```

API details of the decorator can be found here:

- [`ddtrace.Tracer.trace`][py_trace]
- [`ddtrace.Span.finish`][py_span_fin]


[py_wrap]:     http://pypi.datadoghq.com/trace/docs/advanced_usage.html#ddtrace.Tracer.wrap
[py_tracer]:   http://pypi.datadoghq.com/trace/docs/advanced_usage.html#tracer
[py_trace]:    http://pypi.datadoghq.com/trace/docs/advanced_usage.html#ddtrace.Tracer.trace
[py_span]:     http://pypi.datadoghq.com/trace/docs/advanced_usage.html#ddtrace.Span
[py_span_fin]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#ddtrace.Span.finish

{{% /tab %}}
{{% tab "Ruby" %}}
If you aren't using supported library instrumentation (see [Library compatibility][ruby lib compatibility], you may want to to manually instrument your code. Adding tracing to your code is easy using the `Datadog.tracer.trace` method, which you can wrap around any Ruby code.

```ruby
# An example of a Sinatra endpoint,
# with Datadog tracing around the request,
# database query, and rendering steps.
get '/posts' do
  Datadog.tracer.trace('web.request', service: 'my-blog', resource: 'GET /posts') do |span|
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

For more details about manual instrumentation, check out the [API documentation][ruby api doc].

[ruby api doc]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#manual-instrumentation
[ruby lib compatibility]: /tracing/setup/ruby/#library-compatibility

{{% /tab %}}
{{% tab "Go" %}}
To make use of manual instrumentation, use the `tracer` package which is documented on our [godoc page][tracer godoc]. One simple example would be:

```go
package main

import "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"

func main() {
    // Start the tracer with zero or more options.
    tracer.Start(tracer.WithServiceName("my-service"))
    defer tracer.Stop()

    // Create a span for a web request at the /posts URL.
    span := tracer.StartSpan("web.request", tracer.ResourceName("/posts"))
    defer span.Finish()

    // Set metadata
    span.SetTag("my_tag", "my_value")
}
```

[tracer godoc]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer

{{% /tab %}}
{{% tab "Node.js" %}}
If you aren’t using supported library instrumentation (see [Compatibility][nodejs compatibility]), you may want to manually instrument your code.

The following example initializes a Datadog Tracer and creates a Span called `web.request`:

```javascript
const tracer = require('dd-trace').init()
const span = tracer.startSpan('web.request')

span.setTag('http.url', '/login')
span.finish()
```

For more information on manual instrumentation, check out the [API documentation][nodejs api doc].

[nodejs api doc]: https://datadog.github.io/dd-trace-js/#manual-instrumentation
[nodejs compatibility]: /tracing/setup/nodejs/#compatibility

{{% /tab %}}
{{< /tabs >}}
