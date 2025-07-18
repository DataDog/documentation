---
title: Anomalies Page
further_reading:
- link: "/cloud_cost_management/"
  tag: "Documentation"
  text: "Cloud Cost Management"
- link: "/cloud_cost_management/monitors"
  tag: "Monitors"
  text: "Create Cost Monitors"
---

## Overview

Datadog Cloud Cost Management (CCM) continuously monitors your environment to detect and prioritize unexpected cost changes, enabling you to share, investigate, and resolve anomalies. Cost anomalies are available for AWS, and do not require any additional setup after CCM is set up.

## How anomalies are defined

Anomalies are significant, unexpected changes that stand out from typical patterns. Datadog automatically identifies anomalies using machine learning techniques that adapt to your specific usage patterns.

Our algorithm takes into account seasonality, distinguishing true anomalies from expected fluctuations. For example, if your infrastructure typically scales up every Monday, Datadog recognizes this pattern and does not flag it as a cost anomaly. The algorithm also filters into usage charges only (excludes taxes, credits, refunds, RIFee). This is so that anomalies are based on engineering's usage that can be actioned on.

To further reduce noise, anomalies with low cost impact are automatically filtered out, ensuring your attention stays focused on the largest anomalies.

## View cost anomalies

On the [Anomalies tab of the Cloud Cost page in Datadog][1], you can view the anomalies and filter them to Active, Past, or Resolved:
- **Active**: An anomaly is **Active** if anomalous costs occurred in the last day (the last full day of cost data, which is often 2-3 days prior).
- **Past**: If an anomaly lasts more than 7 days, or the algorithm detects that costs are no longer anomalous, the anomaly is moved to the **Past** tab. Past anomalies can be useful to report on, but are often less urgent and actionable.
- **Resolved**: If you [resolve an anomaly](#resolve-anomalies), the anomaly can be found in the **Resolved** tab.

Each anomaly explains how much more costs were than expected for the service name (ex:'rds'), usage type, and cloud accounts. Additionally, the anomaly also shows what expected costs would have been in the time frame. The anomaly card shows a graph with the cost trend over the past 1 month.

Anomalies with the most unexpected costs are at the top, so that it is easier to take action on anomalies with the most impact first.

This is an example of the list of anomalies detected in your infrastructure:

{{< img src="cloud_cost/anomalies/cost_anomalies_new_list.png" alt="List of cost anomalies automatically detected" style="width:90%;" >}}

<!-- TODO: add img with watchdog explains popover -->

When hovering over the graph, you can see two graphs: one with and one without the tags identified by the Watchdog Explains engine. This shows how removing XXX:XXX flattens the spike, confirming the impact on the cost.

## Understand what's driving anomalies

CCM automatically uses Watchdog Explains[2], an investigation assistant, to help you identify what is driving cost anomalies. Watchdog Explains analyzes and identifies the specific:

- accounts
- teams
- services
- Kubernetes or ECS clusters
- regions

where the anomaly happened, reducing manual investigation steps. Before you even click on the anomaly, you can hover over the anomaly graph and see the costs with and without tags identified as influential by Watchdog Explains, to confirm that the identified tags are indeed driving the anomaly.

<!-- TODO: add img with Watchdog Explains hover state -->

To further investigate and share anomalies with the relevant owners, you can open an anomaly for more details. The investigation panel provides:

- **Impact summary and drivers**: A comprehensive overview summarizing the impact and identifying the key drivers responsible for the cost anomaly.
- **Related driver graphs**: Visual representations showing graphs from the related drivers that contributed to the anomalous behavior.
- **Usage versus unit price analysis**: A dedicated section to help you understand whether the unexpected change is due to increased usage, unit price changes, or both. Usage-driven anomalies should be shared with the responsible engineering teams identified by Watchdog Explains to help explain the cause for the change in usage. Unit price changes are often caused by changes in commitment programs or contracted discounts.
- **Resource investigation table**: A detailed table allowing you to investigate potential impactful resource IDs that may be contributing to the cost spike.

<!-- TODO: add img with updated side panel -->
<!-- TODO: add img for usage & unit price -->
<!-- TODO: add img for resource ids -->

## Take action on anomalies

To further investigate anomalies by using additional dimensions, view the anomaly in Cost Explorer or a Datadog Notebook. 

<!-- TODO: update img with new design, highlight the "next steps" section specifically -->

You can also send the anomaly, Explorer link, or Notebook to the service owners or teams identified by Watchdog Explains. This enables teams to resolve anomalies with context for why the anomaly occurred and whether it's expected.

You can also create a cost anomaly monitor to get alerted of similar cost anomalies in the future.

<!-- TODO: add screenshot of anomaly monitors -->

## Resolve anomalies

As you investigate anomalies, you may find anomalies that are not significant, were actually expected costs, or are otherwise not considered an anomaly.

Mark anomalies as significant or insignificant to give feedback and help improve the anomaly detection algorithm. Resolve anomalies with context to move anomalies to the Resolved tab, and add context for others in your organization.

This is an example of how to mark a cost anomaly as significant and explain why it's an anomaly:

<!-- TODO: update img with new design -->
{{< img src="cloud_cost/anomalies/cost_anomalies_side-panel_is-significant.png" alt="You can mark cost anomaly as significant and write an explanation about why it's an anomaly  and then resolve it" style="width:90%;" >}}

[1]: https://app.datadoghq.com/cost/analyze/anomalies
[2]: /dashboards/graph_insights/watchdog_explains
