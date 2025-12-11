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

With Single Step Instrumentation (SSI), you can enable APM for your Java and .NET applications on Windows VMs using a single Datadog Agent installation command.

## Enable APM on Windows

<div class="alert alert-info">Before proceeding, confirm that your environment is compatible by reviewing the <a href="https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/single-step-apm/compatibility/">SSI compatibility guide.</a></div>

You can enable APM on Windows in the following ways:
* Instrument only .NET applications on IIS
* Instrument all Java and .NET applications across your entire Windows host

{{< callout url="#"
 btn_hidden="true" header="Join the Preview!">}}
Host-wide instrumentation for Windows is in Preview.
{{< /callout >}}

{{< tabs >}}
{{% tab "IIS" %}}

To instrument only .NET applications running on IIS:

1. In Datadog, go to [Install the Datadog Agent on Windows][1].
1. In the **Customize your observability coverage** section, toggle **Application Performance Monitoring (APM)**.
1. (Optional) Set your SDK version:
   
   By default, Single Step Instrumentation installs the latest supported version of the Datadog .NET SDK. If you need to pin a specific version:

   1. Under **Instrumentation Configuration**, select **Customize Library Versions**.
   1. Under .NET, choose the version you want to use.
   
1. Copy and run the provided MSI install command on your Windows host.
1. Restart the IIS applications you want instrumented. (You do not need to restart the entire IIS server.)

After installation, the Agent automatically loads the Datadog .NET SDK into supported application processes to enable distributed tracing.

[1]: https://app.datadoghq.com/fleet/install-agent/latest?platform=windows

{{% /tab %}}

{{% tab "Host-wide (Preview)" %}}

To instrument Java and .NET applications across your entire Windows host:

1. In Datadog, go to [Install the Datadog Agent on Windows][1].
1. In the **Customize your observability coverage** section, toggle **Application Performance Monitoring (APM)**.
1. (Optional) Set your SDK version:
   
   By default, Single Step Instrumentation installs the latest supported version of the Datadog .NET and Java SDK. If you need to pin a specific version:

   1. Under **Instrumentation Configuration**, select **Customize Library Versions**.
   1. Under .NET, choose the version you want to use.
   
1. Copy and run the provided MSI install command on your Windows host.
1. Restart the services you want instrumented.

[1]: https://app.datadoghq.com/fleet/install-agent/latest?platform=windows

{{% /tab %}}
{{< /tabs >}}

## Configure Unified Service Tags

Unified Service Tags (USTs) apply consistent tags across traces, metrics, and logs, making it easier to navigate and correlate your observability data. Learn how to [set USTs for Windows services][2].

## Enable SDK-dependent products and features

After SSI loads the Datadog SDK into your applications and enables distributed tracing, you can configure additional products that rely on the SDK. These include capabilities such as Continuous Profiler, Application Security Monitoring, and trace ingestion controls.

To enable products, [set environment variables][3] in your application configuration.

## (Optional) Define workload selection rules

Workload selection lets you control which .NET workloads are automatically instrumented by SSI. You can use workload selection to instrument specific applications or exclude certain IIS application pools.

To configure workload selection:

1. Download and extract the rule compiler:
   ```
   Invoke-WebRequest -Uri "https://github.com/DataDog/dd-policy-engine/releases/download/v0.1.0/dd-rules-converter-win-x64.zip" -OutFile "dd-rules-converter.zip" 
   Expand-Archive -Path "dd-rules-converter.zip" -DestinationPath "C:\tools\dd-rules-converter"
   ```

   This tool compiles your rule definitions into a format the tracer can consume.

1. Create a rule definition.
   
   Write your workload selection rules in a TOML-formatted file. Each rule can match against criteria such as executable name, DLL name, runtime, and IIS application pool. See [selection rule syntax](#selection-rule-syntax) for supported selectors.

   Example `rules.toml`:

   ```toml
   [allow-console-app]
   description = "Allow my .NET console app"
   instrument  = true
   expression  = "(process.executable:ConsoleApp1.exe OR process.dll:ConsoleApp1.dll) runtime:dotnet"

   [disable-staging-app-pool]
   description = "Disable all application pool starting with staging"
   instrument  = false
   expression  = "iis.application_pool:staging*"
   ```

1. Compile the rules. 

   Use the rule compiler to generate the binary rules file that the tracer reads at startup:
   ```
   C:\tools\dd-rules-convert.exe -rules rules.toml -output "C:\ProgramData\Datadog\protected\workload-selection.rules"
   ```

When a .NET workload starts, the tracer automatically loads and applies these rules.

### Selection rule syntax 

Each rule is a TOML section with a unique identifier enclosed in brackets. For example:

```
[disable-staging-app-pool]
description = "Disable all application pool starting with staging"
instrument  = false
expression  = "iis.application_pool:staging*"
```

Rules include the following fields:

- `description`: A short description of the rule.
- `instrument`: Boolean (`true` or `false`) that determines whether to enable or disable instrumentation.
- `expression`: The condition that defines which workloads to match. See [Expression selectors](#expression-selectors) for supported fields. 

#### Expression selectors

The `expression` field uses selectors to match process properties, such as executable name or runtime. The following selectors are supported:

| Field | Description | Examples |
|-------|-------------|----------|
| `process.executable` | The name of the process executable. | `myapp.exe` |
| `runtime.language` | The runtime language of the process. | `dotnet`, `cpp`, `node` |
| `dotnet.dll` | The DLL file executed with `dotnet MyDll.dll`. | `ConsoleApp.dll` |
| `iis.application_pool` | The IIS application pool name. | `staging-app-pool`, `DefaultAppPool` |

**Example expressions:**
- `process.executable:myapp.exe`: matches any process named `myapp.exe`
- `process.executable:myapp.exe runtime.language:dotnet`: matches processes named `myapp.exe` running on .NET

## Remove Single Step APM instrumentation from your Agent

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