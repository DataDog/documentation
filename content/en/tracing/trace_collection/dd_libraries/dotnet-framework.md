---
title: Tracing .NET Framework Applications
kind: documentation
aliases:
    - /tracing/dotnet
    - /tracing/languages/dotnet
    - /tracing/setup/dotnet
    - /tracing/setup_overview/dotnet
    - /agent/apm/dotnet/
    - /tracing/dotnet-framework
    - /tracing/languages/dotnet-framework
    - /tracing/setup/dotnet-framework
    - /agent/apm/dotnet-framework/
    - /tracing/setup_overview/dotnet-framework
    - /tracing/setup_overview/setup/dotnet
    - /tracing/setup_overview/setup/dotnet-framework
code_lang: dotnet-framework
type: multi-code-lang
code_lang_weight: 70
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
  - link: "https://www.datadoghq.com/blog/asp-dotnet-core-monitoring/"
    tag: "Blog"
    text: "Monitor containerized ASP.NET Core applications"
  - link: "https://www.datadoghq.com/blog/deploy-dotnet-core-aws-fargate/"
    tag: "Blog"
    text: "Monitor containerized ASP.NET Core applications on AWS Fargate"
  - link: "https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples"
    tag: "GitHub"
    text: "Examples of custom instrumentation"
  - link: "https://github.com/DataDog/dd-trace-dotnet"
    tag: "GitHub"
    text: "Source code"
---
## Compatibility requirements

### Supported .NET Framework runtimes

The .NET Tracer supports instrumentation on .NET Framework >= 4.6.1.

For a full list of Datadog’s .NET Framework library and processor architecture support (including legacy and maintenance versions), see [Compatibility Requirements][1].

## Installation and getting started

<div class="alert alert-info">
  <div class="alert-info">Datadog recommends you follow the <a href="https://app.datadoghq.com/apm/docs">Quickstart instructions</a> in the Datadog app for the best experience, including:<br/>
    <div>- Step-by-step instructions scoped to your deployment configuration (hosts, Docker, Kubernetes, or Amazon ECS).</div>
    <div>- Dynamically set <code>service</code>, <code>env</code>, and <code>version</code> tags.</div>
    <div>- Enable ingesting 100% of traces and Trace ID injection into logs during setup.</div>
  </div>
</div>

<div class="alert alert-warning">
  <strong>Note:</strong> Datadog's automatic instrumentation relies on the .NET CLR Profiling API. This API allows only one subscriber (for example: APM). To ensure maximum visibility, run only one APM solution in your application environment.
</div>

### Installation

1. [Configure the Datadog Agent for APM.](#configure-the-datadog-agent-for-apm)
2. [Install the tracer.](#install-the-tracer)
3. [Enable the tracer for your service.](#enable-the-tracer-for-your-service)
4. [View your live data.](#view-your-live-data)

### Configure the Datadog Agent for APM

[Install and configure the Datadog Agent][2] to receive traces from your instrumented application. By default, the Datadog Agent is enabled in your `datadog.yaml` file under `apm_config` with `enabled: true` and listens for trace traffic on `http://localhost:8126`.

For containerized, serverless, and cloud environments:

{{< tabs >}}

{{% tab "Containers" %}}

1. Set `apm_non_local_traffic: true` in the `apm_config` section of your main [`datadog.yaml` configuration file][1].

2. See the specific setup instructions to configure the Agent to receive traces in a containerized environment:

{{< partial name="apm/apm-containers.html" >}}
</br>

3. After instrumenting your application, the tracing client sends traces to `localhost:8126` by default. If this is not the correct host and port, change it by setting the `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT` environment variables. For more information on configuring these settings, see [Configuration](#configuration).

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

Tracing is available for other environments including, [Heroku][1], [Cloud Foundry][2], and [AWS Elastic Beanstalk][3].

For all other environments, see the [Integrations documentation][4] for that environment and contact [Datadog support][5] if you are encountering setup issues.


[1]: /agent/basic_agent_usage/heroku/#installation
[2]: /integrations/cloud_foundry/#trace-collection
[3]: /integrations/amazon_elasticbeanstalk/
[4]: /integrations/
[5]: /help/
{{% /tab %}}

{{< /tabs >}}

### Install the tracer

Install the Datadog .NET Tracer machine-wide so that all services on the machine are instrumented or on a per-application basis, so developers can manage the instrumentation through the application’s dependencies. To see machine-wide installation instructions, click the Windows tab. To see per-application installation instructions, click the NuGet tab.

{{< tabs >}}

{{% tab "Windows" %}}

To install the .NET Tracer machine-wide:

1. Download the [.NET Tracer MSI installer][1]. Select the MSI installer for the architecture that matches the operating system (x64 or x86).

2. Run the .NET Tracer MSI installer with administrator privileges.


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
   COR_ENABLE_PROFILING=1
   COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
   ```
2. For standalone applications and Windows services, manually restart the application.

{{% /tab %}}

{{% tab "NuGet" %}}

1. Set the following required environment variables for automatic instrumentation to attach to your application:

   ```
   COR_ENABLE_PROFILING=1
   COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
   COR_PROFILER_PATH=<System-dependent path>
   DD_DOTNET_TRACER_HOME=<APP_DIRECTORY>/datadog
   ```

   The value for the `<APP_DIRECTORY>` placeholder is the path to the directory containing the application's `.dll` files. The value for the `COR_PROFILER_PATH` environment variable varies based on the system where the application is running:

   Operating System and Process Architecture | COR_PROFILER_PATH Value
   ------------------------------------------|----------------------------
   Windows x64      | `<APP_DIRECTORY>\datadog\win-x64\Datadog.Trace.ClrProfiler.Native.dll`
   Windows x86      | `<APP_DIRECTORY>\datadog\win-x86\Datadog.Trace.ClrProfiler.Native.dll`

2. For standalone applications, manually restart the application.


{{% /tab %}}

{{< /tabs >}}

### View your live data

After enabling the .NET Tracer for your service:

1. Restart your service.

2. Create application load.

3. In Datadog, navigate to [**APM** > **APM Traces**][3].

## Configuration

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

#### Windows services

{{< tabs >}}

{{% tab "Registry Editor" %}}

In the Registry Editor, create a multi-string value called `Environment` in the `HKLM\System\CurrentControlSet\Services\<SERVICE NAME>` key and set the value data to:

```text
COR_ENABLE_PROFILING=1
COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
```

{{< img src="tracing/setup/dotnet/RegistryEditorCore.png" alt="Using the Registry Editor to create environment variables for a Windows service" >}}

{{% /tab %}}

{{% tab "PowerShell" %}}

```powershell
[string[]] $v = @("COR_ENABLE_PROFILING=1", "COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}")
Set-ItemProperty HKLM:SYSTEM\CurrentControlSet\Services\<SERVICE NAME> -Name Environment -Value $v
```
{{% /tab %}}

{{< /tabs >}}

#### Console applications

To automatically instrument a console application, set the environment variables from a batch file before starting your application:

```bat
rem Set environment variables
SET COR_ENABLE_PROFILING=1
SET COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}

rem Start application
dotnet.exe example.dll
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /tracing/compatibility_requirements/dotnet-framework
[2]: /agent/
[3]: https://app.datadoghq.com/apm/traces
[4]: /tracing/trace_collection/library_config/dotnet-framework/
[5]: /tracing/trace_collection/custom_instrumentation/dotnet/
