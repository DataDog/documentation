---
title: Usage details
kind: documentation
---

## Overview

Administrators can access the [Usage][1] page by hovering over their username at the bottom left, then navigate to:
`Plan & Usage`--> `Usage`.

The Usage page shows usage grouped by product category. You can navigate to a product tab to view usage specific to that product category or the "All" tab to view usage of all products. Each tab provides the following information:

* Month-to-Date Summary
* Overall Usage (current and historical)

Certain product tabs also contain additional tools:

* Custom Metrics Tab: Top Custom Metrics
* Log Management Tab: Logs Usage by Index

## Month-to-Date Summary

This section summarizes your month-to-date or MTD usage. In the "All" tab, you will see your month-to-date usage of infrastructure hosts, containers, custom metrics, APM hosts, logs and any other part of the platform you've used during the month.

{{< img src="account_management/billing/usage-details-v2-01.png" alt="Usage Summary - All" >}}

In product specific tabs, you will see your month-to-date usage of the products in that product category.

{{< img src="account_management/billing/usage-details-v2-02.png" alt="Usage Summary - Network" >}}

When possible, the default data shown in this section is "Billable" usage, which is estimated usage that contributes to your final bill. The "Billable" view also breaks out on-demand usage, which is usage above your prepaid commitments and allocations.

{{< img src="account_management/billing/usage-details-v2-07.png" alt="Usage Summary - Billable" >}}

Switching to the "All" view will show all usage, including non-billable usage such as product trials.

{{< img src="account_management/billing/usage-details-v2-08.png" alt="Usage Summary - All" >}}

If "Billable" usage is not available, the data shown reflects "All" usage and the toggle to switch views will not be available.


## Overall Usage

This section contains hourly, daily, monthly, and annual usage. In the "All" tab, you will see hourly, daily, monthly, and annual usage for:

| Graph                    | Description                                                                                                                    |
|--------------------------|--------------------------------------------------------------------------------------------------------------------------------|
| Infra. Hosts             | Each bar shows the 99th percentile of all distinct infrastructure hosts for that hour/day/week.                                  |
| Containers               | Each bar shows the high watermark of all distinct containers for that hour/day/week.                                             |
| APM Hosts                | Each bar shows the 99th percentile of all distinct APM hosts for that hour/day/week.                                             |
| Indexed Spans            | Each bar shows the sum of all spans indexed during that hour/day/week. The line shows the running total of spans indexed.        |
| Profiled Hosts           | Each bar shows the 99th percentile of all distinct profiled hosts for that hour/day/week.                                        |
| Profiled Containers      | Each point shows the average of all distinct profiled containers for that hour/day/week.                                         |
| Custom Metrics           | Each point shows the average number of distinct [custom metrics][2] for that hour/day/week.                                      |
| Ingested Custom Metrics  | Each point shows the average number of distinct INGESTED custom metrics for that hour/day/week.                                  |
| Ingested Logs            | Each bar shows the sum of all log bytes ingested for that hour/day/week. The line shows the running total of logs bytes ingested.|
| Indexed Logs             | Each bar shows the sum of all log events indexed for that hour/day/week. The line shows the running total of logs bytes indexed. |
| Analyzed Logs (Security) | Each bar shows the sum of all analyzed log bytes ingested for that hour/day/week. The line shows the running total of analyzed logs bytes ingested. |
| Serverless Functions     | Each point shows the average number of functions that are executed 1 or more times in that hour/day/week.                        |
| Fargate Tasks            | Each point shows the average number of Fargate tasks in that hour/day/week.                                                      |
| Network Hosts            | Each bar shows the 99th percentile of all distinct Network hosts for that hour/day/week.                                         |
| Network Flows            | Each bar shows the sum of all Network flows indexed for that hour/day/week. The line shows the running total of Network flows indexed    |
| Network Devices          | Each bar shows the 99th percentile of all distinct Network devices over that hour/day/week.                                       |
| Synthetic API Tests      | Each bar shows the sum of all Synthetic API tests over that hour/day/week. The line shows the running total of Synthetic API tests|
| Synthetic Browser Tests  | Shows the sum of all Synthetic browser tests over that hour/day/week. The line shows the running total of Synthetic Browser Tests |  | RUM Sessions             | Shows the sum of all distinct RUM sessions over that hour/day/week. The line shows the running total of RUM Sessions |

{{< img src="account_management/billing/usage-details-v2-03.png" alt="Hourly Usage - All" >}}

Some graphs contain both bars for sums of hourly/daily/weekly usage and a line for the running or cummulative total. The units for the bars are on the left-hand side of the graph while the units for the line is on the right-hand side. 

{{< img src="account_management/billing/usage-details-v2-09.png" alt="Hourly Usage - Dual Axis Graph" >}}

In product specific tabs, you will see your hourly, daily, monthly, and annual usage of the products in that product category. In the Infrastructure tab, you will also see a breakdown of the **Infra Hosts** graph by host type:

* Agent Hosts
* AWS Hosts
* Azure Hosts
* GCP Hosts
* vSphere Hosts
* Azure App Services

{{< img src="account_management/billing/usage-details-v2-04.png" alt="Hourly Usage - Infra Hosts" >}}

## Top Custom Metrics

In the Custom Metrics tab, this table lists the following information about your Top 5000 custom metrics month-to-date usage and most recent day usage (i.e., usage on the date of the last update):

* Metric name
* Average custom metrics per hour
* Max custom metrics per hour
* The metric's contribution percentage to the overall custom metrics usage

This data can be downloaded as a CSV file.

{{< img src="account_management/billing/usage-details-v2-05.png" alt="Custom Metrics" >}}

## Logs Usage by Index

In the Log Management tab, this table displays your hourly, daily, monthly, and annual indexed log usage by index name and retention period. The following information is provided:

* Index name
* Retention period in days
* Indexed log count
* The index's contribution percentage to the overall indexed log usage for the time period selected

This data can be downloaded as a CSV file.

{{< img src="account_management/billing/usage-details-v2-06.png" alt="Logs Usage by Index" >}}

## Troubleshooting

For technical questions, contact [Datadog support][3].

For billing questions, contact your [Customer Success][4] Manager.

[1]: https://app.datadoghq.com/account/usage/hourly
[2]: /developers/metrics/custom_metrics/
[3]: /help/
[4]: mailto:success@datadoghq.com
