
---
title: Agent-Side Filtering for DogStatsD Custom Metrics 
private: true
further_reading:
- link: "/metrics/custom_metrics/"
  tag: "Documentation"
  text: "Learn more about Custom Metrics"
- link: "/account_management/billing/custom_metrics/?tab=countrate"
  tag: "Documentation"
  text: "Custom Metrics Billing"
- link: "/metrics/metrics-without-limits/"
  tag: "Documentation"
  text: "Metrics without Limits™"
- link: "/metrics/volume/"
  tag: "Documentation"
  text: "Metrics Volume Management"
- link: "https://www.datadoghq.com/blog/custom-metrics-governance/"
  tag: "Blog"
  text: "Best practices for end-to-end custom metrics governance"
---

{{< callout url="https://www.datadoghq.com/" d-toggle="modal" d_target="#signupModal" custom_class="sign-up-trigger">}}
  Datadog Apps are in Preview. Request access by using this form. Once approved, you can start getting creative and develop your App for you, your organization, or for publishing to the entire Datadog community alongside our other great Datadog Apps!
{{< /callout >}} 

## Overview

Agent-side filtering enables you to block unused or unwanted DogStatsD custom metrics directly at the Datadog Agent, before sending them to Datadog. This can significantly reduce both indexed and ingested custom metric volume.

Filtering is performed at the Agent level but centrally managed through the Datadog UI, giving teams full visibility and control. You can cigure, update, and manage filtering policies in Datadog, streamlining metric governance while maintaining transparency.

## Creating a filtering policy

There are three ways to create a filtering policy:

{{< tabs >}}
{{% tab "Metric Summary page" %}}

From the [Metrics Summary page][100], select one or more metrics and convert them into a block list:
<Insert video>

[100]: https://app.datadoghq.com/metric/summary

{{% /tab %}}

{{% tab "CSV upload" %}}

Upload a `.csv` file containing a list of metric names:
<Insert video>

{{% /tab %}}

{{% tab "Manual" %}}

Manually choose metric names through the policy settings interface:
<Insert video>

{{% /tab %}}
{{< /tabs >}}

## Editing a filtering policy

You can update an existing policy using any of the following methods:

{{< tabs >}}
{{% tab "Metric Summary page" %}}

From the [Metrics Summary page][200], create a list of metrics to append to the existing policy. To remove metrics, click the `X` icon next to the metric name in the right-hand panel:
<Insert video>

[200]: https://app.datadoghq.com/metric/summary

{{% /tab %}}

{{% tab "CSV upload" %}}

Uploading a new `.csv` file adds those metric names to the existing policy. This method does not support removing metrics:
<Insert video>

{{% /tab %}}

{{% tab "Manual" %}}

From the settings page, add or remove metric names directly within the policy editor:
<Insert video>

{{% /tab %}}
{{< /tabs >}}

## Viewing a policy and list of metric names

To view policies you can either:

**Click on the [settings button][1]**: 

{{< img src="metrics/guide/agent_filtering_for_dogstatsd_custom_metrics/settings_from_summary.png" alt="" caption="The settings button on the metric summary page" style="width:100%;" >}}

**Click on Metrics in the navigation bar** and go straight to settings:
{{< img src="metrics/guide/agent_filtering_for_dogstatsd_custom_metrics/settings_from_nav.png" alt="" caption="The settings option from the expanded Metrics panel in Datadog" style="width:100%;" >}}

## Deleting a policy

To delete a policy:

1. Navigate to the [Policy Settings][1] page.
2. Click on the desired policy.
3. Select **Delete** in the top-right corner of the page.
**Click on Metrics in the navigation bar** and go straight to settings:

{{< img src="metrics/guide/agent_filtering_for_dogstatsd_custom_metrics/delete_policy.png" alt="" caption="The delete policy button on a policy detail view" style="width:100%;" >}}

## Preview limitations

This initial preview release includes the following limitations:

- A maximum of 10,000 metric names can be blocked.
- Resource usage impact on the Agent is limited to up to 10MB RSS. There is no increase in CPU usage.
- Only DogStatsD metrics are supported.
- API-based policy management is expected in a future iteration.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/settings/policies