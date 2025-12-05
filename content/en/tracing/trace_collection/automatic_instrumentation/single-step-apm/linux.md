---
title: Single Step APM Instrumentation on Linux
code_lang: linux
type: multi-code-lang
code_lang_weight: 0
further_reading:
  - link: /tracing/metrics/runtime_metrics/
    tag: Documentation
    text: Enable Runtime Metrics
---

## Overview

On a Linux host or VM, use Single Step Instrumentation (SSI) for APM to install the Datadog Agent and [instrument][14] your applications in one step, with no additional configuration required. 

## Enable APM on your applications

<div class="alert alert-info">Before proceeding, confirm that your environment is compatible by reviewing the <a href="https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/single-step-apm/compatibility/">SSI compatibility guide.</a></div>

To enable APM on a Linux host:

1. In Datadog, go to the [Install the Datadog Agent on Linux][15] page.
1. In the **Customize your observability coverage** section, go to **Additional features** > **Application Observability**, and turn on **APM Instrumentation**.
   
   {{< img src="tracing/trace_collection/linux-apm-instrumentation-toggle.png" alt="The 'Customize your observability coverage' section of in-app instructions for installing the Datadog Agent on Linux" style="width:100%;" >}}

1. Copy and run the Agent installation command on your Linux host or VM.
1. Restart your applications.

<div class="alert alert-info">SSI adds a small amount of startup time to instrumented applications. If this overhead is not acceptable for your use case, contact <a href="/help/">Datadog Support</a>.</div>

## Set SDK tracer versions

By default, Single Step Instrumentation installs the latest versions of Datadog APM SDKs.

You may want to choose specific SDK versions for compatibility with your application's language version or specific environment requirements.

To customize SDK versions:

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
1. In Datadog, go to the [Install the Datadog Agent on Linux][15] page.
1. After you turn on **APM Instrumentation**, click **Customize library versions**.

   {{< img src="tracing/trace_collection/apm-instrumentation-version-pinning.png" alt="The 'Customize library versions' drop-down in the instructions for installing the Datadog Agent on Linux" style="width:100%;" >}}

1. Find your language(s) and use the dropdown to either:
   - Select an exact SDK version, or
   - Select the major version, which uses the latest minor release available when the Agent installation command is run.
1. Copy and run the updated installation command.

[15]: https://app.datadoghq.com/fleet/install-agent/latest?platform=linux

{{< /site-region >}}

{{< site-region region="gov" >}}
1. In Datadog, go to the [Install the Datadog Agent on Linux][15] page.
1. After you turn on **APM Instrumentation**, set your desired library versions with the `DD_APM_INSTRUMENTATION_LIBRARIES` variable in your Agent installation command:
   
   ```
   DD_API_KEY=<YOUR_DD_API_KEY> 
   DD_SITE="US1-FED" 
   DD_APM_INSTRUMENTATION_ENABLED=host 
   DD_APM_INSTRUMENTATION_LIBRARIES="java:1,python:2,js:5,dotnet:3,php:1" 
   bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
   ```

1. Find your language(s) and use the dropdown to either:
   - Select an exact SDK version, or
   - Select the major version, which uses the latest minor release available when the Agent installation command is run.
1. Copy and run the updated installation command.

[15]: https://app.datadoghq.com/fleet/install-agent/latest?platform=linux

{{< /site-region >}}

Available versions are listed in source repositories for each language:

- [Java][8] (`java`)
- [Node.js][9] (`js`)
- [Python][10] (`python`)
- [.NET][11] (`dotnet`)
- [Ruby][12] (`ruby`)
- [PHP][13] (`php`)

## Configure Unified Service Tags

Unified Service Tags (USTs) apply consistent tags across traces, metrics, and logs, making it easier to navigate and correlate your observability data. Learn how to [set USTs for Linux services][16].

## Enable SDK-dependent products and features

After SSI loads the Datadog SDK into your applications and enables distributed tracing, you can configure additional products that rely on the SDK. These include capabilities such as [Continuous Profiler][21], [Application Security Monitoring][22], and [trace ingestion controls][23].

