---
title: Single Step APM Instrumentation on Linux
code_lang: linux
type: multi-code-lang
code_lang_weight: 0
aliases:
- /tracing/trace_collection/automatic_instrumentation/single-step-apm/linux/
further_reading:
  - link: /tracing/metrics/runtime_metrics/
    tag: Documentation
    text: Enable Runtime Metrics
  - link: "https://www.datadoghq.com/blog/single-step-instrumentation-rules/"
    tag: "Blog"
    text: "Manage service tracing across hosts with Single Step Instrumentation rules"
---

## Overview

On a Linux host or VM, use Single Step Instrumentation (SSI) for APM to install the Datadog Agent and [instrument][14] your applications in one step, with no additional configuration required. 

{{% dd-apm-skill %}}

## Enable APM on your applications

<div class="alert alert-info">Before proceeding, confirm that your environment is compatible by reviewing the <a href="https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/single-step-apm/compatibility/">SSI compatibility guide.</a></div>

### New Agent installation

If you don't yet have a Datadog Agent installed, install the Agent and enable SSI in one step.

1. Run the following command on your Linux host or VM:

   ```shell
   DD_API_KEY=<YOUR_DD_API_KEY> \
   DD_SITE="{{< region-param key="dd_site" >}}" \
   DD_APM_INSTRUMENTATION_ENABLED=host \
   bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
   ```

   Replace `<YOUR_DD_API_KEY>` with your [Datadog API key][22]. The command installs or updates the Agent and the SSI packages.

   By default, SSI installs the latest SDK versions. To pin specific versions, add the `DD_APM_INSTRUMENTATION_LIBRARIES` variable with comma-separated `language:major` pairs. Available versions are listed in the source repositories for each language: [Java][8] (`java`), [Node.js][9] (`js`), [Python][10] (`python`), [.NET][11] (`dotnet`), [Ruby][12] (`ruby`), [PHP][13] (`php`).

1. Restart your applications.

<div class="alert alert-info">SSI adds a small amount of startup time to instrumented applications. If this overhead is not acceptable for your use case, contact <a href="/help/">Datadog Support</a>.</div>

#### Generate the command from Datadog

To get a command pre-filled with your API key and site, go to the [Install the Datadog Agent on Linux][15] page and turn on {{< ui >}}Application Performance Monitoring{{< /ui >}} under {{< ui >}}Core Observability{{< /ui >}}.

{{< img src="tracing/trace_collection/enable_apm.png" alt="The 'Customize your Agent coverage' section of in-app instructions for installing the Datadog Agent on Linux" style="width:100%;" >}}

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
To select SDK versions from dropdowns, click {{< ui >}}Customize Library Versions{{< /ui >}}.

{{< img src="tracing/trace_collection/customize_library_versions.png" alt="The 'Customize library versions' drop-down in the instructions for installing the Datadog Agent on Linux" style="width:100%;" >}}
{{< /site-region >}}

Then copy and run the generated command.

### Existing Agent installation

