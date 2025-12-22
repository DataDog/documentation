---
title: Single Step APM Instrumentation on Docker
code_lang: docker
type: multi-code-lang
code_lang_weight: 10
further_reading:
  - link: /tracing/metrics/runtime_metrics/
    tag: Documentation
    text: Enable Runtime Metrics
---

## Overview

In a Docker Linux container, use Single Step Instrumentation (SSI) for APM to install the Datadog Agent and [instrument][14] your applications in one step, with no additional configuration required. 

## Enable APM on your applications

<div class="alert alert-info">Before proceeding, confirm that your environment is compatible by reviewing the <a href="https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/single-step-apm/compatibility/">SSI compatibility guide.</a></div>

To enable APM in a Docker Linux container:

1. In Datadog, go to the [Install the Datadog Agent on Docker][15] page.
1. In the **Customize my agent install command** section, go to **Additional configuration** > **Application Observability**, and turn on **APM Instrumentation**.
  
   {{< img src="tracing/trace_collection/docker-apm-instrumentation-toggle.png" alt="The 'Customize your agent install command' section of in-app instructions for installing the Datadog Agent on Docker" style="width:100%;" >}}

1. Copy and run the Agent installation command in your Docker container. If the Agent is already running, redeploy the Agent container using the new command.
1. Restart your applications.

<div class="alert alert-info">SSI adds a small amount of startup time to instrumented applications. If this overhead is not acceptable for your use case, contact <a href="/help/">Datadog Support</a>.</div>

## Set SDK tracer versions

By default, Single Step Instrumentation installs the latest major versions of Datadog APM SDKs. Minor version updates are applied automatically when they become available.

You may want to customize SDK versions based on your application's language version or specific environment requirements. You can control the major and minor versions used by customizing library versions during setup.

To customize tracer versions:

1. In Datadog, go to the [Install the Datadog Agent on Docker][15] page.
1. After you turn on **APM Instrumentation**, click **Customize library versions**.

   {{< img src="tracing/trace_collection/apm-instrumentation-version-pinning.png" alt="The 'Customize library versions' drop-down in the instructions for installing the Datadog Agent on Docker" style="width:100%;" >}}

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

Unified Service Tags (USTs) apply consistent tags across traces, metrics, and logs, making it easier to navigate and correlate your observability data. Learn how to [set USTs for Docker services][16].

## Enable SDK-dependent products and features

After SSI loads the Datadog SDK into your applications and enables distributed tracing, you can configure additional products that rely on the SDK. These include capabilities such as [Continuous Profiler][18], [App and API Protection][19], and [trace ingestion controls][20].

To enable products, [set environment variables][3] in your application configuration.

## Remove Single Step APM instrumentation from your Agent

If you don't want to collect trace data for a particular service, host, VM, or container, complete the following steps:

### Remove instrumentation for specific services

To remove APM instrumentation and stop sending traces from a specific service:

1. Add the `DD_INSTRUMENT_SERVICE_WITH_APM` environment variable to the service startup command:
   ```shell
   docker run -e DD_INSTRUMENT_SERVICE_WITH_APM=false <service_start_command>
   ```
2. Restart the service.

### Remove APM for all services on the infrastructure

To stop producing traces, uninstall APM and restart the infrastructure:

1. Run:
   ```shell
   dd-container-install --uninstall
   ```
2. Restart Docker:
   ```shell
   systemctl restart docker
   ```
   Or use the equivalent for your environment.

## Troubleshooting

If you encounter problems enabling APM with SSI, see the [SSI troubleshooting guide][17].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /tracing/trace_collection/library_config/
[3]: /tracing/trace_collection/library_config/
[8]: https://github.com/DataDog/dd-trace-java/releases
[9]: https://github.com/DataDog/dd-trace-js/releases
[10]: https://github.com/DataDog/dd-trace-py/releases
[11]: https://github.com/DataDog/dd-trace-dotnet/releases
[12]: https://github.com/DataDog/dd-trace-rb/releases
[13]: https://github.com/DataDog/dd-trace-php/releases
[14]: /tracing/glossary/#instrumentation
[15]: https://app.datadoghq.com/fleet/install-agent/latest?platform=docker
[16]: /getting_started/tagging/unified_service_tagging/?tab=docker#containerized-environment
[17]: /tracing/trace_collection/automatic_instrumentation/single-step-apm/troubleshooting
[18]: /profiler/
[19]: /security/application_security/
[20]: /tracing/trace_pipeline/ingestion_controls/



