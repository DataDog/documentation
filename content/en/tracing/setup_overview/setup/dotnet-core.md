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
    text: "Microsoft Azure App Services extension"
  - link: "/tracing/visualization/"
    tag: "Documentation"
    text: "Explore your services, resources, and traces"
  - link: "https://www.datadoghq.com/blog/net-monitoring-apm/"
    tag: "Blog"
    text: ".NET monitoring with Datadog APM and distributed tracing"
  - link: "https://github.com/DataDog/dd-trace-dotnet/tree/master/samples"
    tag: "GitHub"
    text: "Examples of custom instrumentation"
  - link: "https://github.com/DataDog/dd-trace-dotnet"
    tag: "GitHub"
    text: "Source code"
---

## Compatibility requirements

The .NET Tracer supports instrumentation on:
  - .NET 5
  - .NET Core 3.1
  - .NET Core 2.1. 

For a full list of supported libraries, visit the [Compatibility Requirements][1] page.

## Automatic instrumentation

<div class="alert alert-warning"> 
  <strong>Note:</strong> If you are using both automatic and custom instrumentation, it is important to keep the package versions (for example, MSI and NuGet) in sync.
</div>

### Installation

{{< tabs >}}

{{% tab "Windows" %}}

1. [Install and configure the Windows Datadog Agent][1].

2. Download the [.NET Tracer MSI installer][2]. Select the MSI installer for the architecture that matches the operating system (x64 or x86).

3. Run the .NET Tracer MSI installer with administrator privileges.

4. Stop, then start IIS by running the following commands as an administrator:

    <div class="alert alert-warning"> 
      <strong>Note:</strong> You must use a stop and start command. This is not the same as a reset or restart command.
    </div>

    ```cmd
    net stop /y was
    net start w3svc
    ```

5. Create application load.

6. Visit [APM Live Traces][3].


[1]: /agent/basic_agent_usage/windows/?tab=gui
[2]: https://github.com/DataDog/dd-trace-dotnet/releases
[3]: https://app.datadoghq.com/apm/traces
{{% /tab %}}

{{% tab "Linux" %}}

1. [Install and configure a Linux Datadog Agent][1].
2. Download and install the .NET Tracer into the application environment:
    - **Debian or Ubuntu** - Download and install the Debian package:
      ```bash
      curl -LO https://github.com/DataDog/dd-trace-dotnet/releases/download/v<TRACER_VERSION>/datadog-dotnet-apm_<TRACER_VERSION>_amd64.deb
      sudo dpkg -i ./datadog-dotnet-apm_<TRACER_VERSION>_amd64.deb
      ```
    - **CentOS or Fedora** - Download and install the RPM package:
      ```bash
      curl -LO https://github.com/DataDog/dd-trace-dotnet/releases/download/v<TRACER_VERSION>/datadog-dotnet-apm-<TRACER_VERSION>-1.x86_64.rpm
      sudo rpm -Uvh datadog-dotnet-apm-<TRACER_VERSION>-1.x86_64.rpm
      ```
    - **Alpine or other [musl-based distributions][2]** - Download the tar archive with the musl-linked binary:
      ```bash
      sudo mkdir -p /opt/datadog
      curl -L https://github.com/DataDog/dd-trace-dotnet/releases/download/v<TRACER_VERSION>/datadog-dotnet-apm-<TRACER_VERSION>-musl.tar.gz \
      | sudo tar xzf - -C /opt/datadog
      ```
    - **Other distributions** - Download the tar archive with the glibc-linked binary:
      ```bash
      sudo mkdir -p /opt/datadog
      curl -L https://github.com/DataDog/dd-trace-dotnet/releases/download/v<TRACER_VERSION>/datadog-dotnet-apm-<TRACER_VERSION>.tar.gz \
      | sudo tar xzf - -C /opt/datadog
      ```
