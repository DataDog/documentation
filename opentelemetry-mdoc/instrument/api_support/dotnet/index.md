---
title: .NET Custom Instrumentation using the OpenTelemetry API
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: >-
  Docs > OpenTelemetry in Datadog > Instrument Your Applications > OpenTelemetry
  API Support > .NET Custom Instrumentation using the OpenTelemetry API
---

# .NET Custom Instrumentation using the OpenTelemetry API

{% alert level="info" %}
Unsure when to use OpenTelemetry with Datadog? Start with [Custom Instrumentation with the OpenTelemetry API](http://localhost:1313/tracing/trace_collection/custom_instrumentation/otel_instrumentation/) to learn more.
{% /alert %}

## Overview{% #overview %}

There are a few reasons to manually instrument your applications with the OpenTelemetry API:

- You are not using Datadog [supported library instrumentation](http://localhost:1313/tracing/trace_collection/compatibility/).
- You want to extend the `ddtrace` library's functionality.
- You need finer control over instrumenting your applications.

The `ddtrace` library provides several techniques to help you achieve these goals. The following sections demonstrate how to use the OpenTelemetry API for custom instrumentation to use with Datadog.

## Setup{% #setup %}

To configure OpenTelemetry to use the Datadog trace provider:

1. Add your desired manual OpenTelemetry instrumentation to your .NET code following the [OpenTelemetry .NET Manual Instrumentation documentation](https://opentelemetry.io/docs/instrumentation/net/manual/). **Note**: Where those instructions indicate that your code should call the OpenTelemetry SDK, call the Datadog tracing library instead.

1. Install the Datadog .NET tracing library and enable the tracer for your [.NET Framework service](http://localhost:1313/tracing/trace_collection/dd_libraries/dotnet-framework/#installation-and-getting-started) or your [.NET Core (and .NET 5+) service](http://localhost:1313/tracing/trace_collection/dd_libraries/dotnet-core/#installation-and-getting-started). **Preview**: You can optionally do this with [Single Step APM Instrumentation](http://localhost:1313/tracing/trace_collection/single-step-apm/).

1. Set `DD_TRACE_OTEL_ENABLED` environment variable to `true`.

1. Run your application.

Datadog combines these OpenTelemetry spans with other Datadog APM spans into a single trace of your application. It also supports [OpenTelemetry instrumentation libraries](https://opentelemetry.io/docs/instrumentation/net/libraries/).

## Creating custom spans{% #creating-custom-spans %}

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

## Creating spans{% #creating-spans %}

To create custom spans within an existing trace context:

```csharp
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;

using (Activity? parentScope = Telemetry.ActivitySource.StartActivity("<RESOURCE NAME>"))
{
   parentScope?.SetTag("operation.name", "manual.sortorders");
   using (Activity? childScope = Telemetry.ActivitySource.StartActivity("<RESOURCE NAME>"))
   {
       // Nest using statements around the code to trace
       childScope?.SetTag("operation.name", "manual.sortorders.child");
       SortOrders();
   }
}
```

## Adding span tags{% #adding-span-tags %}

Add custom tags to your spans to provide additional context:

```csharp
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;

public class ShoppingCartController : Controller
{
    private IShoppingCartRepository _shoppingCartRepository;

    [HttpGet]
    public IActionResult Index(int customerId)
    {
      Activity? activity =
      Telemetry.ActivitySource.StartActivity("<RESOURCE NAME>")

        // Add a tag to the span for use in the Datadog web UI
        activity?.SetTag("customer.id", customerId.ToString());

        var cart = _shoppingCartRepository.Get(customerId);

        return View(cart);
    }
}
```

## Setting errors on spans{% #setting-errors-on-spans %}

Set error information on a span when an error occurs during its execution.

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

## Adding span events{% #adding-span-events %}

{% alert level="info" %}
Adding span events requires SDK version 2.53.0 or higher.
{% /alert %}

You can add span events using the `AddEvent` API. This method requires an `ActivityEvent`constructed with the `name` parameter and optionally accepts `attributes` and `timestamp` parameters. The method creates a new span event with the specified properties and associates it with the corresponding span.

- **Name** [*required*]: A string representing the event's name.
- **Timestamp** [*optional*]: A UNIX timestamp representing the event's occurrence time. Expects a `DateTimeOffset` object.
- **Attributes** [*optional*]: Zero or more key-value pairs with the following properties:
  - The key must be a non-empty string.
  - The value can be either:
    - A primitive type: string, Boolean, or number.
    - A homogeneous array of primitive type values (for example, an array of strings).
  - Nested arrays and arrays containing elements of different data types are not allowed.

The following examples demonstrate different ways to add events to a span:

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

Read the [OpenTelemetry](https://opentelemetry.io/docs/specs/otel/trace/api/#add-events) specification for more information.

## Propagating context with headers extraction and injection{% #propagating-context-with-headers-extraction-and-injection %}

You can configure the propagation of context for distributed traces by injecting and extracting headers. Read [Trace Context Propagation](http://localhost:1313/tracing/trace_collection/trace_context_propagation/) for information.

## Further Reading{% #further-reading %}

- [Explore your services, resources, and traces](http://localhost:1313/tracing/glossary/)
- [Interoperability of OpenTelemetry API and Datadog instrumented traces](http://localhost:1313/opentelemetry/guide/otel_api_tracing_interoperability)
