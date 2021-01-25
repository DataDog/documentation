---
title: Add span tags and slice and dice your application performance
kind: guide
further_reading:
- link: "/tracing/guide/alert_anomalies_p99_database/"
  tag: "3 mins"
  text: "Alert on anomalous p99 latency of a database service"
- link: "/tracing/guide/week_over_week_p50_comparison/"
  tag: "2 mins"
  text: "Compare a service’s latency to the previous week"
- link: "/tracing/guide/apm_dashboard/"
  tag: "4 mins"
  text: "Create a Dashboard to track and correlate APM metrics"
- link: "/tracing/guide/slowest_request_daily/"
  tag: "3 mins"
  text: "Debug the slowest trace on the slowest endpoint of a web service"
- link: "/tracing/guide/"
  tag: ""
  text: "All guides"
---

_7 minutes to complete_

{{< img src="tracing/guide/add_span_md_and_graph_it/span_md_6.mp4" alt="Analytics View" video="true"  style="width:90%;">}}

Datadog APM allows you to customize your [traces][1] to include any additional information you might need to maintain observability into your business. You can use this to identify a spike in the throughput of a certain enterprise customer, or the user suffering the highest latency, or to pinpoint the database shard generating the most errors.

In this example, a customer ID is added to traces allowing the customers that have the slowest performance to be identified. Customization of traces is based on tags that seamlessly integrate APM with the rest of Datadog and come in the form of `key:value` pairs of metadata added to [spans][2].

## Instrument your code with custom span tags

1) **Follow the example to get your code instrumented**.

Depending on the programming language you are you using, you’ll need to set the [tags][3] to add to your spans differently.

**Note**: take note of the service and [resource names][4] you are working on, these will come in handy later. In this example, the service is the Ruby server `web-store` and the resource (endpoint) is `ShoppingCartController#checkout`.

{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,.NET,php" >}}
{{< programming-lang lang="java" >}}

The Datadog UI uses tags to set span level metadata. Custom tags may be set for auto-instrumentation by grabbing the active span from the global tracer and setting a tag with `setTag` method.

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
      span.setTag("customer.id", customer_id);
    }

    // [...]
  }
}
```

{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

The Datadog UI uses tags to set span level metadata. Custom tags may be set for auto-instrumentation by grabbing the active span from the global tracer and setting a tag with `set_tag` method.

```python
from ddtrace import tracer

@app.route('/shopping_cart/<int:customer_id>')
@login_required
def shopping_cart(customer_id):
    # Get the active span
    current_span = tracer.current_span()
    if current_span:
        # customer_id -> 254889
        current_span.set_tag('customer.id', customer_id)

    # [...]
```

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

The Datadog UI uses tags to set span level metadata. Custom tags may be set for auto-instrumentation by grabbing the active span from the global tracer and setting a tag with `set_tag` method.

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

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

The Datadog UI uses tags to set span level metadata. Custom tags may be set for auto-instrumentation by grabbing the active span from the global tracer and setting a tag with `SetTag` method.

```go
package main

import (
    muxtrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/gorilla/mux"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    // Get the active span from a Go Context
    if span, ok := tracer.SpanFromContext(r.Context()); ok {
      // customer_id -> 254889
      span.SetTag("customer.id", vars["customerID"])
    }

    // [...]
}

func main() {
    tracer.Start(tracer.WithServiceName("web-store"))
    defer tracer.Stop()
    // Use auto-instrumentation
    mux := muxtrace.NewRouter()
    mux.HandleFunc("/shopping_cart/{customerID}", handler)
    http.ListenAndServe(":8080", mux)
}
```

{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}


The Datadog UI uses tags to set span level metadata. Custom tags may be set for auto-instrumentation by grabbing the active span from the global tracer and setting a tag with `setTag` method.

```javascript
app.get('/shopping_cart/:customer_id', (req, res) => {
  // Get the active span
  const span = tracer.scope().active()
  if (span !== null) {
    // customer_id -> 254889
    span.setTag('customer.id', req.params.customer_id)
  }

  // [...]
})
```

{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}


Add tags directly to a `Datadog.Trace.Span` object by calling `Span.SetTag()`. For example:

```csharp
public class ShoppingCartController : Controller
{
    private IShoppingCartRepository _shoppingCartRepository;

    [HttpGet]
    public IActionResult Index(int customerId)
    {
        // Access the active scope through the global tracer (can return null)
        var scope = Tracer.Instance.ActiveScope;

        if (scope != null)
        {
            // Add a tag to the span for use in the datadog web UI
            scope.Span.SetTag("customer.id", customerId.ToString());
        }

        var cart = _shoppingCartRepository.Get(customerId);

        return View(cart);
    }
}
```

**Note**: `Datadog.Trace.Tracer.Instance.ActiveScope` returns `null` if there is no active span.

{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

The Datadog UI uses tags to set span level metadata. Custom tags may be set for auto-instrumentation by grabbing the active span from the global tracer and setting a tag with `setTag` method.

```php
<?php
  namespace App\Http\Controllers;

  use DDTrace\GlobalTracer;

  class ShoppingCartController extends Controller
  {
      public shoppingCartAction (Request $request) {
          // Get the currently active span
          $span = GlobalTracer::get()->getActiveSpan();
          if (null !== $span) {
              // customer_id -> 254889
              $span->setTag('customer_id', $request->get('customer_id'));
          }

          // [...]
      }
  }
