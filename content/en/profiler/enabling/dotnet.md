---
title: Enabling the .NET Profiler
kind: Documentation
code_lang: dotnet
type: multi-code-lang
code_lang_weight: 60
further_reading:
    - link: 'getting_started/profiler'
      tag: 'Documentation'
      text: 'Getting Started with Profiler'
    - link: 'profiler/search_profiles'
      tag: 'Documentation'
      text: 'Learn more about available profile types'
    - link: 'profiler/profiler_troubleshooting'
      tag: 'Documentation'
      text: 'Fix problems you encounter while using the profiler'
aliases:
  - /tracing/profiler/enabling/dotnet/
---

The profiler is shipped within Datadog tracing libraries. If you are already using [APM to collect traces][1] for your application, you can skip installing the library and go directly to enabling the profiler.

## Requirements

Supported operating systems for .NET Framework
: Windows 10<br/>
Windows Server starting from version 2012

Supported operating systems for .NET Core and .NET 5+
: Linux with glibc 2.17+ (for example, CentOS 7+) and musl-based (Alpine) <br/>
Windows 10<br/>
Windows Server starting from version 2012

Serverless
: Continuous Profiler is not supported on serverless platforms, such as AWS Lambda.

Supported .NET runtimes (64-bit applications)
: .NET Framework 4.6.1+<br/>
.NET Core 2.1, 3.1<br/>
.NET 5<br/>
.NET 6

Supported languages
: Any language that targets the .NET runtime, such as C#, F#, and Visual Basic.

## Installation

<div class="alert alert-warning">
  <strong>Note:</strong> Datadog's automatic instrumentation rely on the .NET CLR Profiling API. This API allows only one subscriber (for example, Datadog's .NET Tracer with Profiler enabled). To ensure maximum visibility, run only one APM solution in your application environment.
</div>

If you are already using Datadog, upgrade your Agent to version [7.20.2][1]+ or [6.20.2][2]+. The profiler ships together with the tracer, so install it using the following steps, depending on your operating system.

**Note:** The profiler ships with the tracer starting with version 2.8.0. If you're using an older version of the tracer, you need to upgrade first.

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
   : `sudo tar -C /opt/datadog -xzf datadog-dotnet-apm<TRACER_VERSION>-tar.gz && sudo /opt/datadog/createLogPath.sh`


[1]: https://github.com/DataDog/dd-trace-dotnet/releases
{{% /tab %}}

{{% tab "Windows" %}}

1. Install or upgrade to the latest version, using the [.NET Monitoring MSI installer][1]. Continuous Profiler supports 64-bit Windows, so you need the file like `datadog-dotnet-apm-<VERSION>-x64.msi`.

2. Run the installer with administrator privileges.


[1]: https://github.com/DataDog/dd-trace-dotnet/releases
{{% /tab %}}

{{< /tabs >}}

<br>
<div class="alert alert-warning">
  <strong>Note:</strong> The following steps include setting environment variables to enable the profiler. Datadog <strong>does not recommend</strong> setting those environment variables at machine-level. If set at machine-level, every .NET application running on the machine is profiled and this incurs a significant overhead on the CPU and memory of your machine.
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

