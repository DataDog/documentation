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
---

## Overview

On a Linux host or VM, Single Step Instrumentation (SSI) installs the Datadog Agent and [instruments][1] your applications in one step, with no additional configuration required.

Before you start, confirm that your environment is supported in the [SSI compatibility guide][2].

## Enable APM on your applications

### New Agent installation

If you don't have a Datadog Agent installed, run the following command on your Linux host or VM to install the Agent and enable SSI at the same time:

```shell
DD_API_KEY=<YOUR_API_KEY> DD_SITE="{{< region-param key="dd_site" >}}" DD_APM_INSTRUMENTATION_ENABLED=host \
  bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

Replace `<YOUR_API_KEY>` with your [Datadog API key][3]. After the command completes, restart your applications.

By default, SSI installs the latest SDK versions for all supported languages.

#### Optional: pin SDK versions

To install specific SDK versions instead of the latest, add the `DD_APM_INSTRUMENTATION_LIBRARIES` variable:

```shell
DD_API_KEY=<YOUR_API_KEY> DD_SITE="{{< region-param key="dd_site" >}}" DD_APM_INSTRUMENTATION_ENABLED=host \
  DD_APM_INSTRUMENTATION_LIBRARIES="java:1,python:3,js:5,dotnet:3,ruby:2,php:1" \
  bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

You can specify an exact version or a major version, which uses the latest minor release available when the command runs. Available versions are listed in the source repository for each language: [Java][4] (`java`), [Node.js][5] (`js`), [Python][6] (`python`), [.NET][7] (`dotnet`), [Ruby][8] (`ruby`), and [PHP][9] (`php`).

<div class="alert alert-info">SSI adds a small amount of startup time to instrumented applications. If this overhead is not acceptable for your use case, contact <a href="/help/">Datadog Support</a>.</div>

{{% collapse-content title="Alternate: install with the in-app wizard" level="h4" expanded=false %}}

To generate an installation command from the Datadog UI:

1. Go to the [Install the Datadog Agent on Linux][10] page.
1. In the {{< ui >}}Customize your Agent coverage{{< /ui >}} section, go to {{< ui >}}Core Observability{{< /ui >}} and turn on {{< ui >}}Application Performance Monitoring{{< /ui >}}.

   {{< img src="tracing/trace_collection/enable_apm.png" alt="The 'Customize your Agent coverage' section of in-app instructions for installing the Datadog Agent on Linux" style="width:100%;" >}}

1. (Optional) To pin SDK versions, click {{< ui >}}Customize Library Versions{{< /ui >}}, then select a version for each language from the dropdowns.

   {{< img src="tracing/trace_collection/customize_library_versions.png" alt="The 'Customize library versions' drop-down in the instructions for installing the Datadog Agent on Linux" style="width:100%;" >}}

1. Copy and run the generated command on your Linux host or VM, then restart your applications.

{{% /collapse-content %}}

### Existing Agent installation

If you already have a Datadog Agent installed, use Fleet Automation to enable SSI:

1. In Datadog, go to [**Fleet Automation > Configuration**][11].
1. Click {{< ui >}}Configure Agents{{< /ui >}}.
1. Apply filters to select the agents you want to configure, then click **Next**.

   {{< img src="tracing/trace_collection/filter-agents.png" alt="The agent filtering screen in Fleet Automation, with options to scope by environment, operating system, and hostname" style="width:100%;" >}}

1. Click the {{< ui >}}Application Performance Monitoring (APM){{< /ui >}} tile, then click {{< ui >}}Next{{< /ui >}}.

   {{< img src="tracing/trace_collection/select-products-core-obs.png" alt="The product selection screen in Fleet Automation, showing the Application Performance Monitoring (APM) tile" style="width:80%;" >}}

1. In the {{< ui >}}Configure SDKs Installation{{< /ui >}} screen, click {{< ui >}}Yes{{< /ui >}} to automatically install the SDKs. Select {{< ui >}}Use latest version{{< /ui >}}, or uncheck to specify individual SDK versions.

   {{< img src="tracing/trace_collection/configure-sdks-installation.png" alt="The Configure SDKs Installation screen in Fleet Automation, with options to enable automatic SDK installation and select versions" style="width:60%;" >}}

1. Click **Next**.
1. Review your configuration and click {{< ui >}}Deploy Configuration{{< /ui >}}.

## Verify your first trace

After you enable SSI, confirm that your applications are instrumented and sending traces:

1. Restart your instrumented applications, then send requests to generate traffic.
1. Confirm that the Datadog libraries are loaded into a running process. Replace `<PID>` with the process ID of an instrumented application:

   ```shell
   cat /proc/<PID>/maps
   ```

   The output includes both the SSI launcher (`launcher.preload.so`) and a language library (for example, `libdd` or a language-specific tracer path).

1. Confirm that the launcher is registered for preloading on the host:

   ```shell
   cat /etc/ld.so.preload
   ```

   The output includes the path to `launcher.preload.so`.

1. Check the APM section of the Agent status:

   ```shell
   datadog-agent status
   ```

1. In Datadog, go to [**APM > Service Catalog**](https://app.datadoghq.com/services) and confirm that your services appear.

If your traces don't appear, see the [SSI troubleshooting guide][14].

## Configure Unified Service Tags

Unified Service Tags (USTs) apply consistent tags across traces, metrics, and logs, making it easier to navigate and correlate your observability data. See [Set USTs for Linux services][12].

## Enable SDK-dependent products and features

After SSI loads the Datadog SDK into your applications and enables distributed tracing, you can configure additional products that rely on the SDK:

{{< ssi-products >}}

Use one of the following setup methods:

- **[Configure in `application_monitoring.yaml`][13]**:

  Configure products and features across all services on a host without modifying application command lines.

- **[Set environment variables][15]**:

  Enable products by setting environment variables directly in your application configuration.

## Advanced configuration

### Update SDK version

The SDK version is fixed when you run the Agent installation command.

To update the SDK versions:

1. Re-run the Agent installation command. This command also updates the Agent to the latest version.
1. Restart your applications.

### Define instrumentation rules

{{< site-region region="gov" >}}
<div class="alert alert-info">Instrumentation rules are not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Instrumentation rules (available for Agent v7.73+) let you control which processes are automatically instrumented by SSI on Linux hosts.

To configure instrumentation rules:

1. In Datadog, go to {{< ui >}}APM{{< /ui >}} > {{< ui >}}Service Setup{{< /ui >}} > [{{< ui >}}Manage Instrumentation Rules{{< /ui >}}][16].
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

If you encounter problems enabling APM with SSI, see the [SSI troubleshooting guide][14].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/glossary/#instrumentation
[2]: /tracing/trace_collection/single-step-apm/compatibility/
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://github.com/DataDog/dd-trace-java/releases
[5]: https://github.com/DataDog/dd-trace-js/releases
[6]: https://github.com/DataDog/dd-trace-py/releases
[7]: https://github.com/DataDog/dd-trace-dotnet/releases
[8]: https://github.com/DataDog/dd-trace-rb/releases
[9]: https://github.com/DataDog/dd-trace-php/releases
[10]: https://app.datadoghq.com/fleet/install-agent/latest?platform=linux
[11]: https://app.datadoghq.com/fleet/agent-management
[12]: /getting_started/tagging/unified_service_tagging/?tab=kubernetes#non-containerized-environment
[13]: /tracing/trace_collection/library_config/application_monitoring_yaml/
[14]: /tracing/trace_collection/single-step-apm/troubleshooting/
[15]: /tracing/trace_collection/library_config/
[16]: https://app.datadoghq.com/apm/service-setup/workload-selection
