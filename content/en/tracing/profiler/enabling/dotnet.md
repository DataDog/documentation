---
title: Profiling .NET Applications
kind: Documentation
code_lang: dotnet
type: multi-code-lang
code_lang_weight: 60
further_reading:
    - link: 'getting_started/profiler'
      tag: 'Documentation'
      text: 'Getting Started with Profiler'
    - link: 'tracing/profiler/search_profiles'
      tag: 'Documentation'
      text: 'Learn more about available profile types'
    - link: 'tracing/profiler/profiler_troubleshooting'
      tag: 'Documentation'
      text: 'Fix problems you encounter while using the profiler'
---

{{< site-region region="us5" >}}
<div class="alert alert-warning">
  The Continuous Profiler is not available for the Datadog {{< region-param key="dd_site_name" >}} site.
</div>
{{< /site-region >}}

The profiler is shipped within Datadog tracing libraries. If you are already using a version of [APM to collect traces][1] that includes the .NET Profiler for your application, you can skip installing the library and go directly to enabling the profiler.

<br/>
## Compatibility requirements

### Supported .NET runtimes

The .NET Profiler supports .NET Framework 4.6.1+, .NET Core 2.1, 3.1, .NET 5, and .NET 6. 

For a full list of supported libraries and processor architectures, see [Compatibility Requirements][1].
TODO: create a page like https://docs-staging.datadoghq.com/kari/docs-2799-dotnet-profiler/tracing/setup_overview/compatibility_requirements/dotnet-core/ and point to it

<br/>

## Installation and getting started

<div class="alert alert-warning">
  <strong>Note:</strong> Datadog's.NET Tracer and Profiler rely on the .NET CLR Profiling API. This API allows only one subscriber (for example, APM). To ensure maximum visibility, run only one APM solution in your application environment.
</div>

### Installation

