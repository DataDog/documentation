---
title: Dynamic Metrics without Limits™ Workflow Automation
further_reading:
- link: "/account_management/billing/custom_metrics/?tab=countrate"
  tag: "Documentation"
  text: "Custom Metrics Billing"
- link: "/metrics/guide/custom_metrics_governance/"
  tag: "Guide"
  text: "Best Practice for Custom Metric Governance"
- link: "https://www.datadoghq.com/blog/metrics-without-limits/"
  tag: "Blog"
  text: "Dynamically control your custom metrics volume with Metrics without Limits™"
algolia:
  tags: ['custom metrics']
is_beta: true
private: true
---

## Overview

{{< callout url="#" btn_hidden="true">}}
  This feature is currently in Preview.
{{< /callout >}} 

[Metrics without Limits™][1] enables flexibility and control over your custom metric ingestion and indexing. However, manual configuration of custom metrics becomes unscalable as your custom metrics usage grows to hundreds of millions of metrics. 

Datadog provides an Automated Metrics without Limits™ Workflow (also known as dynamic quotas), which automatically configures your spiking metrics with their actively queried tags and aggregations. This workflow runs when a metric monitor alerts on your estimated custom metric usage data, sending a message to a Slack channel that you designate. The message prompts you to give permission for Metrics without Limits™ to configure any spiking metric names with suggested tags and aggregations on your behalf. This helps you to:
   - Proactively reduce the cost of your custom metrics
   - Save time and engineering resources on managing your custom metrics and infrastructure budget
   - Avoid API rate limits that might be encountered when programmatically configuring metrics using public APIs

## Setup

### Prerequisites

1. A metric monitor scoped to [estimated custom metric usage metrics][6]
   - The monitor must be configured with a [threshold alert][7] as well as [multi alert][2]
2. A Datadog account with [Workflow Automation][3] enabled
3. The Datadog [Slack integration][5] installed

### Configure blueprint

Open the [workflow blueprint][4] and follow the instructions below.

#### Configure Slack notifications

The workflow blueprint contains several Slack integration tiles that need to be updated.

1. For the **Make a decision** and **Make a decision 1** tiles:
   - Select a Slack workspace
   - Select a channel or user to be prompted when the monitor alerts

{{< img src="/metrics/custom_metrics/automated_mwl_workflow/slack_decisions_1.png" alt="The Make a decision tiles on the Datadog automated Metrics without Limits™ workflow blueprint" style="width:100%;" >}}

2. For the **Send message** and **Send message 1** tiles:
   - Select a Slack workspace
   - Select a channel or user to receive a result message at the conclusion of the workflow

{{< img src="/metrics/custom_metrics/automated_mwl_workflow/slack_decisions_2.png" alt="The Send message tiles on the Datadog automated Metrics without Limits™ workflow blueprint" style="width:100%;" >}}

3. Click **Save**.
4. Click **Publish**.

### Configure monitor notifications

1. Click the **Monitor** tile at the beginning of the workflow.
2. Copy the **Mention handle** from the side panel that opens on the right.
3. Add the handle to the **Configure notifications & automations** section of your metric monitor.

{{< img src="/metrics/custom_metrics/automated_mwl_workflow/monitor_notification.png" alt="The Configure notifications & automations section of a monitor with the workflow handle added to the is_alert conditional variable" style="width:100%;" >}}

4. Click **Save**.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /metrics/metrics-without-limits/
[2]: /monitors/configuration/#multi-alert
[3]: /service_management/workflows/
[4]: https://app.datadoghq.com/workflow/blueprints/manage-metrics-without-limits-suggested-tags
[5]: /integrations/slack/
[6]: /account_management/billing/usage_metrics/
[7]: /monitors/configuration/?tab=thresholdalert#set-alert-conditions
