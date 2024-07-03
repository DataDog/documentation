---
aliases:
- /ja/tracing/dotnet
- /ja/tracing/languages/dotnet
- /ja/tracing/setup/dotnet
- /ja/tracing/setup_overview/dotnet
- /ja/agent/apm/dotnet/
- /ja/tracing/dotnet-framework
- /ja/tracing/languages/dotnet-framework
- /ja/tracing/setup/dotnet-framework
- /ja/agent/apm/dotnet-framework/
- /ja/tracing/setup_overview/dotnet-framework
- /ja/tracing/setup_overview/setup/dotnet
- /ja/tracing/setup_overview/setup/dotnet-framework
- /ja/tracing/trace_collection/dd_libraries/dotnet-framework
code_lang: dotnet-framework
code_lang_weight: 70
further_reading:
- link: /tracing/other_telemetry/connect_logs_and_traces/dotnet/
  tag: Documentation
  text: Connect .NET application logs to traces
- link: /tracing/metrics/runtime_metrics/dotnet/
  tag: Documentation
  text: Runtime metrics
- link: /serverless/azure_app_services/
  tag: Documentation
  text: Microsoft Azure App Service extension
- link: /tracing/glossary/
  tag: Documentation
  text: Explore your services, resources, and traces
- link: https://www.datadoghq.com/blog/net-monitoring-apm/
  tag: Blog
  text: .NET monitoring with Datadog APM and distributed tracing
- link: https://www.datadoghq.com/blog/asp-dotnet-core-monitoring/
  tag: Blog
  text: Monitor containerized ASP.NET Core applications
- link: https://www.datadoghq.com/blog/deploy-dotnet-core-aws-fargate/
  tag: Blog
  text: Monitor containerized ASP.NET Core applications on AWS Fargate
- link: https://www.datadoghq.com/blog/dotnet-datadog-continuous-profiler/
  tag: Blog
  text: Optimize your .NET application performance with the Datadog Continuous Profiler
- link: https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples
  tag: ソースコード
  text: Examples of custom instrumentation
- link: https://github.com/DataDog/dd-trace-dotnet
  tag: ソースコード
  text: Source code
kind: documentation
title: Tracing .NET Framework Applications
type: multi-code-lang
---
## Compatibility requirements

### Supported .NET Framework runtimes

The .NET Tracer supports instrumentation on .NET Framework >= 4.6.1.

For a full list of Datadog's .NET Framework library and processor architecture support (including legacy and maintenance versions), see [Compatibility Requirements][1].

## Installation and getting started

<div class="alert alert-info">
  To set up Datadog APM in AWS Lambda, see <strong><a href="/tracing/serverless_functions/">Tracing Serverless Functions</a></strong>, in Azure App Service, see <strong><a href="/serverless/azure_app_services/">Tracing Azure App Service</a></strong>.
</div>

<div class="alert alert-warning">
  <strong>Note:</strong> Datadog's automatic instrumentation relies on the .NET CLR Profiling API. This API allows only one subscriber (for example, Datadog APM). To ensure maximum visibility, run only one APM solution in your application environment.
</div>

### インストール

Before you begin, make sure you've already [installed and configured the Agent][12].

1. [Install the tracer.](#install-the-tracer)
3. [Enable the tracer for your service.](#enable-the-tracer-for-your-service)
4. [View your live data.](#view-your-live-data)

### Install the tracer

After you install and configure your Datadog Agent, the next step is to add the tracing library directly in the application to instrument it. Read more about [compatibility information][1].

Install the Datadog .NET Tracer machine-wide so that all services on the machine are instrumented or on a per-application basis, so developers can manage the instrumentation through the application's dependencies. To see machine-wide installation instructions, click the Windows tab. To see per-application installation instructions, click the NuGet tab.

{{< tabs >}}

{{% tab "Windows" %}}

To install the .NET Tracer machine-wide:

1. Download the [.NET Tracer MSI installer][1]. Select the MSI installer for the architecture that matches the operating system (x64 or x86).

2. Run the .NET Tracer MSI installer with administrator privileges.

You can also script the MSI setup by running the following in PowerShell: `Start-Process -Wait msiexec -ArgumentList '/qn /i datadog-apm.msi'`

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

<div class="alert alert-info">Starting v2.14.0, you don't need to set <code>COR_PROFILER</code> if you installed the tracer using the MSI.</div>

1. Set the following required environment variables for automatic instrumentation to attach to your application:

   ```
   COR_ENABLE_PROFILING=1
   COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
   ```
2. For standalone applications and Windows services, manually restart the application.

{{% /tab %}}

{{% tab "NuGet" %}}

Follow the instructions in the package readme, also available in [`dd-trace-dotnet` repository][1].
Docker examples are also available in the [repository][2].



[1]: https://github.com/DataDog/dd-trace-dotnet/blob/master/docs/Datadog.Trace.Bundle/README.md
[2]: https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples/NugetDeployment
{{% /tab %}}

{{< /tabs >}}

### View your live data

After enabling the .NET Tracer for your service:

1. Restart your service.

2. Create application load.

3. In Datadog, navigate to [**APM** > **APM Traces**][3].

## 構成

If needed, configure the tracing library to send application performance telemetry data, including setting up Unified Service Tagging. Read [Library Configuration][4] for details.

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

{{% tab "NuGet" %}}

To use custom instrumentation in your .NET application:

1. In your application code, access the global tracer through the `Datadog.Trace.Tracer.Instance` property to create new spans.

{{% /tab %}}

{{< /tabs >}}

For more information on adding spans and tags for custom instrumentation, see the [.NET Custom Instrumentation documentation][5].

## Configuring process environment variables

To attach automatic instrumentation to your service, set the required environment variables before starting the application. See [Enable the tracer for your service](#enable-the-tracer-for-your-service) section to identify which environment variables to set based on your .NET Tracer installation method and follow the examples below to correctly set the environment variables based on the environment of your instrumented service.

### Windows

<div class="alert alert-info">Starting v2.14.0, you don't need to set <code>COR_PROFILER</code> if you installed the tracer using the MSI.</div>

#### Windows services

{{< tabs >}}

{{% tab "Registry Editor" %}}

In the Registry Editor, create a multi-string value called `Environment` in the `HKLM\System\CurrentControlSet\Services\<SERVICE NAME>` key and set the value data to:

```text
COR_ENABLE_PROFILING=1
COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
```

{{< img src="tracing/setup/dotnet/RegistryEditorFramework.png" alt="Using the Registry Editor to create environment variables for a Windows service" >}}

{{% /tab %}}

{{% tab "PowerShell" %}}

```powershell
[string[]] $v = @("COR_ENABLE_PROFILING=1", "COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}")
Set-ItemProperty HKLM:SYSTEM\CurrentControlSet\Services\<SERVICE NAME> -Name Environment -Value $v
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
rem Set environment variables
SET COR_ENABLE_PROFILING=1
rem Unless v2.14.0+ and you installed the tracer with the MSI
SET COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}

rem Set additional Datadog environment variables
SET DD_LOGS_INJECTION=true
SET DD_RUNTIME_METRICS_ENABLED=true

rem Start application
dotnet.exe example.dll
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/tracing/compatibility_requirements/dotnet-framework
[2]: /ja/agent/
[3]: https://app.datadoghq.com/apm/traces
[4]: /ja/tracing/trace_collection/library_config/dotnet-framework/
[5]: /ja/tracing/trace_collection/custom_instrumentation/dotnet/
[11]: /ja/tracing/trace_collection/library_injection_local/
[12]: /ja/tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent