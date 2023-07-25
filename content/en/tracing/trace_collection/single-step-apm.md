---
title: Single Step APM Instrumentation
kind: documentation
is_beta: true
---

<div class="alert alert-info">
<strong>Single Step APM Instrumentation is in beta!</strong> <p>This feature is available in Datadog Agent version x.x:</p>
<ul>
<li>on Linux hosts and VMs</li>
<li>on Docker containers</li>
<li>installed with Ansible</li>
</ul>
<p>for tracing Java, Python, Node.js, and .NET services. Try it out!</p> 

<p>For Kubernetes deployments, a private beta is available for tracing Java, Python, Node.js, .NET and Ruby services. <a href="http://dtdg.co/apm-onboarding">Fill out this form to request access</a>.</p>
</div>

## Enable APM on your services in one step

If you [install or update a Datadog Agent][1] with the **Enable APM Instrumentation (beta)** option selected, the Agent is installed and configured to enable APM (with the `DD_APM_INSTRUMENTATION_ENABLED` parameter) and to inject the Datadog tracing library into your code for automatic instrumentation, without any additional installation or configuration steps. You need only restart the services to start sending trace data to Datadog.

For the commands that install the Agent with APM for your Linux host, VM, Docker container, Kubernetes, or Ansible for Linux VMs, see the [Agent Installation page][1]. The following examples show generally how it works on each infrastructure type. 

{{< tabs >}}
{{% tab "Linux host or VM" %}}

For example, on an Ubuntu host:

1. Run the one-line install command:

   ```shell
   DD_API_KEY=<YOUR_DD_API_KEY> DD_SITE=”<YOUR_DD_SITE>” DD_APM_INSTRUMENTATION_ENABLED=host bash -c(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)”
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
{{% tab "Kubernetes" %}}

1. Install [Helm][5].
2. Add the Datadog Helm repository: 
   ```shell
   helm repo add datadog https://helm.datadoghq.com
   ```
3. Fetch the latest version of newly added charts: 
   ```shell
   helm repo update
   ```
4. Create an empty `datadog-values.yaml` file, and override the [default values][3], if desired. See [these useful examples][4].
5. Deploy the Datadog Agent by running one of the following commands:
   For Helm v3:
   ```shell
   helm install <RELEASE_NAME> -f datadog-values.yaml --set datadog.site='<YOUR_DD_SITE>' --set datadog.apm.instrumentation_enabled='true' --set datadog.apiKey=<YOUR_DD_KEY> datadog/datadog
   ```
   Or for Helm v1 or v2:
   ```shell
   helm install -f datadog-values.yaml --name <RELEASE_NAME> --set datadog.site='<YOUR_DD_SITE>' --set datadog.apm.instrumentation_enabled='true' --set datadog.apiKey=<YOUR_DD_KEY> datadog/datadog
   ```
   This installs, configures, and starts the Agent with APM and [Remote Configuration][1] enabled, and sets up library injection for automatic instrumentation.
6. Start the deployments.
7. [Explore the performance observability of your services in Datadog][2].

[1]: /agent/remote_config
[2]: /tracing/service_catalog/
[3]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml
[4]: https://github.com/DataDog/helm-charts/tree/main/examples/datadog
[5]: https://v3.helm.sh/docs/intro/install/

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

If you don't want to collect trace data for a particular service (for example, operating system services or AntiVirus), or for all services on a particular host, VM, container, or Kubernetes deployment, you can remove APM instrumentation by running one of the following commands directly on the infrastructure involved.

### Removing instrumentation for specific services

Running the following commands and restarting the service stops the library from being injected into the service, stops the production of traces from that service.


{{< tabs >}}
{{% tab "Linux host or VM" %}}

1. Add the `DD_INSTRUMENT_SERVICE_WITH_APM` environment variable to the service startup command: 

   ```shell
   DD_INSTRUMENT_SERVICE_WITH_APM=false <service_start_command>
   ```
2. Re-start the service.

{{% /tab %}}

{{% tab "Docker" %}}

1. Add the `DD_INSTRUMENT_SERVICE_WITH_APM` environment variable to the service startup command: 
   ```shell
   docker run -e DD_INSTRUMENT_SERVICE_WITH_APM=false
   ```
2. Restart the service.
{{% /tab %}}
{{% tab "Kubernetes" %}}

1. Run:
   ```shell
   tktk
   ```
2. Restart the service.

{{% /tab %}}
{{< /tabs >}}

### Removing APM for all services on the infrastructure

Running the following commands and restarting the infrastructure removes library injectors and stops the production of traces.

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
{{% tab "Kubernetes" %}}

1. Run:
   ```shell
   tktk
   ```
2. Restart your cluster.

{{% /tab %}}
{{< /tabs >}}



[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /tracing/services/

