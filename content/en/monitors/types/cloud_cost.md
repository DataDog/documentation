---
title: Cloud Cost Monitor
description: "Monitor cost changes, thresholds, forecasts, and anomalies in your cloud costs."
further_reading:
- link: https://www.datadoghq.com/blog/cloud-cost-management-oci
  tag: Blog
  text: Manage and optimize your OCI costs with Datadog Cloud Cost Management
- link: "https://docs.datadoghq.com/cloud_cost_management/?tab=aws#overview"
  tag: "Documentation"
  text: "Cloud Cost Management"
- link: "/monitors/notify/"
  tag: "Documentation"
  text: "Configure your monitor notifications"
- link: "/monitors/downtimes/"
  tag: "Documentation"
  text: "Schedule a downtime to mute a monitor"
- link: "/monitors/status/"
  tag: "Documentation"
  text: "Consult your monitor status"
- link: "https://www.datadoghq.com/blog/ccm-cost-monitors/"
  tag: "Blog"
  text: "React quickly to cost overruns with Cost Monitors for Datadog Cloud Cost Management"
- link: "https://www.datadoghq.com/blog/google-cloud-cost-management/"
  tag: "Blog"
  text: "Empower engineers to take ownership of Google Cloud costs with Datadog"
---

## Overview
Cloud Cost Monitors help you proactively identify cost changes, and understand if you're projected to go over budget, so you can investigate the cause.

- Instantly view all your cost monitors and filter or search by team, service, tag, provider, or alert status.
- See a summary of how many monitors are set up, which are alerting, and what areas of cloud spend are tracked.
- Create new cost monitors using templates and take action on monitors that need attention.

In order to configure Cloud Cost monitors, you need to have [Cloud Cost Management][1] set up.

Cloud Cost monitors use a 30-minute evaluation frequency and a 48-hour delayed evaluation window, since cost data may not be available until 48 hours after usage. For example, a 7-day lookback evaluated on January 15 examines cost data from January 6 to January 13.

## Create a monitor

To create a Cloud Cost monitor in Datadog, navigate to [**Cloud Cost > Analyze > Cost Monitors** ][4] and click **+ New Cost Monitor**.

Alternatively, you can set one up from [**Monitors** --> **New Monitor** --> **Cloud Cost**][3], the main navigation, the [Cloud Cost Explorer][5], or through [Terraform][2].

{{< img src="/monitors/monitor_types/cloud_cost/cost-monitors-create-new.png" alt="The Create Monitor button on the Cost Monitor page" style="width:100%;" >}}

### Select a cost monitor type

You can select from the following monitor types:

| Monitor Type | Cost Metric-based | Purpose                                                                                                                                                                                                                                                   | Example |
|--------------|-------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------|
| Changes      | Yes               | Detect daily, weekly, or monthly cost changes.                                                                                                                                                                                                            | Alert when the difference between today's cost and the week before is over 5%.                                                                                                                                                             |
| Anomalies    | Yes               | Identify unusual or unexpected cost patterns. <br> <br> Incomplete days are excluded from analysis to ensure accuracy. Anomaly monitors require at least 1 month of cloud cost data to evaluate since historical data is required to train the algorithm. | Alert if 3 days from the past 30 days show significant cost anomalies compared to historical data. |
| Threshold    | Yes               | Alert when costs exceed a set value.                                                                                                                                                                                                                      | Set alerts when today's total cost exceeds $10,000.                                                                                                                                                                                                       |
| Forecast     | Yes               | Alert if forecasted costs will exceed a threshold.                                                                                                                                                                                                        | Alert daily if the forecasted cost for this month is projected to exceed $500.                                                                                                                                                                            |
| Budget       | No                | Alert if costs exceed your [budget][7].                                                                                                                                                                                                                   | Alert if the total cost for the month exceeds the budget of $10,000.                                                                                                                                                                                      |

### Specify which cost to track

