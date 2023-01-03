---
title: Configuring the .NET Framework Tracing Library
kind: documentation
code_lang: dotnet-framework
type: multi-code-lang
code_lang_weight: 70
further_reading:
  - link: "/tracing/other_telemetry/connect_logs_and_traces/dotnet/"
    tag: "Documentation"
    text: "Connect .NET application logs to traces"
  - link: "/tracing/metrics/runtime_metrics/dotnet/"
    tag: "Documentation"
    text: "Runtime metrics"
  - link: "/serverless/azure_app_services/"
    tag: "Documentation"
    text: "Microsoft Azure App Service extension"
  - link: "/tracing/glossary/"
    tag: "Documentation"
    text: "Explore your services, resources, and traces"
  - link: "https://www.datadoghq.com/blog/net-monitoring-apm/"
    tag: "Blog"
    text: ".NET monitoring with Datadog APM and distributed tracing"
  - link: "https://www.datadoghq.com/blog/asp-dotnet-core-monitoring/"
    tag: "Blog"
    text: "Monitor containerized ASP.NET Core applications"
  - link: "https://www.datadoghq.com/blog/deploy-dotnet-core-aws-fargate/"
    tag: "Blog"
    text: "Monitor containerized ASP.NET Core applications on AWS Fargate"
  - link: "https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples"
    tag: "GitHub"
    text: "Examples of custom instrumentation"
  - link: "https://github.com/DataDog/dd-trace-dotnet"
    tag: "GitHub"
    text: "Source code"
---

After you set up the tracing library with your code and configure the Agent to collect APM data, optionally configure the tracing library as desired, including setting up [Unified Service Tagging][4].


{{< img src="tracing/dotnet/diagram_docs_net.png" alt=".NET Tracer configuration setting precedence"  >}}


You can set configuration settings in the .NET Tracer with any of the following methods:

{{< tabs >}}

{{% tab "Environment variables" %}}

To configure the tracer using environment variables, set the variables before launching the instrumented application. To learn how to set environment variables in different environments, see [Configuring process environment variables][1].

[1]: /tracing/trace_collection/dd_libraries/dotnet-framework/#configuring-process-environment-variables

{{% /tab %}}

{{% tab "Code" %}}

To configure the Tracer in application code, create a `TracerSettings` instance from the default configuration sources. Set properties on this `TracerSettings` instance before calling `Tracer.Configure()`. For example:

<div class="alert alert-warning">
  <strong>Note:</strong> Settings must be set on <code>TracerSettings</code> <em>before</em> creating the <code>Tracer</code>. Changes made to <code>TracerSettings</code> properties after the <code>Tracer</code> is created are ignored.
</div>

```csharp
using Datadog.Trace;
using Datadog.Trace.Configuration;

// read default configuration sources (env vars, web.config, datadog.json)
var settings = TracerSettings.FromDefaultSources();

// change some settings
settings.Environment = "prod";
settings.ServiceName = "MyService";
settings.ServiceVersion = "abc123";
settings.Exporter.AgentUri = new Uri("http://localhost:8126/");

// configure the global Tracer settings
Tracer.Configure(settings);
```

{{% /tab %}}

{{% tab "web.config" %}}

To configure the Tracer using an `app.config` or `web.config` file, use the `<appSettings>` section. For example:

```xml
<configuration>
  <appSettings>
    <add key="DD_TRACE_AGENT_URL" value="http://localhost:8126"/>
    <add key="DD_ENV" value="prod"/>
    <add key="DD_SERVICE" value="MyService"/>
    <add key="DD_VERSION" value="abc123"/>
  </appSettings>
</configuration>
```

{{% /tab %}}

{{% tab "JSON file" %}}

To configure the Tracer using a JSON file, create `datadog.json` in the instrumented application's directory. The root JSON object must be an object with a key-value pair for each setting. For example:

```json
{
  "DD_TRACE_AGENT_URL": "http://localhost:8126",
  "DD_ENV": "prod",
  "DD_SERVICE": "MyService",
  "DD_VERSION": "abc123",
}
```

{{% /tab %}}

{{< /tabs >}}

### Configuration settings

Using the methods described above, customize your tracing configuration with the following variables. Use the environment variable name (for example, `DD_TRACE_AGENT_URL`) when setting environment variables or configuration files. Use the TracerSettings property (for example, `Exporter.AgentUri`) when changing settings in code.

