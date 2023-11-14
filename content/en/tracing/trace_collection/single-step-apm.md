---
title: Single Step APM Instrumentation (Beta)
kind: documentation
is_beta: true
---

## Requirements

Single step APM instrumentation only supports tracing Java, Python, Ruby, Node.js, and .NET Core services on `x86_64` architectures.

## Enable APM on your services in one step

If you [install or update a Datadog Agent][1] with the **Enable APM Instrumentation (beta)** option selected, the Agent is installed and configured to enable APM (with the `DD_APM_INSTRUMENTATION_ENABLED` parameter) and to inject the Datadog tracing library into your code for automatic instrumentation, without any additional installation or configuration steps. Restart services for this instrumentation to take effect.

The following examples show how it works on each infrastructure type. 

{{< tabs >}}
{{% tab "Linux host or VM" %}}

For for an Ubuntu host:

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

For a Docker Linux container:

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

{{% tab "Kubernetes" %}}

You can enable APM when installing the Agent with the [Datadog Operator](#operator) or a [Helm chart](#helm-chart). You can also set an environment for your services, enabled or disabled namespaces, and tracing library versions for each language.

### Operator

The Datadog Operator is a way to deploy the Datadog Agent on Kubernetes and OpenShift.

For the Datadog Operator:

1. Make sure you've [installed the Datadog Operator on Kubernetes][3].
2. Configure `datadog-agent.yaml` as shown in the following example:

```bash
   features:
     apm:
       instrumentation:
         enabled: true
```
3. After the Datadog Cluster Agent starts again, restart your services. 

### Helm Chart

You can use the Datadog Helm chart to install the Datadog Agent on all nodes in your cluster with a DaemonSet.

To enable single step instrumentation for the whole cluster:

1. Make sure you've [installed the Datadog Agent on Kubernetes][4].
2. Add the following configuration to `datadog-values.yaml`:

```bash
   datadog:  
     apm:
       instrumentation:
         enabled: true
```
3. After the Datadog Cluster Agent starts again, restart your services. 

[3]: /containers/kubernetes/installation/?tab=operator
[4]: /containers/kubernetes/installation/?tab=helm

{{% /tab %}}
{{< /tabs >}}

### Tagging observability data by environment

Set `DD_ENV` in your one-line install command for Linux and the library injector installation command for Docker to automatically tag instrumented services and other telemetry that pass through the Agent with a specific environment. For example, if the Agent is installed in your staging environment, set `DD_ENV=staging` to associate your observability data with `staging`.

### Enabling or disabling namespaces

You can configure your Kubernetes setup to enable or disable observability data collection for specific namespaces.

To enable specific namespaces:

1. Add the following configuration to `instrumentation` in datadog-agent.yaml or datadog-values.yaml: 
{{< highlight yaml "hl_lines=3-5" >}}
   instrumentation:
      enabled: true
      enabledNamespaces:
          - namespace1
          - namespace2
{{< /highlight >}}
2. Restart your services.

To disable specific namespaces:

1. Add the following configuration to `instrumentation` in datadog-agent.yaml or datadog-values.yaml: 
{{< highlight yaml "hl_lines=3-5" >}}
   instrumentation:
      enabled: true
      disabledNamespaces:
          - namespace1
          - namespace2
{{< /highlight >}}
2. Restart your services.

### Specifying a tracing library version

You can configure your Kubernetes setup to use specific tracing library versions:

1. Add the following configuration to `instrumentation` in datadog-agent.yaml or datadog-values.yaml: 
{{< highlight yaml "hl_lines=3-9" >}}
   instrumentation:
      enabled: true
      libVersions:
         libVersions:
         dotnet: v2.40.0
         python: v1.20.6
         java: v1.22.0
         js: v4.17.0
         ruby: v1.15.0
{{< /highlight >}}

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

{{% tab "Kubernetes" %}}

Add the `admission.datadoghq.com/enabled=false` on a service to disable single step instrumentation for that specific service.

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

{{% tab "Kubernetes" %}}

For Operator:

1. Update the following configuration in `datadog-values.yaml`:
{{< highlight yaml "hl_lines=4" >}}
  features:  
    apm:
      instrumentation:
        enabled: false
{{< /highlight >}}
2. Restart your services.

For Helm Charts: 

1. Update the following configuration in `datadog-values.yaml`:
{{< highlight yaml "hl_lines=4" >}}
  datadog:  
    apm:
      instrumentation:
        enabled: false
{{< /highlight >}}
2. Restart your services.

{{% /tab %}}

{{< /tabs >}}



[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /tracing/services/

