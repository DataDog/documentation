---
title: Datadog Agent Source
disable_toc: false

further_reading:
  - link: https://www.datadoghq.com/blog/manage-metrics-cost-control-with-observability-pipelines
    tag: Blog
    text: Manage metric volume and tags in your environment with Observability Pipelines

---

Use Observability Pipelines' Datadog Agent source to receive logs from the Datadog Agent. Select and set up this source when you [set up a pipeline][1].

**Note**: If you are using the Datadog Distribution of OpenTelemetry (DDOT) Collector, you must [use the OpenTelemetry source to send logs to Observability Pipelines][4].

## Prerequisites

{{% observability_pipelines/prerequisites/datadog_agent %}}

## Set up the source in the pipeline UI

Optionally, toggle the switch to enable TLS. If you enable TLS, the following certificate and key files are required.
   - `Server Certificate Path`: The path to the certificate file that has been signed by your Certificate Authority (CA) Root File in DER or PEM (X.509) format.
   - `CA Certificate Path`: The path to the certificate file that is your Certificate Authority (CA) Root File in DER or PEM (X.509) format.
   - `Private Key Path`: The path to the `.key` private key file that belongs to your Server Certificate Path in DER or PEM (PKCS#8) format.

**Note**: All file paths are made relative to the configuration data directory, which is `/var/lib/observability-pipelines-worker/config/` by default. See [Advanced Worker Configurations][5] for more information. The file must be owned by the `observability-pipelines-worker group` and `observability-pipelines-worker` user, or at least readable by the group or user.

## Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/datadog_agent %}}

## Connect the Datadog Agent to the Observability Pipelines Worker

Use the Agent configuration file or the Agent Helm chart values file to connect the Datadog Agent to the Observability Pipelines Worker.

**Note**: If your Agent is running in a Docker container, you must exclude Observability Pipelines logs using the `DD_CONTAINER_EXCLUDE_LOGS` environment variable. For Helm, use `datadog.containerExcludeLogs`. This prevents duplicate logs, as the Worker also sends its own logs directly to Datadog. See [Docker Log Collection][2] or [Setting environment variables for Helm][3] for more information.

{{< tabs >}}
{{% tab "Agent configuration file" %}}

{{% observability_pipelines/log_source_configuration/datadog_agent %}}

{{% /tab %}}
{{% tab "Agent Helm values file" %}}

{{% observability_pipelines/log_source_configuration/datadog_agent_kubernetes %}}

{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /observability_pipelines/configuration/set_up_pipelines/
[2]: /containers/docker/log/?tab=containerinstallation#linux
[3]: /containers/guide/container-discovery-management/?tab=helm#setting-environment-variables
[4]: /observability_pipelines/sources/opentelemetry/#send-logs-from-the-datadog-distribution-of-opentelemetry-collector-to-observability-pipelines
[5]: /observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/