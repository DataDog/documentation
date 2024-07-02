---
title: .NET Custom Instrumentation using Datadog API
kind: documentation
code_lang: dd-api
type: multi-code-lang
code_lang_weight: 1
aliases:
    - /tracing/opentracing/dotnet
    - /tracing/manual_instrumentation/dotnet
    - /tracing/custom_instrumentation/dotnet
    - /tracing/setup_overview/custom_instrumentation/dotnet
    - /tracing/trace_collection/custom_instrumentation/dotnet
    - /tracing/trace_collection/custom_instrumentation/dd_libraries/dotnet
description: 'Manually instrument your .NET application to send custom traces to Datadog.'
further_reading:
    - link: tracing/guide/instrument_custom_method
      tag: Guide
      text: Instrument a custom method to get deep visibility into your business logic
    - link: tracing/other_telemetry/connect_logs_and_traces
      tag: Documentation
      text: Connect your Logs and Traces together
    - link: tracing/glossary/
      tag: Documentation
      text: Explore your services, resources, and traces
    - link: "https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples"
      tag: ソースコード
      text: .NET code samples
---

<div class="alert alert-info">
If you have not yet read the instructions for automatic instrumentation and setup, start with the <a href="https://docs.datadoghq.com/tracing/setup/dotnet-core/">.NET/.NET Core</a> or <a href="https://docs.datadoghq.com/tracing/setup/dotnet-framework/">.NET Framework</a> Setup Instructions.
</div>

This page details common use cases for adding and customizing observability with Datadog APM. For a list of supported runtimes, see the [.NET Framework Compatibility Requirements][1] or the [.NET Core Compatibility Requirements][2].

There are several ways to get more than the [default automatic instrumentation][3]:

- [Through configuration](#instrument-methods-through-configuration), which does not allow you to add specific tags.
- [Using attributes](#instrument-methods-through-attributes), which allows you to customize operation and resource names.
- [Using custom code](#custom-instrumentation-with-code), which gives you the most control on the spans.

You can combine these solutions with each other to achieve the instrumentation detail you want. However, automatic instrumentation must be setup first.

## Instrument methods through configuration

Using the `DD_TRACE_METHODS` environment variable, you can get visibility into unsupported frameworks without changing application code. For full details on the input format for `DD_TRACE_METHODS`, see the [.NET Framework configuration instructions][8] or the [.NET Core configuration instructions][9]. For example, to instrument a method called `SaveSession` defined on the `Store.Managers.SessionManager` type, set:

```ini
DD_TRACE_METHODS=Store.Managers.SessionManager[SaveSession]
```

The resulting span has an `operationName` attribute with the value `trace.annotation` and a `resourceName` attribute with the value `SaveSession`.

If you want to customize the span's attributes and you have the ability to modify the source code, you can [instrument methods through attributes](#instrument-methods-through-attributes) instead.

## Instrument methods through attributes

Add `[Trace]` to methods for Datadog to trace them when running with automatic instrumentation. If automatic instrumentation is not enabled, this attribute has no effect on your application.

`[Trace]` attributes have the default operation name `trace.annotation` and resource name of the traced method. You can set **operation name** and **resource name** as named arguments of the `[Trace]` attribute to better reflect what is being instrumented. Operation name and resource name are the only possible arguments that can be set for the `[Trace]` attribute. For example:

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

## Custom instrumentation with code

<div class="alert alert-info">
  <strong>Note</strong>: This feature requires adding the <a href="https://www.nuget.org/packages/Datadog.Trace"><code>Datadog.Trace</code> NuGet package</a>. to your application. It provides an API to directly access the Tracer and the active span.
</div>

<div class="alert alert-warning">
  <strong>Note</strong>: When using both the <code>Datadog.Trace</code> NuGet package and automatic instrumentation, it is important to keep the versions in sync.
</div>

### Configuring Datadog in code

There are multiple ways to configure your application: using environment variables, a `web.config` file, or a `datadog.json` file, [as described in our documentation][11]. The `Datadog.Trace` NuGet package also allows you to configure settings in code.

To override configuration settings, create an instance of `TracerSettings`, and pass it to the static `Tracer.Configure()` method:

```csharp
using Datadog.Trace;

// Create a settings object using the existing
// environment variables and config sources
var settings = TracerSettings.FromDefaultSources();

// Override a value
settings.GlobalTags.Add("SomeKey", "SomeValue");

// Replace the tracer configuration
Tracer.Configure(settings);
```

Calling `Tracer.Configure()` replaces the settings for all subsequent traces, both for custom instrumentation and for automatic instrumentation.

<div class="alert alert-warning">
  Replacing the configuration should be done <strong>once, as early as possible</strong> in your application.
</div>

### Create custom traces/spans

In addition to automatic instrumentation, the `[Trace]` attribute, and `DD_TRACE_METHODS` configurations, you can customize your observability by programmatically creating spans around any block of code.

To create and activate a custom span, use `Tracer.Instance.StartActive()`. If a trace is already active (when created by automatic instrumentation, for example), the span is part of the current trace. If there is no current trace, a new one is started.

<div class="alert alert-warning"><strong>Warning</strong>: Ensure you dispose of the scope returned from <code>StartActive</code>. Disposing the scope closes the span, and ensures the trace is flushed to Datadog once all its spans are closed.
</div>

```csharp
using Datadog.Trace;

// Start a new span
using (var scope = Tracer.Instance.StartActive("custom-operation"))
{
    // Do something
}
```

Add custom [span tags][5] to your [spans][6] to customize your observability within Datadog. The span tags are applied to your incoming traces, allowing you to correlate observed behavior with code-level information such as merchant tier, checkout amount, or user ID.

### Manually creating a new span

Manually created spans automatically integrate with spans from other tracing mechanisms. In other words, if a trace has already started, the manual span has its caller as its parent span. Similarly, any traced methods called from the wrapped block of code have the manual span as its parent.

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

### Add custom span tags

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

### Set errors on a span

To mark errors that occur in your code, use the `Span.SetException(Exception)` method. The method marks the span as an error and adds [related span metadata][5] to provide insight into the exception.

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

This sets the following tags on the span:
- `"error.msg":exception.Message`
- `"error.stack":exception.ToString()`
- `"error.type":exception.GetType().ToString()`

## Propagating context with headers extraction and injection

You can configure the propagation of context for distributed traces by injecting and extracting headers. Read [Trace Context Propagation][12] for information.

## Adding tags globally to all spans

Use the `DD_TAGS` environment variable to set tags across all generated spans for an application. This can be useful for grouping stats for your applications, data centers, or regions within the Datadog UI. For example:

```ini
DD_TAGS=datacenter:njc,key2:value2
```

## Resource filtering

You can exclude traces based on the resource name to remove Synthetics traffic such as health checks. For more information about security and additional configurations, see [Configure the Datadog Agent or Tracer for Data Security][10].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /tracing/trace_collection/compatibility/dotnet-framework
[2]: /tracing/trace_collection/compatibility/dotnet-core
[3]: /tracing/trace_collection/dd_libraries/dotnet-core
[5]: /tracing/glossary/#span-tags
[6]: /tracing/glossary/#spans
[7]: /tracing/glossary/#trace
[8]: /tracing/trace_collection/library_config/dotnet-framework/#automatic-instrumentation-optional-configuration
[9]: /tracing/trace_collection/library_config/dotnet-core/#automatic-instrumentation-optional-configuration
[10]: /tracing/security
[11]: /tracing/trace_collection/library_config/dotnet-core/
[12]: /tracing/trace_collection/trace_context_propagation/dotnet/
