---
title: Manual Installation
kind: Documentation
aliases:
  - /tracing/setup/php/manual-installation
  - /agent/apm/php/manual-installation
---

Manual instrumentation allows programmatic creation of traces to send to Datadog. This is useful for tracing in-house code not captured by automatic instrumentation. Before instrumenting your application, review Datadog’s APM Terminology and familiarize yourself with the core concepts of Datadog APM.

{{< tabs >}}
{{% tab "Java" %}}

If you aren't using a [supported framework instrumentation][1], or you would like additional depth in your application’s traces, you may want to manually instrument your code.

Do this either using the Trace annotation for simple method call tracing, or with the [OpenTracing API][2] for complex tracing.

Datadog's Trace annotation is provided by the [dd-trace-api dependency][3].

**Example Usage**

```java
import datadog.trace.api.Trace;

public class MyClass {
  @Trace
  public static void myMethod() {
    // your method implementation here
  }
}
```


[1]: /tracing/languages/java/#compatibility
[2]: #opentracing
[3]: https://mvnrepository.com/artifact/com.datadoghq/dd-trace-api
{{% /tab %}}
{{% tab "Python" %}}

If you aren't using supported library instrumentation (see [library compatibility][1]), you may want to manually instrument your code.

You may also want to extend the functionality of the `ddtrace` library or gain finer control over instrumenting your application. Several techniques are provided by the library to accomplish this.

The following examples use the global tracer object which can be imported via:

```python
  from ddtrace import tracer
```

**Decorator**

`ddtrace` provides a decorator that can be used to trace a particular method in your application:

```python
  @tracer.wrap()
  def business_logic():
    """A method that would be of interest to trace."""
    # ...
    # ...
```

API details for the decorator can be found at [`ddtrace.Tracer.wrap()`][2]

**Context Manager**

To trace an arbitrary block of code, you can use the [`ddtrace.Span`][3] context manager:

```python
  # trace some interesting operation
  with tracer.trace('interesting.operations'):
    # do some interesting operation(s)
    # ...
    # ...
```

Further API details can be found at [`ddtrace.Tracer()`][4]

**Using the API**

If the above methods are still not enough to satisfy your tracing needs, a manual API is provided which allows you to start and finish spans however you may require:

```python
  span = tracer.trace('operations.of.interest')

  # do some operation(s) of interest in between

  # NOTE: make sure to call span.finish() or the entire trace is not sent
  # to Datadog
  span.finish()
```

API details of the decorator can be found here:

- [`ddtrace.Tracer.trace`][5]
- [`ddtrace.Span.finish`][6]



[1]: /tracing/languages/python/#compatibility
[2]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#ddtrace.Tracer.wrap
[3]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#ddtrace.Span
[4]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#tracer
[5]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#ddtrace.Tracer.trace
[6]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#ddtrace.Span.finish
{{% /tab %}}
{{% tab "Ruby" %}}

If you aren't using supported library instrumentation (see [library compatibility][1]), you may want to to manually instrument your code. Adding tracing to your code is easy using the `Datadog.tracer.trace` method, which you can wrap around any Ruby code.

**Example Usage**

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

For more details about manual instrumentation, check out the [API documentation][2].


[1]: /tracing/languages/ruby/#compatibility
[2]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#manual-instrumentation
{{% /tab %}}
{{% tab "Go" %}}

If you aren't using supported library instrumentation (see [Library compatibility][1]), you may want to to manually instrument your code.

To make use of manual instrumentation, use the `tracer` package which is documented on Datadog's [godoc page][2].

**Example Usage**

```go
package main

import "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"

func main() {
    // Start the tracer with zero or more options.
    tracer.Start(tracer.WithServiceName("<SERVICE_NAME>"))
    defer tracer.Stop()

    // Create a span for a web request at the /posts URL.
    span := tracer.StartSpan("web.request", tracer.ResourceName("/posts"))
    defer span.Finish()

    // Set metadata
    span.SetTag("<TAG_KEY>", "<TAG_VALUE>")
}
```


[1]: /tracing/languages/go/#compatibility
[2]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer
{{% /tab %}}
{{% tab "Node.js" %}}

If you aren’t using supported library instrumentation (see [Library compatibility][1]), you may want to manually instrument your code.

The following example initializes a Datadog Tracer and creates a span called `web.request`:

