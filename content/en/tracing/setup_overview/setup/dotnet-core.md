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
  - link: "https://github.com/DataDog/dd-trace-dotnet"
    tag: "GitHub"
    text: "Source code"
  - link: "https://www.datadoghq.com/blog/net-monitoring-apm/"
    tag: "Blog"
    text: ".NET monitoring with Datadog APM and distributed tracing"
  - link: "/tracing/visualization/"
    tag: "Documentation"
    text: "Explore your services, resources and traces"
  - link: "/tracing/"
    tag: "Advanced Usage"
    text: "Advanced Usage"
  - link: "https://github.com/DataDog/dd-trace-dotnet/tree/master/samples"
    tag: "GitHub"
    text: "Examples of Custom Instrumentation"
---

## Compatibility Requirements

The .NET Tracer supports automatic instrumentation on:
  - .NET 5
  - .NET Core 3.1
  - .NET Core 2.1. 
For a full list of supported libraries, visit the [Compatibility Requirements][1] page.

## Installation and getting started

## Automatic Instrumentation

<div class="alert alert-warning"> 
  <strong>Note:</strong>  If you are using both automatic and custom instrumentation, it is important to keep the package versions (for example, MSI and NuGet) in sync.
</div>

### Installation

{{< tabs >}}

{{% tab "Windows" %}}

1. [Install and configure the Windows Datadog Agent][1].
2. Download the [.NET Tracer MSI installer][2]. Select the MSI installer for the architecture that matches the operating system (x64 or x86).
3. Run the .NET Tracer MSI installer with administrator privileges.
4. Restart IIS by running the following commands as an administrator:
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
2. Download and install the .NET Tracer into the application environment.
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
    - **Alpine or other [Musl-based distributions][2]**
      ```bash
      sudo mkdir -p /opt/datadog
      curl -L https://github.com/DataDog/dd-trace-dotnet/releases/download/v<TRACER_VERSION>/datadog-dotnet-apm-<TRACER_VERSION>-musl.tar.gz \
      | sudo tar xzf - -C /opt/datadog
      ```
    - For other distributions, download the tar archive with the `glibc-linked` binary:
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

### Required Environment Variables

{{< tabs >}}

{{% tab "Windows" %}}

#### Applications not hosted in IIS

To enable automatic instrumentation on For Windows applications not in IIS, you must set two environment variables before starting your application:

Name                       | Value
---------------------------|------
`CORECLR_ENABLE_PROFILING` | `1`
`CORECLR_PROFILER`         | `{846F5F1C-F9AE-4B07-969E-05C26BC060D8}`

<div class="alert alert-warning"> 
  <strong>Note:</strong> The .NET runtime tries to load a profiler into any .NET process started with these environment variables set. You should limit instrumentation only to the applications that need to be traced. Don't set these environment variables globally because this causes all .NET processes on the host to load the profiler.
</div>

#### Windows services

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

#### Console applications

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

1. Set `apm_non_local_traffic: true` in your main [`datadog.yaml` configuration file][1]

2. See the specific setup instructions to ensure that the Agent is configured to receive traces in a containerized environment:

{{< partial name="apm/apm-containers.html" >}}
</br>

3. After having instrumented your application, the tracing client sends traces to `localhost:8126` by default.  If this is not the correct host and port change it by setting the below env variables:

`DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT`.

4. On Linux, the following environment variables are required to enable automatic instrumentation:

Name                       | Value
---------------------------|------
`CORECLR_ENABLE_PROFILING` | `1`
`CORECLR_PROFILER`         | `{846F5F1C-F9AE-4B07-969E-05C26BC060D8}`
`CORECLR_PROFILER_PATH`    | `/opt/datadog/Datadog.Trace.ClrProfiler.Native.so`
`DD_INTEGRATIONS`          | `/opt/datadog/integrations.json`
`DD_DOTNET_TRACER_HOME`    | `/opt/datadog`

**Note:** You must change the paths above if you install the .NET Tracer into a non-default path.

For example, to set the environment variables them from a bash file before starting your application:

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

To set the environment variables on a Linux Docker container, use [`ENV`][2]:

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


#### Systemctl (Per Service)

When using `systemctl` to run .NET applications as a service, you can add the required environment variables to be loaded for a specific service.

Create a file called `environment.env` containing:

```bat
CORECLR_ENABLE_PROFILING=1
CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
DD_INTEGRATIONS=/opt/datadog/integrations.json
DD_DOTNET_TRACER_HOME=/opt/datadog
# any other environment variable used by the application
```

In the service configuration file, reference this as an [`EnvironmentFile`][3] in the service block:

```bat
[Service]
EnvironmentFile=/path/to/environment.env
ExecStart=<command used to start the application>
```
After setting these variables, restart the .NET service for the environment variables to take effect.