?>
```

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

<div class="alert alert-info">You might have to wait a few minutes between deploying your updated code and seeing the new tags in the Datadog UI</div>

## Leverage the Datadog UI to search for your custom span tags

2) **Go to the Services page** and click on the [service][5] that you added tags to. **Scroll down and click on the specific resource** where the tag was added in the [Resource][4] table. **Scroll down to the Traces table**

{{< img src="tracing/guide/add_span_md_and_graph_it/span_md_3.png" alt="Resource Page"  style="width:90%;">}}

The Trace table shows you both the overall latency distribution of all traces in the current scope (service, resource and timeframe) and links to individual traces. You can sort this table by duration or error code to easily identify erroneous operation or opportunities for optimization.

3) **Click into one of your traces**

{{< img src="tracing/guide/add_span_md_and_graph_it/span_md_4.png" alt="Flamegraph"  style="width:90%;">}}

In this view you can see the **flamegraph** on top and the additional information windows beneath it. The Datadog flamegraph allows you to have an at a glance view of the duration and status of every logical unit (span) that impacts a request. The flamegraph is fully interactive and you can pan it (by dragging) or zoom in and out (by scrolling). Clicking on any span provides more information about that span in particular in the bottom part of the view.

The bottom part of the view includes additional information about the trace or any selected span. Here you can see all default tags as well as the ones you manually include. In addition to these, you can also switch to view associated Host and Log information.

<div class="alert alert-info">In order to enable Logs in this view you need to have Logs collection enabled and then to <a href="https://docs.datadoghq.com/tracing/connect_logs_and_traces/" target=_blank>connect Logs and Traces</a></div>

## Leverage your custom span tags with Analytics

4) **Navigate to the [Trace Search page][6]**.

The Trace Search page allows you to identify specific [Traces][1] and Indexed Spans you are interested in. Here you can filter by time a set of default tags (such as `Env`,`Service`, `Resource` and [many more][7]).

5) **Find a trace that has the new tag**. To do this use the facet explorer on the left to find the Resource name you set at the beginning of this guide and click into one of the rows you see there.

6) **Find the new tag that you added to the trace**. Click on it and select **Create facet** for `@[your facet name]` (remember, this is customer_id in our example)

{{< img src="tracing/guide/add_span_md_and_graph_it/span_md_5.png" alt="Create Facet Menu"  style="width:90%;">}}

You can now determine the displayed name of your facet and where to place it in the facet explorer.

{{< img src="tracing/guide/add_span_md_and_graph_it/span_md_8.png" alt="Create Facet Modal"  style="width:60%;">}}

You should now be able to see the facet you created in the Facet Explorer. The fastest way to find it is by using the `Search facets` box.

6) **Navigate to the [Analytics][8] page**

The Analytics page is a visual query building tool that allows you to conduct an investigation into your traces with infinite cardinality. It relies on facets to filter and scope the query, read more in the [Trace Search and Analytics overview][9].

7) **Choose the service** you’ve been working on from the service facet list, **choose Error** from the status facet and **select `customer_id`** (or any other tags you added to your spans) from the group by field.

{{< img src="tracing/guide/add_span_md_and_graph_it/span_md_6.mp4" alt=" span md 6"  video="true" style="width:90%;">}}

8) **Remove Error** from the query, **change the `count *` measure to `Duration`** and **change the graph type to `Top List`**.

You can now see the customers that have the slowest average requests. **Note**: If you’d like to make sure your customers never pass a certain threshold of performance, you can [export this query to a monitor][10], alternatively, you can save this visualization to a dashboard and keep an eye over it over time.

{{< img src="tracing/guide/add_span_md_and_graph_it/span_md_7.mp4" alt="span md 7" video="true"  style="width:90%;">}}

Finally, you can also see all the traces relevant to your query by clicking the visualization and selecting `View traces`.

{{< img src="tracing/guide/add_span_md_and_graph_it/span_md_9.mp4" alt="span md 9" video="true"  style="width:90%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/visualization/#trace
[2]: /tracing/visualization/#spans
[3]: /tracing/visualization/#span-tags
[4]: /tracing/visualization/#resources
[5]: /tracing/visualization/#services
[6]: https://app.datadoghq.com/apm/search
[7]: /tracing/trace_search_and_analytics/#live-search-for-15-minutes
[8]: https://app.datadoghq.com/apm/analytics
[9]: /tracing/trace_search_and_analytics/query_syntax/
[10]: /tracing/guide/alert_anomalies_p99_database/
