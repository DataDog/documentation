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
---

## Automatically inject trace and span IDs

<div class="alert alert-info"><strong>Note:</strong> Automatic injection works only for logs formatted as JSON. Otherwise, use manual injection.</div>

The .NET Tracer can automatically inject trace IDs and span IDs into your application logs. Configure the .NET Tracer with [Unified Service Tagging][1] for the best experience and helpful context when correlating application traces and logs.

The .NET Tracer supports:
- [Serilog][2]
- [log4net][3]
- [NLog][4] (version 4.0+)


### Getting started

1. In the .NET Tracer’s environment variables, enable  `DD_LOGS_INJECTION=true`. For alternative ways to configure the .NET Tracer, see [Configuring the .NET Tracer][5].

2. Configure the .NET Tracer with the following tracer settings:
    - `DD_ENV`
    - `DD_SERVICE`
    - `DD_VERSION`

3. In the [logs Agent configuration][6] for the specified files to tail, set `source: csharp` so that log pipelines can parse the log files.

4. Update the logging configuration based on the logging library:

    | Required key   | Description                                  |
    | -------------- | -------------------------------------------- |
    | `dd.env`       | Globally configures the `env` for the tracer. Defaults to `""` if not set. |
    | `dd.service`   | Globally configures the root service name. Defaults to the name of the application or IIS site name if not set.  |
    | `dd.version`   | Globally configures `version` for the service. Defaults to `""` if not set.  |
    | `dd.trace_id`  | Active trace ID during the log statement. Defaults to `0` if no trace.  |
    | `dd.span_id`   | Active span ID during the log statement. Defaults to `0` if no trace. |

Examples:

{{< tabs >}}
{{% tab "Serilog" %}}
Trace and span IDs are injected into application logs only after you enable log context enrichment, as shown in the following example code: 

```csharp
var log = new LoggerConfiguration()
    // Add Enrich.FromLogContext to emit Datadog properties
    .Enrich.FromLogContext()
    .WriteTo.File(new JsonFormatter(), "log.json")
    .CreateLogger();
```
For additional examples, see [the Serilog automatic trace ID injection project][1] on GitHub.


[1]: https://github.com/DataDog/dd-trace-dotnet/blob/master/samples/AutomaticTraceIdInjection/SerilogExample/Program.cs
{{% /tab %}}
{{% tab "log4net" %}}
Trace and span IDs are injected into application logs only after you enable mapped diagnostic context (MDC), as shown in the following example code:

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


[1]: https://github.com/DataDog/dd-trace-dotnet/blob/master/samples/AutomaticTraceIdInjection/Log4NetExample/log4net.config
{{% /tab %}}
{{% tab "NLog" %}}

Trace and span IDs are injected into application logs only after you enable mapped diagnostic context (MDC), as shown in the following example code for NLog version 4.6+:

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
For additional examples, see the automatic trace ID injection projects using [NLog 4.5][1] or [NLog 4.6][2] on GitHub.


[1]: https://github.com/DataDog/dd-trace-dotnet/blob/master/samples/AutomaticTraceIdInjection/NLog45Example/NLog.config
[2]: https://github.com/DataDog/dd-trace-dotnet/blob/master/samples/AutomaticTraceIdInjection/NLog46Example/NLog.config
{{% /tab %}}
{{< /tabs >}}


## Manually inject trace and span IDs

**Note:** If you are not using a [Datadog Log Integration][7] to parse your logs, custom log parsing rules must parse `dd.trace_id` and `dd.span_id` as strings. For information, see the [FAQ on this topic][8].

To manually correlate your [APM traces][9] with application logs:

1. Reference the [`Datadog.Trace` NuGet package][10] in your project.

2. Use the `CorrelationIdentifier` API to retrieve correlation identifiers and add them to the log context while a span is active.

3. Update the logging configuration based on the logging library:

    | Required key   | Description                                  |
    | -------------- | -------------------------------------------- |
    | `dd.env`       | Globally configures the `env` for the tracer. Defaults to `""` if not set. |
    | `dd.service`   | Globally configures the root service name. Defaults to the name of the application or IIS site name if not set.  |
    | `dd.version`   | Globally configures `version` for the service. Defaults to `""` if not set.  |
    | `dd.trace_id`  | Active trace ID during the log statement. Defaults to `0` if no trace.  |
    | `dd.span_id`   | Active span ID during the log statement. Defaults to `0` if no trace. |

Examples of adding correlation identifiers to the log context:

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
{{< /tabs >}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/tagging/unified_service_tagging
[2]: http://serilog.net
[3]: https://logging.apache.org/log4net
[4]: http://nlog-project.org
[5]: /tracing/setup_overview/setup/dotnet-core/?tab=windows#configuring-the-net-tracer
[6]: /logs/log_collection/csharp/?tab=serilog#configure-your-datadog-agent
[7]: /logs/log_collection/csharp/#configure-your-logger
[8]: /tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel/?tab=custom
[9]: /tracing/visualization/#trace
[10]: https://www.nuget.org/packages/Datadog.Trace/
