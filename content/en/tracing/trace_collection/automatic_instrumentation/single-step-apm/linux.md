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

1. In the Datadog app, go to the [Install the Datadog Agent on Linux][15] page.
1. In the **Customize your observability coverage** section, go to **Additional features** > **Application Observability**, and turn on **APM Instrumentation**.
   
   {{< img src="tracing/trace_collection/linux-apm-instrumentation-toggle.png" alt="The 'Customize your observability coverage' section of in-app instructions for installing the Datadog Agent on Linux" style="width:100%;" >}}

1. Copy and run the Agent installation command on your Linux host or VM.
1. Restart your applications.

## Set SDK tracer versions

By default, Single Step Instrumentation installs the latest major versions of Datadog APM SDKs. Minor version updates are applied automatically when they become available.

You may want to customize SDK versions based on your application's language version or specific environment requirements. You can control the major and minor versions used by customizing library versions during setup.

To customize tracer versions:

1. In the Datadog app, go to the [Install the Datadog Agent on Linux][15] page.
1. After you turn on **APM Instrumentation**, click **Customize library versions**.

   {{< img src="tracing/trace_collection/apm-instrumentation-version-pinning.png" alt="The 'Customize library versions' drop-down in the instructions for installing the Datadog Agent on Linux" style="width:100%;" >}}

1. Find your language(s) and use the dropdown to either:
   - Pin an exact tracer version, or
   - Select the major version you want to use.
1. Copy and run the updated installation command.

Available versions are listed in source repositories for each language:

- [Java][8] (`java`)
- [Node.js][9] (`js`)
- [Python][10] (`python`)
- [.NET][11] (`dotnet`)
- [Ruby][12] (`ruby`)
- [PHP][13] (`php`)

## Configure Unified Service Tags

Unified Service Tags (USTs) connect traces, metrics, and logs by applying consistent tags across your telemetry. This makes it easier to navigate your observability data. Learn how to [set USTs for Linux services][16].

## Remove Single Step APM instrumentation from your Agent

To stop producing traces for all services on your infrastructure:

1. Run:
   ```shell
   dd-host-install --uninstall
   ```
2. Restart the services on the host or VM.

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