Use one of the following setup methods:

- **[Configure in `application_monitoring.yaml`][18]**:

  Enable products across all services on a host without modifying application command lines.

- **[Set environment variables][17]**:

  Enable products by setting environment variables directly in your application configuration. 

## Advanced options

### Update SDK version

The SDK version is fixed when you run the Agent installation command.

To update the SDK versions:

1. Re-run the Agent installation command. This command also updates the Agent to the latest version.
1. Restart your applications.

### Define workload selection rules 

{{< callout url="#" btn_hidden="true" header="Join the Preview!">}}
Workload selection is in Preview.
{{< /callout >}}

Workload selection rules (available for Agent v7.73+) let you control which processes are automatically instrumented by SSI on Linux hosts.

To configure workload selection:

1. In Datadog, navigate to **APM** > **Service Setup** > [**Workload Selection**][20].
1. Click **Add or Edit Rules**. 
1. Define instrumentation rules:
   1. Click **Add New Rule**, then choose **Allow Rule** or **Block Rule** to specify whether matching processes should be instrumented.
   1. Name your rule. 
   1. Add one or more conditions. See [Define rule conditions](#define-rule-conditions) to learn more.

   {{< img src="tracing/trace_collection/workload_selection_landing.png" alt="The workload selection UI, showing configuration options for defining a rule" style="width:100%;" >}}

1. (Optional) Drag and drop rules to reorder them. 

   **Note**: Rules are evaluated in order. After a process matches a rule, subsequent rules are ignored.

1. Set the default behavior (allow or block) for processes that do not match any rule.
1. Click **Next** to preview your rules. 
1. Click **Deploy Rules**. 

If Remote Configuration is enabled, rules are deployed to every host and applied on those with SSI enabled within 50 seconds . Alternatively, click **Export** to export the configuration file and apply it manually to your hosts.

#### Define rule conditions

Each rule consists of one or more conditions. A condition includes the following elements:
- **Attribute**: The process property that the rule evaluates.
- **Operator**: The comparison logic (`equals`, `not equals`, `prefix`, or `contains`).
- **Value**: The text or pattern to match, such as a process name or command-line flag.

Supported attributes include:
| Attribute    | Description | Example |
| ----------- | ----------- | --------- |
| Process Executable | Executable name of the process. | `python3.11` |
| Process Executable Full Path | Full path of the executable. | `/usr/bin/python3.11` |
| Process Args | Command-line arguments used to start the process. | `--env=production` |
| Language | Programming language detected for the process. | `python` |

## Remove Single Step APM instrumentation from your Agent

To stop producing traces for all services on your infrastructure:

1. Run:
   ```shell
   dd-host-install --uninstall
   ```
2. Restart the services on the host or VM.

## Troubleshooting

If you encounter problems enabling APM with SSI, see the [SSI troubleshooting guide][19].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[8]: https://github.com/DataDog/dd-trace-java/releases
[9]: https://github.com/DataDog/dd-trace-js/releases
[10]: https://github.com/DataDog/dd-trace-py/releases
[11]: https://github.com/DataDog/dd-trace-dotnet/releases
[12]: https://github.com/DataDog/dd-trace-rb/releases
[13]: https://github.com/DataDog/dd-trace-php/releases
[14]: /tracing/glossary/#instrumentation
[15]: https://app.datadoghq.com/fleet/install-agent/latest?platform=linux
[16]: /getting_started/tagging/unified_service_tagging/?tab=kubernetes#non-containerized-environment
[17]: /tracing/trace_collection/library_config/
[18]: /tracing/trace_collection/automatic_instrumentation/configure_apm_features_linux/
[19]: /tracing/trace_collection/automatic_instrumentation/single-step-apm/troubleshooting
[20]: https://app.datadoghq.com/apm/service-setup/workload-selection
[21]: /profiler/
[22]: /security/application_security/
[23]: /tracing/trace_pipeline/ingestion_controls/


