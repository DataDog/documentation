---
title: Adding Span Tags
kind: documentation
aliases:
  - /tracing/advanced/adding_metadata_to_spans/
further_reading:
- link: "tracing/connect_logs_and_traces"
  tags: "Enrich Tracing"
  text: "Connect your Logs and Traces together"
- link: "tracing/manual_instrumentation"
  tags: "Enrich Tracing"
  text: "Instrument manually your application to create traces."
- link: "tracing/opentracing"
  tags: "Enrich Tracing"
  text: "Implement Opentracing across your applications."
- link: "tracing/visualization/"
  tag: "Use the APM UI"
  text: "Explore your services, resources, and traces"
---

Add [tags][1] in the form of key-value pairs to correlate traces with other Datadog products, which provides more details about specific spans. Tags can be added to a [single span](#adding-tags-to-a-span) or [globally to all spans](#adding-tags-globally-to-all-spans).

**Note**: Tracing metadata is added via tags, but tags already have a specific meaning throughout [Datadog][2].

## Adding tags to a span

{{< tabs >}}
{{% tab "Java" %}}

The Datadog UI uses [tags][1] to set [span][2] level metadata. A full list of these tags can be found in the [Datadog][3] and [OpenTracing][4] APIs.

Custom tags may be set for auto-instrumentation by grabbing the active span out of the global tracer and setting a tag with `setTag`.

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
      span.setTag("customer.id", req.getParameter("customer_id"));
      span.setTag("<TAG_KEY>", "<TAG_VALUE>");
    }
    // servlet impl
  }
}
```

[1]: /tracing/visualization/#span-tags
[2]: /tracing/visualization/#spans
[3]: https://github.com/DataDog/dd-trace-java/blob/master/dd-trace-api/src/main/java/datadog/trace/api/DDTags.java
[4]: https://github.com/opentracing/opentracing-java/blob/master/opentracing-api/src/main/java/io/opentracing/tag/Tags.java
{{% /tab %}}
{{% tab "Python" %}}

Add [tags][1] directly to a [span][2] by calling `set_tag`. For example, with the following route handler:

```python
from ddtrace import tracer

@app.route('/customer/<int:customer_id>')
def handle_customer(customer_id):
  with tracer.trace('web.request') as span:
    span.set_tag('customer.id', customer_id)
    span.set_tag('<TAG_KEY>', '<TAG_VALUE>')
```

The current span can be retrieved from the context to set its tag. This way, if a span was started by the instrumentation, you can retrieve the span and add custom tags. **Note**: If a span does not exist, `None` is returned:

```python
from ddtrace import tracer

@app.route('/customer/<int:customer_id>')
@tracer.wrap()
def handle_customer(customer_id):
  # get the active span in the context, put there by tracer.wrap()
  current_span = tracer.current_span()
  if current_span:
    current_span.set_tag('customer.id', customer_id)
    current_span.set_tag('<TAG_KEY>', '<TAG_VALUE>')
```

[1]: /tracing/visualization/#span-tags
[2]: /tracing/visualization/#spans
{{% /tab %}}
{{% tab "Ruby" %}}

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

Access the current active [span][2] from any method within your code. **Note**: If the method is called and there is no span currently active, `active_span` is `nil`.

```ruby
# e.g. adding tag to active span

current_span = Datadog.tracer.active_span
current_span.set_tag('<TAG_KEY>', '<TAG_VALUE>') unless current_span.nil?
```

[1]: /tracing/visualization/#span-tags
[2]: /tracing/visualization/#spans
{{% /tab %}}
{{% tab "Go" %}}

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

[1]: /tracing/visualization/#span-tags
[2]: /tracing/visualization/#spans
{{% /tab %}}
{{% tab "Node.js" %}}

Add [tags][1] directly to span objects by calling `setTag` or `addTags`:

```javascript
// An example of an Express endpoint,
// with Datadog tracing around the request.
app.get('/posts', (req, res) => {
  const span = tracer.startSpan('web.request')

  span.setTag('http.url', req.url)
  span.addTags({'http.method': req.method})
  span.addTags({'<TAG_KEY>': '<TAG_VALUE>'})
})
```

Access the current active [span][2] from any method within your code. **Note**: If the method is called and there is no span currently active, `tracer.scope().active()` returns `null`.

```javascript
// e.g. adding tag to active span

const span = tracer.scope().active()

span.setTag('<TAG_KEY>', '<TAG_VALUE>')
```

[1]: /tracing/visualization/#span-tags
[2]: /tracing/visualization/#spans
{{% /tab %}}
{{% tab ".NET" %}}

Add [tags][1] directly to a `Datadog.Trace.Span` object by calling `Span.SetTag()`. For example:

```csharp
using Datadog.Trace;

