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

In a Docker Linux container, use Single Step Instrumentation (SSI) for APM to install the Datadog Agent and [instrument][14] your applications in one step, with no additional configuration required. 

{{% dd-apm-skill %}}

## Enable APM on your applications

<div class="alert alert-info">Before proceeding, confirm that your environment is compatible by reviewing the <a href="https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/single-step-apm/compatibility/">SSI compatibility guide.</a></div>

To enable APM in a Docker Linux container:

1. In Datadog, go to the [Install the Datadog Agent on Docker][15] page.
1. In the {{< ui >}}Customize my agent install command{{< /ui >}} section, go to {{< ui >}}Additional configuration{{< /ui >}} > {{< ui >}}Application Observability{{< /ui >}}, and turn on {{< ui >}}APM Instrumentation{{< /ui >}}.
  
   {{< img src="tracing/trace_collection/docker-apm-instrumentation-toggle.png" alt="The 'Customize your agent install command' section of in-app instructions for installing the Datadog Agent on Docker" style="width:100%;" >}}

1. Copy and run the following commands on your Docker host (not inside an application container). If the Agent is already running, redeploy the Agent container using the new command.

   Enabling SSI takes two commands. First, install the Docker instrumentation components without installing a host Agent:

   ```shell
   DD_APM_INSTRUMENTATION_ENABLED=docker \
   DD_NO_AGENT_INSTALL=true \
   bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
   ```

   Then, run or redeploy the Agent container. Replace `<YOUR_DD_API_KEY>` with your [Datadog API key][1]. Treat your API key as a secret: provide it through an environment variable or a secrets manager rather than hardcoding it in shared files.

   ```shell
   docker run -d --name dd-agent \
     -e DD_API_KEY=<YOUR_DD_API_KEY> \
     -e DD_SITE="{{< region-param key="dd_site" >}}" \
     -e DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true \
     -e DD_APM_ENABLED=true \
     -e DD_APM_NON_LOCAL_TRAFFIC=true \
     -e DD_APM_RECEIVER_SOCKET=/var/run/datadog/apm.socket \
     -e DD_DOGSTATSD_SOCKET=/var/run/datadog/dsd.socket \
     -v /var/run/datadog:/var/run/datadog \
     -v /var/run/docker.sock:/var/run/docker.sock:ro \
     -v /proc/:/host/proc/:ro \
     -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
     -v /var/lib/docker/containers:/var/lib/docker/containers:ro \
     registry.datadoghq.com/agent:7
   ```

   **Note**: Run only one Datadog Agent per node. If the Agent container already exists, redeploy it with the command above. For rootless Docker, set the correct Docker socket in `docker_config.yaml`.
1. Restart your applications.

<div class="alert alert-info">SSI adds a small amount of startup time to instrumented applications. If this overhead is not acceptable for your use case, contact <a href="/help/">Datadog Support</a>.</div>

## Set SDK tracer versions

By default, Single Step Instrumentation installs the latest major versions of Datadog SDKs. Minor version updates are applied automatically when they become available.

You may want to customize SDK versions based on your application's language version or specific environment requirements. You can control the major and minor versions used by customizing library versions during setup.

To customize tracer versions:

1. In Datadog, go to the [Install the Datadog Agent on Docker][15] page.
1. After you turn on {{< ui >}}APM Instrumentation{{< /ui >}}, click {{< ui >}}Customize library versions{{< /ui >}}.

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

## Verify the installation

1. Confirm the Agent container is running:

   ```shell
   docker ps --filter name=dd-agent
   ```

1. Confirm the Agent is healthy and the APM Agent is running:

   ```shell
   docker exec -it dd-agent agent status
   ```

   Check the **APM Agent** section of the output. Prepend `sudo` if your Docker installation requires it.

1. After your applications receive traffic, confirm your services appear on the [APM Services page][18]. If they don't appear within a few minutes, follow the [SSI troubleshooting guide][17].

## Configure Unified Service Tags

Unified Service Tags (USTs) apply consistent tags across traces, metrics, and logs, making it easier to navigate and correlate your observability data. Learn how to [set USTs for Docker services][16].

## Enable SDK-dependent products and features

After SSI loads the Datadog SDK into your applications and enables distributed tracing, you can configure additional products that rely on the SDK:

{{< ssi-products >}}

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
[18]: https://app.datadoghq.com/apm/services



