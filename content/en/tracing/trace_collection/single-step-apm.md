---
title: Single Step APM Instrumentation
kind: documentation
is_beta: true
---

<div class="alert alert-info">
<strong>Single Step APM Instrumentation is in beta!</strong> <p> This feature is available in the latest Datadog Agent version.</p>
<ul>
<li>On Linux hosts and VMs</li>
<li>On Docker containers</li>
<li>If installed with Ansible</li>
</ul>
<p>It supports tracing Java, Python, Node.js, and .NET services. Try it out!</p> 

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
   -v /var/run/docker.sock:/var/run/docker.sock:ro \
   -v /proc/:/host/proc/:ro \
   -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
   -v /opt/datadog/apm:/opt/datadog/apm \
   -v /sys/kernel/debug:/sys/kernel/debug \
   -e DD_API_KEY= "<YOUR_DD_API_KEY>" \
   -e DD_SITE="<YOUR_DD_SITE>" \
   -e DD_APM_INSTRUMENTATION_ENABLED=true \
   -e DD_APM_NON_LOCAL_TRAFFIC=true \
   -e DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true \
   -e DD_AC_EXCLUDE=name:datadog-agent \
   -e DD_APM_RECEIVER_SOCKET=/opt/datadog/apm/inject/run/apm.socket \
   -e DD_USE_DOGSTATSD=true \
   -e DD_DOGSTATSD_SOCKET=/opt/datadog/apm/inject/run/dsd.socket \
   -e DD_REMOTE_CONFIGURATION_ENABLED=true \
   --cap-add SYS_ADMIN \
   --cap-add SYS_RESOURCE \
   --cap-add SYS_PTRACE \
   --c2ap-add NET_ADMIN \
   --cap-add NET_BROADCAST \
   --cap-add NET_RAW \
   --cap-add IPC_LOCK \
   --cap-add CHOWN \
   --security-opt apparmor:unconfined \
   gcr.io/datadoghq/agent:7
   ```
   Or, for Amazon Linux earlier than version 2:
   ```shell
   docker run -d --name dd-agent \
   -v /var/run/docker.sock:/var/run/docker.sock:ro \
   -v /proc/:/host/proc/:ro \
   -v /cgroup/:/host/sys/fs/cgroup:ro \
   -v /opt/datadog/apm:/opt/datadog/apm \
   -v /sys/kernel/debug:/sys/kernel/debug \
   -e DD_API_KEY= "..." \
   -e DD_SITE="datadoghq.com" \
   -e DD_APM_INSTRUMENTATION_ENABLED=true \
   -e DD_APM_NON_LOCAL_TRAFFIC=true \
   -e DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true \
   -e DD_AC_EXCLUDE=name:datadog-agent \
   -e DD_APM_RECEIVER_SOCKET=/opt/datadog/apm/inject/run/apm.socket \
   -e DD_USE_DOGSTATSD=true \
   -e DD_DOGSTATSD_SOCKET=/opt/datadog/apm/inject/run/dsd.socket \
   -e DD_REMOTE_CONFIGURATION_ENABLED=true \
   --cap-add SYS_ADMIN \
   --cap-add SYS_RESOURCE \
   --cap-add SYS_PTRACE \
   --cap-add NET_ADMIN \
   --cap-add NET_BROADCAST \
   --cap-add NET_RAW \
   --cap-add IPC_LOCK \
   --cap-add CHOWN \
   --security-opt apparmor:unconfined \
   gcr.io/datadoghq/agent:7
   ```
2. Restart the Docker containers.
3. [Explore the performance observability of your services in Datadog][2].

[1]: /agent/remote_config
[2]: /tracing/service_catalog/


{{% /tab %}}

{{% tab "Ansible for Linux VMs" %}}

1. Add the following instruction to your playbook:
   ```yaml
   hosts: servers
       roles:
           - { role: datadog.datadog, become: yes }
       vars:
           datadog_api_key: "<YOUR_DD_KEY>"
           datadog_site: "<YOUR_DD_SITE>" 
           datadog_apm_instrumentation_enabled: "host"
   ```
2. Deploy.
3. [Explore the performance observability of your services in Datadog][2].

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

