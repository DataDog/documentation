---
title: Single Step APM Instrumentation (Beta)
kind: documentation
is_beta: true
---

## Requirements

Single step APM instrumentation only supports tracing Java, Python, Ruby, Node.js, and .NET Core services on `x86_64` architectures.

{{<  callout header="false" url="http://dtdg.co/apm-onboarding" >}}
For Kubernetes deployments, a private beta is available for tracing Java, Python, Ruby, Node.js, and .NET Core.
{{< /callout >}}

## Enable APM on your services in one step

If you [install or update a Datadog Agent][1] with the **Enable APM Instrumentation (beta)** option selected, the Agent is installed and configured to enable APM (with the `DD_APM_INSTRUMENTATION_ENABLED` parameter) and to inject the Datadog tracing library into your code for automatic instrumentation, without any additional installation or configuration steps. Restart services for this instrumentation to take effect.

The following examples show how it works on each infrastructure type. 

{{< tabs >}}
{{% tab "Linux host or VM" %}}

For example, on an Ubuntu host:

1. Run the one-line install command:

   ```shell
   DD_API_KEY=<YOUR_DD_API_KEY> DD_SITE=”<YOUR_DD_SITE>” DD_APM_INSTRUMENTATION_ENABLED=host bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)”
   ```
   This installs, configures, and starts the Agent with APM and [Remote Configuration][1] enabled, and sets up library injection for automatic instrumentation of all services on the host or VM.
   <div class="alert alert-info">You can optionally set an environment for your services and other telemetry that pass through the Agent. Read <a href="#tagging-observability-data-by-environment">tagging observability data by environment</a> to learn how. </div>
2. Restart the services on the host or VM.
3. [Explore the performance observability of your services in Datadog][2].

[1]: /agent/remote_config
[2]: /tracing/service_catalog/

{{% /tab %}}

{{% tab "Docker" %}}

For example, for a Docker Linux container:

1. Install the library injector:
   ```shell
   bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_docker_injection.sh)"
   ```
2. Configure the Agent in Docker:
   ```shell
   docker run -d --name dd-agent \  
     -e DD_API_KEY=${DD_API_KEY} \
     -e DD_APM_ENABLED=true \
     -e DD_APM_NON_LOCAL_TRAFFIC=true \
     -e DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true \
     -e DD_APM_RECEIVER_SOCKET=/opt/datadog/apm/inject/run/apm.socket \
     -e DD_DOGSTATSD_SOCKET=/opt/datadog/apm/inject/run/dsd.socket \
     -v /opt/datadog/apm:/opt/datadog/apm \
     -v /var/run/docker.sock:/var/run/docker.sock:ro \
     gcr.io/datadoghq/agent:7
   ```
   <div class="alert alert-info">You can optionally set an environment for your services and other telemetry that pass through the Agent. Read <a href="#tagging-observability-data-by-environment">tagging observability data by environment</a> to learn how. </div>
3. Restart the Docker containers.
4. [Explore the performance observability of your services in Datadog][2].

[1]: /agent/remote_config
[2]: /tracing/service_catalog/

{{% /tab %}}

{{< /tabs >}}

### Tagging observability data by environment

Set `DD_ENV` in your one-line install command for Linux and the library injector installation command for Docker to automatically tag instrumented services and other telemetry that pass through the Agent with a specific environment. For example, if the Agent is installed in your staging environment, set `DD_ENV=staging` to associate your observability data with `staging`.

## Removing Single Step APM instrumentation from your Agent

If you don't want to collect trace data for a particular service, or for all services on a particular host, VM, or container, run one of the following commands directly on the relevant infrastructure to remove APM instrumentation.

### Removing instrumentation for specific services

Run the following commands and restart the service to stop injecting the library into the service and stop producing traces from that service.


{{< tabs >}}
{{% tab "Linux host or VM" %}}

1. Add the `DD_INSTRUMENT_SERVICE_WITH_APM` environment variable to the service startup command: 

   ```shell
   DD_INSTRUMENT_SERVICE_WITH_APM=false <service_start_command>
   ```
2. Restart the service.

{{% /tab %}}

{{% tab "Docker" %}}

1. Add the `DD_INSTRUMENT_SERVICE_WITH_APM` environment variable to the service startup command: 
   ```shell
   docker run -e DD_INSTRUMENT_SERVICE_WITH_APM=false
   ```
2. Restart the service.
{{% /tab %}}

{{< /tabs >}}

### Removing APM for all services on the infrastructure

To stop producing traces, remove library injectors and restart the infrastructure:


{{< tabs >}}
{{% tab "Linux host or VM" %}}

1. Run:
   ```shell
   dd-host-install --uninstall
   ```
2. Restart your host.

{{% /tab %}}

{{% tab "Docker" %}}

1. Uninstall local library injection:
   ```shell
   dd-container-install --uninstall
   ```
2. Restart Docker:
   ```shell
   systemctl restart docker
   ```
   Or use the equivalent for your environment.

{{% /tab %}}

{{< /tabs >}}



[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /tracing/services/

