---
title: Adding Metadata to Spans
kind: documentation
further_reading:
- link: "tracing/advanced/connect_logs_and_traces"
  tags: "Enrich Tracing"
  text: "Connect your Logs and Traces together"
- link: "tracing/advanced/manual_instrumentation"
  tags: "Enrich Tracing"
  text: "Instrument manually your application to create traces."
- link: "tracing/advanced/opentracing"
  tags: "Enrich Tracing"
  text: "Implement Opentracing across your applications."
- link: "tracing/visualization/"
  tag: "Use the APM UI"
  text: "Explore your services, resources, and traces"
---

Adding metadata in the form of key-value pairs to a span allows to correlate traces with other Datadog products to provide more details about specific spans. Metadata can be either added [to a single span](#adding-metadata-to-a-span-via-tags) or [globally to all spans](#adding-metadata-globally-to-all-spans-via-tags).

**Note**: Tracing metadata is added via tags, but tags already have a specific meaning throughout [Datadog][1].

When looking at a trace for a tag in Datadog, look for the tab called metadata.

## Adding Metadata to a Span via Tags

{{< tabs >}}
{{% tab "Java" %}}

The Datadog UI uses tags to set span level metadata. A full list of these metadata can be found in the [Datadog][1] and [OpenTracing][2] APIs.

Custom metadata may be set for auto-instrumentation by grabbing the active span out of the global tracer and setting a tag with `setTag`.

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

Add metadata directly to a span by calling `set_tag`. For example, with the following route handler:

```python
from ddtrace import tracer

@app.route('/customer/<int:customer_id>')
def handle_customer(customer_id):
  with tracer.trace('web.request') as span:
    span.set_tag('customer.id', customer_id)
```

The current span can be retrieved from the context in order to set its metadata. This way, if a span was started by the instrumentation, you can retrieve the span and add custom metadata. **Note**: If a span does not exist, `None` is returned:

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

Add metadata directly to `Datadog::Span` objects by calling `#set_tag`:

```ruby
# An example of a Sinatra endpoint,
# with Datadog tracing around the request.
get '/posts' do
  Datadog.tracer.trace('web.request') do |span|
    span.set_tag('http.url', request.path)
  end
end
```

Access the current active span from any method within your code. **Note**: If the method is called and there is no span currently active, `active_span` is `nil`.

```ruby
# e.g. adding tag to active span

current_span = Datadog.tracer.active_span
current_span.set_tag('<TAG_KEY>', '<TAG_VALUE>') unless current_span.nil?
```

{{% /tab %}}
{{% tab "Go" %}}

Add metadata directly to a `Span` interface by calling `SetTag`:

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

Datadog's integrations make use of the `Context` type to propagate the current active span.
If you want to add span metadata via a tag attached to a `Context`, call the `SpanFromContext` function:

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


Add metadata directly to span objects by calling `setTag` or `addTags`:

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

Access the current active span from any method within your code. **Note**: If the method is called and there is no span currently active, `tracer.scope().active()` returns `null`.

```javascript
// e.g. adding tag to active span

const span = tracer.scope().active()

span.setTag('<TAG_KEY>', '<TAG_VALUE>')
```

{{% /tab %}}
{{% tab ".NET" %}}

Add metadata directly to a `Datadog.Trace.Span` object by calling `Span.SetTag()`. For example:

```csharp
using Datadog.Trace;

// access the active scope through the global tracer (can return null)
var scope = Tracer.Instance.ActiveScope;

// add a tag to the span
scope.Span.SetTag("<TAG_KEY>", "<TAG_VALUE>");
```

**Note**: `Datadog.Trace.Tracer.Instance.ActiveScope` returns `null` if there is no active span.

{{% /tab %}}
{{% tab "PHP" %}}


Add metadata directly to a `DDTrace\Span` object by calling `Span::setTag()`.

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

Access the current active span from any method within your code:

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

## Adding metadata globally to all spans

{{< tabs >}}
{{% tab "Java" %}}

Add metadata to all spans by configuring the tracer with the system property `dd.trace.global.tags`:

```bash
java -javaagent:<DD-JAVA-AGENT-PATH>.jar \
     -dd.trace.global.tags='env:dev,<TAG_KEY>:<TAG_VALUE>' \
     -jar <YOUR_APPLICATION_PATH>.jar
```

{{% /tab %}}
{{% tab "Python" %}}

Add metadata to all spans by configuring the tracer with the `tracer.set_tags` method:

```python
from ddtrace import tracer

tracer.set_tags({ 'env': 'dev' })
```

{{% /tab %}}
{{% tab "Ruby" %}}

Add metadata to all spans by configuring the tracer with the `tags` option:

```ruby
Datadog.configure do |c|
  c.tracer tags: { 'env' => 'dev' }
end
```

See the [API documentation][1] for more details.

[1]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#environment-and-tags
{{% /tab %}}
{{% tab "Go" %}}

Add metadata to all spans by configuring the tracer with the `tags` option:

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

{{% /tab %}}
{{% tab "Node.js" %}}

Add metadata to all spans by configuring the tracer with the `tags` parameter:

```js
const tracer = require('dd-trace').init({
  tags: 'env:dev,<TAG_KEY>:<TAG_VALUE>'
})
```


{{% /tab %}}
{{% tab ".NET" %}}

Coming Soon. Reach out to [the Datadog support team][1] to learn more.

[1]: /help
{{% /tab %}}
{{% tab "PHP" %}}

Use the environment variable `DD_TRACE_GLOBAL_TAGS` to add metadata to all the generated spans. See the [PHP configuration][1]
section for details on how environment variables should be set.

```ini
DD_TRACE_GLOBAL_TAGS=key1:value1,key2:value2
```

[1]: /tracing/languages/php/#configuration
{{% /tab %}}
{{% tab "C++" %}}

Add metadata directly to a span object by calling `Span::SetTag`. For example:

```cpp
auto tracer = ...
auto span = tracer->StartSpan("operation_name");
span->SetTag("key must be string", "Values are variable types");
span->SetTag("key must be string", 1234);
```

Values are of [variable type][1] and can be complex objects. Values are serialized as JSON, with the exception of a string value being serialized bare (without extra quotation marks).

[1]: https://github.com/opentracing/opentracing-cpp/blob/master/include/opentracing/value.h
{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
[1]: /tagging
