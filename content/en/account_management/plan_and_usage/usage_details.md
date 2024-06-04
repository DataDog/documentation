---
title: Usage Details
kind: documentation
aliases:
  - /account_management/billing/usage_details/
---

## Overview

Administrators can access the [Usage][1] page by hovering over their username at the bottom left, then navigate to:
`Plan & Usage`--> `Usage`.

The Usage page shows usage grouped by product category. You can navigate to a product tab to view usage specific to that product category or the "All" tab to view usage for all products. Each tab provides the following information:

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


## Usage trends

The [Usage Trends][5] section contains product usage graphs displaying summed usage for all organizations across an account. Usage reports are downloadable through the **Download as CSV** button. For each organization, these reports include an hourly breakdown of usage by product. 

{{< img src="account_management/billing/UsageTrendsOverviewAndCSV.png" alt="Usage Trends graphs page in the Datadog application with Download as CSV option highlighted" style="width:100%; align:left" >}}

For products with subtypes, each category is distinguished on the graph for that product. 

{{< img src="account_management/billing/UsageGraphsByProductTab.png" alt="Usage summary with infrastructure tab selected and multiple graphs for infrastructure usage subtypes such as infra hosts, agent hosts, and containers" style="width:100%; align:left" >}}

More detailed product subtype graphs can be found on each product's tab. For example, a breakdown by host type is available on the Infrastructure tab.

{{< img src="account_management/billing/UsageBreakdownByProductSubtype.png" alt="Usage trends section of the Infrastructure tab with Infra Hosts graph containing Agent hosts and AWS hosts, Indexed Logs graph containing Daily Indexed Live Logs and Cumulative Indexed Live Logs" style="width:100%; align:left" >}}
 
Cumulative usage over time is available for sum-based products.

{{< img src="account_management/billing/CumulativeUsageLine.png" alt="Graphs for Ingested Spans and Indexed Spans, each plotting data for the daily and cumulative sums of their respective spans" style="width:100%; align:left" >}}

Time selection contains options to view usage graphs at daily, weekly, monthly or yearly intervals.

{{< img src="account_management/billing/TimeGranularity.png" alt="Time intervals on usage graphs" style="width:100%; align:left" >}}

## Billable on-demand pills and committed lines

<div class="alert alert-warning">This feature is in beta. To request access and confirm your organization meets the feature criteria, contact your account representative or <a href="https://docs.datadoghq.com/help/">Customer Support</a>.</div>

Billable on-demand pills highlight the portion of billable usage that is on-demand usage. The dashed `Committed` line shows commitments per product, without any allotments (such as Custom Metrics or Containers).

{{< img src="account_management/plan_and_usage/MTD-billable-and-committed-lines.png" alt="Billable on-demand pills and committed usage lines on trends graphs." style="width:100%; align:left" >}}


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
* This data can be downloaded as a CSV file, with a maximum of 300,000 custom metrics. You can download over 300,000 custom metrics using our [API endpoint][6].


For more details on your metrics, navigate to the [Metrics Summary][7] by hovering over the row of the metric you are interested in and clicking on the meter icon that shows up on the right side.

{{< img src="account_management/billing/usage-metrics-05.png" alt="Overview of Top Custom Metrics table" >}}

## Logs usage by index

In the Log Management tab, this table displays your hourly, daily, monthly, and annual indexed log usage by index name and retention period. It also shows the breakdown between live logs and [rehydrated logs][8]. The following information is provided:

* Index name
* Retention period in days
* Indexed log count
* The index's contribution percentage to the overall indexed log usage for the time period selected

This data can be downloaded as a CSV file.

{{< img src="account_management/billing/usage-details-v3-03.png" alt="Logs Usage by Index" >}}

## First-time usage notifications

<div class="alert alert-warning">This feature is in beta. To request access and confirm your organization meets the feature criteria, contact your account representative or <a href="https://docs.datadoghq.com/help/">Customer Support</a>.</div>

The first-time usage notifications feature sends email notifications when there is first-time billable usage for a new product not included in your current contract. Emails are sent approximately 48 hours after the usage first occurs during a given month.

After enabling the feature, a new **Usage Notifications** tab is added to the parent organization's **Plan and Usage** page. On this tab, there is a list of all products covered by the functionality. Unchecking a box stops notifications for that product for all users within the account. If any first-time usage outside of your most recent active contract is detected, users do not receive a notification for any unchecked products.

{{< img src="account_management/plan_and_usage/usage-notifications.png" alt="First-time usage notifications page with a product list including checked and unchecked items" style="width:100%; align:left" >}}

Any user with _Usage Notifications Read_ or _Write_ permissions receives emails. For most organizations, this means any admins.

If your Datadog account is a multi-organization, parent organization users with permissions receive email notifications of usage in child organizations. These emails indicate which child organization generated the usage, and the product which usage was generated for. Child organization users with this permission receive emails for their organization only.

{{< img src="account_management/plan_and_usage/usage-notifications-email.png" alt="First-time usage notifications email with details on sample first-time usage" style="width:100%; align:left" >}}

## Troubleshooting

For technical questions, contact [Datadog support][9].

For billing questions, contact your [Customer Success][10] Manager.


[1]: https://app.datadoghq.com/account/usage/hourly
[2]: https://docs.datadoghq.com/api/latest/usage-metering/#get-usage-across-your-multi-org-account
[3]: https://docs.datadoghq.com/api/latest/usage-metering/#get-billable-usage-across-your-account
[4]: /metrics/custom_metrics/
[5]: https://app.datadoghq.com/billing/usage
[6]: https://docs.datadoghq.com/api/latest/usage-metering/#get-all-custom-metrics-by-hourly-average
[7]: https://docs.datadoghq.com/metrics/summary/#overview
[8]: https://docs.datadoghq.com/logs/archives/rehydrating/?tab=awss3#overview
[9]: /help/
[10]: mailto:success@datadoghq.com
