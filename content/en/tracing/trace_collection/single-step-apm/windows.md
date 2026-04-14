---
title: Single Step APM Instrumentation on Windows
code_lang: windows
type: multi-code-lang
code_lang_weight: 30
aliases: 
- /tracing/trace_collection/automatic_instrumentation/single-step-apm/windows
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

<div class="alert alert-info">
<strong>Join the Preview!</strong><br>
Host-wide instrumentation for Windows is in Preview and limited to Preview participants. The installation and configuration options described in this tab appear in Datadog only after you are enrolled. <a href="https://www.datadoghq.com/product-preview/single-step-instrumentation-on-windows-vms/" class="alert-link">Request access</a> to join the Preview.
</div>

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

<div class="alert alert-info">SSI adds a small amount of startup time to instrumented applications. If this overhead is not acceptable for your use case, contact <a href="/help/">Datadog Support</a>.</div>

## Configure Unified Service Tags

Unified Service Tags (USTs) apply consistent tags across traces, metrics, and logs, making it easier to navigate and correlate your observability data. Learn how to [set USTs for Windows services][2].

## Enable SDK-dependent products and features

After SSI loads the Datadog SDK into your applications and enables distributed tracing, you can configure additional products that rely on the SDK:

{{< ssi-products >}}

To enable products, [set environment variables][3] in your application configuration.

## Advanced options

### Define instrumentation rules

<div class="alert alert-info">Instrumentation rules (available for Agent v7.73+) apply only to host-wide instrumentation. They are not supported for IIS-only installation.</div>

Instrumentation rules let you control which processes are automatically instrumented by SSI on Windows hosts.

To configure instrumentation rules:

1. In Datadog, go to **APM** > **Service Setup** > [**Manage Instrumentation Rules**][5].
1. Click **Add or Edit Rules**.
1. Define instrumentation rules:
   1. Click **Add New Rule**, then choose **Allow Rule** or **Block Rule** to specify whether matching processes should be instrumented.
   1. Name your rule.
   1. Add one or more conditions. See [Define rule conditions](#define-rule-conditions) to learn more.

   {{< img src="tracing/trace_collection/define_instrumentation_rule.png" alt="The instrumentation rules UI, showing configuration options for defining a rule" style="width:100%;" >}}

1. (Optional) Drag and drop rules to reorder them.

   **Note**: Rules are evaluated in order. After a process matches a rule, subsequent rules are ignored.

1. Set the default behavior (allow or block) for processes that do not match any rule.
1. Click **Next** to preview your rules.
1. Click **Deploy Rules**.

If Remote Configuration is enabled, rules are deployed to every host and applied on those with SSI enabled within 50 seconds. Alternatively, click **Export** to export the configuration file and apply it manually to your hosts.

#### Define rule conditions

Each rule consists of one or more conditions. A condition includes the following elements:
- **Attribute**: The process property that the rule evaluates.
- **Operator**: The comparison logic (`equals`, `not equals`, `prefix`, or `contains`).
- **Value**: The text or pattern to match, such as a process name or command-line flag.

Supported attributes include:
| Attribute | Description | Example |
| --------- | ----------- | ------- |
| Operating System | OS of the host. | `windows` |
| Executable | Executable name of the process. | `w3wp.exe` |
| Executable Full Path | Full path of the executable. | `C:\Windows\System32\inetsrv\w3wp.exe` |
| Arguments | Command-line arguments used to start the process. | `--env=production` |
| Working Directory | Working directory of the process. | `C:\inetpub\wwwroot` |
| Language | Programming language detected for the process. | `dotnet` |
| Entry Point File | The specific file used to launch the application. | `MyService.dll`, `app.py` |
| IIS Application Pool | The IIS application pool hosting the worker process. Because all IIS workers share the `w3wp.exe` executable, this is the most reliable way to target a specific .NET app on IIS. | `DefaultAppPool`, `MyWebApp` |

#### Example use cases

Review the following examples demonstrating how to apply instrumentation rules:

{{< collapse-content title="Example 1: Instrument all processes except specific ones" level="h5" >}}

Instrument all processes by default. Add block rules to exclude services that would add noise without value, such as analytics cron jobs and Java batch processors.

{{< img src="tracing/trace_collection/instrumentation-rules-example-1.png" alt="Two block instrumentation rules targeting Working Directory and Entry Point File conditions, with a default of allow instrumentation" style="width:100%;" >}}

{{< /collapse-content >}}

{{< collapse-content title="Example 2: Instrument only specific IIS applications" level="h5" >}}

Block all instrumentation by default. Add allow rules to opt specific IIS applications into APM. Because all IIS workers share the <code>w3wp.exe</code> executable, use IIS Application Pool to identify target applications. This approach is useful for gradual rollouts.

{{< img src="tracing/trace_collection/instrumentation-rules-example-2.png" alt="Two allow instrumentation rules targeting specific IIS application pools by name, with a default of block instrumentation" style="width:100%;" >}}

{{< /collapse-content >}}

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
[5]: https://app.datadoghq.com/apm/service-setup/workload-selection
