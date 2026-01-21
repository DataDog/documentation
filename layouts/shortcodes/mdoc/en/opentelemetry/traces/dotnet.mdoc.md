<!--
This partial contains .NET traces content for the OTel API.
It can be included directly in language-specific pages or wrapped in conditionals.
-->

## Setup

To configure OpenTelemetry to use the Datadog trace provider:

1. Add your desired manual OpenTelemetry instrumentation to your .NET code following the [OpenTelemetry .NET Manual Instrumentation documentation][150]. **Note**: Where those instructions indicate that your code should call the OpenTelemetry SDK, call the Datadog tracing library instead.

2. Install the Datadog .NET tracing library and enable the tracer for your [.NET Framework service][151] or your [.NET Core (and .NET 5+) service][152]. You can optionally do this with [Single Step APM Instrumentation][153].

3. Set `DD_TRACE_OTEL_ENABLED` environment variable to `true`.

4. Run your application.

Datadog combines these OpenTelemetry spans with other Datadog APM spans into a single trace of your application. It also supports [OpenTelemetry instrumentation libraries][154].

## Creating custom spans

To manually create spans that start a new, independent trace:

```csharp
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;

// Start a new span
using (Activity? activity = Telemetry.ActivitySource.StartActivity("<RESOURCE NAME>"))
{
  activity?.SetTag("operation.name", "custom-operation");
  // Do something
}
```

## Creating spans

To create custom spans within an existing trace context:

```csharp
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;

using (Activity? parentScope = Telemetry.ActivitySource.StartActivity("<RESOURCE NAME>"))
{
   parentScope?.SetTag("operation.name", "manual.sortorders");
   using (Activity? childScope = Telemetry.ActivitySource.StartActivity("<RESOURCE NAME>"))
   {
       childScope?.SetTag("operation.name", "manual.sortorders.child");
       SortOrders();
   }
}
```

## Adding span tags

Add custom tags to your spans to provide additional context:

```csharp
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;

public class ShoppingCartController : Controller
{
    [HttpGet]
    public IActionResult Index(int customerId)
    {
      Activity? activity = Telemetry.ActivitySource.StartActivity("<RESOURCE NAME>")

      // Add a tag to the span for use in the Datadog web UI
      activity?.SetTag("customer.id", customerId.ToString());

      var cart = _shoppingCartRepository.Get(customerId);
      return View(cart);
    }
}
```

## Setting errors on spans

Set error information on a span when an error occurs during its execution:

```csharp
try
{
    // do work that can throw an exception
}
catch(Exception e)
{
    activity?.SetTag("error", 1);
    activity?.SetTag("error.message", exception.Message);
    activity?.SetTag("error.stack", exception.ToString());
    activity?.SetTag("error.type", exception.GetType().ToString());
}
```

## Adding span events

{% alert level="info" %}
Adding span events requires SDK version 2.53.0 or higher.
{% /alert %}

You can add span events using the `AddEvent` API:

```csharp
var eventTags = new ActivityTagsCollection
{
    { "int_val", 1 },
    { "string_val", "two" },
    { "int_array", new int[] { 3, 4 } },
    { "string_array", new string[] { "5", "6" } },
    { "bool_array", new bool[] { true, false } }
};

activity.AddEvent(new ActivityEvent("Event With No Attributes"));
activity.AddEvent(new ActivityEvent("Event With Some Attributes", DateTimeOffset.Now, eventTags));
```

Read the [OpenTelemetry specification for adding events][103] for more information.

## Propagating context with headers extraction and injection

You can configure the propagation of context for distributed traces by injecting and extracting headers. Read [Trace Context Propagation][105] for information.

[103]: https://opentelemetry.io/docs/specs/otel/trace/api/#add-events
[105]: /tracing/trace_collection/trace_context_propagation/
[150]: https://opentelemetry.io/docs/instrumentation/net/manual/
[151]: /tracing/trace_collection/dd_libraries/dotnet-framework/#installation-and-getting-started
[152]: /tracing/trace_collection/dd_libraries/dotnet-core/#installation-and-getting-started
[153]: /tracing/trace_collection/single-step-apm/
[154]: https://opentelemetry.io/docs/instrumentation/net/libraries/
