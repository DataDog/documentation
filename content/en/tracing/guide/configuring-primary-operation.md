---
title: Primary Operations in Services

aliases:
- /tracing/faq/resource-trace-doesn-t-show-up-under-correct-service/
further_reading:
- link: "/tracing/trace_collection/"
  tag: "Documentation"
  text: "Learn how to setup APM tracing with your application"
- link: "/tracing/service_catalog/"
  tag: "Documentation"
  text: "Discover and catalog the services reporting to Datadog"
- link: "/tracing/services/service_page/"
  tag: "Documentation"
  text: "Learn more about services in Datadog"
- link: "/tracing/services/resource_page/"
  tag: "Documentation"
  text: "Dive into your resource performance and traces"
- link: "/tracing/trace_explorer/trace_view/"
  tag: "Documentation"
  text: "Understand how to read a Datadog Trace"
---

## APM services

APM services calculate trace metrics for errors, throughput, and latency. These are calculated based on resources that match a single span name, deemed the primary operation. These service metrics are used throughout the product, both as the default Service Page, in the Service Catalog, and the Service Map.

**Note**: Trace Metrics can be queried based on their `trace.*` [namespace][1].

## Primary operations
### Definition

The primary operation name of a service determines how that service is represented in the UI. The Datadog backend automatically selects an operation name that is deemed the entry-point into the service based on the throughput of requests.

As an example, a `web-store` service can have multiple endpoints which are instrumented as resources. These resources then share the same primary operation because the entry-point into these resources is consistent. For example, the resources `/user/home` and `/user/new` should both have the same primary operation `web.request`. In different languages a primary operation for a service may look like:

| Service Type           | Primary Operation                                 |
|------------------------|---------------------------------------------------|
| web                    | `servlet.request`, `flask.request`, `web.request` |
| db                     | `postgres.query`, `db.query`                      |
| custom-instrumentation | `trace.annotation`, `method.call`                 |

### Configuration

When there are multiple primary operations defined for a service, the highest request throughput determines the operation automatically selected to be the entry-point for the service. An admin user can set this setting manually:

1. Go to the [APM settings page][2].
2. Select the **Primary Operation Name** tab.
3. Click on the edit icon for the service that you want to manually set.
4. Click the **Set Manually** tab.
5. Select the operation that you want reflected as the entry-point to the service.
6. Click **Save**.

{{< img src="tracing/guide/primary_operation/configuring-primary-option.png" alt="APM save" >}}

## Viewing stats for additional span names

To ensure that all traces are being sent to Datadog correctly outside of any instrumentation, you can view your resources by additional span names that are considered a secondary operation with a dropdown menu. However, these are not used to calculate service-level statistics.

{{< img src="tracing/guide/primary_operation/dropdown.mp4" alt="APM save" video=true >}}

## Manual instrumentation

When writing custom spans, statically set the span name to ensure that your resources are grouped with the same primary operation (for example, `web.request`). If the span is being named dynamically, set it as the resource (for example, `/user/profile`).

See [Custom Instrumentation][3] for your programming language for detailed information.

## OpenTracing

When using Datadog, the OpenTracing operation name is a resource and the OpenTracing "component" tag is Datadog's span name. For example, to define (in OpenTracing terms) a span that has the resource "/user/profile", and the span name "http.request":

{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,.NET,php,cpp" >}}
{{< programming-lang lang="java" >}}



```java
Span span = tracer.buildSpan("http.request").start();

try (Scope scope = tracer.activateSpan(span)) {
    span.setTag("service.name", "service_name");
    span.setTag("resource.name", "/user/profile");
    // code being traced
} finally {
    span.finish();
}

```

For more information, see [Setting up Java and OpenTracing][1].


[1]: /tracing/trace_collection/opentracing/java/#opentracing
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

```python
from ddtrace.opentracer.tags import Tags
import opentracing
span = opentracing.tracer.start_span('http.request')
span.set_tag(Tags.RESOURCE_NAME, '/user/profile')
span.set_tag(Tags.SPAN_TYPE, 'web')

# ...
span.finish()

```

For more information, see [Setting up Python and OpenTracing][1].


[1]: /tracing/trace_collection/opentracing/python/#opentracing
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}


```ruby
OpenTracing.start_active_span('http.request') do |scope|
  scope.span.datadog_span.resource = '/user/profile'
  # code being traced
end
```
For more information, see [Setting up Ruby and OpenTracing][1].


[1]: /tracing/trace_collection/opentracing/ruby/#opentracing
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}


```go
opentracing.StartSpan("http.request", opentracer.ResourceName("/user/profile"))
```

For more information, see [Setting up Go and OpenTracing][1].


[1]: /tracing/trace_collection/opentracing/go/#opentracing
{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}


```javascript
const span = tracer.startSpan('http.request');
span.setTag('resource.name',  '/user/profile')
span.setTag('span.type', 'web')
// code being traced
span.finish();
```

For more information, see [Setting up Node.js and OpenTracing][1].


[1]: /tracing/trace_collection/opentracing/nodejs/#opentracing
{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}


```csharp
using OpenTracing;
using OpenTracing.Util;

using (var scope = GlobalTracer.Instance.BuildSpan("http.request").StartActive(finishSpanOnDispose: true))
{
    scope.Span.SetTag("resource.name", "/user/profile");
    // code being traced
}

```

For more information, see [Setting up .NET and OpenTracing][1].


[1]: /tracing/trace_collection/opentracing/dotnet/#opentracing
{{< /programming-lang >}}
{{< programming-lang lang="php" >}}


```php
// Once, at the beginning of your index.php, right after composer's autoloader import.
// For OpenTracing <= 1.0-beta6
$otTracer = new \DDTrace\OpenTracer\Tracer(\DDTrace\GlobalTracer::get());
// For OpenTracing >= 1.0
$otTracer = new \DDTrace\OpenTracer1\Tracer(\DDTrace\GlobalTracer::get());
// Register the global tracer wrapper
 \OpenTracing\GlobalTracer::set($otTracer);

// Anywhere in your application code
$otTracer = \OpenTracing\GlobalTracer::get();
$scope = $otTracer->startActiveSpan('http.request');
$span = $scope->getSpan();
$span->setTag('service.name', 'service_name');
$span->setTag('resource.name', '/user/profile');
$span->setTag('span.type', 'web');
// ...Use OpenTracing as expected
$scope->close();
```

For more information, see [Setting up PHP and OpenTracing][1].


[1]: /tracing/trace_collection/opentracing/php/#opentracing
{{< /programming-lang >}}
{{< programming-lang lang="cpp" >}}


```cpp
// Create a root span for the current request.
auto root_span = tracer->StartSpan("web.request");
// Set a resource name for the root span.
root_span->SetTag(datadog::tags::resource_name, "/user/profile");
```

For more information, see [Setting up C++ and Custom Instrumentation][1].


[1]: /tracing/trace_collection/custom_instrumentation/cpp/#manually-instrument-a-method
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /tracing/metrics/metrics_namespace/
[2]: https://app.datadoghq.com/apm/settings
[3]: /tracing/trace_collection/custom_instrumentation/
