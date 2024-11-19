---
title: Datadog Agent Source
disable_toc: false
---

Use Observability Pipelines' Datadog Agent source to receive logs from the Datadog Agent. Select and set up this source when you [set up a pipeline][1].

## Prerequisites

{{% observability_pipelines/prerequisites/datadog_agent %}}

## Set up the source in the pipeline UI

{{% observability_pipelines/source_settings/datadog_agent %}}

## Connect the Datadog Agent to the Observability Pipelines Worker

Use the Agent configuration file or the Agent Helm chart values file to connect the Datadog Agent to the Observability Pipelines Worker.

{{< tabs >}}
{{% tab "Agent configuration file" %}}

{{% observability_pipelines/log_source_configuration/datadog_agent %}}

{{% /tab %}}
{{% tab "Agent Helm values file" %}}

{{% observability_pipelines/log_source_configuration/datadog_agent_kubernetes %}}

{{% /tab %}}
{{< /tabs >}}

[1]: /observability_pipelines/set_up_pipelines/