#### Unified Service Tagging

To use [Unified Service Tagging][4], configure the following settings for your services:

`DD_ENV`
: **TracerSettings property**: `Environment`<br>
If specified, adds the `env` tag with the specified value to all generated spans. Added in version 1.17.0.

`DD_SERVICE`
: **TracerSettings property**: `ServiceName`<br>
If specified, sets the service name. Otherwise, the .NET Tracer tries to determine service name automatically from application name (IIS application name, process entry assembly, or process name). Added in version 1.17.0.

`DD_VERSION`
: **TracerSettings property**: `ServiceVersion`<br>
If specified, sets the version of the service. Added in version 1.17.0.

#### Optional configuration

The following configuration variables are available for both automatic and custom instrumentation:

`DD_TRACE_AGENT_URL`
: **TracerSettings property**: `Exporter.AgentUri`<br>
Sets the URL endpoint where traces are sent. Overrides `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT` if set.<br>
**Default**: `http://<DD_AGENT_HOST>:<DD_TRACE_AGENT_PORT>` if they are set or `http://localhost:8126`.

`DD_AGENT_HOST`
: Sets the host where the Agent is listening for connections. Can be a hostname or an IP address. Use `DD_TRACE_AGENT_URL`, which has precedence over this parameter. <br>
**Default**: `localhost`

`DD_TRACE_AGENT_PORT`
: Sets the TCP port where the Agent is listening for connections. Use `DD_TRACE_AGENT_URL`, which has precedence over this parameter. <br>
**Default**: `8126`

`DD_TRACE_SAMPLE_RATE`
: **TracerSettings property**: `GlobalSamplingRate` <br>
**Default**: Defaults to the rates returned by the Datadog Agent<br>
Enables ingestion rate control. This parameter is a float representing the percentage of spans to sample. Valid values are from `0.0` to `1.0`.
For more information, see [Ingestion Mechanisms][6].

`DD_TRACE_SAMPLING_RULES`
: **TracerSettings property**: `CustomSamplingRules`<br>
**Default**: `null`<br>
A JSON array of objects. Each object must have a `"sample_rate"`. The `"name"` and `"service"` fields are optional. The `"sample_rate"` value must be between `0.0` and `1.0` (inclusive). Rules are applied in configured order to determine the trace's sample rate.
For more information, see [Ingestion Mechanisms][6].<br>
**Examples:**<br>
  - Set the sample rate to 20%: `'[{"sample_rate": 0.2}]'`
  - Set the sample rate to 10% for services starting with 'a' and span name 'b' and set the sample rate to 20% for all other services: `'[{"service": "a.*", "name": "b", "sample_rate": 0.1}, {"sample_rate": 0.2}]'`

`DD_TRACE_RATE_LIMIT`
: **TracerSettings property**: `MaxTracesSubmittedPerSecond` <br>
The number of traces allowed to be submitted per second (deprecates `DD_MAX_TRACES_PER_SECOND`). <br>
**Default**: `100` when `DD_TRACE_SAMPLE_RATE` is set. Otherwise, delegates rate limiting to the Datadog Agent. <br>

`DD_SPAN_SAMPLING_RULES`
**Default**: `null`<br>
A JSON array of objects. Rules are applied in configured order to determine the span's sample rate. The `sample_rate` value must be between 0.0 and 1.0 (inclusive).
For more information, see [Ingestion Mechanisms][3].<br>
**Example:**<br>
  - Set the span sample rate to 50% for the service `my-service` and operation name `http.request`, up to 50 traces per second: `'[{"service": "my-service", "name": "http.request", "sample_rate":0.5, "max_per_second": 50}]'`

`DD_TRACE_GLOBAL_TAGS`
: **TracerSettings property**: `GlobalTags`<br>
If specified, adds all of the specified tags to all generated spans.
**Example**: `layer:api, team:intake` <br>
Note that the delimiter is a comma and a space: `, `.

`DD_TRACE_DEBUG`
: Enables or disables debug logging. Valid values are `true` or `false`.<br>
**Default**: `false`

