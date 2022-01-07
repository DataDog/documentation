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

<div class="alert alert-warning">
Datadog .NET Profiler is currently in public beta. Datadog recommends evaluating the profiler in a non-sensitive environment before deploying in production.
</div>

The profiler is shipped within Datadog tracing libraries. If you are already using a version of [APM that includes the .NET Profiler][1] to collect traces from your application, you can skip installing the library and go directly to enabling the profiler.

## Compatibility

**Supported operating systems:**

- Windows 10
- Windows Server starting from version 2012

**Supported .NET runtimes:**

64-bit applications running on:
- .NET Framework 4.6.1+
- .NET Core 2.1, 3.1
- .NET 5
- .NET 6


## Installation

<div class="alert alert-warning">
  <strong>Note:</strong> Datadog's.NET Tracer and Profiler rely on the .NET CLR Profiling API. This API allows only one subscriber (for example, APM). To ensure maximum visibility, run only one APM solution in your application environment.
</div>

### Install the profiler

Install the .NET Profiler machine-wide so that all applications on the machine can be profiled:

1. Download the [.NET Monitoring MSI installer][1]. Select the MSI installer for the architecture that matches the operating system (x64 or x86).

2. Run the .NET Monitoring MSI installer with administrator privileges.

### Enable the profiler for your application

{{< tabs >}}

{{% tab "Internet Information Services (IIS)" %}}
1. The .NET Monitoring MSI installer adds all required environment variables. There are no environment variables you need to configure.

2. Completely stop and start IIS by running the following commands as an administrator:

   ```cmd
   net stop /y was
   net start w3svc
   ```

   <div class="alert alert-warning">
     <strong>Note:</strong> Use <code>stop</code> and <code>start</code> commands. A reset or restart does not always work.
   </div>
{{% /tab %}}

{{% tab "Windows services" %}}
**With the Registry Editor:**

In the Registry Editor, create a multi-string value called `Environment` in the `HKLM\System\CurrentControlSet\Services\<SERVICE NAME>` key and set the value data to:

- For .NET Core and .NET 5+:
  ```text
  CORECLR_ENABLE_PROFILING=1
  CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
  ```
  {{< img src="tracing/setup/dotnet/RegistryEditorCore.png" alt="Using the Registry Editor to create environment variables for a Windows service" style="width:90%" >}}
- For .NET Framework:
  ```text
  COR_ENABLE_PROFILING=1
  COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
  ```
  {{< img src="tracing/setup/dotnet/RegistryEditorFramework.png" alt="Using the Registry Editor to create environment variables for a Windows service" style="width:90%" >}}

**With a PowerShell script:**

- For .NET Core and .NET 5+:
  ```powershell
  [string[]] $v = @("CORECLR_ENABLE_PROFILING=1", "CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}")
  Set-ItemProperty HKLM:SYSTEM\CurrentControlSet\Services\<SERVICE NAME> -Name Environment -Value $v
  ```
- For .NET Framework:
  ```powershell
  [string[]] $v = @("COR_ENABLE_PROFILING=1", "CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}")
  Set-ItemProperty HKLM:SYSTEM\CurrentControlSet\Services\<SERVICE NAME> -Name Environment -Value $v
  ```
{{% /tab %}}

{{% tab "Standalone applications" %}}
To automatically profile a non-service application, such as console, ASP.NET (Core), Windows Forms, or WPF, set the environment variables before starting it. 

If the environment variables are set for the current user, _all_ .NET applications will be profiled. Instead, set them in a batch file that also starts the application. Create a batch file that:

1. Sets the required environment variables to attach the profiler to your application:

   - For .NET Core and .NET 5+:
   ```
   CORECLR_ENABLE_PROFILING=1
   CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
   ```

   - For .NET Framework:
   ```
   COR_ENABLE_PROFILING=1
   COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
   ```

2. Restarts the application.
{{% /tab %}}
{{< /tabs >}}


### Configure the Datadog Agent for APM

[Install and configure the Datadog Agent][2] to send profiles from your profiled application. By default the APM and Profiler are enabled in your `datadog.yaml` file under `apm_config` with `enabled: true` and the Agent listens for profile traffic at `localhost:8126`.

### View your live data

A minute or two after starting your .NET application, your profiles appear on the [APM > Profiles Search page][3].

## Configuration

The following .NET Profiler settings are configurable by environment variables. Restart the application after any of these settings is changed. 

### Unified Service Tagging

To assign [Unified Service Tags][4] to the generated profiles, configure the following settings for your applications:

`DD_ENV`
: Sets `env` with the specified environment name. 

`DD_SERVICE`
: Sets the `service` name. If this is not specified, the .NET Profiler tries to determine the service name automatically from the application name (process entry assembly or process name).

`DD_VERSION`
: Sets the `version` of the service with the specified value. 

### Optional configuration

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
: If set to `false`, disables the .NET Profiler. <br>
**Default**: `true`


## Further Reading
The [Getting Started with Profiler][5] guide takes a sample service with a performance problem and shows you how to use Continuous Profiler to understand and fix the problem.

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-dotnet/releases
[2]: https://app.datadoghq.com/account/settings#agent/overview
[3]: https://app.datadoghq.com/profiling
[4]: /getting_started/tagging/unified_service_tagging/
[5]: /getting_started/profiler/
