---
title: Single Step APM Instrumentation on Windows
code_lang: windows
type: multi-code-lang
code_lang_weight: 30
further_reading:
  - link: /tracing/metrics/runtime_metrics/
    tag: Documentation
    text: Enable Runtime Metrics
---

## Overview

With Single Step Instrumentation (SSI), you can automatically enable APM for your .NET Framework and .NET Core applications running on Windows IIS, using a single MSI command during the Datadog Agent installation. No separate SDK installation or code changes are required.

## Enable APM on Windows

<div class="alert alert-info">Before proceeding, confirm that your environment is compatible by reviewing the <a href="https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/single-step-apm/compatibility/">SSI compatibility guide.</a></div>

To enable APM with Single Step Instrumentation on Windows:

1. In Datadog, go to the Install Datadog [Windows Agent page][1] .
1. In the **Customize your observability coverage** section, toggle **Application Performance Monitoring (APM)**.
1. (Optional) Set your SDK tracer version:
   
   By default, Single Step Instrumentation installs the latest supported version of the Datadog .NET Tracer. If you need to pin a specific version:

   1. Under **Application Performance Monitoring (APM)**, select **Customize library versions**.
   1. Under .NET, choose the version you want to use.
   
1. Copy and run the provided MSI install command on your Windows host.
1. Restart the IIS applications you want instrumented. (You do not need to restart the entire IIS server.)

After installation, the Agent automatically loads the Datadog .NET SDK into supported application processes to enable distributed tracing.

## Configure Unified Service Tags

Unified Service Tags (USTs) apply consistent tags across traces, metrics, and logs, making it easier to navigate and correlate your observability data. Learn how to [set USTs for Windows services][2].

## Enable SDK-dependent products and features

After SSI loads the Datadog SDK into your applications and enables distributed tracing, you can configure additional products that rely on the SDK. These include capabilities such as Continuous Profiler, Application Security Monitoring, and trace ingestion controls.

To enable products, [set environment variables][3] in your application configuration.

## Optional configuration

### Target specific workloads 

**Workload Selection** is a feature that allows fine-grained control over which .NET workloads are automatically instrumented. This is especially useful limiting instrumentation to specific apps, or ensuring some IIS Application Pools are not automatically instrumented.

To use Workload Selection:

1. Download and extract the Workload Selection rule compiler:
   ```
   Invoke-WebRequest -Uri "https://github.com/DataDog/dd-policy-engine/releases/download/v0.1.0/dd-rules-converter-win-x64.zip" -OutFile "dd-rules-converter.zip" 
   Expand-Archive -Path "dd-rules-converter.zip" -DestinationPath "C:\tools\dd-rules-converter"
   ```

   This tool compiles your rule definitions into a format the tracer can consume.

1. Write your workload selection rules.

   Rules are written in a TOML-formatted file and allow matching against criteria such as executable name, DLL name, runtime, and IIS application pool. See [selection rule syntax](#selection-rule-syntax) for details.

   Example:
   ```
   # rules.toml
   [allow-console-app]
   description = "Allow my .NET console app"
   instrument  = true
   expression  = "(process.executable:ConsoleApp1.exe OR process.dll:ConsoleApp1.dll) runtime:dotnet"

   [disable-staging-app-pool]
   description = "Disable all application pool starting with staging"
   instrument  = false
   expression  = "iis.application_pool:staging*"
   ```

1. Use the rule compiler to generate the compiled policy file:
   ```
   C:\tools\dd-rules-convert.exe -rules rules.toml -output "C:\ProgramData\Datadog\protected\workload-selection.rules"
   ```

Anytime a .NET workload is started, the tracer automatically loads and applies the rules.

#### Selection rule syntax 

Each rule is a section in the TOML file with the following attributes:
- A unique identifier enclosed in brackets (for example `[myRule]`)
- `description`: A short description of the rule.
- `instrument`: Boolean (true or false), indicating whether to enable or disable auto-instrumentation.
- `expression`: The match condition based on process, DLL, runtime, or IIS pool.

`expression` supports the following selectors:

| Field    | Description | Examples |
| ----------- | ----------- |----------- |
| `process.executable` | The name of the process | `myapp.exe` | 
| `runtime.language` | The runtime of the process | `dotnet cpp node` |
| `dotnet.dll` | The DLL used in with dotnet MyDll.dll | `ConsoleApp.dll` |
| `iis.application_pool` | The IIS application pool | `staging-app-pool` `DefaultAppPool` | 

For example:
* The expression `process.executable:myapp.exe` matches any process with the name `myapp.exe`
* The expression `process.executable:myapp.exe runtime.language:dotnet` matches any process with the name `myapp.exe` AND running on .NET.

### Remove Single Step APM instrumentation from your Agent

To disable SSI for .NET on your host, run:

```shell
&"C:\Program Files\Datadog\Datadog Agent\bin\datadog-installer.exe" remove datadog-apm-library-dotnet
```

## Troubleshooting

If you encounter problems enabling APM with SSI, see the [SSI troubleshooting guide][4].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/fleet/install-agent/latest?platform=windows
[2]: /integrations/windows-service/#tags
[3]: /tracing/trace_collection/library_config/
[4]: /tracing/trace_collection/automatic_instrumentation/single-step-apm/troubleshooting