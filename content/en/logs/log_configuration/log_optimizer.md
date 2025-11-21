---
title: Log Optimizer
description: Review automated recommendations to optimize log volumes by excluding, sampling, or converting high-volume log patterns to metrics.
further_reading:
- link: "logs/log_configuration/indexes/#exclusion-filters"
  tag: "Documentation"
  text: "Exclusion Filters"
- link: "logs/log_configuration/logs_to_metrics/"
  tag: "Documentation"
  text: "Logs to Metrics"
---

{{< callout url="https://www.datadoghq.com/product-preview/log-optimizer/" btn_hidden="false" header="Join the Preview!">}}
Log Optimizer is in Preview. Request access to optimize your log volumes and reduce noise in your environment.
{{< /callout >}}

## Overview

{{< img src="/logs/log_configuration/log_optimizer/log_optimizer_main.png" alt="Log Optimizer landing page in Datadog, view recommendations to reduce log volume and noise" style="width:100%;" >}}

Log Optimizer helps you identify log patterns that generate high volumes of repetitive or noisy data. Datadog analyzes your indexed logs and recommends actions, such as excluding, sampling, or converting logs to metrics, so you can optimize log volumes and focus on the most relevant information for troubleshooting and analysis.

This feature builds on [Logging without Limits™][1] and complements tools such as [Exclusion Filters][2] and [Logs to Metrics][3].

## How it works

Datadog continuously reviews your **indexed** logs to find patterns that generate large or repetitive volumes of data. Once per day, Log Optimizer evaluates these patterns against Datadog best practices and identifies logs that may benefit from optimization.

The Log Optimizer then suggests actions (such as excluding debug-level messages, sampling routine logs, or converting static messages to metrics) so you can reduce noise without losing visibility into important events.

<div class="alert alert-danger">The Log Optimizer does not account for existing exclusion filters or logs-to-metrics conversions. Review your settings before applying new actions to avoid duplicates.</div>

### What Datadog analyzes

* **Indexed logs:** The analysis focuses on logs stored in your standard indexes.
* **High-volume patterns:** Datadog detects patterns that make up a significant share of your total log volume.
* **Message consistency and content:** Logs with repeated or low-variability messages are evaluated as potential candidates for optimization. For example, if log messages indicate successful operations (such as "process executed successfully"), Log Optimizer may recommend excluding those logs to reduce noise.

### Recommended actions

Each recommendation includes an explanation and a suggested action.

| Recommendation | Description | Typical example |
| :---- | :---- | :---- |
| **Exclude** | Stop indexing logs that add noise and make it harder to focus on critical signals. | Debug-level messages or verbose system output. |
| **Sample** | Lower the percentage of repetitive logs to reduce noise without losing visibility. | Logs with very little variability (where fields like timestamps or IDs might be the only change) |
| **Convert to metric** | Replace repeated logs with a metric to track counts or trends over time. | Logs that always show the same message or status. |

## Review and apply recommendations

Navigate to the [**Log Optimizer**][4] page to view log patterns, sample messages, volume data, and plain-language explanations for each recommendation.

To apply a recommendation:

1. Click a recommendation to open the side panel.
2. Click an action button (**Exclude Logs**, **Sample Logs**, or **Create Metric**).

The change takes effect immediately in your configuration. However, The Log Optimizer page does not update until the next time it runs the daily analysis. This means, even after you take action, the page continues to list the same recommendation.

{{% collapse-content title="Case Study: Exclude repetitive log data using the Log Optimizer" level="h4" expanded=false %}}

{{< img src="/logs/log_configuration/log_optimizer/log_recommendation_side_panel.png" alt="Log Optimizer recommendation side panel showing actions and pattern details" style="width:100%;" >}}

When you review the **Log Optimizer** page, you notice a high-volume pattern from the `shopist-support` service. The message "Verifying ticket" appears over 1.3 million times each day across multiple hosts.

Datadog detects this as a repetitive pattern that doesn't change and recommends converting it to a metric and excluding the log from indexing. You review the recommendation, confirm that these logs are repetitive, and apply the exclusion directly from the **Recommendation** side panel.

Critical error logs from the same service remain visible, allowing you to focus on meaningful signals without losing observability. After the next daily analysis, your updated configuration would show a reduction in indexed volume.
{{% /collapse-content %}}

## Track applied changes

Applying a recommendation creates an exclusion filter or a metric from the log. To see that filter or metric definition, change it, or remove it, go to the corresponding page:

* **Exclusion filters**: [Logs Indexes][2] page
* **Logs-to-metrics conversions**: [Metrics Configuration][3] page

You can edit or remove these configurations at any time from their respective pages.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/logging_without_limits/
[2]: /logs/indexes/#exclusion-filters
[3]: /logs/logs_to_metrics/
[4]: https://app.datadoghq.com/logs/optimizer