If you already have a Datadog Agent installed, re-run the Agent installation command from [New Agent installation](#new-agent-installation) on the host. The command updates the existing Agent and enables SSI.

Alternatively, use Fleet Automation to enable SSI from Datadog:

1. In Datadog, go to [**Fleet Automation > Configuration**][21].
1. Click {{< ui >}}Configure Agents{{< /ui >}}.
1. Apply filters to select the agents you want to configure, then click **Next**.

   {{< img src="tracing/trace_collection/filter-agents.png" alt="The agent filtering screen in Fleet Automation, with options to scope by environment, operating system, and hostname" style="width:100%;" >}}

1. Click the {{< ui >}}Application Performance Monitoring (APM){{< /ui >}} tile, then click {{< ui >}}Next{{< /ui >}}.

   {{< img src="tracing/trace_collection/select-products-core-obs.png" alt="The product selection screen in Fleet Automation, showing the Application Performance Monitoring (APM) tile" style="width:80%;" >}}

1. In the {{< ui >}}Configure SDKs Installation{{< /ui >}} screen, click {{< ui >}}Yes{{< /ui >}} to automatically install the SDKs. Select {{< ui >}}Use latest version{{< /ui >}}, or uncheck to specify individual SDK versions.

   {{< img src="tracing/trace_collection/configure-sdks-installation.png" alt="The Configure SDKs Installation screen in Fleet Automation, with options to enable automatic SDK installation and select versions" style="width:60%;" >}}

1. Click **Next**.
1. Review your configuration and click {{< ui >}}Deploy Configuration{{< /ui >}}.

## Verify the installation

1. Confirm the Agent is running:

   ```shell
   sudo datadog-agent status
   ```

1. Confirm that SSI injection is armed on the host:

   ```shell
   cat /etc/ld.so.preload && ls /opt/datadog-packages/ | grep apm
   ```

   The output lists the APM injector library in `/etc/ld.so.preload` and one or more `datadog-apm-*` packages.

1. After your applications receive traffic, confirm your services appear on the [APM Services page][23]. If they don't appear within a few minutes, follow the [SSI troubleshooting guide][19].

## Configure Unified Service Tags

Unified Service Tags (USTs) apply consistent tags across traces, metrics, and logs, making it easier to navigate and correlate your observability data. Learn how to [set USTs for Linux services][16].

## Enable SDK-dependent products and features

After SSI loads the Datadog SDK into your applications and enables distributed tracing, you can configure additional products that rely on the SDK:

{{< ssi-products >}}

Use one of the following setup methods:

- **[Configure in `application_monitoring.yaml`][18]**:

  Configure products and features across all services on a host without modifying application command lines.

- **[Set environment variables][17]**:

  Enable products by setting environment variables directly in your application configuration. 

## Advanced options

### Update SDK version

The SDK version is fixed when you run the Agent installation command.

To update the SDK versions:

1. Re-run the Agent installation command. This command also updates the Agent to the latest version.
1. Restart your applications.

### Define instrumentation rules

{{< site-region region="gov" >}}
<div class="alert alert-warning">Instrumentation rules are not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Instrumentation rules (available for Agent v7.73+) let you control which processes are automatically instrumented by SSI on Linux hosts.

To configure instrumentation rules:

1. In Datadog, go to {{< ui >}}APM{{< /ui >}} > {{< ui >}}Service Setup{{< /ui >}} > [{{< ui >}}Manage Instrumentation Rules{{< /ui >}}][20].
1. Click {{< ui >}}Add or Edit Rules{{< /ui >}}.
1. Define instrumentation rules:
   1. Click {{< ui >}}Add New Rule{{< /ui >}}, then choose {{< ui >}}Allow Rule{{< /ui >}} or {{< ui >}}Block Rule{{< /ui >}} to specify whether matching processes should be instrumented.
   1. Name your rule.
   1. Add one or more conditions. See [Define rule conditions](#define-rule-conditions) to learn more.

   {{< img src="tracing/trace_collection/define_instrumentation_rule.png" alt="The instrumentation rules UI, showing configuration options for defining a rule" style="width:100%;" >}}

1. (Optional) Drag and drop rules to reorder them.

   **Note**: Rules are evaluated in order. After a process matches a rule, subsequent rules are ignored.

1. Set the default behavior (allow or block) for processes that do not match any rule.
1. Click {{< ui >}}Next{{< /ui >}} to preview your rules.
1. Click {{< ui >}}Deploy Rules{{< /ui >}}.

If Remote Configuration is enabled, rules are deployed to every host and applied on those with SSI enabled within 50 seconds. Alternatively, click {{< ui >}}Export{{< /ui >}} to export the configuration file and apply it manually to your hosts.

#### Define rule conditions

Each rule consists of one or more conditions. A condition includes the following elements:
- {{< ui >}}Attribute{{< /ui >}}: The process property that the rule evaluates.
- {{< ui >}}Operator{{< /ui >}}: The comparison logic (`equals`, `not equals`, `prefix`, or `contains`).
- {{< ui >}}Value{{< /ui >}}: The text or pattern to match, such as a process name or command-line flag.

Supported attributes include:
| Attribute | Description | Example |
| --------- | ----------- | ------- |
| Operating System | OS of the host. | `linux` |
| Executable | Executable name of the process. | `python3.11` |
| Executable Full Path | Full path of the executable. | `/usr/bin/python3.11` |
| Arguments | Command-line arguments used to start the process. | `--env=production` |
| Working Directory | Working directory of the process. | `/app` |
| Language | Programming language detected for the process. | `python` |
| Entry Point File | The specific file used to launch the application. | `app.py`, `server.js` |

#### Example use cases

Review the following examples demonstrating how to apply instrumentation rules:

{{< collapse-content title="Example 1: Instrument all processes except specific ones" level="h5" >}}

Instrument all processes by default. Add block rules to exclude services that would add noise without value, such as analytics cron jobs and Java batch processors.

{{< img src="tracing/trace_collection/instrumentation-rules-example-1.png" alt="Two block instrumentation rules targeting Working Directory and Entry Point File conditions, with a default of allow instrumentation" style="width:100%;" >}}

{{< /collapse-content >}}

{{< collapse-content title="Example 2: Instrument only specific processes" level="h5" >}}

Block all instrumentation by default. Add allow rules to opt specific processes into APM. This approach gives you precise control and works well for gradual rollouts.

For example, to instrument only a checkout service and a customer portal, create allow rules using {{< ui >}}Working Directory{{< /ui >}}, then set the default behavior to {{< ui >}}Block Instrumentation{{< /ui >}}.

{{< img src="tracing/trace_collection/instrumentation-rules-linux-example-2.png" alt="Two allow instrumentation rules targeting services in specific working directories, with a default of block instrumentation" style="width:100%;" >}}

{{< /collapse-content >}}

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
[18]: /tracing/trace_collection/library_config/application_monitoring_yaml/
[19]: /tracing/trace_collection/automatic_instrumentation/single-step-apm/troubleshooting
[20]: https://app.datadoghq.com/apm/service-setup/workload-selection
[21]: https://app.datadoghq.com/fleet/agent-management
[22]: https://app.datadoghq.com/organization-settings/api-keys
[23]: https://app.datadoghq.com/apm/services
