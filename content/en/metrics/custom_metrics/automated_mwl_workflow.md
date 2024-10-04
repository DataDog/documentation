---
title: Dynamic Quotas for Metrics
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

As your business scales, managing observability costs could become unruly quickly. Effective custom metrics governance should increase monitoring efficiency rather than cut visibility entirely. And it should not be a time-consuming, cumbersome process to protect your organization from unintentional billing overages. 

By following Datadog's [Best Practices Guide for Custom Metrics Governance](https://docs.datadoghq.com/metrics/guide/custom_metrics_governance/#monitoring-and-prevention), you can monitor spikes in your custom metrics volumes. With **Datadog's Dynamic Metrics Quotas**, you now additionally have automatic spike remediation -- reducing unintentional metrics usage and thereby reduce costs.

Dynamic Metric Quotas, powered by [Datadog Workflows](https://www.datadoghq.com/product/workflow-automation/), allow you to define a quota / threshold of custom metrics at an account, team or metric name level through a metric monitor on your estimated custom metric usage metrics. If your usage exceeds your threshold of choice, causing the metric monitor to alert, Datadog identifies the culprit, spiking metrics and asks you via Slack notificatinon whether you give us permission to automatically apply Metrics without Limits configurations to reduce the usage and costs of these metrics on your behalf. Datadog's Intelligent query insights provide us a list of the actively queried tags that we use to configure problematic metrics such that you are guaranteed the most cost-optimized configuration that doesn't sacrifice visibility. Dynamic metric quotas help protect your organization from unintentional cardinality and budget overages and relieves your teams from having to play whack-a-mole to remediate metric volume spikes.
   - Avoid API rate limits that might be encountered when programmatically configuring metrics using public APIs

## Setup

### Prerequisites

1. A metric monitor scoped to [estimated custom metric usage metrics][6]
   - The monitor must be configured with a [threshold alert][7] as well as [multi alert][2]
2. A Datadog account with [Workflow Automation][3] enabled
3. The Datadog [Slack integration][5] installed

### Configure blueprint

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
