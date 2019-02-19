---
title: Usage details
kind: faq
---

<div class="alert alert-warning">
This feature is only available to paying customers.
</div>

## Overview

Administrators can access the [Usage][1] page by hovering over their username at the bottom left, then navigate to:  
`Plan & Usage`--> `Usage`.

The Usage page provides the following information. Tables can be downloaded as CSV files.

* Month-to-Date Summary
* Hourly Usage
* Top 500 Custom Metrics

### Month-to-Date Summary

A summary of your hosts, containers, custom metrics, logs, and APM events:

{{< img src="account_management/billing/usage-details01.png" alt="Usage Summary" responsive="true">}}

### Hourly Usage

This section contains hourly usage displayed in two tables:

* Host, Containers and Custom Metrics
* Infrastructure Host Types

#### Host, Containers and Custom Metrics

This table shows hourly usage for:

| Column             | Description                                                                                         |
|--------------------|-----------------------------------------------------------------------------------------------------|
| APM Hosts          | Shows the 99th percentile of all distinct APM hosts over all hours in the current month.            |
| Infra. Hosts       | Shows the 99th percentile of all distinct infrastructure hosts over all hours in the current month. |
| Containers         | Shows the high watermark of all distinct containers over all hours in the current month.            |
| Custom Metrics     | Shows the average number of distinct [custom metrics][2] over all hours in the current month.       |
| Ingested Logs      | Shows the sum of all log bytes ingested over all hours in the current month.                        |
| Indexed Logs       | Shows the sum of all log events indexed over all hours in the current month.                        |
| Indexed APM Events | Shows the sum of all APM events indexed over all hours in the current month.                        |

{{< img src="account_management/billing/usage-details02.png" alt="Hourly Usage" responsive="true">}}

#### Infrastructure Host Types

This table shows the break-out of the **Infra. Hosts** column from the table above:

* Agent Hosts
* AWS Hosts
* Azure Hosts
* GCP Hosts

{{< img src="account_management/billing/usage-details03.png" alt="Infra Host Types" responsive="true">}}


### Top 500 Custom Metrics

This table shows information on your top 500 custom metrics:

* Metric name
* Average custom metrics per hour
* Max custom metrics per hour

{{< img src="account_management/billing/usage-details04.png" alt="Custom Metrics" responsive="true">}}


## Troubleshooting
For technical questions, contact [Datadog support][3].

For billing questions, contact your [Customer Success][4] Manager.

[1]: https://app.datadoghq.com/account/usage/hourly
[2]: /developers/metrics/custom_metrics
[3]: /help
[4]: mailto:success@datadoghq.com
