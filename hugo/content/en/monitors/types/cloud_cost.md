---
title: Cloud Cost Monitor
description: 'Monitor cost changes, thresholds, forecasts, and anomalies in your cloud costs, including real-time AI cost increases.'
further_reading:
    - link: https://www.datadoghq.com/blog/cloud-cost-management-oci
      tag: Blog
      text: Manage and optimize your OCI costs with Datadog Cloud Cost Management
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
    - link: 'https://www.datadoghq.com/blog/ccm-cost-monitors/'
      tag: 'Blog'
      text: 'React quickly to cost overruns with Cost Monitors for Datadog Cloud Cost Management'
    - link: 'https://www.datadoghq.com/blog/google-cloud-cost-management/'
      tag: 'Blog'
      text: 'Empower engineers to take ownership of Google Cloud costs with Datadog'
---

## Overview

Cloud Cost Monitors help you proactively identify cost changes, and understand if you're projected to go over budget, so you can investigate the cause.

-   Instantly view all your cost monitors and filter or search by team, service, tag, provider, or alert status.
-   See a summary of how many monitors are set up, which are alerting, and what areas of cloud spend are tracked.
-   Create new cost monitors using templates and take action on monitors that need attention.

In order to configure Cloud Cost monitors, you need to have [Cloud Cost Management][1] set up.

Finalized Cloud Cost monitors use a 30-minute evaluation frequency and a 48-hour delayed evaluation window, since billing data may not be available until 48 hours after usage. For example, a 7-day lookback evaluated on January 15 examines cost data from January 6 to January 13.

[Real-time AI anomaly monitors](#real-time-ai-cost-anomalies) do not use this delay. They evaluate estimated AI cost from [Agent Observability][102] and alert within 15 minutes.

## Create a monitor

To create a Cloud Cost monitor in Datadog, navigate to [{{< ui >}}Cloud Cost > Analyze > Cost Monitors{{< /ui >}}][4] and click {{< ui >}}\+ New Cost Monitor{{< /ui >}}.

Alternatively, you can set one up from [{{< ui >}}Monitors{{< /ui >}} > {{< ui >}}New Monitor{{< /ui >}} > {{< ui >}}Cloud Cost{{< /ui >}}][3], the main navigation, the [Cloud Cost Explorer][5], or through [Terraform][2].

{{< img src="/monitors/monitor_types/cloud_cost/cost-monitors-create-new.png" alt="The Create Monitor button on the Cost Monitor page" style="width:100%;" >}}

### Select a cost monitor type

You can select from the following monitor types:

| Monitor Type | Cost Metric-based | Purpose                                                                                                                                                                                                                                                   | Example                                                                                            |
| ------------ | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Changes      | Yes               | Detect daily, weekly, or monthly cost changes.                                                                                                                                                                                                            | Alert when the difference between today's cost and the week before is over 5%.                     |
| Anomalies    | Yes               | Identify unusual or unexpected cost patterns. <br> <br> Finalized monitors exclude incomplete days and require at least 1 month of cloud cost data, because historical data is required to train the algorithm. [Real-time AI anomaly monitors](#real-time-ai-cost-anomalies) alert on estimated AI cost within 15 minutes. | Alert if 3 days from the past 30 days show significant cost anomalies compared to historical data, or alert within 15 minutes when AI cost increases unexpectedly. |
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

These conditions apply when {{< ui >}}Alert on{{< /ui >}} is {{< ui >}}finalized{{< /ui >}}. To alert on estimated AI cost within 15 minutes, see [Real-time AI cost anomalies](#real-time-ai-cost-anomalies).

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

## Real-time AI cost anomalies

Real-time AI anomaly monitors detect unexpected increases in AI cost and alert within 15 minutes. They use estimated cost from [Agent Observability][102], not finalized cloud billing data. Datadog identifies anomalies from a rolling 4-hour evaluation window of estimated cost.

The {{< ui >}}real time{{< /ui >}} option is available after the [`ml_obs.span.llm.total.cost`][104] metric has reported.

### Prerequisites

- [Agent Observability][102] is sending LLM cost data. Estimated cost is calculated from token counts and provider pricing. See [Agent Observability costs][103].
- At least 3 days of cost data. 21 days is recommended for detection quality.

### Create a real-time AI anomaly monitor

1. Navigate to [{{< ui >}}Cloud Cost{{< /ui >}} > {{< ui >}}Analyze{{< /ui >}} > {{< ui >}}Cost Monitors{{< /ui >}}][4] and click {{< ui >}}\+ New Cost Monitor{{< /ui >}}.
2. Select {{< ui >}}Anomalies{{< /ui >}}.
3. Set {{< ui >}}Alert on{{< /ui >}} to {{< ui >}}real time{{< /ui >}} and the cost type to {{< ui >}}AI cost{{< /ui >}}. The monitor alerts on anomalies detected within the last 15 minutes.
4. Optionally, use {{< ui >}}Filter cost to{{< /ui >}} to scope the cost, and {{< ui >}}Detect anomalies on{{< /ui >}} to group by up to 2 tags. `ml_app` and `model_provider` are listed under {{< ui >}}Preferred Tags{{< /ui >}}.
5. Set the amount the total cost is likely to exceed over the next 24 hours. The minimum value is 100 in your organization's currency. The monitor alerts when Datadog detects an anomaly and this condition is met.
6. [Configure notifications][6].

To monitor finalized cloud billing data instead, set {{< ui >}}Alert on{{< /ui >}} to {{< ui >}}finalized{{< /ui >}}. Finalized anomaly monitors use the agile anomaly algorithm, exclude incomplete days, and require at least 1 month of cloud cost history.

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