```javascript
const tracer = require('dd-trace').init()
const span = tracer.startSpan('web.request')

span.setTag('http.url', '/login')
span.finish()
```

For more information on manual instrumentation, see the [API documentation][2].


[1]: /tracing/languages/nodejs/#compatibility
[2]: https://datadog.github.io/dd-trace-js/#manual-instrumentation
{{% /tab %}}
{{% tab ".NET" %}}

If you are not using libraries supported by automatic instrumentation (see [Integrations][1]), you can instrument your code manually.

The following example uses the global `Tracer` and creates a custom span to trace a web request:

```csharp
using Datadog.Trace;

using(var scope = Tracer.Instance.StartActive("web.request"))
{
    var span = scope.Span;
    span.Type = SpanTypes.Web;
    span.ResourceName = request.Url;
    span.SetTag(Tags.HttpMethod, request.Method);

    // do some work...
}
```


[1]: /tracing/languages/dotnet/#integrations
{{% /tab %}}

{{% tab "PHP" %}}

Even if Datdog does not officially support your web framework, you may not need to perform any manual instrumentation. See [automatic instrumentation][1] for more details.

If you really need manual instrumentation, e.g., because you want to trace specific custom methods in your application, first install the PHP tracer dependency with Composer:

```bash
$ composer require datadog/dd-trace
```

**Trace a custom function or method**

The `dd_trace()` function hooks into existing functions and methods to:

* Open a span before the code executes
* Set additional tags or errors on the span
* Close the span when it is done
* Modify the arguments or the return value

For example, the following snippet traces the `CustomDriver::doWork()` method, adds custom tags, reports any exceptions as errors on the span, and then re-throws the exceptions.

```php
dd_trace("CustomDriver", "doWork", function (...$args) {
    // Start a new span
    $scope = GlobalTracer::get()->startActiveSpan('CustomDriver.doWork');
    $span = $scope->getSpan();

    // Access object members via $this
    $span->setTag(Tags\RESOURCE_NAME, $this->workToDo);

    try {
        // Execute the original method
        $result = $this->doWork(...$args);
        // Set a tag based on the return value
        $span->setTag('doWork.size', count($result));
        return $result;
    } catch (Exception $e) {
        // Inform the tracer that there was an exception thrown
        $span->setError($e);
        // Bubble up the exception
        throw $e
    } finally {
        // Close the span
        $span->finish();
    }
});
```

The root span an be accessed later on directly from the global tracer via `Tracer::getRootScope()`. This is useful in contexts where the metadata to be added to the root span does not exist in early script execution.

```php
$rootSpan = \DDTrace\GlobalTracer::get()
    ->getRootScope()
    ->getSpan();
$rootSpan->setTag(\DDTrace\Tag::HTTP_STATUS_CODE, 200);
```

**Zend Framework 1 manual instrumentation**

Zend Framework 1 is automatically instrumented by default, so you are not required to modify your ZF1 project. However, if automatic instrumentation is disabled, enable the tracer manually.

First, [download the latest source code from the releases page][2]. Extract the zip file and copy the `src/DDTrace` folder to your application's `/library` folder. Then add the following to your `application/configs/application.ini` file:

```ini
autoloaderNamespaces[] = "DDTrace_"
pluginPaths.DDTrace = APPLICATION_PATH "/../library/DDTrace/Integrations/ZendFramework/V1"
resources.ddtrace = true
```

**Manual instrumentation and php code optimization**

Prior to PHP 7, some frameworks provided ways to compile PHP classes—e.g., through the Laravel's `php artisan optimize` command.

While this [has been deprecated][3] if you are using PHP 7.x, you still may use this caching mechanism in your app prior to version 7.x. In this case, Datadog suggests you use the [OpenTracing][4] API instead of adding `datadog/dd-trace` to your Composer file.




[1]: /tracing/languages/php/#automatic-instrumentation
[2]: https://github.com/DataDog/dd-trace-php/releases/latest
[3]: https://laravel-news.com/laravel-5-6-removes-artisan-optimize
[4]: #opentracing
{{% /tab %}}
{{% tab "C++" %}}

To manually instrument your code, install the tracer as in the setup examples, and then use the tracer object to create spans.

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

{{% /tab %}}
{{< /tabs >}}
