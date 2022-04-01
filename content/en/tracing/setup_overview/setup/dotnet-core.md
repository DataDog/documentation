---
title: Tracing .NET Core Applications
kind: documentation
aliases:
  - /tracing/dotnet-core
  - /tracing/languages/dotnet-core
  - /tracing/setup/dotnet-core
  - /agent/apm/dotnet-core/
  - /tracing/setup/dotnet-core
  - /tracing/setup_overview/dotnet-core
code_lang: dotnet-core
type: multi-code-lang
code_lang_weight: 60
further_reading:
  - link: "/tracing/connect_logs_and_traces/dotnet/"
    tag: "Documentation"
    text: "Connect .NET application logs to traces"
  - link: "/tracing/runtime_metrics/dotnet/"
    tag: "Documentation"
    text: "Runtime metrics"
  - link: "/serverless/azure_app_services/"
    tag: "Documentation"
    text: "Microsoft Azure App Service extension"
  - link: "/tracing/visualization/"
    tag: "Documentation"
    text: "Explore your services, resources, and traces"
  - link: "https://www.datadoghq.com/blog/net-monitoring-apm/"
    tag: "Blog"
    text: ".NET monitoring with Datadog APM and distributed tracing"
  - link: "https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples"
    tag: "GitHub"
    text: "Examples of custom instrumentation"
  - link: "https://github.com/DataDog/dd-trace-dotnet"
    tag: "GitHub"
    text: "Source code"
  - link: "https://www.datadoghq.com/blog/deploy-dotnet-core-azure-app-service/"
    tag: "Blog"
    text: "Deploy ASP.NET Core applications to Azure App Service"
---

## Compatibility requirements

### Supported .NET Core runtimes

The .NET Tracer supports instrumentation on .NET Core 2.1, 3.1, .NET 5, and .NET 6.

For a full list of supported libraries and processor architectures, see [Compatibility Requirements][1].

## Installation and getting started

<div class="alert alert-warning">
  <strong>Note:</strong> Datadog's automatic instrumentation relies on the .NET CLR Profiling API. This API allows only one subscriber (for example, APM). To ensure maximum visibility, run only one APM solution in your application environment.
</div>

### Installation