3. Add the [required environment variables](#required-environment-variables).

4. Run the `/opt/datadog/createLogPath.sh` script, which creates a directory for the log files and sets appropriate directory permissions. The default directory for log files is `/var/log/datadog/dotnet`.

5. Create application load.

6. Visit [APM Live Traces][3].


[1]: /agent/basic_agent_usage/
[2]: https://en.wikipedia.org/wiki/Musl
[3]: https://app.datadoghq.com/apm/traces
{{% /tab %}}

{{< /tabs >}}


### Required environment variables

{{< tabs >}}

{{% tab "Windows" %}}

#### Applications not hosted in IIS

To enable automatic instrumentation for Windows applications not hosted in IIS, you must set two environment variables before starting your application:

Name                       | Value
---------------------------|------
`CORECLR_ENABLE_PROFILING` | `1`
`CORECLR_PROFILER`         | `{846F5F1C-F9AE-4B07-969E-05C26BC060D8}`

<div class="alert alert-warning"> 
  <strong>Note:</strong> The .NET runtime tries to load a profiler into any .NET process started with these environment variables set. You should limit instrumentation only to the applications that need to be traced. Don't set these environment variables globally because this causes all .NET processes on the host to load the profiler.
</div>

##### Windows services

To automatically instrument a Windows service, set the `CORECLR_ENABLE_PROFILING` and `CORECLR_PROFILER` environment variables: 

1. In the Windows Registry Editor, create a multi-string value called `Environment` in the `HKLM\System\CurrentControlSet\Services\<SERVICE NAME>` key. 
2. Set the value data to:
    ```text
    CORECLR_ENABLE_PROFILING=1
    CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
    ```
    {{< img src="tracing/setup/dotnet/RegistryEditorCore.png" alt="Creating the environment variables for instrumenting a service in the Registry Editor" >}}

Alternatively, you can set the environment variables by using the following PowerShell snippet:

```powershell
[String[]] $v = @("CORECLR_ENABLE_PROFILING=1", "CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}")
Set-ItemProperty HKLM:SYSTEM\CurrentControlSet\Services\<NAME> -Name Environment -Value $v
```

##### Console applications

To automatically instrument a console application, set the `CORECLR_ENABLE_PROFILING` and `CORECLR_PROFILER` environment variables from a batch file before starting your application:

```bat
rem Set environment variables
SET CORECLR_ENABLE_PROFILING=1
SET CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}

rem Start application
dotnet.exe example.dll
```

{{% /tab %}}

{{% tab "Linux" %}}

1. If the Agent is running on a different host or container, set `apm_non_local_traffic: true` in your main [`datadog.yaml` configuration file][1]

2. See the specific setup instructions to ensure that the Agent is configured to receive traces in a containerized environment:

{{< partial name="apm/apm-containers.html" >}}
</br>

3. While it is instrumenting your application, the tracing client sends traces to `localhost:8126` by default. If this is not the correct host and port, change it by setting these environment variables:

    - `DD_AGENT_HOST`
    - `DD_TRACE_AGENT_PORT`

4. The following environment variables are required to enable automatic instrumentation on Linux:

    <div class="alert alert-info"> 
      <strong>Note:</strong> If the .NET Tracer is installed into a path other than the default <code>/opt/datadog</code> path, ensure the paths are changed to match.
    </div>

    Name                       | Value
    ---------------------------|------
    `CORECLR_ENABLE_PROFILING` | `1`
    `CORECLR_PROFILER`         | `{846F5F1C-F9AE-4B07-969E-05C26BC060D8}`
    `CORECLR_PROFILER_PATH`    | `/opt/datadog/Datadog.Trace.ClrProfiler.Native.so`
    `DD_INTEGRATIONS`          | `/opt/datadog/integrations.json`
    `DD_DOTNET_TRACER_HOME`    | `/opt/datadog`

#### Set the environment variables by bash script

To set the required environment variables from a bash file before starting your application:

```bash
# Set environment variables
export CORECLR_ENABLE_PROFILING=1
export CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
export CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
export DD_INTEGRATIONS=/opt/datadog/integrations.json
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
    ENV DD_INTEGRATIONS=/opt/datadog/integrations.json
    ENV DD_DOTNET_TRACER_HOME=/opt/datadog

    # Start your application
    CMD ["dotnet", "example.dll"]
    ```

#### SystemCTL (per service)

When using `systemctl` to run .NET applications as a service, you can add the required environment variables to be loaded for a specific service.

1. Create a file called `environment.env` containing:

    ```bat
    CORECLR_ENABLE_PROFILING=1
    CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
    CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
    DD_INTEGRATIONS=/opt/datadog/integrations.json
    DD_DOTNET_TRACER_HOME=/opt/datadog
    # any other environment variable used by the application
    ```
2. In the service's configuration file, reference this as an [`EnvironmentFile`][2] in the service block:

    ```bat
    [Service]
    EnvironmentFile=/path/to/environment.env
    ExecStart=<command used to start the application>
    ```
3. Restart the .NET service for the environment variable settings to take effect.

#### SystemCTL (all services)

<div class="alert alert-warning"> 
  <strong>Note:</strong> The .NET runtime tries to load a profiler into <em>any</em> .NET process that is started with these environment variables set. You should limit instrumentation to only the applications that need to be traced. <strong>Don't set these environment variables globally as this causes <em>all</em> .NET processes on the host to load the profiler.</strong>
</div>

When using `systemctl` to run .NET applications as a service, you can also set environment variables to be loaded for all services run by `systemctl`. 

1. Set the required environment variables by running [`systemctl set-environment`][2]:

    ```bat
    systemctl set-environment CORECLR_ENABLE_PROFILING=1
    systemctl set-environment CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
    systemctl set-environment CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
    systemctl set-environment DD_INTEGRATIONS=/opt/datadog/integrations.json
    systemctl set-environment DD_DOTNET_TRACER_HOME=/opt/datadog
    ```
2. Verify that the environment variables were set by running `systemctl show-environment`.

3. Restart the .NET service for the environment variables to take effect.

[1]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
[2]: https://www.freedesktop.org/software/systemd/man/systemctl.html#set-environment%20VARIABLE=VALUE%E2%80%A6
{{% /tab %}}

{{< /tabs >}}

### Configure the Datadog Agent for APM

Install and configure the Datadog Agent to receive traces from your instrumented application. By default the Datadog Agent is enabled in your `datadog.yaml` file under `apm_enabled: true` and listens for trace traffic at `localhost:8126`. For containerized environments, follow the in-app [Quickstart instructions][2] to enable trace collection within the Datadog Agent.

## Custom Instrumentation

<div class="alert alert-warning"> 
  <strong>Note:</strong> If you are using both automatic and custom instrumentation, it is important to keep the package versions (for example, MSI and NuGet) in sync.
</div>

To use custom instrumentation in your .NET application:
1. Add the `Datadog.Trace` [NuGet package][2] to your application. 
2. In your application code, access the global tracer through the `Datadog.Trace.Tracer.Instance` property to create new spans.

For more details on custom instrumentation and custom tagging, see [.NET Custom Instrumentation documentation][3].

## Configuring the .NET Tracer

The .NET Tracer has configuration settings that can be set by any of these methods:

* Environment variables.
* In the .NET application code.
* Using a `datadog.json` file.

{{< tabs >}}

{{% tab "Environment variables" %}}

To configure the tracer using environment variables, set the variables before launching the instrumented application.

#### Windows

**Note:** To set environment variables for a Windows Service, use the multi-string key `HKLM\System\CurrentControlSet\Services\{service name}\Environment` in the Windows Registry, as described above.

```cmd
rem Set environment variables
SET DD_TRACE_AGENT_URL=http://localhost:8126
SET DD_ENV=prod
SET DD_SERVICE=MyService
SET DD_VERSION=abc123

rem Launch application
example.exe
```

#### Linux

```bash
# Set environment variables
export DD_TRACE_AGENT_URL=http://localhost:8126
export DD_ENV=prod
export DD_SERVICE=MyService
export DD_VERSION=abc123

# Launch application
dotnet example.dll
```

{{% /tab %}}

{{% tab "Code" %}}

To configure the Tracer in application code, create a `TracerSettings` from the default configuration sources. Set properties on this `TracerSettings` instance before passing it to a `Tracer` constructor. For example:

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
settings.AgentUri = new Uri("http://localhost:8126/");

// disable the AdoNet integration
settings.Integrations["AdoNet"].Enabled = false;

// create a new Tracer using these settings
var tracer = new Tracer(settings);

// set the global tracer
Tracer.Instance = tracer;
```

{{% /tab %}}

{{% tab "JSON file" %}}

To configure the Tracer using a JSON file, create `datadog.json` in the instrumented application's directory. The root JSON object must be an object with a key/value pair for each setting. For example:

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

<div class="alert alert-info"> 
  <strong>Note:</strong> On Linux, the names of environment variables are case-sensitive.
</div>

Using the methods described above, customize your tracing configuration with the variables in the following tables. Use the first name (for example, `DD_TRACE_AGENT_URL`) when setting environment variables or configuration files. The second name (for example, `AgentUri`), indicates the name for the `TracerSettings` property to use when changing settings in code.

#### Unified Service Tagging

To use [Unified Service Tagging][4], configure the following settings for your services:

| Setting Name                                        | Description                                                                                                                                                                                                       |
|-----------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_ENV`<br/><br/>`Environment`                     | If specified, adds the `env` tag with the specified value to all generated spans. Added in version 1.17.0.                                                            |
| `DD_SERVICE`<br/><br/>`ServiceName`                 | If specified, sets the service name. Otherwise, the .NET Tracer tries to determine service name automatically from application name (the IIS application name, process entry assembly, or process name). Added in version 1.17.0.  |
| `DD_VERSION`<br/><br/>`ServiceVersion`              | If specified, sets the version of the service. Added in version 1.17.0. |


#### Additional optional configuration

The following table below lists configuration variables that are available for both automatic and custom instrumentation.

| Setting Name                                        | Description                                                                                                                                                                                                       |
|-----------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_TRACE_AGENT_URL`<br/><br/>`AgentUri`            | Sets the URL endpoint where traces are sent. Overrides `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT` if set. Default value is `http://<DD_AGENT_HOST>:<DD_TRACE_AGENT_PORT>`.       |
| `DD_AGENT_HOST`                                     | Sets the host where traces are sent (the host running the Agent). Can be a hostname or an IP address. Ignored if `DD_TRACE_AGENT_URL` is set. Default value is `localhost`.                 |
| `DD_TRACE_AGENT_PORT`                               | Sets the port where traces are sent (the port where the Agent is listening for connections). Ignored if `DD_TRACE_AGENT_URL` is set. Default value is `8126`.                     |
| `DD_LOGS_INJECTION`<br/><br/>`LogsInjectionEnabled` | Enables or disables automatic injection of correlation identifiers into application logs.                                                                                               |
| `DD_TRACE_GLOBAL_TAGS`<br/><br/>`GlobalTags`        | If specified, adds all of the specified tags to all generated spans.                                                                                                                                              |
| `DD_TRACE_DEBUG` <br/><br/>`DebugEnabled`           | Enables or disables debug logging. Valid values are: `true` or `false` (default).                                                                          |
| `DD_TRACE_HEADER_TAGS`                              | Accepts a map of case-insensitive header keys to tag names and automatically applies matching header values as tags on root spans. Also accepts entries without a specified tag name. Example: `CASE-insensitive-Header:my-tag-name,User-ID:userId,My-Header-And-Tag-Name`. Added in version 1.18.3. Response header support and entries without tag names added in version 1.26.0. |
| `DD_TRACE_LOG_DIRECTORY`                            | Sets the directory for .NET Tracer logs.<br/><br/>Default: `%ProgramData%\Datadog .NET Tracer\logs\`      |
| `DD_TRACE_LOG_PATH`                                 | Sets the path for the automatic instrumentation log file and determines the directory of all other .NET Tracer log files. Ignored if `DD_TRACE_LOG_DIRECTORY` is set.             |
| `DD_TRACE_LOGGING_RATE`                             | Sets rate limiting for log messages. If set, unique log lines will be written once per `x` seconds. For example, to log a given message once per 60 seconds, set to `60`. Setting to `0` disables log rate limiting. Added in version 1.24.0. Disabled by default. |
| `DD_TRACE_SERVICE_MAPPING`                          | Rename services using configuration. Accepts a map of service name keys to rename, and the name to use instead, in the format `[from-key]:[to-name]`. For example: `mysql:main-mysql-db, mongodb:offsite-mongodb-service`. `from-key` is specific to the integration type, and should exclude the application name prefix. For example, to rename `my-application-sql-server` to `main-db`, use `sql-server:main-db`. Added in version 1.23.0 |
| `DD_TAGS`<br/><br/>`GlobalTags`                     | If specified, adds all of the specified tags to all generated spans Example: `layer:api,team:intake`. Added in version 1.17.0.                                                           |
        

#### Automatic instrumentation optional configuration

The following table lists configuration variables that are available **only** when using automatic instrumentation.

| Setting Name                                                   | Description                                                                                                                                                                                                                                                                              |
|----------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_TRACE_ENABLED`<br/><br/>`TraceEnabled`                      | Enables or disables all automatic instrumentation. Setting the environment variable to `false` completely disables the CLR profiler. For other configuration methods, the CLR profiler is still loaded, but traces will not be generated. Valid values are: `true` (default) or `false`. |
| `DD_DISABLED_INTEGRATIONS`<br/><br/>`DisabledIntegrationNames`  | Sets a list of integrations to disable. All other integrations remain enabled. If not set, all integrations are enabled. Supports multiple values separated with semicolons. Valid values are the integration names listed in the [Integrations][5] section.           |
| `DD_HTTP_CLIENT_ERROR_STATUSES`                                 | Sets status code ranges that will cause HTTP client spans to be marked as errors. Default value is `400-499`. |
| `DD_HTTP_SERVER_ERROR_STATUSES`                                 | Sets status code ranges that will cause HTTP server spans to be marked as errors. Default value is `500-599`. |
| `DD_RUNTIME_METRICS_ENABLED`                                    | Enables .NET runtime metrics. Valid values are `true` or `false`. Default value is `false`. Added in version 1.23.0.
| `DD_TRACE_ADONET_EXCLUDED_TYPES`<br/><br/>`AdoNetExcludedTypes` | Sets a list of `AdoNet` types (for example, `System.Data.SqlClient.SqlCommand`) that will be excluded from automatic instrumentation. |


#### Disable integration configuration

The following table lists the configuration variables that are available **only** when automatic instrumentation can be set for each integration. 

| Setting Name                                                                  | Description                                                                                                           |
|-------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| `DD_TRACE_<INTEGRATION_NAME>_ENABLED`<br/><br/>`Integrations[<INTEGRATION_NAME>].Enabled`            | Enables or disables a specific integration. Valid values are: `true` (default) or `false`. Integration names are listed in the [Integrations][5] section.                          |

#### Experimental features

The following table lists configuration variables for features that are available for use but may change in future releases. 

| Setting Name                                        | Description                                                                                                                                                                                                       |
|-----------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_TRACE_ROUTE_TEMPLATE_RESOURCE_NAMES_ENABLED`    | Enables improved resource names for web spans when set to `true`. Uses route template information where available, adds an additional span for ASP.NET Core integrations, and enables additional tags. Default value is `false`. Added in version 1.26.0.             |
| `DD_TRACE_PARTIAL_FLUSH_ENABLED`                    | Enables incrementally flushing large traces to the Datadog Agent, reducing the chance of rejection by the Agent. Use only when you have long-lived traces or traces with many spans. Valid values are `true` or `false` (default). Added in version 1.26.0, only compatible with the Datadog Agent 7.26.0+.             |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/setup_overview/compatibility_requirements/dotnet-core
[2]: https://www.nuget.org/packages/Datadog.Trace
[3]: /tracing/setup_overview/custom_instrumentation/dotnet/
[4]: /getting_started/tagging/unified_service_tagging/
[5]: /tracing/setup_overview/compatibility_requirements/dotnet-core#integrations