#### Systemctl (All Services)

When using `systemctl` to run .NET applications as a service, you can also set environment variables to be loaded for all services ran via `systemctl`. To confirm these variables have been set, use [`systemctl show-environment`][3]. Before using this approach, see the note below about this instrumenting all .NET processes.

```bat
systemctl set-environment CORECLR_ENABLE_PROFILING=1
systemctl set-environment CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
systemctl set-environment CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
systemctl set-environment DD_INTEGRATIONS=/opt/datadog/integrations.json
systemctl set-environment DD_DOTNET_TRACER_HOME=/opt/datadog
```

Once this is set, verify that the environment variables were set with `systemctl show-environment`.

[1]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
[2]: https://docs.docker.com/engine/reference/builder/#env
[3]: https://www.freedesktop.org/software/systemd/man/systemd.exec.html#EnvironmentFile=
{{% /tab %}}

{{< /tabs >}}

**Note:** The .NET runtime tries to load a profiler into _any_ .NET process that is started with these environment variables set. You should limit instrumentation only to the applications that need to be traced. **We do not recommend setting these environment variables globally as this causes _all_ .NET processes on the host to load the profiler.**

### Configure the Datadog Agent for APM

Install and configure the Datadog Agent to receive traces from your instrumented application. By default the Datadog Agent is enabled in your `datadog.yaml` file under `apm_enabled: true` and listens for trace traffic at `localhost:8126`. For containerized environments, follow the in-app [Quickstart instructions][2] to enable trace collection within the Datadog Agent.

## Manual Instrumentation

To manually instrument your code, add the `Datadog.Trace` [NuGet package][3] to your application. In your code, access the global tracer through the `Datadog.Trace.Tracer.Instance` property to create new spans.

For more details on manual instrumentation and custom tagging, see [Manual instrumentation documentation][4].

Manual instrumentation is supported on .NET Framework 4.5 and above on Windows, on .NET Core 2.0 and above on Windows and Linux, and on .NET 5 on Windows and Linux.

**Note:**  If you are using both automatic and custom instrumentation, it is important to keep the package versions (for example, MSI and NuGet) in sync.

## Configuration

There are multiple ways to configure the .NET Tracer:

* setting environment variables
* in .NET code
* creating a `datadog.json` file

{{< tabs >}}

{{% tab "Environment variables" %}}

To configure the Tracer using environment variables, set the variables before launching the instrumented application.

For example, on Windows:

```cmd
rem Set environment variables
SET DD_TRACE_AGENT_URL=http://localhost:8126
SET DD_ENV=prod
SET DD_SERVICE=MyService
SET DD_VERSION=abc123

rem Launch application
example.exe
```

**Note:** To set environment variables for a Windows Service, use the multi-string key `HKLM\System\CurrentControlSet\Services\{service name}\Environment` in the Windows Registry.

On Linux:

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

**Note:** Settings must be set on `TracerSettings` _before_ creating the `Tracer`. Changes made to `TracerSettings` properies after the `Tracer` is created are ignored.

{{% /tab %}}

{{% tab "JSON file" %}}

To configure the Tracer using a JSON file, create `datadog.json` in the instrumented application's directory. The root JSON object must be a hash with a key/value pair for each setting. For example:

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

### Configuration Variables

Using the methods described above, customize your tracing configuration with the variables in the following tables. Use the first name (for example, `DD_TRACE_AGENT_URL`) when setting environment variables or configuration files. The second name (for example, `AgentUri`), indicates the name for the `TracerSettings` property to use when changing settings in code.

#### Unified Service Tagging

