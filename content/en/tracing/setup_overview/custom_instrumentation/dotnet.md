---
title: .NET Custom Instrumentation
kind: documentation
code_lang: dotnet
type: multi-code-lang
code_lang_weight: 80
aliases:
    - /tracing/opentracing/dotnet
    - /tracing/manual_instrumentation/dotnet
    - /tracing/custom_instrumentation/dotnet
description: 'Manually instrument your .NET application to send custom traces to Datadog.'
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
    - link: 'https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples'
      tag: 'GitHub'
      text: '.NET code samples'
---
<div class="alert alert-info">
For instructions on how to setup the .NET Tracer and enable automatic instrumentation, see the <a href="https://docs.datadoghq.com/tracing/setup/dotnet-framework/">.NET Framework setup instructions</a> or the <a href="https://docs.datadoghq.com/tracing/setup/dotnet-core/">.NET Core setup instructions</a>.
</div>

This page details common use cases for adding and customizing observability with Datadog APM. For a list of supported runtimes, see the [.NET Framework Compatibility Requirements][1] or the [.NET Core Compatibility Requirements][2]. To perform the steps outlined below, you may need to add NuGet package references to one or more of the following libraries:

- `Datadog.Trace` [NuGet package][3]: This library provides an API to directly access the Tracer and the active span. **Note:** When simultaneously using the `Datadog.Trace` NuGet package and automatic instrumentation, it is important to keep the versions in sync.
- `Datadog.Trace.Annotations` [NuGet package][4]: This library provides .NET attributes that can be applied to your code to enable additional automatic instrumentation features.

## Adding tags

Add custom [span tags][5] to your [spans][6] to customize your observability within Datadog.  The span tags are applied to your incoming traces, allowing you to correlate observed behavior with code-level information such as merchant tier, checkout amount, or user ID.

### Add custom span tags

<div class="alert alert-warning">
  <strong>Note:</strong> This requires adding the `Datadog.Trace` NuGet package to your application.
</div>

Add custom tags to your spans corresponding to any dynamic value within your application code such as `customer.id`.

```csharp
using Datadog.Trace;

public class ShoppingCartController : Controller
{
    private IShoppingCartRepository _shoppingCartRepository;

    [HttpGet]
    public IActionResult Index(int customerId)
    {
        // Access the active scope through the global tracer
        // Note: This can return null if there is no active span
        var scope = Tracer.Instance.ActiveScope;

        if (scope != null)
        {
            // Add a tag to the span for use in the Datadog web UI
            scope.Span.SetTag("customer.id", customerId.ToString());
        }

        var cart = _shoppingCartRepository.Get(customerId);

        return View(cart);
    }
}
```

### Adding tags globally to all spans

Use the `DD_TAGS` environment variable to set tags across all generated spans for an application. This can be useful for grouping stats for your applications, data centers, regions, etc. within the Datadog UI. For example:

```ini
DD_TAGS=datacenter:njc,key2:value2
```

### Set errors on a span

<div class="alert alert-warning">
  <strong>Note:</strong> This requires adding the `Datadog.Trace` NuGet package to your application.
</div>

To mark errors that occur in your code, utilize the `Span.SetException(Exception)` method. The method marks the span as an error and adds [related span metadata][5] to provide insight into the exception.

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

This sets three tags on the span: `"error.msg":exception.Message`,  `"error.stack":exception.ToString()`, and `"error.type":exception.GetType().ToString()`.

## Adding spans

If you aren’t using a supported framework instrumentation for [.NET Framework][1] or [.NET Core][2], or you would like additional depth in your application's [traces][7], you may want to add custom instrumentation to your code for complete flame graphs or to measure execution times for pieces of code.

If modifying application code is not possible, use the environment variable `DD_TRACE_METHODS` to detail these methods.

If you have existing `[Trace]` or similar attributes, or prefer to use attributes to complete any incomplete traces within Datadog, use Trace Annotations.

### Datadog trace methods

<div class="alert alert-warning">
  <strong>Note:</strong> This requires enabling automatic instrumentation for your application.
</div>

Using the `DD_TRACE_METHOD` environment variable, you can get visibility into unsupported frameworks without changing application code. For full details on the input format, see the [.NET Framework setup instructions][8] or the [.NET Core setup instructions][9]. For the following example, assume that the desired method to instrument is named `SaveSession` and the method is defined on the `Store.Managers.SessionManager` type:

```ini
DD_TRACE_METHODS=Store.Managers.SessionManager[SaveSession]
```

The only difference between this approach and using `[Trace]` attributes is the customization options for the operation and resource names.  With DD Trace Methods, `operationName` is `trace.annotation` and `resourceName` is `SaveSession`.

### Trace annotations

<div class="alert alert-warning">
  <strong>Note:</strong> This requires adding the `Datadog.Trace.Annotations` NuGet package and enabling automatic instrumentation for your application.
</div>

Add `[Trace]` to methods to have them be traced when running with automatic instrumentation. If automatic instrumentation is not enabled, this attribute has no effect on your application.

`[Trace]` attributes have the default operation name `trace.annotation` and resource name of the traced method. These can be set as arguments of the `[Trace]` attribute to better reflect what is being instrumented.  These are the only possible arguments that can be set for the `[Trace]` attribute.

```csharp
using Datadog.Trace.Annotations;

namespace Store.Managers
{
    public class SessionManager
    {
        [Trace(OperationName = "database.persist", ResourceName = "SessionManager.SaveSession")]
        public static void SaveSession()
        {
            // your method implementation here
        }
    }
}
```

### Manually creating a new span

<div class="alert alert-warning">
  <strong>Note:</strong> This requires adding the `Datadog.Trace` NuGet package to your application.
</div>

In addition to automatic instrumentation, the `[Trace]` attribute, and `DD_TRACE_METHODS` configurations, you can customize your observability by programmatically creating spans around any block of code. Spans created in this manner integrate with other tracing mechanisms automatically. In other words, if a trace has already started, the manual span has its caller as its parent span. Similarly, any traced methods called from the wrapped block of code have the manual span as its parent.

```csharp
using (var parentScope =
       Tracer.Instance.StartActive("manual.sortorders"))
{
    parentScope.Span.ResourceName = "<RESOURCE NAME>";
    using (var childScope =
           Tracer.Instance.StartActive("manual.sortorders.child"))
    {
        // Nest using statements around the code to trace
        childScope.Span.ResourceName = "<RESOURCE NAME>";
        SortOrders();
    }
}
```
## Resource filtering

Traces can be excluded based on their resource name, to remove synthetic traffic such as health checks from reporting traces to Datadog.  This and other security and fine-tuning configurations can be found on the [Security][10] page or in [Ignoring Unwanted Resources][11].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /tracing/setup_overview/compatibility_requirements/dotnet-framework
[2]: /tracing/setup_overview/compatibility_requirements/dotnet-core
[3]: https://www.nuget.org/packages/Datadog.Trace
[4]: https://www.nuget.org/packages/Datadog.Trace.Annotations
[5]: /tracing/visualization/#span-tags
[6]: /tracing/visualization/#spans
[7]: /tracing/visualization/#trace
[8]: /tracing/setup_overview/setup/dotnet-framework
[9]: /tracing/setup_overview/setup/dotnet-core
[10]: /tracing/security
[11]: /tracing/guide/ignoring_apm_resources/
