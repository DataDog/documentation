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

## Requirements

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

1. If you are already using Datadog, upgrade your agent to version [7.20.2][1]+ or [6.20.2][2]+.

2. The profiler and tracer are shipped together. Install or upgrade to version TODO+ if needed, using the [.NET Monitoring MSI installer][3]. Continuous Profiler only supports 64-bit Windows, with 32-bit support coming soon, so you'll want the file like `datadog-dotnet-apm-2.1.0-x64.msi`.

   Run the .NET Monitoring MSI installer with administrator privileges.

{{< tabs >}}

{{% tab "Internet Information Services (IIS)" %}}
1. Set environment variables:
   TODO

2. Completely stop and start IIS by running the following commands as an administrator:

   ```cmd
   net stop /y was
   net start w3svc
   ```

   <div class="alert alert-warning">
     <strong>Note:</strong> Use <code>stop</code> and <code>start</code> commands. A reset or restart does not always work.
   </div>

3. A minute or two after starting your application, your profiles will show up on the [Datadog APM > Profiler page][5].
{{% /tab %}}

{{% tab "Windows services" %}}
1. Set environment variables:

   **With the Registry Editor:**

   In the Registry Editor, create a multi-string value called `Environment` in the `HKLM\System\CurrentControlSet\Services\<SERVICE NAME>` key and set the value data to:

   - For .NET Core and .NET 5+:
     ```text
     CORECLR_ENABLE_PROFILING=1
     CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
     DD_ENV=prod
     DD_SERVICE=my-web-app
     DD_VERSION=1.2.3
     ```
     {{< img src="tracing/setup/dotnet/RegistryEditorCore.png" alt="Using the Registry Editor to create environment variables for a Windows service" style="width:90%" >}}
   - For .NET Framework:
     ```text
     COR_ENABLE_PROFILING=1
     COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
     DD_ENV=prod
     DD_SERVICE=my-web-app
     DD_VERSION=1.2.3
     ```
     {{< img src="tracing/setup/dotnet/RegistryEditorFramework.png" alt="Using the Registry Editor to create environment variables for a Windows service" style="width:90%" >}}

   **With a PowerShell script:**

   - For .NET Core and .NET 5+:
     ```powershell
     [string[]] $v = @(
         "CORECLR_ENABLE_PROFILING=1",
         "CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}",
         "DD_ENV=prod",
         "DD_SERVICE=my-web-app",
         "DD_VERSION=1.2.3"
     )
     Set-ItemProperty HKLM:SYSTEM\CurrentControlSet\Services\<SERVICE NAME> -Name Environment -Value $v
     ```
   - For .NET Framework:
     ```powershell
     [string[]] $v = @(
         "COR_ENABLE_PROFILING=1",
         "COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}",
         "DD_ENV=prod",
         "DD_SERVICE=my-web-app",
         "DD_VERSION=1.2.3"
     )
     Set-ItemProperty HKLM:SYSTEM\CurrentControlSet\Services\<SERVICE NAME> -Name Environment -Value $v
     ```

2. A minute or two after starting your application, your profiles will show up on the [Datadog APM > Profiler page][5].
{{% /tab %}}

{{% tab "Standalone applications" %}}
To automatically profile a non-service application, such as console, ASP.NET (Core), Windows Forms, or WPF, you'll need to set some environment variables before starting it.

If the environment variables are set for the current user, _all_ .NET applications will be profiled. Instead, we recomment setting them in a batch file that also starts the application and running that. For example:

 - For .NET Core and .NET 5+:
 ```
 TODO show example batch file

 CORECLR_ENABLE_PROFILING=1
 CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
 DD_ENV=prod
 DD_SERVICE=my-web-app
 DD_VERSION=1.2.3
 ```

 - For .NET Framework:
 ```
 TODO show example batch file

 COR_ENABLE_PROFILING=1
 COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
 DD_ENV=prod
 DD_SERVICE=my-web-app
 DD_VERSION=1.2.3
 ```

2. A minute or two after starting your application, your profiles will show up on the [Datadog APM > Profiler page][5].
{{% /tab %}}
{{< /tabs >}}


## Configuration

You can configure the profiler using the following environment variables. Restart the application after any of these settings is changed.

| Environment variable                             | Type          | Description                                                                                      |
| ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------ |
| `DD_ENV`                   | String        | The [environment][4] name, for example, `production`. |
| `DD_SERVICE`               | String        | The [service][4] name, for example, `web-backend`. If this is not specified, the .NET Profiler tries to determine the service name automatically from the application name (process entry assembly or process name).    |
| `DD_VERSION`               | String        | The [version][4] of your service.  |
| `DD_TAGS`                  | String        | Tags to apply to an uploaded profile. Must be a list of `<key>:<value>` separated by commas such as: `layer:api,team:intake`.   |
| `DD_AGENT_HOST`            | String        | Sets the host where profiles are sent (the host running the Agent). Can be a hostname or an IP address. Ignored if `DD_TRACE_AGENT_URL` is set. Defaults to `localhost`.  |
| `DD_TRACE_AGENT_PORT`      | String        | Sets the port where profiles are sent (the port where the Agent is listening for connections). Ignored if `DD_TRACE_AGENT_URL` is set. Defaults to`8126`..  |
| `DD_TRACE_AGENT_URL`       | String        | Sets the URL endpoint where profiles are sent. Overrides `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT` if set. Defaults to `http://<DD_AGENT_HOST>:<DD_TRACE_AGENT_PORT>`.  |
| `DD_TRACE_DEBUG`           | Boolean        | Enables or disables debug logging (Could help in case of troubleshooting investigation). Valid values are: `true` or `false`. Defaults to `false`.  |
| `DD_PROFILING_LOG_DIR`     | String        | Sets the directory for .NET Profiler logs. Defaults to `%ProgramData%\Datadog-APM\logs\`.  |
| `DD_PROFILING_ENABLED`     | Boolean        | If set to `false`, disables the .NET Profiler. Defaults to `true`.  |

## Further Reading
The [Getting Started with Profiler][5] guide takes a sample service with a performance problem and shows you how to use Continuous Profiler to understand and fix the problem.

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent/overview
[2]: https://app.datadoghq.com/account/settings?agent_version=6#agent
[3]: https://github.com/DataDog/dd-trace-dotnet/releases
[4]: /getting_started/tagging/unified_service_tagging
[5]: /getting_started/profiler/
