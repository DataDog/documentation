---
title: Connecting .NET Logs and Traces
kind: documentation
description: 'Connect your .NET logs and traces to correlate them in Datadog.'
further_reading:
    - link: 'tracing/manual_instrumentation'
      tag: 'Documentation'
      text: 'Instrument manually your application to create traces.'
    - link: 'tracing/opentracing'
      tag: 'Documentation'
      text: 'Implement Opentracing across your applications.'
    - link: 'tracing/visualization/'
      tag: 'Documentation'
      text: 'Explore your services, resources, and traces'
    - link: 'https://www.datadoghq.com/blog/request-log-correlation/'
      tag: 'Blog'
      text: 'Correlate request logs with traces automatically'
    - link: '/logs/guide/ease-troubleshooting-with-cross-product-correlation/'
      tag: 'Guide'
      text: 'Ease troubleshooting with cross product correlation.'
---

You can set up your logging library and .NET tracing configurations so that trace and span IDs are injected into application logs, providing you with application performance monitoring data correlated with log data. 

Configure the .NET Tracer with [Unified Service Tagging][1] for the best experience and helpful context when correlating application traces and logs.

The .NET Tracer supports the following logging libraries:
- [Serilog][2] (v2.0+)
- [log4net][3]
- [NLog][4]
- [Microsoft.Extensions.Logging][5] (added in v1.28.6) 

## Getting started

To inject correlation identifiers into your log messages, follow the instructions for your logging library.

{{< tabs >}}
{{% tab "Serilog" %}}
To automatically inject correlation identifiers into your log messages:

1. Configure the .NET Tracer with the following tracer settings:
    - `DD_ENV`
    - `DD_SERVICE`
    - `DD_VERSION`

2. Enable log enrichment, as shown in the following example code:

```csharp
var log = new LoggerConfiguration()
    // Add Enrich.FromLogContext to emit Datadog properties
    .Enrich.FromLogContext()
    .WriteTo.File(new JsonFormatter(), "log.json")
    .CreateLogger();
```
For additional examples, see [the Serilog automatic trace ID injection project][1] on GitHub.


[1]: https://github.com/DataDog/dd-trace-dotnet/blob/master/tracer/samples/AutomaticTraceIdInjection/SerilogExample/Program.cs
{{% /tab %}}
{{% tab "log4net" %}}
To automatically inject correlation identifiers into your log messages:

1. Configure the .NET Tracer with the following tracer settings:
    - `DD_ENV`
    - `DD_SERVICE`
    - `DD_VERSION`

2. Enable mapped diagnostic context (MDC), as shown in the following example code:

```xml
  <layout type="log4net.Layout.SerializedLayout, log4net.Ext.Json">
    <decorator type="log4net.Layout.Decorators.StandardTypesDecorator, log4net.Ext.Json" />
    <default />
    <!--explicit default members-->
    <remove value="ndc" />
    <!--remove the default preformatted message member-->
    <remove value="message" />
    <!--add raw message-->
    <member value="message:messageobject" />
    <!-- Add value='properties' to emit Datadog properties -->
    <member value='properties'/>
  </layout>
```
For additional examples, see [the log4net automatic trace ID injection project][1] on GitHub.


[1]: https://github.com/DataDog/dd-trace-dotnet/blob/master/tracer/samples/AutomaticTraceIdInjection/Log4NetExample/log4net.config
{{% /tab %}}
{{% tab "NLog" %}}
To automatically inject correlation identifiers into your log messages:

1. Configure the .NET Tracer with the following tracer settings:
    - `DD_ENV`
    - `DD_SERVICE`
    - `DD_VERSION`

2. Enable mapped diagnostic context (MDC), as shown in the following example code for NLog version 4.6+:

```xml
 <!-- Add includeMdlc="true" to emit MDC properties -->
  <layout xsi:type="JsonLayout" includeMdlc="true">
    <attribute name="date" layout="${longdate}" />
    <attribute name="level" layout="${level:upperCase=true}"/>
    <attribute name="message" layout="${message}" />
    <attribute name="exception" layout="${exception:format=ToString}" />
  </layout>
```

For NLog version 4.5:

