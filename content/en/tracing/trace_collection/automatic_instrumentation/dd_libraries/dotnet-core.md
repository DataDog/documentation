---
title: Tracing .NET Core Applications
aliases:
  - /tracing/dotnet-core
  - /tracing/languages/dotnet-core
  - /tracing/setup/dotnet-core
  - /agent/apm/dotnet-core/
  - /tracing/setup/dotnet-core
  - /tracing/setup_overview/dotnet-core
  - /tracing/setup_overview/setup/dotnet-core
  - /tracing/trace_collection/dd_libraries/dotnet-core
code_lang: dotnet-core
type: multi-code-lang
code_lang_weight: 60
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
  - link: 'https://www.datadoghq.com/blog/asp-dotnet-core-monitoring/'
    tag: 'Blog'
    text: 'Monitor containerized ASP.NET Core applications'
  - link: "https://www.datadoghq.com/blog/deploy-dotnet-core-azure-app-service/"
    tag: "Blog"
    text: "Deploy ASP.NET Core applications to Azure App Service"
  - link: "https://www.datadoghq.com/blog/dotnet-datadog-continuous-profiler/"
    tag: "Blog"
    text: "Optimize your .NET application performance with the Datadog Continuous Profiler"
  - link: "https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples"
    tag: "Source Code"
    text: "Examples of custom instrumentation"
  - link: "https://github.com/DataDog/dd-trace-dotnet"
    tag: "Source Code"
    text: "Source code"
---

## Compatibility requirements

### Supported .NET Core runtimes

The .NET Tracer supports instrumentation on .NET Core 3.1, .NET 5, .NET 6, .NET 7, .NET 8, and .NET 9.

For a full list of Datadog's .NET Core library and processor architecture support (including legacy and maintenance versions), see [Compatibility Requirements][1].

## Installation and getting started

<div class="alert alert-info">
    To set up Datadog APM in AWS Lambda, see <strong><a href="/tracing/serverless_functions/">Tracing Serverless Functions</a></strong>, in Azure App Service, see <strong><a href="/serverless/azure_app_services/">Tracing Azure App Service</a></strong>.
</div>

<div class="alert alert-warning">
  <strong>Note:</strong> Datadog's automatic instrumentation relies on the .NET CLR Profiling API. This API allows only one subscriber (for example, Datadog APM). To ensure maximum visibility, run only one APM solution in your application environment. 
</div>

<div class="alert alert-info">
  To instrument trimmed apps, reference the <a href="https://www.nuget.org/packages/Datadog.Trace.Trimming/">Datadog.Trace.Trimming</a> NuGet package in your project.
</div>

### Installation

Before you begin, make sure you've already [installed and configured the Agent][12].