{{< tabs >}}
{{% tab "Cost metric-based" %}}

Any cost type or metric reporting to Datadog is available for monitors. You can use custom metrics or observability metrics alongside a cost metric to monitor unit economics.

| Step                              | Required | Default              | Example             |
|-----------------------------------|----------|----------------------|---------------------|
| Select the cost metric            | Yes      | All providers | `azure.cost.actual` |
| Define the `filter by`            | No       | Nothing           | `aws_product:s3`    |
| Group by                          | No       | Nothing           | `aws_availability_zone` |
| Add observability metric          | No       | `system.cpu.user`    | `aws.s3.all_requests` |

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

If you are using the **Cost Changes** monitor type, you can trigger an alert when the cost `increases` or `decreases` more than the defined threshold. The threshold can be set to either a **Percentage Change** or set to **Dollar Amount**.

If you are using the **Percentage Change**, you can filter out changes that are below a certain dollar threshold. For example, the monitor alerts when there is a cost change above 5% for any change that is above $500.

{{% /tab %}}

{{% tab "Anomalies" %}}

For the **Cost Anomalies** monitor type, you can trigger an alert if the observed cost is `above`, `below`, or `above or below` a threshold compared to historical data.

The `agile` [anomaly algorithm][101] is used with two bounds and monthly seasonality.

[101]: /dashboards/functions/algorithms/
{{% /tab %}}

{{% tab "Threshold" %}}

If you are using the **Cost Threshold** monitor type, you can trigger an alert when the cloud cost is `above`, `below`, `above or equal`, or `below or equal to` a threshold.

{{% /tab %}}
{{% tab "Forecast" %}}

If you are using the **Cost Forecast** monitor type, you can trigger an alert when the cloud cost is `above`, `below`, `above or equal`, `below or equal to`, `equal to`, or `not equal to` a threshold.

{{% /tab %}}

{{% tab "Budget" %}}
If you are using the **Budget** monitor type, you can trigger an alert when the cloud cost exceeds the budget you selected in the previous step.

| Step               | Purpose                                                        | Values                            |
|--------------------|----------------------------------------------------------------|-----------------------------------|
| Granularity        | Level of detail at which the cost is evaluated.                | `overall` (total cost), `per_row` |
| Threshold          | Percentage of budget that is utilized to trigger the alert.    | Number between 0 and 100 (%)      |
| Timeframe          | Evaluation window used to assess if the threshold is breached. | `all_months`, `current_month`     |


{{% /tab %}}
{{< /tabs >}}

<br>

### Configure notifications and automations

For detailed instructions on the **Configure notifications and automations** section, see the [Notifications][6] page.

### Define permissions and audit notifications

Choose which teams, roles, users, or service accounts are allowed to **view** or **edit** the monitor. By default, all members of your organization have access.

You can also turn on **Audit Notifications** to alert the monitor creator and recipients whenever the monitor is changed.

## Other actions you can take

{{< img src="/monitors/monitor_types/cloud_cost/cost-monitors-other-actions.png" alt="The actions menu open with options to view the monitor in the Cloud Cost Explorer, as well as options to edit, clone, and delete the monitor." style="width:100%;" >}}

- **View in Monitors** to see your monitor's alert history, adjust visualizations, and review how often it has triggered alerts.
- **View in Explorer** to open the monitor in the Cloud Cost Explorer for deeper analysis.
- **Edit** a monitor to update the monitor's settings or configuration.
- **Clone** a monitor to create a copy of an existing monitor by choosing **Actions > Clone**.
- **Delete** a monitor to permanently remove a monitor you no longer need.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /cloud_cost_management/
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/monitor
[3]: https://app.datadoghq.com/monitors/create/cost
[4]: https://app.datadoghq.com/cost/analyze/monitors
[5]: https://app.datadoghq.com/cost/explorer
[6]: /monitors/notify/
[7]: /cloud_cost_management/planning/budgets/