```xml
 <!-- Add includeMdc="true" to emit MDC properties -->
  <layout xsi:type="JsonLayout" includeMdc="true">
    <attribute name="date" layout="${longdate}" />
    <attribute name="level" layout="${level:upperCase=true}"/>
    <attribute name="message" layout="${message}" />
    <attribute name="exception" layout="${exception:format=ToString}" />
  </layout>
```
For additional examples, see the automatic trace ID injection projects using [NLog 4.0][1], [NLog 4.5][2], or [NLog 4.6][3] on GitHub.


[1]: https://github.com/DataDog/dd-trace-dotnet/blob/master/tracer/samples/AutomaticTraceIdInjection/NLog40Example/NLog.config
[2]: https://github.com/DataDog/dd-trace-dotnet/blob/master/tracer/samples/AutomaticTraceIdInjection/NLog45Example/NLog.config
[3]: https://github.com/DataDog/dd-trace-dotnet/blob/master/tracer/samples/AutomaticTraceIdInjection/NLog46Example/NLog.config

{{% /tab %}}
{{% tab "Microsoft.Extensions.Logging" %}}
To automatically inject correlation identifiers into your log messages:

1. Configure the .NET Tracer with the following tracer settings:
    - `DD_ENV`
    - `DD_SERVICE`
    - `DD_VERSION`

2. Enable auto-instrumentation tracing of your app by following the [instructions to install the .NET Tracer][1].

3. Enable [log scopes][2] for your logging provider, as shown in the example code. Only providers that support log scopes will have correlation identifiers injected.

```csharp
Host.CreateDefaultBuilder(args)
    .ConfigureLogging(logging => 
    {
        logging.AddFile(opts =>
        {
            opts.IncludeScopes = true; // must include scopes so that correlation identifiers are added
            opts.FormatterName = "json";
        });
    }
```

If there is an active trace when the log is being written, trace and span IDs are automatically injected into the application logs with `dd_trace_id` and `dd_span_id` properties. If there is not an active trace, only `dd_env`, `dd_service`, and `dd_version` properties are injected.

**Note:** If you are using a logging library that replaces the default `LoggerFactory` implementation such as the [_Serilog.Extensions.Hosting_][3] or [_Serilog.Extensions.Logging_][4] packages, follow the framework-specific instructions (in this example, see **Serilog**).

For additional examples, see [the Microsoft.Extensions.Logging automatic trace id injection project][5] on GitHub.

[1]: https://docs.datadoghq.com/tracing/setup_overview/setup/dotnet-core/
[2]: https://docs.microsoft.com/aspnet/core/fundamentals/logging/#log-scopes-1
[3]: https://github.com/serilog/serilog-extensions-hosting
[4]: https://github.com/serilog/serilog-extensions-logging
[5]: https://github.com/DataDog/dd-trace-dotnet/blob/master/tracer/samples/AutomaticTraceIdInjection/MicrosoftExtensionsExample/Program.cs

{{% /tab %}}
{{< /tabs >}}

Next, complete the setup for either automatic or manual injection.

## Automatic injection

The final step to enable automatic correlation identifier injection is to:

1. Enable `DD_LOGS_INJECTION=true` in the .NET Tracer’s environment variables. To configure the .NET Tracer with a different method, see [Configuring the .NET Tracer][6].