`DD_TRACE_HEADER_TAGS`
: **TracerSettings property**:`HeaderTags` <br>
Accepts a comma-separated list of key-value pairs of case-insensitive header keys to tag names, and automatically applies matching header values as tags on root spans. Also accepts entries without a specified tag name. <br>
**Example**: `CASE-insensitive-Header:my-tag-name,User-ID:userId,My-Header-And-Tag-Name`<br>
Added in version 1.18.3. Response header support and entries without tag names added in version 1.26.0.

`DD_TRACE_CLIENT_IP_ENABLED`
: Enables client IP collection from relevant IP headers.<br>
Added in version `2.19.0`.<br>
**Default**: `false`<br>

`DD_TAGS`
: **TracerSettings property**: `GlobalTags`<br>
If specified, adds all of the specified tags to all generated spans. <br>
**Example**: `layer:api,team:intake` <br>
Added in version 1.17.0. <br>

`DD_TRACE_LOG_DIRECTORY`
: Sets the directory for .NET Tracer logs. <br>
**Default**: `%ProgramData%\Datadog .NET Tracer\logs\`

`DD_TRACE_LOGGING_RATE`
: Sets rate limiting for log messages. If set, unique log lines are written once per `x` seconds. For example, to log a given message once per 60 seconds, set to `60`. Setting to `0` disables log rate limiting. Added in version 1.24.0. Disabled by default.

`DD_TRACE_SERVICE_MAPPING`
: Rename services using configuration. Accepts a comma-separated list of key-value pairs from the service name keys to rename, and the name to use instead, in the format `[from-key]:[to-name]`. <br>
**Example**: `mysql:main-mysql-db, mongodb:offsite-mongodb-service`<br>
The `from-key` value is specific to the integration type, and should exclude the application name prefix. For example, to rename `my-application-sql-server` to `main-db`, use `sql-server:main-db`. Added in version 1.23.0

#### Automatic instrumentation optional configuration

The following configuration variables are available **only** when using automatic instrumentation:

`DD_TRACE_ENABLED`
: **TracerSettings property**: `TraceEnabled`<br>
Enables or disables all automatic instrumentation. Setting the environment variable to `false` completely disables the CLR profiler. For other configuration methods, the CLR profiler is still loaded, but traces will not be generated. Valid values are: `true` or `false`.<br>
**Default**: `true`

`DD_HTTP_CLIENT_ERROR_STATUSES`
: Sets status code ranges that will cause HTTP client spans to be marked as errors. <br>
**Default**: `400-499`

`DD_HTTP_SERVER_ERROR_STATUSES`
: Sets status code ranges that will cause HTTP server spans to be marked as errors. <br>
**Default**: `500-599`

`DD_LOGS_INJECTION`
: **TracerSettings property**: `LogsInjectionEnabled` <br>
Enables or disables automatic injection of correlation identifiers into application logs. <br>
Your logger needs to have a `source` that sets the `trace_id` mapping correctly. The default source for .NET Applications, `csharp`, does this automatically. For more information, see [correlated logs in the Trace ID panel][5].

`DD_RUNTIME_METRICS_ENABLED`
: Enables .NET runtime metrics. Valid values are `true` or `false`. <br>
**Default**: `false`<br>
Added in version 1.23.0.

`DD_TRACE_EXPAND_ROUTE_TEMPLATES_ENABLED`
: Expands all route parameters in the application for ASP.NET/ASP.NET Core (except ID parameters)<br>
This can be useful if you are using parameter names to differentiate between form values, or a slug, such as in GraphQL.
**Default**: `false`
Added in version 2.5.2

`DD_TRACE_METHODS`
: List of methods to trace. Accepts a semicolon (`;`) separated list where each entry has the format `TypeName[MethodNames]`, where `MethodNames` is either a comma (`,`) separated list of method names or the `*` wildcard. For generic types, replace the angled brackets and the type parameters' names with a backtick (`` ` ``) followed by the number of generic type parameters. For example, `Dictionary<TKey, TValue>` must be written as `` Dictionary`2 ``. For generic methods, you only need to specify the method name. <br>
**Example**: ```Namespace1.Class1[Method1,GenericMethod];Namespace1.GenericTypeWithOneTypeVariable`1[ExecuteAsync];Namespace2.Class2[*]```<br>
**Note:** The wildcard method support (`[*]`) selects all methods in a type except constructors, property getters and setters, `Equals`, `Finalize`, `GetHashCode`, and `ToString`. <br>
Added in version 2.6.0.
Wildcard support `[*]` added in version 2.7.0.

