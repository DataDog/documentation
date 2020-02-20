---
title: Estimated Usage Metrics
kind: documentation
---

## Overview

Datadog calculates your current estimated usage in near real-time. Estimate usage metrics enable you to:

* Graph your estimated usage
* Create monitors around your estimated usage based on thresholds of your choosing
* Get instant alerts of spikes or drops in your usage
* Assess the potential impact of code changes on your usage in near real-time

**Note**: These usage metrics are estimates that won't always match up to billable usage given their real-time nature. There is a 10-20% difference between estimated usage and billable usage on average.

{{< img src="account_management/billing/usage-metrics-01.png" alt="Dashboard Example" >}}

### Types of usage

Estimated usage metrics are generally available for the following usage types:

| Usage Type           | Metric                                   |
|----------------------|------------------------------------------|
| Infrastructure Hosts | `datadog.estimated_usage.hosts`          |
| Containers           | `datadog.estimated_usage.containers`     |
| Custom Metrics       | `datadog.estimated_usage.metrics.custom` |
| Logs Ingested Bytes  | `logs.estimated.ingested_bytes`          |
| Logs Ingested Events | `logs.estimated.ingested_events.count`   |

Log-based usage metrics must be manually enabled from the [Generate Metrics][1] page.

{{< img src="account_management/billing/usage-metrics-02.png" alt="Metric Names" >}}

### Multi-Org usage

For accounts with multiple organizations, you can roll up estimated usage from child organizations using the `from` field to monitor usage across your entire account.

{{< img src="account_management/billing/usage-metrics-03.png" alt="Multi-Org Usage" >}}

## Troubleshooting

For technical questions, contact [Datadog support][1].

For billing questions, contact your [Customer Success][2] Manager.

[1]: /help
[2]: mailto:success@datadoghq.com
