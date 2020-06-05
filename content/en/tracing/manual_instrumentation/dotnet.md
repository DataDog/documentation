---
title: .NET Custom Instrumentation
kind: documentation
aliases:
    - /tracing/opentracing/dotnet
decription: 'Manually instrument your .NET application to send custom traces to Datadog.'
further_reading:
    - link: 'tracing/guide/instrument_custom_method'
      tag: 'Guide'
      text: 'Instrument a custom method to get deep visibility into your business logic'
    - link: 'tracing/connect_logs_and_traces'
      tag: 'Documentation'
      text: 'Connect your Logs and Traces together'
    - link: 'tracing/visualization/'
      tag: 'Documentation'
      text: 'Explore your services, resources, and traces'
---
This page details common use cases for adding and customizing observability with Datadog APM.

Add the `Datadog.Trace` [NuGet package][1] to your application. In your code, access the global tracer through the `Datadog.Trace.Tracer.Instance` property to create new spans.

This is supported on **.NET Framework 4.5** and above on Windows and on **.NET Core 2.1, 3.0, and 3.1** on Windows and Linux.


## Adding Tags & Spans

Add custom [span tags][2] to your [spans][3] to customize your observability within Datadog.  The span tags are applied to your incoming traces, allowing you to correlate observed behavior with code-level information such as merchant tier, checkout amount, or user ID.


### Add custom span tags

Add custom tags to your spans corresponding to any dynamic value within your application code such as `customer.id`.

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



### Adding tags globally to all spans

The `DD_TAGS` environment variable allows setting tags across all generated spans for an application. This can be useful for grouping stats for your applications, datacenters, or any other tags you would like to see within the Datadog UI.

```ini
DD_TAGS=datacenter:njc,key2:value2
```

### Set errors on a span

To recognize and mark errors that occur in your code, utilize the `Span.SetException(Exception)` method available to spans. The method marks the span as an error and adds [related span metadata][4] to provide insight into the exception.

```csharp
try
{
    // do work that can throw an exception
}
catch(Exception e)
{
    span.SetException(e);
}
```

This will set 3 tags on the span, `"error.msg":exception.Message`,   `"error.stack":exception.ToString()`, and `"error.type":exception.GetType().ToString()`.

### Manually creating a new span

Customize your observability by programmatically creating spans around any block of code.  Spans created in this manner integrate with other tracing mechanisms automatically. In other words, if a trace has already started, the manual span will have its caller as its parent span. Similarly, any traced methods called from the wrapped block of code will have the manual span as its parent.

```csharp
using (var parentScope = Tracer.Instance.StartActive("manual.sortorders"))
{
    using (var childScope = Tracer.Instance.StartActive("manual.sortorders.child"))
    {
        // Nest using statements around code you would like to trace
        SortOrders();
    }
}
```

<br>

## Resource Filtering for Health Checks & other endpoints

The Agent can be configured to exclude a specific Resource from Traces sent by the Agent to the Datadog application. To prevent the submission of specific Resources, use the `ignore_resources` setting in the `datadog.yaml` file . This setting enables the creation of a list containing one or more regular expressions, which instructs the Agent to filter out Traces based on their Resource name.

If you are running in a containerized environment, set `DD_APM_IGNORE_RESOURCES` on the container with the Datadog Agent instead. To learn more, [click here][5].

This can be useful for excluding any Health Checks or otherwise simulated traffic from the calculation of metrics for your services.
```text
## @param ignore_resources - list of strings - optional
## A blacklist of regular expressions can be provided to disable certain traces based on their resource name
## all entries must be surrounded by double quotes and separated by commas.
# ignore_resources: ["(GET|POST) /healthcheck"]
```

<br>

## OpenTracing

Datadog also supports the OpenTracing standard.  For more details and information, view the [OpenTracing API][6].

### Setup
For OpenTracing support, add the `Datadog.Trace.OpenTracing` [NuGet package][7] to your application. During application start-up, initialize the OpenTracing library:

```csharp
using Datadog.Trace.OpenTracing;

public void ConfigureServices(IServiceCollection services)
{
    // create an OpenTracing ITracer with default setting
    OpenTracing.ITracer tracer = OpenTracingTracerFactory.CreateTracer();

    // to use tracer with ASP.NET Core dependency injection
    services.AddSingleton<ITracer>(tracer);

    // to use tracer with OpenTracing.GlobalTracer.Instance
    GlobalTracer.Register(tracer);
}
```

### Manually instrument a method

Use OpenTracing to create a span.

```csharp
using (var scope =
Tracer.Instance.StartActive("manual.sortorders"))
{
    SortOrders();
}
```

### Asynchronous traces

To trace any code being run in an asynchronous task, create a new scope within the background task, just as you would wrap synchronous code.
```csharp
 Task.Run(
     () =>
     {
         using (var scope = Tracer.Instance.StartActive("manual.sortorders.async"))
         {
             SortOrders();
         }
     });

```


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://www.nuget.org/packages/Datadog.Trace
[2]: /tracing/visualization/#span-tags
[3]: /tracing/visualization/#spans
[4]: /tracing/visualization/trace/?tab=spantags#more-information
[5]: /agent/docker/apm/?tab=standard#docker-apm-agent-environment-variables
[6]: https://github.com/opentracing/opentracing-csharp
[7]: https://www.nuget.org/packages/Datadog.Trace.OpenTracing
