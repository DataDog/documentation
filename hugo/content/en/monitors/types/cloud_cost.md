---
title: Cloud Cost Monitor
description: 'Monitor cost changes, thresholds, forecasts, and anomalies in your cloud costs, including real-time AI cost increases.'
further_reading:
    - link: 'https://docs.datadoghq.com/cloud_cost_management/?tab=aws#overview'
      tag: 'Documentation'
      text: 'Cloud Cost Management'
    - link: '/monitors/notify/'
      tag: 'Documentation'
      text: 'Configure your monitor notifications'
    - link: '/monitors/downtimes/'
      tag: 'Documentation'
      text: 'Schedule a downtime to mute a monitor'
    - link: '/monitors/status/'
      tag: 'Documentation'
      text: 'Consult your monitor status'
    - link: https://www.datadoghq.com/blog/cloud-cost-management-oci
      tag: Blog
      text: Manage and optimize your OCI costs with Datadog Cloud Cost Management
    - link: 'https://www.datadoghq.com/blog/ccm-cost-monitors/'
      tag: 'Blog'
      text: 'React quickly to cost overruns with Cost Monitors for Datadog Cloud Cost Management'
    - link: 'https://www.datadoghq.com/blog/google-cloud-cost-management/'
      tag: 'Blog'
      text: 'Empower engineers to take ownership of Google Cloud costs with Datadog'
    - link: "https://www.datadoghq.com/blog/how-kubernetes-dra-can-improve-gpu-utilization-and-cut-costs/"
      tag: "Blog"
      text: "How Kubernetes DRA can improve GPU utilization and cut costs"
---

## Overview

Cloud Cost Monitors help you proactively identify cost changes, and understand if you're projected to go over budget, so you can investigate the cause.

-   Instantly view all your cost monitors and filter or search by team, service, tag, provider, or alert status.
-   See a summary of how many monitors are set up, which are alerting, and what areas of cloud spend are tracked.
-   Create new cost monitors using templates and take action on monitors that need attention.

In order to configure Cloud Cost monitors, you need to have [Cloud Cost Management][1] set up.

Choose the setup that matches the cost data you want to alert on:

-   [Create a monitor](#create-a-monitor) for changes, thresholds, forecasts, budgets, and finalized cost anomalies. These monitors use finalized billing data, a 30-minute evaluation frequency, and a 48-hour delayed evaluation window, since billing data may not be available until 48 hours after usage. For example, a 7-day lookback evaluated on January 15 examines cost data from January 6 to January 13.
-   [Create a real-time anomaly monitor](#create-a-real-time-anomaly-monitor) to alert within 15 minutes when estimated AI cost (from [Agent Observability][102]) or estimated cloud compute cost (from [Real-Time Costs][105]) increases unexpectedly.

## Create a monitor

This procedure covers Cloud Cost monitors that use finalized billing data: changes, thresholds, forecasts, budgets, and finalized anomaly monitors. To alert on estimated AI or cloud compute cost within 15 minutes, see [Create a real-time anomaly monitor](#create-a-real-time-anomaly-monitor).

To create a Cloud Cost monitor in Datadog, navigate to [{{< ui >}}Cloud Cost > Analyze > Cost Monitors{{< /ui >}}][4] and click {{< ui >}}\+ New Cost Monitor{{< /ui >}}.

Alternatively, you can set one up from [{{< ui >}}Monitors{{< /ui >}} > {{< ui >}}New Monitor{{< /ui >}} > {{< ui >}}Cloud Cost{{< /ui >}}][3], the main navigation, the [Cloud Cost Explorer][5], or through [Terraform][2].

{{< img src="/monitors/monitor_types/cloud_cost/cost-monitors-create-new.png" alt="The Create Monitor button on the Cost Monitor page" style="width:100%;" >}}

### Select a cost monitor type

You can select from the following monitor types:

| Monitor Type | Cost Metric-based | Purpose                                                                                                                                                                                                                                                   | Example                                                                                            |
| ------------ | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Changes      | Yes               | Detect daily, weekly, or monthly cost changes.                                                                                                                                                                                                            | Alert when the difference between today's cost and the week before is over 5%.                     |
| Anomalies    | Yes               | Identify unusual or unexpected cost patterns. <br> <br> Finalized monitors exclude incomplete days and require at least 1 month of cloud cost data, because historical data is required to train the algorithm. [Real-time anomaly monitors](#create-a-real-time-anomaly-monitor) alert on estimated AI or cloud compute cost within 15 minutes. | Alert if 3 days from the past 30 days show significant cost anomalies compared to historical data, or alert within 15 minutes when AI or cloud compute cost increases unexpectedly. |
| Threshold    | Yes               | Alert when costs exceed a set value.                                                                                                                                                                                                                      | Set alerts when today's total cost exceeds $10,000.                                                |
| Forecast     | Yes               | Alert if forecasted costs exceeds a threshold.                                                                                                                                                                                                            | Alert daily if the forecasted cost for this month is projected to exceed $500.                     |
| Budget       | No                | Alert if actual or [forecasted][8] costs exceed your [budget][7].                                                                                                                                                                                         | Alert if the forecasted month cost is projected to exceed 90% of the assigned $10,000 budget.      |

### Specify which cost to track

{{< tabs >}}
{{% tab "Cost metric-based" %}}

Any cost type or metric reporting to Datadog is available for monitors. You can use custom metrics or observability metrics alongside a cost metric to monitor unit economics.

| Step                     | Required | Default           | Example                 |
| ------------------------ | -------- | ----------------- | ----------------------- |
| Select the cost metric   | Yes      | All providers     | `azure.cost.actual`     |
| Define the `filter by`   | No       | Nothing           | `aws_product:s3`        |
| Group by                 | No       | Nothing           | `aws_availability_zone` |
| Add observability metric | No       | `system.cpu.user` | `aws.s3.all_requests`   |

Use the editor to define the cost types or exports.

{{< img src="monitors/monitor_types/cloud_cost/cost-monitors-specify-cost.png" alt="Cloud Cost and Metrics data source options for specifying which costs to track" style="width:100%;" >}}

{{% /tab %}}
{{% tab "Budget-based" %}}

Select an existing budget to monitor from the dropdown.

{{< img src="monitors/monitor_types/cloud_cost/budget-monitor-select-budget.png" alt="Dropdown for specifying which budget to track cost against" style="width:100%;" >}}

{{% /tab %}}
{{< /tabs >}}

For more information, see the [Cloud Cost Management documentation][1].

### Set alert conditions

{{< tabs >}}
{{% tab "Changes" %}}

If you are using the {{< ui >}}Cost Changes{{< /ui >}} monitor type, you can trigger an alert when the cost `increases` or `decreases` more than the defined threshold. The threshold can be set to either a {{< ui >}}Percentage Change{{< /ui >}} or set to {{< ui >}}Dollar Amount{{< /ui >}}.

If you are using the {{< ui >}}Percentage Change{{< /ui >}}, you can filter out changes that are below a certain dollar threshold. For example, the monitor alerts when there is a cost change above 5% for any change that is above $500.

{{% /tab %}}

{{% tab "Anomalies" %}}

These conditions apply when {{< ui >}}Alert on{{< /ui >}} is {{< ui >}}finalized{{< /ui >}}. To alert on estimated AI or cloud compute cost within 15 minutes, see [Create a real-time anomaly monitor](#create-a-real-time-anomaly-monitor).

For the {{< ui >}}Cost Anomalies{{< /ui >}} monitor type, you can trigger an alert if the observed cost is `above`, `below`, or `above or below` a threshold compared to historical data.

The `agile` [anomaly algorithm][101] is used with two bounds and monthly seasonality.

[101]: /dashboards/functions/algorithms/

{{% /tab %}}

{{% tab "Threshold" %}}

If you are using the {{< ui >}}Cost Threshold{{< /ui >}} monitor type, you can trigger an alert when the cloud cost is `above`, `below`, `above or equal`, or `below or equal to` a threshold.

{{% /tab %}}
{{% tab "Forecast" %}}

If you are using the {{< ui >}}Cost Forecast{{< /ui >}} monitor type, you can trigger an alert when the cloud cost is `above`, `below`, `above or equal`, `below or equal to`, `equal to`, or `not equal to` a threshold.

{{% /tab %}}

{{% tab "Budget" %}}
If you are using the {{< ui >}}Budget{{< /ui >}} monitor type, you can trigger an alert when the actual or the forecasted cloud cost exceeds a percentage of the budget you selected in the previous step.

| Step             | Purpose                                                                           | Values                            |
| ---------------- | --------------------------------------------------------------------------------- | --------------------------------- |
| Evaluation basis | Whether the monitor compares actual spend or forecasted spend against the budget. | `actual`, `forecasted`            |
| Granularity      | Level of detail at which the cost is evaluated.                                   | `overall` (total cost), `per_row` |
| Threshold        | Percentage of budget that is utilized to trigger the alert.                       | Number between 0 and 100 (%)      |
| Timeframe        | Evaluation window used to assess if the threshold is breached.                    | `all_months`, `current_month`     |

When you select {{< ui >}}is forecasted to reach{{< /ui >}}, the monitor uses the same [forecasting model][8] as budget cards and the budget status page.

[8]: /cloud_cost_management/planning/forecasting/
{{% /tab %}}
{{< /tabs >}}

<br>

### Configure notifications and automations

For detailed instructions on the {{< ui >}}Configure notifications and automations{{< /ui >}} section, see the [Notifications][6] page.

### Define permissions and audit notifications

Choose which teams, roles, users, or service accounts are allowed to **view** or **edit** the monitor. By default, all members of your organization have access.

You can also turn on {{< ui >}}Audit Notifications{{< /ui >}} to alert the monitor creator and recipients whenever the monitor is changed.

<a id="create-a-real-time-ai-anomaly-monitor"></a>

## Create a real-time anomaly monitor

Real-time anomaly monitors detect unexpected increases in estimated cost and alert within 15 minutes, before the cost appears in your billing data. Datadog identifies anomalies from a rolling 8-hour evaluation window of estimated cost.

Real-time anomaly monitors support two cost types:

| Cost type | Providers | Estimated cost source |
|---|---|---|
| {{< ui >}}AI cost{{< /ui >}} | OpenAI, Anthropic, Amazon Bedrock, Gemini, Vertex AI | [Agent Observability][102] ([`ml_obs.span.llm.total.cost`][104]) |
| {{< ui >}}Cloud / SaaS cost{{< /ui >}} | AWS (Amazon EC2), Azure (Virtual Machines), Google Cloud (Compute Engine) | [Real-Time Costs][105] (`aws.cost.net.amortized.realtime.estimated`, `azure.cost.amortized.realtime.estimated`, `gcp.cost.amortized.realtime.estimated`) |

To set up real-time anomaly notifications for your whole organization from a single form, see [Real-time anomaly notifications][106]. Use a monitor for a custom notification message or more than one configuration per provider.

### Prerequisites

Real-time anomaly monitors require:

- Estimated cost data for the cost type you want to monitor:
  - **AI cost**: [Agent Observability][102] is sending LLM cost data. Datadog estimates cost from token counts and provider pricing. See [Agent Observability costs][103].
  - **Cloud compute cost**: [Real-Time Costs][105] are set up for the provider, including the Datadog Agent on your instances. See the [Real-Time Costs requirements][107].
- The real-time metric for the provider has reported. The {{< ui >}}real time{{< /ui >}} option appears after any real-time metric reports, and each cloud provider appears in the {{< ui >}}Scope to{{< /ui >}} list after its own metric reports.
- At least 3 days of cost data. Datadog recommends 21 days for better detection quality.

### Configure the monitor

1. Navigate to [{{< ui >}}Cloud Cost{{< /ui >}} > {{< ui >}}Analyze{{< /ui >}} > {{< ui >}}Cost Monitors{{< /ui >}}][4] and click {{< ui >}}\+ New Cost Monitor{{< /ui >}}.
2. Select {{< ui >}}Cost Anomalies{{< /ui >}}.
3. Set {{< ui >}}Alert on{{< /ui >}} to {{< ui >}}real time{{< /ui >}}, then select the cost type: {{< ui >}}AI cost{{< /ui >}} or {{< ui >}}Cloud / SaaS cost{{< /ui >}}.
4. Choose what to scope the monitor to:
   - For {{< ui >}}AI cost{{< /ui >}}, optionally select {{< ui >}}Providers{{< /ui >}}. By default, the monitor covers all AI providers, including any that your organization starts using later.
   - For {{< ui >}}Cloud / SaaS cost{{< /ui >}}, select the provider in {{< ui >}}Scope to{{< /ui >}}: AWS, Azure, or Google Cloud.
5. Optionally, use {{< ui >}}Filter cost to{{< /ui >}} to scope the cost, and {{< ui >}}Detect anomalies on{{< /ui >}} to group by up to two tags.
6. Set the minimum cost impact. The monitor alerts only when Datadog detects an anomaly and the anomaly cost over the next 24 hours is likely to exceed the higher of:
   - An amount in your organization's currency: a whole number greater than 0 (default: 500)
   - A percentage of the baseline cost: 0-100% (default: 5%)
7. [Configure notifications][6].

To monitor finalized cloud billing data instead, set {{< ui >}}Alert on{{< /ui >}} to {{< ui >}}finalized{{< /ui >}} and follow [Create a monitor](#create-a-monitor). Finalized anomaly monitors use the agile anomaly algorithm, exclude incomplete days, and require at least 1 month of cloud cost history.

## Other actions you can take

{{< img src="/monitors/monitor_types/cloud_cost/cost-monitors-other-actions.png" alt="The actions menu open with options to view the monitor in the Cloud Cost Explorer, as well as options to edit, clone, and delete the monitor." style="width:100%;" >}}

-   {{< ui >}}View in Monitors{{< /ui >}} to see your monitor's alert history, adjust visualizations, and review how often it has triggered alerts.
-   {{< ui >}}View in Explorer{{< /ui >}} to open the monitor in the Cloud Cost Explorer for deeper analysis.
-   {{< ui >}}Edit{{< /ui >}} a monitor to update the monitor's settings or configuration.
-   {{< ui >}}Clone{{< /ui >}} a monitor to create a copy of an existing monitor by choosing {{< ui >}}Actions{{< /ui >}} > {{< ui >}}Clone{{< /ui >}}.
-   {{< ui >}}Delete{{< /ui >}} a monitor to permanently remove a monitor you no longer need.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /cloud_cost_management/
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/monitor
[3]: https://app.datadoghq.com/monitors/create/cost
[4]: https://app.datadoghq.com/cost/analyze/monitors
[5]: https://app.datadoghq.com/cost/explorer
[6]: /monitors/notify/
[7]: /cloud_cost_management/planning/budgets/
[8]: /cloud_cost_management/planning/forecasting/
[102]: /llm_observability/
[103]: /llm_observability/investigate/cost/
[104]: /llm_observability/investigate/metrics/
[105]: /cloud_cost_management/cost_changes/real_time_costs/
[106]: /cloud_cost_management/cost_changes/anomalies/#real-time-anomaly-notifications
[107]: /cloud_cost_management/cost_changes/real_time_costs/#requirements