| Setting Name                                        | Description                                                                                                                                                                                                       |
|-----------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_ENV`<br/><br/>`Environment`                     | If specified, adds the `env` tag with the specified value to all generated spans. See [Agent configuration][8] for more details about the `env` tag.  Available for versions 1.17.0+.                                                            |
| `DD_SERVICE`<br/><br/>`ServiceName`            | If specified, sets the service name. Otherwise, the .NET Tracer tries to determine service name automatically from application name (e.g. IIS application name, process entry assembly, or process name). Available for versions 1.17.0+  |
| `DD_VERSION`<br/><br/>`ServiceVersion`            | If specified, sets the version of the service. Available for versions 1.17.0+
| `DD_TAGS`<br/><br/>`GlobalTags`       | If specified, adds all of the specified tags to all generated spans (e.g., `layer:api,team:intake`). Available for versions 1.17.0+                                                                                                                                              |

We highly recommend using `DD_ENV`, `DD_SERVICE`, and `DD_VERSION` to set `env`, `service`, and `version` for your services.
Check out the [Unified Service Tagging][5] documentation for recommendations on how to configure these environment variables.

#### Instrumentation

The following table below lists configuration variables that are available for both automatic and manual instrumentation.

| Setting Name                                        | Description                                                                                                                                                                                                       |
|-----------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_TRACE_AGENT_URL`<br/><br/>`AgentUri`            | Sets the URL endpoint where traces are sent. Overrides `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT` if set. Default value is `http://<DD_AGENT_HOST>:<DD_TRACE_AGENT_PORT>`.                                         |
| `DD_AGENT_HOST`                                     | Sets the host where traces are sent (the host running the Agent). Can be a hostname or an IP address. Ignored if `DD_TRACE_AGENT_URL` is set. Default is value `localhost`.                                       |
| `DD_TRACE_AGENT_PORT`                               | Sets the port where traces are sent (the port where the Agent is listening for connections). Ignored if `DD_TRACE_AGENT_URL` is set. Default value is `8126`.                                                     |
| `DD_LOGS_INJECTION`<br/><br/>`LogsInjectionEnabled` | Enables or disables automatic injection of correlation identifiers into application logs.                                                                                                                         |
| `DD_TRACE_GLOBAL_TAGS`<br/><br/>`GlobalTags`        | If specified, adds all of the specified tags to all generated spans.                                                                                                                                              |
| `DD_TRACE_DEBUG`                                    | Enables or disables debug logging. Valid values are: `true` or `false` (default).                                                                                                                                 |
| `DD_TRACE_HEADER_TAGS`                              | Accepts a map of case-insensitive header keys to tag names and automatically applies matching header values as tags on root spans. (e.g. : `CASE-insensitive-Header:my-tag-name,User-ID:userId`). Available for version 1.18.3+  |

The following table lists configuration variables that are available only when using automatic instrumentation.

| Setting Name                                                   | Description                                                                                                                                                                                                                                                                              |
|----------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_TRACE_ENABLED`<br/><br/>`TraceEnabled`                      | Enables or disables all automatic instrumentation. Setting the environment variable to `false` completely disables the CLR profiler. For other configuration methods, the CLR profiler is still loaded, but traces will not be generated. Valid values are: `true` (default) or `false`. |
| `DD_TRACE_DEBUG`                                                | Enables or disables debug logs in the Tracer. Valid values are: `true` or `false` (default). Setting this as an environment variable also enabled debug logs in the CLR Profiler.                                                                                                        |
| `DD_TRACE_LOG_DIRECTORY`                                        | Sets the directory for .NET Tracer logs.<br/><br/>Windows default: `%ProgramData%\Datadog .NET Tracer\logs\`<br/><br/>Linux default: `/var/log/datadog/dotnet/`                                                                                                                                                                                     |
| `DD_TRACE_LOG_PATH`                                             | Sets the path for the automatic instrumentation log file and determines the directory of all other .NET Tracer log files. Ignored if `DD_TRACE_LOG_DIRECTORY` is set.                                                                              |
| `DD_DISABLED_INTEGRATIONS`<br/><br/>`DisabledIntegrationNames`  | Sets a list of integrations to disable. All other integrations remain enabled. If not set, all integrations are enabled. Supports multiple values separated with semicolons. Valid values are the integration names listed in the [Integrations][1] section.           |
| `DD_HTTP_CLIENT_ERROR_STATUSES`                                 | Sets status code ranges that will cause HTTP client spans to be marked as errors. Default value is `400-499`. |
| `DD_HTTP_SERVER_ERROR_STATUSES`                                 | Sets status code ranges that will cause HTTP server spans to be marked as errors. Default value is `500-599`. |
| `DD_TRACE_ADONET_EXCLUDED_TYPES`<br/><br/>`AdoNetExcludedTypes` | Sets a list of `AdoNet` types (for example, `System.Data.SqlClient.SqlCommand`) that will be excluded from automatic instrumentation. |

The following table lists configuration variables that are available only when using automatic instrumentation and can be set for each integration. Use the first name (e.g. `DD_<INTEGRATION>_ENABLED`) when setting environment variables or configuration files. The second name (e.g. `Enabled`), indicates the name the `IntegrationSettings` property to use when changing settings in the code. Access these properties through the `TracerSettings.Integrations[]` indexer. Integration names are listed in the [Integrations][1] section. **Note:** On Linux, the names of environment variables are case-sensitive.

| Setting Name                                                                  | Description                                                                                                           |
|-------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| `DD_TRACE_<INTEGRATION>_ENABLED`<br/><br/>`Enabled`                           | Enables or disables a specific integration. Valid values are: `true` (default) or `false`.                            |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/compatibility_requirements/dotnet-core
[2]: https://app.datadoghq.com/apm/docs
[3]: https://www.nuget.org/packages/Datadog.Trace
[4]: /tracing/custom_instrumentation/dotnet/
[5]: /getting_started/tagging/unified_service_tagging/