{{% tab "Internet Information Services (IIS)" %}}
3. Set needed environment variables to configure and enable Profiler.
 To enable the Profiler for IIS applications, it is required to set the `DD_PROFILING_ENABLED` environment variable in the Registry under `HKLM\System\CurrentControlSet\Services\WAS` and `HKLM\System\CurrentControlSet\Services\W3SVC` nodes.

   **With the Registry Editor:**

   In the Registry Editor, modify the multi-string value called `Environment` in the `HKLM\System\CurrentControlSet\Services\WAS` and `HKLM\System\CurrentControlSet\Services\W3SVC` nodes and set the value data as follows:

   For .NET Core and .NET 5+:
   ```text
   CORECLR_ENABLE_PROFILING=1
   DD_PROFILING_ENABLED=1
   DD_ENV=production
   DD_VERSION=1.2.3
   ```

   {{< img src="tracing/setup/dotnet/RegistryEditorCoreIIS.png" alt="Using the Registry Editor to create environment variables for a .NET Core application in IIS" style="width:90%" >}}

   For .NET Framework:
   ```text
   COR_ENABLE_PROFILING=1
   DD_PROFILING_ENABLED=1
   DD_ENV=production
   DD_VERSION=1.2.3
   ```
   {{< img src="tracing/setup/dotnet/RegistryEditorFrameworkIIS.png" alt="Using the Registry Editor to create environment variables for a .NET Framework application in IIS" style="width:90%" >}}

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

   **With the Registry Editor:**

   In the Registry Editor, create a multi-string value called `Environment` in the  `HKLM\System\CurrentControlSet\Services\MyService` key and set the value data to:

   For .NET Core and .NET 5+:
   ```text
   CORECLR_ENABLE_PROFILING=1
   DD_PROFILING_ENABLED=1
   DD_SERVICE=MyService
   DD_ENV=production
   DD_VERSION=1.2.3
   ```
   {{< img src="tracing/setup/dotnet/RegistryEditorCore.png" alt="Using the Registry Editor to create environment variables for a Windows service" style="width:90%" >}}

   For .NET Framework:
   ```text
   COR_ENABLE_PROFILING=1
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
3. Set needed environment variables to configure and enable Profiler for a non-service application, such as console, ASP.NET (Core), Windows Forms, or WPF. To enable the Profiler for Standalone applications, it is required to set the `DD_PROFILING_ENABLED` environment variable. If the profiler is running alone (the tracer is deactivated), you can optionally set the `DD_SERVICE`, `DD_ENV` and `DD_VERSION` environment variables. The recommended approach is to create a batch file that sets these and starts the application, and run your application using the batch file.

   For .NET Core and .NET 5+:
   ```cmd
   SET CORECLR_ENABLE_PROFILING=1
   SET DD_PROFILING_ENABLED=1
   SET DD_SERVICE=MyService
   SET DD_ENV=production
   SET DD_VERSION=1.2.3

   REM start the application here
   ```

   For .NET Framework:
   ```cmd
   SET COR_ENABLE_PROFILING=1
   SET DD_PROFILING_ENABLED=1
   SET DD_SERVICE=MyService
   SET DD_ENV=production
   SET DD_VERSION=1.2.3

   REM start the application here
   ```

4. A minute or two after you start your application, your profiles appear on the [Datadog APM > Profiler page][1].

[1]: https://app.datadoghq.com/profiling
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
| `DD_PROFILING_LOG_DIR`     | String        | Sets the directory for .NET Profiler logs. Defaults to `%ProgramData%\Datadog-APM\logs\`.  |
| `DD_PROFILING_ENABLED`     | Boolean        | If set to `true`, enables the .NET Profiler. Defaults to `false`.  |
| `DD_PROFILING_CPU_ENABLED` | Boolean        | If set to `true`, enables the CPU profiling. Defaults to `false`.  |
| `DD_PROFILING_EXCEPTION_ENABLED` | Boolean        | If set to `true`, enables the Exceptions profiling. Defaults to `false`.  |

<div class="alert alert-warning">
<strong>Note</strong>: For IIS applications, you must set environment variables in the Registry (under <code>HKLM\System\CurrentControlSet\Services\WAS</code> and <code>HKLM\System\CurrentControlSet\Services\W3SVC</code> nodes) as shown in the <a href="?tab=windowsservices#installation">Windows Service tab, above</a>. The environment variables are applied for <em>all</em> IIS applications.
Starting with IIS 10, you can set environment variables for each IIS application in the <a href="https://docs.microsoft.com/en-us/iis/get-started/planning-your-iis-architecture/introduction-to-applicationhostconfig"><code>C:\Windows\System32\inetsrv\config\applicationhost.config</code> file</a>. Read the <a href="https://docs.microsoft.com/en-us/iis/configuration/system.applicationhost/applicationpools/add/environmentvariables/">Microsoft documentation</a> for more details.
</div>

<br>

## Further Reading

The [Getting Started with Profiler][4] guide takes a sample service with a performance problem and shows you how to use Continuous Profiler to understand and fix the problem.

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent/overview
[2]: https://app.datadoghq.com/account/settings?agent_version=6#agent
[3]: /getting_started/tagging/unified_service_tagging
[4]: /getting_started/profiler/