`DD_TRACE_KAFKA_CREATE_CONSUMER_SCOPE_ENABLED`
: Alters the behavior of the Kafka consumer span<br>
**Default**: `true`<br>
When set to `true`, the consumer span is created when a message is consumed and closed before consuming the next message. The span duration is representative of the computation between one message consumption and the next. Use this setting when message consumption is performed in a loop. <br>
When set to `false`, the consumer span is created when a message is consumed and immediately closed. Use this setting when a message is not processed completely before consuming the next one, or when multiple messages are consumed at once. When you set this parameter to `false`, consumer spans are closed right away. If you have child spans to trace, you must extract the context manually. Read [Headers extraction and injection][12] for more details.

#### Automatic instrumentation integration configuration

The following table lists configuration variables that are available **only** when using automatic instrumentation and can be set for each integration.

`DD_DISABLED_INTEGRATIONS`
: **TracerSettings property**: `DisabledIntegrationNames` <br>
Sets a list of integrations to disable. All other integrations remain enabled. If not set, all integrations are enabled. Supports multiple values separated with semicolons. Valid values are the integration names listed in the [Integrations][7] section.

`DD_TRACE_<INTEGRATION_NAME>_ENABLED`
: **TracerSettings property**: `Integrations[<INTEGRATION_NAME>].Enabled` <br>
Enables or disables a specific integration. Valid values are: `true` or `false`. Integration names are listed in the [Integrations][7] section.<br>
**Default**: `true`

#### Experimental features

The following configuration variables are for features that are available for use but may change in future releases.

`DD_TRACE_PARTIAL_FLUSH_ENABLED`
: Enables incrementally flushing large traces to the Datadog Agent, reducing the chance of rejection by the Agent. Use only when you have long-lived traces or traces with many spans. Valid values are `true` or `false`. Added in version 1.26.0, only compatible with the Datadog Agent 7.26.0+.<br>
**Default**: `false`

#### Deprecated settings

`DD_TRACE_LOG_PATH`
: Sets the path for the automatic instrumentation log file and determines the directory of all other .NET Tracer log files. Ignored if `DD_TRACE_LOG_DIRECTORY` is set.

`DD_TRACE_ROUTE_TEMPLATE_RESOURCE_NAMES_ENABLED`
: Enables improved resource names for web spans when set to `true`. Uses route template information where available, adds an additional span for ASP.NET Core integrations, and enables additional tags. Added in version 1.26.0. Enabled by default in 2.0.0<br>
**Default**: `true`

### Headers extraction and injection

The Datadog APM Tracer supports [B3][9] and [W3C (TraceParent)][10] headers extraction and injection for distributed tracing.

You can configure injection and extraction styles for distributed headers.

The .NET Tracer supports the following styles:

- Datadog: `Datadog`
- B3 Multi Header: `b3multi` (`B3` is deprecated)
- W3C (TraceParent): `tracecontext` (`W3C` is deprecated)
- B3 Single Header: `B3 single header` (`B3SingleHeader` is deprecated)

You can use the following environment variables to configure injection and extraction styles:

- `DD_TRACE_PROPAGATION_STYLE_INJECT=Datadog, b3multi, tracecontext`
- `DD_TRACE_PROPAGATION_STYLE_EXTRACT=Datadog, b3multi, tracecontext`

The environment variable values are comma-separated lists of header styles enabled for injection or extraction. By default, only the `Datadog` injection style is enabled.

If multiple extraction styles are enabled, the extraction attempt is completed in order of configured styles, and uses the first successful extracted value.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[3]: /tracing/trace_pipeline/ingestion_mechanisms/
[4]: /getting_started/tagging/unified_service_tagging/
[5]: /tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel#trace_id-option
[6]: /tracing/trace_pipeline/ingestion_mechanisms//?tab=environmentvariables#head-based-sampling
[7]: /tracing/trace_collection/compatibility/dotnet-framework/#integrations
[8]: /tracing/trace_collection/custom_instrumentation/dotnet/
[9]: https://github.com/openzipkin/b3-propagation
[10]: https://www.w3.org/TR/trace-context/#traceparent-header
[12]: /tracing/trace_collection/custom_instrumentation/dotnet/#headers-extraction-and-injection