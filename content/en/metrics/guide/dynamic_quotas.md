---
title: Dynamic Metric Quotas
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

{{< callout url="#" btn_hidden="true" header="Join the Preview!" >}}
  This feature is currently in Preview.
{{< /callout >}} 

As your business scales, managing observability costs could become unruly quickly. Effective custom metrics governance should increase monitoring efficiency rather than cut visibility entirely. And it should not be a time-consuming, cumbersome process to protect your organization from unintentional billing overages. As mentioned in Datadog's [Best Practices Guide for Custom Metrics Governance](https://docs.datadoghq.com/metrics/guide/custom_metrics_governance/#monitoring-and-prevention), you can easily monitor spikes in your custom metrics volumes. 

With **Datadog's Dynamic Metrics Quotas**, you now additionally have automatic spike remediation -- reducing unintentional metrics usage and custom metrics costs.

Dynamic Metric Quotas, powered by [Datadog Workflows](https://www.datadoghq.com/product/workflow-automation/), allow you to define a custom metrics quota at an account level (or team/metric name level) via a metric monitor on your estimated custom metric usage metrics.

If your monitor alerts, Datadog identifies the culprit, spiking metrics and asks permission via Slack to automatically apply Metrics without Limits configurations to these metrics; reducing the usage and costs of these metrics on your behalf. 

Datadog’s Intelligent Query Insights provide us a list of the actively queried tags that we use to configure problematic metrics such that you are guaranteed the most cost-optimized configuration that doesn’t sacrifice visibility. Dynamic Metric Quotas help protect your organization from unintentional cardinality and budget overages and relieves your teams from having to play whack-a-mole to remediate metric volume spikes. Learn more about using Datadog's Estimated Usage Metrics to monitor your metric volume usage [here][10]

## Setup

### Prerequisites

1. A Datadog account with [Workflow Automation][3] enabled
2. The Datadog [Slack integration][5] installed

### Configure blueprint

#### How to build a per-metric quota

{{< img src="/metrics/guide/dynamic_quotas/automated_mwl_workflow_monitor.png" alt="The Make a decision tiles on the Datadog automated Metrics without Limits™ workflow blueprint" style="width:100%;" >}}

1. Open this [workflow blueprint][8], and click "Create from Blueprint".
2. Click on the green Monitor tile, and enable the "Automatic triggering" toggle. Also copy the **Mention handle** for this workflow -- you'll use this in Step 5 below.
3. Create a [metric monitor][9]. In the **Define the metric** step, select ```datadog.estimated_usage.metrics.custom.by_metric``` as your metric name and choose the ```SUM BY``` space aggregator (recommendd monitor type - Threshold Alert, but you can also use Change or Anomaly Detection).
4. Under ***Set alert conditions***, define your quota threshold number.
5. Under ***Configure notifications & automations***, you'll update the monitor notification message and include the Workflow handle from Step 2) above.
6. Select "Multi Alert" to send a notification for each culprit metric.
7. Click ***Create*** to create the metric monitor.
8. Click ***Save***.
9. Click ***Publish*** and ***Run*** to start automatically managing your custom metrics costs. 


#### Configure Slack notifications

The workflow blueprint contains several Slack integration tiles that need to be updated. Input the Slack channel or specific user(s) responsible for granting permission to Datadog to configure these metrics to reduce costs on your behalf.

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
[10]: https://docs.datadoghq.com/account_management/billing/usage_metrics/
