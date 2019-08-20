---
title: Add span tags and slice and dice them using Trace Analytics
kind: guide
disable_toc: true
further_reading:
- link: "tracing/setup/"
  tag: "Documentation"
  text: "Learn how to setup APM tracing with your application"
- link: "tracing/visualization/services_list/"
  tag: "Documentation"
  text: "Discover the list of services reporting to Datadog"
- link: "tracing/visualization/resource"
  tag: "Documentation"
  text: "Dive into your resource performance and traces"
- link: "tracing/visualization/trace"
  tag: "Documentation"
  text: "Understand how to read a Datadog Trace"
---

{{< img src="tracing/guide/add_span_md_and_graph_it/span_md_6.gif" alt="Analytics View" responsive="true" style="width:90%;">}}

Datadog APM allows you to customize your traces to include any additional information you might need to maintain observability into your business. In this example, a customer ID is added to traces allowing the customers that have the slowest performance to be identified. Customization of traces is based on tags that seamlessly integrate APM with the rest of Datadog and come in the form of `key:value` pairs of metadata added to spans.

## Instrument your code with custom metadata

1) **Follow the example to get your code instrumented**.

Depending on the programming language you are you using, you’ll need to set the metadata to add to your spans differently.

**Note**: take note of the service and [resource names][1] you are working on, these will come in handy later. In this example, the service is the Ruby server `web-store` and the resource (endpoint) is `ShoppingCartController#checkout`.

{{< tabs >}}
{{% tab "Java" %}}

The Datadog UI uses tags to set span level metadata. A full list of the metadata can be found in the [Datadog][1] and [OpenTracing][2] APIs.

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
      span.setTag("customer_id", customer_id);
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

The current span can be retrieved from the context in order to set its metadata. This way, if a span was started by the instrumentation, you can retrieve the span and add custom metadata. 
**Note**: If a span does not exist, `None` is returned:

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

Access the current active span from any method within your code. 
**Note**: If the method is called and there is no span currently active, `active_span` is `nil`.

```ruby
# e.g. adding tag to active span

current_span = Datadog.tracer.active_span
current_span.set_tag('customer_id', customer_id) unless current_span.nil?
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
    span.SetTag("customer_id", customer.id)
}

func main() {
    tracer.Start(tracer.WithServiceName("<SERVICE_NAME>"))
    defer tracer.Stop()
    http.HandleFunc("/posts", handler)
    log.Fatal(http.ListenAndServe(":8080", nil))
}
```

Datadog's integrations make use of the `Context` type to propagate the current active span.
If you want to add span metadata using a tag attached to a `Context`, call the `SpanFromContext` function:

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
        span.SetTag("customer_id", customer.id)
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

  span.addTags({
    'customer_id': customer.id
  })
})
```

Access the current active span from any method within your code.
**Note**: If the method is called and there is no span currently active, `tracer.scope().active()` returns `null`.

```javascript
// e.g. adding tag to active span

const span = tracer.scope().active()

span.setTag('customer_id', customer.id)
```

{{% /tab %}}
{{% tab ".NET" %}}

Add metadata directly to a `Datadog.Trace.Span` object by calling `Span.SetTag()`. For example:

```csharp
using Datadog.Trace;

// access the active scope through the global tracer (can return null)
var scope = Tracer.Instance.ActiveScope;

// add a tag to the span
scope.Span.SetTag("customer_id", customer.id);
```

**Note**: `Datadog.Trace.Tracer.Instance.ActiveScope` returns `null` if there is no active span.

{{% /tab %}}
{{% tab "PHP" %}}


Add metadata directly to a `DDTrace\Span` object by calling `Span::setTag()`. For example:

```php
// Get the currently active span (can be null)
$span = \DDTrace\GlobalTracer::get()->getActiveSpan();
if (null !== $span) {
  // Add a tag to the span
  $span->setTag('customer_id', customer.id);
}
```

**Note**: `Tracer::getActiveSpan()` returns `null` if there is no active span.

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">You might have to wait a few minutes between deploying your updated code and seeing the new metadata in the Datadog UI</div>

## Leverage the Datadog UI to search for your custom metadata

2) **Go to the Services page** and click on the service that you added metadata to. **Scroll down and click on the specific resource** where the metadata was added in the Resource table. **Scroll down to the Traces table** 

{{< img src="tracing/guide/add_span_md_and_graph_it/span_md_3.png" alt="Resource Page" responsive="true" style="width:90%;">}}

The Trace table shows you both the overall latency distribution of all traces in the current scope (service, resource and timeframe) and links to individual traces. You can sort this table by duration or error code to easily identify erroneous operation or opportunities for optimization.

3) **Click into one of your traces**

{{< img src="tracing/guide/add_span_md_and_graph_it/span_md_4.png" alt="Flamegraph" responsive="true" style="width:90%;">}}

In this view you can see the **flamegraph** on top and the additional information windows beneath it. The Datadog flamegraph allows you to have an at a glance view of the duration and status of every logical unit (span) that impacts a request. The flamegraph is fully interactive and you can pan it (by dragging) or zoom in and out (by scrolling). Clicking on any span provides more information about that span in particular in the bottom part of the view.

The bottom part of the view includes additional information about the trace or any selected span. Here you can see all default metadata as well as the metadata you manually include. In addition to these, you can also switch to view associated Host and Log information.

<div class="alert alert-info">In order to enable Logs in this view you need to have Logs collection enabled and then to <a href="https://docs.datadoghq.com/tracing/advanced/connect_logs_and_traces/?tab=java" target=_blank>connect Logs and Traces</a></div>

4) Find the new metadata that you added to the trace. Click on it and select **Create facet** for `@[your facet name]` (remember, this is customer_id in our example)

{{< img src="tracing/guide/add_span_md_and_graph_it/span_md_5.png" alt="Create Facet" responsive="true" style="width:90%;">}}


## Leverage your custom metadata with Trace Search & Analytics
<div class="alert alert-info">This section assumes that you have <a href="https://docs.datadoghq.com/tracing/trace_search_and_analytics/?tab=java" target=_blank>enabled Trace Search and Analytics</a></div>

5) Navigate to the [Trace Analytics][2] page

The Trace Analytics page is a visual query building tool that allows you to conduct an investigation into your traces with infinite cardinality. It relies on facets to filter and scope the query, read more in the [Trace Analytics overview][3].

6) Choose the service you’ve been working on from the service facet list, choose Error from the status facet and select `customer_id` (or any other metadata you added to your spans) from the group by field.

{{< img src="tracing/guide/add_span_md_and_graph_it/span_md_6.gif" alt="" responsive="true" style="width:90%;">}}

7) Remove the Error option from the search, change the `count *` measure to `Duration` and change the graph type to `Top List`. You can now see the customers that have the slowest average requests. **Note**: If you’d like to make sure your customers never pass a certain threshold of performance, you can [export this query to a monitor][4], alternatively, you can export this query to a dashboard and keep an eye over it over time.

{{< img src="tracing/guide/add_span_md_and_graph_it/span_md_7.gif" alt="" responsive="true" style="width:90%;">}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

 [1]: https://docs.datadoghq.com/tracing/visualization/#resources
[2]: https://app.datadoghq.com/apm/search/analytics
[3]: https://docs.datadoghq.com/tracing/trace_search_and_analytics/analytics
[4]: https://docs.datadoghq.com/tracing/guide/alert_anomalies_p99_database
