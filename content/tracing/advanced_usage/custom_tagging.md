---
title: Custom Tagging
kind: documentation
---

Custom Tagging allows adding key-value pairs to specific spans. These key-value pairs (tags) are used to correlate traces with other Datadog products and to provide more details about specific spans.

{{< tabs >}}
{{% tab "Java" %}}
Tags are key-value pairs attached to spans. All tags share a single namespace.

The Datadog UI uses specific tags to set UI properties, such as an application's service name. A full list of these tags can be found in the [Datadog][java api doc] and [OpenTracing][opentracing java doc] APIs.

### Custom Tags

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
    final Tracer tracer = GlobalTracer.get();
    if (tracer != null && tracer.activeSpan() != null) {
      tracer.activeSpan().setTag("org.id", 12345);
      tracer.activeSpan().setTag("http.url", "/login");
    }
    // servlet impl
  }
}
```

[java api doc]: https://github.com/DataDog/dd-trace-java/blob/master/dd-trace-api/src/main/java/datadog/trace/api/DDTags.java
[opentracing java doc]: https://github.com/opentracing/opentracing-java/blob/master/opentracing-api/src/main/java/io/opentracing/tag/Tags.java

{{% /tab %}}
{{% tab "Python" %}}

**Adding tags to a span**

You can add tags directly to a span by calling `set_tag`. For example with the following Flask route handler:

```python
from ddtrace import tracer

@app.route('/post/<int:post_id>')
def handle_post(post_id):
  with tracer.trace('web.request') as span:
    span.set_tag('post.id', post_id)
```

**Adding tags to a current active span**

The current span can be retrieved from the context in order to set tags. This way, if a span was started by our instrumentation, you can retrieve the span and add custom tags. Note that if a span does not exist, `None` will be returned:

```python
from ddtrace import tracer

@app.route('/post/<int:post_id>')
@tracer.wrap()
def handle_post(post_id):
  # get the active span in the context
  current_span = tracer.get_span()
  if current_span:
    current_span.set_tag('post.id', post_id)
```

**Adding tags globally to all spans**

You can also add tags to all spans by configuring the tracer with the `tracer.set_tags` method:

```python
from ddtrace import tracer

tracer.set_tags({ 'env': 'prod' })
```

{{% /tab %}}
{{% tab "Ruby" %}}
{{% /tab %}}
{{% tab "Go" %}}
{{% /tab %}}
{{% tab "Node.js" %}}
{{% /tab %}}
{{< /tabs >}}