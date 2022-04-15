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
For instructions on how to setup the .NET Tracer and enable automatic instrumentation, see the <a href="https://docs.datadoghq.com/tracing/setup/dotnet/">.NET setup instructions</a>.
</div>

**Note:** When using both custom and automatic instrumentation, it is important to keep the MSI installer and NuGet package versions in sync.

This page details common use cases for adding and customizing observability with Datadog APM.

Add the `Datadog.Trace` [NuGet package][1] to your application. To create new spans, access the global tracer through the `Datadog.Trace.Tracer.Instance` property.

Custom instrumentation is supported on **.NET Framework 4.6.1+** for Windows, on **.NET Core 2.0+** for Windows and Linux, and on **.NET 5** and **.NET 6** for Windows and Linux.


## Add tags and spans

To customize your observability within Datadog, add custom [span tags][2] to your [spans][3].  Span tags are applied to your incoming traces, allowing you to correlate observed behavior with code-level information such as merchant tier, checkout amount, user ID, etc.


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
        // Access the active scope through
        // the global tracer (can return null)
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

**Note**: `Datadog.Trace.Tracer.Instance.ActiveScope` returns `null` if there is no active span.



### Adding tags globally to all spans

Use the `DD_TAGS` environment variable (at the Agent level) to set tags across all generated spans for an application. This can be useful for grouping stats for your applications, data centers, regions, etc. within the Datadog UI. For example:

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

This sets three tags on the span: `"error.msg":exception.Message`,  `"error.stack":exception.ToString()`, and `"error.type":exception.GetType().ToString()`.

### Manually creating a new span

Customize your observability by programmatically creating spans around any block of code. Spans created in this manner integrate with other tracing mechanisms automatically. In other words, if a trace has already started, the manual span has its caller as its parent span. Similarly, any traced methods called from the wrapped block of code have the manual span as its parent.

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

### Headers extraction and injection

Datadog APM tracer supports [B3][5] and [W3C][6] headers extraction and injection for distributed tracing.

Distributed headers injection and extraction is controlled by configuring injection/extraction styles. Currently four styles are supported:

- Datadog: `Datadog`
- B3: `B3`
- W3C: `TraceParent`
- B3 Single Header: `B3SingleHeader` or `B3 single header`

Injection and extraction styles can be configured using:

- Environment Variable: `DD_PROPAGATION_STYLE_INJECT=Datadog, B3, W3C`
- Environment Variable: `DD_PROPAGATION_STYLE_EXTRACT=Datadog, B3, W3C`

The values of these environment variables are comma separated lists of header styles that are enabled for injection or extraction. By default only `Datadog` injection style is enabled.

If multiple extraction styles are enabled extraction attempt is done on the order those styles are configured and first successful extracted value is used.

## Resource filtering

Traces can be excluded based on their resource name, to remove synthetic traffic such as health checks from reporting traces to Datadog. This and other security and fine-tuning configurations can be found on the [Security][7] page.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://www.nuget.org/packages/Datadog.Trace
[2]: /tracing/visualization/#span-tags
[3]: /tracing/visualization/#spans
[4]: /tracing/visualization/trace/?tab=spantags#more-information
[5]: https://github.com/openzipkin/b3-propagation
[6]: https://www.w3.org/TR/trace-context/#traceparent-header
[7]: /tracing/security
