---
aliases:
- /ja/tracing/trace_collection/otel_instrumentation/dotnet/
- /ja/tracing/trace_collection/custom_instrumentation/otel_instrumentation/dotnet
code_lang: otel
code_lang_weight: 2
description: Instrument your .NET application with OpenTelemetry API, to send traces
  to Datadog.
further_reading:
- link: tracing/glossary/
  tag: Documentation
  text: Explore your services, resources, and traces
- link: /opentelemetry/guide/otel_api_tracing_interoperability
  tag: Documentation
  text: Interoperability of OpenTelemetry API and Datadog instrumented traces
title: .NET Custom Instrumentation using OpenTelemetry API
type: multi-code-lang
---

{{% otel-custom-instrumentation-lang %}}

## セットアップ

To configure OpenTelemetry to use the Datadog trace provider:

1. Add your desired manual OpenTelemetry instrumentation to your .NET code following the [OpenTelemetry .NET Manual Instrumentation documentation][5]. **Note**: Where those instructions indicate that your code should call the OpenTelemetry SDK, call the Datadog tracing library instead.

2. Install the Datadog .NET tracing library and enable the tracer for your [.NET Framework service][10] or your [.NET Core (and .NET 5+) service][11]. **Beta**: You can optionally do this with [Single Step APM Instrumentation][13].

3. `DD_TRACE_OTEL_ENABLED` 環境変数を `true` に設定します。

4. アプリケーションを実行します。

Datadog combines these OpenTelemetry spans with other Datadog APM spans into a single trace of your application. It also supports [OpenTelemetry instrumentation libraries][8].

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

## スパンの作成

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

## Adding span tags

Add custom tags to your spans to provide additional context:

{{< highlight csharp "hl_lines=15" >}}
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
{{< /highlight >}}

## Setting errors on spans

Set error information on a span when an error occurs during its execution.

```csharp
try
{
    // do work that can throw an exception
}
catch(Exception e)
{
    activity?.SetTag("error", 1);
    activity?.SetTag("error.msg", exception.Message);
    activity?.SetTag("error.stack", exception.ToString());
    activity?.SetTag("error.type", exception.GetType().ToString());
}
```

## ヘッダー抽出と挿入によるコンテキストの伝搬

You can configure the propagation of context for distributed traces by injecting and extracting headers. Read [Trace Context Propagation][14] for information.

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[5]: https://opentelemetry.io/docs/instrumentation/net/manual/
[8]: https://opentelemetry.io/docs/instrumentation/net/libraries/
[10]: /ja/tracing/trace_collection/dd_libraries/dotnet-framework/#installation-and-getting-started
[11]: /ja/tracing/trace_collection/dd_libraries/dotnet-core/#installation-and-getting-started
[13]: /ja/tracing/trace_collection/single-step-apm/
[14]: /ja/tracing/trace_collection/trace_context_propagation/dotnet/