---
title: Usage Details
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

## Month-to-date summary

This section summarizes your month-to-date usage. In the "All" tab, view your month-to-date usage of infrastructure hosts, containers, custom metrics, APM hosts, logs, and any other part of the platform you've used during the month. 

{{< img src="account_management/billing/usage-details-v2-01.png" alt="Usage Summary - All tab" >}}

In product specific tabs, view your month-to-date usage of the products in that product category.

{{< img src="account_management/billing/usage-details-v2-02.png" alt="Usage Summary - Network" >}}

The month-to-date usage shown above is "All" usage, which includes non-billable usage such as product trials. Most accounts are able to view "Billable" usage, which only shows usage that contributes to your final bill. The "Billable" view breaks out on-demand usage above your commitments and allocations.

{{< img src="account_management/billing/usage-details-v2-07.png" alt="Usage Summary - Billable" >}}
For API users, endpoints are available to access ["All"][2] usage and ["Billable"][3] usage.

Month-to-date usage of each product is calculated as follows:

| Product                   | Description                                                                                                                |
|--------------------------|-----------------------------------------------------------------------------------------------------------------------------|
| Infra. Hosts             | Shows the 99th percentile of all distinct infrastructure hosts over all hours in the current month.                         |
| Containers               | Shows the high watermark of all distinct containers over all hours in the current month.                                    |
| APM Hosts                | Shows the 99th percentile of all distinct APM hosts over all hours in the current month.                                    |
| Profiled Hosts           | Shows the 99th percentile of all distinct profiled hosts over all hours in the current month.                               |
| Profiled Containers      | Shows the average of all distinct profiled containers over all hours in the current month.                                  |
| Custom Metrics           | Shows the average number of distinct [custom metrics][4] over all hours in the current month.                               |
| Ingested Custom Metrics  | Shows the average number of distinct INGESTED custom metrics over all hours in the current month.                           |
| Ingested Logs            | Shows the sum of all log bytes ingested over all hours in the current month.                                                |
| Indexed Logs             | Shows the sum of all log events indexed over all hours in the current month.                                                |
| Scanned Logs             | Shows the sum of all log bytes scanned by Sensitive Data Scanner over all hours in the current month.                       |
| Ingested Spans           | Shows the sum of all spans ingested over all hours in the current month.                                                    |
| Indexed Spans            | Shows the sum of all Indexed Spans indexed over all hours in the current month.                                             |
| Analyzed Logs (Security) | Shows the sum of all analyzed log bytes ingested over all hours in the current month.                                       |
| Serverless Functions     | Shows the average of the number of functions that are executed 1 or more times each hour in the current month.              |
| Serverless Invocations   | Shows the sum of all invocations over all hours in the current month.                                                       |
| Fargate Tasks            | Shows the sum of all Fargate tasks over all hours in the current month.                                                     |
| Network Hosts            | Shows the 99th percentile of all distinct Network hosts over all hours in the current month.                                |
| Network Flows            | Shows the sum of all Network flows indexed over all hours in the current month.                                             |
| Network Devices          | Shows the 99th percentile of all distinct Network devices over all hours in the current month.                              |
| Synthetic API Tests      | Shows the sum of all Synthetic API tests over all hours in the current month.                                               |
| Synthetic Browser Tests  | Shows the sum of all Synthetic browser tests over all hours in the current month.                                           |
| RUM Sessions             | Shows the sum of all distinct RUM sessions over all hours in the current month.                                             |
| Incident Management      | Shows number of unique active users to date in the selected month who interacted with incident lifecycle and timelines.     |
| IoT Devices              | Shows the 99th percentile of all distinct IoT devices over all hours in the current month.                                  |

## Overall usage

This section contains hourly, daily, monthly, and annual usage:

{{< img src="account_management/billing/usage-details-v2-03.png" alt="Hourly Usage - All" >}}

In product specific tabs, view your hourly, daily, monthly, and annual usage of the products in that product category. Some products also provide additional detailed breakdowns of usage. For example, in the Infrastructure tab, the breakdown by host type is available.

{{< img src="account_management/billing/usage-details-v2-04.png" alt="Hourly Usage - Infra Hosts" >}}

Most accounts have access to the feature Included Lines, which allows you to see how your usage is tracking over the month. The graphs on your Usage page contain an "Included" line that shows commitments per product plus any allowances (such as, custom metrics, containers).

{{< img src="account_management/billing/usage-details-v3-01.png" alt="Usage graph with an Included line" >}}

## Top custom metrics

In the Custom Metrics tab, the Top Custom Metrics table provides two views for your month-to-date usage and most recent day usage, such as usage on the date of the last update).

The "Top 5000" view provides the following information about your Top 5000 custom metrics:
* Metric name
* Average custom metrics per hour
* Max custom metrics per hour
* The metric's contribution percentage to the overall custom metrics usage
* Search for a metric within your top 5000 custom metrics
* This data can be downloaded as a CSV file.

The "All" view provides the following information about all your custom metrics:
* Metric name
* Average custom metrics per hour
* Max custom metrics per hour
* Search for a metric within all your custom metrics
* This data can be downloaded as a CSV file, with a maximum of 300,000 custom metrics. You can download over 300,000 custom metrics using our [API endpoint][5].


For more details on your metrics, navigate to the [Metrics Summary][6] by hovering over the row of the metric you are interested in and clicking on the meter icon that shows up on the right side.

{{< img src="account_management/billing/usage-metrics-05.png" alt="Overview of Top Custom Metrics table" >}}

## Logs usage by index

In the Log Management tab, this table displays your hourly, daily, monthly, and annual indexed log usage by index name and retention period. It also shows the breakdown between live logs and [rehydrated logs][7]. The following information is provided:

* Index name
* Retention period in days
* Indexed log count
* The index's contribution percentage to the overall indexed log usage for the time period selected

This data can be downloaded as a CSV file.

{{< img src="account_management/billing/usage-details-v3-03.png" alt="Logs Usage by Index" >}}

## Troubleshooting

For technical questions, contact [Datadog support][8].

For billing questions, contact your [Customer Success][9] Manager.


[1]: https://app.datadoghq.com/account/usage/hourly
[2]: https://docs.datadoghq.com/api/latest/usage-metering/#get-usage-across-your-multi-org-account
[3]: https://docs.datadoghq.com/api/latest/usage-metering/#get-billable-usage-across-your-account
[4]: /metrics/custom_metrics/
[5]: https://docs.datadoghq.com/api/latest/usage-metering/#get-all-custom-metrics-by-hourly-average
[6]: https://docs.datadoghq.com/metrics/summary/#overview
[7]: https://docs.datadoghq.com/logs/archives/rehydrating/?tab=awss3#overview
[8]: /help/
[9]: mailto:success@datadoghq.com