After configuring the correlation identifier injection, see [C# Log Collection][7] to configure your log collection.

## Manual injection

If you prefer to manually correlate your traces with your logs, you can add correlation identifiers to your logs.

  | Required key   | Description                                  |
  | -------------- | -------------------------------------------- |
  | `dd.env`       | Globally configures the `env` for the tracer. Defaults to `""` if not set. |
  | `dd.service`   | Globally configures the root service name. Defaults to the name of the application or IIS site name if not set.  |
  | `dd.version`   | Globally configures `version` for the service. Defaults to `""` if not set.  |
  | `dd.trace_id`  | Active trace ID during the log statement. Defaults to `0` if no trace.  |
  | `dd.span_id`   | Active span ID during the log statement. Defaults to `0` if no trace. |


**Note:** If you are not using a [Datadog Log Integration][7] to parse your logs, custom log parsing rules must parse `dd.trace_id` and `dd.span_id` as strings. For information, see the [FAQ on this topic][8].

After completing Step 1 and 2 [above](#getting-started), finish your manual log enrichment setup:

1. Reference the [`Datadog.Trace` NuGet package][9] in your project.

2. Use the `CorrelationIdentifier` API to retrieve correlation identifiers and add them to the log context while a span is active.

Lastly, see [C# Log Collection][7] to configure your log collection.

Examples:

{{< tabs >}}
{{% tab "Serilog" %}}

**Note**: The Serilog library requires message property names to be valid C# identifiers. The required property names are: `dd_env`, `dd_service`, `dd_version`, `dd_trace_id`, and `dd_span_id`.

```csharp
using Datadog.Trace;
using Serilog.Context;

// there must be spans started and active before this block.
using (LogContext.PushProperty("dd_env", CorrelationIdentifier.Env))
using (LogContext.PushProperty("dd_service", CorrelationIdentifier.Service))
using (LogContext.PushProperty("dd_version", CorrelationIdentifier.Version))
using (LogContext.PushProperty("dd_trace_id", CorrelationIdentifier.TraceId.ToString()))
using (LogContext.PushProperty("dd_span_id", CorrelationIdentifier.SpanId.ToString()))
{
    // Log something
}
```

{{% /tab %}}
{{% tab "log4net" %}}

```csharp
using Datadog.Trace;
using log4net;

// there must be spans started and active before this block.
try
{
    LogicalThreadContext.Properties["dd.env"] = CorrelationIdentifier.Env;
    LogicalThreadContext.Properties["dd.service"] = CorrelationIdentifier.Service;
    LogicalThreadContext.Properties["dd.version"] = CorrelationIdentifier.Version;
    LogicalThreadContext.Properties["dd.trace_id"] = CorrelationIdentifier.TraceId.ToString();
    LogicalThreadContext.Properties["dd.span_id"] = CorrelationIdentifier.SpanId.ToString();

    // Log something

}
finally
{
    LogicalThreadContext.Properties.Remove("dd.env");
    LogicalThreadContext.Properties.Remove("dd.service");
    LogicalThreadContext.Properties.Remove("dd.version");
    LogicalThreadContext.Properties.Remove("dd.trace_id");
    LogicalThreadContext.Properties.Remove("dd.span_id");
}
```

{{% /tab %}}
{{% tab "NLog" %}}

```csharp
using Datadog.Trace;
using NLog;

// there must be spans started and active before this block.
using (MappedDiagnosticsLogicalContext.SetScoped("dd.env", CorrelationIdentifier.Env))
using (MappedDiagnosticsLogicalContext.SetScoped("dd.service", CorrelationIdentifier.Service))
using (MappedDiagnosticsLogicalContext.SetScoped("dd.version", CorrelationIdentifier.Version))
using (MappedDiagnosticsLogicalContext.SetScoped("dd.trace_id", CorrelationIdentifier.TraceId.ToString()))
using (MappedDiagnosticsLogicalContext.SetScoped("dd.span_id", CorrelationIdentifier.SpanId.ToString()))
{
    // Log something
}
```

{{% /tab %}}
{{% tab "Microsoft.Extensions.Logging" %}}

```csharp
using Datadog.Trace;
using Microsoft.Extensions.Logging;

ILogger _logger;

// there must be spans started and active before this block.
using(_logger.BeginScope(new Dictionary<string, object>
{
    {"dd.env", CorrelationIdentifier.Env},
    {"dd.service", CorrelationIdentifier.Service},
    {"dd.version", CorrelationIdentifier.Version},
    {"dd.trace_id", CorrelationIdentifier.TraceId.ToString()},
    {"dd.span_id", CorrelationIdentifier.SpanId.ToString()},
}))
{
    // Log something
}
```

{{% /tab %}}
{{< /tabs >}}


## Configure log collection

Ensure that log collection is configured in the Datadog Agent and that the [Logs Agent configuration][10] for the specified files to tail is set to `source: csharp` so log pipelines can parse the log files. For more information, see [C# Log Collection][7].

<div class="alert alert-warning"><strong>Note:</strong> Automatic log collection only works for logs formatted as JSON. Alternatively, use custom parsing rules.</div>

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/tagging/unified_service_tagging
[2]: http://serilog.net
[3]: https://logging.apache.org/log4net
[4]: http://nlog-project.org
[5]: https://docs.microsoft.com/en-us/dotnet/core/extensions/logging
[6]: /tracing/setup_overview/setup/dotnet-core/#configuring-the-net-tracer
[7]: /logs/log_collection/csharp/
[8]: /tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel/?tab=custom
[9]: https://www.nuget.org/packages/Datadog.Trace/
[10]: /logs/log_collection/csharp/#configure-your-datadog-agent
