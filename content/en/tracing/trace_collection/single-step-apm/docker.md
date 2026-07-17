---
title: Single Step APM Instrumentation on Docker
code_lang: docker
type: multi-code-lang
code_lang_weight: 10
aliases:
- /tracing/trace_collection/automatic_instrumentation/single-step-apm/docker
further_reading:
  - link: /tracing/metrics/runtime_metrics/
    tag: Documentation
    text: Enable Runtime Metrics
---

## Overview

In a Docker Linux container, use Single Step Instrumentation (SSI) for APM to install the Datadog Agent and [instrument][3] your applications in one step, with no additional configuration required.

## Enable APM on your applications

<div class="alert alert-info">Before you begin, confirm that your environment is compatible by reviewing the <a href="/tracing/trace_collection/single-step-apm/compatibility/">SSI compatibility guide</a>.</div>

{{< tabs >}}
{{% tab "Installation command" %}}

Run the following command to install the Agent and enable SSI. Replace `<YOUR_API_KEY>` with your [Datadog API key][1] and `<YOUR_SITE>` with your [Datadog site][2].

```shell
DD_API_KEY=<YOUR_API_KEY> DD_SITE=<YOUR_SITE> DD_APM_INSTRUMENTATION_ENABLED=docker \
  bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

If the Agent is already running, redeploy the Agent container with the new command.

{{% /tab %}}
{{% tab "In-app instructions" %}}

1. In Datadog, go to the [Install the Datadog Agent on Docker][4] page.
1. In the {{< ui >}}Customize my Agent install command{{< /ui >}} section, go to {{< ui >}}Additional configuration{{< /ui >}} > {{< ui >}}Application Observability{{< /ui >}}, and turn on {{< ui >}}APM Instrumentation{{< /ui >}}.

   {{< img src="tracing/trace_collection/docker-apm-instrumentation-toggle.png" alt="The 'Customize your Agent install command' section of in-app instructions for installing the Datadog Agent on Docker" style="width:100%;" >}}

1. Copy and run the Agent installation command in your Docker container. If the Agent is already running, redeploy the Agent container with the new command.

{{% /tab %}}
{{< /tabs >}}

(Optional) By default, SSI installs the latest SDK major versions. To pin specific versions, see [Set SDK tracer versions](#set-sdk-tracer-versions).

<div class="alert alert-info">SSI adds a small amount of startup time to instrumented applications. If this overhead is not acceptable for your use case, contact <a href="/help/">Datadog Support</a>.</div>

## Verify your first trace

1. Restart your application containers so SSI can inject the Datadog SDK. Unlike a host installation, Docker injection applies to already-running containers when you restart them.
1. Generate traffic to your application.
1. In Datadog, go to [**APM** > **Traces**][5] to confirm that your service is reporting traces.

If traces don't appear, check the following inside an instrumented container:

- Confirm that the injector is registered. `cat /etc/ld.so.preload` and the `LD_PRELOAD` environment variable should point to the Datadog launcher (`launcher.preload.so`).
- Set `DD_APM_INSTRUMENTATION_DEBUG=true`, then inspect `docker logs <CONTAINER>` for injection messages.

For more help, see the [SSI troubleshooting guide][6].

## Set SDK tracer versions

By default, Single Step Instrumentation installs the latest major versions of Datadog SDKs, and applies minor version updates automatically when they become available.

To pin specific major or exact versions, set the `DD_APM_INSTRUMENTATION_LIBRARIES` variable in the install command:

```shell
DD_API_KEY=<YOUR_API_KEY> DD_SITE=<YOUR_SITE> DD_APM_INSTRUMENTATION_ENABLED=docker \
  DD_APM_INSTRUMENTATION_LIBRARIES="java:1,python:3,js:5,dotnet:3,ruby:2,php:1" \
  bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

Alternatively, use the in-app installer: after you turn on {{< ui >}}APM Instrumentation{{< /ui >}} on the [Install the Datadog Agent on Docker][4] page, click {{< ui >}}Customize library versions{{< /ui >}} and select an exact or major version for each language.

Available versions are listed in source repositories for each language: [Java][8] (`java`), [Node.js][9] (`js`), [Python][10] (`python`), [.NET][11] (`dotnet`), [Ruby][12] (`ruby`), [PHP][13] (`php`).

## Configure Unified Service Tags

Unified Service Tags (USTs) apply consistent tags across traces, metrics, and logs, making it easier to navigate and correlate your observability data. Learn how to [set USTs for Docker services][7].

## Enable SDK-dependent products and features

After SSI loads the Datadog SDK into your applications and enables distributed tracing, you can configure additional products that rely on the SDK:

{{< ssi-products >}}

To enable products, [set environment variables][14] in your application configuration.

## Remove Single Step APM instrumentation from your Agent

If you don't want to collect trace data for a particular service, host, VM, or container, complete the following steps.

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

If you encounter problems enabling APM with SSI, see the [SSI troubleshooting guide][6].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /getting_started/site/
[3]: /tracing/glossary/#instrumentation
[4]: https://app.datadoghq.com/fleet/install-agent/latest?platform=docker
[5]: https://app.datadoghq.com/apm/traces
[6]: /tracing/trace_collection/single-step-apm/troubleshooting/
[7]: /getting_started/tagging/unified_service_tagging/?tab=docker#containerized-environment
[8]: https://github.com/DataDog/dd-trace-java/releases
[9]: https://github.com/DataDog/dd-trace-js/releases
[10]: https://github.com/DataDog/dd-trace-py/releases
[11]: https://github.com/DataDog/dd-trace-dotnet/releases
[12]: https://github.com/DataDog/dd-trace-rb/releases
[13]: https://github.com/DataDog/dd-trace-php/releases
[14]: /tracing/trace_collection/library_config/