1. [Install the tracer.](#install-the-tracer)
2. [Enable the tracer for your service.](#enable-the-tracer-for-your-service)
3. [View your live data.](#view-your-live-data)

### Install the tracer

After you install and configure your Datadog Agent, the next step is to add the tracing library directly in the application to instrument it. Read more about [compatibility information][1].

You can install the Datadog .NET Tracer machine-wide so that all services on the machine are instrumented, or you can install it on a per-application basis to allow developers to manage the instrumentation through the application's dependencies. To see machine-wide installation instructions, click the Windows or Linux tab. To see per-application installation instructions, click the NuGet tab.

{{< tabs >}}

{{% tab "Windows" %}}

To install the .NET Tracer machine-wide:

1. Download the [.NET Tracer MSI installer][1]. Use the x64 MSI installer if you are running 64-bit Windows; this can instrument both 64-bit and 32-bit applications. Only choose the x86 installer if you are running 32-bit Windows. Starting with v3.0.0, only the x64 installer is provided, as we do not support 32-bit operating systems.

2. Run the .NET Tracer MSI installer with administrator privileges.

You can also script the MSI setup by running the following in PowerShell: `Start-Process -Wait msiexec -ArgumentList '/qn /i datadog-apm.msi'`

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
   : `sudo tar -C /opt/datadog -xzf datadog-dotnet-apm-<TRACER_VERSION>-musl.tar.gz && sh /opt/datadog/createLogPath.sh`

   Other distributions
   : `sudo tar -C /opt/datadog -xzf datadog-dotnet-apm-<TRACER_VERSION>.tar.gz && /opt/datadog/createLogPath.sh`

#### Chiseled containers

To install the .NET Tracer in chiseled or distroless Docker images (without a shell), use the following Dockerfile commands:

- Use `ADD` to put the tracer files in the container.
- Use `COPY --chown=$APP_UID` with an empty folder as source to create the logs path.

For example, in your Dockerfile:

```dockerfile
ADD datadog-dotnet-apm-<TRACER_VERSION>.tar.gz /opt/datadog/
COPY --chown=$APP_UID --from=<OTHER_STAGE> /empty/ /var/log/datadog/dotnet/
```

[1]: https://github.com/DataDog/dd-trace-dotnet/releases
{{% /tab %}}

{{% tab "NuGet" %}}

<div class="alert alert-warning">
  <strong>Note:</strong> This installation does not instrument applications running in IIS. For applications running in IIS, follow the Windows machine-wide installation process.
</div>

To install the .NET Tracer per-application:

1. Add the `Datadog.Trace.Bundle` [NuGet package][1] to your application.

[1]: https://www.nuget.org/packages/Datadog.Trace.Bundle
{{% /tab %}}

{{< /tabs >}}

### Enable the tracer for your service

To enable the .NET Tracer for your service, set the required environment variables and restart the application.

For information about the different methods for setting environment variables, see [Configuring process environment variables](#configuring-process-environment-variables).

{{< tabs >}}

{{% tab "Windows" %}}

#### Internet Information Services (IIS)

1. The .NET Tracer MSI installer adds all required environment variables. There are no environment variables you need to configure.

   <div class="alert alert-warning">
     <strong>Note:</strong> You must set the <strong>.NET CLR version</strong> for the application pool to <strong>No Managed Code</strong> as recommended by <a href='https://learn.microsoft.com/aspnet/core/host-and-deploy/iis/advanced#create-the-iis-site'> Microsoft</a>.
   </div>

2. To automatically instrument applications hosted in IIS, completely stop and start IIS by running the following commands as an administrator:

   ```cmd
   net stop /y was
   net start w3svc
   # Also, start any other services that were stopped when WAS was shut down.
   ```

   <div class="alert alert-warning">
     <strong>Note:</strong> Always use the commands above to completely stop and restart IIS to enable the tracer. Avoid using the IIS Manager GUI application or <code>iisreset.exe</code>.
   </div>


#### Services not in IIS

1. Set the following required environment variables for automatic instrumentation to attach to your application:

   ```
   CORECLR_ENABLE_PROFILING=1
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

Follow the instructions in the package readme, also available in [`dd-trace-dotnet` repository][1].
Docker examples are also available in the [repository][2].

[1]: https://github.com/DataDog/dd-trace-dotnet/tree/master/docs/Datadog.Trace.Bundle/README.md
[2]: https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples/NugetDeployment
{{% /tab %}}

{{< /tabs >}}

### View your live data

After enabling the .NET Tracer for your service:

1. Restart your service.

2. Create application load.

3. In Datadog, navigate to [**APM** > **APM Traces**][3].

## Configuration

If needed, configure the tracing library to send application performance telemetry data as you require, including setting up Unified Service Tagging. Read [Library Configuration][4] for details.

## Custom instrumentation

Custom instrumentation depends on your automatic instrumentation and includes additional steps depending on the method:

{{< tabs >}}

{{% tab "Windows" %}}

<div class="alert alert-warning">
  <strong>Note:</strong> Starting with v3.0.0, custom instrumentation requires you also use automatic instrumentation. You should aim to keep both automatic and custom instrumentation package versions (for example: MSI and NuGet) in sync, and ensure you don't mix major versions of packages.
</div>

To use custom instrumentation in your .NET application:

1. Instrument your application using automatic instrumentation.
2. Add the `Datadog.Trace` [NuGet package][1] to your application.
3. In your application code, access the global tracer through the `Datadog.Trace.Tracer.Instance` property to create new spans.

[1]: https://www.nuget.org/packages/Datadog.Trace
{{% /tab %}}

{{% tab "Linux" %}}

<div class="alert alert-warning">
  <strong>Note:</strong> Starting with v3.0.0, custom instrumentation requires you also use automatic instrumentation. You should aim to keep both automatic and custom instrumentation package versions (for example: MSI and NuGet) in sync, and ensure you don't mix major versions of packages.
</div>

To use custom instrumentation in your .NET application:
1. Instrument your application using automatic instrumentation.
2. Add the `Datadog.Trace` [NuGet package][1] to your application.
3. In your application code, access the global tracer through the `Datadog.Trace.Tracer.Instance` property to create new spans.

[1]: https://www.nuget.org/packages/Datadog.Trace
{{% /tab %}}

{{% tab "NuGet" %}}

To use custom instrumentation in your .NET application:

1. In your application code, access the global tracer through the `Datadog.Trace.Tracer.Instance` property to create new spans.

{{% /tab %}}

{{< /tabs >}}

For more information on adding spans and tags for custom instrumentation, see the [.NET Custom Instrumentation documentation][5].

## Configuring process environment variables

To attach automatic instrumentation to your service, you must set the required environment variables before starting the application. See [Enable the tracer for your service](#enable-the-tracer-for-your-service) section to identify which environment variables to set based on your .NET Tracer installation method and follow the examples below to correctly set the environment variables based on the environment of your instrumented service.

### Windows

<div class="alert alert-warning">
  <strong>Note:</strong> The .NET runtime tries to load the .NET library into <em>any</em> .NET process that is started with these environment variables set. You should limit instrumentation to only the applications that need to be instrumented. <strong>Don't set these environment variables globally as this causes <em>all</em> .NET processes on the host to be instrumented.</strong>
</div>

#### Windows services

{{< tabs >}}

{{% tab "Registry Editor" %}}

In the Registry Editor, create a multi-string value called `Environment` in the `HKLM\System\CurrentControlSet\Services\<SERVICE NAME>` key and set the value data to:

```text
CORECLR_ENABLE_PROFILING=1
```

{{< img src="tracing/setup/dotnet/RegistryEditorCore.png" alt="Using the Registry Editor to create environment variables for a Windows service" >}}

{{% /tab %}}

{{% tab "PowerShell" %}}

```powershell
Set-ItemProperty HKLM:SYSTEM\CurrentControlSet\Services\<SERVICE NAME> -Name Environment -Value 'CORECLR_ENABLE_PROFILING=1'
```
{{% /tab %}}

{{< /tabs >}}

#### IIS

After installing the MSI, no additional configuration is needed to automatically instrument your IIS sites. To set additional environment variables that are inherited by all IIS sites, perform the following steps:

1. Open the Registry Editor, find the multi-string value called `Environment` in the `HKLM\System\CurrentControlSet\Services\WAS` key, and add the environment variables, one per line. For example, to add logs injection and runtime metrics, add the following lines to the value data:
   ```text
   DD_LOGS_INJECTION=true
   DD_RUNTIME_METRICS_ENABLED=true
   ```
2. Run the following commands to restart IIS:
   ```cmd
   net stop /y was
   net start w3svc
   # Also, start any other services that were stopped when WAS was shut down.
   ```

{{< img src="tracing/setup/dotnet/RegistryEditorIIS.png" alt="Using the Registry Editor to create environment variables for all IIS sites" >}}

#### Console applications

To automatically instrument a console application, set the environment variables from a batch file before starting your application:

```bat
rem Set required environment variables
SET CORECLR_ENABLE_PROFILING=1

rem (Optional) Set additional Datadog environment variables, for example:
SET DD_LOGS_INJECTION=true
SET DD_RUNTIME_METRICS_ENABLED=true

rem Start application
dotnet.exe example.dll
```

### Linux

#### Bash script

To set the required environment variables from a bash file before starting your application:

```bash
# Set required environment variables
export CORECLR_ENABLE_PROFILING=1
export CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
export CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
export DD_DOTNET_TRACER_HOME=/opt/datadog

# (Optional) Set additional Datadog environment variables, for example:
export DD_LOGS_INJECTION=true
export DD_RUNTIME_METRICS_ENABLED=true

# Start your application
dotnet example.dll
```

<div class="alert alert-info"> If you are using Alpine Linux, set the <code>CORECLR_PROFILER_PATH</code> environment variable to a path for musl based distributions: <code>linux-musl-x64/</code>.</div>

#### Linux Docker container

To set the required environment variables on a Linux Docker container:

  ```docker
  # Set required environment variables
  ENV CORECLR_ENABLE_PROFILING=1
  ENV CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
  ENV CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
  ENV DD_DOTNET_TRACER_HOME=/opt/datadog

  # (Optional) Set additional Datadog environment variables, for example:
  ENV DD_LOGS_INJECTION=true
  ENV DD_RUNTIME_METRICS_ENABLED=true

  # Start your application
  CMD ["dotnet", "example.dll"]
  ```

#### `systemctl` (per service)

When using `systemctl` to run .NET applications as a service, you can add the required environment variables to be loaded for a specific service.

1. Create a file called `environment.env` containing:

    ```ini
    # Set required environment variables
    CORECLR_ENABLE_PROFILING=1
    CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
    CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
    DD_DOTNET_TRACER_HOME=/opt/datadog

    # (Optional) Set additional Datadog environment variables, for example:
    DD_LOGS_INJECTION=true
    DD_RUNTIME_METRICS_ENABLED=true
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
  <strong>Note:</strong> The .NET runtime tries to load the .NET library into <em>any</em> .NET process that is started with these environment variables set. You should limit instrumentation to only the applications that need to be instrumented. <strong>Don't set these environment variables globally as this causes <em>all</em> .NET processes on the host to be instrumented.</strong>
</div>

When using `systemctl` to run .NET applications as a service, you can also set environment variables to be loaded for all services run by `systemctl`.

1. Set the required environment variables by running [`systemctl set-environment`][6]:

    ```bash
    # Set required environment variables
    systemctl set-environment CORECLR_ENABLE_PROFILING=1
    systemctl set-environment CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
    systemctl set-environment CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
    systemctl set-environment DD_DOTNET_TRACER_HOME=/opt/datadog

    # (Optional) Set additional Datadog environment variables, for example:
    systemctl set-environment DD_LOGS_INJECTION=true
    systemctl set-environment DD_RUNTIME_METRICS_ENABLED=true
    ```
2. Verify that the environment variables were set by running `systemctl show-environment`.

3. Restart the .NET service for the environment variables to take effect.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /tracing/trace_collection/compatibility/dotnet-core
[2]: /agent/
[3]: https://app.datadoghq.com/apm/traces
[4]: /tracing/trace_collection/library_config/dotnet-core/
[5]: /tracing/trace_collection/custom_instrumentation/dotnet/
[6]: https://www.freedesktop.org/software/systemd/man/systemctl.html#set-environment%20VARIABLE=VALUE%E2%80%A6
[11]: /tracing/trace_collection/library_injection_local/
[12]: /tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent
