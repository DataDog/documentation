---
title: Enabling the .NET Profiler
code_lang: dotnet
type: multi-code-lang
code_lang_weight: 60
further_reading:
    - link: getting_started/profiler
      tag: Documentation
      text: Getting Started with Profiler
    - link: profiler/profile_visualizations
      tag: Documentation
      text: Learn more about available profile visualizations
    - link: profiler/profiler_troubleshooting/dotnet
      tag: Documentation
      text: Fix problems you encounter while using the profiler
    - link: "https://www.datadoghq.com/blog/dotnet-datadog-continuous-profiler/"
      tag: Blog
      text: Optimize your .NET application performance with the Datadog Continuous Profiler
aliases:
  - /tracing/profiler/enabling/dotnet/
---

The profiler is shipped within Datadog tracing libraries. If you are already using [APM to collect traces][5] for your application, you can skip installing the library and go directly to enabling the profiler.

## Requirements

For a summary of the minimum and recommended runtime and tracer versions across all languages, read [Supported Language and Tracer Versions][14].

Supported operating systems for .NET Framework
: Windows 10<br/>
Windows Server starting from version 2012

Supported operating systems for .NET Core and .NET 5+
: Linux with glibc 2.17+ (for example, CentOS 7+) and musl-based (Alpine) <br/>
Windows 10<br/>
Windows Server starting from version 2012

Serverless
: Azure App Service Windows and Linux - Web Apps only, Function Apps are not supported

Supported .NET runtimes (64-bit applications)
: .NET Framework 4.6.1+<br/>
.NET Core 2.1, 3.1<br/>
.NET 5<br/>
.NET 6<br/>
.NET 7<br/>
.NET 8

<div class="alert alert-warning">
  <strong>Note:</strong> For containers, <strong>at least one core</strong> is required. Read the <a href="/profiler/profiler_troubleshooting/dotnet#linux-containers">Troubleshooting documentation</a> for more details.
</div>

Supported languages
: Any language that targets the .NET runtime, such as C#, F#, and Visual Basic.

The following profiling features are available in the following minimum versions of the `dd-trace-dotnet` library:

| Feature                   | Required `dd-trace-dotnet` version | Required .NET Runtime versions                                                           |
|---------------------------|------------------------------------|------------------------------------------------------------------------------------------|
| Wall time profiling       | 2.7.0+                             | All supported runtime versions.                                                          |
| CPU profiling             | 2.15.0+                            | All supported runtime versions.                                                          |
| Exceptions profiling      | 2.31.0+                            | All supported runtime versions.                                                          |
| Allocations profiling     | beta, 2.18.0+                      | .NET 6+                                                                                  |
| Lock Contention profiling | 2.49.0+                            | .NET Framework beta (requires Datadog Agent 7.51+) and .NET 5+                           |
| Live heap profiling       | beta, 2.22.0+                      | .NET 7+                                                                                  |
| [Code Hotspots][12]       | 2.7.0+                             | All supported runtime versions.                                                          |
| [Endpoint Profiling][13]  | 2.15.0+                            | All supported runtime versions.                                                          |
| Timeline                  | 2.30.0+                            | All supported runtime versions (except .NET 5+ required for garbage collection details). |

## Installation

