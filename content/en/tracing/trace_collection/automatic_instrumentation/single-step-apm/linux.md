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

To enable APM on a Linux host:

1. In Datadog, go to the [Install the Datadog Agent on Linux][15] page.
1. In the **Customize your observability coverage** section, go to **Additional features** > **Application Observability**, and turn on **APM Instrumentation**.
   
   {{< img src="tracing/trace_collection/linux-apm-instrumentation-toggle.png" alt="The 'Customize your observability coverage' section of in-app instructions for installing the Datadog Agent on Linux" style="width:100%;" >}}

1. Copy and run the Agent installation command on your Linux host or VM.
1. Restart your applications.

## Set SDK tracer versions

By default, Single Step Instrumentation installs the latest major versions of Datadog APM SDKs. Minor version updates are applied automatically when they become available.

You may want to customize SDK versions based on your application's language version or specific environment requirements. You can control the major and minor versions used by customizing library versions during setup.

To customize tracer versions:

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
1. In Datadog, go to the [Install the Datadog Agent on Linux][15] page.
1. After you turn on **APM Instrumentation**, click **Customize library versions**.

   {{< img src="tracing/trace_collection/apm-instrumentation-version-pinning.png" alt="The 'Customize library versions' drop-down in the instructions for installing the Datadog Agent on Linux" style="width:100%;" >}}

1. Find your language(s) and use the dropdown to either:
   - Pin an exact tracer version, or
   - Select the major version you want to use.
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
   - Pin an exact tracer version, or
   - Select the major version you want to use.
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

After SSI loads the Datadog SDK into your applications and enables distributed tracing, you can configure additional products that rely on the SDK. These include capabilities such as Continuous Profiler, Application Security Monitoring, and trace ingestion controls.

Use one of the following setup methods:

- **[Configure in `application_monitoring.yaml`][18]**:

  Enable products across all services on a host without modifying application command lines.

- **[Set environment variables][17]**:

  Enable products by setting environment variables directly in your application configuration. 

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


