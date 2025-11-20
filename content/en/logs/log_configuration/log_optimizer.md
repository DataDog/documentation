---
title: Log Optimizer
further_reading:
- link: "logs/log_configuration/indexes/#exclusion-filters"
  tag: "Documentation"
  text: "Exclusion Filters"
- link: "logs/log_configuration/logs_to_metrics/"
  tag: "Documentation"
  text: "Logs to Metrics"
- link: "logs/log_configuration/flex_logs/"
  tag: "Documentation"
  text: "Flex Logs"
---

{{< callout url="https://www.datadoghq.com/product-preview/log-optimizer/" btn_hidden="false" header="Join the Preview!">}}
Log Optimizer is in Preview. Request access to optimize your log volumes and reduce noise in your environment.
{{< /callout >}}

## Overview

{{< img src="/logs/log_configuration/log_optimizer/log_optimizer_landing_page.png" alt="Your image description" style="width:100%;" >}}

Log Optimizer helps you identify log patterns that generate high volumes of repetitive or noisy data. Datadog analyzes your indexed logs and recommends actions, such as excluding, sampling, or converting logs to metrics, so you can optimize log volumes and focus on the most relevant information for troubleshooting and analysis.

This feature builds on [Logging without Limits™][1] and complements tools such as [Exclusion Filters][2] and [Logs to Metrics][3].

## How it works

Datadog continuously reviews your indexed logs to find patterns that generate large or repetitive volumes of data. Once per day, Log Optimizer evaluates these patterns against Datadog best practices and identifies logs that may benefit from optimization.

The system then suggests actions (such as excluding debug-level messages, sampling routine logs, or converting static messages to metrics) so you can reduce noise without losing visibility into important events.

### What Datadog analyzes

* **Indexed logs:** The analysis focuses on logs stored in your standard indexes.
* **High-volume patterns:** Datadog detects patterns that make up a significant share of your total log volume.
* **Message consistency and content:** Logs with repeated or low-variability messages are evaluated as potential candidates for optimization. For example, if log messages indicate successful operations (such as "process executed successfully"), Log Optimizer may recommend excluding those logs to reduce noise.

### Recommended actions

Each recommendation includes an explanation and a suggested action.

| Recommendation | Description | Typical example |
| :---- | :---- | :---- |
| **Exclude** | Stop indexing logs that add noise and make it harder to focus on critical signals. | Debug-level messages or verbose system output. |
| **Sample** | Keep a smaller percentage of repeated logs to reduce noise while preserving visibility. | Logs that have limited information and little variability \- a timestamp or an ID field changes, but otherwise the log is the same and provides limited info  |
| **Convert to metric** | Replace repeated logs with a metric to track counts or trends over time. | Logs that always show the same message or status. |

## Getting started

Navigate to the [**Log Optimizer**][4] page and follow these steps to view and act on log optimization data in Datadog.

### 1. Review recommendations

Review the suggested actions for specific log patterns. Each recommendation includes:

* The **log pattern** and a sample logs.
* The **volume impact**, showing how much of your total indexed volume this pattern represents.
* The **recommended action** (Exclude, Sample, or Convert to Metric).
* A **short explanation** describing why Datadog recommends this action.
* The ability to create a ticket in Jira or Case Management

Click a recommendation to expand it and view more details about the pattern before applying any changes.

### 2. Apply an action

To apply a recommendation:

1. Click a recommendation to open the side panel.
2. Review the log pattern details, volume impact, and suggested action.
3. Click an action button (**Exclude Logs**, **Sample Logs**, or **Create Metric**).

The action takes effect immediately. The affected log pattern updates the next time Datadog runs the daily analysis.

### 3. Review applied changes

After applying a recommendation:

* **Exclusion filters** appear under [Logs Indexes][5].
* **Logs-to-metrics conversions** appear in your [Metrics Configuration][6].

You can edit or remove these configurations at any time.

{{% collapse-content title="Case Study: Simplifying log data using Log Optimizer" level="h4" expanded=false %}}

{{< img src="/logs/log_configuration/log_optimizer/log_recommendation_side_panel.png" alt="Log Optimizer recommendation side panel showing actions and pattern details" style="width:100%;" >}}

When you review the **Log Optimizer** page, you notice a high-volume pattern from the `shopist-support` service. The message "Verifying ticket" appears millions of times each day across multiple hosts.

Datadog detects this as a repetitive pattern that doesn't change at all and recommends converting it to a metric and excluding the log from indexing. You review the recommendation, confirm that these logs are repetitive, and apply the exclusion directly from the **Recommendation** side panel.

After the next daily analysis, your updated configuration shows a reduction in indexed volume. Critical error logs from the same service remain visible, allowing you to focus on meaningful signals without losing observability.
{{% /collapse-content %}}

## Limitations

* **Analyzes indexed logs only:** Recommendations are generated from logs stored in standard indexes. Logs in Flex or other storage tiers are not included.  
* **Updates once per day:** Datadog runs the analysis every 24 hours, so recommendations may reflect log data up to a day old.  
* **Ignores existing configurations:** Log Optimizer does not account for exclusion filters or logs-to-metrics conversions that are already in place. Review your settings before applying new actions to avoid duplicates.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/logging_without_limits/
[2]: /logs/indexes/#exclusion-filters
[3]: /logs/logs_to_metrics/
[4]: https://app.datadoghq.com/logs/optimizer
[5]: /logs/indexes/#exclusion-filters
[6]: /logs/logs_to_metrics/