// access the active scope through the global tracer (can return null)
var scope = Tracer.Instance.ActiveScope;

// add a tag to the span
scope.Span.SetTag("<TAG_KEY>", "<TAG_VALUE>");
```

**Note**: `Datadog.Trace.Tracer.Instance.ActiveScope` returns `null` if there is no active [span][2].

[1]: /tracing/visualization/#span-tags
[2]: /tracing/visualization/#spans
{{% /tab %}}
{{% tab "PHP" %}}

Add [tags][1] directly to a `DDTrace\Span` object by calling `Span::setTag()`. For example:

```php
<?php
  // Get the currently active span (can be null)
  $span = \DDTrace\GlobalTracer::get()->getActiveSpan();
  if (null !== $span) {
    // Add a tag to the span
    $span->setTag('<TAG_KEY>', '<TAG_VALUE>');
  }
?>
```

**Note**: `Tracer::getActiveSpan()` returns `null` if there is no active [span][2].

[1]: /tracing/visualization/#span-tags
[2]: /tracing/visualization/#spans
{{% /tab %}}
{{< /tabs >}}

## Adding tags globally to all spans

{{< tabs >}}
{{% tab "Java" %}}

Add [tags][1] to all [spans][2] by configuring the tracer with the system property `Ddd.trace.global.tags`:

```bash
java -javaagent:<DD-JAVA-AGENT-PATH>.jar \
     -Ddd.trace.global.tags='env:dev,<TAG_KEY>:<TAG_VALUE>' \
     -jar <YOUR_APPLICATION_PATH>.jar
```

[1]: /tracing/visualization/#span-tags
[2]: /tracing/visualization/#spans
{{% /tab %}}
{{% tab "Python" %}}

Add [tags][1] to all [spans]span by configuring the tracer with the `tracer.set_tags` method:

```python
from ddtrace import tracer

tracer.set_tags({ 'env': 'dev' })
```

[1]: /tracing/visualization/#span-tags
{{% /tab %}}
{{% tab "Ruby" %}}

Add [tags][1] to all [spans][2] by configuring the tracer with the `tags` option:

```ruby
Datadog.configure do |c|
  c.tracer tags: { 'env' => 'dev' }
end
```

See the [API documentation][3] for more details.

[1]: /tracing/visualization/#span-tags
[2]: /tracing/visualization/#spans
[3]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#environment-and-tags
{{% /tab %}}
{{% tab "Go" %}}

Add [tags][1] to all [spans][2] by configuring the tracer with the `tags` option:

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

[1]: /tracing/visualization/#span-tags
[2]: /tracing/visualization/#spans
{{% /tab %}}
{{% tab "Node.js" %}}

Add [tags][1] to all [spans][2] by configuring the tracer with the `tags` parameter:

```js
const tracer = require('dd-trace').init({
  tags: {
    env: 'dev',
    '<TAG_KEY>': '<TAG_VALUE>'
  }
})
```

[1]: /tracing/visualization/#span-tags
[2]: /tracing/visualization/#spans
{{% /tab %}}
{{% tab ".NET" %}}

Add [tags][1] to all the generated [spans][2] by configuring the tracer. There are a few ways to set the configuration, as shown in the
[.NET configuration][3] section.

This example sets the environment variable:

```ini
DD_TRACE_GLOBAL_TAGS=key1:value1,key2:value2
```

[1]: /tracing/visualization/#span-tags
[2]: /tracing/visualization/#spans
[3]: /tracing/setup/dotnet/#configuration
{{% /tab %}}
{{% tab "PHP" %}}

Use the environment variable `DD_TRACE_GLOBAL_TAGS` to add [tags][1] to all the generated [spans][2]. See the [PHP configuration][3]
section for details on how environment variables are set.

```ini
DD_TRACE_GLOBAL_TAGS=key1:value1,key2:value2
```

[1]: /tracing/visualization/#span-tags
[2]: /tracing/visualization/#spans
[3]: /tracing/setup/php/#configuration
{{% /tab %}}
{{% tab "C++" %}}

Add [tags][1] directly to a [span][2] object by calling `Span::SetTag`. For example:

```cpp
auto tracer = ...
auto span = tracer->StartSpan("operation_name");
span->SetTag("key must be string", "Values are variable types");
span->SetTag("key must be string", 1234);
```

Values are of [variable type][3] and can be complex objects. Values are serialized as JSON, with the exception of a string value being serialized bare (without extra quotation marks).

[1]: /tracing/visualization/#span-tags
[2]: /tracing/visualization/#spans
[3]: https://github.com/opentracing/opentracing-cpp/blob/master/include/opentracing/value.h
{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/visualization/#span-tags
[2]: /tagging
