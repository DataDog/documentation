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
    - /tracing/setup_overview/custom_instrumentation/dotnet
description: 'Manually instrument your .NET application to send custom traces to Datadog.'
further_reading:
    - link: 'tracing/guide/instrument_custom_method'
      tag: 'Guide'
      text: 'Instrument a custom method to get deep visibility into your business logic'
    - link: 'tracing/other_telemetry/connect_logs_and_traces'
      tag: 'Documentation'
      text: 'Connect your Logs and Traces together'
    - link: 'tracing/glossary/'
      tag: 'Documentation'
      text: 'Explore your services, resources, and traces'
    - link: 'https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples'
      tag: 'GitHub'
      text: '.NET code samples'
---

This page details common use cases for adding and customizing observability with Datadog APM. For a list of supported runtimes, see the [.NET Framework Compatibility Requirements][1] or the [.NET Core Compatibility Requirements][2].

There are several ways to get more instrumentation:

- [Through configuration](#instrument-methods-via-configuration). It requires automatic instrumentation and will not allow you to add specific tags.
- [Using attributes](#instrument-methods-via-attributes). It requires automatic instrumentation and will allow you to customize operation and resource names.
- [Using custom code](#custom-instrumentation-with-code). It can work alongside automatic instrumentation or without it. It gives you the most control on the spans.

Those solutions can be combined with one another.

## Instrument methods via configuration

<div class="alert alert-info">
  <strong>Note:</strong> This feature requires enabling automatic instrumentation for your application. For instructions on how to setup the .NET Tracer and enable automatic instrumentation, see the <a href="https://docs.datadoghq.com/tracing/setup/dotnet-framework/">.NET Framework setup instructions</a> or the <a href="https://docs.datadoghq.com/tracing/setup/dotnet-core/">.NET Core setup instructions</a>.
</div>

Using the `DD_TRACE_METHODS` environment variable, you can get visibility into unsupported frameworks without changing application code. For full details on the input format, see the [.NET Framework setup instructions][8] or the [.NET Core setup instructions][9]. For the following example, assume that the desired method to instrument is named `SaveSession` and the method is defined on the `Store.Managers.SessionManager` type:

```ini
DD_TRACE_METHODS=Store.Managers.SessionManager[SaveSession]
```

The resulting span has an `operationName` set to `trace.annotation` and `resourceName` set to `SaveSession`. If you would like to customize the span's attributes and you have the ability to modify the source code, you can [instrument methods via attributes](#instrument-methods-via-attributes) instead.

## Instrument methods via attributes

<div class="alert alert-info">
  <strong>Note:</strong> This feature requires adding the <a href="https://www.nuget.org/packages/Datadog.Trace.Annotations">Datadog.Trace.Annotations NuGet package</a> to your application and setting up automatic instrumentation. For instructions on how to setup the .NET Tracer and enable automatic instrumentation, see the <a href="https://docs.datadoghq.com/tracing/setup/dotnet-framework/">.NET Framework setup instructions</a> or the <a href="https://docs.datadoghq.com/tracing/setup/dotnet-core/">.NET Core setup instructions</a>.
</div>

Add `[Trace]` to methods for Datadog to trace them when running with automatic instrumentation. If automatic instrumentation is not enabled, this attribute has no effect on your application.

`[Trace]` attributes have the default operation name `trace.annotation` and resource name of the traced method. These can be set as named arguments of the `[Trace]` attribute to better reflect what is being instrumented.  Operation name and resource name are the only possible arguments that can be set for the `[Trace]` attribute.

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
  <strong>Note:</strong> To perform the steps outlined below, you need to add the <a href="https://www.nuget.org/packages/Datadog.Trace">Datadog.Trace NuGet package</a>. to your application. It provides an API to directly access the Tracer and the active span.
</div>

<div class="alert alert-warning">
  <strong>Note:</strong> When simultaneously using the `Datadog.Trace` NuGet package and automatic instrumentation, it is important to keep the versions in sync.
</div>

### Configuring Datadog in code

There are multiple ways to configure your application: using environment variables, a `web.config` file, or a `datadog.json` file, [as described in our documentation](https://docs.datadoghq.com/tracing/setup_overview/setup/dotnet-core/#configuration). This NuGet package also allows you to configure settings in code.

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

Calling `Tracer.Configure()` will replace the settings for all subsequent traces, both for custom instrumentation and for automatic instrumentation.

<div class="alert alert-warning">
  Replacing the configuration should be done <strong>once, as early as possible</strong> in your application.
</div>

### Create custom traces/spans

In addition to automatic instrumentation, the `[Trace]` attribute, and `DD_TRACE_METHODS` configurations, you can customize your observability by programmatically creating spans around any block of code.

To create and activate a custom span, use `Tracer.Instance.StartActive()`. If a trace is already active (when created by automatic instrumentation, for example), the span will be part of the current trace. If there is no current trace, a new one will be started.

> :warning: Ensure you dispose of the scope returned from StartActive. Disposing the scope will close the span, and ensure the trace is flushed to Datadog once all its spans are closed.

```csharp
using Datadog.Trace;

// Start a new span
using (var scope = Tracer.Instance.StartActive("custom-operation"))
{
    // Do something
}
```

Add custom [span tags][5] to your [spans][6] to customize your observability within Datadog.  The span tags are applied to your incoming traces, allowing you to correlate observed behavior with code-level information such as merchant tier, checkout amount, or user ID.

### Manually creating a new span

. Spans created in this manner integrate with other tracing mechanisms automatically. In other words, if a trace has already started, the manual span has its caller as its parent span. Similarly, any traced methods called from the wrapped block of code have the manual span as its parent.

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

### Headers extraction and injection

The Datadog APM Tracer supports [B3][5] and [W3C][6] headers extraction and injection for distributed tracing. For more information, see the [setup documentation][7].

In most cases, headers extraction and injection are transparent. There are some known cases where your distributed trace can be disconnected. For instance, when reading messages from a distributed queue, some libraries may lose the span context. It also happens if you set `DD_TRACE_KAFKA_CREATE_CONSUMER_SCOPE_ENABLED` to `false` when consuming Kafka messages. In that case, you can add a custom trace using the following code:

```csharp
var spanContextExtractor = new SpanContextExtractor();
var parentContext = spanContextExtractor.Extract(headers, (headers, key) => GetHeaderValues(headers, key));
var spanCreationSettings = new SpanCreationSettings() { Parent = parentContext };
using var scope = Tracer.Instance.StartActive("operation", spanCreationSettings);
```

Provide the `GetHeaderValues` method. The way this method is implemented depends on the structure that carries `SpanContext`.

Here are some examples:

```csharp
// Confluent.Kafka
IEnumerable<string> GetHeaderValues(Headers headers, string name)
{
    if (headers.TryGetLastBytes(name, out var bytes))
    {
        try
        {
            return new[] { Encoding.UTF8.GetString(bytes) };
        }
        catch (Exception)
        {
            // ignored
        }
    }

    return Enumerable.Empty<string>();
}

// RabbitMQ
IEnumerable<string> GetHeaderValues(IDictionary<string, object> headers, string name)
{
    if (headers.TryGetValue(name, out object value) && value is byte[] bytes)
    {
        return new[] { Encoding.UTF8.GetString(bytes) };
    }

    return Enumerable.Empty<string>();
}
```

When using the `SpanContextExtractor` API to trace Kafka consumer spans, set `DD_TRACE_KAFKA_CREATE_CONSUMER_SCOPE_ENABLED` to `false`. This ensures the consumer span is correctly closed immediately after the message is consumed from the topic, and the metadata (such as `partition` and `offset`) is recorded correctly. Spans created from Kafka messages using the `SpanContextExtractor` API are children of the producer span, and siblings of the consumer span.


## Adding tags globally to all spans

Use the `DD_TAGS` environment variable to set tags across all generated spans for an application. This can be useful for grouping stats for your applications, data centers, regions, etc. within the Datadog UI. For example:

```ini
DD_TAGS=datacenter:njc,key2:value2
```

## Resource filtering

You can exclude traces based on the resource name to remove Synthetics traffic such as health checks. For more information about security and additional configurations, see [Configure the Datadog Agent or Tracer for Data Security][10].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /tracing/trace_collection/compatibility/dotnet-framework
[2]: /tracing/trace_collection/compatibility/dotnet-core
[3]: https://www.nuget.org/packages/Datadog.Trace
[5]: /tracing/glossary/#span-tags
[6]: /tracing/glossary/#spans
[7]: /tracing/glossary/#trace
[8]: /tracing/trace_collection/dd_libraries/dotnet-framework
[9]: /tracing/trace_collection/dd_libraries/dotnet-core
[10]: /tracing/security
