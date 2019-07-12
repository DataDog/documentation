---
title: Estimated Usage Metrics
kind: faq
---

## Overview

Usage metrics are estimates of your current Datadog usage in near real-time. They enable you to:

* Graph your estimated usage 
* Create monitors around your estimated usage based on thresholds of your choosing
* Get instant alerts of spikes or drops in your usage
* Assess the potential impact of code changes on your usage in near real-time

**Note**: These usage metrics are estimates that won't always match up to billable usage given their real-time nature. There is a 10-20% difference between estimated usage and billable usage on average.  

{{< img src="account_management/billing/usage-metrics-01.png" alt="Dashboard Example" responsive="true">}}

### Types of Usage

Estimated usage metrics are generally available for the following usage types: 

| Usage Type         | Metric                                                                                              |
|--------------------|-----------------------------------------------------------------------------------------------------|
| Infra. Hosts       | `datadog.estimated_usage.hosts`                                                                     |
| Containers         | `datadog.estimated_usage.containers`                                                                |
| Custom Metrics     | `datadog.estimated_usage.metrics.custom`                                                            |

{{< img src="account_management/billing/usage-metrics-02.png" alt="Metric Names" responsive="true">}}

More usage types will be added in the near future.

### Multi-Org Usage

For accounts with multiple organizations, you can roll up estimated usage from child organizations using the `from` field to monitor usage across your entire account.

{{< img src="account_management/billing/usage-metrics-03.png" alt="Multi-Org Usage" responsive="true">}}

## Troubleshooting
For technical questions, contact [Datadog support][3].

For billing questions, contact your [Customer Success][4] Manager.

[1]: https://app.datadoghq.com/account/usage/hourly
[2]: /developers/metrics/custom_metrics
[3]: /help
[4]: mailto:success@datadoghq.com
