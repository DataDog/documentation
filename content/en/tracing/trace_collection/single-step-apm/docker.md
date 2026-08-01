---
title: Single Step APM Instrumentation on Docker
description: "Enable Datadog Single Step Instrumentation for applications in Docker containers, verify traces, configure SDK versions and tags, and remove instrumentation."
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

For applications in Docker Linux containers, Single Step Instrumentation (SSI) configures the Docker host to [instrument][3] supported application containers without changing their images.

## Enable APM on your applications

Before you begin:

- Confirm that your environment meets the [SSI compatibility requirements][15].
- Run the commands in this section on the Docker host, not inside the Agent or application container.

{{< tabs >}}
{{% tab "Installation command" %}}

1. Configure the Docker host to inject Datadog SDKs into new containers:

   ```shell
   DD_APM_INSTRUMENTATION_ENABLED=docker DD_NO_AGENT_INSTALL=true \
     bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
   ```

   This installs the Datadog container injector and configures the Docker runtime. It does not install or replace the Agent container.

1. Start the Agent with APM enabled and share the injector's socket directory. Replace `<YOUR_API_KEY>` with your [Datadog API key][1] and `<YOUR_SITE>` with your [Datadog site][2]:

   ```shell
   docker run -d --name dd-agent \
     -e DD_API_KEY=<YOUR_API_KEY> \
     -e DD_SITE=<YOUR_SITE> \
     -e DD_APM_ENABLED=true \
     -e DD_APM_NON_LOCAL_TRAFFIC=true \
     -e DD_APM_RECEIVER_SOCKET=/opt/datadog/apm/inject/run/apm.socket \
     -v /opt/datadog/apm:/opt/datadog/apm \
     -v /var/run/docker.sock:/var/run/docker.sock:ro \
     registry.datadoghq.com/agent:7
   ```

   If the Agent container already exists, recreate it with equivalent APM socket and volume settings. Keep any other settings required by your environment.

{{% /tab %}}
{{% tab "In-app instructions" %}}

1. In Datadog, go to the [Install the Datadog Agent on Docker][4] page.
1. In the {{< ui >}}Customize my Agent install command{{< /ui >}} section, go to {{< ui >}}Additional configuration{{< /ui >}} > {{< ui >}}Application Observability{{< /ui >}}, and turn on {{< ui >}}APM Instrumentation{{< /ui >}}.

   {{< img src="tracing/trace_collection/docker-apm-instrumentation-toggle.png" alt="The 'Customize your Agent install command' section of in-app instructions for installing the Datadog Agent on Docker" style="width:100%;" >}}

1. Copy and run the generated commands on the Docker host. If the Agent is already running, recreate the Agent container with the generated configuration.

{{% /tab %}}
{{< /tabs >}}

(Optional) By default, SSI installs the latest SDK major versions. To pin specific versions, see [Set SDK tracer versions][17].

<div class="alert alert-info">SSI adds a small amount of startup time to instrumented applications. If this overhead is not acceptable for your use case, contact <a href="/help/">Datadog Support</a>.</div>

## Verify your first trace

1. Recreate or restart your application containers so SSI can inject the Datadog SDK when each process starts.
1. Generate traffic to your application.
1. In Datadog, go to [**APM** > **Traces**][5] to confirm that your service is reporting traces.

If traces don't appear:

- Confirm that the Agent and application containers share `/opt/datadog/apm` and that the Agent APM socket exists in that directory.
- Set `DD_APM_INSTRUMENTATION_DEBUG=true` on the application container, recreate it, then inspect `docker logs <CONTAINER>` for injection messages.
- Inspect the application process environment inside the container for the language-specific settings described in the [injector guide][16].

For more help, see the [SSI troubleshooting guide][6].

## Set SDK tracer versions

By default, Single Step Instrumentation installs the latest major versions of Datadog SDKs, and applies minor version updates automatically when they become available.

To pin specific major or exact versions, set the `DD_APM_INSTRUMENTATION_LIBRARIES` variable in the install command:

```shell
DD_APM_INSTRUMENTATION_ENABLED=docker DD_NO_AGENT_INSTALL=true \
  DD_APM_INSTRUMENTATION_LIBRARIES="java:1,python:4,js:5,dotnet:3,ruby:2,php:1" \
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

1. On the Docker host, run:
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
[15]: /tracing/trace_collection/single-step-apm/compatibility/
[16]: /tracing/guide/injectors/#per-runtime-instrumentation
[17]: #set-sdk-tracer-versions
