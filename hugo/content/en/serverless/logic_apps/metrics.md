---
title: Azure Logic Apps metrics
description: Reference for the enhanced metrics that Datadog generates for Azure Logic Apps workflows, including run-level and action-level metrics.
further_reading:
  - link: "/serverless/logic_apps/installation"
    tag: "Documentation"
    text: "Install Serverless Monitoring for Azure Logic Apps"
  - link: "/serverless/logic_apps/troubleshooting"
    tag: "Documentation"
    text: "Troubleshoot Serverless Monitoring for Azure Logic Apps"
---

{{< callout url="https://www.datadoghq.com/product-preview/serverless-monitoring-for-azure-logic-apps/"
 btn_hidden="false" header="Join the Preview!">}}
Serverless Monitoring for Azure Logic Apps, including the enhanced metrics described on this page, is in Preview. Complete the form to request access.
{{< /callout >}}

This page describes the metrics available for monitoring Azure Logic Apps workflows with Datadog. There are two ways to get metrics from Azure Logic Apps:

- You can get Azure Logic Apps metrics from the [Datadog Azure integration][1].
- You can get [enhanced metrics](#enhanced-azure-logic-apps-metrics) by [installing Serverless Monitoring for Azure Logic Apps][2].

## Enhanced Azure Logic Apps metrics

Datadog generates enhanced metrics for Azure Logic Apps from your workflow execution data, with detailed metadata for each run and action. Enhanced metrics are distinguished by being in the `azure.logic_workflows.enhanced.*` namespace.

Enhanced metrics are tagged with the workflow `run_id` along with the standard Azure Logic Apps tags, including `service` and `env`. See [Install Serverless Monitoring for Azure Logic Apps][2] for how to configure these tags.

### Run-level metrics

The following metrics are emitted once per workflow run.

`azure.logic_workflows.enhanced.run_started`
: Count of workflow runs that have started.

`azure.logic_workflows.enhanced.run_succeeded`
: Count of workflow runs that completed without errors.

`azure.logic_workflows.enhanced.run_failed`
: Count of workflow runs that completed with errors.

`azure.logic_workflows.enhanced.run_latency`
: Distribution of the end-to-end duration of a workflow run, in milliseconds. Supports percentile aggregations and is emitted alongside `run_succeeded` and `run_failed`.

### Action-level metrics

The following metrics are emitted once per action within a workflow run.

`azure.logic_workflows.enhanced.actions_started`
: Count of workflow actions that have started.

`azure.logic_workflows.enhanced.actions_succeeded`
: Count of workflow actions that completed without errors.

`azure.logic_workflows.enhanced.actions_failed`
: Count of workflow actions that completed with errors.

`azure.logic_workflows.enhanced.action_latency`
: Distribution of the duration of a workflow action, in milliseconds. Supports percentile aggregations and is emitted alongside `actions_succeeded` and `actions_failed`.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/azure/
[2]: /serverless/logic_apps/installation
