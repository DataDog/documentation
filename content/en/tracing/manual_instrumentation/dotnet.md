---
title: .NET Manual Instrumentation
kind: documentation
decription: 'Manually instrument your .NET application to send custom traces to Datadog.'
further_reading:
    - link: 'tracing/guide/instrument_custom_method'
      tag: 'Guide'
      text: 'Instrument a custom method to get deep visibility into your business logic'
    - link: 'tracing/connect_logs_and_traces'
      tag: 'Documentation'
      text: 'Connect your Logs and Traces together'
    - link: 'tracing/opentracing'
      tag: 'Documentation'
      text: 'Implement Opentracing across your applications'
    - link: 'tracing/visualization/'
      tag: 'Documentation'
      text: 'Explore your services, resources, and traces'
---

If you are not using libraries supported by automatic instrumentation (see [Integrations][1]), you can instrument your code manually.

The following example uses the global `Tracer` and creates a custom [span][2] to [trace][3] a web request:

```csharp
using Datadog.Trace;

using(var scope = Tracer.Instance.StartActive("web.request"))
{
    var span = scope.Span;
    span.Type = SpanTypes.Web;
    span.ResourceName = request.Url;
    span.SetTag(Tags.HttpMethod, request.Method);

    // do some work...
}
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/setup/dotnet/#integrations
[2]: /tracing/visualization/#spans
[3]: /tracing/visualization/#trace