Ensure Datadog Agent v6+ is installed and running. Datadog recommends using [Datadog Agent v7+][1]. The profiler ships together with the tracing library (beginning with v2.8.0), so if you are already using [APM to collect traces][5] for your application, you can skip installing the library and go directly to [Enabling the profiler](#enabling-the-profiler).

Otherwise, install the profiler using the following steps, depending on your operating system.

<div class="alert alert-warning">
  <strong>Note:</strong> Datadog's automatic instrumentation relies on the .NET CLR Profiling API. Since this API allows only one subscriber, run only one APM solution in your application environment.
</div>


You can install the Datadog .NET Profiler machine-wide so that all services on the machine can be instrumented, or you can install it on a per-application basis to allow developers to manage the instrumentation through the application's dependencies. To see machine-wide installation instructions, click the **Windows** or **Linux** tab. To see per-application installation instructions, click the **NuGet** tab.

{{< tabs >}}

{{% tab "Linux" %}}
To install the .NET Profiler machine-wide:

1. Download the latest [.NET Tracer package][1] that supports your operating system and architecture.

2. Run one of the following commands to install the package and create the .NET log directory `/var/log/datadog/dotnet` with the appropriate permissions:

   Debian or Ubuntu
   : `sudo dpkg -i ./datadog-dotnet-apm_<TRACER_VERSION>_amd64.deb && sudo /opt/datadog/createLogPath.sh`

   CentOS 7+ or Fedora
   : `sudo rpm -Uvh datadog-dotnet-apm<TRACER_VERSION>-1.x86_64.rpm && sudo /opt/datadog/createLogPath.sh`

   Alpine or other musl-based distributions
   : `sudo tar -C /opt/datadog -xzf datadog-dotnet-apm<TRACER_VERSION>-musl.tar.gz && sudo sh /opt/datadog/createLogPath.sh`

   Other distributions
   : `sudo tar -C /opt/datadog -xzf datadog-dotnet-apm-<TRACER_VERSION>.tar.gz && sudo /opt/datadog/createLogPath.sh`


[1]: https://github.com/DataDog/dd-trace-dotnet/releases
{{% /tab %}}

{{% tab "Windows" %}}

To install the .NET Profiler machine-wide:

1. Install or upgrade to the latest version, using the [.NET Monitoring MSI installer][1]. Continuous Profiler supports 64-bit Windows, so you need the file like `datadog-dotnet-apm-<VERSION>-x64.msi`.

2. Run the installer with administrator privileges.

[1]: https://github.com/DataDog/dd-trace-dotnet/releases
{{% /tab %}}

{{% tab "NuGet" %}}

<div class="alert alert-warning">
  <strong>Note:</strong> This installation does not instrument applications running in IIS. For applications running in IIS, follow the Windows machine-wide installation process.
</div>

To install the .NET Profiler per-application:

1. Add the `Datadog.Trace.Bundle` [NuGet package][1] to your application.

[1]: https://www.nuget.org/packages/Datadog.Trace.Bundle
{{% /tab %}}

{{% tab "Azure App Service" %}}

<div class="alert alert-warning">
  <strong>Note:</strong> Only Web Apps are supported. Functions are not supported.
</div>

To install the .NET Profiler per-webapp:
1. Install the Azure App Service Datadog APM Extension [for Windows][1] or use the [Linux setup][2] for your webapp.

[1]: /serverless/azure_app_services/azure_app_services_windows/?tab=net#installation
[2]: /serverless/azure_app_services/azure_app_services_linux/?tab=nodenetphppython#setup
{{% /tab %}}

{{< /tabs >}}

<br>

## Enabling the Profiler

<div class="alert alert-info">
  <strong>Note</strong>: Datadog does not recommend enabling the profiler at machine-level or for all IIS applications. If you do have enabled it machine-wide, read the <a href="/profiler/profiler_troubleshooting/?code-lang=dotnet#avoid-enabling-the-profiler-machine-wide">Troubleshooting documentation</a> for information about reducing the overhead that is associated with enabling the profiler for all system applications.
</div>

{{< tabs >}}
{{% tab "Linux" %}}
3. Set the following required environment variables for automatic instrumentation to attach to your application:

   ```
   CORECLR_ENABLE_PROFILING=1
   CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
   CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
   DD_DOTNET_TRACER_HOME=/opt/datadog
   LD_PRELOAD=/opt/datadog/continuousprofiler/Datadog.Linux.ApiWrapper.x64.so
   DD_PROFILING_ENABLED=1
   DD_ENV=production
   DD_VERSION=1.2.3
   ```

4. For standalone applications, manually restart the application as you normally would.

5. A minute or two after starting your application, your profiles appear on the [Datadog APM > Profiler page][1].

[1]: https://app.datadoghq.com/profiling
{{% /tab %}}

{{% tab "Linux with Single Step Instrumentation" %}}

1. With [Single Step Instrumentation][2], set the following required environment variables for automatic instrumentation to attach to your application:

   ```
   LD_PRELOAD=/opt/datadog/apm/library/dotnet/continuousprofiler/Datadog.Linux.ApiWrapper.x64.so
   DD_PROFILING_ENABLED=1
   DD_ENV=production
   DD_VERSION=1.2.3
   ```

2. For standalone applications, manually restart the application as you normally would.

3. A minute or two after starting your application, your profiles appear on the [Datadog APM > Profiler page][1].

[1]: https://app.datadoghq.com/profiling
[2]: https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/?tab=singlestepinstrumentationbeta
{{% /tab %}}

{{% tab "Internet Information Services (IIS)" %}}

3. Set needed environment variables to configure and enable Profiler.
 To enable the Profiler for IIS applications, it is required to set the `DD_PROFILING_ENABLED` environment variable in the Registry under `HKLM\System\CurrentControlSet\Services\WAS` and `HKLM\System\CurrentControlSet\Services\W3SVC` nodes.

   <div class="alert alert-info">Starting v2.14.0, you don't need to set <code>CORECLR_PROFILER</code> or <code>COR_PROFILER</code> if you installed the tracer using the MSI.</div>

   **With the Registry Editor:**

   In the Registry Editor, modify the multi-string value called `Environment` in the `HKLM\System\CurrentControlSet\Services\WAS` and `HKLM\System\CurrentControlSet\Services\W3SVC` nodes and set the value data as follows:

   For .NET Core and .NET 5+:
   ```text
   CORECLR_ENABLE_PROFILING=1
   CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
   DD_PROFILING_ENABLED=1
   DD_ENV=production
   DD_VERSION=1.2.3
   ```

   {{< img src="tracing/setup/dotnet/RegistryEditorCore.png" alt="Using the Registry Editor to create environment variables for a .NET Core application in IIS" style="width:90%" >}}

   For .NET Framework:
   ```text
   COR_ENABLE_PROFILING=1
   COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
   DD_PROFILING_ENABLED=1
   DD_ENV=production
   DD_VERSION=1.2.3
   ```
   {{< img src="tracing/setup/dotnet/RegistryEditorFramework.png" alt="Using the Registry Editor to create environment variables for a .NET Framework application in IIS" style="width:90%" >}}

   <strong>Note</strong>: the environment variables are applied for <em>all</em> IIS applications. Starting with IIS 10, you can set environment variables for each IIS application in the <a href="https://docs.microsoft.com/en-us/iis/get-started/planning-your-iis-architecture/introduction-to-applicationhostconfig"><code>C:\Windows\System32\inetsrv\config\applicationhost.config</code> file</a>. Read the <a href="https://docs.microsoft.com/en-us/iis/configuration/system.applicationhost/applicationpools/add/environmentvariables/">Microsoft documentation</a> for more details.

4. Completely stop and start IIS by running the following commands as an administrator:

   ```cmd
   net stop /y was
   net start w3svc
   ```

   <div class="alert alert-warning">
     <strong>Note:</strong> Use <code>stop</code> and <code>start</code> commands. A reset or restart does not always work.
   </div>

5. A minute or two after starting your application, your profiles appear on the [Datadog APM > Profiler page][1].

[1]: https://app.datadoghq.com/profiling
{{% /tab %}}

{{% tab "Windows services" %}}
3. Set needed environment variables to configure and enable Profiler. To enable the Profiler for your service, it is required to set the `DD_PROFILING_ENABLED` environment variable in the Registry key associated to the service. If the profiler is running alone (the tracer is deactivated), you can optionally add the `DD_SERVICE`, `DD_ENV` and `DD_VERSION` environment variables.

   <div class="alert alert-info">Starting v2.14.0, you don't need to set <code>CORECLR_PROFILER</code> or <code>COR_PROFILER</code> if you installed the tracer using the MSI.</div>

   **With the Registry Editor:**

   In the Registry Editor, create a multi-string value called `Environment` in the  `HKLM\System\CurrentControlSet\Services\MyService` key and set the value data to:

   For .NET Core and .NET 5+:
   ```text
   CORECLR_ENABLE_PROFILING=1
   CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
   DD_PROFILING_ENABLED=1
   DD_SERVICE=MyService
   DD_ENV=production
   DD_VERSION=1.2.3
   ```
   {{< img src="tracing/setup/dotnet/RegistryEditorCore.png" alt="Using the Registry Editor to create environment variables for a Windows service" style="width:90%" >}}

   For .NET Framework:
   ```text
   COR_ENABLE_PROFILING=1
   COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
   DD_PROFILING_ENABLED=1
   DD_SERVICE=MyService
   DD_ENV=production
   DD_VERSION=1.2.3
   ```
   {{< img src="tracing/setup/dotnet/RegistryEditorFramework.png" alt="Using the Registry Editor to create environment variables for a Windows service" style="width:90%" >}}

   **With a PowerShell script:**

   For .NET Core and .NET 5+:
   ```powershell
   [string[]] $v = @(
       "CORECLR_ENABLE_PROFILING=1",
       "CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}",
       "DD_PROFILING_ENABLED=1",
       "DD_SERVICE=MyService",
       "DD_ENV=production",
       "DD_VERSION=1.2.3"
   )
   Set-ItemProperty HKLM:SYSTEM\CurrentControlSet\Services\MyService -Name Environment -Value $v
   ```

   For .NET Framework:
   ```powershell
   [string[]] $v = @(
       "COR_ENABLE_PROFILING=1",
       "COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}",
       "DD_PROFILING_ENABLED=1",
       "DD_SERVICE=MyService",
       "DD_ENV=production",
       "DD_VERSION=1.2.3"
   )
   Set-ItemProperty HKLM:SYSTEM\CurrentControlSet\Services\MyService -Name Environment -Value $v
   ```

4. A minute or two after you start your application, your profiles appear on the [Datadog APM > Profiler page][1].

[1]: https://app.datadoghq.com/profiling
{{% /tab %}}

{{% tab "Windows Standalone applications" %}}

   <div class="alert alert-info">Starting v2.14.0, you don't need to set <code>CORECLR_PROFILER</code> or <code>COR_PROFILER</code> if you installed the tracer using the MSI.</div>

3. Set needed environment variables to configure and enable Profiler for a non-service application, such as console, ASP.NET (Core), Windows Forms, or WPF. To enable the Profiler for Standalone applications, it is required to set the `DD_PROFILING_ENABLED` environment variable. If the profiler is running alone (the tracer is deactivated), you can optionally set the `DD_SERVICE`, `DD_ENV` and `DD_VERSION` environment variables. The recommended approach is to create a batch file that sets these and starts the application, and run your application using the batch file.

   For .NET Core and .NET 5+:
   ```cmd
   SET CORECLR_ENABLE_PROFILING=1
   SET CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
   SET DD_PROFILING_ENABLED=1
   SET DD_SERVICE=MyService
   SET DD_ENV=production
   SET DD_VERSION=1.2.3

   REM start the application here
   ```

   For .NET Framework:
   ```cmd
   SET COR_ENABLE_PROFILING=1
   SET COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
   SET DD_PROFILING_ENABLED=1
   SET DD_SERVICE=MyService
   SET DD_ENV=production
   SET DD_VERSION=1.2.3

   REM start the application here
   ```

4. A minute or two after you start your application, your profiles appear on the [Datadog APM > Profiler page][1].

[1]: https://app.datadoghq.com/profiling
{{% /tab %}}

{{% tab "NuGet" %}}

2. Set the following required environment variables for profiling to attach to your application:

   ```
   CORECLR_ENABLE_PROFILING=1
   CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
   CORECLR_PROFILER_PATH=<System-dependent path>
   DD_PROFILING_ENABLED=1
   LD_PRELOAD=<System-dependent path>
   DD_SERVICE=MyService
   DD_ENV=production
   DD_VERSION=1.2.3
   DD_DOTNET_TRACER_HOME=<APP_DIRECTORY>/datadog
   ```

   The value for the `<APP_DIRECTORY>` placeholder is the path to the directory containing the application's `.dll` files. The value for the `CORECLR_PROFILER_PATH` environment variable varies based on the system where the application is running:

   Operating System and Process Architecture | CORECLR_PROFILER_PATH Value | LD_PRELOAD Value
   ------------------------------------------|-------------------------------------|---------------------------
   Alpine Linux x64 | `<APP_DIRECTORY>/datadog/linux-musl-x64/Datadog.Trace.ClrProfiler.Native.so`| `<APP_DIRECTORY>/datadog/linux-musl-x64/Datadog.Linux.ApiWrapper.x64.so`
   Linux x64        | `<APP_DIRECTORY>/datadog/linux-x64/Datadog.Trace.ClrProfiler.Native.so` | `<APP_DIRECTORY>/datadog/linux-x64/Datadog.Linux.ApiWrapper.x64.so`
   Linux ARM64      | `<APP_DIRECTORY>/datadog/linux-arm64/Datadog.Trace.ClrProfiler.Native.so`| `<APP_DIRECTORY>/datadog/linux-arm64/Datadog.Linux.ApiWrapper.x64.so`
   Windows x64      | `<APP_DIRECTORY>\datadog\win-x64\Datadog.Trace.ClrProfiler.Native.dll` | N/A
   Windows x86      | `<APP_DIRECTORY>\datadog\win-x86\Datadog.Trace.ClrProfiler.Native.dll` | N/A

3. For Docker images running on Linux, configure the image to run the `createLogPath.sh` script:

   ```
   RUN /<APP_DIRECTORY>/datadog/createLogPath.sh
   ```

   Docker examples are available in the [`dd-trace-dotnet` repository][1].

4. For standalone applications, manually restart the application.

[1]: https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples/NugetDeployment
{{% /tab %}}

{{% tab "Azure App Service" %}}

2. Follow these installation guidelines ([Windows][1] or [Linux][2]) to set `DD_PROFILING_ENABLED:true` to enable the profiler.

[1]: /serverless/azure_app_services/azure_app_services_windows/?tab=net#installation
[2]: /serverless/azure_app_services/azure_app_services_linux/?tab=nodenetphppython#setup
{{% /tab %}}

{{< /tabs >}}


## Configuration

You can configure the profiler using the following environment variables. Note that most of these settings also apply to the Tracer configuration. Restart the application after any of these settings is changed.

| Environment variable                             | Type          | Description                                                                                      |
| ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------ |
| `DD_ENV`                   | String        | The [environment][3] name, for example, `production`. If not set, will be `unspecified-environment` |
| `DD_SERVICE`               | String        | The [service][3] name, for example, `web-backend`. If this is not specified, the .NET Profiler tries to determine the service name automatically from the application name (process entry assembly or process name).    |
| `DD_VERSION`               | String        | The [version][3] of your service. If not set, will be `unspecified-version` |
| `DD_TAGS`                  | String        | Tags to apply to an uploaded profile. Must be a list of `<key>:<value>` separated by commas such as: `layer:api,team:intake`.   |
| `DD_AGENT_HOST`            | String        | Sets the host where profiles are sent (the host running the Agent). Can be a hostname or an IP address. Ignored if `DD_TRACE_AGENT_URL` is set. Defaults to `localhost`.  |
| `DD_TRACE_AGENT_PORT`      | String        | Sets the port where profiles are sent (the port where the Agent is listening for connections). Ignored if `DD_TRACE_AGENT_URL` is set. Defaults to`8126`.  |
| `DD_TRACE_AGENT_URL`       | String        | Sets the URL endpoint where profiles are sent. Overrides `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT` if set. Defaults to `http://<DD_AGENT_HOST>:<DD_TRACE_AGENT_PORT>`.  |
| `DD_TRACE_DEBUG`           | Boolean        | Enables or disables debug logging (Could help in case of troubleshooting investigation). Valid values are: `true` or `false`. Defaults to `false`.  |
| `DD_PROFILING_LOG_DIR`     | String        | Sets the directory for .NET Profiler logs. Defaults to `%ProgramData%\Datadog .NET Tracer\logs\`. (Prior to v2.24, the default directory was `%ProgramData%\Datadog-APM\logs\`)  |
| `DD_PROFILING_ENABLED`     | Boolean        | If set to `true`, enables the .NET Profiler. Defaults to `false`.  |
| `DD_PROFILING_WALLTIME_ENABLED` | Boolean        | If set to `false`, disables the Wall time profiling. Defaults to `true`.  |
| `DD_PROFILING_CPU_ENABLED` | Boolean        | If set to `false`, disables the CPU profiling. Defaults to `true`.  |
| `DD_PROFILING_EXCEPTION_ENABLED` | Boolean        | If set to `true`, enables the Exceptions profiling (beta). Defaults to `false`.  |
| `DD_PROFILING_ALLOCATION_ENABLED` | Boolean        | If set to `true`, enables the Allocations profiling (beta). Defaults to `false`.  |
| `DD_PROFILING_LOCK_ENABLED` | Boolean        | If set to `true`, enables the Lock Contention profiling (beta). Defaults to `false`.  |
| `DD_PROFILING_HEAP_ENABLED` | Boolean        | If set to `true`, enables the Live Heap profiling (beta). Defaults to `false`.  |
| `DD_PROFILING_GC_ENABLED` | Boolean        | If set to `false`, disable Garbage Collection profiling used in Timeline user interface. Defaults to `true`.  |

<div class="alert alert-warning">
<strong>Note</strong>: For IIS applications, you must set environment variables in the Registry (under <code>HKLM\System\CurrentControlSet\Services\WAS</code> and <code>HKLM\System\CurrentControlSet\Services\W3SVC</code> nodes) as shown in the <a href="?tab=windowsservices#installation">Windows Service tab, above</a>. The environment variables are applied for <em>all</em> IIS applications.
Starting with IIS 10, you can set environment variables for each IIS application in the <a href="https://docs.microsoft.com/en-us/iis/get-started/planning-your-iis-architecture/introduction-to-applicationhostconfig"><code>C:\Windows\System32\inetsrv\config\applicationhost.config</code> file</a>. Read the <a href="https://docs.microsoft.com/en-us/iis/configuration/system.applicationhost/applicationpools/add/environmentvariables/">Microsoft documentation</a> for more details.
</div>

<br>

## Further Reading

The [Getting Started with Profiler][4] guide takes a sample service with a performance problem and shows you how to use Continuous Profiler to understand and fix the problem.

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[2]: https://app.datadoghq.com/account/settings/agent/6?platform=overview
[3]: /getting_started/tagging/unified_service_tagging
[4]: /getting_started/profiler/
[5]: /tracing/trace_collection/
[12]: /profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces
[13]: /profiler/connect_traces_and_profiles/#break-down-code-performance-by-api-endpoints
[14]: /profiler/enabling/supported_versions/
