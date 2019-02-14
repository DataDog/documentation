---
title: Custom Tagging
kind: documentation
---

Custom tagging allows adding tags in the form of key-value pairs to [a specific spans](#adding-tags-to-a-span) or [globally to all spans](#adding-tags-globally-to-all-spans) produced by your application. [Read more about tagging][1].

## Adding tags globally to all spans

{{< tabs >}}
{{% tab "Java" %}}

{{% /tab %}}
{{% tab "Python" %}}

Add tags to all spans by configuring the tracer with the `tracer.set_tags` method:

```python
from ddtrace import tracer

tracer.set_tags({ 'env': 'prod' })
```

{{% /tab %}}
{{% tab "Ruby" %}}

Add tags to all spans by configuring the tracer with the `tags` option:

```ruby
Datadog.configure do |c|
  c.tracer tags: { 'env' => 'prod' }
end
```

See the [API documentation][1] for more details.

[1]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#environment-and-tags
{{% /tab %}}
{{% tab "Go" %}}

Add tags to all spans by configuring the tracer with the `tags` option:

```go
package main

import "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"

func main() {
    tracer.Start(
        tracer.WithGlobalTag("datacenter", "us-1"),
        tracer.WithGlobalTag("env", "prod"),
    )
    defer tracer.Stop()
}
```

{{% /tab %}}
{{% tab "Node.js" %}}


{{% /tab %}}
{{% tab ".NET" %}}

**Note**: This feature is not supported with automatic instrumentation.

Manual instrumentations of the tracer can set an associative array of global tags via the `global_tags` configuration key.

```php
$config = [
    'global_tags' => [
        '<TAG_KEY>' => '<TAG_VALUE>',
    ]
];
$tracer = new \DDTrace\Tracer(null, null, $config);
\DDTrace\GlobalTracer::set($tracer);
```

{{% /tab %}}
{{% tab "C++" %}}

{{% /tab %}}
{{< /tabs >}}

##  Adding tags to a span

{{< tabs >}}
{{% tab "Java" %}}
Tags are key-value pairs attached to spans. All tags share a single namespace.

The Datadog UI uses specific tags to set UI properties, such as an application's service name. A full list of these tags can be found in the [Datadog][1] and [OpenTracing][2] APIs.

**Custom Tags**:

Custom tags are set using the OpenTracing API.

Custom tags may be set for auto-instrumentation by grabbing the active span out of the global tracer.

```java
import io.opentracing.Tracer;
import io.opentracing.util.GlobalTracer;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet
class ServletImpl extends AbstractHttpServlet {
  @Override
  void doGet(HttpServletRequest req, HttpServletResponse resp) {
    final Span span = GlobalTracer.get().activeSpan();
    if (span != null) {
      span.setTag("customer.id", 12345);
      span.setTag("http.url", "/login");
    }
    // servlet impl
  }
}
```


[1]: https://github.com/DataDog/dd-trace-java/blob/master/dd-trace-api/src/main/java/datadog/trace/api/DDTags.java
[2]: https://github.com/opentracing/opentracing-java/blob/master/opentracing-api/src/main/java/io/opentracing/tag/Tags.java
{{% /tab %}}
{{% tab "Python" %}}

Add tags directly to a span by calling `set_tag`. For example, with the following route handler:

```python
from ddtrace import tracer

@app.route('/customer/<int:customer_id>')
def handle_customer(customer_id):
  with tracer.trace('web.request') as span:
    span.set_tag('customer.id', customer_id)
```

**Adding tags to a current active span**

The current span can be retrieved from the context in order to set tags. This way, if a span was started by the instrumentation, you can retrieve the span and add custom tags. Note that if a span does not exist, `None` is returned:

```python
from ddtrace import tracer

@app.route('/customer/<int:customer_id>')
@tracer.wrap()
def handle_customer(customer_id):
  # get the active span in the context, put there by tracer.wrap()
  current_span = tracer.current_span()
  if current_span:
    current_span.set_tag('customer.id', customer_id)
```

{{% /tab %}}
{{% tab "Ruby" %}}

Add tags directly to `Datadog::Span` objects by calling `#set_tag`:

```ruby
# An example of a Sinatra endpoint,
# with Datadog tracing around the request.
get '/posts' do
  Datadog.tracer.trace('web.request') do |span|
    span.set_tag('http.url', request.path)
  end
end
```

**Adding tags to a current active span**

Access the current active span from any method within your code. Note, however, that if the method is called and there is no span currently active, `active_span` is nil.

```ruby
# e.g. adding tag to active span

current_span = Datadog.tracer.active_span
current_span.set_tag('<TAG_KEY>', '<TAG_VALUE>') unless current_span.nil?
```

{{% /tab %}}
{{% tab "Go" %}}

Add tags directly to a `Span` interface by calling `SetTag`:

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
}

func main() {
    tracer.Start(tracer.WithServiceName("<SERVICE_NAME>"))
    defer tracer.Stop()
    http.HandleFunc("/posts", handler)
    log.Fatal(http.ListenAndServe(":8080", nil))
}
```

**Adding tags to a Span attached to a Context**

Our integrations make use of the `Context` type to propagate the current active span. If you want to add a tag to a span attached to a `Context` via automatic instrumentation, call the `SpanFromContext` function:

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

{{% /tab %}}
{{% tab "Node.js" %}}

Add tags directly to span objects by calling `setTag` or `addTags`:

```javascript
// An example of an Express endpoint,
// with Datadog tracing around the request.
app.get('/posts', (req, res) => {
  const span = tracer.startSpan('web.request')

  span.setTag('http.url', req.url)
  span.addTags({
    'http.method': req.method
  })
})
```

**Adding tags to a current active span**

Access the current active span from any method within your code. Note, however, that if the method is called and there is no span currently active, `tracer.scopeManager().active()` returns `null`.

```javascript
// e.g. adding tag to active span

const scope = tracer.scopeManager().active()
const span = scope.span()

span.setTag('<TAG_KEY>', '<TAG_VALUE>')
```

{{% /tab %}}
{{% tab ".NET" %}}

Add tags directly to a `Datadog.Trace.Span` object by calling `Span.SetTag()`. For example:

```csharp
using Datadog.Trace;

// get the global tracer
var tracer = Tracer.Instance;

// get the currently active span (can be null)
var span = tracer.ActiveScope?.Span;

// add a tag to the span
span?.SetTag("<TAG_KEY>", "<TAG_VALUE>");
```

**Note**: `Datadog.Trace.Tracer.Instance.ActiveScope` returns `null` if there is no active span.

{{% /tab %}}
{{% tab "PHP" %}}

Add tags directly to a `DDTrace\Span` object by calling `Span::setTag()`.

```php
dd_trace('<FUNCTION_NAME>', function () {
    $scope = \DDTrace\GlobalTracer::get()
      ->startActiveSpan('<FUNCTION_NAME>');
    $span = $scope->getSpan();
    $span->setTag('<TAG_KEY>', '<TAG_VALUE>');

    $result = <FUNCTION_NAME>();

    $scope->close();
    return $result;
});
```

**Adding tags to a current active span**

```php
// Get the currently active span (can be null)
$span = \DDTrace\GlobalTracer::get()->getActiveSpan();
if (null !== $span) {
  // Add a tag to the span
  $span->setTag('<TAG_KEY>', '<TAG_VALUE>');
}
```

**Note**: `Tracer::getActiveSpan()` returns `null` if there is no active span.

{{% /tab %}}
{{< /tabs >}}

[1]: /tagging