1. [Install the profiler.](#install-the-profiler)
2. [Enable the profiler for your application.](#enable-the-profiler-for-your-application)
3. [Configure the Datadog Agent for APM.](#configure-the-datadog-agent-for-apm)
4. [View your live data.](#view-your-live-data)

<br/>

### Install the profiler

The Datadog .NET Profiler is installed machine-wide so that all applications on the machine can be profiled.

{{< tabs >}}
{{% tab "Windows" %}}

To install the .NET Profiler:

1. Download the [.NET Monitoring MSI installer][1]. Select the MSI installer for the architecture that matches the operating system (x64 or x86).

2. Run the .NET Monitoring MSI installer with administrator privileges.
{{% /tab %}}
{{< /tabs >}}

<br/>

### Enable the profiler for your application
{{< tabs >}}
{{% tab "Windows" %}}

#### Internet Information Services (IIS)
1. The .NET Monitoring MSI installer adds all required environment variables. There are no environment variables you need to configure.

2. To profile applications hosted in IIS, completely stop and start IIS by running the following commands as an administrator:

   ```cmd
   net stop /y was
   net start w3svc
   ```

   <div class="alert alert-warning">
     <strong>Note:</strong> Use <code>stop</code> and <code>start</code> commands. A reset or restart does not always work.
   </div>

<br/>

#### Windows Services

**With Registry Editor:**

In the Registry Editor, create a multi-string value called `Environment` in the `HKLM\System\CurrentControlSet\Services\<SERVICE NAME>` key and set the value data to:

For .NET Core and .NET 5+
```text
CORECLR_ENABLE_PROFILING=1
CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
```

{{< img src="tracing/setup/dotnet/RegistryEditorCore.png" alt="Using the Registry Editor to create environment variables for a Windows service" >}}

For .NET Framework
```text
COR_ENABLE_PROFILING=1
COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
```

{{< img src="tracing/setup/dotnet/RegistryEditorFramework.png" alt="Using the Registry Editor to create environment variables for a Windows service" >}}

**With a PowerShell script:**

For .NET Core and .NET 5+
```powershell
[string[]] $v = @("CORECLR_ENABLE_PROFILING=1", "CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}")
Set-ItemProperty HKLM:SYSTEM\CurrentControlSet\Services\<SERVICE NAME> -Name Environment -Value $v
```

For .NET Framework:
```powershell
[string[]] $v = @("COR_ENABLE_PROFILING=1", "CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}")
Set-ItemProperty HKLM:SYSTEM\CurrentControlSet\Services\<SERVICE NAME> -Name Environment -Value $v
```

<br/>

#### Standalone Applications

To automatically profile a non service application (console, ASP.NET (Core), Windows Forms, or WPF), set the environment variables before starting it. 

<div class="alert alert-warning">
  <strong>Warning:</strong> If the environment variables are set for the current user, ALL .NET applications will be profiled. Instead, it is recommended to set them in a batch file that will also start the application.
</div>

1. Set the following required environment variables to attach the profiler to your application:

For .NET Core and .NET 5+:
   ```
   CORECLR_ENABLE_PROFILING=1
   CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
   ```

For .NET Framework:
   ```
   COR_ENABLE_PROFILING=1
   COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
   ```

2. Manually restart the application.

<br/>

### Configure the Datadog Agent for APM

[Install and configure the Datadog Agent][2] to send profiles from your profiled application. By default the Datadog Agent is enabled in your `datadog.yaml` file under `apm_config` with `enabled: true` and listens for trace traffic at `localhost:8126`.

<br/>

### View your live data

A minute or two after starting your .NET application, your profiles will show up on the [Datadog APM > Profiler page][4].

<br/>
<br/>

## Configuration

The following .NET Profiler settings are configurable via environment variables (Don't forget to restart the application if such setting is changed). 

#### Unified Service Tagging

To associate [Unified Service Tagging][6] to the generated profiles, configure the following settings for your applications:

`DD_ENV`
: If specified, set the `env` name with the specified value. 

`DD_SERVICE`
: If specified, sets the `service` name. Otherwise, the .NET Profiler tries to determine service name automatically from application name (process entry assembly, or process name).

`DD_VERSION`
: If specified, sets the `version` of the service with the specified value. 

<br/>

#### Optional configuration

The following configuration variables are available for customizing .NET Profiler behavior:

`DD_TRACE_AGENT_URL`
: Sets the URL endpoint where profiles are sent. Overrides `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT` if set. <br>
**Default**: `http://<DD_AGENT_HOST>:<DD_TRACE_AGENT_PORT>`

`DD_AGENT_HOST`
: Sets the host where profiles are sent (the host running the Agent). Can be a hostname or an IP address. Ignored if `DD_TRACE_AGENT_URL` is set. <br>
**Default**: `localhost`

`DD_TRACE_AGENT_PORT`
: Sets the port where profiles are sent (the port where the Agent is listening for connections). Ignored if `DD_TRACE_AGENT_URL` is set. <br>
**Default**: `8126`

`DD_TRACE_DEBUG`
: Enables or disables debug logging (Could help in case of troubleshooting investigation). Valid values are: `true` or `false`.<br>
**Default**: `false`

`DD_PROFILING_LOG_DIR`
: Sets the directory for .NET Profiler logs. <br>
**Default**: `%ProgramData%\Datadog-APM\logs\`

`DD_PROFILING_ENABLED`
: If set to false, disable the .NET Profiler. <br>
**Default**: `true`

<br/>
<br/>

## Further Reading
The [Getting Started with Profiler][5] guide takes a sample service with a performance problem and shows you how to use Continuous Profiler to understand and fix the problem.

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-dotnet/releases
[2]: https://app.datadoghq.com/account/settings#agent/overview
[3]: https://app.datadoghq.com/account/settings?agent_version=6#agent
[4]: https://app.datadoghq.com/profiling
[5]: /getting_started/profiler/
[6]: /getting_started/tagging/unified_service_tagging/
