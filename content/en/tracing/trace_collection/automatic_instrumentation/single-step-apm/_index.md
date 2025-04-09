---
title: Single Step APM Instrumentation
aliases:
- /tracing/trace_collection/single-step-apm
type: multi-code-lang
further_reading:
  - link: /tracing/metrics/runtime_metrics/
    tag: Documentation
    text: Enable Runtime Metrics
---
## Overview

Single Step Instrumentation (SSI) for APM installs the Datadog Agent and [instruments][4] your applications in one step, with no additional configuration steps required.

## Compatibility

To see requirements for compatible languages, operating systems, and architectures, see [Single Step Instrumentation compatibility][6].

## Enabling APM on your applications

If you [install or update a Datadog Agent][1] with the **Enable APM Instrumentation** option selected, the Agent is installed and configured to enable APM. This automatically instruments your application, without any additional installation or configuration steps.

The following examples show how it works for each deployment type.

{{< partial name="apm/apm-single-step.html" >}}

<br>

## Removing Single Step APM instrumentation from your Agent

If you don't want to collect trace data for a particular service, host, VM, or container, complete the following steps:

### Removing instrumentation for specific services

To remove APM instrumentation and stop sending traces from a specific service, follow these steps:

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
   docker run -e DD_INSTRUMENT_SERVICE_WITH_APM=false <service_start_command>
   ```
2. Restart the service.
{{% /tab %}}

{{% tab "Kubernetes" %}}

**Note**: Single Step Instrumentation for Kubernetes is GA for Agent versions 7.64+, and in Preview for Agent versions <=7.63.

#### Using workload selection (recommended)

With workload selection, you can enable and disable tracing for specific applications. [See configuration details here](#advanced-options).

#### Using the Datadog Admission Controller

As an alternative, or for a version of the agent that does not support workload selection, you can also disable pod mutation by adding a label to your pod.

<div class="alert alert-warning">In addition to disabling SSI, the following steps disable other mutating webhooks. Use with caution.</div>

1. Set the `admission.datadoghq.com/enabled:` label to `"false"` for the pod spec:
   ```yaml
   spec:
     template:
       metadata:
         labels:
           admission.datadoghq.com/enabled: "false"
   ```
2. Apply the configuration:
   ```shell
   kubectl apply -f /path/to/your/deployment.yaml
   ```
3. Restart the services you want to remove instrumentation for.

{{% /tab %}}
{{< /tabs >}}

### Removing APM for all services on the infrastructure

To stop producing traces, uninstall APM and restart the infrastructure:

{{< tabs >}}
{{% tab "Linux host or VM" %}}

1. Run:
   ```shell
   dd-host-install --uninstall
   ```
2. Restart the services on the host or VM.

{{% /tab %}}

{{% tab "Docker" %}}

1. Run:
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

**Note**: Single Step Instrumentation for Kubernetes is GA for Agent versions 7.64+, and in Preview for Agent versions <=7.63.

The file you need to configure depends on if you enabled Single Step Instrumentation with Datadog Operator or Helm:

{{< collapse-content title="Datadog Operator" level="h4" >}}

1. Set `instrumentation.enabled=false` in `datadog-agent.yaml`:
   ```yaml
   features:
     apm:
       instrumentation:
         enabled: false
   ```

2. Deploy the Datadog Agent with the updated configuration file:
   ```shell
   kubectl apply -f /path/to/your/datadog-agent.yaml
   ```
{{< /collapse-content >}}

{{< collapse-content title="Helm" level="h4" >}}

1. Set `instrumentation.enabled=false` in `datadog-values.yaml`:
   ```yaml
   datadog:
     apm:
       instrumentation:
         enabled: false
   ```

2. Run the following command:
   ```shell
   helm upgrade datadog-agent -f datadog-values.yaml datadog/datadog
   ```
{{< /collapse-content >}}

{{% /tab %}}
{{< /tabs >}}

## Troubleshooting

### Single Step Instrumentation is not taking effect

Single Step Instrumentation automatically disables when it detects [custom instrumentation][7] in your application. If you want to use SSI, you'll need to:

1. Remove any existing custom instrumentation code.
1. Restart your application.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /tracing/metrics/runtime_metrics/
[3]: /tracing/software_catalog/
[4]: /tracing/glossary/#instrumentation
[5]: /containers/cluster_agent/admission_controller/
[6]: /tracing/trace_collection/automatic_instrumentation/single-step-apm/compatibility
[7]: /tracing/trace_collection/custom_instrumentation/
