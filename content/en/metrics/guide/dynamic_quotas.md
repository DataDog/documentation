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

## Setup

### Prerequisites

1. A Datadog account with [Workflow Automation][3] enabled
2. The Datadog [Slack integration][5] installed

### Configure blueprint

#### How to build a per-metric quota

1. Open this [workflow blueprint][8], and click "Create from Blueprint"
2. Click on the green Monitor tile, and enable the "Automatic triggering" toggle. Also copy the **Mention handle** for this workflow -- you'll use this in Step 5 below
3. Create a [metric monitor][9]. In the **Define the metric** step, select ```datadog.estimated_usage.metrics.custom.by_metric``` as your metric name and choose the ```SUM BY``` space aggregator (recommendd monitor type - Threshold Alert, but you can also use Change or Anomaly Detection)
4. Under ***Set alert conditions***, define your quota threshold number

{{< img src="/metrics/guide/dynamic_quotas/automated_mwl_workflow_monitor.png" alt="The Make a decision tiles on the Datadog automated Metrics without Limits™ workflow blueprint" style="width:100%;" >}}

5. Under ***Configure notifications & automations***, you'll update the monitor notification message and include the Workflow handle from Step 2) above
6. Select "Multi Alert" to send a notification for each culprit metric.
7. Click ***Create*** to create the metric monitor
8. Head back into the Workflow blueprint and click on the tiles titled ***Make a decision*** and ***Make a decision 1***. 

{{< img src="/metrics/guide/dynamic_quotas/slack_decisions_1.png" alt="The Make a decision tiles on the Datadog automated Metrics without Limits™ workflow blueprint" style="width:100%;" >}}

You'll be asked to choose the Slack workspace and either a Slack channel or specific user who will be notified when the monitor alerts. These are the users who will be asked to give Datadog permission to automatically reduce your metrics costs on your behalf

9. For the ***Send message*** and ***Send message 1*** tiles, you'll also need to select the Slack workspace. You'll also be asked whether you want to notify a channel or specific user after Datadog has made the cost saving configurations on your behalf

{{< img src="/metrics/guide/dynamic_quotas/slack_decisions_2.png" alt="The Send message tiles on the Datadog automated Metrics without Limits™ workflow blueprint" style="width:100%;" >}}

10. Click ***Save***.
11. Click ***Publish*** and ***Run*** to start automatically managing your custom metrics costs. 


#### Configure Slack notifications

The workflow blueprint contains several Slack integration tiles that need to be updated.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /metrics/metrics-without-limits/
[2]: /monitors/configuration/#multi-alert
[3]: /service_management/workflows/
[4]: https://app.datadoghq.com/workflow/blueprints/manage-metrics-without-limits-suggested-tags
[5]: /integrations/slack/
[6]: /account_management/billing/usage_metrics/
[7]: /monitors/configuration/?tab=thresholdalert#set-alert-conditions
[8]: https://app.datadoghq.com/workflow/blueprints/manage-metrics-without-limits-suggested-tags
[9]: https://app.datadoghq.com/monitors/create/metric