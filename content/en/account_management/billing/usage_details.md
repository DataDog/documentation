---
title: Usage details
kind: documentation
---

## Overview

Administrators can access the [Usage][1] page by hovering over their username at the bottom left, then navigate to:
`Plan & Usage`--> `Usage`.

The Usage page provides the following information.
* Month-to-Date Summary
* Overall Usage (current and historical)
* Top 500 Custom Metrics

### Month-to-Date Summary

This section summarizes your month-to-date usage of hosts, containers, custom metrics, APM hosts, Analyzed Spans, logs, synthetics and any other part of the platform you've used during the month.

{{< img src="account_management/billing/usage-details-01.png" alt="Usage Summary" responsive="true">}}

### Overall Usage

This section contains hourly, daily, monthly, and annual usage displayed in two tabs:

* All Products
* Infrastructure Host Types

#### Host, Containers and Custom Metrics

This tab shows hourly, daily, monthly, and annual usage for:

| Column                   | Description                                                                                         |
|--------------------------|-----------------------------------------------------------------------------------------------------|
| APM Hosts                | Shows the 99th percentile of all distinct APM hosts over all hours in the current month.            |
| Infra. Hosts             | Shows the 99th percentile of all distinct infrastructure hosts over all hours in the current month. |
| Containers               | Shows the high watermark of all distinct containers over all hours in the current month.            |
| Custom Metrics           | Shows the average number of distinct [custom metrics][2] over all hours in the current month.       |
| Ingested Logs            | Shows the sum of all log bytes ingested over all hours in the current month.                        |
| Indexed Logs             | Shows the sum of all log events indexed over all hours in the current month.                        |
| Analyzed Spans           | Shows the sum of all Analyzed Spans indexed over all hours in the current month.                    |
| Synthetics API Tests     | Shows the sum of all Synthetic API tests over all hours in the current month                        |
| Synthetics Browser Tests | Shows the sum of all Synthetic browser tests over all hours in the current month                    |
| Fargate Tasks            | Shows the sum of all Fargate tasks over all hours in the current month .                            |


{{< img src="account_management/billing/usage-details-02.png" alt="Hourly Usage" responsive="true">}}

#### Infrastructure Host Types

This table shows the break-down of the **Infra Hosts** graph above by host type:

* Agent Hosts
* AWS Hosts
* Azure Hosts
* GCP Hosts

{{< img src="account_management/billing/usage-details-03.png" alt="Infra Host Types" responsive="true">}}


### Top 500 Custom Metrics

This table lists the following information about your Top 500 custom metrics month-to-date usage:

* Metric name
* Average custom metrics per hour
* Max custom metrics per hour
* The metric's contribution percentage to the overall custom metrics usage

This data can be downloaded as a CSV file.

{{< img src="account_management/billing/usage-details-04.png" alt="Custom Metrics" responsive="true">}}


## Troubleshooting
For technical questions, contact [Datadog support][3].

For billing questions, contact your [Customer Success][4] Manager.

[1]: https://app.datadoghq.com/account/usage/hourly
[2]: /developers/metrics/custom_metrics
[3]: /help
[4]: mailto:success@datadoghq.com
