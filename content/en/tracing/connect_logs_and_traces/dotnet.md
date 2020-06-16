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

## Automatically Inject Trace and Span IDs

Enable injection in the .NET Tracer’s [configuration][1] by setting `DD_LOGS_INJECTION=true` through environment variables or the configuration files.

The .NET Tracer uses the [LibLog][2] library to automatically inject trace IDs, span IDs, `env`, `service`, and `version` into your application logs. If you haven't done so already, it is recommended to configure the .NET tracer with `DD_ENV`, `DD_SERVICE`, and `DD_VERSION`. This will provide the best experience when adding `env`, `service`, and `version` (see [Unified Service Tagging][3] for more details).

We support [Serilog][4], [NLog][5] (version 2.0.0.2000+), or [log4net][6]. Automatic injection only displays in the application logs after enabling `LogContext` enrichment in your `Serilog` logger or `Mapped Diagnostics Context` in your `NLog` or `log4net` logger (see examples below).

**Note**: Automatic injection only works for logs formatted as JSON.

{{< tabs >}}
{{% tab "Serilog" %}}

```csharp
var log = new LoggerConfiguration()
    // Add Enrich.FromLogContext to emit MDC properties
    .Enrich.FromLogContext()
    .WriteTo.File(new JsonFormatter(), "log.json")
    .CreateLogger();
```

{{% /tab %}}
{{% tab "log4net" %}}

```xml
  <layout type="log4net.Layout.SerializedLayout, log4net.Ext.Json">
    <decorator type="log4net.Layout.Decorators.StandardTypesDecorator, log4net.Ext.Json" />
    <default />
    <!--explicit default members-->
    <remove value="ndc" />
    <remove value="message" />
    <!--remove the default preformatted message member-->
    <member value="message:messageobject" />
    <!--add raw message-->

    <!-- Add value='properties' to emit MDC properties -->
    <member value='properties'/>
  </layout>
```

{{% /tab %}}
{{% tab "NLog" %}}

For NLog version 4.6+:

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

{{% /tab %}}
{{< /tabs >}}


## Manually Inject Trace and Span IDs

If you prefer to manually correlate your [traces][7] with your logs and tie together data for your service,
leverage the Datadog API to retrieve correlation identifiers:

- Use `CorrelationIdentifier.<FIELD>` API methods to inject identifiers at the beginning and end of each [span][8] to log (see examples below).
- Configure MDC to use the injected keys:

    - `dd.env` Globally configured `env` for the tracer (defaults to `""` if not set)
    - `dd.service` Globally configured root service name (defaults to the name of the application or IIS site name if not set)
    - `dd.version` Globally configured `version` for the service (defaults to `""` if not set)
    - `dd.trace_id` Active Trace ID during the log statement (defaults to `0` if no trace)
    - `dd.span_id` Active Span ID during the log statement (defaults to `0` if no trace)

{{< tabs >}}
{{% tab "Serilog" %}}

```csharp
using Datadog.Trace;
using Serilog.Context;

// there must be spans started and active before this block.
using (LogContext.PushProperty("dd.env", Tracer.Instance.Settings.Environment))
using (LogContext.PushProperty("dd.service", Tracer.Instance.DefaultServiceName))
using (LogContext.PushProperty("dd.version", Tracer.Instance.Settings.ServiceVersion))
using (LogContext.PushProperty("dd.trace_id", CorrelationIdentifier.TraceId.ToString()))
using (LogContext.PushProperty("dd.span_id", CorrelationIdentifier.SpanId.ToString()))
{
    // Log something
}
```

{{% /tab %}}
{{% tab "Log4net" %}}

```csharp
using Datadog.Trace;
using log4net;

// there must be spans started and active before this block.
try
{
    LogicalThreadContext.Properties["dd.env"] = Tracer.Instance.Settings.Environment;
    LogicalThreadContext.Properties["dd.service"] = Tracer.Instance.DefaultServiceName;
    LogicalThreadContext.Properties["dd.version"] = Tracer.Instance.Settings.ServiceVersion;
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
using (MappedDiagnosticsLogicalContext.SetScoped("dd.env", Tracer.Instance.Settings.Environment))
using (MappedDiagnosticsLogicalContext.SetScoped("dd.service", Tracer.Instance.DefaultServiceName))
using (MappedDiagnosticsLogicalContext.SetScoped("dd.version", Tracer.Instance.Settings.ServiceVersion))
using (MappedDiagnosticsLogicalContext.SetScoped("dd.trace_id", CorrelationIdentifier.TraceId.ToString()))
using (MappedDiagnosticsLogicalContext.SetScoped("dd.span_id", CorrelationIdentifier.SpanId.ToString()))
{
    // Log something
}
```

{{% /tab %}}
{{< /tabs >}}

**Note**: If you are not using a [Datadog Log Integration][9] to parse your logs, custom log parsing rules need to ensure that `dd.trace_id` and `dd.span_id` are being parsed as strings. More information can be found in the [FAQ on this topic][10].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/setup/dotnet/#configuration
[2]: https://github.com/damianh/LibLog
[3]: /getting_started/tagging/unified_service_tagging
[4]: http://serilog.net
[5]: http://nlog-project.org
[6]: https://logging.apache.org/log4net
[7]: /tracing/visualization/#trace
[8]: /tracing/visualization/#spans
[9]: /logs/log_collection/csharp/#configure-your-logger
[10]: /tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel/?tab=custom