1. [Install the tracer.](#install-the-tracer)
2. [Enable the tracer for your service.](#enable-the-tracer-for-your-service)
3. [Configure the Datadog Agent for APM.](#configure-the-datadog-agent-for-apm)
4. [View your live data.](#view-your-live-data)

### Install the tracer

You can install the Datadog .NET Tracer machine-wide so that all services on the machine are instrumented, or you can install it on a per-application basis to allow developers to manage the instrumentation through the application’s dependencies. To see machine-wide installation instructions, click the Windows or Linux tab. To see per-application installation instructions, click the NuGet tab.

{{< tabs >}}

{{% tab "Windows" %}}

To install the .NET Tracer machine-wide:

1. Download the [.NET Tracer MSI installer][1]. Select the MSI installer for the architecture that matches the operating system (x64 or x86).

2. Run the .NET Tracer MSI installer with administrator privileges.


[1]: https://github.com/DataDog/dd-trace-dotnet/releases
{{% /tab %}}

{{% tab "Linux" %}}

To install the .NET Tracer machine-wide:

1. Download the latest [.NET Tracer package][1] that supports your operating system and architecture.

2. Run one of the following commands to install the package and create the .NET tracer log directory `/var/log/datadog/dotnet` with the appropriate permissions:

   Debian or Ubuntu
   : `sudo dpkg -i ./datadog-dotnet-apm_<TRACER_VERSION>_amd64.deb && /opt/datadog/createLogPath.sh`

   CentOS or Fedora
   : `sudo rpm -Uvh datadog-dotnet-apm<TRACER_VERSION>-1.x86_64.rpm && /opt/datadog/createLogPath.sh`

   Alpine or other musl-based distributions
   : `sudo tar -C /opt/datadog -xzf datadog-dotnet-apm<TRACER_VERSION>-musl.tar.gz && sh /opt/datadog/createLogPath.sh`

   Other distributions
   : `sudo tar -C /opt/datadog -xzf datadog-dotnet-apm<TRACER_VERSION>-tar.gz && /opt/datadog/createLogPath.sh`


[1]: https://github.com/DataDog/dd-trace-dotnet/releases
{{% /tab %}}

{{% tab "NuGet" %}}

<div class="alert alert-warning">
  <strong>Note:</strong> This installation does not instrument applications running in IIS. For applications running in IIS, follow the Windows machine-wide installation process.
</div>

To install the .NET Tracer per-application:

1. Add the `Datadog.Monitoring.Distribution` [NuGet package][1] to your application.

[1]: https://www.nuget.org/packages/Datadog.Monitoring.Distribution
{{% /tab %}}

{{< /tabs >}}

### Enable the tracer for your service

To enable the .NET Tracer for your service, set the required environment variables and restart the application.

For information about the different methods for setting environment variables, see [Configuring process environment variables](#configuring-process-environment-variables).

{{< tabs >}}

{{% tab "Windows" %}}

#### Internet Information Services (IIS)

1. The .NET Tracer MSI installer adds all required environment variables. There are no environment variables you need to configure.

2. To automatically instrument applications hosted in IIS, completely stop and start IIS by running the following commands as an administrator:

   ```cmd
   net stop /y was
   net start w3svc
   ```

   <div class="alert alert-warning">
     <strong>Note:</strong> Always use the commands above to completely stop and restart IIS to enable the tracer. Avoid using the IIS Manager GUI application or <code>iisreset.exe</code>.
   </div>


#### Services not in IIS

1. Set the following required environment variables for automatic instrumentation to attach to your application:

   ```
   CORECLR_ENABLE_PROFILING=1
   CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
   ```
2. For standalone applications and Windows services, manually restart the application.

{{% /tab %}}

{{% tab "Linux" %}}

1. Set the following required environment variables for automatic instrumentation to attach to your application:

   ```
   CORECLR_ENABLE_PROFILING=1
   CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
   CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
   DD_DOTNET_TRACER_HOME=/opt/datadog
   ```

2. For standalone applications, manually restart the application as you normally would.

{{% /tab %}}

{{% tab "NuGet" %}}

1. Set the following required environment variables for automatic instrumentation to attach to your application:

   ```
   CORECLR_ENABLE_PROFILING=1
   CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
   CORECLR_PROFILER_PATH=<System-dependent path>
   DD_DOTNET_TRACER_HOME=<APP_DIRECTORY>/datadog
   ```

   The value for the `<APP_DIRECTORY>` placeholder is the path to the directory containing the application's `.dll` files. The value for the `CORECLR_PROFILER_PATH` environment variable varies based on the system where the application is running:

   Operating System and Process Architecture | CORECLR_PROFILER_PATH Value
   ------------------------------------------|----------------------------
   Alpine Linux x64 | `<APP_DIRECTORY>/datadog/linux-musl-x64/Datadog.Trace.ClrProfiler.Native.so`
   Linux x64        | `<APP_DIRECTORY>/datadog/linux-x64/Datadog.Trace.ClrProfiler.Native.so`
   Linux ARM64      | `<APP_DIRECTORY>/datadog/linux-arm64/Datadog.Trace.ClrProfiler.Native.so`
   Windows x64      | `<APP_DIRECTORY>\datadog\win-x64\Datadog.Trace.ClrProfiler.Native.dll`
   Windows x86      | `<APP_DIRECTORY>\datadog\win-x86\Datadog.Trace.ClrProfiler.Native.dll`

2. For Docker images running on Linux, configure the image to run the `createLogPath.sh` script:

   ```
   RUN /<APP_DIRECTORY>/datadog/createLogPath.sh
   ```

   Docker examples are available in the [`dd-trace-dotnet` repository][1].

3. For standalone applications, manually restart the application.


[1]: https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples/NugetDeployment
{{% /tab %}}

{{< /tabs >}}

### Configure the Datadog Agent for APM

[Install and configure the Datadog Agent][2] to receive traces from your instrumented application. By default the Datadog Agent is enabled in your `datadog.yaml` file under `apm_config` with `enabled: true` and listens for trace traffic at `localhost:8126`.

For containerized, serverless, and cloud environments:

{{< tabs >}}

{{% tab "Containers" %}}

1. Set `apm_non_local_traffic: true` in the `apm_config` section of your main [`datadog.yaml` configuration file][1].

2. See the specific setup instructions to ensure that the Agent is configured to receive traces in a containerized environment:

{{< partial name="apm/apm-containers.html" >}}
</br>

3. After instrumenting your application, the tracing client sends traces to `localhost:8126` by default. If this is not the correct host and port, change it by setting the `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT` environment variables. For more information on how to set these variables, see [Configuration](#configuration).

{{< site-region region="us3,us5,eu,gov" >}}

4. To ensure the Agent sends data to the right Datadog location, set `DD_SITE` in the Datadog Agent to {{< region-param key="dd_site" code="true" >}}.

{{< /site-region >}}

[1]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}

{{% tab "AWS Lambda" %}}

To set up Datadog APM in AWS Lambda, see [Tracing Serverless Functions][1].

[1]: /tracing/serverless_functions/
{{% /tab %}}

{{% tab "Azure App Service" %}}

To set up Datadog APM in Azure App Service, see [Tracing Azure App Service Extension][1].

[1]: /serverless/azure_app_services/
{{% /tab %}}

{{% tab "Other Environments" %}}

Tracing is available for a number of environments including [Heroku][1], [Cloud Foundry][2], and [AWS Elastic Beanstalk][3].

For all other environments, see the [Integrations documentation][4] for that environment and contact [Datadog support][5] if you are encountering setup issues.


[1]: /agent/basic_agent_usage/heroku/#installation
[2]: /integrations/cloud_foundry/#trace-collection
[3]: /integrations/amazon_elasticbeanstalk/
[4]: /integrations/
[5]: /help/
{{% /tab %}}

{{< /tabs >}}

### View your live data

After enabling the .NET Tracer for your service:

1. Restart your service.

2. Create application load.

3. In Datadog, navigate to [**APM** > **APM Traces**][3].

## Configuration

{{< img src="tracing/dotnet/diagram_docs_net.png" alt=".NET Tracer configuration setting precedence"  >}}


You can set configuration settings in the .NET Tracer with any of the following methods:

{{< tabs >}}

{{% tab "Environment variables" %}}

To configure the tracer using environment variables, set the variables before launching the instrumented application. To learn how to set environment variables in different environments, see [Configuring process environment variables](#configuring-process-environment-variables).


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

<div class="alert alert-warning">
  <strong>Note:</strong> On Linux, the names of environment variables are case-sensitive.
</div>

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
Sets the URL endpoint where traces are sent. Overrides `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT` if set. <br>
**Default**: `http://<DD_AGENT_HOST>:<DD_TRACE_AGENT_PORT>`

`DD_AGENT_HOST`
: Sets the host where traces are sent (the host running the Agent). Can be a hostname or an IP address. Ignored if `DD_TRACE_AGENT_URL` is set. <br>
**Default**: `localhost`

`DD_TRACE_AGENT_PORT`
: Sets the port where traces are sent (the port where the Agent is listening for connections). Ignored if `DD_TRACE_AGENT_URL` is set. <br>
**Default**: `8126`

`DD_LOGS_INJECTION`
: **TracerSettings property**: `LogsInjectionEnabled` <br>
Enables or disables automatic injection of correlation identifiers into application logs. <br>
Your logger needs to have a `source` that sets the `trace_id` mapping correctly. The default source for .NET Applications, `csharp`, does this automatically. For more information, see [correlated logs in the Trace ID panel][8].

`DD_TRACE_SAMPLE_RATE`
: **TracerSettings property**: `GlobalSamplingRate` <br>
Enables ingestion rate control.

`DD_TRACE_RATE_LIMIT`
: **TracerSettings property**: `MaxTracesSubmittedPerSecond` <br>
The number of traces allowed to be submitted per second (deprecates `DD_MAX_TRACES_PER_SECOND`). <br>
**Default**: `100` when `DD_TRACE_SAMPLE_RATE` is set. Otherwise, delegates rate limiting to the Datadog Agent. <br>

`DD_TRACE_GLOBAL_TAGS`
: **TracerSettings property**: `GlobalTags`<br>
If specified, adds all of the specified tags to all generated spans.

`DD_TRACE_DEBUG`
Enables or disables debug logging. Valid values are: `true` or `false`.<br>
**Default**: `false`

`DD_TRACE_HEADER_TAGS`
: **TracerSettings property**:`HeaderTags` <br>
Accepts a map of case-insensitive header keys to tag names and automatically applies matching header values as tags on root spans. Also accepts entries without a specified tag name. <br>
**Example**: `CASE-insensitive-Header:my-tag-name,User-ID:userId,My-Header-And-Tag-Name`<br>
Added in version 1.18.3. Response header support and entries without tag names added in version 1.26.0.

`DD_TAGS`
: **TracerSettings property**: `GlobalTags`<br>
If specified, adds all of the specified tags to all generated spans. <br>
**Example**: `layer:api, team:intake` <br>
Added in version 1.17.0. <br>
Note that the delimiter is a comma and a whitespace: `, `.

`DD_TRACE_LOG_DIRECTORY`
: Sets the directory for .NET Tracer logs. <br>
**Default**: `%ProgramData%\Datadog .NET Tracer\logs\` on Windows, `/var/log/datadog/dotnet` on Linux

`DD_TRACE_LOGGING_RATE`
: Sets rate limiting for log messages. If set, unique log lines are written once per `x` seconds. For example, to log a given message once per 60 seconds, set to `60`. Setting to `0` disables log rate limiting. Added in version 1.24.0. Disabled by default.

`DD_TRACE_SERVICE_MAPPING`
: Rename services using configuration. Accepts a map of service name keys to rename, and the name to use instead, in the format `[from-key]:[to-name]`. <br>
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

`DD_RUNTIME_METRICS_ENABLED`
: Enables .NET runtime metrics. Valid values are `true` or `false`. <br>
**Default**: `false`<br>
Added in version 1.23.0.

#### Automatic instrumentation integration configuration

The following table lists configuration variables that are available **only** when using automatic instrumentation and can be set for each integration.

`DD_DISABLED_INTEGRATIONS`
: **TracerSettings property**: `DisabledIntegrationNames` <br>
Sets a list of integrations to disable. All other integrations remain enabled. If not set, all integrations are enabled. Supports multiple values separated with semicolons. Valid values are the integration names listed in the [Integrations][5] section.

`DD_TRACE_<INTEGRATION_NAME>_ENABLED`
: **TracerSettings property**: `Integrations[<INTEGRATION_NAME>].Enabled` <br>
Enables or disables a specific integration. Valid values are: `true` or `false`. Integration names are listed in the [Integrations][5] section.<br>
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

## Custom instrumentation

Your setup for custom instrumentation depends on your automatic instrumentation and includes additional steps depending on the method:

{{< tabs >}}

{{% tab "Windows" %}}

<div class="alert alert-warning">
  <strong>Note:</strong> If you are using both automatic and custom instrumentation, you must keep the package versions (for example: MSI and NuGet) in sync.
</div>

To use custom instrumentation in your .NET application:

1. Add the `Datadog.Trace` [NuGet package][1] to your application.
2. In your application code, access the global tracer through the `Datadog.Trace.Tracer.Instance` property to create new spans.


[1]: https://www.nuget.org/packages/Datadog.Trace
{{% /tab %}}

{{% tab "Linux" %}}

<div class="alert alert-warning">
  <strong>Note:</strong> If you are using both automatic and custom instrumentation, you must keep the package versions (for example, MSI and NuGet) in sync.
</div>

To use custom instrumentation in your .NET application:
1. Add the `Datadog.Trace` [NuGet package][1] to your application.
2. In your application code, access the global tracer through the `Datadog.Trace.Tracer.Instance` property to create new spans.


[1]: https://www.nuget.org/packages/Datadog.Trace
{{% /tab %}}

{{% tab "NuGet" %}}

To use custom instrumentation in your .NET application:

1. In your application code, access the global tracer through the `Datadog.Trace.Tracer.Instance` property to create new spans.

{{% /tab %}}

{{< /tabs >}}

For more information on adding spans and tags for custom instrumentation, see the [.NET Custom Instrumentation documentation][6].

## Configuring process environment variables

To attach automatic instrumentation to your service, you must set the required environment variables before starting the application. See [Enable the tracer for your service](#enable-the-tracer-for-your-service) section to identify which environment variables to set based on your .NET Tracer installation method and follow the examples below to correctly set the environment variables based on the environment of your instrumented service.

### Windows

#### Windows services

{{< tabs >}}

{{% tab "Registry Editor" %}}

In the Registry Editor, create a multi-string value called `Environment` in the `HKLM\System\CurrentControlSet\Services\<SERVICE NAME>` key and set the value data to:

```text
CORECLR_ENABLE_PROFILING=1
CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
```

{{< img src="tracing/setup/dotnet/RegistryEditorCore.png" alt="Using the Registry Editor to create environment variables for a Windows service" >}}

{{% /tab %}}

{{% tab "PowerShell" %}}

```powershell
[string[]] $v = @("CORECLR_ENABLE_PROFILING=1", "CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}")
Set-ItemProperty HKLM:SYSTEM\CurrentControlSet\Services\<SERVICE NAME> -Name Environment -Value $v
```
{{% /tab %}}

{{< /tabs >}}

#### Console applications

To automatically instrument a console application, set the environment variables from a batch file before starting your application:

```bat
rem Set environment variables
SET CORECLR_ENABLE_PROFILING=1
SET CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}

rem Start application
dotnet.exe example.dll
```

### Linux

#### Bash script

To set the required environment variables from a bash file before starting your application:

```bash
# Set environment variables
export CORECLR_ENABLE_PROFILING=1
export CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
export CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
export DD_DOTNET_TRACER_HOME=/opt/datadog

# Start your application
dotnet example.dll
```

#### Linux Docker container

To set the required environment variables on a Linux Docker container:

  ```docker
  # Set environment variables
  ENV CORECLR_ENABLE_PROFILING=1
  ENV CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
  ENV CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
  ENV DD_DOTNET_TRACER_HOME=/opt/datadog

  # Start your application
  CMD ["dotnet", "example.dll"]
  ```

#### `systemctl` (per service)

When using `systemctl` to run .NET applications as a service, you can add the required environment variables to be loaded for a specific service.

1. Create a file called `environment.env` containing:

    ```ini
    CORECLR_ENABLE_PROFILING=1
    CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
    CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
    DD_DOTNET_TRACER_HOME=/opt/datadog
    # any other environment variable used by the application
    ```
2. In the service's configuration file, reference this as an [`EnvironmentFile`][1] in the service block:

    ```ini
    [Service]
    EnvironmentFile=/path/to/environment.env
    ExecStart=<command used to start the application>
    ```
3. Restart the .NET service for the environment variable settings to take effect.

#### `systemctl` (all services)

<div class="alert alert-warning">
  <strong>Note:</strong> The .NET runtime tries to load a profiler into <em>any</em> .NET process that is started with these environment variables set. You should limit instrumentation to only the applications that need to be traced. <strong>Don't set these environment variables globally as this causes <em>all</em> .NET processes on the host to load the profiler.</strong>
</div>

When using `systemctl` to run .NET applications as a service, you can also set environment variables to be loaded for all services run by `systemctl`.

1. Set the required environment variables by running [`systemctl set-environment`][7]:

    ```bash
    systemctl set-environment CORECLR_ENABLE_PROFILING=1
    systemctl set-environment CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
    systemctl set-environment CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
    systemctl set-environment DD_DOTNET_TRACER_HOME=/opt/datadog
    ```
2. Verify that the environment variables were set by running `systemctl show-environment`.

3. Restart the .NET service for the environment variables to take effect.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /tracing/setup_overview/compatibility_requirements/dotnet-core
[2]: /agent/
[3]: https://app.datadoghq.com/apm/traces
[4]: /getting_started/tagging/unified_service_tagging/
[5]: /tracing/setup_overview/compatibility_requirements/dotnet-core#integrations
[6]: /tracing/setup_overview/custom_instrumentation/dotnet/
[7]: https://www.freedesktop.org/software/systemd/man/systemctl.html#set-environment%20VARIABLE=VALUE%E2%80%A6
[8]: /tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel#trace_id-option
