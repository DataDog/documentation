---
title: Single Step APM Instrumentation
kind: documentation
is_beta: true
---

<div class="alert alert-info">
<strong>Single Step APM Instrumentation is in beta!</strong> <p> This feature is available in the latest Datadog Agent version.</p>
<ul>
<li>On x86_64 architectures only</li>
<li>On Linux hosts and VMs</li>
<li>On Docker containers</li>
</ul>
<p>It supports tracing Java, Python, Ruby, Node.js, and .NET services. Try it out!</p> 

<p>For Kubernetes deployments, a private beta is available for tracing Java, Python, Node.js, .NET and Ruby services. <a href="http://dtdg.co/apm-onboarding">Fill out this form to request access</a>.</p>
</div>

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
2. Restart the services on the host or VM.
3. [Explore the performance observability of your services in Datadog][2].

[1]: /agent/remote_config
[2]: /tracing/service_catalog/

{{% /tab %}}

{{% tab "Docker" %}}

For example, for a Docker Linux container:

1. Install the library injector:
   ```shell
   DD_APM_INSTRUMENTATION_ENABLED=docker bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"
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
  
3. Restart the Docker containers.
4. [Explore the performance observability of your services in Datadog][2].

[1]: /agent/remote_config
[2]: /tracing/service_catalog/

{{% /tab %}}

{{< /tabs >}}


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

Run the following commands and restart the infrastructure to remove library injectors and stop producing traces.

{{< tabs >}}
{{% tab "Linux host or VM" %}}

1. Run:
   ```shell
   dd-host-install --uninstall
   ```
2. Restart your host.

{{% /tab %}}

{{% tab "Docker" %}}

1. Run:
   ```shell
   dd-container-install --uninstall
   ```
2. Restart your container.
{{% /tab %}}

{{< /tabs >}}



[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /tracing/services/

