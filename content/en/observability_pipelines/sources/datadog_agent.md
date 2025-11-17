---
title: Datadog Agent Source
disable_toc: false
---

Use Observability Pipelines' Datadog Agent source to receive logs from the Datadog Agent. Select and set up this source when you [set up a pipeline][1].

**Note**: If you are using the Datadog Distribution of OpenTelemetry (DDOT) Collector, you must [use the OpenTelemetry source to send logs to Observability Pipelines][4].

## Prerequisites

{{% observability_pipelines/prerequisites/datadog_agent %}}

## Set up the source in the pipeline UI

{{% observability_pipelines/source_settings/datadog_agent %}}

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

[1]: /observability_pipelines/configuration/set_up_pipelines/
[2]: /containers/docker/log/?tab=containerinstallation#linux
[3]: /containers/guide/container-discovery-management/?tab=helm#setting-environment-variables
[4]: /observability_pipelines/sources/opentelemetry/#send-logs-from-the-datadog-distribution-of-opentelemetry-collector-to-observability-pipelines