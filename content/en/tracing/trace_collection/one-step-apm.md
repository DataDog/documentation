---
title: 1-Step APM Instrumentation
kind: documentation
is_beta: true
---

<div class="alert alert-info">
<strong>1-Step APM Instrumentation is in beta!</strong> <p>This feature is available in Datadog Agent version x.x:</p>
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

For example, on an Ubuntu host, the one-line install command is:

```shell
DD_API_KEY=<YOUR_DD_API_KEY> DD_SITE=”<YOUR_DD_SITE>” DD_APM_INSTRUMENTATION_ENABLED=host bash -c(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)”
```

For the one-line command that installs the Agent with APM for your Linux host, VM, or Docker container, see the [Agent Installation page][1].

Then, start [exploring the performance observability of your services in Datadog][2].

## Removing 1-step APM instrumentation from your Agent

If you no longer want to collect trace data for a particular service, or for all services on a particular host, VM, container, or Kubernetes cluster, you can remove APM instrumentation either by running the following commands directly on the infrastructure involved.

### Removing instrumentation for specific services

Running the following commands and restarting the service stops the library from being injected into the service, stops the production of traces from that service.


{{< tabs >}}
{{% tab "Hosts and VMs" %}}

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
{{% tab "Hosts and VMs" %}}

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

